# {heading(Подключение через Kafka CLI и kcat)[id=kafka_connect-cli]}

{ifdef(public)}
{include(/ru/_includes/_dp-unavailable.md)}
{/ifdef}

Для подключения к развернутому экземпляру Cloud Kafka из терминала используйте Kafka CLI или kcat. Выберите инструмент в зависимости от задачи:

- Kafka CLI — для подключения и дальнейшего администрирования Kafka.
- kcat — для проверки подключения и работы с сообщениями из терминала.

## {heading(Подготовка к подключению)[id=kafka_connect-preparation]}

1. Установите [Kafka CLI](https://kafka.apache.org/quickstart/) или [kcat](https://github.com/edenhill/kcat#install).

{include(../../../_includes/_kafka.md)[tags=connection-preparation]}

## {heading(Kafka CLI)[id=kafka_connect-kafka-cli]}

### {heading(Linux и macOS)[id=kafka_connect-kafka-cli-unix]}

1. Откройте терминал и задайте переменные с логином и паролем учетной записи Cloud Kafka:

   ```bash
   K_USERNAME="<ЛОГИН>"
   K_PASSWORD="<ПАРОЛЬ>"
   ```

1. Создайте файл конфигурации `/tmp/client.properties` для подключения с TLS или без него:

   {tabs}

   {tab(TLS)}

   ```bash
   cat > /tmp/client.properties <<EOF
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${K_USERNAME}" password="${K_PASSWORD}";
   ssl.truststore.type=PEM
   ssl.truststore.location=<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>
   ssl.endpoint.identification.algorithm=
   request.timeout.ms=30000
   EOF
   ```

   Здесь `<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>`: путь к файлу цепочки сертификатов, скачанному на вкладке **Общая информация** при подготовке к подключению.

   {note:info}
   Параметр `ssl.endpoint.identification.algorithm` отключает проверку соответствия имени сервера сертификату. Проверка доверия к сертификату по указанному файлу сохраняется.
   {/note}

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```bash
   cat > /tmp/client.properties <<EOF
   security.protocol=SASL_PLAINTEXT
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${K_USERNAME}" password="${K_PASSWORD}";
   request.timeout.ms=30000
   EOF
   ```

   {/tab}

   {/tabs}

1. Задайте переменные окружения:

   ```bash
   export K_BOOTSTRAP="<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>"
   export K_CLI_BASE="<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>"
   export K_CONFIG=/tmp/client.properties
   ```

   Здесь:

   - `<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>`: строка подключения, скопированная при подготовке;
   - `<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>`: директория, в которой установлен Kafka CLI. Пример: `/opt/homebrew/opt/kafka/bin`.

1. Получите список топиков:

   ```bash
   "${K_CLI_BASE}/kafka-topics.sh" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --list
   ```

   В терминале появится список доступных топиков. Если доступных топиков нет, вывод может быть пустым.

### {heading(Windows)[id=kafka_connect-kafka-cli-windows]}

1. Откройте PowerShell и задайте переменные с логином и паролем учетной записи Cloud Kafka:

   ```powershell
   $env:K_USERNAME = "<ЛОГИН>"
   $env:K_PASSWORD = "<ПАРОЛЬ>"
   ```

1. Создайте файл конфигурации клиента для подключения с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```powershell
   @"
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="$env:K_USERNAME" password="$env:K_PASSWORD";
   ssl.truststore.type=PEM
   ssl.truststore.location=<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>
   ssl.endpoint.identification.algorithm=
   request.timeout.ms=30000
   "@ | Set-Content -Path "$env:TEMP\client.properties" -Encoding ASCII
   ```

   Здесь `<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>`: путь к файлу цепочки сертификатов, скачанному на вкладке **Общая информация** при подготовке к подключению. В пути используйте прямые слеши, например `C:/certs/ca.crt`.

   {note:info}
   Параметр `ssl.endpoint.identification.algorithm` отключает проверку соответствия имени сервера сертификату. Проверка доверия к сертификату по указанному файлу сохраняется.
   {/note}

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```powershell
   @"
   security.protocol=SASL_PLAINTEXT
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="$env:K_USERNAME" password="$env:K_PASSWORD";
   request.timeout.ms=30000
   "@ | Set-Content -Path "$env:TEMP\client.properties" -Encoding ASCII
   ```

   {/tab}

   {/tabs}

1. Задайте переменные окружения:

   ```powershell
   $env:K_BOOTSTRAP = "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>"
   $env:K_CLI_BASE  = "<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>"
   $env:K_CONFIG    = "$env:TEMP\client.properties"
   ```

   Здесь:

   - `<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>`: строка подключения, скопированная при подготовке;
   - `<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>`: директория со скриптами Kafka CLI, например `C:\kafka\bin\windows`.

   Используйте для Kafka CLI директорию с коротким путем, например `C:\kafka`. При длинном пути скрипт может завершиться с ошибкой `The input line is too long`.

1. Получите список топиков:

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --list
   ```

   В терминале появится список доступных топиков. Если доступных топиков нет, вывод может быть пустым.

## {heading(kcat)[id=kafka_connect-kcat]}

Откройте терминал и выполните команду для выбранного варианта подключения.

{tabs}

{tab(TLS)}

```console
kcat -b "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>" -X security.protocol=SASL_SSL -X sasl.mechanism=SCRAM-SHA-512 -X sasl.username="<ЛОГИН>" -X sasl.password="<ПАРОЛЬ>" -X ssl.ca.location="<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>" -L
```

Команда выведет информацию о брокерах и топиках экземпляра Cloud Kafka.

{/tab}

{tab(Без TLS)}

{note:warn}
При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
{/note}

```console
kcat -b "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>" -X security.protocol=SASL_PLAINTEXT -X sasl.mechanism=SCRAM-SHA-512 -X sasl.username="<ЛОГИН>" -X sasl.password="<ПАРОЛЬ>" -L
```

Команда выведет информацию о брокерах и топиках экземпляра Cloud Kafka.

{/tab}

{/tabs}

{include(../../../_includes/_kafka.md)[tags=connection-values]}
