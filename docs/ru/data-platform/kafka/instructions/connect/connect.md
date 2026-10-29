# {heading(Подключение к экземпляру сервиса)[id=kafka_connect]}

{ifdef(public)}
{include(/ru/_includes/_dp-unavailable.md)}
{/ifdef}

Подключиться к экземпляру сервиса Cloud Kafka по TLS можно с помощью Kafka CLI и других сторонних клиентов.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Подключение через Kafka CLI)[id=kafka_connect-kafka-cli]}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Скопируйте строку подключения, указанную в поле **Kafka bootstrap TLS connection**.
1. В блоке сертификата нажмите **•••** → **Скачать**. Поместите скачанный сертификат под именем `CA.crt` в `/tmp` для Linux/macOS или в `%TEMP%` для Windows.
1. Откройте терминал.
1. Создайте конфигурационный файл клиента:
   1. Задайте переменные с логином и паролем учетной записи Cloud Kafka:

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

   1. Создайте файл конфигурации с помощью команды:

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

1. Задайте переменные окружения:

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

   Здесь:

   - `<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>` — скопированная строка подключения к Cloud Kafka.
   - `<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>` — директория, куда были распакованы скрипты Kafka CLI.

   В Windows распакуйте Kafka в директорию с коротким путем, например `C:\kafka`. При длинном пути скрипт может завершиться с ошибкой `The input line is too long`.

   В дистрибутиве Apache Kafka для Linux скрипты имеют расширение `.sh`. При использовании этого дистрибутива добавьте `.sh` к именам `kafka-topics` и `kafka-configs` в командах этой инструкции и инструкции по управлению топиками.

1. Запустите Kafka CLI и получите список топиков:

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

   Пример вывода:
   ```console
   __consumer_offsets
   my-test-topic-for-metrics
   ...
   ```
