С помощью [Velero](https://velero.io/docs/main/) можно создавать резервные копии данных кластера и восстанавливать их.

## Подготовительные шаги

1. [Создайте кластер](../../operations/create-cluster) Kubernetes самой актуальной версии.

   Разместите в зоне доступности `GZ1` одну или несколько групп worker-узлов.

   Остальные параметры кластера выберите на свое усмотрение.

1. Убедитесь, что вы можете [подключиться к кластеру](../../connect/kubectl) с помощью `kubectl`.
1. Убедитесь, что [Velero установлен и настроен](../../install-tools/velero).
1. [Установите](../../../../base/account/project/cli/setup) OpenStack CLI, если он еще не установлен. Убедитесь, что вы можете [авторизоваться](../../../../base/account/project/cli/authorization) в облаке с его помощью.

## 1. Создайте приложение

Чтобы познакомиться с созданием резервной копии и восстановлением из нее, создайте демо-приложение `coffee`. К этому приложению будет подключен постоянный том (persistent volume).

1. Создайте файл манифеста:

   <details>
   <summary markdown="span">coffee.yaml</summary>

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

   </details>

1. Создайте нужные ресурсы Kubernetes на основе манифеста:

   ```bash
   kubectl apply -f coffee.yaml
   ```

   Все необходимые для работы приложения ресурсы Kubernetes будут помещены в отдельное пространство имен (namespace) `example-app`.

1. Убедитесь, что создан диск для постоянного тома:

   1. Найдите созданный для приложения постоянный том:

      ```bash
      kubectl get pv -n example-app
      ```

      В выведенной таблице найдите идентификатор постоянного тома, для которого в столбце `CLAIM` указано `example-app/coffee-pvc`:

      ```text
      NAME                                       ...   STATUS   CLAIM                    ...
      ...                                        ...   ...      ...                      ...
      <идентификатор постоянного тома>           ...   Bound    example-app/coffee-pvc   ...
      ```

   1. Получите идентификатор диска для созданного постоянного тома:

      ```bash
      kubectl describe pv <идентификатор постоянного тома> -n example-app
      ```

      В выводе команды будет содержаться идентификатор диска в параметре `VolumeHandle`:

      ```text
      ...
      Source:
          Type:              CSI (a Container Storage Interface (CSI) volume source)
          Driver:            cinder.csi.openstack.org
          FSType:            ...
          VolumeHandle:      <идентификатор диска>
          ...
      ```

   1. Получите подробную информацию о диске с таким идентификатором, используя OpenStack CLI:

      ```
      openstack volume show <идентификатор диска> --fit-width
      ```

1. Дождитесь назначения балансировщику нагрузки публичного IP-адреса.

   Периодически проверяйте статус балансировщика:

   ```bash
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться публичный IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```
   curl <публичный IP-адрес, назначенный балансировщику>
   ```

   Должно быть выведено следующее:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## 2. Создайте резервную копию приложения

1. Создайте ручную резервную копию всего пространства имен `example-app`, в котором находятся нужные для работы приложения ресурсы:

   ```bash
   velero backup create coffee-backup --include-namespaces example-app
   ```

1. Загрузите детальную информацию о резервной копии:

   ```bash
   velero backup describe coffee-backup
   ```

   <warn>

   Время жизни резервной копии по умолчанию – 720 часов. По истечении этого времени резервная копия будет удалена.

   </warn>

1. Посмотрите логи операции резервного копирования (при необходимости):

   ```bash
   velero backup logs coffee-backup
   ```

Также возможно выполнять создание резервный копий автоматически по расписанию. Подробнее о резервном копировании по расписанию в справке Velero:

```bash
velero help
```

## 3. Восстановите приложение из резервной копии

1. Имитируйте отказ приложения. Для этого удалите пространство имен `example-app`, в котором находятся ресурсы, необходимые для работы приложения:

   ```bash
   kubectl delete ns example-app
   ```

1. Выполните восстановление из резервной копии, которая была создана ранее:

   ```bash
   velero restore create --from-backup coffee-backup
   ```

   Команда восстановит данные в тот же кластер, в котором было выполнено резервное копирование. Если нужно восстановить данные в новый кластер:

   1. [Создайте кластер](../../operations/create-cluster).
   1. [Установите Velero](../../install-tools/velero) в кластер.
   1. Выполните приведенную выше команду.

1. Дождитесь назначения балансировщику нагрузки публичного IP-адреса.

   Периодически проверяйте статус балансировщика:

   ```bash
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться публичный IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```
   curl <публичный IP-адрес, назначенный балансировщику>
   ```

   Должно быть выведено следующее:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## Проконтролируйте использование ресурсов

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete ns example-app
   velero backup delete coffee-backup

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete ns example-app; `
   velero backup delete coffee-backup
   ```

   </tabpanel>
   </tabs>

1. Если Velero вам больше не нужен, удалите его:

   ```bash
   velero uninstall
   ```

1. Если резервные копии вам больше не нужны, удалите их из бакета, который использовался Velero.

   При необходимости также [удалите сам бакет](../../../s3/buckets/bucket#udalenie_baketa).

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../operations/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../operations/manage-cluster#udalit_klaster) его навсегда.
