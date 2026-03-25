Используйте [Velero](https://velero.io/docs/main/), чтобы вручную создавать резервные копии данных кластера и восстанавливать их.

{note:info}
Использование Velero для резервного копирования поддерживается только в кластерах [первого поколения](/ru/kubernetes/k8s/concepts/cluster-generations).
{/note}

## Подготовительные шаги

1. [Создайте](/ru/kubernetes/k8s/instructions/create-cluster) кластер Kubernetes актуальной версии, если это еще не сделано.

   Разместите в зоне доступности `ME1` одну или несколько групп worker-узлов. Остальные параметры кластера выберите на свое усмотрение.

1. [Убедитесь](/ru/kubernetes/k8s/connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.
1. [Установите и настройте](/ru/kubernetes/k8s/install-tools/velero) Velero, если это еще не сделано.
1. [Установите](/ru/tools-for-using-services/cli/openstack-cli) OpenStack CLI, если это еще не сделано. Убедитесь, что вы можете авторизоваться в облаке с его помощью.

## 1. Создайте приложение

Чтобы познакомиться с созданием резервной копии и восстановлением из нее, создайте демо-приложение `coffee`. К этому приложению будет подключен постоянный том (persistent volume).

1. Создайте файл манифеста:

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
     storageClassName: "csi-ceph-hdd-gz1"

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

1. Создайте нужные ресурсы Kubernetes на основе манифеста:

   ```console
   kubectl apply -f coffee.yaml
   ```

   Все необходимые для работы приложения ресурсы Kubernetes будут помещены в отдельное пространство имен (namespace) `example-app`.

1. Убедитесь, что создан диск для постоянного тома:

   1. Найдите созданный для приложения постоянный том:

      ```console
      kubectl get pv -n example-app
      ```

      В выведенной таблице найдите ID постоянного тома, для которого в столбце `CLAIM` указано `example-app/coffee-pvc`:

      ```text
      NAME                    ...   STATUS   CLAIM                    ...
      ...                     ...   ...      ...                      ...
      <ID_ПОСТОЯННОГО_ТОМА>   ...   Bound    example-app/coffee-pvc   ...
      ```

   1. Получите ID диска для созданного постоянного тома:

      ```console
      kubectl describe pv <ID_ПОСТОЯННОГО_ТОМА> -n example-app
      ```

      В выводе команды будет содержаться ID диска в параметре `VolumeHandle`:

      ```text
      ...
      Source:
          Type:              CSI (a Container Storage Interface (CSI) volume source)
          Driver:            cinder.csi.openstack.org
          FSType:            ...
          VolumeHandle:      <ID_ДИСКА>
          ...
      ```

   1. Получите подробную информацию о диске с таким ID, используя OpenStack CLI:

      ```console
      openstack volume show <ID_ДИСКА> --fit-width
      ```

1. Дождитесь назначения балансировщику нагрузки публичного IP-адреса.

   Периодически проверяйте статус балансировщика:

   ```console
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться публичный IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```console
   curl <ПУБЛИЧНЫЙ_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Должно быть выведено следующее:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## 2. Создайте резервную копию приложения

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
1. (Опционально) [Настройте](/ru/kubernetes/k8s/how-to-guides/velero/backup-schedule) расписание для автоматического создания резервных копий.

## 3. Восстановите приложение из резервной копии

1. Имитируйте отказ приложения. Для этого удалите пространство имен `example-app`, в котором находятся ресурсы, необходимые для работы приложения:

   ```console
   kubectl delete ns example-app
   ```

1. Выполните восстановление из резервной копии, которая была создана ранее:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   Команда восстановит данные в тот же кластер, в котором было выполнено резервное копирование. Если нужно восстановить данные в новый кластер:

   1. [Создайте](/ru/kubernetes/k8s/instructions/create-cluster) кластер.
   1. [Установите Velero](/ru/kubernetes/k8s/install-tools/velero) в кластер.
   1. Выполните приведенную выше команду.

1. Дождитесь назначения балансировщику нагрузки публичного IP-адреса.

   Периодически проверяйте статус балансировщика:

   ```console
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться публичный IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```console
   curl <ПУБЛИЧНЫЙ_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Должно быть выведено следующее:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## Удалите неиспользуемые ресурсы

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если инструмент Velero и ресурсы Kubernetes, созданные для проверки резервного копирования с его помощью, вам больше не нужны, удалите их:

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

1. [Удалите](/ru/storage/s3/instructions/objects/manage-object#udalenie_obektov) резервные копии из бакета, который использовался Velero.

   При необходимости также [удалите сам бакет](/ru/storage/s3/instructions/buckets/manage-bucket#bucket_delete).

1. [Остановите](/ru/kubernetes/k8s/instructions/manage-cluster#zapustit_ili_ostanovit_klaster) созданный кластер, чтобы воспользоваться им позже, или [удалите](ru/kubernetes/k8s/instructions/manage-cluster#delete_cluster) его навсегда.