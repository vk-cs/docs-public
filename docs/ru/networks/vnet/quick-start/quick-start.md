Быстрый старт поможет начать работу с сервисом и познакомиться с его возможностями.

Пройдя все шаги быстрого старта, вы:

1. Создадите в сети ВМ и подключите ее к интернету.
1. Организуете базовую сетевую связность нескольких виртуальных машин.
1. Научитесь назначать группы правил файервола (группы безопасности).
1. Проверите доступ в интернет с созданной ВМ.

## 1. Создайте сети и подсети

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Создайте сеть с доступом в интернет:

    1. Нажмите кнопку **Создать**.
    1. **Название сети**: `test-network`.
    1. **SDN**: `Sprut` (по умолчанию).
    1. **Доступ в интернет**: включен.
    1. **Маршрутизатор**: `Создать новый`.
    1. Нажмите кнопку **Добавить сеть**.

1. Создайте сеть без доступа в интернет:

    1. Нажмите кнопку **Создать**.
    1. **Название сети**: `test-network-2`.
    1. **SDN**: `Sprut` (по умолчанию).
    1. **Доступ в интернет**: выключен.
    1. **Маршрутизатор**: `Создать новый`.
    1. Нажмите кнопку **Добавить сеть**.

## 2. Создайте несколько виртуальных машин

Создайте одну ВМ с выходом в интернет и три ВМ без выхода в интернет.

<tabs>
<tablist>
<tab>test-vm1</tab>
<tab>test-vm2</tab>
<tab>test-vm3</tab>
<tab>test-vm4</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите кнопку **Добавить**.
1. На шаге **Конфигурация**:

    1. **Имя виртуальной машины**: `test-vm1`.
    1. Другие настройки задайте в зависимости от ваших требований или оставьте без изменений.

1. Нажмите **Следующий шаг**.
1. На шаге **Настройки сети**:

    1. **Сети**: `Внешняя сеть (internet)`.
    1. **Ключ виртуальной машины**: `Создать новый ключ`.
    1. **Настройки Firewall**: `default`, `ssh`.
    1. Остальные настройки оставьте без изменений.

1. Нажмите кнопку **Следующий шаг**.
1. На шаге **Настройка резервного копирования** отключите опцию **Использовать резервное копирование**.
1. Нажмите кнопку **Создать инстанс**.

</tabpanel>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите кнопку **Добавить**.
1. На шаге **Конфигурация**:

    1. **Имя виртуальной машины**: `test-vm2`.
    1. Другие настройки задайте в зависимости от ваших требований или оставьте без изменений.

1. Нажмите **Следующий шаг**.
1. На шаге **Настройки сети**:

    1. **Сети**: `test-network`.
    1. **Ключ виртуальной машины**: `Создать новый ключ`.
    1. **Настройки Firewall**: `default`, `ssh`.
    1. **Назначить внешний IP-адрес**: включить.

1. Нажмите кнопку **Следующий шаг**.
1. На шаге **Настройка резервного копирования** отключите опцию **Использовать резервное копирование**.
1. Нажмите кнопку **Создать инстанс**.

</tabpanel>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите кнопку **Добавить**.
1. На шаге **Конфигурация**:

    1. **Имя виртуальной машины**: `test-vm3`.
    1. Другие настройки задайте в зависимости от ваших требований или оставьте без изменений.

1. Нажмите **Следующий шаг**.
1. На шаге **Настройки сети**:

    1. **Сети**: `test-network`.
    1. **Ключ виртуальной машины**: `Создать новый ключ`.
    1. **Настройки Firewall**: `default`, `ssh`.
    1. **Назначить внешний IP-адрес**: отключить.

1. Нажмите кнопку **Следующий шаг**.
1. На шаге **Настройка резервного копирования** отключите опцию **Использовать резервное копирование**.
1. Нажмите кнопку **Создать инстанс**.

</tabpanel>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите кнопку **Добавить**.
1. На шаге **Конфигурация**:

    1. **Имя виртуальной машины**: `test-vm4`.
    1. Другие настройки задайте в зависимости от ваших требований или оставьте без изменений.

1. Нажмите **Следующий шаг**.
1. На шаге **Настройки сети**:

    1. **Сети**: `test-network-2`.
    1. **Ключ виртуальной машины**: `Создать новый ключ`.
    1. **Настройки Firewall**: `default`, `ssh`.
    1. **Назначить внешний IP-адрес**: отключить.

1. Нажмите кнопку **Следующий шаг**.
1. На шаге **Настройка резервного копирования** отключите опцию **Использовать резервное копирование**.
1. Нажмите кнопку **Создать инстанс**.

</tabpanel>
</tabs>

Создание виртуальных машин может занять некоторое время, после чего они появятся в списке. На ваш компьютер загрузятся SSH-ключи виртуальных машин.

