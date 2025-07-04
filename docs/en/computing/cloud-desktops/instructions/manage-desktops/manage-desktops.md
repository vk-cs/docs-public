When a pool is successfully created, desktops are created in it automatically.

## Viewing desktop information

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops: go to **Cloud Desktop** → **Desktop list**.
   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click the name of the required pool.
     1. Go to the **Desktops** tab.

The desktop status is displayed in the **Availability** column. Column **Connection** (`Active`/`Inactive`) shows whether the user is currently connected to the desktop.

## Starting or stopping the desktop

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops:

     1. Go to **Cloud Desktop** → **Desktop list**.
     1. Check the box for the required desktop.

   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click the name of the required pool.
     1. Go to the **Desktops** tab.
     1. Check the box for the required desktop.

1. Click **Start** or **Stop**.
1. Confirm the action.

{note:info}

The **Start** button is active only if all VMs for the selected tables are disabled. The **Stop** button is active only if all VMs for the selected tables are enabled.

{/note}

## Ending the user session

The state of the desktop after the end of the session is determined by the **Actions at the end of session** option, set when [creating](../desktops-pool/add) the pool.

To end the user session, log out of the system:

<tabs>
<tablist>
<tab>Astra Linux</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

1. On the desktop, go to **Пуск**.
1. Click the **Завершение работы...**.
1. In the window that opens, click **Выход из сессии**.

</tabpanel>
<tabpanel>

1. On the desktop, go to **Пуск**.
1. Click the name of the current user and select **Выход**.

{note:info}

You can also use the [logoff](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/logoff) command to end the session.

{/note}

</tabpanel>
</tabs>

{note:warn}

If the session has been terminated in another way, the disconnection will occur according to the time-out set when creating the pool.

{/note}

## Deleting the desktop

This is a group operation: if necessary, you can delete multiple pool desktops by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops:

     1. Go to **Cloud Desktop** → **Desktop list**.
     1. Check the box for the required desktop.

   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click the name of the required pool.
     1. Go to the **Desktops** tab.
     1. Check the box for the required desktop.

1. Click the **Delete** button.
1. Confirm the action.
