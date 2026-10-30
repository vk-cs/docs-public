# {heading(Working with service components)[id=kafka_management]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai.md)}

## {heading(Viewing instance information)[id=kafka_view]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) your VK Cloud management console.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the name of the required instance.
1. Review the information on the instance page tabs:

   - **General information**: instance parameters and main endpoints{ifndef(public)}, and the selected availability zones{/ifndef}.
   - **Architecture**: Cloud Kafka nodes and their characteristics shown as a diagram.
   - **Monitoring**: instance metrics.
   - **Credentials**: viewing and managing accounts.
   - **Settings**: viewing and editing the service configuration.

      To view a parameter description, click its name.

   - **Maintenance**: viewing and managing Cloud Kafka maintenance parameters.

{/tab}

{/tabs}

## {heading(Editing the instance name and description)[id=kafka_edit]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Changing IP addresses and ports)[id=kafka_change-ip]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip_without_ui]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Increasing disk size)[id=kafka_disk-resize]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=kafka_scaling]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) your VK Cloud management console.
{/ifdef}

1. Go to **Data Platform → Service instances**.
1. Open the scaling settings in one of the following ways:

   - From the service instance list:

      1. Click **•••** for the required instance in the service instance list.
      1. Select **Horizontal scaling**.

   - From the service instance page:

      1. Click the name of the required instance in the service instance list.
      1. On the **General information** tab, click **•••**.
      1. Select **Horizontal scaling**.

1. Specify the new number of Kafka broker nodes.
1. Add or remove additional options:

   - **Kafka Bridge**: to work with Cloud Kafka through the REST API;
   - **Kafka UI**: to work with Cloud Kafka through a graphical interface.

1. Click **Save changes**.

{/tab}

{/tabs}

## {heading(Editing the service configuration)[id=kafka_config]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Changing maintenance parameters)[id=kafka_maintenance]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Adding an account)[id=kafka_user-add]}

{tabs}

{tab(Management console)}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) your {var(cloud)} management console.
{/ifdef}

1. Go to **Data Platform → Service instances**.
1. Click the name of the required instance in the service instance list.
1. On the instance page, go to the **Credentials** tab.
1. Click **Add account**.
1. In the window that opens, specify the username for accessing the Cloud Kafka instance.
1. Select the user role:

   {include(../../../_includes/_kafka.md)[tags=roles]}

1. Create or generate a user password.

   Password requirements:

   - may contain only digits, the symbols `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `\\`, `]`, `^`, `_`, `` ` ``, `{`, `|`, `}`, `~`, and uppercase and lowercase Latin letters;
   - must contain at least 16 characters;
   - the maximum password length is 50 characters;
   - must contain at least one uppercase and one lowercase Latin letter, and at least one digit.

   {note:err}
   The password cannot be restored.
   {/note}

1. Click **Save**.

{/tab}

{/tabs}

## {heading(Restricting account access)[id=kafka_user-access]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_user_access]}

{/tab}

{/tabs}

## {heading(Deleting an account)[id=kafka_user-delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=kafka_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
