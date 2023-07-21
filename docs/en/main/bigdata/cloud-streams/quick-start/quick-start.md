Quickstart will help you get started with the service and become familiar with its features.

After going through all the steps of the quickstart, you will:

1. Создадите небольшой кластер Cloud Streams.
1. Научитесь подключаться к нему.
1. Развернете Kafka и NiFi-компоненты.

## 1. Create a cluster

1. Go to [personal account](https://mcs.mail.ru/app/en/) VK Cloud.
1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
1. Go to **Big Data → Clusters**.
1. If there are no clusters in the selected project yet, click **Create cluster**.

   Otherwise, click **Add**.

1. In the “Configuration” step:

   1. Select the cluster configuration **ADS Enterprise Test** version 1.8.1.
   1. Click the **Next Step** button.

1. In the “Create cluster” step, set:

   1. **Cluster name**: for example, `vk-cloud-ads-quickstart`.
   1. **Availability zone**: `Moscow (MS1)`.
   1. **Network:** `Create new network`.
   1. **Cluster setting**: choose the option **Advanced** and components:

      - **ZOOKEEPER**,
      - **KAFKA_MANAGER**,
      - **KAFKA**,
      - **MINIFI**,
      - **NIFI**.

   1. Leave the other settings unchanged.
   1. Click the **Next Step** button.

1. In the “Configuring nodes” step, set:

   - **Master**:

      1. **Instance type**: `Standard-4-8`.
      1. **Number of nodes**: `1`.
      1. **Number of disks per node**: `1`.
      1. **Disk size**: `10 ГБ`.
      1. **Disk Type**: SSD.

   - **Workers**:

      1. **Instance type**: `Standard-4-8`.
      1. **Number of nodes**: `1`.
      1. **Number of disks per node**: `1`.
      1. **Disk size**: `10 ГБ`.
      1. **Disk Type**: SSD.

   1. **Assign external IP:** make sure this option is selected.
   1. **Disk autoscaling**: make sure this option is selected.
   1. Click the **Next Step** button.

1. In the “Components” step leave the settings unchanged. Click the **Next Step** button.

Wait for the cluster to complete, this process may take a while.

## 2. Connect to the cluster

[Connect](/en/base/iaas/instructions/vm/vm-console) to the cluster master node via VNC console.

## 3. Check the performance of Kafka and NiFi

1. Go to [personal account](https://mcs.mail.ru/app/en/) VK Cloud.
1. Go to **Big Data → Clusters**.
1. Click on the name of the created cluster `vk-cloud-ads-quickstart`.
1. Go to **General information** tab.

   - Open the Kafka server:

      1. Find the **kafka_manager-SERVER** and go to URL.
      1. Enter the user name `admin`.

   - Open the NiFi server:

      1. Find the **nifi-SERVER** and go to URL.
      1. Log in to the server.

## Delete unused resources

A running cluster consumes computing resources. If you no longer need it, [delete](../instructions/delete/) it permanently.

## What's next?

- [Get to know the usage scenarios](../use-cases/) of the cluster.
- [Get to know the concepts](../concepts/) of the Cloud Streams service.
- [Get to know the instructions](../instructions/) on cluster management.
