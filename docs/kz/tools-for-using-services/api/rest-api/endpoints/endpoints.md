{include(/kz/_includes/_translated_by_ai.md)}

Жеке кабинетте қолжетімді API эндпоинттерінің мекенжайларын көре аласыз. Эндпоинттердің тізімі мен мекенжайлары [аймақтар](/kz/tools-for-using-services/account/concepts/regions) арасында ерекшеленеді.

VK Cloud-пен API арқылы жұмыс істеу үшін [API арқылы қолжетімділікті белсендіріңіз](../enable-api). Сервистермен жұмыс туралы толығырақ [API спецификациясы](/kz/tools-for-using-services/api) бөлімінен оқыңыз.

## Эндпоинттер тізімін көру

Тізім барлық пайдаланушыларға, олардың [рөліне](/kz/tools-for-using-services/account/concepts/rolesandpermissions) қарамастан қолжетімді.

Өз аймағыңыз үшін эндпоинттер тізімін көру үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Бет үстіндегі пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API endpoints** қойындысына өтіңіз.

## Мәскеу аймағының эндпоинттері

### Cloud Servers

| Эндпоинт                            | Мекенжай                   | Мақсаты |
|-------------------------------------|-------------------------|-----------------|
| Nova              | https://infra.mail.ru:8774/v2.1                     | [виртуалды машиналарды](/kz/computing/iaas/instructions/vm) басқару |
| Cinder            | https://public.infra.mail.ru:8776/v3/<project_id>   | [дискілерді](/kz/computing/iaas/instructions/volumes) және олардың snapshot-тарын басқару |
| Glance            | https://infra.mail.ru:9292                          | [ВМ образдарын](/kz/computing/iaas/instructions/images) басқару |
| Karboii           | https://mcs.mail.ru/infra/karboii/v1                | Cloud Servers сервисіндегі ВМ мен дерекқор инстанстарының [сақтық көшірмелеуін](/kz/tools-for-using-services/api/api-spec/backup-api) басқару |
| Manila            | https://public.infra.mail.ru:8786/v2/<project_id>   | [файлдық қоймаларды](/kz/computing/iaas/instructions/fs-manage) басқару |

{note:info}

