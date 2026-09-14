# {heading(Показ капчи по запросу бэкенда)[id=captcha-connect-web-backend-first]}

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Установите]} VK Капча SDK.

1. Добавьте во фронтенд импорт функции `checkCaptchaError`:

   ```typescript
   import { checkCaptchaError } from '@vkid/captcha';
   ```

1. Отправьте бэкенду запрос на целевое действие пользователя.

1. Передайте ответ в функцию `checkCaptchaError()`. Функция разберет ответ и вернет ссылку для запуска виджета капчи, если капча потребовалась.

1. Отобразите капчу пользователю. Воспользуйтесь методом SDK {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-show)[text=captchaWidget.show()]}.

   Метод вернет promise-объект с результатом прохождения капчи: токен успешного прохождения капчи, если пользователь прошел капчу, или ошибку, если пользователь закрыл капчу.

1. Обработайте результат прохождения капчи:

   - Если promise-объект содержит токен успешного прохождения капчи, повторите исходный запрос на целевое действие пользователя, добавив к нему токен.
   - Если пользователь закрыл капчу, бэкенду ничего не отправляется. Определите, что будет происходить во фронтенде в этом случае.

Пример кода на TypeScript:

```typescript
import { checkCaptchaError } from '@vkid/captcha';

async function onSubmit(credentials: Credentials) {
   // Запрос на действие пользователя. О капче фронтенд пока ничего не знает
   const response = await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client }),
   });
   const data = await response.json();

   // Ссылку для запуска капчи вручную задавать не нужно, ее возвращает функция checkCaptchaError().
   const { captchaType, captchaWidget } = checkCaptchaError({
      responseHeaders: response.headers,
      url: response.url,
      responseError: data.error,
      withWidget: true, // Без этого параметра вернется только адрес, без виджета
   });

   if (captchaType === null) {
      return finish(data); // Капча не потребовалась
   }

   if (!captchaWidget) {
      // Капча нужна, но собрать виджет не удалось: в ответе нет адреса капчи
      return handleUnknownCaptcha(data);
   }
   
   const captchaToken = await captchaWidget.show({
      container: document.body,
      view: 'popup',
      lang: 'ru',
   });

   // Тот же запрос на действие пользователя, но с токеном прохождения капчи
   await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client, captchaToken }),
   });
}
```
