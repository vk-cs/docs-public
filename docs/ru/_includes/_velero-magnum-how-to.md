{includetag(overview)}
Используйте инструмент [Velero](https://velero.io/docs/main/), чтобы вручную создавать резервные копии данных кластера и восстанавливать их.
{/includetag}

{includetag(note-magnum)}

{ifdef(public)}
{note:info}
Руководство подходит только для кластеров {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}. В кластерах второго поколения используйте {linkto(../../../concepts/addons-and-settings/addons#k8s-addons-velero)[text=аддон Velero]} и соответствующие {linkto(../../managed-velero#k8s-how-to-velero-managed)[text=практические руководства]}.
{/note}
{/ifdef}

{/includetag}

{includetag(note-managed)}

{note:info}
Аддон Velero доступен только в кластерах {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}. В кластерах первого поколения {linkto(../../../install-tools/velero#k8s-velero)[text=установите]} Velero самостоятельно и настройте резервное копирование {linkto(../../velero#k8s-how-to-velero-magnum)[text=с помощью соответствующих руководств]}.
{/note}

{/includetag}

{includetag(prep)}

{ifdef(public)}
{include(/ru/_includes/_create-test-cluster.md)}
   Разместите в зоне доступности `ME1` одну или несколько групп worker-узлов. Остальные параметры кластера выберите на свое усмотрение.
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.
1. {linkto(../../../install-tools/velero#k8s-velero)[text=Установите и настройте]} Velero, если это еще не сделано.
1. {linkto(/ru/tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите]} OpenStack CLI, если это еще не сделано. Убедитесь, что вы можете авторизоваться в облаке с его помощью.
   {/ifdef}

{ifndef(public)}
1. Убедитесь, что вы можете {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=войти в личный кабинет]} {var(cloud)}.
1. Убедитесь, что вы можете {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=подключится к OpenStack CLI]}.
1. Убедитесь, что {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=тип кластера]} Kubernetes не ниже Standard-6-6.
1. Убедитесь, что к кластеру можно {linkto(../../connect/kubectl#k8s-kubectl)[text=подключиться с помощью kubectl]}.
1. Убедитесь, что {linkto(../../install-tools/velero#k8s-velero)[text=Velero установлен и настроен]}.
   {/ifndef}

{/includetag}

{includetag(create-app)}

Чтобы познакомиться с созданием резервной копии и восстановлением из нее, создайте демоприложение `coffee`. К этому приложению будет подключен постоянный том (persistent volume).

1. Создайте файл манифеста{ifdef(public)} с указанием {linkto(../../../concepts/storage#k8s-storage-storage-classes)[text=класса хранения]} в зоне доступности, где расположена ваша группа worker-узлов{/ifdef}:

   {cut(coffee.yaml)}
   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: example-app
   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: coffee-pvc
     namespace: example-app
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     storageClassName: "<КЛАСС_ХРАНЕНИЯ>"
   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
     namespace: example-app
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
     namespace: example-app
   spec:
     type: LoadBalancer
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```
   {/cut}

1. Примените манифест в кластере:

   ```console
   kubectl apply -f coffee.yaml
   ```

   Манифест создаст все необходимые для работы приложения ресурсы Kubernetes в пространстве имен `example-app`.

1. Убедитесь, что создан диск для постоянного тома:

    1. Найдите созданный для приложения постоянный том:

       ```console
       kubectl get pv -n example-app
       ```

       В выводе найдите идентификатор постоянного тома, у которого в столбце `CLAIM` указано `example-app/coffee-pvc`.
       Пример вывода команды:

       ```text
       NAME                    ...   STATUS   CLAIM                    ...
       ...                     ...   ...      ...                      ...
       <ID_ПОСТОЯННОГО_ТОМА>   ...   Bound    example-app/coffee-pvc   ...
       ```

    1. Получите идентификатор диска для созданного постоянного тома:

       ```console
       kubectl describe pv <ID_ПОСТОЯННОГО_ТОМА> -n example-app
       ```

       В выводе команды будет содержаться идентификатор диска в параметре `VolumeHandle`.
       Пример вывода:

       ```text
       ...
       Source:
           Type:          CSI (a Container Storage Interface (CSI) volume source)
           Driver:        cinder.csi.openstack.org
           FSType:        ...
           VolumeHandle:  <ID_ДИСКА>
           ...
       ```

    1. Получите подробную информацию о диске с таким идентификатором, используя OpenStack CLI:

       ```console
       openstack volume show <ID_ДИСКА> --fit-width
       ```

1. Дождитесь, когда балансировщику будет назначен {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]}.

   Периодически проверяйте статус балансировщика:

   ```console
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться Floating IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```console
   curl <FLOATING_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Ожидаемый вывод:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

{/includetag}

{includetag(create-copy)}

1. Создайте ручную резервную копию всего пространства имен `example-app`, в котором находятся нужные для работы приложения ресурсы:

   ```console
   velero backup create coffee-backup --include-namespaces example-app
   ```

1. Загрузите детальную информацию о резервной копии:

   ```console
   velero backup describe coffee-backup
   ```

   {note:warn}
   Время жизни резервной копии по умолчанию – 720 часов. По истечении этого времени резервная копия будет удалена.
   {/note}

1. (Опционально) Посмотрите логи операции резервного копирования:

   ```console
   velero backup logs coffee-backup
   ```

{ifdef(public)}
1. (Опционально) {linkto(../../../how-to-guides/velero/backup-schedule#k8s-backup-schedule)[text=Настройте]} расписание для автоматического создания резервных копий.
   {/ifdef}
   {ifndef(public)}
1. (Опционально) Настройте автоматическое создание резервных копий по расписанию. Подробнее — в справке Velero:

   ```console
   velero help
   ```
{/ifndef}

{/includetag}

{includetag(backup)}

1. Имитируйте отказ приложения. Для этого удалите пространство имен `example-app`, в котором находятся ресурсы, необходимые для работы приложения:

   ```console
   kubectl delete ns example-app
   ```

1. Восстановите ресурсы из резервной копии, которая была создана ранее:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   Данные будут восстановлены в том же кластере, в котором было выполнено резервное копирование. Если нужно восстановить данные в новый кластер:

   {ifdef(public)}
    1. {linkto(../../../instructions/create-cluster/create-webui#k8s-create-webui)[text=Создайте]} кластер.
    1. {linkto(../../../install-tools/velero#k8s-velero)[text=Установите Velero]} в кластер.
    1. Выполните приведенную выше команду.
       {/ifdef}
       {ifndef(public)}
    1. Создайте кластер.
    1. Установите Velero в кластер.
    1. Выполните приведенную выше команду.
       {/ifndef}

1. Дождитесь, когда балансировщику будет назначен {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]}.

   Периодически проверяйте статус балансировщика:

   ```console
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться Floating IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```console
   curl <FLOATING_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Ожидаемый вывод:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

{/includetag}

{includetag(delete)}

{ifdef(public)}
Работающий кластер тарифицируется и потребляет вычислительные ресурсы.
{/ifdef}
{ifndef(public)}
Работающий кластер потребляет вычислительные ресурсы.
{/ifndef}
Если инструмент Velero и ресурсы Kubernetes, созданные для проверки резервного копирования, вам больше не нужны, удалите их:

1. Удалите созданное пространство имен `example-app` и связанные с ним ресурсы, а также созданную резервную копию:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete ns example-app
   velero backup delete coffee-backup

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete ns example-app; `
   velero backup delete coffee-backup
   ```

   {/tab}

   {/tabs}

1. Удалите Velero:

   ```console
   velero uninstall
   ```

{ifdef(public)}
1. {linkto(/ru/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите]} резервные копии из бакета, который использовался Velero.

   При необходимости также {linkto(/ru/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=удалите сам бакет]}.
   {/ifdef}
   {ifndef(public)}
1. Удалите неиспользуемые резервные копии из бакета, который использовал Velero.

   При необходимости также удалите сам бакет.

1. Удалите неиспользуемый кластер, чтобы сократить потребление вычислительных ресурсов:

    * {linkto(../../instructions/manage-cluster#k8s-manage-cluster-stop)[text=Остановите кластер]}.
    * {linkto(../../instructions/manage-cluster#k8s-manage-cluster-delete)[text=Удалите кластер]}.
      {/ifndef}

{ifdef(public)}
{include(/ru/_includes/_delete-test-cluster-short.md)}
{/ifdef}

{/includetag}

{includetag(delete-managed)}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки резервного копирования с помощью аддона Velero, вам больше не нужны, удалите их:

1. Удалите созданное пространство имен `example-app` и связанные с ним ресурсы, а также созданную резервную копию:

   {tabs}
   {tab(Linux/macOS)}
   ```console
   kubectl delete ns example-app
   ```
   {/tab}
   {tab(Windows)}
   ```console
   kubectl delete ns example-app; `
   ```
   {/tab}
   {/tabs}

1. (Опционально) Удалите пространство имен `velero`. Для этого:

   1. {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-delete)[text=Удалите]} созданные экземпляры ресурсов, относящиеся к Custom Resource Definitions (CRD) аддона.
   1. Выполните команду:

      {tabs}
      {tab(Linux/macOS)}
      ```console
      kubectl delete ns velero
      ```
      {/tab}
      {tab(Windows)}
      ```console
      kubectl delete ns velero; `
      ```
      {/tab}
      {/tabs}

1. {linkto(/ru/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите]} резервные копии из бакета, который использовался аддоном Velero.

   При необходимости также {linkto(/ru/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=удалите сам бакет]}.

{include(/ru/_includes/_delete-test-cluster-short.md)}

{/includetag}
