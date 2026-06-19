{includetag(warn)}

{note:warn}
Проводите миграцию на остановленной рабочей нагрузке, чтобы избежать потери данных. При необходимости останавливайте и запускайте нагрузку поэтапно в соответствии с шагами миграции.
{/note}

{/includetag}

{includetag(prep)}

1. {linkto(/ru/kubernetes/k8s/connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(/ru/kubernetes/k8s/connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. (Опционально) [Установите](https://github.com/stackitcloud/rename-pvc) утилиту для переименования PVC `rename-pvc`.

{/includetag}

{includetag(check)}

- в [правилах планирования](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/) пода:
   - в параметрах `nodeAffinity`, `topologySpreadConstraints` или `nodeSelector`;
   - в {linkto(/ru/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints)[text=метках]} `topology.kubernetes.io/zone`,`failure-domain.beta.kubernetes.io/zone` и `topology.cinder.csi.openstack.org/zone`.

- в {linkto(/ru/kubernetes/k8s/concepts/storage#k8s-storage-storage-classes)[text=классе хранения]} (`StorageClass`) для подов [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/).

Если зона доступности не указана, миграция на другую зону доступности никак не повлияет на вашу рабочую нагрузку и дополнительных действий по переносу от вас не потребуется.

{/includetag}

{includetag(pvc-prep)}

Чтобы предотвратить случайное удаление данных с PVC при переносе нагрузки:

1. Поменяйте {linkto(/ru/kubernetes/k8s/concepts/storage#k8s-storage-reclaim-policies)[text=политику освобождения]} (reclaim policy) PV на `Retain`:

   ```console
   pv_name=$(kubectl get pvc <ИМЯ_PVC> -n <ПРОСТРАНСТВО_ИМЕН_PVC> -o jsonpath='{.spec.volumeName}') 
   kubectl patch pv "$pv_name" -n <ПРОСТРАНСТВО_ИМЕН_PVC> -p '{"spec": {"persistentVolumeReclaimPolicy": "Retain"}}'
   ```

   Здесь:

    - `<ИМЯ_PVC>` — имя PVC, который вы хотите перенести.
    - `<ПРОСТРАНСТВО_ИМЕН_PVC>` — пространство имен, в котором PVC расположен.

1. {linkto(/ru/computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-clone-volume)[text=Клонируйте]} диск, связанный с PVC.

1. (Опционально) Сохраните старый PVC до окончания работ по миграции, переименовав его в `<ИМЯ_PVC>-old`, чтобы иметь возможность вернуться к нему при необходимости.

   Когда будете создавать новый PVC, используйте `<ИМЯ_PVC>` — так он получит имя оригинального смигрированного.

   Вы можете переименовать PVC вручную или с помощью утилиты `rename-pvc`. Пример команды для `rename-pvc`:

   ```console
   rename-pvc -n <ПРОСТРАНСТВО_ИМЕН_PVC> <СТАРОЕ_ИМЯ_PVC> <НОВОЕ_ИМЯ_PVC>
   ```

{/includetag}

{includetag(snap)}

{tab(Снимок диска (личный кабинет))}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. {linkto(/ru/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=Создайте снимок диска]}, связанного с PVC.
1. {linkto(/ru/computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=Создайте новый диск]} на основе этого снимка, указав следующие параметры:
    - **Источник**: снимок диска, созданный на предыдущем шаге;
    - **Зона доступности**: зона доступности, куда выполняется миграция.
    - Остальные параметры укажите по своему усмотрению.
1. Дождитесь создания диска и запомните его ID.
1. {linkto(/ru/kubernetes/k8s/instructions/manage-resources#k8s-manage-resources-create-resources)[text=Создайте]} PV, ссылающийся на ID созданного из снимка диска, и PVC на его основе:

   {cut(Пример манифеста PV)}
   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: <ИМЯ_PV> 
   spec:
     accessModes:
     - ReadWriteOnce 
     capacity:
       storage: <ОБЪЕМ_ХРАНИЛИЩА>
     claimRef:
       kind: PersistentVolumeClaim
       namespace: <ПРОСТРАНСТВО_ИМЕН_PVC>
       name: <ИМЯ_PVC>
     csi:
       driver: cinder.csi.openstack.org
       volumeHandle: <ID_ДИСКА>
     nodeAffinity:
       required:
         nodeSelectorTerms:
         - matchExpressions:
           - key: topology.cinder.csi.openstack.org/zone
             operator: In
             values:
             - <ЗОНА_ДОСТУПНОСТИ_ДИСКА>
     persistentVolumeReclaimPolicy: Retain
     storageClassName: <ИМЯ_КЛАССА_ХРАНЕНИЯ>
     volumeMode: Filesystem
   ```

   Здесь:

    - `<ИМЯ_PV>` — имя PV, на основе которого будет создан PVC.
    - `<ОБЪЕМ_ХРАНИЛИЩА>` — объем хранилища, которое предоставляет этот PV. Он должен совпадать с объемом диска.
    - `<ПРОСТРАНСТВО_ИМЕН_PVC>` — пространство имен, в котором PVC будет расположен.
    - `<ИМЯ_PVC>` — имя PVC, который будет создан на основе этого PV.
    - `<ID_ДИСКА>` — ID диска, созданного из снимка.
    - `<ЗОНА_ДОСТУПНОСТИ_ДИСКА>` — зона доступности, которую вы выбрали при создании диска из снимка.
    - `persistentVolumeReclaimPolicy` — политика освобождения PV, определенная в его классе хранения.
    - `<ИМЯ_КЛАССА_ХРАНЕНИЯ>` — имя класса хранения (StorageClass) для PV.

   {/cut}

   {cut(Пример манифеста PVC)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <ИМЯ_PVC> 
     namespace: <ПРОСТРАНСТВО_ИМЕН_PVC>
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: <ОБЪЕМ_ХРАНИЛИЩА> 
     storageClassName: <ИМЯ_КЛАССА_ХРАНЕНИЯ> 
   ```

   Значения параметров должны быть одинаковыми для обоих манифестов.

   {/cut}

1. Дождитесь, пока созданный PV будет в статусе `Bound`.

{include(/ru/_includes/_az-migration-magnum-check.md)}

{/tab}

{tab(Снимок диска (плагин Cinder CSI))}

1. [Установите](https://github.com/kubernetes-csi/external-snapshotter) утилиту `external-snapshotter` для создания снимков PV:

   ```console
   git clone https://github.com/kubernetes-csi/external-snapshotter.git
   cd external-snapshotter
   kubectl kustomize client/config/crd | kubectl create -f -
   kubectl -n kube-system kustomize deploy/kubernetes/snapshot-controller | kubectl create -f -
   ```
1. Убедитесь, что все поды `snapshot-controller` в пространстве `kube-system` находятся в статусе `Ready`, с помощью команды:

   ```console
   kubectl get pods -n kube-system | grep snapshot-controller
   ```

1. Проверьте, есть ли права `patch` для `csi-snapshotter-role`:

   ```console
   kubectl get clusterrole csi-snapshotter-role -o yaml
   ```

   Если да, они будут указаны в разделе `rules`:

   ```console
   - apiGroups: ["snapshot.storage.k8s.io"]
   resources: ["volumesnapshotcontents"]
   verbs: ["get", "list", "watch", "patch"]
   ```

   Если нет, добавьте их:

   {cut(Пример манифеста)}
   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: csi-snapshotter-role
   spec: {}
   rules:
     ...
     - verbs:
         - create
         - get
         - list
         - watch
         - update
         - delete
         - patch 
       apiGroups:
         - snapshot.storage.k8s.io
       resources:
         - volumesnapshotcontents
      ...
   ```
   {/cut}

1. Создайте снимок диска:

    1. Создайте ресурс `VolumeSnapshotClass`:

       {cut(Пример манифеста)}

       ```yaml
       apiVersion: snapshot.storage.k8s.io/v1
       kind: VolumeSnapshotClass
       metadata:
          name: <ИМЯ_КЛАССА_СНИМКА>
       driver: cinder.csi.openstack.org
       deletionPolicy: Retain 
       parameters:
          force-create: "false"
       ```
       {/cut}

    1. Создайте ресурс `VolumeSnapshot`:

       {cut(Пример манифеста)}

       ```yaml
       apiVersion: snapshot.storage.k8s.io/v1
       kind: VolumeSnapshot
       metadata:
         name: <ИМЯ_СНИМКА_ДИСКА>
       spec:
         source:
           persistentVolumeClaimName: <ИМЯ_PVC> 
         volumeSnapshotClassName: <ИМЯ_КЛАССА_СНИМКА>
       ```
       {/cut}

    1. Убедитесь, что диск создан корректно, выполнив команду:

       ```console
       kubectl get volumesnapshot
       ``` 

       В выводе команды для диска должен быть указан параметр `readyToUse: true`.

1. Создайте новый PVC из снимка диска:

   {cut(Пример манифеста)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <ИМЯ_PVC>
   spec:
     storageClassName: <ИМЯ_КЛАССА_ХРАНЕНИЯ>>
     dataSource:
       name: <ИМЯ_СНИМКА_ДИСКА>
       kind: VolumeSnapshot
       apiGroup: snapshot.storage.k8s.io
     accessModes:
       - ReadWriteOnce 
     resources:
       requests:
         storage: 1Gi 
   ```

   Здесь:

    - `<ИМЯ_PVC>` — имя PVC, который будет создан на основе снимка.
    - `<ИМЯ_КЛАССА_ХРАНЕНИЯ>` — имя класса хранения в зоне доступности, куда выполняется миграция.
    - `<ИМЯ_СНИМКА_ДИСКА>` — имя созданного снимка диска.

   {/cut}

{include(/ru/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(pv-migrate)}

{tab(pv-migrate)}

1. Убедитесь, что в обеих зонах доступности есть подходящие группы worker-узлов, или {linkto(/ru/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-add-group)[text=добавьте]} их. Это нужно, чтобы запустить на них поды утилиты `pv-migrate`, так как к одному из них будет привязан PVC из старой зоны, а к другому — из новой.
1. [Установите](https://github.com/utkuozdemir/pv-migrate/blob/main/docs/install.md) утилиту `pv-migrate`.
1. Создайте PVC, на который будет переноситься нагрузка, в новой зоне доступности:

   {cut(Пример манифеста)}
   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <ИМЯ_PVC>
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: <ОБЪЕМ_ХРАНИЛИЩА>
     storageClassName: <ИМЯ_КЛАССА_ХРАНЕНИЯ>
   ```
   Здесь:
   - `<ИМЯ_PVC>` — имя PVC, на который выполняется миграция.
   - `<ОБЪЕМ_ХРАНИЛИЩА>`  — объем хранилища PVC. Он должен быть не меньше размера переносимого PVC.
   - `<ИМЯ_КЛАССА_ХРАНЕНИЯ>` — имя класса хранения в зоне доступности, куда выполняется миграция.

   {/cut}

1. Запустите утилиту `pv-migrate`:
   ```console
   pv-migrate migrate -n <ПРОСТРАНСТВО_ИМЕН_МИГРИРУЕМОГО_PVC> -N <ПРОСТРАНСТВО_ИМЕН_ЦЕЛЕВОГО_PVC> <ИМЯ_МИГРИРУЕМОГО_PVC> <ИМЯ_ЦЕЛЕВОГО_PVC>
   ```
   
1. Дождитесь выполнения миграции.

   {cut(Пример результата работы утилиты)}

   ```console
   Dec 10 13:59:08.537 INF 🚀 Starting migration
   Dec 10 13:59:08.886 INF 💭 Attempting migration source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 strategies=mnt2,svc,lbsvc
   Dec 10 13:59:08.887 INF 🚁 Attempt using strategy source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:09.989 INF 🧹 Cleaning up source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:10.766 INF ✨ Cleanup done source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2
   Dec 10 14:01:10.767 WRN 🔶 Migration failed with this strategy, will try with the remaining strategies source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=bdcbb strategy=mnt2 error="failed to wait for job completion: failed to wait for pod: timed out waiting for the condition"
   Dec 10 14:01:10.769 INF 🚁 Attempt using strategy source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:10.769 INF 🔑 Generating SSH key pair source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc algorithm=ed25519
   Dec 10 14:01:29.504 INF 🧹 Cleaning up source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:30.767 INF ✨ Cleanup done source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc
   Dec 10 14:01:30.769 INF ✅ Migration succeeded source=default/my-pvc-one dest=default/my-pvc-one-new-bo1 attempt_id=dedab strategy=svc 
   ```
   {/cut}

{include(/ru/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(volume-id)}

{tab(ID диска)}

Используемый диск уже переведен в новую зону доступности, но в его метаданных в Kubernetes указана старая зона. Чтобы это исправить, создайте новые PV и PVC, которые будут указывать на тот же диск в новой зоне и при этом иметь метаданные в новой зоне.

1. Убедитесь, что у PV указана {linkto(/ru/kubernetes/k8s/concepts/storage#k8s-storage-reclaim-policies)[text=политика освобождения]} (reclaim policy) `Retain`, иначе диск будет удален при удалении PV.

1. Узнайте ID диска, на котором создан PVC:

   ```console
   kubectl get pv <ИМЯ_PV> -o jsonpath='{.spec.csi.volumeHandle}'
   ```
   
   Здесь `<ИМЯ_PV>` — имя PV, связанного с PVC, который вы хотите перенести. ID диска будет указан в параметре `volumeHandle`.

1. Создайте новый PV, который будет ссылаться на этот же диск, но с классом хранения (StorageClass) целевой зоны доступности:

   {cut(Пример манифеста PV)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: <ИМЯ_PV>
   spec:
     accessModes:
     - ReadWriteOnce 
     capacity:
       storage: <ОБЪЕМ_ХРАНИЛИЩА> 
     claimRef:
       kind: PersistentVolumeClaim
       namespace: <ПРОСТРАНСТВО_ИМЕН_PVC>
       name: <ИМЯ_PVC>
     csi:
       driver: cinder.csi.openstack.org
       volumeHandle: <ID_ДИСКА>
     nodeAffinity:
       required:
         nodeSelectorTerms:
         - matchExpressions:
           - key: topology.cinder.csi.openstack.org/zone
             operator: In
             values:
             - <ЗОНА_ДОСТУПНОСТИ>
     persistentVolumeReclaimPolicy: Retain 
     storageClassName: <ИМЯ_КЛАССА_ХРАНЕНИЯ>
     volumeMode: Filesystem
   ```
   
   Здесь: 

   - `<ИМЯ_PV>` — имя нового PV.
   - `<ОБЪЕМ_ХРАНИЛИЩА>` — объем хранилища, которое предоставляет этот PV. Он должен совпадать с объемом диска.
   - `<ПРОСТРАНСТВО_ИМЕН_PVC>` — пространство имен, в котором PVC будет расположен.
   - `<ИМЯ_PVC>` — имя PVC, который будет создан на основе этого PV.
   - `<ID_ДИСКА>` — ID диска.
   - `<ЗОНА_ДОСТУПНОСТИ>` — имя зоны доступности, куда выполняется миграция.
   - `<ИМЯ_КЛАССА_ХРАНЕНИЯ>` — имя класса хранения (StorageClass) в зоне доступности, куда выполняется миграция.

   {/cut}

1. Создайте PVC на основе манифеста нового PV:

   {cut(Пример манифеста PVC)}

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: <ИМЯ_PVC>
   spec:
     accessModes:
       - ReadWriteOnce 
     resources:
       requests:
         storage: <ОБЪЕМ_ХРАНИЛИЩА> 
   storageClassName: <ИМЯ_КЛАССА_ХРАНЕНИЯ> 
   ```
   {/cut}

1. Отключите мигрируемый PVC от пода перед тем, как подключать созданный, так как в Cloud Containers запрещено подключение нескольких PVC к одному поду.  

{include(/ru/_includes/_az-migration-magnum-check.md)}

{/tab}

{/includetag}

{includetag(helm-addons)}

1. Проверьте, была ли привязка к зонам доступности дополнительно установлена через Helm-чарты или при {linkto(/ru/kubernetes/k8s/instructions/addons/manage-addons#k8s-manage-addons-edit-code)[text=редактировании кода аддона]} в личном кабинете {var(cloud)}. 
1. Если да, вручную укажите для них зону доступности, куда была выполнена миграция. Это нужно, чтобы при следующем обновлении манифестов результаты миграции не были перезаписаны.

   {tabs}
   {tab(Helm-чарты)}

   1. Укажите зону доступности, куда была выполнена миграция, в `values.yaml`:
  
      ```yaml
      topology:
        zone: <ЗОНА_ДОСТУПНОСТИ>
      ```

   1. Примените обновление. Подробнее в [официальной документации Helm](https://helm.sh/docs/). 

   {/tab}

   {tab(Аддоны)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер первого поколения.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для аддона, код которого нужно отредактировать, и выберите пункт **Редактировать**.
   1. Внесите необходимые изменения и нажмите кнопку **Изменить настройки**.

   {/tab}
   {/tabs}

{/includetag}

{includetag(delete)}

Работающие ресурсы в кластере тарифицируются и потребляют вычислительные ресурсы. Если вы не планируете использовать PVC и снимки диска, оставшиеся после миграции, а также саму зону доступности, удалите их и связанные с ними ресурсы:

1. Удалите {linkto(/ru/kubernetes/k8s/concepts/storage#k8s-storage-reclaim-policies)[text=старый PVC]} и {linkto(/ru/computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=снимки диска]}.

1. Удалите класс хранения (StorageClass) старой зоны доступности:

   ```console
   kubectl get sc -o name | grep <СТАРАЯ_ЗОНА_ДОСТУПНОСТИ> | xargs -I {} kubectl delete {}
   ```

   Здесь `<СТАРАЯ_ЗОНА_ДОСТУПНОСТИ>` — имя зоны доступности, из которой была проведена миграция, указанная в нижнем регистре.

{/includetag}