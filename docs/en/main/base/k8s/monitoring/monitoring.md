The following tools are available for monitoring the status of a Kubernetes cluster:

- Tools built into the Kubernetes Dashboard.

  They provide basic monitoring capabilities, allowing you to view information about Kubernetes resources.

- [Monitoring addon](../concepts/addons-and-settings/addons#kube-prometheus-stack).

  It provides advanced cluster monitoring capabilities, allowing you to view metrics for multiple Kubernetes resources, down to individual pods.
  It is also possible to configure alerts when specified thresholds for metrics are exceeded. For example, you can monitor if the cluster resources are not available or if the computing power of the worker nodes is insufficient.

  To find out if the monitoring addon is installed in the cluster, [see the list of installed addons](../operations/addons/manage-addons#viewing-addons).

## Using Kubernetes Dashboard

1. [Connect to the cluster using Kubernetes Dashboard](../connect/k8s-dashboard).
1. Get data about the cluster resources:

   1. Select the desired namespace from the drop-down list at the top of the Kubernetes Dashboard interface. The default namespace selected is `default`.
   1. From the side menu, select the Kubernetes resource of interest.

## Using Grafana

1. [Make sure](../operations/addons/manage-addons#viewing-addons) that the monitoring addon (`kube-prometheus-stack`) [is installed](../operations/addons/advanced-installation/install-advanced-monitoring/) in a cluster.
1. [Make sure](../connect/kubectl#checking-the-connection-to-the-cluster) that you can connect to the cluster using `kubectl`.

1. Access the Grafana web interface:

   1. In a separate terminal session, run the command:

      ```bash
      kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
      ```

      <warn>

      Do not close this session or you will lose access to the Grafana web interface.

      </warn>

   1. From the output of the command identify the port opened by `kubectl` to access Grafana.

      The port number is specified before the → symbol. For example, in this output the port `6637` is used to connect:

      ```text
      Forwarding from 127.0.0.1:6637 -> 3000
      Forwarding from [::1]:6637 -> 3000
      ```

   1. Open in your browser the URL for accessing the Grafana web interface:

      ```http
      http://localhost:<port>/
      ```

      The Grafana login page will appear.

1. Log in to Grafana. Depending on the parameters with which the addon was [installed](../operations/addons/advanced-installation/install-advanced-monitoring/), use:

   - Login `admin` and temporary password. The password will need to be changed after the first login.
   - Login `admin` and a permanent password from the Kubernetes secret.

Now you can work with Grafana. For example, it is possible to create and view dashboards. Preconfigured dashboards with information about various Kubernetes resources are available in the **Dashboards → Browse** side menu.

Read more about working with Grafana in [official documentation](https://grafana.com/docs/grafana/latest/).
