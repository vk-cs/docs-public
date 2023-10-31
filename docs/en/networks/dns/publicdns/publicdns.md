## Setting up a role model

To work with public DNS, configure [roles](/en/base/account/concepts/rolesandpermissions) for users of [personal account](https://mcs.mail.ru/app/en/) VK Cloud:

- Role for viewing DNS zones and resource records:

  - Viewer.

- Roles for editing DNS zones and resource records:

  - Project administrator.
  - Network administrator.
  - Superadministrator.

## Quotas and limits

- The maximum number of DNS zones within the project is 100.
- The maximum number of resource records of each type for one DNS zone is 500.

## Viewing a list of DNS zones

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.

</tabpanel>
<tabpanel>

Use the method `GET /v2/dns/` from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>

## Creating a zone

DNS zone is a logical association of domain names of your resources, containing their resource records.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.
1. Click the button **Add zone**.
1. Set DNS zone parameters:

   - **DNS zone**: the name of the zone being created, for example, the domain that was previously purchased.

     <info>

     The DNS zone name must contain at least one dot, must not end with a dot or digits.

     </info>

   - **Contact email**: the mail of the zone administrator.
   - **Time to expire**: the time (in seconds) after which the secondary NS server stops responding to requests for this zone if the primary NS server does not respond. The value must be greater than the sum in the fields **Time to refresh** and **Time to retry**.
   - **Time to refresh**: the time (in seconds) after which the secondary NS server must request an SOA record from the primary in order to support changes in the zone.
   - **Time to retry**: the time (in seconds) after which the secondary NS server will again request the SOA record from the primary if the primary NS server has not responded. The value must be less than the one specified in **Time to refresh**.
   - **Time to live (TTL)**: the lifetime of the cache in case of a negative response to a request in the zone.

1. Click the button **Add zone**.
1. Contact the owner of the [specified](https://mcs.mail.ru/app/services/dns/list) domain to delegate zone management to VK Cloud DNS servers.

</tabpanel>
<tabpanel>

Use the method `POST /v2/dns/` from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>

<info>

For most providers, it is possible to delegate zone management independently. If you have any questions about how to do this, contact the owner of [specified](https://mcs.mail.ru/app/services/dns/list) domain.

</info>

## Editing a zone

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.
1. Expand the menu of the desired zone and select **Edit**.
1. Make the changes and click **Save changes**.

</tabpanel>
<tabpanel>

Use the method `PUT /v2/dns/<dns-uuid>` from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>

## Creating a subzone

A subzone is a DNS zone that is a level below the current one. For example, for the domain `example.com` the subzone will be `subzone.example.com`.

A subzone can be created:

- In the same project where the main zone is located. This approach is used to separate the resource records of the subzone from the records of the main zone.
- From a third-party DNS provider.

<warn>

You cannot create a sub-zone for a zone in another project.

</warn>

To create a subzone in the VK Cloud project, [create](#adding_resource_records) two NS resource records with the name of the subzone, re-delegating the subzone to the VK Cloud DNS servers.

<info>

If you want to create a subzone from a third-party provider, then the created NS records will have to point to the DNS servers of the third-party provider.

</info>

After creating NS records, you can create a zone for a delegated subdomain.

## Deleting a zone

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several zones at once by selecting them using the checkboxes.

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.
1. Expand the menu of the desired zone and select **Delete**.
1. Confirm the action.

</tabpanel>
<tabpanel>

Use the method `DELETE /v2/dns/<dns-uuid>` from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>

## Adding resource records

A resource record is a DNS record of a domain in the domain name system. With their help, you determine where to send requests that come to domain names, as well as provide additional information about the domain.

VK Cloud supports resource record types:

- `A` is a DNS record that maps a domain name to an IPv4 address.
- `AAAA` is a DNS record that maps a domain name to an IPv6 address.
- `NS` is a DNS record that contains the address of the name server serving this zone or subzone. By default, two `NS` entries will be set in the zone. These records are installed on the side of the domain name owner in order to transfer domain management rights to the VK Cloud name server.
- `CNAME` is a DNS record that binds an alias to a domain name. It is usually used to bind a subdomain (for example, `www`) to the domain where the content of this subdomain is hosted.
- `MX` is a DNS record that tells the address of the server that processes email.
- `SRV` is a DNS record that defines the host name and server port for some network services.
- `TXT` is a DNS record that contains text information for sources outside the domain.

To add a resource record:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.
1. Click on the name of the zone for which you want to add a resource record.
1. Click the button **Add record**.
1. Fill in the fields depending on the value **Record type**:

   <details>
    <summary>CNAME</summary>

   - **Name** (the alias being added):

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`;
     - `\*.dns.zone` — indicates any name in the domain request.

   - **Time to live (TTL)**: cache lifetime in seconds.
   - **Value**: FQDN is the destination address (where the alias being added points to). The maximum length is 255 characters. Must consist of two or more subdomains. The maximum length of a subdomain is 63 characters. Only numbers, Latin letters, symbols `.` and `-` are allowed.

   Example: you need to create a CNAME record `www.example.com` pointing to `example.com`. To do this, enter `www` in the **Name** field, and in the **Value** — `example.com`.

   </details>
   <details>
    <summary>A</summary>

   - **Name**:

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`;
     - `\*.dns.zone` — indicates any name in the domain request.

   - **Time to live (TTL)**: cache lifetime in seconds.
   - **IP address**: IP address (IPv4). Select from the list of existing VMs or specify a new one.

   </details>
   <details>
    <summary>MX</summary>

   - **Name**:

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`.

   - **Priority**: host priority. The lower the value, the more preferred the host.
   - **Time to live (TTL)**: cache lifetime in seconds.
   - **Value**: FQDN is the address of the mail server. The maximum length is 255 characters. Must consist of two or more subdomains. The maximum length of a subdomain is 63 characters. Only numbers, Latin letters, symbols `.` and `-` are allowed.

   </details>
   <details>
    <summary>AAAA</summary>

   - **Name**:

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`;
     - `\*.dns.zone` — indicates any name in the domain request.

   - **Time to live (TTL)**: cache lifetime in seconds.
   - **IP address**: IP address (IPv6).

   </details>
   <details>
    <summary>SRV</summary>

   - **Name**:

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`;
     - `\*.dns.zone` — indicates any name in the domain request.

   - **Service**: the symbolic name of the service (for example, `_sip`).
   - **Protocol**: the symbolic name of the protocol (for example, `_tcp` or `_udp`).
   - **Priority**: host priority. The lower the value, the more preferred the host.
   - **Weight**: weight for hosts with the same priority. The closer this value is to `0`, the less likely it is that the host will be selected.
   - **Port**: the port number that the SRV service uses.
   - **Time to live (TTL)**: cache lifetime in seconds.
   - **Host**: FQDN of the host hosting the service. The maximum length is 255 characters. Must consist of two or more subdomains. The maximum length of a subdomain is 63 characters. Only numbers, Latin letters, symbols `.` and `-` are allowed.

   </details>
   <details>
    <summary>TXT</summary>

   - **Name**:

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`;
     - `\*.dns.zone` — indicates any name in the domain request.

   - **Time to live (TTL)**: cache lifetime in seconds.
   - **Value**: the text value of the resource record.

   </details>
   <details>
    <summary>NS</summary>

   - **Name**:

     - `@`, `example.com` or an empty value — indicates the zone itself;
     - `subzone` or `subzone.example.com` — indicates a subzone `subzone`.

   - **Time to live (TTL)**: cache lifetime in seconds.
   - **Value**: the address of the NS server, for example, `ns1.mcs.mail.ru` or `ns2.mcs.mail.ru`.

   </details>

1. Click the button **Add record**.

</tabpanel>
<tabpanel>

Use the methods from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>

## Editing resource records

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.
1. Click on the name of the zone for which you want to change the resource record.
1. Expand the menu of the desired entry and select **Edit**.
1. Make the changes and click **Save changes**.

</tabpanel>
<tabpanel>

Use the methods from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>

## Deleting resource records

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several records at once by selecting them using the checkboxes.

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **DNS** → **DNS zones**.
1. Click on the name of the zone for which you want to delete the resource record.
1. Expand the menu of the desired entry and select **Delete**.
1. Confirm the action.

</tabpanel>
<tabpanel>

Use the methods from the specification in [API documentation](/ru/additionals/api/api-dns "change-lang").

</tabpanel>
</tabs>
