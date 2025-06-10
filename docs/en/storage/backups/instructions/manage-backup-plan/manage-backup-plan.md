## Viewing information about backup plans

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Automatic** tab.

    A page with a list of backup plans will open. For each plan, the list contains the following information:

    * The total volume of VM backups included in the plan. The volume of backups of DB and ADB instances is not included in this amount.
    * The plan status: `Turned on` or `Stopped`.
    * The number of successful, unsuccessful and not yet completed backup runs. By default, the last run information is displayed. To see data for a day or a week, click the **Filters** button and select the required value.
    * The date and time of the last and next scheduled runs.

1. To view additional information about a backup plan, click ![](/en/assets/info-icon.svg "inline") for the required plan.
1. To find the required plan more easily in the list:

    * Filter the list. To do this, click **Filters** and select the backup status, time interval, and backup resource type.
    * Enter partially or completely the name of the required plan in the search bar. As you type, the list will show only plans with matching names.

</tabpanel>
</tabs>

## Viewing list of backup copies created by plan

<info>

The list of backup copies created according to a plan is grouped by the instances included in the plan.

</info>

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Automatic** tab.
1. To open the list of instances included in the plan, use one of the following methods:

   * Click the name of the required plan in the list.
   * In the list of plans, click ![ ](/en/assets/more-icon.svg "inline") for the required plan and select **View backups**.

1. To open the list of instance backup copies, click the instance name or the ![ ](/en/assets/right-arrow-icon.svg "inline") icon.

</tabpanel>
</tabs>

## {heading(Editing backup plan)[id=edit_backup_plan]}

<warn>

When editing a plan, you cannot change the selection of instances for backup.

</warn>

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Automatic** tab.
1. Find the required plan in the list and go to the page for editing it in one of the following ways:

   * Click ![ ](/en/assets/more-icon.svg "inline") for the plan in the list and select **Edit**.
   * Set the checkbox for the plan and click **Edit** above the list of plans.

1. Change the required parameters of the plan.

<tabs>
<tablist>
<tab>Virtual machine</tab>
<tab>Database</tab>
<tab>Analytical database</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_backup_plan_create_change.md)[tags=vm]}

</tabpanel>

<tabpanel>

{include(/en/_includes/_backup_plan_create_change.md)[tags=db]}

</tabpanel>

<tabpanel>

{include(/en/_includes/_backup_plan_create_change.md)[tags=adb]}

</tabpanel>
</tabs>

</tabpanel>
</tabs>

## {heading(Activating, stopping, and deleting backup plan)[id=activate_stop_delete_backup_plan]}

<err>

Deleting a backup plan will delete all backups created according to that plan.

</err>

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Automatic** tab.
1. To change the state of a backup plan:

   <tabs>
   <tablist>
   <tab>For several plans</tab>
   <tab>For one plan</tab>
   </tablist>
   <tabpanel>

      1. In the list of plans, set the checkboxes for the required plans.
      1. Above the list of plans, click the required action button.
      1. Confirm the action.

   </tabpanel>
   <tabpanel>

      1. Click ![ ](/en/assets/more-icon.svg "inline") for the required plan.
      1. Select and confirm the required action.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>
