На каждом узле кластера можно настроить локальный кеширующий DNS-сервер на базе CoreDNS. Такая схема также известна как NodeLocal DNS. Это позволит повысить стабильность и производительность сервиса DNS в кластере, не меняя уже существующих приложений.

## Обзор архитектуры DNS в кластере

Пусть некоторый [под](../../k8s-reference/pods) инициирует DNS-запрос.

- Без использования кеширующих DNS-серверов произойдет следующее:

  1. DNS-запрос будет отправлен на IP-адрес сервиса `kube-dns` кластера.
  1. Этот IP-адрес будет транслирован `kube-proxy` в IP-адрес эндпоинта `kube-dns` с помощью правил `iptables`. При этом `iptables` использует `conntrack` для отслеживания соединений.
  1. При получении ответа от `kubedns` будет выполнен обратный процесс.
  
  Если DNS-запросы преимущественно отправляются по протоколу UDP, то высокая нагрузка на `kube-dns` (например, если какое-либо приложение активно отправляет DNS-запросы) может привести к проблемам:
  
  - Состояние гонки (racing condition) для `conntrack`. В результате существенно (до нескольких раз) замедляется получение ответов на DNS-запросы.
  - Переполнение служебных таблиц для `conntrack`. Записи для UDP удаляются из них только по таймауту (по умолчанию — 30 секунд). При переполнении таблиц новые DNS-запросы, отправленные по UDP, будут отбрасываться.

- При использовании кеширующих DNS-серверов произойдет следующее:

  1. Поды будут обращаться к локальному кеширующему DNS-серверу, который расположен на том же узле, что и поды.

     Это позволит избежать трансляции адресов (Dynamic NAT, DNAT), использования `iptables` и `conntrack`. Описанные выше проблемы будут сняты.

  1. Сам кеширующий DNS-сервер будет обращаться к сервису `kube-dns`, используя `iptables` и `conntrack`, но уже по протоколу TCP.

     В этом случае нагрузка на `kube-dns` снижается, поскольку к нему обращается напрямую ограниченное количество DNS-серверов, а не все сервисы кластера, требующие DNS для своей работы. Кроме того, при использовании TCP снижается задержка (latency), связанная с потерей UDP-пакетов и таймаутами.

Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/).

## 1. Подготовительные шаги

1. [Создайте](../../operations/create-cluster) кластер Kubernetes самой актуальной версии.

   Параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

## 2. Разверните кеширующий DNS-сервер на каждом узле

DNS-сервер будет развернут в следующей конфигурации:

- Тип развертывания: DaemonSet, чтобы сервер был доступен на всех узлах кластера.
- IP-адреса, которые слушает сервер:
  - Локальный IP-адрес `169.254.0.10` на каждом узле. Такой link-local-адрес выбран специально, чтобы не было пересечений с адресами из других подсетей, используемых кластером.
  - IP-адрес сервиса `kube-dns`. В кластерах Kubernetes VK Cloud это всегда `10.254.0.10`.

  Такая конфигурация используется, потому что `kube-proxy` в кластерах Kubernetes VK Cloud [работает](../../concepts/addons-and-settings/settings#rezhim_raboty_kube_proxy) в режиме `iptables`.

- Порт, к которому будет обращаться Prometheus для сбора метрик: `9153`.
- Метка для выбора сервиса: `kube-dns`: `coredns`.
- Домен кластера: `cluster.local`.

Подробнее о конфигурациях и настройке в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/#configuration).

Чтобы развернуть DNS-сервер:

1. Создайте файл манифеста для NodeLocal DNS:

   <details>
   <summary markdown="span">nodelocaldns.yaml</summary>

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

   </details>

   Этот файл создан на основе [манифеста из официального репозитория Kubernetes](https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml) с учетом конфигурации, приведенной выше.

1. Создайте нужные для работы NodeLocal DNS ресурсы Kubernetes на основе манифеста:

   ```yaml
   kubectl apply -f nodelocaldns.yaml
   ```

   Должна быть выведена следующая информация о созданных ресурсах:

   ```text
   serviceaccount/node-local-dns created
   service/kube-dns-upstream created
   configmap/node-local-dns created
   daemonset.apps/node-local-dns created
   service/node-local-dns created
   ```

## 3. Проверьте работу кеширующего DNS-сервера

1. Создайте [под, включающий в себя утилиты для работы с DNS](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/):

   ```bash
   kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml
   ```

1. Убедитесь, что под успешно создан, выполнив команду:

   ```bash
   kubectl get pod dnsutils
   ```

   Должна быть выведена следующая информация:

   ```text
   NAME       READY   STATUS    RESTARTS    AGE
   dnsutils   1/1     Running   ...         ...
   ```

1. Подключитесь к bash-сессии внутри этого пода:

   ```bash
   kubectl exec -it dnsutils -- bash
   ```

1. Проверьте, что DNS-запросы успешно выполняются:

   <tabs>
   <tablist>
   <tab>Без указания DNS-сервера</tab>
   <tab>С явным указанием DNS-сервера</tab>
   </tablist>
   <tabpanel>

   ```bash
   nslookup mcs.mail.ru && \
   nslookup kubernetes.default
   ```

   Должна быть выведена похожая информация:

   ```text
   Server:         10.254.0.10
   Address:        10.254.0.10#53
   
   Non-authoritative answer:
   Name:   mcs.mail.ru
   Address: 95.163.254.194
   Name:   mcs.mail.ru
   Address: 95.163.254.192
   Name:   mcs.mail.ru
   Address: 95.163.254.193
   
   Server:         10.254.0.10
   Address:        10.254.0.10#53
   
   Name:   kubernetes.default.svc.cluster.local
   Address: 10.254.0.1
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   nslookup mcs.mail.ru 169.254.0.10 && \
   nslookup kubernetes.default 169.254.0.10
   ```

   Должна быть выведена похожая информация:

   ```text
   Server:         169.254.0.10
   Address:        169.254.0.10#53
   
   Non-authoritative answer:
   Name:   mcs.mail.ru
   Address: 95.163.254.192
   Name:   mcs.mail.ru
   Address: 95.163.254.193
   Name:   mcs.mail.ru
   Address: 95.163.254.194
   
   Server:         169.254.0.10
   Address:        169.254.0.10#53
   
   Name:   kubernetes.default.svc.cluster.local
   Address: 10.254.0.1
   ```

   </tabpanel>
   </tabs>

1. Завершите bash-сессию в поде `dnsutils`:

   ```bash
   exit
   ```

## Проконтролируйте использование ресурсов

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete -f https://k8s.io/examples/admin/dns/dnsutils.yaml
   kubectl  -f nodelocaldns.yaml

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f https://k8s.io/examples/admin/dns/dnsutils.yaml; `
   kubectl  -f nodelocaldns.yaml
   ```

   </tabpanel>
   </tabs>

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../operations/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../operations/manage-cluster#udalit_klaster) его навсегда.
