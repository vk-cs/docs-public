# {heading(Backup with a limit on the number of copies)[id=backup-forward-incremental]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Forward Incremental Backup strategy involves setting a maximum number of full backups to be retained. If this number is exceeded, {var(cloud)} will automatically delete the oldest backups.

{note:info}
Backups can be created successfully or with an error. Backups created with an error are not billed and cannot be used for recovery.
{/note}

Backups are deleted according to the following algorithm:

1. The number of successfully created copies is checked. If it exceeds the limit set in the plan, the oldest of these copies are deleted. The number of deleted copies will equal the difference between the total number of successfully created backups and the set maximum.
2. The total number of backups is checked. If it exceeds the limit set in the plan, all backups created with an error before the oldest successful one are deleted.
3. If there are no successfully created backups, the oldest backups created with an error are deleted. The number of deleted copies will equal the difference between the number of backups created with an error and the set maximum.

The deletion process is launched after a backup is created and one hour after the backup plan settings are changed.

{cut(Example of the algorithm operation)}

The **Max. number of full backups** parameter is set to: `2`.

Backups are created according to the backup plan:

- **Copy 1** is created with an error.<br>
The number of successfully created copies is 0, does not exceed the maximum.<br>
The total number of backups is 1, does not exceed the maximum.
- **Copy 2** is created successfully.<br>
The number of successfully created copies is 1, does not exceed the maximum.<br>
The total number of backups is 2, does not exceed the maximum.
- **Copy 3** is created successfully.<br>
The number of successfully created copies is 2, does not exceed the maximum.<br>
The total number of backups is 3, exceeds the maximum. There are copies created with an error earlier than the oldest successfully created copy. **Copy 1** will be deleted.
- **Copy 4** is created with an error.<br>
The number of successfully created copies is 2, does not exceed the maximum.<br>
The total number of backups is 3, exceeds the maximum. There are no copies created with an error earlier than the oldest successfully created copy. No backups will be deleted.
- **Copy 5** is created with an error.<br>
The number of successfully created copies is 2, does not exceed the maximum.<br>
The total number of backups is 4, exceeds the maximum. There are no copies created with an error earlier than the oldest successfully created copy. No backups will be deleted.
- **Copy 6** is created successfully.<br>
The number of successfully created copies is 3, exceeds the maximum. **Copy 2** will be deleted.<br>
The total number of backups is 5, exceeds the maximum. There are no copies created with an error earlier than the oldest successfully created copy. Backups created with an error will not be deleted.

The following backups will remain:

- **Copy 3**, created successfully.
- **Copy 4**, created with an error.
- **Copy 5**, created with an error.
- **Copy 6**, created successfully.

{/cut}

{note:err}
When a full backup is deleted, all incremental backups created based on it will also be deleted.
{/note}