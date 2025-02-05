[ExternalDNS](https://github.com/kubernetes-sigs/external-dns) allows you to automate DNS record management when working with the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) or [Service](https://kubernetes.io/docs/concepts/services-networking/service/) resources. If these resources are configured according to ExternalDNS requirements, they will be accessible by their domain names as soon as they are created.

ExternalDNS integrates with the [VK Cloud DNS service](/en/networks/dns/publicdns) via a plugin. Below is an example of installing ExternalDNS to a cluster and using this tool with the `Ingress` and `Service` resources.

## Preparatory steps

1. [Create](/en/networks/dns/publicdns#setting_up_a_role_model) a DNS zone for ExternalDNS to work with, if not already done.

   In the example below, the `example.com` zone is used.

1. [Create](https://cloud.vk.com/docs/en/kubernetes/k8s/service-management/create-cluster) a Cloud Containers cluster of the latest version that has an external IP address and is accessible from the Internet.

   Select other cluster parameters at your discretion.

1. [Make sure](../../connect/kubectl) that you can connect to the cluster using `kubectl`.

   To connect, use the cluster configuration file (kubeconfig) downloaded from your VK Cloud management console.

1. [Install](../../install-tools/helm) Helm version 3.0.0 or higher if the utility is not already installed.

   To install, select a version of Helm that is [compatible](https://helm.sh/docs/topics/version_skew/) with the cluster.

1. Set an environment variable that points to kubeconfig for the cluster. This will make it easier to work with the `kubectl` and `helm` utilities when installing ExternalDNS.

   The path to your kubeconfig file may differ from the example below.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $Env:KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   </tabs>

## 1. Prepare a user for ExternalDNS

ExternalDNS will use this VK Cloud user's credentials to cooperate with the VK Cloud API and manage DNS resource records.

Prepare the user and get all the necessary credentials:

1. [Select](/tools-for-using-services/account/service-management/project-settings/access-manage#viewing_project_members) an existing user or [invite a new user to the project](/en/tools-for-using-services/account/service-management/project-settings/access-manage#inviting_a_new_member_to_the_project).

   User Requirements:

   - API access must be [enabled](/en/tools-for-using-services/api/rest-api/enable-api).
   - One of the following roles must be [assigned](/en/tools-for-using-services/account/service-management/project-settings/access-manage#changing_member_role) in order for ExternalDNS to operate resource records within the DNS zone:

     - Network Administrator (a minimum required [role](/en/tools-for-using-services/account/concepts/rolesandpermissions#roles_permissions)).
     - Project Administrator.
     - Superadministrator.
     - Project Owner.

     <info>

     To work with ExternalDNS, it is recommended to assign a dedicated user with the Network administrator role. This will minimize possible damage if an attacker gains access to this user's credentials.

     </info>

1. Get the credentials you need to access the VK Cloud API:

   1. [Go](https://msk.cloud.vk.com/app/en) to your VK Cloud management console using the credentials of the user assigned to ExternalDNS.
   1. Click the username in the page header and select **Project Settings**.
   1. Go to the **API access** tab and note the values of the following parameters:

      - Project ID (Project ID for OpenStack);
      - User Domain Name;
      - Username;
      - Region Name;
      - Auth URL (Authentication URL).

1. Write down the password for this user: it is also required to access the API.

## 2. Install ExternalDNS

1. Create a namespace where ExternalDNS will be installed:

   ```bash
   kubectl create ns external-dns
   ```

1. In this namespace, create a secret that contains the VK Cloud API access credentials [obtained during user preparation](#1_prepare_a_user_for_externaldns):

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl -n external-dns create secret generic vkcs-auth \
     --from-literal=ProjectID="<Project ID>" \
     --from-literal=UserDomainName="<User Domain Name>" \
     --from-literal=Username="<Username>" \
     --from-literal=RegionName="<Region Name>" \
     --from-literal=AuthURL="<Auth URL>" \
     --from-literal=Password="<User Password>"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl -n external-dns create secret generic vkcs-auth `
     --from-literal=ProjectID="<Project ID>" `
     --from-literal=UserDomainName="<User Domain Name>" `
     --from-literal=Username="<Username>" `
     --from-literal=RegionName="<Region Name>" `
     --from-literal=AuthURL="<Auth URL>" `
     --from-literal=Password="<User Password>"
   ```

   </tabpanel>
   </tabs>

1. Add the Bitnami Helm repository:

   ```bash
   helm repo add bitnami https://charts.bitnami.com/bitnami
   ```

1. Create a file that contains the [values](https://helm.sh/docs/chart_template_guide/values_files/) needed to install ExternalDNS with Helm:

   <details>
   <summary>external-dns-vkcs-values.yaml</summary>

   ```yaml
   policy: upsert-only
   txtPrefix: externaldns-

   provider: webhook

   extraArgs:
     webhook-provider-url: http://localhost:8888

   sidecars:
     - name: vkcs-plugin
       image: registry.infra.mail.ru:5010/external-dns-vkcs-plugin:latest
       imagePullPolicy: Always
       ports:
         - name: http
           containerPort: 8888
       livenessProbe:
         httpGet:
           path: /healthz
           port: http
         initialDelaySeconds: 10
         timeoutSeconds: 5
       readinessProbe:
         httpGet:
           path: /healthz
           port: http
         initialDelaySeconds: 10
         timeoutSeconds: 5
       env:
         - name: OS_AUTH_URL
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: AuthURL
         - name: OS_USERNAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: Username
         - name: OS_PASSWORD
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: Password
         - name: OS_PROJECT_ID
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: ProjectID
         - name: OS_DOMAIN_NAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: UserDomainName
         - name: OS_REGION_NAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: RegionName
         - name: SERVER_HOST
           value: "0.0.0.0"
         - name: SERVER_PORT
           value: "8888"
   ```

   </details>

   The behavior of the ExternalDNS Helm chart is influenced by many values. The created file contains a minimum set of values that is sufficient to start working with ExternalDNS. The most important values affecting the behavior of ExternalDNS with the VK Cloud DNS are described below. Descriptions of values that do not apply to the VK Cloud plugin (all values except `sidecars[]`) are given in [README.md](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns#values) for the chart.

   <warn>

   Do not change or delete the required values listed below. This may cause ExternalDNS to work incorrectly.

   </warn>

   <details>
   <summary>Description of important values that affect the behavior of ExternalDNS</summary>

   - (**Required value**) `provider`: the `webhook` value indicates that an external plugin with webhooks support is required to work with DNS.

   - (**Required value**) `extraArgs:webhook-provider-url`: the URL to be used to interact with the plugin.

   - `policy`: the resource record synchronization policy. The default policy is `upsert-only`: ExternalDNS will only add resource records, not delete them.

     If you want ExternalDNS to remove resource records when deleting Kubernetes resources for which the records were created, use the `sync` policy.

   - `txtPrefix`: prefix for TXT records that are created by ExternalDNS.

     ExternalDNS can automatically add both A records and CNAME records for Kubernetes resources.

     ExternalDNS keeps track of which DNS zone resource records it manages by placing service information in TXT records. In particular, with the default settings, it will create a service TXT record with the same name as the record being added: for example, for the A record `example.com`, a corresponding TXT record with the same name `example.com` will be created.

     However, according to [RFC 1912](https://www.rfc-editor.org/rfc/rfc1912), CNAME records cannot coexist with other records with the same name. That is why ExternalDNS is configured to prefix the name of TXT records with the value specified in `txtPrefix`. This allows you to avoid possible collisions when working with CNAME records: for example, for the CNAME record `example.com` a corresponding TXT record with the name `externaldns-example.com` will be created.

     You can specify a prefix different from `externaldns-`, if necessary.

   </details>

   The plugin for ExternalDNS, which provides its integration with the VK Cloud DNS, has many settings that affect the plugin's behavior. The settings are set using environment variables in `sidecars[].env`. In the created file, only the required settings are set. If necessary, you can specify additional settings for the plugin by adding the appropriate environment variables.

   <warn>

   Do not modify or delete the required plugin settings listed below. This may cause ExternalDNS to work incorrectly.

   </warn>

   <details>
   <summary> Description of values that affect plugin behavior</summary>

   - (**Required settings**) The settings corresponding to the variables with the `OS_` prefix are used to authenticate the plugin when interacting with the VK Cloud API.

     The values of these variables are stored in the Kubernetes secret that was created earlier.

   - (**Required settings**) The settings corresponding to the `SERVER_HOST` and `SERVER_PORT` variables have fixed values and are necessary for the plugin to work correctly.

   - DNS zone filtering settings:

     - Filters for DNS zones in which resource records are allowed to be created:

       - `DOMAIN_FILTERS`: a string with a list of domain names separated by commas. For example, `example.com,contoso.com`.
       - `REGEX_DOMAIN_FILTER`: a string with a regular expression ([RE2 syntax](https://github.com/google/re2/wiki/Syntax)). For example, `.*.com$`.

       If both filters are configured, the `REGEX_DOMAIN_FILTER` filter takes precedence over `DOMAIN_FILTERS`. By default, no filtering is performed.

     - Filters for DNS zones in which resource records are not allowed to be created:

       - `EXCLUDE_DOMAINS`: a string with a list of domain names separated by commas. For example, `example.org,foo.bar.com`.
       - `REGEX_DOMAIN_FILTER_EXCLUSION`: a string with a regular expression ([RE2 syntax](https://github.com/google/re2/wiki/Syntax)). For example, `^stage-.*.com$`.

       If both filters are configured, the `REGEX_DOMAIN_FILTER_EXCLUSION` filter takes precedence over `EXCLUDE_DOMAINS`. By default, no filtering is performed.

     - `SERVER_READ_TIMEOUT`: timeout for reading when the connection to the server is open (in seconds). Default value: `30`.
     - `SERVER_WRITE_TIMEOUT`: timeout for writing when the connection to the server is open (in seconds). Default value: `30`.

     - `LOG_LEVEL`: level of logging of events that occur during plugin operation.

       The `error`, `warn`, `info`, `debug`, and `trace` levels are supported. Default value: `info`.

     - `DRY_RUN`: flag that allows the plugin to be run in "dry run" mode.

       - `false` (default): "dry run" mode is **disabled**. The plugin runs and manipulates resource records in the DNS zone as configured.
       - `true`: "dry run" mode is **enabled**. The plugin runs but does not manipulate resource records in the DNS zone: no resource records will be created or deleted.

   </details>

1. Install ExternalDNS:

   ```bash
   helm -n external-dns install external-dns-vkcs bitnami/external-dns -f external-dns-vkcs-values.yaml
   ```

1. Verify that the Helm chart has been successfully deployed:

   ```bash
   helm -n external-dns list && kubectl -n external-dns get all
   ```

   <details>
   <summary>Example of partial output of the command</summary>

   ```text
   NAME                    NAMESPACE       ...        ...   STATUS          CHART                 ...
   external-dns-vkcs       external-dns    ...        ...   deployed        external-dns-6.32.1   ...

   NAME                                     READY   STATUS    RESTARTS   AGE
   pod/external-dns-vkcs-NNNNNNNNNN-MMMMM   2/2     Running   0          ...

   NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
   service/external-dns-vkcs   ClusterIP   10.254.169.195   <none>        7979/TCP   ...

   NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
   deployment.apps/external-dns-vkcs   1/1     1            1           87s

   NAME                                           DESIRED   CURRENT   READY   AGE
   replicaset.apps/external-dns-vkcs-NNNNNNNNNN   1         1         1       ...
   ```

   </details>

## 3. Verify that External DNS is working

Next, several demo applications based on [NGINX's Cafe example](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) will be deployed. These applications will be published (made available from the Internet) using `Service` and `Ingress` configured to work with ExternalDNS.

### 3.1. Publish the application using a service like LoadBalancer

1. Create a manifest for the `tea` application:

   <details>
   <summary>tea-app.yaml</summary>

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
     labels:
       app: tea
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         containers:
         - name: tea
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   </details>

1. Apply this manifest to the cluster to deploy the application:

   ```bash
   kubectl apply -f tea-app.yaml
   ```

1. Verify that the application has been successfully deployed as a `ReplicaSet` of three replicas:

   ```bash
   kubectl get rs,pod -l app==tea
   ```

   <details>
   <summary>Example of partial output of the command</summary>

   ```text
   NAME                           DESIRED   CURRENT   READY   AGE
   replicaset.apps/tea-XXXXXXXXX  3         3         3       ...

   NAME                      READY   STATUS    RESTARTS   AGE
   pod/tea-XXXXXXXXX-AAAAA   1/1     Running   0          ...
   pod/tea-XXXXXXXXX-BBBBB   1/1     Running   0          ...
   pod/tea-XXXXXXXXX-CCCCC   1/1     Running   0          ...
   ```

   </details>

1. Create a `tea-service.yaml` manifest for the Kubernetes service (`Service`).

   This service will be used to publish the deployed application. The application will be accessible by the domain name `tea.example.com`.

   To have ExternalDNS create resource records for the service:

   - The `external-dns.alpha.kubernetes.io/hostname` annotation must be set for the service.
   - The service must have the [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) type.

   Specify the `external-dns.alpha.kubernetes.io/ttl` annotation if you want to set a non-standard TTL for resource records (default: 86400 seconds, 24 hours).

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     annotations:
       external-dns.alpha.kubernetes.io/hostname: "tea.example.com"
       external-dns.alpha.kubernetes.io/ttl: "3600"
     name: tea-svc
     labels:
       app: tea
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: tea
   ```

   Here:

   - The required `external-dns.alpha.kubernetes.io/hostname` annotation is specified: the domain name to use for the service.
   - The optional `external-dns.alpha.kubernetes.io/ttl` annotation is specified: TTL in seconds for the resource record to be created by ExternalDNS.

   - The `LoadBalancer` service type is selected. A [standard load balancer](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created for such a service. Since the load balancer is created with a public IP address, the application associated with the service will be accessible from the Internet.

     <warn>

     Using the load balancer is [charged](/en/networks/vnet/tariffication).

     </warn>

1. Apply this manifest to the cluster to create the service:

   ```bash
   kubectl apply -f tea-service.yaml
   ```

1. Check the status of the service:

   ```bash
   kubectl get svc tea-svc
   ```

   Wait until the service is assigned the public IP address of the load balancer. Creating the load balancer can take a long time.

   <details>
    <summary>Example of partial output of the command</summary>

   - The balancer creation is in progress:

     ```text
     NAME      TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)        AGE
     tea-svc   LoadBalancer   10.254.170.195   <pending>      80:32314/TCP   ...
     ```

   - The balancer has been successfully created:

     ```text
     NAME      TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)        AGE
     tea-svc   LoadBalancer   10.254.170.195   203.0.113.111      80:32314/TCP   ...
     ```

   </details>

1. Verify that ExternalDNS has created the necessary resource records:

   1. [Get a list of resource records](/en/networks/dns/publicdns#viewing_a_list_of_dns_zones) for the `example.com` zone.
   1. Find the entries created by ExternalDNS in the list:

      - One A record `tea.example.com`.
      - Two TXT records `externaldns-tea.example.com` and `externaldns-a-tea.example.com`.

        These TXT records are service records used by ExternalDNS to track the status of the `tea-svc` A record created for the `tea-svc` service.

        <info>

        Such records are easily distinguished by the `externaldns-` prefix in their name. Their values have the standard structure of the form `heritage=.../owner=.../resource=...`.

        If you specified a different prefix value when [installing ExternalDNS](#2_install_externaldns), the names of the service TXT records will be different.

        </info>

      If the required resource records are not present, wait a few more minutes. ExternalDNS will start creating resource records after the service has been assigned an IP address. This will take some time.

1. Check that the application is accessible by domain name. To do this, go to `http://tea.example.com` in your browser.

   You should see a page with a response from the application like this:

   ```text
   Server address: 10.100.184.219:8080
   Server name: tea-XXXXXXXXX-AAAAA
   Date: 09/Feb/2024:10:09:51 +0000
   URI: /
   Request ID: <unique request identifier>
   ```

   Successful interaction with the application at this address indicates that ExternalDNS works correctly with a service like `LoadBalancer`.

### 3.2. Publish the application using Ingress

1. [Install](/en/kubernetes/k8s/service-management/addons/advanced-installation/install-advanced-ingress) the Ingress NGINX add-on of the latest version to the cluster.

   Perform a **standard installation**. Do not change any parameters, only edit the add-on configuration code:

   1. Make sure that the `service.beta.kubernetes.io/openstack-internal-load-balancer` annotation is set to `false`:

      ```yaml
      controller:
        ...
        service:
          annotations: {"loadbalancer.openstack.org/proxy-protocol": "true", "service.beta.kubernetes.io/openstack-internal-load-balancer": "false"}
          ...
      ```

      This is necessary to create a load balancer with a public IP address for the Ingress controller. Then the application using Ingress will be accessible from the Internet.

   1. Set the `controller.publishService.enabled` field to `true`:

      ```yaml
      controller:
        ...
        publishService:
          enabled: true
          pathOverride: ""
          ...
      ```

      This is necessary to assign a public IP address of the Ingress controller to the Ingress resource. This will allow ExternalDNS to create the correct resource records for Ingress.

   Wait for the add-on installation to complete. This process may take a long time.

1. Create a manifest for the `coffee` application:

   <details>
   <summary>coffee-app.yaml</summary>

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
     labels:
       app: coffee
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         containers:
         - name: coffee
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   </details>

1. Create a manifest for the Kubernetes service that the application will use.

   <details>
   <summary>coffee-service.yaml</summary>

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
     labels:
      app: coffee
   spec:
     type: ClusterIP
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

   </details>

   Here, the service type is set to [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip), which is sufficient since the application will be published using Ingress. Such a service is accessible only from within the cluster and does not have a dedicated load balancer, unlike the service [created earlier](#31_publish_the_application_using_a_service_like_loadbalancer_8907e782).

1. Apply these manifests to the cluster to create all necessary resources:

   ```bash
   kubectl apply -f coffee-app.yaml -f coffee-service.yaml
   ```

1. Check that the application has been successfully deployed as a `ReplicaSet` of two replicas along with the corresponding service:

   ```bash
   kubectl get rs,pod,svc -l app==coffee
   ```

   <details>
   <summary>Example of partial output of the command</summary>

   ```text
   NAME                                DESIRED   CURRENT   READY   AGE
   replicaset.apps/coffee-YYYYYYYYY    2         2         2       ...

   NAME                         READY   STATUS    RESTARTS   AGE
   pod/coffee-YYYYYYYYY-DDDDD   1/1     Running   0          ...
   pod/coffee-YYYYYYYYY-EEEEE   1/1     Running   0          ...

   NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
   service/coffee-svc   ClusterIP   10.254.243.13   <none>        80/TCP    ...
   ```

   </details>

1. Create the `cafe-ingress.yaml` manifest for the Ingress resource.

   This Ingress resource will be used to publish the deployed application. The application will be available on the `cafe.example.com` domain at the `http://cafe.example.com/coffee` URL.

   For ExternalDNS to create resource records for the service, no additional values need to be specified in the manifest: having an Ingress controller configured in the right way is sufficient. The domain name values will be taken from the `host` fields for the Ingress `spec.rules[]` rules.

   Specify the `external-dns.alpha.kubernetes.io/ttl` annotation if you want to set a non-standard TTL for resource records (default: 86400 seconds, 24 hours).

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
     annotations:
       external-dns.alpha.kubernetes.io/ttl: "3600"
   spec:
     ingressClassName: nginx
     rules:
     - host: cafe.example.com
       http:
         paths:
         - path: /coffee
           pathType: Prefix
           backend:
             service:
               name: coffee-svc
               port:
                 number: 80
   ```

   Here:

   - The optional `external-dns.alpha.kubernetes.io/ttl` annotation is specified: TTL in seconds for the resource records to be created by ExternalDNS.
   - The `cafe.example.com` host for the Ingress rule is specified. Since only one host is specified, one resource record will be created for this domain name.
   - According to the Ingress rule, the `coffee` application that is behind the `coffee-svc` service will be accessible at the URL `http://cafe.example.com/coffee`.

1. Apply this manifest to the cluster to create the resource:

   ```bash
   kubectl apply -f cafe-ingress.yaml
   ```

1. Check the status of Ingress:

   ```bash
   kubectl get ingress cafe-ingress
   ```

   Wait for the Ingress resource to be assigned a public IP address. This address will be the same as the address of the Ingress controller.

   <details>
   <summary>Example of partial output of the command</summary>

   - Ingress has not yet been assigned an IP address:

     ```text
     NAME           CLASS   HOSTS               ADDRESS   PORTS   AGE
     cafe-ingress   nginx   cafe.example.com              80      ...
     ```

   - Ingress is assigned an IP address:

     ```text
     NAME           CLASS   HOSTS               ADDRESS                PORTS   AGE
     cafe-ingress   nginx   cafe.example.com    203.0.113.222.nip.io   80      ...
     ```

   </details>

1. Verify that ExternalDNS has created the necessary resource records:

   1. [Get a list of resource records](/en/networks/dns/publicdns#viewing_a_list_of_dns_zones) for the `example.com` zone.
   1. Find the entries created by ExternalDNS in the list:

      - One CNAME record `cafe.example.com`.
      - Two TXT records `externaldns-cafe.example.com` and `externaldns-cname-cafe.example.com`.

        These TXT records are service records used by ExternalDNS to track the status of the `cafe-ingress` CNAME record created for Ingress.

      If the required resource records are not present, wait a few more minutes. ExternalDNS will begin creating resource records after the Ingress resource has been assigned an IP address. This will take some time.

1.  Verify that the application is accessible by domain name. To do this, go to `http://cafe.example.com/coffee` in your browser.

   A page should open with a response from the application like:

   ```text
   Server address: 10.100.184.220:8080
   Server name: coffee-YYYYYYYYY-DDDDD
   Date: 09/Feb/2024:13:07:11 +0000
   URI: /coffee
   Request ID: <unique request identifier>
   ```

   Successful interaction with the application at this address indicates that ExternalDNS works correctly with the Ingress resource.

## Remove unused resources

1. If you no longer need the Kubernetes resources created for ExternalDNS validation, delete them:

   1. Delete all resources associated with the `tea` application:

      ```bash
      kubectl delete -f cafe-ingress.yaml -f coffee-service.yaml -f coffee-app.yaml
      ```

      It can take a long time to remove the load balancer associated with the service.

   1. Remove all resources associated with the `coffee` application:

      ```bash
      kubectl delete -f tea-service.yaml -f tea-app.yaml
      ```

   1. [Delete the Ingress NGINX add-on](../../service-management/addons/manage-addons#removing_addon).

      It may take a long time to remove the add-on and its associated resources.

   1. [Delete the resource records](/en/networks/dns/publicdns#deleting_resource_records) created by ExternalDNS.

      This must be done if you did not modify the `external-dns-vkcs-values.yaml` file when [installing ExternalDNS](#2_install_externaldns): in this case ExternalDNS uses the `upsert-only` policy and does not remove resource records from the DNS zone when removing Kubernetes resources. If you modified this file and selected the `sync` policy, then these records will be deleted automatically.

      List of resource records:

      - A record `tea.example.com`.
      - TXT records `externaldns-tea.example.com` and `externaldns-a-tea.example.com`.
      - CNAME record `cafe.example.com`.
      - TXT records `externaldns-cafe.example.com` and `externaldns-cname-cafe.example.com`.

1. If you no longer need ExternalDNS, delete it:

   1. Remove the Helm chart from ExternalDNS:

      ```bash
      helm -n external-dns uninstall external-dns-vkcs
      ```

   1. Remove the `external-dns` namespace.

      <warn>

      The `vkcs-auth` secret, which contains the credentials to access the VK Cloud API, will also be removed.

      </warn>

      ```bash
      kubectl delete ns external-dns
      ```

1. A running Cloud Containers cluster consumes compute resources and is charged. If you no longer need it:

   - [stop](../../service-management/manage-cluster#start_or_stop_the_cluster) it to use it later;
   - [delete](../../service-management/manage-cluster#delete_cluster) it permanently.

1. [Delete](/en/networks/dns/publicdns#deleting_a_zone) the `example.com` DNS zone if you no longer need it.
