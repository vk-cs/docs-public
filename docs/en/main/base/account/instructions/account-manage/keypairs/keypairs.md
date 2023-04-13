## Creating a key pair

To connect to a virtual machine via SSH, you must use a key pair: the public key is hosted on the virtual machine, while the private key is stored by the user.

You can create a new key pair during the instance creation step or in the Key Pairs section.

To create a new key pair:

<tabs>
<tablist>
<tab>On the VK Cloud platform</tab>
<tab>Linux/Mac</tab>
<tab>Windows 10</tab>
</tablist>
<tabpanel>

1. Go to Account Settings → Key Pairs.
2. Click "+ Generate Key".
3. Enter a name for the key.
4. Confirm creation.

The key will automatically be saved to our computer.

</tabpanel>
<tabpanel>

1. Open a terminal.
2. Run the `ssh-keygen` command to generate a new key:

```bash
ssh-keygen -t rsa -b 2048 -m pem -f "path to file"
```

3. Specify the name of the file where the keys will be saved and enter the password.

The public part of the key will be saved in the `<key_name>.pub` file. Paste this part of the key into the SSH key field when creating a new virtual machine.

</tabpanel>
<tabpanel>

1. Open a terminal.
2. Create a new key by running the command:

```bash
ssh-keygen -t rsa -b 2048 -m pem -f "path to file"
```

3. When you are prompted to select a file to save the key, press Enter. Or specify the required file.
4. Enter a password.

</tabpanel>
</tabs>

## Import and export key

### Import key

You can import SSH keys from your computer. To do this, in your personal account VK Cloud:

1. Go to Project Settings → Key Pairs.
2. Click Import Key.
3. Enter a name for the key.
4. Attach the public key file.
5. Enter the name of the public key. The key must be in the "ssh-rsa" format.
6. Click Import Key.

### Export key

During the creation of the key pair, the key is automatically exported to our computer.

## Key pair recovery

If the key pair has been lost, then with a password, access to the instance can be restored.

The private key cannot be recovered. You need to recreate the key pair and upload the public key to the instance.

To restore access, you will need to add a new key pair using the CLI and VNC console:

1. Create a new key pair in the project using the Openstack CLI and store it locally: `openstack keypair create --private-key <filename_and_location> <keyname>`
2. Copy the contents of the public key to a local file: `openstack keypair show --public-key >> <path_to_file>`
3. Upload the created file to any external resource or cloud.
4. Save the file to the virtual machine with the command: `wget <your_file>`
5. Copy the contents of the new key to the authorized_keys file: `cat <your_file> >> ~/.ssh/authorized_keys`
6. Check access to the instance with a new key pair: `ssh -i <path_to_key> login@IP_address`

## Delete key pair

To delete a key pair, go to Project Settings → Key Pairs. In the key pair row, click "Delete". Or select the necessary key pairs with checkboxes and click "Delete" at the top of the panel. Confirm deletion.
