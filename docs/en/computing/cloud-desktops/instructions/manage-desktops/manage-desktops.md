When a pool is successfully created, desktops are created in it automatically.

## Viewing desktop information

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Open the list of desktops using one of the following methods:

   - Through the general list of desktops: go to **Cloud Desktop** → **Desktop list**.
   - Through the list of pool desktops:

     1. Go to **Cloud Desktop** → **Desktop pools**.
     1. In the list of pools, click the name of the required pool.
     1. Go to the **Desktops** tab.
     1. (Optional) Click the **Filters** button and filter the desktops of this pool by their status, IP address, or connection type.

1. Review the desktop status. Possible values are:

    - `Being Created` — the desktop is starting but not yet ready for work.
    - `Ready` — the desktop is ready for users to connect.
    - `In Progress` — a user is in the process of connecting to the desktop.
    - `In Use` — a user is connected to the desktop.
    - `Manually Stopped` — the desktop is stopped by an administrator. Users cannot connect to this desktop until an administrator restarts it.
    - `Automatically Stopped` — the desktop is stopped by the system according to the specified rules.
    - `Error` — the desktop has failed. Contact [technical support](mailto:support@mcs.mail.ru).
    - `Deleted` — the desktop is deleted.
    - `Deleting` — the desktop is being deleted.
    - `Stopped by User` — the user stopped using the desktop.
    - `Udpating` — the desktop is being updated.

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

## Rebooting the desktop

{note:info}

Available for desktops, all VMs of which are in an emergency state.

{/note}

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. In the list of pools, click the name of the required pool.
1. Go to the **Desktops** tab.
1. Check the box for the required desktop.
1. Click **More** and select the option **Restart**.
1. Confirm the action.

## Logging out of session

It is used to force the termination of the user's session.

{note:info}

The VM remains turned on at the end of the session.

{/note}

This is a group operation: if necessary, you can manage multiple pool desktops by selecting them using checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Desktop pools**.
1. In the list of pools, click the name of the required pool.
1. Go to the **Desktops** tab.
1. Check the box for the required desktop.
1. Click **More** and select the option **End session**.
1. Confirm the action.

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
