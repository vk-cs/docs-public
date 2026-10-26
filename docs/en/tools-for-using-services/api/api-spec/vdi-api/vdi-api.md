# {heading(Cloud Desktop)[id=api-spec-vdi]}

{include(/en/_includes/_translated_by_ai_en.md)}

The API of the {linkto(../../../../computing/cloud-desktops#cloud-desktops)[text=Cloud Desktop]} service allows you to manage desktop pools and the desktops within them.

{cut(Getting the endpoint, authorization and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been enabled yet.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been enabled yet.
1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Endpoints** tab.
1. Find the endpoint for the Cloud Desktop service. If it is not in the list, use `https://msk.cloud.vk.ru/vdi/v1/`.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the original specification in JSON format using this [link](assets/vdiapi-swagger.json "download").
{/note}

![{swagger}](assets/vdiapi-swagger.json)