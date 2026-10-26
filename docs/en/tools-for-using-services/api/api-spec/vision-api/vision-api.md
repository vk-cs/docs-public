# {heading(Vision)[id=api-spec-vision]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Getting the endpoint, authorization and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been done yet.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Endpoints** tab.
1. Find the endpoint in the **AI API** block.
1. {linkto(../../../../ml/vision/quick-start/auth-vision#vision-quick-start-auth-vision)[text=Obtain]} an access token.

{/cut}

{note:info}
You can download the original JSON specification using the [link](assets/visionapi-swagger.json "download").
{/note}

![{swagger}](assets/visionapi-swagger.json)