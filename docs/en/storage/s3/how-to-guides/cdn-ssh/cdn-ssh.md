# {heading(Deploying an Astro site to object storage with CDN)[id=cdn-ssh]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using {var(s3)} and CDN, you can deploy a static site built with the Astro framework, with global content delivery and low latency. Object storage acts as serverless hosting for the frontend, while the CDN provides caching on edge servers and content delivery over HTTPS.

The following data is used as an example:

- Bucket name: `astro-site-bucket`
- Site domain name: `astro.example.com`
- Directory of the built project: `./dist`
- Storage endpoint: `https://hb.ru-msk.vkcloud-storage.ru`

## {heading(Preparation steps)[id=cdn-ssh-prepare]}

1. Make sure that AWS CLI is {linkto(../../connect/s3-cli#s3-connect-cli)[text=installed and configured]}.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket)[text=Create a bucket]} in {var(s3)} with the following parameters:

   - Name: `astro-site-bucket`. The bucket name must comply with the {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=naming rules]}.
   - Storage class: `Hotbox` — suitable for quickly serving a large number of files.

1. Install [Node.js](https://nodejs.org/) version 18 or higher, if not already installed.
1. Create an Astro project:
   
   ```console
   npm create astro@latest
   ```

1. Make sure you have access to managing DNS records for the `astro.example.com` domain.

## {heading(1. Build the Astro project)[id=cdn-ssh-step1]}

1. Navigate to the Astro project directory.
1. Make sure that static output is configured in the `astro.config.mjs` file:
   
   ```javascript
   import { defineConfig } from 'astro/config';

   export default defineConfig({
     output: 'static',
   });
   ```

1. Build the project:
   
   ```console
   npm run build
   ```

   The `./dist` directory will contain the site's static files: `index.html`, error pages, images, CSS and JavaScript files.

1. Make sure that the `index.html` and `404.html` files are present in the root of `./dist`. If the `404.html` file was not created automatically, create it manually.

## {heading(2. Configure the bucket for static site hosting)[id=cdn-ssh-step2]}

{linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site-setup)[text=Configure]} the static site configuration. In the configuration, specify the index document and the error page for the bucket. 
This can be done via a {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=configuration file]} or directly in an AWS CLI command:

```console
aws s3api put-bucket-website \
  --bucket astro-site-bucket \
  --website-configuration '{"IndexDocument":{"Suffix":"index.html"},"ErrorDocument":{"Key":"404.html"}}' \
  --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

Here:

- `index.html` — the document served when the bucket root is accessed.
- `404.html` — the document served when a 404 error occurs.

After configuring, the static site will be available at: `https://astro-site-bucket.hb-website.hb.ru-msk.vkcloud-storage.ru`

