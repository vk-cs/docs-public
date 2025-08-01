Ключевые пары используются для [подключения к виртуальной машине по SSH](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix). Ключевая пара состоит из публичного и приватного ключей: публичный ключ размещается на ВМ, приватный — хранится у пользователя.

## Просмотр информации о ключевой паре

{tabs}

{tab(VK Cloud Аккаунт)}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите на имя нужной ключевой пары. Отобразится информация о ней.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```console
   openstack keypair show <название ключевой пары>
   ```

{note:info}

Чтобы отобразить данные только о публичном ключе, добавьте в команду опцию `--public-key`.

{/note}

{/tab}

{/tabs}

## Создание ключевой пары

{tabs}

{tab(VK Cloud Аккаунт)}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите кнопку **Добавить SSH ключ**.
1. Введите название ключа и нажмите кнопку **Создать ключ**.

   Приватный ключ будет загружен на локальное устройство.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```console
   openstack keypair create
   ```

1. Сохраните приватный ключ, который отобразится на экране, в файл с расширением `.pem`.

{/tab}

{/tabs}

## Импорт существующего ключа

{tabs}

{tab(VK Cloud Аккаунт)}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите кнопку **Добавить SSH ключ**.
1. Нажмите кнопку **Импортировать ключ**.
1. В открывшемся окне заполните поля:

   - **Название ключа**: укажите название создаваемой ключевой пары.
   - **Публичный ключ**: вставьте содержимое `ssh-rsa` публичного ключа.

1. Нажмите кнопку **Импортировать ключ**.

{/tab}

{tab(OpenStack CLI)}

1. Воспользуйтесь [официальной документацией](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) GitLab для локальной генерации ключевой пары.
1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```console
   openstack keypair create --public-key <путь к файлу публичного ключа> <имя ключевой пары>
   ```

{/tab}

{/tabs}

## Восстановление ключевой пары

{note:err}

Приватный ключ невозможно восстановить! Создайте новую ключевую пару и загрузите публичный ключ на ВМ.

{/note}

Для восстановления доступа к виртуальной машине Linux по SSH с использованием ключевой пары воспользуйтесь инструкцией из статьи [Управление ВМ](/ru/computing/iaas/instructions/vm/vm-manage#vosstanovlenie_dostupa_k_vm_po_klyuchu).

## Удаление ключевой пары

{tabs}

{tab(VK Cloud Аккаунт)}

Это групповая операция: при необходимости можно удалить сразу несколько ключевых пар, выбрав их с помощью флажков.

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Ключевые пары SSH**.
1. Нажмите на значок ![Корзина](assets/trash-icon.svg "inline") в строке с удаляемым объектом.
1. Подтвердите удаление.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

   ```console
   openstack keypair delete <имя ключевой пары>
   ```

{/tab}

{/tabs}
