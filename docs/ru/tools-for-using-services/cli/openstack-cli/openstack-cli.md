Интерфейс командной строки OpenStack (OpenStack CLI) позволяет работать с сервисами платформы VK Cloud через консоль.

##  Подготовительные шаги

<tabs>
<tablist>
<tab>Ubuntu, Debian</tab>
<tab>CentOS</tab>
<tab>macOS</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

1. Установите Python 3, если он еще не установлен:

   ```bash
   sudo apt update
   sudo apt install python3
   ```
   
1. Установите pip3, если он еще не установлен:

   ```bash
   sudo apt install python3-pip
   ```

</tabpanel>
<tabpanel>

<info>

Инструкция написана для CentOS 8. Для других версий OC команды могут отличаться.

</info>

1. Установите Python 3, если он еще не установлен:

   ```bash
   sudo dnf update -y
   sudo dnf install python3 -y
   ```
   
1. Установите pip3, если он еще не установлен:

   ```bash
   sudo dnf install python3-pip -y
   ```

1. Установите OpenStack SDK версии 1.0.1:

   ```bash
   sudo pip3 install openstacksdk==1.0.1
   ```

</tabpanel>
<tabpanel>

Установите Python 3 и pip3, если они еще не установлены:

```bash
brew install python3
```

</tabpanel>
<tabpanel>

<info>

Инструкция написана на примере Python 3.10.11 и Microsoft C++ Build Tools 2022. Для других версий программ названия и версии компонентов могут отличаться.

</info>

