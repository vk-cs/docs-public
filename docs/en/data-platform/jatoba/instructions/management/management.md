# {heading(Working with service components)[id=jatoba_management]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(General information)[id=jatoba_info]}

### {heading(Viewing general information)[id=jatoba_view_info]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Editing general information)[id=jatoba_edit_info]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Changing IP and ports)[id=jatoba_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component statuses)[id=jatoba_view_status]}

{tabs}

{tab(Personal account)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. On the instance page, go to the **Component status** tab.

{/tab}

{/tabs}

## {heading(Scaling)[id=jatoba_horizontal_scaling]}

### {heading(Horizontal scaling)[id=jatoba_horizontal_scaling]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

### {heading(Vertical disk scaling)[id=jatoba_vertical_scaling]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_disk_scaling]}

{/tab}

{/tabs}

## {heading(User accounts)[id=jatoba_users]}

### {heading(Viewing user accounts)[id=jatoba_users_view]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Adding an account)[id=jatoba_users_create]}

{tabs}

{tab(Personal account)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. On the instance page, go to the **Credentials** tab.
1. Click the **Add account** button.
1. In the window that opens, set the user login for accessing the Jatoba instance.
1. Select a role:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Come up with or generate the user password.
1. Click the **Save changes** button.

{/tab}

{/tabs}

### {heading(Editing network access)[id=jatoba_users_access_network]}

{tabs}

{tab(Personal account)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. Go to the **Credentials** tab.
1. Click the **•••** icon to the right of the user account and select **Edit network access**.
1. Select the new connection permissions for the account.

   {note:info}
   For more information about the specifics of network access settings, see the section {linkto(../create#jatoba_network_access)[text=Step 5. Network access]}
   {/note}

1. Click the **Save** button.

{/tab}

{/tabs}

### {heading(Deleting user accounts)[id=jatoba_users_delete]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Enabling and disabling extensions)[id=postgresql_extensions]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_extensions]}

{/tab}

{/tabs}

## {heading(Viewing and editing settings)[id=jatoba_edit_settings]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Instance maintenance)[id=jatoba_service]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Instance backups)[id=jatoba_backup]}

### {heading(Viewing backups)[id=jatoba_backup_view]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Creating a backup)[id=jatoba_backup_create]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Restoring a backup)[id=jatoba_backup_recovery]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=jatoba_changes_history]}

{tabs}

{tab(Personal account)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. Go to the desired tab and click the icon ![icon](../../../assets/clock-icon.svg "inline") on the right.
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=jatoba_delete]}

{tabs}

{tab(Personal account)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}