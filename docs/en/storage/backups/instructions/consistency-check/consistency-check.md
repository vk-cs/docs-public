# {heading(Checking a backup for data consistency)[id=backup-consistency]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Cloud Backup → Backup** section.
1. Open the desired backup list.

   {tabs}

   {tab(Created automatically)}

    1. Go to the **Automatic** tab.
    1. Click on the name of the desired plan or click ![ ](../../../../assets/more-icon.svg "inline") for the desired plan and select **View backups**.
    1. For the desired instance, click on its name or on the ![ ](../../../../assets/right-arrow-icon.svg "inline") icon.

   {/tab}

   {tab(Created manually)}

    1. Go to the **Manual** tab.
    1. Find the desired instance in the list.
    1. Click on the link in the **Recovery points** column for the desired instance.

   {/tab}

   {/tabs}

1. Find the desired backup in the list and click **Verify** for it in the **Integrity** column.
1. Wait for the verification result:

   - `Verified` — the backup contains no errors and can be safely {linkto(../restore-from-backup#backup-restore)[text=restored]}.
   - `Not verified` — errors or inconsistent data were found in the backup. Create a new backup — {linkto(../create-backup-plan#backup-plan-create)[text=automatically]} or {linkto(../create-backup-copy#backup-copy-create)[text=manually]}.