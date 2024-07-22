In Cloud Servers, you can create virtual machines through your management console, OpenStack CLI or Terraform. To create a VM using Terraform, use the [VM creation instructions](/en/tools-for-using-services/terraform/how-to-guides/iaas/create) in the Terraform section.

## Before starting work

1. [Register](/en/intro/start/account-registration) to VK Cloud.
2. [Activate](/en/tools-for-using-services/account/service-management/activation) the services.

The account balance should be positive, and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) should be sufficient to create the required virtual machine configuration.

### Available OS

The VK Cloud team has prepared images of some operating systems. The list of ready-made images is available in your management console in the [window for creating a new instance](https://msk.cloud.vk.com/app/en/services/infra/servers/add).

If necessary, you can [import an OS image](../../images/images-manage#exporting_an_image) by yourself.

## Create a VM

<info>

The available fields may differ for different operating systems.

</info>

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Computing → Virtual machines**.
3. Click the **Create instance** or **Add** button.
4. Set VM parameters:
     - **Name of virtual machine**: use only Latin letters, numbers, or special characters `-`, `_`, and `.`.
     - **Category of virtual machine**: select the flavor of the VM. For more information, see [Cloud Servers service overview](../../../concepts/about#flavors).
     - **Type of virtual machine**: select the preset VM configuration. For more information, see [Cloud Servers service overview](../../../concepts/about).
     - **Availability zone**: select the data center where the VM will be launched.
     - **Number of machines in configuration**: specify the required number of VM.
     - **Disk size**: specify the required VM disk size in gigabytes.
     - **Disk Type**: select one of the values — HDD, SSD or High-IOPS SSD. For more information, see [Cloud Servers service overview](../../../concepts/about#disks).
     - **Operating system**: select the operating system version or [previously created image](../../images/images-manage/).
     - **Tags**: if necessary, [specify the tag](../vm-manage#assigning_tags) for the VM or create a new one.
5. Click **Next step**.
6. Configure the VM connection to the network:
   - **Network**: select an existing network or create a new one. Depending on the choice of network type, the list of available fields will change.
   - **SDN**: select a [virtual network management system](/en/networks/vnet/concepts/architecture#sdns_used). Resources created in networks of different SDNs will be accessible to each other only when using floating IPs. The option is available if a new network is created for the VM.
   - **Subnet address**: the option is available if a new network is created for the VM.
   - **Use configuration disk**: enable the option if you need to automatically configure a network on a virtual machine when there is no DHCP server on the network. The option is enabled automatically if a network with [DHCP](/en/networks/vnet/concepts/ips-and-inet#network_addressing) disabled is selected, including the external network (`ext-net`).
   - **DNS-name**: specify the DNS name for the VM. For more information, see [Private DNS](/en/networks/dns/private-dns). The option is not available, if the external network is selected (`ext-net`).
   - **Virtual machine key**: select a key for SSH connection or create a new one.

      If you select `Create a new key`, save the suggested key file `.pem` after the virtual machine creation is completed.

   - **Firewall settings**: select the appropriate security groups.

      To connect via SSH, add the group `ssh` or `ssh+www`. For more information about configuring network access rules, see [Managing firewall rules](/en/networks/vnet/service-management/secgroups).

   - (Optional) **Assign external IP**: enable the option and specify the IP to be able to connect to the VM from the Internet. The option is available if the VM is on a network with an Internet connection. The option is enabled and automatically configured the IP address if the VM is located on an external network (ext-net).

   - (Optional) **Link a domain to an external IP**: enable the option and specify a domain to link the FQDN to the external IP. An [A-record](/en/networks/dns/publicdns#adding_resource_records) for the selected IP will be added to the DNS. The option is available if the **Assign external IP** option is enabled.

      <warn>

      You cannot link an external IP to a domain that matches the CNAME record of the DNS zone. In this case, the VM will be created, but the A-record will not be added.

      </warn>

   - **Enable monitoring**: enable to use [monitoring tools](/en/monitoring-services/monitoring/concepts).

7. Click **Next step**.

8. If necessary, enable the **Use Backup** option and [specify](/en/storage/backups/service-management/vm-backup/vm-backup-create) settings.
9. Click **Create instance**.
10. Wait for the VM to be created. This process may take some time. When the creation is completed, a page with VM characteristics and connection instructions will open.

</tabpanel>
<tabpanel>

1. Get ready to work with the OpenStack CLI:

   1. [Enable](/en/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa/) two-factor authentication.
   2. [Activate](/en/tools-for-using-services/api/rest-api/enable-api) API access.
   3. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Collect the data:

   1. Get a list of available VM types and save the required `flavor_ID`:

      ```bash
      openstack flavor list
      ```

   2. Get a list of available VM images and save the required `image_ID`:

      ```bash
      openstack image list
      ```

   3. Get a list of security groups:

      ```bash
      openstack security group list
      ```

       - To create a Linux VM and connect to it via SSH, save the `security_group_ID` of the group `ssh` or `ssh+www`.
       - To create a Windows VM and connect to it via RDP, save the `security_group_ID` of the group `rdp` or `rdp+www`.

      For more information about configuring network access rules, see [Managing firewall rules](/en/networks/vnet/service-management/secgroups).

   4. Get a list of available networks and save the required `network_ID`:

      ```bash
      openstack network list
      ```

      - If the `ext-net` network is selected, an external IP address will be automatically assigned to the virtual machine.
      - If a private network is selected, then a floating [IP address can be assigned to the virtual machine after creation](/en/networks/vnet/service-management/floating-ip).

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

   After creating a VM, information about it will be displayed. Find the `adminPass` field and copy its value. You will need it to sign in to the server via the VNC console.

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
