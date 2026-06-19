# {heading(Биллинг)[id=api-spec-billing]}

С помощью API сервиса **Биллинг** вы можете узнать {linkto(/ru/intro/billing/concepts/balance#billing-balance)[text=баланс]} проекта VK Cloud.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.
1. В строке запроса используйте эндпоинт `https://msk.cloud.vk.com/billing/public/v1/projects/<PID_ПРОЕКТА>/balances/amount` с указанием {linkto(/ru/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#vk-cloud-account-project-pid)[text=идентификатора]} (PID) своего проекта.

Пример запроса: 

```console
curl -X GET "https://msk.cloud.vk.com/billing/public/v1/projects/mcs1234567890/balances/amount" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/api-billing.json "download").
{/note}

![{swagger}](assets/api-billing.json)
