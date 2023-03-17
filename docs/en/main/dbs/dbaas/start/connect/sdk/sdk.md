## Описание

Статья приводит примеры подключения (с помощью разных приложений) к установленной вами облачной базе данных.

## PHP

```
$conn = pg\_connect("host=10.0.0.4 dbname=<DATABASE> user"="<USERNAME&"gt; password="<PASSWORD&"gt;");
```

Вместо 10.0.0.4 - вставьте IP-адрес вашей базы данных.

## Установка PHP

[Подробная инструкция по установке и настройке PHP - на официальном сайте по этой ссылке](https://www.php.net/manual/ru/install.php).

## Подключение

```
$conn =" pg\_connect("host=10.0.0.4 "dbname="<DATABASE&"gt; user="<USERNAME&"gt; password="<PASSWORD&"gt;");
```

pg_connect() открывает соединение с базой данных PostgreSQL, определенное строкой connection_string.

При повторном вызове функции pg_connect() с теми же значениями параметров в connection_string функция вернет существующее подключение. Чтобы принудительно создать новое соединение, необходимо передать строку подключения функции PGSQL_CONNECT_FORCE_NEW в качестве параметра connect_type.

Прежний синтаксис с множеством параметров $conn =" pg_connect("host", "port", "options", "tty", "dbname") считается устаревшим.

[Подробное описание функций PostgreSQL, доступных через PHP, на официальном сайте - по этой ссылке](https://www.php.net/manual/ru/book.pgsql.php).

## Python

```
import psycopg2 conn = psycopg2.connect("host=10.0.0.4 dbname=<DATABASE> user"="<USERNAME&"gt; password="<PASSWORD&"gt;")
```

Вместо 10.0.0.4 - вставьте IP-адрес вашей базы данных.

## Установка Python

[Скачать дистрибутив можно на официальном сайте по этой ссылке](https://www.python.org/downloads/). На Windows достаточно запустить дистрибутив и нажимать "Далее".

На Linux введите команду:

```
sudo apt-get install python3
```

## Подключение

Чтобы подключиться к вашей базе данных, вы должны сначала создать объект подключения, представляющий базу данных. Затем вы должны создать объект курсора, чтобы помочь вам в выполнении ваших операторов SQL.

В следующем примере показано, как установить соединение с базой:

```
conn =" psycopg2.connect("host=10.0.0.4 "dbname="<DATABASE&"gt; user="<USERNAME&"gt; password="<PASSWORD&"gt;")
```

В результате получим:

```
Database opened successfully
```

## Пример создания таблицы

Чтобы создать таблицу Postgres в Python, мы используем оператор SQL CREATE TABLE. Этот запрос должен быть выполнен после установления соединения с базой данных. Мы также создаем объект курсора, вызывая метод cursor(), который принадлежит объекту connection. Этот объект cursor используется для фактического выполнения ваших команд.

Затем мы вызываем метод execute() объекта cursor, чтобы помочь нам в создании таблицы. Наконец, нам нужно зафиксировать и закрыть соединение. «Фиксация» соединения говорит драйверу о необходимости посылать команды в базу данных.

Следующий пример демонстрирует это:

```
import psycopg2 con =" psycopg2.connect( "database=""DATABASE&"quot;, user=""USERNAME&"quot;, password=""PASSWORD&"quot;, host=""10.0.0.4&"quot;, port=""5432&"quot; ) print("Database opened successfully")cur =" con.cursor() "cur.execute('''CREATE TABLE STUDENT (ADMISSION INT PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, AGE INT NOT NULL, COURSE CHAR(50), DEPARTMENT CHAR(50));''') print("Table created successfully") con.commit() con.close()
```

В результате получим:

```
Database opened successfully Table created successfully
```

Этот метод commit() помогает нам применить изменения, которые мы внесли в базу данных, и эти изменения не могут быть отменены, если commit() выполнится успешно. Метод close() закрывает соединение с базой данных.

На данный момент мы создали таблицу с 4 столбцами, каждый из которых имеет различные типы данных. Приведенный выше вывод показывает, что таблица была успешно создана.

## Ruby

```
require "postgres" conn = PGconn.connect(:host => '10.0.0.4', :dbname => '<DATABASE>', :user"="'&"lt;USERNAME>', :password ="> '&"lt;PASSWORD>')
```

Вместо 10.0.0.4 - вставьте IP-адрес вашей базы данных.

## Установка Ruby

[Скачать дистрибутив Ruby вы можете на официальном сайте по этой ссылке](https://www.ruby-lang.org/ru/documentation/installation/). На Windows достаточно запустить дистрибутив и нажимать "Далее".

На Linux введите команду:

```
sudo apt-get install ruby-full
```

## Подключение

В примере мы подключаемся к базе данных с помощью пароля. Запустите консоль Ruby, введите хост, имя пользователя, имя базы данных и пароль к базе данных.

```
require "postgres" conn =" PGconn.connect(:host => '10.0.0.4', :dbname => '<DATABASE>', :user='<USERNAME>', :password => '<PASSWORD>')
```

## Создание таблицы базы данных

В этом разделе мы создаем таблицу базы данных и заполняем ее данными.

Файл с исходным кодом приложения Ruby - может называться, например, create_table.rb:

```
#!/usr/bin/ruby require 'pg' begin con =" PG.connect :dbname => 'testdb', :user => 'janbodnar' "con.exec "DROP TABLE IF EXISTS Cars" con.exec "CREATE TABLE Cars(Id INTEGER PRIMARY KEY, Name VARCHAR(20), Price INT)" con.exec "INSERT INTO Cars VALUES(1,'Audi',52642)" con.exec "INSERT INTO Cars VALUES(2,'Mercedes',57127)" con.exec "INSERT INTO Cars VALUES(3,'Skoda',9000)" con.exec "INSERT INTO Cars VALUES(4,'Volvo',29000)" con.exec "INSERT INTO Cars VALUES(5,'Bentley',350000)" con.exec "INSERT INTO Cars VALUES(6,'Citroen',21000)" con.exec "INSERT INTO Cars VALUES(7,'Hummer',41400)" con.exec "INSERT INTO Cars VALUES(8,'Volkswagen',21600)" rescue PG::Error ="> e puts e.message ensure con.close if con end
```

Созданная таблица называется Cars и имеет три столбца: идентификатор, название автомобиля и его цену.

## JDBC

```
Connection conn = DriverManager.getConnection(&"quot;jdbc:postgresql://10.0.0.4/<DATABASE>", "<USERNAME>", "<PASSWORD>");
```

Вместо 10.0.0.4 - вставьте IP-адрес вашей базы данных.

## Установка

Загрузите [PostgreSQL JDBC драйвер](http://jdbc.postgresql.org/download.html).

## Подключение

Фрагменты кода для использования JDBC для подключения к базе данных PostgreSQL:

```
Class.forName("org.postgresql.Driver"); Connection connection =" null; "connection =" DriverManager.getConnection( "jdbc:postgresql://hostname:port/dbname","username", "password"); "connection.close();
```

Смотрите полный пример ниже:

```
import java.sql.DriverManager; import java.sql.Connection; import java.sql.SQLException; public class JDBCExample { public static void main(String\[\]argv) { System.out.println("-------- PostgreSQL " + "JDBC Connection Testing ------------"); try { Class.forName("org.postgresql.Driver"); } catch (ClassNotFoundException e) { System.out.println("Where is your PostgreSQL JDBC Driver? " + "Include in your library path!"); e.printStackTrace(); return; } System.out.println("PostgreSQL JDBC Driver Registered!"); Connection connection =" null; "try { connection =" DriverManager.getConnection( "jdbc:postgresql://10.0.0.4:5432/DATABASE", "USERNAME", "PASSWORD"); } "catch (SQLException e) { System.out.println("Connection Failed! Check output console"); e.printStackTrace(); return; } if (connection !=" null) { "System.out.println("You made it, take control your database now!"); } else { System.out.println("Failed to make connection!"); } } }
```

## Node.js

```
var" pg =" require('pg'); "var conn =" new "pg.Client("postgres://<USERNAME>:<PASSWORD>@10.0.0.4/<DATABASE>");
```

Вместо 10.0.0.4 - вставьте IP-адрес вашей базы данных.

## Установка

Надо установить зависимость от npm:

```
npm install pg --save
```

## Подключение

Теперь вам нужно создать соединение PostgreSQL, которое вы можете позже запросить.

```
var pg =" require('pg'); "var conn =" new "pg.Client("postgres://<USERNAME>:<PASSWORD>@10.0.0.4/<DATABASE>");
```

## ODBC

```
Driver"="{PostgreSQL UNICODE}; Server="10.0.0.4"; Port=5432; Database="<DATABASE>"; Uid="<USERNAME>"; Pwd="<PASSWORD>";
```

Вместо 10.0.0.4 - вставьте IP-адрес вашей базы данных.

## Установка

[Скачать драйвер ODBC можно с официального сайта по этой ссылке](https://www.postgresql.org/ftp/odbc/versions/).

## Подключение

Если вы используете веб-интерфейс для добавления источника данных ODBC, то заполните поля:

- Сервер (хост) / IP-адрес
- Порт
- Имя базы данных / название базы данных
- Имя пользователя / логин
- Пароль

данными, взятыми из вашего личного кабинета (на вкладке ODBC) вашей базы данных.

Если вы подключаете источник данных ODBC в приложении / среде разработки, используйте следующий коннектор:

```
Driver={"PostgreSQL UNICODE}; Server=""10.0.0.4&"quot;; Port=5432; Database=""&"lt;DATABASE>"; Uid=""&"lt;USERNAME>";
```
