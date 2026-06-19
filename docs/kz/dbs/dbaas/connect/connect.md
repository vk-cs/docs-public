# {heading(DB-ге қосылу)[id=dbaas-connect]}

{include(/kz/_includes/_translated_by_ai.md)}

VK Cloud-та өрістетілген инстанстардың БД-леріне SDK көмегімен қосылуға болады.

## {heading(PostgreSQL)[id=dbaas-connect-postgresql]}

{tabs}

{tab(PHP)}

1. [PHP](https://www.php.net/manual/ru/install.php) және [composer](https://getcomposer.org/doc/)
   орнатылғанына көз жеткізіңіз.
1. `php-pgsql` кітапханасын [орнатыңыз](https://www.php.net/manual/ru/book.pgsql.php).
1. `pg_connect()` функциясының көмегімен дерекқорға қосылыңыз:

   ```php
   $conn = pg_connect("host=<IP-АДРЕС> dbname=<БД> user=<ИМЯ_ПОЛЬЗОВАТЕЛЯ> password=<ПАРОЛЬ> sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>");
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.
    - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - БД-ге қосылу режимін анықтайтын параметр. Трафикті шифрлау арқылы қосылу үшін
      `require` мәнін, шифрлаусыз қосылу үшін — `disable` мәнін көрсетіңіз. Толығырақ {linkto(
      ../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS протоколын пайдалану]} мақаласында.

PHP тілінде PostgreSQL-ге қосылу туралы толығырақ [құжаттамадан](https://www.php.net/manual/ru/book.pgsql.php) оқыңыз.

{/tab}

{tab(Python)}

1. Python [орнатылғанына](https://wiki.python.org/moin/BeginnersGuide/Download) көз жеткізіңіз.
1. `psycopg` модулін [орнатыңыз](https://www.psycopg.org/docs/install.html#quick-install).
1. `connect()` функциясының көмегімен дерекқорға қосылыңыз:

   ```python
   import psycopg2

   conn = psycopg2.connect("host=<IP-АДРЕС> dbname=<БД> user=<ИМЯ_ПОЛЬЗОВАТЕЛЯ> password=<ПАРОЛЬ> sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>")
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.
    - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - БД-ге қосылу режимін анықтайтын параметр. Трафикті шифрлау арқылы қосылу үшін
      `require` мәнін, шифрлаусыз қосылу үшін — `disable` мәнін көрсетіңіз. Толығырақ {linkto(
      ../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS протоколын пайдалану]} мақаласында.

{/tab}

{tab(Ruby)}

1. Ruby [орнатылғанына](https://www.ruby-lang.org/ru/documentation/installation/) көз жеткізіңіз.
1. `pg` кітапханасын [орнатыңыз](https://www.rubydoc.info/gems/pg#how-to-install).
1. `PGconn.connect()` функциясының көмегімен БД-ге қосылыңыз:

   ```ruby
   require "pg"

   conn = PGconn.connect(:host => '<IP-АДРЕС>', :dbname => '<БД>', :user='<ИМЯ_ПОЛЬЗОВАТЕЛЯ>', :password => '<ПАРОЛЬ>', :sslmode => '<РЕЖИМ_ПОДКЛЮЧЕНИЯ>')
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.
    - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - БД-ге қосылу режимін анықтайтын параметр. Трафикті шифрлау арқылы қосылу үшін
      `require` мәнін, шифрлаусыз қосылу үшін — `disable` мәнін көрсетіңіз. Толығырақ {linkto(
      ../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS протоколын пайдалану]} мақаласында.

{/tab}

{tab(JDBC)}

1. [Oracle Java](http://www.java.com/en/download/manual.jsp) немесе [OpenJDK](http://openjdk.java.net)
   орнатылғанына көз жеткізіңіз.
1. PostgreSQL үшін JDBC драйверін [орнатыңыз](http://jdbc.postgresql.org/download/).
1. `DriverManager.getConnection()` функциясының көмегімен дерекқорға қосылыңыз:

   ```java
   import java.sql.*;

   Connection conn = DriverManager.getConnection("jdbc:postgresql://<IP-АДРЕС>/<БД>?sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>`", "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", "<ПАРОЛЬ>");
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.
    - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - БД-ге қосылу режимін анықтайтын параметр. Трафикті шифрлау арқылы қосылу үшін
      `require` мәнін, шифрлаусыз қосылу үшін — `disable` мәнін көрсетіңіз. Толығырақ {linkto(
      ../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS протоколын пайдалану]} мақаласында.

{/tab}

{tab(Node.js)}

1. Node.js [орнатылғанына](https://nodejs.org/ru/download) көз жеткізіңіз.
1. `node-postgres` модульдерін [орнатыңыз](https://node-postgres.com/).
1. `pg.Client()` функциясының көмегімен дерекқорға қосылыңыз:

   ```javascript
   var pg = require('pg');
   var conn = new pg.Client("postgres://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>?sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>");
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.
    - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - БД-ге қосылу режимін анықтайтын параметр. Трафикті шифрлау арқылы қосылу үшін
      `require` мәнін, шифрлаусыз қосылу үшін — `disable` мәнін көрсетіңіз. Толығырақ {linkto(
      ../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS протоколын пайдалану]} мақаласында.

{/tab}

{tab(ODBC)}

1. ODBC драйверін [орнатыңыз](https://www.postgresql.org/ftp/odbc/versions/).
1. Дерекқорға қосылыңыз:

   ```console
   Driver={PostgreSQL UNICODE}; Server="<IP-АДРЕС>"; Port=5432; Database="<БД>"; Uid="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"; Pwd="<ПАРОЛЬ>"; Sslmode=<РЕЖИМ_ПОДКЛЮЧЕНИЯ>;
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.
    - `<РЕЖИМ_ПОДКЛЮЧЕНИЯ>` - БД-ге қосылу режимін анықтайтын параметр. Трафикті шифрлау арқылы қосылу үшін
      `require` мәнін, шифрлаусыз қосылу үшін — `disable` мәнін көрсетіңіз. Толығырақ {linkto(
      ../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS протоколын пайдалану]} мақаласында.

{/tab}

{/tabs}

## {heading(MySQL)[id=dbaas-connect-mysql]}

{tabs}

{tab(PHP)}

1. [PHP](https://www.php.net/manual/ru/install.php) және [composer](https://getcomposer.org/doc/)
   орнатылғанына көз жеткізіңіз.
1. `php-mysql` кітапханасын [орнатыңыз](https://www.php.net/manual/ru/book.mysql.php).
1. `mysqli_real_connect()` функциясының көмегімен дерекқорға қосылыңыз:

   ```php
   $conn = mysqli_init();

   mysqli_real_connect($conn, "<IP-АДРЕС>", "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", "<ПАРОЛЬ>", "<БД>", "<ПОРТ>");
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3306`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

PHP тілінде MySQL-ге қосылу туралы толығырақ [құжаттамадан](https://www.php.net/manual/ru/set.mysqlinfo.php) оқыңыз.

{/tab}

{tab(Python)}

1. Python [орнатылғанына](https://wiki.python.org/moin/BeginnersGuide/Download) көз жеткізіңіз.
1. `mysql.connector` модулін [орнатыңыз](https://dev.mysql.com/doc/connector-python/en/).
1. `mysql.connector.connect()` функциясының көмегімен дерекқорға қосылыңыз:

   ```python
   import mysql.connector

   conn = mysql.connector.connect(user="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", password="<ПАРОЛЬ>", host="<IP-АДРЕС>", port=<ПОРТ>, database="<БД>")
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3306`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Ruby)}

1. Ruby [орнатылғанына](https://www.ruby-lang.org/ru/documentation/installation/) көз жеткізіңіз.
1. `mysql2` модулін [орнатыңыз](https://rubygems.org/gems/mysql2/versions/0.5.2).
1. `Mysql2::Client` класының көмегімен қосылым жасаңыз:

   ```ruby
   require "mysql2"

   conn = Mysql2::Client.new(username: "<ИМЯ_ПОЛЬЗОВАТЕЛЯ>", password: "<ПАРОЛЬ>", database: "<БД>", host: "<IP-АДРЕС>", port: <ПОРТ>)
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3306`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(JDBC)}

1. [Oracle Java](http://www.java.com/en/download/manual.jsp) немесе [OpenJDK](http://openjdk.java.net) орнатыңыз.
1. MySQL үшін JDBC драйверін [орнатыңыз](http://dev.mysql.com/downloads/connector/j/).
1. `DriverManager.getConnection()` функциясының көмегімен дерекқорға қосылыңыз:

   ```java
   import java.sql.*;

   DriverManager.getConnection("jdbc:mysql://<IP-АДРЕС>:<ПОРТ>/<БД>", <ИМЯ_ПОЛЬЗОВАТЕЛЯ>, <ПАРОЛЬ>);
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3306`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Node.js)}

1. [Node.js](https://nodejs.org/ru/download) орнатыңыз.
1. `mysql` модулін [орнатыңыз](https://github.com/mysqljs/mysql).
1. `mysql.createConnection` әдісінің көмегімен дерекқорға қосылым жасаңыз:

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

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3306`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(ODBC)}

1. ODBC драйверін [орнатыңыз](https://dev.mysql.com/downloads/connector/odbc/).
1. Дерекқорға қосылыңыз:

   ```console
   DRIVER={MySQL ODBC 5.3 UNICODE Driver}; Server="<IP-АДРЕС>"; Port=<ПОРТ>; Database="<БД>"; Uid="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"; Pwd="<ПАРОЛЬ>";
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3306`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{/tabs}

## {heading(Tarantool)[id=dbaas-connect-tarantool]}

{note:info}

Tarantool БД-не қонақ пайдаланушы ретінде қосылуға болады.

{/note}

{tabs}

{tab(PHP)}

1. [PHP](https://www.php.net/manual/ru/install.php) және [composer](https://getcomposer.org/doc/)
   орнатылғанына көз жеткізіңіз.
1. `tarantool/client` кітапханасын [орнатыңыз](https://github.com/tarantool-php/client#installation).
1. `Client::fromDsn` әдісінің көмегімен дерекқорға қосылыңыз:

   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   use Tarantool\Client\Client;
   $client = Client::fromDsn('tcp://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>');
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

PHP тілінде Tarantool-ға қосылу туралы толығырақ
[құжаттамадан](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_php/) оқыңыз.

{/tab}

{tab(Python)}

1. Python-ды [орнатыңыз](https://wiki.python.org/moin/BeginnersGuide/Download).
1. `tarantool` модулін [орнатыңыз](https://github.com/tarantool/tarantool-python#download-and-install).
1. `tarantool.connect()` функциясының көмегімен дерекқорға қосылыңыз:

   ```python
   import tarantool

   connection = tarantool.connect("<IP-АДРЕС>", <ПОРТ>, user=<ИМЯ_ПОЛЬЗОВАТЕЛЯ>, password=<ПАРОЛЬ>)
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `3301`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

Python тілінде Tarantool-ға қосылу туралы толығырақ
[құжаттамадан](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_python/) оқыңыз.

{/tab}

{tab(Java)}

1. [Oracle Java](http://www.java.com/en/download/manual.jsp) немесе [OpenJDK](http://openjdk.java.net) орнатыңыз.
1. `cartridge-java` Java-коннекторын [орнатыңыз](https://github.com/tarantool/cartridge-java/).
1. `TarantoolClientFactory.createClient()` функциясының көмегімен дерекқорға қосылыңыз:

   ```java
   TarantoolClient<TarantoolTuple, TarantoolResult<TarantoolTuple>> client = TarantoolClientFactory.createClient()
       .withAddress("<IP-АДРЕС>")
       .withCredentials(container.getUsername("<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"), container.getPassword("<ПАРОЛЬ>"))
       .build();
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Shell)}

1. Tarantool-ды [орнатыңыз](https://www.tarantool.io/ru/download/os-installation/).
1. Дерекқорға қосылыңыз:

   ```console
   tarantoolctl connect <ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Go)}

1. Go [орнатылғанына](https://go.dev/doc/install) көз жеткізіңіз.
1. `go-tarantool` кітапханасын [орнатыңыз](https://github.com/tarantool/go-tarantool#installation).
1. `tarantool.Connect()` функциясының көмегімен дерекқорға қосылыңыз:

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

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

Go тілінде Tarantool-ға қосылу туралы толығырақ
[құжаттамадан](https://www.tarantool.io/ru/doc/latest/how-to/getting_started_go/) оқыңыз.

{/tab}

{/tabs}

## {heading(ClickHouse)[id=dbaas-connect-clickhouse]}

{tabs}

{tab(PHP)}

1. [PHP](https://www.php.net/manual/ru/install.php) және [composer](https://getcomposer.org/doc/)
   орнатылғанына көз жеткізіңіз.
1. `php-curl` [орнатыңыз](https://www.php.net/manual/en/book.curl.php).
1. `smi2/phpclickhouse` модулін [орнатыңыз](https://github.com/smi2/phpClickHouse).
1. Дерекқорға қосылыңыз:

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

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `8123`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Python)}

1. Python [орнатылғанына](https://wiki.python.org/moin/BeginnersGuide/Download) көз жеткізіңіз.
1. `clickhouse-driver` драйверін [орнатыңыз](https://clickhouse-driver.readthedocs.io/en/latest/api.html).
1. `Connection` класының көмегімен дерекқорға қосылыңыз:

   ```python
   from clickhouse_driver.connection import Connection

   conn = Connection('<IP-АДРЕС>', port=8123, database='<БД>', user='<ИМЯ_ПОЛЬЗОВАТЕЛЯ>', password='<ПАРОЛЬ>')
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Ruby)}

1. Ruby [орнатылғанына](https://www.ruby-lang.org/ru/documentation/installation/) көз жеткізіңіз.
1. `ClickHouse` драйверін [орнатыңыз](https://github.com/shlima/click_house).
1. `Connection` класының көмегімен дерекқорға қосылыңыз:

   ```ruby
   require "clickhouse"

   conn = Clickhouse::Connection.new(:url => '<IP-АДРЕС>', :database => '<БД>', :username => '<ИМЯ_ПОЛЬЗОВАТЕЛЯ>', :password => '<ПАРОЛЬ>')
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(JDBC)}

1. [Oracle Java](http://www.java.com/en/download/manual.jsp) немесе [OpenJDK](http://openjdk.java.net)
   орнатылғанына көз жеткізіңіз.
1. ClickHouse үшін JDBC драйверін [орнатыңыз](https://github.com/ClickHouse/clickhouse-java).
1. `ClickHouseDataSource` класының көмегімен қосылым жасаңыз:

   ```java
   import ru.yandex.clickhouse.ClickHouseDataSource;
   import ru.yandex.clickhouse.settings.ClickHouseProperties;

   ClickHouseProperties properties = new ClickHouseProperties().withCredentials(<ИМЯ_ПОЛЬЗОВАТЕЛЯ>, <ПАРОЛЬ>);
   ClickHouseDataSource ds = new ClickHouseDataSource(String.format("jdbc:clickhouse://%s:%s/%s", “<IP-АДРЕС>”, <ПОРТ>, <БД>), properties);
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `8123`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Node.js)}

1. Node.js [орнатыңыз](https://nodejs.org/ru/download).
1. `ClickHouse JS` модулін [орнатыңыз](https://clickhouse.com/docs/en/integrations/language-clients/nodejs).
1. БД-ге қосылу объектісін жасаңыз:

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

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `8123`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(ODBC)}

1. ClickHouse үшін ODBC драйверін [орнатыңыз](https://github.com/ClickHouse/clickhouse-odbc).
1. Дерекқорға қосылыңыз:

   ```console
   Driver={PATH_OF_CLICKHOUSE_ODBC_SO}; Server="<IP-АДРЕС>"; Port=<ПОРТ>; Database="<БД>"; Uid="<ИМЯ_ПОЛЬЗОВАТЕЛЯ>"; Pwd="<ПАРОЛЬ>";
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `8123`;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{/tabs}

## {heading(MongoDB)[id=dbaas-connect-mongodb]}

{tabs}

{tab(PHP)}

1. [PHP](https://www.php.net/manual/ru/install.php) және [composer](https://getcomposer.org/doc/)
   орнатылғанына көз жеткізіңіз.
1. MongoDB үшін PHP кітапханасын [орнатыңыз](https://www.php.net/manual/en/mongodb.tutorial.library.php).
1. Дерекқорға қосылыңыз:

   ```php
   $manager = new MongoDB\Driver\Manager("mongodb://<IP-АДРЕС>/<БД>", array("username" => <ИМЯ_ПОЛЬЗОВАТЕЛЯ>, "password" => <ПАРОЛЬ>));
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Python)}

1. Python [орнатылғанына](https://wiki.python.org/moin/BeginnersGuide/Download) көз жеткізіңіз.
1. `PyMongo` драйверін [орнатыңыз](https://www.mongodb.com/docs/drivers/pymongo/).
1. `MongoClient` функциясының көмегімен дерекқорға қосылыңыз:

   ```python
   from pymongo import MongoClient

   client = MongoClient("mongodb://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>")

   db = client[<БД>]
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(JDBC)}

1. [Oracle Java](http://www.java.com/en/download/manual.jsp) немесе [OpenJDK](http://openjdk.java.net)
   орнатылғанына көз жеткізіңіз.
1. MongoDB үшін
   JDBC драйверін [орнатыңыз](https://www.mongodb.com/docs/atlas/data-federation/query/sql/drivers/jdbc/connect/).
1. Қосылым жасаңыз:

   ```java
   MongoCredential credential = MongoCredential.createCredential(<ИМЯ_ПОЛЬЗОВАТЕЛЯ>, <БД>, <ПАРОЛЬ>.toCharArray());

   MongoClient mongoClient = new MongoClient(new ServerAddress(“<IP-АДРЕС>”), Arrays.asList(credential));

   MongoDatabase db = mongoClient.getDatabase(<БД>);
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Node.js)}

1. Node.js [орнатыңыз](https://nodejs.org/ru/download).
1. MongoDB үшін драйверді [орнатыңыз](https://www.mongodb.com/docs/drivers/node/current/).
1. БД-ге қосылу объектісін жасаңыз:

   ```javascript
   var MongoClient = require('mongodb').MongoClient;

   MongoClient.connect("mongodb://<ИМЯ_ПОЛЬЗОВАТЕЛЯ>:<ПАРОЛЬ>@<IP-АДРЕС>/<БД>", function(err, db) {
       if(!err) {
           console.log("You are connected!");
       };
       db.close();
   });
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{/tabs}

## {heading(Redis)[id=dbaas-connect-redis]}

{tabs}

{tab(PHP)}

1. [PHP](https://www.php.net/manual/ru/install.php) және [composer](https://getcomposer.org/doc/)
   орнатылғанына көз жеткізіңіз.
1. `predis` [орнатыңыз](https://github.com/predis/predis).
1. Дерекқорға қосылыңыз:

   ```php
   require_once __DIR__ . '/vendor/autoload.php';

   Predis\Autoloader::register();

   $client = new Predis\Client('tcp://<IP-АДРЕС>');
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<БД>` — БД атауы;
    - `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — БД пайдаланушысының аты;
    - `<ПАРОЛЬ>` — БД пайдаланушысының құпиясөзі.

{/tab}

{tab(Python)}

1. Python [орнатылғанына](https://wiki.python.org/moin/BeginnersGuide/Download) көз жеткізіңіз.
1. `redis-py` клиентін [орнатыңыз](https://github.com/redis/redis-py).
1. `redis.Redis` функциясының көмегімен дерекқорға қосылыңыз:

   ```python

   import redis

   conn = redis.Redis(host='<IP-АДРЕС>', port=<ПОРТ>, db=0)

   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `6379`.

Python тілінде Redis-ке қосылу туралы толығырақ [құжаттамадан](https://redis.io/docs/clients/python/) оқыңыз.

{/tab}

{tab(Ruby)}

1. Ruby [орнатылғанына](https://www.ruby-lang.org/ru/documentation/installation/) көз жеткізіңіз.
1. `redis-rb` драйверін [орнатыңыз](https://www.rubydoc.info/gems/redis).
1. `Redis.new` функциясының көмегімен дерекқорға қосылыңыз:

   ```ruby
   require "redis"

   conn = Redis.new(host: "<IP-АДРЕС>", port: <ПОРТ>, db: 0)
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `6379`.

{/tab}

{tab(Java)}

1. [Oracle Java](http://www.java.com/en/download/manual.jsp) немесе [OpenJDK](http://openjdk.java.net)
   орнатылғанына көз жеткізіңіз.
1. `Jedis` клиентін [орнатыңыз](https://github.com/redis/jedis).
1. `Jedis` функциясының көмегімен қосылым жасаңыз:

   ```java
   import redis.clients.jedis.Jedis;

   Jedis jedis = new Jedis("<IP-АДРЕС>");
   ```

   Мұнда `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы.

{/tab}

{tab(Node.js)}

1. Node.js [орнатылғанына](https://nodejs.org/ru/download) көз жеткізіңіз.
1. `node-redis` клиентін [орнатыңыз](https://github.com/redis/node-redis).
1. `redis.createClient()` функциясының көмегімен БД-ге қосылыңыз:

   ```javascript
   var redis = require("redis"),
   client = redis.createClient(<ПОРТ>, "<IP-АДРЕС>");
   ```

   Мұнда:

    - `<IP-АДРЕС>` — БД инстансының сыртқы IP мекенжайы;
    - `<ПОРТ>` — қосылу порты, стандарттысы — `6379`.

Node.js тілінде Redis-ке қосылу туралы толығырақ [құжаттамадан](https://redis.io/docs/clients/nodejs/) оқыңыз.

{/tab}

{/tabs}
