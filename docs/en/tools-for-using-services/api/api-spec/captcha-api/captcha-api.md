# {heading(VK Капча)[id=api-spec-captcha]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VK Капча API allows creating a CAPTCHA session and validating the token confirming that the user has passed the verification.

{cut(Obtaining the endpoint and authentication token)}

Endpoint for API access: https://api.vk.ru/method.

{include(../../../../_includes/_captcha-get-token.md)[tags=captcha-get-token]}

{/cut}

{note:info}
You can download the source JSON specification using the [link](assets/captcha-api.json "download").
{/note}

![{swagger}](assets/captcha-api.json)