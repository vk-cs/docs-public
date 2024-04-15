<warn>

Make sure you [installed and configured Terraform](../../../quick-start).

</warn>

To create a VPN connection, create a file `vpn.tf`, which describes the configuration of the connection to be created. Add the text from the examples below and correct the arguments values for your connection.

## Create a virtual network

To create a VPN connection, you need a virtual network with a router. If you already have a network and a router, skip this section and go to [Creating a VPN connection](#create_a_vpn_connection).

Create a network with the following objects:

- Resources:

  - `vkcs_networking_network`: a network where a VM will be created. In the example below, the network named `extnet` is created.
  - `vkcs_networking_subnet`: a subnet from the network. In the example: `subnet`.
  - `vkcs_networking_router`: a router for an external network and interaction with the outside world. In the example: `router`.
  - `vkcs_networking_router_interface`: connects the router to the internal network.

- Data sources:

  - `vkcs_networking_network`: an external network for obtaining a floating IP address.

```hcl
data "vkcs_networking_network" "extnet" {
   name="internet"
}

resource "vkcs_networking_network" "network" {
   name="vpnaas_network"
}

resource "vkcs_networking_subnet" "subnet" {
  network_id = "${vkcs_networking_network.network.id}"
  cidr="192.168.199.0/24"
}

resource "vkcs_networking_router" "router" {
   name="router"
   external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "router_interface" {
  router_id = "${vkcs_networking_router.router.id}"
  subnet_id = "${vkcs_networking_subnet.subnet.id}"
}
```

## Create a VPN connection

- `vkcs_vpnaas_service`: manages the VPN service inside VK Cloud. The resource supports a `router_id` argument, which is the router ID. Changing the value of this argument creates a new service. If you need to use an existing router, specify its ID (`data.vkcs_networking_router.router.id`) using the data source:

```hcl
data "vkcs_networking_router" "router" {
   name="router_1"
}
```

- `vkcs_vpnaas_ipsec_policy`: controls the IPSec policy of the resource inside VK Cloud. The resource supports a `name` argument, which is the name of the policy to be created. Changing the value of this argument changes the name of the existing policy.

- `vkcs_vpnaas_ike_policy`: controls the IKE policy of the resource inside VK Cloud. The resource supports a `name` argument, which is the name of the policy to be created. Changing the value of this argument changes the name of the existing policy.

- `vkcs_vpnaas_endpoint_group`: manages the "endpoint group" resource inside VK Cloud. The following arguments are supported:

  - `type`: the type of endpoints in the group. The following types are acceptable: `subnet`, `cidr`, `network`, `router`, or `vlan`. Changing the value of this argument creates a new group.
  - `endpoints`: the list of endpoints of the same type included in the endpoint group. The type of the list items is determined by the `type` argument. Changing the value of the `endpoints` argument creates a new group.

- `vkcs_vpnaas_site_connection`: manages the site IPSec connection resource inside VK Cloud. The following arguments are supported:

  - `name`: the connection name. Changing the value of this argument changes the name of the existing connection.
  - `ikepolicy_id`: the ID of the IKE policy. Changing the value of this argument creates a new connection.
  - `ipsecpolicy_id`: the ID of the IPsec policy. Changing the value of this argument creates a new connection.
  - `vpnservice_id`: the VPN service ID. Changing the value of this argument creates a new connection.
  - `psk`: the public key. Any value of type `string` is acceptable.
  - `peer_address`: the public IPv4 or IPv6 address of the peer gateway, or FQDN.
  - `peer_id`: the peer router ID for authentication. The acceptable type values are `IPv4 address`, `IPv6 address`, `e-mail`, `key ID`, `FQDN`. Typically, the value of this argument is the same as the value of the `peer_address` argument. Changing the value of the `peer_id` argument changes the policy of the existing connection.
  - `local_ep_group_id`: the ID of the endpoint group, which includes the private subnets of the local connection. Requires the `peer_ep_group_id` argument to be specified unless backward compatibility mode is enabled, where the `peer_cidrs` values are already provided with the `subnet_id` value of the VPN service. Changing the value of this paraargumentmeter changes the existing connection.
  - `peer_ep_group_id`: the ID of the endpoint group, which includes the private CIDR addresses of the peer connection in the format `<net_adress>/<prefix>`. Requires `local_ep_group_id` to be specified unless backward compatibility mode is enabled, where the `peer_cidrs` values are already provided with the `subnet_id` value of the VPN service.
  - `dpd`: the settings dictionary for the Dead Peer Detection (DPD) protocol. The following arguments are supported:

    - `action`: the DPD action. Possible values: `clear`, `hold`, `restart`, `disabled`, `restart-by-peer`. Default value: `hold`.
    - `timeout`: the DPD timeout in seconds. Must be a positive integer, which is greater than the `interval` argument value. Default value: `120`.
    - `interval`: the DPD interval in seconds. Must be a positive integer. Default value: `30`.

  - `depends_on`: the VPN connection will start after creating the specified resources.

```hcl
resource "vkcs_vpnaas_service" "service" {
   router_id = "${vkcs_networking_router.router.id}"
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
	endpoints = [ "${vkcs_networking_subnet.subnet.id}" ]
}

resource "vkcs_vpnaas_site_connection" "connection" {
	name = "connection"
	ikepolicy_id = "${vkcs_vpnaas_ike_policy.policy_2.id}"
	ipsecpolicy_id = "${vkcs_vpnaas_ipsec_policy.policy_1.id}"
	vpnservice_id = "${vkcs_vpnaas_service.service.id}"
	psk = "secret"
	peer_address = "192.168.10.1"
	peer_id = "192.168.10.1"
	local_ep_group_id = "${vkcs_vpnaas_endpoint_group.group_2.id}"
	peer_ep_group_id = "${vkcs_vpnaas_endpoint_group.group_1.id}"
	dpd {
		action   = "restart"
		timeout  = 42
		interval = 21
	}
	depends_on = ["vkcs_networking_router_interface.router_interface"]
}
```

Add both parts of the example to the `vpn.tf` file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
