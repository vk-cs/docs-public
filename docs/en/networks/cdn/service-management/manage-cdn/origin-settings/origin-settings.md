## Changing orogon interaction protocol

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **General settings** tab
1. Select the option in the **Source interaction protocol** parameter:

    {include(/en/_includes/_cdn_origin.md)[tags=http]}

1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `originProtocol` parameter in a request body:

{include(/en/_includes/_cdn_origin.md)[tags=http-api]}

Example request:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "originProtocol": "HTTPS"
}'
```

</tabpanel>
</tabs>

## Changing origin

The option allows you to change the origin that the CDN resource will fetch content from.

If a single origin was specified when creating the CDN resource, an origin group is automatically created, consisting of one origin with the specified parameters. Therefore, when editing a CDN resource, you can only change the origin group, and the option to select a single origin is not available.

To change an origin:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **General settings** tab
1. Select a group from the **Source group** list.

    If there is no group you need in the list:

     1. Click **Add source group**.
     1. Enter the name of the origin group.
     1. Add the first origin:

        {include(/en/_includes/_cdn_origin.md)[tags=add,4XX_5XX]}

     1. Click **Create group**.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify parameters in a request body:

- `origin`: the IP address or the domain name of the origin and the port, if setted.
- `originGroup`: the ID or the name of the origin group.

You can use either `origin`, or `originGroup`.

Example request to change a single origin:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "origin": "yoursite.com"
}'
```

Example request to change an origin group:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
}'
```

<info>

To edit or to add an origin group use methods that work with origin groups.

</info>

</tabpanel>
</tabs>

## Changing host header

CDN servers specify the mandatory [Host](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host) header in HTTP requests when requesting content from origins. This header allows addressing the appropriate virtual host at the origin.

By default, the value of the Host header matches the first CNAME.

To change the header:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **General settings** tab
1. In the **Changing the Host header** parameter, select whether to change the value of the Host HTTP header when requesting from origins or not.

    {include(/en/_includes/_cdn_origin.md)[tags=host]}

1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the parameters in a request body:

- To have the first resource CNAME as the Host header (by default), set `forward_host_header` and `hostHeader` parameters to `"enabled": false`.
- To have the name of the first configured personal domain as the Host header, set the parameters:

    ```json
    "forward_host_header": {
        "enabled": true,
        "value": true
    },
    "hostHeader": {
        "enabled": false
    }
    ```

- To have a custom domain or IP address as the Host header, set the parameters:

    ```json
    "forward_host_header": {
        "enabled": false,
        "value": false
    },
    "hostHeader": {
        "enabled": true,
        "value": "<header>"
    }
    ```

Example request to set a custom header in host:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "options": {
        "forward_host_header": {
            "enabled": false,
            "value": false
        },
        "hostHeader": {
            "enabled": true,
            "value": "content-source.example.org"
        }
    }
}'
```

</tabpanel>
</tabs>

<warn>

After making changes to the option, [clear the CDN resource cache](../content-settings#clearing_cache).

</warn>

## Activating shielding

Origin shielding (or precache server) helps to protect the origin from high loads. The precache server collects all user requests and sends them one by one to the origin if the required content is not in the cache of the precache server itself.

<info>

Activating origin shielding increases the consumption of total CDN traffic.

</info>

To enable origin shielding:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **General settings** tab
1. Enable the **Activate origin shielding** option.
1. Read the warning and confirm the enabling.
1. Select the data center, located closer to your origin server.
1. Click **Save changes**.

</tabpanel>
</tabs>
