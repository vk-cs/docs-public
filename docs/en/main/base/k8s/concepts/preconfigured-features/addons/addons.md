Various preinstalled services are available for Kubernetes VK Cloud clusters. They can be selected in any combination when the cluster is created. Once the cluster is created, the selected services will already be deployed and configured in the cluster, requiring minimal user intervention.

<info>

The availability of specific services depends on the [region](../../../../account/concepts/regions) where the cluster is to be located.

</info>

## Monitoring

Cluster and services deployed in it are monitored on the basis of [Prometheus](https://prometheus.io/) and visualization tool [Grafana](https://grafana.com/).

See [Cluster Monitoring](../../../monitoring#using-grafana) for details.

## Docker Registry

<info>

This service is in **beta** status.

</info>

[Docker Registry](https://docs.docker.com/registry/) is designed to host and store Docker images. It works in a high availability (HA) configuration. Registry images can be used when deploying services in a cluster.

See [Connecting to the Docker registry](../../../connect/docker-registry/) for details.

## Ingress Controller (NGINX)

[Ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/) based on [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) works as a reverse proxy and allows to organize single entry point for services in cluster which work via HTTP or HTTPS.

If you have a controller, it is sufficient to create [Ingress resource](https://kubernetes.io/docs/concepts/services-networking/ingress/) to make such services available from outside the Kubernetes cluster.

The pre-installed Ingress controller integrates tightly with the VK Cloud platform. For more information, see [Network in cluster](../../network/).
