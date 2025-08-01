Интерфейс командной строки OpenStack (OpenStack CLI) позволяет работать с сервисами платформы VK Cloud через консоль.

##  Подготовительные шаги

{tabs}

{tab(Ubuntu, Debian)}

1. Установите Python 3, если он еще не установлен:

   ```console
   sudo apt update
   sudo apt install python3
   ```
   
1. Установите pip3, если он еще не установлен:

   ```console
   sudo apt install python3-pip
   ```

{/tab}

{tab(CentOS)}

{note:info}

Инструкция написана для CentOS 8. Для других версий OC команды могут отличаться.

{/note}

1. Установите Python 3, если он еще не установлен:

   ```console
   sudo dnf update -y
   sudo dnf install python3 -y
   ```
   
1. Установите pip3, если он еще не установлен:

   ```console
   sudo dnf install python3-pip -y
   ```

1. Установите OpenStack SDK версии 1.0.1:

   ```console
   sudo pip3 install openstacksdk==1.0.1
   ```

{/tab}

{tab(macOS)}

Установите Python 3 и pip3, если они еще не установлены:

```console
brew install python3
```

{/tab}

{tab(Windows)}

{note:info}

Инструкция написана на примере Python 3.10.11 и Microsoft C++ Build Tools 2022. Для других версий программ названия и версии компонентов могут отличаться.

{/note}

1. Скачайте и установите [Python3](https://www.python.org/downloads/windows/).
1. Скачайте и запустите [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/).
1. Перейдите на вкладку **Отдельные компоненты**, выберите в списке и установите:

   - `Средства CMake C++ для Windows`. При выборе этого компонента автоматически будет выбран компонент `MSVC версии 143 — VS 2022 С++ x64/x86 Build Tools (последняя версия)`.
   - `Пакет SDK для Windows 10`.

{/tab}

{/tabs}

## 1. Установите клиент OpenStack

1. Установите Openstack CLI:

   {tabs}

   {tab(Linux, maсOS)}

   ```console
   pip3 install python-openstackclient
   ```

   {/tab}

   {tab(Windows)}

   ```console
   pip install python-openstackclient
   ```

   {/tab}

   {/tabs}

1. Проверьте, что OpenStack CLI установлен:

   ```console
   openstack --version
   ```
   
   Если OpenStack CLI установлен корректно, в ответе вернется номер версии.

## 2. (Опционально) Установите дополнительные пакеты

1. Установите пакеты для работы с отдельными сервисами OpenStack:

   ```console
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

   ```console
   pip3 install "python-manilaclient==4.9.1"
   ```

   {note:info}

   Рекомендованные версии пакета `python-manilaclient`: 4.9.1 или выше. Если нужна более старая версия, используйте 4.4.2.

   При использовании других версий `python-manilaclient` команды `openstack share network` могут выдавать ошибку.

   {/note}

## 3. Пройдите аутентификацию

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
2. Убедитесь, что [включена](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/tools-for-using-services/api/rest-api/enable-api) доступ по API.
3. Выберите проект.
4. На странице **Настройки проекта** [перейдите на вкладку](https://msk.cloud.vk.com/app/project/keys/) **Доступ по API**.
5. Нажмите кнопку **Скачать openrc версии 3**. Будет загружен файл с именем `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh`.
6. Укажите в переменных среды учетные данные для аутентификации.

   {tabs}

   {tab(Ubuntu, Debian, CentOS, macOS)}

   1. Запустите выполнение скрипта:

      ```console
      source <НАЗВАНИЕ_ПРОЕКТА>-openrc.sh
      ```

   2. Введите пароль пользователя проекта.

   {/tab}

   {tab(Windows (cmd))}

   1. Скопируйте из файла `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` значения параметров без кавычек и выполните команды:

      ```console
      set OS_INTERFACE=<OS_INTERFACE>
      set OS_IDENTITY_API_VERSION=<OS_IDENTITY_API_VERSION>
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_AUTH_URL=<OS_AUTH_URL>
      ```

   2. Укажите пароль, выполнив команду:

      ```console
      set OS_PASSWORD=<ПАРОЛЬ>
      ```

      Здесь `<ПАРОЛЬ>` — пароль пользователя проекта.

   {/tab}

   {tab(Windows (PowerShell))}

   1. Скопируйте данные из файла `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` и выполните команды:

      ```console
      $env:OS_INTERFACE = "<OS_INTERFACE>"
      $env:OS_IDENTITY_API_VERSION = "<OS_IDENTITY_API_VERSION>"
      $env:OS_PROJECT_ID = "<OS_PROJECT_ID>"
      $env:OS_REGION_NAME = "<OS_REGION_NAME>"
      $env:OS_USER_DOMAIN_NAME = "<OS_USER_DOMAIN_NAME>"
      $env:OS_USERNAME = "<OS_USERNAME>"
      $env:OS_AUTH_URL = "<OS_AUTH_URL>"
      ```

   2. Укажите пароль, выполнив команду:

      ```console
      $env:OS_PASSWORD = "<ПАРОЛЬ>"
      ```

      Здесь `<ПАРОЛЬ>` — пароль пользователя проекта.

   {/tab}

   {/tabs}

## 4. Проверьте готовность OpenStack CLI к работе

1. Проверьте наличие клиента OpenStack:

   ```console
   openstack --version
   ```

   Если клиент OpenStack установлен, в выводе консоли отобразится его версия.

2. Убедитесь, что переменные среды соответствуют проекту, выполнив команду:

   {tabs}

   {tab(Linux)}

   ```console
   env | grep OS_
   ```

   {/tab}

   {tab(Windows (cmd))}

   ```console
   set | findstr OS_
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   gci env: | where name -like 'OS_*'
   ```

   {/tab}

   {/tabs}

   В переменных среды должны содержаться учетные данные для аутентификации, соответствующие проекту.

3. Выполните команду, которая использует клиент OpenStack. Например:

   ```console
   openstack project list
   ```

   В выводе консоли должен отобразиться список доступных проектов.

## Примеры команд OpenStack CLI

- Просмотреть список доступных шаблонов конфигураций:

   ```console
   openstack flavor list
   ```

   {cut(Пример результата выполнения команды)}

   ```console
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

   {/cut}

- Вывести информацию об отдельном образе:

   ```console
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   {cut(Пример результата выполнения команды (сокращенный вывод))}

    ```console
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

   {/cut}

- Вывести список [зон доступности](/ru/intro/start/concepts/architecture#az):

   ```console
   openstack availability zone list
   ```

   {cut(Пример результата выполнения команды (сокращенный вывод))}

    ```console
    +-----------+-------------+
    | Zone Name | Zone Status |
    +-----------+-------------+
    | MS1       | available   |
    | GZ1       | available   |
    | ME1       | available   |
    +-----------+-------------+
    ```

   {/cut}
