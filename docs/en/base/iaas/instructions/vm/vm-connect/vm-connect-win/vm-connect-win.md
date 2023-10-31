The recommended way to connect to a Windows VM is via the RDP (Remote Desktop Protocol).

## 1. Check the possibility of connecting via RDP

Make sure that the following conditions are met:

- the virtual machine is running and the OS boot process has finished;
- remote access via RDP protocol (TCP port `3389`) is allowed in the VM network settings;
- the VM has an external (“floating”) IP address available for connection.

   <info>

   The external IP address of the VM can be viewed in [personal account](https://mcs.mail.ru/app/en/) VK Cloud in the section **Cloud computing → Virtual machines**.

   </info>

Instead of an external IP address, you can use the fully qualified domain name of the virtual machine (FQDN). Properly configured DNS records are required to connect using a fully qualified domain name.

<info>

VK Cloud provides [DNS servers](/en/networks/dns/publicdns) to which you can delegate your domain.

</info>

If RDP connection to the VM is not possible or unavailable, use the [VNC console](../../vm-console#the_vnc_console).

## 2. Prepare the credentials

To connect to a VM via RDP, you need to know the operating system user name and password.

On the VK Cloud platform, when creating a Windows virtual machine in the operating system, a user is created with the name `Admin` and a generated password. Use this username and password if the VM was created on a private network. If the VM was created on the `ext-net` network, before the first connection [set a new password](../../vm-manage#setting_and_changing_a_password).

If the password has been lost, [reset](../../vm-manage#setting_and_changing_a_password) or [recovery](../../vm-manage#password_recovery) it.

## 3. Connect to the VM

<tabs>
<tablist>
<tab>Linux</tab>
<tab>macOS</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

In Linux, use the Remmina utility to connect via RDP.

1. Download and install the Remmina client:

   ```bash
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
      - **Username**.
      - **Password**.

4. Click **Save and Connect** to connect to the VM. The new connection will be saved in the list.

</tabpanel>
<tabpanel>

In macOS, use the Microsoft Remote Desktop program to connect via RDP. Specify the connection parameters manually or using the RDP configuration file.

To get the RDP configuration file:

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Virtual machines**.
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
            - **Username**.
            - **Password**.
      3. Click **Add** — the new connection will appear in the list.

   - Using the configuration file:

      1. In the application window, in the upper drop-down menu, select **Import from RDP file**.
      2. Select the configuration file and click **Import**.

3. Find a new connection in the list and double-click on it to connect to the VM.

</tabpanel>
<tabpanel>

To connect via RDP, specify the connection parameters manually or using the RDP configuration file.

<details>
<summary>How to get the RDP configuration file for VK Cloud VM</summary>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Virtual machines**.
3. Click on the name of the VM you need to go to the VM page.
3. Go to the **General information** tab and select the **Windows** tab at the bottom of the page.
4. Click **Download RDP config**.

</details>

Connect to the VM:

1. Open Microsoft Remote Desktop Connection.
2. Set up the connection.

   - Manual:

      1. In the **Computer** field, enter the IP address or FQDN of the virtual machine.
      2. Click **Connect**.
      3. In the window that opens, enter the credentials:

         - **Username**.
         - **Password**.

      4. Click **OK**.

   - Using the configuration file:

      1. Click **Show Options → General**.
      2. In the block **Connection settings** click **Open**.
      3. Select the configuration file and click **Open**.
      4. Press the button **Connect** and confirm the connection again in the window that opens.
      5. In the operating system login window, enter `<Password>`.

</tabpanel>
</tabs>

<info>

At the first connection, confirm the use of the certificate.

</info>
