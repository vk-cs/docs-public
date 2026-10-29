# {heading(Application deployment)[id=k8s-deploy-app]}

{include(/en/_includes/_translated_by_ai_en.md)}

An application is deployed in Kubernetes using the `kubectl` utility. The full syntax of the utility's commands is provided in the [official Kubernetes documentation](https://kubernetes.io/docs/reference/kubectl/overview/).

Before deploying the application:

1. Install `kubectl` from the [official website](https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/).
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Connect to the cluster]}.

After deployment, the application instance runs inside a Docker container.

Let us consider the deployment process using the tea application as an example. For the application, create:

* A [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) so that volumes with data can be mounted into the application.
* A [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) in which the number of replicas and the volume to mount into the pod are specified.
* A [Service](https://kubernetes.io/docs/concepts/services-networking/service/) to provide access to the application.

To deploy the application:

1. Create a directory for the files and navigate to it:

   {tabs}

   {tab(Linux/macOS)}
   ```console
   mkdir ~/k8s-deployments && cd ~/k8s-deployments
   ```
   {/tab}

   {tab(Windows)}
   ```console
   mkdir ~/k8s-deployments; cd ~/k8s-deployments
   ```
   {/tab}

   {/tabs}

1. Place the `deploy-tea.yaml` file in this directory:
   
   ```yml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-tea
   spec:
     storageClassName: "csi-ceph-ssd-pa2"
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

   {note:warn}
   Note that in the `deploy-tea.yaml` file, the Persistent Volume Claim specifies the storage class that corresponds to the availability zone of the node where the application is planned to be deployed.

   An attempt to place on a node in one availability zone an application with a volume mounted from another availability zone may fail.
   {/note}
   
1. Deploy the application:
   
   ```console
   kubectl apply -f deploy-tea.yaml
   ```

1. Verify that the deployment is correct:

   * The Persistent Volume Claim using the command:
      
     ```console
     kubectl get pvc
     ```

   * The Deployment using the command:
      
     ```console
     kubectl get deployment
     ```

   * The Service using the command:
      
     ```console
     kubectl get svc
     ```

1. Configure Ingress for the application. For the Ingress controller to route requests to the appropriate service through which the tea application is published:

   1. Place the `deploy-ingress.yaml` yaml file in the `~/k8s-deployments` directory:

      ```yml
      apiVersion: networking.k8s.io/v1
      kind: Ingress
      metadata:
        name: tea-ingress
      spec:
        ingressClassName: nginx
        rules:
          - host: tea.example.com
            http:
              paths:
                - path: /tea
                  pathType: Prefix
                  backend:
                    service:
                      name: tea-svc
                      port:
                        number: 80
      ```

   1. Deploy the Ingress resource:
      
      ```console
      kubectl apply -f deploy-ingress.yaml
      ```

   1. Verify that the deployment is correct:
      
      ```console
      kubectl get ingress
      ```

1. Check that all the created application resources in the cluster are functioning properly. To do this, send a curl request to the load balancer IP address:
   
   ```console
   curl --resolve cafe.example.com:80:<IP-АДРЕС> http://tea.example.com/tea
   ```
   Here `<IP-АДРЕС>` is the IP address of the load balancer.