# {heading(Показ капчи по запросу бэкенда)[id=captcha-connect-web-backend-first]}

Сценарий для сервисов, где решение о проверке принимает бэкенд: пользователь выполняет действие, бэкенд отвечает, что нужна капча, и фронтенд запускает проверку в обработчике этого ответа. После успешной проверки запрос на действие отправляется бэкенду еще раз, но с токеном успешного прохождения капчи.

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Установите]} VK Капча SDK.

1. Добавьте во фронтенд импорт функции `checkCaptchaError`:

   ```typescript
   import { checkCaptchaError } from '@vkid/captcha';
   ```

1. Отправьте бэкенду обычный запрос на целевое действие пользователя.

1. Передайте ответ в функцию `checkCaptchaError()`. Функция разберет ответ и вернет ссылку для запуска виджета капчи, если капча потребовалась.

1. Отобразите капчу пользователю. Воспользуйтесь {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-show)[text=методом SDK]} `captchaWidget.show()`.

   Метод вернет promise-объект с результатом прохождения капчи: токен успешного прохождения капчи, если пользователь прошел капчу, или ошибку, если пользователь закрыл капчу.

1. Обработайте результат прохождения капчи:

   - Если promise-объект содержит токен успешного прохождения капчи, повторите исходный запрос на целевое действие пользователя, добавив к нему токен.
   - Если пользователь закрыл капчу, бэкенду ничего не отправляется. Определите, что будет происходить во фронтенде в этом случае.

Пример кода на TypeScript:

```typescript
import { checkCaptchaError } from '@vkid/captcha';

async function onSubmit(credentials: Credentials) {
   // Обычный запрос: о капче страница пока ничего не знает
   const response = await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client }),
   });
   const data = await response.json();

   // Адрес капчи функция достаёт из ответа сама — руками его не задают
   const { captchaType, captchaWidget } = checkCaptchaError({
      responseHeaders: response.headers,
      url: response.url,
      responseError: data.error,
      withWidget: true, // без него вернётся только адрес, без виджета
   });

   if (captchaType === null) {
      return finish(data); // капча не потребовалась
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

   // Тот же запрос второй раз, теперь с токеном
   await fetch('/api/legacy/login', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, client, captchaToken }),
   });
}
```