In this article, we will look at how to install standalone [PostgreSQL](https://ru.wikipedia.org/wiki/PostgreSQL) [](https://postgrespro.ru/about), create a database user, configure rights and network access .

#### Hardware configuration

- Ubuntu Server 18.04 LTS x86_64.

## How to save time installing PostgreSQL

[Use](https://mcs.mail.ru/databases/) our turnkey cloud solution based on PostgreSQL DBMS. When you sign up, you get a free bonus account, which is enough to work for several days.

## Install Standalone PostgreSQL

1. Log in to the Ubuntu 18.04 server.
1. Update the repository lists:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
    ```

1. By default, Ubuntu 18.04 repositories contain PostgreSQL version 10. Do one of the following:

    - If this version is sufficient, install it:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install postgresql
    ```

    - To install the latest version of PostgreSQL:
        - Download the PostgreSQL repository key:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt key add -
        OK
        ```

        - Add the PostgreSQL repository to the list of repositories:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-add-repository "deb http://apt.postgresql.org/pub/repos/apt/bionic-pgdg main"
        Hit:1 http://security.ubuntu.com/ubuntu bionic-security InRelease
        Get:2 http://apt.postgresql.org/pub/repos/apt bionic-pgdg InRelease [46.3 kB]
        Hit:3 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic InRelease
        Hit:4 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-updates InRelease
        Hit:5 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-backports InRelease
        Get:6 http://apt.postgresql.org/pub/repos/apt bionic-pgdg/main amd64 Packages [178 kB]
        Fetched 225 kB in 1s (217 kB/s)
        Reading package lists... Done
        ```

        - See available server versions:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-cache search postgresql | grep "SQL database, version"
        postgresql-10 - object-relational SQL database, version 10 server
        postgresql-11 - object-relational SQL database, version 11 server
        postgresql-12 - object-relational SQL database, version 12 server
        postgresql-9.3 - object-relational SQL database, version 9.3 server
        postgresql-9.4 - object-relational SQL database, version 9.4 server
        postgresql-9.5 - object-relational SQL database, version 9.5 server
        postgresql-9.6 - object-relational SQL database, version 9.6 server
        ```

        - Install the latest version (for example, 12):

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install postgresql-12
        ```

4. After installation, make sure the server is running:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep postgres
4430? Ss 0:00 /usr/lib/postgresql/12/bin/postgres -D /var/lib/postgresql/12/main -c config_file=/etc/postgresql/12/main/postgresql.conf
4441? Ss 0:00 postgres:12/main:checkpointer
4442? Ss 0:00 postgres:12/main:background writer
4443? Ss 0:00 postgres:12/main:walwriter
4445? Ss 0:00 postgres:12/main:autovacuum launcher
4447? Ss 0:00 postgres:12/main:stats collector
4448? Ss 0:00 postgres:12/main:logical replication launcher
17694 pts/0 S+ 0:00 grep --color=auto postgres
```

5. Check your database connection. By default, no password is required for user access to the database:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo su - postgres
postgres@ubuntu-standard-2-4-40gb:~$ psql
psql (12.1 (Ubuntu 12.1-1.pgdg18.04+1))
Type "help" for help.

postgres=# \l
List of databases
name | Owner | encoding | collate | ctype | Access rights
-----------+----------+----------+---------+------ ---+-----------------------
postgres | postgres | UTF8 | C.UTF-8 | C.UTF-8 |
template0 | postgres | UTF8 | C.UTF-8 | C.UTF-8 | =c/postgres +
| | | | | postgres=CTc/postgres
template1 | postgres | UTF8 | C.UTF-8 | C.UTF-8 | =c/postgres +
| | | | | postgres=CTc/postgres
(3 rows)

postgres=# \q
```

Installation completed.## Create database and set permissions

1. Create a database `mybase`:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo su - postgres
    postgres@ubuntu-standard-2-4-40gb:~$ psql
    psql (12.1 (Ubuntu 12.1-1.pgdg18.04+1))
    Type "help" for help.

    postgres=# create database mybase;
    CREATE DATABASE
    ```

2. Create user `myuser` with password `mypass`:

    ```
    postgres=# create user myuser with encrypted password 'mypass';
    CREATE ROLE
    ```

3. Give the user permissions to access the `mybase` database:

    ```
    postgres=# grant all privileges on database mybase to myuser;
    GRANT
    ```

4. Check the connection with Ubuntu OS user rights:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ psql -hlocalhost -Umyuser -W mybase
    Password:
    psql (12.1 (Ubuntu 12.1-1.pgdg18.04+1))
    SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
    Type "help" for help.

    mybase=>
    ```

## Set up network access

By default, PostgreSQL only listens on `127.0.0.1`.

- To configure network access to the server in the `_/etc/postgresql/12/main/postgresql.conf_` file, find the line `_listen_addresses=_` and specify the following:

    ```
    #---------------------------------------------------------------- ------------------------------
    # CONNECTIONS AND AUTHENTICATION
    #---------------------------------------------------------------- ------------------------------

    # - Connection Settings -

    #listen_addresses = 'localhost' # what IP address(es) to listen on;
    # comma-separated list of addresses;
    # defaults to 'localhost'; use '\*' for all
    listen_addresses = '\*'
    ```

- To give the user `myuser` network access to the mybase database from any address after authorization with an md5 password, add the following line to the end of the `_etc/postgresql/12/main/pg_hba.conf_` file:

    ```
    # host DATABASE USER ADDRESS METHOD [OPTIONS]
    host mybase myuser 0.0.0.0/0 md5
    ```

- In order not to write rules for each user and database in the configuration file, allow authorization of all users to access any database for which the user has rights to access, using an md5 password. To do this, instead of the previous line, add the line:

    ```
    # host DATABASE USER ADDRESS METHOD [OPTIONS]
    host all 0.0.0.0/0 md5
    ```

After changing the configuration file, check the availability of the database:

1. Restart PostgreSQL:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart postgresql.service
    ```

2. Make sure PostgreSQL is listening on the network:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep 5432
    tcp 0 0 0 0.0.0.0:5432 0.0.0.0:\* 18214/postgres
    tcp6 0 0 :::5432 18214/postgres
    ```

3. Check the network connection to the database from another computer:

    ```
    root@ash:~# psql -h <POSTGRESQL_SERVER_IP> -Umyuser -W mybase
    Password:
    psql (11.5 (Debian 11.5-1+deb10u1), server 12.1 (Ubuntu 12.1-1.pgdg18.04+1))
    WARNING: psql major version 11, server major version 12.
    Some psql features might not work.
    SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
    Type "help" for help.

    mybase=>
    ```
