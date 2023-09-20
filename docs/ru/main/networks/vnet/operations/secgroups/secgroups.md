Группа безопасности — это набор настраиваемых разрешающих правил прохождения трафика, которые возможно назначать на порты инстансов.

## Просмотр списка групп безопасности и информации о них

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.

   Будет отображен список групп безопасности.

1. Нажмите на имя группы безопасности.

   Откроется страница с подробной информацией о ней.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Чтобы посмотреть список групп безопасности, выполните команду:

   ```bash
   openstack security group list
   ```

1. Чтобы посмотреть детальную информацию о группе безопасности, выполните команду:

   ```bash
   openstack security group show <ID группы безопасности>
   ```

1. Чтобы просмотреть правила группы безопасности:

   ```bash
   openstack security group rule list --long <ID группы безопасности>
   ```

</tabpanel>
</tabs>

## Создание группы безопасности

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите кнопку **Добавить**.
1. Введите имя группы безопасности.
1. Добавьте описание.
1. Нажмите **Создать группу**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Просмотрите группы безопасности в проекте:

   ```bash
   openstack security group list
   ```

1. Получите информацию о группе безопасности:

   ```bash
   openstack security group show <ID группы>
   ```

1. Создайте группу безопасности:

   ```bash
   openstack security group create --description <описание группы> <название новой группы>
   ```

</tabpanel>
</tabs>

## Редактирование имени и описания группы безопасности

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.

   Откроется страница с подробной информацией о ней.

1. Нажмите на значок карандаша рядом с именем группы безопасности.

   Отредактируйте имя и (при необходимости) имя группы безопасности.

1. Нажмите кнопку **Сохранить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Чтобы изменить описание и название группы безопасности, выполните команду:

   ```bash
   openstack security group set --description <описание> --name <название> <ID группы>
   ```

</tabpanel>
</tabs>

## Добавление правила

Правило группы безопасности — это набор параметров, определяющих условия прохождения трафика. Правила объединяются в группы, которые в свою очередь применяются для портов инстансов.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. В блоке **Входящий трафик** и **Исходящий трафик** нажмите **+ Добавить правило**.
1. Выберите типа трафика (SSH, HTTP, HTTPS и т.д)
1. Укажите нужный протокол.
1. В разделе **Удаленный адрес** укажите адрес, для которого выбранный тип трафика будет разрешен:

   - Все IP-адреса;
   - Диапазон IP-адресов;
   - Группа безопасности.

1. Нажмите **Добавить описание** и в появившимся поле опишите новое правило.
1. Нажмите **Сохранить правило**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Просмотрите список правил группы:

   ```bash
   openstack security group rule list --long <ID группы>
   ```

1. Создайте правило:

   ```bash
   openstack security group rule create <аргументы> <ID группы безопасности>
   ```

   Доступные аргументы команды создания правила:

   - `--remote-ip` — указывает адрес, с которого может осуществляться подключения (в формате CIDR).
   - `--remote-group` — указывает группу, инстансы которой могут быть источником трафика.
   - `--dst-port` — порт назначения, требуется для TCP и UDP протоколов.
   - `--protocol` — протокол, возможно указание названия, номера или разрешение всех протоколов (any).
   - `--description` — произвольное описание.
   - `--icmp-type` — тип ICMP.
   - `--icmp-code` — код ICMP.
   - `--ingress` — применить правило для входящего трафика.
   - `--egress` — применить правило для исходящего трафика.
   - `--ethertype` — значение EtherType (IPv4, IPv6).

</tabpanel>
</tabs>

## Удаление правила

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. Нажмите на значок корзины в строке с нужным правилом.
1. Нажмите значок меню в строке правила, которую требуется удалить.
1. В открывшемся меню нажмите кнопку **Удалить**.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Чтобы посмотреть детальную информацию для правила, выполните команду:

   ```bash
   openstack security group rule show <ID правила>
   ```

1. Чтобы удалить правило, выполните команду:

   ```bash
   openstack security group rule delete <ID правила>
   ```

</tabpanel>
</tabs>

## Назначение группы правил на инстанс

Для применения набора правил к виртуальной машине, группу безопасности, содержащую этот набор, необходимо применить к виртуальной машине.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. В разделе **Виртуальные машины с группой правил** нажмите **Добавить виртуальную машину**.
1. Выберите инстансы, к которым будет добавлена группа.
1. Нажмите **Добавить группу правил**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```bash
   openstack server add security group <ID инстанса> <ID группы безопасности>
   ```

</tabpanel>
</tabs>

## Отвязать группу от инстанса

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите на имя группы безопасности.
1. В разделе **Виртуальные машины с группой правил** наведите мышь на строку инстанса.
1. Нажмите значок корзины.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```bash
   openstack server remove security group <ID инстанса> <ID группы безопасности>
   ```

</tabpanel>
</tabs>

## Удаление группы безопасности

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

<warn>

Группа не может быть удалена до тех пор, пока есть порты, которые используют эту группу. Также не может быть удалена группа безопасности `default` и другие преднастроенные группы.

</warn>

Это групповая операция: при необходимости можно удалить сразу несколько групп безопасности, выбрав их с помощью флажков.

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Настройки firewall**.
1. Нажмите значок меню в строке группы безопасности, которую требуется удалить.
1. В открывшемся меню нажмите кнопку **Удалить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Выполните команду:

   ```bash
   openstack security group delete <ID группы безопасности>
   ```

</tabpanel>
</tabs>
