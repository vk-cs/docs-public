# {heading(Управление дисками)[id=iaas-volumes-manage]}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
## {heading(Увеличение размера диска)[id=iaas-volumes-manage-disk-size]}
{/ifdef}

{ifdef(public)}
## {heading(Увеличение размера диска с перезагрузкой ВМ)[id=iaas-volumes-manage-disk-size]}
{/ifdef}

{ifdef(public,private,private-pg,private-pdf,private-pg-pdf)}
{note:warn}
- Размер диска нельзя уменьшить.
- Если у дисков с типом High IOPS SSD и Low Latency NVMe есть снимки, увеличить размер этих дисков нельзя.
{/note}
{/ifdef}

{ifdef(private-cert)}
{note:warn}
Размер диска нельзя уменьшить.
{/note}
{/ifdef}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ, размер диска которой нужно увеличить.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Используйте один из способов, чтобы открыть окно изменения размера диска.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Изменить размер диска**.

   - На странице диска:

     1. Нажмите на имя диска, размер которого нужно изменить.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над таблицей с параметрами диска нажмите кнопку **Изменить размер диска**.

1. В открывшемся окне укажите **Размер диска**.
1. Нажмите кнопку **Сохранить**.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Перезагрузите]} ВМ.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выведите список дисков:

   ```console
   openstack volume list
   ```

1. Проверьте статус диска в колонке `Status`. Успешное расширение гарантируется только для дисков со статусом `available` или `in-use`.
1. Скопируйте идентификатор диска.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Остановите ВМ, размер диска которого необходимо изменить:

   ```console
   openstack volume set --size <РАЗМЕР> <ID_ДИСКА>
   ```
   
1. Отключите диск от инстанса или {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=замените root-диск]}.

   {note:warn}
   Замену root-диска, включая изменение его размера, можно выполнить только через личный кабинет.
   {/note}

   Команда отключения диска от ВМ:

   ```console
   openstack server remove volume <ID_ВИРТУАЛЬНОЙ_МАШИНЫ> <ID_ДИСКА>
   ```
   {/ifdef}

1. Увеличьте диск, указав новый размер в гигабайтах.

   {ifdef(public)}
   - Если диск отключен от ВМ (`Status`: `available`):

     ```console
     openstack volume set --size <РАЗМЕР> <ID_ДИСКА>
     ```

   - Если диск подключен к ВМ (`Status`: `in-use`):

     ```console
     cinder extend <ID_ДИСКА> <РАЗМЕР>
     ```
   {/ifdef}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   ```console
   openstack volume set --size <РАЗМЕР> <ID_ДИСКА>
   ```
   {/ifdef}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Перезагрузите]} ВМ.

{/tab}

{/tabs}

{ifdef(public)}
## {heading(Увеличение размера диска без перезагрузки ВМ)[id=iaas-volumes-manage-disk-size-not-restart]}

{note:warn}
- Размер диска нельзя уменьшить.
- Если у дисков с типом High IOPS SSD и Low Latency NVMe есть снимки, увеличить размер этих дисков нельзя.
{/note}

1. {linkto(#iaas-volumes-manage-disk-size)[text=Увеличьте]} размер виртуального диска в личном кабинете {var(cloud)} или через OpenStack CLI, но не перезагружайте ВМ. Это изменит размер диска, но не изменит размер разделов диска в ОС.
1. Увеличьте размер разделов диска в операционной системе ВМ:

   {tabs}

   {tab(Windows)}

   1. Подключитесь к ВМ по {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]} или через {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=консоль]}.
   1. Откройте средство управления дисками (`diskmgmt.msc`) с правами администратора.
   1. В контекстном меню нужного раздела выберите **Расширить том**.
   1. [Увеличьте размер диска](https://learn.microsoft.com/ru-ru/windows-server/storage/disk-management/extend-a-basic-volume).

   {/tab}

   {tab(Linux)}

   1. Подключитесь к ВМ по {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} или через {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=консоль]}.
   1. Узнайте, какие на ВМ есть разделы диска и какие у них файловые системы. Для этого выполните команду:

      ```console
      df -Th
      ```

      В ответе найдите раздел, размер которого нужно изменить, и посмотрите его файловую систему в столбце **Type**. Как правило, изменить нужно размер `/dev/vda1`.

   1. Увеличьте размер раздела.

      Пример команды:

      ```console
      growpart /dev/vda 1 # перед 1 нужен пробел
      ```

   1. Увеличьте размер файловой системы до размера раздела. В зависимости от файловой системы каталога используйте команду:

      {tabs}

      {tab(Ext1, Ext2, Ext3, Ext4)}

      ```console
      sudo resize2fs /dev/vda1 # перед 1 не должно быть пробела
      ```

      {/tab}

      {tab(XFS)}

      ```console
      sudo xfs_growfs -d /dev/vda1
      ```

      {/tab}

      {/tabs}

   1. При помощи команды `df -Th` проверьте, что размер раздела изменился.

{/tab}

{/tabs}

{/ifdef}

## {heading(Клонирование диска)[id=iaas-volumes-manage-clone-volume]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ, для которой нужно клонировать диск.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Используйте один из способов, чтобы открыть окно клонирования диска.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Клонировать диск**.

   - На странице диска:

     1. Нажмите на имя диска, который нужно клонировать.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над таблицей с параметрами диска нажмите **Еще** и выберите опцию **Клонировать диск**.

