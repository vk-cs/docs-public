After creating a virtual machine based on Microsoft Windows OS, you can remotely connect to an instance using RDP (Remote Desktop Protocol).

To do this, the following conditions must be met:

- 15 minutes have passed since the creation and all scripts have completed their work
- The virtual machine is enabled
- A security group has been assigned to the virtual machine with a rule that allows remote access via TCP port 3389
- The instance must have an external IP address available for connection

The method of connecting to the VM depends on the local operating system used.

<warn>

The first time you connect to an instance created on the ext-net network, you will need to change the password by entering the original and confirming the new password.

</warn>

## Getting a password

Before connecting to an instance, you need to get the password of the virtual machine user.

Depending on the network that was specified when creating the server, the methods vary:

### For VMs on the ext-net network

You can get the password for the local user account at the final step of creating a virtual machine.

If the password was not saved at the final stage of VM creation, then it should be reset.

If the ext-net network was connected to the instance when creating the virtual machine, then in this case it is enough to go to the information about the virtual machine in the list of instances of the Cloud Computing service.

On the "Console" tab, click on the "Set password" button.

<warn>

The password must contain uppercase and lowercase letters of the Latin alphabet, numbers, symbols !"#$%&()\*+,-.:;<=>?@[]^\_\`{}~

</warn>

The password must contain at least one letter or number, in addition to special characters.

### For VMs on a private network

To get the VM password, you should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" service.
2. Open the context menu of the instance and click on the "Get password" button.
3. In the password receipt window, attach the key file selected when creating the instance and click on the "Decrypt password" button. As a result, the password of the ADMIN user will be received.
4. You can copy the received password and close the window.

## Windows

To connect via RDP, you can use manual configuration or a configuration file.

Manual connection consists of several steps:

1. Click the "Start" button.
2. Find and open "Remote Desktop Connection".
3. Enter the IP address of the virtual machine in the "Computer" field.
4. When connecting, specify the login and password of the account.

### Connecting using the RDP configuration file

You can download the RDP config file on the instance information page on the "Windows" tab.

You can connect to a virtual machine using the downloaded file.

## Linux

You can connect to an instance with Windows OS via RDP from Linux OS.

To do this, you can use the Remmina utility:

1. Download and install the Remmina client to connect via the RDP protocol:

```bash
sudo apt-add-repository ppa:remmina-ppa-team/remmina-next
sudo apt-get update
sudo apt-get install remmina remmina-plugin-rdp libfreerdp-plugins-standard
```

2. Launch the Remmina client.
3. To create a new connection, use the menu item "Connection" → "Create" → "CTRL+N" or the Remmina toolbar button.
4. Enter the connection name, the group (if desired), select the protocol "RDP".
5. Enter the IP address of the virtual machine in the "Server" field.
6. Enter user data:

- User Name: ADMIN;
- Password: Your password.

7. Click the "Save" button.
8. Connect to the remote machine in the connection list.

## MacOS X

It is possible to connect to the instance from the operating system of the Apple Mac OS X family.

To make the connection, you should:

1. Download and install Microsoft Remote Desktop to connect via the RDP protocol.
2. Add a new connection via the "+" function.
3. Enter the IP address of the virtual machine in the name field.
4. Add a new user by selecting "Add User Account" in the "User Account" field.
5. Enter user data:

- User Name: Admin;
- Password: Your password.

6. Double-click the "Add" button.
7. Connect to the virtual machine by double-clicking in the RDP client interface.
