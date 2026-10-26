# {heading(Availability zones)[id=iaas-avail-zone]}

{include(/en/_includes/_translated_by_ai_en.md)}

An availability zone is one or more data centers (DCs) in which cloud infrastructure components can be hosted.

Each zone is isolated from failures in other availability zones. Placing virtual resources in multiple zones ensures fault tolerance and reduces the likelihood of data loss.

{var(cloud)} distributes the following virtual resources across {ifdef(public)}{linkto(../../../../start/concepts/architecture#architecture-az)[text=supported availability zones]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}supported availability zones{/ifdef}:

- virtual machines;
- disks: they are placed in network block storage and automatically replicated within their availability zone{ifdef(private,private-pg,private-pdf,private-pg-pdf)};
- file storage{/ifdef},
- load balancers.

There are resources that have no availability zones, for example, {ifdef(public)}a VK Object Storage bucket or {/ifdef}a virtual network. {ifdef(public)}For projects in the Moscow region, these resources are global (not tied to a zone).

{note:info}
A network created in the QAZ and KTP availability zones cannot be merged with networks from other availability zones using standard methods, since they are located in a different {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}. In this case, network connectivity can be provided by means of {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=VPN]}.
{/note}
{/ifdef}