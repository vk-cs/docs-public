# {heading(Configuring an S3 gateway for the Cyber Backup Cloud service)[id=s3-cyber-backup-s3-gateway]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {linkto(../../concepts/about#s3-cyber-backup-about)[text=S3 gateway]} for the {linkto(../../../marketplace/initial-configuration/cyber-backup-quick-start#marketplace-cyber-backup-quick-start)[text=Cyber Backup Cloud]} service allows you to use the public cloud service {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=VK Object Storage]} for storing backups.

As a configuration example, an S3 gateway will be created for the Cyber Backup Cloud service in a high-availability configuration with a storage cluster of three nodes.

## {heading(Preparatory steps)[id=s3-cyber-backup-s3-gateway-prep]}

1. Contact [technical support](/en/contacts) to create an account and an organization tenant for the S3 gateway, and to get the ability to connect partner storages to the tenant.
1. [Go to](https://msk.cloud.vk.com/app) the VK Cloud management console.
1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Make sure]} that the project has enough {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=quotas]} to create a storage cluster of three VMs and three disks of 1 TB each, and that the limits allow this.
1. Make sure that the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. {linkto(../../../../tools-for-using-services/vk-cloud-account/instructions/account-manage/keypairs#vk-cloud-account-manage-keypairs-create)[text=Create]} a key pair for connecting to the VM over SSH. For example, name it `vk-ssh`.

## {heading({counter(s3-gateway)}. Prepare a VK Object Storage bucket)[id=s3-cyber-backup-s3-gateway-bucket]}

1. {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create]} a bucket and save its URL.
1. {linkto(../../../../storage/s3/instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=Create]} and save the access keys to the bucket.

## {heading({counter(s3-gateway)}. Create networks and subnets)[id=s3-cyber-backup-s3-gateway-nets]}

1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network without internet access and without a router. In this example: `private-storage-network`.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=Edit]} the subnet created for this network, specifying the required parameters. In this example:
   - subnet name: `private-storage-subnet`;
   - subnet address: `192.168.0.0/24`.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with internet access and a router. In this example: `public-storage-network`.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=Edit]} the subnet created for this network, specifying the required parameters. In this example:
   - subnet name: `public-storage-subnet`;
   - subnet address: `10.0.0.0/24`;
   - DHCP IP address pool: `10.0.0.10–10.0.0.250`.

## {heading({counter(s3-gateway)}. Create security groups and rules)[id=s3-cyber-backup-s3-gateway-secgroups]}

1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add)[text=Create]} a security group with an easily recognizable name. In this example: `cyber`.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=Add]} inbound traffic rules to it:

   1. First rule:

     - **Type**: `SSH`,
     - **Protocol**: `TCP`,
     - **Ports**: `22`,
     - **Remote address**: `All IP addresses`.
   1. Second rule:

     - **Type**: `ALL TCP`,
     - **Protocol**: `TCP`,
     - **Ports**: `8888`,
     - **Remote address**: `All IP addresses`.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=Add]} an outbound traffic rule to the same security group:
  
   - **Type**: `All protocols and ports`,
   - **Remote address**: `All IP addresses`.

## {heading({counter(s3-gateway)}. Create and configure a VM for the management node)[id=s3-cyber-backup-s3-gateway-vm-main]}

