# {heading(Ensuring data protection against cyberattacks or insider threats)[id=backups-data-security]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using the Cloud Backup service, you can protect backups from deletion or integrity changes by enabling {linkto(../../concepts/blocked-backup#backup-blocked)[text=deletion lock]} in `Compliance` mode for a backup plan. In this mode, backups or part of them cannot be deleted until the specified period expires — including via technical support. This guarantees data safety in the event of a cyberattack, account compromise, or insider threat from privileged users. At the same time, the deletion lock does not prevent restoration from a backup — it only prevents deletion and integrity changes of the backup itself.

The following data is used as an example:

- Virtual machine name: `secure-vm`
- Backup plan name: `compliance-locked-plan`
- Retention period: `3` days
- Protection mode: `Compliance`

## {heading(Preparation steps)[id=data-security-prepare]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} personal dashboard and make sure the Cloud Backup service is available in the project.
1. Make sure the project contains a virtual machine for which you need to configure protected backups. The `secure-vm` VM is used as an example.
1. Determine the backup retention period in days in accordance with compliance requirements or regulations (for example, Federal Law No. 152-FZ).

   {note:warn}
   The `Compliance` mode provides a strict lock: a backup cannot be deleted or its retention period shortened until the specified period expires, including via technical support. Before configuring, make sure the selected period meets your requirements.
   {/note}

## {heading(1. Create a plan with a deletion lock in Compliance mode)[id=data-security-step1]}

{linkto(../../instructions/create-backup-plan#backup-plan-create)[text=Create]} a backup plan for the virtual machine. Specify the following parameters:

* **Plan name**: `compliance-locked-plan`.
* **Resource type**: `Virtual machine`.
* In the list of VMs, select `secure-vm`.
* In the **Days of full backup creation** field, select the days of the week (for example, all days) and specify the time (for example, `02:00`).
* (Optional) Enable the **Enable incremental backups** option so that incremental copies are created on days without a full backup.
* In the storage approach selection block, enable the **Enable non-removable backups** option.
* Select the lock type: `Temporary protection`.
* In the retention period field, specify `3` days.
* In the protection mode selection field, select `Compliance` to enable ({linkto(../../concepts/blocked-backup#backup-blocked-compliance-lock)[text=a strict lock]}).

## {heading(2. Verify that the lock is applied to backups)[id=data-security-step2]}

1. Wait for the first scheduled backup run.
1. {linkto(../../instructions/manage-backup-plan#backup-plan-view)[text=Make sure]} the `compliance-locked-plan` plan is marked with a lock icon (![protected](../../../../assets/protected-icon.svg "inline")).
1. {linkto(../../instructions/manage-backup-plan#backup-plan-view)[text=View]} the list of backups of the `secure-vm` VM for the `compliance-locked-plan` plan.
1. For each created copy, hover over the lock icon next to the name. Make sure the following is displayed:

   - Lock type: `Compliance`.
   - Lock period: `3` days (or the remaining days until expiration).

   {note:info}
   All backups created under the plan inherit the current lock settings of the plan. The settings of already created copies do not change when the plan settings are modified.
   {/note}

## {heading(3. Verify that everything works)[id=data-security-check]}

1. {linkto(../../instructions/restore-from-backup#backup-restore-vm)[text=Restore]} the `secure-vm` VM from a protected backup to a new instance.
1. Wait for the restoration to complete.
1. Check the restored VM:

   - Make sure the VM is created and running.
   - Verify the integrity of the data on the restored VM.

1. Make sure the protected copy cannot be deleted ahead of schedule. In the list of backups, try to select **Delete copy** for a copy with an active `Compliance` lock — the operation should be unavailable until the period expires.

## {heading(Delete unused resources)[id=data-security-delete]}

The created resources are {linkto(../../tariffication#backup-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the `secure-vm` virtual machine if it is no longer needed.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the VM restored from the backup if it is no longer needed.
1. {linkto(../../instructions/manage-backup-plan#backup-plan-activate-stop-delete)[text=Delete the backup plan]} after the lock period ends if the copies are no longer needed.

   {note:err}
   When a backup plan is deleted, all backups created under this plan whose lock period has expired will be deleted.
   {/note}