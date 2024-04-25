<details>
  <summary markdown="span">Получение эндпоинта, авторизация и аутентификация</summary>

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/base/account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Hажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите в блоке **Сервис OpenStack** эндпоинт **Karboii**.
1. [Получите](/ru/manage/tools-for-using-services/rest-api/case-keystone-token) токен доступа `X-Auth-Token`.

</details>

<info>

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/karboiiapi-swagger.json "download").

</info>

![{swagger}](assets/karboiiapi-swagger.json)
