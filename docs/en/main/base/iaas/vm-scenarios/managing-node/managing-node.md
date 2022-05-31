When deploying multiple nodes, the same instances of the same service (or application) are launched, for load balancing or high availability. You probably don't want all nodes to be deployed on a single physical machine. However, if you have a cluster in which nodes play one role (for example, an application server) and other nodes play another role (for example, a database), you can place these nodes on the same physical machine so that communication between nodes is faster.

To meet these requirements for co-hosting nodes within a cluster, you have several options described below.

## Using a group of servers in a profile

To manage the binding of cluster nodes, you can create a server group by calling the nova command line:

```bash
​​openstack server group create sg01 --policy affinity
```

Display:

```
+--------------+------+------------+---------+---------------+---------+----------+
| Id           | Name | Project Id | User Id | Policies      | Members | Metadata |
+--------------+------+------------+---------+---------------+---------+----------+
| 54a88567-... | sg01 | ...        | ...     | [u'affinity'] | []      | {}       |
+--------------+------+------------+---------+---------------+---------+----------+
```

After you have created the nova server profile, you can enter the name of the server group in the `_scheduler_hints_` property:

```bash
cat web_cluster.yaml
```

Display:

```bash
type: os.nova.server
version: 1.0
properties:
  name: web_server

  <... other properties go here ...>

  scheduler_hints:
    group: sg01
```

When you create a cluster using this profile, the server nodes will be uploaded to the same physical host. In other words, the binding is managed directly by the nova compute service. If there are no physical nodes satisfying the constraints, node creation requests will fail.

Later, when you create a cluster using this profile, server nodes will be loaded on the same physical host, if possible. In other words, affinity is managed directly by the nova computing service. If there are no physical hosts that meet the restrictions, requests to create a node will fail.

## Use the same or a different host in the profile

When adding nodes to an existing cluster, new nodes can reference another profile object of the same profile type (i.e. os.nova.server). If a new node is expected to be launched on the same or a different host from a set of server nodes, you can also specify a constraint like scheduler_hints.

For example, you have two server nodes in a cluster with UUIDs “UUID1" and "UUID2" respectively, you can enter scheduling restrictions in the profile as shown below:

```bash
cat standalone_server.yaml
```

Display:

```bash
type: os.nova.server
version: 1.0
properties:
  name: web_server

  <... other properties go here ...>

  scheduler_hints:
    different_host:
      - UUID1
      - UUID2
```

When adding a node using this profile to the cluster, the node creation either fails (for example, an available host is not found), or the node is successfully created on another host other than the specified server nodes.

Similarly, you can replace the different_host key above with same_host to indicate that the new node is aligned with the specified existing nodes.

## Managing Affinity using Affinity Policy

Another option for managing node binding is to use [affinity policy](https://docs.openstack.org/senlin/pike/user/policy_types/affinity.html).
By creating and attaching an affinity policy to a cluster, you can still control the distribution of nodes relative to the base nodes.
