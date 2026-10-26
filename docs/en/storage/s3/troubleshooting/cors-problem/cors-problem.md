# {heading(CORS error when uploading files to a bucket by a web application)[id=s3-cors-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

A web application attempts to upload a file to a {var(s3)} bucket, but the request is blocked by the browser. The developer console displays an error related to {linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} rules, for example, `Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy`.

The problem occurs due to the web browser security mechanism Same-Origin Policy (SOP). This mechanism prevents a script on one origin from making requests to another origin unless it is explicitly allowed. To allow such interaction, {var(s3)} must return special HTTP headers.

### {heading(Solution)[id=s3-cors-problem-resolve]}

Check and fix the {linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]} rules:

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../instructions/iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the target bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Click ![Menu](../../assets/more-icon.svg "inline") for the target bucket and select **Settings**.
1. Go to the **CORS** tab.
1. {linkto(../../instructions/access-management/cors#s3-instructions-cors)[text=Add or edit]} the CORS rule:

   - `AllowedOrigins`: specify the domain of your web application. Using the `*` character will allow access from any domain.
   - `AllowedMethods`: specify the HTTP method that your web application uses for uploading, for example, `PUT` or `POST`.
   - `AllowedHeaders`: specify the allowed request headers from the web application, for example, `Content-Type`, `Authorization`, `x-amz-acl`. Using the `*` character will allow requests with any headers.