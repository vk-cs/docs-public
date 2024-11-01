# {heading(Ресурс ivkcs_ssh_keypair)[id=ivkcs_ssh_keypair]}

Аргумент ресурса `ivkcs_ssh_keypair` приведен в {linkto(#tab_arguments)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_arguments]} — Аргумент ресурса ivkcs_ssh_keypair)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Значение по умолчанию
|Пересоздание ресурса при изменении значения

|
`bit_size`
|
Размер закрытого и открытого SSH-ключей.

<info>

Проверьте, есть ли в ОС ограничение на минимальный размер SSH-ключей.

</info>
|integer
| ![](/en/assets/no.svg "inline")
|2048
| ![](/ru/assets/check.svg "inline")
|===
{/caption}

Ресурс `ivkcs_ssh_keypair` возвращает атрибуты, приведенные в {linkto(#tab_attributes)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_attributes]} — Атрибуты ресурса ivkcs_ssh_keypair)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="2,5", options="header"]
|===
|Имя
|Описание

|
`public_key`
|
Открытый SSH-ключ в формате `RSA`. Используется в аргументе `ssh_authorized_keys` ресурса {linkto(../ivkcs_user_data/#ivkcs_user_data)[text=%text]}

|
`private_key`
|
Закрытый SSH-ключ в формате `RSA`, чтобы устанавливать соединение с ВМ
|===
{/caption}

{caption(Пример ресурса `ivkcs_ssh_keypair`)[align=left;position=above]}
```hcl
resource "ivkcs_ssh_keypair" "key" {
  bit_size = 3072
}
```
{/caption}