{include(/kz/_includes/_translated_by_ai.md)}

Кластердің әрбір торабында CoreDNS негізіндегі жергілікті кэштейтін DNS серверін баптауғал болады. Мұндай схема NodeLocal DNS деп те аталады. Бұл бұрыннан бар қолданбаларды өзгертпей-алқ кластердегі DNS сервисінің тұрақтылығы мен өнімділігін арттыруғал мүмкіндік береді.

## Кластердегі DNS архитектурасына шолу

Пусть кейбір [под](../../../reference/pods) инициирует DNS-запрос.

- Кэштейтін DNS серверлерін пайдаланбай, келесі жағдай орын алады:

  1. DNS сұрауы кластердің `kube-dns` сервисінің IP мекенжайына жіберіледі.
  1. Бұл IP мекенжай `iptables` ережелері көмегімен `kube-proxy` арқылы `kube-dns` эндпоинтының IP мекенжайына түрлендіріледі. Бұл ретте `iptables` қосылымдарды қадағалау үшін `conntrack` пайдаланады.
  1. `kubedns`-тен жауап алынған кезде кері процесс орындалады.
  
  Егер DNS сұраулары негізінен UDP протоколы арқылы жіберілсе, онда `kube-dns`-ке жоғары жүктеме (мысалы, қандай да бір қолданба DNS сұрауларын белсенді түрде жіберсе) мәселелерге әкелуі мүмкін:
  
  - `conntrack` үшін жарыс жағдайы (racing condition). Нәтижесінде DNS сұрауларына жауап алу айтарлықтай баяулайды (бірнеше есеге дейін).
  - `conntrack` үшін қызметтік кестелердің толып кетуі. UDP үшін жазбалар олардан тек тайм-аут бойынша жойылады (әдепкі бойынша — 30 секунд). Кестелер толып кеткен кезде UDP арқылы жіберілген жаңал DNS сұраулары тасталып кетеді.

- Кэштейтін DNS серверлерін пайдаланғанда келесі жағдай орын алады:

  1. Pod-тар pod-тармен бір торапта орналасқан жергілікті кэштейтін DNS серверіне жүгінеді.

     Бұл мекенжайларды трансляциялауды (Dynamic NAT, DNAT), `iptables` пен `conntrack` пайдалануды болдырмауғал мүмкіндік береді. Жоғарыда сипатталған мәселелер жойылады.

  1. Подтар өздерімен бір торапта орналасқан жергілікті кэштейтін DNS серверіне жүгінеді.

     Бұл мекенжайларды түрлендіруден (Dynamic NAT, DNAT), `iptables` пен `conntrack` пайдаланудан бас тартуғал мүмкіндік береді. Жоғарыда сипатталған мәселелер жойылады.

Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/).

## Дайындық қадамдары

1. Kubernetes кластерінің ең өзекті нұсқасын [жасаңыз](../../../instructions/create-cluster).

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызғал [көз жеткізіңіз](../../../connect/kubectl).

## 1. Әрбір торапта кэштейтін DNS серверін жазыңыз

DNS сервері келесі конфигурацияда жазылады:

