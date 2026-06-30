This article shows an example of changing the IP addresses of DNS servers that are used to resolve domain names of hosts in a cluster.

## Before you start

1. [Install OpenStack CLI and complete authentication](/en/tools-for-using-services/cli/openstack-cli) if not done so already.
1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Click the name of the cluster that you want to change DNS settings.
1. On the **General Information** tab, find out the name of the network and subnet where the cluster is located.
1. Contact your DNS provider for the IP addresses of the DNS servers that should be used instead of those assigned to the cluster.

## 1. Change DNS server addresses in network settings

1. Get the ID of the subnet you want to edit:

   ```console
   openstack subnet list
   ```

1. Reset all assigned IP addresses:

   ```console
   openstack subnet set --no-dns-nameservers <SUBNET_ID>
   ```

   Here, `<SUBNET_ID>` is the ID of the subnet you want to edit.

1. Specify the new IP address:

   ```console
   openstack subnet set --dns-nameserver <DNS_ADDRESS> <SUBNET_ID>
   ```

   You can specify more than one IP address. In this case, repeat the `--dns-nameserver` parameter before each address. Following is a command example:

   ```console
   openstack subnet set --dns-nameserver <DNS_ADDRESS_1> --dns-nameserver <DNS_ADDRESS_2> --dns-nameserver <DNS_ADDRESS_3> <SUBNET_ID>
   ```

## 2. Reboot the cluster

To apply the changes:

1. [Stop](../../../instructions/manage-cluster#stop) your cluster and wait for all nodes to completely shut down.

1. [Start](../../../instructions/manage-cluster) the cluster again and wait for all nodes to initialize.

{note:warn}

Rebooting causes temporary unavailability of services on the cluster. Stop and start the cluster during off-peak hours.

{/note}

When the cluster starts, all its nodes will receive updated DNS settings.
