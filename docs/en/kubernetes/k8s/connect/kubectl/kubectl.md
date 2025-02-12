The `kubectl` utility allows you to perform the full range of Kubernetes cluster management operations from the command line. See [official Kubernetes documentation](https://kubernetes.io/docs/reference/kubectl/) for details.

The way to connect to the cluster depends on its IP address:

- If an external IP address is assigned to the cluster, then you can connect to it from any host with Internet access.
- If the cluster is assigned only an internal IP address, then you can connect to it only from a host in VK Cloud — a virtual machine that is located in the same subnet as the cluster.

## Before you start

1. On the host from which you plan to connect to the cluster, install `kubectl` if the utility is not already installed.

   <warn>

   Make sure that the minor version of `kubectl` differs by no more than one from the minor version of the cluster you are connecting to. For example, `kubectl` version 1.23 works correctly with clusters of versions 1.**22**, 1.**23** and 1.**24**.

   See [official Kubernetes documentation](https://kubernetes.io/releases/version-skew-policy/#kubectl) for more details.

   </warn>

   <tabs>
   <tablist>
   <tab>Linux (curl)</tab>
   <tab>Linux (apt)</tab>
   <tab>Linux (yum)</tab>
   <tab>macOS (curl)</tab>
   <tab>macOS (Homebrew)</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Download the correct version of `kubectl`.

      An example command to download the `kubectl` utility which is compatible with cluster version 1.23.6:

      ```bash
      curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/linux/amd64/kubectl
      ```

   1. Make the `kubectl` binary file executable:

      ```bash
      sudo chmod +x ./kubectl
      ```

   1. Place this file in a directory which is contained in the `PATH` environment variable, e.g. in `/usr/local/bin`:

      ```bash
      sudo mv ./kubectl /usr/local/bin/kubectl
      ```

   1. Check the `kubectl` version by running the command:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Add the Kubernetes repository:

      ```bash
      sudo apt-get update && sudo apt-get install -y apt-transport-https
      curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
      echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
      sudo apt-get update

      ```

   1. Install the correct version of `kubectl`.

      An example command to install the `kubectl` utility which is compatible with cluster version 1.23.6:

      ```bash
      sudo apt-get install -y kubectl=1.23.6-00
      ```

      <info>

      You can get a list of all available versions by using the command `sudo apt-cache policy kubectl`.

      </info>

   1. Check the `kubectl` version by running the command:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Add the Kubernetes repository:

      ```bash
      cat << EOF > /etc/yum.repos.d/kubernetes.repo
      [kubernetes]
      name=Kubernetes
      baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
      enabled=1
      gpgcheck=1
      repo_gpgcheck=1
      gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
      EOF
      ```

   1. Install the correct version of `kubectl`.

      An example command to install the `kubectl` utility which is compatible with cluster version 1.23.6:

      ```bash
      yum install -y kubectl-1.23.6-0
      ```

      <info>

      You can get a list of all available versions by using the command `yum --showduplicates list kubectl`.

      </info>

   1. Check the `kubectl` version by running the command:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Download the correct version of `kubectl`.

      An example command to download the `kubectl` utility which is compatible with cluster version 1.23.6:

      ```bash
      curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/darwin/amd64/kubectl
      ```

   1. Make the `kubectl` binary file executable:

      ```bash
      sudo chmod +x ./kubectl
      ```

   1. Place this file in a directory which is contained in the `PATH` environment variable, e.g. in `/usr/local/bin`:

      ```bash
      sudo mv ./kubectl /usr/local/bin/kubectl
      ```

   1. Check the `kubectl` version by running the command:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Run one of the installation commands:

      ```bash
      brew install kubectl
      ```

      Or:

      ```bash
      brew install kubernetes-cli
      ```

   1. Check the `kubectl` version by running the command:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Download the correct version of `kubectl`.

      An example command to download the `kubectl` utility which is compatible with cluster version 1.23.6:

      ```powershell
      curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/windows/amd64/kubectl.exe
      ```

   1. In the `PATH` environment variable, specify the directory where the `kubectl.exe` file was downloaded:

      1. Go to **Start -> This Computer -> Properties -> Advanced System Settings -> Environment Variables -> System Variables**.
      1. Change the value of the `Path` variable by appending the path to the directory with the file `kubectl.exe` to it.

      <info>

      **Note**

      Docker Desktop for Windows adds its own version of `kubectl` to the `PATH` environment variable. If Docker Desktop is installed:

      - either specify the path to the downloaded file before the entry added by the Docker Desktop installer;
      - or remove the `kubectl` shipped with Docker Desktop.

      </info>

   1. Check the `kubectl` version by running the command:

      ```powershell
      kubectl version --short
      ```

   </tabpanel>
   </tabs>

1. Prepare everything you need to connect using [Single Sign-On (SSO)](../../concepts/access-management).

   1. On the host from which you plan to connect to the cluster, install `client-keystone-auth` if the plugin is not already installed:

      {include(/en/_includes/_client_keystone_auth.md)}

   1. Check if you have the [required role](/en/tools-for-using-services/account/concepts/rolesandpermissions#roles_permissions_kubernetes) to work with Kubernetes clusters. If you do not have one, ask the project owner or superadmin to add it for you.
   1. [Activate](/en/tools-for-using-services/rest-api/enable-api#activate_api_access) API access.

## Connecting to cluster

{include(/en/_includes/_kubeconfig.md)}

## Checking connection to cluster

<tabs>
<tablist>
<tab>Version of Kubernetes 1.23 and higher</tab>                                                        
<tab>Version of Kubernetes 1.22 and lower</tab>
</tablist>
<tabpanel>

On the host:

1. Run the command:

   ```bash
   kubectl cluster-info
   ```

1. Enter the user's password for the VK Cloud account.

   This is necessary for [authentication](../../concepts/access-management) when connecting to the cluster.

</tabpanel>
<tabpanel>

Run the command on the host:

```bash
kubectl cluster-info
```

</tabpanel>
</tabs>

If the cluster is in the nomal operation state and `kubectl` is configured to work with it, similar information will be dispalyed:

```text
Kubernetes control plane is running at...
CoreDNS is running at...
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
