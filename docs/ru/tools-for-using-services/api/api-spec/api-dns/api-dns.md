REST API [публичного DNS](/ru/networks/dns/publicdns) поддерживает управление ресурсами:

- просмотр списков DNS-зон и их записей;
- создание DNS-зон и их записей;
- просмотр параметров DNS-зон и их записей;
- изменение DNS-зон и их записей;
- удаление DNS-зон и их записей.

<details>
<summary>Получение эндпоинта, авторизация и аутентификация</summary>

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Hажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите в блоке **Сервис OpenStack** эндпоинт **Publicdns**.
1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.

Пример запроса:

```curl
curl --location "https://mcs.mail.ru/public-dns/v2/dns/" \
--header "X-Auth-Token: gAAAAABlLjgzyxXXXX" \
--header "Content-Type: application/json"
```
</details>

<info>

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/public-dns-api.json "download").

</info>

![{swagger}](assets/public-dns-api.json)
