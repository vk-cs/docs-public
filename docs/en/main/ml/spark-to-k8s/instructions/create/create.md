<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/).
1. Select the project where you want to create a cluster.
1. Go to **ML Platform → Spark in k8s**.
1. Go to **Clusters** tab.
1. Click the **Add cluster** or **Add** button.
1. On the «Create cluster» step:

   1. Set general settings:

      - **Cluster name**: it can contain only Latin letters, numbers and symbols `.`, `-`, `_`.

      - **Availability zone**: [availability zone](/en/base/iaas/concepts/vm-concept#availability_zone) for the cluster.

      - **Network**: the network and subnet where the cluster nodes will be located. If the necessary networks and subnets are not in the list, [create](/en/networks/vnet/operations/manage-net) them.

   1. Set the worker node settings in the **Worker-node settings** section:

      - **Type of virtual machine:** [configuration template](/en/base/iaas/concepts/vm-concept#flavors_2a230ce5) for worker nodes.

        Templates with high-performance CPUs are available [on request to the support service] (/ru/contacts). To use these templates, select the **Show only high performance CPUs** option.

      - **Enable autoscaling**: select this option so that the cluster automatically scales the number of worker nodes depending on the load.

        Then set the minimum and maximum number of nodes within which scaling is allowed. Acceptable range of values: from 1 to 100.

        This option is disabled by default. A cluster with autoscaling enabled will contain one worker node.

   1. Set additional settings:

      - **Registry selection**: Docker registry, images from which will be used when running Spark jobs.

        If the required registry is not in the list:

        1. Choose **Create new registry**.

           The registry will be placed on a dedicated virtual machine that is not part of the cluster and is charged separately.

        1. Specify the details for accessing the registry:

           - **Registry username**: it can contain only Latin letters, numbers and symbols `.`, `-`, `_`.
           - **Registry password**: you can come up with a password or generate it.

             <warn>

             Save the password. If it is lost, it cannot be restored.

             </warn>

             Password requirements:

             - it is allowed to use only uppercase and lowercase Latin letters, numbers, symbols from the range `!#$%&()*+,.:;<=>?@[]^_{|}~-`;
             - the password must contain at least one letter of the Latin alphabet and at least one digit.

      - **Virtual machine key**: the key that is used for [connecting to cluster nodes via SSH](/en/base/iaas/instructions/vm/vm-connect/vm-connect-nix). Select an existing key or create a new one.

        <warn>

        If you select **No key**, then SSH connection will not be possible.

        </warn>

      - **Cluster mode**: defines the configuration of the master node.

        - **DEV**: a virtual machine with 2 vCPUs and 4 GB RAM will be used for the master node.
        - **PROD**: a virtual machine with 6 vCPUs and 6 GB RAM will be used for the master node.

   1. Select options that affect the lifecycle of an inactive cluster.

      If there are no Spark jobs running in the cluster, it becomes inactive. The options listed below define the lifecycle of just such a cluster. The cluster returns to the active state when a new Spark job is started.

      Available options:

      - **Destroy after inactivity**: when the specified time expires, the inactive cluster will be automatically deleted.

        By default, the option is disabled, and the cluster exists until it is manually deleted. This option is useful in clusters used for one-time tasks.

      - **Suspend cluster after inactivity**: when the specified time expires, the inactive cluster will go into sleep mode. In this mode, only cluster node disks are charged, computing resources are not charged.

        The cluster will be brought out of sleep mode when a new Spark job is started.

        By default, the option is disabled, and the cluster runs until it is deleted, even if there are no Spark jobs running in it. This option is useful to save computing resources during long breaks between running Spark jobs.

      <details>
      <summary>Examples of the impact of options on the cluster lifecycle</summary>

      - Let only the inactivity time before destruction (120 minutes, 2 hours) be configured.

        Then, if the cluster is inactive since 13:00, then at 15:00 it will be deleted.

      - Let's set only the time before switching to sleep mode (120 minutes, 2 hours).

        Then, if the cluster is inactive since 13:00, then at 15:00 it will go into sleep mode.

      - Let's set the time before switching to sleep mode (60 minutes, 1 hour) and the time of inactivity before destruction (120 minutes, 2 hours).

        Then, if the cluster is inactive since 13:00, then at 14:00 it will go into sleep mode, and at 15:00 it will be deleted.

      - Let's set the time before switching to sleep mode (120 minutes, 2 hours) and the time of inactivity before destruction (60 minutes, 1 hour).

        Then, if the cluster is inactive since 13:00, then at 14:00 it will be deleted.

      </details>

   1. Click the **Next step** button.

1. On the «Spark settings» step:

   1. (Optional) Set advanced Spark settings. These settings will be used by all Spark jobs that will run in the cluster.

      You can configure:

      - **Spark configuration**: list of properties responsible for [Spark configuration](https://github.com/GoogleCloudPlatform/spark-on-k8s-operator/blob/master/docs/user-guide.md#specifying-spark-configuration).
      - **Environment variables**: a list of environment variables for Spark.

      Each property or variable should be placed on a separate line in the following format:

      ```text
      <name of the property or variable>: <value>
      ```

      Property descriptions should be correct from the point of view of [YAML syntax](https://yaml.org/spec/).

      <details>
      <summary>Examples of descriptions of properties and variables</summary>

      - A list of several Spark properties:

        ```yaml
        spark.eventLog.dir: s3a://spark-bucket
        spark.eventLog.enabled: "true"
        spark.hadoop.fs.s3a.endpoint: https://hb.vkcs.cloud
        spark.hadoop.fs.s3a.impl: org.apache.hadoop.fs.s3a.S3AFileSystem
        ```

      - A list of several environment variables:

        ```shell
        ENV_VAR_1: env_var_1_value
        ENV_VAR_2: env_var_2_value
        ENV_VAR_3: env_var_3_value
        ```

      </details>

   1. Click the **Create cluster** button.

      Wait for the operation to complete. Creating a cluster can take a long time.

</tabpanel>
</tabs>
