<!-- Instance configurations -->

{includetag(configuration)}

- `Single`: in this configuration, the service instance will be located on a single server.

    This solution is suitable for development and testing, reducing the cost of deploying test infrastructure. It does not provide fault tolerance: a node failure causes all operations to stop.

- `Cluster`: in this configuration, a fault-tolerant cluster will be created with maximum availability, automatic recovery, and failover after failures.

    This solution is suitable for storing databases of most projects, including high-load ones with high requirements for data integrity.

{/includetag}

<!-- New instance configuration on Atom -->

{includetag(configuration_atom)}

- `Single node`: a single-node configuration, not fault-tolerant. An instance in this configuration is suitable for development and testing tasks.
- `Cluster`: a fault-tolerant configuration with multiple nodes. An instance in this configuration is suitable for any tasks, including everyday data operations in a production environment.

{/includetag}

<!-- Roles for databases -->

{includetag(roles_db)}

- `Database Owner` — a user with the broadest set of permissions. When users are deleted, permissions on objects they created are transferred to the database owner. A service instance can have only one owner, who cannot be deleted.

- `Standard User` — a user who can create, modify, and view objects: tables, schemas, functions, etc. They own the permissions on the objects they create. The number of users with this role is unlimited.

- `Observer` — a user who can view database tables but cannot create or modify them.
  The number of users with this role is unlimited.

- `Security Auditor` — a user who can view existing users, assigned roles, and system tables. The auditor cannot create new objects or modify or view existing user objects. The number of users with this role is unlimited.

{/includetag}

<!-- Viewing instance information -->

