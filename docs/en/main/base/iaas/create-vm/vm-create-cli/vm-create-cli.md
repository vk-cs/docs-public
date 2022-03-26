The Infrastructure Toolkit lets you create and manage instances from the command line.

Consider creating a virtual machine using the Openstack CLI.

Before starting work
--------------------

To create a virtual machine, you must register on the VK CS Platform, make sure that you have an activated Cloud Computing service, a positive account balance in your personal account, and a sufficient number of resource quotas to create the desired instance configuration.

Overview
--------

Before starting an instance, you should collect the following parameters:

*   **Instance source** - can be an image, snapshot (snapshot), or a block storage volume that contains an image or snapshot.
*   **Name** - The display name of the instance. Also sets the hostname in the OS.
*   **Flavor** is an instance configuration that defines the limits of the amount of virtual CPU and RAM for a virtual machine.
*   **Key pair** are SSH credentials that are entered into images when they start. You must create at least one key pair for each project. If the key pair has already been created using an external tool, you can import it into OpenStack. You can also use a key pair for multiple instances belonging to this project.
*   **Security Group** - Determines which inbound and outbound network traffic is redirected to and from instances. Security groups contain a set of firewall policies known as security group rules.
*   **Floating IP address** - If necessary, you can assign a floating (public) IP address to a running instance.
*   **Network** - define the network in which the instance will be located. By default, the project already has an ext-net network
*   **Volume** - You can mount a block storage device or a persistent storage volume.

An instance can be launched directly from one of the available images or from an image that was previously copied to a persistent volume. The OpenStack Image service provides a pool of images available to contributors to various projects.

Collecting parameters
---------------------

**Displaying a list of available flavors**

The selected flavor ID will be used to create the instance:

```
 openstack flavor list
```

**Get a list of available images**

The selected image ID will be used to launch the instance:

```
 openstack image list
```

**List of available security groups**

The selected security group ID will be used when creating an instance:

```
 openstack security group list
```

If you have not previously created security groups, you can assign a default security group to an instance.

**Caution**

Assigning the "default" security group to an instance will not allow access to this machine via SSH.

**Creating a security group**

By default, the "default" security group applies to all instances and includes firewall rules that deny remote access to virtual machines. For Linux images like Ubuntu or CentOS, it is recommended to allow at least ICMP (ping) and SSH.

You can create a new security group using the command:

```
 openstack security group create --description ICMP + SSH SECURITY_GROUP_NAME
```

To add a rule to allow SSH:

```
 openstack security group rule create --proto tcp --dst-port 22 ICMP + SSH
```

To add an allow rule for ICMP:

```
 openstack security group rule create --proto icmp ICMP + SSH
```

To view the rules for the specified security group, run the command:

```
 openstack security group show 77864043-2111-4e6a-8e4d-ba51ef82ad4b
```

**List of available key pairs**

An overview of the available key pairs and the selection of the identifier of the required key pair for SSH access:

```
 openstack keypair list
```

You can generate a key pair in a project and save it locally using the command:

```
 openstack keypair create --private-key <filename_and_location> <keyname>
```

**List of available networks**

Check for available networks in the project

```
 openstack network list
```

**Attention**

If the ext-net network or any other non-DHCP network will be assigned during instance creation, enable the option

```
 --config-drive True
```

Otherwise, the instance's network adapter cannot be configured to use a static IP network address.

Instance launch
---------------

First, you need to create a disk from the image with the operating system:

```
 openstack volume create --size 20 --type ms1 --image fcdee862-6053-4270-9812-728b47ad2833 --bootable Ubuntu_boot_disk
```

The resulting disk ID will be required to launch the instance.

After all the data has been collected, you can start creating an instance. At this point, you should have the following credentials:

*   Flavor - b7d20f15-82f1-4ed4-a12e-e60277fe955f
*   Disc - b4071336-46a3-4cb7-ae3b-403f815862ad
*   Key pair - myKey
*   Security group - 77864043-2111-4e6a-8e4d-ba51ef82ad4b
*   Network - 298117ae-3fa4-4109-9e08-8be5602be5a2
*   Server Name - You can choose any name you like, but this example will use myNewServer.

**Attention**

If you boot an instance with INSTANCE_NAME that is longer than 63 characters, VK CS will automatically truncate it when resolving to a hostname to ensure dnsmasq works properly.

**Creating an instance and launching it**

This example breaks the command into separate lines:

```
 $ openstack server create --flavor b7d20f15-82f1-4ed4-a12e-e60277fe955f --volume b4071336-46a3-4cb7-ae3b-403f815862ad --key-name myKey --security-group 77864043-2111-4e6a-8e4d-baef51 network 298117ae-3fa4-4109-9e08-8be5602be5a2 --config-drive True myNewServer
```

If the server was created correctly, you can see the following output:

```
 + ----------------------------- + ------------------- ----------------------------------------- +
| Field | Value |
+ ----------------------------- + ------------------- ----------------------------------------- +
| OS-DCF: diskConfig | MANUAL |
| OS-EXT-AZ: availability_zone | |
| OS-EXT-STS: power_state | NOSTATE |
| OS-EXT-STS: task_state | scheduling |
| OS-EXT-STS: vm_state | building |
| OS-SRV-USG: launched_at | None |
| OS-SRV-USG: terminated_at | None |
| accessIPv4 | |
| accessIPv6 | |
| addresses | |
| adminPass | H7abydAd8Lhi |
| config_drive | True |
| created | 2020-08-09T20: 22: 58Z |
| flavor | Standard-2-4-50 (b7d20f15-82f1-4ed4-a12e-e60277fe955f) |
| hostId | |
| id | da4312fa-461f-4fcd-83ed-2441c93a73fb |
| image | Ubuntu-19.10-202003 (fcdee862-6053-4270-9812-728b47ad2833) |
| key_name | myKey |
| name | myNewServer |
| progress | 0 |
| project_id | 74f4a279430d481792c7d4c2cf233c26 |
| properties | |
| security_groups | name = '77864043-2111-4e6a-8e4d-ba51ef82ad4b' |
| status | BUILD |
| updated | 2020-08-09T20: 22: 59Z |
| user_id | 4b8b2d73b31e423fabfb898d8ecaec29 |
| volumes_attached | |
+ ----------------------------- + ------------------- ----------------------------------------- +
```

A **bilding** state means that the instance is running, but not ready to use yet. The **active** state indicates that the instance is active.

You can also see information about the new instance in the VK CS panel.

The following command is used to get additional parameters:

```
 openstack help server create
```

**Note**

You can also put arbitrary local files on the instance's file system at creation time using the --file <dest-filename = source-filename> option. Storage for up to five files is available.

For example, if you have a special authorized key file named special_authorized_keysfile that you want to put on an instance rather than using regular SSH key injection, you can add the –file parameter, as shown in the following example:

```
 --file /root/.ssh/authorized_keys=special_authorized_keysfile
```

**Check instance status**

To view a list of all servers, use the list command:

```
 openstack server list
```

The list shows the ID, name, status, IP addresses, image and flavor for all instances in the project.

**Caution**

If you do not provide a key pair when creating an instance, it will be impossible to access such an instance.