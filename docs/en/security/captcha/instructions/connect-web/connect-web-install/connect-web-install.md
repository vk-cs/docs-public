# {heading(Installing VK Капча SDK)[id=captcha-connect-web-install]}

{include(/en/_includes/_translated_by_ai_en.md)}

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

{tab(JS script)}

```javascript
<script src="https://static.vk.ru/captchaSDK/loader/2/umd/index.js"></script>
```
After the script is loaded, the VK Капча SDK will be available in the `window.vkidCaptcha` object. Here, `vkidCaptcha` is a promise object.

{/tab}

{/tabs}