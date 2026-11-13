# {heading(LLD-диски)[id=iaas-volumes-lld]}

LLD-диск — локальный NVMe-диск с высокой скоростью работы и быстрым откликом (тип диска `ef-nvme`).
Такой диск располагается на одном гипервизоре с ВМ.

{note:info}
LLD-диски и шаблоны конфигурации ВМ с поддержкой LLD по умолчанию недоступны в проекте.
Обратитесь к администратору {var(cloud)}, чтобы добавить их в проект.
{/note}

При работе с LLD-дисками учитывайте особенности:

* LLD-диск может использоваться только как дополнительный диск ВМ: создать ВМ с таким диском или сделать его загрузочным нельзя.
* Данные на таком диске не реплицируются: при отказе гипервизора или неудачной миграции они могут быть потеряны.
* Если у LLD-диска есть снимки, увеличить его размер нельзя (подробнее — в разделе {linkto(../../../instructions/volumes/volumes-manage#iaas-volumes-manage-disk-size)[text=%text]}).
* Максимальный размер диска при создании в личном кабинете — 5 ТБ (значение по умолчанию).
* Для LLD-дисков действуют отдельные квоты — на количество таких дисков и их суммарный объем.
  Создание и увеличение размера LLD-дисков проверяется по этим квотам и одновременно по общим квотам дисков (подробнее — в разделе {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=%text]}).
{ifndef(private-cert)}
* Тип диска не поддерживается в сервисах {var(kube)} и Cloud Databases.
{/ifndef}
* Миграция ВМ, к которой подключен LLD-диск, на другой гипервизор выполняется администратором {var(cloud)}.
  Подробнее — в документе **Руководство администратора {var(cloud)}** в разделе **LLD** → **Концепции** → **LLD-хранилище**.

В остальном с LLD-дисками поддерживаются те же операции, что и с другими типами дисков (подробнее — в {linkto(#tab_lld_operations)[text=таблице %number]}).

{caption(Таблица {counter(table)[id=numb_tab_lld_operations]} — Операции с LLD-дисками)[align=right;position=above;id=tab_lld_operations;number={const(numb_tab_lld_operations)}]}
[cols="2,1", options="header"]
|===
|Операция
|Инструкция

|Создание диска, в том числе из образа или снимка
|{linkto(../../../instructions/volumes/volumes-create#iaas-volumes-create)[text=%text]}

|Подключение диска к ВМ и отключение от него
|{linkto(../../../instructions/volumes/volumes-connect#iaas-volumes-connect)[text=%text]}

|Расширение диска
|{linkto(../../../instructions/volumes/volumes-manage#iaas-volumes-manage-disk-size)[text=%text]}

|Создание снимков диска
|{linkto(../../../instructions/volumes/volumes-snapshots#iaas-volumes-snapshots)[text=%text]}

|Клонирование диска и другие операции
|{linkto(../../../instructions/volumes/volumes-manage#iaas-volumes-manage)[text=%text]}

|Смена типа диска
|{linkto(../../../instructions/volumes/volumes-manage#iaas-volumes-manage-chance-disk-type)[text=%text]}

|Удаление диска
|{linkto(../../../instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=%text]}

|Резервное копирование и восстановление ВМ с LLD-дисками
|{linkto(../../../../../storage/backups#cloud-backup)[text=%text]}
|===
{/caption}