1. [Download](http://download.cyberprotect.ru/releases/CyberInfrastructure/6.7.1/x86_64/cloud/cyber-storage.qcow2)
 the Cyber Storage image — software that allows you to organize an S3 gateway and store backups from Cyber Backup solutions in public clouds.
1. {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=Import]} the image using the OpenStack CLI:

   ```console
   openstack image create --progress \
     --file cyber-storage.qcow2 \
     --disk-format qcow2 \
     --container-format bare \
     Cyber-storage
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create]} a virtual machine with the following parameters:

   - **Operating system**: the previously imported `Cyber-storage` image;
   - **Name**: any convenient name, in this example — `cb-01`;
   - **VM type**: `STD3-4-8`;
   - **Availability zone**: any suitable availability zone;
   - **Disk size**: `250 GB`;
   - **Disk type**: `SSD`;
   - **Network**: `public-storage-network`;
   - **VM key**: `vk-ssh`;
   - **Firewall settings**: `Default`, `cyber`;
   - **Assign external IP**: option enabled.

   Wait until the created VM boots up and the login prompt appears.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Connect]} the `private-storage-network` network to the VM. When connecting, specify:

   - a specific IP address from the available range of the `private-storage-subnet` subnet;
   - the `All allowed` (`all`) security group.
1. In the availability zone selected for the VM, {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=create]} a storage disk with the required size and {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect)[text=connect]} it to the VM. Save the disk name.

    {note:info}
    It is recommended to create a disk of at least 1 TB.
    {/note}

## {heading({counter(s3-gateway)}. Create and configure VMs for the subordinate nodes)[id=s3-cyber-backup-s3-gateway-vm-sub]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create]} two virtual machines with the following parameters:

    - **Operating system**: the previously imported `Cyber-storage` image;
    - **Name**: any convenient names, in this example — `cb-02` and `cb-03`;
    - **VM type**: `STD3-4-8`;
    - **Availability zone**: any suitable availability zone;
    - **Disk size**: `250 GB`;
    - **Disk type**: `SSD`;
    - **Network**: `public-storage-network`;
    - **VM key**: `vk-ssh`;
    - **Firewall settings**: `Default`, `cyber` — both security groups for each VM;
    - **Assign external IP**: option disabled.

    Wait until each of the created VMs boots up and the login prompt appears.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Connect]} the `private-storage-network` network to the created VMs. When connecting, specify for each VM:
    - a specific IP address from the available range of the subnet;
    - the `All allowed` (`all`) security group.
1. In the selected availability zone, {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=create]} disks of the same size as for the management node for each VM, and {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect)[text=connect]} the disks to the corresponding VMs. Save the disk names.

## {heading({counter(s3-gateway)}. Configure Cyber Storage)[id=s3-cyber-backup-s3-gateway-storage-server]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the `cb-01` virtual machine, using the `cloud-user` username and the private key from the previously created key pair.
1. Get and save the password for the Cyber Storage management panel:

   ```console
   cat /.initial-admin-password
   ```

   {cut(Output example)}
   ```console
   ❯❯❯ ssh cloud-user@195.211.119.185 -i .ssh/vk-bk
   Cyber Infrastructure release 5.0
   ========================================================================
   = Warning! Do not enable third-party repositories. Install third-party =
   = software only from the default repository. Use only commands allowed =
   = in the product documentation.                                        =
   ========================================================================
   [cloud-user@abgw-vk-a1 ~]$ cat /.initial-admin-password
   pass-example
   [cloud-user@abgw-vk-a1 ~]$
   ```
   {/cut}

   Save this password.
1. Go to the Cyber Storage management panel:

   1. Open the address `<VM_EXTERNAL_IP_ADDRESS>:8888` in your browser.
   1. Enter the login `admin` and the password you obtained earlier.
1. Go to the **Infrastructure → Networks** section and rename the `Private` network to `Public`.
1. Click the **Create Network** button and create a `Private` network.
1. Create a storage cluster:
   1. Go to the **Infrastructure → Servers** section.
   1. Click **Create storage cluster**.
   1. Specify the cluster name. For example, `backupcloud`.
   1. (Optional) Select the encryption type.
   1. Click the **Create** button.

1. Connect additional nodes:
   1. Go to the **Servers** section and click the **Connect Server** button.
   1. Save the IP address and token for connecting the nodes.
   1. Connect over SSH to the `cb-02` and `cb-03` VMs one after another, and run the following command on each of them:

        ```console
        sudo -i
           /usr/libexec/init-ifaces
           /usr/libexec/vstorage-ui-agent/bin/register-storage-node.sh -m <IP_ADDRESS> -t <TOKEN>
        ```

   1. Return to the Cyber Storage management panel and go to the **Infrastructure → Servers** section. Make sure that the server list contains three nodes: `cb-01`, `cb-02`, `cb-03`.

1. Configure the network interfaces:
   1. Click the node name and go to the **Network interfaces** tab.
   1. Change the interface settings:

      {tabs}
      {tab(eth0)}
      1. Click ![more-icon](/en/assets/more-icon.svg "inline") for the interface and select **Edit**.
      1. Assign the `Public` network to the interface.
      1. Save the changes.
      {/tab}
      {tab(eth1)}
      1. Click ![more-icon](/en/assets/more-icon.svg "inline") for the interface and select **Edit**.
      1. Assign the `Private` network to the interface.
      1. Manually add the interface IP address of the corresponding VM leading to the `private-storage-subnet` subnet, with the `/24` mask. This address was entered manually when {linkto(#s3-cyber-backup-s3-gateway-vm-main)[text=connecting]} each VM to the `private-storage-network` network.
      1. Save the changes.
      {/tab}
      {/tabs}

   1. Repeat these steps for each of the nodes.
1. Join the additional nodes to the storage cluster:
   1. Go to the **Infrastructure → Servers** section.
   1. For the `cb-02` and `cb-03` nodes, click ![more-icon](/en/assets/more-icon.svg "inline") one after another and select **Join cluster** → **Apply**.
   1. Wait until all nodes have the **"Healthy"** status.

1. Assign different traffic types to the networks:
   1. Go to the **Infrastructure → Servers** section.
   1. Using the **Assign Networks** and **Assign to networks** buttons, assign the following traffic types to the networks.

      {tabs}
      {tab(Private network)}
      - `Storage`;
      - `Internal management`;
      - `OSTOR private`;
      - `Backup (ABGW) private`.
      {/tab}
      {tab(Public network)}
      - `Admin-panel`;
      - `SSH`;
      - `S3 public`;
      - `iSCSI`;
      - `NFS`;
      - `Backup (ABGW) public`.
      {/tab}
      {/tabs}

1. Initialize the disks and assign roles to them:
   1. Go to the **Infrastructure → Servers** section.
   1. Click the `cb-01` node name, the **Disks** tab will open.
   1. Assign roles to the disks:
      - for `vda` — the **Metadata** role;
      - for `vdb` — the **Storage** role.
   1. Confirm the operation and wait for the node to finish being added to the cluster.
   1. Repeat the same steps for the `cb-02` and `cb-03` nodes.

## {heading({counter(s3-gateway)}. Configure high availability and load balancing for the cluster)[id=s3-cyber-backup-s3-gateway-ha]}

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Get]} the list of ports of the `public-storage-subnet` subnet. Write down the port IDs of the `cb-01`, `cb-02`, and `cb-03` VMs in this subnet.
1. Create a port in the `public-storage-network` network and the `public-storage-subnet` subnet, specifying a specific IP address from the subnet's address pool and the port name. In this example — `10.0.0.252`.

   ```console
   openstack port create -network <NETWORK_ID> -fixed-ip subnet=<SUBNET_ID>,ip-address=10.0.0.252 <PORT_NAME>
   ```

1. Add this IP address to the list of allowed addresses for the ports of the VMs directed to the `public-storage-subnet` subnet:

   ```console
   openstack port set --allowed-address ip-address=10.0.0.252 <CB-01_VM_PORT_ID>
   openstack port set --allowed-address ip-address=10.0.0.252 <CB-02_VM_PORT_ID>
   openstack port set --allowed-address ip-address=10.0.0.252 <CB-03_VM_PORT_ID>
   ```

1. {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-add)[text=Create]} a load balancer with the following parameters:

   - **Load balancer name**: `cb-balancer`;
   - **Network**: `public-storage-network`;
   - **Assign external IP**: option enabled.

1. Wait for the load balancer to be created and save its external IP address.
1. {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=Add]} a rule for this load balancer:

   1. Create a listener:

      ```console
      openstack loadbalancer listener create --name <LISTENER_NAME> \
       --protocol TCP --protocol-port 8888 <LOAD_BALANCER_ID>
      ```
   1. Create a balancing pool:

      ```console
      openstack loadbalancer pool create --name <POOL_NAME> \
       --protocol TCP --lb-algorithm ROUND_ROBIN --listener <LISTENER_NAME>
   1. Add pool members:

      ```console
      openstack loadbalancer member create --address 10.0.0.252 \
       --subnet-id <PUBLIC-STORAGE-SUBNET_ID> --protocol-port 8888 <POOL_NAME>
      ```
   1. Create a health check:

      ```console
      openstack loadbalancer healthmonitor create --type TCP \
       --delay 5 --timeout 3 --max-retries 3 <POOL_NAME>
      ```

