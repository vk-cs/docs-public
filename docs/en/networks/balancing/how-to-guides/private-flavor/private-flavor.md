# {heading(Create a load balancer with a custom configuration template)[id=balancing-private-flavor]}

{include(/en/_includes/_translated_by_ai_en.md)}

Load balancers in {var(cloud)} are created by default with a standard configuration template. To handle increased traffic volumes, use a load balancer with a more powerful configuration.

In {var(cloud)}, you can add load balancers with a configuration template (_flavor_) created specifically for you to your infrastructure. This allows you to increase infrastructure performance under high load.

A more powerful configuration template is created by {var(cloud)} specialists after agreeing on technical details.

## {heading(Preparatory steps)[id=balancing-private-flavor-prep]}

1. Contact your {var(cloud)} manager or presale architect with a request to create a custom template, if this has not been done yet. After agreeing on the details, you will receive information about the configuration template created for you.
1. If you plan to use OpenStack CLI to create or verify the load balancer:

   1. Make sure that the OpenStack client with the `octavia` and `neutron` packages is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}.
   1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=Pass authentication]} in the project.

1. Install the [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md) utility, if it is not installed yet.
1. {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints)[text=Get]} the Octavia service endpoint. In this example: `https://public.infra.mail.ru:9876`.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Get]} the `X-Auth-Token` API access token.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-view)[text=Find out]} the IDs of the network and subnet in which you want to create the load balancer.

## {heading(1. Get information about flavors)[id=balancing-private-flavor-get-info]}

{tabs}
{tab(API)}

1. Get a list of configuration templates:

   ```console
   curl -X GET -H "X-Auth-Token: <TOKEN>" https://public.infra.mail.ru:9876/v2.0/lbaas/flavors
   ```

   Here `<TOKEN>` is the API access token.

1. Write down the `flavor_id` value. Example: `8f94060c-8d5b-4472-9cfd-e8a2b909481d`.

{/tab}
{tab(OpenStack CLI)}

1. Get a list of configuration templates:

   ```console
   openstack loadbalancer flavor list
   ```

1. Write down the name and ID of the desired configuration template. Example: `Avito-2-8`, `8f94060c-8d5b-4472-9cfd-e8a2b909481d`.
{/tab}
{/tabs}

{cut(More about flavor names)}
The flavor name for a load balancer is formed as follows:

```plaintext
<NAME>-<CPU_NUMBER>-<RAM_SIZE>-<OPTIONS>
```

Example: `Octavia-2-2-HA` — 2 vCPU and 2 GB of RAM, Active-Standby topology (a standard template created by default).
{/cut}

## {heading(2. Create a load balancer with a custom flavor)[id=balancing-private-flavor-add]}

{tabs}
{tab(API)}

Make an API request to create a load balancer with the desired flavor. Pass the parameters you need in the request. Example request:

```console
curl -X POST -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" -d '{"loadbalancer": {"description": "<LOAD_BALANCER_DESCRIPTION>", "admin_state_up": true, "project_id": "<PROJECT_ID>", "flavor_id": "<FLAVOR_ID>", "vip_subnet_id": "<SUBNET_ID>", "vip_address": "<VIP>", "provider": "octavia", "name": "<LOAD_BALANCER_NAME>", "vip_qos_policy_id": "<QoS_POLICY_ID>", "availability_zone": "<AVAILABILITY_ZONE>", "tags": ["<TAG>"]}}' https://public.infra.mail.ru:9876/v2/lbaas/loadbalancers
```
Here are the required values:

