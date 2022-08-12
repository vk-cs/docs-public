A set of tools for working with the infrastructure allows you to create and manage instances from the command line.

Consider creating a virtual machine using the Openstack CLI.

## Before starting work

To create a virtual machine, you should register on the VK Cloud Platform, make sure that there is an activated Cloud computing service, a positive account balance of your personal account, as well as a sufficient number of resource quotas to create the desired instance configuration.

## Overview

The main parameters of the CLI for starting an instance:

- Instance source — can be an image, snapshot (snapshot), or a block storage volume that contains an image or snapshot.
- Name (instance name) — the display name of the instance. Also sets the hostname in the OS.
- Flavor — instance configuration that defines the limits of the amount of virtual CPU and RAM for a virtual machine.
- Key pair is SSH credentials that are used to configure authentication of the primary user of the deployed OS in the instance. You need to create at least one key pair for each project. If the key pair has already been created using an external tool, you can import it into OpenStack. You can also use a key pair for multiple instances belonging to this project.
- Security Group (security group) — defines rules for incoming and outgoing traffic. Security groups contain a set of firewall policies known as security group rules.
- Floating IP address - if necessary— you can assign a floating (public) IP address to an instance.
- Network — allows you to determine the network in which the instance will be located. By default, the ext-net network has already been created in the project.
- Volume (disk or volume) — used to connect a disk (block device) to an instance.

The instance can be started directly from one of the available images or from an image that was previously copied to a persistent volume. The OpenStack Image service provides a pool of images available to participants of various projects.

## Collecting parameters

### Displaying a list of available flavors

The selected flavor identifier (ID) will be used to create an instance:

```bash
openstack flavor list
```

### Get a list of available images

The selected security group ID will be used when creating the instance:

```bash
openstack image list
```

### List of available security groups

The selected security group ID will be used when creating the instance:

```bash
openstack security group list
```

If no security groups have been created before, you can assign a default security group to an instance.

<warn>

When assigning a "default" security group to an instance, it will be impossible to access this machine via SSH.

</warn>

To view the rules for the specified security group, run the command:

```bash
openstack security group show default
```

### Creating a security group

By default, the "default" security group applies to all instances and includes firewall rules that prohibit remote access to virtual machines. For Linux images such as Ubuntu or CentOS, it is recommended to allow at least ICMP (ping) and SSH.

You can create a new security group using the command:

```bash
openstack security group create \
--description ICMP+SSH
--project YOURPROJECT_ID
SECURITY_GROUP_NAME
```

To add a rule allowing SSH:

```bash
openstack security group rule create --proto tcp --dst-port 22 ICMP+SSH
```

To add a permissive rule for ICMP:

```bash
openstack security group rule create --proto icmp ICMP+SSH
```

### List of available key pairs

Overview of available key pairs and selection of the required key pair identifier for SSH access:

```bash
openstack keypair list
```

You can generate a key pair and upload it to the project using the following commands:

```bash
ssh-keygen -q -N ""
openstack keypair create --public-key ~/.ssh/id_rsa.pub mykey
```

### List of available networks

Check the availability of networks available in the project:

```bash
openstack network list
```

### Starting an instance

First you need to create a disk from an image with an operating system:

```bash
openstack volume create --size 20 --type ms1 --image fcdee862-6053-4270-9812-728b47ad2833 --bootable Ubuntu_boot_disk
```

The received disk ID will be required to start the instance.

After all the data is collected, you can start creating an instance. At this stage, there should be the following credentials:

- FLAVOR — B7D20F15-82F1-4ED4-A12E-E60277FE955F
- DISK — B4071336-46A3-4CB7-AE3B-403F815862AD
- Key pair — MyKey
- SECURITY GROUP — 77864043-2111-4e6a-8E4D-ba51ef82ad4b
- NETWORK — 298117ae-3fa4-4109-9E08-8be5602be5a2
- Server name — you can choose any name if desired, but in this example myNewServer will be used.

<warn>

