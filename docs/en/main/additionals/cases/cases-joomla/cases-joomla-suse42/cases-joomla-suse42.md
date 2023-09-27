Joomla! is a content management system (CMS) written in PHP and JavaScript and using the MySQL DBMS as a database storage. Joomla! offers native bootstrap, multilingual environment, many different extension modules, as well as high security. Joomla! distributed under the GNU/GPL license and can be used free of charge.

## Requirements

- Operating system openSUSE version 42.3.
- A user with access to the sudo command.
- Installed LAMP stack.

If you don't already have the LAMP stack installed:

- You can get a ready-made LAMP stack in the cloud [as a configured virtual machine](https://mcs.mail.ru/app/services/marketplace/) on Ubuntu 18.04 and [install Joomla! on it](/en/additionals/cases/cases-joomla/case-joomla-u18). When registering, you get a free bonus account, which is enough to test the server for several days.
- You can install the LAMP stack yourself. For information on how to install the LAMP stack on OpenSUSE 42.3, [read here](/en/additionals/cases/cases-lamp/lamp-suse42).

## Configuring the MySQL DBMS (mariadb)

To get started with Joomla!, you need to create and set up a dedicated MySQL database. For this:

1. Open a terminal window.
2. To switch to the MySQL shell (mariadb), run the command:

```
sudo mysql -u root -p
```

Use root authentication, which is exclusive to MySQL.

3. Create a database for Joomla! using the command:

```
CREATE DATABASE database_name;
```

For example:

```
CREATE DATABASE joomla;
```

<warn>

**Attention**

Each MySQL DBMS command must be followed by a semicolon.

</warn>

4. Create a user with full access rights to the created database and assign a password to it using the command:

```
CREATE USER username@localhost IDENTIFIED BY 'password';
```

For example:

```
CREATE USER [juser@localhost](mailto:juser@localhost) IDENTIFIED BY 'mypassword';
```

5. Grant the user the necessary privileges to create and modify database tables by running the command:

```
GRANT ALL PRIVILEGES ON dbasename.\* TO username@localhost;
```

For example:

```
GRANT ALL PRIVILEGES ON joomla.\* TO [juser@localhost](mailto:juser@localhost);
```

6. Update the granting of privileges to database tables by running the command:

```
FLUSH PRIVILEGES;
```

7. Exit the MySQL shell by running the command:

```
exit
```

## Preparing to install Joomla!

Before installing Joomla!:

1. Go to [website](https://github.com/joomla/joomla-cms/releases) and note the latest Joomla!

**![](./assets/1558687212640-1558687212640.jpeg)**

2. Open a terminal window.
3. In the OS firewall, open the apache service access to port 80. To do this, change the firewall configuration:

- Open the SUSEfirewall2 file for editing by running the command:

```
sudo nano /etc/sysconfig/SuSEfirewall2

```

- In the SUSEfirewall2 file, find the line:

```
FW_CONFIGURATIONS_EXT=""

```

and replace it with the line:

```
FW_CONFIGURATIONS_EXT="apache2"

```

- Save changes using CTRL+O and finish editing using CTRL+X.

4. Restart the SUSEfirewall2 firewall by running the command:

```
sudo systemctl restart SUSEfirewall2

```

5. Install additional PHP packages by running the command:

```
sudo zypper install php7-bz2 php7-curl php7-gd php7-gettext php7-mbstring php7-openssl php7-zip pwgen php7-zlib

```

6. Change to your home directory by running the command:

```
cd ~
```

7. Create a temporary directory `tempJL` by running the command:

```
mkdir tempJL
```

8. Change to the created directory by running the command:

```
cd ~/tempJL
```

9. Download the latest version of Joomla! by running the command:

```
wget https://github.com/joomla/joomla-cms/releases/download/<version number>/Joomla_<version number>-Stable-Full_Package.tar.gz
```

For example:

```
wget https://github.com/joomla/joomla-cms/releases/download/3.9.3/Joomla_3.9.3-Stable-Full_Package.tar.gz
```

10. Create a folder `/var/www/html/joomla` by running the command:

```
sudo mkdir /var/www/html/joomla
```

11. Unpack and move the files from the current directory to the `/var/www/html/Joomla` directory by running the command:

```
sudo tar -xvzf Joomla_<version number>-Stable-Full_Package.tar.gz -C /var/www/html/joomla
```

For example:

```
sudo tar -xvzf Joomla_3.9.3-Stable-Full_Package.tar.gz -C /var/www/html/joomla
```

12. Remove the temporary directory `tempJL` by running the command:

```
rm -Rf ~/tempJL
```

13. Make the `wwwrun` user, under which the apache service runs, the owner of the root directory using the command:

```
sudo chmod -R 775 /srv/www/htdocs/

```

14. To configure Joomla!, create a configuration file `/etc/apache2/conf.d/joomla.conf` by running the command:

```
sudo nano /etc/apache2/conf.d/joomla.conf

```

15. В файл `/etc/apache2/conf.d/joomla.conf` добавьте следующие строки:

```
<VirtualHost \*:80>
DirectoryIndex index.php
DocumentRoot /srv/www/htdocs/joomla
ServerName <внешний IP-адрес вашего веб-сервера>
<Directory /srv/www/htdocs/joomla>
Options FollowSymLinks
AllowOverride All
Require all granted
</Directory>
</VirtualHost>
```

Сохраните изменения, используя сочетания клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

16. Перезагрузите веб-сервер Apache, выполнив команду:

```
sudo systemctl restart apache2

```

## Установка Joomla!

Для установки Joomla! в адресной строке веб-браузера укажите:

```
http://<внешний IP-адрес веб-сервера>/joomla
```

Нажмите клавишу **Enter**. В результате будет запущен мастер установки Joomla!, следуйте его указаниям:

1.  На странице **Конфигурация сайта** укажите название сайта, информацию для учетной записи администратора и нажмите кнопку **Далее**:

**![](./assets/1558688277502-1558688277502.jpeg)**

2.  На странице **Конфигурация базы данных** укажите настройки базы данных и нажмите кнопку **Далее**:

**![](./assets/1558688313603-1558688313603.jpeg)**

<warn>

**Примечание**

В настройках базы данных укажите имя пользователя базы данных, пароль и имя базы данных, которые вы выбрали при настройке СУБД MySQL.

</warn>

3.  На последней странице проверьте выбранные параметры Joomla!, при необходимости отправьте их по электронной почте и нажмите кнопку **Установка**:

**![](./assets/1558688405324-1558688405324.jpeg)**

4.  Когда Joomla! будет установлена, отобразится страница с соответствующей информацией:

**![](./assets/1558688424040-1558688424040.jpeg)**

5.  Чтобы завершить установку Joomla!, удалите директорию Installation. Для этого нажмите кнопку **Удалить директорию Installation**.

6.  Для перехода на главную страницу вашего сайта нажмите кнопку **Сайт**.

**![](./assets/1558686971128-1558686971128.jpeg)**
