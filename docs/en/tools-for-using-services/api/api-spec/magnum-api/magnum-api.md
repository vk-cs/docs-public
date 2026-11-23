# {heading(Managed Containers (first generation))[id=api-spec-magnum]}

Use the **Managed Containers** service API to manage [first-generation](/en/kubernetes/k8s) Kubernetes clusters: create and delete clusters, change their parameters, and manage cluster templates and node groups.

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) your {var(cloud)} management console.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. In the query string, use the endpoint `https://msk.cloud.vk.ru/infra/kubernetes/v1/clusters`.

Request example:

```console
curl -X GET "https://msk.cloud.vk.ru/infra/kubernetes/v1/clusters" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/magnumapi-swagger.json "download").
{/note}

![{swagger}](assets/magnumapi-swagger.json)