1. Скачайте и установите [Python3](https://www.python.org/downloads/windows/).
1. Скачайте и запустите [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/).
1. Перейдите на вкладку **Отдельные компоненты**, выберите в списке и установите:

   - `Средства CMake C++ для Windows`. При выборе этого компонента автоматически будет выбран компонент `MSVC версии 143 — VS 2022 С++ x64/x86 Build Tools (последняя версия)`.
   - `Пакет SDK для Windows 10`.

</tabpanel>
</tabs>

## 1. Установите клиент OpenStack

1. Установите Openstack CLI:

   <tabs>
   <tablist>
   <tab>Linux, maсOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   pip3 install python-openstackclient
   ```
   
   </tabpanel>
   <tabpanel>

   ```powershell
   pip install python-openstackclient
   ```
   
   </tabpanel>
   </tabs>
   
1. Проверьте, что OpenStack CLI установлен:

   ```bash
   openstack --version
   ```
   
   Если OpenStack CLI установлен корректно, в ответе вернется номер версии.

## 2. (Опционально) Установите дополнительные пакеты

1. Установите пакеты для работы с отдельными сервисами OpenStack:

   ```bash
   pip3 install python-<НАЗВАНИЕ_СЕРВИСА>client
   ```

   Названия сервисов:

   - `cinder` — API блочного хранилища и расширений;
   - `glance` — API образов;
   - `heat` — API оркестрации;
   - `neutron` — API сетей;
   - `nova` — API облачных вычислений (ВМ) и расширений;
   - `octavia` — API балансировщика нагрузки;
   - `sahara` — API обработки больших данных.

2. Установите клиент общего файлового хранилища Manila CLI с помощью команды:

   ```bash
   pip3 install "python-manilaclient==4.9.1"
   ```

   <info>

   Рекомендованные версии пакета `python-manilaclient`: 4.9.1 или выше. Если нужна более старая версия, используйте 4.4.2.

   При использовании других версий `python-manilaclient` команды `openstack share network` могут выдавать ошибку.

   </info>

## 3. Пройдите аутентификацию

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
2. Убедитесь, что [включена](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/tools-for-using-services/api/rest-api/enable-api) доступ по API.
3. Выберите проект.
4. На странице **Настройки проекта** [перейдите на вкладку](https://msk.cloud.vk.com/app/project/keys/) **Доступ по API**.
5. Нажмите кнопку **Скачать openrc версии 3**. Будет загружен файл с именем `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh`.
6. Укажите в переменных среды учетные данные для аутентификации.

   <tabs>
   <tablist>
   <tab>Ubuntu, Debian, CentOS, macOS</tab>
   <tab>Windows (cmd)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   1. Запустите выполнение скрипта:

      ```bash
      source <НАЗВАНИЕ_ПРОЕКТА>-openrc.sh
      ```

   2. Введите пароль пользователя проекта.

   </tabpanel>
   <tabpanel>

   1. Скопируйте из файла `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` значения параметров без кавычек и выполните команды:

      ```powershell
      set OS_INTERFACE=<OS_INTERFACE>
      set OS_IDENTITY_API_VERSION=<OS_IDENTITY_API_VERSION>
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_AUTH_URL=<OS_AUTH_URL>
      ```

   2. Укажите пароль, выполнив команду:

      ```powershell
      set OS_PASSWORD=<ПАРОЛЬ>
      ```

      Здесь `<ПАРОЛЬ>` — пароль пользователя проекта.

   </tabpanel>
   <tabpanel>

   1. Скопируйте данные из файла `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` и выполните команды:

      ```powershell
      $env:OS_INTERFACE = "<OS_INTERFACE>"
      $env:OS_IDENTITY_API_VERSION = "<OS_IDENTITY_API_VERSION>"
      $env:OS_PROJECT_ID = "<OS_PROJECT_ID>"
      $env:OS_REGION_NAME = "<OS_REGION_NAME>"
      $env:OS_USER_DOMAIN_NAME = "<OS_USER_DOMAIN_NAME>"
      $env:OS_USERNAME = "<OS_USERNAME>"
      $env:OS_AUTH_URL = "<OS_AUTH_URL>"
      ```

   2. Укажите пароль, выполнив команду:

      ```powershell
      $env:OS_PASSWORD = "<ПАРОЛЬ>"
      ```

      Здесь `<ПАРОЛЬ>` — пароль пользователя проекта.

   </tabpanel>
   </tabs>

## 4. Проверьте готовность OpenStack CLI к работе

1. Проверьте наличие клиента OpenStack:

   ```bash
   openstack --version
   ```

   Если клиент OpenStack установлен, в выводе консоли отобразится его версия.

2. Убедитесь, что переменные среды соответствуют проекту, выполнив команду:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows (cmd)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   env | grep OS_
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   set | findstr OS_
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   gci env: | where name -like 'OS_*'
   ```

   </tabpanel>
   </tabs>

   В переменных среды должны содержаться учетные данные для аутентификации, соответствующие проекту.

3. Выполните команду, которая использует клиент OpenStack. Например:

   ```bash
   openstack project list
   ```

   В выводе консоли должен отобразиться список доступных проектов.

## Примеры команд OpenStack CLI

- Просмотреть список доступных шаблонов конфигураций:

   ```bash
   openstack flavor list
   ```

   <details>
   <summary>Пример результата выполнения команды</summary>

   ```bash
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | ID                                   | Name              |   RAM | Disk | Ephemeral | VCPUs | Is Public |
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | 00bbf595-aa67-437a-b566-92cbe8d00941 | STD2-16-32        | 32768 |    0 |         0 |    16 | True      |
   | 03c66e24-b386-4ceb-91f8-36e898d7fa72 | STD3-1-2          |  2048 |    0 |         0 |     1 | True      |
   | 04db9642-04fe-474b-89cb-c5a778be9ef3 | STD2-6-24         | 24576 |    0 |         0 |     6 | True      |
   | 0c5d5d41-1317-4331-ab58-9c9e04da50d6 | STD2-4-12         | 12288 |    0 |         0 |     4 | True      |
   | 17f80791-c0dd-4124-adaa-8c4a83fa0c51 | STD2-8-16         | 16384 |    0 |         0 |     8 | True      |
   | 19ad4a49-5b3d-43bc-a61d-b4b8b44c9842 | STD3-16-64        | 65536 |    0 |         0 |    16 | True      |
   | 19dc16ec-6d6c-4a34-af1a-ff5cbb056bed | STD3-6-12         | 12288 |    0 |         0 |     6 | True      |
   ```

   </details>

- Вывести информацию об отдельном образе:

   ```bash
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   <details>
   <summary>Пример результата выполнения команды (сокращенный вывод)</summary>

    ```bash
    +------------------+------------------------------------------------------+
    | Field            | Value                                                |
    +------------------+------------------------------------------------------+
    | checksum         | 896ea37e28d82a548cedf1e0aa92XXXX                     |
    | container_format | bare                                                 |
    | created_at       | 2023-03-29T14:06:44Z                                 |
    | disk_format      | raw                                                  |
    | file             | /v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f/file |
    | id               | c6320138-035f-40d8-XXXX-e814edb2ce5f                 |
    | min_disk         | 0                                                    |
    | min_ram          | 0                                                    |
    | name             | Alt-Linux-P9-Starter-Kit                             |
    | owner            | b5b7ffd4ef0547e5b222f44555dfXXXX                     |
    | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3'|
    | protected        | False                                                |
    | schema           | /v2/schemas/image                                    |
    | size             | 1653604352                                           |
    | status           | active                                               |
    | tags             |                                                      |
    | updated_at       | 2023-03-29T14:08:15Z                                 |
    | visibility       | private                                              |
    +------------------+------------------------------------------------------+
    ```

   </details>

- Вывести список [зон доступности](/ru/intro/start/concepts/architecture#az):

   ```bash
   openstack availability zone list
   ```

   <details>
   <summary>Пример результата выполнения команды (сокращенный вывод)</summary>

    ```bash
    +-----------+-------------+
    | Zone Name | Zone Status |
    +-----------+-------------+
    | MS1       | available   |
    | GZ1       | available   |
    | ME1       | available   |
    +-----------+-------------+
    ```

   </details>
