В данной статье рассмотрим, как установить standalone [ClickHouse](https://ru.wikipedia.org/wiki/ClickHouse), создать пользователя базы данных, настроить права и сетевой доступ.

## Конфигурация оборудования

- Сервер Ubuntu 18.04 LTS x86_64.

## Как сэкономить время на установке ClickHouse

[Воспользуйтесь](https://mcs.mail.ru/databases/) нашим готовым облачным решением на базе СУБД ClickHouse. При регистрации вы получаете бесплатный бонусный счет, которого достаточно для работы в течение нескольких дней.

## Установка Standalone ClickHouse

1.  Авторизуйтесь на сервере Ubuntu 18.04.
2.  Обновите список репозиториев:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
```

3.  Установите дополнительные пакеты:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install -y wget
```

4.  Установите ClickHouse:

    1. Скачайте ключ репозитория ClickHouse:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ wget -O - https://repo.yandex.ru/clickhouse/CLICKHOUSE-KEY.GPG | sudo apt-key add -
    ```

    1. В список репозиториев добавьте репозиторий ClickHouse:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-add-repository "deb http://repo.yandex.ru/clickhouse/deb/stable/ main/"
    Ign:1 http://repo.yandex.ru/clickhouse/deb/stable main/ InRelease
    Hit:2 http://repo.yandex.ru/clickhouse/deb/stable main/ Release
    Get:3 http://security.ubuntu.com/ubuntu bionic-security InRelease [88.7 kB]
    Hit:5 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic InRelease
    Get:6 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]
    Get:7 http://MS1.clouds.archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]
    Fetched 252 kB in 1s (341 kB/s)
    Reading package lists... Done
    ```

    1. Установите сервер ClickHouse:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install clickhouse-client clickhouse-server
    ```

    При установке ClickHouse автоматически добавляется в список приложений, запускаемых автоматически.

    1. Введите пароль пользователя по умолчанию.
    1. Запустите сервер:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl start clickhouse-server
    ```

    1. Убедитесь, что сервер запущен и слушает localhost:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn  | grep clickhouse
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
    tcp6       0      0 ::1:8123                :::\*            
    LISTEN      21373/clickhouse-se

    ```

5.  Используя имя пользователя default и пароль, введенный при установке, проверьте подключение к базе данных:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ clickhouse-client --password
ClickHouse client version 20.1.4.14 (official build).
Password for user (default):
Connecting to localhost:9000 as user default.
Connected to ClickHouse server version 20.1.4 revision 54431.

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
