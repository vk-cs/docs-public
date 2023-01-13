The following tools are available for monitoring the status of a Kubernetes cluster:

- Tools built into the Kubernetes Dashboard.

  They provide basic monitoring capabilities, allowing you to view information about Kubernetes resources.

- Pre-configured [monitoring service](../concepts/preconfigured-features/addons#monitoring) (must be selected during cluster creation).

  It provides advanced cluster monitoring capabilities, allowing you to view metrics for multiple Kubernetes resources, down to individual pods.
  It is also possible to configure alerts when specified thresholds for metrics are exceeded. For example, you can monitor if the cluster resources are not available or if the computing power of the worker nodes is insufficient.

  To find out whether a monitoring service is available in a cluster:
  1. Make sure that you can [connect to the cluster](../connect/kubectl) with `kubectl`.
  1. Run the command:

     ```bash
     kubectl get namespaces
     ```

     If the output of the command contains the namespace `prometheus-monitoring`, the service is installed and available.

## Using Kubernetes Dashboard

1. [Connect to the cluster using Kubernetes Dashboard](../connect/k8s-dashboard).
1. Get data about the cluster resources:

   1. Select the desired namespace from the drop-down list at the top of the Kubernetes Dashboard interface. The default namespace selected is `default`.
   1. From the side menu, select the Kubernetes resource of interest.

## Using Grafana

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

1. Log in to Grafana:

   - If you are logging in for the first time:

     1. Use the login `admin` and the password `admin` to log in.
     1. Set a new password instead of the default password.
     1. Click the **Submit** button.

   - If you've already logged into Grafana, use the `admin' login and the password you have set.

Now you can work with Grafana. For example, it is possible to create and view dashboards. Preconfigured dashboards with information about various Kubernetes resources are available in the **Dashboards → Browse** side menu.

Read more about working with Grafana in [official documentation](https://grafana.com/docs/grafana/latest/).
