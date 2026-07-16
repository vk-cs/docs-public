# {heading(OpenStack CLI)[id=tools-cli-openstack]}

{include(/kz/_includes/_translated_by_ai.md)}

OpenStack пәрмен жолы интерфейсі (OpenStack CLI) {var(cloud)} платформа сервистерімен консоль арқылы жұмыс істеуге мүмкіндік береді.

## {heading(Дайындық қадамдары)[id=openstack-prepare]}

{tabs}

{tab(Ubuntu, Debian)}

1. Python 3 және virtualenv әлі орнатылмаған болса, оларды орнатыңыз:

   ```console
   sudo apt update
   sudo apt install python3 virtualenv
   ```

1. pip3 әлі орнатылмаған болса, оны орнатыңыз:

   ```console
   sudo apt install python3-pip
   ```

1. OpenStack-пен жұмыс істеу үшін виртуалды ортаны жасаңыз және іске қосыңыз:

   ```console
   virtualenv env
   source env/bin/activate
   ```

{/tab}

{tab(CentOS)}

{note:info}

Нұсқаулық CentOS 8 үшін жазылған. ОЖ-нің басқа нұсқалары үшін пәрмендер өзгеше болуы мүмкін.

{/note}

1. Python 3 және virtualenv әлі орнатылмаған болса, оларды орнатыңыз:

   ```console
   sudo dnf update -y
   sudo dnf install python3 -y
   sudo dnf install virtualenv -y
   ```

1. pip3 әлі орнатылмаған болса, оны орнатыңыз:

   ```console
   sudo dnf install python3-pip -y
   ```

{/tab}

{tab(macOS)}

1. Python 3 және pip3 әлі орнатылмаған болса, оларды орнатыңыз:

   ```console
   brew install python3
   ```

1. virtualenv әлі орнатылмаған болса, оны орнатыңыз:

   ```console
   pip3 install virtualenv
   ```

{/tab}

{tab(Windows)}

{note:info}

Нұсқаулық Python 3.10.11 және Microsoft C++ Build Tools 2022 мысалында жазылған. Бағдарламалардың басқа нұсқалары үшін компоненттердің атаулары мен нұсқалары өзгеше болуы мүмкін.

{/note}

