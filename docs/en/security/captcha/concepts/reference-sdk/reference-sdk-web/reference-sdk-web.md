# {heading(SDK reference for web applications)[id=captcha-concepts-reference-sdk-web]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(System requirements)[id=reference-sdk-web-requirements]}

{include(../../../../../_includes/_captcha-requirements.md)[tags=captcha-req-browser]}

## {heading(Mount the captcha)[id=reference-sdk-web-render]}

The `captchaWidget.render()` method mounts the captcha onto the page and starts the captcha service. The method is called once per page load.

Example of a method call:

```typescript
await captchaWidget.render({
   link: captchaLink,
   lang: 'ru',
   invisible: true,
});
```

Method parameters:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`link`
|![](../../../../../assets/check.svg "inline")
|`string`
|Link for launching the captcha widget, received in the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. Contains a session token and metadata:

- `domain` — domain where the captcha will be used;
- `session_token` — session token;
- `variant` — captcha display type (`block` or `popup`)

|`invisible`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Indicates an {linkto(../../about#captcha-about-types)[text=invisible captcha]}. Possible values:

- `true` — invisible captcha, the check runs in the background and is triggered by the `captchaWidget.execute()` method;
- `false` — visible captcha

|`container`
|![](../../../../../assets/no.svg "inline")
|`HTMLElement` \| `string`
|HTML element or CSS selector into which the captcha is embedded. If not specified, the captcha is displayed in a pop-up window over the page using the {linkto(#reference-sdk-web-execute)[text=captchaWidget.execute()]} method.

If the CSS selector does not find any elements, a pop-up window will be displayed instead of the embedded captcha. This is not an error

|`lang`
|![](../../../../../assets/no.svg "inline")
|`string`
|Language for localizing the captcha task and the data processing notice. If not specified, the browser language is used. If the browser language is not recognized by the service, the task language will be determined on the server, and the notice will be displayed in Russian. Possible values:

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
- `uz` — Uzbek;
- `zh` — Chinese

|`scheme`
|![](../../../../../assets/no.svg "inline")
|`string`
|Color scheme of the captcha widget. Possible values:

- `light` — light;
- `dark` — dark.

By default, it matches the color scheme of the page or application where the captcha is integrated

|`notice`
|![](../../../../../assets/no.svg "inline")
|`object`
|Data processing notice settings. The notice is displayed only with `invisible: true`. The text and link in the notice cannot be changed, as it is a legal notice

|`notice`.`position`
|![](../../../../../assets/no.svg "inline")
|`string`
|Corner of the page where the notice is displayed. Possible values:

- `bottom-right` — bottom right (default);
- `bottom-left` — bottom left;
- `top-right` — top right;
- `top-left` — top left

|`notice`.`hidden`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Indicates whether the notice is hidden. Possible values:

- `true` — notice is hidden;
- `false` — notice is displayed (default).
If the data processing notice is hidden, add your own notice

|`notice`.`draggable`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Indicates whether the notice can be dragged along the edge of the screen. The chosen position is remembered for this domain. Possible values:

- `true` — dragging is allowed;
- `false` — dragging is not allowed (default)

|`slowLoadAfter`
|![](../../../../../assets/no.svg "inline")
|`number`
|Time in milliseconds after which an event is sent that the captcha widget has not yet loaded. The default value is `10000`. After this time, VK Капча SDK sends the `captcha: load slow` event. Sending the event does not interrupt the captcha loading
|===

The method returns a promise object with captcha readiness:

```console
promise resolve
promise reject <ERROR>
```

Error codes:

[cols="3,7", options="header", width=100%]
|===
|Code 
|Reason

|`invalid_link` 
|Invalid link for launching the captcha widget

|`mount_failed` 
|Failed to mount the captcha onto the page

|`already_initialized` 
|The `captchaWidget.render()` method has already been called

|`failed` 
|The captcha service reported an error

|`close` 
|The user closed the captcha

|`destroyed` 
|The captcha was removed from the page by the `captchaWidget.destroy()` method
|===

## {heading(Run the user check)[id=reference-sdk-web-execute]}

The `captchaWidget.execute()` method:

- starts the user check;
- displays a pop-up window with the captcha, if this is set by the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} method;
- returns a token of successful captcha completion to pass to the backend.

The method is called once per mounted captcha session. Usually, it is triggered in response to a user's target action, such as submitting a form, but it can also be called by a backend response that initiated the captcha.

The captcha session is consumed by the first check: after a successful check, a repeated call to the method is rejected with the `already_checked` error. To run the next check on the same page load, remove the captcha with the {linkto(#reference-sdk-web-destroy)[text=captchaWidget.destroy()]} method and mount it again with the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} method using a new link from the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method.

Example of a method call:

```typescript
const successToken = await captchaWidget.execute();
```

Parameters of the `captchaWidget.execute()` method:

[cols="2,2,2,4", options="header", width=100%]
|===
|Parameter
|Required
|Type
|Description

|`timeout`
|![](../../../../../assets/no.svg "inline")
|`number`
|Timeout for waiting for a response from the captcha service in milliseconds. The default value is `10000`.

The countdown starts from the moment the method is called. If the captcha is still loading, the loading wait time is included in the timeout.

When the timeout expires, the promise object is rejected with the `timeout` error, but the captcha remains on the page: the next call to the `captchaWidget.execute()` method will be sent to the captcha service as soon as the captcha loads.

If the captcha expands into a visible task, the timeout is removed, and the user solves the task without a time limit
|===

The method returns a promise object with the check result:

```console
promise resolve <CAPTCHA_COMPLETION_TOKEN>
promise reject <ERROR>
```

Here:

- `<CAPTCHA_COMPLETION_TOKEN>` — token of successful captcha completion, if the user passed the captcha;
- `<ERROR>` — error code.

Error codes:

[cols="3,7", options="header", width=100%]
|===
|Code
|Reason

|`not_initialized` 
|The `captchaWidget.render()` method was not called or ended with an error 

|`not_passed` 
|The user did not interact with the captcha

|`timeout` 
|The check response did not arrive within the allotted time 

|`token_expired` 
|The token has expired

|`failed` 
|The check failed or a captcha widget error occurred

|`already_checked` 
|The check has already been passed

|`close` 
|The user closed the captcha

|`destroyed` 
|The captcha was removed from the page by the `captchaWidget.destroy()` method
|===

## {heading(Subscribe to events)[id=reference-sdk-web-events-on]}

The `captchaWidget.on()` method is used to subscribe to events. Event names are available as properties of the `CaptchaPublicEvents` object.

Example of a method call:

```typescript
import { CaptchaPublicEvents } from '@vkid/captcha';

captchaWidget.on(CaptchaPublicEvents.SUCCESS, () => setCanSubmit(true));
```

Events you can subscribe to:

[cols="3,2,5", options="header", width=100%]
|===
|Event 
|Data 
|When it is sent 

|`captcha: success` 
|`{ token }` 
|Check passed. For the embedded checkbox — at the moment the checkbox is clicked

|`captcha: challenge visible` 
|![](../../../../../assets/no.svg "inline")
|The invisible check expanded into a visible task 

|`captcha: challenge hidden` 
|![](../../../../../assets/no.svg "inline")
|The visible task is collapsed 

|`captcha: token expired` 
|![](../../../../../assets/no.svg "inline") 
|The token has expired, sending it to the backend is no longer meaningful 

|`captcha: load slow` 
|`{ slowLoadAfter }` 
|The captcha application has been loading longer than the `slowLoadAfter` threshold specified in the `captchaWidget.render()` method. This is not an error, the captcha continues loading
|===

{note:warn}
Subscribe to events before calling the `captchaWidget.render()` method, otherwise early events will be lost.
{/note}

When using the deprecated {linkto(#reference-sdk-web-show)[text=captchaWidget.show()]} method, events are not sent. The result comes only as a promise object of the method.

## {heading(Unsubscribe from events)[id=reference-sdk-web-events-off]}

To unsubscribe from events, use the `captchaWidget.off()` method.

Example of a method call:

```typescript
import { CaptchaPublicEvents } from '@vkid/captcha';

captchaWidget.off(CaptchaPublicEvents.SUCCESS, onSuccess);
```

{note:warn}
Pass the same handler function as in the {linkto(#reference-sdk-web-events-on)[text=captchaWidget.on()]} method. Without it, the subscription is not canceled.
{/note}

## {heading(Hide the captcha)[id=reference-sdk-web-hide-popup]}

The `captchaWidget.hidePopup()` method hides the captcha widget without interrupting the check. The service continues to run, and the widget can be shown again instantly. The method returns nothing in the response.

Example of a method call:

```typescript
captchaWidget.hidePopup();
```

## {heading(Show the captcha)[id=reference-sdk-web-show-popup]}

The `captchaWidget.showPopup()` method returns the captcha widget to the screen. The completion and state of the check are not reset. The method returns nothing in the response.

VK Капча SDK calls this method automatically when an invisible check transitions to a visible task.

Example of a method call:

```typescript
captchaWidget.showPopup();
```

## {heading(Close the captcha)[id=reference-sdk-web-close]}

The `captchaWidget.close()` method closes the captcha widget. The method returns nothing in the response.

Example of a method call:

```typescript
captchaWidget.close();
```

## {heading(Remove the captcha from the page)[id=reference-sdk-web-destroy]}

The `captchaWidget.destroy()` method removes the captcha from the page and returns the widget to its initial state: after it, the next captcha can be mounted on the same page load using the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} method. The method returns nothing in the response.

The method is needed for single-page applications (SPA, Single Page Application), where screens change without a page reload. In this case, the captcha is tied to the screen lifecycle: when the screen appears, the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} method is called; when leaving this screen — `captchaWidget.destroy()`. Each screen has its own captcha session and its own link. If the next screen also calls the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} method without a preceding `captchaWidget.destroy()` call, the promise object is rejected with the `already_initialized` error.

Each screen needs its own instance of `CaptchaWidget`. Only one captcha instance should be running on the page at a time. When switching between screens, first call `captchaWidget.destroy()` on the current instance, then create and mount a new one.

The link for the next captcha must be new: the captcha session is consumed by the first check. Request a fresh link using the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. You cannot cache the link in the application state: on the next screen, the captcha will be mounted, but the check will return an expired token. Request the link in the same code that calls {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]}.

Handle the rejection of the promise object with the `destroyed` error. The `captchaWidget.destroy()` method rejects unfinished promise objects of the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} and {linkto(#reference-sdk-web-execute)[text=captchaWidget.execute()]} methods with the `destroyed` error. In React StrictMode, the effect is executed twice in development mode, so the first call to {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} is always rejected — in the console, it looks like an unhandled promise rejection.

Before calling {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]}, check that the screen is still active. Between requesting the link and the backend response, the user may leave the screen. A `captchaWidget.destroy()` called after that will do nothing, because the captcha has not yet been mounted, and the {linkto(#reference-sdk-web-render)[text=captchaWidget.render()]} called next will mount it on the abandoned screen.

VK Капча SDK does not send any events about captcha removal.

Example of a method call:

```typescript
let captchaWidget: CaptchaWidget | undefined;
let isScreenActive = false;

// Screen appeared. In React — the effect of the component containing the captcha
async function mountCaptcha() {
    isScreenActive = true;
    captchaWidget = new CaptchaWidget();
    captchaWidget.on(CaptchaPublicEvents.SUCCESS, onSuccess);
    const { link } = await api.post('/api/captcha/session', { client });
    // The user may have left the screen while the backend was responding
    if (!isScreenActive) {
        return;
    }
    // Leaving the screen before loading rejects the promise object with the destroyed code
    await captchaWidget.render({ link, lang: 'ru', invisible: true }).catch(handleRenderError);
}

// Leaving the screen. In React — the cleanup function of the same effect
function unmountCaptcha() {
    isScreenActive = false;
    captchaWidget?.destroy();
}
```

## {heading(Display the captcha)[id=reference-sdk-web-show]}

The `captchaWidget.show()` method displays the captcha widget to the user in a web application and is used in cases where the backend decides whether a user check is necessary. The captcha widget is displayed in a pop-up window (`iframe`).

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

- `popup` — pop-up window;
- `block` — block

|`link`
|![](../../../../../assets/no.svg "inline")
|`string`
|Link for launching the captcha widget, received in the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. 

Replaces the deprecated `iframeSrc` parameter. One of the two parameters must be specified.

|`iframeSrc`
|![](../../../../../assets/no.svg "inline")
|`string`
|Deprecated parameter, kept for compatibility. The new parameter is `link`. One of the two parameters must be specified. 

Link for launching the widget in your application's frontend, received in the `link` parameter in the response of the {linkto(../../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} method. Contains a session token and metadata:

- `domain` — domain where the captcha will be used;
- `session_token` — session token;
- `variant` — captcha display type (`block` or `popup`)

|`captchaType`
|![](../../../../../assets/no.svg "inline")
|`string`
|Captcha type. Possible value — `type_1` (default)

|`autofocus`
|![](../../../../../assets/no.svg "inline")
|`boolean`
|Indicates captcha autofocus. Used only for the `block` value in the `view` argument. Possible values:

- `true` — autofocus is enabled (default). The focus on the page will be moved to the web element with the captcha.
- `false` — autofocus is disabled. The focus on the page will remain where it was before the web element with the captcha appeared

|`scheme`
|![](../../../../../assets/no.svg "inline")
|`string`
|Color scheme of the captcha widget. Possible values:

- `light` — light;
- `dark` — dark.

By default, it matches the color scheme of the page or application where the captcha is integrated

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
- `uz` — Uzbek;
- `zh` — Chinese

|`onClose`
|![](../../../../../assets/no.svg "inline")
|`() => void`
|Callback notification about the captcha closing
|===

The method returns a promise object with the captcha completion result:

```console
promise resolve <CAPTCHA_COMPLETION_TOKEN> 
promise reject <ERROR>
```

Here:

- `<CAPTCHA_COMPLETION_TOKEN>` — token of successful captcha completion, if the user passed the captcha;
- `<ERROR>` — the `close` error, if the user closed the captcha window.