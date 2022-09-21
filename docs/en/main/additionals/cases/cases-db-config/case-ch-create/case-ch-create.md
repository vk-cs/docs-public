In this article, we'll look at how to install standalone [ClickHouse](https://ru.wikipedia.org/wiki/ClickHouse), create a database user, configure rights and network access.

## Hardware configuration

- Ubuntu Server 18.04 LTS x86_64.

## How to save time installing ClickHouse

[Use](https://mcs.mail.ru/databases/) our turnkey cloud solution based on ClickHouse DBMS. When you sign up, you get a free bonus account, which is enough to work for several days.

## Install Standalone ClickHouse

1. Log in to the Ubuntu 18.04 server.
2. Update the list of repositories:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
```

3. Install additional packages:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install -y wget
```

4. Install ClickHouse:

    1. Download the ClickHouse repository key:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ wget -O - https://repo.yandex.ru/clickhouse/CLICKHOUSE-KEY.GPG | sudo apt key add -
    ```

    1. Add the ClickHouse repository to the list of repositories:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-add-repository "deb http://repo.yandex.ru/clickhouse/deb/stable/main/"
    Ign:1 http://repo.yandex.ru/clickhouse/deb/stable main/ InRelease
    Hit:2 http://repo.yandex.ru/clickhouse/deb/stable main/ Release
    Get:3 http://security.ubuntu.com/ubuntu bionic-security InRelease [88.7 kB]
    Hit:5 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic InRelease
    Get:6 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]
    Get:7 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]
    Fetched 252 kB in 1s (341 kB/s)
    Reading package lists... Done
    ```

    1. Install the ClickHouse server:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install clickhouse-client clickhouse-server
    ```

    During installation, ClickHouse is automatically added to the list of applications that start automatically.

    1. Enter the default user password.
    1. Start the server:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl start clickhouse-server
    ```

    1. Make sure the server is running and listening to localhost:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep clickhouse
    tcp 0 0 127.0.0.1:9000 0.0.0.0:\*
    LISTEN 21373/clickhouse-se
    tcp 0 0 127.0.0.1:9009 0.0.0.0:\*
    LISTEN 21373/clickhouse-se
    tcp 0 0 127.0.0.1:8123 0.0.0.0:\*
    LISTEN 21373/clickhouse-se
    tcp6 0 0 ::1:9000 :::\*
    LISTEN 21373/clickhouse-se
    tcp6 0 0 ::1:9009 :::\*
    LISTEN 21373/clickhouse-se
    tcp6 0 0 ::1:8123 ::::\*
    LISTEN 21373/clickhouse-se

    ```

5. Using the username default and the password provided during installation, test the connection to the database:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ clickhouse-client --password
ClickHouse client version 20.1.4.14 (official build).
Password for user (default):
Connecting to localhost:9000 as user default.
Connected to ClickHouse server version 20.1.4 revision 54431.

ubuntu-standard-2-4-40gb :)
```

Установка завершена.

## Создание базы данных и настройка прав доступа

1.  Создайте базу данных mybase:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ clickhouse-client --password
ClickHouse client version 20.1.4.14 (official build).
Password for user (default):
Connecting to localhost:9000 as user default.
Connected to ClickHouse server version 20.1.4 revision 54431.

ubuntu-standard-2-4-40gb :) create database mybase

CREATE DATABASE mybase

Ok.

0 rows in set. Elapsed: 0.036 sec.

ubuntu-standard-2-4-40gb :)
```

2. Для настройки прав доступа на созданную базу данных в папке _/etc/clickhouse-server/users.d_ создайте файл _myuser.xmlс_ описанием прав доступа:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo cat /etc/clickhouse-server/users.d/myuser.xml
<yandex>
    <users>
    <myuser>
        <password>mypass</password>
        <networks>
            <ip>::/0</ip>
    </networks>
        <profile>default</profile>
        <quota>default</quota>
        <allow_databases>
            <database>mybase</database>
        </allow_databases>
    </myuser>
    </users>
</yandex>
```

В этом файле описан пользователь myuser с паролем mypass и доступом к базе данных mybase с любого IP-адреса.

3. Проверьте подключение с правами пользователя ОС Ubuntu:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ clickhouse-client --user myuser --password --database mybase
ClickHouse client version 20.1.4.14 (official build).
Password for user (myuser):
Connecting to database mybase at localhost:9000 as user myuser.
Connected to ClickHouse server version 20.1.4 revision 54431.

ubuntu-standard-2-4-40gb :)
```

## Настройка сетевого доступа

По умолчанию ClickHouse слушает только 127.0.0.1. Чтобы настроить сетевой доступ к серверу, в папке _/etc/clickhouse-server/config.d_ создайте конфигурационный файл _listen.xml_:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo cat /etc/clickhouse-server/config.d/listen.xml
<yandex>
    <listen_host>::</listen_host>
</yandex>
```

Перезапустите сервер:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart clickhouse-server
```

Убедитесь, что ClickHouse слушает сеть:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep clickhouse
tcp6 0 0 :::9000 :::\* LISTEN 22529/clickhouse-se
tcp6 0 0 :::9009 :::\* LISTEN 22529/clickhouse-se
tcp6 0 0 :::8123 :::\* LISTEN 22529/clickhouse-se
```

Теперь к серверу можно подключиться из внешней сети.

## Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
