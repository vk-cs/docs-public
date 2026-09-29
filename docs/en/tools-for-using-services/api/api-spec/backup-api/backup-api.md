# {heading(Cloud Backup)[id=api-spec-karboii]}

{cut(Obtaining an endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) your VK Cloud management console.
1. Enable two-factor authentication if not done so already.
1. Enable API access if not done so already.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack Service** block, locate the **Karboii** endpoint.
1. Get your `X-Auth-Token` access token. Use it in the header when sending requests.

{/cut}

{note:info}
You can download the original JSON specification via this [link](assets/karboiiapi-swagger.json "download").
{/note}

![{swagger}](assets/karboiiapi-swagger.json)
