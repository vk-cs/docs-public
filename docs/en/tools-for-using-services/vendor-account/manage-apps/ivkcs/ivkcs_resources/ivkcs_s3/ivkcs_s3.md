# {heading(The ivkcs_s3 resource)[id=ivkcs_s3]}

{include(/en/_includes/_translated_by_ai_en.md)}

The argument of the `ivkcs_s3` resource is given in {linkto(#tab_arguments)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments]} — Arguments of the ivkcs_s3 resource)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
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
Unique name of the {var(s3)} bucket.

{note:info}

To ensure name uniqueness, use the service deployment UUID identifier as part of the name.

{/note}
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

The `ivkcs_s3` resource returns the attributes given in {linkto(#tab_attributes)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_attributes]} — Attributes of the ivkcs_s3 resource)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5,2", options="header"]
|===
|Name
|Description
|Format

|
`access`
|Public key for bucket access
|string

|
`secret`
|Private key for bucket access
|string
|===
{/caption}

{caption(Example of the `ivkcs_s3` resource)[align=left;position=above]}
```hcl
resource "ivkcs_s3" "test" {
  name = "<UUID>_bucket_test"
}
```
{/caption}