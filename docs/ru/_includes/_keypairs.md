{includetag(keypairs)}
Ключевые пары используются для {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=подключения к виртуальной машине по SSH]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}подключения к виртуальной машине{/ifdef}. Ключевая пара состоит из публичного и приватного ключей: публичный ключ размещается на ВМ, приватный — хранится у пользователя.

## {heading(Просмотр информации о ключевой паре)[id=vk-cloud-account-manage-keypairs-view]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите на имя нужной ключевой пары. Отобразится информация о ней.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Личный кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Используйте один из способов, чтобы посмотреть ключевые пары.

   - Через пункт меню в шапке страницы:

     1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Ключевые пары**.
     1. Нажмите на имя нужной ключевой пары. Отобразится информация о ней.

   - На странице с информацией аккаунта:

     1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки аккаунта**.
     1. Перейдите на вкладку **Ключевые пары**.
     1. Нажмите на имя нужной ключевой пары. Отобразится информация о ней.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack keypair show <НАЗВАНИЕ_КЛЮЧЕВОЙ_ПАРЫ>
   ```

{note:info}
Чтобы отобразить данные только о публичном ключе, добавьте в команду опцию `--public-key`.
{/note}

{/tab}

{/tabs}

## {heading(Создание ключевой пары)[id=vk-cloud-account-manage-keypairs-create]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите кнопку **Добавить SSH ключ**.
1. Введите название ключа и нажмите кнопку **Создать ключ**.

   Приватный ключ будет загружен на локальное устройство.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Личный кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Ключевые пары**.
1. Нажмите кнопку **Создать ключ**.
1. Введите название ключа и нажмите кнопку **Создать ключ**.

   На компьютер загрузится файл приватного ключа с расширением `.pem`, который понадобится при создании и подключении к ВМ.

{note:err}
При утере приватного ключа восстановить его невозможно. Создайте новую ключевую пару и импортируйте публичный ключ на ВМ.
{/note}

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack keypair create
   ```

1. Сохраните приватный ключ, который отобразится на экране, в файл с расширением `.pem`.

{/tab}

{/tabs}

## {heading(Импорт существующего ключа)[id=vk-cloud-account-manage-keypairs-import]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите кнопку **Добавить SSH ключ**.
1. Нажмите кнопку **Импортировать ключ**.
1. В открывшемся окне заполните поля:

   - **Название ключа**: укажите название создаваемой ключевой пары.
   - **Публичный ключ**: вставьте содержимое `ssh-rsa` публичного ключа.

1. Нажмите кнопку **Импортировать ключ**.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Личный кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Ключевые пары**.
1. Нажмите кнопку **Импортировать ключ**.
1. Заполните поле **Название ключа**.
1. Добавьте открытый ключ одним из способов:

   - Нажмите **Файл публичного ключа** и выберите его на своем устройстве.
   - В поле **Публичный ключ** вставьте содержимое `ssh-rsa` открытого ключа из буфера обмена.

1. Нажмите кнопку **Импортировать ключ**.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Воспользуйтесь [официальной документацией](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) GitLab для локальной генерации ключевой пары.
1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack keypair create --public-key <ПУТЬ_К_ФАЙЛУ_ПУБЛИЧНОГО_КЛЮЧА> <ИМЯ_КЛЮЧЕВОЙ_ПАРЫ>
   ```

{/tab}

{/tabs}

{ifdef(public)}
## {heading(Восстановление ключевой пары)[id=vk-cloud-account-manage-keypairs-restore]}

{note:err}
Приватный ключ невозможно восстановить! Создайте новую ключевую пару и загрузите публичный ключ на ВМ.
{/note}

Для восстановления доступа к виртуальной машине Linux по SSH с использованием ключевой пары воспользуйтесь инструкцией из статьи {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-recovery-access-key)[text=Управление ВМ]}.
{/ifdef}

## {heading(Удаление ключевой пары)[id=vk-cloud-account-manage-keypairs-delete]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

Это групповая операция: при необходимости можно удалить сразу несколько ключевых пар, выбрав их с помощью флажков.

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите на значок ![Корзина](../../../../../assets/trash-icon.svg "inline") в строке с удаляемым объектом.
1. Подтвердите удаление.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Личный кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Ключевые пары**.
1. Установите флажки для ключевых пар, которые необходимо удалить.
1. Нажмите кнопку **Удалить**.
1. Подтвердите удаление.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Выполните команду:

   ```console
   openstack keypair delete <ИМЯ_КЛЮЧЕВОЙ_ПАРЫ>
   ```

{/tab}

{/tabs}

{/includetag}