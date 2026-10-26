# {heading(Server groups)[id=iaas-server-group]}

{include(/en/_includes/_translated_by_ai_en.md)}

A server group is a set of servers that are combined to accomplish a specific task. Servers include:

- virtual machines;
- DB instances;
- K8s clusters;
- application instances from the application store.

The following server group placement policies on compute nodes {var(cloud)} are supported:

- `affinity` — place all servers in the group on the same compute node;
- `anti-affinity` — place servers in the group on different compute nodes;
  {ifdef(public)}
- `soft-affinity` — place servers in the group on the same compute node whenever possible (if there is not enough space on a single node, instead of a creation error as in the case of `affinity`, a server will be created on another compute node);
  {/ifdef}
- `soft-anti-affinity` — place servers in the group on different compute nodes whenever possible.

An example of using a server group: deploy multiple VMs, for example, an application server and a database server for that application, on the same node to speed up communication between these VMs.