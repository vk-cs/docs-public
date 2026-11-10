# {heading(Веб-қосымшаларға арналған SDK анықтамалығы)[id=captcha-concepts-reference-sdk-web]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Жүйелік талаптар)[id=reference-sdk-web-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-browser]}

## {heading(Капчаны орнату)[id=reference-sdk-web-render]}

`captchaWidget.render()` әдісі капчаны бетке орнатады және капча қызметін іске қосады. Әдіс беттің әр жүктелуінде бір рет шақырылады.

Әдісті шақыру мысалы:

```typescript
await captchaWidget.render({
   link: captchaLink,
   lang: 'ru',
   invisible: true,
});
```

Әдіс параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`link`
|![](../../../../../assets/check.svg "inline")
|`string`
|Капча виджетін іске қосуға арналған сілтеме, {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы `link` параметрінде алынған. Сессиялық токен мен метадеректерді қамтиды:

- `domain` — капча қолданылатын домен;
- `session_token` — сессиялық токен;
- `variant` — капчаның көрсетілу түрі (`block` немесе `popup`)

|`invisible`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|{linkto(../../about#captcha-about-types)[text=көрінбейтін капча]} белгісі. Мүмкін мәндер:

- `true` — көрінбейтін капча, тексеру фондық режимде жүреді және `captchaWidget.execute()` әдісімен іске қосылады;
- `false` — көрінетін капча

|`container`
|![](../../../../../assets/no.svg "inline")
|`HTMLElement` \| `string`
|Капча ендірілетін HTML-элемент немесе CSS-селектор. Көрсетілмесе, капча {linkto(#reference-sdk-web-execute)[text=captchaWidget.execute()]} әдісі арқылы беттің үстінде қалқымалы терезеде көрсетіледі.

Егер CSS-селектор элементтерді таппаса, ендірілген капчаның орнына қалқымалы терезе көрсетіледі. Бұл қате емес

|`lang`
|![](../../../../../assets/no.svg "inline")
|`string`
|Капча тапсырмасының және деректерді өңдеу туралы хабарламаның локализация тілі. Көрсетілмесе, браузер тілі қолданылады. Егер браузер тілі қызметке белгісіз болса, тапсырма тілі серверде анықталады, ал хабарлама орыс тілінде көрсетіледі. Мүмкін мәндер:

- `ru` — орысша;
- `be` — беларусша;
- `de` — немісше;
- `en` — ағылшынша;
- `es` — испанша;
- `fr` — французша;
- `kk` — қазақша;
- `pl` — поляқша;
- `tr` — түрікше;
- `uk` — украинша;
- `uz` — өзбекше;
- `zh` — қытайша

|`scheme`
|![](../../../../../assets/no.svg "inline")
|`string`
|Капча виджетінің түс схемасы. Мүмкін мәндер:

- `light` — ашық;
- `dark` — қараңғы.

Әдепкі бойынша капча интеграцияланған беттің немесе қосымшаның түс схемасына сәйкес келеді

|`notice`
|![](../../../../../assets/no.svg "inline")
|`object`
|Деректерді өңдеу туралы хабарлама параметрлері. Хабарлама тек `invisible: true` кезінде көрсетіледі. Хабарламадағы мәтінді мен сілтемені өзгертуге болмайды, себебі бұл заңды хабарлама

|`notice`.`position`
|![](../../../../../assets/no.svg "inline")
|`string`
|Хабарлама көрсетілетін беттің бұрышы. Мүмкін мәндер:

- `bottom-right` — төменгі оң жақ (әдепкі);
- `bottom-left` — төменгі сол жақ;
- `top-right` — жоғарғы оң жақ;
- `top-left` — жоғарғы сол жақ

|`notice`.`hidden`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Хабарламаны жасыру белгісі. Мүмкін мәндер:

- `true` — хабарлама жасырылған;
- `false` — хабарлама көрсетіледі (әдепкі).
Егер деректерді өңдеу туралы хабарлама жасырылған болса, өз хабарламаңызды қосыңыз

|`notice`.`draggable`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Хабарламаны экран жиегі бойымен жылжыту белгісі. Таңдалған орын осы доменде сақталады. Мүмкін мәндер:

- `true` — жылжытуға рұқсат етілген;
- `false` — жылжытуға тыйым салынған (әдепкі)

|`slowLoadAfter`
|![](../../../../../assets/no.svg "inline")
|`number`
|Капча виджеті әлі жүктелмеген оқиға жіберілетін уақыт, миллисекундпен. Әдепкі мәні — `10000`. Осы уақыт өткеннен кейін VK Капча SDK `captcha: load slow` оқиғасын жібереді. Оқиғаны жіберу капчаның жүктелуін тоқтатпайды
|===

Әдіс капча дайындығы бар promise-объектіні қайтарады:

```console
promise resolve
promise reject <ҚАТЕЛІК>
```

Қате кодтары:

[cols="3,7", options="header", width=100%]
|===
|Код 
|Себебі

|`invalid_link` 
|Капча виджетін іске қосу сілтемесінің қатесі

|`mount_failed` 
|Капчаны бетке орнату мүмкін болмады

|`already_initialized` 
|`captchaWidget.render()` әдісі бұрыннан шақырылған

|`failed` 
|Капча қызметі қате туралы хабарлады

|`close` 
|Пайдаланушы капчаны жапқан

|`destroyed` 
|Капча `captchaWidget.destroy()` әдісімен беттен алынған
|===

## {heading(Пайдаланушыны тексеруді іске қосу)[id=reference-sdk-web-execute]}

`captchaWidget.execute()` әдісі:

- пайдаланушыны тексеруді іске қосады;
- егер {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісінде көрсетілген болса, капчасы бар қалқымалы терезені көрсетеді;
- бэкендке беру үшін капчаны сәтті өткен токенін қайтарады.

Әдіс орнатылған әр капча-сессияға бір рет шақырылады. Әдетте ол пайдаланушының мақсатты әрекетіне, мысалы, форманы жіберуға жауап ретінде іске қосылады, біреу оны капчаны бастаған бэкендтің жауабы бойынша да шақыруға болады.

Капча-сессия алғашқы тексеруде жұмсалады: сәтті тексеруден кейін әдісті қайта шақыру `already_checked` қатесімен қабылданбайды. Сол жүктелуде келесі тексеруді бастау үшін капчаны {linkto(#reference-sdk-web-destroy)[text=captchaWidget.destroy()]} әдісімен алып тастаңыз және оны {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы жаңа сілтемемен {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісімен қайта орнатыңыз.

Әдісті шақыру мысалы:

```typescript
const successToken = await captchaWidget.execute();
```

`captchaWidget.execute()` әдісінің параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`timeout`
|![](../../../../../assets/no.svg "inline")
|`number`
|Капча қызметінің жауабын күту уақыты, миллисекундпен. Әдепкі мәні — `10000`.

Есептеу әдіс шақырылған сәттен басталады. Егер капча әлі жүктеліп жатса, жүктелуді күту тайм-аутқа кіреді.

Тайм-аут аяқталғаннан кейін promise-объект `timeout` қатесімен қабылданбайды, бірақ капча бетте қалады: `captchaWidget.execute()` әдісінің келесі шақыруы капча жүктелген бойда капча қызметіне жіберіледі.

Егер капча көрінетін тапсырмаға айналса, тайм-аут алынады, пайдаланушы тапсырманы уақыт шектеусіз шешеді
|===

Әдіс тексеру нәтижесі бар promise-объектіні қайтарады:

```console
promise resolve <КАПЧАНЫ ӨТУ ТОКЕНІ>
promise reject <ҚАТЕЛІК>
```

Мұнда:

- `<КАПЧАНЫ ӨТУ ТОКЕНІ>` — пайдаланушы капчадан өткен жағдайдағы сәтті өту токені;
- `<ҚАТЕЛІК>` — қате коды.

Қате кодтары:

[cols="3,7", options="header", width=100%]
|===
|Код
|Себебі

|`not_initialized` 
|`captchaWidget.render()` әдісі шақырылмаған немесе қатемен аяқталған 

|`not_passed` 
|Пайдаланушы капчамен өзара әрекеттеспеген

|`timeout` 
|Тексеруге жауап белгіленген уақытта келмеген 

|`token_expired` 
|Токеннің қолданылу мерзімі аяқталған

|`failed` 
|Тексеру сәтсіз өткен немесе капча виджетінің қатесі

|`already_checked` 
|Тексеру бұрыннан өтілген

|`close` 
|Пайдаланушы капчаны жапқан

|`destroyed` 
|Капча `captchaWidget.destroy()` әдісімен беттен алынған
|===

## {heading(Оқиғаларға жазылу)[id=reference-sdk-web-events-on]}

Оқиғаларға жазылу үшін `captchaWidget.on()` әдісі қолданылады. Оқиға атаулары `CaptchaPublicEvents` объектісінің қасиеттері ретінде қолжетімді.

Әдісті шақыру мысалы:

```typescript
import { CaptchaPublicEvents } from '@vkid/captcha';

captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
```

Жазылға болатын оқиғалар:

[cols="3,2,5", options="header", width=100%]
|===
|Оқиға 
|Деректер 
|Қашан жіберіледі 

|`captcha: success` 
|`{ token }` 
|Тексеру өтілді. Ендірілген құсбелгіде — жалауша басылған сәтте

|`captcha: challenge visible` 
|![](../../../../../assets/no.svg "inline")
|Көрінбейтін тексеру көрінетін тапсырмаға айналды 

|`captcha: challenge hidden` 
|![](../../../../../assets/no.svg "inline")
|Көрінетін тапсырма жиналды 

|`captcha: token expired` 
|![](../../../../../assets/no.svg "inline") 
|Токеннің қолданылу мерзімі аяқталды, оны бэкендке жіберу енді мағынасыз 

|`captcha: load slow` 
|`{ slowLoadAfter }` 
|Капча қосымшасының жүктелуі `captchaWidget.render()` әдісінде көрсетілген `slowLoadAfter` шегінен ұзаққа созылып жатыр. Бұл қате емес, капча жүктелуін жалғастырады
|===

{note:warn}
Оқиғаларға `captchaWidget.render()` әдісін шақырар алдында жазылыңыз, әйтпесе ерте оқиғалар жоғалады.
{/note}

Ескірген {linkto(#reference-sdk-web-show)[text=captchaWidget.show()]} әдісін қолданғанда оқиғалар жіберілмейді. Нәтиже тек әдістің promise-объектісі арқылы келеді.

## {heading(Оқиғалардан жазылудан бас тарту)[id=reference-sdk-web-events-off]}

Оқиғаларға жазылудан бас тарту үшін `captchaWidget.off()` әдісін қолданыңыз.

Әдісті шақыру мысалы:

```typescript
import { CaptchaPublicEvents } from '@vkid/captcha';

captchaWidget.off(CaptchaPublicEvents.SUCCESS, onSuccess);
```

{note:warn}
{linkto(#reference-sdk-web-events-on)[text=captchaWidget.on()]} әдісінде берген сол өңдеу функциясын беріңіз. Онсыз жазылудан бас тарту орындалмайды.
{/note}

## {heading(Капчаны жасыру)[id=reference-sdk-web-hide-popup]}

`captchaWidget.hidePopup()` әдісі тексеруді үзбестен капча виджетін жасырады. Қызмет жұмысын жалғастырады, виджетті қайта көрсету бірден орындалады. Әдіс жауапта ештеңе қайтармайды.

Әдісті шақыру мысалы:

```typescript
captchaWidget.hidePopup();
```

## {heading(Капчаны көрсету)[id=reference-sdk-web-show-popup]}

`captchaWidget.showPopup()` әдісі капча виджетін экранға қайтарады. Бұл кезде тексерудің өтуі мен күйі ысырылмайды. Әдіс жауапта ештеңе қайтармайды.

VK Капча SDK бұл әдісті көрінбейтін тексеру көрінетін тапсырмаға айналғанда автоматты түрде шақырады.

Әдісті шақыру мысалы:

```typescript
captchaWidget.showPopup();
```

## {heading(Капчаны жабу)[id=reference-sdk-web-close]}

`captchaWidget.close()` әдісі капча виджетін жабады. Әдіс жауапта ештеңе қайтармайды.

Әдісті шақыру мысалы:

```typescript
captchaWidget.close();
```

## {heading(Капчаны беттен алу)[id=reference-sdk-web-destroy]}

`captchaWidget.destroy()` әдісі капчаны беттен алып, виджетті бастапқы күйге қайтарады: одан кейін сол бет жүктелуінде келесі капчаны {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісімен орнатуға болады. Әдіс жауапта ештеңе қайтармайды.

Әдіс беттері бетті қайта жүктестірілмей ауысатын бірбеткей қосымшаларға (SPA, Single Page Application) қажет. Бұл жағдайда капча экрандың өмірлік циклына байланады: экран пайда болғанда {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісі шақырылады, ал осы экраннан кеткенде — `captchaWidget.destroy()`. Әр экранда өз капча-сессиясы және өз сілтемесі болады. Егер келесі экранда да `captchaWidget.destroy()` шақырылмай тұрып {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісі шақырылса, promise-объект `already_initialized` қатесімен қабылданбайды.

Әр экранға өз `CaptchaWidget` данасы қажет. Бетте бір уақытта капчаның тек бір данасы жұмыс істеуі керек. Экрандар арасында ауысқанда алдымен ағымдағы данада `captchaWidget.destroy()` әдісін шақырыңыз, содан кейін жаңа дананы жасап, орнатыңыз.

Келесі капчаға арналған сілтеме жаңа болуы керек: капча-сессия алғашқы тексеруде жұмсалады. Жаңа сілтемені {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісімен сұраңыз. Сілтемені қосымша күйінде кештеуге болмайды: келесі экранда капча орнатылады, бірақ тексеру мерзімі өткен токен қайтарады. Сілтемені {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісін шақыратын сол кодта сұраңыз.

Promise-объектінің `destroyed` қатесімен қабылданбауын өңдеңіз. `captchaWidget.destroy()` әдісі {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} және {linkto(#reference-sdk-web-execute)[text=captchaWidget.execute()]} әдістерінің аяқталмаған promise-объектілерін `destroyed` қатесімен қабылданбайды етеді. React StrictMode режимінде әсер (эффект) әзірлеу режимінде екі рет орындалады, сондықтан {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісінің алғашқы шақырылуы әрқашан қабылданбайды — консольде бұл өңделмеген promise-объект қабылданбауы ретінде көрінеді.

{linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісін шақырар алдында экранның әлі белсенді екенін тексеріңіз. Сілтеме сұратылып, бэкенд жауап берген аралықта пайдаланушы экраннан кетуі мүмкін. Одан кейін шақырылған `captchaWidget.destroy()` ештеңе жасамайды, себебі капча әлі орнатылмаған, ал оның артынша шақырылған {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} әдісі оны тастап кетілген экранға орнатады.

VK Капча SDK капчаның алынғаны туралы оқиға жібермейді.

Әдісті шақыру мысалы:

```typescript
let captchaWidget: CaptchaWidget | undefined;
let isScreenActive = false;

// Экран пайда болды. React-те — капча орналасқан компоненттің әсері
async function mountCaptcha() {
    isScreenActive = true;
    captchaWidget = new CaptchaWidget();
    captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
    const { link } = await api.post('/api/captcha/session', { client });
    // Пайдаланушы бэкенд жауап бергенше экраннан кетуі мүмкін еді
    if (!isScreenActive) {
        return;
    }
    // Жүктелер алдында экраннан кету promise-объектіні destroyed кодымен қабылданбайды етеді
    await captchaWidget.render({ link, lang: 'ru', invisible: true }).catch(handleRenderError);
}

// Экраннан кету. React-те — сол әсерді тазарту функциясы
function unmountCaptcha() {
    isScreenActive = false;
    captchaWidget?.destroy();
}
```

## {heading(Капчаны пайдаланушыға көрсету)[id=reference-sdk-web-show]}

`captchaWidget.show()` әдісі капча виджетін веб-қосымшада пайдаланушыға көрсетеді және пайдаланушыны тексеру қажеттілігі туралы шешімді бэкенд қабылдайтын жағдайларда қолданылады. Капча виджеті қалқымалы терезеде (`iframe`) көрсетіледі.

Әдіс параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`container`
|![](../../../../../assets/check.svg "inline")
|`HTMLElement`
|Капчасы бар виджетті көрсету қажет HTML-элемент

|`view`
|![](../../../../../assets/check.svg "inline")
|`string`
|Капча түрі. Мүмкін мәндер:

- `popup` — қалқымалы терезе;
- `block` — блок

|`link`
|![](../../../../../assets/no.svg "inline")
|`string`
|Капча виджетін іске қосуға арналған сілтеме, {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы `link` параметрінде алынған. 

Ескірген `iframeSrc` параметрін ауыстырады. Екі параметрдің біреуі көрсетілуі керек.

|`iframeSrc`
|![](../../../../../assets/no.svg "inline")
|`string`
|Ескірген параметр, үйлесімділік үшін қалдырылған. Жаңа параметр — `link`. Екі параметрдің біреуі көрсетілуі керек. 

Қосымшаңыздың фронтендіндегі виджетті іске қосу сілтемесі, {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы `link` параметрінде алынған. Сессиялық токен мен метадеректерді қамтиды:

- `domain` — капча қолданылатын домен;
- `session_token` — сессиялық токен;
- `variant` — капчаның көрсетілу түрі (`block` немесе `popup`)

|`captchaType`
|![](../../../../../assets/no.svg "inline")
|`string`
|Капча түрі. Мүмкін мәні — `type_1` (әдепкі)

|`autofocus`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Капчаның автофокус белгісі. Тек `view` аргументіндегі `block` мәні үшін қолданылады. Мүмкін мәндер:

- `true` — автофокус қосулы (әдепкі). Беттегі фокус капчасы бар веб-элементке ауыстырылады.
- `false` — автофокус өшірулі. Беттегі фокус капчасы бар веб-элемент пайда болғанға дейінгі орында қалады

|`scheme`
|![](../../../../../assets/no.svg "inline")
|`string`
|Капчасы бар виджеттің түс схемасы. Мүмкін мәндер:

- `light` — ашық;
- `dark` — қараңғы.

Әдепкі бойынша капча интеграцияланған беттің немесе қосымшаның түс схемасына сәйкес келеді

|`lang`
|![](../../../../../assets/no.svg "inline")
|`string`
|Локализация тілі. Көрсетілмесе, мән серверде анықталады. Мүмкін мәндер:

- `ru` — орысша;
- `be` — беларусша;
- `de` — немісше;
- `en` — ағылшынша;
- `es` — испанша;
- `fr` — французша;
- `kk` — қазақша;
- `pl` — поляқша;
- `tr` — түрікше;
- `uk` — украинша;
- `uz` — өзбекше;
- `zh` — қытайша

|`onClose`
|![](../../../../../assets/no.svg "inline")
|`() => void`
|Капча жабылған туралы callback-хабарлама
|===

Әдіс капчаны өту нәтижесі бар promise-объектіні қайтарады:

```console
promise resolve <КАПЧАНЫ ӨТУ ТОКЕНІ> 
promise reject <ҚАТЕЛІК>
```

Мұнда:

- `<КАПЧАНЫ ӨТУ ТОКЕНІ>` — пайдаланушы капчадан өткен жағдайдағы сәтті өту токені;
- `<ҚАТЕЛІК>` — пайдаланушы капча терезесін жапса, `close` қатесі.