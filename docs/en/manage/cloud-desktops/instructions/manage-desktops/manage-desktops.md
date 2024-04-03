When a pool is successfully created, desktops are created in it automatically.

## Viewing desktop information

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops: go to **Cloud Desktop** → **Desktop list**.
   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click on the name of the desired pool.
     1. Go to the **Desktops** tab.

The desktop status is displayed in the **Availability** column. Column **Connection** (`Active`/`Inactive`) shows whether the user is currently connected to the desktop.

## Starting or stopping the desktop

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops:

     1. Go to **Cloud Desktop** → **Desktop list**.
     1. Check the box for the desired desktop.

   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click on the name of the desired pool.
     1. Go to the **Desktops** tab.
     1. Check the box for the desired desktop.

1. Click **Start** or **Stop**.
1. Confirm the action.

<info>

The **Start** button is active only if all VMs for the selected tables are disabled. The **Stop** button is active only if all VMs for the selected tables are enabled.

</info>

## Ending the user session

The state of the desktop after the end of the session is determined by the setting **Actions at the end of session**, set at [pool creation](../desktops-pool/add/).

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
1. Click on the name of the current user and select **Выход**.

<info>

You can also use the [logoff](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/logoff) command to end the session.

</info>

</tabpanel>
</tabs>

<warn>

If the session was terminated in another way, the disconnection will occur according to the timeout set when creating the pool.

</warn>

## Deleting the desktop

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops:

     1. Go to **Cloud Desktop** → **Desktop list**.
     1. Check the box for the desired desktop.

   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click on the name of the desired pool.
     1. Go to the **Desktops** tab.
     1. Check the box for the desired desktop.

1. Click the **Delete** button.
1. Confirm the action.
