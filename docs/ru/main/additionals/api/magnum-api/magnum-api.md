С помощью данной спецификации и сервиса https://openapi.tools/ возможна генерация SDK для различных языков программирования, а также генерация страницы с возможностью выполнять приведенные запросы.

<details>
  <summary markdown="span">Авторизация и аутентификация</summary>

1. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/manage/tools-for-using-services/rest-api/enable-api) доступ по API.
1. [Получите токен доступа](/ru/additionals/cases/case-keystone-token) `X-Subject-Token`.
1. [Узнайте](https://mcs.mail.ru/app/project/endpoints) эндпоинт для сервиса Magnum.

</details>

![{swagger}](./assets/magnumapi-swagger.json)
