# {heading(Tariffication)[id=captcha-tariffication]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VK Капча service is a paid service. Each user verification performed during captcha completion is charged. To calculate the cost, contact the VK Капча team at [captcha@corp.vk.com](mailto:captcha@corp.vk.com).

To test the service for free, pass the `Captcha-Test` header with the value `true` when calling the {linkto(../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. In test mode, all captcha completion attempts are considered successful, and requests are not charged.

{note:warn}
Test mode is intended only for verifying the integration of your application with the service. Do not use the `Captcha-Test` header in a production environment — in this mode, VK Капча does not protect against automated attacks.
{/note}