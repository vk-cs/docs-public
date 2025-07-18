To restrict access to data, you can add users to a DB instance and assign them access rights to specific databases created on that instance. For all DBMS types except Redis, the first user for a DB instance is created when this instance is [added](../create).

In addition to regular users, each DB instance has an administrator — a user who has the broadest possible authority within the instance. The only available operation to manage the administrator is to [reset his password](#reset_admin_password).

{note:warn}

On Redis 6 instances, only user [creation](#add_user) and [deletion](#delete_user) is supported. For Redis 5, no user management operations are available.

{/note}

## {heading(Reset administrator password)[id=reset_admin_password]}

Use this option to change the current [administrator](../../connect) password without entering the old one.

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required DB instance and select **Reset database administrator password**.
1. Read the warning and click the **Reset** button.
1. Copy and save the username and new password generated by the platform.
1. Click the **Done** button.

</tabpanel>
</tabs>

## View list of users

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.

The list of users and the databases available to them will be displayed.

</tabpanel>
</tabs>

{note:info}

The administrator is not displayed in the list of users.

{/note}

## {heading(Add user)[id=add_user]}

When a user is added, the databases available to him are assigned. In these databases, the user will have a full set of permissions. If you do not want to give the user such broad permissions, [set](#set_user_permissions) them separately by connecting to the database as an administrator.

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.
1. Click the **Add** button.
1. Set a username.

   Username requirements:

     - It can only contain uppercase and lowercase Latin letters, numbers, and the underscore character.
     - It cannot be longer than 16 characters.
     - It cannot begin with `mcs_`.
     - It cannot be from the list of banned usernames:

        | DBMS types | Banned usernames |
        |--|--|
        | PostgreSQL<br>PostgresPro | `os_admin`, `root`, `postgres`, `replicator` |
        | MySQL | `clusterrepuser` (prohibited only for cluster configuration), `os_admin`, `root` |
        | ClickHouse | `os_admin`, `root`, `default`, `replicator` |
        | MongoDB | `os_admin`, `root` |
        | Tarantool | `os_admin`, `root`, `admin`, `guest`, `replicator` |
        | OpenSearch | `os_admin`, `root`, `dbaasadmin` |
        | Redis 6 | `default`, `os_admin`, `root` |

1. Create or generate a password.

    Password requirements:

      - It must be at least 16 characters long.
      - It can only contain uppercase and lowercase Latin letters, numbers, and special characters `.`, `,`, `!`, `$`, `&`, `*`, `(`, `)`, `-`, `+`, `=`.
      - It must contain at least one uppercase letter, lowercase letter, number, and special character.

    If the password is lost, you can [change](#change_user_password) it, but not recover it.

1. Select from the list the databases that will be available to the user.
1. Click the **Create user** button.

</tabpanel>
</tabs>

## Change list of available databases

You can change the list of instance databases available to a user.

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required user and select **Edit user**.
1. Change the list of the available databases.
1. Click the **Save** button.

Once a new database is assigned, the user has full permissions on it.

</tabpanel>
</tabs>

## {heading(Change user password)[id=change_user_password]}

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance.

    What you do next depends on whether there is the **Change password** option in the menu. For some DBMS types and configurations, the user password can only be changed on the page of the required instance.

    <tabs>
    <tablist>
    <tab>The option is present</tab>
    <tab>There is no such option</tab>
    </tablist>
    <tabpanel>

      1. Select **Change password**.
      1. In the window that opens, select the required user from the list.
      1. Create or generate a password.

         Password requirements:

         - It must be at least 16 characters long.
         - It can only contain uppercase and lowercase Latin letters, numbers, and special characters `.`, `,`, `!`, `$`, `&`, `*`, `(`, `)`, `-`, `+`, `=`.
         - It must contain at least one uppercase letter, lowercase letter, number, and special character.

      1. Click the **Change password** button.

    </tabpanel>
    <tabpanel>

      1. Click on the name of the required DB instance.
      1. On the instance page, go to the **Users** tab.
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required user and select **Change password**.
      1. Create or generate a password.

         Password requirements:

         - It must be at least 16 characters long.
         - It can only contain uppercase and lowercase Latin letters, numbers, and special characters `.`, `,`, `!`, `$`, `&`, `*`, `(`, `)`, `-`, `+`, `=`.
         - It must contain at least one uppercase letter, lowercase letter, number, and special character.

      1. Click the **Set password** button.

    </tabpanel>
    </tabs>

</tabpanel>
</tabs>

## {heading(Delete user)[id=delete_user]}

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several users at once by selecting them with checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required user and select **Delete user**.
1. Confirm the deletion.

</tabpanel>
</tabs>

## {heading(Set user permissions)[id=set_user_permissions]}

VK Cloud tools does not allow you to configure selective permissions within a database, such as read-only access or access to a limited set of data. You can only configure such permissions directly in the database by connecting to it as an administrator.

1. [Connect](../../connect) to the database using your preferred method, such as an SDK or an external administration tool.

   If the DB instance has a host with the `Master` role, connect to it. If the instance does not have dedicated hosts with the `Master` role (like ClickHouse), connect to any host of the instance.

   To connect as an administrator, specify:

   - [Username](../../connect) for the requires DBMS type.
   - Administrator password. If you do not know the password, or if this is your first connection to the DB instance after its creation, [reset](#reset_admin_password) the password before connecting.

   {note:info}

   On OpenSearch instances, all users created via VK Cloud receive administrator rights; you can connect on behalf of any of them to set the permissions.

   {/note}

2. Configure the required permissions for the user.

The list of databases assigned to a user is displayed in the VK Cloud management console, on the **Users** tab of the DB instance, but the available permissions are not shown there.

- A database remains assigned to a user even if some his permissions have been revoked.
- A database is assigned to a user if any permissions have been configured in the database for that user.
