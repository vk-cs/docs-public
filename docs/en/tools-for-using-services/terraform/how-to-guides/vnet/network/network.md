The article provides examples of creating cloud networks in the Cloud Network service using Terraform:

- private network
- networks with Internet access
- networks with a port tied to a floating IP address

When creating the net the following is used:

- Resources:

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md)
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md)
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md)
  - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md)
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md)
  - [vkcs_networking_floatingip](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_floatingip.md)

- Data sources:

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md)
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md)
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_router.md)
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md)

## Preperation steps

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you want to create the network. Different regions may have different quotas configured.

   To increase your quotas, please contact [technical support](/en/contacts).

1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.

## 1. Create a net manifest file

Create a Terraform configuration file named `network.tf`. The content depends on the net type you need.

<tabs>
<tablist>
<tab>Private net</tab>
<tab>Net with Internet access</tab>
<tab>Net with port allocated to floating IP</tab>
</tablist>
<tabpanel>

In the file, the following configuration is described:

  1. Create the `example-tf-net` net in the `Sprut` SDN.
  1. Create the `example-tf-subnet` subnet in the `example-tf-net` net.
  1. Create the `example-tf-router` router in the `Sprut` SDN, without [external network](/en/networks/vnet/concepts/net-types#external_network) connection.
  1. Connect the `example-tf-subnet` subnet and the `example-tf-router` router.

{include(/en/_includes/_create_network_tf.md)[tags=net,router,shift=2]}

</tabpanel>
<tabpanel>

In the file, the following configuration is described:

  1. Create the `example-tf-net` net in the `Sprut` SDN.
  1. Create the `example-tf-subnet` subnet in the `example-tf-net` net.
  1. Create the `example-tf-router` router in the `Sprut` SDN, with [external network](/en/networks/vnet/concepts/net-types#external_network) connection.
  1. Connect the `example-tf-subnet` subnet and the `example-tf-router` router.

{include(/en/_includes/_create_network_tf.md)[tags=extnet,net,extrouter,shift=2]}

</tabpanel>
<tabpanel>

In the file, the following configuration is described:

  1. Create the `example-tf-net` net in the `Sprut` SDN.
  1. Create the `example-tf-subnet` subnet in the `example-tf-net` net.
  1. Create the `example-tf-router` router in the `Sprut` SDN, with [external network](/en/networks/vnet/concepts/net-types#external_network) connection.
  1. Connect the `example-tf-subnet` subnet and the `example-tf-router` router.
  1. Create the port with the `192.168.199.23` IP address.
  1. Allocate the port and the floating IP.

  {include(/en/_includes/_create_network_tf.md)[tags=extnet,net,extrouter,port]}

</tabpanel>
</tabs>

Here:

- `admin_state_up` — creating the resource in the enabled state `true` or disabled — `false`.

- `external` — [external network](/en/networks/vnet/concepts/net-types#external_network): `true` or `false`.

- `external_network_id` — the ID of an external network for the Internet access. You can specify ID in the manifest or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `external_network_id = data.vkcs_networking_network.extnet.id`: the ID is taken from the `vkcs_networking_network` data source.
  - `external_network_id = "bb76507d-dddd-dddd-dddd-2bca1a4c4cfc"`: the ID is taken from the [network list](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in the VK Cloud account or via the Openstack CLI.

  </details>

- `fixed_ip` — the fixed IP address for the port. Specify the arguments:

  - `subnet_id` — the port will be allocated with one of the ID addresses in this subnet. If you specify this argument only, IP address for the port will be selected automatically from the subnet IP adresses pool.
  - (Optional) `ip_address` — the port will be allocated with the specified IP address.

- `network_id` — the ID of the network. In the examples the subnet is hosted on the new network. You can host the subnet on the existed network, and specify the ID in the manifest or or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `network_id = vkcs_networking_network.example.id`: the subnet will be hosted on a new network, which will be created by the `vkcs_networking_network` resource.
  - `network_id = data.vkcs_networking_network.example.id`: the subnet will be hosted on the existed network, the ID is taken from the `vkcs_networking_network` data source.
  - `network_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the subnet will be hosted on the existed network. The ID is taken from the [network list](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in the VK Cloud account or via the Openstack CLI.

  </details>

- `pool` — the pool of floating IP adresses : `internet` for [SDN](/en/networks/vnet/concepts/architecture#sdns_used) Sprut, `ext-net` for SDN Neutron.

- `port_id` — the ID of the port, that will be allocated with a floating IP address. You can specify ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `port_id = vkcs_networking_port.example.id`: the port ID will be taken after creating the `vkcs_networking_port` resource.
  - `port_id = data.vkcs_networking_port.example.id`: the port ID is taken from the `vkcs_networking_port` data source.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the port ID is taken from the [list of ports](/en/networks/vnet/service-management/ports#viewing_a_list_of_ports_and_port_information) in the VK Cloud account or via the Openstack CLI.

  </details>

- `router_id` — the ID of the router, connected to the subnet. In the example the subnet is connected with a new router. You can connect the subnet with an existing router, and specify the ID in the manifest or or get it from the data source.

  <details>
    <summary>Examples</summary>

  - `router_id = vkcs_networking_subnet.example.id`: the subnet will be connected to the router that will be created with the `vkcs_networking_router` resource.
  - `router_id = data.vkcs_networking_subnet.example.id`: the subnet will be connected to the existing router. The router ID is taken from the `vkcs_networking_router` data source.
  - `router_id = "bb76507d-cccc-cccc-cccc-2bca1a4c4cfc"`: the subnet will be connected to the existing router. The router ID is taken from the [list of routers](/en/networks/vnet/service-management/router#viewing_a_list_of_routers_and_information_about_them) in the VK Cloud account or via the Openstack CLI.

  </details>

- `sdn` — [SDN](/en/networks/vnet/concepts/architecture#sdns_used), where the resource will be created (nets, subnets, routers, etc.). Possible values: `neutron`, `sprut`. If SDN is not specified, the default SDN is used. You can find out SDNs available to your project in the [project settings](/en/tools-for-using-services/account/service-management/project-settings/manage#sdn_view).

- `subnet_id` — the ID of the subnet. You can specify ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `subnet_id = vkcs_networking_subnet.example.id`: the subnet ID will be taken after creating the `vkcs_networking_subnet` resource.
  - `subnet_id = data.vkcs_networking_subnet.example.id`: the subnet ID is taken from the `vkcs_networking_subnet` data source.
  - `subnet_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: the port ID is taken from the [network list](/en/networks/vnet/service-management/net#viewing_the_list_of_networks_and_subnets_and_information_about_them) in the VK Cloud account or via the Openstack CLI.

  </details>

## 2. Create the necessary resources using Terraform

1. Put the Terraform configuration files in one directory:
  
   - `vkcs_provider.tf`;
   - `network.tf`.

1. Open this directory.
1. Make sure that the configuration files are correct and contain the required changes:

   ```bash
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```bash
   terraform apply
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.

## 3. Check configuration application

Verify that the net and infrastructure were successfully created:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud personal account.
1. Go to **Virtual networks** → **Networks**. Make sure the net is created and has all subnets, routers and ports added in the example.

## Delete unused resources

If you no longer need the Terraform resources, delete them:

1. Open the directory that contains the Terraform configuration files.
1. Run the command:

   ```bash
   terraform destroy
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.
