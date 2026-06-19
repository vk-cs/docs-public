# {heading(Floating IP-адреса)[id=vnet-floating-ip]}

Вы можете управлять Floating IP-адресами: просматривать, добавлять в проект и убирать их из проекта, а также привязывать и отвязывать эти IP-адреса.

## {heading(Просмотр списка Floating IP-адресов)[id=vnet-floating-ip-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → {ifndef(public)}**Плавающие IP**.{/ifndef}{ifdef(public)}**IP-адреса**.
1. Перейдите на вкладку **Floating IP**.{/ifdef}

   Будет отображен список Floating IP-адресов (столбец **Внешний IP**).

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack floating ip list
   ```

{/tab}

{/tabs}

## {heading(Добавление Floating IP-адреса в проект)[id=vnet-floating-ip-add]}

{note:warn}
Floating IP-адрес назначается из общего пула случайным образом.
{/note}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → {ifndef(public)}**Плавающие IP**.{/ifndef}{ifdef(public)}**IP-адреса**.
1. Перейдите на вкладку **Floating IP**.{/ifdef}
1. Нажмите кнопку **Добавить IP в проект**.
   {ifndef(public)}
1. Выберите сеть из списка.
   {/ifndef}
1. (Опционально) Добавьте описание.
1. Нажмите кнопку {ifdef(public)}**Добавить IP**{/ifdef}{ifndef(public)}добавления IP-адреса{/ifndef}.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. Выполните команду:

   ```console
   openstack floating ip create ext-net
   ```

{/tab}

{/tabs}

## {heading(Редактирование описания Floating IP-адреса)[id=vnet-floating-ip-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → {ifndef(public)}**Плавающие IP**.{/ifndef}{ifdef(public)}**IP-адреса**.
1. Перейдите на вкладку **Floating IP**.{/ifdef}
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного Floating IP-адреса и выберите пункт **Редактировать описание**.
1. Задайте описание.
1. Нажмите кнопку **Сохранить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(#vnet-floating-ip-view)[text=Получите]} список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, для которого нужно отредактировать описание.
1. Выполните команду:

   ```console
   openstack floating ip set <ID_FLOATING_IP-АДРЕСА> --description "<ОПИСАНИЕ>"
   ```

{/tab}

{/tabs}

## {heading(Привязка Floating IP-адреса)[id=vnet-floating-ip-associate]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → {ifndef(public)}**Плавающие IP**.{/ifndef}{ifdef(public)}**IP-адреса**.
1. Перейдите на вкладку **Floating IP**.{/ifdef}
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для Floating IP-адреса, у которого в столбце **Внутренний IP** указано `Не привязан`, и выберите пункт **Привязать IP**.
   {ifndef(public)}
1. В окне **Привязка внешнего IP-адреса** укажите внутренний IP-адрес из раскрывающегося списка **Внутренний IP**.
   {/ifndef}

   {ifdef(public)}
   {note:info}
   Непривязанные IP-адреса также содержат ссылку на привязку в соседнем столбце. Чтобы привязать Floating IP-адрес к другому внутреннему IP-адресу, сначала {linkto(#vnet-floating-ip-disassociate)[text=отвяжите]} его от текущего.
   {/note}

1. Из выпадающего списка выберите порт OpenStack с внутренним IP-адресом, к которому выполняется привязка.
   {/ifdef}
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(#vnet-floating-ip-view)[text=Получите]} список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно привязать к порту.
1. {linkto(../../ports#vnet-ports)[text=Получите]} список портов. Найдите в списке идентификатор порта, к которому нужно привязать Floating IP-адрес.
1. Выполните команду:

   ```console
   openstack floating ip set <ID_FLOATING_IP-АДРЕСА> --port <ID_ПОРТА>
   ```

{/tab}

{/tabs}

## {heading(Отвязка Floating IP-адреса)[id=vnet-floating-ip-disassociate]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → {ifndef(public)}**Плавающие IP**.{/ifndef}{ifdef(public)}**IP-адреса**.
1. Перейдите на вкладку **Floating IP**.{/ifdef}
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для Floating IP-адреса, который привязан к внутреннему IP-адресу, и выберите пункт **Отвязать IP**.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(#vnet-floating-ip-view)[text=Получите]} список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно отвязать от порта.
1. Выполните команду:

   ```console
   openstack floating ip unset <ID_FLOATING_IP-АДРЕСА> --port
   ```

{/tab}

{/tabs}

## {heading(Удаление Floating IP-адреса из проекта)[id=vnet-floating-ip-delete]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → {ifndef(public)}**Плавающие IP**.{/ifndef}{ifdef(public)}**IP-адреса**.
1. Перейдите на вкладку **Floating IP**.{/ifdef}
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного Floating IP-адреса и выберите пункт **Убрать IP из проекта**. Чтобы отвязать сразу несколько IP-адресов, выберите их с помощью флажков и нажмите кнопку **Убрать IP из проекта**.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(#vnet-floating-ip-view)[text=Получите]} список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно удалить из проекта.
1. Выполните команду:

   ```console
   openstack floating ip delete <ID_FLOATING_IP-АДРЕСА>
   ```

{/tab}

{/tabs}
