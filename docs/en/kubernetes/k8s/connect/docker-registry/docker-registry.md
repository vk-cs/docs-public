You can connect to the Docker registry if the appropriate [add-on](../../concepts/addons-and-settings/addons) is installed in the cluster.

When [installing](../../instructions/addons/advanced-installation/install-advanced-registry) an add-on, a standard load balancer with a floating IP address is created for it. Therefore, you can connect to the Docker registry from any host that has Internet access.

## Preparatory steps

1. [Make sure](../../instructions/addons/manage-addons#viewing_addons) that the Docker registry add-on (`docker-registry`) is installed in the cluster.
1. [Make sure](../kubectl#checking_connection_to_cluster) that you can connect to the cluster using `kubectl`.
1. [Get the data](../../instructions/addons/advanced-installation/install-advanced-registry#connecting_to_registry) to access the Docker registry.

## Connecting to the Docker Registry

On the host from which you plan to connect to the registry:

1. [Install Docker Engine](https://docs.docker.com/engine/install/) if not already installed. There is a choice of either Docker Desktop or a server-side version of Docker Engine without a GUI.

   Docker Engine must be installed on the host from which the registry will be used. Perform the next steps on that host.

1. Add the Docker registry to the list of trusted registries:

   1. Add the `insecure-registries` parameter with the address of the Docker registry endpoint to the Docker `daemon.json` configuration file.

      The address is specified in the format `<URL of Docker registry>:<Docker Registry port>`.

      ```json
      {
        ...

        { "insecure-registries": [
          "192.0.2.2:5000"
        ],

        ...
      }
      ```

      The location of this file for different Docker Engine installations is given in [official Docker documentation](https://docs.docker.com/config/daemon/#configure-the-docker-daemon).

   1. Restart the Docker Engine.

      <tabs>
      <tablist>
      <tab>Linux</tab>
      <tab>Windows</tab>
      <tab>macOS</tab>
      </tablist>
      <tabpanel>

      - For the server version of the Docker Engine, run one of the commands to restart:

        ```console
        sudo systemd restart docker
        ```

        ```console
        sudo service docker restart
        ```

      - For Docker Desktop, use [GUI](https://docs.docker.com/desktop/settings/linux/#docker-engine).

      </tabpanel>
      <tabpanel>

      Use [GUI](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      </tabpanel>
      <tabpanel>

      Use [GUI](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      </tabpanel>
      </tabs>

1. Sign in into the registry:

   ```console
   docker login <URL of Docker registry> --username <login for Docker registry>
   ```

   Enter the password for the Docker registry.

Now you can do any operations with the registry, for example, to push Docker images there.

Read more about registry operations in [official Docker documentation](https://docs.docker.com/desktop/).

## Using Docker registry in Kubernetes cluster

In order to deploy workloads in a cluster using images from the Docker registry:

1. Create the `k8s-registry-creds` secret which contains the data to access the registry:

   If the `--namespace` parameter is not provided, then the secret will be created in the default namespace (`default`).

   {note:warn}

   The secret must reside in the same namespace the workload is planned to be deployed in.

   {/note}

   <tabs>
   <tablist>
   <tab>Linux (bash) / macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```console
   kubectl create secret docker-registry k8s-registry-creds \ 
     --docker-server=<registry IP address>:5000 \
     --docker-username=<login> \
     --docker-password=<password> \
     --namespace=<namespace>
   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl create secret docker-registry k8s-registry-creds ` 
     --docker-server=<registry IP address>:5000 `
     --docker-username=<login> `
     --docker-password=<password> `
     --namespace=<namespace>
   ```

   </tabpanel>
   </tabs>

1. Specify in the workload manifest:

   - Name of the created secret in the `ìmagePullSecrets` parameter.

   - Path to the image from the registry in the `containers.image` parameter.

     The path should be specified in the `<registry IP address>:5000/<image directory>/<image name>:<tag>` format.

   Examples of manifests:

   <tabs>
   <tablist>
   <tab>Pod</tab>
   <tab>Deployment</tab>
   <tab>ReplicaSet</tab>
   <tab>StatefulSet</tab>
   <tab>DaemonSet</tab>
   <tab>Job</tab>
   <tab>CronJob</tab>
   </tablist>
   <tabpanel>

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: my-app
   spec:
     imagePullSecrets:
     - name: k8s-registry-creds
     containers:
     - name: my-app
       image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   ```

   </tabpanel>
   <tabpanel>

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   
   ```

   </tabpanel>
   <tabpanel>

   ```yaml
   apiVersion: apps/v1
   kind: ReplicaSet
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   ```

   </tabpanel>
   <tabpanel>

   ```yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   ```

   </tabpanel>
   <tabpanel>

   ```yaml
   apiVersion: apps/v1
   kind: DaemonSet
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   ```

   </tabpanel>
   <tabpanel>

   ```yaml
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   ```

   </tabpanel>
   <tabpanel>

   ```yaml
   apiVersion: batch/v1
   kind: CronJob
   metadata:
     name: my-app
   spec:
     jobTemplate:
       spec:
         template:
           spec:
             imagePullSecrets:
             - name: k8s-registry-creds
             containers:
             - name: my-app
               image: <registry IP address>:5000/<image directory>/<image name>:<tag>
   ```

   </tabpanel>
   </tabs>
