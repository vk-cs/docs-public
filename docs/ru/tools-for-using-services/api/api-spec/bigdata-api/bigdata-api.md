API сервиса [Cloud Big Data](/ru/data-processing/bigdata) позволяет разворачивать новые и управлять существующими кластерами больших данных и их шаблонами; доступно управление резервным копированием. Кластерам Cloud Big Data соответствует сервис [OpenStack Sahara](https://docs.openstack.org/sahara/latest/).

<warn>

Чтобы подключить сервис и создать кластер, обратитесь в [техническую поддержку](/ru/contacts) или оставьте заявку на [сайте сервиса](https://cloud.vk.com/bigdata/).

</warn>

<details>
  <summary markdown="span">Получение эндпоинта, авторизация и аутентификация</summary>

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Hажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт **Sahara** в блоке **Сервис OpenStack**.
1. [Получите токен доступа](../../rest-api/case-keystone-token) `X-Auth-Token`.

</details>

<info>

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/saharaapi-swagger.json "download").

</info>

![{swagger}](assets/saharaapi-swagger.json)
