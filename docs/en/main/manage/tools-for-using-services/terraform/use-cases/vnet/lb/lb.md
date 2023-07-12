<warn>

First of all, make sure you [installed and configured Terraform](../../../quick-start).

</warn>

To create a load balancer, create a `lb.tf` file that describes the configuration of the load balancer to be created. Add the text from the examples below and correct the setting values for your load balancer. This example describes the Load Balancer setup for two VMs, the traffic on which will be distributed by the load balancer created by the ROUND_ROBIN method.

### Create a network

To create a network for a load balancer, you need the following objects:

- Resources:

  - **vkcs_networking_network** — network where the VM will be created. In the example below, a network is created with the name "lb".
  - **vkcs_networking_subnet** — subnet from the network. In the example: lb.

```hcl
resource "vkcs_networking_network" "lb" {
   name="network"
}

resource "vkcs_networking_subnet" "lb" {
   name="subnet"
   cidr="192.168.199.0/24"
   network_id = "${vkcs_networking_network.lb.id}"
}
```

### Create a load balancer

To create a Load Balancer, you need the following objects:

- Data sources:

  - **vkcs_images_image** — installation image for the created instance.
  - **vkcs_compute_flavor** — flavor (CPU, RAM, Disk) of the VM. You can see it in the VM creation wizard through your personal account.

- Resources:

  - **vkcs_compute_instance** — Manages the compute virtual machine instance resource. Traffic on these VMs will be distributed by the created load balancer.

     <warn>

     **Attention**

     All arguments, including the instance administrator password, will be stored in their original state in plain text. Learn more about [sensitive data](https://www.terraform.io/docs/language/state/sensitive-data.html?_ga=2.74378194.1320188012.1657572463-152934297.1633441142).

     </warn>

     Contains the following resources:

    - **name** — VM name.
    - **flavor_id** — VM flavor used during creation.
    - **security_groups** — list of security group names assigned to this VM.
    - **image_id** is the OS image used to create this VM.
    - **network** — network connected when creating a VM.
    - **depends_on** — The VM will not start until the specified resources are created.

  - **vkcs_lb_loadbalancer** — Manages the load balancer resource in VKCS. Includes the following resources:

    - **name** — Human readable name for the load balancer. Doesn't have to be unique.
    - **vip_subnet_id** — Subnet where the load balancer address will be allocated. The client can only create load balancers on networks that are allowed by the policy (for example, networks that are owned by it or networks that are public). Changing this setting creates a new load balancer.
    - **tags** — List of simple strings assigned to the load balancer.

  - **vkcs_lb_listener** — Manages the listener resource in VKCS. Includes the following resources:

    - **name** — Human readable name for the Listener. Doesn't have to be unique.
    - **protocol** — Protocol — can be TCP, HTTP, HTTPS, TERMINATED_HTTPS, UDP. Changing this setting creates a new listener.
    - **protocol_port** — Port on which client traffic is listened. Changing this setting creates a new listener.
    - **loadbalancer_id** — The load balancer on which this listener should be provided. Changing this setting creates a new listener.

  - **vkcs_lb_pool** — Manages the pool resource in VK Cloud. Includes the following resources:

    - **name** — The human-readable name of the pool.
    - **protocol** — Protocol — can be TCP, HTTP, HTTPS, PROXY or UDP. Changing this setting creates a new pool.
    - **lb_method** — Load balancing algorithm for distributing traffic between pool members. Must be one of ROUND_ROBIN, LEAST_CONNECTIONS, SOURCE_IP, or SOURCE_IP_PORT.
    - **listener_id** — The listener to which the pool members will be associated. Changing this setting creates a new pool. Note: You must specify one of the LoadbalancerID or ListenerID.

  - **vkcs_lb_member** — Manages the member resource in VKCS. Includes the following resources:

    - **address** — IP address of the member to receive traffic from the load balancer. Changing this setting creates a new member.
    - **protocol_port** — Port on which client traffic is listened. Changing this setting creates a new member.
    - **pool_id** — ID of the pool this member will be assigned to. Changing this setting creates a new member.
    - **subnet_id** — The subnet where the member can be accessed. Changing this setting creates a new member.
    - **weight** — A positive integer value indicating the relative portion of the traffic that this the participant must receive from the pool. For example, a member with a weight of 10 gets five times more traffic than a member with a weight of 2. The default value is 1.

```hcl

data "vkcs_images_image" "compute" {
    name="Ubuntu-18.04-Standard"
}

data "vkcs_compute_flavor" "compute" {
   name="Basic-1-2-20"
}

resource "vkcs_compute_instance" "compute_1" {
   name="compute-instance-1"
   flavor_id = data.vkcs_compute_flavor.compute.id
   security_groups = ["default"]
   image_id = data.vkcs_images_image.compute.id

   network {
     uuid = vkcs_networking_network.lb.id
     fixed_ip_v4 = "192.168.199.110"
   }

   depends_on = [
     vkcs_networking_network.lb,
     vkcs_networking_subnet.lb
   ]
}

resource "vkcs_compute_instance" "compute_2" {
   name="compute-instance-2"
   flavor_id = data.vkcs_compute_flavor.compute.id
   security_groups = ["default"]
   image_id = data.vkcs_images_image.compute.id

   network {
     uuid = vkcs_networking_network.lb.id
     fixed_ip_v4 = "192.168.199.111"
   }

   depends_on = [
     vkcs_networking_network.lb,
     vkcs_networking_subnet.lb
   ]
}

resource "vkcs_lb_loadbalancer" "loadbalancer" {
   name="loadbalancer"
   vip_subnet_id = "${vkcs_networking_subnet.lb.id}"
   tags = ["tag1"]
}

resource "vkcs_lb_listener" "listener" {
   name="listener"
   protocol="HTTP"
   protocol_port = 8080
   loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer.id}"
}

resource "vkcs_lb_pool" "pool" {
   name="pool"
   protocol="HTTP"
   lb_method = "ROUND_ROBIN"
   listener_id = "${vkcs_lb_listener.listener.id}"
}

resource "vkcs_lb_member" "member_1" {
   address = "192.168.199.110"
   protocol_port = 8080
   pool_id = "${vkcs_lb_pool.pool.id}"
   subnet_id = "${vkcs_networking_subnet.lb.id}"
   weight = 0
}

resource "vkcs_lb_member" "member_2" {
   address = "192.168.199.111"
   protocol_port = 8080
   pool_id = "${vkcs_lb_pool.pool.id}"
   subnet_id = "${vkcs_networking_subnet.lb.id}"
}
```

### Apply changes

Add both parts of the example to the `lb.tf` file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
