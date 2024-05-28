<info>

Here is the article about applying SSL sertificates. To know how to create, edit and delete SSL certificates, read [Managing SSL certificates](../../manage-certificates).

</info>

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **General settings** tab.
1. Select how to apply SSL certificate in the **SSL certificate** parameter:

    - **Do not use** — a certificate will not be used: personal domains can only be accessed via HTTP.
    - **(By default) Let's Encrypt** — a free [Let's Encrypt](https://letsencrypt.org) certificate will be used. The certificate will be created after the CDN resource is established, once the origin servers are available and DNS changes involving the CNAME records for personal domains have propagated. This usually takes up to 30 minutes. Choosing this option also requires enabling the [**Access to content by end users**](../enable-cdn) option.
    - **User's certificate** —  a certificate selected from the list will be used. To make the certificate available for selection, add it to the [certificate store](../../manage-certificates/).
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the following parameters in a request body:

- To not use SSL certificate and access to personal domains via HTTP only, specify the `"sslEnabled": false` parameter.
- To use a free [Let's Encrypt](https://letsencrypt.org) certificate, specify the `"sslEnabled": true` parameter and the parameters to update the certificate:

  - `"ssl_automated": true` — the Let’s Encrypt certificate will be automatically renewed upon expiry.
  - `"ssl_automated": false` — the Let’s Encrypt certificate will not be automatically renewed.
  
  To create or configure a Let's Encrypt certificate, use the [methods](/ru/additionals/api/api-cdn "change-lang") of the **Let's Encrypt certificates** section.

- To use your SSL certificate, specify the `"sslEnabled": true`, and also specify the certificate identifier in the `sslData` parameter. To create or configure your certificate, use the [methods](/ru/additionals/api/api-cdn "change-lang") of the **SSL certificates** section.

Example request to use SSL custom certificate:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "sslEnabled": true,
    "sslData": 42,
}'
```

</tabpanel>
</tabs>
