REST API [CDN](/ru/networks/cdn) поддерживает управление и мониторинг работы CDN-ресурсов:

- просмотр канонической доменной записи (CNAME) текущего аккаунта;
- создание и управление группами источников;
- создание и управление CDN-ресурсами;
- получение и отзыв сертификата [Let's Encrypt](https://letsencrypt.org/ru/);
- просмотр, добавление, изменение, удаление SSL-сертификатов;
- предварительную загрузку файлов на CDN-сервер;
- очистку кеша CDN-сервера;
- мониторинг работоспособности CDN-ресурсов.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Нажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.
1. Используйте эндпоинт `https://msk.cloud.vk.com/api/cdn/api/v1/` в строке запроса.

Пример запроса:

```curl
curl --location "https://msk.cloud.vk.com/api/cdn/api/v1/projects/example4ef0547e5b222f/resources" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX"
```

{/cut}

{note:info}

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/api-cdn.json "download").

{/note}

![{swagger}](assets/api-cdn.json)
