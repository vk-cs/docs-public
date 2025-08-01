Вы можете подключиться к реестру Docker, если в кластере установлен соответствующий [аддон](../../concepts/addons-and-settings/addons).

При [установке](../../instructions/addons/advanced-installation/install-advanced-registry) аддона для него создается стандартный балансировщик нагрузки с Floating IP-адресом. Поэтому к реестру Docker можно подключиться с любого хоста, имеющего доступ в интернет.

## Подготовительные шаги

1. [Убедитесь](../../instructions/addons/manage-addons#prosmotr_addonov), что аддон реестра Docker (`docker-registry`) установлен в кластере.
1. [Убедитесь](../kubectl#proverka_podklyucheniya_k_klasteru), что вы можете подключаться к кластеру с помощью `kubectl`.
1. [Получите данные](../../instructions/addons/advanced-installation/install-advanced-registry#podklyuchenie_k_reestru) для доступа к реестру Docker.

## Подключение к реестру Docker

На хосте, с которого планируется подключаться к реестру:

1. [Установите Docker Engine](https://docs.docker.com/engine/install/), если он еще не установлен. Доступны на выбор либо Docker Desktop, либо серверный вариант Docker Engine без графического интерфейса.

   Docker Engine должен быть установлен на хосте, с которого будет использоваться реестр. Дальнейшие шаги выполняйте на этом хосте.

1. Добавьте реестр Docker в список доверенных реестров:

   1. Добавьте в конфигурационный файл Docker `daemon.json` параметр `insecure-registries` с адресом эндпоинта реестра Docker.

      Адрес задается в формате `<URL реестра Docker>:<порт реестра Docker>`.

      ```json
      {
        ...

        "insecure-registries": [
          "192.0.2.2:5000"
        ],

        ...
      }
      ```

      Расположение этого файла для разных инсталляций Docker Engine приведено в [официальной документации Docker](https://docs.docker.com/config/daemon/#configure-the-docker-daemon).

   1. Перезапустите Docker Engine.

      {tabs}

      {tab(Linux)}

      - Для серверного варианта Docker Engine выполните одну из команд для перезапуска:

        ```console
        sudo systemd restart docker
        ```

        ```console
        sudo service docker restart
        ```

      - Для Docker Desktop воспользуйтесь [графическим интерфейсом](https://docs.docker.com/desktop/settings/linux/#docker-engine).

      {/tab}

      {tab(Windows)}

      Воспользуйтесь [графическим интерфейсом](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      {/tab}

      {tab(macOS)}

      Воспользуйтесь [графическим интерфейсом](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      {/tab}

      {/tabs}

1. Войдите в реестр:

   ```console
   docker login <URL реестра Docker> --username <логин для реестра Docker>
   ```

   Введите пароль для реестра Docker.

Теперь вы можете выполнять любые операции с реестром, например, пушить туда Docker-образы.

Подробнее о работе с реестром в [официальной документации Docker](https://docs.docker.com/desktop/).

## Использование реестра Docker в кластере Kubernetes

Чтобы разворачивать рабочие нагрузки (workloads) в кластере, используя образы из реестра Docker:

1. Создайте секрет `k8s-registry-creds`, содержащий в себе данные для доступа к реестру.

   Если не указывать параметр `--namespace`, то секрет будет создан в пространстве имен (namespace) по умолчанию (`default`).

   {note:warn}

   Секрет должен располагаться в том же пространстве имен, в котором планируется развернуть рабочую нагрузку.

   {/note}

   {tabs}

   {tab(Linux (bash) / macOS (zsh))}

   ```console
   kubectl create secret docker-registry k8s-registry-creds \ 
     --docker-server=<IP-адрес реестра>:5000 \
     --docker-username=<логин> \
     --docker-password=<пароль> \
     --namespace=<пространство имен>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl create secret docker-registry k8s-registry-creds ` 
     --docker-server=<IP-адрес реестра>:5000 `
     --docker-username=<логин> `
     --docker-password=<пароль> `
     --namespace=<пространство имен>
   ```

   {/tab}

   {/tabs}

1. Укажите в манифесте для рабочей нагрузки:

   - Имя созданного секрета в параметре `ìmagePullSecrets`.

   - Путь к образу из реестра в параметре `containers.image`.

     Путь задается в формате `<IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>`.

   Примеры манифестов:

   {tabs}

   {tab(Pod)}

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: my-app
   spec:
     imagePullSecrets:
     - name: k8s-registry-creds
     containers:
     - name: my-app
       image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   ```

   {/tab}

   {tab(Deployment)}

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   
   ```

   {/tab}

   {tab(ReplicaSet)}

   ```yaml
   apiVersion: apps/v1
   kind: ReplicaSet
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   ```

   {/tab}

   {tab(StatefulSet)}

   ```yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   ```

   {/tab}

   {tab(DaemonSet)}

   ```yaml
   apiVersion: apps/v1
   kind: DaemonSet
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   ```

   {/tab}

   {tab(Job)}

   ```yaml
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: my-app
   spec:
     template:
       spec:
         imagePullSecrets:
         - name: k8s-registry-creds
         containers:
         - name: my-app
           image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   ```

   {/tab}

   {tab(CronJob)}

   ```yaml
   apiVersion: batch/v1
   kind: CronJob
   metadata:
     name: my-app
   spec:
     jobTemplate:
       spec:
         template:
           spec:
             imagePullSecrets:
             - name: k8s-registry-creds
             containers:
             - name: my-app
               image: <IP-адрес реестра>:5000/<директория с образом>/<имя образа>:<тег>
   ```

   {/tab}

   {/tabs}
