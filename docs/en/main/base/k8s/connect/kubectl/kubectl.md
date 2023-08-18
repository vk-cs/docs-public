The `kubectl` utility allows you to perform the full range of Kubernetes cluster management operations from the command line. See [official Kubernetes documentation](https://kubernetes.io/docs/reference/kubectl/) for details.

The way to connect to the cluster depends on its IP address:

- If an external IP address is assigned to the cluster, then you can connect to it from any host with Internet access.
- If the cluster is assigned only an internal IP address, then you can connect to it only from a host in VK Cloud — a virtual machine that is located in the same subnet as the cluster.

## Preparatory steps

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

1. If you plan to connect to a Kubernetes cluster version 1.23 or higher, prepare everything you need to connect using [Single Sign-On (SSO)](../../concepts/access-management).

   1. On the host from which you plan to connect to the cluster, install `keystone-auth` if the utility is not already installed:

      <tabs>
      <tablist>
      <tab>Windows (PowerShell)</tab>
      <tab>Linux (bash)/macOS (zsh)</tab>
      </tablist>
      <tabpanel>

      1. Run the command:

         ```powershell
         iex (New-Object System.Net.WebClient).DownloadString( `
           'https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1' `
         )

         ```

         This will start installing the `keystone-auth` utility.

      1. Confirm adding the directory with the utility to the `PATH` environment variable by entering `Y` in response to the prompt:

         ```text
         Add client-keystone-auth installation dir to your PATH? [Y/n]
         ```

      </tabpanel>
      <tabpanel>

      1. Run the command:

         ```bash
         curl -sSL \
           https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
         | bash
         ```

         This will start installing the `keystone-auth` utility.

      1. If you are using a shell other than `bash` or `zsh`, add the path to the utility to the `PATH` environment variable manually.

      1. Restart the shell session or run the `source` command.

         A tip with the necessary commands will be displayed when the installation is complete.

      </tabpanel>
      </tabs>

   1. Determine on behalf of which user you want to connect to the cluster. Then:

      - [Assign](../../../../base/account/account/adduser) necessary [role](../../concepts/access-management) to this user.
      - [Activate API access](/en/base/account/project/api/api-access#activate-api-access) for this user.

## Connecting to the cluster

On the host from which you plan to connect to the cluster:

1. Download the configuration file of the cluster you want to connect to to the local computer:

   1. Go to [personal account](https://mcs.mail.ru/app/) VK Cloud under the account of the user who will connect to the cluster.
   1. Select the project where the necessary cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Expand the menu of the necessary cluster and select **Get Kubeconfig to access the cluster**.

   Such a file is automatically created for each new cluster and is named in the format `<cluster name>_kubeconfig.yaml`.

   <info>

    Further, it is assumed that the downloaded file has the name `kubernetes-cluster-1234_kubeconfig.yaml` and is located in the directory `C:\Users\user\.kube` (for Windows) or `/home/user/.kube` (for Linux and macOS). Correct the commands below if necessary.

   </info>

1. The configuration file contains sensitive information that should not be accessible to other users. Therefore, restrict the access rights to this file:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   icacls.exe 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml' `
     /c /t `
     /Inheritance:d `
     /Remove:g BUILTIN\Administrators Everyone Users `
     /Grant:r ${env:UserName}:RW
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo chmod 0600 /home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   </tabpanel>
   </tabs>

1. Place the path to the configuration file in the `$KUBECONFIG` environment variable:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   $env:KUBECONFIG = 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml'
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   export KUBECONFIG=/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   </tabpanel>
   </tabs>

## Checking the connection to the cluster

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

   To avoid entering the password every time, uncomment the following lines in the configuration file, specifying the password in the `value` parameter:

   ```ini
   - name: "OS_PASSWORD"
     value: "put your password here"
   ```

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
