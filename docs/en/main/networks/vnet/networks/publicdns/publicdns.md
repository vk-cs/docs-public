## DNS as a service

DNS is a hierarchical distributed database that allows you to store IP addresses and other data, as well as view information on DNS names.

VK CS allows you to publish your zones and records in DNS without having to deploy your DNS servers.

VK CS offers:

- **Public DNS** - allows you to manage DNS zones that are visible on the Internet.
- **Private DNS** - exists inside a private network, the zones created here are not visible from the Internet. Read more about private DNS [here](https://mcs.mail.ru/help/ru_RU/networks/private-dns).

## Create a zone

A DNS zone is a logical union of the domain names of your resources that contain their resource records.

To add a zone, click "Virtual networks" -> "DNS" -> "Add zone". The page displays the add DNS zone screen.

Enter the data in the input fields:

- DNS zone - the name of the zone being created, for example, the domain that you previously purchased;
- Contact email — mailing address of the zone administrator;
- TTE is the time (in seconds) after which the secondary DNS stops responding for this zone if the primary server is not responding. The value must be greater than the sum of TTRefresh and TTRetry.
- TTRefresh is the time (in seconds) after which the secondary DNS server must update the zone information from the primary DNS server.
- TTRetry - if the primary server is unavailable, then after the time (in seconds) specified in this parameter, the server will try to synchronize the information again.
- TTL - cache lifetime for a negative response to a request in the zone.

Click "Add Zone". After that, contact the registrar from whom the domain was purchased to delegate zone management to the VK CS DNS server (ns1.mcs.mail.ru, ns2.mcs.mail.ru). With most providers, you can delegate zone management yourself. If you have any questions about how to do this, please contact your registrar for help.

## Creating a subzone

A subzone is a DNS zone that is a level lower than the current one. For example, for the example.com domain (for which you created a zone in the VK CS DNS service), the subzone will be subzone.example.com.

A subzone can be created:

1. In the current project, to separate the resource records of the subzone from the records of the main zone.
2. In another VK CS project.
3. From a third-party DNS provider.

If you want to create a subzone in the current project or another VK CS project, you need to create 2 NS records with the name of the subzone, re-delegating the subzone to the VK CS DNS server ([ns1.mcs.mail.ru](http://ns1.mcs. mail.ru), [ns2.mcs.mail.ru](http://ns2.mcs.mail.ru)). The process of creating NS records is described below.

If you want to create a subzone with a third-party provider, then the generated NS records will need to point to the DNS servers of the third-party provider.

After creating the NS records, you can create a zone for the delegated subdomain. How to create a zone in the VK CS project is described above.

## Adding resource records

A resource record is a DNS record for a domain in the Domain Name System. With their help, you determine where to send requests that come in for domain names, as well as provide additional information about the domain.

VK CS supports the resource record types described below.

### A

A is a DNS record that maps a domain name to an IPv4 address.

When adding a record of type A, you must specify:

- Name - the name of the entry. The following values ​​are possible:

  • @, example.com, or blank - indicates the zone itself;

  • subzone or subzone.example.com - indicates the subzone;

  • \*.dns.zone - Wildcard symbol. Indicates that any name in a domain request is valid.

- TTL - cache lifetime in seconds.
- IP address (IPv4).

### AAAA

AAAA - Similar to the Type A record for IPv6.

When adding an AAAA record, you must specify:

- Name - the name of the entry. The following values ​​are possible:
  • @, example.com, or blank - indicates the zone itself;
  • subzone or subzone.example.com - indicates the subzone;
  • \*.dns.zone - Wildcard symbol. Indicates that any name in a domain request is valid.
- TTL - cache lifetime in seconds.
- IP address (IPv6).

### NS

NS is a DNS record that contains the address of the name server that serves the given zone or subzone. Two NS records will be set in the default zone, these records are set on the side of the domain name registrar to transfer domain control rights to the VK CS name server.

When adding an NS type entry, you must specify:

- Name - the name of the entry. The following values ​​are possible:
  • @, example.com, or blank - indicates the zone itself;
  • subzone or subzone.example.com - Points to a subzone.
- TTL - cache lifetime in seconds.
- The value is the address of the NS server, for example, [ns1.mcs.mail.ru](http://ns1.mcs.mail.ru) or [ns2.mcs.mail.ru](http://ns2.mcs.mail.ru).

### CNAME

CNAME is a DNS record that links an alias to a domain name. Typically used to link a subdomain (eg www) to the domain that hosts the content of that subdomain.

When adding a CNAME record, you must specify:

- Name - the name of the entry. The following values ​​are possible:
  • @, example.com, or blank - indicates the zone itself,
  • subzone or subzone.example.com - indicates the subzone;
  • \*.dns.zone - Wildcard symbol. Indicates that any name in a domain request is valid.
- TTL - cache lifetime in seconds.
- Value - FQDN destination address.

### MX

MX is a DNS record that reports the address of the server that processes email.

When adding an MX record, you must specify:

- Name - the name of the entry. The following values ​​are possible:
  • @, example.com, or blank - indicates the zone itself,
  • subzone or subzone.example.com - Points to a subzone.
- Priority - host priority. The lower the value, the more preferred host.
- TTL - cache lifetime in seconds.
- Value - FQDN address of the mail server.

### SRV

SRV is a DNS record that specifies the location (hostname and server port) of certain network services.

When adding an SRV record, you must specify:

- Name - the name of the entry. The following values ​​are possible:
  • @, example.com, or blank - indicates the zone itself,
  • subzone or subzone.example.com - indicates the subzone;
  • \*.dns.zone - Wildcard symbol. Indicates that any name in a domain request is valid.
- Service - the symbolic name of the service (for example, \_sip).
- Protocol - the symbolic name of the protocol (for example, \_tcp or \_udp).
- Priority - host priority. The lower the value, the more preferred host.
- Weight - weight for hosts with the same priority. The closer this value is to 0, the less likely the host will be selected.
- Port - the port that the service uses.
- TTL - cache lifetime in seconds.
- Host - FQDN of the host hosting the service.

### TXT

TXT is a DNS record that contains textual information for sources outside the domain.

When adding a TXT record, you must specify:

- Name - the name of the entry. The following values ​​are possible:
  • @, example.com, or blank - indicates the zone itself,
  • subzone or subzone.example.com - indicates the subzone;
  • \*.dns.zone - Wildcard symbol. Indicates that any name in a domain request is valid.
- TTL - cache lifetime in seconds.
- Value is a text value.

## Role model

Users need roles to work with DNS.

<table style="width: 100%;"><tbody><tr><td style="width: 50%; background-color: rgb(209, 213, 216);"><div style="text- align: center;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(0, 0, 0);">Action</span></div ></td><td style="width: 50%; text-align: center; background-color: rgb(209, 213, 216);"><div style="text-align: center;">< span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(0, 0, 0);">Role</span></div></td></ tr><tr><td style="width: 50%; text-align: center;"><p id="isPasted" style="text-align: left;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(0, 0, 0);">View DNS zones and resource records</span></p></td><td style=" width: 50.0000%;"><p id="isPasted" style="text-align: left;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(0, 0, 0);">Observer</span></p></td></tr><tr><td style="width: 50.0000%;"><p id="isPasted" ><span style="font-fam ily: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(0, 0, 0);">Editing DNS zones and resource records</span></p></td><td style="width: 50.0000%;"><span style="font- family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgb(0, 0, 0);">Project Owner, Project Owner, Network Administrator, Super Administrator</span></td></tr></tbody></table>

## Quotas and limits

The service does not have quotas, but there are limits:

- the maximum number of DNS zones within the project is 100;
- The maximum number of resource records for a DNS zone is 500.
