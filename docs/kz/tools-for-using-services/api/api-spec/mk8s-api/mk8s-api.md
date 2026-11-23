# {heading(Managed Containers (екінші буын))[id=api-spec-mk8s]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

**Managed Containers** қызметінің API көмегімен {linkto(../../../../kubernetes/mk8s#mk8s-k8s)[text=екінші буын]} Kubernetes кластерлерін басқара аласыз: кластерлерді жасау және жою, олардың параметрлерін өзгерту, түйіндер топтарын, аддондар мен қолданбаларды басқару.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
1. Әзірге жасалмаса, API арқылы қолжетімділікті {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұрауларды жіберген кезде токенді заголовкта пайдаланыңыз.
1. Сұрау жолында `https://msk.cloud.vk.ru/infra/container/managed-kubernetes/v1/clusters` эндпоинтін қолданыңыз және өз жобаңыздың {linkto(../../rest-api/endpoints#rest-api-endpoints-get-project-id)[text=Project ID]} мәнін көрсетіңіз.

Сұрау мысалы:

```console
curl -X GET "https://msk.cloud.vk.ru/infra/container/managed-kubernetes/v1/clusters?project_id=<PROJECT_ID>" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/mk8s-swagger.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/mk8s-swagger.json)
