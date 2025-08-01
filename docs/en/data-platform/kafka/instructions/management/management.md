## Changing the configuration of components

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click on the name of the instance.
1. Go to the **Статус компонентов** tab.
1. Click the **Управление компонентами** button.
1. Update the necessary parameters and click **Save changes**.

{/tab}

{/tabs}

## Editing information about a service instance

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance and select **Edit**.
1. In the window that opens, specify the new name and description of the instance.
1. Click the **Save changes** button.

{/tab}

{/tabs}

## Changing the administrator password

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance and select **Change password**.
1. In the window that opens, enter the new administrator password.

   Password requirements:

   - can contain only numbers and special characters `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`, `-`, uppercase and lowercase Latin letters;
   - must consist of at least 8 characters;
   - must contain at least one uppercase and one lowercase letter of the Latin alphabet, at least one digit.

   {note:err}

   The password cannot be restored.

   {/note}

   To generate a new password, click **Generate** button.

1. Click the **Save** button.

{/tab}

{/tabs}

## Viewing information about an associated Kubernetes cluster

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance and select **Перейти к кластеру k8s**.

{/tab}

{/tabs}

## Deleting a service instance

This is a group operation: if necessary, you can delete several instances of the service at once by selecting them with checkboxes.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to **Data Platform → Экземпляры сервисов**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the instance and select **Delete**.
1. Confirm the deletion and wait for the operation to complete. The deletion may take a long time.

{/tab}

{/tabs}