- `<TOKEN>` — the API access token.
- `<FLAVOR_ID>` — the ID of the load balancer configuration template, obtained from {var(cloud)} or {linkto(#balancing-private-flavor-get-info)[text=on your own]}.
- `<SUBNET_ID>` — the ID of the subnet in which you want to place the load balancer.
- `<LOAD_BALANCER_NAME>` — an arbitrary name for the load balancer being created.

Optional values:

- `<LOAD_BALANCER_DESCRIPTION>` — an arbitrary description of the load balancer being created.
- `<PROJECT_ID>` — {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=the ID of the]} OpenStack project in which you want to create the load balancer.
- `<VIP>` — the virtual IP address assigned to the load balancer.
- `<QoS_POLICY_ID>` — the ID of the QoS policy that you want to assign to the load balancer.
- `<AVAILABILITY_ZONE>` — the name of the {linkto(../../../../computing/iaas/concepts/avail-zone#iaas-avail-zone)[text=availability zone]} in which you want to place the load balancer.
- `<TAG>` — the tag with which you want to mark the load balancer.

{cut(Response example)}

```json
{
    "loadbalancer": {
        "description": "My favorite load balancer",
        "admin_state_up": true,
        "project_id": "e3cd678b11784734bc366148aa37580e",
        "provisioning_status": "PENDING_CREATE",
        "flavor_id": "8f94060c-8d5b-4472-9cfd-e8a2b909481d",
        "vip_subnet_id": "d4af86e1-0051-488c-b7a0-527f97490c9a",
        "vip_address": "203.0.113.50",
        "vip_network_id": "d0d217df-3958-4fbf-a3c2-8dad2908c709",
        "vip_port_id": "b4ca07d1-a31e-43e2-891a-7d14f419f342",
        "provider": "octavia",
        "created_at": "2017-02-28T00:41:44",
        "updated_at": "2017-02-28T00:43:30",
        "id": "607226db-27ef-4d41-ae89-f2a800e9c2db",
        "operating_status": "OFFLINE",
        "name": "best_load_balancer",
        "vip_qos_policy_id": "ec4f78ca-8da8-4e99-8a1a-e3b94595a7a3",
        "availability_zone": "my_az",
        "tags": ["test_tag"],
        "vip_vnic_type": "normal"
    }
}
```
{/cut}

For more information about the load balancer API, see the [official OpenStack documentation](https://docs.openstack.org/api-ref/load-balancer/v2/).
{/tab}

{tab(OpenStack CLI)}
Run the command:

```console
openstack loadbalancer create \
    --flavor <FLAVOR_NAME_OR_ID> \
    --vip-network-id <NETWORK_ID> \
    --name <LOAD_BALANCER_NAME>
```

Here:

- `<FLAVOR_NAME_OR_ID>` — the name or ID of the load balancer configuration template, obtained from {var(cloud)} or {linkto(#balancing-private-flavor-get-info)[text=on your own]}.
- `<NETWORK_ID>` — the ID of the network in which you want to place the load balancer.
- `<LOAD_BALANCER_NAME>` — an arbitrary name for the load balancer being created.
{/tab}
{/tabs}

## {heading(3. Verify the creation and parameters of the load balancer)[id=balancing-private-flavor-check]}

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.

   A list of load balancers will be displayed.

1. Click the name of the desired load balancer.

   A page with detailed information about it will open. On this page, you can also {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-edit)[text=edit]} the load balancer parameters.

{/tab}
{tab(API)}

1. Get a list of all load balancers with their IDs:

   ```console
   curl -X GET -H "X-Auth-Token: <TOKEN>" https://public.infra.mail.ru:9876/v2/lbaas/loadbalancers?project_id=<PROJECT_ID>
   ```

   Here:

   - `<TOKEN>` — the API access token.
   - `<PROJECT_ID>` — {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=the ID of the]} OpenStack project whose list of load balancers you want to view. Optional.

1. Get detailed information about the created load balancer:

   ```console
   curl -X GET -H "X-Auth-Token: <TOKEN>" https://public.infra.mail.ru:9876/v2/lbaas/loadbalancers/<LOAD_BALANCER_ID>
   ```

   Here:

   - `<TOKEN>` — the API access token.
   - `<LOAD_BALANCER_ID>` — the ID of the load balancer about which you want to get detailed information.

{/tab}
{tab(OpenStack CLI)}

1. Get a list of all load balancers with their IDs:

   ```console
   openstack loadbalancer list
   ```

1. Get detailed information about the created load balancer:

   ```console
   openstack loadbalancer show <LOAD_BALANCER_ID>
   ```

   The response will contain information about the load balancer and the IDs:

   - `vip_port_id` — the ID of the port used as the virtual IP address on the load balancer. A Floating IP address can be assigned to this port.
   - `listeners` — a list of listener IDs. These objects listen for incoming connections to the load balancer and serve as the entry point for traffic.
   - `pools` — a list of pool IDs. These objects are used to group the end consumers of traffic. The consumers act as members of the pool. Traffic from the listeners is balanced across several members included in the pool configured for the listener.

{/tab}
{/tabs}

After the load balancer is successfully created, you can {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb)[text=manage]} it.

## {heading(Delete unused resources)[id=balancing-private-flavor-delete]}

If the created load balancer is no longer needed, {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-delete)[text=delete]} it.