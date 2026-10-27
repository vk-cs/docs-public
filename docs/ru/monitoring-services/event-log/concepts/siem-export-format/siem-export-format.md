# {heading(Формат событий при экспорте в SIEM)[id=event-log-siem-export-format]}

При экспорте в SIEM-систему каждое событие Cloud Audit преобразуется в сообщение выбранного формата: Syslog ([RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424)) или CEF (Common Event Format). 

## {heading(Формат Syslog (RFC 5424))[id=event-log-siem-export-format-syslog]}

Syslog-сообщение состоит из заголовка (`PRI`, `VERSION`, `TIMESTAMP`, `HOSTNAME`, `APP-NAME`, `PROCID`, `MSGID`), структурированных данных (`STRUCTURED-DATA`) и текста сообщения (`MSG`).

Сопоставление полей:

[cols="2,2", options="header"]
|===
|Часть сообщения Syslog
|Поле события Cloud Audit

|`PRI`
|Вычисляется из важности события: `(Facility=13)*8 + severity`

|`VERSION`
|Всегда `1`

|`TIMESTAMP`
|Время события (`timestamp`)

|`HOSTNAME`
|`cloud.vk.com`

|`APP-NAME`
|Идентификатор источника события (`source.id`)

|`PROCID`
|Не заполняется

|`MSGID`
|Действие (`action`)

|`STRUCTURED-DATA`
|Параметры события (см. ниже)

|`MSG`
|Описание события (`message`)

|===

Блок STRUCTURED-DATA состоит из нескольких SD-элементов:

[cols="2,2", options="header"]
|===
|SD-элемент
|Параметры события

|`general@60799`
|`event_id`, `request_id`, `status` (код статуса), `request`, `response`

|`resource@60799`
|`id` (идентификатор ресурса), `name`, `type`, а также пары «ключ-значение» из метаданных ресурса

|`source@60799`
|`address` (адрес источника события)

|`subject@60799`
|Данные инициатора события: `address`, `email`, `project_id`, `user_id`, `user_agent`

|`target@60799`
|Данные действия, выполненного от имени другого пользователя: `project_id`, `user_id`, `username`

|`labels@60799`
|Пары «ключ-значение» из меток события

|===

Пример сообщения:

```text
<106>1 2023-07-26T11:14:44Z cloud.vk.com iam - CreateUser [general@60799 event_id="15d53226-74b1-4216-8d22-60e90b8558d8" request_id="15d53226-74b1-1234-8d22-60e90b8558d8" status="200"][resource@60799 id="15d53226-5656-4216-8d22-60e90b8558d8" name="new_user" type="user" accepted_groups="group 1,\"gro,up2\"" roles="mcs_role" target_user_id="test_target_user_id"][source@60799 address="10.10.10.45"][subject@60799 address="10.10.10.33" email="admin@mail.com" project_id="15d53226-74b1-4216-1111-60e90b8558d8" user_id="15d53226-0000-4216-8d22-60e90b8558d8"][target@60799 project_id="target_project_id" user_id="test_target_user_id" username="target@mail.com"][labels@60799 key="value"] User created
```

## {heading(Формат CEF)[id=event-log-siem-export-format-cef]}

CEF-сообщение состоит из заголовка и блока дополнительных параметров (Extension):

```text
CEF:Version|Device Vendor|Device Product|Device Version|Signature ID|Name|Severity|Extension
```

Сопоставление полей заголовка:

[cols="2,2", options="header"]
|===
|Поле заголовка CEF
|Поле события Cloud Audit

|`Version`
|Всегда `0`

|`Device Vendor`
|`VK Cloud`

|`Device Product`
|Идентификатор источника события (`source.id`)

|`Device Version`
|Всегда `1.0`

|`Signature ID`
|Всегда `0` — событие Cloud Audit

|`Name`
|Описание события (`message`)

|`Severity`
|Важность события (`severity`), значение от `0` до `10`

|===

Сопоставление параметров блока Extension:

[cols="2,2", options="header"]
|===
|Параметр Extension
|Поле события Cloud Audit

|`start`
|Время события (`timestamp`, unix time)

|`act`
|Действие (`action`)

|`devicePayloadId`
|Идентификатор события (`event_id`)

|`msg`
|Описание события (`message`)

|`outcome`
|Текст статуса (`status.message`)

|`reason`
|Код статуса (`status.code`)

|`requestContext`
|Идентификатор запроса (`request_id`)

|`sourceServiceName`
|Идентификатор источника события (`source.id`)

|`dvc`
|Адрес источника события (`source.address`)

|`reportedResourceType`
|Тип ресурса (`resource.type`)

|`reportedResourceID`
|Идентификатор ресурса (`resource.id`)

|`reportedResourceName`
|Имя ресурса (`resource.name`)

|`suid`
|Идентификатор инициатора события (`subject.user_id` / `subject.third_party.user_id`)

|`src`
|Адрес инициатора события (`subject.address`)

|`suser`
|Имя пользователя инициатора (`subject.third_party.username` / `subject.metadata.email`)

|`requestClientApplication`
|User-agent инициатора события (`subject.user_agent`)

|`cs1` (с `cs1Label=project_id`)
|Идентификатор проекта инициатора (`subject.project_id`)

|`cs2` (с `cs2Label=request`)
|Параметры запроса (`request`)

|`cs3` (с `cs3Label=response`)
|Параметры ответа (`response`)

|`duid`
|Идентификатор пользователя, от имени которого выполнено действие (`delegate.user_id` / `resource.metadata.target_user_id`)

|`duser`
|Имя пользователя, от имени которого выполнено действие (`delegate.username` / `delegate.metadata.email`)

|`dpriv`
|Роли ресурса (`resource.metadata.roles`)

|`cs4` (с `cs4Label=destination_project_id`)
|Проект, в котором выполнено действие от имени другого пользователя (`delegate.project_id` / `resource.metadata.target_project_id`)

|`vkcloudAuditResourceMetadata`
|Метаданные ресурса (`resource.metadata`), JSON

|`vkcloudAuditLabels`
|Метки события (`labels`), JSON

|===

Пример сообщения:

```text
CEF:0|VK Cloud|iam|1.0|0|User created|2| start=1691136023 act=CreateUser devicePayloadId=15d53226-74b1-4216-8d22-60e90b8558d8 msg=User created outcome=OK reason=200 requestContext=15d53226-74b1-1234-8d22-60e90b8558d8 sourceServiceName=iam dvc=10.10.10.45 reportedResourceType=user reportedResourceID=15d53226-5656-4216-8d22-60e90b8558d8 reportedResourceName=new_user suid=15d53226-0000-4216-8d22-60e90b8558d8 src=10.10.10.33 suser=admin@mail.com cs1=15d53226-74b1-4216-1111-60e90b8558d8 cs1Label=project_id cs4=target_project_id cs4Label=destination_project_id duid=test_target_user_id duser=target@mail.com dpriv=mcs_role vkcloudAuditResourceMetadata={"accepted_groups":"gro\=up 1,\"gro,up2\"", "roles":"mcs_role", "target_project_id":"target_project_id", "target_user_id":"test_target_user_id"} vkcloudAuditLabels={"key":"value"}
```
