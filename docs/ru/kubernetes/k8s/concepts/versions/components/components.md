Поддерживаемые версии компонентов и [аддонов](../../addons-and-settings/addons) зависят от версии кластера Kubernetes в Cloud Containers.

При [обновлении](../../update) кластера также обновляется часть компонентов. Если обновляемый вместе с кластером компонент был удален, он восстановится при обновлении кластера.

Аддоны не обновляются вместе с кластером. Если для аддона доступна новая версия, вы можете [обновить их самостоятельно](../../../instructions/addons/manage-addons#obnovlenie_versii_addona).

## Компоненты

В таблице приведены поддерживаемые версии компонентов для различных версий кластеров Kubernetes.

[cols="2,1,1,1,1,1", options="header"]
|===
.^|Компонент
.^|1.34.x, 1.33.x
.^|1.32.x
.^|1.31.x
.^|1.30.x, 1.29.x
.^|1.28.x

|[CoreDNS](https://github.com/coredns/coredns)
|1.12.3
|1.11.3
|1.11.3
|1.11.1
|1.11.1

|[Calico](https://github.com/projectcalico/calico)
|3.30.2
|3.29.1
|3.28.0
|3.28.0
|3.28.0

|[Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
|3.18.2
|3.18.2
|3.18.2
|3.16.3
|3.14.0

|[Helm](https://github.com/helm/helm)
|3.18.4
|3.14.2
|3.14.2
|3.14.2
|3.14.2

|[Kubernetes Dashboard](https://github.com/kubernetes/dashboard)
|2.7.0
|2.7.0
|2.7.0
|2.7.0
|2.7.0

|[Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
|0.7.1
|0.7.1
|0.7.1
|0.7.1
|0.7.1

|[Shell-operator](https://github.com/flant/shell-operator)
|1.0.9
|1.0.9
|1.0.9
|1.0.9
|1.0.9
|===

{cut(Предыдущие версии)}

[cols="2,1,1,1,1", options="header"]
|===
.^|Компонент
.^|1.27.x
.^|1.26.x
.^|1.25.x, 1.24.x
.^|1.22.x–1.21.4

|[CoreDNS](https://github.com/coredns/coredns)
|1.10.1
|1.10.1
|1.10.1
|1.2.4

|[Calico](https://github.com/projectcalico/calico)
|3.26.3
|3.26.1
|3.25.0
|3.20.2

|[Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
|3.14.0
|3.12.0
|3.11.0
|3.7.0

|[Helm](https://github.com/helm/helm)
|3.12.2
|3.12.2
|3.11.3
|3.11.3

|[Kubernetes Dashboard](https://github.com/kubernetes/dashboard)
|2.7.0
|2.7.0
|2.7.0
|2.3.1

|[Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
|0.6.4
|0.6.3
|0.6.1
|0.5.0

|[Shell-operator](https://github.com/flant/shell-operator)
|1.0.9
|1.0.9
|1.0.9
|1.0.9
|===

{/cut}

## Аддоны

Необходимые аддоны могут быть [установлены](../../../instructions/addons/manage-addons#ustanovka_addona) в кластер отдельно. В таблице приведены поддерживаемые версии аддонов для различных версий кластеров Kubernetes.

[cols="2,1,1,1,1,1", options="header"]
|===
.^|Аддон
.^|1.34.x, 1.33.x
.^|1.32.x
.^|1.31.x
.^|1.30.x, 1.29.x
.^|1.28.x

|[Capsule](https://github.com/projectcapsule/capsule)
|0.7.2
|0.7.2
|0.7.2
|0.4.6
|0.4.6

|[cert-manager](https://github.com/cert-manager/cert-manager)
|1.16.3
|1.16.3
|1.16.3
|1.12.2/1.14.2
|1.12.2/1.14.2

|[Docker Registry](https://github.com/twuni/docker-registry.helm)
|2.2.2
|2.2.2
|2.2.2
|2.2.2
|2.2.2

|[Fluent Bit](https://github.com/fluent/fluent-bit)
|0.48.5
|0.48.5
|0.48.5
|0.43.0
|0.43.0

|[Fluent Bit для Cloud Logging<br>(logaas-integration)](../../../instructions/addons/advanced-installation/install-advanced-logaas-integration)
|0.34.2
|0.34.2
|0.34.2
|0.34.2
|0.34.2

|[GPU Operator](https://github.com/NVIDIA/gpu-operator)
|24.9.0
|24.9.0
|24.9.0
|24.9.0
|24.9.0

|[Ingress NGINX](https://github.com/kubernetes/ingress-nginx)
|4.12.1
|4.12.1
|4.12.1
|4.12.1
|4.12.1

|[Istio](https://github.com/istio/istio)
|1.24.2
|1.24.2
|1.24.2
|1.22.3
|1.19.3

|[Istio Gateaway](https://github.com/istio/gateway-api)
|1.24.2
|1.24.2
|1.24.2
|1.22.3
|1.19.3

|[Jaeger](https://github.com/jaegertracing/jaeger)
|3.4.0
|3.4.0
|3.4.0
|0.71.4
|0.71.4

|[Kiali](https://github.com/kiali/kiali)
|2.4.0
|2.4.0
|2.4.0
|1.82.0
|1.75.0

|[Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)
|68.3.4-vk.1

|68.3.3

|68.3.3

|54.2.2

|54.2.2

|[Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
|4.8.0
|4.8.0
|4.8.0
|4.8.0
|4.8.0
|===

{cut(Предыдущие версии)}

[cols="2,1,1,1,1", options="header"]
|===
.^|Аддон
.^|1.27.x
.^|1.26.x, 1.25.x
.^|1.24.x, 1.23.x
.^|1.23.x–1.21.4

|[Capsule](https://github.com/projectcapsule/capsule)
|0.4.6
|0.4.6
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|[cert-manager](https://github.com/cert-manager/cert-manager)
|1.12.2/1.14.2
|1.12.2
|1.12.2
| ![](/ru/assets/no.svg "inline")

|[Docker Registry](https://github.com/twuni/docker-registry.helm)
|2.2.2
|2.2.2
|2.2.2
|2.2.2

|[Fluent Bit](https://github.com/fluent/fluent-bit)
|0.43.0
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|[Fluent Bit для Cloud Logging<br>(logaas-integration)](../../../instructions/addons/advanced-installation/install-advanced-logaas-integration)
|0.34.2
|0.34.2
|0.34.2
| ![](/ru/assets/no.svg "inline")

|[GPU Operator](https://github.com/NVIDIA/gpu-operator)
|24.9.0
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|[Ingress NGINX](https://github.com/kubernetes/ingress-nginx)
|4.7.1
|4.1.4
|4.1.4
|4.1.4

|[Istio](https://github.com/istio/istio)
|1.19.3
|1.16.4
|1.16.4
| ![](/ru/assets/no.svg "inline")

|[Istio Gateaway](https://github.com/istio/gateway-api)
|1.19.3
|1.16.4
|1.16.4
| ![](/ru/assets/no.svg "inline")

|[Jaeger](https://github.com/jaegertracing/jaeger)
|0.71.4
|0.71.4
|0.71.4
| ![](/ru/assets/no.svg "inline")

|[Kiali](https://github.com/kiali/kiali)
|1.75.0
|1.59.1
|1.59.1
| ![](/ru/assets/no.svg "inline")

|[Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)
|54.2.2
|36.2.0
|36.2.0
|36.2.0

|[Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
|![](/ru/assets/no.svg "inline")
|![](/ru/assets/no.svg "inline")
|![](/ru/assets/no.svg "inline")
|![](/ru/assets/no.svg "inline")
|===

{/cut}

В версиях аддона Kube Prometheus Stack с суффиксом `vk` встроено [прогнозирование потребления ресурсов кластера Kubernetes](../../../monitoring#forecast_consumption). Это доработка от VK Tech, недоступная в базовой версии аддона.

Чтобы использовать возможности прогнозирования, [обновите](../../../how-to-guides/update-monitoring-addon) аддон с базовой версии до версии от VK Tech.

