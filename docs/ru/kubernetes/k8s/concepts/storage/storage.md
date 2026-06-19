# {heading(Хранилище в кластере)[id=k8s-storage]}

Данные в кластере Kubernetes могут храниться несколькими способами: непосредственно в контейнере или на _томах_ (volumes). При хранении данных в контейнере возникают проблемы:

- При сбое или остановке контейнера данные теряются.
- Данные контейнера недоступны для других контейнеров, даже если все контейнеры находятся в одном {linkto(../../reference/pods#k8s-pods)[text=поде]}.

Чтобы решить эти проблемы, используются тома Kubernetes. Тома имеют разный жизненный цикл в зависимости от сценария использования:

- У _временных томов_ (ephemeral volume, EV) жизненный цикл совпадает с жизненным циклом пода. Когда под, использующий такой том, прекращает свое существование, том тоже удаляется. Временные тома могут использоваться только одним подом, поэтому объявление томов происходит непосредственно в манифесте пода.

- У _постоянных томов_ (persistent volume, PV) свой {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=жизненный цикл]}, не зависящий от жизненного цикла пода. Благодаря разделению жизненных циклов такие тома можно переиспользовать позднее с другими подами. Для работы с постоянными томами поды и другие рабочие нагрузки используют Persistent Volume Claim (PVC).

В Cloud Containers доступ к Persistent Volume Claim в режиме ReadWriteMany (RWX) не реализован. Это значит, что вы не можете одновременно записывать данные в один PV из нескольких подов на разных узлах.

Чтобы организовать общий доступ к данным из нескольких подов на разных узлах, {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=разверните NFS-сервер]} на отдельной виртуальной машине. NFS-сервер предоставляет общий доступ к данным по сети, позволяя нескольким подам одновременно читать и записывать данные в общий том.

Чтобы обеспечить работу с PV, в {var(cloud)} кластеры Kubernetes тесно интегрированы с платформой:

