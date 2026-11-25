# {heading(Deployment of Monitoring for Arenadata DB)[id=marketplace-adb-monitoring-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Monitoring for Arenadata DB combines Prometheus capabilities for collecting metrics from all cluster nodes with Grafana for visualizing them. The service lets you monitor the system state in real time through ready-made dashboards and configure automatic alerts in Telegram and MAX when critical events occur.

Grafana dashboards are available by domain name with a trusted certificate. If you do not need a public address, Grafana works only on the internal network at the address of the VM with the deployed service. For more information about dashboards, see the [official Grafana documentation](https://grafana.com/docs/grafana/latest/).

This guide will help you deploy Monitoring for Arenadata DB on a VM in {var(cloud)} and connect an Arenadata DB cluster to it.

{cut(Minimum VM specifications for the service)}

- **vCPU**: 4.
- **RAM**: 16 GB.
- Disk size:

  - **System disk**: at least 10 GB.
  - **Data disk**: at least 100 GB.

- **Network**:

  - The VM must have Internet access.
  - Private DNS must be disabled.

{/cut}

By using Monitoring for Arenadata DB, you agree to the license agreements of [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace), [Grafana](https://github.com/grafana/grafana/blob/main/LICENSE), [Prometheus](https://github.com/prometheus/prometheus/blob/main/LICENSE), [Alertmanager](https://github.com/prometheus/alertmanager/blob/main/LICENSE), and [ADB Exporter](https://mit-license.org/).

## {heading(Preparation steps)[id=marketplace-adb-monitoring-prep]}

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} in {var(cloud)} and [go to](https://msk.cloud.vk.ru/app) your account.
1. Configure the network so that the service is accessible from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the VM with the deployed service will be located, disable the **Private DNS** option.

## {heading(1. Connect the Monitoring for Arenadata DB service)[id=marketplace-adb-monitoring-connect]}

1. In your {var(cloud)} [account](https://msk.cloud.vk.com/app/), go to the **Application Store** section.
1. Click the **Monitoring for Arenadata DB** service card.

   If the **Monitoring for Arenadata DB** service card is not shown on the page, click **All solutions** and find the card in the catalog.

1. Click **Connect**.
1. Specify the parameters of the VM on which the service will be deployed:

   - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will run.
   - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preconfigured VM flavor]} from the list, from `2-8` to `16-64`, where the first number is the number of CPU cores and the second is the RAM size in gigabytes.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.

1. Specify the system disk and data disk parameters:

   - **Data disk size**: specify the required VM disk size in gigabytes. For testing, keep the value `100`. For a production workload, specify a larger size if the Grafana metric history is shorter than 30 days.
   - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]}. For intensive writes, choose `High-IOPS SSD`.

1. Click **Next step**.
1. At the **Network access** step, specify the following:

   - **Domain, certificate, and public address**: enable this option to access the service from the Internet. If you disable it, the service is available only on the internal network by the VM IP address with a self-signed certificate.
   - **Client network**: keep the value `subnet` if Grafana users work in the same subnet as the VM with the deployed service. If users are in a different subnet, specify its address, for example `10.0.2.0/24`. You can {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=view]} the subnet address in your account. If **Domain, certificate, and public address** is disabled, Grafana charts and monitoring data, as well as SSH access, are available only from this network.

