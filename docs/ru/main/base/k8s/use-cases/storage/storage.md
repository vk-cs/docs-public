Постоянные тома (persistent volumes) можно подключать к простым демо-приложениям различными способами. Далее для подключения будут использованы Persistent Volume Claims (PVC). Для проверки работоспособности приложений и подключенных к ним томов будет создан ресурс Ingress.

## 1. Подготовительные шаги

1. [Создайте](../../operations/create-cluster) кластер Kubernetes самой актуальной версии.

   При создании кластера:

   - Выберите опцию **Назначить внешний IP**.
   - Создайте одну группу узлов с типом виртуальной машины `Standard-2-8` в зоне доступности `MS1` с суммарными вычислительными ресурсами: 2 vCPU, 8 ГБ RAM (или можно выбрать более производительный тип). Это необходимо, чтобы можно было разместить все создаваемые далее объекты.

     Например, можно создать одну группу узлов с типом виртуальной машины `Standard-2-8`.

   Прочие параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../operations/addons/manage-addons#prosmotr-addonov), что аддон NGINX Ingress (`ingress-nginx`) [установлен](../../operations/addons/advanced-installation/install-advanced-ingress/) в кластере с параметрами по умолчанию. Он потребуется для обеспечения доступа к демо-приложениям.

    <warn>

    При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/main/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

    Использование балансировщика [тарифицируется](/ru/main/networks/vnet/tariffs).

    </warn>

1. [Убедитесь](../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

1. Установите [curl](https://curl.se/docs/), если утилита еще не установлена.

## 2. Создайте демо-приложения и подключите к ним постоянные тома

Далее будет продемонстрировано, как создать несколько веб-приложений на базе NGINX для отображения веб-страниц, записанных на подключенные к этим приложениям постоянные тома.
Используется образ NGINX `nginxdemos/nginx-hello`, который отображает веб-страницы из каталога `/usr/share/nginx/html`, поэтому все постоянные тома будут монтироваться в поды приложений именно по этому пути.

Можно создать одно или несколько демо-приложений, в зависимости от того, с какими способами подключения постоянных томов нужно познакомиться.

### Подключение блочных хранилищ

Блочные хранилища подключаются к кластеру [с помощью Cinder CSI](../../concepts/storage).

При использовании хранилищ такого типа:

- только один под может иметь доступ к хранилищу (несколько подов не смогут одновременно использовать блочное хранилище);
- как следствие, для доступа к хранилищу должен использоваться режим `ReadWriteOnce`.

<tabs>
<tablist>
<tab>Подключение с помощью статического PVC</tab>
<tab>Подключение с помощью динамического PVC</tab>
<tab>Подключение к нескольким подам с помощью динамического PVC</tab>
</tablist>
<tabpanel>

В этом примере будут созданы:

1. Диск в сервисе Облачные вычисления платформы VK Cloud.
1. Постоянный том, соответствующий этому диску.
1. Статический PVC, использующий уже созданный постоянный том.
1. Приложение `tea` в виде развертывания (deployment) из одного пода и соответствующего ему сервиса (service).

   Для этого приложения также будет создан контейнер инициализации ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)), который запишет веб-страницу на постоянный том.

Чтобы подключить постоянный том с помощью статического PVC:

1. [Создайте сетевой HDD-диск](/ru/base/iaas/instructions/vm-volumes/).

   При создании укажите:

   - **Название диска:** любое, например, `disk-tea`.
   - **Источник:** `пустой диск`.
   - **Тип диска:** `сетевой HDD-диск (ceph-hdd)`.
   - **Зону доступности:** `MS1`.
   - **Размер:** `1 ГБ`.

   Прочие опции и параметры оставьте без изменений.

1. Скопируйте идентификатор созданного диска, например `f6d8bf3b-aaaa-bbbb-cccc-4ece8e353246`.

