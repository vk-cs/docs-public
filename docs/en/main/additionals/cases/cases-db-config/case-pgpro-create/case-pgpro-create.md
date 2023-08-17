В данной статье рассмотрим, как установить standalone [Postgres Pro](https://postgrespro.ru/about), создать пользователя базы данных, настроить права и сетевой доступ.

## Конфигурация оборудования

- Сервер Ubuntu 18.04 LTS x86_64.

## Установка Standalone Postgres Pro

1.  Авторизуйтесь на сервере Ubuntu 18.04.
1.  Обновите список репозиториев

    <info>

    **Примечание**

    Для получения адресов репозиториев Postgres Pro [зарегистрируйтесь на сайте](https://postgrespro.ru/).

    </info>

1.  Установите дополнительные пакеты:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install -y wget gnupg2 || sudo apt-get install -y gnupg
    ```

1. Установите Postgres Pro.
1. Скачайте ключ репозитория Postgres Pro:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ wget -O - http://repo.postgrespro.ru/keys/GPG-KEY-POSTGRESPRO | sudo apt-key add -
    ```

1. Добавьте в список репозиториев репозиторий Postgres Pro:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-add-repository "deb http://repo.postgrespro.ru//pgpro-archive/pgpro-12.1.1/ubuntu bionic main"
    Get:1 http://repo.postgrespro.ru//pgpro-archive/pgpro-12.1.1/ubuntu bionic InRelease [2826 B]
    Hit:2 http://security.ubuntu.com/ubuntu bionic-security InRelease
    Get:3 http://repo.postgrespro.ru//pgpro-archive/pgpro-12.1.1/ubuntu bionic/main amd64 Packages [9590 B]
    Hit:4 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic InRelease
    Hit:5 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-updates InRelease
    Get:6 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]
    Fetched 87.0 kB in 1s (126 kB/s)
    Reading package lists... Done
    ```

1. Установите сервер Postgres Pro:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install -y postgrespro-std-12-server
    ```

1. Выполните инициализацию базы данных:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo /opt/pgpro/std-12/bin/pg-setup initdb
    Initalizing database...
    OK
    ```

1. Добавьте сервер в список приложений, загружаемых автоматически:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo /opt/pgpro/std-12/bin/pg-setup service enable
    Synchronizing state of postgrespro-std-12.service with SysV service script with /lib/systemd/systemd-sysv-install.
    Executing: /lib/systemd/systemd-sysv-install enable postgrespro-std-12
    ```

1. Запустите сервер:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl start postgrespro-std-12.service
    ```

1. После установки убедитесь, что сервер запущен:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep postgres
    20151 ? Ss 0:00 /opt/pgpro/std-12/bin/postgres -D /var/lib/pgpro/std-12/data
    20175 ? Ss 0:00 postgres: logger
    20180 ? Ss 0:00 postgres: checkpointer
    20181 ? Ss 0:00 postgres: background writer
    20182 ? Ss 0:00 postgres: walwriter
    20183 ? Ss 0:00 postgres: autovacuum launcher
    20184 ? Ss 0:00 postgres: stats collector
    20185 ? Ss 0:00 postgres: logical replication launcher
    20189 pts/0    S+     0:00 grep --color=auto postgres

    ```

1. Обновите пути для использования Postgres Pro:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo /opt/pgpro/std-12/bin/pg-wrapper links update
    ```

1. Поверьте подключение к базе данных. По умолчанию для доступа к базе данных пользователю не требуется пароль:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo su - postgres
    postgres@ubuntu-standard-2-4-40gb:~$ psql
    psql (12.1)
    Type "help" for help.

    postgres=# \l
    List of databases
    Name | Owner | Encoding | Collate | Ctype | Access privileges
    -----------+----------+----------+-------------+---------+-----------------------
    postgres | postgres | UTF8 | C.UTF-8@icu | C.UTF-8 |
    template0 | postgres | UTF8 | C.UTF-8@icu | C.UTF-8 | =c/postgres +
    | | | | | postgres=CTc/postgres
    template1 | postgres | UTF8 | C.UTF-8@icu | C.UTF-8 | =c/postgres +
    | | | | | postgres=CTc/postgres
    (3 rows)

    postgres=# \q
    ```

Установка завершена.

## Создание базы данных и настройка прав доступа

1. Создайте базу данных `mybase`:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo su - postgres
    postgres@ubuntu-standard-2-4-40gb:~$ psql
    psql (12.1)
    Type "help" for help.

    postgres=# create database mybase;
    CREATE DATABASE
    ```

1. Создайте пользователя myuser c паролем mypass:

    ```
    postgres=# create user myuser with encrypted password 'mypass';
    CREATE ROLE
    ```

1. Дайте пользователю myuser права для доступа к базе данных mybase:

    ```
    postgres=# grant all privileges on database mybase to myuser;
    GRANT
    ```

1. Проверьте подключение для пользователя ОС Ubuntu:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ psql -hlocalhost -Umyuser -W mybase
    Password:
    psql (12.1)
    Type "help" for help.

    mybase=>
    ```

## Настройка сетевого доступа

По умолчанию Postgres Pro слушает только `127.0.0.1`. Чтобы настроить сетевой доступ к серверу:

1. Найдите файл `_/var/lib/pgpro/std-12/data/postgresql.conf_`.

1. Найдите строку `_listen_addresses=_` и добавьте следующее:

    ```
    #------------------------------------------------------------------------------
    # CONNECTIONS AND AUTHENTICATION
    #------------------------------------------------------------------------------

    # - Connection Settings -

    #listen_addresses = 'localhost' # what IP address(es) to listen on;
    # comma-separated list of addresses;
    # defaults to 'localhost'; use '\*' for all
    listen_addresses = '\*'
    ```

### Настройка доступа пользователя

Чтобы дать пользователю `myuser` сетевой доступ к базе данных `mybase` с любого адреса с авторизацией по md5-паролю:

1. Найдите файл `_/var/lib/pgpro/std-12/data/pg_hba.conf_`.

1. В конец файла добавьте строку:

    ```
    # host       DATABASE  USER  ADDRESS  METHOD  [OPTIONS]
    host    mybase        myuser        0.0.0.0/0        md5
    ```

Чтобы не прописывать в конфигурационный файл правила для каждого пользователя и базы данных,  разрешите авторизацию всех пользователей для доступа к любой базе данных, для доступа к которым у пользователя есть права, по md5-паролю. Для этого:

1. В конец файла `_/var/lib/pgpro/std-12/data/pg_hba.conf_` добавьте строку:

    ```
    # host       DATABASE  USER  ADDRESS  METHOD  [OPTIONS]
    host    all        all        0.0.0.0/0        md5
    ```

1. Перезапустите Postgres Pro:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart postgrespro-std-12.service
    ```

1. Убедитесь, что Postgres Pro слушает сеть:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep 5432
    tcp 0 0 0.0.0.0:5432 0.0.0.0:\* LISTEN 18214/postgres
    tcp6       0      0 :::5432                 :::\*                    LISTEN      18214/postgres
    ```

1. Проверьте сетевое подключение к базе данных с другого компьютера:

    ```
    root@ash:~# psql -h <POSTGRESQL_SERVER_IP> -Umyuser -W mybase
    Password:
    psql (11.5 (Debian 11.5-1+deb10u1), server 12.1)
    WARNING: psql major version 11, server major version 12.
            Some psql features might not work.
    Type "help" for help.


    mybase=>
    ```
