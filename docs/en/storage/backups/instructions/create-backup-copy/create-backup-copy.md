In addition to [automatic backups](../create-backup-plan), you can create backups manually in your VK Cloud management console:

- on the Cloud Backup service page
- on the page of the instance: virtual machine, database or analytical database

Use the manual mode to create backups before operations associated with the risk of data loss.

{note:info}

Backups are stored in the Cloud Storage object storage with the Backup storage class.

{/note}

## Creating backup copy via Cloud Backup service

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Manual** tab.
1. Click **Create backup** or **Add**.
1. In the window that opens, specify the backup parameters:

   - Select the type of resource to backup: `Virtual machine`, `Database`, `Analytical database`.
   - Select an instance from the list of available instances.
   - (Optional) For a virtual machine, select the disks you want to save in its backup. By default, all disks attached to the VM will be saved.

     {include(/en/_includes/_backup_plan_create_change.md)[tags=restore]}

   - (Optional) Add a comment.

1. Click the **Create backup** button.

{/tab}
{/tabs}

## Creating backup copy via instance page

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Create a backup copy of the required object via its instance page:

   {tabs}
   {tab(Virtual machine)}

   1. Go to **Cloud Servers → Virtual machines**.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM and select **Create backup**.
   1. (Optional) Add a comment.
   1. (Optional) Select the disks connected to the VM that you want to save in its backup. By default, all disks will be saved.

      {include(/en/_includes/_backup_plan_create_change.md)[tags=restore]}

   1. Click the **Create backup** button.

   {/tab}
   {tab(Database)}

   1. Go to **Databases → Database instances**.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance and select **Create backup**.
   1. (Optional) Add a comment.
   1. Click the **Create backup** button.

   {/tab}
   {tab(Analytical database)}

   1. Go to **Analytical DB → Instances**.
   1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance and select **Create backup**.
   1. (Optional) Add a comment.
   1. Click the **Create backup** button.

   {/tab}
   {/tabs}

{/tab}
{/tabs}

## Creating backup copy of virtual machine via catalog of services

{tabs}
{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. On the main page, click the **All possibilities** button.
1. In the **All Solutions → Cloud Servers** section, click the respective button on the card of the required service.
1. In the window that opens, specify the backup parameters:

   - Select an instance from the list of available VMs.
   - (Optional) Add a comment.
   - (Optional) Select the disks connected to the VM that you want to save in its backup. By default, all disks will be saved.

     {include(/en/_includes/_backup_plan_create_change.md)[tags=restore]}

1. Click the **Create backup** button.

{/tab}
{/tabs}
