# {heading(Working with a service instance)[id=iceberg_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Viewing instance information)[id=iceberg_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

At the bottom of the page, in the service parameters, a link for connecting to the PostgresSQL database is available. Example:

```http
postgres://<ЛОГИН>:<ПАРОЛЬ>@212.243.93.51:8001/<ИМЯ_БД>
```

Here:
- `<ЛОГИН>` — the administrator login for accessing Cloud Iceberg Metastore.
- `<ПАРОЛЬ>` — the administrator password for accessing Cloud Iceberg Metastore.
- `<ИМЯ_БД>` — the name of the PostgresSQL database.

{/tab}

{/tabs}

## {heading(Editing the instance name and description)[id=iceberg_edit]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Changing IP addresses and ports)[id=iceberg_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Viewing component status)[id=iceberg_status]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. On the instance page, go to the **Component status** tab.

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=iceberg_scaling]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the VK Cloud management console.
{/ifdef}

1. Go to the **Data Platform → Service instances** section.
1. Open the scaling settings in one of the following ways:

   - Click **•••** for the desired instance and select **Horizontal scaling**.
   - Click the name of the desired instance, on the **General information** tab click **•••** and select **Horizontal scaling**.
   - Click the name of the desired instance, go to the **Component status** tab and click the **Horizontal scaling** button.
   
1. Change the cluster parameters.
1. Click **Save changes**.

{/tab}

{/tabs}

## {heading(Increasing the disk size)[id=iceberg_disk_resize]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(Adding an account)[id=iceberg_add_users]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. Go to the **Credentials** tab.
1. Click **Add account**.
1. In the window that opens, set a login for accessing Cloud Iceberg Metastore.

   {include(../../../_includes/_iceberg.md)[tags=login]}

1. Select a role for the account:

    - `Database owner` — a user with the broadest set of permissions. When users are deleted, the permissions on the objects they created are transferred to the database owner. A service instance can have only one owner, and it cannot be deleted.

    - `Standard user` — a user who can create, modify, and view objects: tables, schemas, functions, etc. They own the permissions on the objects they create. The number of users with this role is not limited.

1. Come up with or generate a password.

   {include(../../../_includes/_iceberg.md)[tags=password]}

1. Click **Save changes**.

{/tab}

{/tabs}

## {heading(Changing network access parameters)[id=iceberg_change_network_access]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. Go to the **Credentials** tab.
1. Click **•••** for the desired account and select **Edit network access**.
1. In the window that opens, set the parameter values:

   - **Allow connection**: select the resources to connect to:
   
      - `To all databases`: connection to all databases is allowed.
      - `For physical replication`: connection for data replication is allowed.
      - `metastore`: connection to metadata is allowed (without access to raw data).

   - **Select the allowed connection method**: select one of the methods for connecting to the server to transfer data:
   
      - `Encryption not required (TLS is optional)`: the server allows both encrypted (via the TLS protocol) and unencrypted connections. If a TLS connection cannot be established, the connection is made over an unencrypted connection.
     
      - `Only with the TLS option`: the server allows exclusively TLS connections. All data is transmitted over an encrypted channel, which provides protection against data interception and tampering.

2. Click **Save**.

{/tab}

{/tabs}

## {heading(Managing extensions)[id=iceberg_extensions]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. Go to the **Extensions** tab.
1. Find the desired extension in the table; use the search bar if necessary.
1. The instance page contains extensions of the following types:

   1. Service extensions. They cannot be disabled. For some extensions, you can edit the parameters:
   
      1. Click **•••** for the desired extension and select **Edit**.
      1. In the window that opens, change the extension parameters.
      1. Click **Save**.
      
   1. Extensions that can be enabled or disabled. To enable or disable the use of an extension:
   
      1. Click **Enable** or **Disable** for the desired extension.
      1. In the window that opens, confirm enabling or disabling the use of the extension by clicking the **Save changes** or **Confirm** button.

1. View the history of extension changes by clicking ![ ](../../../assets/clock-icon.svg "inline").

{/tab}

{/tabs}

## {heading(Configuring a service instance)[id=iceberg_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. On the instance page, go to the **Settings** tab.
1. Find the desired parameter in the instance settings table; use the search bar if necessary.
1. View the history of setting changes by clicking ![ ](../../../assets/clock-icon.svg "inline").
1. Edit the desired settings:

   1. Click the **Edit** button.
   1. Change the values of the desired parameters in the table.
   1. If you need to return to the default value, click **•••** for the desired parameter and select **Reset**.
   1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Changing instance maintenance parameters)[id=iceberg_maintenance]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. Go to the **Maintenance** tab.

{include(../../../_includes/_iceberg.md)[tags=maintenance]}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Viewing backups)[id=iceberg_backup_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

## {heading(Creating an instance backup)[id=iceberg_backup]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. On the instance page, go to the tab with backups.
1. Click the **Add backup** button.
1. Set the backup name or keep the automatically generated name.
1. Select the backup type from the list.
1. Click the **Save** button.

{/tab}

{/tabs}

## {heading(Restoring an instance from a backup)[id=iceberg_restore]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_iceberg.md)[tags=open]}

1. On the instance page, go to the tab with backups.
1. Click **•••** for the desired backup and select **Restore**.
1. (Optional) Change the instance parameter values. The parameters are described in the section on {linkto(../create#iceberg_create)[text=creating an instance]}.

1. Click the **Create** button.

   A new Cloud Iceberg Metastore service instance will be created.

{/tab}

{/tabs}

## {heading(Deleting an instance)[id=iceberg_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}