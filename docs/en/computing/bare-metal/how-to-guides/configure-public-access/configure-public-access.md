# {heading(Configuring public access via an advanced router)[id=bare-metal-configure-public-access]}

{include(/en/_includes/_translated_by_ai_en.md)}

Access to a Bare Metal server via an {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=external network]} IP address can be configured using {linkto(../../../../networks/vnet/concepts/router#vnet-router-advanced)[text=advanced routers]}.

## {heading(Preparatory steps)[id=bare-metal-router-preparatory-steps]}

1. If you do not have a Bare Metal server, {linkto(../../../../computing/bare-metal/instructions/manage-service#bare-metal-manage-service-order)[text=order]} one.
1. {linkto(../../../../networks/vnet/instructions/advanced-router/manage-advanced-routers#vnet-manage-advanced-routers-add)[text=Create]} an advanced router.

## {heading({counter(TOC)}. Get the server network information)[id=bare-metal-router-get-info]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Navigate to **Cloud Computing** → **Bare Metal**.
1. In the list of Bare Metal servers, click the name of the desired server.
1. Go to the **Network** tab.

   Save the network parameters of your Bare Metal server; you will need them later. The following values will be used as an example:

   - Network name: `my-net`;
   - Gateway: `10.0.0.1`;
   - CIDR: `10.0.0.0/24`;
   - IP address: `10.0.0.2`.

## {heading({counter(TOC)}. Configure the advanced router)[id=bare-metal-router-settings]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Navigate to **Virtual Networks** → **Routers**.
1. Click the name of the desired router.
1. Go to the **Interfaces** tab.
1. Add an interface for the internal network:

   1. Click **Add interface**.
   1. Enter the interface name. The name `my-private-interface` is used as an example below.
   1. Select the `10.0.0.0/24` subnet from the internal network `my-net` that the Bare Metal server is connected to.
   1. Click **Add**.
   1. Write down the internal IP address of the added interface.

      The internal IP address `10.0.0.3` will be used as an example.

1. Add an interface for the external network:

   1. Click **Add interface**.
   1. Enter the interface name.
   1. Select any subnet from the `internet` {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=external network]}.
   1. Click **Add**.
   1. Write down the external IP address of the added interface.

      The external IP address `95.163.182.106` will be used as an example.

1. Go to the **DNAT** tab.
1. Configure the DNAT rules:

   1. Click **Add DNAT rule**.
   1. Enter the rule name `my-dnat-rule`.
   1. Select the `my-private-interface` interface connected to the internal network.
   1. In the **Protocol** field, select `All protocols and ports`.
   1. As the **IP after translation**, specify the internal IP address of the Bare Metal server `10.0.0.2`.
   1. Click **Add**.

## {heading({counter(TOC)}. Configure password access)[id=bare-metal-router-assets]}

Configure password access if it has not been done yet:

1. {linkto(../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=Connect]} to the Bare Metal server via SSH using the internal IP address.

   To complete this step, you will need to create an intermediate host in the form of a {linkto(../../../../computing/iaas/concepts/vm#iaas-concepts-vm)[text=virtual machine]} with a {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP address]}.

1. If you are using the `root` account, create a separate user with the `sudo` group:

   {tabs}
    
   {tab(Ubuntu/Debian)}

   ```shell
   sudo useradd -m <USERNAME> \
   sudo usermod -aG sudo <USERNAME>
   ```

   {/tab}

   {tab(CentOS/RHEL/AlmaLinux)}

   ```shell
   sudo useradd -m <USERNAME> \
   sudo usermod -aG wheel <USERNAME>
   ```

   {/tab}

   {/tabs}

1. Set a password:

   ```shell
   sudo passwd <USERNAME>
   ```

   Here `<USERNAME>` is the name of your account. If the OS was installed from {var(cloud)} images, you can use the {linkto(../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=default account]} name.

   {note:info}

   The configured password can only be used for access via the VNC console. SSH connections are still performed only using a key pair.

   {/note}

1. End the SSH session:

   ```shell
   quit
   ```

## {heading({counter(TOC)}. Configure the network in the OS)[id=bare-metal-router-settings-os]}

1. {linkto(../../../../computing/bare-metal/connect/console#bare-metal-console)[text=Connect]} to the server via the VNC console.
1. Enter the username and press ENTER.
1. Enter the password.

   When entering the password, the entered characters are not displayed in the console.

1. Configure the network in the OS to work with the advanced router.

   1. Check the route configuration and find out the interface name in the OS:

      ```shell
      sudo ip route | grep default
      ```

      Example output:

      ```shell
      default via 10.0.0.1 dev eth0 proto kernel
      ```

      Here `eth0` is the interface name that is needed to create a new route.

   1. Delete the current `default` route:

      ```shell
      sudo ip route delete default
      ```

   1. Add a new `default` route via the advanced router:

      ```shell
      sudo ip route add default via <INTERNAL_INTERFACE_IP_ADDRESS> dev <INTERFACE>
      ```

      Here:

      - `<INTERNAL_INTERFACE_IP_ADDRESS>` — the address assigned to the internal interface when configuring the advanced router.
      - `<INTERFACE>` — the interface name in the system.

      Example:

      ```shell
      sudo ip route add default via 10.0.0.3 dev eth0
      ```

   {note:info}

   The modified route is preserved until the server is rebooted. After the reboot, the network configuration will need to be performed again.

   To prevent the route from being reset, {linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check)[text=configure]} the network interface configuration in the OS using the network parameters obtained in the first step. For the gateway, specify the IP address assigned to the internal interface.

   {/note}

1. {linkto(../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=Connect]} to the server via SSH using the external address.

## {heading(Delete unused resources)[id=bare-metal-router-clean-up]}

The created resources are billed and consume computing resources. If you no longer need them:

- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Stop]} the intermediate host to use it later, or {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} it permanently.
- {linkto(../../../../computing/bare-metal/instructions/manage-service#bare-metal-manage-service-delete)[text=Cancel]} the Bare Metal server lease.
- {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Delete the Floating IP address]} assigned to the intermediate host. Floating IP addresses present in the project are billed even if they are not bound to any service.