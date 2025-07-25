Key pairs are used to [connect to a VM via SSH](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix). The key pair consists of public and private keys: the public key is placed on the VM, the private key is stored by the user.

## Viewing information about key pair

<tabs>
<tablist>
<tab>VK Cloud Account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://cloud.vk.com/account) VK Cloud Account.
1. Go to **SSH key pairs**.
1. Click on the name of the required key pair. Information about it will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```console
   openstack keypair show <KEY PAIR NAME>
   ```

{note:info}

To display data only about the public key, add the `--public-key` option to the command.

{/note}

</tabpanel>
</tabs>

## Creating key pair

<tabs>
<tablist>
<tab>VK Cloud Account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://cloud.vk.com/account) VK Cloud Account.
1. Go to **SSH key pairs**.
1. Click **Add SSH key**.
1. Enter the name of the key and click **Create key**.

   The private key will be downloaded to the local device.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```console
   openstack keypair create
   ```

1. Save the private key that appears on the screen to a file with the extension `.pem`.

</tabpanel>
</tabs>

## Importing existing key

<tabs>
<tablist>
<tab>VK Cloud Account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://cloud.vk.com/account) VK Cloud Account.
1. Go to **SSH key pairs**.
1. Click **Add SSH key**.
1. Click **Import**.
1. In the window that opens, fill in the fields:

   - **Name of key**: specify the name of the created key pair.
   - **Public key**: insert the contents of the `ssh-rsa` public key.

1. Click **Create**.

</tabpanel>
<tabpanel>

1. Use the GitLab [official documentation](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) for local generation of a key pair.
1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```console
   openstack keypair create --public-key <path to the public key file> <key pair name>
   ```

</tabpanel>
</tabs>

## Key pair recovery

{note:err}

The private key cannot be restored. Create a new key pair and upload the public key to the VM.

{/note}

To restore access to a Linux virtual machine via SSH using a key pair, use the instructions from the article [VM management](/en/computing/iaas/instructions/vm/vm-manage#restoring_vm_access_by_key).

## Deleting key pair

<tabs>
<tablist>
<tab>VK Cloud Account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several key pairs at once by selecting them using the checkboxes.

1. [Go to](https://cloud.vk.com/account) VK Cloud Account.
1. Go to **SSH key pairs**.
1. Click the ![Trash can](assets/trash-icon.svg "inline") icon in the line with the object to delete.
1. Confirm the deletion.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```console
   openstack keypair delete <KEY PAIR NAME>
   ```

</tabpanel>
</tabs>
