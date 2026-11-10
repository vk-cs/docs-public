# {heading(Бэкенд сұрауы бойынша капчаны көрсету)[id=captcha-connect-web-backend-first]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Орнатыңыз]} VK Капча SDK.

1. Фронтендке `checkCaptchaError` функциясының импортын қосыңыз:

   ```typescript
   import { checkCaptchaError } from '@vkid/captcha';
   ```

1. Пайдаланушының мақсатты әрекетіне бэкендке сұрау жіберіңіз.

1. Жауапты `checkCaptchaError()` функциясына беріңіз. Функция жауапты талдап, егер капча қажет болса, капча виджетін іске қосу сілтемесін қайтарады.

1. Пайдаланушыға капчаны көрсетіңіз. SDK-ның {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-show)[text=captchaWidget.show()]} әдісін пайдаланыңыз.

   Әдіс капчадан өту нәтижесі бар promise-объектіні қайтарады: егер пайдаланушы капчадан өтсе — капчадан сәтті өту токенін, ал егер пайдаланушы капчаны жапса — қателікті қайтарады.

1. Капчадан өту нәтижесін өңдеңіз:

   - Егер promise-объект капчадан сәтті өту токенін қамтитын болса, пайдаланушының мақсатты әрекетіне бастапқы сұрауды оған токен қосып, қайталап жіберіңіз.
   - Егер пайдаланушы капчаны жапса, бэкендке ештеңе жіберілмейді. Бұл жағдайда фронтендте не болатынын анықтаңыз.

TypeScript тіліндегі код мысалы:

```typescript
import { checkCaptchaError } from '@vkid/captcha';

async function onSubmit(credentials: Credentials) {
   // Пайдаланушы әрекетіне сұрау. Фронтенд капча туралы әзірге білмейді
   const response = await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client }),
   });
   const data = await response.json();

   // Капчаны қолмен іске қосу сілтемесін көрсету қажет емес, оны checkCaptchaError() функциясы қайтарады.
   const { captchaType, captchaWidget } = checkCaptchaError({
      responseHeaders: response.headers,
      url: response.url,
      responseError: data.error,
      withWidget: true, // Осы параметрсіз тек адрес қайтып келеді, виджетсіз
   });

   if (captchaType === null) {
      return finish(data); // Капча қажет болмады
   }

   if (!captchaWidget) {
      // Капча қажет, бірақ виджетті жинау мүмкін болмады: жауапта капча адресі жоқ
      return handleUnknownCaptcha(data);
   }

   const captchaToken = await captchaWidget.show({
      container: document.body,
      view: 'popup',
      lang: 'ru',
   });

   // Пайдаланушы әрекетіне сол сұрау, бірақ капчадан өту токенімен
   await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client, captchaToken }),
   });
}
```