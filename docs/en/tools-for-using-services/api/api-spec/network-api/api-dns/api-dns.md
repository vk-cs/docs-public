# {heading(Managing public DNS zones)[id=api-spec-dns]}

{include(/en/_includes/_translated_by_ai_en.md)}

The REST API of {linkto(../../../../../networks/dns/instructions/publicdns#dns-publicdns)[text=public DNS]} supports resource management:

- viewing lists of DNS zones and their records;
- creating DNS zones and their records;
- viewing parameters of DNS zones and their records;
- modifying DNS zones and their records;
- deleting DNS zones and their records.

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if you have not done so yet.
1. {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if you have not done so yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack service** block, find the **Publicdns** endpoint.
1. {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.

Example request:

```curl
curl --location "https://mcs.mail.ru/public-dns/v2/dns/" \
--header "X-Auth-Token: gAAAAABlLjgzyxXXXX" \
--header "Content-Type: application/json"
```
{/cut}

{note:info}
You can download the original JSON specification using this [link](assets/public-dns-api.json "download").
{/note}

![{swagger}](assets/public-dns-api.json)