- Кластер {linkto(#k8s-storage-supported-storage-types)[text=поддерживает]} хранилища, предоставляемые платформой {var(cloud)}. Поддержка блочных хранилищ реализована с помощью {linkto(#k8s-storage-csi)[text=Cinder CSI]}.
- В кластере доступны {linkto(#k8s-storage-storage-classes)[text=преднастроенные классы хранения]} (storage class) для блочного хранилища, которые реализуют различные {linkto(#k8s-storage-reclaim-policies)[text=политики освобождения постоянных томов]}.

## {heading(Управление постоянными томами (PV))[id=k8s-storage-pv-disks]}

В сервисе Cloud Containers можно {linkto(../../instructions/manage-pvs#k8s-manage-pvs)[text=управлять]} PV, созданными для кластеров Kubernetes {linkto(../cluster-generations#k8s-cluster-generations)[text=второго поколения]}. Такие PV находятся в {linkto(../cluster-generations#k8s-cluster-generations-service-projects)[text=сервисном проекте]}, которым управляет платформа {var(cloud)}. Чтобы при удалении или перемещении кластера не потерять доступ к данным, расположенным на таких PV, вы можете переместить их в свой проект из сервисного.

Переместить или удалить PV можно, только если он не подключен к группе узлов.

## {heading(Поддерживаемые типы хранилищ {var(cloud)})[id=k8s-storage-supported-storage-types]}

- Блочные хранилища:

  - На базе [Ceph](https://ceph.io/en/). Для обеспечения отказоустойчивости и сохранности данных хранилище состоит из трех реплик, находящихся в разных серверных стойках. Хранилище использует SSD-диски.

  - На базе высокопроизводительных [NVMe](https://www.snia.org/education/what-is-nvme) SSD-дисков (High-IOPS SSD). Такое хранилище подключается по протоколу [iSCSI](https://www.snia.org/education/what-is-iscsi). Для обеспечения отказоусточивости и сохранности данных на уровне хранилища применяется аппаратный RAID-10.

- [Файловые хранилища](https://www.snia.org/education/what-is-nas), подключаемые по протоколам [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) и [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview).

## {heading(Работа с Container Storage Interface (CSI))[id=k8s-storage-csi]}

В {var(cloud)} кластеры Kubernetes используют [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) для интеграции с блочными хранилищами.

Типы хранилищ, доступные в кластере Kubernetes через Cinder CSI, соотносятся с блочными хранилищами {var(cloud)} следующим образом:

- Ceph SSD соответствует `ceph-ssd` в Cinder.
- High-IOPS SSD соответствует `high-iops` в Cinder.

Применение Cinder CSI позволяет:

- Статически (static provisioning) и динамически (dynamic provisioning) {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=подготавливать]} PV на основе блочных хранилищ.

  При динамической подготовке тома можно использовать преднастроенные классы хранения.

- Автоматически перемонтировать PV:

  - При сбое пода, использующего том, или worker-узла, на котором находится под (при условии, что под будет восстановлен на этом или другом узле).
  - При миграции пода, использующего том, с одного worker-узла на другой.

- Управлять хранилищем {var(cloud)}, которое используется PV:
  - При динамической подготовке тома будет автоматически создан соответствующий этому тому диск в {var(cloud)}.
  - Если для тома задана политика освобождения `Delete`, то после удалении PVC будет удален связанный с ним том и соответствующий этому тому диск в {var(cloud)}.

## {heading(Доступные политики освобождения постоянных томов)[id=k8s-storage-reclaim-policies]}

Для PV можно задать {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-release)[text=политику освобождения]} (reclaim policy), которая сработает при удалении связанного с этим томом PVC:

- Оставить том (`Retain`). PV и связанное с ним хранилище {var(cloud)} не будут удалены.

  Такая политика применима как для блочных, так и для файловых хранилищ. Используйте ее для PV с важными данными, чтобы защитить данные при случайном удалении PVC. При необходимости можно вручную очистить и удалить PV с этой политикой и связанные с ними хранилища {var(cloud)}.

- Удалить том (`Delete`). PV и связанное с ним хранилище {var(cloud)} будут удалены.

  Такая политика применима только для блочных хранилищ.

  {note:warn}
  Используйте эту политику и реализующие ее классы хранения с осторожностью: удаление PVC повлечет за собой удаление PV и диска, соответствующего этому тому.
  {/note}

## {heading(Преднастроенные классы хранения)[id=k8s-storage-storage-classes]}

При использовании {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=динамической подготовки]} постоянного тома необходимо указать класс хранения. Класс хранения по умолчанию не настроен в кластерах Cloud Containers. Можно выбрать класс по умолчанию самостоятельно, или указывать нужный класс явно при создании PVC.

В Cloud Containers есть преднастроенные классы хранения, использующие Cinder CSI для блочных хранилищ. Они предоставляют разные типы хранилищ, которые вы можете использовать при динамической подготовке постоянного тома:

- Для определенного {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региона]} с указанием зоны доступности. 
- Для любого региона и зоны доступности. Такие классы хранения называются мультизональными. Мультизональные классы хранения доступны только для кластеров {linkto(../cluster-generations#k8s-cluster-generations)[text=второго поколения]}. Подробнее о работе с ними в разделе {linkto(../../how-to-guides/multiaz-storage-class#k8s-multiaz-storage-class)[text=Использование мультизональных классов хранения]}.

Каждому классу хранения соответствует своя политика освобождения постоянных томов.

{tabs}

{tab(Регион: Москва)}

[cols="1,1,1,1", options="header"]
|===

| Наименование класса хранения
| Тип хранилища Cinder CSI
| Зона доступности
| Reclaim Policy

| csi-ceph-ssd-gz1                
| `ceph-ssd`
| GZ1                 
| Delete

| csi-ceph-ssd-gz1-retain         
| `ceph-ssd`
| GZ1                 
| Retain

| csi-ceph-ssd-ms1                
| `ceph-ssd`
| MS1                 
| Delete

| csi-ceph-ssd-ms1-retain         
| `ceph-ssd`
| MS1                 
| Retain

| csi-ceph-ssd-me1                
|`ceph-ssd`
| ME1                 
| Delete

| csi-ceph-ssd-me1-retain         
| `ceph-ssd`
| ME1                 
| Retain

| csi-ceph-hdd-gz1                
| `ceph-hdd`
| GZ1                 
| Delete

| csi-ceph-hdd-gz1-retain                
| `ceph-hdd`
| GZ1                 
| Retain

| csi-ceph-hdd-me1                
| `ceph-hdd`
| ME1                 
| Delete

| csi-ceph-hdd-me1-retain         
|`ceph-hdd`
| ME1                 
| Retain

| csi-ceph-hdd-ms1                
| `ceph-hdd`
| MS1                 
| Delete

| csi-ceph-hdd-ms1-retain                
| `ceph-hdd`
| MS1                 
| Retain

| csi-high-iops-gz1               
|`high-iops`
| GZ1                 
| Delete

| csi-high-iops-gz1-retain        
| `high-iops`
| GZ1                 
| Retain

| csi-high-iops-ms1               
| `high-iops`
| MS1                 
| Delete

| csi-high-iops-ms1-retain        
| `high-iops`
| MS1                 
| Retain

| csi-high-iops-me1               
| `high-iops`
| ME1                 
| Delete

| csi-high-iops-me1-retain        
| `high-iops`
| ME1                 
| Retain
|===

Все перечисленные классы хранения:

- Разрешают увеличение тома (`allowVolumeExpansion: true`).
- Используют немедленное выделение и привязку тома (`volumeBindingMode: Immediate`).

{/tab}

{tab(Для любого региона и зоны доступности)}

[cols="1,1,1",options="header"]
|===

| Наименование класса хранения
| Тип хранилища Cinder CSI
| Reclaim Policy

| csi-ceph-ssd                    
| `ceph-ssd`
| Delete

| csi-ceph-ssd-retain             
| `ceph-ssd`
| Retain

| csi-ceph-hdd                    
| `ceph-hdd`
| Delete

| csi-ceph-hdd-retain             
| `ceph-hdd`
| Retain

| csi-high-iops                   
| `high-iops`
| Delete

| csi-high-iops-retain            
|`high-iops`
| Retain
|===

Все перечисленные классы хранения:

- Разрешают увеличение тома (`allowVolumeExpansion: true`).
- Откладывают создание и привязку тома до момента, когда будет создан первый под, использующий соответствующий {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PersistentVolumeClaim]} (`volumeBindingMode: WaitForFirstConsumer`).

{/tab}

{/tabs}

## {heading(Смотрите также)[id=k8s-storage-see-also]}

- {linkto(../about#k8s-about)[text=Обзор сервиса Cloud Containers]}.
- {linkto(../architecture#k8s-architecture)[text=Архитектура сервиса Cloud Containers]}.
- {linkto(../network#k8s-network)[text=Сеть в кластере]}.