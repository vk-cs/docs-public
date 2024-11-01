Вы можете:

- создавать файловые хранилища;
- подключать (монтировать) их к виртуальным машинам внутри проекта VK Cloud по протоколам CIFS или NFS;
- записывать данные в подключенные файловые хранилища и читать из них данные;
- создавать снимки текущего состояния файлового хранилища.

Файловые хранилища создаются в личном кабинете VK Cloud или в OpenStack CLI. Подключение файловых хранилищ, запись и чтение данных доступны только на виртуальных машинах VK Cloud. Остальные функции работы с хранилищами доступны в личном кабинете VK Cloud или в клиенте OpenStack с помощью команд `openstack share`.

## Создание файлового хранилища

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где нужно создать файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите кнопку **Создать**.
1. Задайте параметры файлового хранилища:
   - **Имя файлового хранилища**: может состоять только из латинских букв, цифр и спецсимволов `-`, `_` и `.`.
   - **Размер хранилища**: размер хранилища в ГБ. Должен быть в пределах квоты, не меньше 10 ГБ и не больше 10000 ГБ.
   - **Протокол**: для доступа к хранилищу из ОС Windows выберите протокол CIFS, из Linux — NFS.
   - **Сеть**: выберите из предложенных или создайте новую. Для новой сети укажите также **Адрес подсети**.
   - **Сеть файлового хранилища**: выберите из предложенных или создайте новую.
1. Нажмите кнопку **Следующий шаг**.
1. (Опционально) Добавьте правила доступа к хранилищу:
    1. Нажмите на **Добавить новое правило**.
    1. Введите IP-адрес или адрес подсети источника.
    1. Выберите режим доступа.
    1. Нажмите кнопку **Добавить правило**.

   <info>

   Добавить правила доступа можно и после создания файлового хранилища.

   </info>

1. Нажмите **Добавить файловый сервер**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выберите существующую сеть файлового хранилища или создайте новую.

    <tabs>
    <tablist>
    <tab>Выбор существующей сети</tab>
    <tab>Создание новой сети</tab>
    </tablist>
    <tabpanel>

    1. Получите список существующих сетей файлового хранилища, выполнив команду:

        ```bash
        openstack share network list
        ```

        Запишите имя или ID нужной сети.
    1. (Опционально) Просмотрите свойства выбранной сети, выполнив команду:

        ```bash
        openstack share network show <СЕТЬ>
        ```

        Здесь `<СЕТЬ>` — имя или ID существующей в проекте сети файлового хранилища.

    </tabpanel>
    <tabpanel>

    Выполните команду:

    ```bash
    openstack share network create --neutron-net-id <ID_СЕТИ> --neutron-subnet-id <ID_ПОДСЕТИ> --name <ИМЯ_СЕТИ>
    ```

    Здесь:

    - `<ID_СЕТИ>` — ID существующей в проекте приватной сети.
    - `<ID_ПОДСЕТИ>` — ID ее подсети.
    - `<ИМЯ_СЕТИ>` — имя для создаваемой сети файлового хранилища.

    Запишите имя или ID созданной сети.

    </tabpanel>
    </tabs>

1. Создайте файловое хранилище с помощью команды:

    ```bash
    openstack share create --name <ИМЯ_ХРАНИЛИЩА> --share-network <СЕТЬ> <ПРОТОКОЛ> <РАЗМЕР> 
    ```

    Здесь:

      - `<ИМЯ_ХРАНИЛИЩА>` — имя для создаваемого файлового хранилища.
      - `<СЕТЬ>` — имя или ID сети, выбранной или созданной на предыдущем шаге.
      - `<ПРОТОКОЛ>` — протокол доступа. Для доступа к хранилищу из ОС Windows укажите протокол CIFS, из Linux — NFS.
      - `<РАЗМЕР>` — желаемый размер файлового хранилища в ГБ. Должен быть в пределах квоты, не меньше 10 ГБ и не больше 10000 ГБ.

</tabpanel>
</tabs>

## Подключение файлового хранилища

