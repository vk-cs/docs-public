The Kubernetes VK Cloud clusters already have certain settings applied, listed below.

## kube-proxy operation mode

The Kubernetes network proxy runs on each node, providing access to IP addresses of services and other Kubernetes resources.

This proxy can work in [several modes](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/#options), they are listed in the `--proxy-mode` setting description. In Kubernetes VK Cloud clusters, the proxy works in `iptables` mode. This mode of operation affects:

- [the behavior of load balancers](../../../use-cases/load-balancer);
- [on the behavior and settings of the local caching DNS server](../../../use-cases/local-dns-cache).

## Limits settings for pods

When working with pods [it is recommended to specify](../../../k8s-reference/resource-limiting) in their configuration files `requests` and `limits` parameters for containers included in this pod.

If these parameters are not specified, Kubernetes VK Cloud clusters automatically apply the values for the corresponding containers:

- `requests`: 100m CPU and 64Mb allocated memory.
- `limits`: 500m CPU and 512Mb allocated memory.

This prevents a container running incorrectly from exhausting all of the resources of a single worker node or even the entire cluster.

## Pre-configured Gatekeeper templates and constraints

<warn>

Disabling or changing these templates and constraints can reduce the security of the Kubernetes cluster. Any problems with the cluster that arise directly or indirectly due to disabling the settings below must be resolved by the customer themselves.

</warn>

Templates are available for clusters starting with Kubernetes version 1.21. For older versions, [manually install Gatekeeper](../../../install-tools/gatekeeper) and the above templates and restrictions, or upgrade the cluster. For more information about Gatekeeper, see [Architecture](../../architecture).

<tabs>
<tablist>
<tab>host-namespaces<br>constraint</tab>
<tab>host-filesystem<br>constraint</tab>
</tablist>
<tabpanel>

**Description:**.

This constraint prohibits running pods with the `hostPID: true` option.

A pod launched with this option will have the following capabilities:

- View all processes running on the host.
- Force termination of any process on the host by a `kill` command sent from the pod.
- Read environment variables for each pod on the host by accessing the `/proc/[PID]/environ` file for each process.

Such capabilities are very broad and are themselves considered vulnerabilities, as they can expose sensitive environment variables and manipulate processes, as well as facilitate exploitation of other vulnerabilities.

**Example of how the constraint acts:**

<details>
<summary>The pod_namespace.yaml manifest that does not satisfy the constraint</summary>

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

If you try to apply such a manifest with `kubectl apply -f pod_namespace.yaml`, you will get a similar message saying that the constraint for the pod has been violated:

```text
Error from server ([...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed): error when creating "pod_namespace.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed
```

</tabpanel>
<tabpanel>

**Description:**

This restriction prevents pod from mounting the subdirectories of the host on which the pod is running. This protects the cluster data that resides on this host.

**Example of how the constraint acts:**

<details>
<summary>The pod_filesystem.yaml manifest that does not satisfy the constraint</summary>

<!-- prettier-ignore -->
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-host-filesystem
  labels:
    app: nginx-host-filesystem-disallowed
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
      hostPath:
        path: /tmp # directory on host
```

</details>

If you try to apply such a manifest with `kubectl apply -f pod_filesystem.yaml`, you will get a similar message saying that the constraint for the pod has been violated:

```text
Error from server ([...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]): error when creating "pod_filesystem.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]
```

</tabpanel>
</tabs>

The pod that violated the constraint will not be created.
