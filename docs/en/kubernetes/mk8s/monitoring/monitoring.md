You can use the following tools to monitor the status of a Kubernetes cluster:

- [Preinstalled dashboard](#cluster_status_dashboard) in the management console. VK Cloud creates it for each cluster automatically. It shows the status of cluster resources.

- [Kube Prometheus Stack monitoring add-on](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#kube_prometheus_stack).

  With the add-on, you can view metrics of Kubernetes resources, down to individual pods. You can also use alerts that warn you when a metric exceeds its threshold.

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
