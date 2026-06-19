# {heading(Manila компонентінің оқиғалары)[id=event-log-manila]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Audit-ке {linkto(../../../../../computing/iaas/concepts/data-storage/file-share#iaas-file-share)[text=файлдық қоймалар сервисі]} жіберетін оқиғалар:

[cols="1,4", options="header"]
|===
|Әдіс
|Эндпоинт және онда жасалатын оқиғалар, соның ішінде сәтсіз әрекет талпыныстары

2+^|[Файлдық қоймаларды жасау, жою және параметрлерін өзгерту](https://docs.openstack.org/api-ref/shared-file-system/index.html#create-share)

|POST
|`/v2/shares/`

{linkto(../../../../../computing/iaas/instructions/fs-manage/fs-create#iaas-fs-create)[text=Жасалған]} файлдық қойма

|POST
|`/v2/shares/manage`

Файлдық қоймалар сервисінен тыс жасалған файлдық қойма осы сервистің басқаруына берілді

|PUT
|`/v2/shares/{share_id}`

Файлдық қойманың параметрлері өзгертілді

|DELETE
|`/v2/shares/{share_id}`

{linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-delete)[text=Жойылған]} файлдық қойма

2+^|[Файлдық қоймалардың метадеректерімен операциялар](https://docs.openstack.org/api-ref/shared-file-system/index.html#delete-share-metadata-item)

|POST
|`/v2/shares/{share_id}/metadata`

* Кілт/мән жұптары түріндегі жаңа метадеректер қосылды.
* Қолданыстағы метадеректердің мәндері өзгертілді

|PUT
|`/v2/shares/{share_id}/metadata`

Файлдық қойманың барлық метадеректері жаңаларымен алмастырылды

|DELETE
|`/v2/shares/{share_id}/metadata/{key}`

Берілген кілті бар метадерек элементі жойылды

2+^|[Файлдық қоймалармен қосымша операциялар](https://docs.openstack.org/api-ref/shared-file-system/index.html#grant-access)

|POST
|`/v2/shares/{share_id}/action`

* {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-access-rules#iaas-fs-access-rules-adding)[text=Берілген]} файлдық қоймаға қолжетімділік.
* {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-access-rules#iaas-fs-access-rules-deleting)[text=Қайтарып алынған]} файлдық қоймаға қолжетімділік.
* {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-size)[text=Өлшемі өзгертілген]} файлдық қойма

2+^|[Файлдық қойма снапшоттарымен операциялар](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-snapshots)

|POST
|`/v2/snapshots`

{linkto(../../../../../computing/iaas/instructions/fs-manage/fs-snapshots#iaas-fs-snapshots-creating)[text=Жасалған]} файлдық қойма снапшоты

|POST
|`/v2/snapshots/manage`

Файлдық қоймалар сервисінен тыс жасалған файлдық қойманың снапшоты осы сервистің басқаруына берілді

|POST
|`/v2/snapshots/{snapshot_id}/action`

Файлдық қоймалар сервисінен тыс жасалған файлдық қойма снапшотын басқару тоқтатылды

|PUT
|`/v2/snapshots/{snapshot_id}`

Файлдық қойма снапшотының параметрлері өзгертілді

|DELETE
|`/v2/snapshots/{snapshot_id}`

{linkto(../../../../../computing/iaas/instructions/fs-manage/fs-snapshots#iaas-fs-snapshots-deleting)[text=Жойылған]} файлдық қойма снапшоты

2+^|[Файлдық қойма снапшоттарының метадеректерімен операциялар](https://docs.openstack.org/api-ref/shared-file-system/index.html#snapshot-metadata-since-api-v2-73)

|POST
|`/v2/snapshots/{snapshot_id}/metadata`

* Кілт/мән жұптары түріндегі жаңа метадеректер қосылды
* Қолданыстағы метадеректердің мәндері өзгертілді

|PUT
|`/v2/snapshots/{snapshot_id}/metadata`

Файлдық қойма снапшотының барлық метадеректері жаңаларымен алмастырылды

|DELETE
|`/v2/snapshots/{snapshot_id}/metadata/{key}`

Берілген кілті бар метадерек элементі жойылды

2+^|[Файлдық қойма желілерін басқару](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-networks)

|POST
|`/v2/share-networks`

{linkto(../../../../../computing/iaas/instructions/fs-manage/fs-create#iaas-fs-create)[text=Жасалған]} файлдық қойма желісі

|POST
|`/v2/share-networks/{share_network_id}/action`

Файлдық қойма желісі үшін қауіпсіздік қызметімен әрекеттер:

* қызмет қосылды, жойылды немесе ауыстырылды;
* қызметті қосу немесе ауыстыру мүмкіндігі тексерілді.

|PUT
|`/v2/share-networks/{share_network_id}`

Файлдық қойма желісінің параметрлері өзгертілді

|DELETE
|`/v2/share-networks/{share_network_id}`

{linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-delete)[text=Жойылған]} файлдық қойма желісі

2+^|[Файлдық қойма желілеріндегі ішкі желілерді басқару](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-network-subnets-since-api-v2-51)

|POST
|`/v2/share-networks/{share_network_id}/subnets`

Берілген файлдық қойма желісінде ішкі желі жасалды

|DELETE
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}`

Берілген файлдық қойма желісінен ішкі желі жойылды

2+^|[Файлдық қойма желілерінің метадеректерін басқару](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-network-subnets-metadata-since-api-v2-78)

|POST
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata`

* Кілт/мән жұптары түріндегі жаңа метадеректер қосылды.
* Қолданыстағы метадеректердің мәндері өзгертілді

|PUT
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata`

Берілген ішкі желінің барлық метадеректері жаңаларымен алмастырылды

|DELETE
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata/{key}`

Берілген кілті бар метадерек элементі жойылды

2+^|[Файлдық қойма түрлерімен операциялар](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-types)

|POST
|`/v2/types`

Файлдық қоймалардың жаңа түрі жасалды

|POST
|`/v2/types/{share_type_id}/extra_specs`

Берілген файлдық қойма түріне қосымша спецификация тағайындалды 

|DELETE
|`/v2/types/{share_type_id}/extra_specs/{extra-spec-key}`

Файлдық қойма түрі үшін қосымша спецификацияны тағайындау тоқтатылды

|POST
|`/v2/types/{share_type_id}/action`

* Файлдық қойма түріне қолжетімділік берілді.
* Файлдық қойма түріне қолжетімділік қайтарып алынды

|DELETE
|`/v2/types/{share_type_id}`

Файлдық қоймалар түрі жойылды

|PUT
|`/v2/types/{share_type_id}`

Файлдық қойма түрінің параметрлері өзгертілді

2+^|[Квоталарды басқару](https://docs.openstack.org/api-ref/shared-file-system/index.html#quota-sets)

|PUT
|`/v2/quota-sets/{project_id_quota_request_path}?user_id={user_id}`

Жоба немесе жоба ішіндегі пайдаланушы үшін квоталар өзгертілді

|DELETE
|`/v2/quota-sets/{project_id_quota_request_path}?user_id={user_id}`

Жоба немесе жоба ішіндегі пайдаланушы үшін квоталардың өзгерісі тоқтатылды, яғни квоталар әдепкі мәндерге қайтарылды

2+^|[Қолжетімділік ережелері үшін метадеректермен операциялар](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-access-rule-metadata-since-api-v2-45)

|PUT
|`/v2/share-access-rules/{access_id}/metadata`

Файлдық қоймаға қолжетімділік ережесінің метадеректері өзгертілді

|DELETE
|`/v2/share-access-rules/{access_id}/metadata/{key}`

* Файлдық қоймаға қолжетімділік ережесі үшін метадеректерді баптау тоқтатылды.
* Берілген кілті бар метадерек элементінің мәні жойылды

2+^|[Файлдық қойманың резервтік көшірмесін басқару](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-backups-since-api-v2-80)

|POST
|`/v2/share-backups`

Файлдық қойманың резервтік көшірмесі жасалды

|PUT
|`/v2/share-backups/{backup_id}`

Файлдық қойманың резервтік көшірмесінің параметрлері өзгертілді

|DELETE
|`/v2/share-backups/{backup_id}`

Файлдық қойманың резервтік көшірмесі жойылды

|POST
|`/v2/share-backups/{backup_id}/action`

* Файлдық қойма резервтік көшірмеден қалпына келтірілді.
* Әкімші резервтік көшірменің күйін өзгертті
|===
