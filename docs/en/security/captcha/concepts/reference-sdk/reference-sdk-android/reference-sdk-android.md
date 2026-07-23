# {heading(Android SDK Reference)[id=captcha-concepts-reference-sdk-android]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(System requirements)[id=reference-sdk-android-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-android]}

## {heading(Display captcha)[id=reference-sdk-android-show]}

The `VKCaptcha.openCaptcha()` method displays the captcha to the user in an Android application. The captcha is displayed as an `Activity` and integrates into the application navigation.

Method parameters:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`domain`
|![](../../../../../assets/check.svg "inline")
|`string`
|Domain for obtaining the token after passing the captcha. Must match the domain specified in `redirectUri`

|`redirectUri`
|![](../../../../../assets/check.svg "inline")
|`string`
|Link to launch the captcha widget in your application frontend, obtained from the `link` parameter in the response of {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=the method]} `GET /captchaNotRobot.createSession`. Contains the session token and metadata:

- `domain` — domain where the captcha will be used;
- `session_token` — session token;
- `variant` — captcha display type (`block` or `popup`)

|`listener`
|![](../../../../../assets/check.svg "inline")
|`VKCaptchaResultListener`
|Callback function invoked after the captcha is completed

|===

Method call example:

```kotlin
VKCaptcha.openCaptcha(
domain = domain,
redirectUri = captchaUrl,
listener = listener
)
```

## {heading(Get captcha result)[id=reference-sdk-android-result]}

The `VKCaptchaResultListener` interface returns the captcha result.

Example:

```kotlin
interface VKCaptchaResultListener {
    fun onResult(result: VKCaptchaResult) {
        when (result) {
            is VKCaptchaResult.Success -> {
                val token = result.token
                repeatRequest(token)
            }
            is VKCaptchaResult.Error -> {
                // Error handling or captcha closure
            }
        }
    }    
}
```

Here:

- `VKCaptchaResult` — a sealed class with the captcha result:

  - `VKCaptchaResult.Success` returns the token of successful captcha completion (`token: String`) and the domain where the captcha was performed (`domain: String?`);
  - `VKCaptchaResult.Error` returns an error that occurred during captcha completion (`error: VKCaptchaError`) and the domain where the captcha was performed (`domain: String?`).

- `VKCaptchaError` — a sealed class with errors that occur during captcha completion:

  - `NetworkError(message, error)` — network error;
  - `IllegalArgumentError(message)` — error in the provided parameters;
  - `Cancelled()` — the captcha was closed by the user;
  - `WebviewIsUpdatingError(message, error)` — error when updating System WebView.

## {heading(Close captcha)[id=reference-sdk-android-close]}

The `VKCaptcha.closeCaptcha()` method closes the captcha widget. It invokes `onResult` with the `VKCaptchaError.Cancelled` error.

Method call example:

```kotlin
VKCaptcha.closeCaptcha()
```

## {heading(Get successful captcha completion token)[id=reference-sdk-android-token]}

The `VKCaptcha.getToken()` method returns the token of successful captcha completion.

Method call example:

```kotlin
val token = VKCaptcha.getToken("<DOMAIN>")
```

## {heading(Select captcha language)[id=reference-sdk-android-lang]}

The `VKCaptcha.setLocale()` method sets the captcha localization language. The system language is used by default.

Possible values:

- `ru` — Russian;
- `be` — Belarusian;
- `de` — German;
- `en` — English;
- `es` — Spanish;
- `fr` — French;
- `kk` — Kazakh;
- `pl` — Polish;
- `tr` — Turkish;
- `uk` — Ukrainian;
- `uz` — Uzbek.

Method call example:

```kotlin
VKCaptcha.setLocale(Locale("ru"))
```