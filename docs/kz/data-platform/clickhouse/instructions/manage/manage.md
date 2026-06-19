# {heading(Сервис данасымен жұмыс)[id=clickhouse_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Дана туралы ақпаратты қарау)[id=clickhouse_view]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Дананың атауы мен сипаттамасын өңдеу)[id=clickhouse_edit]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(IP мен порттарды өзгерту)[id=clickhouse_change-ip]}

{note:warn} Тек Standalone-тағы {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Компоненттер күйін қарау)[id=clickhouse_status]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. Дана бетінде **Компоненттер күйі** қойындысына өтіңіз.

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=clickhouse_horizontal_scaling]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Диск өлшемін ұлғайту)[id=clickhouse_disk_resize]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(Тіркелгі қосу)[id=clickhouse_add_admin]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. Дана бетінде **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі қосу** түймесін басыңыз.
1. Ашылған терезеде Cloud ClickHouse данасына қол жеткізуге арналған пайдаланушы логинін орнатыңыз.
1. Рөлді таңдаңыз:

    {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Пайдаланушының құпиясөзін ойлап табыңыз немесе генерациялаңыз.

   {include(../../../_includes/_clickhouse.md)[tags=password]}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Тіркелгіні жою)[id=clickhouse_del_admin]}

{note:info}

Cloud ClickHouse жүйесінде `Стандартты пайдаланушы`, `Бақылаушы` және `Қауіпсіздік аудиторы` рөлдері тағайындалған тіркелгілерді ғана жоюға болады.

{/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

### {heading(Кеңейтімдерді қосу және өшіру)[id=clickhouse_extensions]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жүйесінің жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

{include(../../../_includes/_data_p.md)[tags=instance_extensions]}

{/tab}

{/tabs}

## {heading(Дана баптауларын қарау және өңдеу)[id=clickhouse_settings]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. {var(cloud)} жүйесінің жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінде **Баптаулар** қойындысына өтіңіз.
1. Дана баптаулары кестесінен қажетті параметрді табыңыз, қажет болса іздеу жолағын пайдаланыңыз.
1. Баптаулардың өзгеру тарихын көру үшін ![ ](../../assets/clock-icon.svg "inline") белгішесін басыңыз.
1. Қажетті баптауларды өңдеңіз:
    1. **Өңдеу** түймесін басыңыз.
    1. Кестеде қажетті параметрлердің мәндерін өзгертіңіз.
    1. Әдепкі мәнге қайту қажет болса, қажетті параметр үшін **•••** түймесін басып, **Қалпына келтіру** тармағын таңдаңыз.
    1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Қосылым қосу)[id=clickhouse_add_connect]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. Дана бетінде **Қосылымдар** қойындысына өтіңіз.
1. **Қосылым қосу** түймесін басыңыз.
1. Дереккөзді таңдаңыз:

   - `S3 VK Cloud` — сол жобадағы {var(s3)} қоймасына қосылу.
   - `S3 сыртқы` — сыртқы S3 объектілік қоймасына қосылу.
   - `Iceberg Metastore VK Cloud S3-пен` — сол {var(cloud)} жобасындағы Cloud Iceberg Metastore данасына қосылу.
   - `Iceberg Metastore сыртқы S3-пен` — сыртқы Cloud Iceberg Metastore каталогына қосылу.
   - `Сlickhouse` — Cloud ClickHouse дерекқорына қосылу.
   - `PostgreSQL` — PostgreSQL дерекқорына қосылу.
   - `MySQL` — MySQL дерекқорына қосылу.

