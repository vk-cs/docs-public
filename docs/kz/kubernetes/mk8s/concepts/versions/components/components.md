# {heading(Kubernetes компоненттерінің нұсқалары)[id=mk8s-components]}

{include(/kz/_includes/_translated_by_ai.md)}

Managed Containers ішіндегі Kubernetes кластерінің нұсқасына қарай компоненттердің және {linkto(../../addons-and-settings/addons#mk8s-addons)[text=аддондардың]} қолдау көрсетілетін нұсқалары тәуелді болады.

Кластерді {linkto(../../update#mk8s-update)[text=жаңарту]} кезінде компоненттердің бір бөлігі де жаңартылады. Егер кластермен бірге жаңартылатын компонент жойылған болса, кластер жаңартылған кезде ол қайта қалпына келтіріледі.

Аддондар кластермен бірге жаңартылмайды. Егер аддон үшін жаңа нұсқа қолжетімді болса, оларды {linkto(../../../instructions/addons/manage-addons#mk8s-manage-addons-update)[text=өз бетіңізше жаңарта аласыз]}.

## {heading(Компоненттер)[id=mk8s-components-supported-versions]}

Кестеде Kubernetes кластерлерінің әртүрлі нұсқалары үшін компоненттердің қолдау көрсетілетін нұсқалары берілген.

[cols="2,1,1,1,1,1,1", options="header"]
|===
.^|Компонент
.^|1.35.x
.^|1.34.x, 1.33.x
.^|1.32.x
.^|1.31.x
.^|1.30.x, 1.29.x
.^|1.28.x

|[Calico](https://github.com/projectcalico/calico)
|3.29.1
|3.30.2
|3.29.1
|3.28.0
|3.28.0
|3.28.0

|[CoreDNS](https://github.com/coredns/coredns)
|1.14.6-mcs.2
|1.12.3
|1.11.3
|1.11.3
|1.11.1
|1.11.1

|[Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
|3.18.2-mcs.1
|3.18.2
|3.18.2
|3.18.2
|3.16.3
|3.14.0

|[Helm](https://github.com/helm/helm)
|3.21.3-mcs.2
|3.18.4
|3.14.2
|3.14.2
|3.14.2
|3.14.2

|[Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
|0.9.0-mcs.2
|0.7.1
|0.7.1
|0.7.1
|0.7.1
|0.7.1

|[Shell-operator](https://github.com/flant/shell-operator)
|![](../../../../../assets/no.svg "inline")
|1.0.9
|1.0.9
|1.0.9
|1.0.9
|1.0.9
|===

{cut(Алдыңғы нұсқалар)}

[cols="2,1,1,1,1", options="header"]
|===
.^|Компонент
.^|1.27.x
.^|1.26.x
.^|1.25.x, 1.24.x
.^|1.22.x–1.21.4

|[Calico](https://github.com/projectcalico/calico)
|3.26.3
|3.26.1
|3.25.0
|3.20.2

|[CoreDNS](https://github.com/coredns/coredns)
|1.10.1
|1.10.1
|1.10.1
|1.2.4

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

## {heading(Аддондар)[id=mk8s-components-addons]}

Қажетті аддондар кластерге бөлек {linkto(../../../instructions/addons/manage-addons#mk8s-manage-addons-install)[text=орнатылуы]} мүмкін. Кестеде Kubernetes кластерлерінің әртүрлі нұсқалары үшін аддондардың қолдау көрсетілетін нұсқалары берілген.

[cols="2,1,1,1,1,1,1,1", options="header"]
|===
.^|Аддон
.^|1.35.x
.^|1.34.x
.^|1.33.x
.^|1.32.x
.^|1.31.x
.^|1.30.x, 1.29.x
.^|1.28.x

|[Argo CD](https://github.com/argoproj/argo-cd)
|9.5.0
|9.5.0
|9.5.0
|9.5.0
|9.5.0
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")

|[cert-manager](https://github.com/cert-manager/cert-manager)
|1.16.3
|1.16.3
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
|2.2.2
|2.2.2

|[DRA Driver for NVIDIA GPUs](https://github.com/kubernetes-sigs/dra-driver-nvidia-gpu)
|0.5.0
|0.5.0
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")

|[External Secrets Operator](https://github.com/external-secrets/external-secrets)
|2.5.0
|2.5.0
|2.5.0
|2.5.0
|2.5.0
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")

|[Fluent Bit](https://github.com/fluent/fluent-bit)
|0.48.5
|0.48.5
|0.48.5
|0.48.5
|0.48.5
|0.43.0
|0.43.0

|{linkto(../../../instructions/addons/advanced-installation/install-advanced-logaas-integration-mk8s#mk8s-install-advanced-logaas-integration-gen-2)[text=Fluent Bit для Cloud Logging (logaas-integration)]}
|0.34.2
|0.34.2
|0.34.2
|0.34.2
|0.34.2
|0.34.2
|0.34.2

|[GPU Operator](https://github.com/NVIDIA/gpu-operator)
|24.9.0/25.10.1
|24.9.0/25.10.1
|24.9.0
|24.9.0
|24.9.0
|24.9.0
|24.9.0

|[HAMi](https://github.com/Project-HAMi/HAMi)
|2.10.0
|2.10.0
|2.10.0
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")

|[Ingress NGINX](https://github.com/kubernetes/ingress-nginx)
|4.12.1
|4.12.1
|4.12.1
|4.12.1
|4.12.1
|4.12.1
|4.12.1

|[Istio](https://github.com/istio/istio)
|1.29.2
|1.29.2
|1.29.2
|1.29.2
|1.29.2
|1.22.3
|1.19.3

|[Jaeger](https://github.com/jaegertracing/jaeger)
|3.4.0
|3.4.0
|3.4.0
|3.4.0
|3.4.0
|0.71.4
|0.71.4

|[Kgateway](https://github.com/kgateway-dev/kgateway)
|2.2.2
|2.2.2
|2.2.2
|2.2.2
|2.2.2
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")

|[Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)
|68.3.3
|68.3.3
|68.3.3
|68.3.3
|68.3.3
|54.2.2
|54.2.2

|[S3-CSI](https://github.com/yandex-cloud/k8s-csi-s3)
|0.43.6
|0.43.6
|0.43.6
|0.43.6
|0.43.6
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")

|[Velero](https://github.com/vmware-tanzu/velero)
|1.18.1
|1.18.1
|1.18.1
|1.18.1
|1.18.1
|![](../../../../../assets/no.svg "inline")
|![](../../../../../assets/no.svg "inline")
|===

{cut(Алдыңғы нұсқалар)}

[cols="2,1,1,1,1", options="header"]
|===
.^|Аддон
.^|1.27.x
.^|1.26.x, 1.25.x
.^|1.24.x, 1.23.x
.^|1.23.x–1.21.4

|[cert-manager](https://github.com/cert-manager/cert-manager)
|1.12.2/1.14.2
|1.12.2
|1.12.2
| ![](../../../../../assets/no.svg "inline")

|[Docker Registry](https://github.com/twuni/docker-registry.helm)
|2.2.2
|2.2.2
|2.2.2
|2.2.2

|[Fluent Bit](https://github.com/fluent/fluent-bit)
|0.43.0
| ![](../../../../../assets/no.svg "inline")
| ![](../../../../../assets/no.svg "inline")
| ![](../../../../../assets/no.svg "inline")

|{linkto(../../../instructions/addons/advanced-installation/install-advanced-logaas-integration-mk8s#mk8s-install-advanced-logaas-integration-gen-2)[text=Cloud Logging үшін Fluent Bit (logaas-integration)]}
|0.34.2
|0.34.2
|0.34.2
| ![](../../../../../assets/no.svg "inline")

|[GPU Operator](https://github.com/NVIDIA/gpu-operator)
|24.9.0
| ![](../../../../../assets/no.svg "inline")
| ![](../../../../../assets/no.svg "inline")
| ![](../../../../../assets/no.svg "inline")

|[Ingress NGINX](https://github.com/kubernetes/ingress-nginx)
|4.7.1
|4.1.4
|4.1.4
|4.1.4

|[Istio](https://github.com/istio/istio)
|1.19.3
|1.16.4
|1.16.4
| ![](../../../../../assets/no.svg "inline")

|[Jaeger](https://github.com/jaegertracing/jaeger)
|0.71.4
|0.71.4
|0.71.4
| ![](../../../../../assets/no.svg "inline")

|[Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)
|54.2.2
|36.2.0
|36.2.0
|36.2.0
|===

{/cut}

Kube Prometheus Stack аддонының `68.3.3` нұсқасында {linkto(../../../monitoring#mk8s-monitoring-forecast-consumption)[text=Kubernetes кластері ресурстарын тұтынуды болжау]} кірістірілген.
