# {heading(Управление правилами доступа)[id=iaas-fs-access-rules]}

## {heading(Добавление правила доступа)[id=iaas-fs-access-rules-adding]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища.
1. Перейдите на вкладку **Правила доступа**.
1. Нажмите **Добавить новое правило**.
1. Укажите IP или адрес подсети источника и режим доступа.
1. Нажмите **Добавить правило**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что клиент Manila {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=установлен]}.
1. Добавьте правило доступа с помощью команды:

   ```console
   openstack share access create <ХРАНИЛИЩЕ> ip <IP_СЕТИ> --access-level <РЕЖИМ_ДОСТУПА>
   ```

   Здесь:

   - `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.
   - `<IP_СЕТИ>` — адрес сети файлового хранилища в формате CIDR.
   - `<РЕЖИМ_ДОСТУПА>` — аргумент, который принимает значения `rw` (чтение и запись) или `ro` (только чтение).

1. Проверьте, что правило создано успешно, запросив список правил доступа:

   ```console
   openstack share access list <ХРАНИЛИЩЕ>
   ```

   Здесь `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.

{/tab}

{/tabs}

## {heading(Удаление правила доступа)[id=iaas-fs-access-rules-deleting]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища.
1. Перейдите на вкладку **Правила доступа**.
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного правила и выберите пункт **Удалить**.
1. Нажмите **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что клиент Manila {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=установлен]}.
1. Получите идентификатор нужного правила, запросив список правил доступа:

   ```console
   openstack share access list <ХРАНИЛИЩЕ>
   ```

   Здесь `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.

1. Удалите правило доступа с помощью команды:

   ```console
   openstack share access delete <ХРАНИЛИЩЕ> <ID_ПРАВИЛА>
   ```

   Здесь:

   - `<ХРАНИЛИЩЕ>` — имя или идентификатор файлового хранилища.
   - `<ID_ПРАВИЛА>` — идентификатор правила доступа, которое нужно удалить.

{/tab}

{/tabs}
