
{include(/en/_includes/_translated_by_ai_en.md)}

Clusters, like other PaaS objects, cannot be automatically migrated to a different SDN type, but can be recreated in the new network.

Before starting the migration of any PaaS services in the project:

1. [Complete](../../iaas) the migration of the network infrastructure, if it has not been done yet.
1. [Complete](../balancers) the migration of balancers.
1. [Update](../dns) the public DNS A-records.

To migrate a cluster to Sprut SDN:

1. [Create](/en/kubernetes/k8s/instructions/create-cluster) a cluster similar to the original one. In the parameter responsible for selecting the network connected to the cluster, select the required Sprut SDN.
1. [Migrate](/en/kubernetes/k8s/how-to-guides/velero/velero-backup) the workload (including persistent volumes) using the Velero backup tool.
1. [Configure](/en/kubernetes/k8s/connect/kubectl#connect) the connection to the new cluster.
1. (Optional) Configure network connectivity between Sprut and Neutron networks:

    To reduce service downtime, connect the original Neutron SDN and the new Sprut SDN using an advanced router connected to transit networks with standard routers. This approach is useful if you are migrating services gradually or cannot shut down the cluster during the migration.

    1. [Connect](/en/networks/vnet/how-to-guides/advanced-router) the advanced router to transit networks with standard routers in the original Neutron SDN and the new Sprut SDN.
    1. [Configure](/en/networks/vnet/how-to-guides/advanced-router#includes-advanced-router-static-routs) static routes between Neutron and Sprut networks.

1. Verify the functionality of the new cluster:

    1. [Check](/en/kubernetes/k8s/connect/kubectl#check_connection) the connection to the cluster.
    2. Make sure that your applications deployed in the new cluster are working.

1. [Delete](/en/kubernetes/k8s/instructions/manage-cluster#k8s-manage-cluster-delete) the original cluster if you no longer need it.