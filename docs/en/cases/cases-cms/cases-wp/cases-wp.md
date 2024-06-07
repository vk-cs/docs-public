[WordPress](https://wordpress.org) is a content management system (CMS) written in PHP and using a MySQL database. Allows you to create blogs, websites or web applications.

This instruction will help you deploy the latest version of the WordPress CMS in the Almalinux 9 operating system in VK Cloud, as well as configure a DNS record for domain name access. MySQL 8.0 Single configuration is used as a DBMS.

## Preparatory steps

1. [Register](/en/intro/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/service-management/net#creating_a_network) `network1` network with internet access and a subnet with the address `10.0.0.0/24`.
1. [Create VM](/en/base/iaas/service-management/vm/vm-create):

   - name: `Almalinux_9_WP`;
   - operating system Almalinux 9;
   - network: `network1` with subnet `10.0.0.0/24`;
   - assign a public IP address. The example will use `212.233.95.135`;
   - security groups (firewall settings): `default`, `ssh+www`.

1. [Create DB instance](/en/dbs/dbaas/service-management/create):

   - name: `MySQL-9341`;
   - DBMS: MySQL 8.0;
   - configuration type: Single;
   - network: `network1`;
   - DB name: `wordpress-db`;
   - DB username: `wordpress`;
   - DB password: `AN0r25e0ae4d626p`;

   In the example, the internal IP of the created instance: `10.0.0.7`.

1. [Create](/en/networks/dns/publicdns#creating_a_zone) DNS zone.

   <warn>

   Make sure that the DNS zone is delegated successfully and the NS records are configured correctly: the zone must have the status **NS records are configured correctly**.

   </warn>

1. [Create](/en/networks/dns/publicdns#adding_resource_records) an record in the selected zone:

   - record type: `A`;
   - name: for example, `site-wp.example.vk.cloud`;
   - IP address: external VM address `212.233.95.135`.

1. (Optional) Check the name resolution to the IP address using the command `nslookup site-wp.example.vk.cloud`. Output upon successful operation:

   ```bash
   Non-authoritative answer:
   Name:   site-wp.example.vk.cloud
   Address: 212.233.95.135
   ```

## 2. Install WordPress on VM

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-nix) to the `Almalinux_9_WP` VM.
1. Update the packages to the current version and reboot the VM using the commands:

   ```bash
   sudo dnf update -y
   sudo systemctl reboot
   ```

1. Download the necessary repositories by sequentially executing the commands:

   ```bash
   sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y
   sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
   sudo dnf module enable php:remi-8.2 -y
   sudo dnf install wget httpd php php-mysqlnd php-gd php-intl php-bcmath php-pecl-zip -y
   ```

1. Launch the httpd daemon:

   ```bash
   sudo systemctl enable httpd.service --now
   ```

1. Download the WordPress CMS repository and deploy it on a running web server:

   ```bash
   sudo wget https://wordpress.org/latest.tar.gz
   sudo tar xzf latest.tar.gz -C /var/www/html/
   sudo chown -R apache:apache /var/www/html/wordpress/
   ```

1. Set the SELinux parameters for the correct operation of the web server:

   ```bash
   sudo setsebool -P httpd_can_network_connect on
   sudo setsebool -P httpd_unified on
   sudo setsebool -P httpd_enable_cgi on
   sudo setsebool -P httpd_builtin_scripting on
   ```

1. In the browser, enter the VM's public IP address with `/wordpress`. In the current instruction it is `site-wp.example.vk.cloud/wordpress`.
1. In the installation wizard, specify the English language and read the information about installing the CMS.
1. Specify the parameters `MySQL-9341`:

   - **Database name**: `wordpress-db`.
   - **Username**: `wordpress`.
   - **Password**: `AN0r25e0ae4d626p`.
   - **Database Host**: `10.0.0.7`.
   - **Table Prefix**: `wp_`

1. Specify the CMS credentials:

   - **Site Title**: `site-wp.example.vk.cloud`.
   - **Username**: `admin`.
   - **Password**: come up with an administrator password.
   - **Your Email**: specify the email address of the CMS administrator.

1. Click the **Install WordPress** button.

## 3. Check the functionality of WordPress

1. In the browser, go to `http://site-wp.example.vk.cloud/wordpress/`.
1. In the authorization window, enter the username and password of the CMS administrator.

The WordPress CMS admin panel opens.

## Delete unused resources

Deployed virtual resources are charged. If you don't need them anymore:

- [Delete](/en/base/iaas/service-management/vm/vm-manage#deleting_a_vm) `Almalinux_9_WP` VM.
- [Delete](/en/dbs/dbaas/service-management/delete) `MySQL-9341` instance.
- If necessary, [delete](/en/networks/vnet/service-management/floating-ip#removing_floating_ip_address_from_the_project) `212.233.95.135` floating IP address.
- [Delete](/en/networks/dns/publicdns#deleting_resource_records) `site-wp.example.vk.cloud` DNS record.
