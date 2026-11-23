Use the **Billing** service API to learn the [balance](/en/intro/billing/concepts/balance) of your VK Cloud project.

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) your {var(cloud)} management console.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. In the query string, use the endpoint `https://msk.cloud.vk.com/billing/public/v1/projects/<PID>/balances/amount`, where `<PID>` is your [project ID](/en/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#getting_project_id).

Request example:

```console
curl -X GET "https://msk.cloud.vk.com/billing/public/v1/projects/mcs1234567890/balances/amount" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/api-billing.json "download").
{/note}

![{swagger}](assets/api-billing.json)
