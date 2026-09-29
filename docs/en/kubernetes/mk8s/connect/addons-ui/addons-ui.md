Some [add-ons](/en/kubernetes/mk8s/concepts/addons-and-settings/addons) that can be [installed](/en/kubernetes/mk8s/instructions/addons/manage-addons) in the cluster have a web interface. The method of connecting to the web interface depends on the IP address of the cluster:

- If an external IP address is assigned to the cluster, then you can connect from any host with Internet access.
- If the cluster is assigned only an internal IP address, then you can connect only from a host in VK Cloud - a virtual machine that is located on the same subnet as the cluster.

A browser must be installed on the host to connect.

## Before you begin

1. On the host from which you plan to connect to the add-on web interface, [make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster using `kubectl`.

1. Install `kauthproxy` on the same host if the utility is not already installed:

   1. Download the archive of the required version from the [releases page](https://github.com/int128/kauthproxy/releases):

      - for Linux: `kauthproxy_linux_....zip`;
      - for macOS: `kauthproxy_darwin_....zip`;
      - for Windows: `kauthproxy_windows_....zip`.

   1. Unpack the archive.

   1. Place the executable file in the directory that is contained in the environment variable `PATH`, for example:

      - at `/usr/local/bin` for Linux/macOS;
      - at `C:\` for Windows.

## {heading(Connecting to the add-on web interface)[id=web-ui]}

{tabs}

{tab(Jaeger)}

1. [Make sure](/en/kubernetes/mk8s/instructions/addons/manage-addons#viewing_addons) that `jaeger` add-on [is installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-jaeger) to the cluster.
1. On the host, in a separate terminal session, run the command:

   ```console
   kauthproxy -n jaeger http://jaeger-query.svc
   ```

   If you selected a service name other than `jaeger` or a namespace other than `jaeger` when adding the add-on, adjust the command.

   A browser will open and you will be directed to the Query UI web interface. The web interface is available only via HTTP.

   {note:warn}

   Do not close this terminal session, otherwise access to the web interface will be lost.

   {/note}

{/tab}

{tab(Kube Prometheus Stack (Grafana))}

The Kube Prometheus Stack addon includes [Grafana](https://grafana.com/) — a tool for visualizing metrics and the status of clusters. To connect to it:

1. [Make sure](/en/kubernetes/mk8s/instructions/addons/manage-addons#viewing_addons) that the `kube-prometheus-stack` addon [is installed](/en/kubernetes/mk8s/instructions/addons/advanced-installation/install-advanced-monitoring) in the cluster.
1. On the host, in a separate terminal session, run the command to find the Grafana service name:

   ```console
   kubectl -n <NAMESPACE> get svc -l app.kubernetes.io/name=grafana
   ```

   Here `<NAMESPACE>` is the namespace where the addon is installed.

   The command output will show the Grafana service name in the format `<APP_NAME>-grafana`. If the app name was auto-generated when installed via the management console, the service name will look like `addon-<HASH>-grafana`, for example, `addon-c01ea19419-grafana`.

   {note:info}
   Service names for other addon components are also based on the app name. The exception is Prometheus and Alertmanager: their names are always `prometheus-prometheus` and `prometheus-alertmanager`. See {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring-additional)[text=the addon installation instructions]} for details.
   {/note}

1. Grant external access to Grafana via `port-forward` using the service name:

   ```console
   kubectl -n <NAMESPACE> port-forward service/<GRAFANA_SERVICE_NAME> 8001:80
   ```
1. In a browser, open the address: http://127.0.0.1:8001.

{/tab}

{/tabs}