## 3. Создайте группу безопасности

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Виртуальные сети** → **Настройка firewall**.
1. Нажмите кнопку **Добавить**.
1. Задайте **Имя группы правил** `test-icmp`.
1. Нажмите кнопку **Создать группу**.
1. В блоке **Входящий трафик** создайте правила для управления трафиком:

    1. Нажмите **Добавить правило**.
    1. **Тип**: `ICMP`.
    1. **Удаленный адрес**: `Все IP-адреса`.

1. Нажмите кнопку **Сохранить правило**.
1. В блоке **Исходящий трафик** создайте правила для управления трафиком:

    1. Нажмите **Добавить правило**.
    1. **Тип**: `ICMP`.
    1. **Удаленный адрес**: `Все IP-адреса`.

1.  Нажмите кнопку **Сохранить правило**.

## 4. Назначьте группу безопасности

Чтобы передавать и принимать трафик, назначьте ВМ группу безопасности. Для ранее созданных ВМ примените следующие настройки:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для виртуальной машины и выберите пункт **Настройки firewall**.
1. Найдите в списке группу безопасности, созданную ранее.
1. Нажмите **Применить** в строке с группой безопасности.
1. Нажмите кнопку **Подтвердить**.

{note:info}

Назначение групп безопасности гарантирует наличие ICMP-связности между созданными ВМ. Сетевая связность будет работать, даже если у одной ВМ из назначенной группы безопасности отсутствует Floating IP-адрес.

{/note}

## 5. Проверьте сетевую связность между ВМ

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Для каждой из ВМ в сетях `internet` и `test-network` выполните действия:

    <tabs>
    <tablist>
    <tab>test-vm1</tab>
    <tab>test-vm2</tab>
    <tab>test-vm3</tab>
    </tablist>
    <tabpanel>

    1. Откройте страницу ВМ `test-vm1`, нажав на ее имя в списке.
    1. Перейдите на вкладку **Консоль**.
    1. Выполните вход на ВМ.
    1. Выполните команду `ping <IP-АДРЕС_ВМ_TEST_VM2>`. Убедитесь, что пакеты приходят успешно.

    </tabpanel>
    <tabpanel>

    1. Откройте страницу ВМ `test-vm2`, нажав на ее имя в списке.
    1. Перейдите на вкладку **Консоль**.
    1. Выполните вход на ВМ.
    1. Выполните команду `ping <IP-АДРЕС_ВМ_TEST_VM3>`. Убедитесь, что пакеты приходят успешно.

    </tabpanel>
    <tabpanel>

    1. Откройте страницу ВМ `test-vm3`, нажав на ее имя в списке.
    1. Перейдите на вкладку **Консоль**.
    1. Выполните вход на ВМ.
    1. Выполните команду `ping <IP-АДРЕС_ВМ_TEST_VM2>`. Убедитесь, что пакеты приходят успешно.

    </tabpanel>
    </tabs>

## 6. Проверьте доступ в интернет

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Откройте страницу ВМ `test-vm4`, нажав на ее имя в списке.
1. Перейдите на вкладку **Консоль**.
1. Выполните вход на ВМ.
1. Выполните пинг до внешнего ресурса в интернете с помощью команды:

    ```console
    ping cloud.vk.com
    ```

    Соединение с интернетом отсутствует, поэтому обмен пакетами не происходит.

1. Перейдите в раздел **Облачные вычисления** → **Маршрутизаторы**.
1. Найдите маршрутизатор с сетью `test-network-2` и нажмите на его название.
1. Нажмите кнопку **Редактировать маршрутизатор**.
1. В открывшемся окне включите опцию **Подключение к внешней сети**.
1. Нажмите кнопку **Сохранить**.
1. Вернитесь на страницу ВМ `test-vm4`.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для `test-vm4` и выберите пункт **Перезагрузить**.
1. Откройте страницу ВМ `test-vm4`, нажав на ее имя в списке.
1. Перейдите на вкладку **Консоль**.
1. Выполните вход на ВМ.
1. Выполните пинг до внешнего ресурса в интернете с помощью команды:

    ```console
    ping cloud.vk.com
    ```

    Соединение с интернетом работает корректно, поэтому происходит обмен пакетами.

## 7. Подключитесь к ВМ по SSH

1. Откройте терминал.
1. Перейдите в директорию, куда сохранились SSH-ключи для подключения к созданным ВМ.
1. Сделайте ключ доступным только для текущего пользователя:

    ```console
    chmod 400 <ПУТЬ_К_КЛЮЧУ_ДЛЯ_ВМ_TEST_VM2>
    ```

1. Подключитесь к ВМ `test-vm2` по протоколу SSH:

    ```console
    ssh -i <ПУТЬ_К_КЛЮЧУ> <ИМЯ_ПОЛЬЗОВАТЕЛЯ>@<FLOATING_IP>
    ```

    Убедитесь в отсутствии ошибок при подключении.

## Удалите неиспользуемые ресурсы

Работающие ВМ потребляют вычислительные ресурсы. Если они вам больше не нужны:

- [удалите](/ru/computing/iaas/instructions/vm/vm-manage#delete_vm) созданные ВМ;
- [удалите](../instructions/net#udalenie_seti) сети `test-network` и `test-network-2`.
