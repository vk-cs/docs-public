В данной статье рассмотрим, как установить standalone MySQL, создать пользователя базы данных и настроить его права.

Конфигурация оборудования
-------------------------

Сервер Ubuntu 18.04 LTS x86_64.

**Как сэкономить время на установке MySQL

****

Воспользуйтесь нашим готовым облачным решением на базе СУБД MySQL. При регистрации вы получаете бесплатный бонусный счет, которого достаточно для работы в течение нескольких дней.

**

**[**[**попробовать облачную СУБД MySQL**](https://mcs.mail.ru/databases/)**]**

О MySQL
-------

MySQL - широко используемая и высокопроизводительная база данных SQL. На сегодня различают:

*   **Oracle MySQL** - база данных от компании Oracle, которая однажды выкупила компанию MySQL.
*   **MariaDB** - после покупки компании MySQL компанией Oracle часть разработчиков  основала компанию MariaDB Corporation и занялась разработкой своей версии MySQL, свободной от лицензионных ограничений Oracle (подробнее [читайте тут](https://ru.wikipedia.org/wiki/MariaDB)). MariaDB поставляется в различных дистрибутивах Linux, в том числе Debian и Ubuntu.
*   **Percona Server for MySQL** - продукт компании Percona с акцентом на стабильность, производительность и работу в кластере. Среди прочих преимуществ - возможность multimaster репликации и масса дополнительных утилит (например, Xtrabackup), ускоряющих процесс резервного копирования/восстановления.

Далее рассмотрим установку на примере Percona Server for MySQL.

Установка Standalone MySQL
--------------------------

1.  Авторизуйтесь на сервере Ubuntu 18.04.
2.  Обновите списки репозиториев:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
```

3.  Установите дополнительные пакеты:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install -y gnupg2
```

4.  Скачайте установочный deb-пакет, который содержит утилиту percona-release, позволяющую выбрать тип сервера и ветку (mysql 5.7, mysql 8, mysql cluster 5.7 и так далее):

```
ubuntu@ubuntu-standard-2-4-40gb:~$ wget https://repo.percona.com/apt/percona-release_latest.$(lsb_release -sc)_all.deb
--2020-02-13 11:57:32--  
```

5.  Установите скачанный deb-пакет:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo dpkg -i percona-release_latest.$(lsb_release -sc)_all.deb
Selecting previously unselected package percona-release.
(Reading database ... 46568 files and directories currently installed.)
Preparing to unpack percona-release_latest.bionic_all.deb ...
Unpacking percona-release (1.0-14.generic) ...
Setting up percona-release (1.0-14.generic) ...
\* Enabling the Percona Original repository
<\*> All done!
==> Please run "apt-get update" to apply changes
The percona-release package now contains a percona-release script that can enable additional repositories for our newer products.

For example, to enable the Percona Server 8.0 repository use:

  percona-release setup ps80

Note: To avoid conflicts with older product versions, the percona-release setup command may disable our original repository for some products.

For more information, please visit:
  https://www.percona.com/doc/percona-repo-config/percona-release.html
```

6.  Выберите ветку MySQL (в нашем примере - mysql 8):

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo percona-release setup ps80
\* Disabling all Percona Repositories
\* Enabling the Percona Server 8.0 repository
\* Enabling the Percona Tools repository
```

7.  Установите сервер Percona MySQL:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install percona-server-server
```

**Примечание**

Установите root-пароль для MySQL и плагин авторизации. В mysql 8 по умолчанию используется новый алгоритм caching_sha2_password. Если необходимо обеспечить совместимость с предыдущими версиями mysql, выберите mysql_native_password (Legacy Authentication Method).

8.  Убедитесь, что сервис работает и слушает порты:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep mysql
 7151 ?        Ssl    0:25 /usr/sbin/mysqld
 7776 pts/0    S+     0:00 grep --color=auto mysql
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep mysql
tcp6       0      0 :::3306                 :::\*                    LISTEN      7151/mysqld
tcp6       0      0 :::33060                :::\*                    LISTEN      7151/mysqld
```

### **Внимание**

По умолчанию MySQL слушает все доступные интерфейсы.

На этом установка завершена. Далее рассмотрим пример создания базы данных и пользователя, а также предоставление прав доступа пользователю.

**Создание БД и пользователя** 
-------------------------------

1.  Авторизуйтесь в mysql cli и создайте базу данных:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ mysql -uroot -p
Enter password:
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 8.0.18-9 Percona Server (GPL), Release '9', Revision '53e606f'

Copyright (c) 2009-2019 Percona LLC and/or its affiliates
Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database mybase;
Query OK, 1 row affected (0.03 sec)

mysql>
```

**Примечание**

При создании базы данных укажите пароль, который вы указали при установке сервера Percona MySQL.

2.  Создайте пользователя myuser с паролем mypass:
    

```
mysql> create user 'myuser'@'%' identified by 'mypass';
Query OK, 0 rows affected (0.03 sec)

mysql>
```

  

**Примечание**

Символы @’%’ после имени пользователя указывают на возможность доступа с любого IP-адреса.

3.  Предоставьте пользователю все права доступа к базе данных mybase:
    

```
mysql> grant all privileges on mybase.\* to 'myuser'@'%';
Query OK, 0 rows affected (0.02 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

mysql>
```

4.  Авторизуйтесь в mysql cli с учетными данными пользователя myuser:
    

```
ubuntu@ubuntu-standard-2-4-40gb:~$ mysql -umyuser -pmypass
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.18-9 Percona Server (GPL), Release '9', Revision '53e606f'


Copyright (c) 2009-2019 Percona LLC and/or its affiliates
Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.


Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.


Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


mysql> use mysql;
ERROR 1044 (42000): Access denied for user 'myuser'@'%' to database 'mysql'
mysql> use mybase
Database changed
mysql> show tables;
Empty set (0.01 sec)


mysql>
```

В результате у пользователя myuser будет только доступ к базе mybase, доступа к базе mysql - не будет.

Предоставление сетевого доступа
-------------------------------

По умолчанию сервер Percona MySQL доступен по сети. Это можно проверить с любого другого хоста:

```
root@ash:~# mysql -h <PERCONA_MYSQL_SERVER_IP> -umyuser -pmypass
Welcome to the MariaDB monitor. Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 8.0.18-9 Percona Server (GPL), Release '9', Revision '53e606f'


Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.


Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


MySQL [(none)]>
```

Чтобы в целях безопасности оставить только локальный доступ к базе данных, в каталоге  /etc/mysql/mysql.conf.d создайте файл bind-override.cnf  со следующим содержимым:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo cat /etc/mysql/mysql.conf.d/bind-override.cnf
[mysqld]
bind-address = 127.0.0.1
mysqlx_bind_address             = 127.0.0.1
```

Затем перезапустите Percona MySQL Server:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart mysql
```

 И убедитесь, что  сервер слушает только localhost:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep mysql
tcp 0 0 127.0.0.1:3306 0.0.0.0:\* LISTEN 8319/mysqld
tcp        0      0 127.0.0.1:33060         0.0.0.0:\*               LISTEN      8319/mysqld

```

Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).