# {heading(Deployment of Apache Kafka)[id=kafka-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can deploy an Apache Kafka cluster on dedicated virtual machines in {var(cloud)}. The cluster uses the modern built-in metadata management system (KRaft) and does not depend on ZooKeeper.

To ensure secure communication and access control in the Kafka cluster, the service uses a comprehensive approach: all data between the client and the broker is transmitted over the encrypted TLS protocol, and user identities are verified using the SCRAM-SHA-512 algorithm. To minimize risk, access rights are separated: the administrator, applications, and monitoring systems each have their own isolated accounts with different privilege levels.

{cut(Minimum VM specifications for the service)}

- **vCPU**: 2.
- **RAM**: 8 GB.
- Disk size:

  - **System disk**: at least 30 GB.
  - **Data disk**: at least 50 GB.

- **Network**:

  - The VM must have Internet access.
  - Private DNS must be disabled.

{/cut}

By completing all steps in this guide, you will:

1. Deploy an Apache Kafka cluster.
1. Configure and verify client connectivity to the cluster.
1. Create a topic and send test messages.
1. Explore the Kafbat UI web console.
1. Connect to the nodes over SSH and configure monitoring.

By using the Apache Kafka service, you agree to the license agreements of [Marketplace VK Cloud](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Apache Kafka](https://github.com/apache/kafka/blob/trunk/LICENSE).

## {heading(Preparation steps)[id=marketplace-kafka-prep]}

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} in {var(cloud)} and [go to](https://msk.cloud.vk.com/app) your account.
1. Configure the network so that the service is accessible from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if you have not already done so.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the VMs with the deployed service will be located, disable the **Private DNS** option.

## {heading(1. Connect the Apache Kafka service)[id=kafka-start-install-service]}

1. In your {var(cloud)} [account](https://msk.cloud.vk.com/app/), go to the **Application Store** section.
1. Click the **Apache Kafka** service card.

   If the **Apache Kafka** service card is not shown on the page, click **All solutions** and find the card in the catalog.

1. In the **Tariff plans** tab, select the service version from the list.
1. Choose the required tariff:

   - **Single node**: the service is deployed on one VM with replication factor 1. Suitable for simple project development, demonstrations, or testing.
   - **Cluster**: the service is deployed on three, five, or seven nodes with replication factor 3. The first 3 nodes form the KRaft quorum, while the remaining nodes act as brokers. Nodes are distributed across the `MS1`, `ME1`, and `PA2` availability zones. Suitable for real business workloads where high availability matters.

1. Specify the parameters of the VMs on which the service will be deployed:

   - **Number of nodes**: for the **Cluster** tariff, select 3, 5, or 7 nodes.
   - **Machine type**: select a VM configuration from the list, from `2-8` to `16-64`, where the first number is the number of CPU cores and the second is the RAM size in gigabytes. For production workloads, choose at least 4 vCPU and 16 GB of RAM.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.

1. Specify the system disk and data disk parameters:

   - **Disk size**: specify the required VM disk size in gigabytes.
   - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]}: `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click **Next step**.
1. Configure access parameters:

   - **Client network**: enter `subnet` to open the brokers only from the selected subnet, or specify the network range where your applications run. Metrics are exposed without a password, so it is better to narrow this range.
   - **Internet access**: enable this option to access the service from the Internet. In this case, each node gets a public address and a domain name. Port `9094` is used for the connection.
   - **Web console**: enable browser access to a page for viewing topics, messages, and consumer groups. You can {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-change)[text=change]} this setting after deployment.
   - **Console management**: if **Web console** is enabled, enable this option to allow topic management from the console. You can {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-change)[text=change]} this mode after deployment.
   - **Shared console address**: for the **Cluster** tariff, enable this option to access the console through a single address via a load balancer. If the option is disabled, the number of console addresses matches the number of nodes with the console. Each console sees the entire cluster. This parameter can only be set during service deployment and cannot be changed later.
   - **Console domain and certificate**: enable this option so that the console receives a domain name in the `xaas.msk.bizmrg.com` zone, a trusted certificate, and a public address. In the **Cluster** plan, this option is used together with **Shared console address**. Without a domain, the console is available from the client network and is protected by an internal certificate authority certificate.

1. Click **Next step**.
1. At the **Kafka parameters** step, configure the required Kafka service parameters or keep the default values. They are suitable for getting started.
1. Click **Next step**.
1. Review the infrastructure cost for deploying the service and click **Connect tariff**.

   Cloud infrastructure deployment will start, and the service properties page will open. The process status is also displayed in **Application Store** → **My services**.

   After successful deployment, messages will be sent to the email address associated with your {var(cloud)} account:

   - a notification with a link to the service instance in your {var(cloud)} account;
   - an email with a one-time link to the access data.

1. Follow the one-time link from the email and save the service access data:

   - `bootstrapServers`: broker addresses for client connections. The addresses are listed in the parameter separated by commas without spaces.
   - `externalBootstrapServers`: broker addresses for Internet connections if **Internet access** is enabled.
   - `clusterCA`: cluster certificate authority certificate.
   - `adminUser`, `adminPassword`: administrator account.
   - `appUser`, `appPassword`: application account for reading from and writing to existing topics.
   - `monitoringUser`, `monitoringPassword`: monitoring account for read-only access to metadata.
   - `sshUser`: user for SSH access.
   - `sshKey`: private SSH key.
   - `consoleURL`: web console address.
   - `consoleUser`, `consolePassword`: web console credentials.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new credentials.
   {/note}

## {heading(2. Configure the client connection)[id=kafka-start-configure-client]}

1. Save the `clusterCA` certificate to the `kafka-ca.pem` file.

1. Add the certificate to the client trust store:

   ```console
   keytool -import -alias kafka-ca -file kafka-ca.pem \
      -keystore kafka-truststore.p12 -storetype PKCS12 \
      -storepass <PASSWORD> -noprompt
   ```

   Here, `<PASSWORD>` is the trust store password that you set yourself.

   {note:info}
   Go and Python clients read the PEM certificate directly.
   {/note}

1. Make sure you use Kafka client library version `2.1` or later.
1. Create a `client.properties` file with the client connection settings:

   ```properties
   security.protocol=SASL_SSL
   sasl.mechanism=SCRAM-SHA-512
   sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \
     username="<APPLICATION_LOGIN>" \
     password="<APPLICATION_PASSWORD>";
   ssl.truststore.location=kafka-truststore.p12
   ssl.truststore.password=<PASSWORD>
   ssl.truststore.type=PKCS12
   ```

   Here:

   - `<APPLICATION_LOGIN>`, `<APPLICATION_PASSWORD>` are the `appUser` and `appPassword` application credentials from the email.
   - `<PASSWORD>` is the trust store password set in the previous step.

1. Verify the connection you created to the cluster:

   ```console
   kafka-broker-api-versions.sh --bootstrap-server <BROKER_ADDRESSES> --command-config client.properties
   ```

   Here:

   - `<BROKER_ADDRESSES>` are the values from the `bootstrapServers` parameter in the email. If there are multiple addresses, list them separated by commas without spaces.
   - `client.properties` is the file with the client connection settings that you created.

   If the command returns a list of supported API versions, the connection is configured correctly.

## {heading(3. Create a topic)[id=kafka-start-create-topic]}

The `appUser` account can read and write existing topics, but cannot create them. To create a topic, use the administrator account.

1. Create an `admin.properties` file and copy the contents of `client.properties` into it, replacing the username and password values in `sasl.jaas.config` with `adminUser` and `adminPassword` from the email.

1. Create a topic:

   ```console
   kafka-topics.sh --bootstrap-server <BROKER_ADDRESSES> --command-config admin.properties --create --topic <TOPIC_NAME> --partitions 6
   ```

   Here:

   - `<BROKER_ADDRESSES>` are the values from the `bootstrapServers` parameter in the email. If there are multiple addresses, list them separated by commas without spaces.
   - `admin.properties` is the file with the administrator connection settings that you created.
   - `<TOPIC_NAME>` is the name of your topic. The example below uses the name `orders`.
   - `6` is the number of partitions; specify a value that is a multiple of the number of brokers and includes spare capacity.

   {note:info}
   You do not need to specify the replication factor: the broker uses the default value for the selected tariff.
   {/note}

## {heading(4. Send and read test messages)[id=kafka-start-test-messages]}

1. Send test messages to the `orders` topic:

   ```console
   kafka-console-producer.sh --bootstrap-server <BROKER_ADDRESSES> --producer.config client.properties --topic orders
   ```

   Here:

   - `<BROKER_ADDRESSES>` are the values from the `bootstrapServers` parameter in the email. If there are multiple addresses, list them separated by commas without spaces.
   - `client.properties` is the file with the client connection settings that you created.

   Enter several messages, one per line. Press `Ctrl+C` to finish.

1. Read messages from the `orders` topic:

   ```console
   kafka-console-consumer.sh --bootstrap-server <BROKER_ADDRESSES> --consumer.config client.properties --topic orders --from-beginning
   ```

## {heading(5. Use the web console)[id=kafka-start-web-console]}

If you enabled the **Web console** option when deploying the service, you can access the service through the Kafbat UI web console. Test it:

1. Open the web console at `consoleURL` from the email.
1. Sign in using `consoleUser` and `consolePassword` from the email.

## {heading(6. Optional: increase the data disk size)[id=kafka-start-resize-disk]}

You cannot change the data disk size through the tariff configuration wizard, but after deployment you can increase it {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-disk-size)[text=manually]}.

To do this, select the disk named `<id>-kafka-data-N`, where `<id>` is the instance identifier and `N` is the node number. After the change, the VM must be rebooted. In a cluster, reboot the nodes one at a time.

## {heading(7. Optional: configure monitoring)[id=kafka-start-monitoring]}

The web console displays current broker performance metrics for your Kafka cluster as charts. To preserve metric history and configure alerts, connect your own monitoring system to the Apache Kafka service.

Broker and node metrics are exposed in Prometheus format on ports `9404` and `9100` and are available from the client network.

To configure metric collection:

1. Configure SSH access to a node and a broker:

   1. Save the SSH key from the email to the `~/.ssh/kafka.pem` file.
   1. Set file permissions:

      ```console
      chmod 600 ~/.ssh/kafka.pem
      ```

   1. Connect to a node of the deployed Apache Kafka service:

      ```console
      ssh -i ~/.ssh/kafka.pem almalinux@<NODE_ADDRESS>
      ```

      Here, `<NODE_ADDRESS>` is the IP address of the required node from the `bootstrapServers` parameter in the email.

   After you sign in, all Kafka management utilities are located in the `/opt/kafka/bin` directory. They may be useful, for example, for collecting information about free space on the data disk.

1. Configure your monitoring system to collect data from the node. For example:

   ```console
   curl -s http://<NODE_ADDRESS>:9100/metrics | grep 'node_filesystem_avail_bytes.*/var/lib/kafka'
   ```

   Here:

   - `<NODE_ADDRESS>` is the IP address of the required node from the `bootstrapServers` parameter in the email.
   - `9100` is the port number for collecting node metrics.
   - `node_filesystem_avail_bytes` is the metric that shows the amount of free space on the data disk.
   - `/var/lib/kafka` is the path to the directory whose file system is located on the node.

   The output shows the amount of free space on the data disk.

   You can also collect other Prometheus metrics from the node, for example:

   * `kafka_controller_kafkacontroller_activecontrollercount`;
   * `kafka_controller_kafkacontroller_offlinepartitionscount`;
   * `kafka_server_replicamanager_underreplicatedpartitions`;
   * `kafka_cluster_partition_underminisr`.

   For more information, see the [official Apache Kafka documentation](https://kafka.apache.org/documentation/#jmxmetrics).

1. Configure your monitoring system to collect data from the broker:

   1. Create a `monitoring.properties` file and copy the contents of `client.properties` into it, replacing the username and password values in `sasl.jaas.config` with `monitoringUser` and `monitoringPassword` from the email.
   1. Use the `kafka-consumer-groups.sh` utility to get information about all consumer groups:

      ```console
      kafka-consumer-groups.sh --bootstrap-server <BROKER_ADDRESSES> --command-config monitoring.properties --describe --all-groups
      ```

      Here:

      - `<BROKER_ADDRESSES>` are the values from the `bootstrapServers` parameter in the email. If there are multiple addresses, list them separated by commas without spaces.
      - `monitoring.properties` is the file with the monitoring connection settings that you created.
      - `--describe` displays detailed information.
      - `--all-groups` outputs information for all consumer groups.

   1. Review the output. It usually includes the following columns:

      - `GROUP`: consumer group name.
      - `TOPIC`: topic name read by the group.
      - `PARTITION`: partition number within the topic.
      - `CURRENT-OFFSET`: current offset, which is the number of the last message read for each partition.
      - `LOG-END-OFFSET`: the offset of the last message written to this partition, which is the current end of the data.
      - `LAG`: the difference between `LOG-END-OFFSET` and `CURRENT-OFFSET`. This is the most important number. It shows how many messages have not yet been read. If `LAG` grows, consumers are not keeping up with the data stream. If `LAG` is `0`, all messages have been read and the group is processing in real time.
      - `OWNER`: the name of the process, or consumer, that is currently the leader for this partition.
      - `HOST`: the IP address or host name where this consumer is running.
