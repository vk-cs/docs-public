Key pairs are used to [connect to a VM via SSH](/en/base/iaas/instructions/vm/vm-connect/vm-connect-nix). The key pair consists of public and private keys: the public key is placed on the VM, the private key is stored by the user.

## Viewing information about a key pair

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. Select **Key pairs** from the drop-down list.
1. Click on the name of the desired key pair. Information about it will be displayed.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```bash
   openstack keypair show <key pair name>
   ```

<info>

To display data only about the public key, add the `--public-key` option to the command.

</info>

</tabpanel>
</tabs>

## Creating a key pair

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. Select **Key pairs** from the drop-down list.
1. Click the **Create key** button.
1. Enter the name of the key and click **Create key**.

   The private key will be downloaded to the local device.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```bash
   openstack keypair create 
   ```

1. Save the private key that appears on the screen to a file with the extension `.pem`.

</tabpanel>
</tabs>

## Importing an existing key

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. Select **Key pairs** from the drop-down list.
1. Click the **Import key** button.
1. In the window that opens, fill in the fields:

   - **Name of key**: specify the name of the created key pair.
   - **Public key**: insert the contents of the `ssh-rsa` public key.

1. Click the **Import key** button.

</tabpanel>
<tabpanel>

1. Use the Gitlab [official documentation](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) for local generation of a key pair.
1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```bash
   openstack keypair create --public-key <path to the public key file> <key pair name>
   ```

</tabpanel>
</tabs>

## Recovery of the key pair

<err>

The private key cannot be restored! Create a new key pair and upload the public key to the VM.

</err>

To restore access to a Linux virtual machine via SSH using a key pair, use the instructions from the article [VM management](/en/base/iaas/instructions/vm/vm-manage#restoring_vm_access_by_key).

## Deleting a key pair

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several key pairs at once by selecting them using the checkboxes.

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. Select **Key pairs** from the drop-down list.
1. Click on the icon ![Trash](./assets/trash-icon.svg "inline") in the line with the object being deleted.
1. Confirm the deletion.

</tabpanel>
<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

   ```bash
   openstack keypair delete <key pair name>
   ```

</tabpanel>
</tabs>
