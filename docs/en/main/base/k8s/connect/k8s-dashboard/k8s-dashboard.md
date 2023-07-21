Kubernetes Dashboard is a universal web interface for Kubernetes clusters available into all VK Cloud clusters. It allows users to manage both the cluster itself and the applications running in it. Read more in [official Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

The way to connect to Kubernetes Dashboard depends on the IP address of the cluster:

- If an external IP address is assigned to the cluster, then you can connect from any host with Internet access.
- If the cluster is assigned only an internal IP address, then you can connect only from a host in VK Cloud — a virtual machine that is located in the same subnet as the cluster.

To connect to Kubernetes Dashboard, a browser must be installed on the host.

## Preparatory steps

1. [Make sure](../kubectl#checking-the-connection-to-the-cluster) that you can connect to the cluster using `kubectl`.

1. On the host from which you plan to connect to the cluster, install `kauthproxy` if the utility is not already installed:

   1. Download the archive of the correct version from [release page](https://github.com/int128/kauthproxy/releases):

      - for Linux: `kauthproxy_linux_....zip`;
      - for macOS: `kauthproxy_darwin....zip`;
      - For Windows: `kauthproxy_windows....zip`.

   1. Unpack the archive.

   1. Place the executable file in the directory contained in the `PATH` environment variable, for example:

      - in `/usr/local/bin` for Linux/macOS;
      - In `C:\` for Windows.

## Connect to cluster

<tabs>
<tablist>
<tab>Version of Kubernetes 1.22 and lower</tab>
<tab>Version of Kubernetes 1.23 and higher</tab>
</tablist>
<tabpanel>

1. Get the secret:

   1. Go to [personal account](https://mcs.mail.ru/app/) VK Cloud under the account of the user who will connect to the cluster.
   1. Select the project where the desired cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Expand the menu of the desired cluster and select **Get Secret to enter Kubernetes Dashboard**.
   1. Click the **Copy** button.

      The secret will be copied to the clipboard.

1. On the host in a separate terminal session, run the command:

     ```bash
     kauthproxy -n kube-system https://kubernetes-dashboard.svc
     ```

   <warn>

   Do not close this terminal session, otherwise you will lose access to the Kubernetes Dashboard web interface.

   </warn>

   The browser will open and you will be directed to the Kubernetes Dashboard login page.

1. Select the **Token** option and paste the previously copied secret.

1. Click the **Sign In** button.

   The Kubernetes Dashboard web interface will open.

</tabpanel>
<tabpanel>

1. On the host in a separate terminal session, run the command:

   ```bash
   kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```

   <warn>

   Do not close this terminal session, or you will lose access to the Kubernetes Dashboard web interface.

   </warn>

1. Enter the password for your personal VK Cloud account, if it is not present in the kubeconfig configuration file.

   `kauthproxy` will periodically ask for this password again.

   The browser will open and you will be directed to the Kubernetes Dashboard web interface.

</tabpanel>
</tabs>
