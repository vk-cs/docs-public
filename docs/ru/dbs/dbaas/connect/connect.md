К БД развернутых в VK Cloud инстансов можно подключиться с помощью SDK.

Вы можете подключиться к БД как обычный [пользователь](../service-management/users) или как администратор инстанса — пользователь с максимально широкими полномочиями во всех БД инстанса.

Для входа с правами администратора указывайте следующее имя пользователя:

| Тип СУБД | Имя пользователя | Комментарий
|--|--|--|
| ClickHouse | `root` | |
| MongoDB | `root` | При подключении от имени администратора необходимо дополнительно указывать параметр `authSource=admin`, подробнее в [документации MongoDB](https://www.mongodb.com/docs/manual/reference/connection-string/#mongodb-urioption-urioption.authSource) |
| MySQL | `root` | |
| OpenSearch | `root` | Все созданные через VK Cloud пользователи получают права администратора |
| PostgreSQL<br>PostgresPro | `postgres` | |
| Redis 5 | `default` | Используется, если включена опция `requirepass`. Можно не задавать имя пользователя при подключении (эквивалентно `default`) |
| Redis 6 | `root` | |
| Tarantool | `admin` | |

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
   $conn = pg_connect("host=<IP-АДРЕС> dbname=<БД> user=<ИМЯ_ПОЛЬЗОВАТЕЛЯ> password=<ПАРОЛЬ> sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>");
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье [Использование TLS-протокола для подключения к PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect). 

Подробнее о подключении к PostgreSQL в PHP читайте в [документации](https://www.php.net/manual/ru/book.pgsql.php).

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://www.psycopg.org/docs/install.html#quick-install) модуль `psycopg`.
1. Подключитесь к базе данных с помощью функции `connect()`:

   ```python
   import psycopg2

   conn = psycopg2.connect("host=<IP-АДРЕС> dbname=<БД> user=<ИМЯ_ПОЛЬЗОВАТЕЛЯ> password=<ПАРОЛЬ> sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>")
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье [Использование TLS-протокола для подключения к PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect). 

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://www.rubydoc.info/gems/pg#how-to-install) библиотеку `pg`.
1. Подключитесь к БД с помощью функции `PGconn.connect()`:

   ```ruby
   require "pg"

   conn = PGconn.connect(:host => '<IP-АДРЕС>', :dbname => '<БД>', :user='<ИМЯ_ПОЛЬЗОВАТЕЛЯ>', :password => '<ПАРОЛЬ>', :sslmode => '<РЕЖИМ_ПОДКЛЮЧЕНИЯ>')
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье [Использование TLS-протокола для подключения к PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect). 

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлены.
1. [Установите](http://jdbc.postgresql.org/download/) JDBC-драйвер для PostgreSQL.
1. Подключитесь к базе данных с помощью функции `DriverManager.getConnection()`:

   ```java
   import java.sql.*;

   Connection conn = DriverManager.getConnection("jdbc:postgresql://<IP-АДРЕС>/<БД>?sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>`", "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", "<ПАРОЛЬ>");
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье [Использование TLS-протокола для подключения к PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect). 

</tabpanel>
<tabpanel>

1. Убедитесь, что Node.js [установлен](https://nodejs.org/ru/download).
1. [Установите](https://node-postgres.com/) модули `node-postgres`.
1. Подключитесь к базе данных с помощью функции `pg.Client()`:

   ```javascript
   var pg = require('pg');
   var conn = new pg.Client("postgres://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>?sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>");
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье [Использование TLS-протокола для подключения к PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect). 

</tabpanel>
<tabpanel>

1. [Установите](https://www.postgresql.org/ftp/odbc/versions/) драйвер ODBC.
1. Подключитесь к базе данных:

   ```bash
   Driver={PostgreSQL UNICODE}; Server="<IP-АДРЕС>"; Port=5432; Database="<БД>"; Uid="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"; Pwd="<ПАРОЛЬ>"; Sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>;
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.
   - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - параметр, определяющий режим подключения к БД. Для подключения с шифрованием трафика укажите значение `require`, для подключения без шифрования — `disable`. Подробнее в статье [Использование TLS-протокола для подключения к PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect). 

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

   mysqli_real_connect($conn, "<IP-АДРЕС>", "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", "<ПАРОЛЬ>", "<БД>", "<ПОРТ>");
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3306`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к MySQL в PHP читайте в [документации](https://www.php.net/manual/ru/set.mysqlinfo.php).

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://dev.mysql.com/doc/connector-python/en/) модуль `mysql.connector`.
1. Подключитесь к базе данных с помощью функции `mysql.connector.connect()`:

   ```python
   import mysql.connector

   conn = mysql.connector.connect(user="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", password="<ПАРОЛЬ>", host="<IP-АДРЕС>", port=<ПОРТ>, database="<БД>")
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3306`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://rubygems.org/gems/mysql2/versions/0.5.2) модуль `mysql2`.
1. Создайте подключение с помощью класса `Mysql2::Client`:

   ```ruby
   require "mysql2"

   conn = Mysql2::Client.new(username: "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", password: "<ПАРОЛЬ>", database: "<БД>", host: "<IP-АДРЕС>", port: <ПОРТ>)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3306`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Установите [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net).
1. [Установите](http://dev.mysql.com/downloads/connector/j/) JDBC-драйвер для MySQL.
1. Подключитесь к базе данных с помощью функции `DriverManager.getConnection()`:

   ```java
   import java.sql.*;

   DriverManager.getConnection("jdbc:mysql://<IP-АДРЕС>:<ПОРТ>/<БД>", <ИМЯ_ПОЛЬЗОВАТЕЛЯ>, <ПАРОЛЬ>);
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3306`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Установите [Node.js](https://nodejs.org/ru/download).
1. [Установите](https://github.com/mysqljs/mysql) модуль `mysql`.
1. Создайте подключение к базе данных с помощью метода `mysql.createConnection`:

   ```javascript
   var mysql = require('mysql')
   var conn = mysql.createConnection({
       host: "<IP-АДРЕС>",
       user: "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>",
       password: "<ПАРОЛЬ>",
       database: "<БД>",
       port: <ПОРТ>
   });
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3306`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://dev.mysql.com/downloads/connector/odbc/) драйвер ODBC.
1. Подключитесь к базе данных:

   ```bash
   DRIVER={MySQL ODBC 5.3 UNICODE Driver}; Server="<IP-АДРЕС>"; Port=<ПОРТ>; Database="<БД>"; Uid="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"; Pwd="<ПАРОЛЬ>";
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3306`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

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
   $client = Client::fromDsn('tcp://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>');
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в PHP читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_php/).

</tabpanel>
<tabpanel>

1. [Установите](https://wiki.python.org/moin/BeginnersGuide/Download) Python.
1. [Установите](https://github.com/tarantool/tarantool-python#download-and-install) модуль `tarantool`.
1. Подключитесь к базе данных с помощью функции `tarantool.connect()`:

   ```python
   import tarantool

   connection = tarantool.connect("<IP-АДРЕС>", <ПОРТ>, user=<ИМЯ_ПОЛЬЗОВАТЕЛЯ>, password=<ПАРОЛЬ>)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ПОРТ>` — порт подключения, стандартный — `3301`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

Подробнее о подключении к Tarantool в Python читайте в [документации](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_python/).

</tabpanel>
<tabpanel>

1. Установите [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net).
1. [Установите](https://github.com/tarantool/cartridge-java/) Java-коннектор `cartridge-java`.
1. Подключитесь к базе данных с помощью функции `TarantoolClientFactory.createClient()`:

   ```java
   TarantoolClient<TarantoolTuple, TarantoolResult<TarantoolTuple>> client = TarantoolClientFactory.createClient()
       .withAddress("<IP-АДРЕС>")
       .withCredentials(container.getUsername("<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"), container.getPassword("<ПАРОЛЬ>"))
       .build();
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://www.tarantool.io/ru/download/os-installation/) Tarantool.
1. Подключитесь к базе данных:

   ```bash
   tarantoolctl connect <ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

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
       User: "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>",
       Pass: "<ПАРОЛЬ>",
   }
   connection, err := tarantool.Connect("<IP-АДРЕС>", opts)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

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
       'host' => '<IP-АДРЕС>',
       'port' => '<ПОРТ>',
       'username' => '<ИМЯ_ПОЛЬЗОВАТЕЛЯ>',
       'password' => '<ПАРОЛЬ>'
   ];
   $db = new ClickHouseDB\Client($config);
   $db->database('<БД>');
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `8123`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://clickhouse-driver.readthedocs.io/en/latest/api.html) драйвер `clickhouse-driver`.
1. Подключитесь к базе данных с помощью класса `Connection`:

   ```python
   from clickhouse_driver.connection import Connection

   conn = Connection('<IP-АДРЕС>', port=8123, database='<БД>', user='<ИМЯ_ПОЛЬЗОВАТЕЛЯ>', password='<ПАРОЛЬ>')
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://github.com/shlima/click_house) драйвер `ClickHouse`.
1. Подключитесь к базе данных с помощью класса `Connection`:

   ```ruby
   require "clickhouse"

   conn = Clickhouse::Connection.new(:url => '<IP-АДРЕС>', :database => '<БД>', :username => '<ИМЯ_ПОЛЬЗОВАТЕЛЯ>', :password => '<ПАРОЛЬ>')
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://github.com/ClickHouse/clickhouse-java) JDBC-драйвер для ClickHouse.
1. Создайте подключение с помощью класса `ClickHouseDataSource`:

   ```java
   import ru.yandex.clickhouse.ClickHouseDataSource;
   import ru.yandex.clickhouse.settings.ClickHouseProperties;

   ClickHouseProperties properties = new ClickHouseProperties().withCredentials(<ИМЯ_ПОЛЬЗОВАТЕЛЯ>, <ПАРОЛЬ>);
   ClickHouseDataSource ds = new ClickHouseDataSource(String.format("jdbc:clickhouse://%s:%s/%s", “<IP-АДРЕС>”, <ПОРТ>, <БД>), properties);
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `8123`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://nodejs.org/ru/download) Node.js.
1. [Установите](https://clickhouse.com/docs/en/integrations/language-clients/nodejs) модуль `ClickHouse JS`.
1. Создайте объект подключения к БД:

   ```javascript
   const { ClickHouse } = require('clickhouse');

   const clickhouse = new ClickHouse({
    url: '<IP-АДРЕС>',
    port: <ПОРТ>,
    database: '<БД>',
    basicAuth: {
           username: '<ИМЯ_ПОЛЬЗОВАТЕЛЯ>',
           password: '<ПАРОЛЬ>',
       }
   });
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `8123`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://github.com/ClickHouse/clickhouse-odbc) ODBC-драйвер для ClickHouse.
1. Подключитесь к базе данных:

   ```bash
   Driver={PATH_OF_CLICKHOUSE_ODBC_SO}; Server="<IP-АДРЕС>"; Port=<ПОРТ>; Database="<БД>"; Uid="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"; Pwd="<ПАРОЛЬ>";
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ПОРТ>` — порт подключения, стандартный — `8123`;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

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
   $manager = new MongoDB\Driver\Manager("mongodb://<IP-АДРЕС>/<БД>", array("username" => <ИМЯ_ПОЛЬЗОВАТЕЛЯ>, "password" => <ПАРОЛЬ>));
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://www.mongodb.com/docs/drivers/pymongo/) драйвер `PyMongo`.
1. Подключитесь к базе данных с помощью функции `MongoClient`:

   ```python
   from pymongo import MongoClient

   client = MongoClient("mongodb://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>")

   db = client[<БД>]
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://www.mongodb.com/docs/atlas/data-federation/query/sql/drivers/jdbc/connect/) JDBC-драйвер для MongoDB.
1. Создайте подключение:

   ```java
   MongoCredential credential = MongoCredential.createCredential(<ИМЯ_ПОЛЬЗОВАТЕЛЯ>, <БД>, <ПАРОЛЬ>.toCharArray());

   MongoClient mongoClient = new MongoClient(new ServerAddress(“<IP-АДРЕС>”), Arrays.asList(credential));

   MongoDatabase db = mongoClient.getDatabase(<БД>);
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. [Установите](https://nodejs.org/ru/download) Node.js.
1. [Установите](https://www.mongodb.com/docs/drivers/node/current/) драйвер для MongoDB.
1. Создайте объект подключения к БД:

   ```javascript
   var MongoClient = require('mongodb').MongoClient;

   MongoClient.connect("mongodb://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>", function(err, db) {
       if(!err) {
           console.log("You are connected!");
       };
       db.close();
   });
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

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

   $client = new Predis\Client('tcp://<IP-АДРЕС>');
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<БД>` — имя БД;
   - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя БД;
   - `<ПАРОЛЬ>` — пароль пользователя БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Python [установлен](https://wiki.python.org/moin/BeginnersGuide/Download).
1. [Установите](https://github.com/redis/redis-py) клиент `redis-py`.
1. Подключитесь к базе данных с помощью функции `redis.Redis`:

   ```python

   import redis

   conn = redis.Redis(host='<IP-АДРЕС>', port=<ПОРТ>, db=0)

   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ПОРТ>` — порт подключения, стандартный — `6379`.

Подробнее о подключении к Redis в Python читайте в [документации](https://redis.io/docs/clients/python/).

</tabpanel>
<tabpanel>

1. Убедитесь, что Ruby [установлен](https://www.ruby-lang.org/ru/documentation/installation/).
1. [Установите](https://www.rubydoc.info/gems/redis) драйвер `redis-rb`.
1. Подключитесь к базе данных с помощью функции `Redis.new`:

   ```ruby
   require "redis"

   conn = Redis.new(host: "<IP-АДРЕС>", port: <ПОРТ>, db: 0)
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ПОРТ>` — порт подключения, стандартный — `6379`.

</tabpanel>
<tabpanel>

1. Убедитесь, что [Oracle Java](http://www.java.com/en/download/manual.jsp) или [OpenJDK](http://openjdk.java.net) установлен.
1. [Установите](https://github.com/redis/jedis) клиент `Jedis`.
1. Создайте подключение с помощью функции `Jedis`:

   ```java
   import redis.clients.jedis.Jedis;

   Jedis jedis = new Jedis("<IP-АДРЕС>");
   ```

   Здесь `<IP-АДРЕС>` — внешний IP-адрес инстанса БД.

</tabpanel>
<tabpanel>

1. Убедитесь, что Node.js [установлен](https://nodejs.org/ru/download).
1. [Установите](https://github.com/redis/node-redis) клиент `node-redis`.
1. Подключитесь к БД с помощью функции `redis.createClient()`:

   ```javascript
   var redis = require("redis"),

   client = redis.createClient(<ПОРТ>, "<IP-АДРЕС>");
   ```

   Здесь:

   - `<IP-АДРЕС>` — внешний IP-адрес инстанса БД;
   - `<ПОРТ>` — порт подключения, стандартный — `6379`.

Подробнее о подключении к Redis в Node.js читайте в [документации](https://redis.io/docs/clients/nodejs/).

</tabpanel>
</tabs>
