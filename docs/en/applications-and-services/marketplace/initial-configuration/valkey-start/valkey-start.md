# {heading(Deployment of Valkey)[id=valkey-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Valkey service in {var(cloud)} is a high-performance in-memory data store optimized for scenarios that require instant access to information. The service is suitable for implementing caching, managing user sessions, processing task queues, and working with complex data structures in real time.

Valkey is fully compatible with the Redis OSS 7.2 protocol and command-line interface, which allows you to migrate existing solutions or deploy new microservices without changing application code. For more information, see the [official Valkey documentation](https://valkey.io/topics/).

{cut(Minimum infrastructure requirements)}

* **vCPU**: 2.
* **RAM**: 8 GB.
* Disk size:

   * **System disk**: at least 30 GB.
   * **Data disk**: at least 50 GB.

* **Network**:

  * The VM must have Internet access.
  * Private DNS must be disabled.

{/cut}

This guide will help you deploy the Valkey service on dedicated virtual machines in {var(cloud)} and configure TLS client connectivity from your application.

By using the Valkey service, you agree to the license agreements of [Marketplace VK Cloud](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Valkey](https://github.com/valkey-io/valkey/blob/unstable/COPYING).

## {heading(Preparation steps)[id=marketplace-valkey-prep]}

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} in {var(cloud)} and [go to](https://msk.cloud.vk.com/app) your account.
1. Configure the network so that the service is accessible from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if you have not already done so.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the VMs with the deployed service will be located, disable the **Private DNS** option.

## {heading(1. Connect the Valkey service)[id=valkey-start-install]}

1. In your {var(cloud)} [account](https://msk.cloud.vk.com/app/), go to the **Application Store** section.
1. Click the **Valkey** service card.

   If the **Valkey** service card is not shown on the page, click **All solutions** and find the card in the catalog.

1. On the service description page, click **Connect**.
1. In the **Tariff plans** tab, select the service version from the list.
1. Choose the required tariff:

   - **Single**: one VM with no replication. If the node or its availability zone fails, the service is unavailable until the VM is restored. The connection is made directly to the node address. Suitable for development and testing.
   - **Sentinel**: three or five VMs, or nodes, in different availability zones, one of which becomes the primary node. It handles all requests to create, modify, and delete data, while the other nodes store full copies of the data. If the primary node fails, another node takes over its role. Suitable for caching, sessions, and queues as long as the data fits into the memory of a single VM.
   - **Cluster**: six or nine VMs, or nodes, in different availability zones. If a primary node fails, another node takes over its role. Data is distributed across several servers, or shards. Copies of each shard are stored in other zones. Data placement in the cluster is determined by key. Suitable for storing data that does not fit in the memory of one VM or for horizontal scaling. Applications that work with such a cluster must support a cluster-aware client.

1. Specify the parameters of the VMs on which the service will be deployed:

   {tabs}
   {tab(Single)}

   - **Virtual machine type**: select a VM configuration from the list, from `2-8` to `16-64`, where the first number is the number of CPU cores and the second is the RAM size in gigabytes. For development and testing, choose `2-8`; for production workloads, choose `4-16` or higher.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.

   {/tab}
   {tab(Sentinel)}

   - **Number of nodes**: specify how many virtual machines the system creates for your cluster. One node becomes the primary node, and the others become replicas. Nodes are distributed across the `MS1`, `ME1`, and `PA2` zones. The Sentinel monitoring service runs on each node. Specify at least `3`. To ensure fault tolerance if two nodes fail at once, specify `5`.
   - **Virtual machine type**: select a VM configuration from the list, from `2-8` to `16-64`, where the first number is the number of CPU cores and the second is the RAM size in gigabytes. For development and testing, choose `2-8`; for production workloads, choose `4-16` or higher.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.

   {/tab}
   {tab(Cluster)}

   - **Number of nodes**: specify how many virtual machines the system creates for your cluster. One node becomes the primary node, and the others become replicas. Nodes are distributed across the `MS1`, `ME1`, and `PA2` zones. The Sentinel monitoring service runs on each node. Specify at least `6`. To ensure fault tolerance if two shards fail at once, specify `9`.
   - **Virtual machine type**: select a VM configuration from the list, from `2-8` to `16-64`, where the first number is the number of CPU cores and the second is the RAM size in gigabytes. For development and testing, choose `2-8`; for production workloads, choose `4-16` or higher.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.

   {/tab}
   {/tabs}

1. Specify the data disk parameters:

   - **Disk size**: specify the required VM disk size in gigabytes. To store data with RDB backups, the disk must be twice the size of the in-memory data volume. If you also need the append-only file log (AOF), the required disk size increases to three times the memory volume. For example, for an `8-32` VM type with AOF enabled, you need about 70 GB for a data store or 50 GB for a cache.
   - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]}. For intensive writes, choose `High-IOPS SSD`.

1. Keep the default system disk parameter values.
1. Click **Next step**.
1. Configure access parameters:

   - **Client network**: enter `subnet` to open the service only from the selected subnet, or specify a network range such as `10.20.0.0/16` where your applications run. You can {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=view]} the subnet address in your account.
   - **Single address through the load balancer**: for the **Sentinel** tariff, enable this option if your application code does not support the Sentinel mechanism. The service then has one address that always points to the current primary node. The load balancer for this address is billed separately.

