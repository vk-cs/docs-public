# {heading(The ivkcs_ssh_keypair resource)[id=ivkcs_ssh_keypair]}

{include(/en/_includes/_translated_by_ai_en.md)}

The argument of the `ivkcs_ssh_keypair` resource is given in {linkto(#tab_arguments)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments]} — The ivkcs_ssh_keypair resource argument)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Default value
|Resource recreation when the value is changed

|
`bit_size`
|
The size of the private and public SSH keys.

{note:info}

Check whether the OS has a restriction on the minimum SSH key size.

{/note}
|integer
| ![](../../../../../../assets/no.svg "inline")
|2048
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

The `ivkcs_ssh_keypair` resource returns the attributes given in {linkto(#tab_attributes)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_attributes]} — The ivkcs_ssh_keypair resource attributes)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5", options="header"]
|===
|Name
|Description

|
`public_key`
|
The public SSH key in the `RSA` format. Used in the `ssh_authorized_keys` argument of the {linkto(../ivkcs_user_data/#ivkcs_user_data)[text=%text]} resource

|
`private_key`
|
The private SSH key in the `RSA` format used to establish connections to VMs
|===
{/caption}

{caption(Example of the `ivkcs_ssh_keypair` resource)[align=left;position=above]}
```hcl
resource "ivkcs_ssh_keypair" "key" {
  bit_size = 3072
}
```
{/caption}