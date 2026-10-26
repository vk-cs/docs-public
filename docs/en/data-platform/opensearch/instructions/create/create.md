# {heading(Creating a service instance)[id=opensearch_create]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the **Create instance** button.
1. Complete the steps:
   1. {linkto(#opensearch_create_configuration)[text=Configuration]}.
   1. {linkto(#opensearch_create_parameters)[text=Parameters]}.
   1. {linkto(#opensearch_create_service)[text=Maintenance]}.
   1. {linkto(#opensearch_create_user)[text=Credentials]}.

## {heading(Step 1. Configuration)[id=opensearch_create_configuration]}

1. Select the `OpenSearch` service type.
1. Select the service version.
   
1. Click the **Next step** button.

## {heading(Step 2. Parameters)[id=opensearch_create_parameters]}

1. In the **Name** field, enter the name of the service instance.
1. (Optional) In the **Description** field, enter a description of the service instance.
1. (Standalone only, optional) Assign an IP address for the service instance from the subnet. To do this, disable the **Automatic IP assignment** option. By default, an IP address is assigned to the instance automatically.
1. (Standalone only within {var(cloud)}, optional) Add a security group. If the required security group is not in the list, create it by following the instructions in the **{var(cloud)} Administrator's Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the OpenSearch instance.
1. In the **Nodes** block, configure the parameters of the pod group for the OpenSearch nodes that manage the cluster:
   
   - **CPU**: number of processor cores.
   - **RAM**: amount of RAM.
   - **Disk type**: select the disk type, or it will be assigned automatically.
   - **Disk size**: disk size in GB.
   - **Number of Masters**: total number of nodes.

1. In the **Dashboard** block, configure the parameters of the pod group for OpenSearch Dashboards:

   - **CPU**: number of processor cores.
   - **RAM**: amount of RAM.
   - **Number of Dashboards**: total number of dashboards.

   {include(../../../_includes/_standalone.md)[tags=total_quotas]}

1. Click the **Next step** button.

## {heading(Step 3. Maintenance)[id=opensearch_create_service]}

1. In the **Maintenance window** block, select one or more days and the time for maintenance work, taking into account your time zone. Maintenance duration: 4 hours.
1. In the **Full backup** block, specify the maximum backup retention time in days.
1. Click the **Next step** button.

## {heading(Step 4. Credentials)[id=opensearch_create_user]}

1. Set the **Login for OpenSearch access**. Login requirements:

   - Only digits, Latin letters, and the `_` character are allowed.
   - The first character: a Latin letter of any case or `_`.
   - Forbidden names: `os_admin`, `root`, `dataplatform_moth`, `default`.
   - No more than 50 characters.

1. **Role**: the user role. Currently, only the `Administrator` role is available for a user.
1. Set the **Password for OpenSearch access**. To do this, click the **Generate** button or enter your own. Password requirements:

   - At least 8 characters.
   - At least one uppercase and one lowercase Latin letter.
   - At least one digit.
   - At least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

   {note:err}
   Save the password. Forgotten password recovery is not available.
   {/note}

1. (Optional) To add another account, click the **Add account** button.
1. Click the **Create** button.