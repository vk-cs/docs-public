# {heading(CDN)[id=api-spec-cdn]}

The [CDN](../../../../networks/cdn)  REST API supports managing and monitoring CDN resources:

- viewing the canonical domain record (CNAME) of the current account;
- creating and managing origin groups;
- creating and managing CDN resources;
- obtaining and revoking a [Let's Encrypt](https://letsencrypt.org/ru/) certificate;
- viewing, adding, editing, and deleting SSL certificates;
- preloading files to a CDN server;
- purging the CDN server cache;
- monitoring the health of CDN resources.

{cut(Obtaining an endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. [Enable](../../../../access/iam/instructions/manage-2fa) two-factor authentication if it has not been done yet.
1. [Enable](../../rest-api/enable-api) API access if it has not been done yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API access** tab.
1. [Get](../../rest-api/case-keystone-token) the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. Use the endpoint `https://msk.cloud.vk.com/api/cdn/api/v1/` in the request URL.

Request example:

```curl
curl --location "https://msk.cloud.vk.com/api/cdn/api/v1/projects/example4ef0547e5b222f/resources" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX"
```

{/cut}

{note:info}
You can download the original specification in JSON format using this [link](assets/api-cdn.json "download").
{/note}

![{swagger}](assets/api-cdn.json)
