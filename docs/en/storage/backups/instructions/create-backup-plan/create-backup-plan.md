A backup plan is used to regularly create automatic backups of a virtual machine or database.

The backup plan includes:

- the type and name of the object to be backed up
- settings for the backup storage and deletion strategy
- a schedule for backup runs

You can create a backup plan:

- automatically, by enabling the backup option when creating a VM or DB instance
- manually in your VK Cloud management console or using the [Cloud Backup API](/ru/tools-for-using-services/api/api-spec/backup-api "change-lang")

{note:info}

Each VM or DB instance can have only one backup plan.

{/note}

## {heading(Creating backup plan for virtual machine)[id=create_vm_backup_plan]}

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup**.
1. Click **Create schedule**.
1. Enter the backup **Plan name**.
1. Select the resource type: `Virtual machine`.

   Below on the plan creation page are default settings that comply with VK Cloud best practices:

   - **Enable incremental backups**: the option is disabled.
   - **Days of creating a full backup**: all days of the week are selected, the start time is selected between 09:00 and 18:00.
   - **Enable full copy storage strategy (GFS)**: the option is enabled.
   - **Keep weekly complete copies**: the period of `4` weeks is specified.
   - **Keep monthly complete copies**: the option is enabled, the period of `12` months is specified.
   - **Keep yearly complete copies**: the option is enabled, the period of `3` years is specified.

1. If the default settings are suitable for your plan, select the required VMs in the **Apply to the following virtual machines** field and click the **Create a plan** button. Skip the rest of the steps.

   If you need to change the settings, proceed to the next step.

{include(/en/_includes/_backup_plan_create_change.md)[tags=vm]}

The created backup plan will appear in the list.

{note:info}

When a VM is backed up, all disks connected to it will be also backed up.

{/note}

</tabpanel>
</tabs>

## {heading(Creating backup plan for database instance)[id=create_db_backup_plan]}

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup**.
1. Click **Create schedule**.
1. Enter the backup **Plan name**.
1. Select the resource type: `Database`.

{include(/en/_includes/_backup_plan_create_change.md)[tags=db]}

The created backup plan will appear in the list.

</tabpanel>
</tabs>

## Creating backup plan for analytical database instance

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup**.
1. Click **Create schedule**.
1. Enter the backup **Plan name**.
1. Select the resource type: `Analytical database`.

{include(/en/_includes/_backup_plan_create_change.md)[tags=adb]}

The created backup plan will appear in the list.

</tabpanel>
</tabs>
