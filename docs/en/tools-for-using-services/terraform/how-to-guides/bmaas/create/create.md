# {heading(Creating a Bare Metal server)[id=terraform-bmaas-create]}

Using Terraform, you can create (rent) Bare Metal servers. As an example, a server with a basic network interface configuration will be created.

Also, using the `vkcs_baremetal_server` resource, you can create servers with the following network interface configurations:

- with aggregated (bonded) interfaces;
- with interfaces for working in tagged networks (tagged VLAN).

A new SSH key pair will be used to access the server.

When creating the server, the following are used:

- resources:

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — creates a network to host the server;
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — creates a subnet in this network;
  - [vkcs_compute_keypair](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/compute_keypair.md) — creates an SSH key pair;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/resources/baremetal_server.md) — creates a Bare Metal server;

- data sources:

  - [vkcs_baremetal_flavor](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavor.md) — allows you to get information about the Bare Metal server configuration template;
  - [vkcs_baremetal_flavors](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_flavors.md) — allows you to get information about configuration templates available for a Bare Metal server;
  - [vkcs_baremetal_os](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_os.md) — allows you to get information about the Bare Metal server operating system;
  - [vkcs_baremetal_oses](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_oses.md) — allows you to get information about OSes available for a Bare Metal server;
  - [vkcs_baremetal_server](https://github.com/v-trofimov/terraform-provider-vkcs/blob/741eec9ba10c1faf3846cf651ee5c10af1e3f0d4/docs/data-sources/baremetal_server.md) — allows you to get information about a Bare Metal server.

## {heading(Preparation steps)[id=terraform-bmaas-create-prepare]}

1. Contact [technical support](mailto:support@mcs.mail.ru) to enable the ability to rent Bare Metal servers in your project, if this has not been done yet.
1. Make sure your account balance is sufficient to rent the desired Bare Metal server configuration.
1. [Install Terraform and configure the provider](/en/tools-for-using-services/terraform/quick-start) if this has not been done yet.

   Put the provider settings into the Terraform configuration file `provider.tf`.

## {heading({counter(tf-vm)}. Create a file describing the server)[id=terraform-bmaas-create-server-file]}

Create the `main.tf` file.

Add the following content to the file and edit it if necessary:

```hcl
resource "vkcs_compute_keypair" "tf_bmaas" {
  name       = "terraform-bmaas"
  public_key = file("terraform-bmaas.pub")
}

data "vkcs_baremetal_flavor" "tf_flavor" {
  name = "BM_CX301_N_2_nic"
  # cpu_model = "Intel(R) Xeon(R) Gold 6338 CPU @ 2.00GHz"
}

output "flavor_info" {
  value = {
    id        = data.vkcs_baremetal_flavor.tf_flavor.id
    name      = data.vkcs_baremetal_flavor.tf_flavor.name
    cpu_cores = data.vkcs_baremetal_flavor.tf_flavor.cpu_cores
    ram_size  = data.vkcs_baremetal_flavor.tf_flavor.ram_size
    ssd_size  = data.vkcs_baremetal_flavor.tf_flavor.ssd_size
    hdd_size  = data.vkcs_baremetal_flavor.tf_flavor.hdd_size
  }
}

data "vkcs_baremetal_os" "my_os" {
  name      = "ubuntu"
  version   = "22.04"
  raid_type = "NO_RAID"
}

resource "vkcs_networking_network" "network" {
  name        = "tf_test_network"
  description = "my network description"
}

resource "vkcs_networking_subnet" "subnet" {
  network_id = vkcs_networking_network.network.id
}

resource "vkcs_baremetal_server" "server" {
  name              = "tf-server"
  flavor_id         = data.vkcs_baremetal_flavor.tf_flavor.id
  key_pair          = vkcs_compute_keypair.tf_bmaas.name
  user_data         = file("cloud-init-user-data.yaml")
  availability_zone = "ME1"
  os_id             = data.vkcs_baremetal_os.my_os.id
  raid_type         = "NO_RAID"

  nic {
    name = "nic0"

    vlan {
      native     = true
      network_id = vkcs_networking_network.network.id
      subnet_id  = vkcs_networking_subnet.subnet.id
    }
  }
}

data "vkcs_baremetal_server" "example" {
  id    = vkcs_baremetal_server.server.id
}
```

The file describes:

- server parameters — a server named `tf-server` in the [availability zone](/en/intro/start/concepts/architecture#architecture-az) ME1 with one physical network interface `nic0`;
- resources and data assigned to the server:

  - an SSH key pair for accessing the server — a new key pair named `terraform-bmaas` is created;
  - the server configuration template (flavor) — a template named `BM_CX301_N_2_nic` containing a configuration based on the Intel(R) Xeon(R) Gold 6338 CPU @ 2.00GHz processor;
  - the server OS — Ubuntu version 22.04 installed without using a software array;
  - the network and subnet where the server will be hosted — a new network named `tf_test_network` and a subnet with default parameters are created.

## {heading({counter(tf-vm)}. Create resources using Terraform)[id=terraform-bmaas-create-resource]}

1. Place all Terraform configuration files in one directory:

   - `provider.tf`,
   - `main.tf`.
1. Go to this directory.
1. Run the command:

   ```console
   terraform init
   ```

1. Run the command:

   ```console
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.

## {heading({counter(tf-vm)}. Verify that the server is operational)[id=terraform-bmaas-create-check]}

Connect to the server using the private SSH key from the created key pair `terraform-bmaas`.

If the connection is successful, the console will show typical Ubuntu output:

```console
Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-46-generic x86_64)

* Documentation: https://help.ubuntu.com
* Management: https://landscape.canonical.com
* Support: https://ubuntu.com/advantage

System information as of Wed May 10 18:05:44 UTC 2023

System load: 0.0078125 Processes: 98
Usage of /: 35.2% of 7.42GB Users logged in: 0
Memory usage: 9% IPv4 address for ens3: 192.168.199.20
Swap usage: 0%
...
```

## {heading(Delete unused resources)[id=terraform-bmaas-create-delete]}

A Bare Metal server consumes resources and is billed. If you no longer need it, delete it:

1. Go to the directory with the Terraform configuration files.
1. Run the command:

   ```console
   terraform destroy
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.
