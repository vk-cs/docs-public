{includetag(vm)}

## {heading(Виртуальные машины)[id=include-quotasandlimits-vm]}

### {heading(Общее количество ВМ и vCPU)[id=include-quotasandlimits-vm-vcpu]}

[cols="2,1,1,1,1,1,1", options="header"]
|===
| Параметр
| Квота в ЛК
| Квота в CLI
| Базовый уровень
| Повышенный уровень
| Лимит
| Жесткий

| Количество инстансов в проекте
| **Виртуальные машины**
|`instances`
| 2 шт.
| 5 шт.
| 1000 шт.
| ![](../../../../assets/no.svg "inline")

| Количество vCPU в проекте
| **vCPU**
| `cores`
| 16 шт.
| 40 шт.
| не ограничено
| ![](../../../../assets/no.svg "inline")

| Общий объем оперативной памяти в проекте
| **RAM**
| `ram`
| 64 ГБ
| 160 ГБ
| не ограничено
| ![](../../../../assets/no.svg "inline")

| HEAVY агрегаты
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| 0 шт.
| 0 шт.
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline") 
|===

Лимит на количество инстансов в проекте можно превысить, если {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=увеличить]} соответствующую квоту.

{note:info}
В личном кабинете может отображаться не более 1000 виртуальных машин.
{/note}

### {heading(Лимиты без квот)[id=include-quotasandlimits-vm-no-quotas-limits]}

[cols="2,1,1", options="header"]
|===
| Параметр
| Лимит
| Жесткий

| Количество vCPU у одного инстанса
| 32 шт.
| ![](../../../../assets/no.svg "inline")

| Количество High-Freq vCPU у одного инстанса
| 24 шт.
| ![](../../../../assets/no.svg "inline")

| Количество GPU у одного инстанса
| 4 шт.

