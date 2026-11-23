[Anycast](/en/networks/vnet/instructions/ip/anycast-ip) REST API supports Anycast IP address management:

- viewing the list of Anycast IP addresses in a project
- viewing, creating, editing, and deleting an IP address
- binding and unbinding a port to an Anycast IP address
- adding health checks for bound ports

{cut(Getting the endpoint, authorization, and authentication)}

1. [Go to](https://msk.cloud.vk.com/app) your {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been done yet.
1. Enable API access if it has not been done yet:

   1. Click the username in the page header and select **Security**.
   1. Turn on API access.

1. Click the username in the page header and select **Project settings**.
1. Go to the **API Endpoints** tab.
1. In the **OpenStack service** block, find the **Neutron** endpoint.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Obtain]} the `X-Auth-Token` access token. Use the token in the header when sending requests.
1. In the query string, use the URL `<OS_NEUTRON_URL>/v2.0/`, where `<OS_NEUTRON_URL>` is the **Neutron** endpoint.

Request example:

```curl
curl --location "https://infra.mail.ru:9696/v2.0/anycastips" \
--header "X-Auth-Token: gAAAAABlcqk9GAzdp-XXXX" \
--header 'Content-Type: application/json'
```

{/cut}

{note:info}
You can download the source JSON specification via the [link](assets/api-anycast.json "download").
{/note}

![{swagger}](assets/api-anycast.json)