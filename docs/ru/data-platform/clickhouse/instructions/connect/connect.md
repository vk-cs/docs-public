# {heading(Подключение к экземпляру сервиса)[id=clickhouse_connect]}

Cloud ClickHouse принимает подключения по двум протоколам: TCP и HTTP. Соединение с экземпляром сервиса защищено с помощью самоподписанного TLS-сертификата.

В инструкции приведены примеры подключения с помощью `clickhouse-client` (для подключения из терминала) и драйверов для Python, Java, C++, Go (для подключения из кода приложения).

{note:info}
Инструкция актуальна для версий Cloud ClickHouse `24.3.18.7` и `25.3.14.14`.
{/note}

## {heading(Подготовка к подключению)[id=clickhouse_connect-prepare]}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**. Убедитесь, что нужный экземпляр Cloud ClickHouse находится в статусе `Активно`.
1. На вкладке **Общая информация** экземпляра сервиса из нужной строки подключения, в зависимости от протокола (TCP или HTTP) и наличия TLS-шифрования, скопируйте хост и порт.
1. Подготовьте название базы данных, а также логин и пароль учетной записи пользователя Cloud ClickHouse. Это может быть:

   - пользователь, {linkto(../create#clickhouse_create)[text=заданный при создании экземпляра]};
   - дополнительный пользователь, {linkto(../manage#clickhouse_add_admin)[text=добавленный в экземпляр]} вручную.

Дальнейшие действия зависят от способа подключения:

- {linkto(#clickhouse_connect-clickhouse-client)[text=clickhouse-client]}
- {linkto(#clickhouse_connect-python)[text=Python]}
- {linkto(#clickhouse_connect-java)[text=Java]}
- {linkto(#clickhouse_connect-cpp)[text=C++]}
- {linkto(#clickhouse_connect-go)[text=Go]}

В результате выполнения каждого примера подключения выведется версия Cloud ClickHouse.

## {heading(clickhouse-client)[id=clickhouse_connect-clickhouse-client]}

`clickhouse-client` позволяет подключаться к экземпляру Cloud ClickHouse по TCP. Рекомендуется использовать клиент той же версии, что и экземпляр. Минимальное требование — совпадение первых двух чисел версии: для экземпляра версии `24.3.18.7` подойдет клиент `24.3.0.0` и выше, для версии `25.3.14.14` — клиент `25.3.0.0` и выше.

1. Загрузите пакет нужной версии:

   - [24.3.18.7](https://github.com/ClickHouse/ClickHouse/releases/tag/v24.3.18.7-lts);
   - [25.3.14.14](https://github.com/ClickHouse/ClickHouse/releases/tag/v25.3.14.14-lts).

1. Установите клиент по [инструкции из официальной документации ClickHouse](https://clickhouse.com/docs/ru/concepts/features/interfaces/client).

1. Откройте терминал и подключитесь с TLS:

   ```console
   $ clickhouse-client \
      --host=<ХОСТ> \
      --port=<ПОРТ> \
      --user='<ЛОГИН>' \
      --password='<ПАРОЛЬ>' \
      --secure \
      --accept-invalid-certificate
   ```

   Для подключения без TLS уберите флаги `--secure` и `--accept-invalid-certificate`.

1. Проверьте соединение, выполнив тестовый запрос:

   ```sql
   SELECT version();
   ```

## {heading(Python)[id=clickhouse_connect-python]}

Для подключения с помощью Python используйте драйвер в зависимости от типа протокола:

- [clickhouse-connect](https://pypi.org/project/clickhouse-connect/) — подключение по HTTP. Рекомендуемая версия — `1.6.0`. Минимальная — `1.0.0`.
- [clickhouse-driver](https://pypi.org/project/clickhouse-driver/) — подключение по TCP. Рекомендуемая версия — `0.2.11`. Минимальная — `0.2.0`.

{tabs}

{tab(clickhouse-connect)}

1. Откройте терминал и установите драйвер:

   ```console
   $ pip install clickhouse-connect==1.6.0
   ```

1. Для подключения с TLS выполните код:

   ```python
   import clickhouse_connect

   client = clickhouse_connect.get_client(
       host='<ХОСТ>',
       port='<ПОРТ>',
       username='<ЛОГИН>',
       password='<ПАРОЛЬ>',
       database='<БД>',
       secure=True,
       verify=False
   )

   print(client.command('SELECT version()'))
   ```

   {note:info}
   Параметр `verify=False` отключает проверку сертификата сервера. Соединение при этом остается зашифрованным.
   {/note}

   Для подключения без TLS уберите параметры `secure=True` и `verify=False`.

{/tab}

{tab(clickhouse-driver)}

1. Откройте терминал и установите драйвер:

   ```console
   $ pip install clickhouse-driver==0.2.11
   ```

1. Для подключения с TLS выполните код:

   ```python
   from clickhouse_driver import Client

   client = Client(
       host='<ХОСТ>',
       port='<ПОРТ>',
       user='<ЛОГИН>',
       password='<ПАРОЛЬ>',
       database='<БД>',
       secure=True,
       verify=False
   )

   print(client.execute('SELECT version()'))
   ```

   {note:info}
   Параметр `verify=False` отключает проверку сертификата сервера. Соединение при этом остается зашифрованным.
   {/note}

   Для подключения без TLS уберите параметры `secure=True` и `verify=False`.

{/tab}

{/tabs}

## {heading(Java)[id=clickhouse_connect-java]}

Для подключения с помощью Java по протоколу HTTP используйте JDBC-драйвер [clickhouse-jdbc](https://github.com/ClickHouse/clickhouse-java).

Рекомендуемая версия драйвера — `0.9.8`. Минимальная — `0.7.0`.

1. Добавьте зависимость в проект:

   {tabs}

   {tab(Maven)}

   ```xml
   <dependency>
       <groupId>com.clickhouse</groupId>
       <artifactId>clickhouse-jdbc</artifactId>
       <version>0.9.8</version>
   </dependency>
   ```

   {/tab}

   {tab(Gradle)}

   ```groovy
   implementation 'com.clickhouse:clickhouse-jdbc:0.9.8'
   ```

   {/tab}

   {/tabs}

1. Для подключения с TLS выполните код:

   ```java
   import com.clickhouse.jdbc.ClickHouseDataSource;

   String url = "jdbc:clickhouse://<ХОСТ>:<ПОРТ>/<БД>?ssl=true&sslmode=NONE";
   Properties props = new Properties();
   props.setProperty("user", "<ЛОГИН>");
   props.setProperty("password", "<ПАРОЛЬ>");

   ClickHouseDataSource ds = new ClickHouseDataSource(url, props);
   try (Connection conn = ds.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT version()")) {
       if (rs.next()) {
           System.out.println(rs.getString(1));
       }
   }
   ```

   {note:info}
   Параметр `sslmode=NONE` отключает проверку сертификата сервера. Соединение при этом остается зашифрованным.
   {/note}

   Для подключения без TLS уберите параметры `?ssl=true&sslmode=NONE` из URL-адреса.

## {heading(C++)[id=clickhouse_connect-cpp]}

Для подключения с помощью C++ по TCP используйте клиентскую библиотеку [clickhouse-cpp](https://github.com/ClickHouse/clickhouse-cpp).

Рекомендуемая и минимальная версия библиотеки — `2.6.0`.

1. Откройте терминал и установите библиотеку `clickhouse-cpp`, например из исходного кода:

   ```console
   $ git clone --branch v2.6.0 https://github.com/ClickHouse/clickhouse-cpp.git
   $ mkdir clickhouse-cpp/build && cd clickhouse-cpp/build
   $ cmake ..
   $ make
   $ sudo make install
   ```

1. Для подключения с TLS выполните код:

   ```cpp
   #include <clickhouse/client.h>

   clickhouse::Client client(
       clickhouse::ClientOptions()
           .SetHost("<ХОСТ>")
           .SetPort("<ПОРТ>")
           .SetUser("<ЛОГИН>")
           .SetPassword("<ПАРОЛЬ>")
           .SetDefaultDatabase("<БД>")
           .SetSSLOptions(clickhouse::ClientOptions::SSLOptions()
               .SetSkipVerification(true))
   );

   clickhouse::Block block;
   client.Select("SELECT version()", &block);
   if (block.GetRowCount() > 0) {
       std::cout << block[0]->As<clickhouse::ColumnString>()->At(0) << std::endl;
   }
   ```

   {note:info}
   Метод `SetSkipVerification(true)` отключает проверку сертификата сервера. Соединение при этом остается зашифрованным.
   {/note}

   Для подключения без TLS уберите метод `.SetSSLOptions(...)` из цепочки вызовов `ClientOptions()`.

## {heading(Go)[id=clickhouse_connect-go]}

Для подключения с помощью Go по TCP или HTTP используйте драйвер [clickhouse-go](https://github.com/ClickHouse/clickhouse-go).

Рекомендуемая версия драйвера — `2.48.0`. Минимальная — `2.0.0`.

{tabs}

{tab(TCP)}

1. Откройте терминал и установите драйвер:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. Для подключения с TLS выполните код:

   ```go
   package main

   import (
       "database/sql"
       "fmt"
       "log"

       _ "github.com/ClickHouse/clickhouse-go/v2"
   )

   func main() {
       conn, err := sql.Open("clickhouse", "clickhouse://<ЛОГИН>:<ПАРОЛЬ>@<ХОСТ>:<ПОРТ>/<БД>?secure=true&skip_verify=true")
       if err != nil {
           log.Fatal(err)
       }
       defer conn.Close()

       var version string
       if err := conn.QueryRow("SELECT version()").Scan(&version); err != nil {
           log.Fatal(err)
       }
       fmt.Println(version)
   }
   ```

   {note:info}
   Параметр `skip_verify=true` отключает проверку сертификата сервера. Соединение при этом остается зашифрованным.
   {/note}

   Для подключения без TLS уберите параметры `secure=true&skip_verify=true` из строки подключения.

{/tab}

{tab(HTTP)}

1. Откройте терминал и установите драйвер:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. Для подключения с TLS выполните код:

   ```go
   package main

   import (
       "database/sql"
       "fmt"
       "log"

       _ "github.com/ClickHouse/clickhouse-go/v2"
   )

   func main() {
       conn, err := sql.Open("clickhouse", "clickhouse://<ЛОГИН>:<ПАРОЛЬ>@<ХОСТ>:<ПОРТ>/<БД>?protocol=http&secure=true&skip_verify=true")
       if err != nil {
           log.Fatal(err)
       }
       defer conn.Close()

       var version string
       if err := conn.QueryRow("SELECT version()").Scan(&version); err != nil {
           log.Fatal(err)
       }
       fmt.Println(version)
   }
   ```

   {note:info}
   Параметр `skip_verify=true` отключает проверку сертификата сервера. Соединение при этом остается зашифрованным.
   {/note}

   Для подключения без TLS уберите параметры `secure=true&skip_verify=true` из строки подключения.

{/tab}

{/tabs}
