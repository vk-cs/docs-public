# {heading(Connect from application code)[id=kafka_connect-app]}

{include(/en/_includes/_translated_by_ai.md)}

To connect to a deployed Cloud Kafka instance from application code, use a client library for your programming language. The following examples cover Java, Scala, Python, Go, C / C++, .NET, and Node.js.

## {heading(Prepare to connect)[id=kafka_connect-preparation]}

{include(../../../_includes/_kafka.md)[tags=connection-preparation]}

Continue with the instructions for your programming language:

- {linkto(#kafka_connect-java)[text=Java]}
- {linkto(#kafka_connect-scala)[text=Scala]}
- {linkto(#kafka_connect-python)[text=Python]}
- {linkto(#kafka_connect-go)[text=Go]}
- {linkto(#kafka_connect-c)[text=C / C++]}
- {linkto(#kafka_connect-dotnet)[text=.NET]}
- {linkto(#kafka_connect-node)[text=Node.js]}

## {heading(Java)[id=kafka_connect-java]}

To connect with Java, use the [kafka-clients](https://kafka.apache.org/41/javadoc/) library. The minimum JDK version is `11`.

1. Add a dependency to your Java project using Maven or Gradle:

   {tabs}

   {tab(Maven)}

   ```xml
   <dependency>
       <groupId>org.apache.kafka</groupId>
       <artifactId>kafka-clients</artifactId>
       <version>4.1.0</version>
   </dependency>
   ```

   {/tab}

   {tab(Gradle)}

   ```groovy
   implementation 'org.apache.kafka:kafka-clients:4.1.0'
   ```

   {/tab}

   {/tabs}

1. Create `CheckKafka.java` with the connection code in the Java source directory of your project. In a standard Maven or Gradle project, this is `src/main/java`. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```java
   import java.util.Properties;
   import org.apache.kafka.clients.admin.AdminClient;

   public class CheckKafka {
       public static void main(String[] args) throws Exception {
           Properties props = new Properties();
           props.put("bootstrap.servers", "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>");
           props.put("security.protocol", "SASL_SSL");
           props.put("sasl.mechanism", "SCRAM-SHA-512");
           props.put("sasl.jaas.config",
                   "org.apache.kafka.common.security.scram.ScramLoginModule required " +
                   "username=\"<USERNAME>\" password=\"<PASSWORD>\";");
           props.put("ssl.truststore.type", "PEM");
           props.put("ssl.truststore.location", "<CERTIFICATE_CHAIN_PATH>");
           props.put("ssl.endpoint.identification.algorithm", "");

           try (AdminClient admin = AdminClient.create(props)) {
               System.out.println("Брокеры: " + admin.describeCluster().nodes().get());
           }
       }
   }
   ```

   {note:info}
   The `ssl.endpoint.identification.algorithm` parameter disables verification that the server name matches the certificate. Certificate trust verification using the specified file remains enabled.
   {/note}

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```java
   import java.util.Properties;
   import org.apache.kafka.clients.admin.AdminClient;

   public class CheckKafka {
       public static void main(String[] args) throws Exception {
           Properties props = new Properties();
           props.put("bootstrap.servers", "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>");
           props.put("security.protocol", "SASL_PLAINTEXT");
           props.put("sasl.mechanism", "SCRAM-SHA-512");
           props.put("sasl.jaas.config",
                   "org.apache.kafka.common.security.scram.ScramLoginModule required " +
                   "username=\"<USERNAME>\" password=\"<PASSWORD>\";");

           try (AdminClient admin = AdminClient.create(props)) {
               System.out.println("Брокеры: " + admin.describeCluster().nodes().get());
           }
       }
   }
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Run the `CheckKafka` class using your IDE or build system. If the program displays broker information without an error, the client has connected to Cloud Kafka.

## {heading(Scala)[id=kafka_connect-scala]}

To connect with Scala, use the [kafka-clients](https://kafka.apache.org/41/javadoc/) library. The minimum JDK version is `11`.

1. Add a dependency to `build.sbt`:

   ```scala
   libraryDependencies += "org.apache.kafka" % "kafka-clients" % "4.1.0"
   ```

1. Create `CheckKafka.scala` with the connection code in the `src/main/scala` directory of your SBT project. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```scala
   import java.util.Properties
   import org.apache.kafka.clients.admin.AdminClient

   object CheckKafka {
     def main(args: Array[String]): Unit = {
       val props = new Properties()
       props.put("bootstrap.servers", "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>")
       props.put("security.protocol", "SASL_SSL")
       props.put("sasl.mechanism", "SCRAM-SHA-512")
       props.put("sasl.jaas.config",
         "org.apache.kafka.common.security.scram.ScramLoginModule required " +
           "username=\"<USERNAME>\" password=\"<PASSWORD>\";")
       props.put("ssl.truststore.type", "PEM")
       props.put("ssl.truststore.location", "<CERTIFICATE_CHAIN_PATH>")
       props.put("ssl.endpoint.identification.algorithm", "")

       val admin = AdminClient.create(props)
       try {
         println(s"Брокеры: ${admin.describeCluster().nodes().get()}")
       } finally {
         admin.close()
       }
     }
   }
   ```

   {note:info}
   The `ssl.endpoint.identification.algorithm` parameter disables verification that the server name matches the certificate. Certificate trust verification using the specified file remains enabled.
   {/note}

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```scala
   import java.util.Properties
   import org.apache.kafka.clients.admin.AdminClient

   object CheckKafka {
     def main(args: Array[String]): Unit = {
       val props = new Properties()
       props.put("bootstrap.servers", "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>")
       props.put("security.protocol", "SASL_PLAINTEXT")
       props.put("sasl.mechanism", "SCRAM-SHA-512")
       props.put("sasl.jaas.config",
         "org.apache.kafka.common.security.scram.ScramLoginModule required " +
           "username=\"<USERNAME>\" password=\"<PASSWORD>\";")

       val admin = AdminClient.create(props)
       try {
         println(s"Брокеры: ${admin.describeCluster().nodes().get()}")
       } finally {
         admin.close()
       }
     }
   }
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Run the following command in a terminal from the project directory:

   ```console
   $ sbt "runMain CheckKafka"
   ```

   If the program displays broker information without an error, the client has connected to Cloud Kafka.

## {heading(Python)[id=kafka_connect-python]}

To connect with Python, use the [confluent-kafka-python](https://docs.confluent.io/platform/current/clients/confluent-kafka-python/html/index.html) client library.

1. Install the library in a terminal in the same Python environment in which you will run the example:

   ```console
   $ pip install confluent-kafka
   ```

1. Create `check.py` with the connection code in the project directory. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```python
   from confluent_kafka.admin import AdminClient

   conf = {
       "bootstrap.servers": "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>",
       "security.protocol": "SASL_SSL",
       "sasl.mechanism": "SCRAM-SHA-512",
       "sasl.username": "<USERNAME>",
       "sasl.password": "<PASSWORD>",
       "ssl.ca.location": "<CERTIFICATE_CHAIN_PATH>",
   }

   metadata = AdminClient(conf).list_topics(timeout=10)
   print("Брокеров:", len(metadata.brokers))
   ```

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```python
   from confluent_kafka.admin import AdminClient

   conf = {
       "bootstrap.servers": "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>",
       "security.protocol": "SASL_PLAINTEXT",
       "sasl.mechanism": "SCRAM-SHA-512",
       "sasl.username": "<USERNAME>",
       "sasl.password": "<PASSWORD>",
   }

   metadata = AdminClient(conf).list_topics(timeout=10)
   print("Брокеров:", len(metadata.brokers))
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Run the following command in a terminal from the directory containing the file:

   ```console
   $ python check.py
   ```

   If the script displays a broker count greater than zero without an error, the client has connected to Cloud Kafka.

## {heading(Go)[id=kafka_connect-go]}

To connect with Go, use the [Sarama](https://pkg.go.dev/github.com/IBM/sarama) client library.

1. In a terminal, go to the Go project directory.
1. Install the dependencies:

   ```console
   go get github.com/IBM/sarama github.com/xdg-go/scram
   ```

1. Add `scram_client.go` to your project with code for username and password authentication through `Sarama`:

   ```go
   package main

   import (
       "crypto/sha512"

       "github.com/IBM/sarama"
       "github.com/xdg-go/scram"
   )

   type scramClient struct {
       *scram.Client
       *scram.ClientConversation
       scram.HashGeneratorFcn
   }

   func newSCRAMClient() sarama.SCRAMClient {
       return &scramClient{HashGeneratorFcn: sha512.New}
   }

   func (c *scramClient) Begin(user, password, authzID string) (err error) {
       c.Client, err = c.HashGeneratorFcn.NewClient(user, password, authzID)
       if err != nil {
           return err
       }
       c.ClientConversation = c.Client.NewConversation()
       return nil
   }

   func (c *scramClient) Step(challenge string) (string, error) {
       return c.ClientConversation.Step(challenge)
   }

   func (c *scramClient) Done() bool {
       return c.ClientConversation.Done()
   }
   ```

1. Create `main.go` with the connection code in the Go module directory. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```go
   package main

   import (
       "crypto/tls"
       "crypto/x509"
       "fmt"
       "log"
       "os"

       "github.com/IBM/sarama"
   )

   func main() {
       config := sarama.NewConfig()
       config.Net.SASL.Enable = true
       config.Net.SASL.Mechanism = sarama.SASLTypeSCRAMSHA512
       config.Net.SASL.User = "<USERNAME>"
       config.Net.SASL.Password = "<PASSWORD>"
       config.Net.SASL.SCRAMClientGeneratorFunc = newSCRAMClient
       caPEM, err := os.ReadFile("<CERTIFICATE_CHAIN_PATH>")
       if err != nil {
           log.Fatal(err)
       }
       roots := x509.NewCertPool()
       if !roots.AppendCertsFromPEM(caPEM) {
           log.Fatal("Файл не содержит сертификатов PEM")
       }
       config.Net.TLS.Enable = true
       config.Net.TLS.Config = &tls.Config{RootCAs: roots}

       client, err := sarama.NewClient([]string{"<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>"}, config)
       if err != nil {
           log.Fatal(err)
       }
       defer client.Close()

       fmt.Println("Брокеров:", len(client.Brokers()))
   }
   ```

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```go
   package main

   import (
       "fmt"
       "log"

       "github.com/IBM/sarama"
   )

   func main() {
       config := sarama.NewConfig()
       config.Net.SASL.Enable = true
       config.Net.SASL.Mechanism = sarama.SASLTypeSCRAMSHA512
       config.Net.SASL.User = "<USERNAME>"
       config.Net.SASL.Password = "<PASSWORD>"
       config.Net.SASL.SCRAMClientGeneratorFunc = newSCRAMClient

       client, err := sarama.NewClient([]string{"<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>"}, config)
       if err != nil {
           log.Fatal(err)
       }
       defer client.Close()

       fmt.Println("Брокеров:", len(client.Brokers()))
   }
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Run the program:

   ```console
   $ go run .
   ```

   If the program displays a broker count greater than zero without an error, the client has connected to Cloud Kafka.

## {heading(C / C++)[id=kafka_connect-c]}

To connect with C or C++, use the [librdkafka](https://docs.confluent.io/platform/current/clients/librdkafka/html/index.html) client library. The examples use its C API.

1. Install the librdkafka development files with TLS and SASL SCRAM support. For example, run the following command in an Ubuntu terminal:

   ```console
   sudo apt update && sudo apt install librdkafka-dev
   ```

   On macOS, you can install the library with `brew install librdkafka`; on CentOS/RHEL, use `sudo yum install librdkafka-devel`. The build commands below require an environment where the compiler can access the librdkafka headers and library.

1. Create `check.c` with the connection code. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```c
   #include <stdio.h>
   #include <librdkafka/rdkafka.h>

   int main(void) {
       char errstr[512];
       rd_kafka_conf_t *conf = rd_kafka_conf_new();
       rd_kafka_conf_set(conf, "bootstrap.servers", "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "security.protocol", "SASL_SSL", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.mechanism", "SCRAM-SHA-512", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.username", "<USERNAME>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.password", "<PASSWORD>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "ssl.ca.location", "<CERTIFICATE_CHAIN_PATH>", errstr, sizeof(errstr));

       rd_kafka_t *client = rd_kafka_new(RD_KAFKA_PRODUCER, conf, errstr, sizeof(errstr));
       if (client == NULL) {
           fprintf(stderr, "Ошибка создания клиента: %s\n", errstr);
           return 1;
       }

       const rd_kafka_metadata_t *metadata;
       rd_kafka_resp_err_t err = rd_kafka_metadata(client, 0, NULL, &metadata, 10000);
       if (err != RD_KAFKA_RESP_ERR_NO_ERROR) {
           fprintf(stderr, "Ошибка подключения: %s\n", rd_kafka_err2str(err));
           rd_kafka_destroy(client);
           return 1;
       }

       printf("Брокеров: %d\n", metadata->broker_cnt);
       rd_kafka_metadata_destroy(metadata);
       rd_kafka_destroy(client);
       return 0;
   }
   ```

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```c
   #include <stdio.h>
   #include <librdkafka/rdkafka.h>

   int main(void) {
       char errstr[512];
       rd_kafka_conf_t *conf = rd_kafka_conf_new();
       rd_kafka_conf_set(conf, "bootstrap.servers", "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "security.protocol", "SASL_PLAINTEXT", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.mechanism", "SCRAM-SHA-512", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.username", "<USERNAME>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.password", "<PASSWORD>", errstr, sizeof(errstr));

       rd_kafka_t *client = rd_kafka_new(RD_KAFKA_PRODUCER, conf, errstr, sizeof(errstr));
       if (client == NULL) {
           fprintf(stderr, "Ошибка создания клиента: %s\n", errstr);
           return 1;
       }

       const rd_kafka_metadata_t *metadata;
       rd_kafka_resp_err_t err = rd_kafka_metadata(client, 0, NULL, &metadata, 10000);
       if (err != RD_KAFKA_RESP_ERR_NO_ERROR) {
           fprintf(stderr, "Ошибка подключения: %s\n", rd_kafka_err2str(err));
           rd_kafka_destroy(client);
           return 1;
       }

       printf("Брокеров: %d\n", metadata->broker_cnt);
       rd_kafka_metadata_destroy(metadata);
       rd_kafka_destroy(client);
       return 0;
   }
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. In a terminal, compile `check.c` from its directory and run the resulting program:

   ```console
   $ gcc check.c -o check -lrdkafka
   $ ./check
   ```

   If the program displays a broker count greater than zero without an error, the client has connected to Cloud Kafka.

## {heading(.NET)[id=kafka_connect-dotnet]}

To connect with .NET, use the [Confluent.Kafka](https://docs.confluent.io/kafka-clients/dotnet/current/overview.html) client library.

1. Create a console application to check the connection and go to its project directory:

   ```console
   $ dotnet new console -o kafka-check
   $ cd kafka-check
   ```

1. Install the library in the project directory:

   ```console
   $ dotnet add package Confluent.Kafka
   ```

1. Replace the contents of `Program.cs` in the new project with the connection code. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```csharp
   using System;
   using Confluent.Kafka;

   var config = new AdminClientConfig
   {
       BootstrapServers = "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>",
       SecurityProtocol = SecurityProtocol.SaslSsl,
       SaslMechanism = SaslMechanism.ScramSha512,
       SaslUsername = "<USERNAME>",
       SaslPassword = "<PASSWORD>",
       SslCaLocation = "<CERTIFICATE_CHAIN_PATH>",
   };

   using var admin = new AdminClientBuilder(config).Build();
   var metadata = admin.GetMetadata(TimeSpan.FromSeconds(10));
   Console.WriteLine($"Брокеров: {metadata.Brokers.Count}");
   ```

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```csharp
   using System;
   using Confluent.Kafka;

   var config = new AdminClientConfig
   {
       BootstrapServers = "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>",
       SecurityProtocol = SecurityProtocol.SaslPlaintext,
       SaslMechanism = SaslMechanism.ScramSha512,
       SaslUsername = "<USERNAME>",
       SaslPassword = "<PASSWORD>",
   };

   using var admin = new AdminClientBuilder(config).Build();
   var metadata = admin.GetMetadata(TimeSpan.FromSeconds(10));
   Console.WriteLine($"Брокеров: {metadata.Brokers.Count}");
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Run the following command in a terminal from the test project directory:

   ```console
   $ dotnet run
   ```

   If the application displays a broker count greater than zero without an error, the client has connected to Cloud Kafka.

## {heading(Node.js)[id=kafka_connect-node]}

To connect with Node.js, use the [@confluentinc/kafka-javascript](https://docs.confluent.io/kafka-clients/javascript/current/overview.html) client library.

1. Install the library in the project directory:

   ```console
   $ npm install @confluentinc/kafka-javascript
   ```

1. Create `check.cjs` with the connection code in the project directory. Use the TLS option (traffic is encrypted) or the non-TLS option (traffic is not encrypted):

   {tabs}

   {tab(TLS)}

   ```javascript
   const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;

   const config = {
       "bootstrap.servers": "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>",
       "security.protocol": "SASL_SSL",
       "sasl.mechanisms": "SCRAM-SHA-512",
       "sasl.username": "<USERNAME>",
       "sasl.password": "<PASSWORD>",
       "ssl.ca.location": "<CERTIFICATE_CHAIN_PATH>",
   };

   async function checkConnection() {
       const admin = new Kafka().admin(config);
       await admin.connect();
       try {
           await admin.listTopics({ timeout: 10000 });
           console.log("Подключение к Cloud Kafka установлено");
       } finally {
           await admin.disconnect();
       }
   }

   checkConnection().catch((error) => {
       console.error(error);
       process.exitCode = 1;
   });
   ```

   {/tab}

   {tab(Without TLS)}

   {note:warn}
   Traffic is not encrypted when connecting without TLS. Use this option only on an isolated network.
   {/note}

   ```javascript
   const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;

   const config = {
       "bootstrap.servers": "<BOOTSTRAP_SERVER_ADDRESS_AND_PORT>",
       "security.protocol": "SASL_PLAINTEXT",
       "sasl.mechanisms": "SCRAM-SHA-512",
       "sasl.username": "<USERNAME>",
       "sasl.password": "<PASSWORD>",
   };

   async function checkConnection() {
       const admin = new Kafka().admin(config);
       await admin.connect();
       try {
           await admin.listTopics({ timeout: 10000 });
           console.log("Подключение к Cloud Kafka установлено");
       } finally {
           await admin.disconnect();
       }
   }

   checkConnection().catch((error) => {
       console.error(error);
       process.exitCode = 1;
   });
   ```

   {/tab}

   {/tabs}

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Run the script in a terminal:

   ```console
   $ node check.cjs
   ```

   If the script displays a connection established message without an error, the client has connected to Cloud Kafka.
