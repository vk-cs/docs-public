# {heading(Ресурс ivkcs_s3)[id=ivkcs_s3]}

{include(/kz/_includes/_translated_by_ai.md)}

`ivkcs_s3` ресурсының аргументі {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_s3 ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
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
{var(s3)} бакетінің бірегей атауы.

{note:info}

Атау бірегей болуын қамтамасыз ету үшін сервис орналастыруының UUID идентификаторын атаудың бір бөлігі ретінде пайдаланыңыз.

{/note}
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

`ivkcs_s3` ресурсы {linkto(#tab_attributes)[text=%number кестеде]} келтірілген атрибуттарды қайтарады.

{caption({counter(table)[id=numb_tab_attributes]} кесте — ivkcs_s3 ресурсының атрибуттары)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі

|
`access`
|Бакетке қол жеткізуге арналған ашық кілт
|string

|
`secret`
|Бакетке қол жеткізуге арналған жабық кілт
|string
|===
{/caption}

{caption(`ivkcs_s3` ресурсының мысалы)[align=left;position=above]}
```hcl
resource "ivkcs_s3" "test" {
  name = "<UUID>_bucket_test"
}
```
{/caption}
