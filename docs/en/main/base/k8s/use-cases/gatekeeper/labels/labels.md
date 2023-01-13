With [Gatekeeper](../../../k8s-reference/gatekeeper) you can set a constraint that will require a specific label for created Kubernetes resources. For example, this constraint can be useful if company policies require the creator name of any Kubernetes resources to facilitate auditing and parsing of potential incidents.

To demonstrate how Gatekeeper works, the following will be created:

- A constraint template and its corresponding constraint. It will require a `creator-name` label in Kubernetes resources that are created in any namespaces (except system namespaces).
- A few Kubernetes resources to test how the constraint works.

## Preparatory steps

1. [Create](../../../operations/create-cluster) a Kubernetes cluster of the most current version.

   Choose the cluster parameters at your own discretion.

1. [Make sure](../../../connect/kubectl) that you can connect to the cluster with `kubectl`.

## Create a constraint that checks labels

1. Create a constraint template:

   1. Create a constraint template manifest.

      Use [the contents of this file](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/requiredlabels/template.yaml). This is a ready-made template `K8sRequiredLabels` from [Gatekeeper library](https://github.com/open-policy-agent/gatekeeper-library), which checks if the Kubernetes resource has the specified labels.

   1. Create a restriction template based on the template manifest:

      ``yaml
      kubectl apply -f template.yaml
      ```

1. Create a constraint:

   1. Create a restriction manifest based on the template created earlier:

      <details>
      <summary markdown="span">constraint.yaml</summary>

      ```yaml
      apiVersion: constraints.gatekeeper.sh/v1beta1
      kind: K8sRequiredLabels
      metadata:
        name: require-creator-label
      spec:
        match:
          kinds:
            - apiGroups: [""]
              kinds: ["Namespace"]
          excludedNamespaces: ["kube-system"]
        parameters:
          labels:
            - key: creator-name
              allowedRegex: "(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?"
      ```

      </details>

   1. Create a constraint based on the constraint manifest:

      ```yaml
      kubectl apply -f constraint.yaml
      ```

1. Make sure that the constraint template and the constraint have been successfully created by running the command:

   ```yaml
   kubectl get constraints,constrainttemplates
   ```

   Output should give you the similar information:

   ```text
   NAME                                                              ENFORCEMENT-ACTION TOTAL-VIOLATIONS
   k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label ...                ... 

   NAME                                                              AGE
   ...
   constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels      ...
   ```

1. Test the restriction by trying to create several namespaces:

   <tabs>
   <tablist>
   <tab>Namespace that satisfies the constraint</tab>
   <tab>Namespace that does not satisfy the constraint</tab>
   </tablist>
   <tabpanel>

   1. Create a manifest for the namespace:

      <details>
      <summary markdown="span">example-allowed.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: allowed-namespace
        labels:
          creator-name: john.doe
      ```

   1. Try to create a namespace based on the manifest:

      ```yaml
      kubectl apply -f example-allowed.yaml
      ```

      The operation should be completed successfully.

   1. Make sure that the namespace has been successfully created by running the command:

      ```yaml
      kubectl get ns allowed-namespace
      ```

      Output should give you the similar information:

      ```text
      NAME                STATUS   AGE
      allowed-namespace   Active   ...
      ```

   </tabpanel>
   <tabpanel>

   1. Create a manifest for the namespace:

      <details>
      <summary markdown="span">example-disallowed.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: disallowed-namespace
        labels:
          my-label: sample
      ```

   1. Try to create a namespace based on the manifest:

      ```yaml
      kubectl apply -f example-disallowed.yaml
      ```

      The operation should end with an error:

      ```text
      Error from server (Forbidden): error when creating ".\\example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-creator-label] you must provide labels: {"creator-name"}
      ```

   1. Make sure that the namespace has not been created by running the command:

      ```yaml
      kubectl get ns disallowed-namespace
      ```

      Output should give you the similar information:

      ```text
      Error from server (NotFound): namespaces "disallowed-namespace" not found
      ```

   </tabpanel>
   </tabs>

## Control the usage of resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete ns allowed-namespace
   kubectl delete k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete ns allowed-namespace; `
   kubectl delete k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label; `
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels
   ```

   </tabpanel>
   </tabs>

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../../operations/manage-cluster#start-or-stop-the-cluster) it to use it later;
   - [delete](../../../operations/manage-cluster#delete-cluster) it permanently.
