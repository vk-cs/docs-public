Поддерживаемые версии компонентов и [аддонов](../../addons-and-settings/addons) зависят от версии кластера Kubernetes VK Cloud.

При [обновлении кластера](../../../operations/update) также обновляются часть компонентов и установленные аддоны. Если обновляемый вместе с кластером компонент был удален, он восстановится при обновлении кластера.

## Компоненты

Эти компоненты присутствуют во всех кластерах Kubernetes VK Cloud.

<!-- prettier-ignore -->
| Компонент                                                             | Kubernetes 1.21.4–1.22.x  | Kubernetes 1.23.x–1.26.x  |
| --------------------------------------------------------------------- | ------------------------- | ------------------------- |
| [CoreDNS](https://github.com/coredns/coredns)                         | 1.2.4     | 1.10.1    |
| [Calico](https://github.com/projectcalico/calico)                     | 3.20.2    | 3.25.0    |
| [Gatekeeper](https://github.com/open-policy-agent/gatekeeper)         | 3.7.0     | 3.11.0    |
| [Kubernetes Dashboard](https://github.com/kubernetes/dashboard)       | 2.3.1     | 2.7.0     |
| [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)   | 0.5.0     | 0.6.1     |
| [Shell-operator](https://github.com/flant/shell-operator)             | 1.0.9     | 1.0.9     |

## Аддоны

Необходимые аддоны могут быть [установлены](../../../operations/addons/manage-addons#ustanovka_addona) в кластер отдельно.

<!-- prettier-ignore -->
| Аддон                                                                             | Kubernetes 1.21.4–1.22.x  | Kubernetes 1.23.x–1.26.x  |
| --------------------------------------------------------------------------------- | ------------------------- | ------------------------- |
| [Docker Registry](https://github.com/twuni/docker-registry.helm)                  | 2.2.2     | 2.2.2     |
| [Ingress NGINX](https://github.com/kubernetes/ingress-nginx)                      | 4.1.4     | 4.1.4     |
| [Istio](https://github.com/istio/istio)                                           | —         | 1.16.4    |
| [Jaeger](https://github.com/jaegertracing/jaeger)                                 | —         | 0.71.4    |
| [Kiali](https://github.com/kiali/kiali)                                           | —         | 1.59.1    |
| [Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)   | 36.2.0    | 36.2.0    |
