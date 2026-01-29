## {heading(Создание снимка)[id=creating_a_snapshot]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Создать снимок**.
1. (Опционально) Измените название снимка и добавьте описание.
1. Нажмите **Создать снимок**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```console
    openstack share snapshot create --name <ИМЯ_СНИМКА> <ХРАНИЛИЩЕ>
    ```
   Здесь:

    - `<ИМЯ_СНИМКА>` — имя для создаваемого снимка файлового хранилища.
    - `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.

{/tab}

{/tabs}

## Получение списка снимков

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Список снимков**. Отобразится информация о снимках.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```console
    openstack share snapshot list --share <ХРАНИЛИЩЕ>
    ```

   Здесь `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.

{/tab}

{/tabs}

## Восстановление хранилища из снимка

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Список снимков**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного снимка и выберите пункт **Восстановить файловое хранилище**.
1. Нажмите **Подтвердить**. Начнется процесс создания нового хранилища из снимка.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```console
    openstack share create --snapshot-id <ID_СНИМКА> --share-type <ТИП_ХРАНИЛИЩА> --name <ИМЯ_ХРАНИЛИЩА> <ПРОТОКОЛ> <РАЗМЕР>
    ```

    Здесь:

    - `<ID_СНИМКА>` — идентификатор снимка, на основе которого будет создано новое файловое хранилище.
    - `<ТИП_ХРАНИЛИЩА>` — тип создаваемого файлового хранилища.
    - `<ИМЯ_ХРАНИЛИЩА>` — имя для создаваемого файлового хранилища.
    - `<ПРОТОКОЛ>` — протокол для доступа к хранилищу из операционной системы: CIFS или NFS.
    - `<РАЗМЕР>` — размер файлового хранилища в ГБ.

    Значения `<ТИП_ХРАНИЛИЩА>`, `<ПРОТОКОЛ>` и `<РАЗМЕР>` должны совпадать с соответствующими характеристиками снимка.

{/tab}

{/tabs}

## {heading(Удаление снимка)[id=deleting_a_snapshot]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Список снимков**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного снимка и выберите пункт **Удалить снимок**.
1. Нажмите **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```console
    openstack share snapshot delete <СНИМОК>
    ```

    Здесь `<СНИМОК>` — имя или идентификатор снимка, который нужно удалить.

{/tab}

{/tabs}