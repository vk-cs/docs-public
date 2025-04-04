This article shows an example of changing the IP addresses of DNS servers that are used to resolve domain names of hosts in a cluster.

## Before you start

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Click the name of the cluster that you want to change DNS settings. If there is no cluster you need, [create](../../../service-management/create-cluster) one.
1. On the **General Information** tab, find out the name of the network and subnet where the cluster is located.
1. Contact your DNS provider for the IP addresses of the DNS servers that should be used instead of those assigned to the cluster.

## 1. Change DNS server addresses in network settings

1. In your management console, go to **Virtual networks** → **Networks**.
1. Click the name of the network to which the cluster is connected.
1. A list of subnets of the selected network will open. Click ![ ](/en/assets/more-icon.svg "inline") for the subnet to which the cluster is connected and select **Edit subnet**.
1. In the window that opens, disable the **Private DNS** option.
1. Specify new IP addresses in the **DNS servers** box. If there are several addresses, specify each of them on a new line.
1. Save the changes.

## 2. Reboot the cluster

To apply the changes:

1. [Stop](../../../service-management/manage-cluster#stop) your cluster and wait for all nodes to completely shut down.

1. [Start](../../../service-management/manage-cluster#start) the cluster again and wait for all nodes to initialize.

<warn>

Rebooting causes temporary unavailability of services on the cluster. Stop and start the cluster during off-peak hours.

</warn>

When the cluster starts, all its nodes will receive updated DNS settings.
