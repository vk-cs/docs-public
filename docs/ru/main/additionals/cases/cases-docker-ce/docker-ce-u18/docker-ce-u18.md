[Docker CE](https://docs.docker.com/get-started/overview/) (Community Edition) – это платформа для работы с контейнеризованными приложениями. Такие приложения поставляются в виде контейнеров, которые содержат в себе все необходимое для работы приложения. Это позволяет быстро собирать, разворачивать и отлаживать приложения.

Контейнеры похожи на виртуальные машины, но более легковесны. Для изоляции ресурсов контейнеризованного приложения контейнеры используют средства операционной системы, на которой они запущены.

Вы можете установить Docker CE как вручную, пользуясь этой инструкцией, так и из [магазина приложений](/ru/main/additionals/mp/mp-apps/mp-docker-ce) в виде преднастроенной виртуальной машины с Ubuntu 18.04.

## Перед установкой

Убедитесь, что:

- У вас есть доступ к терминалу хоста с Ubuntu 18.04, на который планируется установить Docker CE.
- Вы можете использовать `sudo` на этом хосте, чтобы выполнять команды от имени суперпользователя (`root`).

## Установите Docker CE

1. Подключитесь к терминалу.

   Все дальнейшие действия выполняются в этом терминале.

1. Установите пакеты, необходимые для дальнейшей установки:

   ```bash
   sudo apt update && \
   sudo apt install -y \
     apt-transport-https \
     ca-certificates \
     curl \
     software-properties-common
   ```

1. Добавьте GPG-ключ репозитория Docker в хранилище ключей:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

1. Убедитесь, что GPG-ключ был добавлен успешно:

   ```bash
   apt-key list
   ```

   В выводе команды должна содержаться информация о GPG-ключе репозитория Docker.

   <details>
   <summary>Пример вывода</summary>

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

1. Подключите репозиторий Docker:

   ```bash
   sudo add-apt-repository -u "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
   ```

1. Убедитесь, что репозиторий был подключен успешно:

   ```bash
   apt-cache policy docker-ce
   ```

   В выводе команды должна содержаться информация о доступных для установки версиях пакета `docker-ce`.

   <details>
   <summary>Пример вывода</summary>

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

1. Установите Docker CE:

   ```bash
   sudo apt install docker-ce -y
   ```

## Проверьте корректность установки

1. Подключитесь к терминалу.

   Все дальнейшие действия выполняются в этом терминале.

1. Убедитесь, что Docker CE установлен и запущен:

   ```bash
   sudo systemctl status docker --no-pager -l
   ```

   В выводе команды должна содержаться информация о том, что сервис находится в состоянии `active (running)`.

   <details>
   <summary>Пример вывода</summary>

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

1. Посмотрите общую информацию об установленном Docker CE:

   ```bash
   sudo docker info
   ```

   <details>
   <summary>Пример вывода</summary>

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

1. Запустите тестовый контейнер `hello-world`:

   ```bash
   sudo docker run --rm hello-world
   ```

   Контейнер выведет приветственное сообщение и завершит работу.

   <details>
   <summary>Пример вывода</summary>

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
