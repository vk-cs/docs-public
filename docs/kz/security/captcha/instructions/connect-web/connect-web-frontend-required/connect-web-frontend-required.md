# {heading(Фронтенд сұрауы бойынша капча көрсету)[id=captcha-connect-web-frontend-first]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. {linkto(../connect-web-install#captcha-connect-web-install)[text=Орнатыңыз]} VK Капча SDK.

1. Фронтендке `CaptchaWidget` класын және `CaptchaPublicEvents` объектісін импорттау қосыңыз:

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

1. Капча виджетінің данасын жасаңыз:

   ```typescript
   const captchaWidget = new CaptchaWidget();
   ```

1. SDK әдісі {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-events-on)[text=captchaWidget.on()]} көмегімен оқиғаларға жазылыңыз.

   {tabs}

   {tab(Көрінбейтін капча)}

   Сервис пайдаланушыны күдікті деп бағаласа, көрінбейтін капча автоматты түрде көрінетін капчамен ауыстырылады. Бұл ретте VK Капча SDK `captcha: challenge visible` оқиғасын, ал капчадан өткеннен кейін — `captcha: challenge hidden` оқиғасын жібереді.

   Мысал:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
   captchaWidget.on(CaptchaPublicEvents.CHALLENGE_VISIBLE, onChallengeVisible);
   captchaWidget.on(CaptchaPublicEvents.CHALLENGE_HIDDEN, onChallengeHidden);
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {tab(Кірістірілген капча)}

   Капча бетке кірістірілген болса, пайдаланушы оны мақсатты әрекетке дейін өтуі керек, сондықтан мақсатты әрекет түймесі `captcha: success` оқиғасын алғанға дейін блокталған болуы тиіс.

   Мысал:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {tab(Қалқымалы терезе)}

   Мысал:

   ```typescript
   captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
   captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);
   ```

   {/tab}

   {/tabs}

1. {linkto(../../connect-backend#captcha-connect-backend)[text=Бэкендтен]} капча виджітін іске қосу сілтемесін алыңыз.

1. Капчаны бетке монтаждаңыз. SDK әдісі {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-render)[text=captchaWidget.render()]} қолданыңыз.

   {tabs}

   {tab(Көрінбейтін капча)}

   `invisible` параметрінде `true` мәнін көрсетіңіз.

   Мысал:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru',
      invisible: true,
      notice: { position: 'bottom-left', draggable: true },
   });
   ```

   Көрінбейтін капча үшін VK Капча SDK пайдаланушыға деректерді өңдеу туралы автоматты хабарлама көрсетеді.

   {note:warn}
   Егер VK Капча SDK хабарламасын жасырсаңыз, пайдаланушыға өз хабарламаңызды қосыңыз.
   {/note}

   {/tab}

   {tab(Кірістірілген капча)}

   `container` параметрінде капча виджетін кірістіру қажет HTML-элементті немесе CSS-селекторды көрсетіңіз.

   Мысал:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru',
      container: '<КАПЧА_КІРІСТІРІЛЕТІН_ЭЛЕМЕНТ>'
   });
   ```

   Егер CSS-селектор элементтерді таппаса, кірістірілген капча орнына қалқымалы терезе көрсетіледі. Бұл қате саналмайды.

   {/tab}

   {tab(Қалқымалы терезе)}

   `container` және `invisible` параметрлерін көрсетпеңіз.

   Мысал:

   ```typescript
   await captchaWidget.render({
      link,
      lang: 'ru'
   });
   ```

   Капча бетке монтаждалады, бірақ мақсатты әрекет шақырылғанға дейін пайдаланушыға көрінбейді.

   {/tab}

   {/tabs}

1. Мақсатты әрекетте SDK әдісі {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-execute)[text=captchaWidget.execute()]} шақырыңыз.

   Әдіс капчадан өту нәтижесі бар promise-объектіні қайтарады: пайдаланушы капчадан өтсе — капчаны сәтті өту токенін, әйтпесе — қатені.

1. Капчадан өту нәтижесін өңдеңіз:

   - Егер promise-объектіде капчаны сәтті өту токені болса, оны валидациялау үшін бэкендке жіберіңіз.
   - Promise-объекті қате қайтарған жағдайда фронтендте не болатынын анықтаңыз. Қате коддары {linkto(../../../concepts/reference-sdk/reference-sdk-web#captcha-concepts-reference-sdk-web)[text=%text]} мақаласында сипатталған.

1. (Қалауыңыз бойынша) Бет қайта жүктелмей экрандар ауысатын бір беттік қосымша (SPA, Single Page Application) үшін алдыңғы капчаны беттен алу үшін SDK әдісі {linkto(../../../concepts/reference-sdk/reference-sdk-web#reference-sdk-web-destroy)[text=captchaWidget.destroy()]} қолданыңыз.

TypeScript тіліндегі код мысалдары:

{tabs}

{tab(Көрінбейтін капча)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Жазылу монтажқа дейін қоямыз, ерте оқиғаларды жоғалтпау үшін
captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
captchaWidget.on(CaptchaPublicEvents.CHALLENGE_VISIBLE, onChallengeVisible);
captchaWidget.on(CaptchaPublicEvents.CHALLENGE_HIDDEN, onChallengeHidden);
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Капчаны бетке монтаждау
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru',
   invisible: true,
   notice: { position: 'bottom-left', draggable: true },
});

// Мақсатты әрекет
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{tab(Кірістірілген капча)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Жазылу монтажқа дейін қоямыз, ерте оқиғаларды жоғалтпау үшін
captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Монтаж — бет жүктелгенде бір рет
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru',
   container: '<КАПЧА_КІРІСТІРІЛЕТІН_ЭЛЕМЕНТ>'
});

// Мақсатты әрекет
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{tab(Қалқымалы терезе)}

```typescript
import { CaptchaPublicEvents, CaptchaWidget } from '@vkid/captcha';

const captchaWidget = new CaptchaWidget();

// Жазылу монтажқа дейін қоямыз, ерте оқиғаларды жоғалтпау үшін
captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
captchaWidget.on(CaptchaPublicEvents.TOKEN_EXPIRED, onTokenExpired);

// Монтаж — бет жүктелгенде бір рет
const { link } = await api.post('/api/captcha/session');
await captchaWidget.render({
   link,
   lang: 'ru'
});

// Мақсатты әрекет
async function onSubmit({ login, password }: Credentials) {
   const captchaToken = await captchaWidget.execute();
   await api.post('/api/login', { login, password, captchaToken });
}
```

{/tab}

{/tabs}