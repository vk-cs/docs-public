<warn>

First of all, make sure you [installed Terraform](../../quick-start) and [created a main.tf file](../../quick-start/configuration) with the required providers.

</warn>

To create a VPN connection, create a file `vpn.tf`, which will describe the configuration of the connection being created. Add the text from the examples below, and correct the setting values for your connection.

### Create a virtual network

To create a VPN connection, we need a virtual network with a router. If you already have an existing network and router, then go to the "Creating a VPN connection" step.

Create a network with the following objects:

1. Resources (resource):

- **vkcs_networking_network** — network where the VM will be created. In the example below, a network is created with the name "extnet".
- **vkcs_networking_subnet** — subnet from the network. In the example: "subnet".
- **vkcs_networking_router** — a router for an external network and interaction with the outside world. In the example: router.
- **vkcs_networking_router_interface** — connect the router to the internal network.

2. Data sources (data source):

- **vkcs_networking_network** — external network for obtaining public IP (Floating IP).

```hcl
data "vkcs_networking_network" "extnet" {
   name="extnet"
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

### Create a VPN connection

1. **vkcs_vpnaas_service** — manages the VPN service inside VK Cloud. Includes the following setting:

- router_id — router ID. Changing the value of this parameter creates a new service. If you need to use an existing router, then specify its id (data.vkcs_networking_router.router.id) using the data source:

```hcl
data "vkcs_networking_router" "router" {
   name="router_1"
}
```

2. **vkcs_vpnaas_ipsec_policy** — controls the IPSec policy of the resource inside VK Cloud. The following option is included:

- name — name of the created policy. Changing the value of this parameter changes the name of an existing policy.

3. **vkcs_vpnaas_ike_policy** — controls the IKE policy of the resource inside VK Cloud. Includes the following setting:

- name — name of the created policy. Changing the value of this parameter changes the name of an existing policy.

4. **vkcs_vpnaas_endpoint_group** — manages the "endpoint group" resource inside VK Cloud. Includes the following option:

- type — type of endpoints in the group. Accepts subnet, cidr, network, router, or vlan types. Changing the value of this parameter creates a new group.
- endpoints — a list of endpoints of the same type included in the endpoint group. The type of values depends on the type of endpoints. Changing the value of this parameter creates a new group.

5. **vkcs_vpnaas_site_connection** — manages the site IPSec connection resource inside VK Cloud. Includes the following options:

- name — connection name. Changing the value of this parameter changes the name of an existing connection.
- ikepolicy_id — ID of the IKE policy. Changing the value of this parameter creates a new connection.
- ipsecpolicy_id — ID of the IPsec policy. Changing the value of this parameter creates a new connection.
- vpnservice_id — VPN service ID. Changing the value of this parameter creates a new connection.
- psk — public key. Accepts any value of type "string".
- peer_address — public IPv4 or IPv6 address of the peer gateway, or FQDN.
- peer_id — peer router ID for authentication. Type values are accepted: IPv4 address, IPv6 address, e-mail, key ID, FQDN. Typically, the value of this parameter is the same as the value of the peer_address parameter. Changing the value of this parameter changes the policy of an existing connection.
- local_ep_group_id — ID of the endpoint group, which includes the private subnets of the local connection. Requires the peer_ep_group_id parameter to be specified unless backward compatibility mode is enabled, where peer_cidrs are already provided with the subnet_id of the VPN service. Changing the value of this parameter changes the existing connection.
- peer_ep_group_id — ID of the endpoint group, which includes the private CIDR addresses of the peer connection in the format `<net_adress>/<prefix>`. Requires local_ep_group_id to be specified unless backward compatibility mode is enabled, where peer_cidrs are already provided with the subnet_id of the VPN service.
- dpd — settings dictionary for the Dead Peer Detection(DPD) protocol. Includes the following resources:

- action — DPD action. Possible values: clear, hold, restart, disabled, restart-by-peer. Default value: hold.
- timeout — DPD timeout in seconds. Positive integer data is accepted, the values of which are greater than iinterval. Default value: 120.
- interval — DPD interval in seconds. Positive integer data type is accepted. Default value: 30.

- depends_on — The VPN connection will not start until the specified resources have been created.

```hcl
resource "vkcs_vpnaas_service" "service" {
   router_id = "${vkcs_networking_router.router.id}"
}

resource "vkcs_vpnaas_ipsec_policy" "policy_1" {
name="ipsec-policy"
}

resource "vkcs_vpnaas_ike_policy" "policy_2" {
   name="ike-policy"
}

resource "vkcs_vpnaas_endpoint_group" "group_1" {
type="cidr"
endpoints = ["10.0.0.24/24", "10.0.0.25/24"]
}
resource "vkcs_vpnaas_endpoint_group" "group_2" {
type="subnet"
endpoints = [ "${vkcs_networking_subnet.subnet.id}" ]
}

resource "vkcs_vpnaas_site_connection" "connection" {
name="connection"
ikepolicy_id = "${vkcs_vpnaas_ike_policy.policy_2.id}"
ipsecpolicy_id = "${vkcs_vpnaas_ipsec_policy.policy_1.id}"
vpnservice_id = "${vkcs_vpnaas_service.service.id}"
psk="secret"
peer_address = "192.168.10.1"
peer_id = "192.168.10.1"
local_ep_group_id = "${vkcs_vpnaas_endpoint_group.group_2.id}"
peer_ep_group_id = "${vkcs_vpnaas_endpoint_group.group_1.id}"
dpd {
action = "restart"
timeout = 42
interval = 21
}
depends_on = ["vkcs_networking_router_interface.router_interface"]
}
```

Add both parts of the example to the vpn.tf file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
