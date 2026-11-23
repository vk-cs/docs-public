# {heading(Managed Containers (second generation))[id=api-spec-mk8s]}

Use the **Managed Containers** service API to manage [second-generation](/en/kubernetes/mk8s) Kubernetes clusters: create and delete clusters, change their parameters, and manage node groups, add-ons, and applications.

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) your {var(cloud)} management console.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. In the query string, use the endpoint `https://msk.cloud.vk.ru/infra/container/managed-kubernetes/v1/clusters`, and specify the [Project ID](/en/tools-for-using-services/api/rest-api/endpoints#getting_project_id) of your project.

Request example:

```console
curl -X GET "https://msk.cloud.vk.ru/infra/container/managed-kubernetes/v1/clusters?project_id=<PROJECT_ID>" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/mk8s-swagger.json "download").
{/note}

![{swagger}](assets/mk8s-swagger.json)
