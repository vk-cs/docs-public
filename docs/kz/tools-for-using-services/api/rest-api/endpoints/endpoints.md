# {heading(API эндпоинттері)[id=rest-api-endpoints]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Жеке кабинетте API-ның қолжетімді эндпоинттерінің мекенжайларын көре аласыз.{ifdef(public)} Эндпоинттердің тізімі мен мекенжайлары {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірлер]} бойынша ерекшеленеді.

{var(cloud)} қызметімен API арқылы жұмыс істеу үшін {linkto(../enable-api#rest-api-enable)[text=API бойынша қолжетімділікті белсендіріңіз]}. Қызметтермен жұмыс істеу туралы толығырақ {linkto(../../api-spec#tools-api-spec)[text=%text]} бөлімінде оқыңыз.{/ifdef}

## {heading(Эндпоинттер тізімін көру)[id=rest-api-endpoints-list]}

{ifdef(public)}
Тізім пайдаланушылардың {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=рөліне]} қарамастан барлық пайдаланушыларға қолжетімді.
{/ifdef}

Эндпоинттер тізімін көру үшін{ifdef(public)} сіздің өңіріңіз үшін{/ifdef}:

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API endpoints** қойындысына өтіңіз.

{/tab}

{ifndef(public)}
{tab(OpenStack CLI)}

1. {linkto(../../../cli/openstack-cli#tools-cli-openstack)[text=Орнатыңыз]} OpenStack клиентін және жобада аутентификациядан өтіңіз.
1. Команданы орындаңыз:

   ```console
   openstack catalog list
   ```
{/tab}
{/ifndef}

{/tabs}

{ifdef(public)}

## {heading(Москва өңірінің эндпоинттері)[id=rest-api-endpoints-msk]}

### {heading(Cloud Servers)[id=rest-api-endpoints-iaas]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Nova
|https://infra.mail.ru:8774/v2.1
|{linkto(../../../../computing/iaas/instructions/vm#iaas-vm)[text=ВМ]} басқару

|Cinder
|https://public.infra.mail.ru:8776/v3/<project_id>
|{linkto(../../../../computing/iaas/instructions/volumes#iaas-volumes)[text=Дисктер]} және олардың снапшоттарын басқару

|Glance
|https://infra.mail.ru:9292
|{linkto(../../../../computing/iaas/instructions/images#iaas-images)[text=ВМ образдарын]} басқару

|Karboii
|https://mcs.mail.ru/infra/karboii/v1
 ВМ және дерекқор инстанстарының {linkto(../../api-spec/backup-api#api-spec-karboii)[text=резервтік көшірмелерін]} басқару

|Manila
|https://public.infra.mail.ru:8786/v2/<project_id>
|{linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=Файлдық сақтау құрылғыларын]} басқару

|===

{note:info}
Жеке кабинетте Cloud Logging эндпоинті (https://mcs.mail.ru/cloudlogs/v1/logs) көрсетілмеген — ол {linkto(../../api-spec/logging#api-spec-logging)[text=ВМ логтарын жинауға]} мүмкіндік береді.
{/note}

{cut(Қалған эндпоинттер)}

### {heading(Managed Containers)[id=rest-api-endpoints-k8s]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Magnum
|https://infra.mail.ru:9511/v1
|{linkto(../../../../kubernetes#kubernetes)[text=Managed Containers]} контейнерлерін басқару

|Magnum-addons
|https://mcs.mail.ru/infra/container/addons
|Managed Containers қызметінің {linkto(../../../../kubernetes/k8s/instructions/addons#k8s-addons)[text=аддондарын]} басқару

|===

### {heading(Cloud Networks)[id=rest-api-endpoints-network]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Neutron
|https://infra.mail.ru:9696
|Жалпыға қолжетімді DNS-зоналар мен жүктеме теңгерушілерін қоспағанда, [text=желілік инфрақұрылымы]}{linkto(../../../../networks/vnet#vnet) объектілерінің барлығын басқару

|Octavia
|https://public.infra.mail.ru:9876
|{linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb)[text=Жүктеме теңгерушілерін]} басқару

|Publicdns
|https://mcs.mail.ru/public-dns
|Жалпыға қолжетімді {linkto(../../../../networks/dns/instructions/publicdns#dns-publicdns)[text=DNS-зоналарды]} басқару

|===

### {heading(Cloud Databases)[id=rest-api-endpoints-dbaas]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Trove
|https://msk.cloud.vk.ru/infra/database/v1.0/<project_id>
|{linkto(../../../../dbs/dbaas#dbaas-dbaas)[text=Дерекқорларды]} басқару

|===

### {heading({var(s3)})[id=rest-api-endpoints-s3]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|{var(s3)} домені
|https://hb.ru-msk.vkcloud-storage.ru/
|{linkto(../../api-spec/s3-rest-api#api-spec-s3)[text={var(s3)}]} басқару

|===

### {heading(Cloud ML Platform)[id=rest-api-endpoints-ml]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Mlplatform
|https://msk.cloud.vk.ru/infra/mlplatform
|{linkto(../../../../ml/mlplatform#mlplatform)[text=Cloud ML Platform]} басқару

|===

### {heading(AI API)[id=rest-api-endpoints-ai]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Суреттер мен видеоларды тануға арналған Vision
|https://smarty.mail.ru/
|{linkto(../../api-spec/vision-api#api-spec-vision)[text=Объекттерді тану]}

|===

### {heading(Қызметтермен байланыстырылмаған эндпоинттер)[id=rest-api-endpoints-other]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Мекенжай
|Мақсаты

|Audit
|https://mcs.mail.ru/auditlogs/v1/<project_id>
|Жобадағы пайдаланушылар әрекеттерінің статистикасын жинау

|Barbican
|https://public.infra.mail.ru:9311
|Құпиясөздерді (SSH-кілттерін, Keystone токендерін, TLS сертификаттарын) қорғалған түрде сақтау

|Keystone
|https://infra.mail.ru/infra/identity/v3/
|Жоба пайдаланушыларын басқару, {linkto(../case-keystone-token#rest-api-keystone-token)[text=токендер]} негізінде пайдаланушыларды авторизациялау

|Quota-manager
|https://mcs.mail.ru/quota-manager
|Жобаның {linkto(../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоттарын]} көру

|Heat
|https://infra.mail.ru:8004/v1/<project_id>
|Бұлттық қызметтердің оркестрациясы (эндпоинт ескірген)

|===

{note:info}
Жеке кабинетте Service Users эндпоинті (https://msk.cloud.vk.ru/service-users/) көрсетілмеген — ол {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік тіркелгілерді]} басқаруға мүмкіндік береді.
{/note}

{/cut}
{/ifdef}

## {heading(Project ID алу)[id=rest-api-endpoints-get-project-id]}

Кейбір эндпоинттердің мекенжайларында `<project_id>` айнымалысы бар. Сұраныс жасағанда бұл айнымалыны ағымдағы жобаның Project ID мәніне ауыстырыңыз.

Project ID жеке кабинеттегі {linkto(../../../account/instructions/project-settings/manage#project-pid-view)[text=жоба идентификаторына]} сәйкес келмейді. Бұл конфигурациялық файлдарда қолданылатын тағы бір идентификатор:

- `openrc.sh` файлында `OS_PROJECT_ID` айнымалысының мәні ретінде. Бұл файл OpenStack CLI немесе cURL сияқты қосымша құралдар арқылы жұмыс істеу үшін қажет.
- `vkcs_provider.tf` файлында `project_id` параметрінің мәні ретінде. Бұл файл Terraform арқылы жұмыс істеу үшін қажет.

Жоба үшін Project ID мәнін алу үшін:

1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетіне.
1. Қажетті жобаны жеке кабинет бетінің жоғарғы жағындағы тізімнен таңдап ашыңыз.
1. Беттің жоғарғы жағындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API бойынша қолжетімділік** қойындысын немесе **Terraform** қойындысын ашыңыз.

   Мән екі қойындыда да қолжетімді, тиісінше **Project ID** және **Project ID / tenant_id** тақырыптарының астында.
   {ifdef(public)}

   {note:info}
   **API бойынша қолжетімділік** қойындысында **Project ID** мәні API бойынша қолжетімділік белсендірілген жағдайда көрсетіледі.
   {/note}

   {/ifdef}