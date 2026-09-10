# {heading(Managing a service instance)[id=clickhouse_management]}

{include(/en/_includes/_translated_by_ai.md)}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Viewing instance information)[id=clickhouse_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Editing instance name and description)[id=clickhouse_edit]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Viewing and replacing a TLS certificate)[id=clickhouse_certificate]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

   For more information about working with certificates, see the {linkto(../../../certificates/manage#certificates_manage)[text=Certificates]} section.

{/tab}

{/tabs}

{/ifndef}

{ifndef(public)}
## {heading(Changing IP and ports)[id=clickhouse_change-ip]}

{note:warn}
For Standalone and Standalone as part of {var(cloud)} only.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Viewing component status)[id=clickhouse_status]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. On the instance page, go to the **Component status** tab.

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=clickhouse_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Vertical scaling)[id=clickhouse_vertical_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_scaling]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Increasing disk size)[id=clickhouse_disk_resize]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(Adding an account)[id=clickhouse_add_admin]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. On the instance page, go to the **Credentials** tab.
1. Click the **Add account** button.
1. In the opened window, specify the user login to access the Cloud ClickHouse instance.
1. Select a role:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}
     
1. Create or generate a user password.

   {include(../../../_includes/_clickhouse.md)[tags=password]}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Deleting an account)[id=clickhouse_del_admin]}

{note:info}
Only accounts assigned the `Standard user`, `Observer`, and `Security auditor` roles in Cloud ClickHouse can be deleted.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Enabling and disabling extensions)[id=clickhouse_extensions]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. Go to the {var(cloud)} [management console](https://msk.cloud.vk.ru/app/).
{/ifdef}

{include(../../../_includes/_data_p.md)[tags=instance_extensions]}

{/tab}

{/tabs}

## {heading(Viewing and editing instance settings)[id=clickhouse_settings]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. Go to the {var(cloud)} [management console](https://msk.cloud.vk.ru/app/).
{/ifdef}
   
1. Navigate to **Data Platform** → **Service instances**.
1. Click the name of the required instance.
1. On the instance page, go to the **Settings** tab.
1. Find the required parameter in the instance settings table; use the search bar if necessary.
1. View the settings change history by clicking ![ ](../../assets/clock-icon.svg "inline").
1. Edit the required settings:
    1. Click the **Edit** button.
    1. Change the values of the required parameters in the table.
    1. If you need to revert to the default value, click **•••** for the required parameter and select **Reset**.
    1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Adding a connection)[id=clickhouse_add_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. On the instance page, go to the **Connections** tab.
1. Click the **Add connection** button.
1. Select the data source:

   - `S3 VK Cloud` — connection to {var(s3)} storage in the same project.
   - `S3 external` — connection to an external S3 object storage.
   - `Iceberg Metastore with S3 VK Cloud` — connection to a Cloud Iceberg Metastore instance in the same {var(cloud)} project.
   - `Iceberg Metastore with external S3` — connection to an external Cloud Iceberg Metastore catalog.
   - `ClickHouse` — connection to a Cloud ClickHouse database.
   - `PostgreSQL` — connection to a PostgreSQL database.
   - `MySQL` — connection to a MySQL database.

1. Configure the connection parameters for the data source:

   {tabs}
   
   {tab(S3 VK Cloud)}

   - **Name**: specify a connection name. The name must start with a lowercase Latin letter and contain only uppercase and lowercase Latin letters, digits, and `_` characters. The name will be used when working with Cloud ClickHouse.
   - **Bucket**: the name of the {var(s3)} bucket that the Cloud ClickHouse instance will connect to.

   {/tab}
   
   {tab(S3 external)}
   
   - **Name**: specify a connection name. The name must start with a lowercase Latin letter and contain only uppercase and lowercase Latin letters, digits, and `_` characters. The name will be used when working with Cloud ClickHouse.
   - **Region**: the region where your S3 storage is located.
   - **Access Key**: the access key identifier for the storage.
   - **Secret Key**: the secret access key for the storage.
   - **S3 URL**: the URL address of your S3 storage.
   - **Bucket**: the name of the bucket in the S3 storage that the Cloud ClickHouse instance will connect to.

   {/tab}
   
   {tab(Iceberg Metastore with S3 VK Cloud)}
   
   - **Name**: specify a connection name. The name must start with a lowercase Latin letter and contain only uppercase and lowercase Latin letters, digits, and `_` characters. The name will be used when working with Cloud ClickHouse.
   - **Bucket**: the name of the {var(s3)} bucket that the Cloud ClickHouse instance will connect to.
   - **Path to files in bucket**: the name of the directory in the bucket that will be accessible to the Cloud ClickHouse instance.

   {/tab}
   
   {tab(Iceberg Metastore with external S3)}
   
   - **Name**: specify a connection name. The name must start with a lowercase Latin letter and contain only uppercase and lowercase Latin letters, digits, and `_` characters. The name will be used when working with Cloud ClickHouse.
   - **Region**: the region where your external Cloud Iceberg Metastore catalog is located.
   - **Access Key**: a unique identifier used for authentication when accessing the catalog.
   - **Secret Key**: a private key for accessing the catalog.
   - **S3 URL**: the URL address of your Cloud Iceberg Metastore catalog.
   - **Bucket**: the name of the bucket that the Cloud ClickHouse instance will connect to.
   - **Path to files in bucket**: the name of the directory in the bucket that will be accessible to the Cloud ClickHouse instance.

   {/tab}
   
   {tab(ClickHouse, PostgreSQL, MySQL)}
   
   - **Name**: specify a connection name. The name must start with a lowercase Latin letter and contain only uppercase and lowercase Latin letters, digits, and `_` characters. The name will be used when working with Cloud ClickHouse.
   - **Hostname**: the server address for connection.
   - **Username**: the name of the database user account.
   - **Database name**: the name of the database that the Cloud ClickHouse instance will connect to.
   - **User password**: the password of the database user account.

   {/tab}
   
   {/tabs}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Changing instance maintenance parameters)[id=clickhouse_maintenance]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. On the instance page, go to the **Maintenance** tab.

{include(../../../_includes/_clickhouse.md)[tags=maintenance]}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Viewing backups)[id=clickhouse_backup_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

## {heading(Creating an instance backup)[id=clickhouse_backup]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

## {heading(Restoring an instance from a backup)[id=clickhouse_restore]}

{tabs}

{tab(Management console)}

{note:warn}
Restoring from a backup will overwrite all data in the instance. All changes made after the backup was created will be permanently lost.
{/note}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. On the instance page, go to the backups tab.
1. Click **•••** for the required backup and select **Restore**.
1. (Optional) Change the instance parameter values. The parameters are described in the {linkto(../create#clickhouse_create)[text=creating an instance]} section.
1. Click the **Create** button.

   A new Cloud ClickHouse service instance will be created.

{/tab}

{/tabs}

## {heading(Deleting an instance)[id=clickhouse_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
