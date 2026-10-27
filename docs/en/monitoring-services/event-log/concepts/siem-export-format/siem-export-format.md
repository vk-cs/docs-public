# {heading(Event format for SIEM export)[id=event-log-siem-export-format]}

{include(/en/_includes/_translated_by_ai_en.md)}

When exporting to a SIEM system, each Cloud Audit event is converted into a message of the selected format: Syslog ([RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424)) or CEF (Common Event Format).

## {heading(Syslog format (RFC 5424))[id=event-log-siem-export-format-syslog]}

A Syslog message consists of a header (`PRI`, `VERSION`, `TIMESTAMP`, `HOSTNAME`, `APP-NAME`, `PROCID`, `MSGID`), structured data (`STRUCTURED-DATA`), and a message text (`MSG`).

Field mapping:

[cols="2,2", options="header"]
|===
|Syslog message part
|Cloud Audit event field

|`PRI`
|Calculated from the event severity: `(Facility=13)*8 + severity`

|`VERSION`
|Always `1`

|`TIMESTAMP`
|Event time (`timestamp`)

|`HOSTNAME`
|`cloud.vk.com`

|`APP-NAME`
|Event source identifier (`source.id`)

|`PROCID`
|Not populated

|`MSGID`
|Action (`action`)

|`STRUCTURED-DATA`
|Event parameters (see below)

|`MSG`
|Event description (`message`)

|===

The STRUCTURED-DATA block consists of several SD elements:

[cols="2,2", options="header"]
|===
|SD element
|Event parameters

|`general@60799`
|`event_id`, `request_id`, `status` (status code), `request`, `response`

|`resource@60799`
|`id` (resource identifier), `name`, `type`, as well as key-value pairs from the resource metadata

|`source@60799`
|`address` (event source address)

|`subject@60799`
|Initiator event data: `address`, `email`, `project_id`, `user_id`, `user_agent`

|`target@60799`
|Data of the action performed on behalf of another user: `project_id`, `user_id`, `username`

|`labels@60799`
|Key-value pairs from event labels

|===

Example message:

```text
<106>1 2023-07-26T11:14:44Z cloud.vk.com iam - CreateUser [general@60799 event_id="15d53226-74b1-4216-8d22-60e90b8558d8" request_id="15d53226-74b1-1234-8d22-60e90b8558d8" status="200"][resource@60799 id="15d53226-5656-4216-8d22-60e90b8558d8" name="new_user" type="user" accepted_groups="group 1,\"gro,up2\"" roles="mcs_role" target_user_id="test_target_user_id"][source@60799 address="10.10.10.45"][subject@60799 address="10.10.10.33" email="admin@mail.com" project_id="15d53226-74b1-4216-1111-60e90b8558d8" user_id="15d53226-0000-4216-8d22-60e90b8558d8"][target@60799 project_id="target_project_id" user_id="test_target_user_id" username="target@mail.com"][labels@60799 key="value"] User created
```

## {heading(CEF format)[id=event-log-siem-export-format-cef]}

A CEF message consists of a header and a block of additional parameters (Extension):

```text
CEF:Version|Device Vendor|Device Product|Device Version|Signature ID|Name|Severity|Extension
```

Header field mapping:

[cols="2,2", options="header"]
|===
|CEF header field
|Cloud Audit event field

|`Version`
|Always `0`

|`Device Vendor`
|`VK Cloud`

|`Device Product`
|Event source identifier (`source.id`)

|`Device Version`
|Always `1.0`

|`Signature ID`
|Always `0` — a Cloud Audit event

|`Name`
|Event description (`message`)

|`Severity`
|Event severity (`severity`), value from `0` to `10`

|===

Extension block parameter mapping:

[cols="2,2", options="header"]
|===
|Extension parameter
|Cloud Audit event field

|`start`
|Event time (`timestamp`, unix time)

|`act`
|Action (`action`)

|`devicePayloadId`
|Event identifier (`event_id`)

|`msg`
|Event description (`message`)

|`outcome`
|Status text (`status.message`)

|`reason`
|Status code (`status.code`)

|`requestContext`
|Request identifier (`request_id`)

|`sourceServiceName`
|Event source identifier (`source.id`)

|`dvc`
|Event source address (`source.address`)

|`reportedResourceType`
|Resource type (`resource.type`)

|`reportedResourceID`
|Resource identifier (`resource.id`)

|`reportedResourceName`
|Resource name (`resource.name`)

|`suid`
|Initiator event identifier (`subject.user_id` / `subject.third_party.user_id`)

|`src`
|Initiator event address (`subject.address`)

|`suser`
|Initiator username (`subject.third_party.username` / `subject.metadata.email`)

|`requestClientApplication`
|Initiator user-agent (`subject.user_agent`)

|`cs1` (with `cs1Label=project_id`)
|Initiator project identifier (`subject.project_id`)

|`cs2` (with `cs2Label=request`)
|Request parameters (`request`)

|`cs3` (with `cs3Label=response`)
|Response parameters (`response`)

|`duid`
|Identifier of the user on whose behalf the action was performed (`delegate.user_id` / `resource.metadata.target_user_id`)

|`duser`
|Username on whose behalf the action was performed (`delegate.username` / `delegate.metadata.email`)

|`dpriv`
|Resource roles (`resource.metadata.roles`)

|`cs4` (with `cs4Label=destination_project_id`)
|Project in which the action was performed on behalf of another user (`delegate.project_id` / `resource.metadata.target_project_id`)

|`vkcloudAuditResourceMetadata`
|Resource metadata (`resource.metadata`), JSON

|`vkcloudAuditLabels`
|Event labels (`labels`), JSON

|===

Example message:

```text
CEF:0|VK Cloud|iam|1.0|0|User created|2| start=1691136023 act=CreateUser devicePayloadId=15d53226-74b1-4216-8d22-60e90b8558d8 msg=User created outcome=OK reason=200 requestContext=15d53226-74b1-1234-8d22-60e90b8558d8 sourceServiceName=iam dvc=10.10.10.45 reportedResourceType=user reportedResourceID=15d53226-5656-4216-8d22-60e90b8558d8 reportedResourceName=new_user suid=15d53226-0000-4216-8d22-60e90b8558d8 src=10.10.10.33 suser=admin@mail.com cs1=15d53226-74b1-4216-1111-60e90b8558d8 cs1Label=project_id cs4=target_project_id cs4Label=destination_project_id duid=test_target_user_id duser=target@mail.com dpriv=mcs_role vkcloudAuditResourceMetadata={"accepted_groups":"gro\=up 1,\"gro,up2\"", "roles":"mcs_role", "target_project_id":"target_project_id", "target_user_id":"test_target_user_id"} vkcloudAuditLabels={"key":"value"}
```
