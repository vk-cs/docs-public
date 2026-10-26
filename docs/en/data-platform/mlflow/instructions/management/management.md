# {heading(Working with the service instance)[id=mlflow_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(General information)[id=mlflow_info]}

### {heading(Viewing general information)[id=mlflow_view_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Editing general information)[id=mlflow_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Changing IP and ports)[id=mlflow_change-ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing component status)[id=mlflow_view_status]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the desired instance.
1. On the instance page, go to the **Component Status** tab.

{/tab}

{/tabs}

## {heading(Administrator account)[id=mlflow_admin]}

### {heading(Viewing the account)[id=mlflow_admin_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Adding an account)[id=mlflow_admin_create]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the desired instance.
1. Go to the **Credentials** tab.
1. Click the **Add account** button.
1. Enter the account login and password.
   
   {note:info}
   For more information on the specifics of entering the login and password, see the section {linkto(../create#mlflow_create_user)[text=Step 5. Credentials]}
   {/note}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Connections)[id=mlflow_connect]}

### {heading(Viewing connections)[id=mlflow_view_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

### {heading(Adding connections)[id=mlflow_create_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_create_connect]}

{/tab}

{/tabs}

## {heading(Instance maintenance)[id=mlflow_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service_no_backup]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=mlflow_changes_history]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the desired instance.
1. Go to the desired tab and click the icon on the right ![icon](../../../assets/clock-icon.svg "inline").
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=mlflow_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}