1. Click **Next step**.
1. At the **Monitoring parameters** step, specify the cluster connection settings:

   - **Arenadata DB cluster name**: enter the Arenadata DB cluster name, for example `adb-prod`. The cluster is displayed under this name on dashboards and in alerts. For an Arenadata DB cluster deployed in {var(cloud)}, the cluster name is available in **Analytical DBs** → **ADB instances**, on the **Information** tab of the cluster page. Allowed characters are Latin letters, digits, `.`, `-`, and `_`. Maximum length is 64 characters.
   - **Arenadata DB node IP address**: enter the internal address of the master server in the cluster, for example `10.0.0.5`. Addresses in the `172.31.X.X` range are not suitable. For an Arenadata DB cluster deployed in {var(cloud)}, the master server address is shown in **Cloud Computing** → **Virtual Machines** on the page of the VM named `<PREFIX>-Master-0`, where `<PREFIX>` is the alphanumeric prefix shared by all VMs in the cluster, for example `ADB207d0a3b`.

      Save this value. You will need it later when configuring the account for collecting metrics.

   - **Arenadata DB port**: enter the port used to connect to the Arenadata DB cluster. For an Arenadata DB cluster deployed in {var(cloud)}, the connection port number is shown in **Analytical DBs** → **ADB instances** on the **Information** tab of the cluster page, in the **Connecting settings** row after the `-p` parameter. The default value is `5432`.

      Save this value. You will need it later when configuring the account for collecting metrics.

   - **Database user**: enter the login for the monitoring account.

      Save this value. You will need it later when configuring the account for collecting metrics. The examples later in this guide use the value `vkc_monitoring`.

   - **Database user password**: create a password. The `vkc_monitoring` account in the cluster will receive the same password. The maximum length is 128 characters. Spaces, quotation marks, and the `\`, `$`, and `!` characters are not allowed. Save this value. You will need it later when configuring the account for collecting metrics.
   - **Database name**: enter the database name, for example `analytics`. For an Arenadata DB cluster deployed in {var(cloud)}, specify the value from the **Database name** row on the **Information** tab in **Analytical DBs** → **ADB instances**.

1. Click **Next step**.
1. At the **Alerts** step, specify:

   - **Telegram alerts**: enable this option if you need alerts in Telegram, and specify the following parameters:

      - **Telegram chat ID**: enter the identifier of the chat to which alerts are connected, for example `-1001234567890`. The identifier is the part of the chat address after the `#` sign in the Telegram web version at `web.telegram.org/a/`.
      - **Telegram bot token**: enter the token of the bot that sends the alerts. Any bot that has already been added to this chat can be used.

   - **MAX alerts**: enable this option if you need alerts in MAX, and specify the following parameters:

      - **MAX chat ID**: enter the channel or chat identifier, for example `-71234567890123`. To find the identifier, see the [official MAX documentation](https://dev.max.ru/docs-api/use-cases/getting-chat-id).
      - **MAX bot token**: enter the token of the bot that sends the alerts. Any bot already added to this chat or channel can be used.

1. Click **Next step**.
1. Review the infrastructure cost for deploying the service and click **Connect tariff**.

   Cloud infrastructure deployment will start, and the service properties page will open. The process status is also displayed in **Application Store** → **My services**.

   After successful deployment, messages will be sent to the email address associated with your {var(cloud)} account:

   - a notification with a link to the service instance in your {var(cloud)} account;
   - an email with a one-time link to the access data.

1. Follow the one-time link from the email and save the service access data:

   - `productURL`: Grafana address.
   - `grafanaUser` and `grafanaPassword`: Grafana administrator username and password.
   - `externalIP`: public address of the VM with the service, if **Domain, certificate, and public address** is enabled.
   - `internalIP`: internal address of the VM with the service.
   - `sshUser` and `sshKey`: username and private key for connecting to the VM with the service over SSH.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new credentials.
   {/note}

## {heading(2. Create an account for collecting metrics in the cluster)[id=marketplace-adb-monitoring-db-user]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} over SSH to the VM with the deployed service using the `sshUser` login and `sshKey` key from the email. Use the `externalIP` address from the email to connect to the VM, or `internalIP` if **Domain, certificate, and public address** is disabled.

1. Configure the database connection:

   ```console
   psql -h <NODE_IP> -p <PORT> -U <LOGIN> -d <DB_NAME> \
     -f /home/almalinux/init.sql \
     -c "ALTER USER vkc_monitoring PASSWORD '<PASSWORD>'"
   ```

   Here:

   - `<NODE_IP>` is the value of the **Arenadata DB node IP address** field specified when deploying the service.
   - `<PORT>` is the value of the **Arenadata DB port** field specified when deploying the service.
   - `<LOGIN>` is the database user name. The value is shown in **Analytical DBs** → **ADB instances** on the **Information** tab of the cluster page in the **User** row.
   - `<DB_NAME>` is the value of the **Database name** field specified when deploying the service.
   - `<PASSWORD>` is the value of the **Database user password** field specified when deploying the service.

   As a result, the `init.sql` script on the VM with the deployed service automatically creates the `vkc_monitoring` account with read-only permissions for monitoring data.

   Expected result: the output contains no lines with `ERROR`, and the last line is `ALTER ROLE`.

## {heading(3. Connect the cluster nodes to Prometheus)[id=marketplace-adb-monitoring-nodes]}

1. Install the Node Exporter agent on all cluster nodes. To install the agent in an Arenadata DB cluster deployed in {var(cloud)}, contact [technical support](/en/contacts). If Arenadata DB is deployed on your own VMs, install the agent yourself according to the [instructions](https://github.com/prometheus/node_exporter/blob/master/README.md).
1. In the security group for the cluster nodes, {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=add]} a rule for inbound traffic with the following parameters:

   - Protocol: `TCP`.
   - Port: `9100`.
   - Remote address: the `internalIP` value from the email, or the subnet that contains this address, for example `10.0.0.0/24`.

   For an Arenadata DB cluster deployed in {var(cloud)}, this security group is named `adb-main-ext`.

1. Connect over SSH to the VM with the deployed service and find out the cluster node names by querying the database:

   ```console
   psql -h <NODE_IP> -p <PORT> -U vkc_monitoring -d <DB_NAME> \
     -c "SELECT DISTINCT hostname FROM gp_segment_configuration ORDER BY hostname"
   ```

   Here:

   - `<NODE_IP>` is the value of the **Arenadata DB node IP address** field specified when deploying the service.
   - `<PORT>` is the value of the **Arenadata DB port** field specified when deploying the service.
   - `<DB_NAME>` is the value of the **Database name** field specified when deploying the service.

   When prompted for a password, enter the value of the **Database user password** field specified when deploying the service.

   Expected result: the names of the cluster nodes are displayed, including the master servers, standby master server, and segment servers, for example `<PREFIX>-Master-0`, `<PREFIX>-Standby-0`, and `<PREFIX>-Segments-0`. Service nodes are not shown in the output.

   Save these names. You will need them later.

   Here:

   - `<PREFIX>` is the alphanumeric prefix shared by all VMs in a single cluster. The examples below use the prefix `ADB207d0a3b`.
   - `Master`, `Standby`, and `Segments` are the cluster node types.

1. Determine the names of the service nodes. Go to **Cloud Computing** → **Virtual Machines** and find the VMs with the `ADB207d0a3b` prefix that were not listed in the output of the previous step. Save these names. You will need them later.
1. Find out the internal address of each cluster node. In **Cloud Computing** → **Virtual Machines**, for the VMs with the `ADB207d0a3b` prefix, open the **Networks** tab and find the value in the **IP address** field, for example `10.0.0.5`.
1. On the VM with the deployed service, open the Prometheus configuration file:

   ```bash
   sudo vim /opt/monitoring_data/prometheus/prometheus.yml
   ```

1. In the configuration file, in the `node_exporter` job, replace the `static_configs: []` line with a block containing the cluster nodes. For each cluster VM, add its own `- targets` block:

   ```yaml
       static_configs:
         - targets: ["<VM_ADDRESS>:9100"]
           labels:
             instance: "<VM_NAME>"
             adb_cluster: "<CLUSTER_NAME>"
   ```

   Here:

   - `<VM_ADDRESS>` is the internal address of the node found earlier.
   - `<VM_NAME>` is the node name from the database query output, for example `ADB207d0a3b-Segments-0`. The **Segments** dashboard uses this name to associate the node with cluster segments.
   - `<CLUSTER_NAME>` is the value of the **Arenadata DB cluster name** field specified when deploying the service.

1. Save the file, validate it, and apply the configuration:

   ```bash
   sudo /usr/local/bin/promtool check config \
     /opt/monitoring_data/prometheus/prometheus.yml
   sudo systemctl reload prometheus
   ```

   Expected result: the first command output contains the line `SUCCESS: /opt/monitoring_data/prometheus/prometheus.yml is valid prometheus config file syntax`.

## {heading(4. Connect Docker container metrics to Prometheus)[id=marketplace-adb-monitoring-docker]}

Until metrics are connected, the **Docker Containers** dashboard remains empty.

1. Install the cAdvisor agent on the cluster nodes where Docker containers run. To install the agent in an Arenadata DB cluster deployed in {var(cloud)}, contact [technical support](/en/contacts). If Arenadata DB is deployed on your own VMs, install the agent yourself according to the [instructions](https://github.com/google/cadvisor/blob/master/README.md).
1. In the security group for the cluster nodes, {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=add]} a rule for inbound traffic:

   - Protocol: `TCP`.
   - Port: `8080`.
   - Remote address: the `internalIP` value from the email, or the subnet that contains this address, for example `10.0.0.0/24`.

1. On the VM with the deployed service, open the Prometheus configuration file as in the previous step and add the `docker-exporter` job to the end of the file. For each node with cAdvisor, add its own `- targets` block:

   ```yaml
     - job_name: 'docker-exporter'
       static_configs:
         - targets: ["<VM_ADDRESS>:8080"]
           labels:
             instance: "<VM_NAME>"
   ```

   - `<VM_ADDRESS>` is the internal address of the node found earlier.
   - `<VM_NAME>` is the node name from the database query output, for example `ADB207d0a3b-Segments-0`.

1. Save the file, validate it, and apply the configuration:

   ```console
   sudo /usr/local/bin/promtool check config \
     /opt/monitoring_data/prometheus/prometheus.yml
   sudo systemctl reload prometheus
   ```

   Expected result: the first command output contains the line `SUCCESS: /opt/monitoring_data/prometheus/prometheus.yml is valid prometheus config file syntax`.

## {heading(5. Check metric display in Grafana)[id=marketplace-adb-monitoring-grafana]}

1. Open the web interface of the monitoring service using the address from the `productURL` parameter in the email. If **Domain, certificate, and public address** is disabled, open the address from the client network and confirm the transition when the browser warns about a self-signed certificate.

1. Sign in using the `grafanaUser` login and `grafanaPassword` password from the email.

The main page of the Grafana monitoring service opens. On the dashboards, you will see the status of all connected cluster nodes.
