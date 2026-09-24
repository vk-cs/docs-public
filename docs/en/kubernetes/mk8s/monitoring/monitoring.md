To monitor the status of a Kubernetes cluster, you can use the [monitoring add-on](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#kube_prometheus_stack).

It provides advanced cluster monitoring capabilities, allowing you to view metrics for multiple Kubernetes resources, down to individual pods.

It is also possible to configure alerts when specified thresholds for metrics are exceeded. For example, you can monitor if the cluster resources are not available or if the computing power of the worker nodes is insufficient.

To find out if the monitoring add-on is installed in the cluster, [see the list of installed add-ons](/en/kubernetes/mk8s/instructions/addons/manage-addons#viewing_addons).


## Using Grafana

1. [Make sure](/en/kubernetes/mk8s/instructions/addons/manage-addons#viewing_addons) that the monitoring add-on (`kube-prometheus-stack`) [is installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-monitoring) in a cluster.
1. [Make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster using `kubectl`.

1. Access the Grafana web interface:

   1. In a separate terminal session, run the command:

      ```console
      kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
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
      http://localhost:<port>/
      ```

      The Grafana authorization page will appear.

1. Sign in to Grafana. Depending on the parameters with which the add-on was [installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-monitoring), use:

   - Login `admin` and temporary password. The password will need to be changed after the first authorization.
   - Login `admin` and a permanent password from the Kubernetes secret.

Now you can work with Grafana. For example, it is possible to create and view dashboards. Preconfigured dashboards with information about various Kubernetes resources are available in the **Dashboards → Browse** side menu.

Read more about working with Grafana in [official documentation](https://grafana.com/docs/grafana/latest/).
