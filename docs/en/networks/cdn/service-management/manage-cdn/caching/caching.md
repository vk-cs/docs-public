## CDN resource сaching configurations

The option allows to define content storage parameters in the cache of a CDN resource. When the time expires, the CDN resource checks the file on the origin:

- If the ETag of the file on the CDN server matches the ETag of the file on the origin, the CDN resource continues to store and serve the cached file to users.
- If the ETag of the file on the CDN server does not match the ETag of the file on the origin, the CDN resource caches the new file.

To configure the caching for the CDN resource:

<tabs>
<tablist>
<tab>Personal accaunt</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Caching** tab.
1. Enable the **CDN caching on** option.
1. Select a configuration option:

   <tabs>
   <tablist>
   <tab>Origin settings</tab>
   <tab>Settings</tab>
   </tablist>
   <tabpanel>

      The CDN resource will cache content for the duration set on the origin in the Cache-Control header.

      If no Cache-Control is specified on the origin, the default time (4 days) is used. To change this time, select a value in the **Default cache lifetime** parameter. The chosen value will apply for responses with codes 200, 201, 204, 206, 301, 302, 303, 304, 307, 308. Responses with other codes will not be cached.

   </tabpanel>
   <tabpanel>

      The CDN resource will cache the content for the time specified in its settings:

      1. Specify the cache lifetime. This value will only apply to responses with codes 200, 206, 301, 302. Responses with 4XX, 5XX codes will not be cached.
      1. (Optional) Customize the caching time for different responses:

         1. Click **Add rule**.
         1. Select the response code. For all types of responses, select the `any` value.
         1. Select the caching time for this response.

   </tabpanel>
   </tabs>

1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `edge_cache_settings` parameter in the request body in the `options` block.

Example request:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "edge_cache_settings": {
            "custom_values": {
                "100": "3600s",
                "404": "0s"
            },
            "enabled": true,
            "value": "345600s"
        }
    }
}'
```

The example sets the caching settings for the CDN resource:

- by default, content is cached for 4 days
- for 100 responses, content is cached for 1 hour
- for 404 responses, content is not cached

</tabpanel>
</tabs>

## Browser сaching сonfigurations

The option allows to set parameters for storing content in the cache of end-users' browsers.

To set up user's browser caching:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Caching** tab.
1. Enable the **Browser caching** option.
1. Select a configuration option:

   <tabs>
   <tablist>
   <tab>Origin settings</tab>
   <tab>Settings</tab>
   </tablist>
   <tabpanel>

      The browser will cache content for the duration set on the origin in the Cache-Control header.

      If no Cache-Control is specified on the origin, content is not cached.

   </tabpanel>
   <tabpanel>

      Caching settings for user browsers are specified in the CDN resource settings.

      Specify the cache lifetime. This value will apply to responses with codes 200, 201, 204, 206, 301, 302, 303, 304, 307, 308 if caching headers are not configured at the origin. Responses with other codes will not be cached.

   </tabpanel>
   </tabs>

1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `browser_cache_settings` parameter in the request body in the `options` block.

Example request to configure browser caching by source:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "browser_cache_settings": {
            "enabled": true,
            "value": ""
        }
    }
}'
```

</tabpanel>
</tabs>

## Ignoring Set-Cookie header when caching

Requests to a CDN server to get the same file may contain one path to the file but different values in the `Set-Cookie` HTTP header. By default, the CDN resource considers such requests different and redirects them to the origin server. This decreases data transfer speed. Ignoring the `Set-Cookie` header allows the CDN resource to use its own cache instead of sending a request to the origin.

To have the CDN resource ignore `Set-Cookie` headers in HTTP requests:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Caching** tab.
1. Enable the **Ignore Set-Cookie** option.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `ignore_cookie` parameter in the request body in the `options` block.

Example request to ignore the Set-Cookie header:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignore_cookie": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Ignoring query parameters when caching

Requests to a CDN server to get the same file may contain one path to the file but different query parameters. By default, the CDN resource treats such requests as different and redirects them to the origin server, which reduces the speed of data transfer. Ignoring all or some parameters allows the CDN resource to use its cache instead of sending a request to the origin.

To have the CDN resource ignore parameters in HTTP requests:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Caching** tab.
1. Enable the **Ignore request parameters** option.
1. Select the type of ignoring:

   - **Ignore everything** — files with any query parameters are cached as one object.
   - **Ignore everything except** — files with specified parameters are cached as different objects, files with other parameters — as one.
   - **Ignore only** — files with specified parameters are cached as one object, files with other parameters — as different.

1. For types **Ignore everything except** and **Ignore only** specify the parameters. Enter each parameter in a new line.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the following parameters in the request body in the `options` block:

- To ignore all parameters — `ignoreQueryString` (`value`=`true`).
- To ignore specified parameters — `ignoreQueryString` (`value`=`false`), `query_params_blacklist`.
- To ignore all parameters except specified — `ignoreQueryString` (`value`=`false`), `query_params_whitelist`.

<details>
<summary>Example request to ignore all query parameters in HTTP requests</summary>

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignoreQueryString": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</details>
<details>
<summary>Example request to ignore specified query parameters in HTTP requests</summary>

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignoreQueryString": {
            "enabled": true,
            "value": false
        },
        "query_params_blacklist": {
                "enabled": true,
                "value": [
                    "color",
                    "type"
                ]
         }
    }
}'
```

</details>
<details>
<summary>Example request to ignore all query parameters in HTTP requests except specified</summary>

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ignoreQueryString": {
            "enabled": true,
            "value": false
        },
        "query_params_whitelist": {
                "enabled": true,
                "value": [
                    "color",
                    "type"
                ]
         }
    }
}'
```

</details>

</tabpanel>
</tabs>
