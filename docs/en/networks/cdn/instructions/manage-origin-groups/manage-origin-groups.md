## {heading(Viewing list of groups)[id=origin_group_list]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to the **CDN → Source groups** section.

A list of origin groups will be displayed.

{/tab}

{/tabs}

## Creating group

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to the **CDN → Source groups** section.
1. Click ![ ](/en/assets/plus-icon.svg "inline") **Create source group**.
1. Enter the origin group name.
1. [Add](#adding_origin_to_group) one or several origins to group.
1. (Optional) [Edit](#editing_origins_in_group) the list of origins in the group.
1. Make sure, that DNS records are configured for the domains of all added sources (including disabled ones).

   {note:warn}

   If VK Cloud cannot check the availability of these domains using a DNS query, the origin group will not be created.

   {/note}

{include(/en/_includes/_cdn_origin.md)[tags=4XX_5XX]}

1. Click **Create group**.

{/tab}

{/tabs}

## Adding origin to group

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to the **CDN → Source groups** section.
1. Open the group editing page by one of the following ways:

   - Click the name of the group you need.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required group and select **Group settings**.

{include(/en/_includes/_cdn_origin.md)[tags=add]}

{include(/en/_includes/_cdn_origin.md)[tags=4XX_5XX]}

{/tab}

{/tabs}

## Editing origins in group

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to the **CDN → Source groups** section.
1. Open the group editing page by one of the following ways:

   - Click the name of the group you need.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required group and select **Group settings**.

1. (Optional) Use the toggle to the right from the origin to enable or disable it. You cannot disable `Active` origin if it is the only enabled origin in the group. The disabled origin will not answer requests of CDN servers.

1. (Optional) Edit the URL of the origin:

   1. Click ![pencil-icon](/en/assets/pencil-icon.svg "inline") to the right from the origin.

   {include(/en/_includes/_cdn_origin.md)[tags=edit_url]}

   1. Click **Save changes**.

1. (Optional) Edit the origin type:

   1. Click ![pencil-icon](./assets/pencil-icon.svg "inline") to the right from the origin.
   1. Change the origin type in the **Source type** parameter. You cannot change the origin type if it is the only enabled `Active` origin in the group.
   1. Click **Save changes**.

1. (Optional) Remove the origin. Click ![trash-icon](./assets/trash-icon.svg "inline") to the right from the origin. You cannot remove the origin type if it is the only enabled `Active` origin in the group.

1. Click **Save changes**.

{/tab}

{/tabs}

## Editing group

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to the **CDN → Source groups** section.
1. Open the group editing page by one of the following ways:

   - Click the name of the group you need.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required group and select **Group settings**.

1. (Optional) Edit the group name.
1. (Optional) [Add](#adding_origin_to_group) one or more origins.
1. (Optional) [Edit](#editing_origins_in_group) origins in the group.
1. Make sure, that DNS records are configured for the domains of all added sources (including disabled ones).

   {note:warn}

   If VK Cloud cannot check the availability of these domains using a DNS query, the origin group will not be created.

   {/note}

{include(/en/_includes/_cdn_origin.md)[tags=4XX_5XX]}

1. Click **Create group**.

{/tab}

{/tabs}

## Deleting group

{note:warn}

You cannot delete the origin group if CDN servers use it. To delete such group, firstly link another origin group with the CDN servers or [delete CDN servers](../delete-resource).

{/note}

{tabs}

{tab(Management console)}

This is a group operation: you can delete several groups at once by setting the checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project.
1. Go to the **CDN → Source groups** section.
1. Delete the orgin group with one of the following ways:

   - Set the checkbox for the required group, then click **Delete** above the table.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required group and select **Delete group**.
1. Confirm the deletion.

{/tab}

{/tabs}
