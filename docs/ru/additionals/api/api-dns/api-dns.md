REST API [публичного DNS](../../../networks/dns/publicdns) поддерживает управление ресурсами:

- просмотр списков DNS-зон и их записей;
- создание DNS-зон и их записей;
- просмотр параметров DNS-зон и их записей;
- изменение DNS-зон и их записей;
- удаление DNS-зон и их записей.

<details>
<summary>Аутентификация и авторизация</summary>

1. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/manage/tools-for-using-services/rest-api/enable-api) доступ по API.
1. [Получите токен доступа](/ru/additionals/cases/case-keystone-token). Используйте токен в заголовке при отправке запросов.
1. [Узнайте](https://mcs.mail.ru/app/project/endpoints) эндпоинт для **Publicdns**.

Пример запроса:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```
</details>

<info>

Спецификация в формате JSON доступна [по ссылке](./assets/public-dns-api.json "download").

</info>

![{swagger}](./assets/public-dns-api.json)
