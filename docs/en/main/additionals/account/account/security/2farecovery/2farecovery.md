If the key pair has been lost, then with a password, access to the instance can be restored.

The private key cannot be recovered. You need to recreate the key pair and upload the public key to the instance.

To restore access, you will need to add a new key pair using the CLI and VNC console:

1. Create a new key pair in the project using the Openstack CLI and store it locally: `openstack keypair create --private-key <filename_and_location> <keyname>`
2. Copy the contents of the public key to a local file: `openstack keypair show --public-key >> <path_to_file>`
3. Upload the created file to any external resource or cloud.
4. Save the file to the virtual machine with the command: `wget <your_file>`
5. Copy the contents of the new key to the authorized_keys file: `cat <your_file> >> ~/.ssh/authorized_keys`
6. Check access to the instance with a new key pair: `ssh -i <path_to_key> login@IP_address`
