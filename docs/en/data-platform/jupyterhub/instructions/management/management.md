# {heading(Working with a service instance)[id=jupyterhub_management]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(General information)[id=jupyterhub_info]}

### {heading(Viewing general information)[id=jupyterhub_view_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Editing general information)[id=jupyterhub_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Changing IP addresses and ports)[id=jupyterhub_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component status)[id=jupyterhub_view_status]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click on the name of the desired instance.
1. On the instance page, go to the **Component status** tab.

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=jupyterhub_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Administrator account)[id=jupyterhub_admin]}

{note:warn}
Only for Standalone as part of {var(cloud)}.
{/note}

### {heading(Viewing an account)[id=jupyterhub_admin_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Adding an account)[id=jupyterhub_admin_create]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click on the name of the desired instance.
1. Go to the **Credentials** tab.
1. Click the **Add account** button.
1. Enter the account login and password.

   {note:info}
   For details on the specifics of entering the login and password, see the section {linkto(../create#jupyterhub_create_user)[text=Step 5. Credentials]}
   {/note}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Connections)[id=jupyterhub_connect]}

### {heading(Viewing connections)[id=jupyterhub_view_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

### {heading(Adding connections)[id=jupyterhub_create_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_create_connect]}

{/tab}

{/tabs}

## {heading(Service instance maintenance)[id=jupyterhub_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service_no_backup]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=jupyterhub_changes_history]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click on the name of the desired instance.
1. Go to the desired tab and click the icon ![icon](../../../assets/clock-icon.svg "inline") on the right.
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=jupyterhub_delete]}
{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}