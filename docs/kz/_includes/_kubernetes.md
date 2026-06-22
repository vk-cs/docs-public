## {counter(kuber_level_1)[id=create_cluster]}. Кластерді жасаңыз және баптаңыз

### {const(create_cluster)}.{counter(kuber_level_2)}. Кластерді жасаңыз

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Кластер орналастырылатын [жобаны](../../../tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Контейнерлер** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Егер таңдалған жобада әлі бірде-бір кластер болмаса, **Кластер жасау** түймесін басыңыз. Әйтпесе **Қосу** түймесін басыңыз.
1. **Новое поколение** опциясын таңдап, **Жалғастыру** түймесін басыңыз.

1. **Конфигурация** блогында қолжетімді нұсқалардың ішінен Kubernetes-тің соңғы нұсқасын таңдаңыз.
1. **Мастер узлы** блогындағы **Баптау** түймесін басып, мыналарды орнатыңыз:

    1. **Кластер атауы:** мысалы, `vk-cloud-k8s-quickstart`.
    1. **Кластер түрі:** `Стандартный`.
    1. **Қолжетімділік аймағы:** `Москва (MS1)`.

       {note:info}

       Кластерде ресурстарды жасау және баптау үшін конфигурациялық файлдар дәл осы аймақты пайдалануға есептелген.

       Басқа аймақты таңдасаңыз, конфигурациялық файлдарды түзетіңіз.

       {/note}
    1. Қалған баптауларды өзгеріссіз қалдырыңыз.
   
1. **Желі және баптаулар** блогындағы **Баптау** түймесін басып, мыналарды орнатыңыз:

    1. **Желі:** `Жаңа желі жасау`.
    1. **Сыртқы IP тағайындау:** осы опцияның таңдалғанына көз жеткізіңіз.
    1. Қалған баптауларды өзгеріссіз қалдырыңыз.
   
1. **Торап топтары** блогындағы **Баптау** түймесін басып, мыналарды орнатыңыз:

    1. **Node-тораптар түрі:** `STD3-4-4`.
    1. **Қолжетімділік аймағы:** `Москва (MS1)`.

        {note:info}

        Кластерде ресурстарды жасау және баптау үшін конфигурациялық файлдар дәл осы аймақты пайдалануға есептелген.

        Басқа аймақты таңдасаңыз, конфигурациялық файлдарды түзетіңіз.

        {/note}

    1. Қалған баптауларды өзгеріссіз қалдырыңыз.
   
1. **Жасау** түймесін басыңыз.

Кластерді жасау аяқталғанша күтіңіз, бұл процесс ұзақ уақыт алуы мүмкін.

### {const(create_cluster)}.{counter(kuber_level_2)}. Кластерге аддондарды орнатыңыз

{note:warn}

Docker Registry және Ingress NGINX аддондарын орнату кезінде олар үшін [стандартты жүктеме теңгергіштері](/kz/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki) жасалады.

Теңгергіштерді пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

{/note}

1. `docker-registry` [аддонын орнатыңыз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-registry).

   Docker тізіліміне қол жеткізу деректерін жазып алыңыз.

1. `kube-prometheus-stack` [аддонын орнатыңыз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring).

   Grafana веб-интерфейсіне қол жеткізу құпиясөзін жазып алыңыз.

1. `ingress-nginx` [аддонын](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-ingress) әдепкі параметрлермен орнатыңыз.

   Жүктеме теңгергішіне арналған Floating IP-мекенжайды жазып алыңыз.

Одан әрі командалар мен конфигурациялық файлдарда мысал ретінде келесі мәндер пайдаланылады. Оларды өзіңіз үшін өзекті мәндермен ауыстырыңыз.

| Параметр                                                    | Мәні                       |
| ----------------------------------------------------------- | -------------------------- |
| Ingress-контроллерге арналған<br>жүктеме теңгергішінің IP-мекенжайы | `192.0.2.2`                |
| Docker тізілімінің эндпоинт URL-і                           | `192.0.2.22:5000`          |
| Docker тізілімі пайдаланушысының логині                     | `registry`                 |
| Docker тізілімі пайдаланушысының құпиясөзі                  | `registry-password-123456` |
| Grafana үшін `admin` пайдаланушысының құпиясөзі             | `grafana-password-123456`  |

### {const(create_cluster)}.{counter(kuber_level_2)}. Кластермен жұмыс істеуге арналған ортаны баптаңыз

Кластермен жұмыс істейтін хостты баптаңыз.
Бұл нақты компьютер де, виртуалды машина да болуы мүмкін.

Хостқа келесі құралдарды орнатыңыз:

- Браузер.
- `kubectl` утилитасы. Толығырақ [kubectl көмегімен кластерге қосылу](/kz/kubernetes/k8s/connect/kubectl#podgotovitelnye_shagi) бөлімінде және [ресми құжаттамада](https://kubernetes.io/docs/tasks/tools/#kubectl).

  {note:warn}

  Кластер нұсқасымен бірдей немесе одан екі жаққа бір минорлық нұсқаға ғана ерекшеленетін `kubectl` нұсқасын жүктеңіз.

  Мысалы, 1.32.1 нұсқалы кластер үшін 1.31, 1.32 және 1.33 нұсқалы `kubectl` жарайды.

  {/note}

- `client-keystone-auth` утилитасы. Толығырақ [kubectl көмегімен кластерге қосылу](/kz/kubernetes/k8s/connect/kubectl) бөлімінде.
- [curl](https://curl.se/download.html) утилитасы.
- [Docker Engine](https://docs.docker.com/engine/install/):
    - Windows және macOS үшін: Docker Desktop.
    - Linux үшін де Docker Desktop ұсынылады, алайда Docker-ді пәрмен жолынан орнатып, пайдалана аласыз.

## {counter(kuber_level_1)}. Кластерге қосылыңыз

1. Жеке кабинетте кластерге қосылу орындалатын пайдаланушы үшін **Администратор Kubernetes** рөлін қосыңыз:

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
    1. Бұрын жасалған кластер орналасқан жобаны таңдаңыз.
    1. **Қолжетімділіктерді басқару** бөліміне өтіңіз.
    1. Қажетті пайдаланушы үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Өңдеу** тармағын таңдаңыз.
    1. Ашылмалы тізімнен **Администратор Kubernetes** рөлін таңдаңыз.
    1. Өзгерістерді сақтаңыз.

1. Осы пайдаланушы үшін [API арқылы қолжетімділікті белсендіріңіз](/kz/tools-for-using-services/api/rest-api/enable-api#aktivaciya_dostupa_po_api).

1. [VK Cloud жеке кабинетінде](https://kz.cloud.vk.com/app/) кластер үшін kubeconfig алыңыз:

    1. **Кластеры Kubernetes** → **Кластеры Kubernetes** бөліміне өтіңіз.
    1. Қажетті кластер үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Кластерге қол жеткізу үшін Kubeconfig алу** тармағын таңдаңыз.

1. `kubectl` пайдалану кезінде қосымша аргументтерді көрсетпеу үшін kubeconfig-ті `~/.kube` директориясына жылжытыңыз.

   Төмендегі командаларда kubeconfig `~/Downloads` директориясына `mycluster_kubeconfig.yaml` атауымен жүктелген деп есептеледі.

   {tabs}

   {tab(Linux/macOS)}

   ```console
   mkdir ~/.kube && \
   mv ~/Downloads/mycluster_kubeconfig.yaml ~/.kube/config
   ```

   {/tab}

   {tab(Windows)}

   ```console
   mkdir ~/.kube; `
   mv ~/Downloads/mycluster_kubeconfig.yaml ~/.kube/config
   ```

   {/tab}

   {/tabs}

1. kubeconfig-ке жолды `$KUBECONFIG` орта айнымалысында көрсетіңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   export KUBECONFIG=/home/user/.kube/mycluster_kubeconfig.yaml
   ```

   {/tab}

   {tab(Windows)}

   ```console
   $env:KUBECONFIG = 'C:\Users\user\.kube\mycluster_kubeconfig.yaml'
   ```

   {/tab}

   {/tabs}

1. `kubectl` кластерге қосыла алатынын тексеріңіз:

    1. Команданы орындаңыз:

       ```console
       kubectl cluster-info
       ```

    1. VK Cloud жеке кабинетінің пайдаланушы құпиясөзін енгізіңіз.

   Егер кластер қалыпты жұмыс істесе және `kubectl` онымен жұмыс істеуге бапталған болса, мынаған ұқсас ақпарат шығарылады:

   ```text
   Kubernetes control plane is running at...
   CoreDNS is running at...

   To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
   ```

## {counter(kuber_level_1)}. Кластер мониторингі құралдарына қол жеткізіңіз

Кластерде Prometheus және Grafana негізіндегі [мониторинг құралдары](/kz/kubernetes/k8s/monitoring) бар аддон орнатылды.

1. Терминалдың бөлек сессиясында команданы орындаңыз:

   ```console
   kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
   ```

   {note:warn}

    - Бұл сессияны жаппаңыз, әйтпесе Grafana веб-интерфейсіне қол жеткізу жоғалады.
    - Егер `8001` портын басқа қолданба пайдаланып жатса, бос портты көрсетіп, команданы түзетіңіз.

   {/note}

1. Grafana веб-интерфейсін ашыңыз:

    1. Браузерде `http://127.0.0.1:8001/` URL-іне өтіңіз.
    1. `admin`/`grafana-password-123456` логин/құпиясөз жұбы арқылы авторизациядан өтіңіз.
    1. Егер құпиясөзді ауыстыру сұралса, оны ауыстырыңыз.

1. Кластер ресурстары туралы ақпарат алу үшін бүйірлік мәзірден кез келген алдын ала бапталған дашбордты **Dashboards → Browse** таңдаңыз.

## {heading({counter(kuber_level_1)}. Қажетті образдарды Docker тізіліміне жүктеңіз)[id=k8s-quick-start-upload-to-registry]}

Кластерде Docker-образдар сақталатын [Docker тізілімі](/kz/kubernetes/k8s/connect/docker-registry) аддоны орнатылды.

{note:info}

Кластер мүмкіндіктерін барынша толық көрсету үшін бұдан әрі NGINX веб-сервері бар арнайы Docker-образ жиналады.
Образ NGINX-тен алынған [демо-образдың](https://github.com/nginxinc/NGINX-Demos/tree/master/nginx-hello-nonroot) plaintext-нұсқасына негізделген.

{/note}

Өз образдарыңызды Docker тізіліміне орналастыру үшін:

1. Docker тізілімін сенімді тізілімдер тізіміне қосыңыз:

    1. Docker `daemon.json` конфигурациялық файлына Docker тізілімі эндпоинтінің URL-і бар келесі параметрді қосыңыз:

       ```json
       {
         ...
 
         "insecure-registries": [
           "192.0.2.22:5000"
         ],
 
         ...
       }
       ```

       Бұл файлдың әртүрлі Docker Engine орнатылымдары үшін орналасуы [Docker ресми құжаттамасында](https://docs.docker.com/config/daemon/#configure-the-docker-daemon) келтірілген.

    1. Docker Engine-ді қайта іске қосыңыз.

       {tabs}

       {tab(Linux)}

       Келесі әрекеттердің бірін орындаңыз:

        - Қайта іске қосу үшін командалардың бірін пайдаланыңыз:

          ```console
          sudo systemd restart docker
          ```

          ```console
          sudo service docker restart
          ```

        - Егер орнатылған болса, Docker Desktop графикалық интерфейсінен [Docker Engine-ді қайта іске қосыңыз](https://docs.docker.com/desktop/settings/linux/#docker-engine).

       {/tab}

       {tab(Windows)}

       Docker Desktop графикалық интерфейсінен [Docker Engine-ді қайта іске қосыңыз](https://docs.docker.com/desktop/settings/windows/#docker-engine).

       {/tab}

       {tab(macOS)}

       Docker Desktop графикалық интерфейсінен [Docker Engine-ді қайта іске қосыңыз](https://docs.docker.com/desktop/settings/mac/#docker-engine).

       {/tab}

       {/tabs}

1. Docker-образды жинаңыз:

    1. Файлдарға арналған директорияны жасап, оған өтіңіз:

       {tabs}

       {tab(Linux/macOS)}

       ```console
       mkdir ~/image-build && cd ~/image-build
       ```

       {/tab}

       {tab(Windows)}

       ```console
       mkdir ~/image-build; cd ~/image-build
       ```

       {/tab}

       {/tabs}

    1. Осы директорияға келесі файлдарды орналастырыңыз:

       {cut(Dockerfile)}

       ```ini
       FROM nginx:mainline-alpine
 
       RUN chmod -R a+w /var/cache/nginx/ \
               && touch /var/run/nginx.pid \
               && chmod a+w /var/run/nginx.pid \
               && rm /etc/nginx/conf.d/*
 
       COPY nginx-config.conf /etc/nginx/conf.d/
       USER nginx
       ```

       {/cut}

       {cut(nginx-config.conf)}

       ```ini
       server {
           listen 8080;
 
           location / {
 
               set $k8s_pv "not present";
 
               if (-d /etc/nginx/k8s_demo_pv/) {
                 set $k8s_pv "present";
               }
 
               default_type text/plain;
               expires -1;
               return 200 'Server address: $server_addr:$server_port\nServer name: $hostname\nDate: $time_local\nURI: $request_uri\nRequest ID: $request_id\nRemote address (NGINX Ingress Controller): $remote_addr\nX-Forwarded-For (Request source): $http_x_forwarded_for\n\nK8S Persistent Volume status: $k8s_pv\n';
           }
       }
       ```

       {/cut}

    1. Образды жинауды іске қосыңыз:

       ```console
       docker build . -t 192.0.2.22:5000/nginx-k8s-demo:latest
       ```

   Образды жинаудың аяқталуын күтіңіз.

1. Жиналған образды Docker тізіліміне орналастырыңыз:

    1. Тізілімге кіріңіз:

       ```console
       docker login 192.0.2.22:5000 --username registry --password registry-password-123456
       ```

    1. Образды пуштаңыз:

       ```console
       docker push 192.0.2.22:5000/nginx-k8s-demo:latest
       ```

    1. Образдың тізілімде бар екенін тексеріңіз:

       ```console
       curl -k -X GET -u registry:registry-password-123456 https://192.0.2.22:5000/v2/_catalog
       ```

       Мынаған ұқсас ақпарат шығуы тиіс:

       ```text
       {"repositories":["nginx-k8s-demo"]}
       ```

    1. Kubernetes-тен жүктелген образға қол жеткізу үшін Kubernetes құпиясын жасаңыз:

       ```console
       kubectl create secret docker-registry k8s-registry-creds --docker-server=192.0.2.22:5000 --docker-username=registry --docker-password=registry-password-123456
       ```

## {counter(kuber_level_1)}. Демо-қосымшаларды жайылдырыңыз

Docker тізіліміне жүктелген `nginx-k8s-demo` образы негізінде `tea` және `coffee` атты екі қосымша жайылдырылады.
Әрбір қосымша үшін мыналар жасалады:

- Деректер томдарын қосымша ішіне монтирлеу үшін [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), онда мыналар беріледі:
    - Реплика саны.
    - Подқа монтирлеуге арналған том.
- Қосымшаға қолжетімділікті қамтамасыз ету үшін [Service](https://kubernetes.io/docs/concepts/services-networking/service/). Кейіннен Ingress-контроллер кіріс сұрауларын осы Service-ке қайта жібереді.

Қосымшаларды жайылдыру үшін:

1. Файлдарға арналған директорияны жасап, оған өтіңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   mkdir ~/k8s-deployments && cd ~/k8s-deployments
   ```

   {/tab}

   {tab(Windows)}

   ```console
   mkdir ~/k8s-deployments; cd ~/k8s-deployments
   ```

   {/tab}

   {/tabs}

1. Осы директорияға келесі файлдарды орналастырыңыз:

   {cut(deploy-coffee.yaml)}

   ```yaml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-coffee
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         volumes:
           - name: k8s-pv-coffee
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-coffee
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: coffee
             image: 192.0.2.22:5000/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-coffee
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```

   {/cut}

   {cut(deploy-tea.yaml)}

   ```yaml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-tea
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: k8s-pv-tea
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-tea
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: tea
             image: 192.0.2.22:5000/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-tea
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   {/cut}

   {note:warn}

   `deploy-coffee.yaml` және `deploy-tea.yaml` конфигурациялық файлдарында Persistent Volume Claim үшін қосымшалар жайылдырылады деп жоспарланған тораптың қолжетімділік аймағына (MS1) сәйкес келетін сақтау класы көрсетілетініне назар аударыңыз.

   Бір қолжетімділік аймағындағы торапқа басқа қолжетімділік аймағындағы том монтирленген қолданбаны орналастыру әрекеті сәтсіз аяқталады.

   {/note}

1. Қосымшаларды жайылдырыңыз:

   ```console
   kubectl apply -f deploy-coffee.yaml -f deploy-tea.yaml
   ```

1. Жайылдырудың дұрыстығын тексеріңіз:

   {tabs}

   {tab(Тұрақты томдар)}

   Тәсілдердің бірін пайдаланыңыз:

    - `kubectl`: команданы орындаңыз.

      ```console
      kubectl get pv
      ```

    - Grafana: **Kubernetes → Compute Resources → Persistent Volumes** дашбордын ашыңыз.

   `tea` және `coffee` deployments үшін Persistent Volume Claim арқылы жасалған көлемі 1 ГБ тұрақты томдардың бар екені туралы ақпарат көрінеді.

   {/tab}

   {tab(Жұмыс жүктемесі)}

   Тәсілдердің бірін пайдаланыңыз:

    - `kubectl`: команданы орындаңыз.

      ```console
      kubectl get deployment
      ```

    - Grafana: **Kubernetes → Compute Resources → Namespace (Workloads)** дашбордын ашыңыз.
   
   Үш подтан тұратын `coffee` deployment және екі подтан тұратын `tea` deployment бар екені туралы ақпарат көрінеді.

   {/tab}

   {tab(Сервистер)}

   Тәсілдердің бірін пайдаланыңыз:

   `kubectl`-де команданы орындаңыз:

      ```console
      kubectl get svc
      ```

   `ClusterIP` түріндегі `coffee-svc` және `tea-svc` атты екі сервис бар екені туралы ақпарат көрінеді.

   {/tab}

   {/tabs}

## {counter(kuber_level_1)}. Демо-қосымшалар үшін Ingress баптаңыз

Кластерде пайдаланушылардың кіріс сұрауларын кластерде жайылдырылған қосымшаларға бағдарлауға мүмкіндік беретін NGINX [Ingress-контроллері](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) аддоны орнатылды.

Ingress-контроллер `tea` және `coffee` демо-қосымшалары жарияланған тиісті Service ресурстарына сұрауларды бағыттауы үшін:

1. `~/k8s-deployments` директориясына келесі файлды орналастырыңыз:

   {cut(deploy-ingress.yaml)}

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     rules:
       - host: cafe.example.com
         http:
           paths:
             - path: /tea
               pathType: Prefix
               backend:
                 service:
                   name: tea-svc
                   port:
                     number: 80
             - path: /coffee
               pathType: Prefix
               backend:
                 service:
                   name: coffee-svc
                   port:
                     number: 80
   ```

   {/cut}

1. [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) ресурсын жайылдырыңыз:

   ```console
   kubectl apply -f deploy-ingress.yaml
   ```

1. Команданы орындап, `kubectl` көмегімен жайылдырудың дұрыстығын тексеріңіз:

   ```console
   kubectl get ingress
   ```

   Жұмыс істеп тұрған Ingress ресурсының бар екені туралы ақпарат көрінеді.

## {counter(kuber_level_1)}. Кластерде жасалған барлық ресурстардың жұмысқа қабілеттілігін тексеріңіз

Мысалдың жұмысқа қабілеттілігін тексеру үшін `curl` көмегімен жүктеме теңгергішінің `192.0.2.2` IP-мекенжайына сұраулар орындаңыз. Теңгергішпен байланысқан Ingress-контроллер бұл сұрауларды кейін қажетті қосымшаларға жеткізеді.

Сұраулар:

{tabs}

{tab(tea қосымшасы үшін)}

```console
curl --resolve cafe.example.com:80:192.0.2.2 http://cafe.example.com/tea
```

Мынаған ұқсас ақпарат шығуы тиіс:

```text
Server address: 10.100.109.3:8080
Server name: tea-8697dc7b86-s5vgn
Date: 24/Aug/2022:09:27:34 +0000
URI: /tea
Request ID: ed83bd555afd25c103bfa05ee12cbfff
Remote address (NGINX Ingress Controller): <Ingress-контроллерінің IP-мекенжайы>
X-Forwarded-For (Request source): <сұрау орындалған хосттың IP-мекенжайы>

K8S Persistent Volume status: present
```

{/tab}

{tab(coffee қосымшасы үшін)}

```console
curl --resolve cafe.example.com:80:192.0.2.2 http://cafe.example.com/coffee
```

Мынаған ұқсас ақпарат шығуы тиіс:

```text
Server address: 10.100.109.0:8080
Server name: coffee-5f48899848-4q97z
Date: 24/Aug/2022:09:35:57 +0000
URI: /coffee
Request ID: 35e93a2538be8843c1c1fcd65b5aac4c
Remote address (NGINX Ingress Controller): <Ingress-контроллерінің IP-мекенжайы>
X-Forwarded-For (Request source): <сұрау орындалған хосттың IP-мекенжайы>

K8S Persistent Volume status: present
```

{/tab}

{/tabs}

Мұндай нәтиже мынаны көрсетеді:

1. Кластерлік Docker тізіліміндегі Docker-образдарды пайдаланатын қолданбаларды іске қосуға болады.
1. Persistent Volume Claim көмегімен VK Cloud сақтау орнын подтарға монтирлеуге болады.
1. Кластермен бірге берілетін Ingress-контроллер дұрыс бапталған, себебі ол сұрау көзіне тиесілі нақты IP-мекенжайды көрсетеді.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-quick-start-delete-resources]}

Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

- Кейінірек пайдалану үшін кластерді [тоқтатыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#zapustit_ili_ostanovit_klaster) немесе оны біржола [жойыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#delete_cluster).
- Жүктеме теңгергіштерін [жойыңыз](/kz/networks/balancing/instructions/manage-lb#udalenie_balansirovshchika_nagruzki).
