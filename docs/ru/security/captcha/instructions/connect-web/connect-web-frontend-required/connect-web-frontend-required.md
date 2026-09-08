# {heading(Показ капчи по запросу фронтенда)[id=captcha-connect-web-frontend-first]}

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Установите]} VK Капча SDK.

1. Добавьте во фронтенд импорт класса `CaptchaWidget` и объекта `CaptchaPublicEvents`:

   {tabs}

   {tab(npm, yarn, pnpm)}
   ```typescript
   import { CaptchaPublicEvents, CaptchaWidget } from "@vkid/captcha"; 
   ```
   {/tab}

   {tab(JS-скрипт)}
   ```javascript
   const { CaptchaPublicEvents, CaptchaWidget } = await window.vkidCaptcha; 
   ```
   {/tab}

   {/tabs}

1. Создайте экземпляр виджета капчи:

   ```typescript
   const captchaWidget = new CaptchaWidget();
   ```

1. Подпишитесь на события с помощью {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-events-on)[text=метода SDK]} `captchaWidget.on()`.

   {tabs}

   {tab(Невидимая капча)}

   Если сервис оценит пользователя как подозрительного, невидимая капча будет автоматически заменена на видимую. При этом VK Капча SDK отправит событие `captcha: challenge visible`, а после прохождения капчи — `captcha: challenge hidden`.

   Пример:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
   captchaWidget.on(CaptchaPublicEvents.CHALLENGE_VISIBLE, onChallengeVisible);
   captchaWidget.on(CaptchaPublicEvents.CHALLENGE_HIDDEN, onChallengeHidden);
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {tab(Встроенная капча)}

   Если капча встроена на страницу, пользователю нужно пройти ее до целевого действия, поэтому кнопка целевого действия должна быть заблокирована до получения события `captcha: success`.

   Пример:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {tab(Всплывающее окно)}

   Пример:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {/tabs}

1. Получите от {linkto(../../connect-backend#captcha-connect-backend)[text=бэкенда]} ссылку для запуска виджета капчи.

1. Монтируйте капчу на страницу. Воспользуйтесь {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-render)[text=методом SDK]} `captchaWidget.render()`.

   {tabs}
   
   {tab(Невидимая капча)}

   В параметре `invisible` укажите значение `true`.

   Пример:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru',
      invisible: true,
      notice: { position: 'bottom-left', draggable: true },
   });
   ```
   
   Для невидимой капчи VK Капча SDK отобразит пользователю автоматическое уведомление об обработке данных. 

   {note:warn}
   Если вы скрыли уведомление от VK Капча SDK, добавьте для пользователя собственное уведомление.
   {/note}

   {/tab}

   {tab(Встроенная капча)}

   В параметре `container` укажите HTML-элемент или CSS-селектор, в который нужно встроить виджет капчи.

   Пример:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru',
      container: '<ЭЛЕМЕНТ_ДЛЯ_ВСТРАИВАНИЯ_КАПЧИ>'
   });
   ```

   Если CSS-селектор не найдет элементов, вместо встроенной капчи отобразится всплывающее окно. Это не считается ошибкой.

   {/tab}

   {tab(Всплывающее окно)}

   Параметры `container` и `invisible` не указывайте.

   Пример:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru'
   });
   ```

   Капча будет смонтирована на страницу, но не видна пользователю до вызова целевого действия.

   {/tab}

   {/tabs}

1. На целевом действии вызовите {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-execute)[text=метод SDK]} `captchaWidget.execute()`.

   Метод вернет promise-объект с результатом прохождения капчи: токен успешного прохождения капчи, если пользователь прошел капчу, или ошибку.

1. Обработайте результат прохождения капчи:

   - Если promise-объект содержит токен успешного прохождения капчи, отправьте его бэкенду для валидации.
   - Определите, что будет происходить во фронтенде в случае, когда promise-объект вернул ошибку. Коды ошибок описаны в статье {linkto(../../../concepts/reference-sdk/reference-sdk-web#captcha-concepts-reference-sdk-web)[text=%text]}.

1. (Опционально) Для одностраничного приложения (SPA, Single Page Application), где экраны сменяются без перезагрузки страницы, используйте {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-destroy)[text=метод SDK]} `captchaWidget.destroy()`, чтобы убрать предыдущую капчу со страницы.

Примеры кода на TypeScript:

{tabs}

{tab(Невидимая капча)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Подписки ставим до монтажа, чтобы не потерять ранние события
captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
captchaWidget.on(CaptchaPublicEvents.CHALLENGE_VISIBLE, onChallengeVisible);
captchaWidget.on(CaptchaPublicEvents.CHALLENGE_HIDDEN, onChallengeHidden);
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Монтаж капчи на страницу
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru',
   invisible: true,
   notice: { position: 'bottom-left', draggable: true },
});

// Целевое действие
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{tab(Встроенная капча)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Подписки ставим до монтажа, чтобы не потерять ранние события
captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Монтаж — один раз на загрузку страницы
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru',
   container: '<ЭЛЕМЕНТ_ДЛЯ_ВСТРАИВАНИЯ_КАПЧИ>'
});

// Целевое действие
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{tab(Всплывающее окно)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Подписки ставим до монтажа, чтобы не потерять ранние события
captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Монтаж — один раз на загрузку страницы
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru'
});

// Целевое действие
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{/tabs}