# {heading(Справочник SDK для Android)[id=captcha-concepts-reference-sdk-android]}

## {heading(Системные требования)[id=reference-sdk-android-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-android]}

## {heading(Отобразить капчу)[id=reference-sdk-android-show]}

Метод `VKCaptcha.openCaptcha()` отображает капчу пользователю в Android-приложении. Капча отображается как `Activity` и интегрируется в навигацию приложения.

Параметры метода:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Обязательный
|Тип
|Описание

|`domain`
|![](../../../../../assets/check.svg "inline")
|`string`
|Домен для получения токена после прохождения капчи. Должен соответствовать домену, указанному в `redirectUri`

|`redirectUri`
|![](../../../../../assets/check.svg "inline")
|`string`
|Ссылка для запуска виджета капчи во фронтенде вашего приложения, полученная в параметре `link` в ответе {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=метода]} `GET /captchaNotRobot.createSession`. Содержит сессионный токен и метаданные:

- `domain` — домен, на котором будет использована капча;
- `session_token` — сессионный токен;
- `variant` — вид отображения капчи (`block` или `popup`)

|`listener`
|![](../../../../../assets/check.svg "inline")
|`VKCaptchaResultListener`
|Функция обратного вызова (callback), вызывается после завершения прохождения капчи

|===

Пример вызова метода:

```kotlin
VKCaptcha.openCaptcha(
domain = domain,
redirectUri = captchaUrl,
listener = listener
)
```

## {heading(Получить результат прохождения капчи)[id=reference-sdk-android-result]}

Интерфейс `VKCaptchaResultListener` возвращает результат прохождения капчи.

Пример:

```kotlin
interface VKCaptchaResultListener {
    fun onResult(result: VKCaptchaResult) {
        when (result) {
            is VKCaptchaResult.Success -> {
                val token = result.token
                repeatRequest(token)
            }
            is VKCaptchaResult.Error -> {
                // Обработка ошибки или закрытия капчи
            }
        }
    }    
}
```

Здесь:

- `VKCaptchaResult` — sealed-класс с результатом прохождения капчи:

  - `VKCaptchaResult.Success` возвращает токен успешного прохождения капчи (`token: String`) и домен, где выполнялась капча (`domain: String?`);
  - `VKCaptchaResult.Error` возвращает ошибку, возникшую при прохождении капчи (`error: VKCaptchaError`) и домен, где выполнялась капча (`domain: String?`).

- `VKCaptchaError` — sealed-класс с ошибками, возникающими при прохождении капчи:

  - `NetworkError(message, error)` — ошибка сети;
  - `IllegalArgumentError(message)` — ошибка в переданных параметрах;
  - `Cancelled()` — капча была закрыта пользователем;
  - `WebviewIsUpdatingError(message, error)` — ошибка при обновлении System WebView.

## {heading(Закрыть капчу)[id=reference-sdk-android-close]}

Метод `VKCaptcha.closeCaptcha()` закрывает виджет капчи. Он вызывает `onResult` с ошибкой `VKCaptchaError.Cancelled`.

Пример вызова метода:

```kotlin
VKCaptcha.closeCaptcha()
```

## {heading(Получить токен успешного прохождения капчи)[id=reference-sdk-android-token]}

Метод `VKCaptcha.getToken()` возвращает токен успешного прохождения капчи.

Пример вызова метода:

```kotlin
val token = VKCaptcha.getToken("<ДОМЕН>")
```

## {heading(Выбрать язык капчи)[id=reference-sdk-android-lang]}

Метод `VKCaptcha.setLocale()` устанавливает язык локализации капчи. По умолчанию используется системный язык.

Возможные значения:

- `ru` — русский;
- `be` — белорусский;
- `de` — немецкий;
- `en` — английский;
- `es` — испанский;
- `fr` — французский;
- `kk` — казахский;
- `pl` — польский;
- `tr` — турецкий;
- `uk` — украинский;
- `uz` — узбекский.

Пример вызова метода:

```kotlin
VKCaptcha.setLocale(Locale("ru"))
```