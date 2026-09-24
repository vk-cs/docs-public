# {heading(Android SDK Reference)[id=captcha-concepts-reference-sdk-android]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(System requirements)[id=reference-sdk-android-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-android]}

## {heading(Display the captcha)[id=reference-sdk-android-show]}

The `VKCaptcha.openCaptcha()` method displays the captcha to the user in an Android application. The captcha is displayed as an `Activity` and integrates into the application's navigation.

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
|Domain for receiving the token after completing the captcha. Must match the domain specified in `redirectUri`

|`redirectUri`
|![](../../../../../assets/check.svg "inline")
|`string`
|Link for launching the captcha widget in your application's frontend, received in the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. Contains a session token and metadata:

- `domain` — domain where the captcha will be used;
- `session_token` — session token;
- `variant` — captcha display type (`block` or `popup`)

|`listener`
|![](../../../../../assets/check.svg "inline")
|`VKCaptchaResultListener`
|Callback function, called after the captcha is completed

|===

Example of the method call:

```kotlin
VKCaptcha.openCaptcha(
domain = domain,
redirectUri = captchaUrl,
listener = listener
)
```

## {heading(Get the captcha completion result)[id=reference-sdk-android-result]}

The `VKCaptchaResultListener` interface returns the captcha completion result.

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
                // Handle the error or captcha closure
            }
        }
    }    
}
```

Here:

- `VKCaptchaResult` — a sealed class with the captcha completion result:

  - `VKCaptchaResult.Success` returns the token of successful captcha completion (`token: String`) and the domain where the captcha was performed (`domain: String?`);
  - `VKCaptchaResult.Error` returns the error that occurred during the captcha completion (`error: VKCaptchaError`) and the domain where the captcha was performed (`domain: String?`).

- `VKCaptchaError` — a sealed class with the errors that occur during the captcha completion:

  - `NetworkError(message, error)` — network error;
  - `IllegalArgumentError(message)` — error in the passed parameters;
  - `Cancelled()` — the captcha was closed by the user;
  - `WebviewIsUpdatingError(message, error)` — error when updating System WebView.

## {heading(Close the captcha)[id=reference-sdk-android-close]}

The `VKCaptcha.closeCaptcha()` method closes the captcha widget. It calls `onResult` with the `VKCaptchaError.Cancelled` error.

Example of the method call:

```kotlin
VKCaptcha.closeCaptcha()
```

## {heading(Get the successful captcha completion token)[id=reference-sdk-android-token]}

The `VKCaptcha.getToken()` method returns the token of successful captcha completion.

Example of the method call:

```kotlin
val token = VKCaptcha.getToken("<DOMAIN>")
```

## {heading(Select the captcha language)[id=reference-sdk-android-lang]}

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

Example of the method call:

```kotlin
VKCaptcha.setLocale(Locale("ru"))
```