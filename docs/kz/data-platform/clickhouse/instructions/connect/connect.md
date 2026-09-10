# {heading(Қызмет данасына қосылу)[id=clickhouse_connect]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud ClickHouse екі протокол бойынша қосылымдарды қабылдайды: TCP және HTTP. Сервис данасына қосылым өзіне қол қойылған TLS сертификаты арқылы қорғалған.

Нұсқаулықта `clickhouse-client` (терминалдан қосылу үшін) және Python, Java, C++ және Go драйверлері (қолданба кодынан қосылу үшін) арқылы қосылу мысалдары келтірілген.

{note:info}
Нұсқаулық Cloud ClickHouse `24.3.18.7` және `25.3.14.14` нұсқалары үшін жарамды.
{/note}

## {heading(Қосылуға дайындық)[id=clickhouse_connect-prepare]}

{ifdef(public)}
1. {var(cloud)} [жеке кабинетіне өтіңіз](https://msk.cloud.vk.ru/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз. Қажетті Cloud ClickHouse данасының күйі `Белсенді` екенін тексеріңіз.
1. Сервис данасының **Жалпы ақпарат** қойындысындағы қажетті қосылым жолынан протоколға (TCP немесе HTTP) және TLS шифрлауының болуына қарай хост пен портты көшіріңіз.
1. Дерекқор атауын, сондай-ақ Cloud ClickHouse пайдаланушы тіркелгісінің логині мен құпиясөзін дайындаңыз. Бұл мына пайдаланушылардың бірі болуы мүмкін:

   - {linkto(../create#clickhouse_create)[text=дананы жасау кезінде көрсетілген]} пайдаланушы;
   - қолмен {linkto(../manage#clickhouse_add_admin)[text=данаға қосылған]} қосымша пайдаланушы.

Келесі әрекеттер қосылу әдісіне байланысты:

- {linkto(#clickhouse_connect-clickhouse-client)[text=clickhouse-client]}
- {linkto(#clickhouse_connect-python)[text=Python]}
- {linkto(#clickhouse_connect-java)[text=Java]}
- {linkto(#clickhouse_connect-cpp)[text=C++]}
- {linkto(#clickhouse_connect-go)[text=Go]}

Әр қосылу мысалын орындағаннан кейін Cloud ClickHouse нұсқасы көрсетіледі.

## {heading(clickhouse-client)[id=clickhouse_connect-clickhouse-client]}

`clickhouse-client` Cloud ClickHouse данасына TCP арқылы қосылуға мүмкіндік береді. Дана нұсқасымен бірдей клиент нұсқасын пайдалану ұсынылады. Ең төменгі талап — нұсқаның алғашқы екі саны сәйкес келуі: `24.3.18.7` нұсқасындағы дана үшін `24.3.0.0` немесе одан жоғары клиентті, `25.3.14.14` нұсқасы үшін `25.3.0.0` немесе одан жоғары клиентті пайдаланыңыз.

1. Қажетті нұсқаның пакетін жүктеп алыңыз:

   - [24.3.18.7](https://github.com/ClickHouse/ClickHouse/releases/tag/v24.3.18.7-lts);
   - [25.3.14.14](https://github.com/ClickHouse/ClickHouse/releases/tag/v25.3.14.14-lts).

1. Клиентті [ClickHouse ресми құжаттамасындағы нұсқауларды](https://clickhouse.com/docs/ru/concepts/features/interfaces/client) орындау арқылы орнатыңыз.

1. Терминалды ашып, TLS арқылы қосылыңыз:

   ```console
   $ clickhouse-client \
      --host=<ХОСТ> \
      --port=<ПОРТ> \
      --user='<ЛОГИН>' \
      --password='<ПАРОЛЬ>' \
      --secure \
      --accept-invalid-certificate
   ```

   TLS-сіз қосылу үшін `--secure` және `--accept-invalid-certificate` флагтарын алып тастаңыз.

1. Тест сұранысын орындау арқылы қосылымды тексеріңіз:

   ```sql
   SELECT version();
   ```

## {heading(Python)[id=clickhouse_connect-python]}

Python арқылы қосылу үшін драйверді пайдаланыңыз:

- [clickhouse-connect](https://pypi.org/project/clickhouse-connect/) — HTTP бойынша қосылу. Ұсынылатын нұсқа — `1.6.0`. Ең төменгі — `1.0.0`.
- [clickhouse-driver](https://pypi.org/project/clickhouse-driver/) — TCP бойынша қосылу. Ұсынылатын нұсқа — `0.2.11`. Ең төменгі — `0.2.0`.

{tabs}

{tab(clickhouse-connect)}

1. Терминалды ашыңыз және драйверді орнатыңыз:

   ```console
   $ pip install clickhouse-connect==1.6.0
   ```

1. TLS арқылы Cloud ClickHouse-ге қосылу үшін команданы орындаңыз:

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
   `verify=False` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде қосылым шифрланған күйінде қалады.
   {/note}

   TLS-сіз қосылу үшін `secure=True` және `verify=False` параметрлерін алып тастаңыз.

{/tab}

{tab(clickhouse-driver)}

1. Терминалды ашыңыз және драйверді орнатыңыз:

   ```console
   $ pip install clickhouse-driver==0.2.11
   ```

1. TLS арқылы Cloud ClickHouse-ге қосылу үшін команданы орындаңыз:

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
   `verify=False` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде қосылым шифрланған күйінде қалады.
   {/note}

   TLS-сіз қосылу үшін `secure=True` және `verify=False` параметрлерін алып тастаңыз.

{/tab}

{/tabs}

## {heading(Java)[id=clickhouse_connect-java]}

Java арқылы HTTP протоколы бойынша қосылу үшін [clickhouse-jdbc](https://github.com/ClickHouse/clickhouse-java) JDBC драйверін пайдаланыңыз.

Ұсынылатын драйвер нұсқасы — `0.9.8`. Ең төменгі — `0.7.0`.

1. Жобаға тәуелділікті қосыңыз:

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

1. TLS арқылы Cloud ClickHouse-ге қосылу үшін команданы орындаңыз:

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
   `sslmode=NONE` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде қосылым шифрланған күйінде қалады.
   {/note}

   TLS-сіз қосылу үшін URL-мекенжайдан `?ssl=true&sslmode=NONE` параметрлерін алып тастаңыз.

## {heading(C++)[id=clickhouse_connect-cpp]}

C++ арқылы TCP бойынша қосылу үшін [clickhouse-cpp](https://github.com/ClickHouse/clickhouse-cpp) клиенттік кітапханасын пайдаланыңыз.

Ұсынылатын кітапхана нұсқасы — `2.6.0`.

1. Терминалды ашыңыз және `clickhouse-cpp` кітапханасын орнатыңыз, мысалы, бастапқы кодтан:

   ```console
   $ git clone --branch v2.6.0 https://github.com/ClickHouse/clickhouse-cpp.git
   $ mkdir clickhouse-cpp/build && cd clickhouse-cpp/build
   $ cmake ..
   $ make
   $ sudo make install
   ```

1. TLS арқылы Cloud ClickHouse-ге қосылу үшін команданы орындаңыз:

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
   `SetSkipVerification(true)` әдісі сервер сертификатын тексеруді өшіреді. Бұл кезде қосылым шифрланған күйінде қалады.
   {/note}

   TLS-сіз қосылу үшін `.SetSSLOptions(...)` әдісін `ClientOptions()` шақырулар тізбегінен алып тастаңыз.

## {heading(Go)[id=clickhouse_connect-go]}

Go арқылы TCP немесе HTTP бойынша қосылу үшін [clickhouse-go](https://github.com/ClickHouse/clickhouse-go) драйверін пайдаланыңыз.

Ұсынылатын драйвер нұсқасы — `2.48.0`. Ең төменгі — `2.0.0`.

{tabs}

{tab(TCP)}

1. Терминалды ашыңыз және драйверді орнатыңыз:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. TLS арқылы Cloud ClickHouse-ге қосылу үшін команданы орындаңыз:

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
   `skip_verify=true` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде қосылым шифрланған күйінде қалады.
   {/note}

   TLS-сіз қосылу үшін қосылым жолынан `secure=true&skip_verify=true` параметрлерін алып тастаңыз.

{/tab}

{tab(HTTP)}

1. Терминалды ашыңыз және драйверді орнатыңыз:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. TLS арқылы Cloud ClickHouse-ге қосылу үшін команданы орындаңыз:

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
   `skip_verify=true` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде қосылым шифрланған күйінде қалады.
   {/note}

   TLS-сіз қосылу үшін қосылым жолынан `secure=true&skip_verify=true` параметрлерін алып тастаңыз.

{/tab}

{/tabs}
