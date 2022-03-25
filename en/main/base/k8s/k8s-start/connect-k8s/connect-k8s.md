Description
-----------

The Kubernetes command line tool kubectl lets you run commands against Kubernetes clusters. kubectl can be used to deploy applications, inspect and manage cluster resources, and view logs. A complete list of kubectl operations is available in the [official kubectl documentation](https://kubernetes.io/docs/reference/kubectl/overview/) .

Preparation for work
--------------------

The major version of kubectl used must not differ from the one used in the cluster. For example, version v1.19 can work with versions v1.16 and v1.15. Using the latest version of kubectl will help you avoid unexpected problems.

Installing kubectl
------------------

For Linux

**With curl**

Download the latest version:
```
 curl -LO https://storage.googleapis.com/kubernetes-release/release/\`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt\`/bin/linux/amd64/ kubectl
```

Make the kubectl binary executable:

```
 chmod + x ./kubectl
```

Move binary to directory from PATH environment variable:

```
 sudo mv ./kubectl / usr / local / bin / kubectl
```

Make sure the latest version is installed:

```
 kubectl version --client
```

**Using the package manager**

For Ubuntu, Debian and HypriotOS

```
 sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

For CentOS, RHEL and Fedora

```
 cat << EOF> /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name = Kubernetes
baseurl = https: //packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled = 1
gpgcheck = 1
repo_gpgcheck = 1
gpgkey = https: //packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
yum install -y kubectl
```

For macOS

**With curl**

Download the latest version:
```
 curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/ amd64 / kubectl "
```

Make the kubectl binary executable:

```
 chmod + x ./kubectl
```

Move binary to directory from PATH environment variable:

```
 sudo mv ./kubectl / usr / local / bin / kubectl
```

Make sure the latest version is installed:

```
 kubectl version --client 
```

**With Homebrew**

Run the install command:

```
 brew install kubectl
```

Or:

```
 brew install kubernetes-cli
```

Make sure the latest version is installed:

```
 kubectl version --client 
```

For Windows

**Using standard tools**

1.  Download the latest version v1.19.0 from the [link](https://storage.googleapis.com/kubernetes-release/release/v1.19.0/bin/windows/amd64/kubectl.exe) .
2.  Specify the directory with the binary file where the installation was made to the PATH environment variable: "Start-> This computer-> Properties-> Additional system settings-> Environment Variables-> System Variables-> PATH"
3.  Make sure the version of kubectl is the same as the one loaded:

```
 kubectl version --client 
```

**Note**

Docker Desktop for Windows adds its own version of kubectl to the PATH environment variable. If Docker Desktop is installed, you need to put the path to the installed binary before the entry added by the Docker Desktop installer, or remove the kubectl that comes with Docker Desktop altogether.

**Using PowerShell from PSGallery**

When using the Powershell Gallery package manager on Windows, you can install and update kubectl using Powershell.

Run installation commands (be sure to specify DownloadLocation):

```
 Install-Script -Name install-kubectl -Scope CurrentUser -Force
install-kubectl.ps1 [-DownloadLocation <path>] 
```

**Note**

If you do not specify DownloadLocation, then kubectl will be installed in the user's temporary directory.

The installer will create HOME / .kube along with a config file.

Make sure the latest version is installed:

```
 kubectl version --client 
```

**Note**

You can update kubectl by running the two commands listed in step 1.

Import configuration
--------------------

In order for kubectl to find and access the Kubernetes cluster, a kubeconfig configuration file is required, which is created automatically when the cluster is created and loaded to the local computer from the VK CS panel. The import of the configuration file \* .yaml is carried out using the command

```
 export KUBECONFIG = <path to file>
```

Cluster connection
------------------

You can look at the state of the cluster to make sure that kubectl is configured correctly using the command:

```
 kubectl cluster-info
```

If, as a result of the command execution, the URL response is visible, then kubectl is correctly configured to work with the cluster.

If the following message appears, it means that kubectl is configured incorrectly or cannot connect to the Kubernetes cluster:

```
 The connection to the server <server-name: port> was refused - did you specify the right host or port?
```

If the kubectl cluster-info command returns a URL response but fails to connect to your cluster, use the command:

```
 kubectl cluster-info dump
```

Alternatively, you can connect to the cluster using Kubernetes Dashboard using the [following instruction](https://mcs.mail.ru/help/en_US/k8s-start/k8s-dashboard) .