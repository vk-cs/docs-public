Various addons (additional services) are available for Kubernetes VK Cloud clusters. They can be selected in any combination and installed either when [creating a cluster using Terraform](../../../operations/create-cluster/create-terraform), or [later](../../../operations/addons/manage-addons#installing-the-addon) in already an existing cluster. The installation process is automated and requires minimal user intervention.

## Features of installing addons

- Addons are installed on the worker nodes of the cluster and consume their computing resources.

  The following are the system requirements of addons based on the standard values [requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) for Kubernetes resources in the addon setup code. When using non-standard values, the system requirements of addons will change.

- Addons can be installed on a dedicated group of worker nodes or on Kubernetes worker nodes selected by the scheduler. Using the first approach allows you to exclude the influence of addons on the operation of production services deployed in the cluster.

  The computing resources of a dedicated group of worker nodes should be sufficient for all addons, even if each addon consumes the maximum resources specified in the system requirements. It is recommended to set up automatic scaling for such a group of nodes.

- For addons, it is possible to perform:

  - **Standard installation** on Kubernetes worker nodes selected by the scheduler with a change in the addon configuration code.
  - **Installation on dedicated worker nodes** with a change in the addon configuration code.
  - **Quick installation** on Kubernetes worker nodes selected by the scheduler without changing the addon setup code (with default settings). Not all addons support this installation option.

  The installation process is described in the section [Configuring and installing addons](../../../operations/addons/advanced-installation/).

## Available addons

<info>

The availability of specific addons depends on the [region](/en/base/account/concepts/regions) in which the cluster is planned to be placed.

</info>

### Kube Prometheus Stack

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

The system for monitoring the status of the cluster and the services deployed in it is implemented on the basis of [Prometheus](https://prometheus.io/) and visualization tool [Grafana](https://grafana.com/).

See [Cluster Monitoring](../../../monitoring#using-grafana) for details.

</tabpanel>
<tabpanel>

- **CPU**: 850m–2500m.
- **RAM**: 968Mi–3804Mi.
- **HDD**: 2GB.
- **SSD**: 10GB.

</tabpanel>
</tabs>

### Docker Registry

<warn>

When installing the addon, a [standard load balancer](/en/networks/vnet/concepts/load-balancer#types-of-load-balancers) will be created.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Docker Registry](https://docs.docker.com/registry/) is designed to host and store Docker images. It works in a high availability (HA) configuration. Registry images can be used when deploying services in a cluster.

See [Connecting to the Docker registry](../../../connect/docker-registry/) for details.

</tabpanel>
<tabpanel>

- **CPU**: 100m.
- **RAM**: 128Mi–512 Mi.
- **S3 object storage capacity**: depends on the size and number of images that are planned to be placed in the registry.
- **Standard load balancer**: one piece.
- **Floating IP**: one piece.

</tabpanel>
</tabs>

### Ingress Controller (NGINX)

<warn>

When installing the addon, a [standard load balancer](/en/networks/vnet/concepts/load-balancer#types-of-load-balancers) will be created.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

<tabs>
<tablist>
<tab>Description</tab>
<tab>System requirements</tab>
</tablist>
<tabpanel>

[Ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/) based on [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) works as a reverse proxy and allows to organize single entry point for services in cluster which work via HTTP or HTTPS.

If you have a controller, it is sufficient to create [Ingress resource](https://kubernetes.io/docs/concepts/services-networking/ingress/) to make such services available from outside the Kubernetes cluster.

The pre-installed Ingress controller integrates tightly with the VK Cloud platform. For more information, see [Network in cluster](../../network/).

</tabpanel>
<tabpanel>

- **CPU**: 210m–610m.
- **RAM**: 238Mi–660Mi.
- **Standard load balancer**: one piece.
- **Floating IP**: one piece. (when installed with [default settings](../../../operations/addons/advanced-installation/install-advanced-ingress#installing-the-addon)).

</tabpanel>
</tabs>
