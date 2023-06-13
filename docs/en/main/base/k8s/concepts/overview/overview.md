## What the service can do

The container service allows you to create Kubernetes clusters and run various services and applications in them. All the usual Kubernetes tools are available, e.g:

- Storing and handling serverless functions in containers: OpenFaaS, OpenWhisk, Kubeless.
- Service Mesh: Istio, Consul, Linkerd.
- Monitoring, analytics, logging: Prometheus, Fluentd, Jaeger, OpenTracing.
- CI/CD: Gitlab, CircleCI, Travis CI.
- IaC (infrastructure as code): Terraform, Helm.
- Big Data and data science: Spark.

  For big data analysts, the following features can be useful:

  - Autoscaling clusters that can handle large computational loads.
  - Creating event-triggered data handlers.
  - Integration of Kubernetes clusters and data with other [VK Cloud machine learning platform services](https://mcs.mail.ru/docs/en#mlops-and-ai).

<info>

VK Cloud's Kubernetes distribution has been certified [Certified Kubernetes - Hosted](https://www.cncf.io/certification/software-conformance/#logos) by CNCF ([Cloud Native Computing Foundation](https://www.cncf.io/)). This means that the distribution has been tested for reliability and standards compliance, it meets all functional requirements of the community and is compatible with the standard [Kubernetes API](https://kubernetes.io/ru/docs/concepts/overview/kubernetes-api/). VK Cloud is the only cloud provider in Russia that has achieved this certification.

</info>

## Service features

- Management of [cluster](../../operations/manage-cluster) and [groups of nodes](../../operations/manage-node-group) using VK Cloud personal account and VK Cloud own Terraform provider.

- Manage Kubernetes objects and resources after [connecting to the cluster](../../connect/) using `kubectl` or Kubernetes Dashboard.

- Automatic and manual [cluster scaling](../../operations/scale).

  When automatic scaling is enabled, applications instantly get additional computing power when the load peaks. When the load drops, the amount of resources available to the application is reduced.
  
  This approach saves up to 60% of computing resources.

- Creating distributed installations within [VK Cloud regions](../../../account/concepts/regions): to provide high availability, different nodes of the same cluster can be located in different availability zones (different data centers). It is also recommended to place application replicas on these nodes so that replicas are also in different availability zones.

- Integration with the [storage subsystem](../storage) and [networking subsystem](../network) of the VK Cloud platform.

- One-click rolling update of clusters with no downtime. This applies to both minor and major versions of Kubernetes.

  <info>

  Cluster updates are available starting with cluster version `1.17` and higher.

  </info>

- Ensuring security at all stages of cluster operation:

  - During network communication in the cluster, all connections are encrypted and certificates are used.
  - You can [apply](../network#working-with-container-network-interface--cni-) Calico [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).
  - You can [apply](../architecture#built-in-support-for-the-open-policy-agent) Gatekeeper [constraint policies](https://open-policy-agent.github.io/gatekeeper/website/docs/howto).
  - Integration of [Kubernetes security role model](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) with VK Cloud platform roles is available. Read more in [Access management](../../concepts/access-management).

- [Backup](../../use-cases/velero-backup) Kubernetes VK Cloud clusters with Velero.

- Migration of other Kubernetes clusters to Kubernetes VK Cloud using Velero.

- A set of [preconfigured addons](../addons-and-settings/addons/) which can be selected when [creating a cluster using Terraform](../../operations/create-cluster) or [install](../../operations/addons/manage-addons) into an existing cluster, saving time on their manual deployment.
- A set of [preconfigured settings](../addons-and-settings/settings/), which help improve cluster stability and security.

- Monitoring the state of the cluster with Prometheus. You can view the monitoring data in [several ways](../../monitoring).

## What's next

- [Get to know the service architecture](../architecture).
- [Get to know the network structure in the cluster](../network).
- [Get to know the storage device in the cluster](../storage).
