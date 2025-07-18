## Восстановление инстанса из резервной копии

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Откройте нужный список резервных копий.

   <tabs>
   <tablist>
   <tab>Копии, созданные автоматически</tab>
   <tab>Копии, созданные вручную</tab>
   </tablist>
   <tabpanel>

      1. Перейдите на вкладку **Автоматическое**.
      1. Нажмите на название нужного плана или нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного плана и выберите пункт **Просмотр резервных копий**.
      1. Нажмите для нужного инстанса на его имя или на значок ![ ](/ru/assets/right-arrow-icon.svg "inline").

   </tabpanel>
   <tabpanel>

      1. Перейдите на вкладку **Ручное**.
      1. Найдите нужный инстанс в списке.
      1. Нажмите на ссылку в столбце **Точки восстановления** для нужного инстанса.

   </tabpanel>
   </tabs>

1. Решите, какую резервную копию использовать для восстановления.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной копии и выберите пункт **Восстановить инстанс** или **Восстановить из бэкапа**.
1. Выполните действия в зависимости от типа инстанса:

    <tabs>
    <tablist>
    <tab>Виртуальная машина</tab>
    <tab>База данных</tab>
    <tab>Аналитическая база данных</tab>
    </tablist>
    <tabpanel>

    1. На странице **Восстановление инстанса из бэкапа** выберите **Тип восстановления**: `В новый инстанс` или `В исходный инстанс`.

        - Для восстановления в новый инстанс укажите необходимые параметры. Остальные параметры будут восстановлены из резервной копии.

            {note:warn}

            Виртуальные машины, созданные в приватной сети, не будут работать при восстановлении во внешнюю сеть `ext-net`.

            {/note}

        - Для восстановления в исходную ВМ не требуется указывать параметры. Диски целевой ВМ будут восстановлены без изменения их свойств. ВМ будет перезагружена.

    1. Нажмите кнопку **Восстановить инстанс**.

    {note:info}

    На скорость восстановления ВМ из резервной копии влияют:

    - Тип резервной копии — восстановление из инкрементальной копии занимает больше времени, так как при этом сначала восстанавливаются данные из полной копии, а затем последовательно добавляются изменения из более поздних инкрементальных копий.
    - Тип диска — если оригинал ВМ имел тип диска SSD, восстановление в ВМ с типом диска HDD будет происходить медленнее.
    - Тип восстановления — восстановление в исходную ВМ занимает меньше времени.

    {/note}

    </tabpanel>
    <tabpanel>

    1. Настройте параметры [создаваемого](/ru/dbs/dbaas/instructions/create) инстанса БД.

       {note:warn}
       Создаваемый инстанс может потребовать больше места на диске, чем объем резервной копии, так как сервис Cloud Backup использует сжатие данных.

       Указывайте размер диска, равный объему исходного инстанса, для которого была сделана резервная копия. Если он неизвестен, укажите размер диска в 2–3 раза больше объема резервной копии.
       {/note}

    1. Нажмите кнопку **Следующий шаг**.

    Запустится процесс создания нового инстанса БД.

    </tabpanel>
    <tabpanel>

    1. Настройте параметры создаваемого инстанса аналитической БД.
    1. Нажмите кнопку **Следующий шаг**.

    Запустится процесс создания нового инстанса аналитической БД.

    </tabpanel>
    </tabs>

</tabpanel>
</tabs>

## Восстановление диска ВМ из резервной копии

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Резервное копирование** одним из способов.

   - Через боковое меню: **Cloud Backup → Резервное копирование**.

   - Через контекстное меню виртуальной машины:

      1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
      1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной ВМ и выберите пункт **Восстановить из бэкапа**.

1. Откройте нужный список резервных копий.

   <tabs>
   <tablist>
   <tab>Копии, созданные автоматически</tab>
   <tab>Копии, созданные вручную</tab>
   </tablist>
   <tabpanel>

      1. Перейдите на вкладку **Автоматическое**.
      1. Нажмите на название нужного плана или нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного плана и выберите пункт **Просмотр резервных копий**.

   </tabpanel>
   <tabpanel>

      1. Перейдите на вкладку **Ручное**.
      1. В списке инстансов нажмите на ссылку в столбце **Точки восстановления** для нужной ВМ.

   </tabpanel>
   </tabs>

1. Решите, какую резервную копию использовать для восстановления.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужной копии и выберите пункт **Восстановить диск**.
1. Выберите резервную копию, которая будет использоваться для восстановления диска.
1. Нажмите кнопку **Восстановить диск из бэкапа**.
1. Укажите параметры на странице **Восстановление диска**:

   - **Инстанс**: выберите ВМ, из резервной копии которой будет восстановлен диск.
   - **Диск для восстановления**: выберите восстанавливаемый диск для указанной ВМ. Будет создан новый диск.
   - **Название диска**: при необходимости укажите название нового диска.
   - **Зона доступности**: выберите дата-центр, где будет развернут диск.
   - **Тип диска**: выберите один из [типов диска](/ru/computing/iaas/concepts/data-storage/disk-types#disk_types) — `HDD`, `SSD` или `High-IOPS SSD`.
   - **Подключить диск к виртуальной машине**: включите опцию, если хотите подключить диск к существующей ВМ из списка **Виртуальная машина**.

1. Нажмите кнопку **Восстановить диск**.

</tabpanel>
</tabs>

В результате восстановления будет создан новый диск. Диск будет подключен к ВМ, если была выбрана соответствующая опция. Старый диск удален не будет.

{note:warn}

Если старый диск больше не нужен, для экономии ресурсов [удалите диск](/ru/computing/iaas/instructions/volumes#delete_disk) вручную.

{/note}
