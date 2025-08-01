[Lens](https://k8slens.dev/) is a platform for visualizing and monitoring Kubernetes clusters. It provides a convenient interface for viewing the state of resources, events, metrics, and other data related to the cluster.

## Before you start

1. [Create](../../instructions/create-cluster) a Kubernetes cluster to connect to, or select the cluster from the list in your [management console](https://msk.cloud.vk.com/app/) in the **Containers → Kubernetes Clusters** section.
1. On the host from which you plan to connect to the cluster, [install Lens](https://docs.k8slens.dev/getting-started/install-lens/), if you have not done it already.
1. Make sure that [API access is enabled](/en/tools-for-using-services/api/rest-api/enable-api#activate_api_access).
1. Install the `client-keystone-auth` plugin to connect to the cluster using [Single Sign-On (SSO)](../../concepts/access-management):

   {include(/en/_includes/_client_keystone_auth.md)}

## Connecting to cluster

{include(/en/_includes/_kubeconfig.md)[tags=novariables]}

1. Specify the password for accessing the cluster in one of the following ways:

   {tabs}

   {tab(kubeconfig)}

   This method allows you to specify a password for connecting to a specific cluster.

   Specify the password in the cluster configuration file:

    1. Open the `kubernetes-cluster-1234_kubeconfig.yaml` file.
    1. Uncomment the lines:

       ```yaml
       #- name: "OS_PASSWORD"
       #  value: "put your password here"
       ```
    1. Specify your password for authorization in your VK Cloud management console.

   {/tab}

   {tab(Temporary environment variable)}

   This method allows you to specify a password in a terminal session. The password can be used for several clusters, but only for the duration of the session.

   Open a terminal session and specify the password in the console:

      {tabs}

      {tab(Windows)}

      ```console
      $env:OS_PASSWORD = "<PASSWORD>"
      ```

      Here `<PASSWORD>` is your password for authorization in your VK Cloud management console.

      {/tab}

      {tab(Linux)}

      ```console
      export OS_PASSWORD=<PASSWORD>
      ```

      Here `<PASSWORD>` is your password for authorization in your VK Cloud management console.

      {/tab}

      {/tabs}

   {/tab}

   {tab(Permanent environment variable)}

   This method allows you to specify the password in constant user variables. The password can be used to connect to multiple clusters, regardless of the terminal session.

      {tabs}

      {tab(Windows)}

      1. On the host from which you plan to connect to the cluster, open **Start** → **Settings**.
      1. Select **Edit current user environment variables** in the search bar.
      1. In the **User environment variables** window, add a new variable:

         - **Name**: `OS_PASSWORD`.
         - **Value**: your password for authorization in your VK Cloud management console.
         
      {/tab}

      {tab(Linux)}

      1. Open the `~/.bashrc` file.
      1. Add the following line to the file:

         ```console
         export OS_PASSWORD=<PASSWORD> 
         ```

         Here `<PASSWORD>` is your password for authorization in your VK Cloud management console. 

      1. Save the changes.

      {/tab}

      {tab(MacOS)}

      1. Open the `.bashrc` or `.zshrc` file.
      1. Add the following line to the file:

         ```console
         export OS_PASSWORD=<PASSWORD> 
         ```

         Here `<PASSWORD>` is your password for authorization in your VK Cloud management console.
      
      {/tab}

      {/tabs}

   {/tab}
   
   {/tabs}

1. Launch Lens and go to the **Catalog** section.

    {note:warn}

    If you have added a password to temporary environment variables, you need to launch Lens from the same terminal session with the command `lens-desktop`.

    {/note}

1. Connect to the cluster in one of the following ways:

   - If you have configured synchronization with the directory of kubeconfig, the cluster is automatically added to the list.
   - If you have not configured the synchronization, start synchronization with kubeconfig and select the file previously downloaded from your VK Cloud management console.

After connecting, the cluster page will open.
