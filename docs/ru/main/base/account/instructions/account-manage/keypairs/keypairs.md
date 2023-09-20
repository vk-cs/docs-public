Ключевые пары используются для [подключения к виртуальной машине по SSH](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix). Ключевая пара состоит из публичного и приватного ключей: публичный ключ размещается на ВМ, приватный — хранится у пользователя.

## Просмотр информации о ключевой паре

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Ключевые пары**.
1. Нажмите на имя нужной ключевой пары. Отобразится информация о ней.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```bash
   openstack keypair show <название ключевой пары>
   ```

<info>

Чтобы отобразить данные только о публичном ключе, добавьте в команду опцию `--public-key`.

</info>

</tabpanel>
</tabs>

## Создание ключевой пары

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Ключевые пары**.
1. Нажмите кнопку **Создать ключ**.
1. Введите название ключа и нажмите кнопку **Создать ключ**.

   Приватный ключ будет загружен на локальное устройство.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```bash
   openstack keypair create 
   ```

1. Сохраните приватный ключ, который отобразится на экране, в файл с расширением `.pem`.

</tabpanel>
</tabs>

## Импорт существующего ключа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Ключевые пары**.
1. Нажмите кнопку **Импортировать ключ**.
1. В открывшемся окне заполните поля:

   - **Название ключа**: укажите название создаваемой ключевой пары.
   - **Публичный ключ**: вставьте содержимое `ssh-rsa` публичного ключа.

1. Нажмите кнопку **Импортировать ключ**.

</tabpanel>
<tabpanel>

1. Воспользуйтесь [официальной документацией](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) Gitlab для локальной генерации ключевой пары.
1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```bash
   openstack keypair create --public-key <путь к файлу публичного ключа> <имя ключевой пары>
   ```

</tabpanel>
</tabs>

## Восстановление ключевой пары

<err>

Приватный ключ невозможно восстановить! Создайте новую ключевую пару и загрузите публичный ключ на ВМ.

</err>

Для восстановления доступа к виртуальной машине Linux по SSH с использованием ключевой пары воспользуйтесь инструкцией из статьи [Управление ВМ](/ru/base/iaas/instructions/vm/vm-manage#vosstanovlenie_dostupa_k_vm_po_klyuchu).

## Удаление ключевой пары

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько ключевых пар, выбрав их с помощью флажков.

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы.
1. Из выпадающего списка выберите **Ключевые пары**.
1. Нажмите на значок ![Корзина](./assets/trash-icon.svg "inline") в строке с удаляемым объектом.
1. Подтвердите удаление.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```bash
   openstack keypair delete <имя ключевой пары>
   ```

</tabpanel>
</tabs>
