{includetag(novariables)}
Follow the steps on the host from which you plan to connect to the cluster:

1. Upload the cluster configuration file:

    1. [Go to](https://msk.cloud.vk.com/app/) to your VK Cloud management console under the account of the user who will connect to the cluster.
    1. Select the project where the cluster you need is located.
    1. Go to the **Containers → Kubernetes Clusters** section.
    1. Click ![ ](/en/assets/more-icon.svg "inline") for the cluster and select **Get Kubeconfig to access the cluster**.

   The configuration file is automatically created for each new cluster and has a name in the format of `<cluster name>_kubeconfig.yaml`. 

   Let the downloaded file is named `kubernetes-cluster-1234_kubeconfig.yaml` and is located in the `C:\Users\user\.kube` (for Windows) or `/home/user/.kube` (for Linux and macOS) directory. Edit the commands below if needed.

1. The configuration file contains sensitive information that should not be accessible to other users. So restrict access rights to this file:

   {tabs}
   {tab(Windows (PowerShell))}
   
   ```console
   icacls.exe 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml' `
     /c /t `
     /Inheritance:d `
     /Remove:g BUILTIN\Administrators Everyone Users `
     /Grant:r ${env:UserName}:RW
   ```

   {/tab}
   {tab(Linux (bash)/macOS (zsh))}
   
   ```console
   sudo chmod 0600 /home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   {/tab}
   {/tabs}

{/includetag}
{includetag(variables)}

1. Put the path to the config file in the `$KUBECONFIG` environment variable:

   {tabs}
   {tab(Windows (PowerShell))}
   
   ```console
   $env:KUBECONFIG = 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml'
   ```

   {/tab}
   {tab(Linux (bash)/macOS (zsh))}
   
   ```console
   export KUBECONFIG=/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   {/tab}
   {/tabs}
{/includetag}   