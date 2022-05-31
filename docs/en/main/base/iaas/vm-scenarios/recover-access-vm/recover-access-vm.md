The credentials for connecting and managing the virtual machine must be stored in a safe place to avoid the risk of losing access and information on the virtual machine.

However, if the credentials have been lost, there are several ways to restore access to the server.

## Password Recovery

Recovery of the password of the primary user in the running virtual machine is performed regardless of the family of the installed operating system of the instance.

To reset the password, go to the information about the virtual machine in the list of instances of the Cloud Computing service. On the Console tab, click Set Password.

<warn>

The password must contain at least one uppercase or lowercase letter of the Latin alphabet, a number, as well as symbols!"#$%&()\*+,-.:;<=>?@[]^_\`{}~

</warn>

<info>

Password reset may not work if `qemu-guest-agent` is not installed in the VM system deployed from a custom image.

</info>

## Recovery of the key pair

If the key pair was lost, then if you have a password, access to the instance can be restored.

<warn>

The private key cannot be restored. It is necessary to create the key pair again and upload the public key to the instance.

</warn>

To restore access, you will need to add a new key pair using the CLI and VNC console:

1. Create a new key pair in the project using the Openstack CLI and save it locally:

``bash
openstack keypair create --private-key <filename_and_location> <keyname>
```

2. Copy the contents of the public key to a local file:

```bash
openstack keypad show --public-key >> <path to file>
```

3. Upload the created file to any external resource or cloud.

4. Save the file to the virtual machine with the command:

```bash
wget <your_file>
```

5. Copy the contents of the new key to the authorized_keys file:

```bash
cat <your_file> >> ~/.ssh/authorized_keys
```

6. Check access to the instance with the new key pair:

```bash
ssh -i <path_key> login@ip_address
```
