Use the **Access to content by end users** option to manage availability of the CDN resource:

- If the option is disabled, the CDN resource goes into `Suspended` state. Content will not be [delivered to users](../../../concepts/about).
- If the option is enabled, the CDN resource goes into `Active` state. Сontent will be delivered to users.

To enable a CDN resource:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **General settings** tab.
1. Enable the **Access to content by end users** option.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `active` parameter in the request body:

- `true` — resource is active, content is delivered.
- `false` — resource is suspend, content is not delivered.

Example request to suspent the CDN resource:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "active": false
}'
```

</tabpanel>
</tabs>
