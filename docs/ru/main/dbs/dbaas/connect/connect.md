К БД развернутых в VK Cloud инстансов можно подключиться с помощью SDK.

## PostgreSQL

<tabs>
<tablist>
<tab>PHP</tab>
<tab>Python</tab>
<tab>Ruby</tab>
<tab>JDBC</tab>
<tab>Node.js</tab>
<tab>ODBC</tab>
</tablist>
<tabpanel>

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/ru/book.pgsql.php) библиотеку `php-pgsql`.
1. Подключитесь к базе данных с помощью функции `pg_connect()`:

   ```php
   $conn = pg_connect("host=<IP-ADDRESS> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>");
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

Подробнее о подключении к PostgreSQL в PHP читайте в [документации](https://www.php.net/manual/ru/book.pgsql.php).

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://www.psycopg.org/docs/install.html#quick-install) модуль `psycopg`.
1. Подключитесь к базе данных с помощью функции `connect()`:

   ```python
   import psycopg2

   conn = psycopg2.connect("host=<IP-ADDRESS> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>")
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://www.rubydoc.info/gems/pg#how-to-install) библиотеку `pg`.
1. Подключитесь к БД с помощью функции `PGconn.connect()`:

   ```ruby
   require "pg"

   conn = PGconn.connect(:host => '<IP-ADDRESS>', :dbname => '<DATABASE>', :user='<USERNAME>', :password => '<PASSWORD>')
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлены.
1. [Установите](http://jdbc.postgresql.org/download.html) JDBC-драйвер для PostgreSQL.
1. Подключитесь к базе данных с помощью функции `DriverManager.getConnection()`:

   ```java
   import java.sql.*;

   Connection conn = DriverManager.getConnection("jdbc:postgresql://<IP-ADDRESS>/<DATABASE>", "<USERNAME>", "<PASSWORD>");
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Node.js [установлен](https://nodejs.org/ru/download).
1. [Установите](https://node-postgres.com/) модули `node-postgres`.
1. Подключитесь к базе данных с помощью функции `pg.Client()`:

   ```javascript
   var pg = require('pg');
   var conn = new pg.Client("postgres://<USERNAME>:<PASSWORD>@<IP-ADDRESS>/<DATABASE>");
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://www.postgresql.org/ftp/odbc/versions/) драйвер ODBC.
1. Подключитесь к базе данных:

   ```bash
   Driver={PostgreSQL UNICODE}; Server="<IP-ADDRESS>"; Port=5432; Database="<DATABASE>"; Uid="<USERNAME>"; Pwd="<PASSWORD>";
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
</tabs>

## MySQL

<tabs>
<tablist>
<tab>PHP</tab>
<tab>Python</tab>
<tab>Ruby</tab>
<tab>JDBC</tab>
<tab>Node.js</tab>
<tab>ODBC</tab>
</tablist>
<tabpanel>

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/ru/book.mysql.php) библиотеку `php-mysql`.
1. Подключитесь к базе данных с помощью функции `mysqli_real_connect()`:

   ```php
   $conn = mysqli_init();

   mysqli_real_connect($conn, "<IP-ADDRESS>", "<USERNAME>", "<PASSWORD>", "<DATABASE>", <PORT>);
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `3306`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

Подробнее о подключении к MySQL в PHP читайте в [документации](https://www.php.net/manual/ru/set.mysqlinfo.php).

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://dev.mysql.com/doc/connector-python/en/) модуль `mysql.connector`.
1. Подключитесь к базе данных с помощью функции `mysql.connector.connect()`:

   ```python
   import mysql.connector

   conn = mysql.connector.connect(user="<USERNAME>", password="<PASSWORD>", host="<IP-ADDRESS>", port=<PORT>, database="<DATABASE>")
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `3306`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://rubygems.org/gems/mysql2/versions/0.5.2) модуль `mysql2`.
1. Создайте подключение с помощью класса `Mysql2::Client`:

   ```ruby
   require "mysql2"

   conn = Mysql2::Client.new(username: "<USERNAME>", password: "<PASSWORD>", database: "<DATABASE>", host: "<IP-ADDRESS>", port: <PORT>)
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `3306`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Установите [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net).
1. [Установите](http://dev.mysql.com/downloads/connector/j/) JDBC-драйвер для MySQL.
1. Подключитесь к базе данных с помощью функции `DriverManager.getConnection()`:

   ```java
   import java.sql.*;

   DriverManager.getConnection("jdbc:mysql://<IP-ADRESS>:<PORT>/<DATABASE>", <USERNAME>, <PASSWORD>);
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `3306`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Установите [Node.js](https://nodejs.org/ru/download).
1. [Установите](https://github.com/mysqljs/mysql) модуль `mysql`.
1. Создайте подключение к базе данных с помощью метода `mysql.createConnection`:

   ```javascript
   var mysql = require('mysql')
   var conn = mysql.createConnection({
       host: "<IP-ADDRESS>",
       user: "<USERNAME>",
       password: "<PASSWORD>",
       database: "<DATABASE>",
       port: <PORT>
   });
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `3306`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://dev.mysql.com/downloads/connector/odbc/) драйвер ODBC.
1. Подключитесь к базе данных:

   ```bash
   DRIVER={MySQL ODBC 5.3 UNICODE Driver}; Server="<IP-ADDRESS>"; Port=<PORT>; Database="<DATABASE>"; Uid="<USERNAME>"; Pwd="<PASSWORD>";
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `3306`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
</tabs>

## Tarantool

<info>

К БД Tarantool можно подключиться как гостевой пользователь.

</info>

<tabs>
<tablist>
<tab>PHP</tab>
<tab>Python</tab>
<tab>Java</tab>
<tab>Shell</tab>
<tab>Go</tab>
</tablist>
<tabpanel>

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://github.com/tarantool-php/client#installation) библиотеку `tarantool/client`.
1. Подключитесь к базе данных с помощью метода `Client::fromDsn`:

   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   use Tarantool\Client\Client;
   $client = Client::fromDsn('tcp://<USERNAME>:PASSWORD>@<IP-ADDRESS>');
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в PHP читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_php/).

</tabpanel>
<tabpanel>

1. [Установите](https://wiki.python.org/moin/BeginnersGuide/Download) Python.
1. [Установите](https://github.com/tarantool/tarantool-python#download-and-install) модуль `tarantool`.
1. Подключитесь к базе данных с помощью функции `tarantool.connect()`:

   ```python
   import tarantool

   connection = tarantool.connect("<IP-ADDRESS>", <PORT>, user=<USERNAME>, password=<PASSWORD>)
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<PORT>` — порт подключения, стандартный — `3301`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в Python читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_python/).

</tabpanel>
<tabpanel>

1. Установите [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net).
1. [Установите](https://github.com/tarantool/cartridge-java/) Java-коннектор `cartridge-java`.
1. Подключитесь к базе данных с помощью функции `TarantoolClientFactory.createClient()`:

   ```java
   TarantoolClient<TarantoolTuple, TarantoolResult<TarantoolTuple>> client = TarantoolClientFactory.createClient()
       .withAddress("<IP-ADDRESS>")
       .withCredentials(container.getUsername("<USERNAME>"), container.getPassword("<PASSWORD>"))
       .build();
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://www.tarantool.io/ru/download/os-installation/) Tarantool.
1. Подключитесь к базе данных:

   ```bash
   tarantoolctl connect <USERNAME>:<PASSWORD>@<IP-ADDRESS>
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Go [установлен](https://go.dev/doc/install).
1. [Установите](https://github.com/tarantool/go-tarantool#installation) библиотеку `go-tarantool`.
1. Подключитесь к базе данных с помощью функции `tarantool.Connect()`:

   ```go
   import (
       "github.com/tarantool/go-tarantool"
   )

   opts := tarantool.Opts{
       User: "<USERNAME>",
       Pass: "<PASSWORD>",
   }
   connection, err := tarantool.Connect("<IP-ADDRESS>", opts)
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в Go читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_go/).

</tabpanel>
</tabs>

## ClickHouse

<tabs>
<tablist>
<tab>PHP</tab>
<tab>Python</tab>
<tab>Ruby</tab>
<tab>JDBC</tab>
<tab>Node.js</tab>
<tab>ODBC</tab>
</tablist>
<tabpanel>

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/en/book.curl.php) `php-curl`.
1. [Установите](https://github.com/smi2/phpClickHouse) модуль `smi2/phpclickhouse`.
1. Подключитесь к базе данных:

   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   $config = [
       'host' => '<IP-ADDRESS>',
       'port' => '<PORT>',
       'username' => '<USERNAME>',
       'password' => '<PASSWORD>'
   ];
   $db = new ClickHouseDB\Client($config);
   $db->database('<DATABASE>');
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `8123`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://clickhouse-driver.readthedocs.io/en/latest/api.html) драйвер `clickhouse-driver`.
1. Подключитесь к базе данных с помощью класса `Connection`:

   ```python
   from clickhouse_driver.connection import Connection

   conn = Connection('<IP-ADDRESS>', port=8123, database='<DATABASE>', user='<USERNAME>', password='<PASSWORD>')
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://github.com/shlima/click_house) драйвер `ClickHouse`.
1. Подключитесь к базе данных с помощью класса `Connection`:

   ```ruby
   require "clickhouse"

   conn = Clickhouse::Connection.new(:url => '<IP-ADDRESS>', :database => '<DATABASE>', :username => '<USERNAME>', :password => '<PASSWORD>')
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://github.com/ClickHouse/clickhouse-java) JDBC-драйвер для ClickHouse.
1. Создайте подключение с помощью класса `ClickHouseDataSource`:

   ```java
   import ru.yandex.clickhouse.ClickHouseDataSource;
   import ru.yandex.clickhouse.settings.ClickHouseProperties;

   ClickHouseProperties properties = new ClickHouseProperties().withCredentials(<USERNAME>, <PASSWORD>);
   ClickHouseDataSource ds = new ClickHouseDataSource(String.format("jdbc:clickhouse://%s:%s/%s", “<IP-ADDRESS>”, <PORT>, <DATABASE>), properties);
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `8123`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://nodejs.org/ru/download) Node.js.
1. [Установите](https://clickhouse.com/docs/en/integrations/language-clients/nodejs) модуль `ClickHouse JS`.
1. Создайте объект подключения к БД:

   ```javascript
   const { ClickHouse } = require('clickhouse');

   const clickhouse = new ClickHouse({
    url: '<IP-ADDRESS>',
    port: <PORT>,
    database: '<DATABASE>',
    basicAuth: {
           username: '<USERNAME>',
           password: '<PASSWORD>',
       }
   });
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `8123`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://github.com/ClickHouse/clickhouse-odbc) ODBC-драйвер для ClickHouse.
1. Подключитесь к базе данных:

   ```bash
   Driver={PATH_OF_CLICKHOUSE_ODBC_SO}; Server="<IP-ADDRESS>"; Port=<PORT>; Database="<DATABASE>"; Uid="<USERNAME>"; Pwd="<PASSWORD>";
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<PORT>` — порт подключения, стандартный — `8123`;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
</tabs>

## MongoDB

<tabs>
<tablist>
<tab>PHP</tab>
<tab>Python</tab>
<tab>JDBC</tab>
<tab>Node.js</tab>
</tablist>
<tabpanel>

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://www.php.net/manual/en/mongodb.tutorial.library.php) PHP-библиотеку для MongoDB.
1. Подключитесь к базе данных:

   ```php
   $manager = new MongoDB\Driver\Manager("mongodb://<IP-ADDRESS>/<DATABASE>", array("username" => <USERNAME>, "password" => <PASSWORD>));
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://www.mongodb.com/docs/drivers/pymongo/) драйвер `PyMongo`.
1. Подключитесь к базе данных с помощью функции `MongoClient`:

   ```python
   from pymongo import MongoClient

   client = MongoClient("mongodb://<USERNAME>:<PASSWORD>@<IP-ADDRESS>")

   db = client[<DATABASE>]
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://www.mongodb.com/docs/atlas/data-federation/query/sql/drivers/jdbc/connect/) JDBC-драйвер для MongoDB.
1. Создайте подключение:

   ```java
   MongoCredential credential = MongoCredential.createCredential(<USERNAME>, <DATABASE>, <PASSWORD>.toCharArray());

   MongoClient mongoClient = new MongoClient(new ServerAddress(“<IP-ADDRESS>”), Arrays.asList(credential));

   MongoDatabase db = mongoClient.getDatabase(<DATABASE>);
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://nodejs.org/ru/download) Node.js.
1. [Установите](https://www.mongodb.com/docs/drivers/node/current/) драйвер для MongoDB.
1. Создайте объект подключения к БД:

   ```javascript
   var MongoClient = require('mongodb').MongoClient;

   MongoClient.connect("mongodb://<USERNAME>:<PASSWORD>@<IP-ADDRESS>/<DATABASE>", function(err, db) {
       if(!err) {
           console.log("You are connected!");
       };
       db.close();
   });
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
</tabs>

## Redis

<tabs>
<tablist>
<tab>PHP</tab>
<tab>Python</tab>
<tab>Ruby</tab>
<tab>Java</tab>
<tab>Node.js</tab>
</tablist>
<tabpanel>

1. Убедитесь, что [PHP](https://www.php.net/manual/ru/install.php) и [composer](https://getcomposer.org/doc/) установлены.
1. [Установите](https://github.com/predis/predis) `predis`.
1. Подключитесь к базе данных:

   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   Predis\Autoloader::register();

   $client = new Predis\Client('tcp://<IP-ADDRESS>');
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<DATABASE>` — имя БД;
   - `<USERNAME>` — имя пользователя БД;
   - `<PASSWORD>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://github.com/redis/redis-py) клиент `redis-py`.
1. Подключитесь к базе данных с помощью функции `redis.Redis`:

   ```python

   import redis

   conn = redis.Redis(host='<IP-ADDRESS>', port=<PORT>, db=0)

   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<PORT>` — порт подключения, стандартный — `6379`.

Подробнее о подключении к Redis в Python читайте в [документации](https://redis.io/docs/clients/python/).

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://www.rubydoc.info/gems/redis) драйвер `redis-rb`.
1. Подключитесь к базе данных с помощью функции `Redis.new`:

   ```ruby
   require "redis"

   conn = Redis.new(host: "<IP-ADDRESS>", port: <PORT>, db: 0)
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<PORT>` — порт подключения, стандартный — `6379`.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://github.com/redis/jedis) клиент `Jedis`.
1. Создайте подключение с помощью функции `Jedis`:

   ```java
   import redis.clients.jedis.Jedis;

   Jedis jedis = new Jedis("<IP-ADDRESS>");
   ```

   Здесь `<IP-ADDRESS>` — внешний IP-адрес инстанса БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Node.js [установлен](https://nodejs.org/ru/download).
1. [Установите](https://github.com/redis/node-redis) клиент `node-redis`.
1. Подключитесь к БД с помощью функции `redis.createClient()`:

   ```javascript
   var redis = require("redis"),

   client = redis.createClient(<PORT>, "<IP-ADDRESS>");
   ```

   Здесь:

   - `<IP-ADDRESS>` — внешний IP-адрес инстанса БД;
   - `<PORT>` — порт подключения, стандартный — `6379`.

Подробнее о подключении к Redis в Node.js читайте в [документации](https://redis.io/docs/clients/nodejs/).

</tabpanel>
</tabs>
