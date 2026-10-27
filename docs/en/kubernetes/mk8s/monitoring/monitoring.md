You can use the following tools to monitor the status of a Kubernetes cluster:

- [Preinstalled dashboard](#cluster_status_dashboard) in the management console. VK Cloud creates it for each cluster automatically. It shows the status of cluster resources.

- [Kube Prometheus Stack monitoring add-on](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#kube_prometheus_stack).

  With the add-on, you can view metrics of Kubernetes resources, down to individual pods. You can also use alerts that warn you when a metric exceeds its threshold, and [forecast](#forecasting_cluster_resource_consumption) cluster resource consumption. Forecasting is available in the add-on [version](/en/kubernetes/mk8s/concepts/versions/components) `68.3.3`.

## Cluster status dashboard

VK Cloud creates a dashboard for each cluster automatically. The dashboard is based on [Cloud Monitoring](/en/monitoring-services/monitoring). It shows the status of cluster resources, how their usage changes, and the main resource consumers. The data comes from the metrics of nodes, containers, persistent volumes, and the network. VK Cloud collects these metrics automatically.

The dashboard is [available](/en/kubernetes/mk8s/instructions/manage-cluster#view_cluster_status_dashboard) in the management console on the cluster page. Use its indicators to [configure](/en/monitoring-services/alerting/instructions/triggers#alerting-triggers-add) alerts in Cloud Monitoring.

The dashboard indicators fall into three groups:

- Cluster health — key indicators that show whether the cluster has enough resources:

   - CPU and memory usage of the cluster — actual resource consumption by all workloads. Values close to the maximum mean that the nodes have almost no spare computing resources.
   - Filesystem usage of the most-filled node. If the node disk is full, the kubelet may evict pods from the node. For more information about eviction thresholds, see [Calculation of available CPU and RAM computing resources](/en/kubernetes/mk8s/concepts/flavors#calculation_of_available_cpu_and_ram_computing_resources).
   - Number of [PVCs](/en/kubernetes/mk8s/reference/pvs-and-pvcs) that are more than 85% full. Applications cannot write data to a full PVC. For such PVCs, free up space or increase their size.
   - CPU and memory request usage — the share of [allocatable resources on the node](/en/kubernetes/mk8s/concepts/flavors#available_computing_resources_on_the_node) that pod requests reserve. If the value is high, the scheduler cannot place new pods, even if actual consumption is low. To fix this, try the solutions from [Pods are stuck in the Pending state](/en/kubernetes/mk8s/troubleshooting/pods-pending).

- Cluster resources — how resource usage changes:

   - CPU and memory dynamics — actual consumption compared with resource [requests and limits](/en/kubernetes/mk8s/reference/resource-limiting). The dashboard also compares it with the share of allocatable resources on the node.
   - Node utilization — CPU, memory, and filesystem usage for each node. Use it to find overloaded nodes and uneven load.
   - Node network traffic — incoming and outgoing traffic for each node. Use it to notice sudden spikes in network load.

- Resource consumers and risks — containers and PVCs that use the most resources or are close to running out:

   - Containers with the highest resource consumption. For such containers, [check](/en/kubernetes/mk8s/concepts/addons-and-settings/settings#limits_settings_for_pods) that resource requests and limits match the actual load. If you do not set them, the cluster uses default values.
   - Containers close to the memory limit. If a container exceeds the limit, the Linux kernel stops its process because of lack of memory, and the container may restart. The list does not include containers without a limit.
   - PVCs that will soon run out of space.

## Using Grafana

1. [Make sure](/en/kubernetes/mk8s/instructions/addons/manage-addons#viewing_addons) that the monitoring add-on (`kube-prometheus-stack`) [is installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-monitoring) in a cluster.
1. [Make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster using `kubectl`.

1. Access the Grafana web interface:

   1. Find the Grafana service name using the following command:

      ```console
      kubectl -n prometheus-monitoring get svc -l app.kubernetes.io/name=grafana
      ```

      The command output will show the Grafana service name in the format `<APP_NAME>-grafana`. If the app name was auto-generated when installed via the management console, the service name will look like `addon-<HASH>-grafana`, for example, `addon-c01ea19419-grafana`.

   1. Grant external access to Grafana via `port-forward` using the service name:

      ```console
      kubectl -n prometheus-monitoring port-forward service/<GRAFANA_SERVICE_NAME> 8001:80
      ```

      {note:warn}
      Do not close this session or you will lose access to the Grafana web interface.
      {/note}

   1. From the output of the command identify the port opened by `kubectl` to access Grafana.

      The port number is specified before the → symbol. For example, in this output the port `6637` is used to connect:

      ```text
      Forwarding from 127.0.0.1:6637 -> 3000
      Forwarding from [::1]:6637 -> 3000
      ```

   1. Open in your browser the URL for accessing the Grafana web interface:

      ```http
      http://localhost:<PORT>/
      ```

      The Grafana authorization page will appear.

1. Sign in to Grafana. Depending on the parameters with which the add-on was [installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-monitoring), use:

   - Login `admin` and temporary password. The password will need to be changed after the first authorization.
   - Login `admin` and a permanent password from the Kubernetes secret.

Now you can work with Grafana. For example, it is possible to create and view dashboards. Preconfigured dashboards with information about various Kubernetes resources are available in the **Dashboards → Browse** side menu.

Read more about working with Grafana in [official documentation](https://grafana.com/docs/grafana/latest/).

## {heading(Forecast cluster resource consumption)[id=forecasting_cluster_resource_consumption]}

The `kube-prometheus-stack` monitoring add-on version `68.3.3` includes built-in alerts that notify you if it forecasts that specific cluster resources will run out within a given time. The add-on also provides Grafana dashboards that show current resource consumption forecasts.

The add-on builds forecasts using the [linear regression method](https://prometheus.io/docs/prometheus/latest/querying/functions/#predict_linear): the add-on builds a linear function from the metric values it collects at a given interval within a given period, and calculates the forecast as the value of this function at a given time in the future. It expresses the result as a percentage of the maximum resource capacity on the Kubernetes object.

{note:warn}
The add-on does not forecast master node objects.
{/note}

1. [Make sure](/en/kubernetes/mk8s/instructions/addons/manage-addons#viewing_addons) that you have [installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-monitoring) version `68.3.3` of the `kube-prometheus-stack` monitoring add-on in the cluster.
1. [Go to](/en/kubernetes/mk8s/instructions/addons/manage-addons#editing_addon_code) the `kube-prometheus-stack` add-on code editing page and make sure that the `grafana.alerts.enabled` parameter in the code is set to `true`. This value is assigned to the parameter when the add-on is installed.
1. If this parameter was changed to `false`, set it back to `true` and save the updated settings.

   {note:warn}
   If the `grafana.alerts.enabled` parameter is disabled or the add-on code has other changes that are incompatible with the default settings, the add-on might not send resource exhaustion alerts.
   {/note}

1. [Sign in](#using_grafana) to Grafana.
1. In the side menu, go to the **Dashboards** section.
1. In the list of dashboards in the **VK Cloud** section, open the **K8s Resources Prediction** dashboard.
1. View the available resource consumption forecasts:

   - **CPU Leaders**: forecast of CPU consumption by worker nodes
   - **Memory Leaders**: forecast of RAM consumption by worker nodes
   - **Persistent Volume Leaders**: forecast of space consumption on a persistent volume ([PV](/en/kubernetes/mk8s/reference/pvs-and-pvcs))
   - **Inode Leaders**: forecast of index descriptor (inode) consumption on a persistent volume

1. (Optional) Adjust how forecasts are displayed using Grafana controls.
1. (Optional) Change the parameters used to calculate forecasts:

   - **Analysis period**: the time interval up to the current moment whose data the add-on uses to build the forecast function
   - **Forecast horizon**: the interval between the current moment and the future moment for which the add-on calculates the forecast

1. In the side menu, go to **Alerting** → **Alert rules**.
1. In the **Grafana** block, expand the **VK Cloud > K8s Resources Prediction** folder and view the built-in resource exhaustion alerts:

   - **K8sNodeCpuPrediction**: a worker node has no free CPU.
   - **K8sNodeMemoryPrediction**: a worker node has no free RAM.
   - **K8sPersistentVolumeCapacityPrediction**: a persistent volume has no free space.
   - **K8sPersistentVolumeInodePrediction**: a persistent volume has no free index descriptors.

   These alerts have the following parameters:

   - Analysis period: `1 week`
   - Sampling interval: `10 minutes`
   - Forecast horizon: `1 day`
   - Alert threshold: `100%`

   You cannot change the parameters of built-in alerts, but you can create your own alert based on a built-in one.

1. (Optional) Create your own alert based on a built-in one:

   1. In the list of alerts, click the copy button for the built-in alert you need, for example, `K8sNodeCpuPrediction`.
   1. Read the warning and click **Copy**.

      The **Add rule** page will open. In the **2 Define query and alert condition** section, the query string will appear under the **A** label. For the `K8sNodeCpuPrediction` alert, it looks like this:

      ```txt

      predict_linear(avg(instance:node_cpu_utilisation:rate5m * 100  * on(instance) group_left(nodename) node_uname_info{nodename!~".*master.*"}) by (nodename) [1w:10m],86400)

      ```

      This query contains the following values:

      - `100` — alert threshold in percent
      - `1w` — analysis period
      - `10m` — sampling interval
      - `86400` — forecast horizon in seconds

   1. Change the values as needed. The forecast horizon is set only in seconds, while for the analysis period and sampling interval, [other units](https://prometheus.io/docs/prometheus/latest/querying/basics/#float-literals-and-time-durations) are available.
   1. Configure other alert parameters as described in the [official Grafana documentation](https://grafana.com/docs/grafana/latest/alerting/alerting-rules/).
   1. Save the changes.

1. [Configure](https://grafana.com/docs/grafana/latest/alerting/configure-notifications) how Grafana delivers notifications when built-in and custom alerts fire.

Forecasting setup is complete.

Now you can:

- receive notifications about resource exhaustion
- when you receive a notification, view forecasts for other objects to resolve potential problems in advance
- view current forecasts and compare them with the consumption dynamics shown on the standard Grafana dashboards
- refine forecasting parameters based on the comparison and create your own alerts
