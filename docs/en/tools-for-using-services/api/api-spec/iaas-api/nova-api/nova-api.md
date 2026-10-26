# {heading(Managing virtual machines)[id=api-spec-nova]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Getting the endpoint and authentication token)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication, if not already done.
1. {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access, if not already done.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. Find the **Nova** endpoint in the **OpenStack service** block.
1. {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token.

{/cut}

{note:info}
The original JSON specification is available at [this link](./assets/nova-api.json "download").
{/note}

![{swagger}](assets/nova-api.json)