1. Изучите особенности подключения:

   1. Размеры хранилища, указываемые в параметрах `spec.capacity.storage` для ресурса PersistentVolume и `spec.resources.requests.storage` для ресурса PersistentVolumeClaim, должны совпадать с размером соответствующего диска. В данном примере — 1 ГБ.
   1. Для ресурса PersistentVolumeClaim используйте пустое значение в параметре класса хранения `storageClassName`.
   1. Режим доступа к хранилищу задается в параметре `spec.accessModes` для ресурса PersistentVolume.
   1. Зоны доступности диска и worker-узла, на котором будет располагаться под приложения, должны совпадать. В противном случае попытка подключить к поду на этом узле постоянный том, соответствующий диску, завершится неудачей. В данном примере под будет размещен на группе worker-узлов в зоне доступности `MS1` и использовать диск из этой же зоны.
   1. Используется ReclaimPolicy `Retain` для постоянного тома. Политика `Delete` не используется, чтобы можно было контролировать состояние диска вручную и случайно не удалить его.

1. Создайте манифест для приложения `tea`.

   Для ресурса PersistentVolume укажите идентификатор созданного диска в параметре `spec.cinder.volumeID`.

   <details>
   <summary markdown="span">tea.yaml</summary>

   ```yaml
   ---
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: tea-pv
   spec:
     capacity:
       storage: 1Gi
     cinder:
       volumeID: <идентификатор диска в формате f6d8bf3b-aaaa-bbbb-cccc-4ece8e353246>
     accessModes:
       - ReadWriteOnce
     persistentVolumeReclaimPolicy: Retain

   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: tea-pvc
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     volumeName: tea-pv
     storageClassName: ""

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: tea-volume
             persistentVolumeClaim:
               claimName: tea-pvc
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: tea-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The tea pod says Hello World to everyone! This file is located on the statically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: tea
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: tea-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   </details>

1. Примените этот манифест в кластере для создания всех необходимых ресурсов:

   ```bash
   kubectl apply -f ./tea.yaml
   ```

</tabpanel>
<tabpanel>

В этом примере будут созданы:

1. Динамический PVC, который создаст постоянный том на основе заданных параметров.
1. Приложение `coffee` в виде развертывания (deployment) из одного пода и соответствующего ему сервиса (service).

   Для этого приложения также будет создан контейнер инициализации ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)), который запишет веб-страницу на постоянный том.

Чтобы подключить постоянный том с помощью динамического PVC:

1. Изучите особенности подключения:

   1. Необходимый размер хранилища указывается в параметре `spec.resources.requests.storage` ресурса PersistentVolumeClaim. В данном примере — 1 ГБ.
   1. Для ресурса PersistentVolumeClaim укажите класс хранения в параметре `spec.storageClassName`. Класс хранения должен использовать ту же зону доступности, что и worker-узел, на котором будет располагаться под приложения. В противном случае попытка подключить к поду на этом узле постоянный том, соответствующий PVC, завершится неудачей. В данном примере под будет размещен на группе worker-узлов в зоне доступности `MS1` и использовать класс хранения `csi-ceph-hdd-ms1` из этой же зоны.
   1. Режим доступа к хранилищу задается в параметре `spec.accessModes` для ресурса PersistentVolumeClaim.
   1. Используется ReclaimPolicy `Delete` для постоянного тома (это следует из выбранного класса хранения). При удалении PVC соответствующий постоянному тому диск будет автоматически удален.

1. Создайте манифест для приложения `coffee`.

   <details>
   <summary markdown="span">coffee.yaml</summary>

   ```yaml
   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: coffee-pvc
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     storageClassName: "csi-ceph-hdd-ms1"

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         volumes:
           - name: coffee-volume
             persistentVolumeClaim:
               claimName: coffee-pvc
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: coffee-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: coffee
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: coffee-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```

   </details>

1. Примените этот манифест в кластере для создания всех необходимых ресурсов:

   ```bash
   kubectl apply -f ./coffee.yaml
   ```

</tabpanel>
<tabpanel>

В этом примере будут созданы:

1. Приложение `juice` в виде StatefulSet из двух подов, а также соответствующие сервисы (service).

   Для этого приложения также будет создан контейнер инициализации ([initContainer](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)), который запишет веб-страницу на постоянный том.

1. Динамический PVC, который создаст постоянные тома на основе заданных параметров.

Чтобы подключить постоянный том к нескольким подам с помощью динамического PVC:

1. Изучите особенности подключения:

   1. При использовании StatefulSet PVC настраивается не отдельно, как в других примерах, а в рамках ресурса StatefulSet.
   1. PVC создаст по одному постоянному тому для каждой реплики StatefulSet, причем эти реплики будут пронумерованы по порядку.

      <info>

      При развертывании приложения из нескольких реплик в виде ресурса Deployment также нужно обеспечить создание постоянного тома для каждой реплики с помощью PVC. Такие тома будут иметь случайные идентификаторы вместо порядковых номеров.

      </info>

   1. Необходимый размер хранилища указывается в параметре `spec.volumeClaimTemplates.spec.resources.requests.storage` ресурса StatefulSet. В данном примере — 1 ГБ.
   1. Класс хранения указывается в параметре `spec.volumeClaimTemplates.spec.storageClassName` ресурса StatefulSet. Класс хранения должен использовать ту же зону доступности, что и worker-узел, на котором будет располагаться под приложения. В противном случае попытка подключить к поду на этом узле постоянный том, соответствующий PVC, завершится неудачей. В данном примере под будет размещен на группе worker-узлов в зоне доступности `MS1` и использовать класс хранения `csi-ceph-hdd-ms1` из этой же зоны.
   1. Режим доступа к хранилищу задается в параметре `spec.volumeClaimTemplates.spec.accessModes` ресурса StatefulSet.
   1. Используется ReclaimPolicy `Delete` для постоянного тома (это следует из выбранного класса хранения). При удалении PVC соответствующий постоянному тому диск будет автоматически удален.

1. Создайте манифест для приложения `juice`.

   <details>
   <summary markdown="span">juice.yaml</summary>

   ```yaml
   ---
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: juice
   spec:
     serviceName: juice
     replicas: 2
     selector:
       matchLabels:
         app: juice
     volumeClaimTemplates:
       - metadata:
           name: juice-pvc
         spec:
           accessModes: ["ReadWriteOnce"]
           storageClassName: "csi-ceph-hdd-ms1"
           resources:
             requests:
               storage: 1Gi
     template:
       metadata:
         labels:
           app: juice
       spec:
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: juice-pvc
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The juice StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: juice
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: juice-pvc
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: juice-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: juice

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: juice-0-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: juice-0

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: juice-1-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: juice-1
   ```

   </details>

1. Примените этот манифест в кластере для создания всех необходимых ресурсов:

   ```bash
   kubectl apply -f ./juice.yaml
   ```

</tabpanel>
</tabs>

### Подключение файловых хранилищ

Файловые хранилища подключаются к кластеру с помощью постоянного тома, который настроен на использование существующего хранилища по нужному протоколу, например, NFS.

При использовании хранилищ такого типа:

- сразу несколько подов могут иметь доступ к хранилищу;
- как следствие, для доступа к хранилищу должен использоваться режим `ReadWriteMany`.

<tabs>
<tablist>
<tab>Подключение NFS-хранилища с помощью статического PVC</tab>
</tablist>
<tabpanel>

В этом примере будут созданы:

1. Файловое NFS-хранилище в сервисе Облачные вычисления платформы VK Cloud.
1. Постоянный том, соответствующий этому хранилищу.
1. Статический PVC, использующий уже созданный постоянный том.
1. Приложение `milkshake` в виде StatefulSet из двух подов, а также соответствующие сервисы (service).

Чтобы подключить постоянный том NFS с помощью статического PVC:

1. [Создайте файловое хранилище](/ru/base/iaas/instructions/fs-manage/).

   При создании укажите:

   - **Имя файлового хранилища:** любое, например, `storage-milkshake`.
   - **Размер хранилища:** `10 ГБ`.
   - **Протокол:** `NFS`.
   - **Cеть:** сеть и подсеть, в которых размещен кластер Kubernetes. Эту информацию можно узнать на странице кластера.
   - **Cеть файлового хранилища:** существующая сеть. Если подходящей сети нет в списке, выберите пункт `Создать новую сеть`.

1. [Посмотрите информацию](/ru/base/iaas/instructions/fs-manage/) о созданном файловом хранилище.

   Сохраните значение параметра **Точка подключения**.

1. Изучите особенности подключения:

   1. Размеры хранилища, указываемые в параметрах `spec.capacity.storage` и `spec.resources.requests.storage` для ресурса PersistentVolumeClaim, должны совпадать с размером созданного файлового хранилища. В данном примере — 10 ГБ.
   1. Для ресурса PersistentVolumeClaim используйте пустое значение в параметре класса хранения `storageClassName`.
   1. Для ресурса PersistentVolume:

      1. Режим доступа к хранилищу задается в параметре `spec.accessModes` для ресурса PersistentVolume.
      1. В наборе параметров `spec.mountOptions` должна присутствовать запись `nfsvers` с версией `4.0`.

   1. Вместо контейнера инициализации для записи веб-страницы на постоянный том используется однократно запускаемое задание Kubernetes (job). Такой подход работает, потому что в этом случае все поды будут иметь доступ к одному и тому же постоянному тому.

   1. Используется ReclaimPolicy `Retain` для постоянного тома, т.к. политика `Recycle` не позволит мгновенно удалить том, когда он станет не нужен. Очистка тома от данных занимает длительное время. Политика `Delete` не используется, чтобы можно было контролировать состояние хранилища вручную и случайно не удалить его.

1. Создайте манифест для приложения `milkshake`.

   Для ресурса PersistentVolume укажите:

   - IP-адрес из параметра **Точка подключения** файлового хранилища в качестве значения параметра `spec.nfs.server`.
   - Данные после IP-адреса (`/shares/...`) в качестве значения параметра `spec.nfs.path`.

   <details>
   <summary markdown="span">milkshake.yaml</summary>

   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: milkshake-pv
   spec:
     accessModes:
       - ReadWriteMany
     mountOptions:
       - hard
       - nfsvers=4.0
       - timeo=60
       - retrans=10
     capacity:
       storage: 10Gi
     nfs:
       server: <share IP address>
       path: "<share path starting with /share/...>"
     persistentVolumeReclaimPolicy: "Retain"

   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: milkshake-pvc
   spec:
     volumeMode: Filesystem
     accessModes:
       - ReadWriteMany
     resources:
       requests:
         storage: 10Gi
     volumeName: "milkshake-pv"
     storageClassName: ""

   ---
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: write-html-for-nginx-on-nfs-volume
   spec:
     template:
       spec:
         restartPolicy: Never
         volumes:
           - name: milkshake-volume
             persistentVolumeClaim:
               claimName: milkshake-pvc
         containers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: milkshake-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The milkshake StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed NFS ReadWriteMany persistent volume." > /usr/share/nginx/html/index.html',
               ]

   ---
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: milkshake
   spec:
     serviceName: milkshake
     replicas: 2
     selector:
       matchLabels:
         app: milkshake
     template:
       metadata:
         labels:
           app: milkshake
       spec:
         volumes:
           - name: milkshake-volume
             persistentVolumeClaim:
               claimName: milkshake-pvc
         containers:
           - name: milkshake
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: milkshake-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: milkshake-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: milkshake

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: milkshake-0-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: milkshake-0

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: milkshake-1-svc
     labels:
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       statefulset.kubernetes.io/pod-name: milkshake-1
   ```

   </details>

