# {heading(Resource records)[id=dns-records]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {var(cloud)} DNS service allows you to publish your zones and records in DNS without deploying your own DNS servers. Public DNS manages DNS zones that are visible on the internet.

## {heading(Setting up the role model)[id=dns-records-role-model]}

To work with public DNS, configure {linkto(../../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=roles]} for users of the {var(cloud)} [management console](https://msk.cloud.vk.ru/app/):

- Role for viewing DNS zones and resource records:

  - Observer.

- Roles for editing DNS zones and resource records:

  - Project owner.
  - Network administrator.
  - Superadministrator.

## {heading(Quotas and limits)[id=dns-records-quotas-limits]}

- The maximum number of DNS zones within a project is 100.
- The maximum number of resource records of each type for a single DNS zone is 500.

## {heading(Viewing the list of DNS zones)[id=dns-records-zone-list]}

{tabs}

{tab(Personal account)}

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

## {heading(Creating a DNS zone)[id=dns-records-zone-add]}

A DNS zone is a logical grouping of the domain names of your resources that contains their resource records.

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the **Add zone** button.
1. Set the DNS zone parameters:

   - **DNS zone**: the name of the zone being created, for example, a domain that was previously purchased.

     {note:info}
     The DNS zone name must contain at least one dot and must not end with a dot or digits.
     {/note}

   - **Contact email**: the zone administrator's email address.
   - **Time to expire**: the time (in seconds) after which the secondary NS server stops responding to requests for this zone if the primary NS server is not responding. The value must be greater than the sum of the values in the **Time to refresh** and **Time to retry** fields.
   - **Time to refresh**: the time (in seconds) after which the secondary NS server must request the SOA record from the primary server to apply changes in the zone.
   - **Time to retry**: the time (in seconds) after which the secondary NS server will request the SOA record from the primary server again if the primary NS server did not respond. The value must be less than the one specified in **Time to refresh**.
   - **Time to live (TTL)**: the cache lifetime for a negative response to a query in the zone.

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

{
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
With most providers, you can delegate zone management yourself. If you have questions about how to do this, contact the owner of the [specified](https://msk.cloud.vk.ru/app/services/dns/list) domain for assistance.
{/note}

## {heading(Viewing a DNS zone)[id=dns-records-zone-view]}

{tabs}

{tab(Personal account)}

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

## {heading(Editing a DNS zone)[id=dns-records-zone-edit]}

{tabs}

{tab(Personal account)}

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

## {heading(Creating a DNS subzone)[id=dns-records-subzone-add]}

A subzone is a DNS zone that is one level below the current zone. For example, for the `example.com` domain, the subzone would be `subzone.example.com`.

A subzone can be created:

- In the same project where the main zone is located. This approach is used to separate the resource records of the subzone from the records of the main zone.
- At a third-party DNS provider.

{note:warn}
It is not possible to create a subzone for a zone in a different project.
{/note}

To create a subzone in a {var(cloud)} project, {linkto(#dns-records-zone-add)[text=create]} two NS resource records with the subzone name that re-delegate the subzone to the {var(cloud)} DNS servers.

{note:info}
If you want to create a subzone with a third-party provider, the created NS records must point to the DNS servers of that third-party provider.
{/note}

After creating the NS records, you can create a zone for the delegated subdomain.

## {heading(Deleting a DNS zone)[id=dns-records-zone-delete]}

{tabs}

{tab(Personal account)}

This is a group operation: if necessary, you can delete several zones at once by selecting them using checkboxes.

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

## {heading(Adding resource records)[id=dns-records-add]}

A resource record is a DNS record of a domain in the domain name system. Using them, you determine where to direct requests that arrive at domain names, and also provide additional information about the domain.

{var(cloud)} supports the following resource record types:

- `A` — a DNS record that maps a domain name to an IPv4 address.
- `AAAA` — a DNS record that maps a domain name to an IPv6 address.
- `NS` — a DNS record that contains the address of the name server serving a given zone or subzone. By default, two `NS` records will be set in the zone. These records are set on the side of the domain name owner to transfer domain management rights to the {var(cloud)} name server.
- `CNAME` — a DNS record that binds an alias to a domain name. It is usually used to bind a subdomain (for example, `www`) to the domain where the content of this subdomain is hosted.
- `MX` — a DNS record that specifies the address of the server handling email.
- `SRV` — a DNS record that defines the host name and port of a server for some network services.
- `TXT` — a DNS record that contains text information for sources outside the domain.

## {heading(Adding resource records)[id=dns-records-record-add]}

To add a resource record:

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the name of the zone for which you need to add a resource record.
1. Click the **Add record** button.
1. Fill in the fields depending on the **Record type** value:

   {cut(CNAME)}

    - **Name** (the alias being added):

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone;
        - `\*.dns.zone` — points to any name in a request to the domain.

    - **Time to live (TTL)**: cache lifetime in seconds.
    - **Value**: the FQDN address of the destination (what the alias being added points to). Maximum length is 255 characters. Must consist of two or more subdomains. Maximum subdomain length is 63 characters. Only digits, Latin letters, and the special characters `.` and `-` are allowed.

   Example: you need to create a CNAME record `www.example.com` pointing to `example.com`. To do this, specify `www` in the **Name** field and `example.com` in the **Value** field.

   {/cut}
   {cut(A)}

    - **Name**:

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone;
        - `\*.dns.zone` — points to any name in a request to the domain.

    - **Time to live (TTL)**: cache lifetime in seconds.
    - **IP address**: an IP address (IPv4). Select from the list of existing VMs or specify a new one.

   {/cut}
   {cut(MX)}

    - **Name**:

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone.

    - **Priority**: host priority. The lower the value, the more preferred the host.
    - **Time to live (TTL)**: cache lifetime in seconds.
    - **Value**: the FQDN address of the mail server. Maximum length is 255 characters. Must consist of two or more subdomains. Maximum subdomain length is 63 characters. Only digits, Latin letters, and the special characters `.` and `-` are allowed.

   {/cut}
   {cut(AAAA)}

    - **Name**:

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone;
        - `\*.dns.zone` — points to any name in a request to the domain.

    - **Time to live (TTL)**: cache lifetime in seconds.
    - **IP address**: an IP address (IPv6).

   {/cut}
   {cut(SRV)}

    - **Name**:

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone;
        - `\*.dns.zone` — points to any name in a request to the domain.

    - **Service**: the symbolic name of the service (for example, `_sip`).
    - **Protocol**: the symbolic name of the protocol (for example, `_tcp` or `_udp`).
    - **Priority**: host priority. The lower the value, the more preferred the host.
    - **Weight**: the weight for hosts with the same priority. The closer this value is to `0`, the lower the chance that the host will be selected.
    - **Port**: the port number used by the SRV service.
    - **Time to live (TTL)**: cache lifetime in seconds.
    - **Host**: the FQDN of the host where the service is running. Maximum length is 255 characters. Must consist of two or more subdomains. Maximum subdomain length is 63 characters. Only digits, Latin letters, and the special characters `.` and `-` are allowed.

   {/cut}
   {cut(TXT)}

    - **Name**:

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone;
        - `\*.dns.zone` — points to any name in a request to the domain.

    - **Time to live (TTL)**: cache lifetime in seconds.
    - **Value**: the text value of the resource record.

   {/cut}
   {cut(NS)}

    - **Name**:

        - `@`, `example.com`, or an empty value — points to the zone itself;
        - `subzone` or `subzone.example.com` — points to the `subzone` subzone.

    - **Time to live (TTL)**: cache lifetime in seconds.
    - **Value**: the address of the NS server, for example, `ns1.mcs.mail.ru` or `ns2.mcs.mail.ru`.

   {/cut}

1. Click the **Add record** button.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=methods]} from the API specification.

Request examples:

{cut(A)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "@", 
"ipv4": "8.8.8.13",
"ttl": 60
}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/579fd62e-XXXX-XXXX-XXXX-522a76cdeb32
content-type: application/json
content-length: 147

{
    "uuid": "579fd62e-XXXX-XXXX-XXXX-522a76cdeb32",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "8.8.8.13",
    "ttl": 60
}
```

{/cut}
{cut(AAAA)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "@",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}
```

{/cut}
{cut(CNAME)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "dd-test-cname", "content": "cname-record", "ttl": 60}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd/cname/57fb4556-XXXX-XXXX-XXXX-8f11c20da471
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
    "content": "example.com",
    "ttl": 60
}
```

{/cut}
{cut(MX)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "@", "content": "mailhost.example.com", "priority": 11, "ttl": 60}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6
content-type: application/json
content-length: 178

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost.example.com",
    "ttl": 60
}
```

{/cut}
{cut(NS)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
--data '{"name": "@", "content": "ns3.corp.mail.ru", "priority": 11, "ttl": 60}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd
content-type: application/json
content-length: 161

{
    "uuid": "368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns3.corp.mail.ru",
    "ttl": 86400
}
```

{/cut}
{cut(SRV)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{
  "name": "_sip._udp",
 "priority": 13,
  "weight": 6,
  "port": 5060,
  "host": "example.com",
  "ttl": 86400

}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/98ace09e-XXXX-XXXX-XXXX-07338b10a38d
content-type: application/json
content-length: 204

{
    "uuid": "98ace09e-XXXX-XXXX-XXXX-07338b10a38d",
    "name": "_sip._udp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 13,
    "weight": 6,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

{/cut}
{cut(TXT)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{
  "name": "@",
  "content": "some text",
  "ttl": 86400
}'
```

Response example:

```json
HTTP/1.1 201 Created
location: http://mcs.mail.ru/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee
content-type: application/json
content-length: 167

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some text",
    "ttl": 86400
}
```

{/cut}

{/tab}

{/tabs}

## {heading(Viewing the list of resource records)[id=dns-records-list]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the name of the zone whose resource records you need to view.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=methods]} from the API specification.

Request examples:

{cut(A)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 298

[
    {
        "uuid": "1a8b660e-XXXX-XXXX-XXXX-6efa053a095b",
        "name": "@",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "ipv4": "213.219.213.153",
        "ttl": 86400
    },
    {
        "uuid": "ddc7db9a-XXXX-XXXX-XXXX-16797f0dbd6a",
        "name": "@",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "ipv4": "95.163.212.224",
        "ttl": 86400
    }
]
```

{/cut}
{cut(AAAA)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 324

[
    {
        "uuid": "0df38ba9-XXXX-XXXX-XXXX-cac6b532256a",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "ipv6": "1050::5:600:300c:326b",
        "ttl": 86400
    },
    {
        "uuid": "e92723eb-XXXX-XXXX-XXXX-b84f5ce671e6",
        "name": "example.com",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "ipv6": "1050::5:600:200c:326b",
        "ttl": 86400
    }
]
```

{/cut}
{cut(CNAME)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 162

[
    {
        "uuid": "9e626a07-86dd-4f57-bcc8-e62700407a35",
        "name": "www",
        "dns": "/v2/dns/12f67238-c02f-4ba3-839b-227afa2eb8dd",
        "content": "example.com",
        "ttl": 86400
    }
]
```

{/cut}
{cut(MX)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 180

[
    {
        "uuid": "49c4d404-XXXX-XXXX-XXXX-c6bfbee00185",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "priority": 10,
        "content": "mailhost1.example.com",
        "ttl": 86400
    }
]
```

{/cut}
{cut(NS)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 487

[
    {
        "uuid": "a821cc32-XXXX-XXXX-XXXX-70103917daea",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "ns1.mcs.mail.ru",
        "ttl": 86400
    },
    {
        "uuid": "a3c96050-XXXX-XXXX-XXXX-0003c341b494",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "ns2.mcs.mail.ru",
        "ttl": 86400
    },
    {
    "uuid": "cf13ec79-XXXX-XXXX-XXXX-7a7dd38e60c3",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns3.corp.mail.ru",
    "ttl": 86400
    }
]
```

{/cut}
{cut(SRV)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 206

[
    {
        "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
        "name": "_sip._udp",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "priority": 10,
        "weight": 5,
        "port": 5060,
        "host": "example.com",
        "ttl": 86400
    }
]
```

{/cut}
{cut(TXT)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 169

[
    {
        "uuid": "9357e06f-XXXX-XXXX-XXXX-51eb1768e54e",
        "name": "@",
        "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
        "content": "test value",
        "ttl": 86400
    }
]
```

{/cut}

{/tab}

{/tabs}

## {heading(Viewing resource record parameters)[id=dns-records-view]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the name of the zone for which you want to view the resource record.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired record and select **Edit**.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=methods]} from the API specification.

Request examples:

{cut(А)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-XXXX-XXXX-XXXX-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 147

{
    "uuid": "1a8b660e-XXXX-XXXX-XXXX-6efa053a095b",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "213.219.213.153",
    "ttl": 86400
}
```

{/cut}
{cut(AAAA)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:300c:326b",
    "ttl": 60
}
```

{/cut}
{cut(CNAME)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-3de2-4381-8a12-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "example.com",
    "ttl": 60
}
```

{/cut}
{cut(MX)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 178

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost.example.com",
    "ttl": 60
}
```

{/cut}
{cut(NS)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 161

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "ns1.mcs.mail.ru",
    "ttl": 86400
}
```

{/cut}
{cut(SRV)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 204

{
    "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
    "name": "_sip._udp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

{/cut}
{cut(TXT)}

Request example:

```curl
curl --location 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 167

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some text",
    "ttl": 86400
}
```

{/cut}

{/tab}

{/tabs}

## {heading(Editing resource records)[id=dns-records-edit]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the name of the zone for which you want to modify the resource record.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired record and select **Edit**.
1. Make the changes and click **Save changes**.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=methods]} from the API specification.

Request examples:

{cut(А)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-8bf0-48c9-8b41-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"ipv4": "8.8.8.8"}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 147

{
    "uuid": "1a8b660e-8bf0-48c9-8b41-6efa053a095b",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv4": "8.8.8.8",
    "ttl": 86400
}
```

{/cut}
{cut(AAAA)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"ipv6": "1050::5:600:300c:555b"
}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 160

{
    "uuid": "8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "ipv6": "1050::5:600:200c:555b",
    "ttl": 60
}
```

{/cut}
{cut(CNAME)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-3de2-4381-8a12-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "example.org"}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 155

{
    "uuid": "57fb4556-XXXX-XXXX-XXXX-8f11c20da471",
    "name": "www",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "example.org",
    "ttl": 60
}
```

{/cut}
{cut(MX)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "mailhost1.example.com"}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 179

{
    "uuid": "f786555e-XXXX-XXXX-XXXX-daef4c5f86c6",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 11,
    "content": "mailhost1.example.com",
    "ttl": 60
}
```

{/cut}
{cut(NS)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "ns-new.mail.ru""}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 164

{
    "uuid": "368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "ns-new.mail.ru",
    "ttl": 60
}
```

{/cut}
{cut(SRV)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"name": "_sip._tcp"}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 204

{
    "uuid": "5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e",
    "name": "_sip._tcp",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "priority": 10,
    "weight": 5,
    "port": 5060,
    "host": "example.com",
    "ttl": 86400
}
```

{/cut}
{cut(TXT)}

Request example:

```curl
curl --location --request PUT 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX' \
--header 'Content-Type: application/json' \
--data '{"content": "some new text"}'
```

Response example:

```json
HTTP/1.1 200 OK
content-type: application/json
content-length: 171

{
    "uuid": "6b98c535-XXXX-XXXX-XXXX-5a9226f36bee",
    "name": "@",
    "dns": "/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd",
    "content": "some new text",
    "ttl": 86400
}
```

{/cut}

{/tab}

{/tabs}

## {heading(Deleting resource records)[id=dns-records-delete]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete multiple records at once by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Go to the **DNS** → **DNS zones** section.
1. Click the name of the zone for which you want to delete the resource record.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired record and select **Delete**.
1. Confirm the action.

{/tab}

{tab(API)}

Use the {linkto(../../../../../tools-for-using-services/api/api-spec/network-api/api-dns#api-spec-dns)[text=methods]} from the API specification.

{cut(A)}

Request example:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/a/1a8b660e-XXXX-XXXX-XXXX-6efa053a095b' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(AAAA)}

Request example:

```curl

curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/aaaa/8d3320e8-XXXX-XXXX-XXXX-acb68213ab5e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(CNAME)}

Request example:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/cname/57fb4556-XXXX-XXXX-XXXX-8f11c20da471' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(MX)}

Request example:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/mx/f786555e-XXXX-XXXX-XXXX-daef4c5f86c6' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(NS)}

Request example:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/ns/368133ff-XXXX-XXXX-XXXX-cd4ab0411ccd' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(SRV)}

Request example:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/srv/5645db31-XXXX-XXXX-XXXX-30b8b40a7e8e' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}
{cut(TXT)}

Request example:

```curl
curl --location --request DELETE 'https://mcs.mail.ru/public-dns/v2/dns/12f67238-XXXX-XXXX-XXXX-227afa2eb8dd/txt/6b98c535-XXXX-XXXX-XXXX-5a9226f36bee' \
--header 'X-Auth-Token: gAAAAABlLjgzyxXXXX'
```

Response example:

```json
HTTP/1.1 204 No Content
```

{/cut}

{/tab}

{/tabs}