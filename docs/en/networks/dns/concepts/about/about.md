# {heading(About the service)[id=dns-about]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../../_includes/_dns-about.md)}

## {heading(Public DNS)[id=dns-about-public]}

*Public DNS* manages DNS zones that are visible on the internet.

Main functions of public DNS:

* Configuring A, AAAA, CNAME, MX, TXT, SRV and other records.
* Load balancing in the infrastructure of a fault-tolerant geographically distributed application.
* Automatic updating of records when the IP addresses of resources (e.g., load balancers) change.

To work with public DNS, configure {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=roles]} for users of the [management console](https://msk.cloud.vk.ru/app/) {var(cloud)}:

- To view DNS zones and resource records — Observer.

- To edit DNS zones and resource records:

    - Project owner,
    - Network administrator,
    - Superadministrator.

The following quotas and limits apply to public DNS:

- Maximum number of DNS zones within a project — 100.
- Maximum number of type A resource records for a single DNS zone — 750.
- Maximum number of resource records of each type for a single DNS zone — 500.