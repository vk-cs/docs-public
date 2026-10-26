# {heading(GitOps support: labeling automation objects and restricting manual changes with Argo CD and Gatekeeper)[id=mk8s-ag]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Preparatory steps)[id=mk8s-ag-prepare]}

{include(/en/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../connect/kubectl#mk8s-kubectl)[text=Install and configure]} `kubectl`, if this has not been done yet.
1. {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-argo-cd#mk8s-install-advanced-argo-cd)[text=Install]} the Argo CD add-on, if this has not been done yet.
   
   Default {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}: `argocd-application-controller` and `argocd-server`.

## {heading({counter(ag)}. Install Gatekeeper (Helm))[id=mk8s-ag-gatekeeper]}

1. Run the commands:

   ```bash
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm repo update
   helm install gatekeeper/gatekeeper --name-template=gatekeeper \
     --namespace opa-gatekeeper --create-namespace
   ```

   {note:info}
   If Argo CD or Gatekeeper are installed in other namespaces, use them in the commands.
   {/note}
 
1. Make sure the pods are running:

   ```bash
   kubectl -n opa-gatekeeper get pods

# gatekeeper-audit-... and gatekeeper-controller-manager-... in the Running status
   ```

   The chart has a `gatekeeper-update-namespace-label` hook (it attaches an exception {linkto(../../reference/labels-and-taints#mk8s-labels-and-taints)[text=label]} to the namespace). On the VK Cloud platform, this `job` often fails (`BackoffLimitExceeded`), and `helm install` finishes with the `INSTALLATION FAILED` status. The Gatekeeper core itself is still installed and works (CRDs, webhook and pods are created). Verify this using the commands:
   
   ```console
   kubectl -n opa-gatekeeper get pods
   kubectl get crd | grep gatekeeper
   ```
   
   The `opa-gatekeeper` namespace is excluded in `match.excludedNamespaces`, so the absence of the label does not interfere.

## {heading({counter(ag)}. Get familiar with the solution architecture)[id=mk8s-ag-arch]}

```text
Git (source of truth)
   │  manifests
   ▼
Argo CD (SA argocd-application-controller)
   │  apply + tracking marker (annotation argocd.argoproj.io/tracking-id)
   ▼
Objects in the cluster  ──►  marked as "managed by GitOps"
   ▲
   │  UPDATE / DELETE
User (kubectl edit/delete)
   │
   ▼
Gatekeeper (admission) ──► DENY, if the initiator ≠ Argo CD and the object is marked
```

## {heading({counter(ag)}. Enable explicit object labeling in Argo CD)[id=mk8s-ag-mark]}

By default, Argo CD tracks objects by the `app.kubernetes.io/instance` label, which is often used by other tools and gets truncated by length. For an unambiguous marker, enable annotation tracking — then each managed object gets an annotation:

```text
argocd.argoproj.io/tracking-id: <app>:<group>/<kind>:<namespace>/<name>
```

To do this:

1. Set the tracking method in the Argo CD configuration. In the add-on, this is done via the {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-edit-code)[text=add-on configuration code]} in the `configs.cm` field:

   ```yaml
   configs:
     cm:

# annotation — annotation only; annotation+label — annotation and label (compatibility with UI filters)
       application.resourceTrackingMethod: annotation
   ```

1. Edit the add-on code or apply the change in the ConfigMap and restart the controller:

   ```bash
   kubectl -n argocd patch configmap argocd-cm --type merge \
     -p '{"data":{"application.resourceTrackingMethod":"annotation"}}'

   kubectl -n argocd rollout restart deployment/argocd-applicationset-controller statefulset/argocd-application-controller 2>/dev/null || \
   kubectl -n argocd rollout restart statefulset/argocd-application-controller
   ```

   Changing the tracking method via the management console is preferable, as it is resilient to add-on reinstallation or updates.

## {heading({counter(ag)}. Verify the labeling)[id=mk8s-ag-mark-check]}

1. Deploy a test application from Git via an Argo CD `Application` (example — a public demo repository). To do this, create the `app-guestbook.yaml` manifest:

   ```yaml

# app-guestbook.yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: guestbook
     namespace: argocd
   spec:
     project: default
     source:
       repoURL: https://github.com/argoproj/argocd-example-apps.git
       targetRevision: HEAD
       path: guestbook
     destination:
       server: https://kubernetes.default.svc
       namespace: gitops-demo
     syncPolicy:
       automated:
         prune: true
         selfHeal: true
       syncOptions:
         - CreateNamespace=true
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f app-guestbook.yaml

# wait for the synchronization, then make sure the object is marked with the marker:
   kubectl -n gitops-demo get deploy guestbook-ui \
     -o jsonpath='{.metadata.annotations.argocd\.argoproj\.io/tracking-id}{"\n"}'
   ```

   The command output should contain a string like `guestbook:apps/Deployment:gitops-demo/guestbook-ui`. This is the explicit indication of an object created by automation.

## {heading({counter(ag)}. Allow Gatekeeper to intercept DELETE operations)[id=mk8s-ag-allow]}

The Gatekeeper validation webhook by default checks only `CREATE` and `UPDATE`. To also prohibit manual deletion of GitOps objects, add the `DELETE` operation to the webhook configuration. To do this:

1. Check the current operations:

   ```bash
   kubectl get validatingwebhookconfiguration gatekeeper-validating-webhook-configuration \
     -o jsonpath='{range .webhooks[*]}{.name}{" -> "}{.rules[*].operations}{"\n"}{end}'
   ```

1. Add `DELETE` to the rule of the main `validation.gatekeeper.sh` webhook:

   ```bash
   kubectl patch validatingwebhookconfiguration gatekeeper-validating-webhook-configuration \
     --type=json \
     -p='[{"op":"add","path":"/webhooks/0/rules/0/operations/-","value":"DELETE"}]'
   ```

The `/webhooks/0` index corresponds to the `validation.gatekeeper.sh` webhook. Compare with the command output from the previous subsection, and if the order is different, adjust the index. The second webhook (`check-ignore-label.gatekeeper.sh`) does not need to be touched.

For `DELETE` operations, the object being checked arrives in `oldObject` (and `object` is empty) — this is accounted for in the `Rego` below.

{note:info} 
If the scope is too broad, checking `DELETE`/`UPDATE` across all resources can load the `admission`. Below, the scope is limited to namespaces and (optionally) specific types.
{/note}

## {heading({counter(ag)}. Exclude system namespaces)[id=mk8s-ag-exclude]}

To keep the policy from interfering with the platform controllers and the add-ons themselves, exclude the service namespaces. They can be set both globally in the Gatekeeper `Config` object and in the constraint itself in `match.excludedNamespaces`. The list for exclusion (adjust it for your cluster):

- `kube-system`;
- `kube-public`;
- `kube-node-lease`;
- `opa-gatekeeper`;
- `argocd`;
- `monitoring` or `prometheus-monitoring`;
- `ingress-nginx`.

## {heading({counter(ag)}. Create a rule prohibiting manual changes)[id=mk8s-ag-template]}

The constraint template for prohibiting manual changes (ConstraintTemplate) describes the following logic: if an object is marked with the Argo CD marker and the operation is `UPDATE`/`DELETE`, while the initiator is not in the `allowlist`, the change is prohibited.

The names of status objects must be short in accordance with the Gatekeeper rules:

- The `metadata.name` of the template must have the `kind` value in lowercase, otherwise the error `name is not equal to the lowercase of CRD's Kind` will occur. Therefore, for `kind: GitOps` it is `name: gitops`.

- Gatekeeper forms the names of service status objects as `<pod-name-with-doubled-hyphens>-<template>[-<constraint>]`. On the VK Cloud platform, Gatekeeper pod names are long, for example, `gatekeeper-controller-manager-<rs>-<id>`, and with long `kind` values and names, the result exceeds the 63-character limit. Because of this, the status object is rejected by Gatekeeper itself with the error `resource cannot have metadata.name larger than 63 char`, the constraint is not loaded onto the webhook pods, and with `failurePolicy: Ignore` (the default value), `admission` silently passes requests, and the policy does not work without an explicit error. Therefore, the `kind`/`Constraint` names must be short (`GitOps`, `gp`, and so on).

1. Create the `ct-gitops-protected.yaml` manifest:

   ```yaml

# ct-gitops-protected.yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: gitops               # MUST == lowercase(kind)
     annotations:
       metadata.gatekeeper.sh/title: "GitOps Protected Objects"
       description: >-
         Prohibits manual changes and deletion of objects marked
         with the Argo CD tracking marker. Changes are only possible via Git (Argo CD).
   spec:
     crd:
       spec:
         names:
           kind: GitOps         # short kind value
         validation:
           openAPIV3Schema:
             type: object
             properties:
               trackingAnnotation:
                 type: string
                 description: "Annotation marker of a managed object."
               allowServiceAccounts:
                 type: boolean
                 description: "Allow changes by any ServiceAccount (controllers)."
               allowedUsers:
                 type: array
                 items:
                   type: string
                 description: "Exact list of allowed users/ADC (emergency access, Argo CD)."
               allowedGroups:
                 type: array
                 items:
                   type: string
                 description: "Allowed groups (for example, the emergency admin group)."
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package gitops

# Marker key (by default — the Argo CD tracking annotation)
           tracking_key = k { k := input.parameters.trackingAnnotation }
           tracking_key = "argocd.argoproj.io/tracking-id" {
             not input.parameters.trackingAnnotation
           }

# Object annotations: for DELETE take oldObject, otherwise object
           annotations[key] = value {
             input.review.operation != "DELETE"
             value := input.review.object.metadata.annotations[key]
           }
           annotations[key] = value {
             input.review.operation == "DELETE"
             value := input.review.oldObject.metadata.annotations[key]
           }

# Object name for the message
           obj_name = n { input.review.operation != "DELETE"; n := input.review.object.metadata.name }
           obj_name = n { input.review.operation == "DELETE"; n := input.review.oldObject.metadata.name }

           is_protected { annotations[tracking_key] }

           is_write_op { input.review.operation == "UPDATE" }
           is_write_op { input.review.operation == "DELETE" }

           username := input.review.userInfo.username

# Permissions (allowlist)
           is_allowed { username == input.parameters.allowedUsers[_] }
           is_allowed {
             input.parameters.allowServiceAccounts == true
             startswith(username, "system:serviceaccount:")
           }
           is_allowed { input.review.userInfo.groups[_] == input.parameters.allowedGroups[_] }

           violation[{"msg": msg}] {
             is_write_op
             is_protected
             not is_allowed
             msg := sprintf(
               "The object '%v' is managed by GitOps (Argo CD, marker %v). The operation '%v' by the user '%v' is prohibited: make changes via the Git repository.",
               [obj_name, tracking_key, input.review.operation, username]
             )
           }
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f ct-gitops-protected.yaml

# wait until the template is compiled and the constraint CRD becomes Established:
   kubectl get constrainttemplate gitops -o jsonpath='{.status.created}{"\n"}'
   kubectl get crd gitops.constraints.gatekeeper.sh \
     -o jsonpath='{.status.conditions[?(@.type=="Established")].status}{"\n"}'
   ```

With the `allowServiceAccounts: true` parameter, the policy blocks manual user actions (for example: `kubectl edit` or `kubectl delete`), but does not interfere with the controllers (HPA changes replicas, the operator changes its CRs, and so on) or with Argo CD itself. If you need a stricter mode, set `allowServiceAccounts: false` and list the allowed [service accounts](/ru/access/iam/concepts/service-accounts#iam-concepts-service-accounts) in `allowedUsers` (at minimum, Argo CD).

## {heading({counter(ag)}. Create the scope (Constraint) and allowlist)[id=mk8s-ag-constraint]}

Start with the “soft” `enforcementAction: dryrun` mode to see the triggers without blocking, and then switch to the `deny` mode.

1. Create the `constraint-gitops-protected.yaml` manifest:

   ```yaml

# constraint-gitops-protected.yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: GitOps
   metadata:
     name: gp                    # short name
   spec:
     enforcementAction: dryrun   # rollout stages: dryrun -> warn -> deny
     match:

# limit to the top-level types managed by Argo CD
       kinds:
         - apiGroups: ["apps"]
           kinds: ["Deployment", "StatefulSet", "DaemonSet"]
         - apiGroups: [""]
           kinds: ["Service", "ConfigMap", "Secret", "ServiceAccount"]
         - apiGroups: ["networking.k8s.io"]
           kinds: ["Ingress"]
       excludedNamespaces:
         - kube-system
         - kube-public
         - kube-node-lease
         - opa-gatekeeper
         - argocd
         - monitoring
         - prometheus-monitoring
         - ingress-nginx
     parameters:
       trackingAnnotation: "argocd.argoproj.io/tracking-id"
       allowServiceAccounts: true
       allowedUsers:

# Argo CD SA (creates/changes/deletes objects during sync and prune)
         - "system:serviceaccount:argocd:argocd-application-controller"
         - "system:serviceaccount:argocd:argocd-server"
       allowedGroups:

# optionally: the emergency (break-glass) administrator group

# - "gitops-break-glass"
         []
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f constraint-gitops-protected.yaml
   ```

   If the error `missing ConstraintTemplate: template "gitops" not found` appears, it means Gatekeeper has not yet registered the new constraint kind. Wait until the `gitops.constraints.gatekeeper.sh` CRD gets the `Established` status, and apply the manifest again.

1. Check that the constraint has been loaded onto all pods, otherwise with `failurePolicy: Ignore` the protection does not work on some of the webhook pods:

   ```bash
   kubectl get gitops gp -o jsonpath='{range .status.byPod[*]}{.id}{"="}{.enforced}{"\n"}{end}'

# all gatekeeper-controller-manager-* and gatekeeper-audit-* pods should have =true
   ```

   If some pod does not have the line, or the `enforced` parameter value is not `true`, it is almost always [exceeding the 63-character limit](#mk8s-ag-template) in the status object name. In this case, shorten the `kind` parameter value and the constraint name. To check for the presence of status objects, run the command:

   ```console
   kubectl get constraintpodstatuses -n opa-gatekeeper | grep gitops
   ```
1. Check the Argo CD service account name in your cluster — `argocd-application-controller`, `argocd-server` in the `argocd` namespace:

   ```bash
   kubectl -n argocd get sa | grep -E 'application-controller|argocd-server'
   ```

1.  Fix `allowedUsers` if needed. The exact `username` in the request has the form `system:serviceaccount:<namespace>:<sa>`.

## {heading({counter(ag)}. (Optionally) Protect the marker from removal)[id=mk8s-ag-protect]}

To prevent an object from being detached from GitOps by deleting the annotation marker and then freely edited, add a rule that will prohibit `UPDATE`. The names must also be short (`kind: GitMark`, `name: gitmark`).

1. Create the `ct-gitops-marker-protect.yaml` manifest:

   ```yaml

# ct-gitops-marker-protect.yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: gitmark               # == lowercase(kind)
   spec:
     crd:
       spec:
         names:
           kind: GitMark
         validation:
           openAPIV3Schema:
             type: object
             properties:
               trackingAnnotation: { type: string }
               allowedUsers: { type: array, items: { type: string } }
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package gitmark

           tracking_key = k { k := input.parameters.trackingAnnotation }
           tracking_key = "argocd.argoproj.io/tracking-id" { not input.parameters.trackingAnnotation }

           username := input.review.userInfo.username
           is_allowed { username == input.parameters.allowedUsers[_] }
           is_allowed { startswith(username, "system:serviceaccount:") }

           violation[{"msg": msg}] {
             input.review.operation == "UPDATE"
             input.review.oldObject.metadata.annotations[tracking_key]      # the marker WAS PRESENT
             not input.review.object.metadata.annotations[tracking_key]     # the marker is ABSENT
             not is_allowed
             msg := sprintf("The GitOps marker '%v' must not be removed from the object '%v'.", [tracking_key, input.review.object.metadata.name])
           }
   ```
1. Create the `constraint-gitops-marker-protect.yaml` manifest:

   ```yaml

# constraint-gitops-marker-protect.yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: GitMark
   metadata:
     name: gm
   spec:
     enforcementAction: deny
     match:
       excludedNamespaces: ["kube-system","kube-public","kube-node-lease","opa-gatekeeper","argocd","monitoring","prometheus-monitoring","ingress-nginx"]
     parameters:
       trackingAnnotation: "argocd.argoproj.io/tracking-id"
       allowedUsers: []
   ```

1. Apply the manifests:

   ```bash
   kubectl apply -f ct-gitops-marker-protect.yaml -f constraint-gitops-marker-protect.yaml
   ```

## {heading({counter(ag)}. Test the policy)[id=mk8s-ag-protect]}

Make sure that:

1. The constraint is loaded and running on all pods:

   ```bash
   kubectl get constrainttemplate
   kubectl get gitops gp -o jsonpath='{range .status.byPod[*]}{.id}{"="}{.enforced}{"\n"}{end}'
   ```

1. A manual change to a GitOps object is rejected (in the `deny` mode):

   ```bash
   kubectl -n gitops-demo annotate deploy guestbook-ui demo.test/manual=1 --overwrite

# Error from server (Forbidden): admission webhook "validation.gatekeeper.sh" denied the request:

# [gp] The object 'guestbook-ui' is managed by GitOps (Argo CD, marker argocd.argoproj.io/tracking-id).

# The operation 'UPDATE' by '<your-user>' is prohibited: make changes via Git.
   ```

1. Manual deletion is rejected:

   ```bash
   kubectl -n gitops-demo delete deploy guestbook-ui

# Error from server (Forbidden): ... Operation 'DELETE' ... is forbidden ...

1. Argo CD continues to manage the object: `selfHeal` reverts the changes, `sync`/`prune` succeed because the actions are performed by the `argocd-application-controller` service account from the `allowlist`. The application remains in the `Synced/Healthy` state.

1. An unmarked (manually created) object can be modified freely: `kubectl create deployment manual-nginx ...` commands followed by `annotate`/`delete` pass without a denial (no marker — no protection).

1. A change via the `scale` subresource is not blocked**: the `kubectl scale deploy guestbook-ui --replicas=3` command succeeds.

   Reason: the request goes to the `deployments/scale` subresource, and the admission receives a `Scale` object without the marker annotation, so the rule does not catch it (which also allows HPA to work). Replica drift can be addressed via Argo CD `selfHeal` (it will restore the value from Git) or by denying `scale` in Kubernetes RBAC.

1. In `dryrun`/`warn` mode there is no actual blocking — check triggers in `audit`:

   ```bash
   kubectl -n opa-gatekeeper logs deploy/gatekeeper-audit --tail=100 | grep -i gitops
   kubectl get gitops gp -o yaml | sed -n '/status:/,$p'
   ```

## {heading({counter(ag)}. Gradually adopt the enforcementAction modes)[id=mk8s-ag-stages]}

The `enforcementAction` parameter has the following modes:

- `dryrun` — only records violations in the status/audit, blocks nothing. Collect the list of accounts that need to be added to the `allowlist`.
- `warn` — the user sees a warning in `kubectl`, but the operation succeeds.
- `deny` — operations are blocked.

To switch the mode, run the command:

```bash
kubectl patch gitops gp \
  --type merge -p '{"spec":{"enforcementAction":"deny"}}'
```

## {heading({counter(ag)}. Configure additional protection on the Argo CD side)[id=mk8s-ag-additional]}

Duplicate the control using Argo CD by configuring:

- `syncPolicy.automated.selfHeal: true`: Argo CD automatically reverts any drift from Git (if a change still got through).
- `prune: true`: deletes objects removed from Git (single lifecycle).
- Argo CD RBAC (`configs.rbac`): restrict who can perform `sync`, `override` and `delete` operations in Argo CD itself.
- {linkto(../../concepts/iam-access#mk8s-concepts-iam)[text=Access management in Managed Containers]}: in application namespaces, grant users the `Kubernetes Auditor` role and leave write permissions only to automation. Roles are [assigned](/en/access/iam/instructions/access-manage#iam-access-manage-user-role-edit) via the personal dashboard and role bindings within the namespace.

Thus, RBAC restricts the circle of people, Gatekeeper blocks manual manipulation of marked objects, and Argo CD restores the state from Git.

## {heading({counter(ag)}. Run diagnostics)[id=mk8s-ag-diagnostics]}

[cols="1a,2a", options="header"]
|===
| Symptom 
| Cause/solution

| The policy is not triggered and does not produce an error
| The constraint did not load onto the webhook pods due to the 63-character limit in the status object name. Shorten the constraint `kind` or name

| `missing ConstraintTemplate: ... not found` when creating a constraint
| Wait for `Established` on the CRD `gitops.constraints.gatekeeper.sh` and retry `apply`

| `name is not equal to the lowercase of CRD's Kind`
| The template's `metadata.name` does not equal the lowercase value of `kind`. Make them match, e.g. `GitOps` → `gitops`

| The policy is not triggered on `UPDATE`
| The object is not marked with `argocd.argoproj.io/tracking-id` (see [step 3](#mk8s-ag-mark)), or the `enforcementAction` parameter is not set to `deny` mode

| `DELETE` is not blocked
| The `DELETE` operation is not added to the webhook (see [step 5](#mk8s-ag-allow)). Check the `validatingwebhookconfiguration`

| `kubectl scale` is not blocked
| Expected: the `deployments/scale` subresource has no marker. Use Argo CD `selfHeal` or RBAC

| Argo CD cannot synchronize (`Forbidden`)
| The wrong Argo CD service account in `allowedUsers`; verify with `kubectl -n argocd get sa` → `system:serviceaccount:argocd:...`

| Controllers break (HPA and so on)
| Set `allowServiceAccounts: true` or add their service accounts to the `allowlist`; exclude their namespaces

| Template compilation error
| `kubectl get constrainttemplate gitops -o yaml` → `status` block with the Rego error

| Emergency access is needed
| Temporarily add the user/group to `allowedUsers`/`allowedGroups` or switch the constraint to `dryrun` mode
|===

{note:info}
`failurePolicy: Ignore` on the `validation.gatekeeper.sh` webhook is the default value: if OPA is unavailable or the constraint has not loaded, admission requests pass through (fail-open). For strict security, you can switch it to `Fail`, but this increases the risk of API unavailability in case of Gatekeeper issues.
{/note}

Useful commands:

```bash
kubectl get constraints
kubectl get constraintpodstatuses -n opa-gatekeeper | grep gitops
kubectl -n opa-gatekeeper logs deploy/gatekeeper-controller-manager --tail=200
kubectl -n opa-gatekeeper logs deploy/gatekeeper-audit --tail=200
```

## {heading(Delete unused resources)[id=mk8s-ag-remove]}

A running cluster is billed and consumes compute resources. If you no longer need the Kubernetes resources created for this how-to guide, delete them:

1. Run the commands:

   ```bash
   kubectl delete gitops gp 2>/dev/null
   kubectl delete gitmark gm 2>/dev/null
   kubectl delete constrainttemplate gitops gitmark 2>/dev/null

# to return the webhook to the default operations (remove DELETE) if needed —

# edit the validatingwebhookconfiguration gatekeeper-validating-webhook-configuration

1. Delete the test application:

   ```console
   kubectl delete -f app-guestbook.yaml  
   ```

1. Delete Gatekeeper:

   ```console
   helm delete gatekeeper --namespace opa-gatekeeper
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

{include(/en/_includes/_delete-test-cluster-short.md)}