# {heading(Cloud Logging)[id=api-spec-logging]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Getting the endpoint, authorization and authentication)}

1. Make sure the Cloud Logging service is enabled for the project; if necessary, enable it via [technical support](/en/contacts).
1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it is not yet enabled.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it is not yet enabled.
1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Endpoints** tab.
1. Find the endpoint for the Cloud Logging service. If it is not in the list, use `https://mcs.mail.ru/cloudlogs`.
1. Find out the `service_id` — it can be a basic one or one created via [technical support](/en/contacts). Basic values:

   - `default` — the default value.
   - `databases` — logging of Cloud Databases service resources.
   - `containers` — logging of Managed Containers service resources.
   - `vdi` — logging of Cloud Desktop service resources.

1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the original JSON specification via the [link](assets/loggingapi-swagger.json "download").
{/note}

![{swagger}](assets/loggingapi-swagger.json)