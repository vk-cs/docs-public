{includetag(openstack-intro)}
OpenStack пәрмен жолы интерфейсі (OpenStack CLI) {var(cloud)} сервистерімен консоль арқылы жұмыс істеуге мүмкіндік береді.
{/includetag}

{includetag(openstack-prepare)}
{tabs}

{tab(Ubuntu, Debian)}

1. Егер Python 3 және virtualenv әлі орнатылмаған болса, оларды орнатыңыз:

   ```console
   sudo apt update
   sudo apt install python3 virtualenv
   ```

1. Егер pip3 әлі орнатылмаған болса, оны орнатыңыз:

   ```console
   sudo apt install python3-pip
   ```

1. OpenStack-пен жұмыс істеу үшін виртуалды ортаны жасаңыз және белсендіріңіз:

   ```console
   virtualenv env
   source env/bin/activate
   ```

{/tab}

{tab(CentOS)}

{note:info}
Нұсқаулық CentOS 8 үшін жазылған. ОЖ-ның басқа нұсқалары үшін командалар өзгеше болуы мүмкін.
{/note}

1. Егер Python 3 және virtualenv әлі орнатылмаған болса, оларды орнатыңыз:

   ```console
   sudo dnf update -y
   sudo dnf install python3 -y
   sudo dnf install virtualenv -y
   ```

1. Егер pip3 әлі орнатылмаған болса, оны орнатыңыз:

   ```console
   sudo dnf install python3-pip -y
   ```

{/tab}

{tab(macOS)}

1. Егер Python 3 және pip3 әлі орнатылмаған болса, оларды орнатыңыз:

   ```console
   brew install python3
   ```

1. Егер virtualenv әлі орнатылмаған болса, оны орнатыңыз:

   ```console
   pip3 install virtualenv
   ```

{/tab}

{tab(Windows)}

{note:info}
Нұсқаулық Python 3.10.11 және Microsoft C++ Build Tools 2022 мысалында жазылған. Бағдарламалардың басқа нұсқалары үшін компоненттердің атаулары мен нұсқалары өзгеше болуы мүмкін.
{/note}

