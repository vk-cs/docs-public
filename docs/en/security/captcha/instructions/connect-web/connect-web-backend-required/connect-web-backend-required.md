# {heading(Displaying captcha upon backend request)[id=captcha-connect-web-backend-first]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Install]} VK Капча SDK.

1. Add the import of the `checkCaptchaError` function to the frontend:

   ```typescript
   import { checkCaptchaError } from '@vkid/captcha';
   ```

1. Send a request to the backend for the target user action.

1. Pass the response to the `checkCaptchaError()` function. The function will parse the response and return a link to launch the captcha widget if a captcha was required.

1. Display the captcha to the user. Use the SDK method {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-show)[text=captchaWidget.show()]}.

   The method will return a promise object with the captcha completion result: a successful captcha completion token if the user passed the captcha, or an error if the user closed the captcha.

1. Process the captcha completion result:

   - If the promise object contains a successful captcha completion token, repeat the original request for the target user action, adding the token to it.
   - If the user closed the captcha, nothing is sent to the backend. Determine what will happen in the frontend in this case.

TypeScript code example:

```typescript
import { checkCaptchaError } from '@vkid/captcha';

async function onSubmit(credentials: Credentials) {
   // Request for the user action. The frontend doesn't know anything about the captcha yet
   const response = await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client }),
   });
   const data = await response.json();

   // There is no need to manually specify the captcha launch link, it is returned by the checkCaptchaError() function.
   const { captchaType, captchaWidget } = checkCaptchaError({
      responseHeaders: response.headers,
      url: response.url,
      responseError: data.error,
      withWidget: true, // Without this parameter, only the address will be returned, without the widget
   });

   if (captchaType === null) {
      return finish(data); // Captcha was not required
   }

   if (!captchaWidget) {
      // Captcha is needed, but the widget could not be built: the response has no captcha address
      return handleUnknownCaptcha(data);
   }
   
   const captchaToken = await captchaWidget.show({
      container: document.body,
      view: 'popup',
      lang: 'ru',
   });

   // The same request for the user action, but with the captcha completion token
   await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client, captchaToken }),
   });
}
```