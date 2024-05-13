You can manage access to the cloud resources using the [OpenVPN](https://msk.cloud.vk.com/app/mcs3723876490/services/marketplace/v2/apps/service/11bd457f-5006-4a5e-9aa3-e07586a487c2/v1_test/info/). This guide will help you deploy the OpenVPN service on a virtual machine (VM) in VK Cloud, access the service console, and create a new user.

By using the OpenVPN service, you agree to the service agreements of [Marketplace](/ru/additionals/start/legal/marketplace) and [OpenVPN](https://openvpn.net/legal/).

To deploy the OpenVPN service in the project::

1. [Register](/en/additionals/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/operations/manage-net#creating_a_network) a network with Internet access, if one has not been created earlier.
1. In the [settings of the subnet](/en/networks/vnet/operations/manage-net#editing_a_subnet) where the VM with the deployed service will be located, disable the **Private DNS** option.
1. [Deploy](../../service-management/pr-instance-add/) the OpenVPN service:

   1. In the “Настройки Кластера” step, specify VM settings:

      - **Сеть**: select the previously created network with Internet access and subnet. The external IP address will be assigned automatically.
      - Choose other VM parameters at your discretion.

   1. Click the **Next Step** button.
   1. In the “Настройки OpenVPN” step, specify network connectivity settings:

      - **Подсеть клиентских адресов**: specify the subnet address where the service will assign addresses for user devices. Ensure that this address space does not overlap with the address space being configured for access.
      - **Адрес DNS**: the DNS server address that OpenVPN will use to resolve domain names to IP addresses. It can be a local or external server if it is accessible from the subnet.
      - **Активировать full-tunneling**: if this option is enabled, all user traffic will be routed through the VPN. This will increase the server load if large data streams are being transmitted. Disable the option if you only need to route user traffic through the VPN to access the subnet.
      - **Адреса подсетей**: specify the subnet addresses, separated by commas, that need to be accessed. Example: `10.0.0.0/24,10.0.10.0/24`. The subnets specified in this field will be accessible from the subnet where the service was deployed. The deployment subnet is specified by default in the service, so there is no need to add it here. This parameter is ignored if the **Активировать full-tunneling** option is enabled.

      <warn>

      Check the router settings in the subnets: network connectivity has to be set between subnets in the **Адреса подсетей** field.

      </warn>

   1. Click the **Next Step** button.
   1.  In the “Confirmation” step, review the estimated cost of the service and click the **Connect the Tariff** button.

   After the installation is complete, an email with a one-time link to a page will be sent, which contains:

   - configuration for the first user;
   - access key to the VM;
   - external and internal IP addresses of the VM.

1. Connect to the service VM via SSH. To do this, run the command in the terminal:

   ```bash
   ssh -i <private_key> ubuntu@<VM-address>
   ```

   Here:

   - `<private_key>` — access key obtained from the one-time link.
   - `<VM-address>` — external IP address of the VM obtained from the one-time link.

1. Get root user privileges, run the `sudo bash` command.
1. Create a new user. Run the command:

   ```bash
   /home/ubuntu/create_client.sh <username>
   ```

   After the script successfully completes, a configuration file for the new user will appear in the `/etc/openvpn/server` path.
1. (Optional) Block the user. Run the command:

   ```bash
   /home/ubuntu/revoke_client.sh <username>
   ```

   After the script successfully completes, the `crl.pem` certificate will be updated, and the OpenVPN service will be restarted. Access for the `<username>` user will be revoked.

   The user configuration file will not be deleted from the `/etc/openvpn/server` directory. When trying to create a user with the same name, the script will run, but nothing will happen as the user already exists. To restore access for the user, create a configuration file with a new name.

<info>

For advanced service configuration, use the [official OpenVPN instruction](https://openvpn.net/access-server-manual/introduction/).

</info>
