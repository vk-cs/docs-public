# {heading(CDN)[id=api-spec-cdn]}

REST API {linkto(../../../../networks/cdn#cdn)[text=CDN]} поддерживает управление и мониторинг работы CDN-ресурсов:

- просмотр канонической доменной записи (CNAME) текущего аккаунта;
- создание и управление группами источников;
- создание и управление CDN-ресурсами;
- получение и отзыв сертификата [Let's Encrypt](https://letsencrypt.org/ru/);
- просмотр, добавление, изменение, удаление SSL-сертификатов;
- предварительную загрузку файлов на CDN-сервер;
- очистку кеша CDN-сервера;
- мониторинг работоспособности CDN-ресурсов.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.
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
