[LL NVMe](/ru/computing/iaas/concepts/data-storage/disk-types#disk_types) (Low Latency NVMe) — [локальные диски с быстрым откликом](/ru/computing/iaas/concepts/data-storage/volume-sla#low_latency_nvme), которые доступны на платформе VK Cloud в высокопроизводительных конфигурациях по запросу через [техническую поддержку](/ru/contacts). Среди всех дисков на платформе VK Cloud они отличаются наименьшей задержкой: их гарантированное время отклика составляет не более 0,5 мс. В отличие от других дисков на платформе VK Cloud, диск LL NVMe является локальным, т.е. базируется на том же гипервизоре, что и ВМ, к которой он подключен.
 
## {heading(Подготовительные шаги)[id=prepare]}

1. Обратитесь в [техническую поддержку](/ru/contacts), чтобы получить доступ к конфигурации для подключения диска LL NVMe к worker-узлам, которая включает в себя:
   
   - тип диска: `ef-nvme`;
   - [шаблон конфигурации ВМ](/ru/computing/iaas/concepts/vm/flavor) для группы узлов на основе этого типа диска.
   
    Дождитесь доступа к этой конфигурации, прежде чем переходить к следующим шагам.
1. [Создайте](../../instructions/create-cluster) кластер, если это еще не сделано.
1. В личном кабинете VK Cloud [добавьте](/ru/kubernetes/k8s/instructions/manage-node-group#add_group) группу узлов с ВМ на основе конфигурации для LL NVMe:

   - **Категория виртуальной машины**: `ВМ с локальными дисками`.
   - **Тип Node-узлов**: шаблон конфигурации ВМ для диска LL NVMe (в названии такого шаблона будет `NVME`).
   - Другие настройки оставьте без изменений.

1. [Установите и настройте](../../connect/kubectl) `kubectl`, если это еще не сделано.
1. [Подключитесь](../../connect/kubectl#connect) к кластеру при помощи `kubectl`.

## {heading(1. Добавьте класс хранения (StorageClass) для дисков LL NVMe)[id=nvme_storageclass]}

1. Создайте файл манифеста для `StorageClass`, например `csi-ef-nvme.yaml`, и добавьте в него следующее содержимое:

   ```yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: csi-ef-nvme
   parameters:
     type: ef-nvme
     localToNode: "true"
   provisioner: cinder.csi.openstack.org
   allowVolumeExpansion: true
   reclaimPolicy: Delete
   volumeBindingMode: WaitForFirstConsumer
   ```
   Здесь:
   - `type: ef-nvme` описывает тип диска LL NVMe. 
   - `volumeBindingMode: WaitForFirstConsumer` позволяет отложить создание и привязку [постоянного тома](/ru/kubernetes/k8s/reference/pvs-and-pvcs) (persistent volume) до момента, когда будет создан под, использующий [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#introduction). Это нужно, чтобы Kubernetes создал диск после того, как под будет запланирован на узел.

      Подробнее о настройках привязки томов в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode). 
   - `localToNode: "true"` обеспечивает размещение дисков на тех же гипервизорах, что и ВМ, к которым они будут привязаны.

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f csi-ef-nvme.yaml
   ```

## {heading(2. Создайте приложение)[id=nvme_app]}

Чтобы изучить процесс подключения дисков LL NVMe к worker-узлам, запустите тестовое приложение `coffee`.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. [Добавьте](/ru/kubernetes/k8s/instructions/manage-node-group#labels_taints) метку `disktype: ef-nvme` для ранее созданной группы узлов, чтобы обеспечить размещение пода на узлах с дисками LL NVMe:

   - **Key**: `disktype`.
   - **Value**: `ef-nvme`.
   - Другие настройки оставьте без изменений.
   
   {note:warn}
   Последующее перемещение пода на другой узел может привести к миграции диска и временной деградации производительности. При настройке рабочих нагрузок старайтесь избегать перемещения подов с дисками LL NVMe между узлами, чтобы сохранить стабильную производительность.
   {/note}

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
     storageClassName: "csi-ef-nvme"
   ---
   apiVersion: apps/v1
   kind: StatefulSet
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
         nodeSelector:
           disktype: ef-nvme
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
                 'echo "The coffee pod says Hello World to everyone! This file is located on NVME volume." > /usr/share/nginx/html/index.html',
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

1. Создайте необходимые ресурсы Kubernetes на основе манифеста:

   ```console
   kubectl apply -f coffee.yaml
   ```

   Все необходимые для работы приложения ресурсы Kubernetes будут помещены в отдельное пространство имен (namespace) `example-app`.

1. Убедитесь, что созданный диск связан с постоянным томом на основе манифеста для `StorageClass`:

   1. Найдите созданный для приложения постоянный том:

      ```console
      kubectl get pv -n example-app
      ```

   1. В выведенной таблице найдите идентификатор постоянного тома, для которого в столбце `CLAIM` указано `example-app/coffee-pvc`, а в столбце `STORAGECLASS` — `csi-ef-nvme`:

      ```text
      NAME                                       ...   STATUS   CLAIM                    STORAGECLASS   ...
      ...                                        ...   ...      ...                      ...            ...
      <идентификатор постоянного тома>           ...   Bound    example-app/coffee-pvc   csi-ef-nvme    ...
      ```

## Удалите неиспользуемые ресурсы

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   kubectl delete ns example-app

   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl delete ns example-app; `
   ```

   </tabpanel>
   </tabs>

1. [Удалите](/ru/kubernetes/k8s/concepts/storage#reclaim_policies) созданный постоянный том.

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](/ru/kubernetes/k8s/instructions/manage-cluster#stop) его, чтобы воспользоваться им позже;
   - [удалите](../../instructions/manage-cluster#delete_cluster) его навсегда.
