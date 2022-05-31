Linux-based virtual machines are created with the openssh client enabled, which allows remote access to the instance via SSH protocol.

The recommended way to connect to a virtual machine via SSH is to use a key pair: the public key is located on the virtual machine, while the private key is stored by the user.

To connect, the following conditions must be met:

- 15 minutes have passed since the VM was created and all scripts have completed their work.
- The virtual machine is enabled.
- A security group has been assigned to the virtual machine with a rule that allows remote access via SSH and TCP port 22.
- The instance must have an external IP address available for connection.

<warn>

Linux-based virtual machines created from images of FreeBSD, Bitrix or others that have additional software products or are focused on their use are not configured to work with the ext-net network.

In this case, a remote connection using SSH will not be possible.

Remote access for such instances is possible when it is created in a private network with the DHCP option enabled, as well as an assigned Floating IP address.

</warn>

## Getting a login

There is a login account for each operating system. A standard account is not used for security purposes, but it can always be activated and a password can also be assigned. However, it is not recommended to use built-in accounts to avoid the possibility of unauthorized access by third parties to the instance.

| Operating system | Login |
| --- | --- |
| Bitrix* | root* |
| CentOS | centos |
| Debian | debian |
| Fedora | fedora |
| FreeBSD | freebsd |
| Ubuntu | ubuntu |

\*Bitrix: Immediately after logging in, the system will ask you to set a new password. To do this, the system will request the current password (bitrix) and twice request a new password for the root user.

The Bitrix-CentOS\* image does not currently support Ext-Net.

## Getting the key

At the instance creation stage, a key was selected or a new key pair was created. When creating a new key, it was downloaded to the local computer. You will need this key to connect, regardless of the local operating system you are using.

The connection to the instance is configured depending on the local operating system used.

## Change the rights to the key .PEM in Windows

Means of changing the rights to the key .pem in windows:

1. Open the properties of the key.pem file.
2. "Security" → "Advanced" → "Disable inheritance".
3. Then "Add" → select the subject → in the input field, write the user name on this PC, on behalf of which the console (powershell) opens.
4. Click "OK" everywhere.

## Windows

### Windows 10

The Windows 10 operating system already has an ssh client installed by default.

It is enough to execute the command:

```bash
ssh -i <key path> login@ip_address
```

Where:

- Key path — the full path to the key file previously created or uploaded when creating the instance.
- Login — login of the instance's operating system.
- IP address — the external IP address of the virtual machine, which can be seen in the instance information on the "Virtual Machines" tab of the Cloud Computing service.

If the command is successful, you can see a confirmation request to connect to a previously unknown host.:

```bash
The authenticity of host '213.219.212.130 (213.219.212.130)' can't be established.
ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+jha/DSBgd9McI.
Are you sure you want to continue connecting (yes/no)?
```

After entering "yes" and confirming the input, the connection will be made.

### Windows 7/8

The optimal way to connect to the Linux OS is to use the [PuTTY application](https://www.putty.org/).

Before connecting, it is necessary to convert the existing or received key to the \*.ppk format for use in PuTTY.

To do this, you need:

1. Find and open PuTTYgen installed with the PuTTY app.
2. In the "Conversions" menu, select "Import Key" and point to the existing key file \*.pem.
3. Click on the "Save private key" button, select the directory and specify the desired file name.

Next, you need to import the key into the Pageant application, also installed with PuTTY:

1. Find and launch Pageant.
2. Open the running Pageant program in the system tray near the clock by double-clicking.
3. Click "Add Key" and select the previously saved \*.ppk key.
4. The window with the key can be closed with the "Close" button.
5. The application must be running and can be in a minimized state (in the tray).

Now you can proceed to the connection to the instance itself.

To connect, you need:

1. Launch the PuTTY app.
2. Enter the IP address of the instance in the Host Name field.
3. Make sure that port 22 is specified for this connection.
4. Click "Open".

If this is the first connection to the instance, then you need to confirm the connection in the window that appears.

If everything is configured correctly, a window will appear inviting you to enter your login.

You must enter a login, after which you will be logged in using the key previously imported into Pageant.

<info>

The login depends on the operating system image and can be found in the general information about the instance.

</info>

## Linux / MacOS X

Before connecting to an instance, you must grant access to a previously saved or created key:

```bash
chmod 400 <key path>
```

Connecting to an instance is done using the command:

```bash
ssh -i <key path> login@ip_address
```

If the command is successful, you can see a confirmation request to connect to a previously unknown host.:

```bash
The authenticity of host '213.219.212.130 (213.219.212.130)' can't be established.
ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+jha/DSBgd9McI.
Are you sure you want to continue connecting (yes/no)?
```

After entering "yes" and confirming the input, the connection will be made.

<warn>

After creating a virtual machine running Linux, we recommend setting a separate password for the superuser (root):

1. Connect to the instance.
2. Enter the command:

```bash
sudo passwd root
```

3. Enter a new password and confirm it again

To get root user rights, run the command:

```bash
sudo bash
```

</warn>
