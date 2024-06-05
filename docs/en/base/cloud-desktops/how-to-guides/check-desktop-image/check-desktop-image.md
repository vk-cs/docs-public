With Cloud Desktop, you can use built-in images to deploy desktops, as well as upload your own desktop images. Custom desktop images must meet the [Cloud Desktop service requirements](/en/base/cloud-desktops/concepts/desktop-image).

The following shows how to check a custom desktop image for compatibility with the Cloud Desktop service.

## Preparatory steps

1. If the image has AD support software installed, ask your system administrator for:

     - the IP address of the DNS server where the IP address and name of your LDAP server are registered;
     - the IP address or FQDN of your LDAP server;
     - the username and password of a LDAP user who has rights to add a VM to the domain.

1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud personal account.
1. Create [a network](/en/networks/vnet/service-management/net#creating_a_network) and [a subnet](/en/networks/vnet/service-management/net#creating_a_subnet):

     - Enable the **Access to internet** option.
     - If the image has AD support software installed:

         - In the network settings, select an existing router with connection to an external network or [create](/en/networks/vnet/service-management/router#adding_a_router) a new one.
         - In the subnet settings, disable the **Private DNS** option and add the DNS server IP address obtained from your system administrator to the **DNS servers** field.

     - Select other network and subnet parameters at your discretion.

1. If the image has AD support software installed, [organize](en/base/cloud-desktops/how-to-guides/ipsec) a VPN tunnel between the LDAP server and the created subnet.

## 1. Check whether you can create a VM from the image prepared

1. Check that the image is visible in the VM creation wizard:

     1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud personal account.
     1. Upload the prepared image to VK Cloud by following the [instructions](/en/base/iaas/service-management/images/images-manage#importing_an_image).
     1. Go to **Cloud Servers** → **Virtual machines** and click **Add**.
     1. In the **Operating System** list, find the image you uploaded and select it.

1. Check that when creating a VM you cannot specify parameters for it that are less than those of the uploaded image:

     1. If in the **Type of virtual machine** list there is an option with a RAM size smaller than that in the uploaded image:

         1. Select it and click **Next step**.
         1. Verify that the next step of the wizard is blocked.

     1. In the **Type of virtual machine** list, select an option with a RAM size no less than that of the uploaded image.
     1. Specify a value in the **Disk size** field less than the disk size of the uploaded image and click **Next step**.
     1. Verify that the next step of the wizard is blocked.

1. Check the possibility of creating a VM from the image:

     1. Specify a value in the **Disk size** field no less than the disk size of the uploaded image.
     1. Select other parameters on this page at your discretion and click **Next step**.
     1. In the **Network** list, select the previously created network and subnet.
     1. Add a security group to the **Firewall settings** field, if it has not already been added:

        - `rdp` for the Windows VM,
        - `ssh` for the Astra Linux VM.

     1. Enable the **Assign external IP** option.
     1. Click **Next step** and then click **Create instance**.
     1. Verify that the VM has been created successfully.

## 2. Test different ways to connect to the VM created from the image

<info>

Connection to the Astra Linux VM via RDP and LDAP should always be checked, regardless of whether software supporting these protocols is installed on the image. This software is used when operating the desktop and, if not present on the image, will be automatically installed on the desktop during its deployment.

</info>

1. Check the ability to connect to the created VM:

     1. On the **General information** tab of the VM page, click **Set password** and set the administrator password.
     1. Connect to the VM:

         - To [connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-win) to the Windows VM, use the RDP protocol.
         - To [connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-nix) to the Astra Linux VM use the SSH protocol.

     1. Verify that the connection has been successful.

1. (For Astra Linux) Check the ability to connect to the VM via RDP.

     1. If software supporting the RDP protocol has not been installed on the image, install the `xorgxrdp` and `xrdp` packages on the VM. To do this, run the command:

         ```shell
         sudo apt install xorgxrdp xrdp
         ```

     1. Terminate the current connection session to the VM.
     1. [Add](/en/networks/vnet/service-management/secgroups#assign_a_rule_group_to_an_instance) the VM to the `rdp` security group.
     1. Connect to the VM via RDP, following the [instructions for connecting to a Windows VM](/en/base/iaas/service-management/vm/vm-connect/vm-connect-win#3_connect_to_the_vm).
     1. Verify that the connection is successful and the graphical user interface opens.

1. (For Astra Linux) Check the ability to connect to the VM using LDAP.

     1. If software supporting the AD service has not been installed on the image, install the `astra-ad-sssd-client` package on the VM. To do this, run the command:

         ```shell
         sudo apt update && apt install -y astra-ad-sssd-client
         ```

     1. Connect to the VM via SSH or RDP.
     1. Run the command in the terminal:

         ```shell
         sudo astra-ad-sssd-client -d <ldap_id or domain_name> -u <username> -p <password>
         ```

         Here:

           - `<ldap_id or domain_name>` — the IP address or FQDN of your LDAP server;
           - `<username>` and `<password>` — the username and password of a LDAP user who has rights to add the VM to the domain.

     1. [Reboot](/en/base/iaas/service-management/vm/vm-manage#starting_stopping_reboot_the_vm) the VM.
     1. [Go to](/en/base/iaas/service-management/vm/vm-console#the_vnc_console) the VM's console.
     1. Log in using the username and password of the LDAP user. Verify the login is successful.
     1. Connect to the VM via RDP, following the [instructions for connecting to a Windows VM](/en/base/iaas/service-management/vm/vm-connect/vm-connect-win#3_connect_to_the_vm).
     1. Log in using the username and password of the LDAP user. Verify the login is successful.

## 3. Check the functionality of your installed software and peripheral devices

1. Verify that additionally installed applications are available and functioning.
1. (For Astra Linux) Connect to the VM via RDP. Check the operation of the sound card and microphone of the VM using the tools available in the OS.

## Delete unused resources

The running VM consumes computing resources. If you no longer need it:

- [stop](/en/base/iaas/service-management/vm/vm-manage#starting_stopping_reboot_the_vm) the VM to use it later;
- [delete](/en/base/iaas/service-management/vm/vm-manage#deleting_a_vm) the VM permanently.
