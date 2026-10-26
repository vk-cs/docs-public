# {heading(Cloud Databases)[id=api-spec-dbaas]}

{include(/en/_includes/_translated_by_ai_en.md)}

The API of the {linkto(../../../../dbs/dbaas#dbaas-dbaas)[text=Cloud Databases]} service supports working with cloud databases:

- getting information about the capabilities of instances, clusters, and data stores;
- managing databases, data stores, instances, and clusters;
- managing configurations;
- managing backups;
- managing users;
- viewing the billing log.

{cut(Getting an endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been done yet.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. Find the **Trove** endpoint in the **OpenStack service** block.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Get]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the original JSON specification using this [link](assets/dbaasapi-swagger.json "download").
{/note}

![{swagger}](assets/dbaasapi-swagger.json)