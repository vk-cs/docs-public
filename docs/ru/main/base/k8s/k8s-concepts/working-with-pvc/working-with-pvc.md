## Общее описание

Существуют два основных понятия, PV (PersistentVolume) и PVC (PersistentVolumeClaim).

Persistent Volumes предназначены для постоянного хранения данных подами. То есть такие данные переживут перезапуск пода.

Persitent Volume Claim представляет собой запрос на выделение Persistent Volume. В результате должен быть выделен как существующий Persistent Volume, так и создан новый.

В случае облачной платформы VK Cloud в качестве PV могут использоваться как блочные, так и файловые хранилища, доступные в облаке.

В качестве постоянного хранилища платформа VK Cloud предоставляет:

1. Распределенное блочное хранилище на базе SDS (software defined storage) CEPH. Такие диски могут быть как на базе HDD, так и на базе SSD. Все данные на этом типе хранилища автоматически реплицируются по трем серверам, как минимум находящихся в разных серверных стойках.
2. Высокоскоростное блочное хранилище на базе SSD/NVME-дисков, подключенное по iSCSI к каждому вычислительному серверу (HIGH IOPS SSD). Это хранилище характеризуется большим количеством гарантированных IOPS чем SSD CEPH и меньшим latency. Репликация данного хранилища основана на аппаратном RAID-10.
3. Виртуальное файловое хранилище, подключаемое по протоколам NFS/CIFS.

Платформа VK Cloud предоставляет все виды блочных хранилищ с помощью универсального механизма Cinder, абстрагирующий работу с конкретным бэкендом хранения.

С точки зрения Kubernetes любой блочный постоянный диск, который вы используете, будет представлять собой Cinder Volume, т.е. обычный диск в терминологии нашего Облака. Может быть создан вручную администратором кластера, или динамически через PVC. Типы дисков в Kubernetes сопоставляются с предоставляемыми VK Cloud типами хранилища следующим образом:

- `ceph-hdd` в терминологии Cinder: SDS CEPH HDD.
- `ceph-ssd` в терминологии Cinder: SDS CEPH SSD.
- `high-iops` в терминологии Cinder: HIGH IOPS SSD.

Кластеры Kubernetes в VK Cloud поддерживают работу с блочными устройствами облака с помощью механизма CSI (Container Storage Interface). В том числе этот механизм позволяет гибко подключать и управлять дисками, с помощью указания Storage Class в декларации PVC.

PersistentVolumeClaim (PVC) является запросом на создание PV, при его создании, в кластере автоматически будет создан PV (в разделе Диски панели управления появится соответствующий диск).

С более подробной информацией о Persistent Volumes рекомендуем ознакомиться на [официальном сайте](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) Kubernetes.

## Предустановленные классы хранения

При использовании PVC необходимо задать класс хранения (storage class).
О том, как работать с классами хранения, см. [здесь](../k8s-pvc/manage-storage-classes).

В каждом кластере Kubernetes VK Cloud присутствуют преднастроенные классы хранения, использующие Cinder CSI для блочных хранилищ.
Классы предоставляют разные типы хранилища в [нескольких регионах](../../../additionals/account/concepts/regions) и зонах доступности:

<tabs>
<tablist>
<tab>Регион: Москва</tab>
<tab>Регион: Амстердам</tab>
</tablist>
<tabpanel>

| Наименование<br>класса хранения | Тип хранилища<br>Cinder CSI | Зона<br>доступности | Reclaim<br>Policy |
| ------------------------------- | --------------------------- | ------------------- | ----------------- |
| csi-ceph-hdd-gz1                | `ceph-hdd`                  | GZ1                 | Delete            |
| csi-ceph-hdd-gz1-retain         | `ceph-hdd`                  | GZ1                 | Retain            |
| csi-ceph-hdd-ms1                | `ceph-hdd`                  | MS1                 | Delete            |
| csi-ceph-hdd-ms1-retain         | `ceph-hdd`                  | MS1                 | Retain            |
| csi-ceph-ssd-gz1                | `ceph-ssd`                  | GZ1                 | Delete            |
| csi-ceph-ssd-gz1-retain         | `ceph-ssd`                  | GZ1                 | Retain            |
| csi-ceph-ssd-ms1                | `ceph-ssd`                  | MS1                 | Delete            |
| csi-ceph-ssd-ms1-retain         | `ceph-ssd`                  | MS1                 | Retain            |
| csi-high-iops-gz1               | `high-iops`                 | GZ1                 | Delete            |
| csi-high-iops-gz1-retain        | `high-iops`                 | GZ1                 | Retain            |
| csi-high-iops-ms1               | `high-iops`                 | MS1                 | Delete            |
| csi-high-iops-ms1-retain        | `high-iops`                 | MS1                 | Retain            |

</tabpanel>
<tabpanel>

| Наименование<br>класса хранения | Тип хранилища<br>Cinder CSI | Зона<br>доступности | Reclaim<br>Policy |
| ------------------------------- | --------------------------- | ------------------- | ----------------- |
| csi-ceph-hdd-ams                | `ceph-hdd`                  | AMS                 | Delete            |
| csi-ceph-hdd-ams-retain         | `ceph-hdd`                  | AMS                 | Retain            |
| csi-ceph-ssd-ams                | `ceph-ssd`                  | AMS                 | Delete            |
| csi-ceph-ssd-ams-retain         | `ceph-ssd`                  | AMS                 | Retain            |
| csi-high-iops-ams               | `high-iops`                 | AMS                 | Delete            |
| csi-high-iops-ams-retain        | `high-iops`                 | AMS                 | Retain            |

</tabpanel>
</tabs>

Все упомянутые классы хранения:

- Разрешают увеличение тома (`allowVolumeExpansion: true`).
- Используют немедленные привязку и выделение тома (`volumeBindingMode: Immediate`).

Подробнее об этих параметрах и Reclaim Policy читайте [здесь](../k8s-pvc/manage-storage-classes#parametry-klassov-hraneniya).
