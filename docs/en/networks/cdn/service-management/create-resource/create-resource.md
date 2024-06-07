You can create a CDN resource in two ways:

- [Through the CDN service interface](#creating_resource_via_cdn_service_interface). Use this option if you need to specify third-party [content origins](../../concepts/about) or configure SSL certificates manually.

- [Through the bucket interface](#creating_resource_via_bucket_interface) in the Cloud Storage(/en/storage/s3) service. Use this option for the bucket to act as the content source. A corresponding CDN resource for the bucket will be automatically created, and SSL certificates will also be automatically configured.

## Creating resource via CDN service interface

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)[tags=resources]}

1. Click **Create resource**.
1. Enable the option **Access to content by end users** to manage availability of the CDN resource:

   - (By default) If the option is disabled, the CDN resource goes into `Suspended` state after creation. Content will not be [delivered to users](../../concepts/about).
   - If the option is enabled, the CDN resource goes into `Active` state after creation. Сontent will be delivered to users.

   You can [enable or disable](../manage-cdn/enable-cdn) access to content after creating the CDN resource as well.

1. Set up the interaction of the CDN resource with origins:

   - **Source interaction protocol**: select the protocol that [CDN servers](../../concepts/about) will use to request content from the origins:

       {include(/en/_includes/_cdn_origin.md)[tags=http]}

   - **Content request**: select the type of origins that CDN servers will request content from:

     <tabs>
     <tablist>
     <tab>(By default) From one origin</tab>
     <tab>From group of origin</tab>
     </tablist>
     <tabpanel>

     {include(/en/_includes/_cdn_origin.md)[tags=content_source]}

     An origin group with a single origin will be automatically created after the CDN resource is set up.

     </tabpanel>
     <tabpanel>

     Select an origin group from the drop-down list.

     If the required group is not in the list, click **Add source group** and add [new origin group](../manage-origin-groups).

     </tabpanel>
     </tabs>

1. In the **Personal domain** field, specify the personal domain that will be used for the CDN. When users request this domain, content will be delivered using the CDN. Use the Fully Qualified Domain Name (FQDN). Do not add a root domain name: you can use `cdn.example.com`, but not `cdn.example.com.`.

1. (Optional) Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add domain** to specify additional personal domains.

1. (Optional) Click ![trash-icon](/en/assets/trash-icon.svg "inline") to remove the domain you no longer need.

   <warn>

   You cannont change personal domains after creating a CDN resource.

   </warn>

1. Save the original domain name that needs to be set in the CNAME record for the specified domains.

1. Specify the **SSL-certificate** parameter. SSL will be used to access the previously configured personal domains via HTTPS:

   - **Do not use**: the certificate is not used, personal domains are only accessible via HTTP.
   - (By default) **Let's Encrypt**: [Let's Encrypt](https://letsencrypt.org) certificate is used. The certificate will be created after the CDN resource is created. It needs available origin servers and the DNS changes related to CNAME records for personal domains. This typically takes up to 30 minutes.

   <warn>

   The option needs the **Access to content by end users** option to be enabled.

   </warn>

   - **User's certificate**: you can select your SSL certificate from the list. To make the certificate available for selection, add it to the [certificate store](../manage-certificates).

1. Select whether to alter the `host` HTTP header value when accessing the previously configured origins.

   CDN servers specify the mandatory [Host](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host) header in HTTP when request content from origins. This header allows you to address the appropriate virtual host on the origins.

   {include(/en/_includes/_cdn_origin.md)[tags=host]}

1. Click **Create resource**.

</tabpanel>
<tabpanel>

To create a CDN resource, use the `POST /projects/{project_id}/resources/` [method](/ru/tools-for-using-services/api/api-cdn "change-lang").

Request example:

```json
curl --location --request POST 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
   "cname": "cdn.example.com",
   "originGroup": 132,
   "secondaryHostnames": [
      "1.example.com",
      "2.example.com"
   ]
}'
```
</tabpanel>
</tabs>

## Creating resource via bucket interface

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud personal account.
1. Select the project where the bucket you need is located. If you do not have the bucket, [create it](/ru/storage/s3/service-management/buckets/create-bucket "change-lang").
1. Go to the **Cloud Storage → Buckets** section.
1. Click the name of the bucket you need.
1. Go to the **CDN** tab.
1. Enable the **Use CDN for this bucket** option.

   To make the bucket able to be an origin for a CDN resource, select the `public-read` ACL, then [create objects in this bucket](ru/storage/s3/service-management/objects/upload-object "change-lang").

1. In the **Personal domain** field enter the personal domain, what should be used for CDN. When requesting this domain, content will be delivered via CDN. Use the Fully Qualified Domain Name (FQDN). Do not add a root domain name: you can use `cdn.example.com`, but not `cdn.example.com.`.

1. (Optional) Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add domain** to specify additional personal domains.

1. (Optional) Click ![trash-icon](/en/assets/trash-icon.svg "inline") to remove the domain you no longer need.

   <warn>

   You cannont change personal domains after creating a CDN resource.

   </warn>

1. Save the original domain name, which needs to be set in the CNAME record for the specified domains.

1. Select the **Cache lifetime** from the list.

   This allows cache during the specified period the following HTTP-answers: [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), [201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201), [204](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204), [206](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206), [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303), [304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304), [307](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), [308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308).

   Other HTTP answers are not cached.

   (Optional) Select **Don't cache** to disable caching.

1. Click **Save changes**.

The creation of the origin group and CDN resource will start for the bucket. The created items will be available in the **CDN** section of your VK Cloud personal account.

</tabpanel>
</tabs>

## Preparing the CDN resource for operation

1. Create a CNAME record for the CDN resource. This will change the URL address. For example, if you are using a CDN resource to serve images for your website, create a CNAME record like `images.example.com` that points to a CDN resource like `cl-541e19d9.service.cdn.msk.vkcs.cloud`.

   If you use the DNS VK Cloud service, follow the [instructions](/ru/networks/dns/publicdns#dobavlenie_resursnyh_zapisey "change-lang").

   If you did not save the original domain when created, you can find it in the CDN resource information:

   {include(/en/_includes/_open-cdn.md)}

1. Replace the original domain in the path to static files with the personal domain.

1. [Upload content](../manage-cdn/content-settings#preloading_cache) in the VK Cloud interface (if the CDN resource was not created from a bucket).
