# {heading(Cloud Backup)[id=api-spec-karboii]}

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) your {var(cloud)} management console.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack service** block, find the **Karboii** endpoint.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token-gen)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/karboiiapi-swagger.json "download").
{/note}

![{swagger}](assets/karboiiapi-swagger.json)
