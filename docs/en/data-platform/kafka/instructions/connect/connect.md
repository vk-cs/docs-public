# {heading(Connecting to a service instance)[id=kafka_connect]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

You can connect to a Cloud Kafka service instance over TLS using Kafka CLI and other third-party clients.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Connecting via Kafka CLI)[id=kafka_connect-kafka-cli]}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the service instance.
1. On the instance page, go to the **General Information** tab.
1. Copy the connection string specified in the **Kafka bootstrap TLS connection** field.
1. Open a terminal.
1. Create a client configuration file:
   1. Set the variables with the Cloud Kafka account login and password:
   
      ```console
      K_USERNAME="<LOGIN>"
      K_PASSWORD="<PASSWORD>"
      ```         

   1. Create the `/tmp/client.properties` configuration file using the command:

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
1. Set the environment variables:

   ```console
   export K_BOOTSTRAP=<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>
   export K_CLI_BASE=<PATH_TO_KAFKA_CLI_DIRECTORY>
   export K_CONFIG=/tmp/client.properties
   ```   
   
   Here:
   
   - `<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>` — the copied Cloud Kafka connection string;
   - `<PATH_TO_KAFKA_CLI_DIRECTORY>` — the directory where Kafka CLI is installed. Example: `/opt/homebrew/opt/kafka/bin`.
   
1. Start Kafka CLI and get the list of topics:

   ```console
   "${K_CLI_BASE}/kafka-topics" --command-config "${K_CONFIG}" --bootstrap-server "${K_BOOTSTRAP}" --list
   ```

   Example output:
   ```console
   __consumer_offsets
   my-test-topic-for-metrics
   ...
   ```