1. Примените этот манифест в кластере для создания всех необходимых ресурсов:

   ```bash
   kubectl apply -f ./milkshake.yaml
   ```

</tabpanel>
</tabs>

## 3. Проверьте работоспособность демо-приложений и постоянных томов

1. Создайте манифест для ресурса Ingress, через который будут проходить запросы к приложениям.

   <details>
   <summary markdown="span">cafe-ingress.yaml</summary>

   ```yaml
   ---
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
         - path: /juice
           pathType: Prefix
           backend:
             service:
               name: juice-svc
               port:
                 number: 80
         - path: /juice/0
           pathType: Prefix
           backend:
             service:
               name: juice-0-svc
               port:
                 number: 80
         - path: /juice/1
           pathType: Prefix
           backend:
             service:
               name: juice-1-svc
               port:
                 number: 80
         - path: /milkshake
           pathType: Prefix
           backend:
             service:
               name: milkshake-svc
               port:
                 number: 80
         - path: /milkshake/0
           pathType: Prefix
           backend:
             service:
               name: milkshake-0-svc
               port:
                 number: 80
         - path: /milkshake/1
           pathType: Prefix
           backend:
             service:
               name: milkshake-1-svc
               port:
                 number: 80
   ```

   </details>

1. Примените этот манифест в кластере для создания всех необходимых ресурсов:

   ```bash
   kubectl apply -f ./cafe-ingress.yaml
   ```

