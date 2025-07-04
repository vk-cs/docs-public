The Forward Incremental Backup allows you to set the maximum number of full backups to keep. If the number of backups exceeds the maximum, VK Cloud will automatically delete the oldest of them.

{note:info}

Backups can be created successfully or with an error. Backups created with an error are not charged and cannot be used for recovery.

{/note}

Backups are deleted according to the following algorithm:

1. The number of successfully created copies is checked. If it exceeds the maximum allowed by the plan, the oldest of these copies are deleted. The number of copies to be deleted is equal to the difference between the total number of successfully created backups and the set maximum number.
2. The total number of backups is checked. If it exceeds the maximum allowed by the plan, all backups created with an error, created before the oldest successful one, are deleted.
3. If there are no successfully created backups, the oldest backups created with an error are deleted. The number of copies to be deleted is equal to the difference between the number of backups created with an error and the set maximum number.

The deletion process starts after each backup and one hour after you change the backup plan settings.

{cut(Example of the algorithm operation)}

The parameter **Max. number of full backups** is set to: `2`.

According to the backup plan, backups are created:

- **Copy 1**, created with an error.<br>
    The number of successfully created copies: 0, does not exceed the maximum.<br>
    The total number of backups: 1, does not exceed the maximum.
- **Copy 2**, created successfully.<br>
    The number of successfully created copies: 1, does not exceed the maximum.<br>
    Total number of backups: 2, does not exceed the maximum.
- **Copy 3**, created successfully.<br>
    The number of successfully created copies: 2, does not exceed the maximum.<br>
    Total number of backups: 3, exceeds the maximum. There are copies created with an error earlier than the oldest successfully created copy. The **Copy 1** will be deleted.
- **Copy 4**, created with an error.<br>
    The number of successfully created copies: 2, does not exceed the maximum.<br>
    Total number of backups: 3, exceeds the maximum. There are no copies created with an error earlier than the oldest successfully created copy. Backups will not be deleted.
- **Copy 5**, created with an error.<br>
    The number of successfully created copies: 2, does not exceed the maximum.<br>
    Total number of backups: 4, exceeds the maximum. There are no copies created with an error earlier than the oldest successfully created copy. Backups will not be deleted.
- **Copy 6**, created successfully.<br>
    Number of successfully created copies: 3, exceeds the maximum. The **Copy 2** will be deleted.<br>
    Total number of backups: 5, exceeds the maximum. There are no copies created with an error earlier than the oldest successfully created copy. Backups created with an error will not be deleted.

Backups that will remain:

- **Copy 3**, created successfully
- **Copy 4**, created with an error
- **Copy 5**, created with an error
- **Copy 6**, created successfully

{/cut}

{note:err}

Deleting a full backup will also delete all incremental backups based on it.

{/note}