1. На открывшейся странице укажите параметры нового диска.
1. Нажмите кнопку **Создать диск**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Определите]}:

   - нужный тип диска;
   - его название в API;
   - зону доступности, подходящую для размещения.

1. Просмотрите доступные типы дисков и скопируйте ID типа, соответствующий названию в API.

   ```console
   openstack volume type list
   ```

1. Просмотрите зоны доступности и скопируйте имя нужной зоны:

   ```console
   openstack availability zone list --volume
   ```

1. Клонируйте диск на основе существующего:

   ```console
   openstack volume create --type <ID_ТИПА_ДИСКА> --size <РАЗМЕР> --availability-zone <ЗОНА_ДОСТУПНОСТИ> --source <ID_ДИСКА> <НАЗВАНИЕ>
   ```

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Изменение имени диска)[id=iaas_volumes_manage_rename]}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

    - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
    - Диски определенной виртуальной машины:

        1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
        1. В списке виртуальных машин нажмите на имя ВМ, тип диска которой нужно изменить.
        1. На странице ВМ перейдите на вкладку **Диски**.

1. Используйте один из способов, чтобы открыть окно изменения имени диска.

   - Через контекстное меню диска:

       1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
       1. Выберите пункт **Переименовать диск**.

   - На странице диска:

       1. Нажмите на имя диска, тип которого нужно изменить.
       1. На странице диска перейдите на вкладку **Общая информация**.
       1. Над таблицей с параметрами диска нажмите кнопку **Переименовать диск**.

   {note:info}
   Если опция **Переименовать диск** неактивна, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=отключите диск]} от ВМ.
   {/note}

1. Введите новое имя диска и нажмите кнопку **Сохранить**.
{/ifndef}

## {heading(Изменение типа диска)[id=iaas-volumes-manage-chance-disk-type]}

{ifndef(private-cert)}
Чтобы изменить тип диска на Low Latency NVMe, обратитесь {ifdef(public)}в [техническую поддержку](/ru/contacts) и запросите доступ к {linkto(../../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=высокопроизводительным конфигурациям]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}к администратору {var(cloud)} и запросите доступ к высокопроизводительным конфигурациям{/ifdef} и дискам. Остальные {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=типы диска]} доступны по умолчанию во всех конфигурациях.
{/ifndef}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ, тип диска которой нужно изменить.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Используйте один из способов, чтобы открыть окно изменения типа диска.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Изменить тип диска**.

   - На странице диска:

     1. Нажмите на имя диска, тип которого нужно изменить.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над таблицей с параметрами диска нажмите кнопку **Изменить тип диска**.

   {note:info}
   Если опция **Изменить тип диска** неактивна, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=отключите диск]} от ВМ.
   {/note}

1. В открывшемся окне выберите **Тип диска** и нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Выберите]} новый тип диска и определите его название в API.
1. Просмотрите список доступных типов дисков и скопируйте ID типа, соответствующий названию в API.

   ```console
   openstack volume type list
   ```

1. Просмотрите список дисков и скопируйте идентификатор диска, тип которого нужно изменить:

   ```console
   openstack volume list --long
   ```

1. Измените тип диска:

   ```console
   openstack volume set --type <ID_ТИПА_ДИСКА> --retype-policy on-demand <ID_ДИСКА>
   ```

{/tab}

{/tabs}

## {heading(Изменение атрибута «загрузочный»)[id=iaas-volumes-manage-changing-bootable-attribute]}

{linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-root-boot)[text=Загрузочный диск]} должен содержать компоненты и системные файлы, необходимые для запуска и работы операционной системы ВМ.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Измените атрибут «загрузочный» одним из способов.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Сделать диск загрузочным** (**Сделать диск не загрузочным**).

   - На странице диска:

     1. Нажмите на имя диска.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над таблицей с параметрами диска нажмите кнопку **Еще** и выберите **Сделать диск загрузочным** (**Сделать диск не загрузочным**).

1. В открывшемся окне нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните нужную команду.

   - Сделать диск загрузочным:

     ```console
     openstack volume set --bootable <ID_ДИСКА>
     ```

   - Сделать диск незагрузочным:

     ```console
     openstack volume set --non-bootable <ID_ДИСКА>
     ```

1. Проверьте результат:

   ```console
   openstack volume show <ID_ДИСКА>
   ```

{/tab}

{/tabs}

## {heading(Удаление диска)[id=iaas-volumes-manage-delete]}

{note:err}
При удалении диска будут удалены все его снимки.
{/note}

{tabs}

{tab(Личный кабинет)}

1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Отключите диск]} от ВМ.
1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ, диск которой нужно удалить.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Удалите диск одним из способов.

   - С помощью групповых операций — для нескольких дисков:

     1. Выберите флажками диски, которые нужно удалить.
     1. Над списком дисков нажмите кнопку **Удалить диск**.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Удалить диск**.

   - На странице диска:

     1. Нажмите на имя диска, который нужно удалить.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Справа над таблицей с параметрами диска нажмите на значок корзины.

1. В открывшемся окне проверьте имя диска и нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Отключите диск]} от ВМ.
1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выведите список дисков с помощью команды `openstack volume list` и проверьте его статус: если диск подключен к ВМ (`Status`: `in-use`), {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=отключите его]}.
1. Скопируйте идентификатор диска.
1. Удалите диск.

   ```console
   openstack volume delete <ID_ДИСКА>
   ```

{/tab}

{/tabs}