1. Go to the Cyber Storage management panel and open the **Settings → Management Server → High Availability** section.
1. Select the three created nodes and click the **Create high availability configuration** button, then click **Continue**.
1. For the `public-storage-subnet` subnet, specify the virtual IP address `10.0.0.252`.
1. Confirm the configuration creation.
1. Check the availability of the management server at the external IP address of the load balancer by entering `https://<LOAD_BALANCER_EXTERNAL_IP_ADDRESS>:8888` in your browser's address bar.
1. (Optional) {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Delete]} the public IP address assigned to the `cb-01` VM. You can now go to the Cyber Storage management panel using the external IP address of the load balancer.
1. {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=Add]} a rule with the following parameters to the previously created load balancer:

   - **Balancing protocol**: `TCP`;
   - **Port**: `44445`;
   - **Apply to the following instances**: `cb-01`, `cb-02`, `cb-03`.
1. Assign an external domain name to the external IP address of the load balancer.

## {heading({counter(s3-gateway)}. Register the gateway)[id=s3-cyber-backup-s3-gateway-register]}

1. Go to the Cyber Storage management panel.
1. Go to the **Services → Backups** section and click the **Create backup storage** button.
1. At the **Backup destination** step, select **Cloud service** and click the **Next** button.
1. At the **Servers** step, select all nodes for storage and click the **Next** button.
1. At the **Cloud service** step:
   1. Select the object storage type: `AuthV2-compatible (S3)`.
   1. Enter the VK Object Storage endpoint URL:
      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
   1. Enter the {linkto(#s3-cyber-backup-s3-gateway-bucket)[text=bucket]} name and its access keys.
   1. Enable the **Allow self-signed certificate to the endpoint** option.
   1. Click the **Next** button.
1. At the **Storage policies** step:
   1. Select the `Node` failure domain.
   1. Select the redundancy mode that matches your organization's policies.
   1. Click the **Next** button.
1. At the **DNS** step:
   1. Specify the external domain name assigned to the load balancer.
   1. Make sure that your DNS server configuration matches the example shown in the interface. Change it if necessary.
   1. Click the **Next** button.
1. At the **Cyberprotect account** step:
   1. Specify the cloud console URL: `https://ru01-cloud.cyberprotect.ru`.
   1. Enter the login and password for accessing the organization's tenant, obtained from technical support.
   1. Click the **Next** button.

      {note:info}
      Two-factor authentication must be disabled on the account. It is better to use a service account.
      {/note}

1. At the **Summary** step, review the configuration, click the **Create** button, and wait for the gateway to be created.

## {heading({counter(s3-gateway)}. Add users)[id=s3-cyber-backup-s3-gateway-clients]}

1. Log in at `https://ru01-cloud.cyberprotect.ru`.
1. Create users and administrators.
1. Delegate the connected gateway for backups in the user settings when creating or editing a user.
1. Go to the **Clients** section.
1. Create client tenants in the organization tenant, and specify the new S3 backup storage for them.

## {heading({counter(s3-gateway)}. Check functionality)[id=s3-cyber-backup-s3-gateway-check]}

1. {linkto(../../../marketplace/initial-configuration/cyber-backup-quick-start#marketplace-cyber-backup-quick-start-create-plan)[text=Create]} a backup in the Cyber Backup Cloud service.
1. Make sure that the backup is saved in the VK Object Storage bucket.

## {heading(Delete unused resources)[id=s3-cyber-backup-s3-gateway-delete]}

A running service infrastructure consumes compute resources. If you no longer need the S3 gateway and the storage cluster, delete them:

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the virtual machines.
1. Make sure that all disks were deleted together with the VMs; if not, {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=delete]} them.
1. {linkto(../../../../../networks/vnet/instructions/router#vnet-router-delete)[text=Delete]} the router.
1. {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-delete)[text=Delete]} the load balancer.
1. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Delete]} the public IP addresses.
