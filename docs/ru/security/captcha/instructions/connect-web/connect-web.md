# {heading(Подключение к веб-приложению)[id=captcha-connect-web]}

1. Загрузите VK Капча SDK:

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

   {tab(JS-скрипт)}

   ```javascript
   <script src="https://static.vk.ru/captchaSDK/loader/1/umd/index.js"></script>
   ```
   После загрузки скрипта VK Капча SDK будет доступен в объекте `window.vkidCaptcha`, здесь `vkidCaptcha` — promise-объект.

   {/tab}

   {/tabs}

1. Добавьте во фронтенд получение класса `captchaWidget`:

   {tabs}

   {tab(npm, yarn, pnpm)}
   ```typescript
   import { CaptchaWidget } from "@vkid/captcha"; 
   ```
   {/tab}

   {tab(JS-скрипт)}
   ```javascript
   const { CaptchaWidget } = await window.vkidCaptcha; 
      ```
   {/tab}

   {/tabs}

1. Убедитесь, что при локальной разработке используются стандартные порты `80` для HTTP и `443` для HTTPS.

   {note:warn}
   Если при локальной разработке используется нестандартный порт, капча локально работать не будет.
   {/note}

1. Получите от бэкенда ссылку для запуска виджета капчи.

1. Отобразите капчу пользователю. Воспользуйтесь {linkto(../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-show)[text=методом SDK]} `captchaWidget.show()`.

   Метод вернет promise-объект с результатом прохождения капчи: токен успешного прохождения капчи, если пользователь прошел капчу, или ошибку, если пользователь закрыл капчу.

1. Обработайте результат прохождения капчи:

   - Если promise-объект содержит токен успешного прохождения капчи, отправьте его бэкенду для валидации.
   - Если пользователь закрыл капчу, бэкенду ничего не отправляется. Определите, что будет происходить во фронтенде в этом случае.

Пример кода на TypeScript:

```typescript
const API_ERROR_CODE_CAPTCHA = <КОД_ОШИБКИ>; //Код ошибки, который бэкенд сервиса отправляет, если для действия пользователя нужна капча

interface ApiCaptchaError {
   error_code: number;
   error_msg: string;
   captcha_sid: string; // Идентификатор сессии капчи
   redirect_uri: string; // Ссылка для запуска виджета капчи, полученная от бэкенда, содержит сессионный токен
}

const handleCaptchaError = async (captchaUrl: string) => { // Обработчик капчи
   try {
      const captchaWidget = new CaptchaWidget();
      const success_token = await captchaWidget.show({ // Метод show() возвращает promise-объект с токеном success_token при успешном прохождении капчи
         container: document.body, // HTML-элемент, в котором будет отображаться виджет капчи
         iframeSrc: captchaUrl, // Ссылка для запуска виджета капчи из параметра redirect_uri
         captchaType: 'type_1', // Тип капчи: 'type_1'
         view: 'popup',  // Вид капчи: 'popup' или 'block'
      });

      fetch('url'); // Повторный запрос на действие пользователя + полученный success_token
   } catch (error) {
      if (error === 'close') {
         // Обработка закрытия капчи пользователем
      }
   }
};

fetch('url') // Пользователь выполняет действие
        .then((response) => response.json())
        .then((data) => { // Проверка кода ошибки
           const error = data.error;

           if (error?.error_code === API_ERROR_CODE_CAPTCHA) { // Если вернулся код ошибки API_ERROR_CODE_CAPTCHA, вызывается обработчик капчи с redirect_uri
              handleCaptchaError(error.redirect_uri);
           }
        });
```