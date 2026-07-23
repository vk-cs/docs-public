# {heading(VK Капча)[id=api-spec-captcha]}

API VK Капча позволяет создавать CAPTCHA-сессию и валидировать токен, подтверждающий, что пользователь прошел проверку.

{cut(Получение эндпоинта и сервисного токена)}

1. Получите сервисный токен `service_token` для доступа к VK Капча. Для этого отправьте запрос на регистрацию в сервисе на почту [captcha@corp.vk.com](mailto:captcha@corp.vk.com). При необходимости в запросе укажите:

   {include(../../../../_includes/_captcha-get-token.md)[tags=captcha-get-token]}

1. Используйте эндпоинт: https://api.vk.ru/method.
{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/captcha-api.json "download").
{/note}

![{swagger}](assets/captcha-api.json)
