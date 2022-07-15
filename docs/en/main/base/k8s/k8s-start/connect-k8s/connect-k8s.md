## Description

Kubernetes`kubectl` command line tool allows you to run commands in Kubernetes clusters.

`kubectl` can be used to deploy applications, check and manage cluster resources, as well as to view logs.

A complete list of operations that can be performed using `kubectl` is available in [official documentation] (https://kubernetes.io/docs/reference/kubectl/overview /).

## Connecting to a cluster <a id="connect"></a>

To connect to a cluster using `kubectl`:

1. [Install](#kubectl-install) `kubectl` if it is not already installed.

   <warn>

   Make sure that the major version of the installed `kubectl` does not differ from the one used in the cluster. For example, version v1.19 can work with versions v1.16 and v1.15. Using the latest version of `kubectl` will help to avoid unexpected problems when connecting.

   </warn>

1. Upload the cluster configuration file to which you want to connect to your local computer:

   1. Go to the "Containers" section of the VK CS Panel.
   1. Select "Get Kubeconfig to access the cluster" in the context menu of the required cluster.

   Such a file is automatically created for each new cluster and has a name in the format `<cluster name>_kubeconfig.yaml`.

   <info>

   In the following steps, it is assumed that the downloaded file has the name `kubernetes-cluster-1234_kubeconfig.yaml` and is located in the directory `~/Downloads`. Adjust the commands below if necessary.

   </info>

1. Import the downloaded configuration file so that `kubectl` can find the Kubernetes cluster and access it:

   <tabs>
   <tablist>
   <tab>Linux, macOS (bash)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   1. Go to the `.kube/` directory, which is located in your home directory:

      ```bash
      cd ~/.kube
      ```

   1. If such a directory does not exist, create it and assign the minimum necessary rights:

      ```bash
      mkdir ~/.kube && \
      chmod -R 0600 ~/.kube && \
      cd ~/.kube
      ```

   1. Place the configuration file in the `~/ directory.kube` under the name `config`:

      ```bash
      mv ~/Downloads/kubernetes-cluster-1234_kubeconfig.yaml ~/.kube/config
      ```

   1. Tell `kubectl` to use this configuration file by setting the environment variable:

      ```bash
      export KUBECONFIG=$KUBECONFIG:$HOME/.kube/config
      ```

   </tabpanel>
   <tabpanel>

   1. Go to the `.kube/` directory, which is located in your home directory:

      ```powershell
      cd ~/.kube
      ```

   1. If such a directory does not exist, create it:

      ```powershell
      mkdir ~/.kube; `
      cd ~/.kube
      ```

   1. Place the configuration file in the `~/ directory.kube` under the name `config`:

      ```powershell
      mv ~/Downloads/kubernetes-cluster-1234_kubeconfig.yaml ./config
      ```

   1. Tell `kubectl` to use this configuration file by setting the environment variable:

      ```powershell
      $Env:KUBECONFIG="$Env:KUBECONFIG;$HOME\.kube\config"
      ```

   </tabpanel>
   </tabs>

1. Perform a test connection to the cluster:

   ```bash
   kubectl cluster-info
   ```

   Can be output:

   - Brief information that the cluster control plane and CoreDNS are functioning, for example:

     ```text
     Kubernetes control plane is running at https://NNN.NNN.NNN.NNN:6443
     CoreDNS is running at https://NNN.NNN.NNN.NNN:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

     ```

     This means that `kubectl` is correctly configured and successfully connected to the cluster.
     Now you can use `kubectl` to manage your cluster.

   - Other messages that may indicate connection problems, for example:

     ```text
     The connection to the server NNN.NNN.NNN.NNN:6443 was refused - did you specify the right host or port?
     ```

     ```text
     Unable to connect to the server: EOF
     ```

1. In case of connection problems:

   1. Check that:

      1. The cluster is on and running.
      1. `kubectl` is configured correctly.

   1. Collect the output of the following commands:

      ```bash
      kubectl config view
      ```

      ```bash
      kubectl cluster-info dump
      ```

   1. Send the collected information to the VK Cloud Solution technical support service to diagnose and fix the problem.

## Installing kubectl <a id="kubectl-install"></a>

<tabs>
<tablist>
<tab>Linux (curl)</tab>
<tab>Linux (apt)</tab>
<tab>Linux (yum)</tab>
<tab>macOS (curl)</tab>
<tab>macOS (Homebrew)</tab>
<tab>Windows (manual installation)</tab>
<tab>Windows (Powershell Gallery)</tab>
</tablist>
<tabpanel>

1. Download the latest version:

   ```bash
   curl -LO https://storage.googleapis.com/kubernetes-release/release/\`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt\`/bin/linux/amd64/kubectl
   ```

1. Make the binary `kubectl` executable:

   ```bash
   chmod +x ./kubectl
   ```

1. Place this file in the directory that is present in the environment variable `PATH`, for example, in `/usr/local/bin`:

   ```bash
   sudo mv ./kubectl /usr/local/bin/kubectl
   ```

</tabpanel>
<tabpanel>

1. Connect the Kubernetes repository:

   ```bash
   sudo apt-get update && sudo apt-get install -y apt-transport-https
   curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
   sudo apt-get update
   ```

1. Install `kubectl`:

   ```bash
   sudo apt-get install -y kubectl
   ```

</tabpanel>
<tabpanel>

1. Connect the Kubernetes repository:

   ```bash
   cat <<EOF > /etc/yum.repos.d/kubernetes.repo
   [kubernetes]
   name=Kubernetes
   baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
   EOF
   ```

1. Install `kubectl`:

   ```bash
   yum install -y kubectl
   ```

</tabpanel>
<tabpanel>

1. Download the latest version:

   ```bash
   curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl"
   ```

1. Make the binary `kubectl` executable:

   ```bash
   chmod +x ./kubectl
   ```

1. Place this file in the directory that is present in the environment variable `PATH`, for example, in `/usr/local/bin`:

   ```bash
   sudo mv ./kubectl /usr/local/bin/kubectl
   ```

</tabpanel>
<tabpanel>

Run one of the installation commands:

```bash
brew install kubectl
```

Or:

```bash
brew install kubernetes-cli
```

</tabpanel>
<tabpanel>

1. Download the latest v1.24.2 software [ссылке](https://storage.googleapis.com/kubernetes-release/release/v1.24.2/bin/windows/amd64/kubectl.exe).

1. In the environment variable `PATH`, specify the directory where it was uploaded `kubectl.exe`:

   1. Go to **Start->This Computer->Properties->Advanced System Settings->Environment Variables->System Variables**.
   1. Change the value of the `PATH` variable by adding the path to the directory with `kubectl.exe`.

   <info>

   **Note**

   Docker Desktop for Windows adds its version of `kubectl` to the `PATH` environment variable. If Docker Desktop is installed, you need to put the path to the installed binary file before the entry added by the Docker Desktop installer, or delete `kubectl` altogether, which is supplied with Docker Desktop.

   </info>

</tabpanel>
<tabpanel>

When using the Powershell Gallery Package Manager in Windows, you can install and update `kubectl` using Powershell.

Run the following commands to install:

```powershell
Install-Script -Name install-kubectl -Scope CurrentUser -Force
install-kubectl.ps1 [-DownloadLocation <path>]
```

<info>

**Note**

- If you do not specify the `-DownloadLocation` argument, then `kubectl` will be installed in the user's temporary directory.
- The installer will create a directory `$HOME/.kube` along with the configuration file.
- You can update `kubectl` by re-executing the specified commands.

</info>

</tabpanel>
</tabs>

To make sure that the `kubectl` of the required version is installed, run the command:

```bash
kubectl version --client
```
