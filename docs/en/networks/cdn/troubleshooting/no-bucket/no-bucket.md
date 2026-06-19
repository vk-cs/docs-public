When using a CDN with a VK Object Storage bucket as the origin, the user instead of the requested content receives an XML file:

```xml
<Error>
  <Code>NoSuchBucket</Code>
  <Message>The specified bucket does not exist</Message>
  <RequestId>VHT...jh1c</RequestId>
</Error>
```

The problem occurs because, by default, the CDN resource settings use the Host header parameter set to `Forward`. This setting returns the name of the first configured custom domain as the header value, and the bucket search is performed based on this value.

## Solution

[Change the Host header](/en/networks/cdn/instructions/manage-cdn/origin-settings#changing_host_header): set a custom header in the format `<BUCKET_NAME>.<SERVICE_DOMAIN>`.

Here:

*   `<BUCKET_NAME>` is the name of the VK Object Storage bucket containing the required content.
*   `<SERVICE_DOMAIN>` is the VK Object Storage service domain, which must match the account [region](/en/tools-for-using-services/account/concepts/regions):
    *   `hb.vkcloud-storage.ru` or `hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
    *   `hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

