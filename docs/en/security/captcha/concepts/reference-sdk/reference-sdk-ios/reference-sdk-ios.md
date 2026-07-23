# {heading(iOS SDK Reference)[id=captcha-concepts-reference-sdk-ios]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(System requirements)[id=reference-sdk-ios-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-ios]}

## {heading(Initialize captcha)[id=reference-sdk-ios-init]}

The configuration object `VKCaptchaConfiguration(url:)` passes the link to launch the captcha widget, received in the `link` parameter in the response of {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=method]} `GET /captchaNotRobot.createSession`.

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
|Link to launch the captcha widget in your application frontend, received in the `link` parameter in the response of {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=method]} `GET /captchaNotRobot.createSession`. Contains the session token and metadata:

- `domain` — domain where the captcha will be used;
- `session_token` — session token;
- `variant` — captcha display type (`block` or `popup`)
  |===

Configuration call example:

```swift
VKCaptchaConfiguration(url: captchaUrl)
```

## {heading(Display captcha)[id=reference-sdk-ios-show]}

The `VKCaptcha.getCaptchaViewController(completion:)` method displays the captcha to the user in an iOS application. The captcha is displayed as `UIViewController` and integrates into the application navigation.

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

Method call example:

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

## {heading(Close captcha)[id=reference-sdk-ios-close]}

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
|Flag for captcha closing animation. Default value is `true`

|`completion`
|![](../../../../../assets/no.svg "inline")
|`() -> Void`
|Callback function after closing the captcha
|===

Method call example:

```swift
captcha.closeCaptcha(animated: true) {
    print("Captcha closed")
}
```