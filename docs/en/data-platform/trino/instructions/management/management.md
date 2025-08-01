## {heading(Renaming service instance)[id=rename]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) the VK Cloud management console.
1. Go to the section **Data Platform → Экземпляры сервисов**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Edit**.
1. In the window that opens, specify a new instance name.
1. Click **Save Changes**.

{/tab}

{/tabs}

## {heading(View service instance parameters)[id=view]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

{/tab}

{/tabs}

## {heading(Viewing status of components)[id=status]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Component Status** tab.

{/tab}

{/tabs}

## {heading(Scaling service instance)[id=scaling]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Component Status** tab.
1. Click the **Scale** button.
1. Change the cluster settings:

   - In the **Coordinator** block, change the number of CPUs and RAM of the master node.
   - In the **Worker** block, change the number of nodes and the number of CPUs and RAM for each worker node in the cluster.
1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Changing administrator password)[id=change_password]}

{tabs}

{tab(Management consoleт)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Credentials** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired account and select **Edit**.
1. In the window that opens, specify a new administrator password.

   {include(/en/_includes/_trino.md)[tags=password]}

   {note:info}

   You cannot recover a lost password, but you can change it to a new one.

   {/note}

   To generate a new password, press the **Generate** button.

1. Click the **Save Changes** button.

{/tab}

{/tabs}

## {heading(Creating administrator account)[id=add_admin]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Credentials** tab.
1. Click the **Add Account** button.
1. In the window that opens, set an administrator login to access Trino.
1. Think of or generate an administrator password.

   {include(/en/_includes/_trino.md)[tags=password]}

   {note:info}

   A lost password cannot be recovered, but you can [change](#change_password) to a new password.

   {/note}

1. Click the **Add** button.

{/tab}

{/tabs}

## {heading(Adding connection)[id=add_connect]}

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

## {heading(Deleting connection)[id=delete_connect]}

{tabs}

{tab(Management console)}

{include(/en/_includes/_trino.md)[tags=open]}

1. On the instance page, click the **Connections** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired account and select **Delete**.
1. Confirm the deletion.

{/tab}

{/tabs}

## {heading(Change in service period)[id=maintenance]}

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

## {heading(Deleting service instance)[id=delete]}

This is a group operation: if necessary, you can delete multiple instances of the service at once by selecting them using the checkboxes.

{tabs}

{tab(Management console)}

1. [Go](https://msk.cloud.vk.com/app) to the VK Cloud management console.
1. Go to the section **Data Platform**Data Platform → Экземпляры сервисов**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the desired instance and select **Delete**.
1. Confirm the deletion and wait for the operation to complete. Deletion may take a long time.

{/tab}

{/tabs}
