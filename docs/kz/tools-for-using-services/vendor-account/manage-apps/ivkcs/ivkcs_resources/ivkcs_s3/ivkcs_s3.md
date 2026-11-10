# {heading(ivkcs_s3 ресурсы)[id=ivkcs_s3]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`ivkcs_s3` ресурсының аргументі {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_s3 ресурсының аргументтері)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Аты
|Сипаттамасы
|Форматы
|Міндетті
|Мән өзгергенде ресурсты қайта жасау

|
`name`
|
{var(s3)} бакетінің бірегей атауы.

{note:info}

Атаудың бірегейлігін қамтамасыз ету үшін қызметтің UUID орналастыру идентификаторын атау бөлігі ретінде пайдаланыңыз.

{/note}
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

`ivkcs_s3` ресурсы {linkto(#tab_attributes)[text=%number кестеде]} келтірілген атрибуттарды қайтарады.

{caption({counter(table)[id=numb_tab_attributes]} кесте — ivkcs_s3 ресурсының атрибуттары)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5,2", options="header"]
|===
|Аты
|Сипаттамасы
|Форматы

|
`access`
|Бакетке кіруге арналған ашық кілт
|string

|
`secret`
|Бакетке кіруге арналған жабық кілт
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