# {heading(Android үшін SDK анықтамалығы)[id=captcha-concepts-reference-sdk-android]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Жүйелік талаптар)[id=reference-sdk-android-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-android]}

## {heading(Капчаны көрсету)[id=reference-sdk-android-show]}

`VKCaptcha.openCaptcha()` әдісі капчаны Android-қосымшасында пайдаланушыға көрсетеді. Капча `Activity` ретінде көрсетіледі және қосымшаның навигациясына интеграцияланады.

Әдіс параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`domain`
|![](../../../../../assets/check.svg "inline")
|`string`
|Капчадан өткеннен кейін токен алу үшін домен. `redirectUri`-де көрсетілген доменге сәйкес болуы тиіс

|`redirectUri`
|![](../../../../../assets/check.svg "inline")
|`string`
|Қосымшаңыздың фронтендінде капча виджетін іске қосуға арналған сілтеме, {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы `link` параметрінде алынған. Сеанс токенін және метадеректерді қамтиды:

- `domain` — капча қолданылатын домен;
- `session_token` — сеанс токені;
- `variant` — капчаның көрсетілу түрі (`block` немесе `popup`)

|`listener`
|![](../../../../../assets/check.svg "inline")
|`VKCaptchaResultListener`
|Кері байланыс функциясы (callback), капчадан өту аяқталғаннан кейін шақырылады

|===

Әдісті шақыру мысалы:

```kotlin
VKCaptcha.openCaptcha(
domain = domain,
redirectUri = captchaUrl,
listener = listener
)
```

## {heading(Капчадан өту нәтижесін алу)[id=reference-sdk-android-result]}

`VKCaptchaResultListener` интерфейсі капчадан өту нәтижесін қайтарады.

Мысал:

```kotlin
interface VKCaptchaResultListener {
    fun onResult(result: VKCaptchaResult) {
        when (result) {
            is VKCaptchaResult.Success -> {
                val token = result.token
                repeatRequest(token)
            }
            is VKCaptchaResult.Error -> {
                // Қатені немесе капчаны жабуды өңдеу
            }
        }
    }    
}
```

Мұнда:

- `VKCaptchaResult` — капчадан өту нәтижесі бар sealed-клас:

  - `VKCaptchaResult.Success` капчадан сәтті өту токенін (`token: String`) және капча орындалған доменді (`domain: String?`) қайтарады;
  - `VKCaptchaResult.Error` капчадан өту кезінде орын алған қатені (`error: VKCaptchaError`) және капча орындалған доменді (`domain: String?`) қайтарады.

- `VKCaptchaError` — капчадан өту кезінде орын алатын қателері бар sealed-клас:

  - `NetworkError(message, error)` — желі қатесі;
  - `IllegalArgumentError(message)` — берілген параметрлердегі қате;
  - `Cancelled()` — капчаны пайдаланушы жаып тастаған;
  - `WebviewIsUpdatingError(message, error)` — System WebView жаңарту кезіндегі қате.

## {heading(Капчаны жабу)[id=reference-sdk-android-close]}

`VKCaptcha.closeCaptcha()` әдісі капча виджетін жабады. Ол `VKCaptchaError.Cancelled` қатесімен `onResult` шақырады.

Әдісті шақыру мысалы:

```kotlin
VKCaptcha.closeCaptcha()
```

## {heading(Капчадан сәтті өту токенін алу)[id=reference-sdk-android-token]}

`VKCaptcha.getToken()` әдісі капчадан сәтті өту токенін қайтарады.

Әдісті шақыру мысалы:

```kotlin
val token = VKCaptcha.getToken("<ДОМЕН>")
```

## {heading(Капча тілін таңдау)[id=reference-sdk-android-lang]}

`VKCaptcha.setLocale()` әдісі капчаның локализация тілін орнатады. Әдепкі бойынша жүйелік тіл қолданылады.

Мүмкін мәндер:

- `ru` — орыс;
- `be` — белорус;
- `de` — неміс;
- `en` — ағылшын;
- `es` — испан;
- `fr` — француз;
- `kk` — қазақ;
- `pl` — поляк;
- `tr` — түрік;
- `uk` — украин;
- `uz` — өзбек.

Әдісті шақыру мысалы:

```kotlin
VKCaptcha.setLocale(Locale("ru"))
```