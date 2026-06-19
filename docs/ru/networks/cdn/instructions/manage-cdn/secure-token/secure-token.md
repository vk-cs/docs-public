# {heading(Подключение Secure token)[id=cdn-secure-token]}

Опция {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token)[text=Secure token]} позволяет защитить файлы CDN-ресурса от нежелательного скачивания.

## {heading(Подключение Secure token)[id=cdn-secure-token-connect]}

{tabs}
{tab(Личный кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. Перейдите на вкладку **Безопасность**.
1. Включите опцию **Активировать Secure Token**.
1. Введите секретный ключ — случайный набор символов длиной от 6 до 32 знаков. Храните введенный секретный ключ в безопасном месте.
1. (Опционально) Включите опцию **Добавить IP-адрес к токену**, чтобы разрешить доступ только с определенного IP-адреса. IP-адрес задается вне CDN-ресурса путем размещения {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token-ipscripts)[text=скрипта]} на сайте, где находится источник контента.
1. Нажмите кнопку **Сохранить изменения**.

{/tab}
{tab(API)}
{include(../../../../../_includes/_api_cdn_create_change.md)}
В теле запроса в блоке `options` задайте параметры `secure_key`:

- Чтобы подключить опцию, укажите `"enabled": true`, чтобы отключить  — `"enabled": false`.
- Чтобы задать секретный ключ, введите набор символов длиной от 6 до 32 знаков для параметра `key`. Пример: `"key": "examplesecurekey"`.
- Чтобы подключить добавление IP-адреса к токену, введите значение `2` для параметра `type`. Чтобы отключить добавление IP-адреса, введите значение `0`. Примеры: `"type": 2`, `"type": 0`.

Пример запроса:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281' \
--header 'X-Auth-Token: example6UjMOd' \
--header 'Content-Type: application/json' \
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options": {
        "secure_key": {
            "enabled": true, 
            "key": "examplesecurekey",
            "type": 2
        }
    }
}'
```
{/tab}
{/tabs}

{note:info}
После того, как вы подключите Secure token, доступ к контенту CDN-ресурса по неподписанным ссылкам будет невозможен.
Чтобы организовать доступ к части контента по обычным ссылкам, {linkto(../../../../../networks/cdn/instructions/create-resource#cdn-create-resource)[text=создайте]} для него еще один ресурс с отдельным {linkto(../../../../../networks/cdn/concepts/origin-groups#cdn-origin-groups)[text=источником]}.
{/note}

## {heading(Настройка доступа по подписанным ссылкам)[id=cdn-secure-token-signed-links-access]}

Настройка выполняется на ресурсе, через который пользователи получают доступ к контенту:

1. Добавьте на ваш ресурс нужный {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token-scripts)[text=скрипт]} для генерации подписанной ссылки. Выбор скрипта зависит от того, включили ли вы опцию **Добавить IP-адрес к токену**.
1. Организуйте ваш ресурс так, чтобы пользователи получали доступ к нужным файлам только по подписанным ссылкам. При этом сервис CDN {var(cloud)}, обращаясь к серверу-источнику, должен получать доступ к контенту вне зависимости от наличия секретного ключа.
