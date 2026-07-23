# {heading(Billing)[id=captcha-tariffication]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VK Капча service is paid. Each user verification during captcha completion is billed. To calculate the cost, contact the VK Капча team at [captcha@corp.vk.com](mailto:captcha@corp.vk.com).

To test the service for free, pass the `Captcha-Test` header with the value `true` when calling the `GET /captchaNotRobot.createSession` {linkto(../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=method]}. In this mode, all captcha attempts are considered successful, and requests are not billed.

{note:warn}
The test mode is intended only for verifying your application's integration with the service. Do not use the `Captcha-Test` header in production — in this mode, the captcha does not protect against bots.
{/note}