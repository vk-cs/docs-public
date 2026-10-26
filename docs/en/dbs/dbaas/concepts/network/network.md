## Using the load balancer

For each PG/MySQL cluster, a TCP load balancer is created with 3 ports. They point to:

- the master;
- the synchronous replica;
- the asynchronous replica.

## Configuring the firewall

You can configure security groups either when [creating](../../instructions/create) a DB instance, or after its deployment, via the [section](/en/networks/vnet/instructions/secgroups) **Virtual networks** → **Firewall settings**.
