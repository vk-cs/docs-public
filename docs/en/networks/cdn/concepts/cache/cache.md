# {heading(Content caching)[id=cdn-cache]}

{include(/en/_includes/_translated_by_ai_en.md)}

Content caching is the main advantage of using a CDN. How long a CDN server can store a copy of your content in its cache before requesting a fresh copy from the origin server is determined by the TTL (Time To Live) parameter. By changing the value of this parameter, you can control the balance between performance and data freshness:

* Long TTL (days):

    * Pros: maximum speed for users (content is served from the local CDN cache without loading your server) and reduced load on your origin server.
    * Cons: if you change content on the server, users may see the old version until the TTL expires.

* Short TTL (minutes, hours):

  * Pros: users receive updated content almost instantly after changes are made on the server.
  * Cons: the load on your server increases (since the CDN frequently requests new data from it) and the download speed for users slightly decreases.

It is recommended to set different TTL parameter values for different types of content:

| Content type | URL pattern | Recommended TTL |
|---|---|---|
| HTML pages | `/*.html`, `/` | 5–10 minutes |
| Images | `/*.png`, `/*.jpg`, `/*.webp`, `/*.svg` | 7–30 days |
| CSS and JavaScript | `/*.css`, `/*.js` | 1–7 days |
| Fonts | `/*.woff2`, `/*.woff`, `/*.ttf` | 30 days |

When the time (TTL) expires, the CDN resource checks the file on the origin:

* If the ETag of the file on the CDN server matches the ETag of the file on the origin, the CDN resource continues to store and serve the cached file to users.
* If the ETag of the file on the CDN server does not match the ETag of the file on the origin, the CDN resource caches the new file.