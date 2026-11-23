# {heading(Managed Containers (первое поколение))[id=api-spec-magnum]}

С помощью API сервиса **Managed Containers** вы можете управлять кластерами Kubernetes {linkto(../../../../kubernetes/k8s#k8s-k8s)[text=первого поколения]}: создавать и удалять кластеры, изменять их параметры, управлять шаблонами кластеров и группами узлов.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.ru/app) в личный кабинет {var(cloud)}.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.
1. В строке запроса используйте эндпоинт `https://msk.cloud.vk.ru/infra/kubernetes/v1/clusters`.

Пример запроса:

```console
curl -X GET "https://msk.cloud.vk.ru/infra/kubernetes/v1/clusters" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/magnumapi-swagger.json "download").
{/note}

![{swagger}](assets/magnumapi-swagger.json)
