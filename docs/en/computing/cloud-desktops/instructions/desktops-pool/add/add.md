<warn>

Changing created virtual resources (VMs, load balancers, DB instances) outside the service can lead to a failure of individual desktops or the entire pool.

</warn>

## {heading(Preparatory steps)[id=preparatory_steps]}

1. Make sure that your [connection to the service](../../config) is configured.
1. (Optional) If you want to use your own image to create desktops, [prepare](/en/computing/cloud-desktops/concepts/desktop-image) and [check](/en/computing/cloud-desktops/how-to-guides/check-desktop-image) it.
1. (Optional) If you previously selected the [manual mode](../../../concepts/about#manual_net_setup) when [setting up the network](../../config/setup-net#setup_net) for the service infrastructure, prepare a network for the desktop pool:

    1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
    1. Go to **Cloud Networks** → **Networks**.
    1. Click the name of the required network. If there is no suitable network, [create](/en/networks/vnet/instructions/net#creating_network) it.
    1. Click ![ ](/en/assets/more-icon.svg "inline") for the required subnet and select **Edit subnet**. If there is no suitable subnet, [create](/en/networks/vnet/instructions/net#creating_subnet) it taking into account the [requirements for the number of ports](../../../concepts/about#ports_number).
    1. Disable the **Private DNS** option.
    1. In the **DNS servers** field, in the first positions in the list, specify the IP addresses of your DNS servers, each address on a new line.
    1. Save changes.
    1. Click the name of the subnet and go to the **Ports** tab.
    1. Verify that the number of free ports on the subnet meets the [requirements](../../../concepts/about#ports_number). If there are not enough ports, use a different subnet.

## {heading(1. Run pool creation wizard)[id=launch_master]}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. Click the **Add** button.

   The wizard for creating a new pool opens.

## {heading(2. Set up pool configuration)[id=setup_pool_configuration]}

1. Set the pool configuration parameters:

    - **Pool name**: set a name that is unique within the project. Field requirements: from 3 to 128 characters, only Latin letters, characters `-`, `_`, spaces, and numbers are allowed.
    - **Pool type**: choose one of the options:

        - **Sessional** — in such a pool, the user is automatically assigned a desktop upon connection. Use the session pool if you need to deploy a large number of desktops of the same configuration with the same set of software. The session pool has hot reserve of desktops.
        - **Personalized** — in such a pool, the administrator assigns desktops to specific users. Suitable for deploying desktops with individual configuration for individual users. This type of pool is used most often.

    - **Description**: the pool description, up to 250 characters.

    - **Network**: select the previously [prepared network](#preparatory_steps) from the list. The parameter is available if the manual mode is selected in the [network settings](../../config/setup-net#setup_net) of the service.
    - **User group**: specify the user group of the AD or LDAP directory. The users in this group will be assigned desktops from the pool. Field requirements: from 3 to 100 characters, only Latin letters, characters `-`, `_`, `.`, and numbers are allowed.
    - **OU**: specify the organizational unit of the AD or LDAP directory. For example, `OU=Workstations,DC=domain,DC=com`.
    - **Naming mask**: the suffix with which the desktops names in this pool will begin. Field requirements: from 3 to 15 characters, only lowercase Latin letters and the `-` character at the end are allowed.
    - **Min number of desktops** — determines how many desktops will be deployed immediately after the pool is created. The default is `0`.

      This parameter cannot exceed the value of the parameter **Max number of desktops**.

    - **Max number of desktops** — determines how many desktops in the pool can be used at the same time.
    - **Hot reserve** — available only for session pools. Hot reserve desktops become available only at the moment when the user connects and return to the reserve when the user session ends.

      There will be no available desktops in the hot reserve if the value `0` is selected or the parameters **Min number of desktops** and **Max number of desktops** are equal.

    - **User inactivity timeout**: the time after which the user will be disconnected from the desktop if there is no activity on the desktop. The timeout works for the RDP and RX protocols.

      If the value is `0`, the user session will not be interrupted by time-out.

1. Click the **Next step** button.

## {heading(3. Configure pool VMs)[id=configure_pool_vms]}

1. Specify the settings of the virtual machines on which the pool desktops will be created:

    - **Category of virtual machine**: select a [category](/en/computing/iaas/concepts/about#vm_categories) from the list. The category serves as a filter for the **Instance type** box.
    - **Instance type**: select the VM type from the list of types available in the project.
    - **Disk size**: specify the disk size in GB. The value cannot be less than the size of the OS image.
    - **Disk Type**: choose one of the values — `HDD`, `SSD` or `High-IOPS SSD`.
    - **Image**: select an image to create the VMs from the list of available images.

      {cut(List of available images)}

      - `Windows Server 2019 Standard (ru)`
      - `Windows Server 2019 Standard (en)`
      - `Windows Server 2022 Standard (ru)`
      - `Windows Server 2022 Standard (en)`
      - `Red OS 7.3 Стандарт (Cloud Desktop)`
      - `Astra Linux SE 1.7 Орел (Cloud Desktop)`

      {/cut}

      If necessary, click **Upload your image** and upload the [previously prepared](/en/computing/cloud-desktops/concepts/desktop-image) and [checked](/en/computing/cloud-desktops/how-to-guides/check-desktop-image) image following the [import instructions](/en/computing/iaas/instructions/images/images-manage#importing_an_image).

      <info>

      The pool cannot be created until the image upload is complete.

      </info>

    - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#az) of the pool virtual machines from the list.

1. (Optional) Click the **Add a security group** button and specify additional security groups for the VM. The primary security group named `vdi-desktop-<POOL_NAME>` is assigned to the pool automatically.
1. Click the **Next step** button.

## {heading(4. Configure peripherals)[id=configure_peripherals]}

1. Select [peripheral devices](../../../concepts/about#available_peripherals) that will be available on the pool desktops.
1. Click the **Create a pool** button.

   The pool creation will start. This may take up to 40 minutes.

If the pool is created successfully, a list of created pools will open.
