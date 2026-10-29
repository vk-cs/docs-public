# {heading(Working with the service instance)[id=opensearch_management]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(General information)[id=opensearch_info]}

### {heading(Viewing general information)[id=opensearch_view_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Editing general information)[id=opensearch_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Viewing and replacing the TLS certificate)[id=opensearch_certificate]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

For more information on working with certificates, see the {linkto(../../../certificates/manage#certificates_manage)[text=Certificates]} section.

{/tab}

{/tabs}

{/ifndef}

## {heading(Changing IPs and ports)[id=opensearch_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component status)[id=opensearch_view_status]}

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

## {heading(Horizontal scaling)[id=opensearch_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(User accounts)[id=opensearch_users]}

### {heading(Viewing accounts)[id=opensearch_users_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Creating accounts)[id=opensearch_users_create]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the desired instance.
1. Go to the **Credentials** tab.
1. Click the **Add account** button.
1. Specify the login, role, and password for the account. Currently, only the `Administrator` role is available for the user.

   {note:info}
   For more information on the specifics of creating a user, see the {linkto(../create#opensearch_create_user)[text=Step 4. Credentials]} section
   {/note}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Service instance maintenance)[id=opensearch_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Instance backups)[id=opensearch_backup]}

### {heading(Viewing backups)[id=opensearch_backup_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Creating a backup)[id=opensearch_backup_create]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Restoring a backup)[id=opensearch_backup_recovery]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=opensearch_changes_history]}

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

## {heading(Deleting a service instance)[id=opensearch_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}