# {heading(SDK reference for iOS)[id=captcha-concepts-reference-sdk-ios]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(System requirements)[id=reference-sdk-ios-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-ios]}

## {heading(Initialize the captcha)[id=reference-sdk-ios-init]}

The `VKCaptchaConfiguration(url:)` configuration object passes the link for launching the captcha widget, received in the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method.

Method parameters:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`url`
|![](../../../../../assets/check.svg "inline")
|`URL`
|The link for launching the captcha widget in your application's frontend, received in the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. Contains a session token and metadata:

- `domain` — the domain where the captcha will be used;
- `session_token` — the session token;
- `variant` — the captcha display type (`block` or `popup`)
  |===

Example of a configuration call:

```swift
VKCaptchaConfiguration(url: captchaUrl)
```

## {heading(Display the captcha)[id=reference-sdk-ios-show]}

The `VKCaptcha.getCaptchaViewController(completion:)` method displays the captcha to the user in an iOS application. The captcha is displayed as a `UIViewController` and is integrated into the application navigation.

Method parameters:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`completion`
|![](../../../../../assets/check.svg "inline")
|`(Result<String, Error>) -> Void`
|Callback function with the captcha completion result:

- `success(token)` — token of successful captcha completion;
- `failure(error)` — error if the user closed the captcha window
  |===

Example of a method call:

```swift
captcha.getCaptchaViewController { [weak self] result in
   switch result {
      case .success(let token):
         self?.repeatRequest(with: token)
      case .failure:
              // Handling captcha closure
              break
   }
```

## {heading(Close the captcha)[id=reference-sdk-ios-close]}

The `VKCaptcha.closeCaptcha(animated:completion:)` method closes the captcha widget.

Method parameters:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`animated`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Flag for the captcha closing animation. Default value is `true`

|`completion`
|![](../../../../../assets/no.svg "inline")
|`() -> Void`
|Callback function called after the captcha is closed
|===

Example of a method call:

```swift
captcha.closeCaptcha(animated: true) {
    print("Captcha closed")
}
```