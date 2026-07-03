# {heading(Сервисные учетные записи)[id=api-spec-service-users]}

REST API Service Users поддерживает управление {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисными учетными записями]}:

- просмотр списка сервисных учетных записей;
- просмотр, создание и удаление сервисных учетных записей;
- скачивание OpenStack RC-файла для авторизации.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите в блоке **Сервис OpenStack** эндпоинт **Service Users**. Если его нет в списке, используйте `https://msk.cloud.vk.com/service-users/`.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/api-service-users.json "download").
{/note}

![{swagger}](assets/api-service-users.json)
