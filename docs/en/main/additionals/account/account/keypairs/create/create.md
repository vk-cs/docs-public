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
