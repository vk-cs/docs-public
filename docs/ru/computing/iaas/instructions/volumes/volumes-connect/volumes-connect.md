# {heading(Подключение и отключение диска)[id=iaas-volumes-connect]}

## {heading(Подключение диска к ВМ)[id=iaas-volumes-connect-mount-disk]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Диски**.
1. Найдите в списке диск, не подключенный к ВМ: значок слева от названия диска — серый, при наведении на него появляется надпись **Не подключен к инстансу**.
1. Используйте один из способов, чтобы открыть окно выбора виртуальной машины для подключения диска.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Подключить к инстансу**.

   - На странице диска:

     1. Нажмите на имя диска, который нужно подключить к ВМ.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над списком дисков нажмите кнопку **Еще** и выберите **Подключить к инстансу**.

1. В открывшемся окне укажите виртуальную машину в поле **Выберите инстанс**.
1. Нажмите кнопку **Подключить диск**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выведите список дисков и скопируйте идентификатор диска:

   ```console
   openstack volume list
   ```

1. Проверьте состояние диска:

   ```console
   openstack volume show <ID_ДИСКА>
   ```

   Подключить диск можно, если параметр `status` имеет значение `available`. Если значение статуса `maintenance` — дождитесь его перехода в `available`.

1. Выведите список виртуальных машин и скопируйте идентификатор ВМ, к которой нужно подключить диск:

   ```console
   openstack server list
   ```

1. Подключите диск:

   ```console
   openstack server add volume <ID_ВИРТУАЛЬНОЙ_МАШИНЫ> <ID_ДИСКА>
   ```

1. Просмотрите информацию о диске, чтобы проверить результат (поле `attachments`):

   ```console
   openstack volume show <ID_ДИСКА>
   ```

{/tab}

{/tabs}

## {heading(Отключение диска от ВМ)[id=iaas-volumes-connect-dismount-disk]}

{note:warn}

Для отключения root-диска ВМ воспользуйтесь {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=соответствующей инструкцией]}.

{/note}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ, от которой нужно отключить диск.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Отключите диск от ВМ одним из способов.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Отключить от инстанса**.

   - На странице диска:

     1. Нажмите на имя диска, который нужно отключить от ВМ.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над списком дисков нажмите кнопку **Еще** и выберите **Отключить от инстанса**.

1. В открывшемся окне проверьте название диска и нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выведите список дисков и скопируйте идентификатор диска:

   ```console
   openstack volume list
   ```

1. Выведите список виртуальных машин и скопируйте идентификатор виртуальной машины, от которой нужно отключить диск:

   ```console
   openstack server list
   ```

1. Отключите диск:

   ```console
   openstack server remove volume <ID_ВИРТУАЛЬНОЙ_МАШИНЫ> <ID_ДИСКА>
   ```

1. Просмотрите информацию о диске, чтобы проверить результат (поле `attachments`):

   ```console
   openstack volume show <ID_ДИСКА>
   ```

{/tab}

{/tabs}
