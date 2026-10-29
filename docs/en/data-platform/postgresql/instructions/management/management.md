# {heading(Working with service components)[id=postgresql_management]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(General information)[id=postgresql_info]}

### {heading(Viewing general information)[id=postgresql_view_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Editing general information)[id=postgresql_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Viewing and replacing the TLS certificate)[id=postgresql_certificate]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

For more information on working with certificates, see the {linkto(../../../certificates/manage#certificates_manage)[text=Certificates]} section.

{/tab}

{/tabs}

{/ifndef}

## {heading(Changing IP addresses and ports)[id=postgresql_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component statuses)[id=postgresql_view_status]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. On the instance page, go to the **Component status** tab.

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=postgresql_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Increasing disk size)[id=postgresql_disk_resize]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(User accounts)[id=postgresql_users]}

### {heading(Viewing accounts)[id=postgresql_users_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Adding an account)[id=postgresql_users_create]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. On the instance page, go to the **Credentials** tab.
1. Click the **Add account** button.
1. In the window that opens, set the username for accessing the Cloud PostgreSQL instance.
1. Select a role:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Create or generate the user password.
1. Click the **Save changes** button.

{/tab}

{/tabs}

### {heading(Editing network access)[id=postgresql_users_access_network]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. Go to the **Credentials** tab.
1. Click the **•••** icon to the right of the user account and select **Edit network access**.
1. Select new connection permissions for the account.

   {note:info}
   For more information about network access settings, see the {linkto(../create#postgresql_network_access)[text=Step 5. Network access]} section
   {/note}

1. Click the **Save** button.

{/tab}

{/tabs}

### {heading(Deleting accounts)[id=postgresql_users_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Enabling and disabling extensions)[id=postgresql_extensions]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_extensions]}

{/tab}

{/tabs}

## {heading(Viewing and editing settings)[id=postgresql_edit_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Instance maintenance)[id=postgresql_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Instance backups)[id=postgresql_backup]}

### {heading(Viewing backups)[id=postgresql_backup_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Creating a backup)[id=postgresql_backup_create]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Restoring a backup)[id=postgresql_backup_recovery]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=postgresql_changes_history]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. Go to the tab of interest and click the icon on the right ![icon](../../../assets/clock-icon.svg "inline").
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=postgresql_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}