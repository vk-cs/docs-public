# {heading(Managed Containers (бірінші буын))[id=api-spec-magnum]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

**Managed Containers** қызметінің API көмегімен {linkto(../../../../kubernetes/k8s#k8s-k8s)[text=бірінші буын]} Kubernetes кластерлерін басқара аласыз: кластерлерді жасау және жою, олардың параметрлерін өзгерту, кластер шаблондары мен түйіндер топтарын басқару.

{cut(Эндпоинтті алу, авторизация және аутентификация)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app).
1. Әзірге жасалмаса, API арқылы қолжетімділікті {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=қосыңыз]}.
1. `X-Auth-Token` қолжетімділік токенін {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=алыңыз]}. Сұрауларды жіберген кезде токенді заголовкта пайдаланыңыз.
1. Сұрау жолында `https://msk.cloud.vk.ru/infra/kubernetes/v1/clusters` эндпоинтін қолданыңыз.

Сұрау мысалы:

```console
curl -X GET "https://msk.cloud.vk.ru/infra/kubernetes/v1/clusters" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/magnumapi-swagger.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/magnumapi-swagger.json)
