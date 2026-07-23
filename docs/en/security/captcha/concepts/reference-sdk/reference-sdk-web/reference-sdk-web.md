# {heading(SDK reference for web applications)[id=captcha-concepts-reference-sdk-web]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(System requirements)[id=reference-sdk-web-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-browser]}

## {heading(Display captcha)[id=reference-sdk-web-show]}

The `captchaWidget.show()` method displays the captcha widget to the user in a web application. The captcha widget is displayed in a popup window (`iframe`).

Method parameters:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`container`
|![](../../../../../assets/check.svg "inline")
|`HTMLElement`
|HTML element in which to display the captcha widget

|`view`
|![](../../../../../assets/check.svg "inline")
|`string`
|Captcha type. Possible values:

- `popup` — popup window;
- `block` — block

|`iframeSrc`
|![](../../../../../assets/check.svg "inline")
|`string`
|Link to launch the widget in the frontend of your application, obtained from the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=method]} `GET /captchaNotRobot.createSession`. Contains a session token and metadata:

- `domain` — domain where the captcha will be used;
- `session_token` — session token;
- `variant` — captcha display type (`block` or `popup`)

|`captchaType`
|![](../../../../../assets/check.svg "inline")
|`string`
|Captcha type. Possible value — `type_1`

|`autofocus`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Captcha autofocus flag. Used only for the `block` value in the `view` argument. Possible values:

- `true` — autofocus enabled (by default), focus on the page will be moved to the web element with the captcha;
- `false` — autofocus disabled, focus on the page will remain where it was before the web element with the captcha appeared

|`scheme`
|![](../../../../../assets/no.svg "inline")
|`string`
|Color scheme of the captcha widget. Possible values:

- `light` — light;
- `dark` — dark.

By default, matches the color scheme of the page or application where the captcha is integrated

|`lang`
|![](../../../../../assets/no.svg "inline")
|`string`
|Localization language. If not specified, the value will be determined on the server. Possible values:

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
- `uz` — Uzbek

|`onClose`
|![](../../../../../assets/no.svg "inline")
|`() => void`
|Callback notification about captcha closing
|===

The method returns a promise object with the captcha pass result:

```console
promise resolve <CAPTCHA_PASS_TOKEN> 
promise reject <ERROR>
```

Here:

- `<CAPTCHA_PASS_TOKEN>` — successful captcha pass token if the user passed the captcha;
- `<ERROR>` — `close` error if the user closed the captcha window.

## {heading(Close captcha)[id=reference-sdk-web-close]}

The `captchaWidget.close()` method closes the captcha widget. The method returns nothing in the response.

Example of method call:

```typescript
captchaWidget.close();
```