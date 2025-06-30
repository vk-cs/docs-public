[Anycast](/en/networks/vnet/instructions/ip/anycast-ip) REST API supports Anycast IP address management:

- viewing the list of Anycast IP addresses in a project
- viewing, creating, editing, and deleting an IP address
- binding and unbinding a port to an Anycast IP address
- adding health checks for bound ports

{cut(Obtaining an endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. [Enable](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#enabling_2fa) two-factor authentication if it hasn't been done yet.
1. Enable API access if it hasn't been done yet:

   1. Click the username in the page header and select **Security**.
   1. Turn on API access.

1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Access** tab.
1. Navigate to the **API Endpoints** tab.
1. In the **OpenStack Service** block, find the **Neutron** endpoint.
1. [Obtain](/en/tools-for-using-services/api/rest-api/case-keystone-token) the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. Use the URL `<OS_NEUTRON_URL>/v2.0/` in the request line. Here, `<OS_NEUTRON_URL>` is the **Neutron** endpoint.

Example request:

```curl
curl --location "https://infra.mail.ru:9696/v2.0/anycastips" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX" \
--header 'Content-Type: application/json'
```

{/cut}

{note:info}

You can download the original JSON specification via this [link](assets/api-anycast.json "download").

{/note}

![{swagger}](assets/api-anycast.json)