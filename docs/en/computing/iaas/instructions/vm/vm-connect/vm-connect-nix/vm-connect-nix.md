The recommended way to connect to a Linux VM is via SSH using a key pair.

## 1. Check ability to connect via SSH

To connect via SSH, an SSH server must be running on the virtual machine. On Linux virtual machines created in VK Cloud, the OpenSSH server is installed and started by default.

Before connecting, make sure that the following conditions are met:

- the virtual machine is running and the OS boot process has finished;
- remote access via SSH protocol (TCP port `22`) is allowed in the VM network settings — [add](/en/networks/vnet/instructions/secgroups#assign-rule) `ssh` security group;
- the VM has an external (“floating”) IP address available for connection.

   {note:info}

   The external IP address of the VM can be viewed in [management console](https://msk.cloud.vk.com/app/en/) VK Cloud in the section **Cloud Servers → Virtual machines**.

   {/note}

Instead of an external IP address, you can use the fully qualified domain name of the virtual machine (FQDN). Properly configured DNS records are required to connect using a fully qualified domain name.

{note:info}

VK Cloud provides [DNS servers](/en/networks/dns/publicdns) to which you can delegate your domain.

{/note}

The virtual machines that were created from the FreeBSD and Bitrix images offered by the VK Cloud platform do not support working with an external `ext-net` network. To connect via SSH to such a VM, it is necessary that it is on a private network with DHCP enabled.

If SSH connection to the VM is not possible or unavailable, use the [VNC console](../../vm-console#the_vnc_console).

## 2. Prepare credentials

To connect to the VM via SSH, [find out](../../../../concepts/about#default_account) the name of the default OS user. Write it down.

## 3. Check for key pair

To connect to a VM over SSH using a key pair, it is necessary that the public key is stored on the virtual machine in the file `~/.ssh/authorized_keys`, and the file with the private key is located on the computer from which the connection is being made.

If the VM was created on the VK Cloud platform:

- the public key was saved on the VM automatically;
- when selecting the option **Create a new key**, the private key in the file with the extension `.pem` was downloaded to the computer from which the VM was created.

If one or both of the keys from the pair are lost, follow the [recovery instructions](../../vm-manage#restoring_vm_access_by_key).

## 4. Connect to VM

<tabs>
<tablist>
<tab>Linux/macOS</tab>
<tab>Windows 10/11</tab>
<tab>Windows 7/8</tab>
</tablist>
<tabpanel>

1. (Optional) Configure access rights to the key file:

   ```console
   chmod 400 <KEY_PATH>
   ```

2. Run the command in the terminal.

   - To connect by IP address:

      ```console
      ssh -i <KEY_PATH> <USERNAME>@<EXTERNAL_IP_ADDRESS_OF_VM>
      ```

   - To connect by a fully qualified domain name:

     ```console
      ssh -i <KEY_PATH> <USERNAME>@<FQDN_OF_VM>
      ```

3. If this is the first connection to the VM, a confirmation request will appear:

      ```console
      The authenticity of host '213.219.212.130 (213.219.212.130)' can't be established.
      ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+jha/DSBgd9McI.
      Are you sure you want to continue connecting (yes/no)?
      ```

      Type `yes` in the terminal and press _Enter_.

      {note:info}

      The first time you connect to a VM created from a Bitrix VK Cloud image, a request to change the password for the `root` user will appear in the console. Enter the current `bitrix` password and enter the new password twice.

      {/note}

</tabpanel>
<tabpanel>

1. (Optional) Configure access rights to the private key file:

   1. Open the properties of the private key file `.pem`.
   2. Go to the **Security** tab and click **Advanced**. The **Advanced Security Settings** window opens.
   3. Click the button **Disable inheritance** and in the window that opens, select **Remove all inherited permissions from this object**.
   4. In the **Advanced Security Settings** window, click **Add**.
   5. In the window that opens, click **Select the subject** and specify the Windows OS user on whose behalf the command prompt for connecting to the VM will be launched.
   6. Confirm the changes by sequentially clicking **OK** in the open settings windows.

2. Run the command in the command prompt.

   - To connect by IP address:

      ```console
      ssh -i <KEY_PATH> <USERNAME>@<EXTERNAL_IP_ADDRESS_OF_VM>
      ```

   - To connect by a fully qualified domain name:

     ```console
      ssh -i <KEY_PATH> <USERNAME>@<FQDN_OF_VM>
      ```

3. If this is the first connection to the VM, a confirmation request will appear:

      ```shell
      The authenticity of host '213.219.212.130 (213.219.212.130)' can't be established.
      ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+jha/DSBgd9McI.
      Are you sure you want to continue connecting (yes/no)?
      ```

     Type `yes` in the command prompt and press ENTER.

      {note:info}

      The first time you connect to a VM created from a Bitrix VK Cloud image, a request to change the password for the `root` user will appear in the console. Enter the current `bitrix` password and enter the new password twice.

      {/note}

</tabpanel>
<tabpanel>

In Windows 7/8, use the PuTTY application to connect via SSH.

1. [Install](https://www.putty.org/) PuTTY.
2. Create a private key file in PuTTY Private Key Files format:

   1. Launch the PuTTYgen application that comes with PuTTY.
   2. In the **Conversions** menu, click **Import Key** and in the window that opens, select the private key file `.pem`.
   3. Click **Save private key**.
   4. In the window that opens, select a directory, enter a file name, check that the `.ppk` extension is specified in the **File type** field, and click **Save**.

3. Add the private key file `.ppk` to Pageant:

   1. Launch the Pageant application that comes with PuTTY.
   2. Right-click on the Pageant icon on the taskbar.
   3. In the context menu, select **Add key**.
   4. Select the private key file `.ppk` created in the previous step.

4. Run PuTTY:

   1. In the **Host Name (or IP address) field** enter the external IP address of the virtual machine or its full domain name. Specify the port `22` and the connection type `SSH`.
   2. Open the item in the tree on the left **Connection → SSH → Auth**.
   3. Set the checkbox **Allow agent forwarding**.
   4. In the **Private key file for authentication** field, select the private key file `.ppk`.
   5. Click **Open**.
   6. If this is the first connection to the VM, confirm it in the window that appears.
   7. In the terminal window that opens, you will be prompted to enter the OS user name.
   8. Enter the VM operating system user name. As a result, a connection to the server should be established.

      {note:info}

      The first time you connect to a VM created from a Bitrix VK Cloud image, a request to change the password for the `root` user will appear in the console. Enter the current `bitrix` password and enter the new password twice.

      {/note}

</tabpanel>
</tabs>

{note:warn}

If you could not connect to the VM via SSH, use the instructions from the article [Network in a Linux VM](../../../../troubleshooting/linux-vm-network).

{/note}
