# {heading(Ресурс ivkcs_dns)[id=ivkcs_dns]}

Аргументы ресурса `ivkcs_dns` приведены в {linkto(#tab_arguments)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_arguments]} — Аргументы ресурса ivkcs_dns)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`name`
|
Уникальное доменное имя 5-го или последующего уровня.

<info>

Чтобы обеспечить уникальность имени, используйте идентификатор развертывания сервиса UUID как часть имени.

</info>
|string
|Да
|Да

|
`domain`
|
Домен, поддерживаемый облачной платформой.

Значение должно быть `xaas.msk.vkcs.cloud`
|string
|Да
|Да

|
`ip`
|
IP-адрес хоста
|string
|Да
|Нет
|===
{/caption}

{caption(Пример ресурса `ivkcs_dns`)[align=left;position=above]}
```hcl
resource "ivkcs_dns" "dns" {
  name = "<UUID>_testname"
  domain = "xaas.msk.vkcs.cloud"
  ip = "8.8.8.8"
}
```
{/caption}
