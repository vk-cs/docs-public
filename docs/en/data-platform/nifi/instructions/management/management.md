# {heading(Working with service components)[id=nifi_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Viewing general information)[id=nifi_view_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Editing general information)[id=nifi_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Changing IP addresses and ports)[id=nifi_change-ip]}

{note:warn}
Standalone and Standalone as part of {var(cloud)} only.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component status)[id=nifi_view_status]}

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

## {heading(Horizontal scaling)[id=nifi_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Viewing the administrator account)[id=nifi_admin_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Viewing and editing settings)[id=nifi_edit_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Service instance maintenance)[id=nifi_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

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
1. Go to the tab you are interested in and click the icon on the right ![icon](../../../assets/clock-icon.svg "inline").
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=nifi_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}