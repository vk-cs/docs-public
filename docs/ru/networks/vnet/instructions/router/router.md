Вы можете управлять маршрутизаторами: просматривать, редактировать и удалять их.

## Просмотр списка маршрутизаторов и информации о них

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Маршрутизаторы**.

   Будет отображен список маршрутизаторов.

1. Нажмите на имя нужного маршрутизатора.

   Откроется страница с подробной информацией о нем. На этой странице можно также [редактировать](#redaktirovanie_marshrutizatora) параметры маршрутизатора.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

    1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli).
    1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli) в OpenStack CLI.

1. Чтобы посмотреть список маршрутизаторов и их идентификаторы, выполните команду:

   ```console
   openstack router list
   ```

1. Чтобы посмотреть детальную информацию о маршрутизаторе, выполните команду:

   ```console
   openstack router show <идентификатор маршрутизатора>
   ```

   В выводе команды:

   - `id` — идентификатор маршрутизатора.
   - `external_gateway_info` — информация о подключении к внешней сети. Пустое поле означает, что подключение к внешней сети не настроено.
   - `interfaces_info` — информация об [интерфейсах маршрутизатора](#upravlenie_interfeysami). Пустое поле означает, что интерфейсы не добавлены.
   - `routes` — информация о [статических маршрутах маршрутизатора](#upravlenie_staticheskimi_marshrutami). Пустое поле означает, что статические маршруты не добавлены.

</tabpanel>
</tabs>

## Добавление маршрутизатора

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Маршрутизаторы**.
1. Нажмите кнопку **Добавить маршрутизатор**.
1. Если к вашему проекту подключена [SDN Sprut](../../concepts/sdn), в поле **Тип маршрутизатора** выберите `Стандартный`. Если SDN Sprut не подключена, в проекте доступны только стандартные маршрутизаторы, поле не отображается.
1. Задайте параметры маршрутизатора:

   - **Название**. Допустимы только цифры, латинские буквы, пробелы и спецсимволы: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
   - **SDN**: выберите [SDN](../../concepts/sdn), в которой будет создан маршрутизатор. Поле отображается, если к проекту подключены SDN Sprut и Neutron.
   - **Подключение к внешней сети**: если эта опция выбрана, то маршрутизатор будет иметь доступ в интернет и публичный IP-адрес.

     Выберите эту опцию, если планируется назначать Floating IP-адреса портам в подсетях, подключенных к маршрутизатору, и обеспечивать доступ в интернет из этих подсетей.

   - **Список подсетей**: одна или несколько подсетей, которые необходимо подключить к маршрутизатору.

1. Нажмите кнопку **Добавить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

    1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli).
    1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli) в OpenStack CLI.

1. Создайте маршрутизатор нужного типа:

   <tabs>
   <tablist>
   <tab>С подключением к внешней сети</tab>
   <tab>Без подключения к внешней сети</tab>
   </tablist>
   <tabpanel>

   ```console
   openstack router create <имя маршрутизатора> --external-gateway ext-net
   ```

   </tabpanel>
   <tabpanel>

   ```console
   openstack router create <имя маршрутизатора>
   ```

   </tabpanel>
   </tabs>

   Маршрутизатор с подключением к внешней сети будет иметь доступ в интернет и публичный IP-адрес. Создайте маршрутизатор такого типа, если планируется назначать Floating IP-адреса портам в подсетях, подключенных к маршрутизатору, и обеспечивать доступ в интернет из этих подсетей.

1. О том, как подключить один или несколько интерфейсов к маршрутизатору, читайте далее. Это можно сделать либо путем [редактирования маршрутизатора](#redaktirovanie_marshrutizatora) либо [работой с его интерфейсами](#upravlenie_interfeysami) напрямую.

</tabpanel>
</tabs>

## Редактирование маршрутизатора

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Маршрутизаторы**.
1. Выполните одно из действий для маршрутизатора, который нужно отредактировать:

   - Нажмите на название маршрутизатора и затем на вкладке **Общая информация** нажмите кнопку **Редактировать маршрутизатор**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для маршрутизатора и выберите пункт **Редактировать маршрутизатор**.

1. Выполните одно из доступных действий:

   - Измените название маршрутизатора.
   - Управляйте подключением к внешней сети: можно включить или отключить соответствующую опцию. Если эта опция выбрана, то маршрутизатор будет иметь доступ в интернет и публичный IP-адрес.

     Выберите эту опцию, если планируется назначать Floating IP-адреса портам в подсетях, подключенных к маршрутизатору, и обеспечивать доступ в интернет из этих подсетей.

   - Управляйте подсетями, подключенными к маршрутизатору. Вы можете добавить новые подсети к маршрутизатору, выбрав их из списка, либо отключить уже добавленные подсети.

     {note:info}

     Добавить или удалить подсеть также можно, изменив интерфейс маршрутизатора.

     {/note}

1. После редактирования маршрутизатора нажмите кнопку **Сохранить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

    1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli).
    1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli) в OpenStack CLI.
