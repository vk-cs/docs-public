# {heading(Ресурс ivkcs_dns)[id=ivkcs_dns]}

{include(/kz/_includes/_translated_by_ai.md)}

`ivkcs_dns` ресурсының аргументтері {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_dns ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті
|Мән өзгерген кезде ресурсты қайта жасау

|
`name`
|
5-деңгейдегі немесе одан кейінгі деңгейдегі бірегей домен атауы.

{note:info}

Атау бірегей болуын қамтамасыз ету үшін сервис орналастыруының UUID идентификаторын атаудың бір бөлігі ретінде пайдаланыңыз.

{/note}
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`domain`
|
Бұлтты платформа қолдайтын домен.

Мәні `xaas.msk.vkcs.cloud` болуы керек
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|
`ip`
|
Хосттың IP мекенжайы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
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
