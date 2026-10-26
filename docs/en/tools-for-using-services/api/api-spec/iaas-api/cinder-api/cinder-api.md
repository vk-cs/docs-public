# {heading(Disk management)[id=api-spec-cinder]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Getting the endpoint and authentication token)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been done yet.
1. {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Endpoints** tab.
1. Find the **Cinder** endpoint in the **OpenStack Service** block.
1. {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Get]} the `X-Auth-Token` access token.

{/cut}

{note:info}
The original JSON-format specification is available via the [link](./assets/cinder-api.json "download").
{/note}

![{swagger}](assets/cinder-api.json)