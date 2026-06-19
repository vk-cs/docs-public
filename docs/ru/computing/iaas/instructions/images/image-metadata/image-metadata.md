# {heading(Метатеги образов)[id=iaas-image-metadata]}

Образ может иметь метатеги, влияющие на конфигурацию виртуальной машины и гостевой операционной системы. Метатеги задаются при создании или редактировании образа.

## {heading(Поддерживаемые метатеги образов)[id=iaas-image-metadata-supported]}

Виды метатегов образов ВМ:

- `os_*`: настройки гостевой операционной системы (ОС);
- `hw_*`: настройки виртуальной машины;
- `mcs_*`: свойства ВМ, используемые для сортировки в личном кабинете {var(cloud)};
- остальные метатеги, влияющие на работу с образом.

[cols="1,3,1", options="header"]
|===
|Имя
|Описание
|Значение по умолчанию

|`os_type`
| Тип создаваемой из образа гостевой ОС внутри виртуальной машины. Влияет на конфигурацию ВМ. Например, для Windows будут включены специальные возможности гипервизора для улучшения стабильности и производительности гостевой ОС
|Зависит от ОС

|`mcs_os_type`
|Тип гостевой ОС внутри ВМ. Используется для сортировки в личном кабинете
|

|`os_distro`
|Дистрибутив создаваемой из образа гостевой ОС внутри виртуальной машины. Влияет на конфигурацию ВМ, например, на типы виртуальных сетевых устройств
|

|`mcs_os_distro`
|Дистрибутив гостевой ОС внутри ВМ. Используется для сортировки в личном кабинете
|

|`os_version`
|Версия гостевой ОС внутри виртуальной машины
|

|`mcs_os_version`
|Версия гостевой ОС внутри ВМ. Используется для сортировки в личном кабинете
|

|`os_admin_user`
|Пользователь внутри гостевой ОС с правами администратора; пароль может быть установлен через {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-password)[text=личный кабинет]}
|

|`os_require_quiesce` 
|Признак, отвечающий за заморозку файловой системы перед снятием снимков подключенных дисков. Если `yes`, то при неудачной заморозке файловой системы операция создания снимков будет отменена
|`no`

|`hw_qemu_guest_agent`
|Признак наличия QEMU-агента внутри гостевой ОС. Если `True`, делает доступными возможности смены пароля пользователя и заморозки файловой системы для резервного копирования
|`False`

|`mcs_name`
|Имя образа, которое отображается пользователю личного кабинета
|
|===

### {heading(Заполнение os_distro и os_version)[id=iaas-image-metadata-find-param]}

Чтобы найти значения метатегов `os_distro` и `os_version`, воспользуйтесь, например, свободным ПО [libosinfo](https://libosinfo.org):

1. Установите пакет для работы с libosinfo, подходящий для вашего компьютера, например:

   - [libosinfo-1.0-0](https://installati.one/install-libosinfo-1.0-0-ubuntu-22-04/) для ОС Ubuntu 22.04;
   - [libosinfo-bin](https://linux-packages.com/ubuntu-24-04/package/libosinfo-bin) для ОС Ubuntu 24.04 LTS.

   В рамках пакета на компьютер будет установлена копия базы данных libosinfo.

1. Запросите в libosinfo данные об интересующей вас ОС, например Ubuntu 24.XX, выполнив команду:

   ```console
   osinfo-query os | grep -i ubuntu24
   ```

   Пример вывода команды:

   | Short ID    | Name             | Version | Ссылка на сайт                 |
   |-------------|------------------|---------|--------------------------------|
   | ubuntu24.04 | Ubuntu 24.04 LTS | 24.04   | http://ubuntu.com/ubuntu/24.04 |
   | ubuntu24.10 | Ubuntu 24.10     | 24.10   | http://ubuntu.com/ubuntu/24.10 |

   1. Используйте значение `Short ID` для определения метатега `os_distro` и `Version` для метатега `os_version`.

{note:info}
Если в локальной копии базы данных libosinfo не нашлось сведений о нужной версии ОС, возможно, копия устарела. Попробуйте обновить пакет для работы с libosinfo.
{/note}

## {heading(Установка метатега)[id=iaas-image-metadata-install]}

{tabs}

{tab(OpenStack CLI)}

1. Получите `ID` образа из списка:

   ```console
   openstack image list
   ```

1. Получите подробную информацию о нужном образе:

   ```console
   openstack image show <ID_ОБРАЗА>
   ```

   Присвоенные метатеги отображаются в строке `properties`.

1. Задайте метатег:

   ```console
   openstack image set --property <ИМЯ_МЕТАТЕГА>=<ЗНАЧЕНИЕ> <ID_ОБРАЗА>
   ```

{/tab}

{/tabs}

{cut(Пример установки метатегов для образа ВМ Windows с драйверами `virtio`)}

1. Определите версию ОС Windows:
  
   ```shell
   systeminfo
   ```
  
1. Выберите нужное значение `Short ID` для метатега `os_distro` из таблицы выше.
1. {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage)[text=Создайте]} образ.
1. Установите метатеги:
  
   ```shell
   openstack image set --property <ИМЯ_МЕТАТЕГА>=<ЗНАЧЕНИЕ> <ID_ОБРАЗА>
   ```
  
   Пример:
  
   ```shell
   openstack image set --property os_type="windows" --property os_distro="win2k16" --property os_require_quiesce="yes" --property hw_vif_model="virtio" <ID_ОБРАЗА>
   ```
  
1. Проверьте информацию об образе:
  
   ```console
   openstack image show <ID_ОБРАЗА>
   ```
  
   Пример результата:
  
   ```shell
   | properties | hw_vif_model=virtio, os_distro=win2k16, os_require_quiesce=yes, os_type=windows |
   ```

{/cut}

## {heading(Удаление метатега)[id=iaas-image-metadata-delete]}

{tabs}

{tab(OpenStack CLI)}

1. Получите `ID` образа из списка:

   ```console
   openstack image list
   ```

1. Получите подробную информацию о нужном образе:

   ```console
   openstack image show <ID_ОБРАЗА>
   ```

   Присвоенные метатеги отображаются в строке `properties`.

1. Удалите метатег:

   ```console
   openstack image unset --property <ИМЯ_МЕТАТЕГА> <ID_ОБРАЗА>
   ```

{/tab}

{/tabs}