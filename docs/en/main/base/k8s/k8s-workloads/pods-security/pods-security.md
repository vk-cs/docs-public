Pods can access various information and components of a Kubernetes cluster. Also, with certain pod settings, the pods themselves and the Kubernetes cluster in which they run can be vulnerable to attacks.

In a Kubernetes cluster using [installed Gatekeeper](/docs/en/base/k8s/k8s-addons/k8s-gatekeeper/k8s-opa) you can apply constraints (constraints). These constraints are created from constraint templates. You can [create your own patterns and restrictions](/docs/en/base/k8s/k8s-addons/k8s-gatekeeper/k8s-policy).

In addition, Kubernetes VK Cloud clusters already contain [preconfigured templates and restrictions] (#prednastroennye-shablony-i-ogranicheniya-gatekeeper) aimed at improving the security of deployed workload operation.

## Preconfigured gatekeeper patterns and restrictions

<warn>

Disabling or modifying these patterns and restrictions can reduce the security of your Kubernetes cluster.

</warn>

### Host-namespaces limit

**Description:**

This restriction prevents Pods from running with the `hostPID: true` option.

If you do not prevent the pod from starting with this option, then the pod will have the following capabilities:

- View all processes running on the host.
- Forced termination of any process on the host with a `kill` command sent from a pod.
- Reading the environment variables for each pod on the host by accessing the file `/proc/[PID]/environ` for each process.

Such possibilities are very wide and are considered vulnerabilities in themselves, as they can lead to the disclosure of sensitive environment variables, process manipulation and facilitating the exploitation of other vulnerabilities.

**Restriction action example:**

<details>
<summary>Manifest pod_namespace.yaml not satisfying constraint</summary>

<!-- prettier-ignore -->
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-host-namespace-disallowed
  labels:
    app: nginx-host-namespace
spec:
  hostPID: true
  hostIPC: true
  containers:
    - name: nginx
      image: nginx
```

</details>

Trying to apply such a manifest with `kubectl apply -f pod_namespace.yaml` will result in a similar constraint violation message for the pod being created:

```text
Error from server ([...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed): error when creating "pod_namespace.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [. ..] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed
```

A pod that violates the constraint will not be created.

### host-filesystem limit

**Description:**

This restriction prevents mounting in a sub directory of the host where the sub is running. Thus, the protection of the cluster data that is located on this host is ensured.

**Restriction action example:**

<details>
<summary>Manifest pod_filesystem.yaml not satisfying constraint</summary>

<!-- prettier-ignore -->
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-host-filesystem
  labels:
    app:nginx-host-filesystem-disallowed
spec:
  containers:
    - name: nginx
      image: nginx
      volumeMounts:
        - mountPath: /cache
          name: cache-volume
          readOnly: true
  volumes:
    - name: cache-volume
      hostpath:
        path: /tmp # directory on host
```

</details>

Trying to apply such a manifest with `kubectl apply -f pod_filesystem.yaml` will result in a similar constraint violation message for the pod being created:

```text
Error from server ([...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem.Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]): error when creating "pod_filesystem.yaml": admission webhook "validation.gatekeeper.sh" denied the request : [...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host -filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]
```

A pod that violates the constraint will not be created.