If you load an instance with an INSTANCE_NAME that exceeds 63 characters in length, VK Cloud automatically truncates it when converting to a hostname to ensure that dnsmasq works correctly.

</warn>

In this example, the command is split into separate lines:

```bash
openstack server create --flavor b7d20f15-82f1-4ed4-a12e-e60277fe955f \
                        --volume b4071336-46a3-4cb7-ae3b-403f815862ad \
                        --key-name myKey \
                        --security-group 77864043-2111-4e6a-8e4d-ba51ef82ad4b \
                        --network 298117ae-3fa4-4109-9e08-8be5602be5a2 \
                        myNewServer
```

<info>

The backslash character \\ is used when entering a long command. When \\ is entered, the terminal command moves to the next line until its input is finished.

You can delete the \\ character and put each parameter in one line.

</info>

For example:

```bash
openstack server create --flavor b7d20f15-82f1-4ed4-a12e-e60277fe955f --volume b4071336-46a3-4cb7-ae3b-403f815862ad --key-name myKey --security-group 77864043-2111-4e6a-8e4d-ba51ef82ad4b --network 298117ae-3fa4-4109-9e08-8be5602be5a2 myNewServer
```

If the server was created correctly, you can see this output:

```
+-----------------------------+------------------------------------------------------------+
| Field                       | Value                                                      |
+-----------------------------+------------------------------------------------------------+
| OS-DCF:diskConfig           | MANUAL                                                     |
| OS-EXT-AZ:availability_zone |                                                            |
| OS-EXT-STS:power_state      | NOSTATE                                                    |
| OS-EXT-STS:task_state       | scheduling                                                 |
| OS-EXT-STS:vm_state         | building                                                   |
| OS-SRV-USG:launched_at      | None                                                       |
| OS-SRV-USG:terminated_at    | None                                                       |
| accessIPv4                  |                                                            |
| accessIPv6                  |                                                            |
| addresses                   |                                                            |
| adminPass                   | H7abydAd8Lhi                                               |
| config_drive                |                                                            |
| created                     | 2020-08-09T20:22:58Z                                       |
| flavor                      | Standard-2-4-50 (b7d20f15-82f1-4ed4-a12e-e60277fe955f)     |
| hostId                      |                                                            |
| id                          | da4312fa-461f-4fcd-83ed-2441c93a73fb                       |
| image                       | Ubuntu-19.10-202003 (fcdee862-6053-4270-9812-728b47ad2833) |
| key_name                    | myKey                                                      |
| name                        | myNewServer                                                |
| progress                    | 0                                                          |
| project_id                  | 74f4a279430d481792c7d4c2cf233c26                           |
| properties                  |                                                            |
| security_groups             | name='77864043-2111-4e6a-8e4d-ba51ef82ad4b'                |
| status                      | BUILD                                                      |
| updated                     | 2020-08-09T20:22:59Z                                       |
| user_id                     | 4b8b2d73b31e423fabfb898d8ecaec29                           |
| volumes_attached            |                                                            |
+-----------------------------+------------------------------------------------------------+
```

The state of bilding means that the instance is running, but not yet ready for use. The active status indicates that the instance is active. Copy the value of the administrative password from the adminPass field. You can use this password later to log in to your server via the KVM console.

You can also see information about the new instance in the VK Cloud panel.

To get additional parameters, use the following command:

```bash
openstack help server create
```

<warn>

You can also put arbitrary local files into the instance file system during creation using the `--file <dest-filename=source-filename>` parameter. Storage of up to five files is available.

</warn>

For example, if you have a special authorized key file named `special_authorized_keysfile` that needs to be placed in the instance, rather than using the usual SSH key injection, you can add the –file parameter, as shown in the following example:

```bash
--file /root/.ssh/authorized_keys=special_authorized_keysfile
```

Check the instance status:

To view a list of all servers, use the list command:

```bash
openstack server list
```

The list shows the ID, name, status, IP addresses, image and flavor for all instances in the project.

<warn>

If you do not provide a key pair when creating an instance, it will be impossible to access such an instance.

</warn>
