REST API [Anycast](/ru/networks/vnet/service-management/ip/anycast-ip) поддерживает управление Anycast IP-адресами:

- просмотр списка Anycast IP-адресов на проекте;
- просмотр, создание, редактирование и удаление IP-адреса;
- привязка и отвязка порта к Anycast IP-адресу;
- добавление проверки работоспособности связанных портов.

<details>
<summary>Получение эндпоинта, авторизация и аутентификация</summary>

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Hажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите в блоке **Сервис OpenStack** эндпоинт **Neutron**.
1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.
1. Используйте URL `<OS_NEUTRON_URL>/v2.0/` в строке запроса. Здесь `<OS_NEUTRON_URL>` — эндпоинт **Neutron**.

Пример запроса:

```curl
curl --location "https://infra.mail.ru:9696/v2.0/anycastips" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX" \
--header 'Content-Type: application/json'
```

</details>

<info>

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/api-anycast.json "download").

</info>

![{swagger}](assets/api-anycast.json)
