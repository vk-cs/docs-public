## Adding request headers

The **Add request titles** option allows you to set custom HTTP headers that the CDN server will add to the client request to the origin server.

To add an HTTP header to a request:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **HTTP-headers** tab.
1. Enable the **Add request titles** option.
1. Enter the title name and the value. The following characters are allowed:

    - **Title name**: Latin letters, numbers, special characters `_` and `-`.
    - **Value**: Latin letters, numbers, special characters `_`, `.`, `/`, `:`, `-`, `=`, and spaces. The value cannot start with a special character and be composed only of special characters.
1. (Optional) Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add title** to add one more request header. Specify the name and value of the header. You can set up to 50 request headers.
1. (Optional) Click ![trash-icon](/en/assets/trash-icon.svg "inline") to delete a request header.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `staticRequestHeaders` parameter in the `options` block of a request body:

- To enable the option specify `"enabled": true`, to disable  — `"enabled": false`.
- In the `value` parameter, write the headers and values in the `name: value` format. You can specify up to 50 request headers. The following characters are allowed:

  - `name`: Latin letters, numbers, special characters `_` and `-`.
  - `value`: Latin letters, numbers, special characters `_`, `.`, `/`, `:`, `-`, `=`, and spaces. The value cannot start with a special character and be composed only of special characters.

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
        "staticRequestHeaders": {
            "enabled": true,
            "value": {
                "Header-One": "Value 1",
                "Header-Two": "Value 2"
            }
        },
    }
}'
```

</tabpanel>
</tabs>

## Adding response headers

The **Add response titles** option allows you to set custom HTTP headers that the CDN server will add to the response to a user request.

To add an HTTP header to a response:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **HTTP-headers** tab.
1. Enable the **Add response titles** option.
1. Enter the title name and the value. The following characters are allowed:

    - **Title name**: Latin letters, numbers, special characters `_` and `-`.
    - **Value**: Latin letters, numbers, special characters `` ` ``, `~`, `!`, `@`, `#`, `%`, `^`, `&`, `*`, `(`, `)`, `-`, `_`, `=`, `+`, `/`, `|`, `"`, `;`, `:`, `?`, `.`, `>`, `<`, `{`, `}`, `[`, `]` and space. The value cannot start with a special character and be composed only of special characters.
1. (Optional) Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add title** to add one more response header. Specify the name and value of the header. You can set up to 50 response headers.
1. (Optional) Click ![trash-icon](/en/assets/trash-icon.svg "inline") to delete a response header.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `staticHeaders` parameter in the `options` block of a request body:

- To enable the option specify `"enabled": true`, to disable  — `"enabled": false`.
- In the `value` parameter, write the headers and values in the `name: value` format. You can specify up to 50 request headers. The following characters are allowed:

  - `name`: Latin letters, numbers, characters `_` and `-`.
  - `value`: Latin letters, numbers, characters `` ` `` `~ ! @ # % ^ & * ( ) - _ = + / | " ; : ? . > < { } [ ]` and space. The value cannot start with a special character and be composed only of special characters.

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
        "staticHeaders": {
            "enabled": true,
            "value": {
                "Header-One": "Value 1",
                "Header-Two": "Value 2"
            }
        },
    }
}'
```

</tabpanel>
</tabs>

## Enabling CORS headers support

The [Cross-Origin Resource Sharing (CORS)](/ru/base/s3/references#cors "change-lang") mechanism uses the Access-Control-Allow-Origin response header to grant users' browsers permissions to access resources located on different domains from the origin.

To configure the Access-Control-Allow-Origin HTTP header:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **HTTP-headers** tab.
1. Enable the **HTTP header Access-Control-Allow-Origin** option.
1. Select the header configuration option:

    - `*, for all domains`: allows content to be displayed for all domains.
    - `"$http_origin", for all domains`: allows content to be displayed for all domains, but the requesting domain will be sent in the Access-Control-Allow-Origin response header.
    - `"$http_origin", if the source is below`: allows content to be displayed for the specified domains:

        1. Specify the domain for which content should be displayed.
        1. (Optional) Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add domain** to add one more domain.
        1. (Optional) Click ![trash-icon](/en/assets/trash-icon.svg "inline") to remove a domain form the list.

        The requesting domain will be sent in the response header.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `cors` parameter in the `options` block of a request body:

- To disable the option and not provide any values, use `cors: null`.
- To enable the option, specify `"enabled": true`; to disable it, specify `"enabled": false`.
- In the `value` parameter, specify the domains for which content display will be permitted.

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
        "cors": {
            "enabled": true,
            "value": [
                "first.example.com",
                "second.example.com"
            ]
        }
    }
}'
```

</tabpanel>
</tabs>
