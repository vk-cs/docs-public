# {heading(Репликации)[id=dbaas-replication]}

Сервис Cloud Databases позволяет добавить реплики к уже существующим БД, созданным в конфигурации `master-replica`.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для БД, которая была создана в конфигурации `master-replica`.
1. Выберите пункт **Создать реплику**.
{ifdef(public)}
1. На открывшейся странице заполните поля создания новой БД.
{/ifdef}
{ifndef(public)}
1. Задайте параметры реплики:

   * **Тип виртуальной машины** — {linkto(../../concepts/flavor#dbaas-flavor)[text=шаблон конфигурации]} ВМ из списка.
   * **Зона доступности** — зона доступности ВМ (можно выбрать из списка доступных зон, либо она будет назначена автоматически).
   * **Тип диска** — {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=тип диска]} из списка. Выберите тип, либо он будет назначен автоматически.
   * **Размер диска** — нужный размер диска в ГБ.
   * **Назначить внешний IP** — при выборе пункта инстансу БД будет назначен {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-associate)[text=Floating IP-адрес]}.
{/ifndef}
1. Нажмите кнопку **Создать реплику**.

Реплика БД появится в общем списке инстансов БД.