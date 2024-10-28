# {heading(Ресурс ivkcs_s3)[id=ivkcs_s3]}

Аргумент ресурса `ivkcs_s3` приведен в {linkto(#tab_arguments)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_arguments]} — Аргументы ресурса ivkcs_s3)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
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
Уникальное имя бакета S3.

<info>

Чтобы обеспечить уникальность имени, используйте идентификатор развертывания сервиса UUID как часть имени.

</info>
|string
|Да
|Да
|===
{/caption}

Ресурс `ivkcs_s3` возвращает атрибуты, приведенные в {linkto(#tab_attributes)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_attributes]} — Атрибуты ресурса ivkcs_s3)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5,2", options="header"]
|===
|Имя
|Описание
|Формат

|
`access`
|Открытый ключ для доступа к бакету
|string

|
`secret`
|Закрытый ключ для доступа к бакету
|string
|===
{/caption}

{caption(Пример ресурса `ivkcs_s3`)[align=left;position=above]}
```hcl
resource "ivkcs_s3" "test" {
  name = "<UUID>_bucket_test"
}
```
{/caption}
