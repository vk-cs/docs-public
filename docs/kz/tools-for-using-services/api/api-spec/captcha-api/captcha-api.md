# {heading(VK Капча)[id=api-spec-captcha]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

VK Капча API пайдаланушы тексеруден өткенін растайтын токенді валидациялауға және капча-сессиясын жасауға мүмкіндік береді.

{cut(Эндпоинт пен сервистік токенді алу)}

1. VK Капчаға кіру үшін `service_token` сервистік токенін алыңыз. Ол үшін [сату бөліміне](https://cloud.vk.ru/contacts/) сервиске тіркелу сұранысын жіберіңіз. Қажет болса, көрсетіңіз:

   {include(../../../../_includes/_captcha-get-token.md)[tags=captcha-get-token]}

1. Эндпоинтті пайдаланыңыз: https://api.vk.ru/method.
{/cut}

{note:info}
JSON форматындағы бастапқы спецификацияны [сілтеме](assets/captcha-api.json "download") арқылы жүктеп алуға болады.
{/note}

![{swagger}](assets/captcha-api.json)