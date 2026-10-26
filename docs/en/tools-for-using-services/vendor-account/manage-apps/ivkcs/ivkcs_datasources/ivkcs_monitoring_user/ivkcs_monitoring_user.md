# {heading(ivkcs_monitoring_user data source)[id=ivkcs_monitoring_user]}

{include(/en/_includes/_translated_by_ai_en.md)}

The `ivkcs_monitoring_user` data source returns the attributes listed in {linkto(#tab_attributes)[text=table %number]}. The attributes allow configuring the output plugin of the monitoring agent (Telegraf) to send metrics to Cloud Monitoring (for more information, see the section [Integration with the Cloud Monitoring of the cloud platform](../../../ib_cloud_monitoring)).

{caption(Table {counter(table)[id=numb_tab_attributes]} — Attributes of the ivkcs_monitoring_user data source)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="1,3,2", options="header"]
|===
|Name
|Description
|Value

|
`user_id`
|ID of the service user in the Keycloak of the cloud platform
|
From the provider

|
`password`
|Password of the service user in the Keycloak of the cloud platform. Contains sensitive data
|
Generated when the monitoring agent is installed

|
`project_id`
|Project identifier (OpenStack PID) of the cloud platform
|
From the provider

|
`auth_url`
|Authorization URL in the cloud platform
|
`https://infra.mail.ru:5000/v3/`

|
`namespace`
|Namespace in the Cloud Monitoring service
|
`mcs/vm`

|
`endpoint`
|URL for sending metrics to Cloud Monitoring
|
`monitoring.mcs.mail.ru:443`
|===
{/caption}

{caption(Example of the `ivkcs_monitoring_user` data source)[align=left;position=above]}
```hcl
data "ivkcs_monitoring_user" "write" {}
```
{/caption}