{note:info}
Static website hosting in {var(s3)} is available over HTTP. HTTPS access is configured when {linkto(#cdn-ssh-step5)[text=setting up the CDN resource]}.
{/note}

## {heading(3. Configure access permissions and CORS)[id=cdn-ssh-step3]}

1. Configure public read access for the site objects. Use one of the following methods.

   {tabs}

   {tab(Access policy (recommended))}
   
   1. Create a `policy.json` file with a policy that allows anonymous reading of objects:
   
      ```json
      {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": ["arn:aws:s3:::astro-site-bucket/*"]
         }
      ]
      }
      ```
   
   1. Apply the policy:
   
      ```console
      aws s3api put-bucket-policy \
      --bucket astro-site-bucket \
      --policy file://policy.json \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```
   
   {/tab}

   {tab(ACL)}
   
   Set the standard `public-read` ACL for the bucket:
   
   ```console
   aws s3api put-bucket-acl \
     --bucket astro-site-bucket \
     --acl public-read \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   When uploading objects, also specify the `--acl public-read` flag so that each object is readable.
   {/tab}

   {/tabs}

   {note:warn}
   Public read access allows any user to download objects from the bucket. Do not upload confidential data to this bucket. Charges for operations with the bucket are billed to its owner.
   {/note}

1. {linkto(../../instructions/access-management/cors#s3-instructions-cors-add)[text=Configure CORS]} for the bucket if the site makes cross-domain requests to resources in the storage.

   An example CORS XML configuration:
   
   ```xml
   <CORSConfiguration>
     <CORSRule>
       <AllowedOrigin>https://astro.example.com</AllowedOrigin>
       <AllowedMethod>GET</AllowedMethod>
       <AllowedMethod>HEAD</AllowedMethod>
       <AllowedHeader>*</AllowedHeader>
       <MaxAgeSeconds>3000</MaxAgeSeconds>
     </CORSRule>
   </CORSConfiguration>
   ```

   Here:

   - `AllowedOrigin` — the site domain from which requests to the bucket are allowed.
   - `AllowedMethods` — HTTP methods allowed in requests.
   - `MaxAgeSeconds` — the time the results of a preflight request are cached in the browser.

## {heading(4. Upload the site files to the bucket)[id=cdn-ssh-step4]}

1. Synchronize the contents of the `./dist` directory with the bucket using AWS CLI:
   
   ```console
   aws s3 sync ./dist s3://astro-site-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   The command uploads only new and modified files, which speeds up repeated deployments.

   {note:info}
   You can also use rclone or {linkto(../../connect/s3-file-managers#s3-connect-file-managers)[text=file managers]} (CyberDuck, WinSCP) for synchronization.
   {/note}

1. Make sure the files are uploaded:
   
   ```console
   aws s3 ls s3://astro-site-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(5. Connect the CDN and bind the domain)[id=cdn-ssh-step5]}

1. {linkto(../../../../networks/cdn/instructions/create-resource#cdn-create-resource-bucket-ui)[text=Create]} a CDN resource via the interface of the `astro-site-bucket` bucket. Specify the following parameters:

   * **Custom domain**: `astro.example.com`.
   * **Cache lifetime**: `4`. For a static site, a value from `1` to `7` days is recommended.

1. Click **Go to CDN resource** to open the **CDN** section for further configuration.
1. Save the service domain name of the CDN resource (for example, `cl-541e19d9.service.cdn.msk.vkcs.cloud`) — you will need it to create a CNAME record.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/enable-cdn#cdn-enable-cdn)[text=Enable]} content access for end users. This is necessary so that you can then select [Let's Encrypt](https://letsencrypt.org/ru/) as the SSL certificate.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-protocol)[text=Select]} HTTPS as the origin communication protocol for the CDN resource to ensure secure data transfer to users. This is also required to use Let's Encrypt as the SSL certificate.
1. In the CDN resource encryption settings, select the **Let's Encrypt** option — a free SSL certificate will be used, which is created automatically after the CNAME records are propagated in DNS (usually up to 30 minutes).
For more information on managing SSL certificates, see the {linkto(../../../../networks/cdn/instructions/manage-cdn/ssl#cdn-ssl)[text=Using an SSL certificate]} section.
1. Configure the DNS record: create a CNAME record for the `astro.example.com` domain, specifying the saved service domain name of the CDN resource as the alias. If you use the DNS service from {var(cloud)}, follow the {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-record-add)[text=instructions for adding DNS records]}.

## {heading(6. Configure caching rules)[id=cdn-ssh-step6]}

{linkto(../../../../networks/cdn/instructions/manage-cdn/caching#cdn-caching-cdn-resource)[text=Configure]} caching for the CDN resource. For more information about recommended TTL values for different content types, see the {linkto(../../../../networks/cdn/concepts/cache#cdn-cache)[text=Content caching]} section.

## {heading(7. Configure access to your content)[id=cdn-ssh-step8]}

1. {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security-access-policy-domain)[text=Configure]} a domain access policy to prevent other sites from using your resources.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security-access-policy-country)[text=Configure]} a country access policy for your origins to restrict content access based on geography.

## {heading(8. Verify the setup)[id=cdn-ssh-check]}

1. Open the site at `https://astro.example.com` in a browser. The main page of the Astro site should be displayed.

1. Check the error page — open a non-existent URL, for example `https://astro.example.com/nonexistent-page`. The `404.html` page should be displayed.

1. Check the response headers:
   
   ```console
   curl -I https://astro.example.com
   ```

   Make sure that:

   - The `Content-Type` header specifies the correct MIME type.
   - Caching headers from the CDN are present.

1. Check that images and other static resources load correctly.

## {heading(Delete unused resources)[id=cdn-ssh-delete]}

The created resources are {linkto(../../tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]} from the bucket.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]}.
1. {linkto(../../../../networks/cdn/instructions/delete-resource#cdn-delete-resource)[text=Delete the CDN resource]}, if it is no longer needed.