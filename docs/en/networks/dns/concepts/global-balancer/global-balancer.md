# {heading(DNS balancing)[id=dns-global-balancer]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:info}
To get access to the service, contact [technical support](/en/contacts).
{/note}

## {heading(Balancing groups)[id=dns-global-balancer-groups]}

Public DNS balancing groups in {var(cloud)} allow you to create infrastructure for a fault-tolerant geographically distributed application. The DNS balancing tool directs traffic to the customer's application backend servers located in different {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zones]}, depending on server availability metrics and balancing algorithms. If one of the data centers becomes unavailable, the DNS balancer will direct traffic to servers in other data centers.

A balancing group is a group of related A-records of a DNS zone, between which traffic is distributed based on the following parameters:

- balancing algorithm;
- server weight: the higher the weight, the more traffic is sent to that server;
- server availability: if a host is unavailable, traffic is directed to other servers in the group.

## {heading(Balancing algorithm)[id=dns-global-balancer-algorithm]}

The following balancing algorithms are available for the DNS balancer:

- Round Robin — an algorithm in which requests are distributed among servers sequentially, in a cyclic order.
- Weighted Round Robin — an improved version of the Round Robin algorithm, in which the load is distributed evenly taking server weights into account: servers with higher weight handle more requests.
- Failover group — an algorithm in which requests are sent to the server with the highest weight as long as it is available. When the server becomes unavailable, requests are sent to the server with the second highest weight.