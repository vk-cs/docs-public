# {heading(Pod management)[id=k8s-manage-pods]}

{include(/en/_includes/_translated_by_ai_en.md)}

A pod is a group of one or more application containers that share storage (volumes), an IP address, and information about how to run them.

For detailed information about pods, see the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/workloads/pods/).

Each pod represents a single instance of a running application. Run multiple pods per application instance if you perform {linkto(../scale#k8s-instructions-scale-horizontal)[text=horizontal scaling]}.

The following pod operations are available:

* {linkto(#k8s-manage-pods-create)[text=%text]}.
* {linkto(#k8s-manage-pods-connect)[text=%text]}.
* {linkto(#k8s-manage-pods-delete)[text=%text]}.

## {heading(Creating a pod)[id=k8s-manage-pods-create]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Connect to the cluster]}.
1. Create a `pod.yaml` file and open it for editing:
   
   ```console
   vi pod.yaml
   ```

1. Populate the file with the pod manifest and save the changes.

   Example manifest for a pod with an NGINX web server:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
   ```

1. Apply the changes from the `pod.yaml` file to the cluster configuration:
   
   ```console
   kubectl apply -f pod.yaml
   ```

   Output after the pod is successfully created:

   ```console
   pod/nginx-pod created
   ```

1. Display information about the pod for further use:
   
   ```console
   kubectl get pod -o wide
   ```

   Example of the expected result:

   ```console
   NAME        READY   STATUS    RESTARTS   AGE   IP             NODE                                      NOMINATED NODE   READINESS GATES
   nginx-pod   1/1     Running   0          29s   100.127.71.0   kubernetes-cluster-7779-default-group-0   <none>           <none>
   ```

## {heading(Connecting to a pod)[id=k8s-manage-pods-connect]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Connect to the cluster]}.
1. Get the values from the `NAMESPACE` and `NAME` columns for the target pod by running the command:
   
   ```console
   kubectl get po -A
   ```

   Example of the expected result:

   ```console
   NAMESPACE   NAME        READY   STATUS    RESTARTS  AGE
   default     nginx-pod   1/1     Running   0         5m4s
   ```

1. Connect to the pod using the command:
   
   ```console
   kubectl -n <NAMESPACE> exec -it <POD> -- /bin/bash
   ```
   Here:

   * `<NAMESPACE>` — the value of the `NAMESPACE` parameter obtained in the previous step.
   * `<POD>` — the value of the `NAME` parameter obtained in the previous step.

### {heading(Verifying pod health)[id=k8s-manage-pods-checking]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Connect to the cluster]}.
1. Create a pod with a configuration similar to the example given in the section {linkto(#k8s-manage-pods-create)[text=%text]}. If the pod is already created, skip this step.
1. Get the value from the `IP` column for the created pod:

   ```console
   kubectl get pod nginx-pod
   ```

1. {linkto(#k8s-manage-pods-create)[text=Create a pod]} with the following configuration:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
   ```

1. {linkto(#k8s-manage-pods-connect)[text=Connect to the pod]}.
1. Install the curl application:

   ```console
   apt update
   apt install curl
   ```

1. Make a cURL request to the IP address of the `nginx-pod` pod (created in step 2):

   ```console
   curl 100.127.71.0
   ```

   Example of the expected result:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
   <title>Welcome to nginx!</title>
   <style>
       body {
           width: 35em;
           margin: 0 auto;
           font-family: Tahoma, Verdana, Arial, sans-serif;
       }
   </style>
   </head>
   <body>
   <h1>Welcome to nginx!</h1>
   <p>If you see this page, the nginx web server is successfully installed and
   working. Further configuration is required.</p>

   <p>For online documentation and support please refer to
   <a href="http://nginx.org/">nginx.org</a>.<br/>
   Commercial support is available at
   <a href="http://nginx.com/">nginx.com</a>.</p>

   <p><em>Thank you for using nginx.</em></p>
   </body>
   </html>
   ```

## {heading(Deleting a pod)[id=k8s-manage-pods-delete]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Connect to the cluster]}.
1. Get the value from the `NAME` column for the target pod:
   
   ```console
   kubectl get po -A
   ```

1. Delete the pod:
   
   ```console
   kubectl delete pod <POD>
   ```
   Here `<POD>` is the value of the `NAME` parameter obtained in the previous step.