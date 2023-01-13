Kubernetes Dashboard is a universal web interface for Kubernetes clusters. It allows users to manage both the cluster itself and the applications running in it. Read more in [official Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

## Preparatory steps

1. [Make sure](../kubectl#checking-the-connection-to-the-cluster) that you can connect to the cluster using `kubectl`.

1. Install `kauthproxy` if the utility is not already installed:

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
   1. Select the project and region where the desired cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Expand the menu of the desired cluster and select **Get Secret to enter Kubernetes Dashboard**.
   1. Click the **Copy** button.

      The secret will be copied to the clipboard.

1. In a separate terminal session, run the command:

   - For Kubernetes 1.22:

     ```bash.
     kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
     ```

   - For Kubernetes 1.21 and below:

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

1. In a separate terminal session, run the command:

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
