# {heading(OS installation)[id=bare-metal-os-setup]}

{include(/en/_includes/_translated_by_ai_en.md)}

Bare Metal supports both automatic OS installation via the management console and manual installation using your own ISO image.

If the installation has already been performed, the OS can be reinstalled to any other one.

{note:warn}
When the OS is automatically reinstalled via the management console, all user data will be deleted. It is recommended to make a backup before starting the reinstallation.
{/note}

{tabs}

{tab(Management console)}

1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Bare Metal** section.
1. Open the OS installation menu in one of the following ways:

   - From the list of servers:

     1. In the list of Bare Metal servers, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
     1. Select **Install operating system** or **Reinstall operating system**.

   - On the server page:

     1. In the list of Bare Metal servers, click the name of the desired server.
     1. On the server page, click ![ ](../../../../assets/more-icon.svg "inline").
     1. Select **Install operating system** or **Reinstall operating system**.

1. Configure the server parameters:

   - **Server name**: enter the server name.
   - **Operating system**: configure the OS installation parameters:

     - **Select OS**: automatic OS installation from {var(cloud)} images.
     - **ISO image**: manual OS installation from a custom ISO image.

1. Click **Next step**.
1. For the **Network** parameter, select the network to which you want to connect the server.
1. Click **Install** and confirm the action.

   The OS installation will start, and the private key file `*.pem` will be downloaded automatically. Save it, as it will be required later to connect to the server via SSH.

   The public part of the key will be automatically added to the server.

   {note:err}
   The private key file `*.pem` cannot be restored. If it is lost, you will not be able to connect to the server using the key pair.
   {/note}

{/tab}

{/tabs}