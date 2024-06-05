[Prometheus](https://prometheus.io/) is a server designed to collect and store metrics received from processes (exporters). The accumulated data can be viewed both through the Prometheus web interface and through separate visualization tools, for example, [Grafana](https://grafana.com/docs/grafana/latest/).

This instruction will help:

- deploy Prometheus 2.45.1 server in CentOS 8.4 operating system in VK Cloud;
- install the Node exporter extension in the Redis 5 Single configuration DBMS;
- customize the visualization of data from Redis in Prometheus and Grafana 10.

Prometheus server, DBMS and Grafana will be deployed on separate VMs.

## Preparatory steps

1. [Create](/en/networks/vnet/operations/manage-net#creating_a_network) a virtual network, for example, `monitoring-net`.
1. [Create](/en/base/iaas/service-management/vm/vm-create) VM for Prometheus server:

   - name: `Centos_8_5_Prometheus`;
   - operating system: CentOS 8.4;
   - network: `monitoring-net`;
   - public IP address: assign it, as an example is given `87.239.239.239`;
   - security groups: `default`, `all`.

   The internal IP address of the created instance: `10.0.3.7`.

1. [Create a DB instance](/en/dbs/dbaas/instructions/create/create-single-replica):

   - name: `Redis-5`;
   - DBMS: Redis 5;
   - configuration type: Single;
   - network: `monitoring-net`;

   The internal IP address of the created instance: `10.0.3.13`.

1. [Deploy](/en/applications-and-services/marketplace/initial-configuration/grafana-start) Grafana 10 is on the `monitoring-net` network.

## 2. Install and configure Prometheus

1. [Install](/en/dbs/dbaas/instructions/managing-extensions#installing_the_extension) the **Node exporter** extension for the `Redis-5` DB instance. When installing, specify the parameter `listen_port` = `9100`.
1. [Connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-nix) to the `Centos_8_5_Prometheus` VM.
1. Download Prometheus and unzip the downloaded archive:

   ```bash
   sudo su
   export VERSION="2.45.1"
   wget https://github.com/prometheus/prometheus/releases/download/v$VERSION/prometheus-$VERSION.linux-amd64.tar.gz -O - | tar -xzv -C /tmp
   ```

1. Copy the contents of the repository `prometheus-2.45.1.linux-amd64`:

   ```bash
   mkdir /etc/prometheus
   mkdir /var/lib/prometheus
   cp /tmp/prometheus-$VERSION.linux-amd64/prometheus /usr/local/bin
   cp /tmp/prometheus-$VERSION.linux-amd64/promtool /usr/local/bin
   cp -r /tmp/prometheus-$VERSION.linux-amd64/consoles /etc/prometheus
   cp -r /tmp/prometheus-$VERSION.linux-amd64/console_libraries /etc/prometheus
   cp /tmp/prometheus-$VERSION.linux-amd64/prometheus.yml /etc/prometheus/
   ```

1. (Optional) Delete files from the temporary directory:

   ```bash
   rm -rf /tmp/prometheus-$VERSION.linux-amd64
   ```

1. Create a group and a user `prometheus`, assign him rights to the associated repositories:

   ```bash
   groupadd --system prometheus
   useradd --system -g prometheus -s /bin/false prometheus
   chown -R prometheus:prometheus /var/lib/prometheus /etc/prometheus
   chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
   ```

1. In the file `/etc/prometheus/prometheus.yml` add content to the `scrape_configs` block:

   ```yml
   - job_name: "node"
     scrape_interval: 10s
     static_configs:
       - targets: ["10.0.3.13:9100"]   
   ```

1. Create a Prometheus startup script `/etc/systemd/system/prometheus.service` with the contents:

   ```ini
   [Unit]
   Description=Prometheus
   Wants=network-online.target
   After=network-online.target
   
   [Service]
   User=prometheus
   Group=prometheus
   ExecStart=/usr/local/bin/prometheus \
       --config.file /etc/prometheus/prometheus.yml \
       --storage.tsdb.path /var/lib/prometheus \
       --web.console.templates=/etc/prometheus/consoles \
       --web.console.libraries=/etc/prometheus/console_libraries
   ExecReload=/bin/kill -HUP $MAINPID
   [Install]
   WantedBy=default.target
   ```

1. Run Prometheus:

   ```bash
   systemctl daemon-reload
   systemctl start prometheus.service
   systemctl enable prometheus.service
   ```

1. Make sure that Prometheus is working correctly:

   ```bash
   systemctl status prometheus.service
   ```

   The output of the command must contain the `active` status.

   <details>
    <summary>An example of the expected output</summary>

    ```bash
    prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: disabled)
     Active: active (running) since Mon 2023-11-20 16:11:25 UTC; 25min ago
    Main PID: 1065 (prometheus)
     Tasks: 6 (limit: 5921)
     Memory: 51.3M
     CGroup: /system.slice/prometheus.service
             └─1065 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus --web.console.templates=/etc/prometheus/consoles

    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=tls_config.go:274 level=info component=web msg="Listening on" address=[::]:9090
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=tls_config.go:277 level=info component=web msg="TLS is disabled." http2=false address=[::]:9090
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=head.go:755 level=info component=tsdb msg="WAL segment loaded" segment=0 maxSegment=0
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=head.go:792 level=info component=tsdb msg="WAL replay completed" checkpoint_replay_duration=44.387µs wal_replay_duration=1.206992ms wbl_replay_duration=160ns total_replay_duration=1.363332ms
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.320Z caller=main.go:1040 level=info fs_type=EXT4_SUPER_MAGIC
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.320Z caller=main.go:1043 level=info msg="TSDB started"
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.320Z caller=main.go:1224 level=info msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.327Z caller=main.go:1261 level=info msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=6.828877ms db_storage=1.31µs remote_storage=1.172µs web_handler=292ns query_engine=475ns scrape=6.420765ms scrape_sd=40.431µs notify=24.848µs notify_sd=9.021µs rules=1.268µs tracing=5.417µs
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.327Z caller=main.go:1004 level=info msg="Server is ready to receive web requests."
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.327Z caller=manager.go:995 level=info component="rule manager" msg="Starting rule manager..."
    ```

   </details>

1. Wait a few minutes for the data to accumulate.
1. Go to the address `http://87.239.239.239:9090`.

   The Prometheus server web interface opens.

1. (Optional) Review the available data:

   - Create a [search query](https://prometheus.io/docs/prometheus/2.45/querying/examples/) to view the data in tabular form.
   - Open the [template graph sets](https://prometheus.io/docs/visualization/consoles/) to `http://87.239.239.239:9090/consoles/index.html.example`.

1. (Optional) [Unbind](/en/networks/vnet/operations/manage-floating-ip#unbinding_floating_ip_address) floating address from VM `Centos_8_5_Prometheus`.

## 3. Set up data visualization in Grafana

1. Go to the Grafana web interface.
1. [Add](https://grafana.com/docs/grafana/v10.0/administration/data-source-management/) new data source: to **Prometheus server URL** specify `http://10.0.3.7:9090`.
1. [Install](https://grafana.com/docs/grafana/v10.0/dashboards/build-dashboards/create-dashboard/) sets of graphs for visualizing the received data, for example, by importing a ready-made version — [Node Exporter Full](https://grafana.com/grafana/dashboards/1860-node-exporter-full/).

## 4. (Optional) Check the monitoring data after the test load

1. Create a test load on the `Redis-5` VM in a way that is convenient for you.

   <details>
    <summary>Example with the sysbench utility</summary>

   ```bash
   sysbench cpu  --cpu-max-prime=2000000 --time=60 run
   sysbench fileio --file-test-mode=rndrw --time=60 prepare
   sysbench fileio --file-test-mode=rndrw --time=60 run
   sysbench threads --time=60 run
   sysbench mutex --time=60 run
   ```

   </details>

   <warn>

   Installation of additional software on virtual machines of the Cloud Databases service is possible only through a request to [technical support](/en/contacts).

   </warn>

1. Make sure to change the indicators of the Grafana charts.

## Delete unused resources

The created resources are charged and quotas are spent. If you don't need them anymore:

1. [Delete](/en/base/iaas/vm-start/manage-vm/vm-delete) deployed virtual machines.
1. [Delete](/en/applications-and-services/marketplace/service-management/pr-instance-manage#deleting_a_service_instance) a virtual machine with Grafana.
1. [Remove](/en/networks/vnet/operations/manage-floating-ip#removing_floating_ip_address_from_the_project) the floating IP address assigned to the `Centos_8_5_Prometheus` VM.
1. [Delete](/en/networks/vnet/operations/manage-ports#deleting_a_port) the port to which the virtual IP address is assigned.
1. [Delete](/en/networks/vnet/operations/manage-net#deleting_a_network) a `monitoring-net` network.
