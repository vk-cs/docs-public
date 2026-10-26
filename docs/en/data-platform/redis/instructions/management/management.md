# {heading(Working with service components)[id=redis_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(General information)[id=redis_info]}

### {heading(Viewing general information)[id=redis_view_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Editing general information)[id=redis_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Viewing and replacing the TLS certificate)[id=redis_certificate]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

For more information on working with certificates, see the {linkto(../../../certificates/manage#certificates_manage)[text=Certificates]} section.

{/tab}

{/tabs}

{/ifndef}

## {heading(Changing IP addresses and ports)[id=redis_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component status)[id=redis_view_status]}

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

## {heading(Scaling)[id=redis_scaling]}

### {heading(Horizontal scaling)[id=redis_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

### {heading(Vertical disk scaling)[id=redis_vertical_disk_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_disk_scaling]}

{/tab}

{/tabs}

## {heading(Administrator account)[id=redis_admin]}

### {heading(Viewing an account)[id=redis_admin_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Adding an account)[id=redis_admin_create]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. On the instance page, go to the **Credentials** tab.
1. Click the **Add account** button.
1. Specify the account login and password.
   
   {note:info}
   For more information on the specifics of entering the login and password, see the {linkto(../create#redis_create_user)[text=Step 4. Credentials]} section
   {/note}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Viewing and editing settings)[id=redis_edit_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Service instance maintenance)[id=redis_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Instance backups)[id=redis_backup]}

### {heading(Viewing backups)[id=redis_backup_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Creating a backup)[id=redis_backup_create]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Restoring a backup)[id=redis_backup_recovery]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=redis_changes_history]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. Go to the desired tab and click the icon on the right ![icon](../../../assets/clock-icon.svg "inline").
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=redis_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}