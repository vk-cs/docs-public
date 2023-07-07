This article describes how to install the LAMP stack on a Linux operating system - Debian 9.4.

The LAMP stack includes the Linux operating system, the Apache web server, the MySQL database management system, and a server-side scripting language for processing PHP dynamic content. All this is necessary to support dynamic sites and web applications.

## How to save time installing a LAMP stack

You can get a ready-made LAMP stack on Ubuntu 18.04 as a [configured VK Cloud virtual machine](https://mcs.mail.ru/app/services/marketplace/). When registering, you get a free bonus account, which is enough to test the server for several days.

To learn more about LAMP in the app store, go to [Help Center](https://mcs.mail.ru/help/quick-start/-lamp-stack-apachephp).

#### Requirements

- Operating system Debian version 9.4.
- A user with access to the sudo command.

## Installing and configuring the Apache web server

To install and perform initial configuration of the Apache web server:

1. Open a terminal window.
2. Update the lists of installation packages to the latest versions by running the command:

    ```
    sudo apt-get update
    ```

3. Install the latest version of the Apache web server and additional modules by running the command:

    ```
    sudo apt install apache2 apache2-utils
    ```

    Agree to install the Apache web server by answering Y(es).

4. Open the `apache2.conf` configuration file for editing by running the command:

    ```
    sudo nano /etc/apache2/apache2.conf
    ```

5. In the `apache2.conf` file:
    - At the end, add the line ServerName <IP address>, specifying the external IP address of the web server.
    - Save your changes using the keyboard shortcut CTRL+O.
    - Finish editing using the keyboard shortcut CTRL+X.
6. To check the configuration and current state of the Apache web server, run the command:

    ```
    sudo apache2ctl configtest
    ```

    If there are no errors, the following line will be displayed:

    ```
    Syntax OK
    ```

7. To apply the changes, restart the Apache web server by running the command:

    ```
    sudo systemctl restart apache2
    ```

8. To test the operation of the web server, launch a web browser and enter the IP address of the web server in the address bar.

If the installation and configuration of the Apache web server is successful, the following web server default page will be displayed:

![](./assets/1552419689585-1552419689585-png)

## MySQL database installation

To install and configure MySQL DBMS:

1. Open a terminal window.
2. Install the MySQL DBMS server by running the command:

    ```
    sudo apt-get install mysql-server
    ```

    Agree with the installation of the MySQL DBMS server by answering Y(es).

3. To make changes to the MySQL DBMS server configuration, use the command:

```
sudo mysql_secure_installation
```

This command runs the script to improve the security of the MySQL DBMS server. To set up security:

- Set a password for the root account.

It is recommended to use a strong password.

<warn>

**Attention**

The root user in this case refers exclusively to the MySQL DBMS and is not a Debian OS account.

</warn>

- If necessary, remove anonymous (anonymous) accounts that are created during installation of MySQL DBMS:

- Answer Y(es) to remove anonymous accounts.
- Answer N(o) if deleting anonymous accounts is not required.

These accounts are for database testing purposes only and can be deleted in most cases.

- If necessary, disable remote access to the MySQL DBMS for the root account:
  - Answer Y(es) to disable remote access.
  - Answer N(o) to allow remote access.
- If necessary, delete the test base (Test):
  - Answer Y(es) to remove the base Test.
  - Answer N(o) if you don't want to remove the Test base.

This database is created during installation of the MySQL DBMS server and is intended for testing purposes. Removing the Test database does not affect the operation of the system.

- В ответ на запрос на внесение изменений в СУБД MySQL и перезагрузку привилегий доступа к таблицам:
  - Ответьте Y(es) для внесения изменений и перезагрузки.
  - Ответьте N(o), если внесение изменений и перезагрузка не требуются.

## Установка PHP и дополнительных пакетов

Чтобы установить PHP и дополнительные пакеты, которые могут потребоваться для работы и настройки WordPress:

1.  Откройте окно терминала.
2.  Для установки PHP совместно с дополнительными пакетами используйте команду:

    ```
    sudo apt-get install php libapache2-mod-php php-cli php-mcrypt php-intl php-mysql php-curl php-gd php-soap php-xml php-zip php-readline php-opcache php-json
    ```

Чтобы выполнить установку, ответьте Y(es).

3.  Убедитесь, что веб-сервер Apache корректно отображает скрипты PHP. Для этого:

- Создайте файл `info.php`, выполнив команду:

```
sudo nano /var/www/html/info.php
```

- В файл `info.php` поместите текст:

```
<?php
    phpinfo();
?>
```

- Сохраните изменения, используя сочетание клавиш CTRL+O.
- Завершите редактирование, используя сочетание клавиш CTRL+X.
- В адресной строке браузера к адресу веб-сервера добавьте строку:

```
/info.php 
```

В результате должна отобразится примерно следующая страница:

![](./assets/1552945066673-1552945066673-png)

<warn>

**Внимание**

В целях безопасности после проверки системы рекомендуется удалить файл _info.php_, выполнив команду:

```
sudo rm /var/www/html/info.php
```

</warn>

## **Обратная связь**

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
