<details>
  <summary markdown="span">Получение эндпоинта, авторизация и аутентификация</summary>

1. Убедитесь, что на проекте включен сервис Cloud Logging, при необходимости подключите его через [техническую поддержку](/ru/contacts).
1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/base/account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Hажмите кнопку **Активировать доступ по API**.
1. [Узнайте](https://mcs.mail.ru/app/project/endpoints) эндпоинт для сервиса Cloud Logging; если его нет в списке, используйте `https://mcs.mail.ru/cloudlogs`.
1. Узнайте `service_id` — он может быть базовым или созданным через [техническую поддержку](/ru/contacts). Базовые значения:

   - `default` — значение по умолчанию.
   - `databases` — логирование ресурсов сервиса Cloud Databases.
   - `containers` — логирование ресурсов сервиса Cloud Containers.
   - `bigdata` — логирование ресурсов сервиса Cloud Big Data.
   - `vdi` — логирование ресурсов сервиса Cloud Desktop.
  
1. [Получите](/ru/manage/tools-for-using-services/rest-api/case-keystone-token) токен доступа `X-Subject-Token`.

</details>

<info>

Спецификация в формате JSON доступна по [ссылке](./assets/loggingapi-swagger.json "download").

</info>

![{swagger}](./assets/loggingapi-swagger.json)
