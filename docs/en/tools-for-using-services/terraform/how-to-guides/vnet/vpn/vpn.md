After completing the steps in this guide, you will:

1. [Create](#create-file) a configuration file.
1. [Add](#add-net) resources and data sources for a virtual network.
1. [Add](#add-vpn) a resource for a VPN connection.
1. [Create](#create-connection) the added resources.

For a full description of parameters, see the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Prerequisites

1. Check the [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits). Make sure the selected [region](/en/tools-for-using-services/account/concepts/regions) has enough resources to create networks. Different regions may have different quotas.

   If necessary, [increase](/en/tools-for-using-services/account/instructions/project-settings/manage#increase-quota) the quotas.

1. [Install Terraform and configure the provider](../../../quick-start) if you have not already done so.
1. Place the provider settings file in the directory from which you will work with the project, and from that directory run the command:

    ```console
    terraform init
    ```
    Wait for Terraform initialization to complete.

## {heading({counter(vpn)}. Create a configuration file)[id=create-file]}

In the directory from which you will work with the project, create the `vpn.tf` file. This file will describe the configuration of the connection being created.

## {heading({counter(vpn)}. Add a virtual network)[id=add-net]}

1. Depending on the [SDN](/ru/networks/vnet/concepts/sdn) you use, copy the contents of one of the tabs below into the `vpn.tf` file.

    {tabs}

    {tab(Neutron)}

    ```hcl
    data "vkcs_networking_network" "extnet" {
      name = "ext-net"
    }

    resource "vkcs_networking_network" "network" {
      name = "vpnaas_network"
      sdn  = "neutron"
    }

    resource "vkcs_networking_subnet" "subnet" {
      name = "vpnaas_subnet"
      network_id = vkcs_networking_network.network.id
      cidr = "192.168.199.0/24"
    }

    resource "vkcs_networking_router" "router" {
      name = "router"
      sdn  = "neutron"
      external_network_id = data.vkcs_networking_network.extnet.id
    }

    resource "vkcs_networking_router_interface" "router_interface" {
      router_id = vkcs_networking_router.router.id
      subnet_id = vkcs_networking_subnet.subnet.id
    }
    ```

    To create the network, you will need the following objects:

    - Resources (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — the network in which the ВМ will be created.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — a subnet in this network.
      - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md) — a router that connects the private network to external networks.
      - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md) — an interface that connects the router to the internal network.

    - Data source (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — an external network for assigning a public IP address to the router, as well as allocating a Floating IP address to entities in the private network.

    {/tab}

    {tab(Sprut)}

    ```hcl
    data "vkcs_networking_network" "extnet" {
      name = "internet"
    }

    resource "vkcs_networking_network" "network" {
      name = "vpnaas_network"
      sdn  = "sprut"
    }

    resource "vkcs_networking_subnet" "subnet" {
      name = "vpnaas_subnet"
      network_id = vkcs_networking_network.network.id
      cidr = "192.168.199.0/24"
    }

    resource "vkcs_dc_router" "router" {
      name = "router"
      sdn  = "sprut"
    }

    resource "vkcs_dc_interface" "interface_1" {
      name         = "LAN"
      dc_router_id = vkcs_dc_router.router.id
      network_id   = vkcs_networking_network.network.id
      subnet_id    = vkcs_networking_subnet.subnet.id
      ip_address   = vkcs_networking_subnet.subnet.gateway_ip
    }

    resource "vkcs_dc_interface" "interface_2" {
      name         = "WAN"
      dc_router_id = vkcs_dc_router.router.id
      network_id   = data.vkcs_networking_network.extnet.id
    }
    ```

    To create the network, you will need the following objects:

    - Resources (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — the network in which the ВМ will be created.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — a subnet in this network.
      - [vkcs_dc_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_router.md) — a router that connects the private network to external networks.
      - [vkcs_dc_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_interface.md) — an interface that connects the router to the internal and external network.

    - Data source (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — an external network for obtaining a public IP address.

    {/tab}

    {/tabs}

1. Edit the settings values for your connection.

For more information about creating virtual networks using Terraform, see the hands-on guide [Creating networks](/en/tools-for-using-services/terraform/how-to-guides/vnet/network).

## {heading({counter(vpn)}. Add a VPN connection)[id=add-vpn]}

1. Copy the VPN connection settings into the `vpn.tf` file:

    ```hcl
    resource "vkcs_vpnaas_service" "service" {
        router_id = vkcs_networking_router.router.id
    }

    resource "vkcs_vpnaas_ipsec_policy" "policy_1" {
        name = "ipsec-policy"
    }

    resource "vkcs_vpnaas_ike_policy" "policy_2" {
        name = "ike-policy"
    }

    resource "vkcs_vpnaas_endpoint_group" "group_1" {
      type = "cidr"
      endpoints = ["10.0.0.24/24", "10.0.0.25/24"]
    }
    resource "vkcs_vpnaas_endpoint_group" "group_2" {
      type = "subnet"
      endpoints = [ vkcs_networking_subnet.subnet.id ]
    }

    resource "vkcs_vpnaas_site_connection" "connection" {
      name = "connection"
      ikepolicy_id = vkcs_vpnaas_ike_policy.policy_2.id
      ipsecpolicy_id = vkcs_vpnaas_ipsec_policy.policy_1.id
      vpnservice_id = vkcs_vpnaas_service.service.id
      psk = "secret"
      peer_address = "192.168.10.1"
      peer_id = "192.168.10.1"
      local_ep_group_id = vkcs_vpnaas_endpoint_group.group_2.id
      peer_ep_group_id = vkcs_vpnaas_endpoint_group.group_1.id
      dpd {
        action   = "restart"
        timeout  = 42
        interval = 21
      }
      depends_on = [vkcs_networking_router_interface.router_interface]
    }
    ```

    The following resources are used to add a VPN connection:

    - [vkcs_vpnaas_service](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_service.md) — manages the VPN service within VK Cloud. Includes the `router_id` parameter — the router ID. By changing the value of this parameter, you will create a new service. If you need to use an existing router, specify its ID (`data.vkcs_networking_router.router.id` or `data.vkcs_dc_router.router.id`) using a data source.
      
      {cut(Example)}

      ```hcl
      data "vkcs_networking_router" "router" {
        name = "router_1"
      }
      ```
      {/cut}

    - [vkcs_vpnaas_ipsec_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ipsec_policy.md) — manages the IPSec policy of the resource within VK Cloud. Includes the `name` parameter — the name of the policy being created. By changing the value of this parameter, you will change the name of an existing policy.

    - [vkcs_vpnaas_ike_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ike_policy.md) — manages the IKE policy of the resource within VK Cloud. Includes the `name` parameter — the name of the policy being created. By changing the value of this parameter, you will change the name of an existing policy.

    - [vkcs_vpnaas_endpoint_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_endpoint_group.md) — manages an endpoint group within VK Cloud. Includes the following parameters:

      - `type` — the type of endpoints in the group. Can be `subnet`, `cidr`, `network`, `router`, or `vlan`. By changing the value of this parameter, you will create a new group.
      - `endpoints` — a list of endpoints of the same type included in the endpoint group. The type of list elements is determined by the `type` parameter. By changing the value of the `endpoints` parameter, you will create a new group.

    - [vkcs_vpnaas_site_connection](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_site_connection.md) — manages the IPSec site connection resource within VK Cloud. Includes the following parameters:

      - `name` — the connection name. By changing the value of this parameter, you will change the name of an existing connection.
      - `ikepolicy_id` — the IKE policy ID. By changing the value of this parameter, you will create a new connection.
      - `ipsecpolicy_id` — the IPsec policy ID. By changing the value of this parameter, you will create a new connection.
      - `vpnservice_id` — the VPN service ID. By changing the value of this parameter, you will create a new connection.
      - `psk` — the public key. Accepts any `string` values.
      - `peer_address` — the FQDN or public IP address (IPv4 or IPv6) of the peer gateway.
      - `peer_id` — the peer router ID for authentication. Can be of types `<АДРЕС_IPv4>`, `<АДРЕС_IPv6>`, `<EMAIL>`, `<KEY_ID>`, `<FQDN>`. Typically, the value of this parameter matches the value of the `peer_address` parameter. By changing the value of this parameter, you will change the policy of an existing connection.
      - `local_ep_group_id` — the endpoint group ID that includes the private subnets of the local connection. Requires specifying the `peer_ep_group_id` parameter if backward compatibility mode is not enabled, where `peer_cidrs` values are already provided together with the `subnet_id` value of the VPN service. By changing the value of this parameter, you will modify an existing connection.
      - `peer_ep_group_id` — the endpoint group ID that includes the private CIDR addresses of the peer connection in the `<IP-АДРЕС>/<ПРЕФИКС>` format. Requires specifying the `local_ep_group_id` parameter if backward compatibility mode is not enabled, where `peer_cidrs` values are already provided together with the `subnet_id` value of the VPN service.
      - `dpd` — a map of settings for the Dead Peer Detection (DPD) protocol. Includes the following resources:

        - `action` — the DPD action. Possible values: `clear`, `hold`, `restart`, `disabled`, `restart-by-peer`. Default value: `hold`.
        - `timeout` — the DPD timeout in seconds. Accepts `positive integer` values that are greater than `interval`. Default value: `120`.
        - `interval` — the DPD interval in seconds. Accepts `positive integer` values. Default value: `30`.

      - `depends_on` — the VPN connection will start after the specified resources are created.

1. Edit the settings values for your connection.

## {heading({counter(vpn)}. Create a VPN connection)[id=create-connection]}

1. Go to the directory containing the `vpn.tf` file.
1. Make sure the configuration files are correct and contain the required changes:

    ```console
    terraform validate && terraform plan
    ```

1. Apply the changes:

    ```console
    terraform apply
    ```

    When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.  

## {heading({counter(vpn)}. Verify configuration application)[id=check]}

Make sure that the network and infrastructure were created successfully:

1. [Go to](https://cloud.vk.com/app/) the VK Cloud management console.
1. Go to **Virtual networks** → **VPN**. Make sure the VPN connection is created and includes all resources added in the example.

## Delete unused resources

If the resources created with Terraform are no longer needed, delete them:

1. Go to the directory with the Terraform configuration files.
1. Run the command:

    ```console
    terraform destroy
    ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.
