# {heading(Подключение к БД)[id=dbaas-connect]}

К БД развернутых в {var(cloud)} инстансов можно подключиться с помощью SDK.

{ifndef(public)}
Чтобы получить информацию для подключения:

1. {linkto(../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. В списке инстансов БД откройте настройки нужной БД, нажав на ее имя:

   * На вкладке **Информация** приведен внутренний и внешний IP-адрес.
   * На вкладке **Пользователи** приведено название БД и имя ее пользователя.

{note:info}
Пароль пользователя БД задается при {linkto(../instructions/create#dbaas-create)[text=создании БД]}. Возможность восстановления пароля не предусмотрена.
{/note}
{/ifndef}

{ifndef(private-pg, private-pg-pdf)}
## {heading(PostgreSQL)[id=dbaas-connect-postgresql]}
{/ifndef}

{ifdef(private-pg, private-pg-pdf)}
## {heading(PostgreSQL, Postgres Pro Standard, Postgres Pro Enterprise)[id=dbaas-connect-postgresql]}
{/ifdef}

{tabs}

{tab(PHP)}

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/ru/book.pgsql.php) библиотеку `php-pgsql`.
1. Подключитесь к базе данных с помощью функции `pg_connect()`:

   {ifdef(public)}
   ```php
   $conn = pg_connect("host=<IP-АДРЕС> dbname=<БД> user=<ПОЛЬЗОВАТЕЛЬ> password=<ПАРОЛЬ> sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>");
   ```
   {/ifdef}

   {ifndef(public)}
   ```php
   $conn = pg_connect("host=<IP-АДРЕС> dbname=<БД> user=<ПОЛЬЗОВАТЕЛЬ> password=<ПАРОЛЬ>");
   ```
   {/ifndef}

   Здесь:
   
   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

   {ifdef(public)}
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` — параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье {linkto(../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.
   {/ifdef}

Подробнее о подключении к PostgreSQL в PHP читайте в [документации](https://www.php.net/manual/ru/book.pgsql.php).

{/tab}

{tab(Python)}

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://www.psycopg.org/docs/install.html#quick-install) модуль `psycopg`.
1. Подключитесь к базе данных с помощью функции `connect()`:

   {ifdef(public)}
   ```python
   import psycopg2

   conn = psycopg2.connect("host=<IP-АДРЕС> dbname=<БД> user=<ПОЛЬЗОВАТЕЛЬ> password=<ПАРОЛЬ> sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>")
   ```
   {/ifdef}

   {ifndef(public)}
   ```python
   import psycopg2

   conn = psycopg2.connect("host=<IP-АДРЕС> dbname=<БД> user=<ПОЛЬЗОВАТЕЛЬ> password=<ПАРОЛЬ>")
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД;
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

   {ifdef(public)}
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` — параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье {linkto(../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.
   {/ifdef}

{/tab}

{tab(Ruby)}

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://www.rubydoc.info/gems/pg#how-to-install) библиотеку `pg`.
1. Подключитесь к БД с помощью функции `PGconn.connect()`:

   {ifdef(public)}
   ```ruby
   require "pg"

   conn = PGconn.connect(:host => '<IP-АДРЕС>', :dbname => '<БД>', :user='<ПОЛЬЗОВАТЕЛЬ>', :password => '<ПАРОЛЬ>', :sslmode => '<РЕЖИМ_ПОДКЛЮЧЕНИЯ>')
   ```
   {/ifdef}

   {ifndef(public)}
   ```ruby
   require "postgres"

   conn = PGconn.connect(:host => '<IP-АДРЕС>', :dbname => '<БД>', :user='<ПОЛЬЗОВАТЕЛЬ>', :password => '<ПАРОЛЬ>')
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

   {ifdef(public)}
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` — параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье {linkto(../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.
   {/ifdef}

{/tab}

{tab(JDBC)}

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлены.
1. [Установите](http://jdbc.postgresql.org/download/) JDBC-драйвер для PostgreSQL.
1. Подключитесь к базе данных с помощью функции `DriverManager.getConnection()`:

   {ifdef(public)}
   ```java
   import java.sql.*;

   Connection conn = DriverManager.getConnection("jdbc:postgresql://<IP-АДРЕС>/<БД>?sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>`", "<ПОЛЬЗОВАТЕЛЬ>", "<ПАРОЛЬ>");
   ```
   {/ifdef}

   {ifndef(public)}
   ```java
   Connection conn = DriverManager.getConnection("jdbc:postgresql://<IP-АДРЕС>/<БД>", "<ПОЛЬЗОВАТЕЛЬ>", "<ПАРОЛЬ>");
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   * `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

   {ifdef(public)}
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` — параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье {linkto(../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.
   {/ifdef}

{/tab}

{tab(Node.js)}

1. Убедитесь, что Node.js [установлен](https://nodejs.org/ru/download).
1. [Установите](https://node-postgres.com/) модули `node-postgres`.
1. Подключитесь к базе данных с помощью функции `pg.Client()`:

   {ifdef(public)}
   ```javascript
   var pg = require('pg');
   var conn = new pg.Client("postgres://<ПОЛЬЗОВАТЕЛЬ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>?sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>");
   ```
   {/ifdef}

   {ifndef(public)}
   ```js
   var pg = require('pg');
   var conn = new pg.Client("postgres://<ПОЛЬЗОВАТЕЛЬ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>");
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

   {ifdef(public)}
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` — параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье {linkto(../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.
   {/ifdef}

{/tab}

{tab(ODBC)}

1. [Установите](https://www.postgresql.org/ftp/odbc/versions/) драйвер ODBC.
1. Подключитесь к базе данных:

   {ifdef(public)}
   ```console
   Driver={PostgreSQL UNICODE}; Server="<IP-АДРЕС>"; Port=5432; Database="<БД>"; Uid="<ПОЛЬЗОВАТЕЛЬ>"; Pwd="<ПАРОЛЬ>"; Sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>;
   ```
   {/ifdef}

   {ifndef(public)}
   ```console
   Driver={PostgreSQL UNICODE}; Server="<IP-АДРЕС>"; Port=5432; Database="<БД>"; Uid="<ПОЛЬЗОВАТЕЛЬ>"; Pwd="<ПАРОЛЬ>";
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

   {ifdef(public)}
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` — параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье {linkto(../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.
   {/ifdef} 

{/tab}

{ifndef(public)}
{tab(Shell)}

```shell
psql -h <IP-АДРЕС> -p 5432 -d <БД> -U <ПОЛЬЗОВАТЕЛЬ> -W
```

Здесь:

* `<IP-АДРЕС>` — внутренний IP-адрес.
* `<БД>` — название БД.
* `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.

{/tab}
{/ifndef}

{/tabs}

{ifdef(public)}
## {heading(MySQL)[id=dbaas-connect-mysql]}

{tabs}

{tab(PHP)}

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/ru/book.mysql.php) библиотеку `php-mysql`.
1. Подключитесь к базе данных с помощью функции `mysqli_real_connect()`:

   ```php
   $conn = mysqli_init();

   mysqli_real_connect($conn, "<IP-АДРЕС>", "<ПОЛЬЗОВАТЕЛЬ>", "<ПАРОЛЬ>", "<БД>", "<ПОРТ>");
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3306`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к MySQL в PHP читайте в [документации](https://www.php.net/manual/ru/set.mysqlinfo.php).

{/tab}

{tab(Python)}

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://dev.mysql.com/doc/connector-python/en/) модуль `mysql.connector`.
1. Подключитесь к базе данных с помощью функции `mysql.connector.connect()`:

   ```python
   import mysql.connector

   conn = mysql.connector.connect(user="<ПОЛЬЗОВАТЕЛЬ>", password="<ПАРОЛЬ>", host="<IP-АДРЕС>", port=<ПОРТ>, database="<БД>")
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3306`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Ruby)}

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://rubygems.org/gems/mysql2/versions/0.5.2) модуль `mysql2`.
1. Создайте подключение с помощью класса `Mysql2::Client`:

   ```ruby
   require "mysql2"

   conn = Mysql2::Client.new(username: "<ПОЛЬЗОВАТЕЛЬ>", password: "<ПАРОЛЬ>", database: "<БД>", host: "<IP-АДРЕС>", port: <ПОРТ>)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3306`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(JDBC)}

1. Установите [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net).
1. [Установите](http://dev.mysql.com/downloads/connector/j/) JDBC-драйвер для MySQL.
1. Подключитесь к базе данных с помощью функции `DriverManager.getConnection()`:

   ```java
   import java.sql.*;

   DriverManager.getConnection("jdbc:mysql://<IP-АДРЕС>:<ПОРТ>/<БД>", <ПОЛЬЗОВАТЕЛЬ>, <ПАРОЛЬ>);
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3306`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Node.js)}

1. Установите [Node.js](https://nodejs.org/ru/download).
1. [Установите](https://github.com/mysqljs/mysql) модуль `mysql`.
1. Создайте подключение к базе данных с помощью метода `mysql.createConnection`:

   ```javascript
   var mysql = require('mysql')
   var conn = mysql.createConnection({
       host: "<IP-АДРЕС>",
       user: "<ПОЛЬЗОВАТЕЛЬ>",
       password: "<ПАРОЛЬ>",
       database: "<БД>",
       port: <ПОРТ>
   });
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3306`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(ODBC)}

1. [Установите](https://dev.mysql.com/downloads/connector/odbc/) драйвер ODBC.
1. Подключитесь к базе данных:

   ```console
   DRIVER={MySQL ODBC 5.3 UNICODE Driver}; Server="<IP-АДРЕС>"; Port=<ПОРТ>; Database="<БД>"; Uid="<ПОЛЬЗОВАТЕЛЬ>"; Pwd="<ПАРОЛЬ>";
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3306`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}
## {heading(Tarantool)[id=dbaas-connect-tarantool]}

{note:info}
К БД Tarantool можно подключиться как гостевой пользователь.
{/note}

{tabs}

{tab(PHP)}

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://github.com/tarantool-php/client#installation) библиотеку `tarantool/client`.
1. Подключитесь к базе данных с помощью метода `Client::fromDsn`:

   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   use Tarantool\Client\Client;
   $client = Client::fromDsn('tcp://<ПОЛЬЗОВАТЕЛЬ>:<ПАРОЛЬ>@<IP-АДРЕС>');
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в PHP читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_php/).

{/tab}

{tab(Python)}

1. [Установите](https://wiki.python.org/moin/BeginnersGuide/Download) Python.
1. [Установите](https://github.com/tarantool/tarantool-python#download-and-install) модуль `tarantool`.
1. Подключитесь к базе данных с помощью функции `tarantool.connect()`:

   ```python
   import tarantool

   connection = tarantool.connect("<IP-АДРЕС>", <ПОРТ>, user=<ПОЛЬЗОВАТЕЛЬ>, password=<ПАРОЛЬ>)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<ПОРТ>` — порт подключения, стандартный — `3301`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в Python читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_python/).

{/tab}

{tab(Java)}

1. Установите [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net).
1. [Установите](https://github.com/tarantool/cartridge-java/) Java-коннектор `cartridge-java`.
1. Подключитесь к базе данных с помощью функции `TarantoolClientFactory.createClient()`:

   ```java
   TarantoolClient<TarantoolTuple, TarantoolResult<TarantoolTuple>> client = TarantoolClientFactory.createClient()
       .withAddress("<IP-АДРЕС>")
       .withCredentials(container.getUsername("<ПОЛЬЗОВАТЕЛЬ>"), container.getPassword("<ПАРОЛЬ>"))
       .build();
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Shell)}

1. [Установите](https://www.tarantool.io/ru/download/os-installation/) Tarantool.
1. Подключитесь к базе данных:

   ```console
   tarantoolctl connect <ПОЛЬЗОВАТЕЛЬ>:<ПАРОЛЬ>@<IP-АДРЕС>
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Go)}

1. Убедитесь, что Go [установлен](https://go.dev/doc/install).
1. [Установите](https://github.com/tarantool/go-tarantool#installation) библиотеку `go-tarantool`.
1. Подключитесь к базе данных с помощью функции `tarantool.Connect()`:

   ```go
   import (
       "github.com/tarantool/go-tarantool"
   )

   opts := tarantool.Opts{
       User: "<ПОЛЬЗОВАТЕЛЬ>",
       Pass: "<ПАРОЛЬ>",
   }
   connection, err := tarantool.Connect("<IP-АДРЕС>", opts)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в Go читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_go/).

{/tab}

{/tabs}
{/ifdef}

## {heading(ClickHouse)[id=dbaas-connect-clickhouse]}

{tabs}

{tab(PHP)}

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/en/book.curl.php) `php-curl`.
1. [Установите](https://github.com/smi2/phpClickHouse) модуль `smi2/phpclickhouse`.
1. Подключитесь к базе данных:

   {ifdef(public)}
   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   $config = [
       'host' => '<IP-АДРЕС>',
       'port' => '<ПОРТ>',
       'username' => '<ПОЛЬЗОВАТЕЛЬ>',
       'password' => '<ПАРОЛЬ>'
   ];
   $db = new ClickHouseDB\Client($config);
   $db->database('<БД>');
   ```
   {/ifdef}

   {ifndef(public)}
   ```php
   composer require smi2/phpclickhouse

   $config = [
       'host' => '<IP-АДРЕС>',
       'port' => '<ПОРТ>',
       'username' => '<ПОЛЬЗОВАТЕЛЬ>',
       'password' => '<ПАРОЛЬ>'
   ];
   $db = new ClickHouseDB\Client($config);
   $db->database('<БД>');
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `8123`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Python)}

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://clickhouse-driver.readthedocs.io/en/latest/api.html) драйвер `clickhouse-driver`.
1. Подключитесь к базе данных с помощью класса `Connection`:

   ```python
   from clickhouse_driver.connection import Connection

   conn = Connection('<IP-АДРЕС>', port=8123, database='<БД>', user='<ПОЛЬЗОВАТЕЛЬ>', password='<ПАРОЛЬ>')
   ```

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Ruby)}

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://github.com/shlima/click_house) драйвер `ClickHouse`.
1. Подключитесь к базе данных с помощью класса `Connection`:

   {ifdef(public)}
   ```ruby
   require "clickhouse"

   conn = Clickhouse::Connection.new(:url => '<IP-АДРЕС>', :database => '<БД>', :username => '<ПОЛЬЗОВАТЕЛЬ>', :password => '<ПАРОЛЬ>')
   ```
   {/ifdef}

   {ifndef(public)}
   ```ruby
   require "clickhouse"

   conn = Clickhouse::Connection.new(:url => 'http://<IP-АДРЕС>:8123', :database => '<БД>', :username => '<ПОЛЬЗОВАТЕЛЬ>', :password => '<ПАРОЛЬ>')
   ```
   {/ifndef}

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(JDBC)}

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://github.com/ClickHouse/clickhouse-java) JDBC-драйвер для ClickHouse.
1. Создайте подключение с помощью класса `ClickHouseDataSource`:

   ```java
   import ru.yandex.clickhouse.ClickHouseDataSource;
   import ru.yandex.clickhouse.settings.ClickHouseProperties;

   ClickHouseProperties properties = new ClickHouseProperties().withCredentials(<ПОЛЬЗОВАТЕЛЬ>, <ПАРОЛЬ>);
   ClickHouseDataSource ds = new ClickHouseDataSource(String.format("jdbc:clickhouse://%s:%s/%s", "<IP-АДРЕС>", <ПОРТ>, "<БД>"), properties);
   ```

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `8123`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Node.js)}

1. [Установите](https://nodejs.org/ru/download) Node.js.
1. [Установите](https://clickhouse.com/docs/en/integrations/language-clients/nodejs) модуль `ClickHouse JS`.
1. Создайте объект подключения к БД:

   ```js
   const { ClickHouse } = require('clickhouse');

   const clickhouse = new ClickHouse({
    url: 'http://<IP-АДРЕС>',
    port: <ПОРТ>,
    database: '<БД>',
    basicAuth: {
           username: '<ПОЛЬЗОВАТЕЛЬ>',
           password: '<ПАРОЛЬ>',
       }
   });
   ```

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `8123`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(ODBC)}

1. [Установите](https://github.com/ClickHouse/clickhouse-odbc) ODBC-драйвер для ClickHouse.
1. Подключитесь к базе данных:

   ```console
   Driver={<ПУТЬ>}; Server="<IP-АДРЕС>"; Port=<ПОРТ>; Database="<БД>"; Uid="<ПОЛЬЗОВАТЕЛЬ>"; Pwd="<ПАРОЛЬ>";
   ```

   Здесь:

   - `<ПУТЬ>` — путь до ODBC-драйвера ClickHouse.

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<БД>` — имя БД.
   - `<ПОРТ>` — порт подключения, стандартный — `8123`.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{ifndef(public)}
{tab(Shell)}

```shell
clickhouse-client --host <IP-АДРЕС> --database <БД> --port 9000 --user <ПОЛЬЗОВАТЕЛЬ> --ask-password
```

Здесь:

* `<IP-АДРЕС>` — внутренний IP-адрес.
* `<БД>` — название БД.
* `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.

{/tab}
{/ifndef}

{/tabs}

{ifdef(public)}
## {heading(MongoDB)[id=dbaas-connect-mongodb]}

{tabs}

{tab(PHP)}

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/en/mongodb.tutorial.library.php) PHP-библиотеку для MongoDB.
1. Подключитесь к базе данных:

   ```php
   $manager = new MongoDB\Driver\Manager("mongodb://<IP-АДРЕС>/<БД>", array("username" => <ПОЛЬЗОВАТЕЛЬ>, "password" => <ПАРОЛЬ>));
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Python)}

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://www.mongodb.com/docs/drivers/pymongo/) драйвер `PyMongo`.
1. Подключитесь к базе данных с помощью функции `MongoClient`:

   ```python
   from pymongo import MongoClient

   client = MongoClient("mongodb://<ПОЛЬЗОВАТЕЛЬ>:<ПАРОЛЬ>@<IP-АДРЕС>")

   db = client[<БД>]
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(JDBC)}

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://www.mongodb.com/docs/atlas/data-federation/query/sql/drivers/jdbc/connect/) JDBC-драйвер для MongoDB.
1. Создайте подключение:

   ```java
   MongoCredential credential = MongoCredential.createCredential(<ПОЛЬЗОВАТЕЛЬ>, <БД>, <ПАРОЛЬ>.toCharArray());

   MongoClient mongoClient = new MongoClient(new ServerAddress(“<IP-АДРЕС>”), Arrays.asList(credential));

   MongoDatabase db = mongoClient.getDatabase(<БД>);
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{tab(Node.js)}

1. [Установите](https://nodejs.org/ru/download) Node.js.
1. [Установите](https://www.mongodb.com/docs/drivers/node/current/) драйвер для MongoDB.
1. Создайте объект подключения к БД:

   ```javascript
   var MongoClient = require('mongodb').MongoClient;

   MongoClient.connect("mongodb://<ПОЛЬЗОВАТЕЛЬ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>", function(err, db) {
       if(!err) {
           console.log("You are connected!");
       };
       db.close();
   });
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   - `<БД>` — имя БД.
   - `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя БД.
   - `<ПАРОЛЬ>` — пароль пользователя БД.

{/tab}

{/tabs}
{/ifdef}

## {heading(Redis)[id=dbaas-connect-redis]}

{tabs}

{tab(PHP)}

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://github.com/predis/predis) `predis`.
1. Подключитесь к базе данных:

   {ifdef(public)}
   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   Predis\Autoloader::register();

   $client = new Predis\Client('tcp://<IP-АДРЕС>');
   ```
   {/ifdef}

   {ifndef(public)}
   ```php
   require 'Predis/Autoloader.php';

   Predis\Autoloader::register();

   $client = new Predis\Client('tcp://<IP-АДРЕС>:6379');
   ```
   {/ifndef}

   {ifdef(public)}
   Здесь — `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   Здесь `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

{/tab}

{tab(Python)}

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://github.com/redis/redis-py) клиент `redis-py`.
1. Подключитесь к базе данных с помощью функции `redis.Redis`:

   ```python
   import redis

   conn = redis.Redis(host='<IP-АДРЕС>', port=<ПОРТ>, db=0)
   ```

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<ПОРТ>` — порт подключения, стандартный — `6379`.

Подробнее о подключении к Redis в Python читайте в [документации](https://redis.io/docs/clients/python/).

{/tab}

{tab(Ruby)}

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://www.rubydoc.info/gems/redis) драйвер `redis-rb`.
1. Подключитесь к базе данных с помощью функции `Redis.new`:

   ```ruby
   require "redis"

   conn = Redis.new(host: "<IP-АДРЕС>", port: <ПОРТ>, db: 0)
   ```

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<ПОРТ>` — порт подключения, стандартный — `6379`.

{/tab}

{tab(Java)}

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://github.com/redis/jedis) клиент `Jedis`.
1. Создайте подключение с помощью функции `Jedis`:

   ```java
   import redis.clients.jedis.Jedis;

   Jedis jedis = new Jedis("<IP-АДРЕС>");
   ```

   {ifdef(public)}
   Здесь `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   Здесь `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

{/tab}

{tab(Node.js)}

1. Убедитесь, что Node.js [установлен](https://nodejs.org/ru/download).
1. [Установите](https://github.com/redis/node-redis) клиент `node-redis`.
1. Подключитесь к БД с помощью функции `redis.createClient()`:

   ```javascript
   var redis = require("redis"),

   client = redis.createClient(<ПОРТ>, "<IP-АДРЕС>");
   ```

   Здесь:

   {ifdef(public)}
   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.
   {/ifdef}

   {ifndef(public)}
   - `<IP-АДРЕС>` — внутренний IP-адрес.
   {/ifndef}

   - `<ПОРТ>` — порт подключения, стандартный — `6379`.

Подробнее о подключении к Redis в Node.js читайте в [документации](https://redis.io/docs/clients/nodejs/).

{/tab}

{ifndef(public)}
{tab(Shell)}

```shell
redis-cli -h <IP-АДРЕС> -p 6379
```

Здесь `<IP-АДРЕС>` — внутренний IP-адрес.

{/tab}
{/ifndef}

{/tabs}