API сервиса [Cloud Desktop](/ru/base/cloud-desktops) позволяет управлять пулами рабочих столов и рабочими столами в них.

<details>
  <summary markdown="span">Получение эндпоинта, авторизация и аутентификация</summary>

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/account/service-management/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Нажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт для сервиса Cloud Desktop. Если его нет в списке, используйте `https://msk.cloud.vk.com/vdi/v1/`.
1. [Получите](/ru/additionals/cases/case-keystone-token) токен доступа `X-Auth-Token`.

</details>

<info>

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/vdiapi-swagger.json "download").

</info>

![{swagger}](assets/vdiapi-swagger.json)
