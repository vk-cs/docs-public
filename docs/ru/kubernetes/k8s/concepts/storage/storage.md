Данные в кластере Kubernetes могут храниться несколькими способами: непосредственно в контейнере или на _томах_ (volumes). При хранении данных в контейнере возникают проблемы:

- При сбое или остановке контейнера данные теряются.
- Данные контейнера недоступны для других контейнеров, даже если все контейнеры находятся в одном [поде](../../reference/pods).

Чтобы решить эти проблемы, используются тома Kubernetes. Тома имеют разный жизненный цикл в зависимости от сценария использования:

- У _временных томов_ (ephemeral volume, EV) жизненный цикл совпадает с жизненным циклом пода. Когда под, использующий такой том, прекращает свое существование, том тоже удаляется. Временные тома могут использоваться только одним подом, поэтому объявление томов происходит непосредственно в манифесте пода.

- У _постоянных томов_ (persistent volume, PV) свой [жизненный цикл](../../reference/pvs-and-pvcs), не зависящий от жизненного цикла пода. Благодаря разделению жизненных циклов такие тома можно переиспользовать позднее с другими подами. Для работы с постоянными томами поды и другие рабочие нагрузки используют Persistent Volume Claim (PVC).

В Cloud Containers доступ к Persistent Volume Claim в режиме ReadWriteMany (RWX) не реализован. Это значит, что вы не можете одновременно записывать данные в один PV из нескольких подов на разных узлах.

Чтобы организовать общий доступ к данным из нескольких подов на разных узлах, [разверните NFS-сервер](/ru/computing/iaas/instructions/fs-manage) на отдельной виртуальной машине. NFS-сервер предоставляет общий доступ к данным по сети, позволяя нескольким подам одновременно читать и записывать данные в общий том.

Чтобы обеспечить работу с PV, в VK Cloud кластеры Kubernetes тесно интегрированы с платформой:

