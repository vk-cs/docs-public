Quickstart will help you get started with the service and become familiar with its features.

After going through all the steps of the quickstart, you will:

1. Create a small Kubernetes cluster.
1. Learn how to connect to it.
1. Become familiar with Kubernetes and [pre-configured cluster features](../concepts/preconfigured-features/addons/):
   1. Connect management and monitoring tools.
   1. Load the Docker images into the Docker registry.
   1. Deploy simple applications based on the downloaded images, with the ability to use VK Cloud storage.
   1. Provide access to the deployed applications using the Ingress controller.
   1. Make sure that these applications actually work.

<info>

A running Kubernetes cluster consumes computing resources.

After completing a quickstart, stop or delete the cluster if you no longer need it.

</info>

## 1. Preparatory steps

### 1.1. Create a cluster

1. Go to [personal account](https://mcs.mail.ru/app/) VK Cloud.
1. Select [project](../../../base/account/concepts/projects), where the cluster will be placed.
1. Select [region](../../../additionals/account/concepts/regions#manage-regions-in-your-account) `Moscow`.
1. Go to **Containers** → **Kubernetes clusters**.
1. If there are no clusters in the selected region yet, click **Create cluster**.

   Otherwise, click **Add**.

1. In the “Configuration” step:

   1. Select the cluster configuration **Dev environment** with the newest version of Kubernetes.

      <info>

      Note the version of Kubernetes selected. This is important for further installation of `kubectl`.

      </info>

   1. Select all services in the [pre-installed services](../concepts/preconfigured-features/addons) list:

      - **Monitoring**.
      - **Docker Registry**.
      - **NGINX Ingress Controller**.

   1. Click the **Next Step** button.

1. In the “Create cluster” step, set:

   1. **Cluster name:** for example, `vk-cloud-k8s-quickstart`.
   1. **Virtual machine type — Master:** `Standard-2-8`.
   1. **Availability zone:** `Moscow (MS1)`.

      <info>

      Configuration files for creating and configuring resources in the cluster are designed to use this zone.

      If you choose another zone, adjust configuration files.

      </info>

   1. **Network:** `Create new network`.
   1. **Assign external IP:** make sure this option is selected.
   1. Leave the other settings unchanged.
   1. Press the **Next step** button.

1. In the “Node group” step, set:

   1. **Node type:** `Standard-4-4`.
   1. **Availability zone:** `Moscow (MS1)`.

      <info>

      Configuration files for creating and configuring resources in the cluster are designed to use this zone.

      If you choose another zone, adjust configuration files.

      </info>

   1. Leave the other settings unchanged.
   1. Click the **Create cluster** button.

Wait for the cluster to complete, this process may take a while.

### 1.2. Configure the environment to work with the cluster from

Set up the host from which you will work with the cluster.
This can be a real computer or a virtual machine.

Install the following tools on the host:

- Browser.
- The [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) utility.

  <warn>

  Download a version of `kubectl` that matches the version of the cluster, or differs by one minor version in any direction.

  For example, for cluster version 1.23.6, `kubectl` versions 1.22, 1.23 and 1.24 are suitable.

  See [Connecting to a cluster with kubectl](../connect/kubectl/) for details.

  </warn>

- The [kauthproxy] utility (https://github.com/int128/kauthproxy/releases). See [Connecting to the cluster with Kubernetes Dashboard](../connect/k8s-dashboard) for details.
- The `client-keystone-auth` utility. See [Connecting to the cluster with kubectl](../connect/kubectl) for details.
- The [curl](https://curl.se/download.html) utility.
- [Docker Engine](https://docs.docker.com/engine/install/):
  - For Windows and macOS: Docker Desktop.
  - For Linux, Docker Desktop is also recommended, but you can install and use Docker from the command line.

### 1.3. Collect information about the cluster

Collect the following information from the [cluster information page](../operations/manage-cluster#get-cluster-information):

- IP address of the load balancer for the Ingress controller.
- Data to access the Docker registry:
  
  1. Select the **Access Docker Registry** tab
  1. Copy the `URL`, `username` and `password` values.

In the commands and configuration files for the example, the following values will be used:

| Parameter                                                   | Value                      |
| ----------------------------------------------------------- | -------------------------- |
| IP address of the load balancer<br>for the Ingress Controller | `192.0.2.2`                |
| Docker registry endpoint URL                                  | `192.0.2.22:5000`          |
| Docker registry username                                      | `registry`                 |
| Docker registry password                                      | `registry-password-123456` |

<warn>

In the next steps, replace these values with those relevant to your cluster.

</warn>

### 1.4. Connect to the cluster

1. Add the **Administrator Kubernetes** role in personal account for the user on whose behalf the connection to the cluster will be performed:

   1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/).
   1. Select the project and region where the previously created cluster is located.
   1. Go to **Manage access**.
   1. Expand the menu of the desired user and select **Edit**.
   1. Select the **Kubernetes Administrator** role from the drop-down list.
   1. Save your changes.

1. Get kubeconfig for the cluster in [VK Cloud personal account](https://mcs.mail.ru/app/):

   1. Go to **Containers → Kubernetes Clusters**.
   1. Find the desired cluster in the list, then select **Get Kubeconfig to access the cluster** in its menu.

1. Move kubeconfig to the `~/.kube` directory, so you don't have to specify additional arguments when using `kubectl`.

   The commands below assume that kubeconfig has been downloaded into the `~/Downloads` directory under the name `mycluster_kubeconfig.yaml`.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   mkdir ~/.kube && \
   mv ~/Downloads/mycluster_kubeconfig.yaml ~/.kube/config
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   mkdir ~/.kube; `
   mv ~/Downloads/mycluster_kubeconfig.yaml ~/.kube/config
   ```

   </tabpanel>
   </tabs>

1. Check that `kubectl` can connect to the cluster:

   1. Run the command:

      ```bash
      kubectl cluster-info
      ```

   1. Enter the user password from your VK Cloud account.

   If the cluster works properly and `kubectl` is configured to work with it, similar information will be displayed:

   ```text
   Kubernetes control plane is running at...
   CoreDNS is running at...

   To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
   ```

## 2. Enable cluster monitoring tools

When creating a Kubernetes cluster in VK Cloud, [monitoring tools](../monitoring) based on Prometheus and Grafana have been enabled. Also [Kubernetes Dashboard](../connect/k8s-dashboard/) is available for all Kubernetes VK Cloud clusters, which allows you to not only manage the cluster, but also monitor it.

<tabs>
<tablist>
<tab>Prometheus + Grafana</tab>
<tab>Kubernetes Dashboard</tab>
</tablist>
<tabpanel>

1. In a separate terminal session, run the command:

   ```
   kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
   ```

   <warn>

   - Do not close this session, or you will lose access to the Grafana web interface.
   - If port `8001` is already in use by another application, adjust the command by specifying a free port.

   </warn>

1. Open the Grafana web interface:

   1. In your browser, go to the URL `http://127.0.0.1:8001/`.
   1. Authorize with the login/password pair `admin`/`admin`.
   1. For security reasons, change the password.

1. Select **Dashboards → Browse** from the side menu of any pre-configured dashboard to get information about the cluster resources.

</tabpanel>
<tabpanel>

1. In a separate terminal session, run the command:

   ```bash
   kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```

   <warn>

   Do not close this session, or you will lose access to the Kubernetes Dashboard web interface.

   </warn>

1. Enter the user password from your VK Cloud account, if a password is requested.

The browser will be opened and you will be redirected to the Kubernetes Dashboard web interface. Next, select any available category to view information about the cluster resources.

</tabpanel>
</tabs>

## 3. Load the required images into the Docker registry

When creating the Kubernetes cluster in VK Cloud, [Docker registry](../connect/docker-registry/) was included, which will store the Docker images.

<info>

To best demonstrate the capabilities of the cluster, a special Docker image with the NGINX web server will be built next.
The image is based on the [plaintext demo image](https://github.com/nginxinc/NGINX-Demos/tree/master/nginx-hello-nonroot) from NGINX.

</info>

To put your own images in the Docker cluster registry:

1. Add the Docker registry to the list of trusted registries:

   1. Add the following parameter to the Docker `daemon.json` configuration file with the URL of the Docker registry endpoint:

      ```json
      {
        ...

        "insecure-registries": [
          "192.0.2.22:5000"
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

      Do one of the following:

      - Run one of the commands to perform restart:

        ```bash
        sudo systemd restart docker
        ```

        ```bash
        sudo service docker restart
        ```

      - [Restart the Docker Engine](https://docs.docker.com/desktop/settings/linux/#docker-engine) from the Docker Desktop GUI (if installed).

      </tabpanel>
      <tabpanel>

      [Restart the Docker Engine](https://docs.docker.com/desktop/settings/windows/#docker-engine) from the Docker Desktop GUI.

      </tabpanel>
      <tabpanel>

      [Restart the Docker Engine](https://docs.docker.com/desktop/settings/mac/#docker-engine) from the Docker Desktop GUI.

      </tabpanel>
      </tabs>

1. Build a Docker image:

   1. Create a directory for the files and navigate to it:

      <tabs>
      <tablist>
      <tab>Linux/macOS</tab>
      <tab>Windows</tab>
      </tablist>
      <tabpanel>

      ```bash
      mkdir ~/image-build && cd ~/image-build
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      mkdir ~/image-build; cd ~/image-build
      ```

      </tabpanel>
      </tabs>

   1. Place the following files in this directory:

      <details>
      <summary markdown="span">Dockerfile</summary>

      ```ini
      FROM nginx:mainline-alpine

      RUN chmod -R a+w /var/cache/nginx/ \
              && touch /var/run/nginx.pid \
              && chmod a+w /var/run/nginx.pid \
              && rm /etc/nginx/conf.d/*

      COPY nginx-config.conf /etc/nginx/conf.d/
      USER nginx
      ```

      </details>

      <details>
      <summary markdown="span">nginx-config.conf</summary>

      ```ini
      server {
          listen 8080;

          location / {

              set $k8s_pv "not present";

              if (-d /etc/nginx/k8s_demo_pv/) {
                set $k8s_pv "present";
              }

              default_type text/plain;
              expires -1;
              return 200 'Server address: $server_addr:$server_port\nServer name: $hostname\nDate: $time_local\nURI: $request_uri\nRequest ID: $request_id\nRemote address (NGINX Ingress Controller): $remote_addr\nX-Forwarded-For (Request source): $http_x_forwarded_for\n\nK8S Persistent Volume status: $k8s_pv\n';
          }
      }
      ```

      </details>

   1. Run the build process:

      ```bash
      docker build . -t 192.0.2.22:5000/vk-cloud-demo/nginx-k8s-demo:latest
      ```

   Wait until the image build is complete.

1. Place the built image in the Docker registry:

   1. Log in to the registry:

      ```bash
      docker login 192.0.2.22:5000 --username registry --password registry-password-123456
      ```

   1. Push the image to the registry:

      ```bash
      docker push 192.0.2.22:5000/vk-cloud-demo/nginx-k8s-demo:latest
      ```

   1. Check that the image is in the registry:

      ```bash
      curl -k -X GET -u registry:registry-password-123456 https://192.0.2.22:5000/v2/_catalog
      ```

      Output should give you the similar information:

      ```text
      {"repositories":["vk-cloud-demo/nginx-k8s-demo"]}
      ```

   1. Create a Kubernetes secret so you can access the uploaded image from Kubernetes:

      ```bash
      kubectl create secret docker-registry k8s-registry-creds --docker-server=192.0.2.22:5000 --docker-username=registry --docker-password=registry-password-123456
      ```

## 4. Deploy demo applications

Based on the `vk-cloud-demo/nginx-k8s-demo` image loaded in the Docker registry, two applications will be deployed: `tea` and `coffee`.
For each of the applications the following will be created:

- [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), so that data volumes can be mounted inside the application.
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), in which will be set:
  - Number of replicas.
  - Volume to mount in pod.
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/) to provide access to the application. The Ingress controller will forward incoming requests to this Service.

To deploy the applications:

1. Create a directory for the files and navigate to it:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   mkdir ~/k8s-deployments && cd ~/k8s-deployments
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   mkdir ~/k8s-deployments; cd ~/k8s-deployments
   ```

   </tabpanel>
   </tabs>

1. Place the following files in this directory:

   <details>
   <summary markdown="span">deploy-coffee.yaml</summary>

   ```yaml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-coffee
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         volumes:
           - name: k8s-pv-coffee
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-coffee
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: coffee
             image: 192.0.2.22:5000/vk-cloud-demo/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-coffee
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```

   </details>

   <details>
   <summary markdown="span">deploy-tea.yaml</summary>

   ```yaml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-tea
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: k8s-pv-tea
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-tea
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: tea
             image: 192.0.2.22:5000/vk-cloud-demo/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-tea
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   </details>

   <warn>

   Note that the configuration files `deploy-coffee.yaml` and `deploy-tea.yaml` for Persistent Volume Claim specify the storage class corresponding to the availability zone of the node (MS1) on which you plan to deploy applications.

   Attempting to place an application on a node in one availability zone to which a volume from another availability zone is mounted will fail.

   </warn>

1. Deploy the applications:

   ```bash
   kubectl apply -f deploy-coffee.yaml -f deploy-tea.yaml
   ```

1. Check if the deployment is correct for:

   <tabs>
   <tablist>
   <tab>Persistent volumes</tab>
   <tab>Workloads</tab>
   <tab>Services</tab>
   </tablist>
   <tabpanel>

   Use one of the ways:

   - `kubectl`: run the command.

     ```bash
     kubectl get pv
     ```

   - Grafana: open the **Kubernetes → Compute Resources → Persistent Volumes** dashboard.

   - Kubernetes Dashboard: open the **Cluster → Persistent Volumes** dashboard.

   You will see information that 1GB persistent volumes, that have been created with Persistent Volume Claim for deployments `tea` and `coffee`, are present.

   </tabpanel>
   <tabpanel>

   Use one of the ways:

   - `kubectl`: run the command.

     ```bash
     kubectl get deployment
     ```

   - Grafana: open the **Kubernetes → Compute Resources → Namespace (Workloads)** dashboard.

   - Kubernetes Dashboard: open the **Workloads → Deployments** dashboard.

   You will see that there is a deployment `coffee` of three pods, and a deployment `tea` of two pods.

   </tabpanel>
   <tabpanel>

   Use one of the ways:

   - `kubectl`: run the command.

     ```bash
     kubectl get svc
     ```

   - Kubernetes Dashboard: open the **Service → Services** dashboard.

   You will see that there are two services `coffee-svc` and `tea-svc` of type `ClusterIP`.

   </tabpanel>
   </tabs>

## 5. Configure Ingress for demo applications

When creating the Kubernetes cluster in VK Cloud, [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) NGINX was enabled to route incoming user requests to the applications deployed in the cluster.

For Ingress controller to route requests to the corresponding Service resources, through which the `tea` and `coffee` demo applications were published, do the following:

1. Place the following file in the `~/k8s-deployments` directory:

   <details>
   <summary markdown="span">deploy-ingress.yaml</summary>

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     rules:
       - host: cafe.example.com
         http:
           paths:
             - path: /tea
               pathType: Prefix
               backend:
                 service:
                   name: tea-svc
                   port:
                     number: 80
             - path: /coffee
               pathType: Prefix
               backend:
                 service:
                   name: coffee-svc
                   port:
                     number: 80
   ```

   <details>

1. Deploy the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource:

   ```bash
   kubectl apply -f deploy-ingress.yaml
   ```

1. Check if the deployment is correct by running the following `kubectl` command:

   ```bash
   kubectl get ingress
   ```

   You will see information that there is a working Ingress resource.

## 6. Check that all the created resources in the cluster are working

To verify that the example is working, run `curl` requests to the IP address `192.0.2.2` of the load balancer. The Ingress controller associated with the load balancer will then deliver these requests to the appropriate applications.

Requests for:

<tabs>
<tablist>
<tab>The tea application</tab>
<tab>The coffee application</tab>
</tablist>
<tabpanel>

```bash
curl --resolve cafe.example.com:80:192.0.2.2 http://cafe.example.com/tea
```

Output should give you the similar information:

```text
Server address: 10.100.109.3:8080
Server name: tea-8697dc7b86-s5vgn
Date: 24/Aug/2022:09:27:34 +0000
URI: /tea
Request ID: ed83bd555afd25c103bfa05ee12cbfff
Remote address (NGINX Ingress Controller): <IP address of Ingress controller>
X-Forwarded-For (Request source): <IP address of host that sourced the request>

K8S Persistent Volume status: present
```

</tabpanel>
<tabpanel>

```bash
curl --resolve cafe.example.com:80:192.0.2.2 http://cafe.example.com/coffee
```

IP address

```text
Server address: 10.100.109.0:8080
Server name: coffee-5f48899848-4q97z
Date: 24/Aug/2022:09:35:57 +0000
URI: /coffee
Request ID: 35e93a2538be8843c1c1fcd65b5aac4c
Remote address (NGINX Ingress Controller): <IP address of Ingress controller>
X-Forwarded-For (Request source): <IP address of host that sourced the request>

K8S Persistent Volume status: present
```

</tabpanel>
</tabs>

This result demonstrates that:

1. You can run applications using Docker images from the Docker cluster registry.
1. You can mount VK Cloud storage to pods using Persistent Volume Claim.
1. The Ingress controller provided with the cluster is configured correctly because it shows the real IP address of the request source.

## Control the usage of resources

A running cluster consumes computing resources. If you no longer need it:

- [stop](../operations/manage-cluster#start-or-stop-the-cluster) it to use it later;
- [delete](../operations/manage-cluster#delete-cluster) it permanently.

## What's next?

- [Get to know the usage scenarios](../use-cases/) of the cluster.
- [Get to know the concepts](../concepts/) of the container service.
- [Get to know the detailed instructions](../connect) on how to connect to the cluster.
