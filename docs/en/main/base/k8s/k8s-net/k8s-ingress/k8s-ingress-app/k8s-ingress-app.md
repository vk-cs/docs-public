In Kubernetes clusters, it is possible to organize access to services running over HTTP and HTTPS protocols using [Ingress](../k8s-ingress), which may be more profitable than using individual load balancers for individual services. Read more here.

To organize access to services using Ingress, you need:

1. Ingress controller.

   You can [create a Kubernetes cluster](../../k8s-clusters/create-k8s) with a pre-installed NGINX-based Ingress controller or add an Ingress controller to the cluster later.
   The controller integrates with VK Cloud, allowing you to provide access to your services using the same dedicated OpenStack load balancer.

1. The ability to manage the DNS zone for the domain that will be used by Ingress.
1. One or more deployed services running over HTTP or HTTPS.

Next, we will demonstrate how to configure user interaction with services via Ingress and Ingress Controller, which is installed together with the cluster.
The services from the example [Cafe from NGINX](https://github.com/nginxinc/kubernetes-ingress/tree/main/examples/complete-example) will be used. This example assumes:

1. Deployment of two maximally simple services: when accessed via HTTP, the `tea-svc` service returns the string `tea`, and the `coffee-svc` service returns `coffee`.
1. Issue a self-signed SSL certificate to demonstrate the ability to access services over HTTPS via Ingress.
1. Creating an Ingress resource that will be configured to perform traffic routing:
   1. To the domain `cafe.example.com` by its name (name-based routing): in this example, all traffic will fall on one domain.
   1. Inside the domain according to the specified paths (path-based routing): the path `/tea` will be served by the `tea-svc` service, and `/coffee` will be served by the `coffee-svc` service.
1. No need to configure DNS records for a real domain `example.com`: to test the operation of the example, `curl` will be used, which, when accessing the Ingress IP address, will provide the name of the desired domain in the HTTP header `Host`.

   <info>

   When using Ingress in a production environment, you will need to configure real DNS records for a real domain.

   </info>

For this:

1. [Follow the preparatory steps.](#prepare)
1. [Expand the necessary services.](#deploy-services)
1. [Deploy the Ingress resource.](#deploy-ingress)
1. [Check the operation of the services.](#check-operations)

## Preparation <a id="prepare"></a>

1. [Create a Kubernetes cluster](../../k8s-clusters/create-k8s).

   When creating a cluster:

   1. At step **Configuration**, make sure that an Ingress controller based on NGINX is selected in the list of pre-installed services.
   1. At step **Creating a cluster**, make sure that the "Assign external IP" option is enabled.

1. [Make sure you can connect to the cluster](../../k8s-start/connect-k8s) using `kubectl'.

1. Find out the IP address of the load balancer for the Ingress controller in one of the ways:

   1. After looking at it in the cluster properties in [VK CS panel](https://mcs.mail.ru/app/):

      1. Go to the "Containers" section.
      1. Click on the name of the desired cluster.

      The address will be specified in the "IP address of the load balancer for Ingress Controller" parameter.

   1. After watching it with `kubectl`:

      ```bash
      kubectl get svc ingress-nginx-controller -n ingress-nginx
      ```

      The address will be specified in the `EXTERNAL-IP` column.

1. On the host from which you are connecting to the cluster using `kubectl`:

   1. [Install git](https://git-scm.com/downloads), if it is not already installed.
   1. [Install curl](https://curl.se/download.html), if it is not already installed.
   1. Clone the NGINX Ingress Controller repository:

      ```bash
      git clone https://github.com/nginxinc/kubernetes-ingress.git
      ```

      <info>

      Next, it is assumed that the repository was cloned to the directory `~/kubernetes-ingress/`. If you have cloned to another directory, correct the commands below.

      </info>

## Deploying services <a id="deploy-services"></a>

1. Go to the repository directory with the Cafe example:

   ```bash
   cd ~/kubernetes-ingress/examples/complete-example/
   ```

1. Deploy the `tea-svc` and `coffee-svc` services, as well as related deployments, using the `cafe` configuration `file.yaml`:

   ```bash
   kubectl apply -f ./cafe.yaml
   ```

## Deploy Ingress resource <a id="deploy-ingress"></a>

1. Go to the repository directory with the Cafe example:

   ```bash
   cd ~/kubernetes-ingress/examples/complete-example/
   ```

1. Install a self-signed SSL certificate so that Ingress can serve users over HTTPS:

   ```bash
   kubectl apply -f ./cafe-secret.yaml
   ```

   For more information about installing SSL certificates for Ingress, see [here](k8s-cert).

   <warn>

   Do not use this SSL certificate from NGINX examples in the production environment, as the certificate information is publicly available!
   The security of a site protected by such a certificate will be at risk.

   Instead, issue separate SSL certificates for use in the production environment in any way convenient for you.

   </warn>

1. Create an Ingress resource that will route incoming traffic to previously deployed services:

   ```bash
   kubectl apply -f ./cafe-ingress.yaml
   ```

## Checking the operation of services <a id="check-operations"></a>

1. Make sure that the required services and deployments are created:

   ```bash
   kubectl get services,deployments
   ```

   The output should look like this:

   <!-- prettier-ignore -->
   ```text
    NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
    service/coffee-svc   ClusterIP   ...              <none>        80/TCP    27m
    service/tea-svc      ClusterIP   ...              <none>        80/TCP    27m

    NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/coffee   2/2     2            2           27m
    deployment.apps/tea      3/3     3            3           27m
    ```

1. Make sure that an Ingress resource has been created with the required configuration:

   ```bash
   kubectl describe ingress cafe-ingress
   ```

   The output should look like this:

   <!-- prettier-ignore -->
   ```text
    Name:             cafe-ingress
    Labels:           <none>
    Namespace:        default
    Address:          ...
    Ingress Class:    nginx
    Default backend:  <default>
    TLS:
      cafe-secret terminates cafe.example.com
    Rules:
      Host              Path  Backends
      ----              ----  --------
      cafe.example.com
                        /tea      tea-svc:80 (...:8080,...:8080,...:8080)
                        /coffee   coffee-svc:80 (...:8080,...:8080)
    Annotations:        <none>
    Events:
      Type    Reason  Age                From                      Message
      ----    ------  ----               ----                      -------
      Normal  Sync    31m (x2 over 32m)  nginx-ingress-controller  Scheduled for sync
    ```

1. Using `curl`, make sure that when accessing different URLs on the domain `cafe.example.com`, different services respond to you.

   This will mean that the Ingress controller is routing traffic according to the Ingress resource settings.

   To do this, run the command by specifying [Ingress Controller IP address](#prepare) instead of `NNN.NNN.NNN.NNN`:

   1. For the URL `/tea`:

      ```bash
      curl --insecure --resolve cafe.example.com:443:NNN.NNN.NNN.NNN https://cafe.example.com/tea
      ```

      The output should look like this:

      <!-- prettier-ignore -->
      ```text
        Server address: 10.100.82.216:8080
        Server name: tea-6fb46d899f-xvd6f
        Date: 12/Jul/2022:12:53:44 +0000
        URI: /tea
        Request ID: 7b03334b7b3100637aa7e68458c49acd
        ```

   1. For the URL `/coffee`:

      ```bash
      curl --insecure --resolve cafe.example.com:443:NNN.NNN.NNN.NNN https://cafe.example.com/coffee
      ```

      The output should look like this:

      <!-- prettier-ignore -->
      ```text
        Server address: 10.100.82.214:8080
        Server name: coffee-6f4b79b975-6rljv
        Date: 12/Jul/2022:12:55:56 +0000
        URI: /coffee
        Request ID: 5daa1cdb1d0772a2f502e288dec30a3f
        ```
