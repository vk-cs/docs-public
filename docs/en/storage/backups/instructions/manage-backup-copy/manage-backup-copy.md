## Viewing backup statistics

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.

   A page with backup statistics for your project will open:

   * the total number of backup plans with automatic and manual start
   * the total volume of all backups of virtual machines
   * the number of successful backup runs from their total number over the last 24 hours and the last 7 days
   * the number of successful recoveries of VMs or database instances from their total number over the last 24 hours

   This statistics take into account all backup and recovery runs: both automatic and manual.

## Viewing list of instance backup copies

{tabs}

{tab(List of copies created by plan)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Automatic** tab.

   A list of all backup plans in your project will open.

   {note:info}

   For each plan, the list displays the total volume of VM backups included in the plan. Backups of DB and DBA instances are not included in the total volume calculation.

   {/note}

1. To find the required plan more easily in the list:

    * Filter the list. To do this, click **Filters** and select the backup status, time interval, and backup resource type.
    * Enter partially or completely the name of the required plan in the search bar. As you type, the list will show only plans with matching names.

1. To open the list of instances included in the plan, use one of the following methods:

   * Click the name of the required plan in the list.
   * In the list of backup plans, click ![ ](/en/assets/more-icon.svg "inline") for the required plan and select **View backups**.

1. To open the list of instance backup copies, click the instance name or the ![ ](/en/assets/right-arrow-icon.svg "inline") icon.

{/tab}

{tab(List of copies created manually)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Manual** tab.

   This will open a list of all instances (VM, DB, and ADB instances) in your project that have been manually backed up.

   {note:info}

   For each VM, the list displays the total volume of its manual backups. For DB and ADB instances, no volume data is displayed.

   {/note}

1. To find the required instance more easily in the list:

    * Filter the list by backup resource type.
    * Enter partially or completely the name of the required instance in the search bar. As you type, the list will show only instances with matching names.

1. To open the list of instance backup copies, click the link in the **Restore points** column for the required instance.

{/tab}

{/tabs}

## {heading(Deleting instance backup copies)[id=delete_backup_copy]}

{tabs}

{tab(Deleting copies created by plan)}

To delete all instance backup copies created within a plan at once, [delete](../manage-backup-plan#activate_stop_delete_backup_plan) that plan.

To delete individual instance backup copies:

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Automatic** tab.

   A list of all backup plans in your project will open.

1. To find the required plan more easily in the list:

    * Filter the list. To do this, click **Filters** and select the backup status, time interval, and backup resource type.
    * Enter partially or completely the name of the required plan in the search bar. As you type, the list will show only plans with matching names.

1. To open the list of instances included in the plan, use one of the following methods:

   * Click the name of the required plan in the list.
   * In the list of backup plans, click ![ ](/en/assets/more-icon.svg "inline") for the required plan and select **View backups**.

1. To open the list of instance backup copies, click the instance name or the ![ ](/en/assets/right-arrow-icon.svg "inline") icon.
1. Delete outdated backups using one of the methods:

   {tabs}
   
   {tab(For several copies)}
      
      1. In the list of backup copies, set the checkboxes for the required copies.
      1. Above the list of copies, click **Delete copy** and confirm the action.

   {/tab}
   
   {tab(For one copy)}
   
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the copy you need to delete.
      1. Select **Delete copy** and confirm the action.

   {/tab}
   
   {/tabs}

{/tab}

{tab(Deleting copies created manually)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Manual** tab.
1. To find the required instances more easily in the list:

    * Filter the list by backup resource type.
    * Enter partially or completely the name of the required instance in the search bar. As you type, the list will show only instances with matching names.

1. To delete all backup copies of one or more instances at once:

   {tabs}
   
   {tab(For several instances)}
      
      1. In the list of instances, set the checkboxes for the required instances.
      1. Above the list of instances, click **Delete** and confirm the action.

   {/tab}
   
   {tab(For one instance)}
   
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance and select **Delete**.
      1. Confirm the deletion.

   {/tab}
   
   {/tabs}

1. To delete individual instance backup copies:

   {tabs}
   
   {tab(For several copies)}
      
      1. Click the link in the **Restore points** column for the required instance.
      1. In the list of backup copies, set the checkboxes for the required copies.
      1. Above the list of copies, click **Delete** and confirm the action.

   {/tab}
   
   {tab(For one copy)}
   
      1. Click the link in the **Restore points** column for the required instance.
      1. Click ![ ](/en/assets/more-icon.svg "inline") for the copy you need to delete.
      1. Select **Delete copy** and confirm the action.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

{note:info}

Delete unnecessary backups promptly to save storage space.

{/note}