- Кластер [поддерживает](#podderzhivaemye_tipy_hranilishch_vk_cloud) хранилища, предоставляемые платформой VK Cloud. Поддержка блочных хранилищ реализована с помощью [Cinder CSI](#rabota_s_container_storage_interface_csi).
- В кластере доступны [преднастроенные классы хранения](#prednastroennye_klassy_hraneniya) (storage class) для блочного хранилища, которые реализуют различные [политики освобождения постоянных томов](#dostupnye_politiki_osvobozhdeniya_postoyannyh_tomov).

## Поддерживаемые типы хранилищ VK Cloud

- Блочные хранилища:

  - На базе [Ceph](https://ceph.io/en/). Для обеспечения отказоустойчивости и сохранности данных хранилище состоит из трех реплик, находящихся в разных серверных стойках. Хранилище использует SSD-диски.

  - На базе высокопроизводительных [NVMe](https://www.snia.org/education/what-is-nvme) SSD-дисков (High-IOPS SSD). Такое хранилище подключается по протоколу [iSCSI](https://www.snia.org/education/what-is-iscsi). Для обеспечения отказоусточивости и сохранности данных на уровне хранилища применяется аппаратный RAID-10.

- [Файловые хранилища](https://www.snia.org/education/what-is-nas), подключаемые по протоколам [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system) и [CIFS](https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview).

## Работа с Container Storage Interface (CSI)

В VK Cloud кластеры Kubernetes используют [OpenStack Cinder](https://docs.openstack.org/cinder/latest/) для интеграции с блочными хранилищами.

Типы хранилищ, доступные в кластере Kubernetes через Cinder CSI, соотносятся с блочными хранилищами VK Cloud следующим образом:

- Ceph SSD соответствует `ceph-ssd` в Cinder.
- High-IOPS SSD соответствует `high-iops` в Cinder.

Применение Cinder CSI позволяет:

- Статически (static provisioning) и динамически (dynamic provisioning) [подготавливать](../../reference/pvs-and-pvcs#1_podgotovka_2a52d941) PV на основе блочных хранилищ.

  При динамической подготовке тома можно использовать преднастроенные классы хранения.

- Автоматически перемонтировать PV:

  - При сбое пода, использующего том, или worker-узла, на котором находится под (при условии, что под будет восстановлен на этом или другом узле).
  - При миграции пода, использующего том, с одного worker-узла на другой.

- Управлять хранилищем VK Cloud, которое используется PV:
  - При динамической подготовке тома будет автоматически создан соответствующий этому тому диск в VK Cloud.
  - Если для тома задана политика освобождения `Delete`, то после удалении PVC будет удален связанный с ним том и соответствующий этому тому диск в VK Cloud.

## Доступные политики освобождения постоянных томов

Для PV можно задать [политику освобождения](../../reference/pvs-and-pvcs#4_osvobozhdenie_916d4ba3) (reclaim policy), которая сработает при удалении связанного с этим томом PVC:

- Оставить том (`Retain`). PV и связанное с ним хранилище VK Cloud не будут удалены.

  Такая политика применима как для блочных, так и для файловых хранилищ. Используйте ее для PV с важными данными, чтобы защитить данные при случайном удалении PVC. При необходимости можно вручную очистить и удалить PV с этой политикой и связанные с ними хранилища VK Cloud.

- Удалить том (`Delete`). PV и связанное с ним хранилище VK Cloud будут удалены.

  Такая политика применима только для блочных хранилищ.

  {note:warn}

  Используйте эту политику и реализующие ее классы хранения с осторожностью: удаление PVC повлечет за собой удаление PV и диска, соответствующего этому тому.

  {/note}

## Преднастроенные классы хранения

При использовании [динамической подготовки](../../reference/pvs-and-pvcs#1_podgotovka_2a52d941) постоянного тома необходимо указать класс хранения. Класс хранения по умолчанию не настроен в кластерах Cloud Containers. Можно выбрать класс по умолчанию самостоятельно, или явно указывать нужный класс явно при создании PVC.

Есть преднастроенные классы хранения, использующие Cinder CSI для блочных хранилищ.

Классы предоставляют разные типы хранилищ в [нескольких регионах](../../../../tools-for-using-services/account/concepts/regions) и зонах доступности.
Каждому классу хранения соответствует своя политика освобождения постоянных томов.

<tabs>
<tablist>
<tab>Регион: Москва</tab>
</tablist>
<tabpanel>

| Наименование<br>класса хранения | Тип хранилища<br>Cinder CSI | Зона<br>доступности | Reclaim<br>Policy |
| ------------------------------- | --------------------------- | ------------------- | ----------------- |
| csi-ceph-ssd-gz1                | `ceph-ssd`                  | GZ1                 | Delete            |
| csi-ceph-ssd-gz1-retain         | `ceph-ssd`                  | GZ1                 | Retain            |
| csi-ceph-ssd-ms1                | `ceph-ssd`                  | MS1                 | Delete            |
| csi-ceph-ssd-ms1-retain         | `ceph-ssd`                  | MS1                 | Retain            |
| csi-ceph-ssd-me1                | `ceph-ssd`                  | ME1                 | Delete            |
| csi-ceph-ssd-me1-retain         | `ceph-ssd`                  | ME1                 | Retain            |
| csi-high-iops-gz1               | `high-iops`                 | GZ1                 | Delete            |
| csi-high-iops-gz1-retain        | `high-iops`                 | GZ1                 | Retain            |
| csi-high-iops-ms1               | `high-iops`                 | MS1                 | Delete            |
| csi-high-iops-ms1-retain        | `high-iops`                 | MS1                 | Retain            |
| csi-high-iops-me1               | `high-iops`                 | ME1                 | Delete            |
| csi-high-iops-me1-retain        | `high-iops`                 | ME1                 | Retain            |

</tabpanel>
</tabs>

Все перечисленные классы хранения:

- Разрешают увеличение тома (`allowVolumeExpansion: true`).
- Используют немедленное выделение и привязку тома (`volumeBindingMode: Immediate`).

## Смотрите также

- [Обзор сервиса Cloud Containers](../about).
- [Архитектура сервиса Cloud Containers](../architecture).
- [Сеть в кластере](../network).
