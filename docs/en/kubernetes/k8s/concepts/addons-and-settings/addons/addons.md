Various add-ons (additional services) are available for Cloud Containers clusters. They can be selected in any combination and installed either when [creating a cluster using Terraform](../../../instructions/create-cluster/create-terraform), or [later](../../../instructions/addons/manage-addons#installing_addon) in already an existing cluster. The installation process is automated and requires minimal user intervention.

## {heading(Features of installing add-ons)[id=features_of_installing_addons]}

- Add-ons are installed on the worker nodes of the cluster and consume their computing resources.

  The following are the system requirements of add-ons based on the standard values [requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) for Kubernetes resources in the add-on setup code. When using non-standard values, the system requirements of add-ons will change.

  {note:info}

  Some add-ons can be installed on all cluster nodes (including master nodes). For more details, see [Configuring and installing add-ons](../../../instructions/addons/advanced-installation).

  {/note}

- Add-ons can be installed on a dedicated group of worker nodes or on Kubernetes worker nodes selected by the scheduler. Using the first approach allows you to exclude the influence of add-ons on the operation of production services deployed in the cluster.

  The computing resources of a dedicated group of worker nodes should be sufficient for all add-ons, even if each add-on consumes the maximum resources specified in the system requirements. It is recommended to set up automatic scaling for such a group of nodes.

- There are three options for installing add-ons:

  - **Standard installation** on Kubernetes worker nodes selected by the scheduler with a change in the add-on configuration code.
  - **Installation on dedicated worker nodes** with a change in the add-on configuration code.
  - **Quick installation** on Kubernetes worker nodes selected by the scheduler without changing the add-on setup code (with default settings).

  Not all add-ons support all three installation options.

  The installation process is described in the section [Configuring and installing add-ons](../../../instructions/addons/advanced-installation).

## {heading(Available add-ons)[id=available_addons]}

{note:info}

The availability of specific add-ons depends on the [region](/en/tools-for-using-services/account/concepts/regions) in which the cluster is planned to be placed.

{/note}

### Capsule

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

Kubernetes clusters allow you to organize the logical division of Kubernetes resources at the level of individual namespaces. However, this may not be enough to achieve resource separation and isolation in complex scenarios. For example, let's say you want to provide isolated sets of resources to multiple development teams so that they are not accessible to each other. A typical solution to this problem is to create several separate clusters for each team. With this approach, as the number of teams increases, the number of clusters also increases, which complicates the administration of these clusters.

[Capsule](https://capsule.clastix.io/docs) allows you to organize isolated sets of resources within one cluster using tentants. An individual tenant represents namespaces assigned to a group of users combined with restrictions on the creation and consumption of Kubernetes resources. The Capsule policy engine not only monitors compliance with resource usage policies within a tenant, but also ensures the isolation of one tenant from another. Thus, it becomes possible to organize the work of several teams within one multi-tenant cluster without the need to administer additional clusters.

</tabpanel>
<tabpanel>

- **CPU**: 200m.
- **RAM**: 128Mi.

</tabpanel>
</tabs>

### cert-manager

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[cert-manager](https://cert-manager.io/) helps to manage certificates in Kubernetes clusters:

- Issue certificates, including self-signed certificates. To do this, `cert-manager` sends requests to sources acting as certificate authority (CA).

  Examples of the sources:

  - Cybersecurity solutions providers such as [Venafi](https://www.venafi.com/).
  - Certificate providers, such as [Let’s Encrypt](https://letsencrypt.org/).
  - Storage for secrets, such as [HashiCorp Vault](https://www.vaultproject.io/).
  - Local containers containing the public part of a certificate and private key.

- Automatically reissue expiring certificates.

A certificate issued with `cert-manager` will be available to other Kubernetes resources. For example, it can be used by Ingress.

</tabpanel>
<tabpanel>

The requirements of the individual add-on components:

- cert-manager:

  - **CPU**: 10m.
  - **RAM**: 32Mi.

- [cert-manager-cainjector](https://cert-manager.io/docs/concepts/ca-injector/):

  - **CPU**: 10m.
  - **RAM**: 32Mi.

- [cert-manager-webhook](https://cert-manager.io/docs/concepts/webhook/):

  - **CPU**: 10m.
  - **RAM**: 32Mi.

</tabpanel>
</tabs>

### Docker Registry

{note:warn}

When installing the add-on, a [standard load balancer](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created.

Usage of this load balancer is [charged](/en/networks/vnet/tariffication).

{/note}

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Docker Registry](https://docs.docker.com/registry/) is designed to host and store Docker images. It works in a high availability (HA) configuration. Registry images can be used when deploying services in a cluster.

See [Connecting to the Docker registry](../../../connect/docker-registry) for details.

</tabpanel>
<tabpanel>

- **CPU**: 100m.
- **RAM**: 128Mi–512 Mi.
- **S3 object storage capacity**: depends on the size and number of images that are planned to be placed in the registry.
- **Standard load balancer**: one piece.
- **Floating IP**: one piece.

</tabpanel>
</tabs>

### Fluent Bit

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Fluent Bit](https://docs.fluentbit.io/manual) allows you to flexibly configure log collection in Cloud Containers clusters and analyze them in the [Cloud Logging](/en/monitoring-services/logging) service, for example, using Elasticsearch or Loki plugins.

The sources of the logs are [kubelet services](https://kubernetes.io/docs/concepts/overview/components/#kubelet) and [pods](../../../reference/pods) located on cluster nodes.

</tabpanel>
<tabpanel>

The add-on does not have its own system requirements. The add-on subs use [limit settings](../settings#limits_settings_for_pods) by default.

</tabpanel>
</tabs>

### Fluent Bit for Cloud Logging (logaas-integration)

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

Fluent Bit in combination with [special filters](https://docs.fluentbit.io/manual/pipeline/filters/lua), written in Lua, allows you to organize the delivery of logs from the Cloud Containers cluster to the [Cloud Logging](/en/monitoring-services/logging) service for further analysis of these logs.

The sources of the logs are [kubelet services](https://kubernetes.io/docs/concepts/overview/components/#kubelet) and [pods](../../../reference/pods) located on cluster nodes. For more information about how the add-on works, see the [section about installing it](../../../instructions/addons/advanced-installation/install-advanced-logaas-integration).

</tabpanel>
<tabpanel>

The add-on does not have its own system requirements. The add-on subs use [limit settings](../settings#limits_settings_for_pods) by default.

</tabpanel>
</tabs>

### {heading(GPU Operator)[id=gpu_operator]}

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

GPU Operator allows you to manage [GPUs on cluster nodes](../../flavors#gpu) to perform machine learning or big data processing.

The following options for using GPUs in a cluster are available:

- One pod uses one or more GPUs.
- The add-on distributes one GPU between several pods using the [MIG](../../flavors#gpu-sharing) strategy.
- The add-on distributes one GPU between several pods using the [MPS](../../flavors#gpu-sharing) strategy.

Addon components:

- NVIDIA GPU Operator for GPU management.
- Service validators for CUDA (Compute Unified Device Architecture) validation after configuration changes.
- Operator self-diagnosis tools.
- NVIDIA device plugin for automating GPU resource binding and allocation.
- Node Feature Discovery for identifying and registering features available on cluster nodes. The component contains the following services:

  - NFD-Master is responsible for connecting to the Kubernetes API server and updating node objects.
  - NFD-Worker connects to the NFD-Master service to advertise hardware features.
  - NFD Garbage-Collector ensures that all Node Feature Discovery objects have corresponding nodes and removes stale objects for non-existent nodes.

Read more about the add-on and its components: [NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/overview.html), [NVIDIA device plugin](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes), [Node Feature Discovery](https://kubernetes-sigs.github.io/node-feature-discovery).

</tabpanel>
<tabpanel>

The add-on components requirements:

- NVIDIA GPU Operator:
  - **CPU**: 200–500m
  - **RAM**: 64–512Mi
- NFD-Master:
  - **CPU**: 100–500m
  - **RAM**: 128Mi–4Gi
- NFD Garbage-Collector:
  - **CPU**: 10–500m
  - **RAM**: 128Mi–1Gi
- NFD-Worker (on each GPU node):
  - **CPU**: 205–2000m
  - **RAM**: 192Mi–2Gi

If the add-on is installed on several worker nodes, then NFD-Worker will be installed on each of these nodes and will require the specified amount of RAM for each node. The remaining components are installed on one node only.

</tabpanel>
</tabs>

### Ingress Controller (NGINX)

{note:warn}

When installing the add-on, a [standard load balancer](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created.

Usage of this load balancer is [charged](/en/networks/vnet/tariffication).

{/note}

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/) based on [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) works as a reverse proxy and allows to organize single entry point for services in cluster which work via HTTP or HTTPS.

If you have a controller, it is sufficient to create [Ingress resource](https://kubernetes.io/docs/concepts/services-networking/ingress/) to make such services available from outside the Cloud Containers cluster.

The pre-installed Ingress controller integrates tightly with the VK Cloud platform. For more information, see [Network in cluster](../../network).

</tabpanel>
<tabpanel>

- **CPU**: 210m–610m.
- **RAM**: 238Mi–660Mi.
- **Standard load balancer**: one piece.
- **Floating IP**: one piece. (when installed with [default settings](../../../instructions/addons/advanced-installation/install-advanced-ingress#installing_addon)).

</tabpanel>
</tabs>

### {heading(Istio)[id=istio]}

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Istio](https://istio.io/latest/) is a framework that implements the [service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh) concept, which allocates a separate layer for interaction between application services. Using Istio provides traffic management for services without changing the code of the services (sidecar containers are used). Istio benefits:

- Expanded secure traffic transfer capabilities:

  - Traffic policies can be configured.
  - TLS can be used to communicate between services.

- Expanded traffic monitoring capabilities.
- Complex routing and balancing of traffic between services can be done.

</tabpanel>
<tabpanel>

- **CPU**: 500m.
- **RAM**: 2Gi.

</tabpanel>
</tabs>

### {heading(Jaeger)[id=jaeger]}

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

In distributed systems based on microservices, requests are constantly exchanged. The [Jaeger](https://www.jaegertracing.io) platform created for distributed query tracing. Jaeger tracks the flow of requests through microservices and allows you to:

- collect information about the interrelationships of the system components in terms of the flow of requests;
- detect query problems or bottlenecks in the system architecture related to processing the request stream.

Such a tool is necessary because query-related factors can significantly affect the behavior and performance of these systems as a whole. It is not enough to provide monitoring only for individual microservices.

Jaeger performs query tracing based on the data it receives from microservices. Therefore, it is necessary to integrate [into microservices](https://www.jaegertracing.io/docs/latest/architecture/#tracing-sdks) tool stack [OpenTelemetry](https://opentelemetry.io) to send data about requests. You can get acquainted with the integration of OpenTelemetry into a microservice application using the example of [Hot R.O.D](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod).

</tabpanel>
<tabpanel>

Add-on requirements:

- The number of worker nodes must be at least the selected number of Elasticsearch replicas.

  Elasticsearch is used as a backend for storage. Each Elasticsearch replica will be hosted on a separate worker node to ensure fault tolerance.

  For more information about choosing the number of replicas, see [section about installing Jaeger](../../../instructions/addons/advanced-installation/install-advanced-jaeger).

- Worker nodes must use the configuration of computing resources:

  - `STD2-4-4` or better (for a test environment);
  - `STD2-6-6` or better (for a production environment).

Requirements of individual add-on components:

- [Elasticsearch](https://www.jaegertracing.io/docs/latest/deployment/#elasticsearch):

  - **CPU**: 100m–1000m.
  - **RAM**: 512M.

- [Agent](https://www.jaegertracing.io/docs/latest/architecture/#agent):

  - **CPU**: 250m–500m.
  - **RAM**: 128M–512M.

- [Collector](https://www.jaegertracing.io/docs/latest/architecture/#collector):

  - **CPU**: 500m–1000m.
  - **RAM**: 512M–1024M.

- [Query](https://www.jaegertracing.io/docs/latest/architecture/#query):

  - **CPU**: 250m–500m.
  - **RAM**: 128M–512M.

{note:info}

To ensure stable operation of Jaeger, it is recommended to install it on a dedicated group of worker nodes that meets the above requirements.

{/note}

</tabpanel>
</tabs>

### Kiali

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Kiali](https://kiali.io/) is a web interface for working with [Istio](#istio). It allows to manage, monitor and visualize a service mesh.

</tabpanel>
<tabpanel>

- **CPU**: 10m—500m.
- **RAM**: 64Mi—1Gi.

</tabpanel>
</tabs>

### {heading(Kube Prometheus Stack)[id=kube_prometheus_stack]}

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

The system for monitoring the status of the cluster and the services deployed in it is implemented on the basis of [Prometheus](https://prometheus.io/) and visualization tool [Grafana](https://grafana.com/).

See [Cluster Monitoring](../../../monitoring#using_grafana) for details.

</tabpanel>
<tabpanel>

- **CPU**: 850m–2500m.
- **RAM**: 968Mi–3804Mi.
- **HDD**: 2GB.
- **SSD**: 10GB.

</tabpanel>
</tabs>
