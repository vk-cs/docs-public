## Поддерживаемые типы хранилищ VK Cloud

- Блочные хранилища:

  - На базе [Ceph](https://ceph.io/en/). Для обеспечения отказоусточивости и сохранности данных, хранилище состоит из трех реплик, находящихся в разных серверных стойках.

    Хранилище может использовать HDD- или SSD-диски.

  - На базе высокопроизводительных [NVMe](https://www.snia.org/education/what-is-nvme) SSD-дисков (High-IOPS SSD). Такое хранилище подключается по протоколу [iSCSI](https://www.snia.org/education/what-is-iscsi). Для обеспечения отказоусточивости и сохранности данных на уровне хранилища применяется аппаратный RAID-10.

- [Файловые хранилища](https://www.snia.org/education/what-is-nas), подключаемые по протоколам [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) и [СIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview).

## Работа с Container Storage Interface (CSI)

Кластеры Kubernetes используют [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) для интеграции с блочными хранилищами.

Типы хранилищ, доступные в кластере Kubernetes через Cinder CSI, соотносятся с блочными хранилищами VK Cloud следующим образом:

- Ceph HDD соответствует `ceph-hdd` в Cinder.
- Ceph SSD соответствует `ceph-ssd` в Cinder.
- High-IOPS SSD соответствует `high-iops` в Cinder.

Применение Cinder CSI позволяет:

- Создавать на основе имеющихся типов хранилищ постоянные тома (persistent volumes) вручную и автоматически (с помощью Persistent Volume Claims). При создании постоянного тома через PVC есть возможность использовать один из имеющихся классов хранения.

   <info>

  При создании тома в Kubernetes соответствующий ему диск в платформе VK Cloud будет создан автоматически.

   </info>

- Автоматически перемонтировать постоянные тома:
  - При сбое пода, использующего том, или worker-узла, на котором находится под (при условии, что под будет восстановлен на этом или другом узле).
  - При миграции пода, использующего том, с одного worker-узла на другой.

## Преднастроенные классы хранения

При использовании Persistent Volume Claim необходимо задать класс хранения (storage class).

В каждом кластере Kubernetes VK Cloud есть преднастроенные классы хранения, использующие Cinder CSI для блочных хранилищ.
Классы предоставляют разные типы хранилищ в [нескольких регионах](../../../../additionals/account/concepts/regions/) и зонах доступности:

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

Все перечисленные классы хранения:

- Разрешают увеличение тома (`allowVolumeExpansion: true`).
- Используют немедленное выделение и привязку тома (`volumeBindingMode: Immediate`).

## Смотрите также

- [Обзор сервиса контейнеров](../overview/).
- [Архитектура сервиса контейнеров](../architecture/).
- [Сеть в кластере](../network/).
