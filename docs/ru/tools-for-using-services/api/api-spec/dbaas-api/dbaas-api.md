API сервиса [Cloud Databases](/ru/dbs/dbaas) поддерживает работу с облачными базами данных:

- получение информации о возможностях инстансов, кластеров и хранилищ данных;
- управление базами данных, хранилищами данных, инстансами и кластерами;
- управление конфигурациями;
- управление резервным копированием;
- управление пользователями;
- просмотр журнала биллинга.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. [Включите](/ru/tools-for-using-services/api/rest-api/enable-api#aktivaciya_dostupa_po_api) доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт **Trove** в блоке **Сервис OpenStack**.
1. [Получите токен доступа](../../rest-api/case-keystone-token) `X-Auth-Token`.

{/cut}

{note:info}

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/dbaasapi-swagger.json "download").

{/note}

![{swagger}](assets/dbaasapi-swagger.json)
