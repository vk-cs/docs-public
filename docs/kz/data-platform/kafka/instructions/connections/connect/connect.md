# {heading(Kafka CLI және kcat)[id=kafka_connect-cli]}

{include(/kz/_includes/_translated_by_ai.md)}

Терминалдан орналастырылған Cloud Kafka данасына қосылу үшін Kafka CLI немесе kcat пайдаланыңыз. Құралды тапсырмаға байланысты таңдаңыз:

- Kafka CLI — Kafka-ны басқару, хабарламаларды жіберу және оқу үшін.
- kcat — Java орнатпай қосылуды тексеру, хабарламаларды жіберу және оқу үшін.

## {heading(Қосылуға дайындық)[id=kafka_connect-preparation]}

{note:info}
Kafka CLI жұмысы үшін Java орнатылған болуы керек.
{/note}

1. [Kafka CLI](https://kafka.apache.org/quickstart/) немесе [kcat](https://github.com/edenhill/kcat#install) орнатыңыз.

{include(../../../../_includes/_kafka.md)[tags=connection-preparation]}

## {heading(Kafka CLI)[id=kafka_connect-kafka-cli]}

### {heading(Linux және macOS)[id=kafka_connect-kafka-cli-unix]}

1. Терминалды ашып, Cloud Kafka тіркелгісінің логині мен паролі бар айнымалыларды орнатыңыз:

   ```bash
   K_USERNAME="<ЛОГИН>"
   K_PASSWORD="<ПАРОЛЬ>"
   ```

1. TLS арқылы немесе TLS-сіз қосылу үшін `/tmp/client.properties` конфигурация файлын жасаңыз:

   {tabs}

   {tab(TLS)}

   ```bash
   cat > /tmp/client.properties <<EOF
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${K_USERNAME}" password="${K_PASSWORD}";
   ssl.truststore.type=PEM
   ssl.truststore.location=<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>
   ssl.endpoint.identification.algorithm=
   request.timeout.ms=30000
   EOF
   ```

   Мұндағы `<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>`: қосылуға дайындық кезінде **Жалпы ақпарат** қойындысынан жүктеп алынған сертификаттар тізбегі файлының жолы.

   {note:info}
   `ssl.endpoint.identification.algorithm` параметрі сервер атауының сертификатқа сәйкестігін тексеруді өшіреді. Көрсетілген файл арқылы сертификатқа сенімділікті тексеру сақталады.
   {/note}

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
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

1. Орта айнымалыларын орнатыңыз:

   ```bash
   export K_BOOTSTRAP="<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>"
   export K_CLI_BASE="<KAFKA_CLI_ДИРЕКТОРИЯСЫНА_ЖОЛ>"
   export K_CONFIG=/tmp/client.properties
   ```

   Мұндағы:

   - `<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>`: дайындық кезінде көшірілген қосылу жолы;
   - `<KAFKA_CLI_ДИРЕКТОРИЯСЫНА_ЖОЛ>`: Kafka CLI орнатылған директория. Мысалы: `/opt/homebrew/opt/kafka/bin`.

1. Топиктер тізімін алыңыз:

   ```bash
   "${K_CLI_BASE}/kafka-topics.sh" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --list
   ```

   Терминалда қолжетімді топиктер тізімі пайда болады. Қолжетімді топиктер болмаса, нәтиже бос болуы мүмкін.

### {heading(Windows)[id=kafka_connect-kafka-cli-windows]}

1. PowerShell ашып, Cloud Kafka тіркелгісінің логині мен паролі бар айнымалыларды орнатыңыз:

   ```powershell
   $env:K_USERNAME = "<ЛОГИН>"
   $env:K_PASSWORD = "<ПАРОЛЬ>"
   ```

1. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу үшін клиент конфигурациясының файлын жасаңыз:

   {tabs}

   {tab(TLS)}

   ```powershell
   @"
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="$env:K_USERNAME" password="$env:K_PASSWORD";
   ssl.truststore.type=PEM
   ssl.truststore.location=<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>
   ssl.endpoint.identification.algorithm=
   request.timeout.ms=30000
   "@ | Set-Content -Path "$env:TEMP\client.properties" -Encoding ASCII
   ```

   Мұндағы `<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>`: қосылуға дайындық кезінде **Жалпы ақпарат** қойындысынан жүктеп алынған сертификаттар тізбегі файлының жолы. Жолда қиғаш сызықтарды пайдаланыңыз, мысалы `C:/certs/ca.crt`.

   {note:info}
   `ssl.endpoint.identification.algorithm` параметрі сервер атауының сертификатқа сәйкестігін тексеруді өшіреді. Көрсетілген файл арқылы сертификатқа сенімділікті тексеру сақталады.
   {/note}

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
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

1. Орта айнымалыларын орнатыңыз:

   ```powershell
   $env:K_BOOTSTRAP = "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>"
   $env:K_CLI_BASE  = "<KAFKA_CLI_ДИРЕКТОРИЯСЫНА_ЖОЛ>"
   $env:K_CONFIG    = "$env:TEMP\client.properties"
   ```

   Мұндағы:

   - `<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>`: дайындық кезінде көшірілген қосылу жолы;
   - `<KAFKA_CLI_ДИРЕКТОРИЯСЫНА_ЖОЛ>`: Kafka CLI скрипттері бар директория, мысалы `C:\kafka\bin\windows`.

   Kafka CLI үшін қысқа жолы бар директорияны пайдаланыңыз, мысалы `C:\kafka`. Жол ұзын болса, скрипт `The input line is too long` қатесімен аяқталуы мүмкін.

1. Топиктер тізімін алыңыз:

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --list
   ```

   Терминалда қолжетімді топиктер тізімі пайда болады. Қолжетімді топиктер болмаса, нәтиже бос болуы мүмкін.

## {heading(kcat)[id=kafka_connect-kcat]}

Терминалды ашып, таңдалған қосылу нұсқасына арналған команданы орындаңыз.

{tabs}

{tab(TLS)}

```console
kcat -b "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>" -X security.protocol=SASL_SSL -X sasl.mechanism=SCRAM-SHA-512 -X sasl.username="<ЛОГИН>" -X sasl.password="<ПАРОЛЬ>" -X ssl.ca.location="<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>" -L
```

Команда Cloud Kafka данасының брокерлері мен топиктері туралы ақпаратты шығарады.

{/tab}

{tab(TLS-сіз)}

{note:warn}
TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
{/note}

```console
kcat -b "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>" -X security.protocol=SASL_PLAINTEXT -X sasl.mechanism=SCRAM-SHA-512 -X sasl.username="<ЛОГИН>" -X sasl.password="<ПАРОЛЬ>" -L
```

Команда Cloud Kafka данасының брокерлері мен топиктері туралы ақпаратты шығарады.

{/tab}

{/tabs}

{include(../../../../_includes/_kafka.md)[tags=connection-values]}