1. [Python 3](https://www.python.org/downloads/windows/) жүктеп алыңыз және орнатыңыз.
1. [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/) жүктеп алыңыз және іске қосыңыз.
1. **Отдельные компоненты** қойындысына өтіп, тізімнен мыналарды таңдап орнатыңыз:

   - `Средства CMake C++ для Windows`. Бұл компонентті таңдағанда `MSVC версии 143 — VS 2022 С++ x64/x86 Build Tools (последняя версия)` компоненті автоматты түрде таңдалады.
   - `Пакет SDK для Windows 10`.

{/tab}

{/tabs}
{/includetag}

{includetag(openstack-install)}
{ifdef(public)}
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

   Егер OpenStack CLI дұрыс орнатылған болса, жауапта нұсқа нөмірі қайтарылады.
{/ifdef}

{ifdef(private,private-pdf,private-pg,private-pg-pdf)}
Openstack CLI орнатыңыз:

{note:warn}
Қосылу үшін `python3-openstackclient-6.6.0` пакетін пайдалану ұсынылады.
{/note}

```console
pip install python-openstackclient
```
{/ifdef}

{ifdef(private-cert)}
Қосылу үшін {var(cloud)} дистрибутивіндегі `python3-openstackclient` пакетін пайдалану қажет.

Openstack CLI орнатыңыз:

```console
$ dnf install python3-openstackclient
```
{/ifdef}
{/includetag}

{includetag(openstack-install-package)}
{ifdef(public)}
1. Жеке OpenStack сервистерімен жұмыс істеуге арналған пакеттерді орнатыңыз:

   ```console
   pip3 install python-<НАЗВАНИЕ_СЕРВИСА>client
   ```

   Сервистер атаулары:

   - `cinder` — блоктық сақтау орны мен кеңейтімдерінің API;
   - `glance` — образдар API;
   - `heat` — оркестрлеу API;
   - `neutron` — желілер API;
   - `nova` — бұлттық есептеулер (ВМ) мен кеңейтімдерінің API;
   - `octavia` — жүктемені теңгеруші API;
   - `sahara` — үлкен деректерді өңдеу API;
   - `trove` — дерекқорлар API.

2. Manila CLI ортақ файлдық сақтау орны клиентін мына команда көмегімен орнатыңыз:

   ```console
   pip3 install "python-manilaclient==4.9.1"
   ```

   {note:info}
   `python-manilaclient` пакетінің ұсынылатын нұсқалары: 4.9.1 немесе одан жоғары. Ескілеу нұсқа қажет болса, 4.4.2 нұсқасын пайдаланыңыз.

   `python-manilaclient` басқа нұсқаларын пайдаланғанда `openstack share network` командалары қате беруі мүмкін.
   {/note}
{/ifdef}

{ifdef(private,private-pdf,private-pg,private-pg-pdf)}
OpenStack-тың жеке сервистерімен жұмыс істеуге арналған пакеттерді орнатыңыз:

```console
pip install python-cinderclient
```

Пайдалануға ұсынылатын пакеттер:

- `python3-keystoneclient-3.10.0`,
- `python3-barbicanclient-5.2.0`,
- `python3-novaclient-7.1.2`,
- `python3-cinderclient-1.11.1`,
- `python3-glanceclient-2.6.0`,
- `python3-neutronclient-6.1.1`,
- `python3-manilaclient-1.14.1`,
- `python3-octaviaclient-1.8.2`.
{/ifdef}

{ifdef(private-cert)}
OpenStack CLI арқылы жұмыс істейтін компоненттің клиентін орнатыңыз, мысалы:

```console
$ pip install python-cinderclient
```

{var(cloud)} дистрибутивінен орнатуға қолжетімді клиенттер:

- `python3-keystoneclient`.
- `python3-barbicanclient`.
- `python3-novaclient`.
- `python3-cinderclient`.
- `python3-glanceclient`.
- `python3-neutronclient`.
- `python3-octaviaclient`.
{/ifdef}
{/includetag}

{includetag(openstack-authorize)}
1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
   {ifdef(public)}
1. Екі факторлы аутентификацияның {linkto(../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=қосылғанына]} және API арқылы қолжетімділіктің {linkto(../../api/rest-api/enable-api#rest-api-enable-activate)[text=белсендірілгеніне]} көз жеткізіңіз.

   {note:warn}
   Екі факторлы аутентификацияны өшірсеңіз, API арқылы қолжетімділік автоматты түрде өшіріледі және OpenStack CLI мен басқа API құралдарымен жұмыс істеу мүмкін болмайды.
   {/note}
   {/ifdef}

1. Жобаны таңдаңыз.
1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API арқылы қатынау** қойындысына өтіңіз.
1. **openrc 3-нұсқасын жүктеп алу** түймесін басыңыз. `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` атауы бар файл жүктеледі.
   {ifdef(public)}
1. Аутентификацияға арналған есептік деректерді орта айнымалыларында көрсетіңіз.

   {tabs}

   {tab(Ubuntu, Debian, CentOS, macOS)}

    1. Скриптті орындауды іске қосыңыз:

       ```console
       source <НАЗВАНИЕ_ПРОЕКТА>-openrc.sh
       ```

    1. Жоба пайдаланушысының құпиясөзін енгізіңіз.

   {/tab}

   {tab(Windows (cmd))}

    1. `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` файлынан параметрлер мәндерін тырнақшасыз көшіріп, командаларды орындаңыз:

       ```console
       set OS_INTERFACE=<OS_INTERFACE>
       set OS_IDENTITY_API_VERSION=<OS_IDENTITY_API_VERSION>
       set OS_PROJECT_ID=<OS_PROJECT_ID>
       set OS_REGION_NAME=<OS_REGION_NAME>
       set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
       set OS_USERNAME=<OS_USERNAME>
       set OS_AUTH_URL=<OS_AUTH_URL>
       ```

    1. Команданы орындау арқылы құпиясөзді көрсетіңіз:

       ```console
       set OS_PASSWORD=<ПАРОЛЬ>
       ```

       Мұнда `<ПАРОЛЬ>` — жоба пайдаланушысының құпиясөзі.

   {/tab}

   {tab(Windows (PowerShell))}

    1. `<НАЗВАНИЕ_ПРОЕКТА>-openrc.sh` файлынан деректерді көшіріп, командаларды орындаңыз:

       ```console
       $env:OS_INTERFACE = "<OS_INTERFACE>"
       $env:OS_IDENTITY_API_VERSION = "<OS_IDENTITY_API_VERSION>"
       $env:OS_PROJECT_ID = "<OS_PROJECT_ID>"
       $env:OS_REGION_NAME = "<OS_REGION_NAME>"
       $env:OS_USER_DOMAIN_NAME = "<OS_USER_DOMAIN_NAME>"
       $env:OS_USERNAME = "<OS_USERNAME>"
       $env:OS_AUTH_URL = "<OS_AUTH_URL>"
       ```

    1. Команданы орындау арқылы құпиясөзді көрсетіңіз:

       ```console
       $env:OS_PASSWORD = "<ПАРОЛЬ>"
       ```

       Мұнда `<ПАРОЛЬ>` — жоба пайдаланушысының құпиясөзі.

   {/tab}

   {/tabs}
   {/ifdef}
   {ifndef(public)}
1. Конфигурация файлынан қосылу параметрлерін жүктеп алыңыз:

   ```console
   source <НАЗВАНИЕ_ПРОЕКТА>-openrc.sh
   ```

1. Қажет болса, API токенін енгізіңіз.

   API токенін сұрау мысалы:
   
   ```console
   Please enter your API token for project 5e5653f0e0024f9a9da58aa7573997be
   ```
{/ifndef}
{/includetag}

{includetag(openstack-check)}
{ifdef(public)}
1. OpenStack клиентінің бар-жоғын тексеріңіз:

   ```console
   openstack --version
   ```

   Егер OpenStack клиенті орнатылған болса, консоль шығысында оның нұсқасы көрсетіледі.

2. Команданы орындау арқылы орта айнымалыларының жобаға сәйкес келетініне көз жеткізіңіз:

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

   Орта айнымалыларында жобаға сәйкес келетін аутентификацияға арналған есептік деректер болуы керек.

3. OpenStack клиентін пайдаланатын команданы орындаңыз, мысалы:

   ```console
   openstack project list
   ```

   Консоль шығысында қолжетімді жобалар тізімі көрсетілуі керек.
{/ifdef}
{ifndef(public)}
OpenStack клиентін пайдаланатын команданы орындаңыз, мысалы:

```console
$ openstack flavor list
```

Күтілетін нәтиженің мысалы:

```console
+--------------------------------------+----------------+-------+------+-----------+-------+-----------+
| ID                                   | Name           |   RAM | Disk | Ephemeral | VCPUs | Is Public |
+--------------------------------------+----------------+-------+------+-----------+-------+-----------+
| 2e275f1f-c032-4425-b0fb-dbf8583f62d3 | Standard-12-24 | 24576 |    0 |         0 |    12 | True      |
...
+--------------------------------------+----------------+-------+------+-----------+-------+-----------+
```

Қате алсаңыз, {var(cloud)} әкімшісіне хабарласыңыз.
{/ifndef}
{/includetag}

{includetag(openstack-example)}
- Қолжетімді конфигурация шаблондарының тізімін қарау:

   ```console
   openstack flavor list
   ```

  {cut(Команданы орындау нәтижесінің мысалы)}

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

  {cut(Команданы орындау нәтижесінің мысалы (қысқартылған шығыс))}

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
  {ifdef(public)}
- {linkto(../../../start/concepts/architecture#architecture-az)[text=Қолжетімділік аймақтарының]} тізімін шығару:

  ```console
  openstack availability zone list
  ```

  {cut(Команданы орындау нәтижесінің мысалы (қысқартылған шығыс))}

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
  {/ifdef}
{/includetag}
