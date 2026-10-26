# {heading(Server lease)[id=bare-metal-manage-service]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Ordering a server)[id=bare-metal-manage-service-order]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Make sure your account has sufficient funds to order the desired configuration.

   Prices for Bare Metal server configurations are available in the [price list](https://cloud.vk.ru/pricelist/).

1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-add)[text=Create]} a network with a private subnet if this has not been done earlier.
1. Go to the **Cloud Computing** → **Bare Metal** section.
1. Click **Lease**.
1. Select a {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} and click the desired server configuration.

    To search by specified characteristics, use the **Filters** menu.

1. In the **Server configuration** block, set:

    - **Number of servers**: specify how many servers you need to lease.
    - **Operating system**: select the OS installation method:

        {tabs}

        {tab(Automatic)}

        Select the **Select OS** option. A choice of OS family, as well as its version and disk partitioning scheme, will open. After the order is placed, automatic installation from the {var(cloud)} image will start.

        Automatic installation is performed on one or two SSD disks, depending on the selected partitioning:

        - `RAID1`: two SSD disks will be combined into a software RAID array with mirroring. Data will be written to both disks simultaneously, but the available capacity will equal the capacity of one disk.
        - `System disk`: the system will be installed on only one SSD disk. No changes will be made to the file system on the second SSD disk.

        {/tab}

        {tab(Manual)}

        Select the **ISO image** option. A dropdown list of available images will open. If the desired image is not available, {linkto(../../../../computing/bare-metal/instructions/manage-image#bare-metal-image-upload)[text=upload]} it to the image storage.

        After placing the order, {linkto(../../connect/console#bare-metal-console)[text=use]} the VNC console to complete the OS installation. The server will boot from the selected ISO image as soon as it reaches the `Active` status.

        {/tab}

        {tab(Do not install an OS)}

        Select the **Without OS** option if you want to {linkto(../../../../computing/bare-metal/instructions/os-setup#bare-metal-os-setup)[text=install the OS]} later.

        {/tab}

        {/tabs}

    - **Use custom scripts**: enable the option to add a bash script or a [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) scenario that will be executed at the first server startup.
    - **Tags**: set a new tag for the server or select an existing one.   

1. In the **Network** block:

   1. In the **Virtual machine key** field, select an existing key for SSH connection or create a new one.

        If you create a new key, the private key file `*.pem` will be downloaded automatically after the order is placed. Save it; you will need it later to connect to the server via SSH.

        The public part of the key will be automatically added to the server.

    1. Click the **Configure network interfaces** button and in the **Private subnet** field, specify which private subnet the server will be connected to.

1. Click the **Lease** button.

   After the order is completed, a server with the `Pending` status will appear in the list.

1. Wait until the server status in the list changes to `Active`.

{/tab}

{/tabs}

## {heading(Canceling a server lease)[id=bare-metal-manage-service-delete]}

{note:warn}
When deleted, the Bare Metal server will be removed from the project, and the data on it will be deleted.
{/note}

{tabs}

{tab(Management console)}
    
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Bare Metal** section.
1. Delete the server using one of the following methods.

   - From the server list:

     1. In the list of Bare Metal servers, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
     1. Select **Delete** and confirm the action.

   - On the server page:

     1. In the list of Bare Metal servers, click the name of the desired server.
     1. On the server page, click ![ ](../../../../assets/more-icon.svg "inline").
     1. Select **Delete** and confirm the action.

{/tab}

{/tabs}