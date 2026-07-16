
{include(/en/_includes/_translated_by_ai_en.md)}

## Prerequisites

1. Select a project for migration.
1. [Check](/en/tools-for-using-services/account/instructions/project-settings/manage#project-sdn-view) which SDNs are connected in your project. If SDN Sprut is not connected, contact [technical support](mailto:support@mcs.mail.ru).
1. Prepare an administrator workstation for performing the migration:

    1. [Create a VM](/en/computing/iaas/instructions/vm/vm-create) in a subnet with internet access. Specify the following parameters:

        - **Operating system**: select Ubuntu.
        - **Firewall settings**: specify `ssh` for CLI access to the VM.
        - **Assign external IP**: enable the option.
        - Select the remaining parameters at your discretion.

    1. Wait for the VM to be created and [connect to it via SSH](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

    1. Update the package indexes by running the command:

        ```console
        sudo apt-get update
        ```

    1. Install the [jq](https://jqlang.github.io/jq/) utility:

        ```console
        sudo apt-get install -y jq
        ```

    1. Install the [OpenStack client](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in the project.

    1. Clone the repository containing the migration scripts:

        ```console
        git clone https://github.com/vk-cs/neutron-2-sprut.git
        ```
    1. Navigate to the `neutron-2-sprut` directory.
    1. Run the command that will add execution permissions to all files with the `.sh` extension in this directory:

        ```console
        chmod +x .sh
        ```

## 1. Collect project infrastructure data for migration

Assess the project's network infrastructure and identify the entities that need to be migrated:

1. Connect to the administrator VM via SSH.
1. Get the list of VMs:

    ```console
    openstack server list
    ```
    In the response, find and save the following information:

     - IDs of those virtual machines that have multiple network interfaces.
     - IDs and IP addresses of those virtual machines that have assigned Floating IP addresses.
     - IDs of all other VMs that need to be migrated.
1. Get the list of routers:

    ```console
    openstack router list
    ```

    Save the IDs of the routers that need to be migrated.

1. If your project has IPsec tunnels, save the IDs of the routers used to build the tunnel.

1. Get the list of security groups:

    ```console
    openstack security group list
    ```

    Save the names of all security groups except the default groups: `all`, `default`, `ssh+www`.

1. The default groups `all`, `default`, `ssh+www` have the same names in SDN Sprut and Neutron. Find and save the IDs of these groups:

    1. [Go](https://cloud.vk.com/app/) to your VK Cloud account.
    1. Select the project.
    1. Navigate to the **Virtual Networks** → **Firewall settings** section.
    1. Find and save the IDs of the `all`, `default`, `ssh+www` groups in SDN Sprut and Neutron.

## 2. Copy routers, networks, and subnets to SDN Sprut

1. Connect to the administrator VM via SSH and navigate to the `neutron-2-sprut` directory.
1. Create a configuration file in CSV format with a list of routers. The file will be used to copy basic network entities using a script.

    File format:

    ```csv
    <ROUTER_1>,<COPY_TYPE>
    <ROUTER_2>,<COPY_TYPE>
    ```

    Where:

   - `<ROUTER_1>`, `<ROUTER_2>` — router IDs.
   - `<COPY_TYPE>` — type of the router copy in SDN Sprut:

      - `std` — the copy will be created as a [standard](/en/networks/vnet/concepts/router#standard) router.
      - `adv` — the copy will be created as an [advanced](/en/networks/vnet/concepts/router#advanced) router. Specify this parameter if the router in your project is used to build an IPsec tunnel.

    Example of a configuration file for copying routers:

    ```csv
    35fbfb7c-aaaa-aaaa-aaaa-c3fb4d833dee,adv
    a2dd20ca-bbbb-bbbb-bbbb-7ea8b00a81a6,std
    ```

1. Run the router migration script:

    ```console
    ./copy-router-and-networks.sh <FILE_NAME>
    ```

    Where `<FILE_NAME>` is the name of the configuration file with the list of routers.

    Example:

    ```console
    ./copy-router-and-networks.sh config.csv
    ```

    As a result of the script execution, the specified routers will be copied to SDN Sprut along with static routes, networks, and subnets they are connected to. The `-sprut` postfix will be added to the name of each copied entity.

## 3. Verify script execution

Review the copied entities and make sure that all routers, networks, and subnets have been copied:

1. Check the list of networks:

    ```console
    openstack network list
    ```

1. Check the list of subnets:

    ```console
    openstack subnet list
    ```

1. Check the list of standard routers:

    ```console
    openstack router list
    ```

1. Check the list of added advanced routers. To do this, go to your account or make a REST API request:

    ```console
    sprut_api_base="https://infra.mail.ru:9696/v2.0"

    token=$(openstack token issue -c id -f value)

    sprut_advanced_routers=$(curl -s -X GET "${sprut_api_base}/direct_connect/dc_routers" \
        -H "Content-Type: application/json" \
        -H "X-Auth-Token: $token" \
        -H "X-SDN:SPRUT")
    echo "Advanced routers collected:"
    echo "$sprut_advanced_routers" | jq .
    echo ""
    ```

    {note:info}
    OpenStack CLI does not show advanced routers in the list.
    {/note}

## 4. (Optional) Configure the advanced router

If the project uses an IPsec tunnel, [configure](/en/networks/vnet/how-to-guides/advanced-router) the advanced router created by the script and prepare it for connecting the IPsec tunnel.

## 5. (Optional) Migrate the IPsec tunnel

Tunnels with the same selectors (source and target subnet ranges) cannot exist simultaneously, even if they are in different SDNs. Therefore, you cannot create a tunnel in SDN Sprut in advance that is similar to the tunnel in SDN Neutron, as this will cause issues with the original tunnel.

1. [Delete](/en/networks/vnet/instructions/vpn#vnet-vpn-delete) the original tunnel in SDN Neutron.
1. [Add](/en/networks/vnet/instructions/vpn#vnet-vpn-add) a new VPN tunnel for the advanced router configured in SDN Sprut, and set the IPsec policy parameters.

## 6. Copy security groups to SDN Sprut

1. Connect to the administrator VM via SSH.
1. Navigate to the `neutron-2-sprut` directory.
1. Copy the security groups to SDN Sprut:

    ```console
     ./copy-security-group.sh \
        --group-mapping=<NEUTRON_GROUP_1>=<SPRUT_GROUP_1>,<NEUTRON_GROUP_2>=<SPRUT_GROUP_2>,... \
        --groups=<GROUP_3>,<GROUP_4>,...
    ```

    Where:

    - `--group-mapping` — this parameter allows you to map existing security groups of different SDNs to each other by ID. This is needed if the copied groups have rules where the source is not a CIDR but another security group. Typically, these are the `all`, `default`, `ssh+www` groups. Parameter arguments:
      - `<NEUTRON_GROUP_1>`, `<NEUTRON_GROUP_2>` — security group IDs in SDN Neutron;
      - `<SPRUT_GROUP_1>`, `<SPRUT_GROUP_2>`  — security group IDs in SDN Sprut;

    - `--groups` — this parameter specifies the names of security groups in SDN Neutron that need to be copied to SDN Sprut. Parameter arguments: `<GROUP_3>`, `<GROUP_4>` — names of the groups being copied.

    Example command:

    ```console
    ./copy-security-group.sh \
        --group-mapping=4a361c99-cccc-cccc-cccc-b59fb469d354=121a7574-dddd-dddd-dddd-66baa01400d6,14f303dc-aaaa-aaaa-aaaa-9637c9c342df=3371584a-bbbb-bbbb-bbbb-1cc9f3e89601 \
        --groups=web-server-security,spark-k8s-6681-master,ml_sec_group
    ```

    Security groups will be copied with the `-sprut` postfix.

## 7. Verify security groups

Make sure that the security groups in SDN Sprut are identical to the security groups in SDN Neutron. SDN Sprut groups copied from SDN Neutron have the `-sprut` postfix.

1. Connect to the administrator VM via SSH and navigate to the `neutron-2-sprut` directory.
1. Run the script:

    ```console
    ./check-if-all-sprut-sg-present.sh
    ```

    If all required groups are copied, the script will return the following message:

    ```console
    All security groups have corresponding '-sprut' groups.
    ```

## 8. (Optional) Create a Floating IP address in SDN Sprut

Floating IP addresses cannot be migrated to another SDN. If your project infrastructure has Floating IP addresses, [create new ones](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add) in SDN Sprut and write them down.

## 9. Switch VM network interfaces to SDN Sprut

{note:warn}
This operation causes a network connectivity interruption. If you are migrating a production network infrastructure, notify service users about the maintenance and perform this operation during off-peak hours.
{/note}

To move a VM to SDN Sprut, you need to connect its ports to new subnets. This is done in different ways depending on the number of VM ports and the type of connections:

- Multiple VMs can be switched by running a single script, but these VMs must have only one network interface each and must not have direct connections to the `ext-net` external network.
- A single VM can be switched by running a separate script. This method is suitable if your project has a VM with multiple network interfaces, that is, acting as a router, proxy, or edge firewall.
- If in your configuration the VM is directly connected to the `ext-net` external network, migrate it to SDN Sprut using any convenient method:

  - [Add](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add) a Floating IP address in SDN Sprut and connect the VM to it.
  - [Recreate](/en/computing/iaas/instructions/vm/vm-create) the VM in SDN Sprut and connect it to the `internet` external network.

{tabs}

{tab(Migrating multiple VMs)}

1. Connect to the administrator VM via SSH and navigate to the `neutron-2-sprut` directory.
1. Create a CSV file with a list of VMs to be migrated.

    File format:

    ```csv
    <VM_1>,<SPRUT_NETWORK_1>,<SPRUT_SUBNET_1>,<SPRUT_FLOATING-IP>
    <VM_2>,<SPRUT_NETWORK_2>,<SPRUT_SUBNET_2>
    ```

    Where:

    - `<VM_1>`, `<VM_2>` — names of the VMs to be migrated to SDN Sprut.
    - `<SPRUT_NETWORK_1>`, `<SPRUT_NETWORK_2>` — names of the networks in SDN Sprut to connect the VMs to.
    - `<SPRUT_SUBNET_1>`, `<SPRUT_SUBNET_2>` — names of the subnets in SDN Sprut to connect the VMs to.
    - (Optional) `<SPRUT_FLOATING_IP>` — Floating IP address in SDN Sprut to assign to the VM.

    Example file with a list of VMs:

    ```csv
    web-server-1,web-app-network-sprut,app-subnet-sprut,83.166.236.59
    web-server-2,web-app-network-sprut,app-subnet-sprut
    ```

1. Schedule a maintenance window during which the migration will be performed. During the switch, the VM will lose network connectivity. Switching a single VM takes approximately 45 seconds.

1. Make sure the VMs are active:

    ```console
    openstack server list
    ```

    All VMs that need to be migrated to SDN Sprut must have the `ACTIVE` status.

1. Run the migration script:

    ```console
    ./migrator-multiple.sh <FILE_NAME> \
     --all-secgroup-sprut-id=<ALL_GROUP_ID> \
     --ssh-www-secgroup-sprut-id=<SSH+WWW_GROUP_ID>
    ```

    Where:

    - `<FILE_NAME>` — the name of the file with the list of VMs.
    - (Optional) `--all-secgroup-sprut-id` — the `all` security group is added to the project by default and has the same name in SDN Sprut and Neutron. If the group is used in a VM, specify the group ID in Sprut so that OpenStack CLI can distinguish the security group's SDN membership. Parameter argument: `<ALL_GROUP_ID>` — the ID of the `all` security group in SDN Sprut.
    - (Optional) `--ssh-www-secgroup-sprut-id` — the `ssh+www` security group is added to the project by default and has the same name in SDN Sprut and Neutron. If the group is used in a VM, specify the group ID in Sprut so that OpenStack CLI can distinguish the security group's SDN membership. Parameter argument: `<SSH+WWW_GROUP_ID>` — the ID of the `ssh+www` security group in SDN Sprut.

    Example command:

    ```console
    ./migrator-multiple.sh migrate-vm.csv \
     --all-secgroup-sprut-id=4a361c99-cccc-cccc-cccc-b59fb469d354=121a7574-eeee-eeee-eeee-66baa01400d6 \
     --ssh-www-secgroup-sprut-id=14f303dc-bbbb-bbbb-bbbb-9637c9c342df=3371584a-dddd-dddd-dddd-1cc9f3e89601
    ```

1. For each VM, open the console or connect via SSH and perform a DHCP server request to obtain an IP address for the added network interface:

    {tabs}
    
    {tab(Linux)}
        
    ```console
    dhclient
    ```
    {/tab}
    
    {tab(Windows)}
    
    ```console
    ipconfig /release
    ipconfig /renew
    ```
    {/tab}

    {/tabs}

{/tab}

{tab(Migrating a single VM)}

1. Collect the required information:

    - VM name;
    - target network name in SDN Sprut;
    - target subnet name in SDN Sprut.

1. Schedule a maintenance window during which the migration will be performed. During the switch, the VM will lose network connectivity. Switching a single VM takes approximately 45 seconds.
1. Connect to the administrator VM via SSH and navigate to the `neutron-2-sprut` directory.
1. Make sure the VM is active:

    ```console
    openstack server show <VM_NAME>
    ```

    The VM must have the `ACTIVE` status in the response.
1. Navigate to the `neutron-2-sprut` directory.
1. Run the migration script:

    ```console
    ./migrator.sh --opt <MIGRATION_METHOD>
    ```

    Where `<MIGRATION_METHOD>` is the VM migration method:

      - `clone` — migration with preservation of MAC and IP address information.
      - `noclone` — migration by assigning random MAC and IP addresses from the target subnet.

1. Enter the name of the VM to be migrated to SDN Sprut.
1. Enter the name of the network in SDN Sprut to connect the VM to.
1. Enter the name of the subnet in SDN Sprut to connect the VM to.
1. After the script completes, open the console of the migrated VM or connect via SSH and perform a DHCP server request to obtain IP addresses for the added network interfaces:

    {tabs}
    
    {tab(Linux)}
        
    ```console
    dhclient
    ```
    {/tab}
    
    {tab(Windows)}
    
    ```console
    ipconfig /release
    ipconfig /renew
    ```
    {/tab}
    
    {/tabs}

{/tab}

{/tabs}

## 10. Verify the created configuration

Check the availability of all VMs after migration.

## Delete unused resources

If you no longer need SDN Neutron resources, delete them:

1. [Remove](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete) Floating IP addresses from the project.
1. [Delete](/en/networks/vnet/instructions/secgroups#delete-group) security groups.
1. Delete [networks](/en/networks/vnet/instructions/net#vnet-net-delete) and [subnets](/en/networks/vnet/instructions/net#vnet-net-subnet-delete).
1. [Delete](/en/networks/vnet/instructions/router#vnet-router-delete) routers.