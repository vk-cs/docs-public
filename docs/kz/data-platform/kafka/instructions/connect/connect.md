# {heading(Сервис данасына қосылу)[id=kafka_connect]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

TLS арқылы Cloud Kafka сервис данасына Kafka CLI және басқа да үшінші тарап клиенттері көмегімен қосылуға болады.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Kafka CLI арқылы қосылу)[id=kafka_connect-kafka-cli]}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Сервис данасының атауын басыңыз.
1. Дана бетінде **Жалпы ақпарат** қойындысына өтіңіз.
1. **Kafka bootstrap TLS connection** өрісінде көрсетілген қосылу жолын көшіріп алыңыз.
1. Сертификат блогында **•••** → **Жүктеу** түймелерін басыңыз. Жүктелген сертификатты `CA.crt` атауымен Linux/macOS үшін `/tmp` ішіне, Windows үшін `%TEMP%` ішіне орналастырыңыз.
1. Терминалды ашыңыз.
1. Клиенттің конфигурациялық файлын жасаңыз:
   1. Cloud Kafka тіркелгісінің логині мен паролі бар айнымалыларды орнатыңыз:

      {tabs}

      {tab(Linux/macOS)}

      ```bash
      K_USERNAME="<ЛОГИН>"
      K_PASSWORD="<ПАРОЛЬ>"
      ```

      {/tab}

      {tab(Windows)}

      ```powershell
      $env:K_USERNAME = "<ЛОГИН>"
      $env:K_PASSWORD = "<ПАРОЛЬ>"
      ```

      {/tab}

      {/tabs}

   1. Конфигурация файлын команданың көмегімен жасаңыз:

      {tabs}

      {tab(Linux/macOS)}

      ```bash
      cat > /tmp/client.properties <<EOF
      security.protocol=SASL_SSL
      sasl.mechanism=SCRAM-SHA-512
      sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${K_USERNAME}" password="${K_PASSWORD}";
      ssl.truststore.type=PEM
      ssl.truststore.location=/tmp/CA.crt
      ssl.endpoint.identification.algorithm=
      request.timeout.ms=30000
      EOF
      ```

      {/tab}

      {tab(Windows)}

      ```powershell
      @"
      security.protocol=SASL_SSL
      sasl.mechanism=SCRAM-SHA-512
      sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="$env:K_USERNAME" password="$env:K_PASSWORD";
      ssl.truststore.type=PEM
      ssl.truststore.location=$($env:TEMP -replace '\\','/')/CA.crt
      ssl.endpoint.identification.algorithm=
      request.timeout.ms=30000
      "@ | Set-Content -Path "$env:TEMP\client.properties" -Encoding ASCII
      ```

      {/tab}

      {/tabs}

1. Орта айнымалыларын орнатыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   export K_BOOTSTRAP=<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>
   export K_CLI_BASE=<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>
   export K_CONFIG=/tmp/client.properties
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   $env:K_BOOTSTRAP = "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>"
   $env:K_CLI_BASE  = "<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>"
   $env:K_CONFIG    = "$env:TEMP\client.properties"
   ```

   {/tab}

   {/tabs}

   Мұнда:

   - `<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>` — көшіріп алынған Cloud Kafka-ға қосылу жолы.
   - `<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>` — Kafka CLI скрипттері таратылған директория.

   Windows-та Kafka жолы қысқа директорияға таратыңыз, мысалы `C:\kafka`. Жол ұзын болса, скрипт `The input line is too long` қатесімен аяқталуы мүмкін.

   Linux үшін Apache Kafka дистрибутивінде скрипттерде `.sh` кеңейтімі бар. Осы дистрибутивті пайдаланған кезде осы нұсқаулық пен топиктерді басқару нұсқаулығындағы командалардағы `kafka-topics` және `kafka-configs` атауларына `.sh` қосыңыз.

1. Kafka CLI іске қосыңыз және топиктер тізімін алыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
     --command-config "${K_CONFIG}" \
     --bootstrap-server "${K_BOOTSTRAP}" \
     --list
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
     --command-config "$env:K_CONFIG" `
     --bootstrap-server "$env:K_BOOTSTRAP" `
     --list
   ```

   {/tab}

   {/tabs}

   Шығару мысалы:
   ```console
   __consumer_offsets
   my-test-topic-for-metrics
   ...
   ```