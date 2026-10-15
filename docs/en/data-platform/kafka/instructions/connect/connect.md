# {heading(Connect through Kafka CLI and kcat)[id=kafka_connect-cli]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai.md)}

To connect to a deployed Cloud Kafka instance from a terminal, use Kafka CLI or kcat. Choose a tool based on your task:

- Kafka CLI — to connect to and administer Kafka.
- kcat — to check the connection and work with messages from a terminal.

## {heading(Prepare to connect)[id=kafka_connect-preparation]}

1. Install [Kafka CLI](https://kafka.apache.org/quickstart/) or [kcat](https://github.com/edenhill/kcat#install).

{include(../../../_includes/_kafka.md)[tags=connection-preparation]}

## {heading(Kafka CLI)[id=kafka_connect-kafka-cli]}

### {heading(Linux and macOS)[id=kafka_connect-kafka-cli-unix]}

1. Open a terminal and set variables with your Cloud Kafka account username and password:

   ```bash
   K_USERNAME="<USERNAME>"
   K_PASSWORD="<PASSWORD>"
   ```

1. Create the `/tmp/client.properties` configuration file for a connection with TLS (traffic is encrypted) or without TLS (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```bash
   cat > /tmp/client.properties <<EOF
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="${K_USERNAME}" password="${K_PASSWORD}";
   ssl.truststore.type=PEM
   ssl.truststore.location=<CERTIFICATE_CHAIN_PATH>
   ssl.endpoint.identification.algorithm=
   request.timeout.ms=30000
   EOF
   ```

   Here, `<CERTIFICATE_CHAIN_PATH>` is the path to the certificate chain file downloaded from the **General information** tab during preparation.

   {note:info}
   The `ssl.endpoint.identification.algorithm` parameter disables server hostname verification against the certificate. Certificate trust verification using the specified file remains enabled.
   {/note}

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only in an isolated network.
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

1. Set the environment variables:

   ```bash
   export K_BOOTSTRAP="<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>"
   export K_CLI_BASE="<KAFKA_CLI_DIRECTORY_PATH>"
   export K_CONFIG=/tmp/client.properties
   ```

   Here:

   - `<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>`: the connection string copied during preparation;
   - `<KAFKA_CLI_DIRECTORY_PATH>`: the directory where Kafka CLI is installed. Example: `/opt/homebrew/opt/kafka/bin`.

1. Get the list of topics:

   ```bash
   "${K_CLI_BASE}/kafka-topics.sh" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --list
   ```

   The terminal displays the list of available topics. If no topics are available, the output may be empty.

### {heading(Windows)[id=kafka_connect-kafka-cli-windows]}

1. Open PowerShell and set variables with your Cloud Kafka account username and password:

   ```powershell
   $env:K_USERNAME = "<USERNAME>"
   $env:K_PASSWORD = "<PASSWORD>"
   ```

1. Create a client configuration file for a connection with TLS (traffic is encrypted) or without TLS (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```powershell
   @"
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="$env:K_USERNAME" password="$env:K_PASSWORD";
   ssl.truststore.type=PEM
   ssl.truststore.location=<CERTIFICATE_CHAIN_PATH>
   ssl.endpoint.identification.algorithm=
   request.timeout.ms=30000
   "@ | Set-Content -Path "$env:TEMP\client.properties" -Encoding ASCII
   ```

   Here, `<CERTIFICATE_CHAIN_PATH>` is the path to the certificate chain file downloaded from the **General information** tab during preparation. Use forward slashes in the path, for example `C:/certs/ca.crt`.

   {note:info}
   The `ssl.endpoint.identification.algorithm` parameter disables server hostname verification against the certificate. Certificate trust verification using the specified file remains enabled.
   {/note}

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only in an isolated network.
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

1. Set the environment variables:

   ```powershell
   $env:K_BOOTSTRAP = "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>"
   $env:K_CLI_BASE  = "<KAFKA_CLI_DIRECTORY_PATH>"
   $env:K_CONFIG    = "$env:TEMP\client.properties"
   ```

   Here:

   - `<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>`: the connection string copied during preparation;
   - `<KAFKA_CLI_DIRECTORY_PATH>`: the directory containing Kafka CLI scripts, for example `C:\kafka\bin\windows`.

   Use a directory with a short path for Kafka CLI, for example `C:\kafka`. A long path may cause the script to fail with the error `The input line is too long`.

1. Get the list of topics:

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --list
   ```

   The terminal displays the list of available topics. If no topics are available, the output may be empty.

## {heading(kcat)[id=kafka_connect-kcat]}

Open a terminal and run the command for the selected connection option.

{tabs}

{tab(TLS)}

```console
kcat -b "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>" -X security.protocol=SASL_SSL -X sasl.mechanism=SCRAM-SHA-512 -X sasl.username="<USERNAME>" -X sasl.password="<PASSWORD>" -X ssl.ca.location="<CERTIFICATE_CHAIN_PATH>" -L
```

The command displays information about the brokers and topics of the Cloud Kafka instance.

{/tab}

{tab(Without TLS)}

{note:warn}
Traffic is not encrypted when connecting without TLS. Use this option only in an isolated network.
{/note}

```console
kcat -b "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>" -X security.protocol=SASL_PLAINTEXT -X sasl.mechanism=SCRAM-SHA-512 -X sasl.username="<USERNAME>" -X sasl.password="<PASSWORD>" -L
```

The command displays information about the brokers and topics of the Cloud Kafka instance.

{/tab}

{/tabs}

{include(../../../_includes/_kafka.md)[tags=connection-values]}
