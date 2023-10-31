Kiali is a web interface for working with Istio. You can connect to Kiali if the appropriate [addon](../../concepts/addons-and-settings/addons#kiali_4a5be2e9) is installed in the cluster.

The way to connect to Kubernetes Dashboard depends on the IP address of the cluster:

- If an external IP address is assigned to the cluster, then you can connect from any host with Internet access.
- If the cluster is assigned only an internal IP address, then you can connect only from a host in VK Cloud — a virtual machine that is located in the same subnet as the cluster.

To connect to Kiali, a browser must be installed on the host.

## Preparatory steps

[Make sure](../kubectl#checking_the_connection_to_the_cluster) that you can connect to the cluster using `kubectl` from the host that is planned to be used to connect to Kiali.

1. On the same host install `kauthproxy` if the utility is not already installed:

   1. Download the archive of the correct version from [release page](https://github.com/int128/kauthproxy/releases):

      - for Linux: `kauthproxy_linux_....zip`;
      - for macOS: `kauthproxy_darwin....zip`;
      - For Windows: `kauthproxy_windows....zip`.

   1. Unpack the archive.

   1. Place the executable file in the directory contained in the `PATH` environment variable, for example:

      - in `/usr/local/bin` for Linux/macOS;
      - In `C:\` for Windows.

## Connecting to Kiali

1. [Make sure](../../operations/addons/manage-addons#viewing_addons) that the Kiali addon (`kiali`) [is installed](../../operations/addons/advanced-installation/install-advanced-kiali) in the cluster.

   <info>

   If a service name other than `kiali` or a namespace other than `istio-system` was selected when installing the addon, adjust the command below.

   </info>

1. On the host in a separate terminal session, run the command:

   ```bash
   kauthproxy -n istio-system https://kiali.svc
   ```

   <warn>

   Do not close this terminal session, or you will lose access to the Kiali web interface.

   </warn>

   The browser will open and you will be directed to the Kiali web interface.

Now you can work with Kiali. See [official documentation](https://kiali.io/docs/features/) for more information on working with Kiali.
