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
        
{includetag(ssh)}
# SSH
# Create a security group
resource "vkcs_networking_secgroup" "ssh" {
   name = "ssh"
   description = "Security group for SSH"
}

# Create a security rule
resource "vkcs_networking_secgroup_rule" "22-rule" {
  description       = "Ingress traffic 22 port"
  security_group_id = vkcs_networking_secgroup.ssh.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 22
  port_range_min    = 22        
  remote_ip_prefix  = "0.0.0.0/0"
{/includetag}

{includetag(sshwww)}
# SSH+WWW
# Create a security group
resource "vkcs_networking_secgroup" "sshwww" {
   name = "ssh+www"
   description = "Security group for SSH and WWW"
}

# Create security rules
resource "vkcs_networking_secgroup_rule" "22-rule" {
  description       = "Ingress traffic 22 port"
  security_group_id = vkcs_networking_secgroup.sshwww.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 22
  port_range_min    = 22        
  remote_ip_prefix  = "0.0.0.0/0"

resource "vkcs_networking_secgroup_rule" "80-rule" {
  description       = "Ingress traffic 80 port"
  security_group_id = vkcs_networking_secgroup.sshwww.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 80
  port_range_min    = 80        
  remote_ip_prefix  = "0.0.0.0/0"

resource "vkcs_networking_secgroup_rule" "443-rule" {
  description       = "Ingress traffic 443 port"
  security_group_id = vkcs_networking_secgroup.sshwww.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 443
  port_range_min    = 443        
  remote_ip_prefix  = "0.0.0.0/0"
{/includetag}

{includetag(rdp)}
# RDP
# Create a security group
resource "vkcs_networking_secgroup" "rdp" {
   name = "rdp"
   description = "Security group for RDP"
}

# Create a security rule
resource "vkcs_networking_secgroup_rule" "3389-rule" {
  description       = "Ingress traffic 22 port"
  security_group_id = vkcs_networking_secgroup.rdp.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 3389
  port_range_min    = 3389        
  remote_ip_prefix  = "0.0.0.0/0"
{/includetag}

{includetag(rdpwww)}
# RDP+WWW
# Create a security group
resource "vkcs_networking_secgroup" "rdpwww" {
   name = "rdp+www"
   description = "Security group for RDP and WWW"
}

# Create security rules
resource "vkcs_networking_secgroup_rule" "3389-rule" {
  description       = "Ingress traffic 3389 port"
  security_group_id = vkcs_networking_secgroup.rdpwww.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 3389
  port_range_min    = 3389        
  remote_ip_prefix  = "0.0.0.0/0"

resource "vkcs_networking_secgroup_rule" "80-rule" {
  description       = "Ingress traffic 80 port"
  security_group_id = vkcs_networking_secgroup.rdpwww.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 80
  port_range_min    = 80        
  remote_ip_prefix  = "0.0.0.0/0"

resource "vkcs_networking_secgroup_rule" "443-rule" {
  description       = "Ingress traffic 443 port"
  security_group_id = vkcs_networking_secgroup.rdpwww.id
  direction         = "ingress"
  protocol          = "tcp"
  port_range_max    = 443
  port_range_min    = 443        
  remote_ip_prefix  = "0.0.0.0/0"
{/includetag}

{includetag(all)}
# ALL
# Create a security group
resource "vkcs_networking_secgroup" "all" {
   name = "all"
   description = "Security group to allow all the ingress traffic"
}

# Create a security rule
resource "vkcs_networking_secgroup_rule" "all-rule" {
  description       = "Ingress traffic all ports"
  security_group_id = vkcs_networking_secgroup.all.id
  direction         = "ingress"
  protocol          = "tcp"
  remote_ip_prefix  = "0.0.0.0/0"
{/includetag}
```
