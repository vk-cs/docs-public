{includetag(s3_create_cdn_all)}

{tabs}

{tab(Management console)}

1. [Go](https://msk.cloud.vk.ru/app) to the {var(cloud)} management console.
{/includetag}
{includetag(s3_create_cdn_s3)}
1. Select the project that contains the bucket you need. If you don't have a bucket yet, {linkto(../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=create one]}.
{/includetag}
{includetag(s3_create_cdn_net)}
1. Select the project that contains the bucket you need. If you don't have a bucket yet, {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=create one]}.
{/includetag}
{includetag(s3_create_cdn_all)}
1. Go to the **Object Storage** → **Buckets** section.
1. Go to the bucket settings using one of the following methods:
{/includetag}

{includetag(s3_create_cdn_s3)}
   - Click ![ ](../../../../../assets/more-icon.svg "inline") for the bucket you need and select **Settings**.
   - Click the name of the bucket you need, then on the bucket page click the ![ ](../../../../../assets/settings-icon.svg "inline") button.
{/includetag}

{includetag(s3_create_cdn_net)}
   - Click ![ ](../../../../assets/more-icon.svg "inline") for the bucket you need and select **Settings**.
   - Click the name of the bucket you need, then on the bucket page click the ![ ](../../../../assets/settings-icon.svg "inline") button.
{/includetag}

{includetag(s3_create_cdn_all)}
1. Go to the **CDN** tab.
1. Select the **Use CDN for this bucket** option.
{/includetag}

{includetag(s3_create_cdn_s3)}
   For the bucket to be able to act as a source for a CDN resource, select the `public-read` ACL when {linkto(../../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=adding objects to this bucket]}.
{/includetag}

{includetag(s3_create_cdn_net)}
   For the bucket to be able to act as a source for a CDN resource, select the `public-read` ACL when {linkto(../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=adding objects to this bucket]}.
{/includetag}

{includetag(s3_create_cdn_all)}
1. Set up one or more custom domains.

   1. Specify the domains to be used for the CDN. When these domains are accessed for content, the content will be delivered via the CDN.

      You can specify one domain in the **Custom domain** field. Use the fully qualified domain name (FQDN). Don't add the root domain name to it: `cdn.example.com` is valid, but `cdn.example.com.` is not.
{/includetag}

{includetag(s3_create_cdn_s3)}
      To specify multiple domains, click ![plus-icon](../../../../../assets/plus-icon.svg "inline") **Add domain**. You can remove domains you don't need by clicking the ![trash-icon](../../../../../assets/trash-icon.svg "inline") icon next to them.
{/includetag}

{includetag(s3_create_cdn_net)}
      To specify multiple domains, click ![plus-icon](../../../../assets/plus-icon.svg "inline") **Add domain**. You can remove domains you don't need by clicking the ![trash-icon](../../../../assets/trash-icon.svg "inline") icon next to them.
{/includetag}

{includetag(s3_create_cdn_all)}

      {note:warn}
      Once a CDN resource is created, these custom domains cannot be changed.
      {/note}

   1. Save the service domain name that you need to specify in the CNAME record for the domains you specified.

      A hint with this information is provided below.

   1. Add a CNAME record for each custom domain in your DNS zone settings. Use the service domain name as the alias.
{/includetag}

{includetag(s3_create_cdn_s3)}
      If you use the DNS service from {var(cloud)}, follow {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=the instructions]}.
{/includetag}

{includetag(s3_create_cdn_net)}
      If you use the DNS service from {var(cloud)}, follow {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=the instructions]}.
{/includetag}

{includetag(s3_create_cdn_all)}
      You can also add CNAME records after the CDN resource is created.

1. Select the cache TTL you need from the drop-down list.

   This parameter allows you to cache responses with the following HTTP statuses for the specified time: [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), [201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201), [204](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204), [206](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206), [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303), [304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304), [307](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), [308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308).

   Responses with other statuses are not cached.

   (Optional) You can disable caching completely by selecting **Don't cache**.

1. Click **Save changes**.
1. Wait for the origin group and the CDN resource for the bucket to be created. The created objects will be available in the **CDN** section of the management console.
{/includetag}
{includetag(s3_create_cdn_s3)}
1. {linkto(../../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=Set]} the Host header in the format `<BUCKET_NAME>.<SERVICE_DOMAIN>`.
{/includetag}
{includetag(s3_create_cdn_net)}
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=Set]} the Host header in the format `<BUCKET_NAME>.<SERVICE_DOMAIN>`.
{/includetag}
{includetag(s3_create_cdn_all)}

   Where:

   - `<BUCKET_NAME>` is the name of the VK Object Storage bucket containing the content you need.
{/includetag}
{includetag(s3_create_cdn_s3)}
   - `<SERVICE_DOMAIN>` is the VK Object Storage service domain, which must match the {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} of your account:
{/includetag}
{includetag(s3_create_cdn_net)}
   - `<SERVICE_DOMAIN>` is the VK Object Storage service domain, which must match the {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} of your account:
{/includetag}
{includetag(s3_create_cdn_all)}
     - `hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` for the Moscow region;
     - `hb.kz-ast.vkcloud-storage.ru` for the Kazakhstan region.

{/tab}

{/tabs}

{/includetag}