1. [Python 3](https://www.python.org/downloads/windows/) жүктеп алып, орнатыңыз.
1. [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/kz/visual-cpp-build-tools/) жүктеп алып, іске қосыңыз.
1. **Жеке компоненттер** қойындысына өтіп, тізімнен таңдап, орнатыңыз:

    - `Windows жүйесіне арналған CMake C++ құралдары`. Осы компонентті таңдағанда `MSVC нұсқасы 143 — VS 2022 С++ x64/x86 Build Tools (ең соңғы нұсқа)` компоненті автоматты түрде таңдалады.
    - `Windows 10 арналған SDK жинағы`.

{/tab}

{/tabs}

## {heading({counter(cli)}. OpenStack клиентін орнатыңыз)[id=openstack-install]}

1. Openstack CLI орнатыңыз:

   {tabs}

   {tab(Ubuntu, Debian, CentOS)}

   ```console
   pip3 install python-openstackclient
   ```

   {/tab}

   {tab(macOS)}

   ```console
   brew install openstackclient
   ```

   {/tab}

   {tab(Windows)}

   ```console
   pip install python-openstackclient
   ```

   {/tab}

   {/tabs}

1. OpenStack CLI орнатылғанын тексеріңіз:

   ```console
   openstack --version
   ```

   Егер OpenStack CLI дұрыс орнатылса, жауап ретінде нұсқа нөмірі қайтарылады.

## {heading({counter(cli)}. (Опционалды) Қосымша пакеттерді орнатыңыз)[id=openstack-install-package]}

1. OpenStack-тің жекелеген сервистерімен жұмыс істеуге арналған пакеттерді орнатыңыз:

   ```console
   pip3 install python-<НАЗВАНИЕ_СЕРВИСА>client
   ```

   Сервис атаулары:

    - `cinder` — блоктық сақтау API-і және кеңейтімдері;
    - `glance` — образдар API-і;
    - `heat` — оркестрация API-і;
    - `neutron` — желілер API-і;
    - `nova` — бұлтты есептеулер (ВМ) API-і және кеңейтімдері;
    - `octavia` — жүктеме теңгергіші API-і;
    - `sahara` — үлкен деректерді өңдеу API-і.

2. Manila CLI ортақ файлдық сақтау клиентін мына пәрмен арқылы орнатыңыз:

   ```console
   pip3 install "python-manilaclient==4.9.1"
   ```

   {note:info}

   `python-manilaclient` пакетінің ұсынылатын нұсқалары: 4.9.1 немесе одан жоғары. Егер ескілеу нұсқа қажет болса, 4.4.2 нұсқасын пайдаланыңыз.

   `python-manilaclient` пакетінің басқа нұсқаларын пайдаланған кезде `openstack share network` пәрмендері қате беруі мүмкін.

   {/note}

## {heading({counter(cli)}. Аутентификациядан өтіңіз)[id=openstack-authorize]}

1. {var(cloud)} [жеке кабинетіне](https://kz.cloud.vk.com/app/) өтіңіз.
2. Екі факторлы аутентификация [қосылғанына](/kz/access/iam/instructions/manage-2fa) және API арқылы қолжетімділік [белсендірілгеніне](/kz/tools-for-using-services/api/rest-api/enable-api) көз жеткізіңіз.
3. Жобаны таңдаңыз.
4. **Жоба баптаулары** бетінде **API арқылы қолжетімділік** [қойындысына өтіңіз](https://kz.cloud.vk.com/app/project/keys/).
5. **openrc версии 3 жүктеп алу** түймесін басыңыз. `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` атауымен файл жүктеледі.
6. Орта айнымалыларында аутентификация үшін тіркелгі деректерін көрсетіңіз.

   {tabs}

   {tab(Ubuntu, Debian, CentOS, macOS)}

    1. Скриптті іске қосыңыз:

       ```console
       source <НАЗВАНИЕ_ПРОЕКТА>-openrc.sh
       ```

    2. Жоба пайдаланушысының құпиясөзін енгізіңіз.

   {/tab}

   {tab(Windows (cmd))}

    1. `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` файлынан параметр мәндерін тырнақшасыз көшіріп, пәрмендерді орындаңыз:

       ```console
       set OS_INTERFACE=<OS_INTERFACE>
       set OS_IDENTITY_API_VERSION=<OS_IDENTITY_API_VERSION>
       set OS_PROJECT_ID=<OS_PROJECT_ID>
       set OS_REGION_NAME=<OS_REGION_NAME>
       set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
       set OS_USERNAME=<OS_USERNAME>
       set OS_AUTH_URL=<OS_AUTH_URL>
       ```

    2. Пәрменді орындап, құпиясөзді көрсетіңіз:

       ```console
       set OS_PASSWORD=<ПАРОЛЬ>
       ```

       Мұнда `<ПАРОЛЬ>` — жоба пайдаланушысының құпиясөзі.

   {/tab}

   {tab(Windows (PowerShell))}

    1. `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` файлынан деректерді көшіріп, пәрмендерді орындаңыз:

       ```console
       $env:OS_INTERFACE = "<OS_INTERFACE>"
       $env:OS_IDENTITY_API_VERSION = "<OS_IDENTITY_API_VERSION>"
       $env:OS_PROJECT_ID = "<OS_PROJECT_ID>"
       $env:OS_REGION_NAME = "<OS_REGION_NAME>"
       $env:OS_USER_DOMAIN_NAME = "<OS_USER_DOMAIN_NAME>"
       $env:OS_USERNAME = "<OS_USERNAME>"
       $env:OS_AUTH_URL = "<OS_AUTH_URL>"
       ```

    2. Пәрменді орындап, құпиясөзді көрсетіңіз:

       ```console
       $env:OS_PASSWORD = "<ПАРОЛЬ>"
       ```

       Мұнда `<ПАРОЛЬ>` — жоба пайдаланушысының құпиясөзі.

   {/tab}

   {/tabs}

## {heading({counter(cli)}. OpenStack CLI жұмысына дайындығын тексеріңіз)[id=openstack-check]}

1. OpenStack клиентінің бар екенін тексеріңіз:

   ```console
   openstack --version
   ```

   Егер OpenStack клиенті орнатылған болса, консоль шығысында оның нұсқасы көрсетіледі.

2. Келесі пәрменді орындап, орта айнымалылары жобаға сәйкес келетініне көз жеткізіңіз:

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

   Орта айнымалыларында жобаға сәйкес аутентификацияға арналған тіркелгі деректері болуы керек.

3. OpenStack клиентін пайдаланатын пәрменді орындаңыз. Мысалы:

   ```console
   openstack project list
   ```

   Консоль шығысында қолжетімді жобалардың тізімі көрсетілуі керек.

## {heading(OpenStack CLI пәрмендерінің мысалдары)[id=openstack-example]}

- Қолжетімді конфигурация қалыптарының тізімін қарау:

   ```console
   openstack flavor list
   ```

  {cut(Пәрменді орындау нәтижесінің мысалы)}

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

- Жеке образ туралы ақпаратты шығару:

   ```console
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

  {cut(Пәрменді орындау нәтижесінің мысалы (қысқартылған шығыс))}

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

- [Қолжетімділік аймақтарының](/kz/start/concepts/architecture#architecture-az) тізімін шығару:

   ```console
   openstack availability zone list
   ```

  {cut(Пәрменді орындау нәтижесінің мысалы (қысқартылған шығыс))}

    ```console
    +-----------+-------------+
    | Zone Name | Zone Status |
    +-----------+-------------+
    | MS1       | available   |
    | GZ1       | available   |
    | ME1       | available   |
    | PA2       | available   |
    +-----------+-------------+
    ```

  {/cut}
