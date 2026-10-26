# {heading(Quick start)[id=bare-metal-quick-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Quick start will help you get started with the Bare Metal service and explore its capabilities. Service setup will be demonstrated using a Bare Metal server with Linux OS installation and SSH connection as an example.

{note:info}
Windows OS is not supported.
{/note}

After completing all the quick start steps, you will:

1. {linkto(#bare-metal-quick-start-net-setup)[text=Create]} a network.
1. {linkto(#bare-metal-quick-start-order)[text=Rent]} a Bare Metal server.
1. {linkto(#bare-metal-quick-start-jump-host)[text=Create]} a separate intermediate host in the form of a Linux virtual machine with an external IP address.
1. {linkto(#bare-metal-quick-start-os-setup)[text=Install the Linux OS]} on the Bare Metal server.
1. {linkto(#bare-metal-quick-start-connect)[text=Connect]} to the Bare Metal server via SSH through the previously created intermediate host.

## {heading(Preparatory steps)[id=bare-metal-quick-start-preparings]}

1. {linkto(../../../intro/onboarding/account#onboarding-account)[text=Register]} on the {var(cloud)} platform.
1. Make sure your account balance is sufficient for:

   - Renting the desired Bare Metal server configuration.
   - Paying for a {linkto(../../../computing/iaas/concepts/vm#iaas-concepts-vm)[text=virtual machine]} with Linux in a configuration with 1 vCPU, 1 GB RAM, 1 HDD disk of 10 GB, and a public Sprut IP address.

     Prices for the specified resources are available in the [price list](https://cloud.vk.ru/pricelist/).

1. Check whether there are enough {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=quotas]} for:

   - renting one Bare Metal server;
   - creating a virtual machine with the minimum configuration: 1 vCPU, 1 GB RAM, 1 disk;
   - adding one Sprut Floating IP address.

## {heading({counter(TOC-steps)}. Create a network)[id=bare-metal-quick-start-net-setup]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Virtual networks** → **Networks** section.
1. Click the **Create** button.
1. Set the network parameters:

   - **Network name**: enter the value `my-net`.
   - **Internet access**: enable the option.
   - **Router**: select the `Create new` option.
    
   Leave the remaining parameters at their default values.

1. Click the **Add network** button.

## {heading({counter(TOC-steps)}. Order a server)[id=bare-metal-quick-start-order]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud computing** → **Bare Metal** section.
1. Click the **Rent** button.
1. Set the order parameters:

   - **Configuration**: select the desired server configuration.
   - **Number of servers**: specify the value `1`.
   - **Operating system**: select `No OS`.
   - **Private subnet**: select the `my-net` network and the subnet created by default.

1. Click the **Rent** button.

   After the order is completed, a server with the `Pending` status will appear in the list.

1. Wait until the server status in the list changes to `Active`.

## {heading({counter(TOC-steps)}. Create an intermediate host)[id=bare-metal-quick-start-jump-host]}

1. Generate an SSH key for the intermediate host:

   {tabs}

   {tab(Linux/macOS)}

   Run the command in the terminal:

   ```bash
   ssh-keygen -t rsa -b 2048 -f ~/.ssh/my_key -N ""
   ```

   Two files, `my_key` and `my_key.pub`, will be created in the `~/.ssh/` directory.

   {/tab}

   {tab(Windows 10/11)}

   In PowerShell, run the command:

   ```ps
   ssh-keygen -t rsa -b 2048 -f "$env:USERPROFILE\.ssh\my_key" -N `"`"`"
   ```

   Two files, `my_key` and `my_key.pub`, will be created in the `%USERPROFILE%\.ssh\` directory.

   {/tab}

   {/tabs}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud computing** → **Virtual machines** section.
1. Click the **Create instance** or **Add** button.
1. Set the VM parameters:

   - **Virtual machine name**: enter `my-jump-host`.
   - **Virtual machine type**: select `STD2-1-1`, the minimum configuration.     
   - **Disk type**: select `HDD`. High storage performance is not required for the intermediate host.
   - **Operating system**: select `Ubuntu 24.04`.

   Leave the remaining parameters at their default values.

1. Click the **Next step** button.
1. Configure the VM connection to the network:

   - **Network**: select the `my-net` network and the subnet created by default.
   - **Virtual machine key**: select `Upload public SSH key`.

     A key import form will open. Fill in the **Key name** field and copy your public key into the **Public key** field. You can obtain it by reading the `my_key.pub` file:

     {tabs}

     {tab(Linux/macOS)}

     Run the command in the terminal:

     ```bash
     cat ~/.ssh/my_key.pub
     ```

     {/tab}

     {tab(Windows 10/11)}

     In PowerShell, run the command:

     ```ps
     Get-Content "$env:USERPROFILE\.ssh\my_key.pub"
     ```

     {/tab}

     {/tabs}

   - **Firewall settings**: add the `ssh` security group.
   - **Assign external IP**: enable the option.
   - **External IP**: select `Allocate new`.

   Leave the remaining parameters at their default values.

1. Click the **Next step** button.
1. Disable the backup setting; it is not needed for the intermediate host.
1. Click the **Create instance** button.
1. Wait for the VM creation to finish and verify that an SSH connection is possible. To do this, enter the command:

   ```bash
   ssh <USERNAME>@<INTERMEDIATE_HOST_IP_ADDRESS>
   ```

   Here:

   - `<USERNAME>` — the default account name that is {linkto(../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=used in {var(cloud)} images]}.
   - `<INTERMEDIATE_HOST_IP_ADDRESS>` — the external IP address of the intermediate host.

   When connecting via SSH for the first time, a confirmation prompt will appear:

   ```txt
   The authenticity of host 'XXX.XXX.XXX.XXX (XXX.XXX.XXX.XXX)' can't be established.
   ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+j************
   Are you sure you want to continue connecting (yes/no)?
   ```

   Enter `yes` in the terminal and press ENTER.

1. End the SSH session with the command:

   ```shell
   quit
   ```

## {heading({counter(TOC-steps)}. Install the OS)[id=bare-metal-quick-start-os-setup]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud computing** → **Bare Metal** section.
1. In the list of Bare Metal servers, click the name of the desired server.
1. On the server page, click ![ ](../../../assets/more-icon.svg "inline") and select the **Install operating system** option.
1. Set the server parameters:

   - **Name**: enter `my-bare-metal`.
   - **Operating system**: select `Select OS` and the `Ubuntu 24.04` image.

1. Click the **Next step** button.
1. For the **Network** parameter, select the `my-net` network and the subnet created by default.
1. Click the **Install** button and confirm the action.

   The OS installation will start, and the private key file `*.pem` of your key pair will be downloaded automatically. Save it, as you will need it later to connect to the server via SSH.

   The public part of the key will be automatically added to the server.

   {note:err}
   The private key file `*.pem` cannot be restored. If it is lost, you will not be able to connect to the server using the key pair.
   {/note}

## {heading({counter(TOC-steps)}. Connect to the server)[id=bare-metal-quick-start-connect]}

{tabs}

{tab(Linux/macOS)}

1. Open a terminal and set the access permissions for the key file:

   ```bash
   chmod 400 <KEY_FILE>
   ```

   Here `<KEY_FILE>` is the path to the `*.pem` file with the private key.

   Example for the key file `MyPrivateKey.pem` located in the `/path/to/file/` directory:

   ```bash
   chmod 400 /path/to/file/MyPrivateKey.pem
   ```

1. Connect to the Bare Metal server.

   First, you need to connect to the intermediate host via its external IP address, and then to the Bare Metal server via its internal IP address. This can be done with a single command:

   ```bash
   ssh -i <KEY_FILE> \
       -J <USERNAME>@<INTERMEDIATE_HOST_IP_ADDRESS> \
          <USERNAME>@<SERVER_INTERNAL_IP_ADDRESS>
   ```

   Here:

   - `<KEY_FILE>` — the path to the `*.pem` file with the private key.
   - `<USERNAME>` — the default account name that is {linkto(../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=used in {var(cloud)} images]}. For both the intermediate host and the Bare Metal server, you need to enter the username corresponding to the OS image used on them.
   - `<INTERMEDIATE_HOST_IP_ADDRESS>` — the external IP address of the intermediate host.
   - `<SERVER_INTERNAL_IP_ADDRESS>` — the internal IP address of your Bare Metal server.

   When connecting via SSH for the first time, a confirmation prompt will appear:

   ```txt
   The authenticity of host 'XXX.XXX.XXX.XXX (XXX.XXX.XXX.XXX)' can't be established.
   ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+j************
   Are you sure you want to continue connecting (yes/no)?
   ```

   Enter `yes` in the terminal and press ENTER.

{/tab}

{tab(Windows 10/11)}

1. Configure the access permissions for the private key file:

   1. Open the properties of the `.pem` private key file.
   1. Go to the **Security** tab and click the **Advanced** button. The **Advanced Security Settings** window will open.
   1. Click the **Disable inheritance** button and, in the window that opens, select **Remove all inherited permissions from this object**.
   1. In the **Advanced Security Settings** window, click the **Add** button.
   1. In the window that opens, click **Select a principal** and specify the Windows OS user on whose behalf the command line for connecting to the VM will be run.
   1. Confirm the changes by clicking **OK** in each of the opened settings windows.

1. Connect to the Bare Metal server.

   First, you need to connect to the intermediate host via its external IP address, and then to the Bare Metal server via its internal IP address. This can be done with a single command:

   ```ps
   ssh -i <KEY_FILE> `
       -J <USERNAME>@<INTERMEDIATE_HOST_IP_ADDRESS> `
          <USERNAME>@<SERVER_INTERNAL_IP_ADDRESS>
   ```

   Here:

   - `<KEY_FILE>` — the path to the `*.pem` file with the private key.
   - `<USERNAME>` — the default account name that is {linkto(../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=used in {var(cloud)} images]}. For both the intermediate host and the Bare Metal server, you need to enter the username corresponding to the OS image used on them.
   - `<INTERMEDIATE_HOST_IP_ADDRESS>` — the external IP address of the intermediate host.
   - `<SERVER_INTERNAL_IP_ADDRESS>` — the internal IP address of your Bare Metal server.

   When connecting via SSH for the first time, a confirmation prompt will appear:

   ```txt
   The authenticity of host 'XXX.XXX.XXX.XXX (XXX.XXX.XXX.XXX)' can't be established.
   ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+j************
   Are you sure you want to continue connecting (yes/no)?
   ```

   Enter `yes` in the terminal and press ENTER.

{/tab}

{/tabs}

## {heading(Delete unused resources)[id=bare-metal-quick-start-clean-up]}

The created resources are billed and consume computing resources. If you no longer need them:

- {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Stop]} the intermediate host to use it later, or {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} it permanently.
- {linkto(../../../computing/bare-metal/instructions/manage-service#bare-metal-manage-service-delete)[text=Cancel]} the Bare Metal server rental.
- {linkto(../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Delete the Floating IP address]} assigned to the intermediate host. Floating IP addresses present in the project are billed even if they are not bound to any service.