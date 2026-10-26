# {heading(VM network interface settings)[id=iaas-interface-settings-check]}

{include(/en/_includes/_translated_by_ai_en.md)}

After adding a network interface to a VM, check and, if necessary, adjust its settings in the VM operating system.

## {heading(Preparatory steps)[id=iaas-interface-settings-check-preparatory-steps]}

Get information about the VM network interface configuration:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the virtual machine is located.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. Click the name of the desired virtual machine.
1. Go to the **Networks** tab.
1. Write down the following information about the network:

   - network and subnet name;
   - gateway and CIDR for the subnet;
   - IP addresses: private IP address and Floating IP address (if any);
   - MAC address;
   - Firewall settings (list of security groups).

   The following values will be used as an example:

   <!-- prettier-ignore-start -->
   | Parameter                                           | Value                 |
   |-----------------------------------------------------| --------------------- |
   | Network name                                        | `demoNetwork`         |
   | Subnet name                                         | `demoSubnet`          |
   | Gateway                                             | `10.0.0.1`            |
   | CIDR                                                | `10.0.0.0/24`         |
   | Private IP address                                  | `10.0.0.5`            |
   | Private IP address combined with the CIDR prefix    | `10.0.0.5/24`         |
   | Floating IP address                                 | `192.0.2.22`          |
   | MAC address                                         | `fa:16:3e:aa:bb:cc`   |
   | Firewall settings                                   | `default`             |
   <!-- prettier-ignore-end -->

## {heading(1. Verify that the network interface is configured correctly)[id=iaas-interface-settings-check-correction]}

1. Connect to the virtual machine console and log in.
1. Run the command:

   ```console
    ip link show
   ```

   {caption(Output example)[align=left;position=above]}
    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
    link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
    altname enp0s3
   ```
   {/caption}

   In the command output, find the name of the interface for which the `link\ether` parameter matches the MAC address obtained earlier. In this example, it is `ens3`.

   {note:info}
   The interface name differs across Linux distributions.
   {/note}

1. Run the command, substituting the interface name obtained in the previous step:

   ```console
   ip address show ens3
   ```

   {caption(Output example)[align=left;position=above]}
   ```text
   2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
        inet 10.0.0.5/24 metric 100 brd 10.0.0.255 scope global dynamic ens3
        valid_lft 603373sec preferred_lft 603373sec
        inet6 fe80::f816:3eff:feb4:d70f/64 scope link
           valid_lft forever preferred_lft forever
   ```
   {/caption}

   The output must contain:

   - Information about the interface state: `state UP`.
   - The private IP address of the virtual machine combined with the `/24` prefix from the subnet CIDR. In the example output, this IP address (`10.0.0.5/24`) is specified in the `inet` parameter.

1. Run the command:

   ```console
   ip route show default
   ```

   {caption(Output example)[align=left;position=above]}
   ```text
   default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
   ```
   {/caption}

   Make sure the output contains:

   - The gateway IP address (`via 10.0.0.1`).
   - The interface name obtained earlier (`dev ens3`).
   - The private IP address of the virtual machine (`src 10.0.0.5`).

   If the output of the `ip address show` and `ip route show` commands contains the information listed above, the network interface settings are correct. Skip the remaining steps of the instructions.

   If the output of the `ip address show` and `ip route show` commands does not contain the information listed above, the network interface settings are incorrect. Configure the network interface.

## {heading(2. Configure the VM network interface)[id=iaas-interface-settings-check-vm]}

Configure the network using the network configurator of your OS. Depending on the OS distribution, different network configurators are used:

- `netplan` — a solution used mainly in Ubuntu, as well as in Debian 12 and later cloud images.
- `ifupdown` — a network configurator used in standard Debian images, as well as in Debian 11 and earlier cloud images.
- `network-scripts` — used in RHEL-based distributions: CentOS, AlmaLinux, and others.
- `wicked` — a network configurator used in the OpenSUSE distribution.

{tabs}
{tab(netplan)}

1. Make the `/etc/netplan/50-cloud-init.yaml` file look as follows:

   ```yaml
   network:
       ethernets:
           ens3: # Interface name
               dhcp4: false
               addresses:
                   - 10.0.0.5/24 # Private IP address + prefix from CIDR
               routes:
                   - to: 0.0.0.0/0
                     via: 10.0.0.1 # Gateway address
               nameservers:
                   addresses:
                       - 5.61.237.120
                       - 5.61.237.127
               match:
                   macaddress: fa:16:3e:aa:bb:cc # MAC address
               set-name: ens3
       version: 2
   ```

   If necessary, specify other DNS servers in the `networks.ethernets.ens3.nameservers.addresses` parameter.

1. Run the command:

   ```console
   sudo netplan apply
   ```

1. Prevent automatic changes to the edited configuration file:

   ```console
   echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
   ```

{/tab}
{tab(ifupdown)}

1. Make the `/etc/network/interfaces.d/50-cloud-init` file look as follows:

   ```ini

