In Cloud Containers, an [audit policy](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/#audit-policy) is configured for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) Kubernetes clusters you create. This policy determines which [Kubernetes API](/en/kubernetes/k8s/concepts/architecture#kubernetes-api-integration) events in the cluster and to what extent are logged into the [Cloud Audit](/en/monitoring-services/event-log/concepts/about) service on the VK Cloud platform. This audit policy is configured for all clusters you create in the Cloud Containers service, and you cannot change it.

The audit policy helps to:

- Ensure that clusters meet the configured security requirements.
- Monitor cluster activities, errors, and attempts to gain unauthorized access.
- Prevent and investigate security incidents in clusters.

The audit policy defines the rules that all events in the cluster go through one by one. If an event fits a rule, it is applied. Whether the event gets logged depends on the configured audit level and additional settings.

## {heading(Audit policy structure)[id=policy-structure]}

Following is the full file with audit policy settings for second-generation Kubernetes clusters.

{cut(Audit policy file)}
```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
  - "ResponseStarted"

rules:
  - level: None
    users: ["system:kube-proxy"]
    verbs: ["watch"]
    resources:
      - group: ""
        resources: ["endpoints", "services", "services/status"]
  - level: None
    users: ["kubelet"] # Legacy kubelet identity.
    verbs: ["get"]
    resources:
      - group: ""
        resources: ["nodes", "nodes/status"]
  - level: None
    userGroups:
      [
        "system:nodes",
        "system:serviceaccounts",
        "calico-node",
        "calico-kube-controllers",
        "system:kube-controller-manager",
        "system:kube-scheduler",
        "cluster-autoscaler",
        "system:serviceaccounts:monitoring",
        "csi-cinder-controller-sa",
      ]
    verbs: ["get", "list", "watch"]
  - level: None
    users: ["system:apiserver"]
    verbs: ["get", "list", "watch"]
  - level: None
    nonResourceURLs:
      - /healthz*
      - /version
      - /swagger*
      - /livez
  - level: None
    resources:
      - group: ""
        resources: ["events"]
      - group: "coordination.k8s.io"
        resources: ["leases"]
  - level: None
    userGroups:
      [
        "calico-kube-controllers",
        "system:serviceaccount:kube-system:calico-node",
      ]
    resources:
      - group: "crd.projectcalico.org"
        resources: ["tiers"]
  - level: None
    users: ["cluster-autoscaler"]
    verbs: ["update"]
    namespaces: ["kube-system"]
    resources:
      - group: ""
        resources: ["configmaps", "endpoints"]

  - level: RequestResponse
    users: ["system:anonymous"]

  - level: Metadata
    resources:
      - group: ""
        resources: ["secrets", "configmaps", "serviceaccounts/token"]
      - group: authentication.k8s.io
        resources: ["tokenreviews"]

  - level: RequestResponse
    verbs: ["create", "update", "patch", "delete"]
    resources:
      - group: ""
      - group: "admissionregistration.k8s.io"
      - group: "authentication.k8s.io"
      - group: "authorization.k8s.io"
      - group: "certificates.k8s.io"
      - group: "networking.k8s.io"
      - group: "policy"
      - group: "rbac.authorization.k8s.io"
      - group: "settings.k8s.io"
      - group: "storage.k8s.io"

  - level: Request
    verbs: ["create", "update", "patch", "delete"]

  - level: Metadata
    verbs: ["get", "list", "watch"]
```
{/cut}

Here:

- The `omitStages` block specifies the stages of processing requests to the Kubernetes API that do not need to be logged:

   - `RequestReceived` — receiving a request
   - `ResponseStarted` — starting to form the response

  This helps to reduce the amount of logs, as these stages do not contain critical information for audit purposes.

- The `rules` block contains specific rules of the audit policy. For each rule, the following is configured:

   - `level` — The audit level. This is the level of detail with which Kubernetes must log events:
      - `None` — The specified resources and events are excluded from the audit and are not logged.
      - `Metadata` — Only the request metadata is logged (for example, username, time, resource type, method), but not the contents of the resource (for example, the contents of the secret, token, configuration).
      - `Request` — The entire request is logged, but not the response.
      - `RequestResponse` — Both the request and the response are logged, meaning a full audit of the events is performed.
   
   - `users`, `userGroups` — The user or group of users the rule is defined for.
   - `verbs` — Operations (`watch`, `create`, `update`, `patch`, `delete`) on a user or group of users that, depending on the level, need or do not need to be logged. For more details on these operations, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/reference/using-api/api-concepts/#api-verbs).
   - `resources` — Cluster resources the rule is applied to.

## {heading(Which events get logged into the audit log)[id=included-in-audit]}

- All change requests (`create`, `update`, `patch`, `delete`) at the `RequestResponse` level:

    - For all requests from anonymous users `system:anonymous`.
    - For all requests to change the resources listed in the rule that are not covered by other rules.

- All requests to sensitive resources (`secrets`, `configmaps`, `serviceaccounts/token`, `tokenreviews`) at the `Metadata` level.
- Read requests (`get`, `list`, `watch`) at the `Metadata` level for most of the resources that are not covered by other rules.
- All other change requests (`create`, `update`, `patch`, `delete`) at the `Request` level for the resources that are not covered by other rules.

## {heading(Which events are excluded from the audit log)[id=excluded-from-audit]}

- `watch` requests for the `endpoints`, `services`, and `services/status` resources from the `kube-proxy` system user.   
- `get` requests for the `nodes`, `nodes/status` resources from the kubelet services.
- Bulk read requests (`get`, `list`, `watch`) for the following system components and service accounts:
     
  - `system:nodes`;
  - `system:serviceaccounts`;
  - `calico-node`;
  - `calico-kube-controllers`;
  - `system:kube-controller-manager`;
  - `system:kube-scheduler`;
  - `cluster-autoscaler`;
  - `system:serviceaccounts:monitoring`;
  - `csi-cinder-controller-sa`.

  This approach helps to significantly reduce the amount of logs.
- Read requests (`get`, `list`, `watch`) for special Kubernetes API endpoints: `healthz`, `livez`, `version`, `swagger`. These endpoints are designed to check the status of the API server itself, not to work with cluster resources.
- Read requests (`get`, `list`, `watch`) for the API server events from the `system:apiserver` user.
- Any events of the specialized `events` and `leases` resources, as well as the `tiers` resources for the Calico service accounts.
- Updates of the `configmaps` and `endpoints` resources in the `kube-system` namespace for the `cluster-autoscaler` user.
