# {heading(Showing the captcha upon frontend request)[id=captcha-connect-web-frontend-first]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Install]} VK Капча SDK.

1. Add the import of the `CaptchaWidget` class and the `CaptchaPublicEvents` object to the frontend:

   {tabs}

   {tab(npm, yarn, pnpm)}
   ```typescript
   import { CaptchaPublicEvents, CaptchaWidget } from "@vkid/captcha"; 
   ```
   {/tab}

   {tab(JS script)}
   ```javascript
   const { CaptchaPublicEvents, CaptchaWidget } = await window.vkidCaptcha; 
   ```
   {/tab}

   {/tabs}

1. Create an instance of the captcha widget:

   ```typescript
   const captchaWidget = new CaptchaWidget();
   ```

1. Subscribe to events using the SDK method {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-events-on)[text=captchaWidget.on()]}.

   {tabs}

   {tab(Invisible captcha)}

   If the service considers the user suspicious, the invisible captcha will be automatically replaced with a visible one. In this case, VK Капча SDK will send the `captcha: challenge visible` event, and after the captcha is completed — the `captcha: challenge hidden` event.

   Example:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
   captchaWidget.on(CaptchaPublicEvents.CHALLENGE_VISIBLE, onChallengeVisible);
   captchaWidget.on(CaptchaPublicEvents.CHALLENGE_HIDDEN, onChallengeHidden);
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {tab(Embedded captcha)}

   If the captcha is embedded in the page, the user needs to complete it before the target action, so the target action button must be blocked until the `captcha: success` event is received.

   Example:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {tab(Popup window)}

   Example:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {/tabs}

1. Get the captcha widget launch link from the {linkto(../../connect-backend#captcha-connect-backend)[text=backend]}.

1. Mount the captcha on the page. Use the SDK method {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-render)[text=captchaWidget.render()]}.

   {tabs}
   
   {tab(Invisible captcha)}

   Set the `invisible` parameter to `true`.

   Example:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru',
      invisible: true,
      notice: { position: 'bottom-left', draggable: true },
   });
   ```
   
   For the invisible captcha, VK Капча SDK will display an automatic data processing notification to the user. 

   {note:warn}
   If you have hidden the VK Капча SDK notification, add your own notification for the user.
   {/note}

   {/tab}

   {tab(Embedded captcha)}

   In the `container` parameter, specify the HTML element or CSS selector to embed the captcha widget into.

   Example:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru',
      container: '<ELEMENT_FOR_EMBEDDING_CAPTCHA>'
   });
   ```

   If the CSS selector does not find any elements, a popup window will be displayed instead of the embedded captcha. This is not considered an error.

   {/tab}

   {tab(Popup window)}

   Do not specify the `container` and `invisible` parameters.

   Example:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru'
   });
   ```

   The captcha will be mounted on the page, but it will not be visible to the user until the target action is called.

   {/tab}

   {/tabs}

1. Call the SDK method {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-execute)[text=captchaWidget.execute()]} on the target action.

   The method will return a promise object with the captcha completion result: a successful captcha completion token if the user passed the captcha, or an error.

1. Process the captcha completion result:

   - If the promise object contains a successful captcha completion token, send it to the backend for validation.
   - Determine what will happen in the frontend if the promise object returns an error. Error codes are described in the article {linkto(../../../concepts/reference-sdk/reference-sdk-web#captcha-concepts-reference-sdk-web)[text=%text]}.

1. (Optional) For a single-page application (SPA, Single Page Application), where screens change without reloading the page, use the SDK method {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-destroy)[text=captchaWidget.destroy()]} to remove the previous captcha from the page.

TypeScript code examples:

{tabs}

{tab(Invisible captcha)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Set up subscriptions before mounting to avoid losing early events
captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
captchaWidget.on(CaptchaPublicEvents.CHALLENGE_VISIBLE, onChallengeVisible);
captchaWidget.on(CaptchaPublicEvents.CHALLENGE_HIDDEN, onChallengeHidden);
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Mounting the captcha on the page
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru',
   invisible: true,
   notice: { position: 'bottom-left', draggable: true },
});

// Target action
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{tab(Embedded captcha)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Set up subscriptions before mounting to avoid losing early events
captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Mounting — once per page load
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru',
   container: '<ELEMENT_FOR_EMBEDDING_CAPTCHA>'
});

// Target action
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{tab(Popup window)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Set up subscriptions before mounting to avoid losing early events
captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Mounting — once per page load
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru'
});

// Target action
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{/tabs}