# {heading(Справочник SDK для iOS)[id=captcha-concepts-reference-sdk-ios]}

## {heading(Системные требования)[id=reference-sdk-ios-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-ios]}

## {heading(Инициализировать капчу)[id=reference-sdk-ios-init]}

Конфигурационный объект `VKCaptchaConfiguration(url:)` передает ссылку для запуска виджета капчи, полученную в параметре `link` в ответе {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=метода]} `GET /captchaNotRobot.createSession`.

Параметры метода:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Обязательный
|Тип
|Описание

|`url`
|![](../../../../../assets/check.svg "inline")
|`URL`
|Ссылка для запуска виджета капчи во фронтенде вашего приложения, полученная в параметре `link` в ответе {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=метода]} `GET /captchaNotRobot.createSession`. Содержит сессионный токен и метаданные:

- `domain` — домен, на котором будет использована капча;
- `session_token` — сессионный токен;
- `variant` — вид отображения капчи (`block` или `popup`)
  |===

Пример вызова конфигурации:

```swift
VKCaptchaConfiguration(url: captchaUrl)
```

## {heading(Отобразить капчу)[id=reference-sdk-ios-show]}

Метод `VKCaptcha.getCaptchaViewController(completion:)` отображает капчу пользователю в iOS-приложении. Капча отображается как `UIViewController` и интегрируется в навигацию приложения.

Параметры метода:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Обязательный
|Тип
|Описание

|`completion`
|![](../../../../../assets/check.svg "inline")
|`(Result<String, Error>) -> Void`
|Функция обратного вызова (callback) с результатом прохождения капчи:

- `success(token)` — токен успешного прохождения капчи;
- `failure(error)` — ошибка, если пользователь закрыл окно капчи
  |===

Пример вызова метода:

```swift
captcha.getCaptchaViewController { [weak self] result in
   switch result {
      case .success(let token):
         self?.repeatRequest(with: token)
      case .failure:
              // Обработка закрытия капчи
              break
   }
```

## {heading(Закрыть капчу)[id=reference-sdk-ios-close]}

Метод `VKCaptcha.closeCaptcha(animated:completion:)` закрывает виджет капчи.

Параметры метода:

[cols="2,2,2,4", options="header", width=100%]
|===
|Параметр
|Обязательный
|Тип
|Описание

|`animated`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Признак анимации закрытия капчи. Значение по умолчанию — `true`

|`completion`
|![](../../../../../assets/no.svg "inline")
|`() -> Void`
|Функция обратного вызова (callback) после закрытия капчи
|===

Пример вызова метода:

```swift
captcha.closeCaptcha(animated: true) {
    print("Captcha closed")
}
```