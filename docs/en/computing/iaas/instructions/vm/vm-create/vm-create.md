In Cloud Servers, you can create virtual machines through your management console, OpenStack CLI or Terraform. To create a VM using Terraform, follow the [instructions in the Terraform section](/en/tools-for-using-services/terraform/how-to-guides/iaas/create).

The VK Cloud team has prepared images of several operating systems. A list of prepared images is available in the management console [when creating a new VM](https://msk.cloud.vk.com/app/en/services/infra/servers/add). You can also [import](/en/computing/iaas/instructions/images/images-manage#exporting_an_image) your own OS image.
{note:info}

The VM settings available for configuration may vary depending on the operating system.

{/note}

To create VM:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Verify that the account balance is positive and there are enough [quotas](/ru/tools-for-using-services/account/concepts/quotasandlimits) to create the virtual machine configuration you need.
1. Go to **Cloud Servers → Virtual machines**.
1. Click the **Create Instance** or **Add** button.
1. Set the VM parameters in the **Configuration** box:   

     - **Operating system**: select the [operating system](/en/computing/iaas/concepts/about#operating_system) or the image that you previously [created](../../images/images-manage#creating_an_image) or [imported](../../images/images-manage#importing_an_image) in VK Cloud.
     - **Category of virtual machine**: select the [category](../../../concepts/about#flavors) of the VM.
     - **Type of virtual machine**: select the flavor VM configuration.
     - **Availability zone**: select the [availability zone](/en/computing/iaas/concepts/about#availability_zone) where the VM will be deployed.
     - **Number of machines in configuration**: specify the required number of VM.
1. Fill in the fields in the **General Information** box:

     - **Name of virtual machine**: use only Latin letters, numbers, or special characters `-`, `_`, and `.`.
     - **Tags**: if necessary, [specify the tag](../vm-manage#assigning_tags) for the VM or create a new one.
     - **Configure scripts on VM startup**: enable this option to add a bash or [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) script that will be executed when the VM first starts.

1. Specify the disk parameters in the **Disk size and speed** box.

     - **Disk size**: specify the required VM disk size in gigabytes.

         The maximum disk size is [limited](/en/tools-for-using-services/account/concepts/quotasandlimits#limits_without_quotas_24194152). To create a VM with a larger disk, use the [OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli).

     - **Disk Type**: select one of the [disk types](../../../concepts/about#disks_types_b7c586e).


1. Configure network settings in the **Network and firewall settings** box.

   - **Network**: select an existing network or create a new one. If a new network is created, additional fields will appear:
      
      - **SDN**: select a [virtual network management system](/en/networks/vnet/concepts/architecture#sdns_used). For new accounts, Sprut is used by default and changing this setting is not available.


         {note:info}

         Resources created in networks of different SDNs will be accessible to each other only when using [floating IPs](/en/networks/vnet/concepts/ips-and-inet#floating-ip).

         {/note}

      - **Subnet address**: specify CIDR using the pattern `XXX.XXX.XXX.XXX/XX`. For example `10.0.0.0/24`.

   - **Use config drive**: enable the option if you need to automatically configure a network on a virtual machine when there is no DHCP server on the network. The option is enabled automatically if a network with [DHCP](/en/networks/vnet/concepts/ips-and-inet#network_addressing) disabled is selected, including the [external network](/en/networks/vnet/concepts/net-types#external_net) (`ext-net`).
   - **DNS-name**: specify the [private DNS](/en/networks/dns/private-dns) name for the VM. This domain name can be used to access instances on the internal network.
   - **Virtual machine key**: select a key for SSH connection or create a new one.

      If you select `Create a new key`, save the downloaded `*.pem` key file after the virtual machine creation is started.

      The public part of the key will be automatically added to the server.

   - **Firewall settings**: select the appropriate security groups.

      To connect via SSH, add the group `ssh` or `ssh+www`. For more information about configuring network access rules, see [Security groups](/en/networks/vnet/instructions/secgroups).

   - (Optional) **Assign external IP**: enable this option to assign a new or existing [Floating IP](/en/networks/vnet/concepts/ips-and-inet#floating-ip) to the VM.

      
      {note:info}

      The option is enabled and automatically configured the IP address if the VM is located on an [external network](/en/networks/vnet/concepts/net-types#external_net) (ext-net).

      {/note}

   - (Optional) **Link a domain to an external IP**: enable the option and specify a domain to link the FQDN to the external IP. An [A-record](/en/networks/dns/publicdns#adding_resource_records) for the selected IP will be added to the DNS. The option is available if the **Assign external IP** option is enabled.

      {note:warn}

      You cannot link an external IP to a domain that matches the CNAME record of the DNS zone. In this case, the VM will be created, but the A-record will not be added.

      {/note}


   - **Enable monitoring**: enable to install an agent to send metrics to the [monitoring service](/en/monitoring-services/monitoring/concepts).

1. Configure the settings in the **Backup** box.

   By default, backup is enabled with recommended settings, but you can change them:

   - **Name of plan**: specify a name for the backup plan.
   - **Enable GFS**: enable to automatically delete backups when they expire.

      - **Keep weekly full backups**: specify how many weeks to keep the backup copy.
      - **Keep monthly full backups**: specify how many months to keep the backup copy.
      - **Keep yearly full backups**: specify how many years to keep the backup copy.

      {note:info}

      If the **Enable GFS** option is disabled, only the most recent backups will be stored. The number is specified in the **Maximum number of full backups** field. Once the specified limit is reached, older backups will be deleted automatically.

      {/note}

   - **Enable incremental backups**: enable this option to create a full backup once a week. Incremental backups will be created on all other days of the week.
   - **Backup schedule**: select the days of the week and time for the backup. When specifying the time, use the GMT+03:00 time zone.
   - **Enable non-removable backups**: enable this option to protect backups from deletion with an [object lock](/en/storage/s3/concepts/objects-lock). Two lock types are available:

      - `Temporary protection`: protects copies from deletion and overwriting for a specified number of days. Two selectable modes are available:

         - `Compliance`: strict mode. Cannot be disabled or changed during the specified retention period.
         - `Governance`: flexible mode with the ability to be disabled by the project administrator.

      - `Lifetime protection`: protects the backup from deletion until the protection is disabled.

1. Click the **Create** button.
1. Wait for the VM to be created. This process may take some time. When the creation is completed, a page with VM characteristics and connection instructions will open.

{/tab}

{tab(OpenStack CLI)}

1. Get ready to work with the OpenStack CLI:

   1. [Enable](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) two-factor authentication.
   2. [Activate](/en/tools-for-using-services/api/rest-api/enable-api) API access.
   3. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

2. Collect the data:

   1. Get a list of available VM types and save the required ID:

      ```console
      openstack flavor list
      ```

   2. Get a list of available VM images and save the required ID:

      ```console
      openstack image list
      ```

   3. Get a list of security groups:

      ```console
      openstack security group list
      ```

       - To create a Linux VM and connect to it via SSH, save the ID of the group `ssh` or `ssh+www`.
       - To create a Windows VM and connect to it via RDP, save the ID of the group `rdp` or `rdp+www`.

      For more information about configuring network access rules, see [Security groups](/en/networks/vnet/instructions/secgroups).

   4. Get a list of available networks and save the required ID:

      ```console
      openstack network list
      ```

      - If the `ext-net` network is selected, an external IP address will be automatically assigned to the virtual machine.
      - If a private network is selected, then a floating [IP address can be assigned to the virtual machine after creation](/en/networks/vnet/instructions/ip/floating-ip).

   5. Get a list of available key pairs and save the required keypair name:

      ```console
      openstack keypair list
      ```

      To create a new key pair:
         1. Generate a key:

            ```console
            ssh-keygen -t rsa -b 2048 -f ~/.ssh/my_key -N ""
            ```

         2. Upload the key:

            ```console
            openstack keypair create --public-key ~/.ssh/my_key.pub --type ssh <KEYPAIR_NAME>
            ```

3. Create a boot disk:

   ```console
   openstack volume create root-volume --size <DISK_SIZE> --image <IMAGE_ID> --availability-zone MS1 --bootable
   ```

   Here:

   - `<DISK_SIZE>` — disk size in GB.

      The maximum disk size is limited. For more information, see [Quotas and limits](/en/tools-for-using-services/account/concepts/quotasandlimits#limits_without_quotas_24194152).
   
   - `<IMAGE_ID>` — the image ID obtained earlier.

4. Create a VM:

   ```console
   openstack server create <VM_NAME> \
                           --volume <VOLUME_ID> \
                           --network <NETWORK_ID> \
                           --flavor <FLAVOR_ID> \
                           --key-name <KEYPAIR_NAME> \
                           --availability-zone MS1
   ```

   {note:warn}

   If the `--network` option specifies an external network (`ext-net`), add the `--use-config-drive` option to the VM creation command.

   {/note}

   After creating a VM, information about it will be displayed. Find the `adminPass` field and save its value. You will need it to sign in to the server via the VNC console.

5. Check the status of the created VM:

   ```console
   openstack server list
   ```

   The created machine should appear in the list of available VMs and have the status `ACTIVE`.

{note:info}

Some features of creating a VM via the CLI:

- If you do not specify an availability zone, a random one will be selected.
- If you do not specify a disk, an “ephemeral disk” will be created (with restrictions).

{/note}

{/tab}

{/tabs}