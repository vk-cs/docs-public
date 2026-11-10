# {heading(ivkcs_dns ресурсы)[id=ivkcs_dns]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`ivkcs_dns` ресурсының аргументтері {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_arguments]} — ivkcs_dns ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мән өзгергенде ресурсты қайта жасау

|
`name`
|
5-ші немесе одан кейінгі деңгейдің бірегей домен атауы.

{note:info}

Атаудың бірегейлігін қамтамасыз ету үшін қызметті орналастыру UUID идентификаторын атау бөлігі ретінде пайдаланыңыз.

{/note}
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`domain`
|
Бұлтты платформа қолдайтын домен.

Мән `xaas.msk.vkcs.cloud` болуы тиіс
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`ip`
|
Хосттың IP-адресі
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

{caption(`ivkcs_dns` ресурсының мысалы)[align=left;position=above]}
```hcl
resource "ivkcs_dns" "dns" {
  name = "<UUID>_testname"
  domain = "xaas.msk.vkcs.cloud"
  ip = "8.8.8.8"
}
```
{/caption}