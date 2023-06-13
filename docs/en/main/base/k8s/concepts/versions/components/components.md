The supported versions of components and [addons](../../addons-and-settings/addons) depend on the version of the Kubernetes VK Cloud cluster.

When [updating a cluster](../../../operations/update), its components and installed addons are also updated.

## Components

These components are present in all Kubernetes VK Cloud clusters.

<!-- prettier-ignore -->
| Component                                                             | Kubernetes 1.21.4–1.22.x  | Kubernetes 1.23.x–1.24.x  |
| --------------------------------------------------------------------- | ------------------------- | ------------------------- |
| [Calico](https://github.com/projectcalico/calico)                     | 3.20.2    | 3.25.0    |
| [Gatekeeper](https://github.com/open-policy-agent/gatekeeper)         | 3.7.0     | 3.11.0    |
| [Kubernetes Dashboard](https://github.com/kubernetes/dashboard)       | 2.3.1     | 2.7.0     |
| [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)   | 0.5.0     | 0.6.1     |
| [Shell-operator](https://github.com/flant/shell-operator)             | 1.0.9     | 1.0.9     |

## Addons

The necessary addons can be [installed](../../../operations/addons/manage-addons#installing-the-addon) in the cluster individually.

<!-- prettier-ignore -->
| Addon                                                                             | Kubernetes 1.21.4–1.22.x  | Kubernetes 1.23.x–1.24.x  |
| --------------------------------------------------------------------------------- | ------------------------- | ------------------------- |
| [Docker Registry](https://github.com/twuni/docker-registry.helm)                  | 2.2.2     | 2.2.2     |
| [Ingress NGINX](https://github.com/kubernetes/ingress-nginx)                      | 4.1.4     | 4.1.4     |
| [Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)   | 36.2.0    | 36.2.0    |
