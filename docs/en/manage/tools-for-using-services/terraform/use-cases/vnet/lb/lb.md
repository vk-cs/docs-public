<warn>

Make sure you [installed and configured Terraform](../../../quick-start).

</warn>

To create a load balancer, create a `lb.tf` file that describes the configuration of the load balancer to be created. Add the text from the example below and correct the arguments values for your load balancer. The example describes the load balancer setup for two VMs, the traffic on which will be distributed by the created load balancer using the `ROUND_ROBIN` method.

### Create a network

To create a network for a load balancer, you need the following objects:

- Resources:

  - `vkcs_networking_network`: a network where a VM will be created. In the example below, a network named `lb` is created.
  - `vkcs_networking_subnet`: a subnet from the network. In the example: `lb`.

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

To create a load balancer, you need the following objects:

- Data sources:

  - `vkcs_images_image`: an installation image for the instance to be created.
  - `vkcs_compute_flavor`: a flavor (CPU, RAM, Disk) of the VM. You can see it in the VM creation wizard in your VK Cloud personal account.

- Resources:

  - `vkcs_compute_instance`: manages the resource of the virtual machine instance. Traffic on these VMs will be distributed by the load balancer to be created.

     <warn>

     All arguments, including the instance administrator password, will be stored in their original state in plain text. Learn more about [sensitive data](https://www.terraform.io/docs/language/state/sensitive-data.html?_ga=2.74378194.1320188012.1657572463-152934297.1633441142).

     </warn>

     The resource supports the following arguments:

    - `name`: the VM name.
    - `flavor_id`: the VM flavor used during its creation.
    - `security_groups`: the list of security group names assigned to this VM.
    - `image_id`: the OS image used to create this VM.
    - `network`: the network connected when creating this VM.
    - `depends_on`: this VM will start after creating the resources specified by this argument.

  - `vkcs_lb_loadbalancer`: manages the load balancer resource in VK Cloud. The following arguments are supported:

    - `name`: the human readable name for the load balancer. Doesn't have to be unique.
    - `vip_subnet_id`: the subnet where the load balancer address will be allocated. You can only create load balancers on networks that are allowed by the policy (for example, networks that are owned by you or networks that are public). Changing this argument creates a new load balancer.
    - `tags`: the list of simple strings assigned to the load balancer.

  - `vkcs_lb_listener`: manages the listener resource in VK Cloud. The following arguments are supported:

    - `name`: the human readable name for the listener. Doesn't have to be unique.
    - `protocol`: the protocol of the listener, it can be `TCP`, `HTTP`, `HTTPS`, `TERMINATED_HTTPS`, `UDP`. Changing this argument creates a new listener.
    - `protocol_port`: the port on which client traffic is listened. Changing this argument creates a new listener.
    - `loadbalancer_id`: the load balancer on which this listener should be provided. Changing this argument creates a new listener.

  - `vkcs_lb_pool`: manages the pool resource in VK Cloud. The following arguments are supported:

    - `name`: the human-readable name of the pool.
    - `protocol`: the protocol of the pool. Can be one of the following:`TCP`, `HTTP`, `HTTPS`, `PROXY` or `UDP`. Changing this argument creates a new pool.
    - `lb_method`: the load balancing algorithm for distributing traffic between pool members. It must be one of the following: `ROUND_ROBIN`, `LEAST_CONNECTIONS`, `SOURCE_IP`, or `SOURCE_IP_PORT`.
    - `listener_id`: the listener to which the pool members will be associated. Changing this argument creates a new pool. Note: You must specify either `loadbalancer_id` or `listener_id`.

  - `vkcs_lb_member`: manages the member resource in VK Cloud. The following arguments are supported:

    - `address`: the IP address of the member to which it will receive traffic from the load balancer. Changing this argument creates a new member.
    - `protocol_port`: the port on which client traffic is listened. Changing this argument creates a new member.
    - `pool_id`: the ID of the pool this member will be assigned to. Changing this argument creates a new member.
    - `subnet_id`: the subnet where the member can be accessed. Changing this argument creates a new member.
    - `weight`: a positive integer value indicating the relative portion of the traffic that this member must receive from the pool. For example, a member with the weight of 10 gets five times more traffic than a member with the weight of 2. The default value is 1.

```hcl

data "vkcs_images_image" "compute" {
    name="Ubuntu-18.04-STD2"
}

data "vkcs_compute_flavor" "compute" {
   name="STD2-2-4"
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
