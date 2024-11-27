[Service network](/en/networks/vnet/concepts/net-types#service_net) allows you to work with the Cloud Storage service without Internet access. You can connect servers to object storage that are in a private network or connected to VK Cloud via [Direct Connect](/en/networks/directconnect).

The article shows an example of setting up a service network to access Cloud Storage from a VM.

To simplify the setup, the VM will be connected to a public network to have access via SSH. Connection to the service network can be configured without SSH access. In this case, all settings are made via the VNC console.

<info>

If you configure a connection to the service network via Direct Connect, access to the VM via SSH is available without a public network.

</info>

## Before you start

1. Contact [technical support]((mailto:support@mcs.mail.ru)) to add the service network to your project.

   Write down the network name and IP address. In this example, `s3-ephn` and `198.18.0.0/20`.

1. [Create a bucket](/en/storage/s3/service-management/buckets/create-bucket) in the Cloud Storage service, if you haven't  done it already.
1. [Create an account](/ru/storage/s3/service-management/access-management/access-keys "change-lang") in the Cloud Storage service, if you haven't done it already. Save the key ID and secret key.
1. Prepare the VM you want to connect to Cloud Storage:

   1. [Create a VM](/en/computing/iaas/service-management/vm/vm-create) with the following parameters:

      - **Operating system**: in this example, Ubuntu is used. You can use another OS, but the network settings in it will be different.
      - **Network**: any network with internet access.
      - **Firewall settings**: `default`, `ssh`.
      - **Assign external IP**: enable the option.
      - **Use Backup**: disable the option to save money.
      - Choose other settings as you wish.
   1. [Connect](/en/computing/iaas/service-management/vm/vm-add-net#connecting_the_network_to_the_vm) the service network to the VM. Select the service network that was added to your project. In this example, `s3-ephn`. Leave other parameters by default.
   1. Find the IP and MAC addresses of the service network connection on the **Networks** tab. Write them down. In this example, `198.18.14.1` and `fa:16:3e:d8:86:43`.
   1. [Connect](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix) to the VM via SSH.
   1. Update packages to the latest version and reboot the VM using the commands:

      ```bash
      sudo apt update && sudo apt upgrade -y
      sudo reboot
      ```

   1. (Optional) Install the [Netplan](https://www.altlinux.org/Netplan) utility to work with network settings. In virtual machines with Ubuntu 18 and above, this utility is installed by default.
   1. [Configure AWS CLI](/en/storage/s3/connect/s3-cli) to work with Cloud Storage.

## 1. Configure connection to service network

After connecting the service network to the VM, it will have a new network interface. There is no DHCP in the service network, so the interface must be configured manually.

To configure the VM network interface directed to the service network:

1. Open a terminal session with the VM and get root user rights:

    ```bash
   sudo bash
   ```

1. View the list of VM network interfaces:

    ```bash
    ip a
    ```

    In the list, find the interface whose MAC address matches the MAC address of the service network connection interface in your management console.

    Example response:

    ```bash
    ens7: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether fa:16:3e:d8:86:43 brd ff:ff:ff:ff:ff:ff
    altname enp0s7
    ```
1. Create a new network interface configuration file for Netplan:

    ```bash
    nano /etc/netplan/service.yaml
    ```

1. Specify and save the following network settings in the configuration file:

    ```yaml
    network:
    version: 2
    ethernets:
      ens7:
        addresses:
        - 198.18.14.1/20
        match:
          macaddress: fa:16:3e:d8:86:43
        mtu: 1500
        set-name: ens7
    ```

    Here:

      - `ens7` is the name of the VM interface that is directed to the service network.
      - `addresses` is the IP address of the service network.
      - `macaddress` is the MAC address of the service network.

1. Apply the settings by running the command:

    ```bash
    netplan apply
    ```

1. Redirect the Cloud Storage traffic through the service network. To do this, specify the correspondence between the service domain and its IP address in the service network:

   1. Open the `hosts` file:

      ```bash
      nano /etc/hosts
      ```

   1. Add a line to the file and save the changes:

      ```txt
      198.18.0.1 hb.ru-msk.vkcloud-storage.ru
      ```

   1. Check that the connection to Cloud Storage is established via the service network:

      ```bash
      curl hb.ru-msk.vkcloud-storage.ru -v
      ```

      The response should contain the line:

      ```bash
      Connected to hb.ru-msk.vkcloud-storage.ru (198.18.0.1) port 80 (#0)
      ```

## 2. (Optional) Disable public network

If you no longer need access to the VM via SSH, [disable](/en/computing/iaas/service-management/vm/vm-add-net#deleting_a_vm_network) the network with Internet access that was added when creating the VM.

## 3. Check connection to Cloud Storage

1. Connect to the VM:

   - [Via the VNC console](/ru/computing/iaas/service-management/vm/vm-console), if the public network was disabled.
   - [Via SSH](/ru/computing/iaas/service-management/vm/vm-connect/vm-connect-nix), if the public network was not disabled.

1. Run the command:

    ```bash
    aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    Here `--endpoint-url` is the Cloud Storage service domain, it should match the [region](/en/tools-for-using-services/account/concepts/regions) of the account. Possible values:

      - `https://hb.ru-msk.vkcloud-storage.ru` is the Moscow region domain.
      - `https://hb.kz-ast.bizmrg.com` is the Kazakhstan region domain.

The response should return a list of the Cloud Storage buckets.

## Delete unused resources

If you no longer need the created resources, delete them:

1. [Delete](/en/computing/iaas/service-management/vm/vm-manage#delete_vm) the virtual machine.
1. [Delete](/en/networks/vnet/service-management/net#deleting_network) the networks in which the VM was placed.
