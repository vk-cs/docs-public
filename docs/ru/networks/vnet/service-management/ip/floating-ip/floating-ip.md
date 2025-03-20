Вы можете управлять Floating IP-адресами: просматривать, добавлять в проект и убирать их из проекта, а также привязывать и отвязывать эти IP-адреса.

## {heading(Просмотр списка Floating IP-адресов)[id=view]}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.

   Будет отображен список Floating IP-адресов (колонка **Внешний IP**).

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```bash
   openstack floating ip list
   ```

</tabpanel>
</tabs>

## {heading(Добавление Floating IP-адреса в проект)[id=add]}

<warn>

Floating IP-адрес назначается из общего пула случайным образом.

</warn>

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите кнопку **Добавить IP в проект**.
1. (Опционально) Добавьте описание.
1. Нажмите кнопку **Добавить IP**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```bash
   openstack floating ip create ext-net
   ```

</tabpanel>
</tabs>

## {heading(Редактирование описания Floating IP-адреса)[id=edit]}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного Floating IP-адреса и выберите пункт **Редактировать описание**.
1. Задайте описание.
1. Нажмите кнопку **Сохранить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, для которого нужно отредактировать описание.

1. Выполните команду:

   ```bash
   openstack floating ip set <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА> --description "<ОПИСАНИЕ>"
   ```

</tabpanel>
</tabs>

## {heading(Привязка Floating IP-адреса)[id=associate]} 

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для Floating IP-адреса, у которого в столбце **Внутренний IP** указано `Не привязан`, и выберите пункт **Привязать IP**.

   <info>Непривязанные IP-адреса также содержат ссылку на привязку в соседнем столбце.
Чтобы привязать Floating IP-адрес к другому внутреннему IP-адресу, сначала [отвяжите](#disassociate) его от текущего.</info>

1. Из выпадающего списка выберите порт OpenStack с внутренним IP-адресом, к которому выполняется привязка.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно привязать к порту.
1. [Получите](../../ports#272-tabpanel-1) список портов. Найдите в списке идентификатор порта, к которому нужно привязать Floating IP-адрес.
1. Выполните команду:

   ```bash
   openstack floating ip set <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА> --port <ИДЕНТИФИКАТОР_ПОРТА>
   ```

</tabpanel>
</tabs>

## {heading(Отвязка Floating IP-адреса)[id=disassociate]}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для Floating IP-адреса, который привязан к внутреннему IP-адресу, и выберите пункт **Отвязать IP**.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно отвязать от порта.

1. Выполните команду:

   ```bash
   openstack floating ip unset <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА> --port
   ```

</tabpanel>
</tabs>

## {heading(Удаление Floating IP-адреса из проекта)[id=delete]}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного Floating IP-адреса и выберите пункт **Убрать IP из проекта**. Чтобы отвязать сразу несколько IP-адресов, выберите их с помощью флажков и нажмите кнопку **Убрать IP из проекта**.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. [Получите](#view) список Floating IP-адресов. Найдите в списке идентификатор Floating IP-адреса, который нужно удалить из проекта.

1. Выполните команду:

   ```bash
   openstack floating ip delete <ИДЕНТИФИКАТОР_FLOATING_IP-АДРЕСА>
   ```

</tabpanel>
</tabs>
