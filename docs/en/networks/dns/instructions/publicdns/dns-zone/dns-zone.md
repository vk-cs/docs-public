# {heading(DNS zones)[id=dns-dns-zone]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Viewing the list of DNS zones)[id=dns-dns-zone-list]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=method]} `GET /v2/dns/`.

Example request:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/?soa_admin_email=admin@dns.mail.ru' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Example response:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 329

[{
    "uuid": "86b136b3-XXXX-XXXX-XXXX-1818b12958c3",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 5,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "pending"
}]
```

{/tab}

{/tabs}

## {heading(Creating a DNS zone)[id=dns-dns-zone-add]}

A DNS zone is a logical grouping of the domain names of your resources that contains their resource records.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the **Add zone** button.
1. Configure the DNS zone parameters:

   - **DNS zone**: the name of the zone being created, for example, a domain that was previously purchased.

     {note:info}
     The DNS zone name must contain at least one dot and must not end with a dot or digits.
     {/note}

   - **Contact email**: the email of the zone administrator.
   - **Time to expire**: the time (in seconds) after which the secondary NS server stops responding to requests for this zone if the primary NS server is not responding. This value must be greater than the sum of the values in the **Time to refresh** and **Time to retry** fields.
   - **Time to refresh**: the time (in seconds) after which the secondary NS server must request the SOA record from the primary one to keep track of changes in the zone.
   - **Time to retry**: the time (in seconds) after which the secondary NS server requests the SOA record from the primary one again if the primary NS server did not respond. This value must be less than the value specified in **Time to refresh**.
   - **Time to live (TTL)**: the cache lifetime in case of a negative response to a query in the zone.

1. Click the **Add zone** button.
1. Contact the owner of the [specified](https://msk.cloud.vk.ru/app/services/dns/list) domain to delegate zone management to the {var(cloud)} DNS servers.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=method]} `POST /v2/dns/`.

Example request:

```curl

curl --location 'https://mcs.mail.ru/public-dns/v2/dns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "zone": "example.com",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400
}'
```

Example response

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a
content-type: application/json
content-length: 319
        
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 1,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "pending"
}
```

{/tab}

{/tabs}

{note:info}
With most providers, you can delegate zone management yourself. If you have any questions about how to do this, contact the owner of the [specified](https://msk.cloud.vk.ru/app/services/dns/list) domain for assistance.
{/note}

## {heading(Viewing a DNS zone)[id=dns-dns-zone-view]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired zone and select **Edit**.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=method]} `GET /v2/dns/<dns-uuid>`.

Example request:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Example response:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 321

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin@dns.mail.ru",
    "soa_serial": 3,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "active"
}
```

{/tab}

{/tabs}

## {heading(Editing a DNS zone)[id=dns-dns-zone-edit]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired zone and select **Edit**.
1. Make the changes and click the **Save changes** button.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=method]} `PUT /v2/dns/<dns-uuid>`.

Example request:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
  "soa_admin_email": "admin-new@dns.mail.ru"
}'
```

Example response:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 330

{
    "uuid": "bfce6153-XXXX-XXXX-XXXX-6788b25a1b6a",
    "tenant": "b5b7ffd4-XXXX-XXXX-XXXX-f44555df8f67",
    "soa_primary_dns": "ns1.mcs.mail.ru",
    "soa_admin_email": "admin-new@dns.corp.mail.ru",
    "soa_serial": 3,
    "soa_refresh": 86400,
    "soa_retry": 7200,
    "soa_expire": 3600000,
    "soa_ttl": 86400,
    "zone": "example.com",
    "status": "active"
}
```

{/tab}

{/tabs}

## {heading(Creating a DNS subzone)[id=dns-dns-zone-subzone-add]}

A subzone is a DNS zone located one level below the current one. For example, for the `example.com` domain, the subzone would be `subzone.example.com`.

A subzone can be created:

- In the same project where the main zone is located. This approach is used to separate the resource records of the subzone from the records of the main zone.
- With a third-party DNS provider.

{note:warn}
You cannot create a subzone for a zone in another project.
{/note}

To create a subzone in the {var(cloud)} project, [create](#dns-dns-zone-add) two NS resource records with the subzone name, delegating the subzone again to the {var(cloud)} DNS servers.

{note:info}
If you want to create a subzone with a third-party provider, the created NS records must point to the third-party provider's DNS servers.
{/note}

After creating the NS records, you can create a zone for the delegated subdomain.

## {heading(Deleting a DNS zone)[id=dns-dns-zone-delete]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete several zones at once by selecting them using the checkboxes.

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired zone and select **Delete**.
1. Confirm the action.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=method]} `DELETE /v2/dns/<dns-uuid>`.

Example request:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/6f981b26-XXXX-XXXX-XXXX-464adb32e5bd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Example response:

```json
HTTP/1.1 204 No Content
```

{/tab}

{/tabs}