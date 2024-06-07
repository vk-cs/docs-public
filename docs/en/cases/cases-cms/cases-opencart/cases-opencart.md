[OpenCart](https://www.opencart.com) is a platform for creating an online store. OpenCart is built on the MVC principle and can be installed on any web server with PHP and MySQL support.

This instruction will help you deploy OpenCart version 4.0.2.3 in the Ubuntu 22.04 operating system in VK Cloud, as well as configure a DNS record for domain name access. MySQL 8.0 Single configuration is used as a DBMS.

## Preparatory steps

1. [Register](/en/intro/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/service-management/net#creating_a_network) `network1` network with internet access and a subnet with the address `10.0.0.0/24`.
1. [Create VM](/en/base/iaas/service-management/vm/vm-create):

   - name: `Ubuntu_22_04_OpenCart`;
   - operating system: Ubuntu 22.04;
   - network: `network1` with subnet `10.0.0.0/24`;
   - assign a public IP address. The example will use `87.239.106.48`;
   - security groups (firewall settings): `default`, `ssh+www`.

1. [Create DB instance](/en/dbs/dbaas/service-management/create):

   - name: `MySQL-7313`;
   - DBMS: MySQL 8.0;
   - configuration type: Single;
   - network: `network1`;
   - DB name: `MySQL-9341`;
   - DB username: `user`;
   - DB password: `AN0r25e0ae4d626p`;

   In the example, the internal IP of the created instance: `10.0.0.7`.

1. [Create](/en/networks/dns/publicdns#creating_a_zone) DNS zone.

   <warn>

   Make sure that the DNS zone is delegated successfully and the NS records are configured correctly: the zone must have the status **NS records are configured correctly**.

   </warn>

1. [Create](/en/networks/dns/publicdns#adding_resource_records) an record in the selected zone:

   - record type: `A`;
   - name: for example, `site-opencart.example.vk.cloud`;
   - IP address: external VM address `87.239.106.48`.

1. (Optional) Check the name resolution to the IP address using the command `nslookup site-opencart.example.vk.cloud`. Output upon successful operation:

   ```bash
   Non-authoritative answer:
   Name:   site-opencart.example.vk.cloud
   Address: 87.239.106.48
   ```

## Install OpenCart on VM

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-nix) to the `Ubuntu_22_04_OpenCart` VM.
1. Update the packages to the current version and reboot the VM using the commands:

   ```bash
   sudo dnf update -y
   sudo systemctl reboot
   ```

1. Download the necessary repositories and start the web server:

   ```bash
   sudo apt install apache2 apache2-utils libapache2-mod-php php8.1 php8.1-cli php8.1-curl php8.1-fpm php8.1-gd php8.1-intl php8.1-mbstring php8.1-mysql php8.1-opcache php8.1-readline php8.1-soap php8.1-xml php8.1-xmlrpc php8.1-zip php-gd -y
   sudo systemctl enable apache2 --now
   ```

1. Download the OpenCart repository and deploy it in the `opencart` subdirectory on the running web server:

   ```bash
   cd ~
   wget https://github.com/opencart/opencart/archive/refs/tags/4.0.2.3.tar.gz
   tar xzf 4.0.2.3.tar.gz
   sudo cp -r opencart-4.0.2.3/upload /var/www/html/opencart
   sudo chown -R www-data:www-data /var/www/html/opencart
   sudo mv /var/www/html/opencart/config-dist.php /var/www/html/opencart/config.php
   sudo mv /var/www/html/opencart/admin/config-dist.php /var/www/html/opencart/admin/config.php
   ```

1. In the browser, enter the VM's public IP address with `/opencart`. In the current instruction it is `site-opencart.example.vk.cloud/opencart`.
1. In the installation wizard, read and accept the terms of the OpenCart license agreement.
1. At the “Pre-Installation” step, check that the VM is ready to install OpenCart — all checks must be completed successfully.
1. At the “Configuration” step, specify the parameters `MySQL-9341`:

   - **DB Driver**: `MySQLi`.
   - **Hostname**: `10.0.0.7`.
   - **Username**: `user`.
   - **Password**: `AN0r25e0ae4d626p`.
   - **Database**: `MySQL-9341`.
   - **Port**: `3306`.

    At the same step, specify the administrator credentials.

1. Wait for the installation to complete: the page **Installation complete** will appear.
1. (Optional) Customize OpenCart according to the recommendations of the software developer:

   1. Delete the `install` directory from the web server:

      ```bash
      sudo rm -rf /var/www/html/opencart/install
      ```

   1. Move the `storage` directory to `/var/www`:

      ```bash
      sudo mv /var/www/html/opencart/system/storage/ /var/www
      ```

   1. At configuration files `/var/www/html/opencart/config.php` and `/var/www/html/opencart/admin/config.php` replace:

      ```bash
      // source string
      define('DIR_STORAGE', DIR_SYSTEM . 'storage/');

      // replaced string
      define('DIR_STORAGE', '/var/www/storage/');
      ```

## 3. Check the functionality of OpenCart

In the browser, go to `http://site-opencart.example.vk.cloud/opencart/`. Upon successful installation, a page with a demo store will open.

![](assets/opencart_shop.png)

## Delete unused resources

Deployed virtual resources are charged. If you don't need them anymore:

- [Delete](/en/base/iaas/service-management/vm/vm-manage#deleting_a_vm) `Ubuntu_22_04_OpenCart` VM.
- [Delete](/en/dbs/dbaas/service-management/delete) `MySQL-9341` instance.
- If necessary, [delete](/en/networks/vnet/service-management/floating-ip#removing_floating_ip_address_from_the_project) `87.239.106.48` floating IP address.
- [Delete](/en/networks/dns/publicdns#deleting_resource_records) `site-opencart.example.vk.cloud` DNS record.
