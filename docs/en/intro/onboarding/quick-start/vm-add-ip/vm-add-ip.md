# {heading(Assign a static public IP address to the VM)[id=onboarding-vm-add-ip]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Preparation steps)[id=onboarding-vm-add-ip-prepare]}

{linkto(../../../../intro/onboarding/quick-start/create-vm#onboarding-create-vm)[text=Create]} a Linux-based virtual machine.

## {heading({counter(add-ip)}. Connect an external network to the VM)[id=onboarding-vm-add-ip-add-ext-net]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud Computing → Virtual Machines** section.
1. Select the desired VM and go to the **Networks** tab.
1. Click the **Add connection** button.
1. In the window that opens:

   - In the **Name** field, specify the network name.
   - In the **Network to connect** field, select **External network (ext-net)** or **External network (internet)**. An IP address will be automatically assigned to the virtual machine.
   - Set the other settings according to your requirements or leave them unchanged.

1. Click the **Save** button.

## {heading({counter(add-ip)}. Get information about the VM network interface configuration)[id=onboarding-vm-add-ip-net-config]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud Computing → Virtual Machines** section.
1. Click the name of the desired virtual machine.
1. Go to the **Networks** tab.
1. Write down the following network information:

   - the network and subnet name;
   - the subnet gateway, for example `90.156.219.254`;
   - the subnet CIDR, for example `90.156.216.0/22`;
   - the IP address, for example `90.156.216.96`;
   - the MAC address, for example `fa:16:3e:dd:cc:9b`.

## {heading({counter(add-ip)}. Configure the network interface in the VM operating system)[id=onboarding-vm-add-ip-net-interface]}

1. {linkto(../create-vm#includes-connect-to-vm)[text=Connect]} to the virtual machine console and log in.
1. Edit the `/etc/netplan/50-cloud-init.yaml` file to match the following:

    ```yaml
    network:
        ethernets:
            ens3: # Interface name
                dhcp4: false
                addresses:
                    - 90.156.216.96/22 # IP address + prefix from CIDR
                routes:
                    - to: 0.0.0.0/0
                      via: 90.156.219.254 # Gateway address
                nameservers:
                    addresses:
                        - 5.61.237.120
                        - 5.61.237.127
                match:
                    macaddress: fa:16:3e:dd:cc:9b # MAC address
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

## {heading({counter(add-ip)}. Check the network interface settings)[id=onboarding-vm-add-ip-check]}

1. {linkto(../create-vm#includes-connect-to-vm)[text=Connect]} to the virtual machine console and log in.
1. Run the command:

    ```console
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

   Find in the command output the name of the interface for which the `link\ether` parameter matches the MAC address obtained earlier.
   In this example, it will be `ens3`.

1. Run the command, substituting the interface name obtained in the previous step:

    ```console
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

    The output must contain:

   - Interface state information: `state UP`.
   - The virtual machine IP address combined with the `/24` prefix from the subnet CIDR in the `inet` parameter (`10.0.0.5/24`).

1. Run the command:

    ```console
    ip route show default
    ```

   Example output:

    ```text
    default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
    ```

   Make sure the output contains:

   - The gateway IP address (`via 10.0.0.1`).
   - The interface name obtained earlier (`dev ens3`).
   - The private IP address of the virtual machine (`src 10.0.0.5`).

   If the output of the `ip address show` and `ip route show` commands contains the listed information, the network interface settings are correct.

## {heading(Delete unused resources)[id=onboarding-vm-add-ip-delete]}

A running VM consumes computing resources. If you no longer need it:

- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=stop]} it to use it later;
- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} it permanently.