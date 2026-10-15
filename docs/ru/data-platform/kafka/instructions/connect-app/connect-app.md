# {heading(Подключение из кода приложения)[id=kafka_connect-app]}

Для подключения к развернутому экземпляру Cloud Kafka из кода приложения используйте клиентскую библиотеку для своего языка программирования. Ниже приведены примеры для Java, Scala, Python, Go, C / C++, .NET и Node.js.

## {heading(Подготовка к подключению)[id=kafka_connect-preparation]}

{include(../../../_includes/_kafka.md)[tags=connection-preparation]}

Дальнейшие действия зависят от языка программирования:

- {linkto(#kafka_connect-java)[text=Java]}
- {linkto(#kafka_connect-scala)[text=Scala]}
- {linkto(#kafka_connect-python)[text=Python]}
- {linkto(#kafka_connect-go)[text=Go]}
- {linkto(#kafka_connect-c)[text=C / C++]}
- {linkto(#kafka_connect-dotnet)[text=.NET]}
- {linkto(#kafka_connect-node)[text=Node.js]}

## {heading(Java)[id=kafka_connect-java]}

Для подключения с помощью Java используйте клиентскую библиотеку [`kafka-clients`](https://kafka.apache.org/41/javadoc/). Минимальная версия JDK — `11`.

1. Добавьте зависимость в Java-проект с Maven или Gradle:

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

1. Создайте файл `CheckKafka.java` с кодом подключения в директории исходников Java проекта. Для стандартного проекта Maven или Gradle это `src/main/java`. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```java
   import java.util.Properties;
   import org.apache.kafka.clients.admin.AdminClient;

   public class CheckKafka {
       public static void main(String[] args) throws Exception {
           Properties props = new Properties();
           props.put("bootstrap.servers", "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>");
           props.put("security.protocol", "SASL_SSL");
           props.put("sasl.mechanism", "SCRAM-SHA-512");
           props.put("sasl.jaas.config",
                   "org.apache.kafka.common.security.scram.ScramLoginModule required " +
                   "username=\"<ЛОГИН>\" password=\"<ПАРОЛЬ>\";");
           props.put("ssl.truststore.type", "PEM");
           props.put("ssl.truststore.location", "<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>");
           props.put("ssl.endpoint.identification.algorithm", "");

           try (AdminClient admin = AdminClient.create(props)) {
               System.out.println("Брокеры: " + admin.describeCluster().nodes().get());
           }
       }
   }
   ```

   {note:info}
   Параметр `ssl.endpoint.identification.algorithm` отключает проверку соответствия имени сервера сертификату. Проверка доверия к сертификату по указанному файлу сохраняется.
   {/note}

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```java
   import java.util.Properties;
   import org.apache.kafka.clients.admin.AdminClient;

   public class CheckKafka {
       public static void main(String[] args) throws Exception {
           Properties props = new Properties();
           props.put("bootstrap.servers", "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>");
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

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. Запустите класс `CheckKafka` средствами своей IDE или системы сборки. Если программа выводит сведения о брокерах без ошибки, клиент подключился к Cloud Kafka.

## {heading(Scala)[id=kafka_connect-scala]}

Для подключения с помощью Scala используйте клиентскую библиотеку [`kafka-clients`](https://kafka.apache.org/41/javadoc/). Минимальная версия JDK — `11`.

1. Добавьте зависимость в файл `build.sbt`:

   ```scala
   libraryDependencies += "org.apache.kafka" % "kafka-clients" % "4.1.0"
   ```

1. Создайте файл `CheckKafka.scala` с кодом подключения в директории `src/main/scala` проекта SBT. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```scala
   import java.util.Properties
   import org.apache.kafka.clients.admin.AdminClient

   object CheckKafka {
     def main(args: Array[String]): Unit = {
       val props = new Properties()
       props.put("bootstrap.servers", "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>")
       props.put("security.protocol", "SASL_SSL")
       props.put("sasl.mechanism", "SCRAM-SHA-512")
       props.put("sasl.jaas.config",
         "org.apache.kafka.common.security.scram.ScramLoginModule required " +
           "username=\"<ЛОГИН>\" password=\"<ПАРОЛЬ>\";")
       props.put("ssl.truststore.type", "PEM")
       props.put("ssl.truststore.location", "<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>")
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
   Параметр `ssl.endpoint.identification.algorithm` отключает проверку соответствия имени сервера сертификату. Проверка доверия к сертификату по указанному файлу сохраняется.
   {/note}

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```scala
   import java.util.Properties
   import org.apache.kafka.clients.admin.AdminClient

   object CheckKafka {
     def main(args: Array[String]): Unit = {
       val props = new Properties()
       props.put("bootstrap.servers", "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>")
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

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. В терминале из директории проекта выполните команду:

   ```console
   $ sbt "runMain CheckKafka"
   ```

   Если программа выводит сведения о брокерах без ошибки, клиент подключился к Cloud Kafka.

## {heading(Python)[id=kafka_connect-python]}

Для подключения с помощью Python используйте клиентскую библиотеку [`confluent-kafka-python`](https://docs.confluent.io/platform/current/clients/confluent-kafka-python/html/index.html).

1. Установите библиотеку в терминале в том же окружении Python, в котором будете запускать пример:

   ```console
   $ pip install confluent-kafka
   ```

1. Создайте файл `check.py` с кодом подключения в директории проекта. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```python
   from confluent_kafka.admin import AdminClient

   conf = {
       "bootstrap.servers": "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>",
       "security.protocol": "SASL_SSL",
       "sasl.mechanism": "SCRAM-SHA-512",
       "sasl.username": "<ЛОГИН>",
       "sasl.password": "<ПАРОЛЬ>",
       "ssl.ca.location": "<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>",
   }

   metadata = AdminClient(conf).list_topics(timeout=10)
   print("Брокеров:", len(metadata.brokers))
   ```

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```python
   from confluent_kafka.admin import AdminClient

   conf = {
       "bootstrap.servers": "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>",
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

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. В терминале из директории с файлом выполните:

   ```console
   $ python check.py
   ```

   Если скрипт выводит число брокеров больше нуля без ошибки, клиент подключился к Cloud Kafka.

## {heading(Go)[id=kafka_connect-go]}

Для подключения с помощью Go используйте клиентскую библиотеку [`Sarama`](https://pkg.go.dev/github.com/IBM/sarama).

1. Перейдите в терминале в директорию Go-проекта.
1. Установите зависимости:

   ```console
   go get github.com/IBM/sarama github.com/xdg-go/scram
   ```

1. Добавьте в проект файл `scram_client.go` с кодом для аутентификации по логину и паролю через `Sarama`:

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

1. Создайте файл `main.go` с кодом подключения в директории Go-модуля. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

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
       caPEM, err := os.ReadFile("<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>")
       if err != nil {
           log.Fatal(err)
       }
       roots := x509.NewCertPool()
       if !roots.AppendCertsFromPEM(caPEM) {
           log.Fatal("Файл не содержит сертификатов PEM")
       }
       config.Net.TLS.Enable = true
       config.Net.TLS.Config = &tls.Config{RootCAs: roots}

       client, err := sarama.NewClient([]string{"<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>"}, config)
       if err != nil {
           log.Fatal(err)
       }
       defer client.Close()

       fmt.Println("Брокеров:", len(client.Brokers()))
   }
   ```

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
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

       client, err := sarama.NewClient([]string{"<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>"}, config)
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

1. Запустите программу:

   ```console
   $ go run .
   ```

   Если программа выводит число брокеров больше нуля без ошибки, клиент подключился к Cloud Kafka.

## {heading(C / C++)[id=kafka_connect-c]}

Для подключения с помощью C или C++ используйте клиентскую библиотеку [`librdkafka`](https://docs.confluent.io/platform/current/clients/librdkafka/html/index.html). В примерах применяется API на C.

1. Установите средства разработки librdkafka с поддержкой TLS и SASL SCRAM. Например, в терминале Ubuntu выполните команду:

   ```console
   sudo apt update && sudo apt install librdkafka-dev
   ```

   На macOS библиотеку можно установить командой `brew install librdkafka`, на CentOS/RHEL — `sudo yum install librdkafka-devel`. Команды сборки ниже рассчитаны на окружение, в котором компилятору доступны заголовочные файлы и библиотека librdkafka.

1. Создайте файл `check.c` с кодом подключения. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```c
   #include <stdio.h>
   #include <librdkafka/rdkafka.h>

   int main(void) {
       char errstr[512];
       rd_kafka_conf_t *conf = rd_kafka_conf_new();
       rd_kafka_conf_set(conf, "bootstrap.servers", "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "security.protocol", "SASL_SSL", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.mechanism", "SCRAM-SHA-512", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.username", "<ЛОГИН>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "sasl.password", "<ПАРОЛЬ>", errstr, sizeof(errstr));
       rd_kafka_conf_set(conf, "ssl.ca.location", "<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>", errstr, sizeof(errstr));

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

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```c
   #include <stdio.h>
   #include <librdkafka/rdkafka.h>

   int main(void) {
       char errstr[512];
       rd_kafka_conf_t *conf = rd_kafka_conf_new();
       rd_kafka_conf_set(conf, "bootstrap.servers", "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>", errstr, sizeof(errstr));
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

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. В терминале из директории с файлом скомпилируйте `check.c` и запустите полученную программу:

   ```console
   $ gcc check.c -o check -lrdkafka
   $ ./check
   ```

   Если программа выводит число брокеров больше нуля без ошибки, клиент подключился к Cloud Kafka.

## {heading(.NET)[id=kafka_connect-dotnet]}

Для подключения с помощью .NET используйте клиентскую библиотеку [`Confluent.Kafka`](https://docs.confluent.io/kafka-clients/dotnet/current/overview.html).

1. Создайте консольное приложение для проверки подключения и перейдите в директорию проекта:

   ```console
   $ dotnet new console -o kafka-check
   $ cd kafka-check
   ```

1. Установите библиотеку в директории проекта:

   ```console
   $ dotnet add package Confluent.Kafka
   ```

1. Замените содержимое файла `Program.cs` в созданном проекте кодом подключения. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```csharp
   using System;
   using Confluent.Kafka;

   var config = new AdminClientConfig
   {
       BootstrapServers = "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>",
       SecurityProtocol = SecurityProtocol.SaslSsl,
       SaslMechanism = SaslMechanism.ScramSha512,
       SaslUsername = "<ЛОГИН>",
       SaslPassword = "<ПАРОЛЬ>",
       SslCaLocation = "<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>",
   };

   using var admin = new AdminClientBuilder(config).Build();
   var metadata = admin.GetMetadata(TimeSpan.FromSeconds(10));
   Console.WriteLine($"Брокеров: {metadata.Brokers.Count}");
   ```

   {/tab}

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```csharp
   using System;
   using Confluent.Kafka;

   var config = new AdminClientConfig
   {
       BootstrapServers = "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>",
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

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. В терминале из директории тестового проекта выполните:

   ```console
   $ dotnet run
   ```

   Если приложение выводит число брокеров больше нуля без ошибки, клиент подключился к Cloud Kafka.

## {heading(Node.js)[id=kafka_connect-node]}

Для подключения с помощью Node.js используйте клиентскую библиотеку [`@confluentinc/kafka-javascript`](https://docs.confluent.io/kafka-clients/javascript/current/overview.html).

1. Установите библиотеку в директории проекта:

   ```console
   $ npm install @confluentinc/kafka-javascript
   ```

1. Создайте файл `check.cjs` с кодом подключения в директории проекта. Используйте вариант с TLS (трафик шифруется) или без TLS (трафик не шифруется):

   {tabs}

   {tab(TLS)}

   ```javascript
   const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;

   const config = {
       "bootstrap.servers": "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>",
       "security.protocol": "SASL_SSL",
       "sasl.mechanisms": "SCRAM-SHA-512",
       "sasl.username": "<ЛОГИН>",
       "sasl.password": "<ПАРОЛЬ>",
       "ssl.ca.location": "<ПУТЬ_К_ЦЕПОЧКЕ_СЕРТИФИКАТОВ>",
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

   {tab(Без TLS)}

   {note:warn}
   При подключении без TLS трафик не шифруется. Используйте этот вариант только в изолированной сети.
   {/note}

   ```javascript
   const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;

   const config = {
       "bootstrap.servers": "<АДРЕС_И_ПОРТ_BOOTSTRAP_СЕРВЕРА>",
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

   {include(../../../_includes/_kafka.md)[tags=connection-values]}

1. В терминале запустите скрипт:

   ```console
   $ node check.cjs
   ```

   Если скрипт выводит сообщение об установленном подключении без ошибки, клиент подключился к Cloud Kafka.
