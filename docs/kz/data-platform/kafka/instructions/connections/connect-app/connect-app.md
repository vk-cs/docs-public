# {heading(Қолданба кодынан)[id=kafka_connect-app]}

{include(/kz/_includes/_translated_by_ai.md)}

Орналастырылған Cloud Kafka данасына қолданба кодынан қосылу үшін бағдарламалау тіліңізге арналған клиенттік кітапхананы пайдаланыңыз. Төменде Java, Scala, Python, Go, C / C++, .NET және Node.js тілдеріне арналған мысалдар берілген.

## {heading(Қосылуға дайындық)[id=kafka_connect-preparation]}

{include(../../../../_includes/_kafka.md)[tags=connection-preparation]}

Келесі әрекеттер бағдарламалау тіліне байланысты:

- {linkto(#kafka_connect-java)[text=Java]}
- {linkto(#kafka_connect-scala)[text=Scala]}
- {linkto(#kafka_connect-python)[text=Python]}
- {linkto(#kafka_connect-go)[text=Go]}
- {linkto(#kafka_connect-c)[text=C / C++]}
- {linkto(#kafka_connect-dotnet)[text=.NET]}
- {linkto(#kafka_connect-node)[text=Node.js]}

## {heading(Java)[id=kafka_connect-java]}

Java арқылы қосылу үшін [kafka-clients](https://kafka.apache.org/41/javadoc/) клиенттік кітапханасын пайдаланыңыз. JDK-ның ең төменгі нұсқасы — `11`.

1. Maven немесе Gradle пайдаланатын Java жобасына тәуелділікті қосыңыз:

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

1. Жобаның Java бастапқы код директориясында қосылу коды бар `CheckKafka.java` файлын жасаңыз. Стандартты Maven немесе Gradle жобасында бұл — `src/main/java`. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

   {tabs}

   {tab(TLS)}

   ```java
   import java.util.Properties;
   import org.apache.kafka.clients.admin.AdminClient;

   public class CheckKafka {
       public static void main(String[] args) throws Exception {
           Properties props = new Properties();
           props.put("bootstrap.servers", "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>");
           props.put("security.protocol", "SASL_SSL");
           props.put("sasl.mechanism", "SCRAM-SHA-512");
           props.put("sasl.jaas.config",
                   "org.apache.kafka.common.security.scram.ScramLoginModule required " +
                   "username=\"<ЛОГИН>\" password=\"<ПАРОЛЬ>\";");
           props.put("ssl.truststore.type", "PEM");
           props.put("ssl.truststore.location", "<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>");
           props.put("ssl.endpoint.identification.algorithm", "");

           try (AdminClient admin = AdminClient.create(props)) {
               System.out.println("Брокеры: " + admin.describeCluster().nodes().get());
           }
       }
   }
   ```

   {note:info}
   `ssl.endpoint.identification.algorithm` параметрі сервер атауының сертификатқа сәйкестігін тексеруді өшіреді. Көрсетілген файл арқылы сертификаттың сенімділігін тексеру сақталады.
   {/note}

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
   {/note}

   ```java
   import java.util.Properties;
   import org.apache.kafka.clients.admin.AdminClient;

   public class CheckKafka {
       public static void main(String[] args) throws Exception {
           Properties props = new Properties();
           props.put("bootstrap.servers", "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>");
           props.put("security.protocol", "SASL_PLAINTEXT");
           props.put("sasl.mechanism", "SCRAM-SHA-512");
           props.put("sasl.jaas.config",
                   "org.apache.kafka.common.security.scram.ScramLoginModule required " +
                   "username=\"<ЛОГИН>\" password=\"<ПАРОЛЬ>\";");

           try (AdminClient admin = AdminClient.create(props)) {
               System.out.println("Брокеры: " + admin.describeCluster().nodes().get());
           }
       }
   }
   ```

   {/tab}

   {/tabs}

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. `CheckKafka` класын IDE немесе құрастыру жүйесі арқылы іске қосыңыз. Бағдарлама брокерлер туралы мәліметтерді қатесіз шығарса, клиент Cloud Kafka-ға қосылды.

## {heading(Scala)[id=kafka_connect-scala]}

Scala арқылы қосылу үшін [kafka-clients](https://kafka.apache.org/41/javadoc/) клиенттік кітапханасын пайдаланыңыз. JDK-ның ең төменгі нұсқасы — `11`.

1. `build.sbt` файлына тәуелділікті қосыңыз:

   ```scala
   libraryDependencies += "org.apache.kafka" % "kafka-clients" % "4.1.0"
   ```

1. SBT жобасының `src/main/scala` директориясында қосылу коды бар `CheckKafka.scala` файлын жасаңыз. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

   {tabs}

   {tab(TLS)}

   ```scala
   import java.util.Properties
   import org.apache.kafka.clients.admin.AdminClient

   object CheckKafka {
     def main(args: Array[String]): Unit = {
       val props = new Properties()
       props.put("bootstrap.servers", "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>")
       props.put("security.protocol", "SASL_SSL")
       props.put("sasl.mechanism", "SCRAM-SHA-512")
       props.put("sasl.jaas.config",
         "org.apache.kafka.common.security.scram.ScramLoginModule required " +
           "username=\"<ЛОГИН>\" password=\"<ПАРОЛЬ>\";")
       props.put("ssl.truststore.type", "PEM")
       props.put("ssl.truststore.location", "<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>")
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
   `ssl.endpoint.identification.algorithm` параметрі сервер атауының сертификатқа сәйкестігін тексеруді өшіреді. Көрсетілген файл арқылы сертификаттың сенімділігін тексеру сақталады.
   {/note}

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
   {/note}

   ```scala
   import java.util.Properties
   import org.apache.kafka.clients.admin.AdminClient

   object CheckKafka {
     def main(args: Array[String]): Unit = {
       val props = new Properties()
       props.put("bootstrap.servers", "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>")
       props.put("security.protocol", "SASL_PLAINTEXT")
       props.put("sasl.mechanism", "SCRAM-SHA-512")
       props.put("sasl.jaas.config",
         "org.apache.kafka.common.security.scram.ScramLoginModule required " +
           "username=\"<ЛОГИН>\" password=\"<ПАРОЛЬ>\";")

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

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. Терминалда жоба директориясынан мына команданы орындаңыз:

   ```console
   $ sbt "runMain CheckKafka"
   ```

   Бағдарлама брокерлер туралы мәліметтерді қатесіз шығарса, клиент Cloud Kafka-ға қосылды.

## {heading(Python)[id=kafka_connect-python]}

Python арқылы қосылу үшін [confluent-kafka-python](https://docs.confluent.io/platform/current/clients/confluent-kafka-python/html/index.html) клиенттік кітапханасын пайдаланыңыз.

1. Кітапхананы мысалды іске қосатын Python ортасында терминал арқылы орнатыңыз:

   ```console
   $ pip install confluent-kafka
   ```

1. Жоба директориясында қосылу коды бар `check.py` файлын жасаңыз. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

   {tabs}

   {tab(TLS)}

   ```python
   from confluent_kafka.admin import AdminClient

   conf = {
       "bootstrap.servers": "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>",
       "security.protocol": "SASL_SSL",
       "sasl.mechanism": "SCRAM-SHA-512",
       "sasl.username": "<ЛОГИН>",
       "sasl.password": "<ПАРОЛЬ>",
       "ssl.ca.location": "<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>",
   }

   metadata = AdminClient(conf).list_topics(timeout=10)
   print("Брокеров:", len(metadata.brokers))
   ```

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
   {/note}

   ```python
   from confluent_kafka.admin import AdminClient

   conf = {
       "bootstrap.servers": "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>",
       "security.protocol": "SASL_PLAINTEXT",
       "sasl.mechanism": "SCRAM-SHA-512",
       "sasl.username": "<ЛОГИН>",
       "sasl.password": "<ПАРОЛЬ>",
   }

   metadata = AdminClient(conf).list_topics(timeout=10)
   print("Брокеров:", len(metadata.brokers))
   ```

   {/tab}

   {/tabs}

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. Терминалда файл орналасқан директориядан мына команданы орындаңыз:

   ```console
   $ python check.py
   ```

   Скрипт брокерлер санын нөлден артық етіп қатесіз шығарса, клиент Cloud Kafka-ға қосылды.

## {heading(Go)[id=kafka_connect-go]}

Go арқылы қосылу үшін [Sarama](https://pkg.go.dev/github.com/IBM/sarama) клиенттік кітапханасын пайдаланыңыз.

1. Терминалда Go жобасының директориясына өтіңіз.
1. Тәуелділіктерді орнатыңыз:

   ```console
   go get github.com/IBM/sarama github.com/xdg-go/scram
   ```

1. Жобаға `Sarama` арқылы логин мен пароль бойынша аутентификация кодын қамтитын `scram_client.go` файлын қосыңыз:

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

1. Go модулінің директориясында қосылу коды бар `main.go` файлын жасаңыз. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

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
       config.Net.SASL.User = "<ЛОГИН>"
       config.Net.SASL.Password = "<ПАРОЛЬ>"
       config.Net.SASL.SCRAMClientGeneratorFunc = newSCRAMClient
       caPEM, err := os.ReadFile("<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>")
       if err != nil {
           log.Fatal(err)
       }
       roots := x509.NewCertPool()
       if !roots.AppendCertsFromPEM(caPEM) {
           log.Fatal("Файл не содержит сертификатов PEM")
       }
       config.Net.TLS.Enable = true
       config.Net.TLS.Config = &tls.Config{RootCAs: roots}

       client, err := sarama.NewClient([]string{"<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>"}, config)
       if err != nil {
           log.Fatal(err)
       }
       defer client.Close()

       fmt.Println("Брокеров:", len(client.Brokers()))
   }
   ```

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
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
       config.Net.SASL.User = "<ЛОГИН>"
       config.Net.SASL.Password = "<ПАРОЛЬ>"
       config.Net.SASL.SCRAMClientGeneratorFunc = newSCRAMClient

       client, err := sarama.NewClient([]string{"<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>"}, config)
       if err != nil {
           log.Fatal(err)
       }
       defer client.Close()

       fmt.Println("Брокеров:", len(client.Brokers()))
   }
   ```

   {/tab}

   {/tabs}

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. Бағдарламаны іске қосыңыз:

   ```console
   $ go run .
   ```

   Бағдарлама брокерлер санын нөлден артық етіп қатесіз шығарса, клиент Cloud Kafka-ға қосылды.

## {heading(C / C++)[id=kafka_connect-c]}

C немесе C++ арқылы қосылу үшін [librdkafka](https://docs.confluent.io/platform/current/clients/librdkafka/html/index.html) клиенттік кітапханасын пайдаланыңыз. Мысалдарда C тілінің API-і қолданылады.

1. TLS және SASL SCRAM қолдауы бар librdkafka әзірлеу құралдарын орнатыңыз. Операциялық жүйеге сәйкес команданы терминалда орындаңыз:

   {tabs}

   {tab(Ubuntu)}

   ```console
   sudo apt update && sudo apt install librdkafka-dev
   ```

   {/tab}

   {tab(macOS)}

   ```console
   brew install librdkafka
   ```

   {/tab}

   {tab(CentOS / Red Hat Enterprise Linux)}

   ```console
   sudo yum install librdkafka-devel
   ```

   {/tab}

   {/tabs}

   Төмендегі құрастыру командалары компиляторға librdkafka тақырып файлдары мен кітапханасы қолжетімді ортаға арналған.

1. Қосылу коды бар `check.c` файлын жасаңыз. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

   {tabs}

   {tab(TLS)}

   ```c
   #include <stdio.h>
   #include <librdkafka/rdkafka.h>

   int main(void) {
       char errstr[512];
       rd_kafka_conf_t *conf = rd_kafka_conf_new();
       rd_kafka_conf_set(conf, "bootstrap.servers", "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "security.protocol", "SASL_SSL", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.mechanism", "SCRAM-SHA-512", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.username", "<ЛОГИН>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.password", "<ПАРОЛЬ>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "ssl.ca.location", "<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>", errstr, sizeof(errstr));

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

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
   {/note}

   ```c
   #include <stdio.h>
   #include <librdkafka/rdkafka.h>

   int main(void) {
       char errstr[512];
       rd_kafka_conf_t *conf = rd_kafka_conf_new();
       rd_kafka_conf_set(conf, "bootstrap.servers", "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "security.protocol", "SASL_PLAINTEXT", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.mechanism", "SCRAM-SHA-512", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.username", "<ЛОГИН>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.password", "<ПАРОЛЬ>", errstr, sizeof(errstr));

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

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. Терминалда файл орналасқан директориядан `check.c` файлын компиляциялап, алынған бағдарламаны іске қосыңыз:

   ```console
   $ gcc check.c -o check -lrdkafka
   $ ./check
   ```

   Бағдарлама брокерлер санын нөлден артық етіп қатесіз шығарса, клиент Cloud Kafka-ға қосылды.

## {heading(.NET)[id=kafka_connect-dotnet]}

.NET арқылы қосылу үшін [Confluent.Kafka](https://docs.confluent.io/kafka-clients/dotnet/current/overview.html) клиенттік кітапханасын пайдаланыңыз.

1. Қосылуды тексеруге арналған консольдік қолданба жасап, жоба директориясына өтіңіз:

   ```console
   $ dotnet new console -o kafka-check
   $ cd kafka-check
   ```

1. Жоба директориясында кітапхананы орнатыңыз:

   ```console
   $ dotnet add package Confluent.Kafka
   ```

1. Жасалған жобадағы `Program.cs` файлының мазмұнын қосылу кодымен алмастырыңыз. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

   {tabs}

   {tab(TLS)}

   ```csharp
   using System;
   using Confluent.Kafka;

   var config = new AdminClientConfig
   {
       BootstrapServers = "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>",
       SecurityProtocol = SecurityProtocol.SaslSsl,
       SaslMechanism = SaslMechanism.ScramSha512,
       SaslUsername = "<ЛОГИН>",
       SaslPassword = "<ПАРОЛЬ>",
       SslCaLocation = "<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>",
   };

   using var admin = new AdminClientBuilder(config).Build();
   var metadata = admin.GetMetadata(TimeSpan.FromSeconds(10));
   Console.WriteLine($"Брокеров: {metadata.Brokers.Count}");
   ```

   {/tab}

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
   {/note}

   ```csharp
   using System;
   using Confluent.Kafka;

   var config = new AdminClientConfig
   {
       BootstrapServers = "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>",
       SecurityProtocol = SecurityProtocol.SaslPlaintext,
       SaslMechanism = SaslMechanism.ScramSha512,
       SaslUsername = "<ЛОГИН>",
       SaslPassword = "<ПАРОЛЬ>",
   };

   using var admin = new AdminClientBuilder(config).Build();
   var metadata = admin.GetMetadata(TimeSpan.FromSeconds(10));
   Console.WriteLine($"Брокеров: {metadata.Brokers.Count}");
   ```

   {/tab}

   {/tabs}

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. Терминалда сынақ жобасының директориясынан мына команданы орындаңыз:

   ```console
   $ dotnet run
   ```

   Қолданба брокерлер санын нөлден артық етіп қатесіз шығарса, клиент Cloud Kafka-ға қосылды.

## {heading(Node.js)[id=kafka_connect-node]}

Node.js арқылы қосылу үшін [@confluentinc/kafka-javascript](https://docs.confluent.io/kafka-clients/javascript/current/overview.html) клиенттік кітапханасын пайдаланыңыз.

1. Жоба директориясында кітапхананы орнатыңыз:

   ```console
   $ npm install @confluentinc/kafka-javascript
   ```

1. Жоба директориясында қосылу коды бар `check.cjs` файлын жасаңыз. TLS арқылы (трафик шифрланады) немесе TLS-сіз (трафик шифрланбайды) қосылу нұсқасын таңдаңыз:

   {tabs}

   {tab(TLS)}

   ```javascript
   const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;

   const config = {
       "bootstrap.servers": "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>",
       "security.protocol": "SASL_SSL",
       "sasl.mechanisms": "SCRAM-SHA-512",
       "sasl.username": "<ЛОГИН>",
       "sasl.password": "<ПАРОЛЬ>",
       "ssl.ca.location": "<СЕРТИФИКАТТАР_ТІЗБЕГІНЕ_ЖОЛ>",
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

   {tab(TLS-сіз)}

   {note:warn}
   TLS-сіз қосылғанда трафик шифрланбайды. Бұл нұсқаны тек оқшауланған желіде пайдаланыңыз.
   {/note}

   ```javascript
   const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;

   const config = {
       "bootstrap.servers": "<BOOTSTRAP_СЕРВЕРІНІҢ_МЕКЕНЖАЙЫ_МЕН_ПОРТЫ>",
       "security.protocol": "SASL_PLAINTEXT",
       "sasl.mechanisms": "SCRAM-SHA-512",
       "sasl.username": "<ЛОГИН>",
       "sasl.password": "<ПАРОЛЬ>",
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

   {include(../../../../_includes/_kafka.md)[tags=connection-values]}

1. Терминалда скриптті іске қосыңыз:

   ```console
   $ node check.cjs
   ```

   Скрипт орнатылған қосылу туралы хабарламаны қатесіз шығарса, клиент Cloud Kafka-ға қосылды.
