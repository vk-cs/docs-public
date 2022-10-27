В данной статье рассмотрим, как установить standalone [PostgreSQL](https://ru.wikipedia.org/wiki/PostgreSQL) [](https://postgrespro.ru/about), создать пользователя базы данных, настроить права и сетевой доступ.

#### Конфигурация оборудования

- Сервер Ubuntu 18.04 LTS x86_64.

## Как сэкономить время на установке PostgreSQL

[Воспользуйтесь](https://mcs.mail.ru/databases/) нашим готовым облачным решением на базе СУБД PostgreSQL. При регистрации вы получаете бесплатный бонусный счет, которого достаточно для работы в течение нескольких дней.

## Установка Standalone PostgreSQL

1.  Авторизуйтесь на сервере Ubuntu 18.04.
1.  Обновите списки репозиториев:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
    ```

1.  По умолчанию в Ubuntu 18.04 в репозиториях располагается PostgreSQL версии 10. Выполните одно из действий:

    - Если этой версии достаточно, установите ее:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install postgresql
    ```

    - Чтобы установить актуальную версию PostgreSQL:
        - Скачайте ключ репозитория PostgreSQL:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
        OK
        ```

        - В список репозиториев добавьте репозиторий PostgreSQL:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-add-repository "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main"
        Hit:1 http://security.ubuntu.com/ubuntu bionic-security InRelease
        Get:2 http://apt.postgresql.org/pub/repos/apt bionic-pgdg InRelease [46.3 kB]
        Hit:3 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic InRelease
        Hit:4 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-updates InRelease
        Hit:5 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-backports InRelease
        Get:6 http://apt.postgresql.org/pub/repos/apt bionic-pgdg/main amd64 Packages [178 kB]
        Fetched 225 kB in 1s (217 kB/s)
        Reading package lists... Done
        ```

        - Посмотрите доступные версии сервера:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-cache search postgresql | grep "SQL database, version"
        postgresql-10 - object-relational SQL database, version 10 server
        postgresql-11 - object-relational SQL database, version 11 server
        postgresql-12 - object-relational SQL database, version 12 server
        postgresql-9.3 - object-relational SQL database, version 9.3 server
        postgresql-9.4 - object-relational SQL database, version 9.4 server
        postgresql-9.5 - object-relational SQL database, version 9.5 server
        postgresql-9.6 - object-relational SQL database, version 9.6 server
        ```

        - Установите актуальную версию (например, 12):

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install postgresql-12
        ```

4.  После установки убедитесь, что сервер запущен:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep postgres
 4430 ?        Ss     0:00 /usr/lib/postgresql/12/bin/postgres -D /var/lib/postgresql/12/main -c config_file=/etc/postgresql/12/main/postgresql.conf
 4441 ?        Ss     0:00 postgres: 12/main: checkpointer
 4442 ?        Ss     0:00 postgres: 12/main: background writer
 4443 ?        Ss     0:00 postgres: 12/main: walwriter
 4445 ?        Ss     0:00 postgres: 12/main: autovacuum launcher
 4447 ?        Ss     0:00 postgres: 12/main: stats collector
 4448 ?        Ss     0:00 postgres: 12/main: logical replication launcher
17694 pts/0    S+     0:00 grep --color=auto postgres
```

5.  Проверьте подключение к базе данных. По умолчанию для доступа пользователя к базе данных пароль не требуется:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo su - postgres
postgres@ubuntu-standard-2-4-40gb:~$ psql
psql (12.1 (Ubuntu 12.1-1.pgdg18.04+1))
Type "help" for help.

postgres=# \l
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
(3 rows)

postgres=# \q
```

Установка завершена.

## Создание базы данных и настройка прав доступа

1.  Создайте базу данных `mybase`:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo su - postgres
    postgres@ubuntu-standard-2-4-40gb:~$ psql
    psql (12.1 (Ubuntu 12.1-1.pgdg18.04+1))
    Type "help" for help.

    postgres=# create database mybase;
    CREATE DATABASE
    ```

2.  Создайте пользователя `myuser` с паролем `mypass`:

    ```
    postgres=# create user myuser with encrypted password 'mypass';
    CREATE ROLE
    ```

3.  Дайте пользователю права для доступа к базе данных `mybase`:

    ```
    postgres=# grant all privileges on database mybase to myuser;
    GRANT
    ```

4.  Проверьте подключение с правами пользователя ОС Ubuntu:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ psql -hlocalhost -Umyuser -W mybase
    Password:
    psql (12.1 (Ubuntu 12.1-1.pgdg18.04+1))
    SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
    Type "help" for help.

    mybase=>
    ```

## Настройка сетевого доступа

По умолчанию PostgreSQL слушает только `127.0.0.1`.

- Чтобы настроить сетевой доступ к серверу в файле `_/etc/postgresql/12/main/postgresql.conf_` найдите строку `_listen_addresses=_` и укажите следующее:

    ```
    #------------------------------------------------------------------------------
    # CONNECTIONS AND AUTHENTICATION
    #------------------------------------------------------------------------------

    # - Connection Settings -

    #listen_addresses = 'localhost'        # what IP address(es) to listen on;
                        # comma-separated list of addresses;
                        # defaults to 'localhost'; use '\*' for all
    listen_addresses = '\*'
    ```

- Чтобы дать пользователю `myuser` сетевой доступ к базе данных mybase с любого адреса после авторизации по md5-паролю, в конец файла `_etc/postgresql/12/main/pg_hba.conf_`  добавьте строку:

    ```
    # host       DATABASE  USER  ADDRESS  METHOD  [OPTIONS]
    host    mybase        myuser        0.0.0.0/0        md5
    ```

- Чтобы не прописывать в конфигурационный файл правила для каждого пользователя и базы данных,  разрешите авторизацию всех пользователей для доступа к любой базе данных, для доступа к которой у пользователя есть права , по md5-паролю. Для этого вместо предыдущей строки добавьте строку:

    ```
    # host       DATABASE  USER  ADDRESS  METHOD  [OPTIONS]
    host    all        all        0.0.0.0/0        md5
    ```

После изменения файла конфигурации, выполните проверку доступности базы данных:

1. Перезапустите PostgreSQL:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart postgresql.service
    ```

2. Убедитесь, что PostgreSQL слушает сеть:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep 5432
    tcp        0      0 0.0.0.0:5432            0.0.0.0:\*               LISTEN      18214/postgres
    tcp6       0      0 :::5432                 :::\*                    LISTEN      18214/postgres
    ```

3. Проверьте сетевое подключение к базе данных с другого компьютера:

    ```
    root@ash:~# psql -h <POSTGRESQL_SERVER_IP> -Umyuser -W mybase
    Password:
    psql (11.5 (Debian 11.5-1+deb10u1), server 12.1 (Ubuntu 12.1-1.pgdg18.04+1))
    WARNING: psql major version 11, server major version 12.
             Some psql features might not work.
    SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
    Type "help" for help.

    mybase=>
    ```

## Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
