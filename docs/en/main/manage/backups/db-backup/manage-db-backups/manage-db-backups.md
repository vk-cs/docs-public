In addition to automatic backups, you can create database backups manually in your VK Cloud personal account.

## Creating a backup

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Create a backup using one of the following methods:

<tabs>
<tablist>
<tab>Via DB instance</tab>
<tab>Through the backup section</tab>
</tablist>
<tabpanel>

1. Go to **Databases** → **Database Instances**.
1. In the DB instance menu, select the option **Create backup**.
1. In the window that opens, specify a comment if necessary and click **Create a backup**.

</tabpanel>
<tabpanel>

1. Go to **Databases** → **Backup**.
1. Go to the **Manual** tab.
1. Click the **Add** button.
1. In the window that opens, select the DB instance and specify a comment if necessary.
1. Press the button **Create a backup**.

</tabpanel>
</tabs>

<info>

Backups are made to the object storage.

</info>

## Viewing a list of backups

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **Databases** → **Backup**.
1. Go to the **Manual** tab.
1. Click on the link in the column **Restore points**.

A list of recovery points for the selected backup will be displayed.

</tabpanel>
</tabs>

## Deleting backups

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **Databases** → **Backup**.
1. Go to the **Manual** tab.
1. Expand the menu of the desired backup and select the **Delete** option.
1. In the window that appears, confirm the operation.

</tabpanel>
</tabs>

<info>

Automatically created backups are deleted according to the plan settings.

</info>
