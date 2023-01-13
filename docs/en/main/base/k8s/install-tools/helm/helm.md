[Helm](https://helm.sh/docs/) is a popular package manager for Kubernetes that can be used as an add-on to `kubectl` to quickly install and update applications.

## Installation

1. [Make sure](../../connect/kubectl#checking-the-connection-to-the-cluster) that you can connect to the cluster using `kubectl` from the host on which you plan to install the Helm client.
1. Install the Helm client on the host in any of the ways described in the [official Helm documentation](https://helm.sh/docs/intro/install/).

   Choose the most current version of Helm that is compatible with the cluster in which you plan to use the client. See the Helm and Kubernetes version compatibility table in [official Helm documentation](https://helm.sh/docs/topics/version_skew/#supported-version-skew).

1. If necessary, add the path to the Helm executable file to the `PATH` environment variable if this was not done during installation.

1. Make sure that the correct version of Helm is installed by running the command:

   ```bash
   helm version
   ```

## Checking Helm operation

1. Install NGINX from the Bitnami repository:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm repo add bitnami https://charts.bitnami.com/bitnami; `
   helm repo update; `
   helm install demo-helm-nginx bitnami/nginx
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm repo update
   helm install demo-helm-nginx bitnami/nginx

   ```

   </tabpanel>
   </tabs>

1. Verify that the NGINX pod is working by running the command:

   ```bash
   kubectl get pods
   ```

   The output of the command should contain the `demo-helm-nginx-...` pod in the `Running` status.

   Example of the output:

   ```text
   NAME                               READY   STATUS    RESTARTS   AGE
   demo-helm-nginx-...                1/1     Running   0          ...
   ```

1. Uninstall NGINX installed with Helm and remove the Bitnami repository:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm uninstall demo-helm-nginx; `
   helm repo remove bitnami
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm uninstall demo-helm-nginx
   helm repo remove bitnami

   ```

   </tabpanel>
   </tabs>

## Deletion

1. Delete the Helm client executable file.

1. If necessary, remove Helm-related entries from the `PATH` environment variable.

1. If necessary, delete directories and files created by Helm:

   - Cache directory: corresponds to the `$XDG_CACHE_HOME` environment variable.
   - Configuration files directory: corresponds to the `$XDG_CONFIG_HOME` environment variable.
   - Data directory: corresponds to the `$XDG_DATA_HOME` environment variable.

   The directories corresponding to these variables for different operating systems are listed in [official Helm documentation](https://helm.sh/docs/faq/uninstalling/).
