# {heading(Установка VK Капча SDK)[id=captcha-connect-web-install]}

Загрузите VK Капча SDK:

{tabs}

{tab(npm)}

```console
npm install @vkid/captcha
```
{/tab}

{tab(yarn)}

```console
yarn add @vkid/captcha
```
{/tab}

{tab(pnpm)}

```console
pnpm add @vkid/captcha
```
{/tab}

{tab(JS-скрипт)}

```javascript
<script src="https://static.vk.ru/captchaSDK/loader/1/umd/index.js"></script>
```
После загрузки скрипта VK Капча SDK будет доступен в объекте `window.vkidCaptcha`, здесь `vkidCaptcha` — promise-объект.

{/tab}

{/tabs}