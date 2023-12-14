The supported versions of components and [addons](../../addons-and-settings/addons) depend on the version of the Cloud Containers cluster.

When [updating a cluster](../../../operations/update), part of its components are also updated, as well the installed addons. If a component, that is to be updated with the cluster, is deleted, then it will be restored during the next cluster update.

## Components

These components are present in all Cloud Containers clusters.

<!-- prettier-ignore -->
| Component                                                           | Kubernetes 1.21.4–1.22.x  | Kubernetes 1.24.x–1.25.x  | Kubernetes 1.27.x |
| ------------------------------------------------------------------- | ------------------------- | ------------------------- | ----------------- |
| [CoreDNS](https://github.com/coredns/coredns)                         | 1.2.4     | 1.10.1    | 1.10.1 |
| [Calico](https://github.com/projectcalico/calico)                     | 3.20.2    | 3.25.0    | 3.26.1 |
| [Gatekeeper](https://github.com/open-policy-agent/gatekeeper)         | 3.7.0     | 3.11.0    | 3.12.0 |
| [Helm](https://github.com/helm/helm)                                  | 3.11.3    | 3.11.3    | 3.12.2 |
| [Kubernetes Dashboard](https://github.com/kubernetes/dashboard)       | 2.3.1     | 2.7.0     | 2.7.0  |
| [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)   | 0.5.0     | 0.6.1     | 0.6.1  |
| [Shell-operator](https://github.com/flant/shell-operator)             | 1.0.9     | 1.0.9     | 1.0.9  |

## Addons

The necessary addons can be [installed](../../../operations/addons/manage-addons#installing_the_addon) in the cluster individually.

<!-- prettier-ignore -->
| Addon                                                                             | Kubernetes 1.21.4–1.22.x  | Kubernetes 1.24.x–1.27.x  |
| --------------------------------------------------------------------------------- | ------------------------- | ------------------------- |
| [cert-manager](https://github.com/cert-manager/cert-manager)                      | —         | 1.12.2    |
| [Docker Registry](https://github.com/twuni/docker-registry.helm)                  | 2.2.2     | 2.2.2     |
| [Ingress NGINX](https://github.com/kubernetes/ingress-nginx)                      | 4.1.4     | 4.1.4     |
| [Istio](https://github.com/istio/istio)                                           | —         | 1.16.4    |
| [Kiali](https://github.com/kiali/kiali)                                           | –         | 1.59.1    |
| [Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)   | 36.2.0    | 36.2.0    |
