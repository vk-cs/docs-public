{includetag(create,create-from-disk)}
1. Set the VM parameters in the **Configuration** block:
   {/includetag}
   {ifdef(public)}
   {includetag(create)}
   - **Operating system**: select the {linkto(../../../../../computing/iaas/concepts/oper-system#iaas-oper-system)[text=operating system version]} or an image that you previously {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=created]} or {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=imported]} to {var(cloud)}.
   - **Virtual machine category**: select a {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor-vm-categories)[text=category]} of predefined VM configurations.
     {/includetag}
     {includetag(create-from-disk)}
   - **Virtual machine category**: select a {linkto(../../concepts/about#vm_categories)[text=category]} of predefined VM configurations.
     {/includetag}
     {includetag(create,create-from-disk)}
   - **Virtual machine type**: select a predefined VM configuration.
     {/includetag}
     {includetag(create)}
     To create a VM with a graphics accelerator, you need a {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=Cloud GPU configuration template]}. If the required template is not in the list, {linkto(../../../../../computing/gpu/connect#gpu-connect)[text=request]} it.
     {/includetag}
   {/ifdef}

   {includetag(create)}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   - **Virtual machine name**: use only Latin letters, numbers, or special characters `-`, `_`, and `.`.
   - **Virtual machine type**: select a predefined {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=VM configuration template]}.

     {ifndef(private-cert)}
     If {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=VM configuration templates with GPU or vGPU]} are required for your work, contact the {var(cloud)} administrator to add them to the project.
     {/ifndef}
     {/ifdef}

   - **Availability zone**: select the {ifndef(private-cert)}{linkto(../../../../../computing/iaas/concepts/avail-zone#iaas-avail-zone)[text=availability zone]}{/ifndef}{ifdef(private-cert)}availability zone{/ifdef} where the VM will be launched.
   - **Number of machines in the configuration**: specify the required number of VMs.
   {/includetag}
   {includetag(create-from-disk)}
   - **Availability zone**: the value corresponds to the availability zone of the disk from which the VM is created.
   {/includetag}
   {includetag(create,create-from-disk)}
   {ifdef(public)}
1. Fill in the **General information** block:

   - **Virtual machine name**: use only Latin letters, numbers, or special characters `-`, `_`, and `.`.
     {/ifdef}
     {/includetag}
     {includetag(create)}
   - **Tags**: if necessary, {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-tags)[text=specify a tag]} for the VM or create a new one.
     {/includetag}
     {includetag(create-from-disk)}
   - **Tags**: if necessary, [specify a tag](../../instructions/vm/vm-manage#assigning_tags) for the VM or create a new one.
     {/includetag}
     {includetag(create,create-from-disk)}
   - **Configure scripts on VM launch**: enable the option to add a bash script or a [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) script that will be executed on the first VM launch. {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}Enter the script code manually or upload a script file with the `.txt` or `.sh` extension.{/ifdef}
   {/includetag}
   {includetag(create)}
   {ifdef(public)}
1. Specify the disk parameters in the **Disk size and speed** block.
   {/ifdef}
    - **Disk size**: specify the required VM disk size in gigabytes.
      {ifdef(public)}
      The maximum disk size is {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-vm-no-quotas-limits)[text=limited]}. To create a VM with a larger disk, use the {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]}.
      {/ifdef}
    - **Disk type**: select the {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=disk type]}.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Click the **Next step** button.
   {/ifdef}
   {/includetag}
   {includetag(create,create-from-disk)}
1. Configure the network settings in the {ifdef(public)}**Network and firewall settings**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Network configuration**{/ifdef} block.
   {/includetag}
   {includetag(create)}
   - **Network**: select an existing network or create a new one. When creating a new network, {ifdef(public)}additional fields will appear:

     - **SDN**: select the {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=virtual network management system]}. For new accounts, the option is unavailable and {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]} is used by default.

       {note:info}
       Networks created in different SDNs are not accessible to each other, but you can connect them using {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP addresses]}.
       {/note}
       {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}set the parameter:{/ifdef}
          
     - **Subnet address**: specify the CIDR in the format `XXX.XXX.XXX.XXX/XX`, for example, `10.0.0.0/24`.
     {/includetag}
     {includetag(create-from-disk)}
   - **Network**: select an existing network or create a new one. When creating a new network, {ifdef(public)}additional fields will appear:

     - **SDN**: select the {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=virtual network management system]}. For new accounts, the option is unavailable and {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]} is used by default.

       {note:info}
       Networks created in different SDNs are not accessible to each other, but you can connect them using {linkto(../../../../networks/vnet/concepts/ips-and-inet#floating-ip)[text=Floating IP addresses]}.
       {/note}
       {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}set the parameter:{/ifdef}

     - **Subnet address**: specify the CIDR in the format `XXX.XXX.XXX.XXX/XX`, for example, `10.0.0.0/24`.
     {/includetag}
     {includetag(create)}
   - **Use configuration drive**: enable the option if you need to configure the network on the virtual machine when there is no DHCP server in the network. The option is enabled automatically if an {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=external network]} or a network with disabled {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP]} is selected.
   - **DNS name**: specify the domain name for {ifdef(public)}{linkto(../../../../../networks/dns/instructions/private-dns#dns-private-dns)[text=private DNS]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../networks/vnet/instructions/private-dns#vnet-private-dns)[text=private DNS]}{/ifdef}. It can be used to access instances within the internal network.
     {/includetag}
     {includetag(create-from-disk)}
   - **Use configuration drive**: enable the option if you need to configure the network on the virtual machine when there is no DHCP server in the network. The option is enabled automatically if an {linkto(../../../../networks/vnet/concepts/net-types#external_net)[text=external network]} or a network with disabled [DHCP](../../../../networks/vnet/concepts/ips-and-inet#network_addressing) is selected.
   - **DNS name**: specify the domain name for {ifdef(public)}[private DNS](../../../../networks/dns/private-dns){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../networks/vnet/instructions/private-dns#vnet-private-dns)[text=private DNS]}{/ifdef}. It can be used to access instances within the internal network.
     {/includetag}
     {includetag(create,create-from-disk)}
   - **Virtual machine key**: select a key for SSH connection or create a new one.

     When you select `Create new key`, after the VM is created, the private key file `*.pem` will be automatically downloaded. Save it, it will be needed later for SSH connection to the server.

     The public part of the key will be automatically added to the server.

   - **Firewall settings**: select the required security groups.
     {/includetag}
     {includetag(create)}
     To connect via SSH, add the `ssh` or `ssh+www` group. For more information about configuring network access rules, see the {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Security groups]} section.

   - (Optional) **Assign external IP**: enable the option to assign a new or existing {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP address]} to the VM. The option is available if internet access is enabled for the {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-standard-net)[text=network]}.

     {note:info}
     The option is always enabled if an {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=external network]} was previously selected for the VM.
     {/note}
     {/includetag}
     {includetag(create-from-disk)}
     To connect via SSH, add the `ssh` or `ssh+www` group. For more information about configuring network access rules, see the [Security groups](../../../../networks/vnet/instructions/secgroups) section.

   - (Optional) **Assign external IP**: enable the option to assign a new or existing {linkto(../../../../networks/vnet/concepts/ips-and-inet#floating-ip)[text=Floating IP address]} to the VM. The option is available if internet access is enabled for the [network](../../../../networks/vnet/concepts/net-types#standard_network).

     {note:info}
     The option is always enabled if an {linkto(../../../../networks/vnet/concepts/net-types#external_net)[text=external network]} was previously selected for the VM.
     {/note}
     {/includetag}
     {includetag(create)}
     {ifdef(public)}
   - (Optional) **Bind domain to external IP**: enable the option and specify a domain to bind the FQDN to the external IP address. An {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records)[text=A record]} for the selected IP address will be added to the DNS zone. The option is available if the **Assign external IP** option is enabled.

     {note:warn}
     You cannot bind an external IP address to a domain that matches a CNAME record of the DNS zone. In this case, the VM will be created, but the A record will not be added.
     {/note}
     {/ifdef}

     {ifndef(private-cert)}
   - **Enable monitoring**: enable to install an agent for sending metrics to the {linkto(../../../../../monitoring-services/monitoring/concepts#monitoring-concepts)[text=monitoring service]}.
     {/ifndef}
     {/includetag}
     {includetag(create-from-disk)}
     {ifdef(public)}
   - (Optional) **Bind domain to external IP**: enable the option and specify a domain to bind the FQDN to the external IP address. An [A record](../../../../networks/dns/publicdns) for the selected IP address will be added to the DNS zone. The option is available if the **Assign external IP** option is enabled.

     {note:warn}
     You cannot bind an external IP address to a domain that matches a CNAME record of the DNS zone. In this case, the VM will be created, but the A record will not be added.
     {/note}
     {/ifdef}

     {ifndef(private-cert)}
   - **Enable monitoring**: enable to install an agent for sending metrics to the [monitoring service](../../../../monitoring-services/monitoring/concepts).
     {/ifndef}
     {/includetag}
   {includetag(create,create-from-disk)}
1. Specify the required parameters in the {ifdef(public)}**Backup**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Backup configuration**{/ifdef} block.

   By default, backup is enabled with recommended settings, but you can change them:

    - **Plan name**: specify an arbitrary name for the backup plan.
    - **Enable full backup retention strategy (GFS)**: enable to automatically delete backups after the retention period expires.

        - **Keep weekly full backups**: specify how many weeks to keep the backup.
        - **Keep monthly full backups**: specify how many months to keep the backup.
        - **Keep yearly full backups**: specify how many years to keep the backup.

      {note:info}
      If the **Enable full backup retention strategy (GFS)** option is disabled, only the most recent backups will be kept, their number is specified in the **Max. number of full backups** field. When the specified limit is reached, older backups will be automatically deleted.
      {/note}

    - **Enable incremental backups**: enable the option to create a full backup once a week. On all other days of the week, incremental backups will be created.
    - **Backup schedule**: select the days of the week and the backup start time. The time is specified in the GMT+03:00 time zone.
      {ifdef(public)}
      {/includetag}
      {includetag(create)}
    - **Enable immutable backups**: enable the option to protect backups from deletion using {linkto(../../../../../storage/s3/concepts/objects-lock#s3-concepts-object-lock)[text=object lock]}. Two types of lock are available:
      {/includetag}
      {includetag(create-from-disk)}
    - **Enable immutable backups**: enable the option to protect backups from deletion using [object lock](../../../../storage/s3/concepts/objects-lock). Two types of lock are available:
      {/includetag}
      {includetag(create,create-from-disk)}
      - `Temporary protection`: protects copies from deletion and overwriting for a specified number of days. Has two modes:

        - `Compliance`: strict lock. Cannot be removed or changed during the specified retention period.
        - `Governance`: flexible lock that can be removed by the project administrator.

      - `Indefinite protection`: protects the copy from deletion until the lock is removed.
      {/ifdef}

1. Click the {ifdef(public)}**Create**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Create instance**{/ifdef} button.
1. Wait for the VM to be created. This process may take some time. When the creation is completed, the page with the VM characteristics and connection instructions will open.
{/includetag}