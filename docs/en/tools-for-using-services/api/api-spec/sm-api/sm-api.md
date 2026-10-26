# {heading(Secrets Manager)[id=api-spec-sm]}

{include(/en/_includes/_translated_by_ai_en.md)}

The API of the {linkto(../../../../security/secret-manager#security-secret-manager)[text=Secrets Manager]} allows you to manage secrets and their versions.

{cut(Getting the endpoint, authorization, and authentication)}

1. Go to the {var(cloud)} [management console](https://msk.cloud.vk.ru/app).
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if this has not been done yet.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if this has not been done yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. Find the endpoint for the Secrets Manager. If it is not in the list, use `https://msk.cloud.vk.ru/kms/user/v1/`.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the original JSON specification via this [link](assets/sm-api.json "download").
{/note}

![{swagger}](assets/sm-api.json)