Use the **Billing** service API to learn the [balance](/en/intro/billing/concepts/balance) of your VK Cloud project.

{cut(Obtaining an endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) your VK Cloud management console.
1. [Enable](/en/access/iam/instructions/manage-2fa) two-factor authentication if not done so already.
1. [Enable](/en/tools-for-using-services/api/rest-api/enable-api) API access if not done so already.
1. [Get](/en/tools-for-using-services/api/rest-api/case-keystone-token) your `X-Auth-Token` access token. Use it in the header when sending requests.
1. In the query string, use the following endpoint: `https://msk.cloud.vk.com/billing/public/v1/projects/<PID>/balances/amount`, where `<PID>` is your [project ID](/en/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#getting_project_id).

Request example:

```console
curl -X GET "https://msk.cloud.vk.com/billing/public/v1/projects/mcs1234567890/balances/amount" \
-H "X-Auth-Token: abcdef1234567890"
```

{/cut}

{note:info}
You can download the original JSON specification via this [link](assets/api-billing.json "download").
{/note}

![{swagger}](assets/api-billing.json)