(8 шт. для [Tesla H200](/ru/computing/gpu/concepts/about#gpu-about-flavors))
| ![](../../../../assets/check.svg "inline")

| Объем RAM у одного инстанса   
| 1024 ГБ
| ![](../../../../assets/no.svg "inline")
|===

Лимиты на количество процессоров (vCPU и High-Freq vCPU) и оперативной памяти связаны с ограничениями стандартных гипервизоров. Если вам необходимо большее количество vCPU или High-Freq vCPU, согласуйте увеличение квот с менеджером по электронной почте [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru) и закажите выделенный гипервизор с нужными характеристиками.

Лимит GPU у одного инстанса связан с ограничением технологии KVM, которая не позволяет подключить к одной виртуальной машине большее количество видеокарт.

## {heading(Диски и образы)[id=include-quotasandlimits-images-volumes]}

### {heading(Объем дисков)[id=include-quotasandlimits-images-volumes-size]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Квота в ЛК
| Квота в CLI
| Базовый уровень
| Повышенный уровень
| Лимит

| Общий объем дисков в проекте
| **Размер дисков**
| `gigabytes`
| 0 ГБ
| 1000 ГБ
| не ограничено

| Общий объем дисков High-IOPS SSD
| **Размер High-IOPS SSD**
| `gigabytes_high-iops`
| 400 ГБ
| 1000 ГБ
| не ограничено

| Общий объем дисков High-IOPS HA SSD
| **Размер High-IOPS HA SSD**
| `gigabytes_high-iops-ha`
| 400 ГБ
| 1000 ГБ
| не ограничено

| Общий объем дисков High-IOPS SSD в {linkto(/ru/start/concepts/architecture#architecture-az)[text=зоне доступности]} GZ1 (legacy)
| **Размер High-IOPS SSD в зоне - (DP1)**
| `gigabytes_dp1-high-iops`
| 400 ГБ
| 1000 ГБ
| не ограничено

| Общий объем дисков High-IOPS SSD в {linkto(/ru/start/concepts/architecture#architecture-az)[text=зоне доступности]} MS1 (legacy)
| **Размер High-IOPS SSD в зоне Москва (MS1)**
| `gigabytes_ko1-high-iops`
| 400 ГБ
| 1000 ГБ
| не ограничено
|===

Общий объем дисков Low Latency NVMe не квотируется и не ограничивается лимитами.

Квоты на общий объем дисков в проекте учитывают диски всех типов, в том числе High-IOPS SSD. Квоты на общий объем дисков High-IOPS SSD учитывают диски, созданные в обеих зонах доступности. Если вы {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=запрашиваете]} увеличение квоты, включенной в другую квоту, квота более высокого уровня будет увеличена пропорционально.

### {heading(Количество дисков)[id=include-quotasandlimits-iv-number]}

[cols="3,2,2,1,1,1", options="header"]
|===
| Параметр
| Квота в ЛК
| Квота в CLI
| Базовый уровень
| Повышенный уровень
| Лимит

| Количество дисков в проекте
| **Диски**
| `volumes`
| 4 шт.
| 10 шт.
| не ограничено

| Количество дисков High-IOPS SSD в проекте
| **Диски High-IOPS SSD**
| `volumes_high-iops`
| 4 шт.
| 10 шт.
| не ограничено

| Количество дисков High-IOPS HA SSD в проекте
| **Диски High-IOPS HA SSD**
| `volumes_high-iops-ha`
| 4 шт.
| 10 шт.
| не ограничено

| Количество дисков High-IOPS SSD в {linkto(/ru/start/concepts/architecture#architecture-az)[text=зоне доступности]} GZ1 (legacy)
| **Диски High-IOPS SSD в зоне - (DP1)**
| `volumes_dp1-high-iops`
| 4 шт.
| 10 шт.
| не ограничено

| Количество дисков High-IOPS SSD в {linkto(/ru/start/concepts/architecture#architecture-az)[text=зоне доступности]} MS1 (legacy)
| **Диски High-IOPS SSD в зоне Москва (MS1)**
| `volumes_ko1-high-iops`
| 4 шт.
| 10 шт.
| не ограничено
|===

Количество дисков Low Latency NVMe не квотируется и не ограничивается лимитами.

Квоты на общее количество дисков в проекте учитывают диски всех типов, в том числе High-IOPS SSD. Квоты на общее количество дисков High-IOPS SSD учитывают диски, созданные в обеих зонах доступности. Если вы {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=запрашиваете]} увеличение квоты, включенной в другую квоту, квота более высокого уровня будет увеличена пропорционально.

### {heading(Лимиты без квот)[id=include-quotasandlimits-iv-no-quotas-limits]}

[cols="2,2,3,1", options="header"]
|===
|Параметр
|Лимит
|Комментарий
|Жесткий

|Количество дисков у одного инстанса
|25 шт. при подключенном конфигурационном диске.

26 шт., если конфигурационный диск отключен
|Лимит связан с ограничениями шины PCI.

Если при {linkto(/ru/computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создании виртуальной машины]} в личном кабинете включена опция **Использовать конфигурационный диск** или в OpenStack CLI задействован параметр `--use-config-drive`, то максимальное количество дисков — 25 штук. Используйте конфигурационный диск в сетях без {linkto(/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP-сервера]}.

Если опция **Использовать конфигурационный диск** отключена или параметр `--use-config-drive` не задействован, то максимальное количество дисков — 26 штук
|![](/ru/assets/check.svg "inline")

|Размер одного диска HDD
|5 ТБ через личный кабинет
(1 ТБ при установленных {linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=антифрод-ограничениях]}).

100 ТБ при помощи OpenStack CLI
|В некоторых сервисах {var(cloud)} на размер дисков могут быть установлены собственные ограничения.

{linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=Антифрод-ограничения]} можно снять через обращение в [техническую поддержку](/ru/contacts)
|![](/ru/assets/check.svg "inline")

|Размер одного диска SSD
|5 ТБ через личный кабинет
(1 ТБ при установленных {linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=антифрод-ограничениях]}).

100 ТБ при помощи OpenStack CLI
|В некоторых сервисах {var(cloud)} на размер дисков могут быть установлены собственные ограничения.

{linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=Антифрод-ограничения]} можно снять через обращение в [техническую поддержку](/ru/contacts)
|![](/ru/assets/check.svg "inline")

|Размер одного диска High-IOPS SSD
|2 ТБ через личный кабинет
(1 ТБ при установленных {linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=антифрод-ограничениях]}).

10 ТБ при помощи OpenStack CLI
|Диск, созданный с превышением лимита (10 ТБ), ничем не отличается по производительности, но восстановление или миграция такого диска займут значительное время и будут сопряжены с рисками. Лимит можно превысить, обратившись к менеджеру по электронной почте [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

{linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=Антифрод-ограничения]} можно снять через обращение в [техническую поддержку](/ru/contacts).

В некоторых сервисах {var(cloud)} на размер дисков могут быть установлены собственные ограничения
|![](/ru/assets/no.svg "inline")

|Размер одного диска High-IOPS HA SSD
|2 ТБ через личный кабинет
(1 ТБ при установленных {linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=антифрод-ограничениях]}).

10 ТБ при помощи OpenStack CLI
|Диск, созданный с превышением лимита (10 ТБ), ничем не отличается по производительности, но восстановление или миграция такого диска займут значительное время и будут сопряжены с рисками. Лимит можно превысить, обратившись к менеджеру по электронной почте [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

{linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=Антифрод-ограничения]} можно снять через обращение в [техническую поддержку](/ru/contacts).

В некоторых сервисах {var(cloud)} на размер дисков могут быть установлены собственные ограничения
|![](/ru/assets/no.svg "inline")

|Размер одного диска Low Latency NVMe
|2 ТБ через личный кабинет
(1 ТБ при установленных {linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=антифрод-ограничениях]}).

10 ТБ при помощи OpenStack CLI
|Лимит (10 ТБ) можно превысить, обратившись к менеджеру по электронной почте [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

{linkto(/ru/intro/it-security/platform-security#it-security-platform-security-attacks-countering)[text=Антифрод-ограничения]} можно снять через обращение в [техническую поддержку](/ru/contacts).

В некоторых сервисах {var(cloud)} на размер дисков могут быть установлены собственные ограничения
|![](/ru/assets/no.svg "inline")

|Размер одного образа
|100 ГБ через личный кабинет.

 500 ГБ при помощи OpenStack CLI
|Лимит является жестким для сервиса Glance.

Если вам необходимо загрузить образ большего размера, воспользуйтесь [инструкцией](/ru/storage/s3/how-to-guides/load-large-image)
|![](/ru/assets/no.svg "inline")

|Общий объем образов
|2 ТБ
|Лимит можно превысить, обратившись к менеджеру по электронной почте [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")

|Общее количество снимков дисков
|200 шт.
|Лимит можно превысить, обратившись к менеджеру по электронной почте [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru)
|![](/ru/assets/no.svg "inline")
|===

## {heading(Файловые хранилища)[id=include-quotasandlimits-fs]}

[cols="3,2,1,1,1,1", options="header"]
|===
| Параметр
| Квота в ЛК
| Базовый уровень
| Повышенный уровень
| Лимит
| Жесткий

| Количество файловых хранилищ в проекте
| **Файловые хранилища NFS/CIFS**
| 0 шт.
| 5 шт.
| не ограничено
| ![](/ru/assets/no.svg "inline")

| Общий объем всех файловых хранилищ в проекте
| **Размер файловых хранилищ NFS/CIFS**
| 0 ГБ
| 100 ГБ
| не ограничено
| ![](/ru/assets/no.svg "inline")

| Общий объем снимков файловых хранилищ в проекте
| **Размер снимков файловых хранилищ NFS/CIFS**
| 0 ГБ
| 100 ГБ
| не ограничено
| ![](/ru/assets/no.svg "inline")

| Количество сетей файловых хранилищ
| **Сети файловых хранилищ NFS/CIFS**
| 0 шт.
| 2 шт.
| не ограничено
| ![](/ru/assets/no.svg "inline")

| Размер одного файлового хранилища
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| 50 ТБ
| ![](/ru/assets/check.svg "inline")
|===

Квота на количество сетей файловых хранилищ (**Сети файловых хранилищ NFS/CIFS**) является квотой для внутреннего использования.

{/includetag}