```hcl

{includetag(secgroup)}
# Create a security group
resource "vkcs_networking_secgroup" "example" {
   name = "security_group"
   description = "terraform security group"
}
{/includetag}
{includetag(ruleoneport)}
# Create a security rule
resource "vkcs_networking_secgroup_rule" "example" {
   direction = "ingress"
   port_range_max = 22
   port_range_min = 22
   protocol = "tcp"
   remote_ip_prefix = "0.0.0.0/0"
   security_group_id = vkcs_networking_secgroup.example.id
   description = "secgroup_rule_22_tcp"
}
{/includetag}
{includetag(ruleassoc)}
# Associate the port with the security group
resource "vkcs_networking_port_secgroup_associate" "example" {
   port_id = vkcs_networking_port.example.id
   enforce = true
   security_group_ids = [
   vkcs_networking_secgroup.example.id,
   ]
}
{/includetag}
{includetag(alludp)}
# Create a security rule
resource "vkcs_networking_secgroup_rule" "example" {
  description       = "All inbound UDP traffic"
  security_group_id = vkcs_networking_secgroup.example.id
  direction         = "ingress"
  protocol          = "udp"
  remote_ip_prefix  = "0.0.0.0/0"
}
{/includetag}
{includetag(ingress)}
# Create a security rule
resource "vkcs_networking_secgroup_rule" "example" {
  description       = "All inbound UDP traffic"
  security_group_id = vkcs_networking_secgroup.example.id
  direction         = "ingress"
  remote_ip_prefix  = "0.0.0.0/0"
}
{/includetag}

```
