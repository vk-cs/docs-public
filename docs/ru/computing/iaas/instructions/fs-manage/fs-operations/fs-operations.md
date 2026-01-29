## Просмотр списка файловых хранилищ

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**. Отобразится список файловых хранилищ.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```console
    openstack share list
    ```

{/tab}

{/tabs}

## Просмотр информации о файловом хранилище

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища. Отобразится информация о нем.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```console
    openstack share show <ХРАНИЛИЩЕ>
    ```

    Здесь `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.

{/tab}

{/tabs}

## {heading(Увеличение размера файлового хранилища)[id=increasing_file_storage_size]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Изменить размер**.
1. Введите значение и нажмите **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
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

## {heading(Удаление файлового хранилища и его сети)[id=deleting_a_file_storage_and_its_network]}

Для удаления файлового хранилища необходимо сначала [демонтировать](/ru/computing/iaas/instructions/fs-manage/fs-connect#unmount_file_storage) его на виртуальных машинах и [удалить](../fs-snapshots#deleting_a_snapshot) все его снимки.

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Удалить**.
1. Нажмите **Подтвердить**.

Одновременно с файловым хранилищем будет удалена созданная для него сеть.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
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
