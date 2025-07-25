## Просмотр статистики резервного копирования

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.

   Откроется страница, на которой отображается статистика резервного копирования в вашем проекте:

   * суммарное количество планов резервного копирования с автоматическим и ручным запуском;
   * суммарный объем всех резервных копий виртуальных машин;
   * количество успешных запусков резервного копирования от их общего количества за последние 24 часа и последние 7 дней;
   * количество успешных восстановлений ВМ или инстансов БД от их общего количества за последние 24 часа.

   В статистике учитываются все запуски резервного копирования и восстановления: как выполненные автоматически, так и вручную.

## Просмотр списка резервных копий инстанса

<tabs>
<tablist>
<tab>Список копий, созданных по плану</tab>
<tab>Список копий, созданных вручную</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Автоматическое**.

   Откроется список всех планов резервного копирования в вашем проекте.

   {note:info}

   Для каждого плана в списке отображается суммарный объем резервных копий ВМ, включенных в план. Резервные копии инстансов БД и АБД при расчете суммарного объема не учитываются.

   {/note}

1. Чтобы облегчить поиск плана в списке:

    * Отфильтруйте список. Для этого нажмите кнопку **Фильтры** и выберите статус запусков резервного копирования, интервал времени и тип резервных копий.
    * Введите частично или полностью название нужного плана в строку поиска. По мере ввода в списке будут отображаться только планы с подходящими названиями.

1. Чтобы открыть список инстансов, включенных в план, используйте один из способов:

   * Нажмите на название нужного плана в списке.
   * В списке планов нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного плана и выберите **Просмотр резервных копий**.

1. Чтобы открыть список резервных копий инстанса, нажмите на его название или на значок ![ ](/ru/assets/right-arrow-icon.svg "inline").

</tabpanel>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Ручное**.

   Откроется список всех инстансов (ВМ, инстансов БД и АБД) в вашем проекте, для которых выполнялось ручное резервное копирование.

   {note:info}

   Для каждой ВМ в списке отображается суммарный объем ее резервных копий, сделанных вручную. Для инстансов БД и АБД данные об объеме не отображаются.

   {/note}

1. Чтобы облегчить поиск нужного инстанса в списке:

    * Отфильтруйте список по типу резервных копий.
    * Введите частично или полностью имя нужного инстанса в строку поиска. По мере ввода в списке будут отображаться только инстансы с подходящими названиями.

1. Чтобы открыть список резервных копий инстанса, нажмите на ссылку в столбце **Точки восстановления** для нужного инстанса.

</tabpanel>
</tabs>

## {heading(Удаление резервных копий инстанса)[id=delete_backup_copy]}

<tabs>
<tablist>
<tab>Удаление копий, созданных по плану</tab>
<tab>Удаление копий, созданных вручную</tab>
</tablist>
<tabpanel>

Чтобы удалить сразу все резервные копии инстанса, созданные в рамках плана, [удалите](../manage-backup-plan#activate_stop_delete_backup_plan) этот план.

Чтобы удалить отдельные резервные копии инстанса:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Автоматическое**.

   Откроется список всех планов резервного копирования в вашем проекте.

1. Чтобы облегчить поиск плана в списке:

    * Отфильтруйте список. Для этого нажмите кнопку **Фильтры** и выберите статус запусков резервного копирования, интервал времени и тип резервных копий.
    * Введите частично или полностью название нужного плана в строку поиска. По мере ввода в списке будут отображаться только планы с подходящими названиями.

1. Чтобы открыть список инстансов, включенных в план, используйте один из способов:

   * Нажмите на название плана в списке.
   * В списке планов нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного плана и выберите **Просмотр резервных копий**.

1. Чтобы открыть список резервных копий инстанса, нажмите на его имя или на значок ![ ](/ru/assets/right-arrow-icon.svg "inline").
1. Удалите неактуальные резервные копии одним из способов:

   <tabs>
   <tablist>
   <tab>Для нескольких копий</tab>
   <tab>Для одной копии</tab>
   </tablist>
   <tabpanel>

      1. В списке резервных копий выберите копии с помощью флажков.
      1. Над списком копий нажмите кнопку **Удалить копию** и подтвердите действие.

   </tabpanel>
   <tabpanel>

      1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для копии, которую нужно удалить.
      1. Выберите пункт **Удалить копию** и подтвердите действие.

   </tabpanel>
   </tabs>

</tabpanel>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Ручное**.
1. Чтобы облегчить поиск нужных инстансов в списке:

    * Отфильтруйте список по типу резервных копий.
    * Введите частично или полностью имя нужного инстанса в строку поиска. По мере ввода в списке будут отображаться только инстансы с подходящими названиями.

1. Чтобы удалить сразу все резервные копии одного или нескольких инстансов:

   <tabs>
   <tablist>
   <tab>Для нескольких инстансов</tab>
   <tab>Для одного инстанса</tab>
   </tablist>
   <tabpanel>

      1. В списке инстансов выберите инстансы с помощью флажков.
      1. Над списком инстансов нажмите кнопку **Удалить** и подтвердите действие.

   </tabpanel>
   <tabpanel>

      1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса и выберите **Удалить**.
      1. Подтвердите действие.

   </tabpanel>
   </tabs>

1. Чтобы удалить отдельные резервные копии инстанса:

   <tabs>
   <tablist>
   <tab>Для нескольких копий</tab>
   <tab>Для одной копии</tab>
   </tablist>
   <tabpanel>

      1. Нажмите на ссылку в столбце **Точки восстановления** для нужного инстанса.
      1. В списке резервных копий выберите копии с помощью флажков.
      1. Над списком копий нажмите кнопку **Удалить** и подтвердите действие.

   </tabpanel>
   <tabpanel>

      1. Нажмите на ссылку в столбце **Точки восстановления** для нужного инстанса.
      1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для копии, которую нужно удалить.
      1. Выберите пункт **Удалить копию** и подтвердите действие.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

{note:info}

Своевременно удаляйте ненужные резервные копии, чтобы сэкономить место в хранилище.

{/note}
