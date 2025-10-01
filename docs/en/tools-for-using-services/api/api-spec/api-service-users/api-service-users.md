Use Service Users REST API to manage [service accounts](/en/tools-for-using-services/account/concepts/service-accounts):

- view the list of service accounts
- view, create, and delete service accounts
- download an OpenStack RC file to use for authentication as a service account

{cut(Obtaining an endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. [Enable](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#enabling_2fa) two-factor authentication if it hasn't been done yet.
1. Enable API access if it hasn't been done yet:

   1. Click the username in the page header and select **Security**.
   1. Turn on API access.

1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack Service** block, locate the **Service Users** endpoint. If there is none, use `https://msk.cloud.vk.com/service-users/`.
1. [Obtain](/en/tools-for-using-services/api/rest-api/case-keystone-token) the `X-Auth-Token` access token. Use the token in the header when sending requests.

{/cut}

{note:info}

You can download the original JSON specification via this [link](assets/api-service-users.json "download").

{/note}

![{swagger}](assets/api-service-users.json)
