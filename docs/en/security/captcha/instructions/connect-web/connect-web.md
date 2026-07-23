# {heading(Connecting to a web application)[id=captcha-connect-web]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. Download the VK Капча SDK:

   {tabs}

   {tab(npm)}

   ```console
   npm install @vkid/captcha
   ```
   {/tab}

   {tab(yarn)}

   ```console
   yarn add @vkid/captcha
   ```
   {/tab}

   {tab(pnpm)}

   ```console
   pnpm add @vkid/captcha
   ```
   {/tab}

   {tab(JS script)}

   ```javascript
   <script src="https://static.vk.ru/captchaSDK/loader/1/umd/index.js"></script>
   ```
   After loading the script, VK Капча SDK will be available in the `window.vkidCaptcha` object, where `vkidCaptcha` is a promise object.

   {/tab}

   {/tabs}

1. Add the retrieval of the `captchaWidget` class to the frontend:

   {tabs}

   {tab(npm, yarn, pnpm)}
   ```typescript
   import { CaptchaWidget } from "@vkid/captcha"; 
   ```
   {/tab}

   {tab(JS script)}
   ```javascript
   const { CaptchaWidget } = await window.vkidCaptcha; 
      ```
   {/tab}

   {/tabs}

1. Make sure that standard ports `80` for HTTP and `443` for HTTPS are used during local development.

   {note:warn}
   If a non-standard port is used during local development, the captcha will not work locally.
   {/note}

1. Get the link for launching the captcha widget from the backend.

1. Display the captcha to the user. Use the {linkto(../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-show)[text=SDK method]} `captchaWidget.show()`.

   The method will return a promise object with the captcha verification result: a successful captcha token if the user passed the captcha, or an error if the user closed the captcha.

1. Process the captcha verification result:

   - If the promise object contains a successful captcha token, send it to the backend for validation.
   - If the user closed the captcha, nothing is sent to the backend. Determine what should happen in the frontend in this case.

TypeScript code example:

```typescript
const API_ERROR_CODE_CAPTCHA = <ERROR_CODE>; // Error code that the service backend sends when a captcha is required for the user's action

interface ApiCaptchaError {
   error_code: number;
   error_msg: string;
   captcha_sid: string; // Captcha session identifier
   redirect_uri: string; // Link for launching the captcha widget, received from the backend, contains a session token
}

const handleCaptchaError = async (captchaUrl: string) => { // Captcha handler
   try {
      const captchaWidget = new CaptchaWidget();
      const success_token = await captchaWidget.show({ // The show() method returns a promise object with the success_token when the captcha is successfully passed
         container: document.body, // HTML element in which the captcha widget will be displayed
         iframeSrc: captchaUrl, // Link for launching the captcha widget from the redirect_uri parameter
         captchaType: 'type_1', // Captcha type: 'type_1'
         view: 'popup',  // Captcha view: 'popup' or 'block'
      });

      fetch('url'); // Repeat request for user action + received success_token
   } catch (error) {
      if (error === 'close') {
         // Handling captcha closure by the user
      }
   }
};

fetch('url') // User performs an action
        .then((response) => response.json())
        .then((data) => { // Error code check
           const error = data.error;

           if (error?.error_code === API_ERROR_CODE_CAPTCHA) { // If the API_ERROR_CODE_CAPTCHA error code is returned, the captcha handler is called with redirect_uri
              handleCaptchaError(error.redirect_uri);
           }
        });
```