# This file is generated from information provided by the datasource.  Changes

# to it will not persist across an instance reboot.  To disable cloud-init's

# network configuration capabilities, write a file

# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:

# network: {config: disabled}
   auto lo
   iface lo inet loopback

   auto eth0 # Interface name
   iface eth0 inet static
   address 10.0.0.5/24 # Private IP address + prefix from CIDR
   gateway 10.0.0.1 # Gateway address
   dns-nameservers 5.61.237.120 5.61.237.127
   ```

   If necessary, specify other DNS servers in the `dns-nameservers` parameter.

1. Restart the network connection:

   ```console
   sudo systemctl restart networking
   ```

1. Prevent automatic changes to the edited configuration file:

   ```console
   echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
   ```

{/tab}
{tab(network-scripts)}

1. Make the `/etc/sysconfig/network-scripts/ifcfg-<INTERFACE_NAME>` file look as follows:

   ```ini

# Created by cloud-init on instance boot automatically, do not edit.
   #
   BOOTPROTO=none
   DEVICE=eth0 # Interface name
   HWADDR=FA:16:3E:AA:BB:CC # MAC address
   MTU=1500
   ONBOOT=yes
   TYPE=Ethernet
   USERCTL=no
   PROXY_METHOD=none
   BROWSER_ONLY=no
   IPADDR=10.0.0.5 # Private IP address
   PREFIX=24 # Prefix from CIDR
   DEFROUTE=yes
   IPV4_FAILURE_FATAL=no
   IPV6INIT=no
   NAME="System eth0" # Use this name later to restart the network connection
   UUID=5fb06bd0-aaaa-bbbb-cccc-d6edd65f3e03 # The UUID will be different for your VM
   GATEWAY=10.0.0.1 # Gateway address
   DNS1=5.61.237.120 # DNS server 1
   DNS2=5.61.237.127 # DNS server 2
   ```

   If necessary, specify other DNS servers in the `DNS1` and `DNS2` parameters.

1. Restart the network connection:

   ```console
   sudo nmcli con up "System eth0"
   ```

1. Prevent automatic changes to the edited configuration file:

   ```console
   echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
   ```

{/tab}
{tab(wicked)}

1. Make the `/etc/sysconfig/network/ifcfg-<INTERFACE_NAME>` file look as follows:

  ```ini
  IPADDR='10.0.0.5/24' # Private IP address + prefix from CIDR
  BOOTPROTO='static'
  STARTMODE='hotplug'
  ```

1. In the `/etc/sysconfig/network/routes` file, specify the gateway address:

   ```ini
   default 10.0.0.1 - -
   ```

1. In the `/etc/sysconfig/network/config` file, specify the DNS server addresses:

   ```ini
   NETCONFIG_DNS_STATIC_SERVERS="5.61.237.120 5.61.237.127"
   ```

   If necessary, specify other DNS servers.

1. Apply the DNS server settings:

   ```console
   sudo netconfig update
   ```

1. Restart the network connection:

   ```console
   sudo systemctl restart network
   ```

1. Prevent automatic changes to the edited configuration file:

   ```console
   echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
   ```

{/tab}
{/tabs}

## {heading(3. Check access to the VM)[id=iaas-interface-settings-check-access]}

Try to {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=connect]} to the virtual machine.

If the connection fails, {linkto(../../../../computing/iaas/troubleshooting/linux-vm-network#iaas-linux-vm-network-app-check)[text=run diagnostics]} for network issues on the VM, starting from step 2.