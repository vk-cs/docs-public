ModX is an open source content management system. ModX is designed to create, edit and manage website content.

## Requirements

- Operating system Ubuntu version 18.04.
- A user with access to the sudo command.
- Installed LAMP stack.

If you don't already have the LAMP stack installed:

- You can get a ready-made LAMP stack in the cloud [as a configured virtual machine](https://mcs.mail.ru/app/services/marketplace/) on Ubuntu 18.04. When registering, you get a free bonus account, which is enough to test the server for several days.
- You can install the LAMP stack yourself. For information on how to install the LAMP stack on Ubuntu 18.04, [read here](https://mcs.mail.ru/help/lamp-setup/lamp-ubuntu-18).

## Preparing to install ModX

Before installing ModX:

1. Go to [https://modx.com/download](https://modx.com/download) and note the ModX version number:

![](./assets/1554800077324-1554800077324.png)

2. Open a terminal window.
3. Install the ZIP archiver by running the command:

```
sudo apt install unzip -y
```

4. Install additional PHP packages by running the command:

```
sudo apt-get install php-common php-mbstring php-xmlrpc php-ldap php-sqlite3 -y
```

5. Change to your home directory by running the command:

```
cd ~
```

6. Create a temporary directory tempMX by running the command:

```
mkdir tempMX
```

7. Change to the tempMX directory by running the command:

```
cd ~/tempMX
```

8. Download the ModX archive by running the command:

```
wget https://modx.s3.amazonaws.com/releases/<version>/modx-<version>.zip
```

For example:

```
wget https://modx.s3.amazonaws.com/releases/2.7.1/modx-2.7.1-p1.zip
```

9. Unpack the ModX archive by running the command:

```
sudo unzip modx-<version>.zip
```

For example:

```
sudo unzip modx-2.7.1-pl.zip
```

10. Move the files from the current directory to the /var/www/html/modx directory by running the command:

```
sudo cp -r modx-<version> /var/www/html/modx
```
For example:

```
sudo cp -r modx-2.7.1-pl /var/www/html/modx
```

11. Remove the tempMX temporary directory by running the command:

```
sudo rm -Rf ~/tempMX
```

12. Change the owner of directories and files in the root directory of the web server using the command:

```
sudo chown -R username:www-data /var/www/html/modx
```

where `username` is the sudo username, `www-data` is the group name
For example:

```
sudo chown -R www-data:www-data /var/www/html/modx
```

<warn>

**Attention**

To avoid Apache web server errors, use the default username www-data and the default group name www-data when running scripts.

</warn>

13. If you need to grant access to the files of the web server root directory to another user, include this user in the www-data group using the command:

```
sudo usermod -a -G www-data username
```

For example:

```
sudo usermod -a -G www-data mxuser
```

14. Set the permissions for files and folders in the root directory using the command:

```
sudo chmod -R 775 /var/www/html/modx
```

15. Create the configuration file modx.conf by running the command:

```
sudo nano /etc/apache2/sites-available/modx.conf
```

Add the following lines to this file:

```
<VirtualHost\*:80>
DocumentRoot /var/www/html/modx
ServerName <your web server's external IP address>
<Directory /var/www/html/modx/>
Options +FollowSymlinks
AllowOverride All
Require all granted
</Directory>
ErrorLog ${APACHE_LOG_DIR}/modx_error.log
CustomLog ${APACHE_LOG_DIR}/modx_access.log combined
</VirtualHost>
```

Save your changes using the keyboard shortcut CTRL+O and finish editing using the keyboard shortcut CTRL+X.

16. Disable the default site 000-default.conf by running the command:

```
sudo a2dissite 000-default.conf
```

17. Connect the new virtual host by running the command:

```
sudo a2ensite modx.conf
```

18. Enable the Apache rewrite module by running the command:

```
sudo a2enmod rewrite
```

19. Restart the Apache web server by running the command:

```
sudo systemctl reload apache2
```

## MySQL database setup

To get started with ModX, you need to create and configure a dedicated MySQL database. For this:

1. Open a terminal window.
2. To switch to the MySQL shell, run the command:

```
sudo mysql -u root -p
```

Use the root account authentication, which is specific to the MySQL database.

3. Create a new database for ModX using the command:

```
CREATE DATABASE database_name;
```

For example:

```
CREATE DATABASE modxdb;
```
<warn>

**Attention**

All MySQL commands must be followed by a semicolon.

</warn>

4. Create a user with full access rights to the created database and assign a password to it using the command:

```
CREATE USER username@localhost IDENTIFIED BY 'password';
```

For example:

```
CREATE USER mxuser@localhost IDENTIFIED BY 'mypassword';
```

5. Grant the user the privileges required to create and modify database tables by running the command:

```
GRANT ALL PRIVILEGES ON dbasename.\* TO username@localhost;
```

For example:

```
GRANT ALL PRIVILEGES ON modxdb.\* TO mxuser@localhost;
```

6. Update the granting of privileges to database tables by running the command:

```
FLUSH PRIVILEGES;
```

7. Exit the MySQL shell by running the command:

```
exit
```

## Install ModX

To install ModX in the address bar of a web browser, type:

```
http://<your web server's external IP address>/setup
```

As a result, the ModX installation wizard will be launched, follow its instructions:

1. Select the installation language:

![](./assets/1554806010157-1554806010157.png)

It is recommended to select English - **en**.

2. Click the **Next** button:

![](./assets/1554806296501-1554806296501.png)

3. Select installation options and click **Next**:

![](./assets/1554805874285-1554805874285.png)

4. Configure the database:

![](./assets/1554806322914-1554806322914.png)

Use the database username, password, and database name that you specified when setting up the MySQL DB. Other options are recommended to be left at their default values.

5. Check your MySQL database connection settings. Upon successful verification, the following line will be displayed:

```
Connecting to database server: Success!
```

6. Select connection encoding:

![](./assets/1554806432781-1554806432781.png)

It is recommended to use the parameters given in the example. Upon successful creation or selection from the database, the following line will be displayed:

```
Database check: Success!
```

7. Specify the data for creating a ModX administrator account and click the **Next** button:

![](./assets/1554806539101-1554806539101.png)

8. Make sure that all verification options have the status **OK** and click the **Install** button:

![](./assets/1554806612165-1554806612165.png)

9. If the ModX installation was successful, the installation report page will open. Review any messages or warnings that occurred during the installation process. Click the **Next** button to complete the installation:

![](./assets/1554806657027-1554806657027.png)

9. To authenticate and get started, click the **Login** button:

**![](./assets/1554808358007-1554808358007.png)**

10. Enter the username and password you provided when creating the ModX administrator account:

**![](./assets/1558300426818-1558300426817.jpeg)**

This will open the main ModX page:

![](./assets/1554808550477-1554808550477.png)
