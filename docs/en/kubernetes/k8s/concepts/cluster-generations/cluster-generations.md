The Cloud Containers service supports two generations of Kubernetes clusters:

- The first (previous) generation. First-generation clusters use [Magnum](https://docs.openstack.org/magnum/latest/user/), an OpenStack tool for container orchestration, to automate their deployment and scaling. These clusters are hosted within user projects, providing users with access to all cluster components, including system ones. This approach gives users complete control over their clusters but also requires them to take responsibility for their own deployment and maintenance. While it offers flexibility, it also increases the risk of failures and errors in the cluster.

- The second (new) generation, or managed clusters. These clusters are maintained and managed by the VK Cloud platform, minimizing the need for routine manual management by users. The components of second-generation clusters are hosted in [service projects](#service-projects) as opposed to user projects, and the clusters are deployed in [system clusters](#system-clusters). The advantages of this approach include:

   - Automated configuration and maintenance of the infrastructure.
   - Guarantee of high availability, fault tolerance, performance, and reliability of the Kubernetes clusters.
   - Reducing security risks and minimizing errors.
   - Advanced built-in monitoring based on the [VK Cloud monitoring](/en/monitoring-services/monitoring) service.

## {heading(Service projects)[id=service-projects]}

Second-generation clusters are managed by the VK Cloud platform through service projects. A service project is an isolated environment that restricts user access to managing cluster system components, simplifying and automating their work with Kubernetes.

Service projects host the following:

- Virtual machines (VMs).
- VM disks.
- [Persistent volumes (PVs)](/en/kubernetes/k8s/reference/pvs-and-pvcs).
- [Service load balancers](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) that provide access to the Kubernetes API and their IP addresses.

Ports, as well as standard load balancers and their IP addresses, are hosted in user projects.

{note:warn}

Any actions with ports will lead to unstable cluster operation.

{/note}

## {heading(System clusters)[id=system-clusters]}

In service projects, second-generation clusters that you create are deployed in and managed by system clusters as follows:

1. In a service project, master nodes are created for each second-generation cluster. A system cluster is launched on these master nodes.
1. A second-generation cluster you create is installed in this system cluster. Your cluster has network connectivity with your project, so you can [interact](/en/kubernetes/k8s/instructions/manage-cluster) with it as usual. You cannot stop or restart second-generation clusters. 

System components in second-generation clusters, including their master and worker nodes, are managed by VK Cloud. For more details, refer to [Service architecture](/en/kubernetes/k8s/concepts/architecture).




