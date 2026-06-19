# {heading(Подключение к экземпляру сервиса)[id=kafka_connect]}

Подключиться к экземпляру сервиса Cloud Kafka по TLS можно с помощью Kafka CLI и других сторонних клиентов.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Подключение через Kafka CLI)[id=kafka_connect-kafka-cli]}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Скопируйте строку подключения, указанную в поле **Kafka bootstrap TLS connection**.
1. Откройте терминал.
1. Создайте конфигурационный файл клиента:
   1. Задайте переменные с логином и паролем учетной записи Cloud Kafka:
   
      ```console
      K_USERNAME="<ЛОГИН>"
      K_PASSWORD="<ПАРОЛЬ>"
      ```         

   1. Создайте файл конфигурации `/tmp/client.properties` с помощью команды:

      ```console
      cat > /tmp/client.properties <<EOF
      security.protocol=SASL_SSL
      sasl.mechanism=SCRAM-SHA-512
      sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${K_USERNAME}" password="${K_PASSWORD}";
      ssl.truststore.type=PEM
      ssl.truststore.location=/tmp/CA.crt
      ssl.endpoint.identification.algorithm=
      enable.ssl.certificate.verification=false
      request.timeout.ms=30000
      EOF
      ```
1. Задайте переменные окружения:

   ```console
   export K_BOOTSTRAP=<АДРЕС_И_ПОРТ_BOOSTRAP-СЕРВЕРА>
   export K_CLI_BASE=<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>
   export K_CONFIG=/tmp/client.properties
   ```   
   
   Здесь:
   
   - `<АДРЕС_И_ПОРТ_BOOSTRAP-СЕРВЕРА>` — скопированная строка подключения к Cloud Kafka;
   - `<ПУТЬ_К_ДИРЕКТОРИИ_KAFKA_CLI>` — директория, в которой установлен Kafka CLI. Пример: `/opt/homebrew/opt/kafka/bin`.
   
1. Запустите Kafka CLI и получите список топиков:

   ```console
   "${K_CLI_BASE}/kafka-topics" --command-config "${K_CONFIG}" --bootstrap-server "${K_BOOTSTRAP}" --list
   ```

   Пример вывода:
   ```console
   __consumer_offsets
   my-test-topic-for-metrics
   ...
   ```