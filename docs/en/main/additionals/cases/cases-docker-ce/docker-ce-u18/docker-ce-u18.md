[Docker CE](https://docs.docker.com/get-started/overview/) (Community Edition) is a platform that allows working with containerized applications. Such applications are shipped in the containers, which contain all the necessary resources for the applications to operate. This allows to quickly build, deploy, and debug applications.

Containers are similar to virtual machines, but more lightweight. To isolate containerized application's resources, containers rely on the operation system on which they are running.

You can install Docker CE either manually following this instruction, or from the [marketplace](https://mcs.mail.ru/app/en/services/marketplace/setup/docker/) as the preconfigured Ubuntu 18.04 virtual machine.

## Before you begin the installation

Make sure that:

- You have an access to the terminal of the Ubuntu 18.04 host, on which you are planning to install Docker CE.
- You can use `sudo` on that host to run the commands on behalf of superuser (`root`).

## Install Docker CE

1. Connect to the terminal.

   All further actions listed below are to be performed in this terminal.

1. Install the packages that are required for the further installation process:

   ```bash
   sudo apt update && \
   sudo apt install -y \
     apt-transport-https \
     ca-certificates \
     curl \
     software-properties-common
   ```

1. Add the Docker repository's GPG key to the keyring:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

1. Make sure that the GPG key was successfully added:

   ```bash
   apt-key list
   ```

   The command's output should contain the information about Docker repository's GPG key.

   <details>
   <summary>Example output</summary>

   ```text
   /etc/apt/trusted.gpg
   --------------------
   pub   rsa4096 2017-02-22 [SCEA]
         9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
   uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
   sub   rsa4096 2017-02-22 [S]
   
   ...
   ```

   </details>

1. Add the Docker repository:

   ```bash
   sudo add-apt-repository -u "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
   ```

1. Make sure that the repository was successfully added:

   ```bash
   apt-cache policy docker-ce
   ```

   The command's output should contain the information about the installation candidates for the `docker-ce` package.

   <details>
   <summary>Example output</summary>

   ```text
   docker-ce:
     Installed: (none)
     Candidate: 5:23.0.1-1~ubuntu.18.04~bionic
     Version table:
        5:23.0.1-1~ubuntu.18.04~bionic 500
           500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
        5:23.0.0-1~ubuntu.18.04~bionic 500
           500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
        5:20.10.23~3-0~ubuntu-bionic 500
           500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
        5:20.10.22~3-0~ubuntu-bionic 500
           500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
        5:20.10.21~3-0~ubuntu-bionic 500
           500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
        5:20.10.20~3-0~ubuntu-bionic 500
   
       ...
   ```

   </details>

1. Install Docker CE:

   ```bash
   sudo apt install docker-ce -y
   ```

## Check the correctness of the installation

1. Connect to the terminal.

   All further actions listed below are to be performed in this terminal.

1. Make sure that Docker CE is installed and running:

   ```bash
   sudo systemctl status docker --no-pager -l
   ```

   The command's output should contain the information that the service is in `active (running)` state.

   <details>
   <summary>Example output</summary>

   ```text
   ● docker.service - Docker Application Container Engine
      Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
      Active: active (running) since Thu 2023-03-23 10:32:23 UTC; 1min 59s ago
        Docs: https://docs.docker.com
    Main PID: 8981 (dockerd)
       Tasks: 7
      CGroup: /system.slice/docker.service
              └─8981 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
   
   Mar 23 10:32:20 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:20.707940356Z" level=info msg="[core] [Channel #4] Channel Connectivity change to READY" module=grpc
   Mar 23 10:32:22 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:22.407748502Z" level=info msg="Loading containers: start."
   Mar 23 10:32:22 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:22.569711943Z" level=info msg="Default bridge (docker0) is assigned with an IP address 172.17.0.0/16. Daemon option --bip can be used to set a preferred IP address"
   Mar 23 10:32:22 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:22.648337609Z" level=info msg="Loading containers: done."
   Mar 23 10:32:23 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:23.214584382Z" level=warning msg="WARNING: No swap limit support"
   Mar 23 10:32:23 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:23.215205554Z" level=info msg="Docker daemon" commit=bc3805a graphdriver=overlay2 version=23.0.1
   Mar 23 10:32:23 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:23.215556611Z" level=info msg="Daemon has completed initialization"
   Mar 23 10:32:23 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:23.343812634Z" level=info msg="[core] [Server #7] Server created" module=grpc
   Mar 23 10:32:23 ubuntu18 systemd[1]: Started Docker Application Container Engine.
   Mar 23 10:32:23 ubuntu18 dockerd[8981]: time="2023-03-23T10:32:23.360190638Z" level=info msg="API listen on /run/docker.sock"
   ```

   </details>

1. Get general information about the installed Docker CE:

   ```bash
   sudo docker info
   ```

   <details>
   <summary>Example output</summary>

   ```text
   Client:
    Context:    default
    Debug Mode: false
   
   Server:
    Containers: 0
     Running: 0
     Paused: 0
     Stopped: 0
    Images: 0
    Server Version: 23.0.1
    Storage Driver: overlay2
     Backing Filesystem: extfs
     Supports d_type: true
     Using metacopy: false
     Native Overlay Diff: true
     userxattr: false
    Logging Driver: json-file
    Cgroup Driver: cgroupfs
    Cgroup Version: 1
    Plugins:
     Volume: local
     Network: bridge host ipvlan macvlan null overlay
     Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
    Swarm: inactive
    Runtimes: io.containerd.runc.v2 runc
    Default Runtime: runc
    Init Binary: docker-init
    containerd version: 2456e983eb9e37e47538f59ea18f2043c9a73640
    runc version: v1.1.4-0-g5fd4c4d
    init version: de40ad0
    Security Options:
     apparmor
     seccomp
      Profile: builtin
    Kernel Version: 4.15.0-88-generic
    Operating System: Ubuntu 18.04.4 LTS
    OSType: linux
    Architecture: x86_64
    CPUs: 1
    Total Memory: 1.946GiB
    Name: ubuntu18
    ID: 999b21f9-7ff7-4fde-ac59-xxxxxxxxxxxx
    Docker Root Dir: /var/lib/docker
    Debug Mode: false
    Registry: https://index.docker.io/v1/
    Experimental: false
    Insecure Registries:
     127.0.0.0/8
    Live Restore Enabled: false
   
   WARNING: No swap limit support
   ```

   </details>

1. Run the `hello-world` test container:

   ```bash
   sudo docker run --rm hello-world
   ```

   The container will display a greeting message and terminate.

   <details>
   <summary>Example output</summary>

   ```text
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   
   To generate this message, Docker took the following steps:
    1. The Docker client contacted the Docker daemon.
    2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
       (amd64)
    3. The Docker daemon created a new container from that image which runs the
       executable that produces the output you are currently reading.
    4. The Docker daemon streamed that output to the Docker client, which sent it
       to your terminal.
   
   To try something more ambitious, you can run an Ubuntu container with:
    $ docker run -it ubuntu bash
   
   Share images, automate workflows, and more with a free Docker ID:
    https://hub.docker.com/
   
   For more examples and ideas, visit:
    https://docs.docker.com/get-started/
   ```

   </details>