- Жазу түрі: сервер кластердің барлық тораптарында қолжетімді болуы үшін DaemonSet.
- Сервер тыңдайтын IP мекенжайлар:
  - Әрбір тораптағы `169.254.0.10` жергілікті IP мекенжайы. Бұл link-local мекенжай кластер пайдаланатын басқал ішкі желілердегі мекенжайлармен қиылыспау үшін арнайы таңдалған.
  - `kube-dns` сервисінің IP мекенжайы. Cloud Containers кластерлерінде бұл әрқашан `10.254.0.10`.

  Мұндай конфигурация қолданылады, себебі `kube-proxy` в кластерах Cloud Containers [жұмыс істейтін](../../../concepts/addons-and-settings/settings#kube_proxy_zhumys_rezhimi) в режиме `iptables`.

- Prometheus метрикаларды жинау үшін жүгінетін порт: `9153`.
- Сервисті таңдау белгісі: `kube-dns`: `coredns`.
- Кластер домені: `cluster.local`.

Конфигурациялар мен баптау туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/#configuration).

DNS серверін жазу үшін:

1. NodeLocal DNS үшін манифест файлын жасаңыз:

   {cut(nodelocaldns.yaml)}

   ```yaml
   # Copyright 2018 The Kubernetes Authors.
   #
   # Licensed under the Apache License, Version 2.0 (the "License");
   # you may not use this file except in compliance with the License.
   # You may obtain a copy of the License at
   #
   #     http://www.apache.org/licenses/LICENSE-2.0
   #
   # Unless required by applicable law or agreed to in writing, software
   # distributed under the License is distributed on an "AS IS" BASIS,
   # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   # See the License for the specific language governing permissions and
   # limitations under the License.
   #
   
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: node-local-dns
     namespace: kube-system
     labels:
       kubernetes.io/cluster-service: "true"
       addonmanager.kubernetes.io/mode: Reconcile
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: kube-dns-upstream
     namespace: kube-system
     labels:
       k8s-app: coredns
       kubernetes.io/cluster-service: "true"
       addonmanager.kubernetes.io/mode: Reconcile
       kubernetes.io/name: "KubeDNSUpstream"
   spec:
     ports:
     - name: dns
       port: 53
       protocol: UDP
       targetPort: 53
     - name: dns-tcp
       port: 53
       protocol: TCP
       targetPort: 53
     selector:
       k8s-app: coredns
   ---
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: node-local-dns
     namespace: kube-system
     labels:
       addonmanager.kubernetes.io/mode: Reconcile
   data:
     Corefile: |
       cluster.local:53 {
           errors
           cache {
                   success 9984 30
                   denial 9984 5
           }
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__CLUSTER__DNS__ {
                   force_tcp
           }
           prometheus :9153
           health 169.254.0.10:8080
           }
       in-addr.arpa:53 {
           errors
           cache 30
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__CLUSTER__DNS__ {
                   force_tcp
           }
           prometheus :9153
           }
       ip6.arpa:53 {
           errors
           cache 30
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__CLUSTER__DNS__ {
                   force_tcp
           }
           prometheus :9153
           }
       .:53 {
           errors
           cache 30
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__UPSTREAM__SERVERS__
           prometheus :9153
           }
   ---
   apiVersion: apps/v1
   kind: DaemonSet
   metadata:
     name: node-local-dns
     namespace: kube-system
     labels:
       k8s-app: node-local-dns
       kubernetes.io/cluster-service: "true"
       addonmanager.kubernetes.io/mode: Reconcile
   spec:
     updateStrategy:
       rollingUpdate:
         maxUnavailable: 10%
     selector:
       matchLabels:
         k8s-app: node-local-dns
     template:
       metadata:
         labels:
           k8s-app: node-local-dns
         annotations:
           prometheus.io/port: "9153"
           prometheus.io/scrape: "true"
       spec:
         priorityClassName: system-node-critical
         serviceAccountName: node-local-dns
         hostNetwork: true
         dnsPolicy: Default  # Don't use cluster DNS.
         tolerations:
         - key: "CriticalAddonsOnly"
           operator: "Exists"
         - effect: "NoExecute"
           operator: "Exists"
         - effect: "NoSchedule"
           operator: "Exists"
         containers:
         - name: node-cache
           image: registry.k8s.io/dns/k8s-dns-node-cache:1.22.13
           resources:
             requests:
               cpu: 25m
               memory: 5Mi
           args: [ "-localip", "169.254.0.10,10.254.0.10", "-conf", "/etc/Corefile", "-upstreamsvc", "kube-dns-upstream" ]
           securityContext:
             capabilities:
               add:
               - NET_ADMIN
           ports:
           - containerPort: 53
             name: dns
             protocol: UDP
           - containerPort: 53
             name: dns-tcp
             protocol: TCP
           - containerPort: 9153
             name: metrics
             protocol: TCP
           livenessProbe:
             httpGet:
               host: 169.254.0.10
               path: /health
               port: 8080
             initialDelaySeconds: 60
             timeoutSeconds: 5
           volumeMounts:
           - mountPath: /run/xtables.lock
             name: xtables-lock
             readOnly: false
           - name: config-volume
             mountPath: /etc/coredns
           - name: kube-dns-config
             mountPath: /etc/kube-dns
         volumes:
         - name: xtables-lock
           hostPath:
             path: /run/xtables.lock
             type: FileOrCreate
         - name: kube-dns-config
           configMap:
             name: kube-dns
             optional: true
         - name: config-volume
           configMap:
             name: node-local-dns
             items:
               - key: Corefile
                 path: Corefile.base
   ---
   # A headless service is a service with a service IP but instead of load-balancing it will return the IPs of our associated Pods.
   # We use this to expose metrics to Prometheus.
   apiVersion: v1
   kind: Service
   metadata:
     annotations:
       prometheus.io/port: "9153"
       prometheus.io/scrape: "true"
     labels:
       k8s-app: node-local-dns
     name: node-local-dns
     namespace: kube-system
   spec:
     clusterIP: None
     ports:
       - name: metrics
         port: 9153
         targetPort: 9153
     selector:
       k8s-app: node-local-dns
   ```

   {/cut}

   Бұл файл жоғарыда келтірілген конфигурацияны ескере отырып, [Kubernetes ресми репозиторийіндегі манифест негізінде](https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml) жасалған.

1. NodeLocal DNS жұмысына қажетті Kubernetes ресурстарын манифест негізінде жасаңыз:

   ```yaml
   kubectl apply -f nodelocaldns.yaml
   ```

   Жасалған ресурстар туралы келесі алқпарат шығуы тиіс:

   ```text
   serviceaccount/node-local-dns created
   service/kube-dns-upstream created
   configmap/node-local-dns created
   daemonset.apps/node-local-dns created
   service/node-local-dns created
   ```

## 2. Кэштейтін DNS серверінің жұмысын тексеріңіз

1. [DNS-пен жұмыс істеуге арналған утилиталары бар pod жасаңыз](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/):

   ```console
   kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml
   ```

1. Команданы орындап, подтың сәтті жасалғанына көз жеткізіңіз:

   ```console
   kubectl get pod dnsutils
   ```

   Келесі алқпарат шығуы тиіс:

   ```text
   NAME       READY   STATUS    RESTARTS    AGE
   dnsutils   1/1     Running   ...         ...
   ```

1. Осы подтың ішіндегі bash-сессияғал қосылыңыз:

   ```console
   kubectl exec -it dnsutils -- bash
   ```

1. DNS сұрауларының сәтті орындалатынын тексеріңіз:

   {tabs}

   {tab(DNS серверін көрсетпей)}

   ```console
   nslookup cloud.vk.com && \
   nslookup kubernetes.default
   ```

   Мынаған ұқсас алқпарат шығуы тиіс:

   ```text
   Server:         10.254.0.10
   Address:        10.254.0.10#53
   
   Non-authoritative answer:
   Name:   cloud.vk.com
   Address: 95.163.254.194
   Name:   cloud.vk.com
   Address: 95.163.254.192
   Name:   cloud.vk.com
   Address: 95.163.254.193
   
   Server:         10.254.0.10
   Address:        10.254.0.10#53
   
   Name:   kubernetes.default.svc.cluster.local
   Address: 10.254.0.1
   ```

   {/tab}

   {tab(DNS серверін анық көрсетіп)}

   ```console
   nslookup cloud.vk.com 169.254.0.10 && \
   nslookup kubernetes.default 169.254.0.10
   ```

   Мынаған ұқсас алқпарат шығуы тиіс:

   ```text
   Server:         169.254.0.10
   Address:        169.254.0.10#53
   
   Non-authoritative answer:
   Name:   cloud.vk.com
   Address: 95.163.254.192
   Name:   cloud.vk.com
   Address: 95.163.254.193
   Name:   cloud.vk.com
   Address: 95.163.254.194
   
   Server:         169.254.0.10
   Address:        169.254.0.10#53
   
   Name:   kubernetes.default.svc.cluster.local
   Address: 10.254.0.1
   ```

   {/tab}

   {/tabs}

1. `dnsutils` подындағы bash-сессияны аяқтаңыз:

   ```console
   exit
   ```

## Пайдаланылмайтын ресурстарды жойыңыз

1. Жасалған подты және `nodelocaldns.yaml` манифестінде сипатталған ресурстарды жойыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete -f https://k8s.io/examples/admin/dns/dnsutils.yaml
   kubectl  -f nodelocaldns.yaml

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete -f https://k8s.io/examples/admin/dns/dnsutils.yaml; `
   kubectl  -f nodelocaldns.yaml
   ```

   {/tab}

   {/tabs}

1. Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - оны кейінірек пайдалану үшін [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu);
   - оны біржола [жойыңыз](../../../instructions/manage-cluster#delete_cluster).
