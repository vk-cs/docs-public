# {heading(Load balancer monitoring with Prometheus)[id=balancing-lb-prometheus]}

{include(/en/_includes/_translated_by_ai_en.md)}

For {var(cloud)} load balancers, you can configure monitoring — collecting and exporting [OpenStack Octavia](https://docs.openstack.org/octavia/latest/) metrics using Prometheus and visualizing these metrics on dashboards using Grafana.

The following will show how to set up load balancer monitoring using the Grafana and Prometheus services deployed on a VM with a Linux OS. If your infrastructure already has a Grafana and Prometheus environment configured, skip the steps related to deploying and configuring it.

{note:info}
Monitoring with Prometheus is available for load balancers created after June 20, 2026.
{/note}

## {heading(Preparatory steps)[id=balancing-lb-prometheus-prep]}

1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Install]} the OpenStack client with the `octavia` and `neutron` packages and authenticate in the project.
1. {linkto(../../../../applications-and-services/marketplace/initial-configuration/grafana-start#marketplace-grafana-start)[text=Deploy]} the [Grafana](https://msk.cloud.vk.ru/app/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info) service from the application marketplace. If you are configuring monitoring for a load balancer in a private network, the VM on which the service is deployed must be in the same subnet as this load balancer. Services from the application marketplace already contain basic settings for operating in VK Cloud. For more information about the available settings, see the [official Grafana documentation](https://archive.grafana.com/docs/grafana/v10.0/setup-grafana/configure-grafana/).
1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the VM where the Grafana service is installed and install [Prometheus](https://prometheus.io/) on it:

   ```console
   sudo apt update
   wget https://github.com/prometheus/prometheus/releases/download/v2.45.1/prometheus-2.45.1.linux-amd64.tar.gz
   tar xvf prometheus-2.45.1.linux-amd64.tar.gz
   cd prometheus-2.45.1.linux-amd64
   ```

## {heading(1. Get information about the load balancer)[id=balancing-lb-prometheus-info]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **Virtual networks** → **Load balancers** section.

   A list of load balancers will be displayed.

1. Click the name of the desired load balancer.
1. In the **IP addresses** block, find and write down the load balancer IP addresses.
1. In the **Load balancer information** block, find and write down the load balancer ID.

## {heading(2. Create a Prometheus Listener)[id=balancing-lb-prometheus-listener]}

Run the command:

```console
openstack loadbalancer listener create \
    --name prometheus-listener \ 
    --protocol PROMETHEUS \ 
    --protocol-port 9100 \
    <LOAD_BALANCER_ID>
```

## {heading(3. Perform the integration with Prometheus)[id=balancing-lb-prometheus-integration]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the VM where Prometheus is installed.
1. Open the Prometheus configuration file:

   ```console
   nano /etc/prometheus/prometheus.yml
   ```

1. Find the `scrape_configs` block and add the following setting to it:

   ```yml
     - job_name: 'Octavia'
       static_configs:
         - targets: ['<LOAD_BALANCER_IP_ADDRESS>:9100']
   ```
   Here `<LOAD_BALANCER_IP_ADDRESS>` is the internal or external IP address of the load balancer. Use the external IP address if the Grafana and Prometheus server is not in the same private subnet as the load balancer.
1. Start Prometheus:

   ```console
   sudo apt install screen
   screen -dm ./prometheus --config.file=./prometheus.yml --web.listen-address=localhost:9090
   ```

   If the configuration was performed on a running Prometheus, restart it:

   ```console
   systemctl restart prometheus
   ```

## {heading(4. Add the Octavia dashboard to Grafana)[id=balancing-lb-dashboard]}

{note:info}
An example of a configured Octavia dashboard is available [on the official Grafana website](https://grafana.com/grafana/dashboards/15828-openstack-octavia-amphora-load-balancer/).
{/note}

1. Log in to Grafana.
1. Add the Prometheus data source to Grafana, if this has not been done before:
   1. Go to the **Configuration → Data sources** section.
   1. Click **Add data source**.
   1. Select the data source type: `Prometheus`.
   1. In the **URL** field, enter `http://localhost:9090`.
   1. Click **Save & test**.
1. Add the ready-made dashboard for Octavia metrics:
   1. Go to the **Dashboards** section.
   1. Click the **NEW** button and select **Import** in the menu.
   1. In the **Import via grafana.com** field, enter the ID: `15828`.
   1. Click the **Load** button.
1. In the **Prometheus** field, select the previously created `Prometheus` data source.
1. Click the **Import** button.
1. Make sure the dashboard has been created:
   1. Go to the **Dashboards → Browse** section.
   1. Open the **OpenStack Octavia Amphora Load Balancer** dashboard page.

## {heading(Delete unused resources)[id=balancing-lb-delete]}

A running VM with Grafana and Prometheus consumes computing resources. If you no longer need it, {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete it]}.