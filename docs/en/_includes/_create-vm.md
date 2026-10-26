{includetag(not_vm_onboarding)}
## {counter(vm)}. Create a VM
{/includetag}

{includetag(vm_onboarding)}
1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud management console.
1. Go to the **Cloud Computing → Virtual Machines** section.
1. Click the **Create instance** or **Add** button.
1. Expand the **Configuration** block and specify the VM configuration:

   1. In the **Operating system** field, select `Ubuntu 22.04`.
   1. Leave the remaining parameter values at their defaults.

1. Expand the **Network and firewall settings** block and specify the network parameters:

   1. In the **Network** field, select `External network (internet)`.

      In the external network, the virtual machine will automatically be assigned an external IP address.

   1. In the **Virtual machine key** field, select `Create new key`.
   1. Click the **Add security group** button and select the additional `ssh` security group.
   
1. Click the **Create** button. The `.pem` key file will be automatically downloaded to your computer.

   {note:warn}
   Do not close the page until the virtual machine creation process is complete.
   {/note}

1. Wait for the virtual machine creation process to complete. The new VM will appear in the list in the **Virtual Machines** section.
1. Wait 10–15 minutes after the VM is successfully created. During this time, the already created VM is being prepared for operation: the operating system is being deployed on its disk, and system tools applying the selected settings to the VM are running.
1. Connect to the VM via the SSH protocol:
   {/includetag}

   {includetag(not_vm_onboarding)}
## {heading({counter(vm)}. Connect to the VM)[id=includes-connect-to-vm]}

You can connect to a Linux-based virtual machine created from an Ubuntu image via the SSH protocol.
   {/includetag}

   {tabs}
   
   {tab(Linux/macOS)}

   1. Find the downloaded `.pem` key file and copy the path to it.
   1. Make the key accessible only to the current user:

      ```console
      chmod 400 <KEY_PATH>
      ```
   1. Run the command in the terminal:
   
      ```shell
      ssh -i <KEY_PATH> ubuntu@<IP_ADDRESS>
      ```
      Here:

      - `<KEY_PATH>` — path to the `.pem` key file.
      - `<IP_ADDRESS>` — the external IP address of the VM. It can be found in the [management console](https://msk.cloud.vk.com/app/) of VK Cloud in the **Cloud Computing → Virtual Machines** section.
      
      For example:
      
      ```shell
      ssh -i ubuntu-key.pem ubuntu@213.219.212.130
      ```
      
      {include(/en/_includes/_ssh-warning.md)[tags=new-host]}
   
   {/tab}
   
   {tab(Windows 10/11)}

   1. Find the downloaded `.pem` key file and copy the path to it.
   1. Run the command in the command prompt:
   
      ```shell
      ssh -i <KEY_PATH> ubuntu@<IP_ADDRESS>
      ```
      Here:

      - `<KEY_PATH>` — path to the `.pem` key file.
      - `<IP_ADDRESS>` — the external IP address of the VM. It can be found in the [management console](https://msk.cloud.vk.com/app/) of VK Cloud in the **Cloud Computing → Virtual Machines** section.
      
      For example:
      
      ```shell
      ssh -i ubuntu-key.pem ubuntu@213.219.212.130
      ```
   
      {include(/en/_includes/_ssh-warning.md)[tags=new-host]}
   
   {/tab}
   
   {tab(Windows 7/8)}
   
   On Windows 7/8, use the PuTTY application to connect via SSH.
   
   1. [Install](https://www.putty.org/) PuTTY.
   1. Launch the bundled PuTTYgen application:
   
      1. In the **Conversions** menu, select **Import Key** and specify the existing `.pem` key.
      1. Click the **Save private key** button, select a directory, and specify the desired name for the `.ppk` key.
   
   1. Launch the bundled Pageant application:
   
      1. Right-click the Pageant icon in the taskbar.
      1. In the context menu, select **Add key**.
      1. Select the generated private key in `.ppk` format.
   
   1. Launch PuTTY:
   
      1. In the **Host Name (or IP address)** field, enter the external IP address of the virtual machine. Specify port `22` and connection type `SSH`.
   
         {note:info}
         The external IP address of the VM can be found in the [management console](https://msk.cloud.vk.com/app/) of VK Cloud in the **Cloud Computing → Virtual Machines** section.
         {/note}
       
      1. In the tree on the left, go to the **Connection → SSH → Auth** category.
      1. Set the **Allow agent forwarding** flag.
      1. Open the **Auth → Credentials** item in the tree on the left.
      1. In the **Private key file for authentication** field, select the `.ppk` file with the private key.
      1. Click the **Open** button.
   
         If this is the first connection to the virtual machine, confirm it in the window that appears.
   
      1. In the terminal window that appears, enter the login `ubuntu`.
   
         If everything is configured correctly, a connection to the server will be established.
   
   {/tab}
   
   {/tabs}

{includetag(not_vm_onboarding)}
## Delete unused resources

A running VM consumes compute resources. If you no longer need it:

- [stop](/en/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart) it to use it later;
- [delete](/en/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete) it permanently.
{/includetag}
