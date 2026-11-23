# {heading(Managed Containers (второе поколение))[id=api-spec-mk8s]}

С помощью API сервиса **Managed Containers** вы можете управлять кластерами Kubernetes {linkto(../../../../kubernetes/mk8s#mk8s-k8s)[text=второго поколения]}: создавать и удалять кластеры, изменять их параметры, управлять группами узлов, аддонами и приложениями.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.ru/app) в личный кабинет {var(cloud)}.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`. Используйте токен в заголовке при отправке запросов.
1. В строке запроса используйте эндпоинт `https://msk.cloud.vk.ru/infra/container/managed-kubernetes/v1/clusters` и передайте {linkto(../../rest-api/endpoints#rest-api-endpoints-get-project-id)[text=Project ID]} своего проекта.

Пример запроса:

```console
curl -X GET "https://msk.cloud.vk.ru/infra/container/managed-kubernetes/v1/clusters?project_id=<PROJECT_ID>" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/mk8s-swagger.json "download").
{/note}

![{swagger}](assets/mk8s-swagger.json)
