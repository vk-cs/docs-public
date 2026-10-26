# {heading(Connecting to a cluster using Headlamp)[id=mk8s-headlamp]}

{include(/en/_includes/_translated_by_ai_en.md)}

[Headlamp](https://headlamp.dev/) is a graphical interface (GUI) for managing Kubernetes clusters in the Managed Containers service. Headlamp is a more modern and flexible alternative to Lens that allows you to view and edit cluster resources in a browser or a local application without manual `kubectl` commands.

You can install Headlamp in two ways:

- Directly in the cluster ([In-cluster](https://headlamp.dev/docs/latest/installation/in-cluster/) mode). In this mode, Headlamp is installed in the Kubernetes cluster as a single pod. Inside this pod, Headlamp works as a proxy to the Kubernetes API: the browser accesses Headlamp, which accesses the Kubernetes API server. In this mode, you can configure centralized access to the cluster for a group of users without having to install the application on each user's device.

- Locally on your computer as an application ([Desktop](https://headlamp.dev/docs/latest/installation/desktop/) mode). In this mode, when you launch Headlamp, a local Headlamp server and a web interface in the form of an application window are also started in the background. This mode offers better performance and is best suited for individual work with the cluster.

For more information, see the [official Headlamp documentation](https://headlamp.dev/docs/latest/).

## {heading(Preparatory steps)[id=mk8s-headlamp-in-cluster-prep]}

{tabs}
{tab(In-cluster installation)}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=Create]} a cluster if you have not done so already.
1. {linkto(../kubectl#mk8s-kubectl-check-connection)[text=Make sure]} that you can connect to the cluster using `kubectl`.
1. On the host from which you plan to connect to the cluster, install `kauthproxy` if the utility is not installed yet:

    1. Download the archive of the required version from the [releases page](https://github.com/int128/kauthproxy/releases):

        * for Linux: `kauthproxy_linux_....zip`;
        * for macOS: `kauthproxy_darwin_....zip`;
        * for Windows: `kauthproxy_windows_....zip`.

    1. Extract the archive.

    1. Place the executable file in a directory that is included in the `PATH` environment variable, for example:

        * for Linux and macOS: in `/usr/local/bin`;
        * for Windows: in `C:\`.

1. On the host from which you plan to connect to the cluster, {linkto(../../install-tools/helm#mk8s-helm)[text=install the Helm client]} if you have not done so already.

{/tab}

{tab(Local installation)}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=Create]} a cluster if you have not done so already.
1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Make sure]} that API access is enabled.
1. Install the `client-keystone-auth` plugin to connect to the cluster using {linkto(../../concepts/access-management#mk8s-access-management)[text=Single Sign-On (SSO)]}:

   {include(/en/_includes/_client-keystone-auth.md)}

{/tab}
{/tabs}

## {heading(Installing Headlamp)[id=mk8s-headlamp-install]}

{tabs}
{tab(In-cluster installation)}

1. Add the Headlamp repository:

   ```console
   helm repo add headlamp https://kubernetes-sigs.github.io/headlamp/
   helm repo update
   ```

1. Create the `headlamp` namespace and install Headlamp into it:

   ```console
   helm install my-headlamp headlamp/headlamp --namespace headlamp --create-namespace
   ```

1. Make sure that the pod where Headlamp is installed is running:

   ```console
   kubectl get pods -n headlamp
   ```

   The command output should show the pod status as `Running`.

Other ways to install Headlamp in a cluster are described in the [official documentation](https://headlamp.dev/docs/latest/installation/in-cluster/).

{/tab}

{tab(Local installation)}

Install Headlamp on your device using one of the methods described in the [official documentation](https://headlamp.dev/docs/latest/installation/desktop/).

{/tab}
{/tabs}

## {heading(Connecting to the cluster)[id=mk8s-headlamp-in-cluster-connect]}

{tabs}
{tab(In-cluster installation)}

1. On the host, run the command in a separate terminal session:

   ```console
   kauthproxy -n headlamp http://my-headlamp.svc
   ```

   Do not close this terminal session, otherwise access to the Headlamp web interface will be lost.

1. Enter the password for your {var(cloud)} management console if it is not specified in the `kubeconfig` configuration file. `kauthproxy` will periodically request this password again.

After connecting, the Headlamp web interface will open.

{/tab}

{tab(Local installation)}

{include(/en/_includes/_kubeconfig.md)[tags=headlamp]}

1. Specify the password for accessing the cluster in one of the following ways:

   {tabs}

   {tab(kubeconfig)}

   This method allows you to specify the password for connecting to a specific cluster.

   Specify the password in the cluster configuration file:

    1. Open the `config.yaml` file.
    1. Uncomment the lines by removing `#`:

       ```yaml

# - name: "OS_PASSWORD"

#  value: "put your password here"
       ```
    1. Specify the password that you use to log in to your {var(cloud)} management console.

   {/tab}

   {tab(Temporary environment variable)}

   This method allows you to specify the password in a terminal session. The password can be used to connect to multiple clusters, but only for the duration of the session.

   Open a terminal session and specify the password in the console:

   {tabs}

   {tab(Windows)}

      ```console
      $env:OS_PASSWORD = "<PASSWORD>"
      ```

   Here `<PASSWORD>` is your password for logging in to your {var(cloud)} management console.

   {/tab}

   {tab(Linux)}

      ```console
      export OS_PASSWORD=<PASSWORD>
      ```

   Here `<PASSWORD>` is your password for logging in to your {var(cloud)} management console.

   {/tab}

   {/tabs}

   {/tab}

   {tab(Permanent environment variable)}

   This method allows you to specify the password in the user's permanent environment variables. The password can be used to connect to multiple clusters, regardless of the terminal session.

   {tabs}

   {tab(Windows)}

    1. On the host from which you plan to connect to the cluster, open **Start** → **Settings**.
    1. Select **Edit environment variables for your account** in the search bar.
    1. In the **Environment Variables** window, add a new variable:

        * **Name**: `OS_PASSWORD`;
        * **Value**: your password for logging in to your {var(cloud)} management console.

   {/tab}

   {tab(Linux)}

    1. Open the `~/.bashrc` file.
    1. Add the following line to the file:

       ```console
       export OS_PASSWORD=<PASSWORD> 
       ```

       Here `<PASSWORD>` is your password for logging in to your {var(cloud)} management console.

    1. Save the changes.

   {/tab}

   {tab(macOS)}

    1. Open the `.bashrc` or `.zshrc` file.
    1. Add the following line to the file:

       ```console
       export OS_PASSWORD=<PASSWORD> 
       ```

       Here `<PASSWORD>` is your password for logging in to your {var(cloud)} management console.
   
    1. Save the changes.

   {/tab}

   {/tabs}

   {/tab}

   {/tabs}

1. Launch the Headlamp application. The page of the cluster whose configuration file you downloaded earlier will open automatically. If you specified more than one cluster, select the desired one manually.

{/tab}
{/tabs}