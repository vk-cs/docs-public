## Description

Kubernetes Dashboard is a universal web interface for Kubernetes clusters. It allows users to manage and troubleshoot applications running in the cluster, as well as manage the cluster itself.

## Connection

<tabs>
<tablist>
<tab>Kubectl version less than v1.23</tab>
<tab>Kubectl version v1.23+</tab>
</tablist>
<tabpanel>

1. Get the Secret to access the Kubernetes Dashboard of the cluster using one of the following methods:

    1. Using the VK Cloud interface: go to the cluster, select "Get Secret to enter the Kubernetes dashboard" in the menu.
    1. With kubectl: run the command and copy its output.

        ```bash
        kubectl get secret $(kubectl get sa dashboard-sa -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode
        ```

2. Start kubectl proxy:

    ```bash
    kubectl proxy
    ```

3. Open a browser and navigate to [link](http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/).

    The Kubernetes Dashboard web interface will load.

4. You will be prompted to log in. Select the "Token" option.
5. Paste the token obtained in step 1 and click "Sign In".

    The Kubernetes Dashboard will open with super admin rights.

</tabpanel>
<tabpanel>

1. Install client-keystone-auth according to [instructions](../../manage-k8s/client-keystone-auth/).
1. Import [configuration](../connect-k8s/).
1. Open a command prompt and run the command below:

### Linux

```bash
kauthproxy --kubeconfig $KUBECONFIG -n kube-system https://kubernetes-dashboard.svc
```

### Windows

```bash
kauthproxy --kubeconfig $Env:KUBECONFIG -n kube-system https://kubernetes-dashboard.svc
```

</tabpanel>
</tabs>
