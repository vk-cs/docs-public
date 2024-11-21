You can protect your infrastructure from potential web threats with the Check Point CloudGuard Network service. This service is a comprehensive solution for advanced threat prevention and network protection in any type of cloud. The Check Point CloudGuard Network service includes:

* Security Gateway BYOL — a virtual gateway (NGFW).
* Security Management BYOL — a service management server.

<details>

<summary>How the service works</summary>

1. Two VMs are created in the same or different networks: a virtual gateway and a management server — with GAiA OS preinstalled on them.
1. The First Time Configuration Wizard is launched on each of these VMs at the first connection, which allows you to configure startup parameters for further work with these VMs via the web interface.
1. The required networks are connected to the gateway.
1. The service is managed using the SmartConsole application that connects to the management server. This application allows you to:

   * Configure communication between the virtual gateway and the management server.
   * Configure the security policy by adding required licenses.
   * Configure backup.

</details>

By going through the steps of this instruction, you will:

1. Deploy and configure the virtual gateway.
1. Deploy and configure the management server.
1. Configure network access to the gateway and the management server.
1. Configure network interfaces for the gateway.
1. Configure the security policy.
1. Familiarize yourself with the backup options.

By using the Check Point CloudGuard Network service, you agree to license agreements of [Marketplace](/en/intro/start/legal/marketplace) and [Check Point](https://www.checkpoint.com/support-services/software-license-agreement-limited-hardware-warranty/).

<warn>

Check Point CloudGuard Network is provided under the BYOL (Bring Your Own License) model. Email the Check Point partner at [cpcloud@rrc.ru](mailto:cpcloud@rrc.ru) to purchase a license to use the service.

</warn>

## {heading(Preparatory steps)[id=preparatory_steps]}

1. [Sign up](/en/intro/start/account-registration) for VK Cloud.
1. Plan the network topology and addressing: consider whether the virtual gateway and the management server will be on the same network or on different ones. By default, the gateway and the management server are deployed on the same network.
1. (Optional) Estimate the required disk size of the VM on which the Check Point CloudGuard Network management server will be deployed, depending on the Check Point licenses purchased.

   <details>

   <summary>Virtual gateway infrastructure requirements</summary>

   | System requirements | Number of CPUs, pcs | RAM, GB | Hard disk capacity, at least GB |
   |----------------------|--------------------|---------------|-------------------|
   | Minimal          | 1                  | 8             | 100        |
   | Optimal          | 2                  | 12            | 150        |

   </details>

   <details>

   <summary>Management server infrastructure requirements</summary>

   | License | Number of CPUs, pcs | RAM capacity, GB | Hard disk capacity, at least GB |
   |----------------------|--------------------|---------------|-----------------|
   | Network Policy Management blade |2        | 8             | 200        |
   | Network Policy Management blade \+ SmartLog | 2 | 10      | 200        |
   | Network Policy Management blade \+ SmartLog \+ SmartEvent/SmartReporter | 4 | 12 | 200   |

   </details>

1. (Optional) [Create](/en/networks/vnet/service-management/net#creating_network) a network with Internet access if it has not been created before.

## 1. Deploy Check Point CloudGuard Network service

1. Deploy the **Security Gateway BYOL**:

   1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
   1. Go to **App Store**.
   1. On the **Check Point CloudGuard Network — Security Gateway BYOL** tile, click **Details**.
   1. On the service page, click **Connect**.
   1. Set the gateway parameters on the service configuration page:

      - **Network**: select a previously created network with Internet access or create a new one, specifying its [type](/en/networks/vnet/concepts/architecture#sdns_used) and subnet address.
      - Leave the other parameters unchanged.

   1. Press the **Next step** button.
   1. On the confirmation page, check the final connection parameters and click **Connect the tariff**.

   After the deployment is complete, a one-time link to the gateway configuration instructions will be sent to your email. Save these instructions.

1. Deploy the **Security Management BYOL**:

   1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
   1. Go to **App Store**.
   1. On the **Check Point CloudGuard Network — Security Management BYOL** tile, click **Details**.
   1. On the service page, click **Connect**.
   1. Set the management server parameters on the service configuration page:

      - **Network**: select a previously created network with Internet access, where the VM with the deployed service will be located, or create a new network, specifying its type (Neutron or Sprut) and subnet address.
      - Select other parameters according to the [recommendations](#preparatory_steps) or leave the default values.

   1. Press the **Next step** button.
   1. On the confirmation page, check the final connection parameters and click **Connect the tariff**.

   After the deployment is complete, a one-time link to the configuration instructions for the management server will be sent to your email. Save these instructions.

## {heading(2. Configure virtual gateway)[id=setup_gateway]}

1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
1. Go to **Cloud Servers → Virtual machines**.
1. In the list of virtual machines, click the name of the VM that was created as a virtual gateway.
1. On the VM page, go to the **Console** tab.
1. Enter the login and the password obtained in the gateway configuration instructions to enter the CLISH command line of the GAiA operating system.
1. Set a new password on the gateway VM using the command:

   ```bash
   set user admin password
   ```
1. Run the commands:

   ```bash
   set hostname <VM_name>
   set interface eth0 ipv4-address <internal_IP> subnet-mask <subnet_mask>
   set static-route default nexthop gateway address <gateway_default_ip> on
   save config
   ```

   Here:

   * `<VM_name>` — the name of the gateway virtual machine. The VM name is generated automatically when you deploy the **Security Gateway BYOL** service. You can change the VM name using this parameter.
   * `<internal_IP>` — the internal IP address of the gateway specified in the gateway configuration instructions.
   * `<subnet_mask>` — the subnet mask specified in the gateway configuration instructions.
   * `<gateway_default_ip>` — default static route to the gateway specified in the gateway configuration instructions.

## {heading(3. Configure management server)[id=setup_management]}

1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
1. Go to **Cloud Servers → Virtual machines**.
1. In the list of virtual machines, click the name of the VM that was created as a management server.
1. On the VM page, go to the **Console** tab.
1. Enter the login and the password obtained in the management server configuration instructions to enter the CLISH command line of the GAiA operating system.
1. Set a new password on the management server VM using the command:

   ```bash
   set user admin password
   ```
1. Run the commands:

   ```bash
   set hostname <VM_name>
   set interface eth0 ipv4-address <internal_IP> subnet-mask <subnet_mask>
   set static-route default nexthop gateway address <gateway_default_ip> on
   save config
   ```

   Here:

   * `<VM_name>` — the name of the virtual machine used as a management server. The VM name is generated automatically when you deploy the **Security Management BYOL** service. You can change the VM name using this parameter.
   * `<internal_IP>` — the internal IP address of the management server, specified in the configuration instructions.
   * `<subnet_mask>` — the subnet mask specified in the management server configuration instructions.
   * `<gateway_default_ip>` — default static route to the management server specified in the management server configuration instructions.

## 4. Increase logical volume sizes of gateway and management server VMs

If you deploy the gateway and the management server on virtual machines with a disk larger than 100 GB, increase the size of the `lv_current` or the `lv_log` logical volumes for these VMs:

1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
1. Go to **Cloud Servers → Virtual machines**.
1. In the list of virtual machines, click the name of the VM that was created as a gateway or a management server.
1. On the VM page, go to the **Console** tab.
1. Enter the login received in the configuration instructions for the required VM and the password specified when configuring this VM.
1. Set the password for the GRUB 2 bootloader:

   ```bash
   set grub2-password
   ```

1. Set the password for the expert mode (the equivalent of the single-user mode in Linux):

   ```bash
   set expert-password
   ```

1. Save the changes to the settings:

   ```bash
   save config
   ```

1. Reboot the VM:

   ```bash
   reboot
   ```

1. Press any key when the `Press any key to see the boot menu` prompt appears at boot.
1. Select **Start in maintenance mode**.
1. Enter the login set during the gateway (or the management server) configuration and the password set for the GRUB2 bootloader.
1. Start the LVM (Logical Volume Manager):

    ```bash
    lvm_manager
    ```

1. Enter `2` to select the `Resize lv_current/lv_log Logical Volume` option.
1. Select the required logical volume by entering the appropriate number from the keyboard.
1. Set any value from the suggested range.

More information can be found in the [sk95566 article](https://support.checkpoint.com/results/sk/sk95566) (access to the article is available after purchasing the Check Point CloudGuard Network product).

## {heading(5. Configure network access to gateway)[id=configure_network_access_to_gateway]}

1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
1. Go to **Cloud Networks** → **Firewall Settings**.
1. Add permissive rules for incoming traffic from IP addresses on your network for the security group specified in the gateway configuration instructions:
   1. Click the name of the required security group.
   1. In the **Inbound Traffic** block, click **+ Add Rule**.
   1. Select the traffic type and specify ports:

      <tabs>
      <tablist>
      <tab>All protocols and all ports</tab>
      <tab>HTTPS</tab>
      <tab>SSH</tab>
      </tablist>
      <tabpanel>

      To allow any incoming traffic from IP addresses on your network:

      1. In the **Type** field, select **All protocols and all ports**.
      1. Under **Remote Address**, select **IP-address range** and click **Use my IP** to automatically substitute the IP address range of your network.

      </tabpanel>
      <tabpanel>

      Select **HTTPS** and specify the `443` port to allow incoming traffic from any IP addresses to the `443` TCP port.

      </tabpanel>
      <tabpanel>

      Select **SSH** and specify the `22` port to allow incoming traffic from any IP addresses to the `22` TCP port.

      </tabpanel>
      </tabs>

   1. Click **Save rule**.

1. Connect to the virtual gateway through the GAiA Portal web interface and complete the gateway configuration using the First Time Configuration Wizard:

   1. Go to ```https://<external_IP_address>:443```, where `<external_IP_address>` is the gateway external IP address specified in the gateway configuration instructions.
   1. Enter the login received in the gateway configuration instructions and the password set at the [configuration](#setup_gateway).
   1. In the **SIC** section of the window that appears, set a password in the **Activation Key** field. Make a note of this password. You will need it when you connect the gateway to the management server.

Now, you can connect to the gateway VM using the GAiA Portal web interface at `https://<external_IP_address>` (or by SSH `<external_IP_address>:22`).

## {heading(6. Configure network access to management server)[id=configure_network_access_to_management]}

1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
1. Go to **Cloud Networks** → **Firewall Settings**.
1. Add permissive rules for incoming traffic from IP addresses on your network for the security group specified in the management server configuration instructions:
   1. Click the name of the required security group.
   1. In the **Inbound Traffic** block, click **+ Add Rule**.
   1. Select the traffic type and specify ports:

      <tabs>
      <tablist>
      <tab>All protocols and all ports</tab>
      <tab>HTTPS</tab>
      <tab>SSH</tab>
      <tab>Other</tab>
      </tablist>
      <tabpanel>

      To allow any incoming traffic from IP addresses on your network:

      1. In the **Type** field, select **All protocols and all ports**.
      1. Under **Remote Address**, select **IP-address range** and click **Use my IP** to automatically substitute the IP address range of your network.

      </tabpanel>
      <tabpanel>

      Select **HTTPS** and specify the `443` port to allow incoming traffic from any IP addresses to the `443` TCP port.

      </tabpanel>
      <tabpanel>

      Select **SSH** and specify the `22` port to allow incoming traffic from any IP addresses to the `22` TCP port.

      </tabpanel>
      <tabpanel>

      You can set other ports to connect to the management server through the SmartConsole application:

      1. In the **Type** field, select **Other**.
      1. Specify `19009`, `18210`, `18190`, and `443` TCP ports to allow incoming traffic from any IP addresses to these ports.

      </tabpanel>
      </tabs>

   1. Click **Save rule**.

1. Connect to the management server through the GAiA Portal web interface and complete the management server configuration using the First Time Configuration Wizard:

   1. Go to `https://<external_IP_address>:443`, where `<external_IP_address>` is the external IP address of the management server specified in the management server configuration instructions.
   1. Enter the login received in the management server configuration instructions and the password set at the [configuration](#setup_management).
   1. On the First Time Configuration Wizard window, click **Next**.
   1. At the “Deployment Options” step, leave the settings unchanged and click **Next**.
   1. At the “Management Connection” step, leave the settings unchanged and click **Next**.
   1. At the “Device Information” step, leave the settings unchanged and click **Next**.
   1. At the “Date and Time Settings” step, leave the settings unchanged and press **Next**.
   1. At the “Installation Type” step, select **Security Gateway and/or Security Management**.
   1. At the “Products” step, only set the **Security Management** checkbox to configure the **Check Point CloudGuard Network — Security Management BYOL** service as a management server. If necessary, you can configure the service as a gateway and a management server at the same time. Read more about it in the [service official documentation](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_Installation_and_Upgrade_Guide/Content/Topics-IUG/Installing-Standalone.htm).
   1. At the “Security Management Administrator” step, leave the settings unchanged and click **Next**.
   1. At the “Security Management GUI Clients” step, leave the settings unchanged and click **Next**.
   1. At the “First Time Configuration Wizard Summary” step, click **Finish** and confirm the system reboot.

Now, you can connect to the management server VM using the GAiA Portal web interface at `https://<external_IP_address>` (or via SSH `<external_IP_address>:22`), where `<external_IP_address>` is the external IP address of the management server specified in the management server configuration instructions.

## 7. Add network interfaces

By default, one network interface is created for a VM. To add a network interface to the gateway:

1. [Go](https://msk.cloud.vk.com/app/) to your VK Cloud management console.
1. Go to **Cloud Servers → Virtual machines**.
1. In the list of virtual machines, click the name of the VM that was created as a gateway.
1. Go to the **Networks** tab.
1. [Connect](/en/computing/iaas/service-management/vm/vm-add-net#connecting_the_network_to_the_vm) the required network to the gateway VM and [add](/en/networks/vnet/service-management/secgroups#adding_a_rule) rules to the security group for that network.

   <info>

   The network interface is added and removed in the GAiA operating system without the need to reboot.

   </info>

1. [Configure](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_Gaia_AdminGuide/Content/Topics-GAG/Physical-Interfaces.htm?tocpath=Network%20Management%7CNetwork%20Interfaces%7C_____1) the network interface in the GAiA OS using the GAiA Portal web interface or SSH.

## 8. Customize security policy

1. Install the SmartConsole application for managing the Check Point CloudGuard Network service by the [link](https://sc1.checkpoint.com/documents/Jumbo_HFA/R81.20_SC/R81.20/R81.20_Downloads.htm) or through the GAiA Portal web interface of the gateway or the management server:

   1. Go to `https://<external_IP_address>` where `<external_IP_address>` is the external IP address of the gateway or the management server specified in the configuration instructions.
   1. From the left menu, select **Maintenance** → **Download SmartConsole**.
   1. Click **Download** to download the SmartConsole distribution.
   1. Run the SmartConsole installation file.
   1. Accept all suggestions from the installer and wait for it to complete.

1. [Connect](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_SecurityManagement_AdminGuide/Content/Topics-SECMG/Connecting-to-Security-Management-Server-through-SmartConsole.htm?tocpath=_____7#Connecting_to_the_Security_Management_Server_through_SmartConsole) to the management server using SmartConsole by specifying the login and the password set for the management server, and the external IP address of the management server from the configuration instructions.
1. [Connect](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_SecurityManagement_AdminGuide/Content/Topics-SECMG/Creating-New-Security-Gateway.htm?tocpath=Managing%20Gateways%7C_____1) the gateway to the management server by specifying:

   * **Name**: the gateway VM name specified in the `hostname` parameter during [gateway configuration](#setup_gateway).
   * **IPv4 Address**: the internal IP address of the gateway specified in the `<internal_IP>` parameter during [gateway configuration](#setup_gateway).

   In the connection step, enter the SIC password that you specified when [configuring network access to the gateway](#configure_network_access_to_gateway).

1. Enable the required software blades for the gateway:

   1. Double-click the name of the required gateway in the list.
   1. In the gateway properties, check the required settings on the **Network Security** tab.

1. [Create](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_SecurityManagement_AdminGuide/Content/Topics-SECMG/Introducing-the-unified-access-control-policy.htm?tocpath=Creating%20an%20Access%20Control%20Policy%7C_____1) an Access Control Policy.
1. Configure the [Threat Prevention Policy](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_ThreatPrevention_AdminGuide/Content/Topics-TPG/The_Check_Point_Threat_Prevention_Solution.htm?TocPath=The%20Check%20Point%20Threat%20Prevention%20Solution%7C_____0#The_Check_Point_Threat_Prevention_Solution) in the **Custom Threat Prevention** or the **Autonomous Threat Prevention** mode, as well as the QoS Policy and the HTTPS Inspection Policy, if necessary.
1. [Install](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_SecurityManagement_AdminGuide/Content/Topics-SECMG/Managing-Server-and-Gateway-Licenses.htm?tocpath=Managing%20Gateways%7CManaging%20%20Licenses%7C_____1) licenses for the gateway and the management server.
1.  Set the [Access Control Policy](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_SecurityManagement_AdminGuide/Content/Topics-SECMG/Installing-the-Access-Control-Policy.htm?tocpath=Creating%20an%20Access%20Control%20Policy%7C_____10) and the [Threat Prevention Policy](https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_SecurityManagement_AdminGuide/Content/Topics-SECMG/Installing-Threat-Prevention-Policy.htm) on the gateway.

## 9. Consider backup

<warn>

Backup and instance recovery of the Check Point CloudGuard Network service are not supported by VK Cloud.

</warn>

Backup options are described in the [sk108902 article](https://support.checkpoint.com/results/sk/sk108902) and include the following built-in GAiA backup procedures:

* **System Backup** performs backup of the GAiA OS configuration and the management server base and is used for periodic backups. Backup size:

  * Tens or hundreds of MB for gateways
  * Hundreds or thousands of MB for the management server

* **Snapshot** creates a snapshot of system settings and products such are:

  * File system (root)
  * System configuration (interfaces, routing, hostname, etc.)
  * Software blades configuration
  * Management database (on the management server)

  The snapshot size is several gigabytes. Used mainly before upgrading the GAiA operating system to a new version or before installing the Jumbo Hotfix software package.

## Delete unused resources

Running service infrastructure consumes computing resources. If you no longer need it:

- [Delete](/en/applications-and-services/marketplace/service-management/pr-instance-manage#deleting_a_service_instance) the instance of the Check Point CloudGuard Network service.
- [Delete](/en/computing/iaas/service-management/vm/vm-manage#delete_vm) VMs created as a gateway and a management server.
- Make sure that all disks are deleted along with the VMs.
- [Delete](/en/networks/vnet/service-management/net#deleting_network) the network used for the service.
