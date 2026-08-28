{tabs}

{tab(Личный кабинет)}

{includetag(restore-from-backup-volume-backups)}
1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(restore-from-backup-volume-iaas)}
1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
   {/includetag}
1. Перейдите в раздел **Резервное копирование** одним из способов.

   - Через боковое меню: **Cloud Backup → Резервное копирование**.

   - Через контекстное меню виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
        {includetag(restore-from-backup-volume-backups)}
     1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужной ВМ и выберите пункт **Восстановить из бэкапа**.
        {/includetag}
        {includetag(restore-from-backup-volume-iaas)}
     1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужной ВМ и выберите пункт **Восстановить из бэкапа**.
        {/includetag}

1. Откройте нужный список резервных копий.

   {tabs}

   {tab(Созданные автоматически)}

   1. Перейдите на вкладку **Автоматическое**.
      {includetag(restore-from-backup-volume-backups)}
   1. Нажмите на название нужного плана или нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного плана и выберите пункт **Просмотр резервных копий**.
      {/includetag}
      {includetag(restore-from-backup-volume-iaas)}
   1. Нажмите на название нужного плана или нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного плана и выберите пункт **Просмотр резервных копий**.
      {/includetag}

   {/tab}

   {tab(Созданные вручную)}

   1. Перейдите на вкладку **Ручное**.
   1. В списке инстансов нажмите на ссылку в столбце **Точки восстановления** для нужной ВМ.

   {/tab}

   {/tabs}

1. Решите, какую резервную копию использовать для восстановления.
1. Убедитесь, что данные на резервной копии не повреждены:

   1. Нажмите для нужной копии **Проверить** в столбце **Целостность**.
   1. Дождитесь результата проверки:

      - `Подтверждена` — в копии нет ошибок и ее можно безопасно {linkto(../restore-from-backup#backup-restore)[text=восстановить]}.
      - `Не подтверждена` — в копии найдены ошибки или несогласованные данные. Создайте новую резервную копию — {linkto(../create-backup-plan#backup-plan-create)[text=автоматически]} или {linkto(../create-backup-copy#backup-copy-create)[text=вручную]}.

   {includetag(restore-from-backup-volume-backups)}
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужной копии и выберите пункт **Восстановить диск**.
   {/includetag}
   {includetag(restore-from-backup-volume-iaas)}
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужной копии и выберите пункт **Восстановить диск**.
   {/includetag}
1. Выберите резервную копию, которая будет использоваться для восстановления диска.
1. Нажмите кнопку **Восстановить диск из бэкапа**.
1. Укажите параметры на странице **Восстановление диска**:

   - **Инстанс**: выберите ВМ, из резервной копии которой будет восстановлен диск.
   - **Диск для восстановления**: выберите восстанавливаемый диск для указанной ВМ. Будет создан новый диск.
   - **Название диска**: при необходимости укажите название нового диска.
   - **Зона доступности**: выберите дата-центр, где будет развернут диск.
     {includetag(restore-from-backup-volume-backups)}
   - **Тип диска**: выберите один из {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=типов диска]} — `HDD`{ifdef(public)}, `SSD`{/ifdef} или `High-IOPS SSD`.
     {/includetag}
     {includetag(restore-from-backup-volume-iaas)}
   - **Тип диска**: выберите один из {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=типов диска]} — `HDD`{ifdef(public)}, `SSD`{/ifdef} или `High-IOPS SSD`.
     {/includetag}
   - **Подключить диск к виртуальной машине**: включите опцию, если хотите подключить диск к существующей ВМ из списка **Виртуальная машина**.

1. Нажмите кнопку **Восстановить диск**.

{/tab}

{/tabs}

В результате восстановления будет создан новый диск. Диск будет подключен к ВМ, если была выбрана соответствующая опция. Старый диск удален не будет.

{includetag(restore-from-backup-volume-backups)}
{note:warn}
Если старый диск больше не нужен, для экономии ресурсов {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=удалите диск]} вручную.
{/note}
{/includetag}
{includetag(restore-from-backup-volume-iaas)}
{note:warn}
Если старый диск больше не нужен, для экономии ресурсов {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=удалите диск]} вручную.
{/note}
{/includetag}