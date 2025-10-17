{cut(Получение эндпоинта и токена аутентификации)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

    1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
    1. Нажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт **Neutron** в блоке **Сервис OpenStack**.
1. [Получите токен доступа](../../../rest-api/case-keystone-token) `X-Auth-Token`.

{/cut}

{note:info}

Исходная спецификация в формате JSON доступна по [ссылке](./assets/neutron-sprut-api.json "download").

{/note}

![{swagger}](assets/neutron-sprut-api.json)