# {heading(Service instance creation)[id=airflow_create]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference]}

1. Go to the **Data Platform** → **Service instances** section.
1. Click **Create instance**.
1. At the **Configuration** step:
   1. Select the `Cloud Airflow` service type.
   1. Select the service version.
   1. Click **Next step**.
1. At the **Parameters** step:
   1. Set the name and description for the instance.
   1. (Skip for Standalone) Enable the **Assign external IP** option if access to the instance from an external network is required.
   1. (Only for Standalone, optional) Set an IP address for the service instance from the subnet. To do this, disable the **Automatic IP assignment** option. By default, an IP address is assigned to the instance automatically.
   1. (Only for Standalone as part of {var(cloud)}, optional) Add a security group. If the desired security group is not in the list, create it following the instructions in the **{var(cloud)} Administrator Guide** → **Networks** → [Firewall configuration](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/service_management/network/network_firewall_setup).
   1. (Skip for Standalone) Select a Kubernetes cluster from the drop-down list or create a new one. A worker node will be added to this cluster to host the Cloud Airflow instance.

   1. Select the `Basic` or `Advanced` option and configure the cluster node parameters:
      
      - For the **Basic** option, select one of the ready-made cluster templates.
      - For the **Advanced** option, set the required amount of CPU, RAM capacity, and the number of nodes for the Cloud Airflow components:

        - **Api server**: the Cloud Airflow web server that provides a user interface and REST API for monitoring and managing workflows.
        - **DAG Processor**: the component that retrieves DAG files from storage, parses them, and prepares them for execution by the scheduler.
        - **Triggerer**: the component that waits for and processes deferred events to resume tasks in a waiting state.
        - **Scheduler**: the component that schedules and launches DAG tasks based on the schedule and dependencies between them.
        - **Celery Worker**: the Cloud Airflow worker nodes. Additionally, set:

          - Disk type and size.
          - The retention period for Cloud Airflow logs in days. Set the number of days considering the Celery Worker disk size to avoid disk overflow. The disk size cannot be changed after creation.
 
      {include(../../../_includes/_standalone.md)[tags=total_quotas]}

   1. Click **Next step**.
1. At the **Maintenance** step:

   1. Select the days of the week and the start time for maintenance work. During this time, maintenance work may be performed on the server, including backup creation. The service may be temporarily unavailable.

      {note:info}
      The duration of maintenance work is 4 hours. The time zone is GMT+03:00.
      {/note}

   1. Click **Next step**.
1. At the **Connections** step, add two connections — for storing DAG files and DAG logs:
   1. Click **Add connection**.
   1. Select the connection type:
      - For DAG files:

        - `Connection to an external S3 storage for DAG files` — connection to an external S3 storage.
        - `Connection to DAG file storage in VK Cloud S3` — connection to {var(s3)} in the same project.

      - For DAG logs:

        - `Connection to an external S3 storage for logs` — connection to an external S3 storage.
        - `Connection to log storage in VK Cloud S3` — connection to {var(s3)} in the same project.

   1. For each connection, select `New connection` in the **Connection** block and set its parameters:

      {include(../../../_includes/_airflow.md)[tags=connections_airflow]}

   1. Click **Next step**.
1. At the **Credentials** step:
   1. Set the login of the account for accessing Cloud Airflow. Login requirements:

      - Only digits, Latin letters, and the `_` character are allowed.
      - The first character must be a Latin letter of any case or `_`.
      - Invalid names: `os_admin`, `root`, `dataplatform_moth`.

   1. Select a role for the account:

      {include(../../../_includes/_airflow.md)[tags=roles_airflow]}
      
   1. Invent or generate a password. Password requirements:

      - At least 16 characters.
      - At least one uppercase and one lowercase Latin letter.
      - At least one digit.
      - At least one of the characters: `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `}`, `~`.

      {note:err}
      Save the password. Password recovery is not available.
      {/note}

   1. To add another account, click **Add account**.
   1. Click **Create**.