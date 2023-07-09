In VK Cloud Servers, you can create virtual machines through your personal account, OpenStack CLI or Terraform. To create a VM using Terraform, use the [VM creation instructions](/en/manage/terraform/scenarios/create) in the Terraform section.

## Before starting work

1. [Register](/en/base/account/quick-start) to VK Cloud.
2. [Activate](/en/base/account/instructions/activation) the services.

The account balance should be positive, and [quotas](/en/base/account/concepts/quotasandlimits) should be sufficient to create the desired virtual machine configuration.

### Available OS

The VK Cloud team has prepared images of some operating systems. The list of ready-made images is available in your personal account in the [window for creating a new instance](https://mcs.mail.ru/app/en/services/infra/servers/add).

If necessary, you can [import an OS image](../../vm-images/vm-images-manage#exporting-an-image) by yourself.

## Create a VM

<info>

The available fields may differ for different operating systems.

</info>

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Virtual machines**.
3. Click the **Create instance** or **Add** button.
4. Set VM parameters:
     - **Name of virtual machine**: use only Latin letters, numbers, or symbols `-`, `_` and `.`.
     - **Type of virtual machine**: select the preset VM configuration (CPU and RAM). For more information, see [VK Cloud Servers service overview](../../../concepts/vm-concept).
     - **Availability zone**: select the data center where the VM will be launched.
     - **Number of machines in configuration**: specify the desired number of VM.
     - **Disk size**: specify the desired VM disk size in gigabytes.
     - **Disk Type**: select one of the values — HDD, SSD or High-IOPS SSD. For more information, see [VK Cloud Servers service overview](../../../concepts/vm-concept#disks).
     - **Operating system**: select the operating system version or [previously created image](../../vm-images/vm-images-manage/).
     - **Enable monitoring**: enable to use [monitoring tools](/en/manage/monitoring/monitoring-info).
     - **Tags**: if necessary, [specify the tag](../vm-manage#assigning-tags) for the VM or create a new one.
5. Click **Next step**.
6. Configure the VM connection to the network:
   - **Network**: select an existing network or create a new one. Depending on the choice of network type, the list of available fields will change.

       If `Create new network` is selected or an existing network is selected, set the settings:
       - **Subnet address**: the field appears if the `Create new network` option is selected. For more information, see [Managing networks and subnets](/en/networks/vnet/operations/manage-net).
       - **Use config drive**: enable the option if you want to automatically configure the network on a virtual machine if there is no DHCP server on the network.
       - **DNS-name**: specify the DNS name for the VM. For more information, see [Private DNS](/en/networks/dns/private-dns).
       - **Assign external IP**: enable the option if you need access to the virtual machine via the Internet.

       If the item is selected `External network (ext-net)`:
       - The configuration disk will be used.
       - The virtual machine will be automatically assigned an external IP address.

   - **Virtual machine key**: select a key for SSH connection or create a new one.

      If you select `Create a new key`, save the suggested key file `.pem` after the virtual machine creation is completed.

   - **Firewall settings**: select the appropriate security groups.

      To connect via SSH, add the group `ssh` or `ssh+www`. For more information about configuring network access rules, see [Managing firewall rules](/en/networks/vnet/operations/secgroups).

7. Click **Next step**.

8. If necessary, enable the **Use Backup** option and [specify](../../vm-backup/vm-backup-create/) settings.
9. Click **Create instance**.
10. Wait for the VM to be created. This process may take some time. When the creation is completed, a page with VM characteristics and connection instructions will open.

</tabpanel>
<tabpanel>

1. Get ready to work with the OpenStack CLI:

   1. [Enable](/en/base/account/instructions/account-manage/manage-2fa/) two-factor authentication.
   2. [Activate](/en/manage/tools-for-using-services/rest-api/enable-api) API access.
   3. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1--install-the-openstack-client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3--complete-authentication) to the project.

2. Collect the data:

   1. Get a list of available VM types and save the desired `flavor_ID`:

      ```bash
      openstack flavor list
      ```

   2. Get a list of available VM images and save the desired `image_ID`:

      ```bash
      openstack image list
      ```

   3. Get a list of security groups:

      ```bash
      openstack security group list
      ```

       - To create a Linux VM and connect to it via SSH, save the `security_group_ID` of the group `ssh` or `ssh+www`.
       - To create a Windows VM and connect to it via RDP, save the `security_group_ID` of the group `rdp` or `rdp+www`.

      For more information about configuring network access rules, see [Managing firewall rules](/en/networks/vnet/operations/secgroups).

   4. Get a list of available networks and save the desired `network_ID`:

      ```bash
      openstack network list
      ```

      - If the `ext-net` network is selected, an external IP address will be automatically assigned to the virtual machine.
      - If a private network is selected, then a floating [IP address can be assigned to the virtual machine after creation](/en/networks/vnet/operations/manage-floating-ip).

   5. Get a list of available key pairs and save `keypair_name`:

      ```bash
      openstack keypair list
      ```

      To create a new key pair:
         1. Generate a key:

            ```bash
            ssh-keygen -q -N ""
            ```

         2. Upload the key:

            ```bash
            openstack keypair create --public-key ~/.ssh/id_rsa.pub --type ssh <keypair_name>
            ```

3. Create a boot disk:

   ```bash
   openstack volume create root-volume --size 10 --image <image_id> --availability-zone MS1 --bootable
   ```

4. Create a VM:

   ```bash
   openstack server create <VM_name>
                           --volume <volume_id>
                           --network <network_ID> \
                           --flavor <flavor_ID> \
                           --key-name <keypair_name> \
                           --availability-zone MS1
   ```

   After creating a VM, information about it will be displayed. Find the `adminPass` field and copy its value. You will need it to log in to the server via the VNC console.

5. Check the status of the created VM:

   ```bash
   openstack server list
   ```

   The created machine should appear in the list of available VMs and have the status `ACTIVE`.

<info>

Some features of creating a VM via the CLI:

- If you do not specify an availability zone, a random one will be selected.
- If you do not specify a disk, an “ephemeral disk” will be created (with restrictions).

</info>

</tabpanel>
</tabs>

## What's next?

- See the ways to connect to [Linux VM](../vm-connect/vm-connect-nix/) or [Windows](../vm-connect/vm-connect-win/).
- Learn how to [work with VM](../vm-manage/).
