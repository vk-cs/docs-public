REST API Service Users поддерживает управление [сервисными учетными записями](/ru/tools-for-using-services/account/concepts/service-accounts):

- просмотр списка сервисных учетных записей;
- просмотр, создание и удаление сервисных учетных записей;
- скачивание OpenStack RC-файла для авторизации.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. [Включите](/ru/tools-for-using-services/api/rest-api/enable-api#aktivaciya_dostupa_po_api) доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите в блоке **Сервис OpenStack** эндпоинт **Service Users**. Если его нет в списке, используйте `https://msk.cloud.vk.com/service-users/`.
1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.

{/cut}

{note:info}

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/api-service-users.json "download").

{/note}

![{swagger}](assets/api-service-users.json)
