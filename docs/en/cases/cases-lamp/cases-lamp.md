The LAMP stack includes a Linux operating system, an Apache web server, a MySQL database management system, and a server-side scripting language for processing dynamic PHP content. All this is used to support dynamic websites and web applications.

This instruction will help you deploy an Apache server in the Ubuntu 22.04 operating system in VK Cloud, install PHP, and configure a DNS record for domain name access. MySQL 8.0 Single configuration is used as a DBMS.

## Preparatory steps

1. [Register](/en/intro/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/service-management/net#creating_a_network) `network1` network with internet access and a subnet with the address `10.0.0.0/24`.
1. [Create VM](/en/base/iaas/service-management/vm/vm-create):

   - name: `Ubuntu_22_04_LAMP`;
   - flavor: `STD3-2-6`;
   - operating system: Ubuntu 22.04;
   - network: `network1` with subnet `10.0.0.0/24`;
   - assign a public IP address. The example will use `211.243.95.137`;
   - security groups (firewall settings): `default`, `ssh+www`.

1. [Create DB instance](/ru/dbs/dbaas/service-management/create/create-single-replica):

   - name: `MySQL-5864`;
   - DBMS: MySQL 8.0;
   - configuration type: Single;
   - network: `network1`.

   Choose the other parameters at your discretion.

   <info>

   Internal IP of the created instance: `10.0.0.7` — use it for further work with the stack.

   </info>

1. [Create](/en/networks/dns/publicdns#creating_a_zone) DNS zone.

   <warn>

   Make sure that the DNS zone is delegated successfully and the NS records are configured correctly: the zone must have the status **NS records are configured correctly**.

   </warn>

1. [Create](/en/networks/dns/publicdns#adding_resource_records) an record in the selected zone:

   - record type: `A`;
   - name: for example, `site-lamp.example.vk.cloud`;
   - IP address: external VM address `211.243.95.137`.

1. (Optional) Check the name resolution to the IP address using the command `nslookup site-lamp.example.vk.cloud`. Output upon successful operation:

   ```bash
   Non-authoritative answer:
   Name:   site-lamp.example.vk.cloud
   Address: 211.243.95.137
   ```

## 2. Install Apache and PHP on the VM

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-nix) to the `Ubuntu_22_04_LAMP` VM.
1. Update the packages to the current version and reboot the VM using the commands:

   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo reboot
   ```

1. Download the necessary repositories and start the web server:

   ```bash
   sudo apt install apache2 apache2-utils libapache2-mod-php php8.1 php8.1-cli php8.1-curl php8.1-fpm php8.1-gd php8.1-intl php8.1-mbstring php8.1-mysql php8.1-opcache php8.1-readline php8.1-soap php8.1-xml php8.1-xmlrpc php8.1-zip php-gd -y
   sudo systemctl enable apache2 --now
   ```

## 3. Check the performance of the web server

1. On the `Ubuntu_22_04_LAMP` VM create a file `/var/www/html/info.php` with content:

   ```php
   <?php
    phpinfo();
   ?>
   ```
1. In the browser, go to `http://site-lamp.example.vk.cloud/info.php`.

   A page opens with information about the installed version of PHP.

   ![](assets/php_info.png)

1. (Optional) Delete the file `/var/www/html/info.php` from a web server.

## Delete unused resources

Deployed virtual resources are charged. If you don't need them anymore:

- [Delete](/en/base/iaas/service-management/vm/vm-manage#deleting_a_vm) `Ubuntu_22_04_LAMP` VM.
- [Delete](/en/dbs/dbaas/service-management/delete) `MySQL-5864` instance.
- If necessary, [delete](/en/networks/vnet/service-management/floating-ip#removing_floating_ip_address_from_the_project) `211.243.95.137` floating IP address.
- [Delete](/en/networks/dns/publicdns#deleting_resource_records) `site-lamp.example.vk.cloud` DNS record.
