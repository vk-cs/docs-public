## Clearing cache

When a CDN resource is not functioning correctly or if origin data has been updated, it may be necessary to partially or fully clear a cache.

To clear a cache of a CDN resource:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Clear the cache with one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the required resource and select **Clear
      CDN cache**.
    - Click the name of the personal domain you need and go to the **Content** tab.

1. In the **Clear cache** section, select the type of clearance:

    - `Full` — completely removes all files from the cache of the CDN resource. Full cache clearance will cause CDN servers to request content from origin servers that increases the load on origins and may destabilize the service. Use selective cache clearance if you need to remove a large volume of content from the cache.
    - `Selective` — allows you to remove individual files from the cache of the CDN resource. In the input field, specify the path or pattern of the path to the files you want to delete. Use the following characters for the pattern:

       - Use `/` or `*` at the beginning of the path.
       - Use `*` to replace any number of characters in the path.

1. Click **Clear cache**.

</tabpanel>
<tabpanel>

Use the `POST /projects/{project_id}/resources/{resources_id}/purge` [method](/ru/tools-for-using-services/api/api-cdn "change-lang").

In the request body specify the following:

- `[]` — to delete all files on the CDN resource.
- The file path without the domain name to clear the cache of a selected file.
- The path pattern to delete certain files. Use the following characters for the pattern:

  - Use `/` or `*` at the beginning of the path.
  - Use `*` to replace any number of characters in the path.

Example request for clearing the cache of a CDN resource:

```json
curl --location --request POST 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281/purge'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "paths": [
        "/test.jpg",
        "/static/*",
        "*.png",
        "*/images/*",
        "*/pictures/*.jpg"
    ]
}'
```

</tabpanel>
</tabs>

## Preloading cache

You can upload content in a cache of a CDN resource in advance, before end users request it. It can help [reduce the load](../../../concepts/about) of origin servers. Preloading is relevant for files larger than 200 MB.

<warn>

To update files on a CDN, first [clear a cache](#clearing_cache) of the CDN resource, and then upload new.

</warn>

To preload a cache of a CDN resource:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Upload the content with one of the following ways:

    - Click ![ ](/en/assets/more-icon.svg "inline") for the required resource and select **Uploading to CDN**.
    - Click the name of the personal domain you need and go to the **Content** tab.

1. In the **Filling the cache** specify the path to the files on the origin without the domain name and one per line.
1. Click **Fill cache**.

</tabpanel>
<tabpanel>

Use the `POST /projects/{project_id}/resources/{resources_id}/prefetch` [method](/ru/tools-for-using-services/api/api-cdn "change-lang").

In the body of the request, specify paths to the files that need to be loaded, without the domain name.

Example request for cache preloading of a CDN resource:

```json
curl --location --request POST 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281/prefetch'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "paths": [
        "/video.mp4",
        "video.mp4"
        ]
    }'
```

</tabpanel>
</tabs>

## Configuring HTTP response codes

The **Enable returning HTTP response code** option allows you to set the HTTP response code for content hosted on a CDN resource. For example, you can configure a redirection to another URL or send the 403 code to end-users when requesting certain files.

To configure the HTTP response code:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Content** tab.
1. Enable the **Enable returning HTTP response code** option.
1. Specify a responce code. For instance, `403`.
1. Enter the URL for redirection or text for the response code.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `force_return` parameters in the `options` block of a request body:

- To enable the option, specify `"enabled": true`; to disable it — `"enabled": false`.
- Specify the HTTP response code in the `code` parameter. For example, `"code": 403`.
- Specify the URL or response code text in the `body` parameter.

Example request with settings for the HTTP 403 response:

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
        "force_return": {
            "enabled": true,
            "code": 403,
            "body": "Access denied"
        }
    }
}'
```

</tabpanel>
</tabs>

## GZip compression

Files arriving at the CDN resource can be compressed using the GZip method. The average compression ratio if this method is 70%, sometimes it can reach 90%. The minimum file size for compression is 128 bytes.

When you use the GZip compression method, uncompressed files are requested from the origin, so the option does not work in conjunction with [origin compression](#origin_compression) and [large file delivery optimization](#large_file_delivery_optimization).

To enable GZip compression:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Content** tab.
1. Enable the **GZip compression** option.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `gzipOn` parameters in the `options` block of a request body.

Example request to enable GZip compression:

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
        "gzipOn": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Brotli compression

Files arriving at a CDN resource can be compressed using the Brotli method. This method provides stronger compression than GZip. For instance, for text files, Brotli compression exceeds GZip by an average of 20%. The minimum file size for compression is 128 bytes.

When using the Brotli compression method, uncompressed files are requested from the origin, and compression occurs on a special pre-cache server. The pre-cache server stands between the origin server and the CDN servers, protecting the origin server from high load. Origin server protection using a pre-cache server (shielding) is a paid option. To enable it, contact [technical support](mailto:support@mcs.mail.ru).

The option does not work in conjunction with [origin compression](#origin_compression) and [large file delivery optimization](#large_file_delivery_optimization).

To enable Brotli compression:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Content** tab.
1. Enable the **Enable Brotli compression** option.
1. Select the data types of the content to be compressed. The type `text/html` is selected by default and cannot be removed from the list.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `brotli_compression` parameters in the `options` block of a request body.

Example request to set up Brotli compression:

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
        "brotli_compression": {
            "enabled": true,
            "value": [
                "text/html",
                "application/xml+rss",
                "application/xml"
            ]
        }
    }
}'
```

</tabpanel>
</tabs>

## Origin compression

Content compression at the origin accelerates content delivery: the content is transferred to the CDN server in compressed form, reducing data transmission time. For the option to work correctly, the origin must support compression.

The option does not work in conjunction with [GZip compression](#gzip_compression), [Brotli compression](#brotli_compression) and [large file delivery optimization](#large_file_delivery_optimization).

To have a CDN resource request compressed content from an origin:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Content** tab.
1. Enable the **Request compression at source** option.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `fetch_compressed` parameters in the `options` block of a request body.

Example request to set up compression at an origin:

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
        "fetch": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>

## Large file delivery optimization

To optimize delivery, large files are transferred from an origin to a CDN resource and stored in a cache not in full, but in parts of 10 MB each. The CDN resource will start transferring the file to users sooner and will also be able to transfer the file in parts to multiple users simultaneously.

For the option to work correctly, the origin must support HTTP Range requests. If an origin group is used for the resource, the files on each of the origins used must contain identical Content-Length and ETag headers.

After enabling or disabling the option, caching keys will change, and content will be requested from the origin again.

<warn>

To reduce the load on the origin, manage the option during off-peak hours and contact [technical support](mailto:support@mcs.mail.ru) to protect the origin with a pre-cache server.

</warn>

The option does not work in conjunction with [GZip compression](#gzip_compression), [Brotli compression](#brotli_compression) and  [origin compression](#origin_compression).

To enable the optimization of large file delivery:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Content** tab.
1. Enable the **Enable Large File Delivery Optimization** option.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `slice` parameters in the `options` block of a request body.

Example request to set up large file delivery optimization:

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
        "slice": {
            "enabled": true,
            "value": true
        }
    }
}'
```

</tabpanel>
</tabs>
