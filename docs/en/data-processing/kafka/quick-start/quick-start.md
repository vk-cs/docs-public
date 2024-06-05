A quick start will help you get started with the service and get to know its capabilities.

After completing all the steps of a quick start, you will:

1. Create an instance of Cloud Kafka in the **Single** configuration.
1. Learn how to send messages to a [topic](https://kafka.apache.org/documentation/#intro_concepts_and_terms) and receive messages from the topic of the Cloud Kafka instance.

<warn>

The instance of Cloud Kafka is [charged](../tariffication) and consumes computing resources. After passing the quick start [delete the service instance](#delete_unused_resources) if you don't need it anymore.

</warn>

## 1. Create an instance of the Cloud Kafka service

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
1. Select the project where you want to create an instance of the service.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click the **Создать экземпляр** button.
1. At the “Configuration” step:

   1. Select the type of service **Kafka**.
   1. Select version **3.5.0**.
   1. Select the configuration **Single**.
   1. Click the **Next step** button.

1. At the “Parameters” step:

   1. Set a name and description for the instance: `vkcloud-demo-kafka` and `The first instance of Cloud Kafka`.
   1. Set the node parameters for the broker:

      - **Type of virtual machine:** `Standard-2-4`.
      - **Disk Type:** `High-IOPS SSD`.
      - **Disk size:** `50 ГБ`.

   1. **Кластер Kubernetes**: choose **Создать новый кластер**.
   1. **Network**: choose **Create new network**.
   1. Choose **Neutron** as SDN.
   1. **Subnet address**: type `10.0.1.0/24`.
   1. **Availability zone**: `Москва (GZ1)`.
   1. Click the **Next step** button.

1. At the “Учетные данные” step:

   1. **Логин администратора для доступа к Kafka**: for example, `kafkaadmin`.
   1. **Пароль администратора для доступа к Kafka**: click the **Generate** button and save the received password.

      <err>

      The password cannot be restored.

      </err>

   1. Click the **Create** button.

      Wait for the operation to complete. It may take a long time to create an instance of Cloud Kafka.

## 2. Prepare to work with a Cloud Kafka instance

1. Get access to Kafka console clients on the host from which you plan to work with the service instance:

   <tabs>
   <tablist>
   <tab>Linux (bash) / macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   1. Make sure that Java version 11 or higher is installed on the host:

      ```bash
      java --version
      ```

      If the output contains `Command 'java'not found` or the version is outdated, install the Java Development Kit (JDK), for example, [OpenJDK](https://openjdk.org/install/). You can install both the entire JDK and only the Java Runtime Environment (JRE).

     Example of installing OpenJDK 11 (JRE only) using `apt` for Ubuntu 22.04 LTS:

      ```bash
      sudo apt update && sudo apt install openjdk-11-jre
      ```

   1. [Download the archive](https://archive.apache.org/dist/kafka/3.5.0/kafka_2.13-3.5.0.tgz) with the Kafka distribution version 3.5.0. The Kafka versions for the service instance and on the host must match. Example of a command to download a distribution using cURL:

      ```bash
      curl -O https://archive.apache.org/dist/kafka/3.5.0/kafka_2.13-3.5.0.tgz
      ```

   1. Unzip the archive and go to the directory with the unpacked files:

      ```bash
      tar -xzf kafka_2.13-3.5.0.tgz && cd kafka_2.13-3.5.0
      ```

   1. Get the version of the producer console client and the consumer console client:

      ```bash
      bin/kafka-console-producer.sh --version
      bin/kafka-console-consumer.sh --version
      ```

      Successful output of the version indicates that the clients are working correctly.

   1. Create a configuration file `client-ssl.properties` with the contents:

      ```ini
      security.protocol=SSL
      ```

      This file contains the [setting](https://kafka.apache.org/documentation/#security_configclients), which requires the producer client and the consumer client to authenticate to the service instance using the SSL protocol.

   </tabpanel>
   </tabs>

1. Get the address of the bootstrap server to connect to the service instance:

   1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
   1. Select the project where the service instance is located.
   1. Go to **Data Platform → Экземпляры сервисов**.
   1. Open the `vkcloud-demo-kafka` cluster page by clicking on its name.
   1. Go to the **General information** tab.
   1. Write down the address from the **Bootstrap** parameter.

   <info>

   Below, the address is used as an example `kafka-bootstrap.example.com:9093`.

   Replace it with the real address of the bootstrap server in the commands below.

   </info>

## 3. Send a message to the topic and receive it

<tabs>
<tablist>
<tab>Linux (bash) / macOS (zsh)</tab>
</tablist>
<tabpanel>

1. Create a separate terminal session in which the console client will work.
1. Run the client-consumer in this session and specify the `test` topic as the source. The client-consumer will connect to the Cloud Kafka instance using the previously received bootstrap server address and configuration file, and continuously read and output messages from the topic. A new topic will be created automatically the first time you access it.

   To do this, run the command:

   ```bash
   bin/kafka-console-consumer.sh \
     --bootstrap-server kafka-bootstrap.example.com:9093 \
     --consumer.config client-ssl.properties \
     --topic test
   ```

1. Create another terminal session in which another console client will be running.
1. Run the client-producer in this session and specify the `test` topic as the receiver. The client-producer will connect to the Cloud Kafka instance using the previously received bootstrap server address and configuration file, and send the input messages to the topic.

   To do this, run the command:

   ```bash
   bin/kafka-console-producer.sh \
     --broker-list kafka-bootstrap.example.com:9093 \
     --producer.config client-ssl.properties
     --topic test
   ```

1. In the terminal session with the manufacturer client, enter a test message and then press _Enter_:

   ```text
   This is the test message.
   ```

1. Check that the sent test message is displayed in the terminal session with the consumer client:

   ```text
   This is the test message.
   ```

   The message means that the Cloud Kafka instance works correctly.

1. Shut down the clients by pressing the keyboard shortcut CTRL+C in both terminal sessions.

</tabpanel>
</tabs>

## Delete unused resources

The instance of Cloud Kafka is [charged](../tariffication) and consumes computing resources. If you don't need it anymore, delete it.

You can also delete the configuration file `client-ssl.properties` and the downloaded Kafka distribution.
