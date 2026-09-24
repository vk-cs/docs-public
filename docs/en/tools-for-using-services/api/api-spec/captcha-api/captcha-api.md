# {heading(VK Капча)[id=api-spec-captcha]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VK Капча API allows creating a captcha session and validating the token confirming that the user has passed the verification.

{cut(Obtaining the endpoint and service token)}

1. Get the `service_token` service token to access VK Капча. To do this, send a service registration request to the [sales department](https://cloud.vk.ru/contacts/). If necessary, specify:

   {include(../../../../_includes/_captcha-get-token.md)[tags=captcha-get-token]}

1. Use the endpoint: https://api.vk.ru/method.
{/cut}

{note:info}
You can download the source JSON specification using the [link](assets/captcha-api.json "download").
{/note}

![{swagger}](assets/captcha-api.json)