{includetag(instance_view_info)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. View the information on the instance page tabs.

{/includetag}

<!-- Editing instance name and description -->

{includetag(instance_edit_name)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon for the required instance and select **Edit**.
1. Edit the instance name and description.
1. Click **Save changes**.

{/includetag}

<!-- Viewing component status -->

{includetag(instance_view_status)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. On the instance page, go to the **Architecture** tab.
1. Review the information.

{/includetag}


<!-- Vertical scaling -->

{includetag(instance_vertical_scaling)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon for the required instance and select **Vertical scaling**.
1. Change the cluster parameters.
1. Click **Save changes**.

{/includetag}


<!-- Horizontal scaling -->

{includetag(instance_horizontal_scaling)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon for the required instance and select **Horizontal scaling**.
1. Specify the number of nodes.
1. Click **Save changes**.

{/includetag}

<!-- Vertical disk scaling -->

{includetag(instance_vertical_disk_scaling)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon for the required instance and select **Increase disks**.
1. Increase the disk size.
1. Click **Save changes**.

{/includetag}

<!-- Enabling and disabling extensions -->

{includetag(instance_extensions)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the instance name.
1. Go to the **Extensions** tab.
1. To the right of the required extension parameter, in the **Action** column, click **Enable** or **Disable**.
1. Confirm the action.

{/includetag}

<!-- Common actions for public -->

{includetag(public_select_project)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
1. Select the project where you need to create a service instance.
{/includetag}

<!-- Deleting an instance -->

{includetag(instance_delete)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon for the required instance and select **Delete**.
1. Confirm the deletion and wait for the operation to complete. Instance deletion may take a long time.

{/includetag}

<!-- Deleting an account -->

{includetag(instance_user_delete)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. On the instance page, go to the **Credentials** tab.
1. Click **•••** for the required instance and select **Delete**.
1. Confirm the deletion and wait for the operation to complete.

{/includetag}

<!-- Viewing and editing settings -->

{includetag(instance_edit_settings)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. On the instance page, go to the **Settings** tab.
1. Find the required parameter in the instance settings table; use the search bar if needed.
1. View the settings change history by clicking **•••**.
1. Edit the required settings:
    1. Click **Edit**.
    1. Change the values of the required parameters in the table.
    1. To reset a parameter to its default value, click **•••** for the required parameter and select **Reset**.
    1. Click **Save changes**.
    
{/includetag}

<!-- New. Viewing and editing settings -->

{includetag(instance_edit_settings_new)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Settings** tab.
1. Review the instance parameters.

   To view the description of a specific parameter, click on its name.

1. Make changes to the instance parameters:

    - To change a value, click **•••** for the required parameter and select **Edit**.
    - To reset a value to its default, click **•••** for the required parameter and select **Reset**.

   Parameter values that differ from the default are marked with the `Mod.` label.

1. Click **Save changes**.

{/includetag}

<!-- Creating an instance backup -->

{includetag(instance_backup_create)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Backup list** tab.
1. Click **Add backup**.
1. Specify a backup name or keep the auto-generated name.
1. Select the backup type from the list.
1. Click **Save changes**.

{/includetag}

<!-- Viewing an instance backup -->

{includetag(instance_backup_view)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Backup list** tab. The list displays information about all created backups, including their size.
1. Review the information.

{note:info}
The full list of all service instance backups is available in **Data Platform** → **Backups**.
{/note}

{/includetag}

<!-- Restoring from a backup -->

{includetag(instance_backup_recovery)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Backup list** tab.
1. To the right of the backup name, click the **•••** icon and select **Restore**.

{/includetag}

<!-- Viewing connections -->

{includetag(instance_view_connect)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}
   
1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Connections** tab.
1. Click on the connection name.
1. Review the connection information.

{/includetag}

<!-- Changing component configuration -->

{includetag(instance_edit_components)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the instance name.
1. On the instance page, go to the **Architecture** tab.
1. Click **Manage components**.
1. On the opened page, update the required parameters and click **Save changes**.

{/includetag}

<!-- Changing administrator credentials -->

{includetag(instance_admin_edit)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon to the right of the instance name and select **Change credentials**
1. Specify the new credentials.
1. Click **Save**.

{/includetag}

<!-- Changing administrator password -->

{includetag(instance_admin_password)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the **•••** icon to the right of the instance name and select **Change password**.
1. Specify a new password or generate one by clicking **Generate**. Password requirements:

    - At least 8 characters.
    - At least one uppercase and one lowercase letter of the Latin alphabet.
    - At least one digit.
    - At least one of the following characters: `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `'`, `{`, `}`, `~`.

   {note:err}
   Save the password. Recovery of a forgotten password is not available.
   {/note}

1. Click **Save**.

{/includetag}

<!-- Increasing disk size -->

{includetag(instance_disk_resize)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}
   
1. Go to **Data Platform → Service instances**.
1. Access the disk size settings in one of the following ways:

    - From the service instance list:

        1. In the service instance list, click the **•••** icon for the required instance.
        1. Select **Increase disks**.

    - From the instance page:

        1. In the service instance list, click on the name of the required instance.
        1. On the **General information** tab, click the **•••** icon.
        1. Select **Increase disks**.

1. Specify the new disk size.
1. Click **Save changes**.

{/includetag}

<!-- Instance maintenance -->

{includetag(instance_service)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Maintenance** tab.
1. Specify the maintenance time and backup parameters.
1. Click **Save changes**.

{/includetag}

<!-- Instance maintenance without backup -->

{includetag(instance_service_no_backup)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Maintenance** tab.
1. Specify the maintenance time.
1. Click **Save changes**.

{/includetag}

<!-- Account restriction -->

{includetag(instance_user_access)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Credentials** tab.
1. Click **•••** for the required account and select:

    - **Block** — to restrict account access without deleting it;
    - **Unblock** — to remove previously set restrictions.

1. Confirm the action.

{/includetag}

<!-- Assigning an external IP -->

{includetag(instance_assign_ip)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the instance name.
1. On the **General information** tab, click the **•••** icon and select **Assign External IP**.
1. Select an IP address or add a new one.
1. Click **Confirm**.

{/includetag}

<!-- Adding connections -->

{includetag(instance_create_connect)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the instance name.
1. Go to the **Connections** tab.
1. Click **Add connection**.
1. Select the data source and specify the connection parameters.
1. Click **Add**.

{/includetag}

<!-- Viewing user accounts -->

{includetag(instance_users_view)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the instance name.
1. Go to the **Credentials** tab.
1. Review the information.

{/includetag}

<!-- Common initial action -->

{includetag(instance_open)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.

{/includetag}

<!-- Working with instance TLS certificate -->

{includetag(instance_tls_certificate)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. On the **General information** tab, find the certificate block.
1. Click **•••** and select the required operation:

   - **Download** — to download the certificate issued by {var(data-p)}.
   - **Edit** — to replace the certificate. In the opened window, select a certificate from the list.

{/includetag}
