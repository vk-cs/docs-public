# {heading(Broker registration)[id=saas_upload_registration]}

{include(/en/_includes/_translated_by_ai_en.md)}

To register a broker, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). In the email, provide:

* Company information:

   * Company name.
   * Contact person.
   * Phone number.

* The email of the user who will receive notifications about errors when creating service instances.
* The broker parameters listed in {linkto(#tab_registration)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_registration]} — Broker parameters for registration in the marketplace)[align=right;position=above;id=tab_registration;number={const(numb_tab_registration)}]}
[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|name
|
Broker name
|string
| ![](../../../../../../assets/check.svg "inline")

|url
|
The URL to which requests from the marketplace will be sent
|string
| ![](../../../../../../assets/check.svg "inline")

|description
|
Broker description
|string
| ![](../../../../../../assets/no.svg "inline")

|osb_version
|
VK OSB protocol version
|string
| ![](../../../../../../assets/check.svg "inline")

|username
|
The marketplace name for inter-service communication with the broker.

Must match the value of the environment variable in the `.env` file
|string
| ![](../../../../../../assets/no.svg "inline")

|password
|
The marketplace password for inter-service communication with the broker.

Must match the value of the environment variable in the `.env` file
|string
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

After the broker is registered, the SaaS application will be available in the test namespace of the marketplace. In the public namespace of the marketplace, the service will be available only after publication (for more details, see the section {linkto(../saas_upload_publish#saas_upload_publish)[text=%text]}).