Способ подключения файлового хранилища зависит от операционной системы, [Windows](/ru/computing/iaas/service-management/fs-manage#windows_9d4b0f21) или [Linux](/ru/computing/iaas/service-management/fs-manage#linux_73d7df98), и протокола, выбранного при создании хранилища.

### Windows

<info>

Инструкция приведена для Windows Server 2012 R2. О подключении в других версиях Windows читайте в документации разработчика.

</info>

<tabs>
<tablist>
<tab>Протокол NFS</tab>
<tab>Протокол CIFS</tab>
</tablist>
<tabpanel>

Подключить файловое хранилище по протоколу NFS в Windows можно с помощью компонента Windows Server — Клиент для NFS.

1. Установите Клиент для NFS из интерфейса Диспетчера серверов или с помощью PowerShell:

    <tabs>
    <tablist>
    <tab>Диспетчер серверов</tab>
    <tab>PowerShell</tab>
    </tablist>
    <tabpanel>

    1. Откройте Диспетчер серверов и в меню **Управление** выберите **Добавить роли и компоненты**.
    1. Перейдите в раздел **Тип установки**, выберите опцию **Установка ролей и компонентов** и нажмите **Далее**.
    1. Перейдите в раздел **Компоненты**, выберите в списке **Клиент для NFS**.
    1. В том же списке раскройте опции **Средства удаленного администрирования серверов → Средства администрирования ролей → Средства файловых служб** и выберите **Службы для средств управления NFS**. Нажмите **Далее**.
    1. Проверьте, что выбраны все необходимые компоненты, и нажмите **Установить**.
    1. Дождитесь окончания установки и перезагрузите сервер.

    </tabpanel>
    <tabpanel>

    1. Установите:

        - Клиент для NFS;
        - службы для средств управления NFS.

        Воспользуйтесь Powershell-командой:

        ```powershell
        Install-WindowsFeature NFS-Client, RSAT-NFS-Admin
        ```

    2. Дождитесь окончания установки и перезагрузите сервер.

    </tabpanel>
    </tabs>

2. Измените настройки клиента с помощью Диспетчера серверов:

   1. В меню **Средства** выберите **Службы для NFS**.
   1. Выберите **Клиент для NFS** и нажмите на иконку **Отобразить окно свойств**.
   1. Задайте нужные настройки.

3. Подключите файловое хранилище с помощью команды, указанной в его [свойствах](#prosmotr_informacii_o_faylovom_hranilishche).

    Команда для подключения хранилища выглядит так:

    ```bash
    mount <ТОЧКА_ПОДКЛЮЧЕНИЯ> <ИМЯ_ДИСКА>:
    ```

    Здесь:

    - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища, указанный в его описании.
    - `<ИМЯ_ДИСКА>` — заглавная латинская буква, не использованная в имени других дисков.

</tabpanel>
<tabpanel>

Для подключения файлового хранилища выполните команду, указанную в его [свойствах](#prosmotr_informacii_o_faylovom_hranilishche).

Команда для подключения хранилища выглядит так:

```bash
net use <ИМЯ_ДИСКА>: <ТОЧКА_ПОДКЛЮЧЕНИЯ>
```

Здесь:

- `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища, указанный в его описании.
- `<ИМЯ_ДИСКА>` — заглавная латинская буква, не использованная в имени других дисков.

</tabpanel>
</tabs>

### Linux

<info>

Инструкция приведена для Ubuntu. О подключении в других Unix-подобных ОС читайте в документации разработчика.

</info>

<tabs>
<tablist>
<tab>Протокол NFS</tab>
<tab>Протокол CIFS</tab>
</tablist>
<tabpanel>

1. Установите пакет `nfs-common` с помощью команды:

    ```bash
    sudo apt-get install nfs-common
    ```

2. Создайте директорию для монтирования хранилища:

    ```bash
    mkdir <ИМЯ_ДИРЕКТОРИИ>
    ```

3. Используйте команду, указанную в [свойствах](#prosmotr_informacii_o_faylovom_hranilishche) хранилища:

    ```bash
    mount -t nfs <ТОЧКА_ПОДКЛЮЧЕНИЯ> ./<ИМЯ_ДИРЕКТОРИИ>
    ```

    Здесь:

    - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища, указанный в его описании.
    - `<ИМЯ_ДИРЕКТОРИИ>` — имя директории, созданной ранее.

</tabpanel>
<tabpanel>

1. Установите `cifs-utils` с помощью команды:

    ```bash
    sudo apt install -y cifs-utils
    ```

2. Создайте директорию для монтирования хранилища:

    ```bash
    mkdir <ИМЯ_ДИРЕКТОРИИ>
    ```

3. Используйте команду, указанную в [свойствах](#prosmotr_informacii_o_faylovom_hranilishche) хранилища:

    ```bash
    sudo mount -o user=,password= -t cifs <ТОЧКА_ПОДКЛЮЧЕНИЯ> ./<ИМЯ_ДИРЕКТОРИИ>
    ```

    Здесь:

    - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища, указанный в его описании.
    - `<ИМЯ_ДИРЕКТОРИИ>` — имя директории, созданной ранее.

</tabpanel>
</tabs>

## Просмотр списка файловых хранилищ

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**. Отобразится список файловых хранилищ.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share list
    ```

</tabpanel>
</tabs>

## Просмотр информации о файловом хранилище

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища. Отобразится информация о нем.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share show <ХРАНИЛИЩЕ>
    ```

    Здесь `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.

</tabpanel>
</tabs>

## Увеличение размера файлового хранилища

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Изменить размер**.
1. Введите значение и нажмите **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share extend <ХРАНИЛИЩЕ> <РАЗМЕР>
    ```

    Здесь:

    - `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.
    - `<РАЗМЕР>` — новый размер файлового хранилища в ГБ.

</tabpanel>
</tabs>

<info>

Размер файлового хранилища нельзя уменьшить.

</info>

## Создание снимка

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Создать снимок**.
1. (Опционально) Измените название снимка и добавьте описание.
1. Нажмите **Создать снимок**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share snapshot create --name <ИМЯ_СНИМКА> <ХРАНИЛИЩЕ>
    ```
   Здесь:

    - `<ИМЯ_СНИМКА>` — имя для создаваемого снимка файлового хранилища.
    - `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.

</tabpanel>
</tabs>

## Получение списка снимков

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Список снимков**. Отобразится информация о снимках.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share snapshot list --share <ХРАНИЛИЩЕ>
    ```

   Здесь `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.

</tabpanel>
</tabs>

## Восстановление хранилища из снимка

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Список снимков**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного снимка и выберите пункт **Восстановить файловое хранилище**.
1. Нажмите **Подтвердить**. Начнется процесс создания нового хранилища из снимка.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share create --snapshot-id <ID_СНИМКА> --share-type <ТИП_ХРАНИЛИЩА> --name <ИМЯ_ХРАНИЛИЩА> <ПРОТОКОЛ> <РАЗМЕР>
    ```

    Здесь:

    - `<ID_СНИМКА>` — ID снимка, на основе которого будет создано новое файловое хранилище.
    - `<ТИП_ХРАНИЛИЩА>` — тип создаваемого файлового хранилища.
    - `<ИМЯ_ХРАНИЛИЩА>` — имя для создаваемого файлового хранилища.
    - `<ПРОТОКОЛ>` — протокол для доступа к хранилищу из операционной системы: CIFS или NFS.
    - `<РАЗМЕР>` — размер файлового хранилища в ГБ.

    Значения `<ТИП_ХРАНИЛИЩА>`, `<ПРОТОКОЛ>` и `<РАЗМЕР>` должны совпадать с соответствующими характеристиками снимка.

</tabpanel>
</tabs>

## Удаление снимка

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Список снимков**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного снимка и выберите пункт **Удалить снимок**.
1. Нажмите **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share snapshot delete <СНИМОК>
    ```

    Здесь `<СНИМОК>` — имя или ID снимка, который нужно удалить.

</tabpanel>
</tabs>

## Добавление правила доступа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища.
1. Перейдите на вкладку **Правила доступа**.
1. Нажмите **Добавить новое правило**.
1. Укажите IP или адрес подсети источника и режим доступа.
1. Нажмите **Добавить правило**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Добавьте правило доступа с помощью команды:

    ```bash
    openstack share access create <ХРАНИЛИЩЕ> ip <IP_СЕТИ> --access-level <РЕЖИМ_ДОСТУПА>
    ```

    Здесь:

    - `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.
    - `<IP_СЕТИ>` — адрес сети файлового хранилища в формате CIDR.
    - `<РЕЖИМ_ДОСТУПА>` — аргумент, который принимает значения `rw` (чтение и запись) или `ro` (только чтение).

1. Проверьте, что правило создано успешно, запросив список правил доступа:

    ```bash
    openstack share access list <ХРАНИЛИЩЕ>
    ```

    Здесь `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.

</tabpanel>
</tabs>

## Удаление правила доступа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя нужного файлового хранилища.
1. Перейдите на вкладку **Правила доступа**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного правила и выберите пункт **Удалить**.
1. Нажмите **Подтвердить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Получите ID нужного правила, запросив список правил доступа:

    ```bash
    openstack share access list <ХРАНИЛИЩЕ>
    ```

    Здесь `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.

1. Удалите правило доступа с помощью команды:

    ```bash
    openstack share access delete <ХРАНИЛИЩЕ> <ID_ПРАВИЛА>
    ```

    Здесь:

    - `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища.
    - `<ID_ПРАВИЛА>` — ID правила доступа, которое нужно удалить.

</tabpanel>
</tabs>

## Удаление файлового хранилища и его сети

Для удаления файлового хранилища необходимо сначала демонтировать его на виртуальных машинах и [удалить](#udalenie_snimka) все его снимки.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужное файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хранилища и выберите пункт **Удалить**.
1. Нажмите **Подтвердить**.

Одновременно с файловым хранилищем будет удалена созданная для него сеть.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что клиент Manila [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Чтобы удалить файловое хранилище, выполните команду:

    ```bash
    openstack share delete <ХРАНИЛИЩЕ>
    ```

    Здесь `<ХРАНИЛИЩЕ>` — имя или ID файлового хранилища, которое нужно удалить.

1. Чтобы удалить сеть файлового хранилища, выполните команду:

    ```bash
    openstack share network delete <ID_СЕТИ>
    ```

    Здесь `<ID_СЕТИ>` — ID сети файлового хранилища, которую нужно удалить.

</tabpanel>
</tabs>
