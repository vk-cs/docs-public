When trying to connect to OpenStack or the Kubernetes API, the [Cluster Autoscaler](/en/kubernetes/k8s/concepts/cluster-autoscaler) pod has the `CrashLoopBackOff` status, causing it to fail authentication.

This problem occurs if the manifest of the Cluster Autoscaler pod does not specify the parameters required for authentication. The manifest is generated automatically, and there might be several reasons why it does not have the required parameters. Do not modify the manifest manually. Instead, provide technical support with detailed information about the errors that occur, as described further.

### Solution

1. Displays the logs of the Cluster Autoscaler pod in the `kube-system` namespace:

   ```console
   kubectl logs <POD_NAME> -n kube-system -p
   ```
1. Check the logs for possible errors. 

   - If the path to the `cloud-config` file is not specified in the pod manifest, or if this file does not exist, the logs will have the following errors:

      ```console
      You must provide a password to authenticate
      ```
   - If the pod has incorrect authentication data specified, the logs will have the following errors:

      ```console
      Authentication failed
      ```
   - If the `Service Account: cluster-autoscaler` parameter is not specified in the pod manifest, the logs will have the following errors:
   
      ```console
      Failed to get nodes from apiserver: nodes is forbidden: User "system:serviceaccount:kube-system:default" cannot list resource "nodes" in API group "" at the cluster scope
      ```   
     
1. If the logs indicate an error related to the missing `Service Account: cluster-autoscaler` parameter, perform the following additional diagnostics:
   
   1. Run the command to display the manifest of the Cluster Autoscaler pod:

      ```console
      kubectl describe pod <POD_NAME> -n kube-system
      ```
   1. Check if the manifest contains the following line:

      ```console
      Service Account: cluster-autoscaler
      ```
      If this line is missing, indicate this when contacting technical support.

1. Contact [technical support](mailto:support@mcs.mail.ru) and report the errors you have detected.
