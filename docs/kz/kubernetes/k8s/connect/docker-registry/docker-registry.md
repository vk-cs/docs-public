# {heading(Docker реестріне қосылу)[id=k8s-docker-registry]}

{include(/kz/_includes/_translated_by_ai.md)}

Кластерде сәйкес {linkto(../../concepts/addons-and-settings/addons#k8s-addons)[text=аддон]} орнатылған болса, Docker реестріне қосыла аласыз.

Аддонды {linkto(../../instructions/addons/advanced-installation/install-advanced-registry#k8s-install-advanced-registry)[text=орнату кезінде]} ол үшін Floating IP-мекенжайы бар стандартты жүктеме теңгергіші жасалады. Сондықтан Docker реестріне интернетке қолжетімділігі бар кез келген хосттан қосылуға болады.

## {heading(Дайындық қадамдары)[id=k8s-docker-registry-before-work]}

1. Кластерде Docker реестрінің (`docker-registry`) аддоны орнатылғанына {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=көз жеткізіңіз]}.
1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../kubectl#k8s-kubectl-check-connection)[text=көз жеткізіңіз]}.
1. Docker реестріне қол жеткізу үшін {linkto(../../instructions/addons/advanced-installation/install-advanced-registry#k8s-install-advanced-registry-connect)[text=деректерді алыңыз]}.

## {heading(Docker реестріне қосылу)[id=k8s-docker-registry-connect]}

Реестрге қосылу жоспарланған хостта:

1. Егер Docker Engine әлі орнатылмаған болса, [Docker Engine орнатыңыз](https://docs.docker.com/engine/install/). Таңдау бойынша Docker Desktop немесе графикалық интерфейссіз Docker Engine серверлік нұсқасы қолжетімді.

   Docker Engine реестр қолданылатын хостта орнатылуы керек. Келесі қадамдарды осы хостта орындаңыз.

1. Docker реестрін сенімді реестрлер тізіміне қосыңыз:

   1. Docker конфигурациялық файлы `daemon.json` ішіне Docker реестрінің эндпоинт мекенжайы бар `insecure-registries` параметрін қосыңыз.

      Мекенжай `<IP_АДРЕС_РЕЕСТРА_DOCKER>:<ПОРТ_РЕЕСТРА_DOCKER>` форматында беріледі.

      ```json
      {
        ...

        "insecure-registries": [
          "192.0.2.2:5000"
        ],

        ...
      }
      ```

      Docker Engine-дің әртүрлі инсталляциялары үшін осы файлдың орналасуы [Docker ресми құжаттамасында](https://docs.docker.com/config/daemon/#configure-the-docker-daemon) берілген.

   1. Docker Engine-ді қайта іске қосыңыз.

      {tabs}

      {tab(Linux)}

      * Docker Engine серверлік нұсқасы үшін қайта іске қосу мақсатында келесі командалардың бірін орындаңыз:

        ```console
        sudo systemd restart docker
        ```

        ```console
        sudo service docker restart
        ```

      * Docker Desktop үшін [графикалық интерфейсті](https://docs.docker.com/desktop/settings/linux/#docker-engine) пайдаланыңыз.

      {/tab}

      {tab(Windows)}

      Docker Desktop-тың [графикалық интерфейсін](https://docs.docker.com/desktop/settings/mac/#docker-engine) пайдаланыңыз.

      {/tab}

      {tab(macOS)}

      Docker Desktop-тың [графикалық интерфейсін](https://docs.docker.com/desktop/settings/mac/#docker-engine) пайдаланыңыз.

      {/tab}

      {/tabs}

1. Реестрге кіріңіз:

   ```console
   docker login <IP_АДРЕС_РЕЕСТРА_DOCKER> --username <ЛОГИН_ДЛЯ_РЕЕСТРА_DOCKER>
   ```

   Docker реестрі үшін құпиясөзді енгізіңіз.

Енді сіз реестрмен кез келген операцияларды орындай аласыз, мысалы, оған Docker-образдарды push жасау.

Реестрмен жұмыс туралы толығырақ [Docker ресми құжаттамасында](https://docs.docker.com/desktop/).

## {heading(Kubernetes кластерінде Docker реестрін пайдалану)[id=k8s-docker-registry-using]}

Docker реестріндегі образдарды пайдаланып кластерде жұмыс жүктемелерін (workloads) жаю үшін:

1. Реестрге қол жеткізу деректерін қамтитын `k8s-registry-creds` құпиясын жасаңыз.

   Егер `--namespace` параметрі көрсетілмесе, құпия әдепкі (`default`) атаулар кеңістігінде (namespace) жасалады.

   {note:warn}

   Құпия жұмыс жүктемесін жаю жоспарланған сол атаулар кеңістігінде орналасуы керек.

   {/note}

   {tabs}

   {tab(Linux (bash) / macOS (zsh))}

   ```console
   kubectl create secret docker-registry k8s-registry-creds \ 
     --docker-server=<IP_АДРЕС_РЕЕСТРА_DOCKER>:5000 \
     --docker-username=<ЛОГИН> \
     --docker-password=<ПАРОЛЬ> \
     --namespace=<ПРОСТРАНСТВО_ИМЕН>
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl create secret docker-registry k8s-registry-creds ` 
     --docker-server=<IP_АДРЕС_РЕЕСТРА_DOCKER>:5000 `
     --docker-username=<ЛОГИН> `
     --docker-password=<ПАРОЛЬ> `
     --namespace=<ПРОСТРАНСТВО_ИМЕН>
   ```

   {/tab}

   {/tabs}

1. Жұмыс жүктемесінің манифестінде мыналарды көрсетіңіз:

   * `ìmagePullSecrets` параметрінде жасалған құпияның атауын.

   * `containers.image` параметрінде реестрдегі образға жолды.

     Жол `<IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>` форматында беріледі.

   Манифест мысалдары:

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
       image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>
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
           image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>

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
           image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>
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
           image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>
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
           image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>
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
           image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>
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
               image: <IP_АДРЕС_РЕЕСТРА_DOCKER>:5000/<ДИРЕКТОРИЯ_С_ОБРАЗОМ>/<ИМЯ_ОБРАЗА>:<ТЕГ>
   ```

   {/tab}

   {/tabs}
