This guide provides recommendations for troubleshooting network configuration issues on Linux VMs.

As an example, it is assumed that:

- a virtual machine has only one network interface;
- the problem of missing access to the virtual machine via SSH is being solved.

The described approaches can also be used when access is lost to another application (for example, NGINX web server) or when a virtual machine has multiple network interfaces.

## Example of a problem

- It is not possible to connect to a VM via SSH at its private IP address or floating IP address (if there is one).
- Some time ago there were no problems with the connection.

## Before starting work

1. Perform a forced reboot.

   This operation can help if the VM is not responding or its network interface is initialized incorrectly:
   1. [Stop](../../instructions/vm/vm-manage#starting--stopping--reboot-the-vm) VM.
   1. For a stopped VM [run](../../instructions/vm/vm-manage#forced-vm-reboot) forced reboot.

   If this does not solve the problem, follow the remaining steps and proceed to diagnostics.

1. [Make sure](../../instructions/vm/vm-manage#starting--stopping--reboot-the-vm), that the VM is running.

1. [Make sure](../../instructions/vm/vm-console#the-vnc-console),that you can access the virtual machine console and log in to it using a [pre-configured login](../../instructions/vm/vm-connect/vm-connect-nix#2--select-the-user-name).

   If necessary, [restore password](../../instructions/vm/vm-manage#setting-and-changing-a-password) for the login.

1. Get information about the configuration of the virtual machine network interface:

   1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
   1. Select the project and region where the necessary VM is located.
   1. Go to **Cloud Computing → Virtual machines**.
   1. Click on the name of the desired VM.
   1. Go to the tab **Networks**.
   1. Write down the following network information:

      - network and subnet names;
      - gateway and subnet CIDR;
      - IP address: private and floating (if any);
      - MAC address;
      - Firewall settings (list of security groups).

      For example, the following values will be used:

      <!-- prettier-ignore-start -->
      | Parameter                                           | Value                 |
      | --------------------------------------------------- | --------------------- |
      | Network name                                        | `demoNetwork`         |
      | Name of subnet                                      | `demoSubnet`          |
      | Gateway                                             | `10.0.0.1`            |
      | CIDR                                                | `10.0.0.0/24`         |
      | Private IP address                                  | `10.0.0.5`            |
      | Private IP address in combination with a prefix from CIDR | `10.0.0.5/24`         |
      | Floating IP                                         | `192.0.2.22`          |
      | MAC address                                         | `fa:16:3e:aa:bb:cc`   |
      | Firewall settings                                   | `default`             |
      <!-- prettier-ignore-end -->

## 1. Check the network interface settings

Sometimes the connection is hindered by incorrect initialization of the network interface of the virtual machine or its incorrect settings.

Check that the network interface is configured correctly:

1. Connect to the virtual machine console and log in.

2. Run the command:

    ```bash
    ip link show
    ```

    Example output:

    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

    Find in the output of the command the name of the interface for which the `link\ether` parameter matches the MAC address received earlier.
    In this example, it will be `ens3`.

    <info>

    The interface name will vary for different Linux distributions.

    </info>

3.  Execute the command by substituting the interface name received in the previous step into it:

    ```bash
    ip address show ens3
    ```

    Example output:

    ```text
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
        inet 10.0.0.5/24 metric 100 brd 10.0.0.255 scope global dynamic ens3
           valid_lft 603373sec preferred_lft 603373sec
        inet6 fe80::f816:3eff:feb4:d70f/64 scope link
           valid_lft forever preferred_lft forever
    ```

    The output should contain:

    - Interface status information: `state UP`.
    - The private IP address of the virtual machine, combined with the prefix `/24` from the subnet CIDR, in the parameter `inet` (`10.0.0.5/24`).

4. Run the command:

    ```bash
    ip route show default
    ```

    Example output:

    ```text
    default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
    ```

    Make sure that the output contains:

    - Gateway IP address (`via 10.0.0.1`).
    - Interface name received earlier (`dev ens3`).
    - The private IP address of the virtual machine (`src 10.0.0.5`).

    If the output of the commands `ip address show` and `ip route show` contains the given information, then the network interface settings are correct. Go to [application verification](#2--make-sure-that-the-necessary-applications-are-running-on-the-vm).

    If the output of the commands `ip address show` and `ip route show` if it does not contain the above information, then the network interface settings are incorrect.

5. Configure the network interface manually:

    <tabs>
    <tablist>
    <tab>Ubuntu</tab>
    <tab>Debian</tab>
    <tab>AlmaLinux, CentOS</tab>
    <tab>openSUSE</tab>
    </tablist>
    <tabpanel>

    1. Edit the file `/etc/netplan/50-cloud-init.yaml` and bring it to the following form:

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

        If necessary, specify other DNS servers in the parameter `networks.ethernets.ens3.nameservers.addresses`.

    1. Run the command:

        ```bash
        sudo netplan apply
        ```

    </tabpanel>
    <tabpanel>

    1. Edit the file `/etc/network/interfaces.d/50-cloud-init` and bring it to the following form:

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

        If necessary, specify other DNS servers in the parameter `dns-nameservers`.

    1. Restart the network connection by running the command:

        ```bash
        sudo systemctl restart networking
        ```

    </tabpanel>
    <tabpanel>

    1. Edit the file `/etc/sysconfig/network-scripts/ifcfg-<interface name>` and bring it to the following form:

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
        UUID=5fb06bd0-aaaa-bbbb-cccc-d6edd65f3e03 # For your VM, the UUID will be different
        GATEWAY=10.0.0.1 # Gateway address
        DNS1=5.61.237.120 # DNS server 1
        DNS2=5.61.237.127 # DNS server 2
        ```

        If necessary, specify other DNS servers in the parameters `DNS1` and `DNS2`.

    1. Restart the network connection by running the command:

        ```bash
        sudo nmcli con up "System eth0"
        ```

    </tabpanel>
    <tabpanel>

    1. Edit the `/etc/sysconfig/network/ifcfg-<interface name>` file and make it look like:

       ```ini
       IPADDR='10.0.0.5/24' # Private IP address + prefix from CIDR
       BOOTPROTO='static'
       STARTMODE='hotplug'
       ```

    1. Edit the `/etc/sysconfig/network/routes` file and specify the gateway address in it:

       ```ini
       default 10.0.0.1 - -
       ```

    1. Edit the `/etc/sysconfig/network/config` and specify the DNS servers' adresses in it:

       ```ini
       NETCONFIG_DNS_STATIC_SERVERS="5.61.237.120 5.61.237.127"
       ```

       If necessary, specify other DNS servers.

    1. Apply the DNS servers' settings:

       ```bash
       sudo netconfig update
       ```

    1. Restart the network connection by running the command:

       ```bash
       sudo systemctl restart network
       ```

    </tabpanel>
    </tabs>

6. Prohibit making automatic changes to the edited configuration file:

    ```bash
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

7. Check for SSH access to the VM. If access does not appear, [go to the application check](#2--make-sure-that-the-necessary-applications-are-running-on-the-vm).

## 2. Make sure that the necessary applications are running on the VM

The network interface may be fine, but applications and services may not be running or running on a non-standard port.

Check the SSH operation:

1. Connect to the virtual machine console and log in.

1. Run the command:

    ```bash
    sudo systemctl status ssh
    ```

    By the output of the command, determine whether the service is running:

    - `Active: active (running)`: SSH service is running.
    - `Active: inactive (dead)`: SSH service is not running.

1. Depending on the SSH service status, follow these steps:

    <tabs>
    <tablist>
    <tab>If SSH service is running</tab>
    <tab>If SSH service is not running</tab>
    </tablist>
    <tabpanel>

    1. Determine which port the SSH service is running on:

       ```bash
       sudo cat /etc/ssh/sshd_config | grep -w Port
       ```

       The output will contain the port number:

       ```text
       Port 22
       ```

        If the service is running on a standard port `22` — [go to checking the settings of the VM firewall](#3--check-the-settings-of-the-virtual-machine-firewall). Otherwise, proceed to the next step.

    1. Connect using a non-standard port number. For example, if the SSH service is running on a port `222`:

        ```bash
        ssh -i /path/to/private_key_file username@192.0.2.22 -p 222
        ```

    1. Check for SSH access to the VM. If access has not appeared, [proceed to checking the settings of the VM firewall](#3--check-the-settings-of-the-virtual-machine-firewall).

    </tabpanel>
    <tabpanel>

    1. Determine which port the SSH service is running on:

        ```bash
        sudo cat /etc/ssh/sshd_config | grep -w Port
        ```

        The output will contain the port number:

        ```text
        Port 22
        ```

    1. Make sure that other processes are not using this port. View SSH service logs:

        ```bash
        sudo journalctl -xeu ssh
        ```

        If there is a similar string in the logs, then the SSH service port is used by another process:

        ```text
        error: Bind to port 22 on 0.0.0.0 failed: Address already in use.
        ```

        If there is no such line in the logs, [proceed to checking the settings of the VM firewall](#3--check-the-settings-of-the-virtual-machine-firewall).

    1. Determine which process took up the port:

        1. Install the `netstat` utility:

            <tabs>
            <tablist>
            <tab>Debian, Ubuntu</tab>
            <tab>AlmaLinux, CentOS<tab>
            </tablist>
            <tabpanel>

            ```bash
            sudo apt install net-tools -y
            ```

            </tabpanel>
            <tabpanel>

            ```bash
            sudo yum install net-tools -y
            ```

            </tabpanel>
            </tabs>

        1. Run the command:

            ```bash
            sudo netstat -plntu | grep :22
            ```

            In this output example, port `22` is used by the `some-other-service` process with the PID `1234`:

            ```text
            tcp   0   0 0.0.0.0:22   0.0.0.0:*  LISTEN   1234/some-other-service
            tcp6  0   0 :::22        :::*       LISTEN   1234/some-other-service
            ```

    1. Stop the process using the SSH port:

        - or using `systemctl`:

            ```bash
            sudo systemctl stop some-other-service
            ```

        - or by forcibly shutting down the process:

            ```bash
            sudo kill 1234
            ```

    1. Change the settings of the service corresponding to the stopped process so that the service uses a port other than `22`.

    1. Restart the service:

        ```bash
        sudo systemctl restart some-other-service
        ```

    1. Restart SSH service:

        ```bash
        sudo systemctl restart sshd
        ```

    1. Make sure that the SSH service is running successfully:

        ```bash
        sudo systemctl status sshd
        ```

        Example of the output part:

        ```text
        Active: active (running)
        ```

        If the SSH service does not start, check the service settings in the configuration file `/etc/ssh/sshd_config`.
        For more information about problems with the service, see the logs:

        ```bash
        sudo journalctl -xeu ssh
        ```

    1. Check for SSH access to the VM. If access has not appeared, [proceed to checking the settings of the VM firewall](#3--check-the-settings-of-the-virtual-machine-firewall).

    </tabpanel>
    </tabs>

## 3. Check the settings of the virtual machine firewall

If a firewall is configured on a virtual machine (for example, `iptables`, `ufw`, `firewalld`), it may prevent connection, even if the IP address of the virtual machine is correct, and the SSH service is configured and running.

Next, it will be shown how to temporarily disable all firewall rules, allowing all traffic. This will help to make sure that the problem is in the firewall.

<warn>

After the SSH connection problem is localized, enable the firewall rules back (with the necessary adjustments). If all traffic is allowed, the security of the VM will decrease.

</warn>

To check the firewall settings:

1. Connect to the virtual machine console and log in.

1. Disable the firewall:

    <tabs>
    <tablist>
    <tab>ufw</tab>
    <tab>firewalld</tab>
    <tab>iptables</tab>
    </tablist>
    <tabpanel>

    ```bash
    sudo ufw disable
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    sudo systemctl stop firewalld
    ```

    </tabpanel>
    <tabpanel>

    1. Save the existing rules `iptables`:

        ```bash
        sudo iptables-save | sudo tee ~/iptables.rules
        ```

    1. Run the commands:

        ```bash
        sudo iptables -P INPUT ACCEPT
        sudo iptables -P FORWARD ACCEPT
        sudo iptables -P OUTPUT ACCEPT
        sudo iptables -t nat -F
        sudo iptables -t mangle -F
        sudo iptables -F
        sudo iptables -X

        ```

    </tabpanel>
    </tabs>

1. Check for SSH access to the VM.

   If access has appeared, adjust the firewall rules and enable it again.

   If access does not appear, turn on the firewall again and [check the settings of the VK Cloud firewall security groups](#4--check-the-settings-of-the-vk-cloud-firewall-security-groups).

To turn on the firewall again:

1. Connect to the virtual machine console and log in.

1. Run the command:

    <tabs>
    <tablist>
    <tab>ufw</tab>
    <tab>firewalld</tab>
    <tab>iptables</tab>
    </tablist>
    <tabpanel>

    ```bash
    sudo ufw enable
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    sudo systemctl start firewalld
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    sudo iptables-restore < ~/iptables.rules
    ```

    </tabpanel>
    </tabs>

## 4. Check the settings of the VK Cloud firewall security groups

Incorrectly configured security groups can prevent SSH connection, even if there are no obstacles at the VM level.

Next, it will be shown how to temporarily configure the firewall rules so as to allow all traffic. This will help to make sure that the problem is in the firewall.

<warn>

After the SSH connection problem is localized, re-configure the firewall rules (with the necessary adjustments). If all traffic is allowed, the security of the VM will decrease.

</warn>

To check the firewall settings:

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and region where the necessary VM is located.
1. Go to **Cloud Computing → Virtual machines**.
1. Click on the name of the desired VM.
1. Go to the tab **Networks**.
1. Expand the menu of the desired network connection and select **Edit connection**.
1. In the **Firewall settings** parameter:

    1. Delete all selected security groups.
    1. Select security groups from the drop-down list `default` and `all` («All allowed»).

       The `default` security group allows any outgoing traffic. The `all` security group allows any incoming traffic.

1. Click the **Save** button.

1. Check for SSH access to the VM.

    If access has appeared, adjust the firewall security groups and add them again instead of the `all` group.

    If access does not appear, go back to the original firewall settings and [contact technical support](#5--contact-technical-support).

To configure firewall rules again:

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project and region where the necessary VM is located.
1. Go to **Cloud Computing → Virtual machines**.
1. Click on the name of the desired VM.
1. Go to the tab **Networks**.
1. Expand the menu of the desired network connection and select **Edit connection**.
1. In the **Firewall settings** parameter:

    1. Delete the security group `all`.
    1. Select the necessary security groups from the drop-down list.

        If the selected security groups do not contain rules that allow outgoing traffic, also select the `default` security group. This group allows outgoing traffic. Otherwise, the virtual machine will not have access to the network.

    <info>

    In order for the firewall to pass the traffic of an SSH service running on the standard port `22`, it is enough to select the rules `default` and `ssh` («only ssh allowed»).

    </info>

## 5. Contact technical support

If the diagnostics did not help in solving the problem, [contact technical support](../../../../../contacts), by providing the information obtained during the diagnosis.
