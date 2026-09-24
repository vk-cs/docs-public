# {heading(Connecting to the application backend)[id=captcha-connect-backend]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. Send a request from your service backend to the VK Капча API to create a captcha session. Use the {linkto(../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method.

   The method will return a link in the response for launching the widget in your application frontend (the `link` parameter).

1. Pass the received link for launching the captcha widget to the service frontend.

1. Get the successful captcha completion token `success_token` from the service frontend.

1. Send a request from your service backend to the VK Капча API to validate the successful captcha completion token `success_token`. Use the {linkto(../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.validate]} method.

   The method will return the captcha completion status in the response (the `status` parameter).

1. Process the user action if the token is valid.