# {heading(Managing a service instance)[id=trino_management]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai.md)}

## {heading(Viewing instance information)[id=trino_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Renaming service instance)[id=trino_rename]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud management console.
1. Go to the section **Data Platform → Service instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Edit**.
1. In the window that opens, specify a new instance name.
1. Click **Save Changes**.

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Viewing and replacing a TLS certificate)[id=trino_certificate]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

{/tab}

{/tabs}

{/ifndef}

{ifndef(public)}
## {heading(Changing IP addresses and ports)[id=trino_change-ip]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip_without_ui]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Viewing component status)[id=trino_status]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=trino_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Vertical scaling)[id=trino_vertical_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_scaling]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Viewing and editing settings)[id=trino_edit_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Viewing an account)[id=trino_admin_view]}

{ifndef(public)}
{note:warn}
Only for {var(data-p)} as part of {var(cloud)}.
{/note}
{/ifndef}

{tabs}

{tab(Management console)}

1. Go to **Data Platform** → **Service instances**.
1. Click the instance name.
1. Go to the **Credentials** tab.
1. Review the information.

{/tab}

{/tabs}

## {heading(Changing user password)[id=trino_change_password]}

{ifndef(public)}
{note:info}
Only for {var(data-p)} as part of {var(cloud)}.
{/note}
{/ifndef}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Credentials** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired account and select **Edit**.
1. In the window that opens, specify a new user password.

   {include(/en/_includes/_trino.md)[tags=password]}

   {note:info}

   You cannot recover a lost password, but you can change it to a new one.

   {/note}

   To generate a new password, press the **Generate** button.

1. Click the **Save Changes** button.

{/tab}

{/tabs}

## {heading(Creating account)[id=trino_add_admin]}

{ifndef(public)}
{note:info}
Only for {var(data-p)} as part of {var(cloud)}.
{/note}
{/ifndef}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Credentials** tab.
1. Click the **Add Account** button.
1. In the window that opens, set a user login to access Trino.
1. Think of or generate an user password.

   {include(/en/_includes/_trino.md)[tags=password]}

   {note:info}

   A lost password cannot be recovered, but you can [change](#trino_change_password) to a new password.

   {/note}

1. Click the **Add** button.

{/tab}

{/tabs}

## {heading(Adding connection)[id=trino_add_connect]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Connections** tab.
1. Click the **Add connection** button.
1. On the page that opens, change the connection type and set its parameters:

   {include(/en/_includes/_trino.md)[tags=connect]}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Viewing a connection)[id=trino_view-connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_trino.md)[tags=open]}

1. On the instance page, go to the **Connections** tab.
1. Click the name of the required connection.
1. Review the connection information.

{/tab}

{/tabs}

## {heading(Deleting connection)[id=trino_delete_connect]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Connections** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired account and select **Delete**.
1. Confirm the deletion.

{/tab}

{/tabs}

## {heading(Managing user access)[id=trino_management_rbac]}

For more information, see [Managing user access](/en/data-platform/trino/instructions/rbac).

## {heading(Change in service period)[id=trino_maintenance]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Maintenance** tab.
1. Select the days of the week and the time when technical work starts. During these times, the server may be undergoing technical work, including backups - the service will be unavailable.

   {note:info}
   Duration of technical works - 4 hours. Time zone - GMT+03:00. 
   {/note}

1. Press the **Save changes** button.

{/tab}

{/tabs}

## {heading(Viewing change history)[id=trino_changes_history]}

{tabs}

{tab(Management console)}

1. Go to **Data Platform** → **Service instances**.
1. Click the instance name.
1. Go to the required tab and click ![icon](../../../assets/icon-clock.svg "inline") on the right.
1. Review the change history.

{/tab}

{/tabs}

## {heading(Deleting service instance)[id=trino_delete]}

This is a group operation: if necessary, you can delete multiple instances of the service at once by selecting them using the checkboxes.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app) your VK Cloud management console.
1. Go to the section **Data Platform**Data Platform → Service instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Delete**.
1. Confirm the deletion and wait for the operation to complete. Deletion may take a long time.

{/tab}

{/tabs}
