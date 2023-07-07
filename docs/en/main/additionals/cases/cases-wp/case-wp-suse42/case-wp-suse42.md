WordPress is the most popular web content management system (CMS). Many plug-ins have been created for this system, its community in the world is very extensive. To work with WordPress, you do not need special knowledge, everything is clear on an intuitive level.

## Requirements

- Operating system openSUSE version 42.3.
- A user with access to the sudo command.
- Installed LAMP stack.

If you don't already have the LAMP stack installed:

- You can get a ready-made LAMP stack in the cloud [as a configured virtual machine](https://mcs.mail.ru/app/services/marketplace/) on Ubuntu 18.04 and [install Wordpress on it](https://mcs .mail.ru/help/wordpress-on-linux/wordpress-ubuntu-18). When registering, you get a free bonus account, which is enough to test the server for several days.
- You can install the LAMP stack yourself. For information on how to install the LAMP stack on openSUSE 42.3, [read here](https://mcs.mail.ru/help/lamp-on-linux/lamp-opensuse-42).

## Configuring the MySQL DBMS (mariadb)

To get started with WordPress, you need to create and configure a dedicated MySQL database (mariadb). For this:

1. Open a terminal window.
2. To switch to the MySQL shell (mariadb), run the command:

```
sudo mysql -u root -p
```

Use the root account authentication, which is specific to the MySQL database.

3. Create a new database for Wordpress using the command:

```
CREATE DATABASE database_name;
```

For example:

```
CREATE DATABASE wordpress;
```

<warn>

**Attention!**

All MySQL commands must be followed by a semicolon.

</warn>

4. Create a user with full access rights to the created database and assign a password to it using the command:

```
CREATE USER username@localhost IDENTIFIED BY 'password';
```

For example:

```
CREATE USER wuser@localhost IDENTIFIED BY 'mypassword';
```

5. Grant the user the necessary privileges to create and modify database tables by running the command:

```
GRANT ALL PRIVILEGES ON dbasename.\* TO username@localhost;
```

For example:

```
GRANT ALL PRIVILEGES ON wordpress.\* TO wuser@localhost;
```

6. Update the granting of privileges to database tables by running the command:

```
FLUSH PRIVILEGES;
```

7. Exit the MySQL shell by running the command:

```
exit
```

## Preparing to Install WordPress

Before installing WordPress, do the following:

1. Open a terminal window.
2. In the operating system firewall for the apache service, open access to port 80. To do this:

- Open the SuSEfirewall2 file for editing by running the command:

```
sudo nano /etc/sysconfig/SuSEfirewall2
```

### Note.

To quickly search within a file, use the keyboard shortcut CTRL + W

- In the SuSEfirewall2 file, find the line:

```
FW_CONFIGURATIONS_EXT=""
```

And replace it with the line:

```
FW_CONFIGURATIONS_EXT="apache2"
```

- Save your changes using the keyboard shortcut CTRL+O.
- Finish editing using the keyboard shortcut CTRL+X.

3. Restart the firewall by running the command:

```
sudo systemctl restart SuSEfirewall2
```

4. Install additional PHP packages by running the command:

```
sudo zypper install libXpm4 libjpeg8 php7-bz2 php7-curl php7-gd php7-gettext php7-mbstring php7-openssl php7-zip pwgen
```

5. Change to your home directory by running the command:

```
cd ~
```

6. Create a temporary directory tempWR by running the command:

```
mkdir tempWP
```

7. Change to the tempWR directory by running the command:

```
cd ~/tempWP
```

8. Download the WordPress archive by running the command:

```
wget https://wordpress.org/latest.tar.gz
```

9. Unpack and copy the files from the current directory to the /srv/www/htdocs/ directory by running the command:

```
sudo tar zxvf ~/tempWP/latest.tar.gz -C /srv/www/htdocs
```

10. Remove the tempWP temporary directory by running the command:

```
sudo rm -Rf ~/tempWP
```

11. Navigate to the directory with the WordPress configuration files by running the command:

```
cd /srv/www/htdocs/wordpress
```

12. Rename the wp-config-sample.php file by running the command:

```
sudo mv wp-config-sample.php wp-config.php
```

13. Open the wp-config.php file for editing using the command:

```
sudo nano wp-config.php
```

14. In the wp-config.php file, find the following lines:

![](./assets/1555704465550-1555704465550-png)

15. Replace the default values ​​with the values ​​that you specified when configuring the MySQL DBMS

For example:

```
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wuser' );
define( 'DB_PASSWORD', 'mypassword' );
```

Then save your changes using the keyboard shortcut CTRL+O and finish editing using the keyboard shortcut CTRL+X.

16. Make the wwwrun user, under which the apache service runs, the owner of the root directory using the command:

```
sudo chown -R wwwrun /srv/www/htdocs/
```

17. Set permissions for files and folders in the root directory using the command:

```
sudo chmod -R 775 /srv/www/htdocs/
```

18. Restart the Apache web server by running the command:

```
sudo systemctl restart apache2
```

## Install WordPress

To install WordPress:

1. In the address bar of the browser, add the line to the external address of the web server:

```
/wordpress/wp-admin/install.php
```

2. Select the system language and click the **Continue** button:

**![](./assets/1555705461526-1555705461526-png)**

3. On the settings page:

- Choose your WordPress site name and username.
- A strong password will be generated by default. Use this password or enter a new one.

<warn>

**Attention!**

Using a weak password leads to a decrease in the network security of the site, so it is recommended to set a weak password only when working in test or demo mode.

</warn>

- Enter your email address.
- If necessary, adjust the visibility of the site for search engines.
- Click the **Install** **WordPress** button:

**![](./assets/1555705531629-1555705531629-png)**

4. Once Wordpress is installed, login:

**![](./assets/1555705599355-1555705599355-png)**

This will open the WordPress home page:

**![](./assets/1555705632823-1555705632823-png)**

## Feedback

Any problems or questions? [Write to us, we will be happy to help you](https://mcs.mail.ru/help/contact-us)!
