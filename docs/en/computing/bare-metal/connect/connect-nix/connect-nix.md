# {heading(Connecting to a Bare Metal server with Linux OS)[id=bare-metal-connect-nix]}

{include(/en/_includes/_translated_by_ai_en.md)}

SSH is the most common and secure way to connect to a server with a Linux OS. It supports two main authentication methods:

- By password: disabled by default in {var(cloud)} images for security reasons.
- Using an SSH key: the most secure connection method. Used by default in {var(cloud)} images.

## {heading(Preparatory steps)[id=bare-metal-connect-server-preparatory-steps]}

1. Make sure you have the private key file `*.pem`, which is downloaded when {linkto(../../../../computing/bare-metal/instructions/os-setup#bare-metal-os-setup)[text=installing the OS]} from {var(cloud)} images.
1. Make sure the Bare Metal server is running and the OS boot process has completed, for example, via the {linkto(../../../../computing/bare-metal/connect/console#bare-metal-console)[text=VNC console]}.
1. If network filtering tools are used on the server (`ufw`, `nftables`, `iptables`, etc.), add a rule to allow access via the SSH protocol (TCP port `22`).
1. Make sure the SSH service on the Bare Metal server is started and running. You can check the service status using the command:

   ```shell
   sudo service sshd status
   ```

{note:warn}

If connecting to the virtual machine via SSH is impossible or unavailable, use the {linkto(../../../../computing/bare-metal/connect/console#bare-metal-console)[text=VNC console]}.

{/note}

## {heading(Connecting to a Bare Metal server)[id=bare-metal-connect-server]}

{tabs}

{tab(Linux/macOS)}

1. Open a terminal and set the permissions for the key file:

   ```bash
   chmod 400 <KEY_FILE>
   ```

   Here `<KEY_FILE>` is the path to the `*.pem` file with the private key.

   Example for the key file `MyPrivateKey.pem` located in the `/path/to/file/` directory:

   ```bash
   chmod 400 /path/to/file/MyPrivateKey.pem
   ```

1. Connect to the server:

   {tabs}

   {tab(By external IP address)}

   If your server is configured for connection via an external IP address (for example, through an advanced router), run the command:

   ```bash
   ssh -i <KEY_FILE> \
          <USERNAME>@<SERVER_EXTERNAL_IP_ADDRESS>
   ```

   Here:

   - `<KEY_FILE>` — the path to the `*.pem` file with the private key.
   - `<USERNAME>` — the default account name, which {linkto(../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=is used in {var(cloud)} images]}.
   - `<SERVER_EXTERNAL_IP_ADDRESS>` — the IP address configured for connecting to the server from outside.

   {include(../../../../_includes/_ssh-warning.md)[tags=new-host]}

   {/tab}

   {tab(By internal IP address)}

   If your Bare Metal server does not have an external IP address, connect to it through an intermediate server:
   
   1. Set up the intermediate server if it has not been set up yet. The intermediate server can be, for example, a {linkto(../../../../computing/iaas/concepts/vm#iaas-concepts-vm)[text=virtual machine]} that:

      - is in the same network as the Bare Metal server;
      - has an external IP address.

      If you do not have a VM that meets these requirements:

      1. {linkto(../../../../computing/bare-metal/instructions/manage-server#bare-metal-server-get-info)[text=Find out]} which network your Bare Metal server is connected to and its internal IP address.
      1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create a new]} or {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net)[text=connect an existing]} VM with the following parameters:

         - **Network**: select the same network to which the Bare Metal server is connected.
         - **Assign an external IP address**: enable this option. A {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP address]} will be assigned to the VM.

      1. Make sure that the connection to the intermediate server via the external IP address works.
   
   1. Connect to the Bare Metal server.

      First, you need to connect to the intermediate server via its external IP, and then to the Bare Metal server via its internal IP. This can be done with a single command:

      ```bash
      ssh -i <KEY_FILE> \
          -J <USERNAME>@<INTERMEDIATE_SERVER_IP_ADDRESS> \
             <USERNAME>@<SERVER_INTERNAL_IP_ADDRESS>
      ```

      Here:

      - `<KEY_FILE>` — the path to the `*.pem` file with the private key.
      - `<USERNAME>` — the default account name, which {linkto(../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=is used in {var(cloud)} images]}. For both the intermediate server and the Bare Metal server, you need to enter the user name corresponding to the OS image used on each of them.
      - `<INTERMEDIATE_SERVER_IP_ADDRESS>` — the external IP address of the intermediate server.
      - `<SERVER_INTERNAL_IP_ADDRESS>` — the internal IP address of your Bare Metal server.

      {include(../../../../_includes/_ssh-warning.md)[tags=new-host]}

   {/tab}

   {/tabs}

{/tab}

{tab(Windows 10/11)}

1. Set the permissions for the private key file:

   1. Open the properties of the `.pem` private key file.
   1. Go to the **Security** tab and click the **Advanced** button. The **Advanced Security Settings** window will open.
   1. Click the **Disable inheritance** button and in the window that opens select **Remove all inherited permissions from this object**.
   1. In the **Advanced Security Settings** window, click the **Add** button.
   1. In the window that opens, click **Select a principal** and specify the Windows OS user under which the command prompt for connecting to the VM will be run.
   1. Confirm the changes by clicking **OK** in the open settings windows one by one.

1. Connect to the server:

   {tabs}

   {tab(By external IP address)}

   If your server is configured for connection via an external IP address (for example, through an advanced router), run the command:

   ```ps
   ssh -i <KEY_FILE> `
          <USERNAME>@<SERVER_EXTERNAL_IP_ADDRESS>
   ```

   Here:

   - `<KEY_FILE>` — the path to the `*.pem` file with the private key.
   - `<USERNAME>` — the default account name, which {linkto(../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=is used in {var(cloud)} images]}.
   - `<SERVER_EXTERNAL_IP_ADDRESS>` — the IP address configured for connecting to the server from outside.

   {include(../../../../_includes/_ssh-warning.md)[tags=new-host]}

   {/tab}

   {tab(By internal IP address)}

   If your Bare Metal server does not have an external IP address, connect to it through an intermediate server:
   
   1. Set up the intermediate server if it has not been set up yet. The intermediate server can be, for example, a {linkto(../../../../computing/iaas/concepts/vm#iaas-concepts-vm)[text=virtual machine]} that:
      
      - is in the same network as the Bare Metal server;
      - has an external IP address.

      If you do not have a VM that meets these requirements:

      1. {linkto(../../../../computing/bare-metal/instructions/manage-server#bare-metal-server-get-info)[text=Find out]} which network your Bare Metal server is connected to and its internal IP address.
      1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create a new]} or {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net)[text=connect an existing]} VM with the following parameters:

         - **Network**: select the same network to which the Bare Metal server is connected.
         - **Assign an external IP address**: enable this option. A {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP address]} will be assigned to the VM.

      1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix-os)[text=Make sure]} that the connection to the intermediate server via the external IP works.
   
   1. Connect to the Bare Metal server.

      First, you need to connect to the intermediate server via its external IP, and then to the Bare Metal server via its internal IP. This can be done with a single command:

      ```ps
      ssh -i <KEY_FILE> `
          -J <USERNAME>@<INTERMEDIATE_SERVER_IP_ADDRESS> `
             <USERNAME>@<SERVER_INTERNAL_IP_ADDRESS>
      ```

      Here:

      - `<KEY_FILE>` — the path to the `*.pem` file with the private key.
      - `<USERNAME>` — the default account name, which {linkto(../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=is used in {var(cloud)} images]}. For both the intermediate server and the Bare Metal server, you need to enter the user name corresponding to the OS image used on each of them.
      - `<INTERMEDIATE_SERVER_IP_ADDRESS>` — the external IP address of the intermediate server.
      - `<SERVER_INTERNAL_IP_ADDRESS>` — the internal IP address of your Bare Metal server.

      {include(../../../../_includes/_ssh-warning.md)[tags=new-host]}

   {/tab}

   {/tabs}

{/tab}

{/tabs}