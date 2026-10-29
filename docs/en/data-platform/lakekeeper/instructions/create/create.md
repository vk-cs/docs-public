# {heading(Creating a service instance)[id=lakekeeper_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the **Create Instance** button.
1. At the **Configuration** step:

   1. Select the `Lakekeeper` service type.
   1. Select the service version.
   1. Select the service configuration:

      {include(../../../_includes/_data_p.md)[tags=configuration]}

   1. Click the **Next Step** button.

1. At the **Parameters** step:

   1. Set the name and description for the instance.
   1. (Skip for Standalone) Enable the **Assign External IP** option if access to the instance from an external network is required.
   1. (Only for Standalone, optional) Set an IP address for the service instance from the subnet. To do this, disable the **Automatic IP Assignment** option. By default, an IP address is assigned to the instance automatically.
   1. (Only for Standalone as part of {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it following the instructions in the **{var(cloud)} Administrator's Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Lakekeeper instance.
   1. Select the **Basic** or **Advanced** option and configure the cluster node parameters:

      - For the **Basic** option with the `Single Node` service configuration, only one cluster template is available.
      - For the **Basic** option with the `Cluster` service configuration, select one of the ready-made templates.
      - For the **Advanced** option, set the parameters in the **Lakekeeper** block — the main data catalog node that stores and serves metadata of objects:

        - **CPU** — the number of CPUs.
        - **RAM** — the amount of RAM.
        - **Number of Lakekeeper nodes** — the total number of nodes.

      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

   1. Click the **Next Step** button.

1. At the **Maintenance** step:

   1. Select the days of the week and the start time for maintenance work. During this time, maintenance work may be performed on the server, including backup creation. The service may be temporarily unavailable.

      {note:info}
      The duration of maintenance work is 4 hours. The time zone is GMT+03:00.
      {/note}

   1. Click the **Next Step** button.

1. Click the **Create** button.