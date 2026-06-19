# {heading(Управление файловыми хранилищами)[id=iaas-fs-operations]}

## {heading(Просмотр списка файловых хранилищ)[id=iaas-fs-operations-list-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**. Отобразится список файловых хранилищ.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что клиент Manila {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=установлен]}.
1. Выполните команду:

   ```console
   openstack share list
   ```

{/tab}

{/tabs}

## {heading(Просмотр информации о файловом хранилище)[id=iaas-fs-operations-info-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища. Отобразится информация о нем.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что клиент Manila {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=установлен]}.
1. Выполните команду:

   ```console
   openstack share show <ХРАНИЛИЩЕ>
   ```

   Здесь `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.

{/tab}

{/tabs}

## {heading(Увеличение размера файлового хранилища)[id=iaas-fs-operations-size]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Изменить размер**.
1. Введите значение и нажмите **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что клиент Manila {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=установлен]}.
1. Выполните команду:

   ```console
   openstack share extend <ХРАНИЛИЩЕ> <РАЗМЕР>
   ```

   Здесь:

   - `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.
   - `<РАЗМЕР>` — новый размер файлового хранилища в ГБ.

{/tab}

{/tabs}

{note:info}
Размер файлового хранилища нельзя уменьшить.
{/note}

## {heading(Удаление файлового хранилища и его сети)[id=iaas-fs-operations-delete]}

Для удаления файлового хранилища необходимо сначала {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-connect#iaas-fs-connect-unmount)[text=демонтировать]} его на виртуальных машинах и {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-snapshots#iaas-fs-snapshots-deleting)[text=удалить]} все его снимки.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Удалить**.
1. Нажмите **Подтвердить**.

Одновременно с файловым хранилищем будет удалена созданная для него сеть.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что клиент Manila {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=установлен]}.
1. Чтобы удалить файловое хранилище, выполните команду:

   ```console
   openstack share delete <ХРАНИЛИЩЕ>
   ```

   Здесь `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища, которое нужно удалить.

1. Чтобы удалить сеть файлового хранилища, выполните команду:

   ```console
   openstack share network delete <ID_СЕТИ>
   ```

   Здесь `<ID_СЕТИ>` — идентификатор сети файлового хранилища, которую нужно удалить.

{/tab}

{/tabs}