# {heading(SIEM-ге экспорттау кезіндегі оқиғалар форматы)[id=event-log-siem-export-format]}

{include(/kz/_includes/_translated_by_ai.md)}

SIEM жүйесіне экспорттау кезінде әрбір Cloud Audit оқиғасы таңдалған форматтағы хабарламаға түрлендіріледі: Syslog ([RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424)) немесе CEF (Common Event Format).

## {heading(Syslog форматы (RFC 5424))[id=event-log-siem-export-format-syslog]}

Syslog хабарламасы тақырыптан (`PRI`, `VERSION`, `TIMESTAMP`, `HOSTNAME`, `APP-NAME`, `PROCID`, `MSGID`), құрылымдық деректерден (`STRUCTURED-DATA`) және хабарлама мәтіннен (`MSG`) тұрады.

Өрістерді сәйкестендіру:

[cols="2,2", options="header"]
|===
|Syslog хабарламасының бөлігі
|Cloud Audit оқиғасының өрісі

|`PRI`
|Оқиғаның маңыздылығынан есептеледі: `(Facility=13)*8 + severity`

|`VERSION`
|Әрқашан `1`

|`TIMESTAMP`
|Оқиға уақыты (`timestamp`)

|`HOSTNAME`
|`cloud.vk.com`

|`APP-NAME`
|Оқиға көзінің идентификаторы (`source.id`)

|`PROCID`
|Толтырылмайды

|`MSGID`
|Әрекет (`action`)

|`STRUCTURED-DATA`
|Оқиға параметрлері (төменде қараңыз)

|`MSG`
|Оқиғаның сипаттамасы (`message`)

|===

STRUCTURED-DATA блогы бірнеше SD-элементтерден тұрады:

[cols="2,2", options="header"]
|===
|SD-элемент
|Оқиға параметрлері

|`general@60799`
|`event_id`, `request_id`, `status` (статус коды), `request`, `response`

|`resource@60799`
|`id` (ресурс идентификаторы), `name`, `type`, сондай-ақ ресурс метадеректерінен «кілт-мән» жұптары

|`source@60799`
|`address` (оқиға көзінің мекенжайы)

|`subject@60799`
|Оқиғаны бастаушының деректері: `address`, `email`, `project_id`, `user_id`, `user_agent`

|`target@60799`
|Басқа пайдаланушы атынан орындалған әрекеттің деректері: `project_id`, `user_id`, `username`

|`labels@60799`
|Оқиға белгілерінен «кілт-мән» жұптары

|===

Хабарлама мысалы:

```text
<106>1 2023-07-26T11:14:44Z cloud.vk.com iam - CreateUser [general@60799 event_id="15d53226-74b1-4216-8d22-60e90b8558d8" request_id="15d53226-74b1-1234-8d22-60e90b8558d8" status="200"][resource@60799 id="15d53226-5656-4216-8d22-60e90b8558d8" name="new_user" type="user" accepted_groups="group 1,\"gro,up2\"" roles="mcs_role" target_user_id="test_target_user_id"][source@60799 address="10.10.10.45"][subject@60799 address="10.10.10.33" email="admin@mail.com" project_id="15d53226-74b1-4216-1111-60e90b8558d8" user_id="15d53226-0000-4216-8d22-60e90b8558d8"][target@60799 project_id="target_project_id" user_id="test_target_user_id" username="target@mail.com"][labels@60799 key="value"] User created
```

## {heading(CEF форматы)[id=event-log-siem-export-format-cef]}

CEF хабарламасы тақырыптан және қосымша параметрлер блогынан (Extension) тұрады:

```text
CEF:Version|Device Vendor|Device Product|Device Version|Signature ID|Name|Severity|Extension
```

Тақырып өрістерін сәйкестендіру:

[cols="2,2", options="header"]
|===
|CEF тақырып өрісі
|Cloud Audit оқиғасының өрісі

|`Version`
|Әрқашан `0`

|`Device Vendor`
|`VK Cloud`

|`Device Product`
|Оқиға көзінің идентификаторы (`source.id`)