1. [Получите идентификатор](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) нужного маршрутизатора.
1. Выполните одно из доступных действий:

   - Измените имя маршрутизатора:

     ```console
     openstack router set <идентификатор маршрутизатора> --name <новое имя>
     ```

   - Управляйте подключением к внешней сети:

     <tabs>
     <tablist>
     <tab>Включить подключение к внешней сети</tab>
     <tab>Отключить подключение к внешней сети</tab>
     </tablist>
     <tabpanel>

     ```console
     openstack router set <идентификатор маршрутизатора> --external-gateway ext-net
     ```

     </tabpanel>
     <tabpanel>

     ```console
     openstack router unset <идентификатор маршрутизатора> --external-gateway
     ```

     </tabpanel>
     </tabs>

     Выполните подключение маршрутизатора к внешней сети, если планируется назначать Floating IP-адреса портам в подсетях, подключенных к маршрутизатору, и обеспечивать доступ в интернет из этих подсетей.

   - Управляйте подсетями, подключенными к маршрутизатору. Вы можете добавить новые подсети к маршрутизатору, либо отключить уже добавленные подсети.

     <tabs>
     <tablist>
     <tab>Добавить подсеть</tab>
     <tab>Отключить подсеть</tab>
     </tablist>
     <tabpanel>

     1. Получите идентификатор нужной подсети.
     1. Выполните команду:

        ```console
        openstack router add subnet <идентификатор маршрутизатора> <идентификатор подсети>
        ```

     В результате:

     - Выбранная подсеть будет подключена к маршрутизатору.
     - В списке интерфейсов появятся интерфейсы `INTERFACE_DISTRIBUTED` и (если маршрутизатора подключен к внешней сети) `SNAT`, относящиеся к этой подсети.

     </tabpanel>
     <tabpanel>

     ```console
     openstack router remove subnet <идентификатор маршрутизатора> <идентификатор подсети>
     ```

     В результате:

     - Будут также удалены:
       - порт, соответствующий интерфейсу удаляемой подсети.
       - интерфейс `SNAT` (если он есть) и соответствующий ему порт.

     - Подсеть, в которой находились эти интерфейсы, будет отключена от маршрутизатора.

     </tabpanel>
     </tabs>

     {note:info}

     Добавить или удалить подсеть также можно, [изменив интерфейс](#upravlenie_interfeysami) маршрутизатора.

     {/note}

</tabpanel>
</tabs>

## Управление интерфейсами

Управление интерфейсами маршрутизатора — альтернативный способ [управления подсетями](#redaktirovanie_marshrutizatora), которые подключены к нему.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) на страницу маршрутизатора, затем выберите вкладку **Интерфейсы**.

1. Чтобы добавить интерфейс:

   1. Нажмите кнопку **Добавить интерфейс**.
   1. Выберите нужную подсеть из списка.
   1. Нажмите кнопку **Добавить интерфейс**.

   В результате:

   - Выбранная подсеть будет подключена к маршрутизатору.
   - В списке интерфейсов появятся интерфейсы `INTERFACE_DISTRIBUTED` и (если для маршрутизатора выбрана опция **Подключение к внешней сети**) `SNAT`, относящиеся к этой подсети.

1. Чтобы удалить интерфейс:

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для интерфейса и выберите пункт **Удалить интерфейс**.
   1. Подтвердите удаление.

   В результате:

   - Будет также удален соответствующий интерфейс `SNAT` (если он есть).
   - Подсеть, в которой находился этот интерфейс, будет отключена от маршрутизатора.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

    1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli).
    1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) нужного маршрутизатора.

