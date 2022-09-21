In this article, we will look at how to install standalone MySQL, create a database user and configure its rights.

## Hardware configuration

- Ubuntu Server 18.04 LTS x86_64.

## How to save time installing MySQL

[Use](https://mcs.mail.ru/databases/) our turnkey cloud solution based on MySQL DBMS. When you sign up, you get a free bonus account, which is enough to work for several days.

## About MySQL

MySQL is a widely used and high performance SQL database. Today they distinguish:

- Oracle MySQL - a database from Oracle, which once bought out MySQL.
- [MariaDB](https://ru.wikipedia.org/wiki/MariaDB) — after the purchase of MySQL by Oracle, some of the developers founded MariaDB Corporation and started developing their own version of MySQL, free from Oracle licensing restrictions. MariaDB comes in various Linux distributions, including Debian and Ubuntu.
- Percona Server for MySQL is a Percona product with an emphasis on stability, performance and clustering. Other advantages include the possibility of multimaster replication and a host of additional utilities (eg Xtrabackup) that speed up the backup/restore process.

Next, consider the installation using the example of Percona Server for MySQL.

## Install Standalone MySQL

1. Log in to the Ubuntu 18.04 server.
2. Update the repository lists:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
```

3. Install additional packages:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install -y gnupg2
```

4. Download the installation deb package, which contains the `percona-release` utility, which allows you to select the server type and branch (mysql 5.7, mysql 8, mysql cluster 5.7, and so on):

```
ubuntu@ubuntu-standard-2-4-40gb:~$ wget https://repo.percona.com/apt/percona-release_latest.$(lsb_release -sc)_all.deb
--2020-02-13 11:57:32--
```

5. Install the downloaded deb package:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo dpkg -i percona-release_latest.$(lsb_release -sc)_all.deb
Selecting previously unselected package percona-release.
(Reading database ... 46568 files and directories currently installed.)
Preparing to unpack percona-release_latest.bionic_all.deb ...
Unpacking percona-release (1.0-14.generic) ...
Setting up percona-release (1.0-14.generic) ...
\* Enabling the Percona Original repository
<\*> All done!
==> Please run "apt-get update" to apply changes
The percona-release package now contains a percona-release script that can enable additional repositories for our newer products.

For example, to enable the Percona Server 8.0 repository use:

  percona-release setup ps80

Note: To avoid conflicts with older product versions, the percona-release setup command may disable our original repository for some products.

For more information, please visit:
https://www.percona.com/doc/percona-repo-config/percona-release.html
```

6. Select the MySQL branch (in our example, mysql 8):

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo percona-release setup ps80
\* Disabling all Percona Repositories
\* Enabling the Percona Server 8.0 repository
\* Enabling the Percona Tools repository
```

7. Install the Percona MySQL server:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install percona-server-server
```

<info>

**Note**

Set MySQL root password and authorization plugin. Mysql 8 uses the new caching_sha2_password algorithm by default. If you want to ensure compatibility with previous versions of mysql, select mysql_native_password (Legacy Authentication Method).

</info>

8. Make sure the service is running and listening on ports:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep mysql
 7151? Ssl 0:25 /usr/sbin/mysqld
 7776 pts/0 S+ 0:00 grep --color=auto mysql
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep mysql
tcp6 0 0 :::3306 :::\* LISTEN 7151/mysqld
tcp6 0 0 :::33060 :::\* LISTEN 7151/mysqld
```

<warn>

**Attention**

By default, MySQL listens on all available interfaces.

This completes the installation. Next, consider an example of creating a database and a user, as well as granting access rights to the user.

</warn>

## Create database and user

1. Log in to mysql cli and create a database:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ mysql -uroot -p
Enter password:
Welcome to the MySQL monitor. Commands end with ; or\g.
Your MySQL connection id is 11
Server version: 8.0.18-9 Percona Server (GPL), Release '9', Revision '53e606f'

Copyright (c) 2009-2019 Percona LLC and/or its affiliates
Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database mybase;
Query OK, 1 row affected (0.03 sec)

mysql>
```

<info>

**Note**

When creating the database, provide the password you provided when installing the Percona MySQL server.

</info>

2. Create user myuser with password mypass:

```
mysql> create user 'myuser'@'%' identified by 'mypass';
Query OK, 0 rows affected (0.03 sec)

mysql>
```

<info>

**Note**

The @'%' characters after the username indicate access from any IP address.

</info>

3. Grant the user all access rights to the mybase database:

```
mysql> grant all privileges on mybase.\* to 'myuser'@'%';
Query OK, 0 rows affected (0.02 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

mysql>
```

4. Log in to mysql cli with myuser credentials:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ mysql -umyuser -pmypass
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor. Commands end with ; or\g.
Your MySQL connection id is 12
Server version: 8.0.18-9 Percona Server (GPL), Release '9', Revision '53e606f'


Copyright (c) 2009-2019 Percona LLC and/or its affiliates
Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.


Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.


Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


mysql> use mysql;
ERROR 1044 (42000): Access denied for user 'myuser'@'%' to database 'mysql'
mysql> use mybase
database changed
mysql>show tables;
Empty set (0.01 sec)


mysql>
```

As a result, the myuser user will only have access to the mybase database, not access to the mysql database.

## Granting network access

By default, the Percona MySQL server is available over the network. This can be checked from any other host:

```
root@ash:~# mysql -h <PERCONA_MYSQL_SERVER_IP> -umyuser -pmypass
Welcome to the MariaDB monitor. Commands end with ; or\g.
Your MySQL connection id is 13
Server version: 8.0.18-9 Percona Server (GPL), Release '9', Revision '53e606f'


Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.


Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


MySQL [(none)]>
```

For security reasons, to leave only local access to the database, in the `/etc/mysql/mysql.conf.d` directory, create a `bind-override.cnf` file with the following content:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo cat /etc/mysql/mysql.conf.d/bind-override.cnf
[mysqld]
bind-address = 127.0.0.1
mysqlx_bind_address = 127.0.0.1
```

Then restart Percona MySQL Server:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart mysql
```

And make sure the server only listens on `localhost`:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep mysql
tcp 0 0 127.0.0.1:3306 0.0.0.0:\* LISTEN8319/mysqld
tcp 0 127.0.0.1:33060 0.0.0.0:\* 8319/mysqld

```

## Feedback

Any problems or questions? [Write to us, we will be happy to help you](https://mcs.mail.ru/help/contact-us).