1. [Определите](../../operations/addons/advanced-installation/install-advanced-ingress#poluchenie-ip-adresa-balansirovshchika) публичный IP-адрес Ingress-контроллера.

1. Проверьте доступность приложений с помощью `curl`, используя IP-адрес Ingress-контроллера.

   <info>

   Если какое-то из приложений не было развернуто, то для него будет выведено сообщение `Service Unavailable`.

   </info>

   <tabs>
   <tablist>
   <tab>Tea</tab>
   <tab>Coffee</tab>
   <tab>Juice</tab>
   <tab>Milkshake</tab>
   </tablist>
   <tabpanel>

   Выполните команду:

   ```bash
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/tea
   ```

   Должен быть выведен ответ:

   ```text
   The tea pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   </tabpanel>
   <tabpanel>

   Выполните команду:

   ```bash
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/coffee
   ```

   Должен быть выведен ответ:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   </tabpanel>
   <tabpanel>

   Выполните команды:

   ```bash
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice/0
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice/1
   ```

   Должен быть выведен один и тот же ответ для приложения и каждой его реплики:

   ```text
   The juice StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

   </tabpanel>
   <tabpanel>

   Выполните команды:

   ```bash
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake/0
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake/1
   ```

   Должен быть выведен один и тот же ответ для приложения и каждой его реплики:

   ```text
   The milkshake StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed NFS ReadWriteMany persistent volume.
   ```

   </tabpanel>
   </tabs>

## Проконтролируйте использование ресурсов

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./milkshake.yaml
   kubectl delete -f ./juice.yaml
   kubectl delete -f ./coffee.yaml
   kubectl delete -f ./tea.yaml

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./milkshake.yaml; `
   kubectl delete -f ./juice.yaml; `
   kubectl delete -f ./coffee.yaml; `
   kubectl delete -f ./tea.yaml
   ```

   </tabpanel>
   </tabs>

1. Удалите неиспользуемые хранилища:

   1. Если диск, который использовался приложением `tea`, вам больше не нужен — удалите его.

   1. Если NFS-хранилище, которое использовалось приложением `milkshake`, вам больше не нужно — удалите его.

   Все другие хранилища Cinder, созданные с помощью динамических PVC, будут удалены автоматически.

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../operations/manage-cluster#zapustit-ili-ostanovit-klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../operations/manage-cluster#udalit-klaster) его навсегда.
