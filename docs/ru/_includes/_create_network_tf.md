<err>

Разместите ресурсы в одной SDN, иначе они не будут созданы.

</err>

```hcl

{includetag(extnet)}
# Get external network with Internet access
data "vkcs_networking_network" "extnet" {
   sdn        = "sprut"
   external   = true
}
{/includetag}
{includetag(net)}
# Create a network
resource "vkcs_networking_network" "example" {
   name       = "example-tf-net"
   sdn        = "sprut"
}
# Create a subnet
resource "vkcs_networking_subnet" "example" {
   name       = "example-tf-subnet"
   network_id = vkcs_networking_network.example.id
   cidr       = "192.168.199.0/24"
}
{/includetag}
{includetag(router)}
# Create a router
resource "vkcs_networking_router" "example" {
   name       = "example-tf-router"
   sdn        = "sprut"
}
# Connect the network to the router
resource "vkcs_networking_router_interface" "example" {
   router_id  = vkcs_networking_router.example.id
   subnet_id  = vkcs_networking_subnet.example.id
}
{/includetag}
{includetag(extrouter)}
# Create a router
resource "vkcs_networking_router" "example" {
   name       = "example-tf-router"
   sdn        = "sprut"
   external_network_id = data.vkcs_networking_network.extnet.id
}
# Connect the network to the router
resource "vkcs_networking_router_interface" "example" {
   router_id  = vkcs_networking_router.example.id
   subnet_id  = vkcs_networking_subnet.example.id
}
{/includetag}
{includetag(port)}
# Create a port
resource "vkcs_networking_port" "example" {
   name = "example_port"
   admin_state_up = "true"
   network_id = vkcs_networking_network.example.id
   fixed_ip {
      subnet_id =  vkcs_networking_subnet.example.id
      ip_address = "192.168.199.23"
      }
}
# Allocate a floating IP with a port
resource "vkcs_networking_floatingip" "associated_fip" {
  pool    = "internet"
  port_id = vkcs_networking_port.example.id
}
{/includetag}

```
