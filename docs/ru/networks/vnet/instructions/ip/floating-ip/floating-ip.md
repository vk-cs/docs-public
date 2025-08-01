Вы можете управлять Floating IP-адресами: просматривать, добавлять в проект и убирать их из проекта, а также привязывать и отвязывать эти IP-адреса.

## {heading(Просмотр списка Floating IP-адресов)[id=view]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.

   Будет отображен список Floating IP-адресов (колонка **Внешний IP**).

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```console
   openstack floating ip list
   ```

{/tab}

{/tabs}

## {heading(Добавление Floating IP-адреса в проект)[id=add]}

{note:warn}

Floating IP-адрес назначается из общего пула случайным образом.

{/note}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите кнопку **Добавить IP в проект**.
1. (Опционально) Добавьте описание.
1. Нажмите кнопку **Добавить IP**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```console
   openstack floating ip create ext-net
   ```

{/tab}

{/tabs}

## {heading(Редактирование описания Floating IP-адреса)[id=edit]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного Floating IP-адреса и выберите пункт **Редактировать описание**.
1. Задайте описание.
1. Нажмите кнопку **Сохранить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, для которого нужно отредактировать описание.

1. Выполните команду:

   ```console
   openstack floating ip set <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА> --description "<ОПИСАНИЕ>"
   ```

{/tab}

{/tabs}

## {heading(Привязка Floating IP-адреса)[id=associate]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для Floating IP-адреса, у которого в столбце **Внутренний IP** указано `Не привязан`, и выберите пункт **Привязать IP**.

   {note:info}Непривязанные IP-адреса также содержат ссылку на привязку в соседнем столбце.
Чтобы привязать Floating IP-адрес к другому внутреннему IP-адресу, сначала [отвяжите](#disassociate) его от текущего.{/note}

1. Из выпадающего списка выберите порт OpenStack с внутренним IP-адресом, к которому выполняется привязка.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно привязать к порту.
1. [Получите](../../ports) список портов. Найдите в списке идентификатор порта, к которому нужно привязать Floating IP-адрес.
1. Выполните команду:

   ```console
   openstack floating ip set <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА> --port <ИДЕНТИФИКАТОР_ПОРТА>
   ```

{/tab}

{/tabs}

## {heading(Отвязка Floating IP-адреса)[id=disassociate]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для Floating IP-адреса, который привязан к внутреннему IP-адресу, и выберите пункт **Отвязать IP**.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно отвязать от порта.

1. Выполните команду:

   ```console
   openstack floating ip unset <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА> --port
   ```

{/tab}

{/tabs}

## {heading(Удаление Floating IP-адреса из проекта)[id=delete]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного Floating IP-адреса и выберите пункт **Убрать IP из проекта**. Чтобы отвязать сразу несколько IP-адресов, выберите их с помощью флажков и нажмите кнопку **Убрать IP из проекта**.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно удалить из проекта.

1. Выполните команду:

   ```console
   openstack floating ip delete <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА>
   ```

{/tab}

{/tabs}
