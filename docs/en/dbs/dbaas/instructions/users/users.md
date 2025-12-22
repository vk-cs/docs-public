To restrict access to data, you can add users to a DB instance and assign them access rights to specific databases created on that instance. For all DBMS types except Redis, the first user for a DB instance is created when this instance is [added](../create).

{note:warn}

On Redis 6 instances, only user [creation](#add_user) and [deletion](#delete_user) is supported. For Redis 5, no user management operations are available.

{/note}

## View list of users

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.

The list of users and the databases available to them will be displayed.

{/tab}

{/tabs}

## {heading(Add user)[id=add_user]}

When a user is added, the databases available to him are assigned. In these databases, the user will have a full set of permissions.

{tabs}

{tab(Management console)}

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

{/tab}

{/tabs}

## Change list of available databases

You can change the list of instance databases available to a user.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required user and select **Edit user**.
1. Change the list of the available databases.
1. Click the **Save** button.

Once a new database is assigned, the user has full permissions on it.

{/tab}

{/tabs}

## {heading(Change user password)[id=change_user_password]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance.

    What you do next depends on whether there is the **Change password** option in the menu. For some DBMS types and configurations, the user password can only be changed on the page of the required instance.

    {tabs}

    {tab(The option is present)}
        
      1. Select **Change password**.
      1. In the window that opens, select the required user from the list.
      1. Create or generate a password.

         Password requirements:

         - It must be at least 16 characters long.
         - It can only contain uppercase and lowercase Latin letters, numbers, and special characters `.`, `,`, `!`, `$`, `&`, `*`, `(`, `)`, `-`, `+`, `=`.
         - It must contain at least one uppercase letter, lowercase letter, number, and special character.

      1. Click the **Change password** button.

    {/tab}

    {tab(There is no such option)}
    
      1. Click on the name of the required DB instance.
      1. On the instance page, go to the **Users** tab.
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required user and select **Change password**.
      1. Create or generate a password.

         Password requirements:

         - It must be at least 16 characters long.
         - It can only contain uppercase and lowercase Latin letters, numbers, and special characters `.`, `,`, `!`, `$`, `&`, `*`, `(`, `)`, `-`, `+`, `=`.
         - It must contain at least one uppercase letter, lowercase letter, number, and special character.

      1. Click the **Set password** button.

    {/tab}

    {/tabs}

{/tab}

{/tabs}

## {heading(Delete user)[id=delete_user]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete several users at once by selecting them with checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Select the project where the required DB instance is located.
1. Go to **Databases → Database instances**.
1. Click on the name of the required DB instance.
1. On the instance page, go to the **Users** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required user and select **Delete user**.
1. Confirm the deletion.

{/tab}

{/tabs}