1. Configure Valkey parameters:

   - **Persist to disk**: enable this option if you need to store data on disk rather than only in memory. If you plan to use Valkey as a cache, disable this option.
   - **Operation log**: enable this option to minimize the risk of data loss. The log writes every change command to a file and syncs it to disk once per second. If the log is disabled, the system relies only on periodic snapshots, which may be infrequent.

1. Optionally, enable **Additional Valkey settings** and configure extra memory settings:

   - **Memory share for data**: specify the share of node RAM reserved for data, for example `70%`. The remaining memory is used for connections, replication, and snapshots. If disk persistence is enabled, the disk size must be at least twice this value.
   - **Eviction policy**: choose what the server does when it runs out of memory. Possible values:

      - `noeviction`: the service does not delete anything, but rejects new writes, which is suitable for a data store.
      - `allkeys-lru`: the service deletes least recently used keys, which is suitable for caching.
      - `volatile` variants: the service deletes only keys with a configured lifetime, which is suitable for storing important data together with cached data.

      For more information about all key management policies, see the [official Valkey documentation](https://valkey.io/topics/lru-cache/).

   - **Write only when a replica is alive**: for the **Sentinel** tariff, enable this option so that the primary node blocks new writes if it cannot guarantee that replicas will save them.

1. Click **Next step**.
1. Review the infrastructure cost for deploying the service and click **Connect tariff**.

   Cloud infrastructure deployment will start, and the service properties page will open. The process status is also displayed in **Application Store** → **My services**.

   After successful deployment, messages will be sent to the email address associated with your {var(cloud)} account:

   - a notification with a link to the service instance in your {var(cloud)} account;
   - an email with a one-time link to the access data.

1. Follow the one-time link from the email and save the service access data:

   {tabs}
   {tab(Single)}

   - `nodes`: list of Valkey nodes.
   - `endpoint`: node address.
   - `clusterCA`: cluster certificate authority certificate.
   - `adminUser` and `adminPassword`: administrator account.
   - `appUser` and `appPassword`: application account.
   - `monitoringUser` and `monitoringPassword`: monitoring account.
   - `sshUser`: login for SSH access to the VM.
   - `sshKey`: private SSH key. Save this key to a file, for example `valkey_ssh.pem`.

   {/tab}
   {tab(Sentinel)}

   - `nodes`: list of Valkey nodes.
   - `endpoint`: primary node address or the single load balancer address if **Single address through the load balancer** is enabled.
   - `sentinelHosts`: list of VM addresses where Sentinel processes are running.
   - `masterName`: primary node name.
   - `sentinelPassword`: password for the VMs where Sentinel processes are running.
   - `clusterCA`: cluster certificate authority certificate.
   - `adminUser` and `adminPassword`: administrator account.
   - `appUser` and `appPassword`: application account.
   - `monitoringUser` and `monitoringPassword`: monitoring account.
   - `sshUser`: login for SSH access to the VM.
   - `sshKey`: private SSH key. Save this key to a file, for example `valkey_ssh.pem`.

   {/tab}
   {tab(Cluster)}

   - `nodes`: addresses of the Valkey service nodes. The addresses are listed in the parameter separated by commas without spaces.
   - `clusterCA`: cluster certificate authority certificate.
   - `adminUser` and `adminPassword`: administrator account.
   - `appUser` and `appPassword`: application account.
   - `monitoringUser` and `monitoringPassword`: monitoring account.
   - `sshUser`: login for SSH access to the VM.
   - `sshKey`: private SSH key. Save this key to a file, for example `valkey_ssh.pem`.

   {/tab}
   {/tabs}

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new credentials.
   {/note}

## {heading(2. Check connectivity to the Valkey service)[id=valkey-start-check]}

To test the connection, you can use any Linux VM in the client network, for example your application server.

1. Install the `valkey-cli` utility on the VM from which you want to connect to the service, if you have not already done so:

   {tabs}
   {tab(Ubuntu 24.04 and later)}
   ```bash
   sudo apt install -y valkey-tools
   ```
   {/tab}
   {/tabs}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to this VM over SSH.
1. Save the certificate from the email to the `~/valkey-ca.pem` file:

    ```bash
    cat > ~/valkey-ca.pem <<'EOF'
    <CERTIFICATE>
    EOF
    ```

   Here, `<CERTIFICATE>` is the `clusterCA` value from the email in full, including the `BEGIN` and `END` lines.

1. Perform write and read operations in the Valkey service:

   {tabs}
   {tab(Single)}

   1. Perform a write operation in the Valkey service:

      ```bash
      export REDISCLI_AUTH='<APPLICATION_PASSWORD>'
      valkey-cli --tls --cacert ~/valkey-ca.pem --user <APPLICATION_LOGIN> \
         -h <NODE_ADDRESS> -p 6379 SET greeting hello
      ```

      Here:

      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<NODE_ADDRESS>` is the IP address without the port from the `endpoint` parameter in the email.
      - `SET greeting hello` is the Valkey command that stores the value `hello` under the `greeting` key.

      Expected result: `OK`.

   1. Perform a read operation from the Valkey service:

      ```bash
      valkey-cli --tls --cacert ~/valkey-ca.pem --user <APPLICATION_LOGIN> \
         -h <NODE_ADDRESS> -p 6379 GET greeting
      ```

      Here:

      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<NODE_ADDRESS>` is the IP address without the port from the `endpoint` parameter in the email.
      - `GET greeting` is the Valkey command that retrieves the value of the `greeting` key.

      Expected result: `"hello"`.

   {/tab}
   {tab(Sentinel)}

   1. If **Single address through the load balancer** is disabled in the Valkey service, find out the IP address of the primary node:

      ```bash
      REDISCLI_AUTH='<SENTINEL_PASSWORD>' valkey-cli --tls --cacert ~/valkey-ca.pem \
      -h <SENTINEL_ADDRESS> -p 26379 SENTINEL get-master-addr-by-name <NODE_NAME>
      ```

      Here:

      - `<SENTINEL_PASSWORD>` is the `sentinelPassword` value from the email.
      - `<SENTINEL_ADDRESS>` is any address from `sentinelHosts` without the port from the email.
      - `<NODE_NAME>` is the primary node name from the `masterName` parameter in the email.

      The first line of the output is the primary node address.

   1. Perform a write operation in the Valkey service:

      ```bash
      export REDISCLI_AUTH='<APPLICATION_PASSWORD>'
      valkey-cli --tls --cacert ~/valkey-ca.pem --user <APPLICATION_LOGIN> \
         -h <NODE_ADDRESS> -p 6379 SET greeting hello
      ```

      Here:

      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<NODE_ADDRESS>` is the current primary node address from the `endpoint` parameter in the email if **Single address through the load balancer** is enabled, or from the command output in the previous step.
      - `SET greeting hello` is the Valkey command that stores the value `hello` under the `greeting` key.

      Expected result: `OK`.

   1. Perform a read operation from the Valkey service:

      ```bash
      valkey-cli --tls --cacert ~/valkey-ca.pem --user <APPLICATION_LOGIN> \
         -h <NODE_ADDRESS> -p 6379 GET greeting
      ```

      Here:

      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<NODE_ADDRESS>` is the current primary node address from the `endpoint` parameter in the email if **Single address through the load balancer** is enabled, or from the command output in the previous step.
      - `GET greeting` is the Valkey command that retrieves the value of the `greeting` key.

      Expected result: `"hello"`.

   {/tab}
   {tab(Cluster)}

   1. Perform a write operation in the Valkey service:

      ```bash
      export REDISCLI_AUTH='<APPLICATION_PASSWORD>'
      valkey-cli -c --tls --cacert ~/valkey-ca.pem --user app \
         -h <NODE_ADDRESS> -p 6379 SET greeting hello
      ```

      Here:

      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<NODE_ADDRESS>` is any IP address from the `nodes` parameter in the email.
      - `-c` is the option that makes `valkey-cli` automatically switch to the node that stores the key.
      - `SET greeting hello` is the Valkey command that stores the value `hello` under the `greeting` key.

      Expected result: `OK`.

   1. Perform a read operation from the Valkey service:

      ```bash
      valkey-cli -c --tls --cacert ~/valkey-ca.pem --user app \
         -h <NODE_ADDRESS> -p 6379 GET greeting
      ```

      Here:

      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<NODE_ADDRESS>` is any IP address from the `nodes` parameter in the email.
      - `-c` is the option that makes `valkey-cli` automatically switch to the node that stores the key.
      - `GET greeting` is the Valkey command that retrieves the value of the `greeting` key.

      Expected result: `"hello"`.

   {/tab}
   {/tabs}

   The `appUser` account does not have access to administrative commands such as `CONFIG`, `FLUSHALL`, and `KEYS`. Use `adminUser` and `adminPassword` for them.

## {heading(3. Optional: connect your application)[id=valkey-start-check]}

1. Save the `clusterCA` value to a file on the application server if you have not already done so.
1. Pass the Valkey connection parameters to the Valkey client in your application code. The following are examples for Python with the `redis` library for the selected tariff. In other languages, use a Redis or Valkey client that supports TLS and username-password authentication.

   {tabs}
   {tab(Single)}

   ```python
   import redis

   client = redis.Redis(
      host="<NODE_ADDRESS>",
      port=6379,
      username="<APPLICATION_LOGIN>",
      password="<APPLICATION_PASSWORD>",
      ssl=True,
      ssl_ca_certs="<PATH_TO_CERTIFICATE>",
   )
   ```

   Here:

   - `<NODE_ADDRESS>` is the IP address without the port from the `endpoint` parameter in the email.
   - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
   - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
   - `<PATH_TO_CERTIFICATE>` is the full path to the file with `clusterCA` on your application server, for example `/opt/app/valkey-ca.pem`.

   {/tab}
   {tab(Sentinel with load balancer)}

   ```python
   import redis

   client = redis.Redis(
      host="<NODE_ADDRESS>",
      port=6379,
      username="<APPLICATION_LOGIN>",
      password="<APPLICATION_PASSWORD>",
      ssl=True,
      ssl_ca_certs="<PATH_TO_CERTIFICATE>",
   )
   ```

   Here:

   - `<NODE_ADDRESS>` is the IP address without the port from the `endpoint` parameter in the email.
   - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
   - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
   - `<PATH_TO_CERTIFICATE>` is the full path to the file with `clusterCA` on your application server, for example `/opt/app/valkey-ca.pem`.

   {/tab}
   {tab(Sentinel without load balancer)}

   ```python
   from redis.sentinel import Sentinel

   sentinel = Sentinel(
      [
         ("<SENTINEL_ADDRESS_1>", 26379),
         ("<SENTINEL_ADDRESS_2>", 26379),
         ("<SENTINEL_ADDRESS_3>", 26379),
      ],
      sentinel_kwargs={
         "password": "<SENTINEL_PASSWORD>",
         "ssl": True,
         "ssl_ca_certs": "<PATH_TO_CERTIFICATE>",
      },
      username="<APPLICATION_LOGIN>",
      password="<APPLICATION_PASSWORD>",
      ssl=True,
      ssl_ca_certs="<PATH_TO_CERTIFICATE>",
   )
   client = sentinel.master_for("<NODE_NAME>")
   ```

   Here:

   - `<SENTINEL_ADDRESS_1>` and so on are the addresses from `sentinelHosts` without the port. If there are five nodes, specify all five.
   - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
   - `<SENTINEL_PASSWORD>` is the `sentinelPassword` value from the email. Without it, the server rejects the connection.
   - `"ssl": True` enables encryption over TLS. Without it, the server rejects the connection.
   - `<PATH_TO_CERTIFICATE>` is the full path to the file with `clusterCA` on your application server, for example `/opt/app/valkey-ca.pem`.
   - `<NODE_NAME>` is the primary node name from the `masterName` parameter in the email.

   {/tab}
   {tab(Cluster)}

   1. Make sure that the client supports cluster mode.
   1. Install `redis` library version `5.0.8` or later if you have not already done so. Older library versions run the `INFO` command when connecting, but that command is not available to the `appUser` account. The `python3-redis` package from Ubuntu 24.04 is not suitable.

      ```bash
      pip install redis
      ```

   1. Create a connection:

      ```python
      from redis.cluster import RedisCluster

      client = RedisCluster(
         host="<NODE_ADDRESS>",
         port=6379,
         username="<APPLICATION_LOGIN>",
         password="<APPLICATION_PASSWORD>",
         ssl=True,
         ssl_ca_certs="<PATH_TO_CERTIFICATE>",
      )
      ```

      Here:

      - `<NODE_ADDRESS>` is any IP address from the `nodes` parameter in the email.
      - `<APPLICATION_LOGIN>` is the `appUser` value from the email.
      - `<APPLICATION_PASSWORD>` is the `appPassword` value from the email.
      - `<PATH_TO_CERTIFICATE>` is the full path to the file with `clusterCA` on your application server, for example `/opt/app/valkey-ca.pem`.

   {/tab}
   {/tabs}
