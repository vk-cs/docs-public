# {heading(Managing virtual machines)[id=api-spec-nova]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Getting the endpoint and authentication token)}

1. [Go to](https://msk.cloud.vk.ru/app) your {var(cloud)} management console.
1. {linkto(../../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been done yet.
1. {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack service** block, find the **Nova** endpoint.
1. {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token-gen)[text=Obtain]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/nova-api.json "download").
{/note}

![{swagger}](assets/nova-api.json)