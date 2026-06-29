# {heading(Cloud Databases)[id=api-spec-dbaas]}

API сервиса {linkto(../../../../dbs/dbaas#dbaas-dbaas)[text=Cloud Databases]} поддерживает работу с облачными базами данных:

- получение информации о возможностях инстансов, кластеров и хранилищ данных;
- управление базами данных, хранилищами данных, инстансами и кластерами;
- управление конфигурациями;
- управление резервным копированием;
- управление пользователями;
- просмотр журнала биллинга.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт **Trove** в блоке **Сервис OpenStack**.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`.

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/dbaasapi-swagger.json "download").
{/note}

![{swagger}](assets/dbaasapi-swagger.json)
