{includetag(keypairs)}
Key pairs are used {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=to connect to a virtual machine via SSH]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}to connect to a virtual machine{/ifdef}. A key pair consists of a public and a private key: the public key is placed on the VM, the private key is stored by the user.

## {heading(Viewing key pair information)[id=vk-cloud-account-manage-keypairs-view]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Account)}

1. [Go to](https://cloud.vk.com/account) your {var(cloud)} account.
1. Go to the **SSH key pairs** section.
1. Click the name of the required key pair. Its information will be displayed.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Management console)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
1. Use one of the following ways to view the key pairs.

   - Via the menu item in the page header:

     1. Click the username in the page header and select **Key pairs**.
     1. Click the name of the required key pair. Its information will be displayed.

   - On the account information page:

     1. Click the username in the page header and select **Account settings**.
     1. Go to the **Key pairs** tab.
     1. Click the name of the required key pair. Its information will be displayed.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Run the command:

   ```console
   openstack keypair show <KEY_PAIR_NAME>
   ```

{note:info}
To display information about the public key only, add the `--public-key` option to the command.
{/note}

{/tab}

{/tabs}

## {heading(Creating a key pair)[id=vk-cloud-account-manage-keypairs-create]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Account)}

1. [Go to](https://cloud.vk.com/account) your {var(cloud)} account.
1. Go to the **SSH key pairs** section.
1. Click the **Add SSH key** button.
1. Enter the key name and click the **Create key** button.

   The private key will be downloaded to the local device.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Management console)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
1. Click the username in the page header and select **Key pairs**.
1. Click the **Create key** button.
1. Enter the key name and click the **Create key** button.

   A private key file with a `.pem` extension will be downloaded to your computer; you will need it to create and connect to a VM.

{note:err}
If the private key is lost, it cannot be restored. Create a new key pair and import the public key to the VM.
{/note}

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Run the command:

   ```console
   openstack keypair create
   ```

1. Save the private key that appears on the screen to a file with a `.pem` extension.

{/tab}

{/tabs}

## {heading(Importing an existing key)[id=vk-cloud-account-manage-keypairs-import]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Account)}

1. [Go to](https://cloud.vk.com/account) your {var(cloud)} account.
1. Go to the **SSH key pairs** section.
1. Click the **Add SSH key** button.
1. Click the **Import key** button.
1. In the window that opens, fill in the fields:

   - **Key name**: specify the name of the key pair being created.
   - **Public key**: paste the contents of the `ssh-rsa` public key.

1. Click the **Import key** button.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Management console)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
1. Click the username in the page header and select **Key pairs**.
1. Click the **Import key** button.
1. Fill in the **Key name** field.
1. Add the public key in one of the following ways:

   - Click **Public key file** and select it on your device.
   - In the **Public key** field, paste the contents of the `ssh-rsa` public key from the clipboard.

1. Click the **Import key** button.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Use the GitLab [official documentation](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) to generate a key pair locally.
1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Run the command:

   ```console
   openstack keypair create --public-key <PATH_TO_PUBLIC_KEY_FILE> <KEY_PAIR_NAME>
   ```

{/tab}

{/tabs}

{ifdef(public)}
## {heading(Restoring a key pair)[id=vk-cloud-account-manage-keypairs-restore]}

{note:err}
The private key cannot be restored! Create a new key pair and upload the public key to the VM.
{/note}

To restore SSH access to a Linux virtual machine using a key pair, follow the instructions in the {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-recovery-access-key)[text=Managing VMs]} article.
{/ifdef}

## {heading(Deleting a key pair)[id=vk-cloud-account-manage-keypairs-delete]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Account)}

This is a batch operation: if needed, you can delete several key pairs at once by selecting them with the checkboxes.

1. [Go to](https://cloud.vk.com/account) your {var(cloud)} account.
1. Go to the **SSH key pairs** section.
1. Click the ![Trash](../../../../../assets/trash-icon.svg "inline") icon in the row with the object to be deleted.
1. Confirm the deletion.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Management console)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
1. Click the username in the page header and select **Key pairs**.
1. Select the checkboxes for the key pairs you want to delete.
1. Click the **Delete** button.
1. Confirm the deletion.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Run the command:

   ```console
   openstack keypair delete <KEY_PAIR_NAME>
   ```

{/tab}

{/tabs}

{/includetag}
