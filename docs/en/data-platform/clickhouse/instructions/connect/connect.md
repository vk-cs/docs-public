# {heading(Connecting to a service instance)[id=clickhouse_connect]}

{include(/en/_includes/_translated_by_ai.md)}

Cloud ClickHouse accepts connections over two protocols: TCP and HTTP. The connection to the service instance is protected with a self-signed TLS certificate.

The instructions provide examples of connecting using `clickhouse-client` (for connecting from a terminal) and drivers for Python, Java, C++, and Go (for connecting from application code).

{note:info}
The instructions apply to Cloud ClickHouse versions `24.3.18.7` and `25.3.14.14`.
{/note}

## {heading(Preparing to connect)[id=clickhouse_connect-prepare]}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to **Data Platform** → **Service instances**. Make sure that the required Cloud ClickHouse instance has the `Active` status.
1. On the **General information** tab of the service instance, copy the host and port from the required connection string, depending on the protocol (TCP or HTTP) and whether TLS encryption is enabled.
1. Prepare the database name, login, and password for the Cloud ClickHouse user account. This can be:

   - a user {linkto(../create#clickhouse_create)[text=specified when creating the instance]};
   - an additional user {linkto(../manage#clickhouse_add_admin)[text=added to the instance]} manually.

The following steps depend on the connection method:

- {linkto(#clickhouse_connect-clickhouse-client)[text=clickhouse-client]}
- {linkto(#clickhouse_connect-python)[text=Python]}
- {linkto(#clickhouse_connect-java)[text=Java]}
- {linkto(#clickhouse_connect-cpp)[text=C++]}
- {linkto(#clickhouse_connect-go)[text=Go]}

The Cloud ClickHouse version is displayed after each connection example is executed.

## {heading(clickhouse-client)[id=clickhouse_connect-clickhouse-client]}

`clickhouse-client` allows you to connect to a Cloud ClickHouse instance over TCP. We recommend using a client of the same version as the instance. The minimum requirement is that the first two version numbers match: for an instance of version `24.3.18.7`, use client version `24.3.0.0` or higher; for version `25.3.14.14`, use client version `25.3.0.0` or higher.

1. Download the package of the required version:

   - [24.3.18.7](https://github.com/ClickHouse/ClickHouse/releases/tag/v24.3.18.7-lts);
   - [25.3.14.14](https://github.com/ClickHouse/ClickHouse/releases/tag/v25.3.14.14-lts).

1. Install the client by following the [instructions in the official ClickHouse documentation](https://clickhouse.com/docs/ru/concepts/features/interfaces/client).

1. Open a terminal and connect with TLS:

   ```console
   $ clickhouse-client \
      --host=<HOST> \
      --port=<PORT> \
      --user='<LOGIN>' \
      --password='<PASSWORD>' \
      --secure \
      --accept-invalid-certificate
   ```

   To connect without TLS, remove the `--secure` and `--accept-invalid-certificate` flags.

1. Check the connection by running a test query:

   ```sql
   SELECT version();
   ```

## {heading(Python)[id=clickhouse_connect-python]}

To connect using Python, use the driver:

- [clickhouse-connect](https://pypi.org/project/clickhouse-connect/) — HTTP connection. Recommended version — `1.6.0`. Minimum — `1.0.0`.
- [clickhouse-driver](https://pypi.org/project/clickhouse-driver/) — TCP connection. Recommended version — `0.2.11`. Minimum — `0.2.0`.

{tabs}

{tab(clickhouse-connect)}

1. Open a terminal and install the driver:

   ```console
   $ pip install clickhouse-connect==1.6.0
   ```

1. To connect to Cloud ClickHouse with TLS, run the command:

   ```python
   import clickhouse_connect

   client = clickhouse_connect.get_client(
       host='<HOST>',
       port='<PORT>',
       username='<LOGIN>',
       password='<PASSWORD>',
       database='<DB>',
       secure=True,
       verify=False
   )

   print(client.command('SELECT version()'))
   ```

   {note:info}
   The `verify=False` parameter disables server certificate verification. The connection remains encrypted.
   {/note}

   To connect without TLS, remove the `secure=True` and `verify=False` parameters.

{/tab}

{tab(clickhouse-driver)}

1. Open a terminal and install the driver:

   ```console
   $ pip install clickhouse-driver==0.2.11
   ```

1. To connect to Cloud ClickHouse with TLS, run the command:

   ```python
   from clickhouse_driver import Client

   client = Client(
       host='<HOST>',
       port='<PORT>',
       user='<LOGIN>',
       password='<PASSWORD>',
       database='<DB>',
       secure=True,
       verify=False
   )

   print(client.execute('SELECT version()'))
   ```

   {note:info}
   The `verify=False` parameter disables server certificate verification. The connection remains encrypted.
   {/note}

   To connect without TLS, remove the `secure=True` and `verify=False` parameters.

{/tab}

{/tabs}

## {heading(Java)[id=clickhouse_connect-java]}

To connect using Java over the HTTP protocol, use the [clickhouse-jdbc](https://github.com/ClickHouse/clickhouse-java) JDBC driver.

Recommended driver version — `0.9.8`. Minimum — `0.7.0`.

1. Add the dependency to your project:

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

1. To connect to Cloud ClickHouse with TLS, run the command:

   ```java
   import com.clickhouse.jdbc.ClickHouseDataSource;

   String url = "jdbc:clickhouse://<HOST>:<PORT>/<DB>?ssl=true&sslmode=NONE";
   Properties props = new Properties();
   props.setProperty("user", "<LOGIN>");
   props.setProperty("password", "<PASSWORD>");

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
   The `sslmode=NONE` parameter disables server certificate verification. The connection remains encrypted.
   {/note}

   To connect without TLS, remove the `?ssl=true&sslmode=NONE` parameters from the URL.

## {heading(C++)[id=clickhouse_connect-cpp]}

To connect using C++ over TCP, use the [clickhouse-cpp](https://github.com/ClickHouse/clickhouse-cpp) client library.

Recommended library version — `2.6.0`.

1. Open a terminal and install the `clickhouse-cpp` library, for example from source:

   ```console
   $ git clone --branch v2.6.0 https://github.com/ClickHouse/clickhouse-cpp.git
   $ mkdir clickhouse-cpp/build && cd clickhouse-cpp/build
   $ cmake ..
   $ make
   $ sudo make install
   ```

1. To connect to Cloud ClickHouse with TLS, run the command:

   ```cpp
   #include <clickhouse/client.h>

   clickhouse::Client client(
       clickhouse::ClientOptions()
           .SetHost("<HOST>")
           .SetPort("<PORT>")
           .SetUser("<LOGIN>")
           .SetPassword("<PASSWORD>")
           .SetDefaultDatabase("<DB>")
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
   The `SetSkipVerification(true)` method disables server certificate verification. The connection remains encrypted.
   {/note}

   To connect without TLS, remove the `.SetSSLOptions(...)` method from the `ClientOptions()` call chain.

## {heading(Go)[id=clickhouse_connect-go]}

To connect using Go over TCP or HTTP, use the [clickhouse-go](https://github.com/ClickHouse/clickhouse-go) driver.

Recommended driver version — `2.48.0`. Minimum — `2.0.0`.

{tabs}

{tab(TCP)}

1. Open a terminal and install the driver:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. To connect to Cloud ClickHouse with TLS, run the command:

   ```go
   package main

   import (
       "database/sql"
       "fmt"
       "log"

       _ "github.com/ClickHouse/clickhouse-go/v2"
   )

   func main() {
       conn, err := sql.Open("clickhouse", "clickhouse://<LOGIN>:<PASSWORD>@<HOST>:<PORT>/<DB>?secure=true&skip_verify=true")
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
   The `skip_verify=true` parameter disables server certificate verification. The connection remains encrypted.
   {/note}

   To connect without TLS, remove the `secure=true&skip_verify=true` parameters from the connection string.

{/tab}

{tab(HTTP)}

1. Open a terminal and install the driver:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. To connect to Cloud ClickHouse with TLS, run the command:

   ```go
   package main

   import (
       "database/sql"
       "fmt"
       "log"

       _ "github.com/ClickHouse/clickhouse-go/v2"
   )

   func main() {
       conn, err := sql.Open("clickhouse", "clickhouse://<LOGIN>:<PASSWORD>@<HOST>:<PORT>/<DB>?protocol=http&secure=true&skip_verify=true")
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
   The `skip_verify=true` parameter disables server certificate verification. The connection remains encrypted.
   {/note}

   To connect without TLS, remove the `secure=true&skip_verify=true` parameters from the connection string.

{/tab}

{/tabs}
