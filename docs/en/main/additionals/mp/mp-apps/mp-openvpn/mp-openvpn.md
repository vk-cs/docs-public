OpenVPN is a system that allows you to create encrypted tunnels between computers using VPN technology.

## Install OpenVPN

1. Go to App Store → Networks.
2. Click Install.
3. Specify the required virtual machine settings - application name, virtual machine type, disk type and size, availability zone.
4. Select a key for SSH access.

<warn>
Make sure you have the SSH key you created and saved on your computer earlier. If not, then select "Create a new key". A file with the *.pem extension will be downloaded to your computer.
</warn>

5. Click Next Step.
6. Specify additional OpenVPN server configuration parameters:

- Client login;
- Routed subnet;
- OpenVPN subnet.

7. Click Install.

## Setting up OpenVPN

After installation, an application card with connection parameters will open:

- URL to access the OpenVPN server via SSH;
- Client's password;
- Client configuration file.

<info>

For security, we recommend that you change your password immediately.

</info>

### Connecting to an instance

First you need to connect to the instance with the OpenVPN server via SSH. "SSH access to Openvpn" is specified in the application options, copy it and run the command:

```
ssh -i /path/to/key ubuntu@addressofserver
```

### A change of the pin code

To change the password of an existing user, use the command:

```
sudo passwd client_name
```

Next, enter the new password twice.

### Adding a user

To add a new user, use the command:

```
sudo useradd newuser -p password
```

Be sure to add the new user to the openvpn group by running the command:

```
sudo usermod -a -G openvpn newuser
```

### Deleting a user

To delete a user, use the command:

```
sudo userdel usertodelete
```

More information on changing the OpenVPN server configuration [here](https://openvpn.net/community-resources/expanding-the-scope-of-the-vpn-to-include-additional-machines-on-either-the-client-or-server-subnet/).

## Using OpenVPN

Install an OpenVPN client application such as [OpenVPN Connect](https://openvpn.net/vpn-client/).
Installation instructions:

- [Windows](https://openvpn.net/client-connect-vpn-for-windows/)
- [MacOS](https://openvpn.net/client-connect-vpn-for-mac-os/)
- [Linux](https://openvpn.net/openvpn-client-for-linux/)

If you are using MacOS or Linux, copy the value of the "Client Configuration File" parameter and save it in the /etc/openvpn/ directory. If you are using Windows OS, then save it in the \Program Files\OpenVPN\config\/ directory.

The file name can be anything, but it must have the .ovpn postfix, for example, mcs_openvpn_client.ovpn.

This file stores the OpenVPN client configuration and also contains:

- certificate of the certification center;
- client certificate;
- client key;
- session start encryption key.

To connect to the OpenVPN server with this configuration file, you will need to enter a username and password.
