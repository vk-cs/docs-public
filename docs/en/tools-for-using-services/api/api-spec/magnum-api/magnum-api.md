# {heading(Managed Containers)[id=api-spec-magnum]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} personal dashboard.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it is not already enabled.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it is not already enabled.
1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack Service** block, find the **Magnum** endpoint.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the original JSON specification using the [link](assets/magnumapi-swagger.json "download").
{/note}

![{swagger}](assets/magnumapi-swagger.json)