Вы можете:

- создавать файловые хранилища;
- подключать (монтировать) их к виртуальным машинам внутри проекта VK Cloud по протоколам CIFS или NFS;
- записывать данные в подключенные файловые хранилища и читать из них данные;
- создавать снимки текущего состояния файлового хранилища.

Файловые хранилища создаются в личном кабинете VK Cloud. Подключение файловых хранилищ, запись и чтение данных доступны только на виртуальных машинах VK Cloud. Остальные функции работы с хранилищами доступны в личном кабинете VK Cloud или в клиенте OpenStack с помощью команд `openstack share`.

## Создание файлового хранилища

<tabs>
<tablist>
<tab>Личный кабинет</tab>
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
    mount <Точка подключения> <Имя диска>:
    ```

    Здесь:

    - `<Точка подключения>` — адрес файлового хранилища, указанный в его описании;
    - `<Имя диска>` — заглавная латинская буква, не использованная в имени других дисков.

</tabpanel>
<tabpanel>

Для подключения файлового хранилища выполните команду, указанную в его [свойствах](#prosmotr_informacii_o_faylovom_hranilishche).

Команда для подключения хранилища выглядит так:

```bash
net use <Имя диска>: <Точка подключения>
```

Здесь:

- `<Точка подключения>` — адрес файлового хранилища, указанный в его описании;
- `<Имя диска>` — заглавная латинская буква, не использованная в имени других дисков.

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
    mkdir <Имя директории>
    ```

3. Используйте команду, указанную в [свойствах](#prosmotr_informacii_o_faylovom_hranilishche) хранилища:

    ```bash
    mount -t nfs <Точка подключения> ./<Имя директории>
    ```

    Здесь:

    - `<Точка подключения>` — адрес файлового хранилища, указанный в его описании;
    - `<Имя директории>` — имя директории, созданной ранее.

</tabpanel>
<tabpanel>

1. Установите `cifs-utils` с помощью команды:

    ```bash
    sudo apt install -y cifs-utils
    ```

2. Создайте директорию для монтирования хранилища:

    ```bash
    mkdir <Имя директории>
    ```

3. Используйте команду, указанную в [свойствах](#prosmotr_informacii_o_faylovom_hranilishche) хранилища:

    ```bash
    sudo mount -o user=,password= -t cifs <Точка подключения> ./<Имя директории>
    ```

    Здесь:

    - `<Точка подключения>` — адрес файлового хранилища, указанный в его описании;
    - `<Имя директории>` — имя директории, созданной ранее.

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share show <имя или ID хранилища>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share extend <имя или ID хранилища> <новый размер>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share snapshot create --name <имя снимка> <имя или ID хранилища>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share snapshot list --share <имя или ID хранилища>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share create --snapshot-id <ID снимка> --share-type <тип хранилища> --name <имя хранилища> <протокол> <размер>
    ```

    Значения `<тип хранилища>`, `<протокол>` и `<размер>` должны совпадать с соответствующими характеристиками снимка.

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Выполните команду:

    ```bash
    openstack share snapshot delete <ID или имя снимка>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Добавьте правило доступа с помощью команды:

    ```bash
    openstack share access create <имя или ID хранилища> ip <адрес сети в формате CIDR> --access-level <режим доступа>
    ```

    Аргумент `<режим доступа>` может принимать значения `rw` (чтение и запись) или `ro` (только чтение).

1. Проверьте, что правило создано успешно, запросив список правил доступа:

    ```bash
    openstack share access list <имя или ID хранилища>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Получите ID нужного правила, запросив список правил доступа:

    ```bash
    openstack share access list <имя или ID хранилища>
    ```
1. Удалите правило доступа с помощью команды:

    ```bash
    openstack share access delete <имя или ID хранилища> <ID правила доступа>
    ```

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
1. Убедитесь, что Manila CLI [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Чтобы удалить файловое хранилище, выполните команду:

    ```bash
    openstack share delete <имя или ID хранилища>
    ```

1. Чтобы удалить сеть файлового хранилища, выполните команду:

    ```bash
    openstack share network delete <ID сети хранилища>
    ```

</tabpanel>
</tabs>
