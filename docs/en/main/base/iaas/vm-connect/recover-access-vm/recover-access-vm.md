The credentials for connecting and managing the virtual machine must be stored in a secure location to avoid the risk of losing access and information in the virtual machine.

However, if the credentials have been lost, there are several ways to restore access to the server.

## User password

User password recovery is performed regardless of the installed operating system family of the instance.

To reset your password, you need to go to the information about the virtual machine in the list of instances of the "Cloud Computing" service.

On the "Console" tab, click on the "Set password" button.

![](./assets/1597101418789-1597101418789.png)

**Attention**

Password must contain upper and lower case letters of the Latin alphabet, numbers, symbols! "# $% & () \* +, -.:; <=>? @ [] ^ \_\` {} ~

The password must contain at least one letter or number, in addition to special characters.

## Key pair

If you have a user password, you can also replenish the lost key pair for your Linux instance.

**Caution**

If the private key is lost, it cannot be restored. You need to recreate the key pair and upload the public key to the instance.

To restore access, you need to add a new key pair using the CLI and VNC console:

1.  Create a new key pair in the project using the Openstack CLI and save it locally:
    ```
     openstack keypair create --private-key <filename_and_location> <keyname>
    ```
2.  Copy the contents of the public key to a local file
    ```
     openstack keypair show --public-key >> <file_path>
    ```
3.  Upload the created file to any external resource or cloud
4.  Save the file to the virtual machine with the command
    ```
     wget <your_file>
    ```
5.  Copy the content of the new key to authorized_keys file
    ```
     cat <your_file> >> ~ / .ssh / authorized_keys
    ```
6.  Check access to the instance with a new key pair
    ```
     ssh -i <path_to_key> login @ IP_address
    ```
