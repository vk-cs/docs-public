# {heading(Frequently asked questions)[id=balancing-faq]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(How do I get load balancer logs?)}

To get balancer logs, contact [technical support](/en/contacts).

By default, balancer logs are not collected, but upon a prior request, logging can be enabled for a limited time to analyze issues.

{/cut}

{cut(What should I do if an incorrect network was specified when creating a balancer?)}

{linkto(../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-delete)[text=Delete]} the balancer and {linkto(../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-add)[text=add]} it again. A network can only be specified when creating a balancer; after that, it cannot be changed.

{/cut}

{cut(What balancing methods are used in {var(cloud)}?)}

{include(../../../_includes/_load_balancer.md)[tags=faq]}

{/cut}

{cut(Does {var(cloud)} have a balancing method similar to the IP-hash method?)}

Yes, a similar balancing method is `SOURCE_IP`. In this method, the server handling the request is selected arbitrarily and pinned to a session for a specific client IP address.

{/cut}

{cut(How do I set timeouts for a balancer?)}

Timeouts for a balancer are set when {linkto(../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=adding a balancing rule]} in the management console or using OpenStack CLI. A balancing rule can also be added when creating a balancer.

{/cut}

{cut(What do the balancer timeout parameters mean?)}

- **Client data** — client inactivity timeout.
- **Member connect** — timeout for establishing a connection between the balancer and the server.
- **Member data** — server inactivity timeout.
- **TCP inspect** — timeout for waiting for additional TCP packets to inspect the content.

{/cut}

{cut(Can I connect a 10 Gbit/s balancer?)}

For highly loaded systems of 10 Gbit/s and above, a dedicated balancer with an individual configuration template (_flavor_) is required. For more details, see the article [Creating a load balancer with an individual configuration template](/en/networks/balancing/how-to-guides/private-flavor).

{/cut}