## Cluster creation

All instructions when working with the API are executed in the console.

To create a Big Data cluster, do the following:

```
curl -s -H "X-Auth-Token: <your_auth_token>" -H "Content-Type: application / json" -d '
{
"plugin_name": "ambari",
"hadoop_version": "3.1",
"cluster_template_id": "<cluster_template_id>",
"name": "<your_cluster_name>",
"neutron_management_network": "<your_network_id>",
} '-X POST "http://infra.mail.ru:8386/v1.1/ <your_project_id> / clusters" -v
```

In double quotes after POST, you must specify the correct API Endpoints, which is specified in the Project Profile in the "API Endpoints" tab.

To create an older version, the command must specify "hadoop_version": 2.6 or 2.6.4

```
"node_group_info": [
{
"node_group_template_id": "<head_template_id>",
"count": 1
},
{
"node_group_template_id": "<worker_template_id>",
"count": 2
}
]
} '-X POST "http://10.200.2.116:8386/v1.1/d4fd9db1893b401c9f4b8063896f18ab/clusters" -v
```

If you need to change the 'flavor_id', 'availability_zone', 'volumes_per_node', 'volumes_size', 'volume_type', 'volume_local_to_instance', 'volumes_availability_zone', 'count' parameters for node groups when starting the cluster, then they can be overridden via the node_group_info property. as described in the example below:

```
curl -s -H "X-Auth-Token: <your_auth_token>" -H "Content-Type: application / json" -d '
{
"plugin_name": "ambari",
"hadoop_version": "3.1",
"cluster_template_id": "<cluster_template_id>",
"name": "<your_cluster_name>",
"neutron_management_network": "<your_network_id>",


"node_group_info": [
{
"node_group_template_id": "<head_template_id>",
"count": 1
},
{
"node_group_template_id": "<worker_template_id>",
"count": 3,
"volumes_size": 300,
}
]
} '-X POST "http://infra.mail.ru:8386/v1.1/ <your_project_id> / clusters" -v
```

In this example, 3 workers are running at once and the disk is increased to 300GB

The OpenStack Sahara service corresponds to Big Data clusters.

It is important to remember that the parameters cluster_template_id, head_template_id and worker_template_id cannot be created by yourself - they are already pre-created. You can get the specified list of cluster templates template through this block:

```
curl -s -H "X-Auth-Token: <your_auth_token>" -H "Content-Type: application / json" -X GET "http://infra.mail.ru:8386/v1.1/ <your_project_ID> / cluster-templates "-v
```

## Deleting a cluster

Removing a Big Data cluster must be done using the command

```
curl -s -H "X-Auth-Token:" -H "Content-Type: application / json" -X DELETE "http://infra.mail.ru:8386/v1.1//clusters" -v
```