|`Device Version`
|Әрқашан `1.0`

|`Signature ID`
|Әрқашан `0` — Cloud Audit оқиғасы

|`Name`
|Оқиғаның сипаттамасы (`message`)

|`Severity`
|Оқиғаның маңыздылығы (`severity`), `0`-ден `10`-ға дейінгі мән

|===

Extension блогының параметрлерін сәйкестендіру:

[cols="2,2", options="header"]
|===
|Extension параметрі
|Cloud Audit оқиғасының өрісі

|`start`
|Оқиға уақыты (`timestamp`, unix time)

|`act`
|Әрекет (`action`)

|`devicePayloadId`
|Оқиға идентификаторы (`event_id`)

|`msg`
|Оқиғаның сипаттамасы (`message`)

|`outcome`
|Статус мәтіні (`status.message`)

|`reason`
|Статус коды (`status.code`)

|`requestContext`
|Сұрау идентификаторы (`request_id`)

|`sourceServiceName`
|Оқиға көзінің идентификаторы (`source.id`)

|`dvc`
|Оқиға көзінің мекенжайы (`source.address`)

|`reportedResourceType`
|Ресурс түрі (`resource.type`)

|`reportedResourceID`
|Ресурс идентификаторы (`resource.id`)

|`reportedResourceName`
|Ресурс атауы (`resource.name`)

|`suid`
|Оқиғаны бастаушының идентификаторы (`subject.user_id` / `subject.third_party.user_id`)

|`src`
|Оқиғаны бастаушының мекенжайы (`subject.address`)

|`suser`
|Оқиғаны бастаушының пайдаланушы аты (`subject.third_party.username` / `subject.metadata.email`)

|`requestClientApplication`
|Оқиғаны бастаушының user-agent (`subject.user_agent`)

|`cs1` (`cs1Label=project_id`мен)
|Оқиғаны бастаушы жобасының идентификаторы (`subject.project_id`)

|`cs2` (`cs2Label=request`мен)
|Сұрау параметрлері (`request`)

|`cs3` (`cs3Label=response`мен)
|Жауап параметрлері (`response`)

|`duid`
|Атынан әрекет орындалған пайдаланушының идентификаторы (`delegate.user_id` / `resource.metadata.target_user_id`)

|`duser`
|Атынан әрекет орындалған пайдаланушының аты (`delegate.username` / `delegate.metadata.email`)

|`dpriv`
|Ресурс рөлдері (`resource.metadata.roles`)

|`cs4` (`cs4Label=destination_project_id`мен)
|Басқа пайдаланушы атынан орындалған әрекет жобасы (`delegate.project_id` / `resource.metadata.target_project_id`)

|`vkcloudAuditResourceMetadata`
|Ресурс метадеректері (`resource.metadata`), JSON

|`vkcloudAuditLabels`
|Оқиға белгілері (`labels`), JSON

|===

Хабарлама мысалы:

```text
CEF:0|VK Cloud|iam|1.0|0|User created|2| start=1691136023 act=CreateUser devicePayloadId=15d53226-74b1-4216-8d22-60e90b8558d8 msg=User created outcome=OK reason=200 requestContext=15d53226-74b1-1234-8d22-60e90b8558d8 sourceServiceName=iam dvc=10.10.10.45 reportedResourceType=user reportedResourceID=15d53226-5656-4216-8d22-60e90b8558d8 reportedResourceName=new_user suid=15d53226-0000-4216-8d22-60e90b8558d8 src=10.10.10.33 suser=admin@mail.com cs1=15d53226-74b1-4216-1111-60e90b8558d8 cs1Label=project_id cs4=target_project_id cs4Label=destination_project_id duid=test_target_user_id duser=target@mail.com dpriv=mcs_role vkcloudAuditResourceMetadata={"accepted_groups":"gro\=up 1,\"gro,up2\"", "roles":"mcs_role", "target_project_id":"target_project_id", "target_user_id":"test_target_user_id"} vkcloudAuditLabels={"key":"value"}
```
