# {heading(Сервис данысына қосылу)[id=clickhouse_connect]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Cloud ClickHouse екі протокол бойынша қосылымдарды қабылдайды: TCP және HTTP. Сервис данасымен байланыс өзіне-өзі қол қойылған TLS-сертификат арқылы қорғалған.

Нұсқаулықта `clickhouse-client` көмегімен (терминалдан қосылу үшін) және Python, Java, C++, Go драйверлері (қосымша кодынан қосылу үшін) арқылы қосылым мысалдары келтірілген.

{note:info}
Нұсқаулық Cloud ClickHouse-тың `24.3.18.7` және `25.3.14.14` нұсқаларына қатысты.
{/note}

## {heading(Қосылуға дайындық)[id=clickhouse_connect-prepare]}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз. Қажетті Cloud ClickHouse данасы `Активно` статусында екеніне көз жеткізіңіз.
1. Сервис данасының **Жалпы ақпарат** қойындысынан қажетті қосылым жолынан, протоколға (TCP немесе HTTP) және TLS-шифрлаудың болуына байланысты хост пен портты көшіріп алыңыз.
1. Деректер қорының атауын, сондай-ақ Cloud ClickHouse пайдаланушы тіркелгісінің логині мен құпиясөзін дайындаңыз. Бұл мыналар болуы мүмкін:

   - дана жасау кезінде {linkto(../../instructions/create#clickhouse_create)[text=берілген пайдаланушы]};
   - данаға қолмен {linkto(../../instructions/manage#clickhouse_add_admin)[text=қосылған]}. қосымша пайдаланушы.

Әрі қарайғы әрекеттер қосылу тәсіліне байланысты:

- {linkto(#clickhouse_connect-clickhouse-client)[text=clickhouse-client]}
- {linkto(#clickhouse_connect-python)[text=Python]}
- {linkto(#clickhouse_connect-java)[text=Java]}
- {linkto(#clickhouse_connect-cpp)[text=C++]}
- {linkto(#clickhouse_connect-go)[text=Go]}

Әрбір қосылу мысалын орындаған нәтижеде Cloud ClickHouse нұсқасы шығарылады.

## {heading(clickhouse-client)[id=clickhouse_connect-clickhouse-client]}

`clickhouse-client` Cloud ClickHouse данасына TCP арқылы қосылуды мүмкіндік береді. Дананың нұсқасымен бірдей клиент нұсқасын пайдалану ұсынылады. Ең аз талап — нұсқа нөмірінің алғашқы екі санының сәйкес келуі: `24.3.18.7` нұсқалы дана үшін `24.3.0.0` және одан жоғары клиент, `25.3.14.14` нұсқасы үшін — `25.3.0.0` және одан жоғары клиент жарамды.

1. Қажетті нұсқаның пакетін жүктеп алыңыз:

   - [24.3.18.7](https://github.com/ClickHouse/ClickHouse/releases/tag/v24.3.18.7-lts);
   - [25.3.14.14](https://github.com/ClickHouse/ClickHouse/releases/tag/v25.3.14.14-lts).

1. Клиентті [ClickHouse ресми құжаттамасындағы нұсқаулық](https://clickhouse.com/docs/ru/concepts/features/interfaces/client) бойынша орнатыңыз.

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

   TLS жоқ қосылу үшін `--secure` және `--accept-invalid-certificate` жалаушаларын алып тастаңыз.

1. Сынақ сұрауын орындап, байланысты тексеріңіз:

   ```sql
   SELECT version();
   ```

## {heading(Python)[id=clickhouse_connect-python]}

Python көмегімен қосылу үшін протокол түріне байланысты драйверді пайдаланыңыз:

- [clickhouse-connect](https://pypi.org/project/clickhouse-connect/) — HTTP арқылы қосылу. Ұсынылатын нұсқа — `1.6.0`. Ең аз нұсқа — `1.0.0`.
- [clickhouse-driver](https://pypi.org/project/clickhouse-driver/) — TCP арқылы қосылу. Ұсынылатын нұсқа — `0.2.11`. Ең аз нұсқа — `0.2.0`.

{tabs}

{tab(clickhouse-connect)}

1. Терминалды ашып, драйверді орнатыңыз:

   ```console
   $ pip install clickhouse-connect==1.6.0
   ```

1. TLS арқылы қосылу үшін кодты орындаңыз:

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
   `verify=False` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде байланыс шифрланған күйінде қалады.
   {/note}

   TLS жоқ қосылу үшін `secure=True` және `verify=False` параметрлерін алып тастаңыз.

{/tab}

{tab(clickhouse-driver)}

1. Терминалды ашып, драйверді орнатыңыз:

   ```console
   $ pip install clickhouse-driver==0.2.11
   ```

1. TLS арқылы қосылу үшін кодты орындаңыз:

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
   `verify=False` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде байланыс шифрланған күйінде қалады.
   {/note}

   TLS жоқ қосылу үшін `secure=True` және `verify=False` параметрлерін алып тастаңыз.

{/tab}

{/tabs}

## {heading(Java)[id=clickhouse_connect-java]}

Java көмегімен HTTP протоколы арқылы қосылу үшін [clickhouse-jdbc](https://github.com/ClickHouse/clickhouse-java) JDBC-драйверін пайдаланыңыз.

Драйвердің ұсынылатын нұсқасы — `0.9.8`. Ең аз нұсқа — `0.7.0`.

1. Жобалық тәуелділікті қосыңыз:

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

1. TLS арқылы қосылу үшін кодты орындаңыз:

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
   `sslmode=NONE` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде байланыс шифрланған күйінде қалады.
   {/note}

   TLS жоқ қосылу үшін URL-адрестен `?ssl=true&sslmode=NONE` параметрлерін алып тастаңыз.

## {heading(C++)[id=clickhouse_connect-cpp]}

C++ көмегімен TCP арқылы қосылу үшін [clickhouse-cpp](https://github.com/ClickHouse/clickhouse-cpp) клиенттік кітапханасын пайдаланыңыз.

Кітапхананың ұсынылатын және ең аз нұсқасы — `2.6.0`.

1. Терминалды ашып, `clickhouse-cpp` кітапханасын, мысалы, бастапқы кодтан орнатыңыз:

   ```console
   $ git clone --branch v2.6.0 https://github.com/ClickHouse/clickhouse-cpp.git
   $ mkdir clickhouse-cpp/build && cd clickhouse-cpp/build
   $ cmake ..
   $ make
   $ sudo make install
   ```

1. TLS арқылы қосылу үшін кодты орындаңыз:

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
   `SetSkipVerification(true)` әдісі сервер сертификатын тексеруді өшіреді. Бұл кезде байланыс шифрланған күйінде қалады.
   {/note}

   TLS жоқ қосылу үшін `ClientOptions()` шақырулар тізбегінен `.SetSSLOptions(...)` әдісін алып тастаңыз.

## {heading(Go)[id=clickhouse_connect-go]}

Go көмегімен TCP немесе HTTP арқылы қосылу үшін [clickhouse-go](https://github.com/ClickHouse/clickhouse-go) драйверін пайдаланыңыз.

Драйвердің ұсынылатын нұсқасы — `2.48.0`. Ең аз нұсқа — `2.0.0`.

{tabs}

{tab(TCP)}

1. Терминалды ашып, драйверді орнатыңыз:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. TLS арқылы қосылу үшін кодты орындаңыз:

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
   `skip_verify=true` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде байланыс шифрланған күйінде қалады.
   {/note}

   TLS жоқ қосылу үшін қосылым жолынан `secure=true&skip_verify=true` параметрлерін алып тастаңыз.

{/tab}

{tab(HTTP)}

1. Терминалды ашып, драйверді орнатыңыз:

   ```console
   $ go get github.com/ClickHouse/clickhouse-go/v2@v2.48.0
   ```

1. TLS арқылы қосылу үшін кодты орындаңыз:

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
   `skip_verify=true` параметрі сервер сертификатын тексеруді өшіреді. Бұл кезде байланыс шифрланған күйінде қалады.
   {/note}

   TLS жоқ қосылу үшін қосылым жолынан `secure=true&skip_verify=true` параметрлерін алып тастаңыз.

{/tab}

{/tabs}