# {heading(The ivkcs_dns resource)[id=ivkcs_dns]}

{include(/en/_includes/_translated_by_ai_en.md)}

The arguments of the `ivkcs_dns` resource are given in {linkto(#tab_arguments)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments]} — Arguments of the ivkcs_dns resource)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation on value change

|
`name`
|
A unique fifth-level or higher domain name.

{note:info}

To ensure name uniqueness, use the service deployment UUID identifier as part of the name.

{/note}
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`domain`
|
A domain supported by the cloud platform.

The value must be `xaas.msk.vkcs.cloud`
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`ip`
|
The host IP address
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

{caption(Example of the `ivkcs_dns` resource)[align=left;position=above]}
```hcl
resource "ivkcs_dns" "dns" {
  name = "<UUID>_testname"
  domain = "xaas.msk.vkcs.cloud"
  ip = "8.8.8.8"
}
```
{/caption}