Жеке кабинетте Cloud Logging эндпоинті (https://mcs.mail.ru/cloudlogs/v1/logs) көрсетілмеген — ол [ВМ логтарын жинауға](/kz/tools-for-using-services/api/api-spec/logging) мүмкіндік береді.

{/note}

{cut(Қалған эндпоинттер)}

### Cloud Containers

| Эндпоинт                            | Мекенжай                   | Мақсаты |
|-------------------------------------|-------------------------|-----------------|
| Magnum            | https://infra.mail.ru:9511/v1                       | [Cloud Containers](/kz/kubernetes/k8s) контейнерлерін басқару |
| Magnum-addons     | https://mcs.mail.ru/infra/container/addons          | Cloud Containers сервисінің [аддондарын](/kz/kubernetes/k8s/instructions/addons) басқару |

### Cloud Networks

| Эндпоинт                            | Мекенжай                   | Мақсаты |
|-------------------------------------|-------------------------|-----------------|
| Neutron           | https://infra.mail.ru:9696                          | жария DNS аймақтары мен жүктеме теңгергіштерінен басқа [желілік инфрақұрылымның](/kz/networks/vnet) барлық объектілерін басқару |
| Octavia           | https://public.infra.mail.ru:9876                   | [жүктеме теңгергіштерін](/kz/networks/balancing/instructions/manage-lb) басқару |
| Publicdns         | https://mcs.mail.ru/public-dns                      | жария [DNS аймақтарын](/kz/networks/dns/instructions/publicdns) басқару |

### Cloud Databases

| Эндпоинт                            | Мекенжай                   | Мақсаты |
|-------------------------------------|-------------------------|-----------------|
| Trove             | https://kz.cloud.vk.com/infra/database/v1.0/<project_id>        | [дерекқорларды](/kz/dbs/dbaas) басқару |

### VK Object Storage

| Эндпоинт                            | Мекенжай                            | Мақсаты |
|-------------------------------------|----------------------------------| -----------------|
| VK Object Storage домені             | https://hb.ru-msk.vkcloud-storage.ru/    | [VK Object Storage](/kz/tools-for-using-services/api/api-spec/s3-rest-api) басқару |

### Cloud ML Platform

| Эндпоинт                              | Мекенжай                     | Мақсаты |
|---------------------------------------|---------------------------| -----------------|
| Mlplatform | https://kz.cloud.vk.com/infra/mlplatform   | [Cloud ML Platform](/kz/ml/mlplatform) басқару |

### AI API

| Эндпоинт                              | Мекенжай                     | Мақсаты |
|---------------------------------------|---------------------------| -----------------|
| Кескіндер мен бейнелерді тануға арналған Vision | https://smarty.mail.ru/   | [Объектілерді тану](/kz/tools-for-using-services/api/api-spec/vision-api) |

### Сервистерге байланыстырылмаған эндпоинттер

| Эндпоинт                            | Мекенжай                   | Мақсаты |
|-------------------------------------|-------------------------|-----------------|
| Audit             | https://mcs.mail.ru/auditlogs/v1/<project_id>       | Жобадағы пайдаланушылар әрекеттерінің статистикасын жинау |
| Barbican          | https://public.infra.mail.ru:9311                   | Секреттерді (SSH-кілттер, Keystone токендері, TLS сертификаттары) қорғалған түрде сақтау |
| Keystone          | https://infra.mail.ru:35357/v3/                     | Жоба пайдаланушыларын басқару, [токендер](../case-keystone-token) негізінде пайдаланушыларды авторизациялау |
| Quota-manager     | https://mcs.mail.ru/quota-manager                   | Жобаның [квоталарын](/kz/tools-for-using-services/account/concepts/quotasandlimits) көру |
| Heat              | https://infra.mail.ru:8004/v1/<project_id>          | Бұлт сервистерін оркестрациялау (эндпоинт ескірген) |

{note:info}

Жеке кабинетте Service Users эндпоинті (https://kz.cloud.vk.com/service-users/) көрсетілмеген — ол [сервистік есептік жазбаларды](/kz/tools-for-using-services/account/concepts/service-accounts) басқаруға мүмкіндік береді.

{/note}

{/cut}

## Project ID алу

Кейбір эндпоинттердің мекенжайларында `<project_id>` айнымалысы бар. Сұрау жасаған кезде осы айнымалыны ағымдағы жобаның Project ID мәнімен ауыстырыңыз.

Project ID жеке кабинеттегі [жоба идентификаторымен](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_identifikatoryn_alu) сәйкес келмейді. Бұл конфигурациялық файлдарда пайдаланылатын басқа идентификатор:

- `openrc.sh` ішінде `OS_PROJECT_ID` айнымалысының мәні ретінде. Бұл файл OpenStack CLI немесе cURL сияқты қосымша құралдармен жұмыс істеу үшін қажет.
- `vkcs_provider.tf` ішінде `project_id` параметрінің мәні ретінде. Бұл файл Terraform арқылы жұмыс істеу үшін қажет.

Жоба үшін Project ID мәнін алу үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жеке кабинет бетінің жоғарғы жағындағы тізімнен таңдап, қажетті жобаны ашыңыз.
1. Бет үстіндегі пайдаланушы атына басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API арқылы қолжетімділік** қойындысын немесе **Terraform** қойындысын ашыңыз.

    Мән екі қойындыда да тиісінше **Project ID** және **Project ID / tenant_id** тақырыптарының астында қолжетімді.

    {note:info}

    **API арқылы қолжетімділік** қойындысында **Project ID** мәні API арқылы қолжетімділік белсендірілген болса көрсетіледі.

    {/note}