Some [addons](../../concepts/addons-and-settings/addons) that can be [installed](../../operations/addons/manage-addons) in the cluster have a web interface. The method of connecting to the web interface depends on the IP address of the cluster:

- If an external IP address is assigned to the cluster, then you can connect from any host with Internet access.
- If the cluster is assigned only an internal IP address, then you can connect only from a host in VK Cloud - a virtual machine that is located on the same subnet as the cluster.

A browser must be installed on the host to connect.

## Preparatory steps

1. On the host from which you plan to connect to the addon's web interface, [make sure](../kubectl#checking_the_connection_to_the_cluster) that you can connect to the cluster using `kubectl`.

1. Install `kauthproxy` on the same host if the utility is not already installed:

   1. Download the archive of the required version from the [releases page](https://github.com/int128/kauthproxy/releases):

      - for Linux: `kauthproxy_linux_....zip`;
      - for macOS: `kauthproxy_darwin_....zip`;
      - for Windows: `kauthproxy_windows_....zip`.

   1. Unpack the archive.

   1. Place the executable file in the directory that is contained in the environment variable `PATH`, for example:

      - at `/usr/local/bin` for Linux/macOS;
      - at `C:\` for Windows.

## Connecting to the addon's web interface

<tabs>
<tablist>
<tab>Kiali</tab>
<tab>Jaeger</tab>
</tablist>
<tabpanel>

Kiali is a web interface for working with Istio. To connect to it:

1. [Make sure](../../operations/addons/manage-addons#viewing_addons) that `kiali` addon [is installed](../../operations/addons/advanced-installation/install-advanced-kiali) to the cluster.
1. On the host, in a separate terminal session, run the command:

   ```bash
   kauthproxy -n istio-system https://kiali.svc
   ```

   If you selected a service name other than `kiali` or a namespace other than `istio-system` when adding the addon, adjust the command.

   A browser will open and you will be directed to the Kiali web interface. Learn more about working with Kiali in the [official documentation](https://kiali.io/docs/features/).

   <warn>

   Do not close this terminal session, otherwise access to the Kiali web interface will be lost.

   </warn>

</tabpanel>
<tabpanel>

1. [Make sure](../../operations/addons/manage-addons#viewing_addons) that `jaeger` addon [is installed](../../operations/addons/advanced-installation/install-advanced-jaeger) to the cluster.
1. On the host, in a separate terminal session, run the command:

   ```bash
   kauthproxy -n jaeger http://jaeger-query.svc
   ```

   If you selected a service name other than `jaeger` or a namespace other than `jaeger` when adding the addon, adjust the command.

   A browser will open and you will be directed to the Query UI web interface. The web interface is available only via HTTP.

   <warn>

   Do not close this terminal session, otherwise access to the web interface will be lost.

   </warn>

</tabpanel>
</tabs>
