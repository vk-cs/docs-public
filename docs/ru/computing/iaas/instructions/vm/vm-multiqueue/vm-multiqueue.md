# {heading(Включение множественных очередей (Multiqueue))[id=iaas-vm-vm-multiqueue]}

## {heading(Включение множественных очередей)[id=iaas-vm-vm-multiqueue-enabling]}

1. {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите]} клиент OpenStack CLI и пройдите аутентификацию в проекте, если этого еще не сделано.
1. {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=Загрузите]} образ ВМ.
1. Установите параметр `hw_vif_multiqueue_enabled=true` для загруженного образа ВМ, чтобы включить множественные очереди:

   ```console
   $ openstack image set --property hw_vif_multiqueue_enabled=true <ОБРАЗ>
   ```
   Здесь `<ОБРАЗ>` — название или идентификатор образа.

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте ВМ]} на основе загруженного образа с включенной функцией множественных очередей.
1. Перейдите на вкладку **Консоль**.
1. Выполните вход на ВМ.
1. Выведите сетевые интерфейсы с помощью команды `ip link`.
1. Запомните название интерфейса сетевой карты.
1. Установите количество очередей, равное количеству виртуальных CPU:

   ```console
   $ ethtool -L <ИНТЕРФЕЙС> combined <КОЛИЧЕСТВО>
   ```
   Здесь:

    * `<ИНТЕРФЕЙС>` — название интерфейса сетевой карты.
    * `<КОЛИЧЕСТВО>` — количество очередей.

## {heading(Проверка работоспособности функции множественных очередей)[id=iaas-vm-vm-multiqueue-check]}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите на имя ВМ, созданной на основе загруженного образа с включенной функцией множественных очередей.
1. Перейдите на вкладку **Консоль**.
1. Выполните вход на ВМ.
1. Получите текущее количество очередей:

   ```console
   $ ethtool -l <ИНТЕРФЕЙС>
   ```
   Здесь `<ИНТЕРФЕЙС>` — название интерфейса сетевой карты.

   Текущее количество очередей должно быть равно количеству очередей в секции **Pre-set maximums** → **Combined**.