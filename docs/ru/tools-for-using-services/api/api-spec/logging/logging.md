<details>
  <summary markdown="span">Получение эндпоинта, авторизация и аутентификация</summary>

1. Убедитесь, что на проекте включен сервис Cloud Logging, при необходимости подключите его через [техническую поддержку](/ru/contacts).
1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Hажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт для сервиса Cloud Logging. Если его нет в списке, используйте `https://mcs.mail.ru/cloudlogs`.
1. Узнайте `service_id` — он может быть базовым или созданным через [техническую поддержку](/ru/contacts). Базовые значения:

   - `default` — значение по умолчанию.
   - `databases` — логирование ресурсов сервиса Cloud Databases.
   - `containers` — логирование ресурсов сервиса Cloud Containers.
   - `bigdata` — логирование ресурсов сервиса Cloud Big Data.
   - `vdi` — логирование ресурсов сервиса Cloud Desktop.

1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`.

</details>

<info>

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/loggingapi-swagger.json "download").

</info>

![{swagger}](assets/loggingapi-swagger.json)
