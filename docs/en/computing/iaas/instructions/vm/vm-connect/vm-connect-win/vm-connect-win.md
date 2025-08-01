The recommended way to connect to a Windows VM is via the RDP (Remote Desktop Protocol).

## 1. Check ability of connecting via RDP

Make sure that the following conditions are met:

- the virtual machine is running and the OS boot process has finished;
- remote access via RDP protocol (TCP port `3389`) is allowed in the VM network settings;
- the VM has an external (“floating”) IP address available for connection.

   {note:info}

   The external IP address of the VM can be viewed in [management console](https://msk.cloud.vk.com/app/en/) VK Cloud in the section **Cloud Servers → Virtual machines**.

   {/note}

Instead of an external IP address, you can use the fully qualified domain name of the virtual machine (FQDN). Properly configured DNS records are required to connect using a fully qualified domain name.

{note:info}

VK Cloud provides [DNS servers](/en/networks/dns/publicdns) to which you can delegate your domain.

{/note}

If RDP connection to the VM is not possible or unavailable, use the [VNC console](../../vm-console#the_vnc_console).

## 2. Prepare credentials

1. [Find out](../../../../concepts/about#default_account) the name of the default OS user.
1. [Set](../../vm-manage#password) password to log in to the OS. Write down the username and password.
1. If the password has been lost, [reset](../../vm-manage#password) or [recovery](../../vm-manage#password_recovery) it.

## 3. Connect to VM

<tabs>
<tablist>
<tab>Linux</tab>
<tab>macOS</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

In Linux, use the Remmina utility to connect via RDP.

1. Download and install the Remmina client:

   ```console
   sudo apt-add-repository ppa:remmina-ppa-team/remmina-next
   sudo apt-get update
   sudo apt-get install remmina remmina-plugin-rdp libfreerdp-plugins-standard
   ```

2. Launch the Remmina client.
3. Create a new connection:

   1. In the application window, select the protocol: `RDP`.
   2. Click **New connection profile**.
   3. In the window that opens, specify the parameters:

      - **Name**: connection name (for example, VM name).
      - **Server**: the external IP address or the FQDN of the virtual machine.
      - **Username**: `<USERNAME>`.
      - **Password**: `<PASSWORD>`.

4. Click **Save and Connect** to connect to the VM. The new connection will be saved in the list.

</tabpanel>
<tabpanel>

In macOS, use the Microsoft Remote Desktop program to connect via RDP. Specify the connection parameters manually or using the RDP configuration file.

To get the RDP configuration file:

1. Go to [management console](https://msk.cloud.vk.com/app/en) VK Cloud.
2. Go to **Cloud Servers → Virtual machines**.
3. Select the VM you need and go to the **Windows** tab at the bottom of the page.
4. Click **Download RDP config**.

Connect to the VM:

1. Install and run Microsoft Remote Desktop.
2. Create a new connection.

   - Manual:

      1. In the application window, click **Add PC**.
      2. Specify the parameters of the new connection:
         - **PC name**: the external IP address or the FQDN of the virtual machine.
         - **User account**: select **Add User Account** and specify the credentials:
            - **Username**: `<USERNAME>`.
            - **Password**: `<PASSWORD>`.
      3. Click **Add** — the new connection will appear in the list.

   - Using the configuration file:

      1. In the application window, in the upper drop-down menu, select **Import from RDP file**.
      2. Select the configuration file and click **Import**.

3. Find a new connection in the list and double-click on it to connect to the VM.

</tabpanel>
<tabpanel>

To connect via RDP, specify the connection parameters manually or using the RDP configuration file.

{cut(How to get the RDP configuration file for VK Cloud VM)}

1. Go to [management console](https://msk.cloud.vk.com/app/en) VK Cloud.
2. Go to **Cloud Servers → Virtual machines**.
3. Click on the name of the VM you need to go to the VM page.
3. Go to the **General information** tab and select the **Windows** tab at the bottom of the page.
4. Click **Download RDP config**.

{/cut}

Connect to the VM:

1. Open Microsoft Remote Desktop Connection.
2. Set up the connection.

   - Manual:

      1. In the **Computer** field, enter the IP address or FQDN of the virtual machine.
      2. Click **Connect**.
      3. In the window that opens, enter the credentials:

         - **Username**: `<USERNAME>`.
         - **Password**: `<PASSWORD>`.

      4. Click **OK**.

   - Using the configuration file:

      1. Click **Show Options → General**.
      2. In the block **Connection settings** click **Open**.
      3. Select the configuration file and click **Open**.
      4. Press the button **Connect** and confirm the connection again in the window that opens.
      5. In the operating system authorization window, enter `<PASSWORD>`.

</tabpanel>
</tabs>

{note:info}

At the first connection, confirm the use of the certificate.

{/note}
