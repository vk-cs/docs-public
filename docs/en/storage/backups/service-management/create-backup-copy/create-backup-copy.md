In addition to [automatic backups](../create-backup-plan), you can create backups manually in your VK Cloud management console:

- on the Cloud Backup service page
- on the page of the instance: virtual machine, database or analytical database

Use the manual mode to create backups before operations associated with the risk of data loss.

<info>

Backups are stored in the Cloud Storage object storage with the Backup storage class.

</info>

## Creating backup copy via Cloud Backup service

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Go to **Cloud Backup → Backup**.
1. Go to the **Manual** tab.
1. Click **Create backup** or **Add**.
1. In the window that opens, specify the backup parameters:

   - Select the type of resource to backup: `Virtual machine`, `Database`, `Analytical database`.
   - Select an instance from the list of available instances.
   - (Optional) Add a comment.

1. Click **Create backup**.

<info>

When a VM is backed up, all disks connected to it will be also backed up.

</info>

</tabpanel>
</tabs>

## Creating backup copy via instance page

<tabs>
<tablist>
<tab>Virtual machine</tab>
<tab>Database</tab>
<tab>Analytical database</tab>
</tablist>
<tabpanel>

1. Go to **Cloud Servers → Virtual machines**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required VM and select **Create backup**.
1. (Optional) Add **Comments**.
1. Click **Create backup**.

<info>

When a VM is backed up, all disks connected to it will be also backed up.

</info>

</tabpanel>
<tabpanel>

1. Go to **Databases → Database instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance and select **Create backup**.
1. (Optional) Add **Comments**.
1. Click **Create backup**.

</tabpanel>
<tabpanel>

1. Go to **Analytical DB → Instances**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required instance and select **Create backup**.
1. (Optional) Add **Comments**.
1. Click **Create backup**.

</tabpanel>
</tabs>