1. Чтобы добавить интерфейс:

   1. [Получите идентификатор порта OpenStack](../ports#prosmotr_spiska_portov_i_informacii_o_nih), находящегося в подсети, которую нужно подключить к маршрутизатору. Этот порт не должен использоваться никакими объектами (балансировщиками нагрузки, виртуальными машинами и т. д.) Если такого порта нет, [создайте его](../ports#dobavlenie_porta).
   1. Выполните команду:

      ```console
      openstack router add port <идентификатор маршрутизатора> <идентификатор порта>
      ```

   В результате:

   - Выбранная подсеть будет подключена к маршрутизатору.
   - В списке интерфейсов появятся интерфейсы `INTERFACE_DISTRIBUTED` и (если маршрутизатора подключен к внешней сети) `SNAT`, относящиеся к этой подсети.

   {note:info}

   Чтобы получить список интерфейсов, [посмотрите детальную информацию о маршрутизаторе](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) с помощью OpenStack CLI.

   {/note}

1. Чтобы удалить интерфейс:

   1. [Посмотрите интерфейсы (порты)](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih), настроенные на маршрутизаторе.
   1. Выполните команду:

      ```console
      openstack router remove port <идентификатор маршрутизатора> <идентификатор порта>
      ```

   В результате:

   - Будут также удалены:
     - порт, соответствующий удаляемому интерфейсу.
     - интерфейс `SNAT` (если он есть) и соответствующий ему порт.

   - Подсеть, в которой находились эти интерфейсы, будет отключена от маршрутизатора.

</tabpanel>
</tabs>

## Управление статическими маршрутами

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) на страницу маршрутизатора, затем выберите вкладку **Статические маршруты**.

1. Чтобы добавить статический маршрут:

   1. Нажмите кнопку **Добавить статический маршрут** или **Добавить**.
   1. Задайте сеть назначения и укажите префикс сети.
   1. Укажите промежуточный узел (next hop).
   1. Нажмите кнопку **Добавить маршрут**.

1. Чтобы удалить статический маршрут, Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного маршрута и выберите пункт **Удалить маршрут**.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

    1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli).
    1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) нужного маршрутизатора.

1. Чтобы добавить статический маршрут, выполните команду:

   ```console
   openstack router set <идентификатор маршрутизатора> --route destination=<сеть назначения с префиксом>,gateway=<адрес next hop>
   ```

1. Чтобы удалить статический маршрут:

   1. [Посмотрите статические маршруты](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih), настроенные на маршрутизаторе.
   1. Выполните команду:

      ```console
      openstack router unset <идентификатор маршрутизатора> --route destination=<сеть назначения с префиксом>,gateway=<адрес next hop>
      ```

1. Чтобы удалить все статические маршруты, выполните команду:

   ```console
   openstack router set <идентификатор маршрутизатора> --no-route
   ```

</tabpanel>
</tabs>

## Удаление маршрутизатора

{note:warn}

Перед удалением маршрутизатора последовательно удалите [статические маршруты](#upravlenie-staticheskimi-marshrutami) и настроенные [интерфейсы](#upravlenie_interfeysami) (если они есть).

{/note}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько маршрутизаторов, выбрав их с помощью флажков.

Для удаления маршрутизатора:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный балансировщик.
1. Перейдите в раздел **Виртуальные сети** → **Маршрутизаторы**.
1. Выполните одно из действий для нужного маршрутизатора:

   - Выберите с помощью флажка маршрутизатор, затем нажмите кнопку **Удалить маршрутизатор**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для маршрутизатора и выберите пункт **Удалить маршрутизатор**.
   - Нажмите на имя маршрутизатора, затем на вкладке **Общая информация** нажмите кнопку **Удалить маршрутизатор**.

1. Подтвердите удаление маршрутизатора.

</tabpanel>
<tabpanel>

1. Убедитесь, что:

    1. OpenStack CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli).
    1. Вы можете [авторизоваться](/ru/tools-for-using-services/cli/openstack-cli) в OpenStack CLI.

1. [Получите идентификатор](#prosmotr_spiska_marshrutizatorov_i_informacii_o_nih) нужного маршрутизатора.

1. Выполните команду:

   ```console
   openstack router delete <идентификатор маршрутизатора>
   ```

</tabpanel>
</tabs>
