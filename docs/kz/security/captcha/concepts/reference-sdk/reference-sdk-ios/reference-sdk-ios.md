# {heading(iOS үшін SDK анықтамалығы)[id=captcha-concepts-reference-sdk-ios]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Капчаны инициализациялау)[id=reference-sdk-ios-init]}

`VKCaptchaConfiguration(url:)` конфигурациялық объекті {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы `link` параметрінде алынған, капча виджетін іске қосуға арналған сілтемені береді.

Әдіс параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`url`
|![](../../../../../assets/check.svg "inline")
|`URL`
|Сіздің қосымшаңыздың фронтендінде капча виджетін іске қосуға арналған сілтеме, {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісінің жауабындағы `link` параметрінде алынған. Сессиялық токен мен метадеректерді қамтиды:

- `domain` — капча қолданылатын домен;
- `session_token` — сессиялық токен;
- `variant` — капчаның көрсету түрі (`block` немесе `popup`)
  |===

Конфигурацияны шақыру мысалы:

```swift
VKCaptchaConfiguration(url: captchaUrl)
```

## {heading(Капчаны көрсету)[id=reference-sdk-ios-show]}

`VKCaptcha.getCaptchaViewController(completion:)` әдісі капчаны iOS-қосымшасында пайдаланушыға көрсетеді. Капча `UIViewController` ретінде көрсетіледі және қосымшаның навигациясына интеграцияланады.

Әдіс параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`completion`
|![](../../../../../assets/check.svg "inline")
|`(Result<String, Error>) -> Void`
|Капчадан өту нәтижесі бар кері шақыру функциясы (callback):

- `success(token)` — капчадан сәтті өту токені;
- `failure(error)` — пайдаланушы капча терезесін жапқан жағдайдағы қате
  |===

Әдісті шақыру мысалы:

```swift
captcha.getCaptchaViewController { [weak self] result in
   switch result {
      case .success(let token):
         self?.repeatRequest(with: token)
      case .failure:
              // Капчаны жабуды өңдеу
              break
   }
```

## {heading(Капчаны жабу)[id=reference-sdk-ios-close]}

`VKCaptcha.closeCaptcha(animated:completion:)` әдісі капча виджетін жабады.

Әдіс параметрлері:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Міндетті
|Түрі
|Сипаттамасы

|`animated`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Капчаны жабу анимациясының белгісі. Әдепкі мәні — `true`

|`completion`
|![](../../../../../assets/no.svg "inline")
|`() -> Void`
|Капча жабылғаннан кейінгі кері шақыру функциясы (callback)
|===

Әдісті шақыру мысалы:

```swift
captcha.closeCaptcha(animated: true) {
    print("Captcha closed")
}
```

