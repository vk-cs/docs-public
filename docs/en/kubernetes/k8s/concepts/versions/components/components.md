The supported versions of components and [add-ons](../../addons-and-settings/addons) depend on the version of the Cloud Containers cluster.

When [updating a cluster](../../../instructions/update), part of its components are also updated, as well the installed add-ons. If a component that is to be updated with the cluster is deleted, it will be restored during the next cluster update.

Add-ons are not updated with the cluster updates. If a new add-on version is available, you can [update](/en/kubernetes/k8s/instructions/addons/manage-addons#updating_addon_version) it manually. 

## Components

The table shows the supported component versions for different Kubernetes cluster versions.

[cols="2,1,1,1,1,1", options="header"]
|===
.^|Component
.^|1.28.x
.^|1.29.x–1.30.x
.^|1.31.x
.^|1.32.x
.^|1.33.x

|[CoreDNS](https://github.com/coredns/coredns)
|1.11.1
|1.11.1
|1.11.3
|1.11.3
|1.12.3

|[Calico](https://github.com/projectcalico/calico)
|3.28.0
|3.28.0
|3.28.0
|3.29.1
|3.30.2

|[Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
|3.14.0
|3.16.3
|3.18.2
|3.18.2
|3.18.2

|[Helm](https://github.com/helm/helm)
|3.14.2
|3.14.2
|3.14.2
|3.14.2
|3.18.4

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

{cut(Previous versions)}

[cols="2,1,1,1,1", options="header"]
|===
.^|Component
.^|1.21.4–1.22.x
.^|1.24.x–1.25.x
.^|1.26.x
.^|1.27.x

|[CoreDNS](https://github.com/coredns/coredns)
|1.2.4
|1.10.1
|1.10.1
|1.10.1

|[Calico](https://github.com/projectcalico/calico)
|3.20.2
|3.25.0
|3.26.1
|3.26.3

|[Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
|3.7.0
|3.11.0
|3.12.0
|3.14.0

|[Helm](https://github.com/helm/helm)
|3.11.3
|3.11.3
|3.12.2
|3.12.2

|[Kubernetes Dashboard](https://github.com/kubernetes/dashboard)
|2.3.1
|2.7.0
|2.7.0
|2.7.0

|[Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
|0.5.0
|0.6.1
|0.6.3
|0.6.4

|[Shell-operator](https://github.com/flant/shell-operator)
|1.0.9
|1.0.9
|1.0.9
|1.0.9
|===

{/cut} 

## Add-ons

The necessary add-ons can be [installed](../../../instructions/addons/manage-addons#installing_addon) in the cluster individually. The table shows the supported addon versions for different Kubernetes cluster versions.

[cols="2,1,1,1,1,1", options="header"]
|===
.^|Add-on
.^|1.28.x
.^|1.29.x–1.30.x
.^|1.31.x
.^|1.32.x
.^|1.33.x

|[Capsule](https://github.com/projectcapsule/capsule)
|0.4.6
|0.4.6
|0.7.2
|0.7.2
|0.7.2

|[cert-manager](https://github.com/cert-manager/cert-manager)
|1.12.2/1.14.2
|1.12.2/1.14.2
|1.16.3
|1.16.3
|1.16.3

|[Docker Registry](https://github.com/twuni/docker-registry.helm)
|2.2.2
|2.2.2
|2.2.2
|2.2.2
|2.2.2

|[Fluent Bit for Cloud Logging<br>(logaas-integration)](../../../instructions/addons/advanced-installation/install-advanced-logaas-integration)
|0.34.2
|0.34.2
|0.34.2
|0.34.2
|0.34.2

|[Ingress NGINX](https://github.com/kubernetes/ingress-nginx)
|4.12.1
|4.12.1
|4.12.1
|4.12.1
|4.12.1

|[Istio](https://github.com/istio/istio)
|1.19.3
|1.22.3
|1.24.2
|1.24.2
|1.24.2

|[Istio Gateaway](https://github.com/istio/gateway-api)
|1.19.3
|1.22.3
|1.24.2
|1.24.2
|1.24.2

|[Jaeger](https://github.com/jaegertracing/jaeger)
|0.71.4
|0.71.4
|3.4.0
|3.4.0
|3.4.0

|[Kiali](https://github.com/kiali/kiali)
|1.75.0
|1.82.0
|2.4.0
|2.4.0
|2.4.0

|[Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)
|54.2.2

54.2.3-vk.1
|54.2.2

54.2.3-vk.1
|68.3.3

68.3.4-vk.1
|68.3.3

68.3.4-vk.1

|68.3.4-vk.1

|[Fluent Bit](https://github.com/fluent/fluent-bit)
|0.43.0
|0.43.0
|0.48.5
|0.48.5
|0.48.5

|[GPU Operator](https://github.com/NVIDIA/gpu-operator)
|24.9.0
|24.9.0
|24.9.0
|24.9.0
|24.9.0
|===

{cut(Previous versions)}

[cols="2,1,1,1,1", options="header"]
|===
.^|Add-on
.^|1.21.4–1.23.x
.^|1.23.x–1.24.x
.^|1.25.x–1.26.x
.^|1.27.x

|[Capsule](https://github.com/projectcapsule/capsule)
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
|0.4.6
|0.4.6

|[cert-manager](https://github.com/cert-manager/cert-manager)
| ![](/ru/assets/no.svg "inline")
|1.12.2
|1.12.2
|1.12.2/1.14.2

|[Docker Registry](https://github.com/twuni/docker-registry.helm)
|2.2.2
|2.2.2
|2.2.2
|2.2.2

|[Fluent Bit for Cloud Logging<br>(logaas-integration)](../../../instructions/addons/advanced-installation/install-advanced-logaas-integration)
| ![](/ru/assets/no.svg "inline")
|0.34.2
|0.34.2
|0.34.2

|[Ingress NGINX](https://github.com/kubernetes/ingress-nginx)
|4.1.4
|4.1.4
|4.1.4
|4.7.1

|[Istio](https://github.com/istio/istio)
| ![](/ru/assets/no.svg "inline")
|1.16.4
|1.16.4
|1.19.3

|[Istio Gateaway](https://github.com/istio/gateway-api)
| ![](/ru/assets/no.svg "inline")
|1.16.4
|1.16.4
|1.19.3

|[Jaeger](https://github.com/jaegertracing/jaeger)
| ![](/ru/assets/no.svg "inline")
|0.71.4
|0.71.4
|0.71.4

|[Kiali](https://github.com/kiali/kiali)
| ![](/ru/assets/no.svg "inline")
|1.59.1
|1.59.1
|1.75.0

|[Kube Prometheus Stack](https://github.com/prometheus-operator/kube-prometheus)
|36.2.0
|36.2.0
|36.2.0
|54.2.2

54.2.3-vk.1

|[Fluent Bit](https://github.com/fluent/fluent-bit)
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
|0.43.0

|[GPU Operator](https://github.com/NVIDIA/gpu-operator)
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
|24.9.0
|===

{/cut}

Some versions of the Kube Prometheus Stack addon have the `vk` suffix at the end. This indicates that these versions include built-in Kubernetes cluster resource consumption forecasting based on [cluster monitoring](/en/kubernetes/k8s/monitoring) capabilities. This is a modification by VK Tech that is not available in the basic version of the add-on.

To take advantage of these capabilities, update the add-on from the basic version to the VK Tech version.
