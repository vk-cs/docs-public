# {heading(ivkcs_ssh_keypair ресурсы)[id=ivkcs_ssh_keypair]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`ivkcs_ssh_keypair` ресурсының аргументі {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_ssh_keypair ресурсының аргументі)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті
|Әдепкі мәні
|Мән өзгергенде ресурсты қайта жасау

|
`bit_size`
|
Жабық және ашық SSH-кілттердің өлшемі.

{note:info}

ОЖ-де SSH-кілттердің ең аз өлшеміне шектеу бар-жоғын тексеріңіз.

{/note}
|integer
| ![](../../../../../../assets/no.svg "inline")
|2048
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

`ivkcs_ssh_keypair` ресурсы {linkto(#tab_attributes)[text=%number кестеде]} келтірілген атрибуттарды қайтарады.

{caption({counter(table)[id=numb_tab_attributes]} кесте — ivkcs_ssh_keypair ресурсының атрибуттары)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5", options="header"]
|===
|Атауы
|Сипаттамасы

|
`public_key`
|
`RSA` пішіміндегі ашық SSH-кілт. {linkto(../ivkcs_user_data/#ivkcs_user_data)[text=%text]} ресурсының `ssh_authorized_keys` аргументінде қолданылады

|
`private_key`
|
ВМ-мен байланыс орнатуға арналған `RSA` пішіміндегі жабық SSH-кілт
|===
{/caption}

{caption(`ivkcs_ssh_keypair` ресурсының мысалы)[align=left;position=above]}
```hcl
resource "ivkcs_ssh_keypair" "key" {
  bit_size = 3072
}
```
{/caption}