1. Дереккөзге қосылу параметрлерін баптаңыз:

   {tabs}

   {tab(S3 VK Cloud)}

   - **Атауы**: қосылым атауын орнатыңыз. Атау кіші латын әрпінен басталып, тек бас және кіші латын әріптерінен, сандардан және `_` таңбасынан тұруы керек. Атау Cloud ClickHouse-пен жұмыс істеу кезінде пайдаланылады.
   - **Бакет**: Cloud ClickHouse данасы қосылатын {var(s3)} бакетінің атауы.

   {/tab}

   {tab(S3 сыртқы)}

   - **Атауы**: қосылым атауын орнатыңыз. Атау кіші латын әрпінен басталып, тек бас және кіші латын әріптерінен, сандардан және `_` таңбасынан тұруы керек. Атау Cloud ClickHouse-пен жұмыс істеу кезінде пайдаланылады.
   - **Аймақ**: S3 қоймаңыз орналасқан аймақ.
   - **Access Key**: қоймаға қол жеткізу кілтінің идентификаторы.
   - **Secret Key**: қоймаға қол жеткізудің құпия кілті.
   - **S3 URL**: S3 қоймаңыздың URL-мекенжайы.
   - **Бакет**: Cloud ClickHouse данасы қосылатын S3 қоймасындағы бакет атауы.

   {/tab}

   {tab(Iceberg Metastore VK Cloud S3-пен)}

   - **Атауы**: қосылым атауын орнатыңыз. Атау кіші латын әрпінен басталып, тек бас және кіші латын әріптерінен, сандардан және `_` таңбасынан тұруы керек. Атау Cloud ClickHouse-пен жұмыс істеу кезінде пайдаланылады.
   - **Бакет**: Cloud ClickHouse данасы қосылатын {var(s3)} бакетінің атауы.
   - **Бакеттегі файлдарға жол**: Cloud ClickHouse данасына қолжетімді болатын бакеттегі директория атауы.

   {/tab}

   {tab(Iceberg Metastore сыртқы S3-пен)}

   - **Атауы**: қосылым атауын орнатыңыз. Атау кіші латын әрпінен басталып, тек бас және кіші латын әріптерінен, сандардан және `_` таңбасынан тұруы керек. Атау Cloud ClickHouse-пен жұмыс істеу кезінде пайдаланылады.
   - **Аймақ**: сыртқы Cloud Iceberg Metastore каталогыңыз орналасқан аймақ.
   - **Access Key**: каталогқа қол жеткізу кезінде аутентификация үшін пайдаланылатын бірегей идентификатор.
   - **Secret Key**: каталогқа қол жеткізуге арналған жеке кілт.
   - **S3 URL**: Cloud Iceberg Metastore каталогыңыздың URL-мекенжайы.
   - **Бакет**: Cloud ClickHouse данасы қосылатын бакет атауы.
   - **Бакеттегі файлдарға жол**: Cloud ClickHouse данасына қолжетімді болатын бакеттегі директория атауы.

   {/tab}

   {tab(Сlickhouse, PostgreSQL, MySQL)}

   - **Атауы**: қосылым атауын орнатыңыз. Атау кіші латын әрпінен басталып, тек бас және кіші латын әріптерінен, сандардан және `_` таңбасынан тұруы керек. Атау Cloud ClickHouse-пен жұмыс істеу кезінде пайдаланылады.
   - **Хост атауы**: қосылуға арналған сервер мекенжайы.
   - **Пайдаланушы аты**: дерекқор пайдаланушысының тіркелгі атауы.
   - **Дерекқор атауы**: Cloud ClickHouse данасы қосылатын дерекқор атауы.
   - **Пайдаланушы құпиясөзі**: дерекқор пайдаланушысы тіркелгісінің құпиясөзі.

   {/tab}

   {/tabs}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Данаға қызмет көрсету параметрлерін өзгерту)[id=clickhouse_maintenance]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. Дана бетінде **Қызмет көрсету** қойындысына өтіңіз.

{include(../../../_includes/_clickhouse.md)[tags=maintenance]}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Дананың резервтік көшірмесін жасау)[id=clickhouse_backup]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

## {heading(Дананы резервтік көшірмеден қалпына келтіру)[id=clickhouse_restore]}

{tabs}

{tab(Жеке кабинет)}

{note:warn}

Резервтік көшірмеден қалпына келтіру данадағы барлық деректерді қайта жазады. Көшірме жасалғаннан кейін енгізілген барлық өзгерістер қайтарымсыз жоғалады.

{/note}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. Дана бетінде резервтік көшірмелер қойындысына өтіңіз.
1. Қажетті резервтік көшірме үшін **•••** түймесін басып, **Қалпына келтіру** тармағын таңдаңыз.
1. (Опционалды) Дана параметрлерінің мәндерін өзгертіңіз. Параметрлер {linkto(../create#clickhouse_create)[text=дананы жасау]} бөлімінде сипатталған.
1. **Жасау** түймесін басыңыз.

   Cloud ClickHouse сервисінің жаңа данасы жасалады.

{/tab}

{/tabs}

## {heading(Дананы жою)[id=clickhouse_delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
