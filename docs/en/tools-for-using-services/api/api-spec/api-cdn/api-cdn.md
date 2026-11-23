# {heading(CDN)[id=api-spec-cdn]}

The [CDN](../../../../networks/cdn) REST API supports managing and monitoring CDN resources:

- viewing the canonical domain record (CNAME) of the current account;
- creating and managing origin groups;
- creating and managing CDN resources;
- obtaining and revoking a [Let's Encrypt](https://letsencrypt.org/ru/) certificate;
- viewing, adding, editing, and deleting SSL certificates;
- preloading files to a CDN server;
- purging the CDN server cache;
- monitoring the health of CDN resources.

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) your {var(cloud)} management console.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API access** tab.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. In the query string, use the endpoint `https://msk.cloud.vk.com/api/cdn/api/v1/`.

Request example:

```curl
curl --location "https://msk.cloud.vk.com/api/cdn/api/v1/projects/example4ef0547e5b222f/resources" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX"
```

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/api-cdn.json "download").
{/note}

![{swagger}](assets/api-cdn.json)
