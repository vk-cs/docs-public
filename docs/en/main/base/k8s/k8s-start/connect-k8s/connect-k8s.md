## Description

The Kubernetes command line tool kubectl lets you run commands against Kubernetes clusters. kubectl can be used to deploy applications, inspect and manage cluster resources, and view logs. A complete list of kubectl operations is available in the [official kubectl documentation](https://kubernetes.io/docs/reference/kubectl/overview/).

## Preparation for work

The major version of kubectl used must not differ from the one used in the cluster. For example, version v1.19 can work with versions v1.16 and v1.15. Using the latest version of kubectl will help you avoid unexpected problems.

## Installation kubectl

<tabs>
<tablist>
<tab>Linux (curl)</tab>
<tab>Linux (apt)</tab>
<tab>Linux (yum)</tab>
<tab>macOS (curl)</tab>
<tab>macOS (Homebrew)</tab>
<tab>Windows (manually installation)</tab>
<tab>Windows (Powershell Gallery)</tab>
</tablist>
<tabpanel>

1. Download the latest version:

    ```bash
    curl -LO https://storage.googleapis.com/kubernetes-release/release/\`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt\`/bin/linux/amd64/kubectl
    ```

1. Make a binary file kubectl executable:

    ```bash
    chmod +x ./kubectl
    ```

1. Move a binary file to a directory from a variable environment PATH:

    ```bash
    sudo mv ./kubectl /usr/local/bin/kubectl
    ```

</tabpanel>
<tabpanel>

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

</tabpanel>
<tabpanel>

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
yum install -y kubectl
```

</tabpanel>
<tabpanel>

1. Download the latest version:

    ```bash
    curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl"
    ```

1. Make a binary kubectl file executable:

    ```bash
    chmod +x ./kubectl
    ```

1. Move a binary file to a directory from a variable environment PATH:

    ```bash
    sudo mv ./kubectl /usr/local/bin/kubectl
    ```

</tabpanel>
<tabpanel>

Perform one of the command commands:

```bash
brew install kubectl
```

ﬁ:

```bash
brew install kubernetes-cli
```

</tabpanel>
<tabpanel>

1.  Download the latest version V1.24.2 by [link](https://storage.googleapis.com/kubernetes-release/release/v1.24.2/bin/windows/amd64/kubectl.exe).

1.  Indicate the directory with the binary file where the download was made in the Path environment variable: "Start-> This computer-> Properties-> Additional parameters of the system-> Variating environment-> System variables-> Path"

    <info>

    Docker Desktop for Windows adds its own version of Kubectl to the Path environment variable.If Docker Desktop is installed, you need to place the path to the installed binary file before the recording added by the Docker Desktop installer, or delete the Kubectl supplied along with the Docker Desktop.

    </info>

</tabpanel>
<tabpanel>

When using the PowerShell Gallery package manager in Windows, you can install and update Kubectl using PowerShell.

Perform installation commands:

```powershell
Install-Script -Name install-kubectl -Scope CurrentUser -Force
install-kubectl.ps1 [-DownloadLocation <path>]
```

<info>

-   If you do not specify the argument  `-DownloadLocation`, then Kubectl will be installed in the temporary directory of the user.
-   The installer will create a directory`$HOME/.kube` Together with the configuration file.
-   You can update Kubectl by execution of two commands listed in step 1.

</info>

</tabpanel>
</tabs>

To make sure that kubectl of the required version is installed, you need to run the command:

```bash
kubectl version --client
```

## Import configuration

In order for kubectl to find and access the Kubernetes cluster, the kubeconfig configuration file is required, which is automatically created when the cluster is created and downloaded to the local computer from the VK CS panel. To import the \*.yaml configuration file, you need to run the command:

<tabs>
<tablist>
<tab>Linux, macOS</tab>
<tab>Windows (PowerShell)</tab>
</tablist>
<tabpanel>

```bash
export KUBECONFIG=$KUBECONFIG:$HOME/.kube/config
```

</tabpanel>
<tabpanel>

```powershell
$Env:KUBECONFIG="$Env:KUBECONFIG;$HOME\.kube\config"
```

</tabpanel>
</tabs>

## Cluster connection

You can look at the state of the cluster to make sure that kubectl is configured correctly using the command:

```bash
 kubectl cluster-info
```

If, as a result of the command execution, the URL response is visible, then kubectl is correctly configured to work with the cluster.

If the following message appears, it means that kubectl is configured incorrectly or cannot connect to the Kubernetes cluster:

```bash
 The connection to the server <server-name: port> was refused - did you specify the right host or port?
```

If the kubectl cluster-info command returns a URL response but fails to connect to your cluster, use the command:

```bash
 kubectl cluster-info dump
```

Alternatively, you can connect to the cluster using Kubernetes Dashboard using the [following instruction](https://mcs.mail.ru/help/en_US/k8s-start/k8s-dashboard).
