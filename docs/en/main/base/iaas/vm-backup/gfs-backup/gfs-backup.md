## Description

The industry uses GFS ("grandfather-father-son", Grandfather-Father-Son) backup storage strategy.
In the grandfather-father-son algorithm, backup consists of three consecutive steps:

- "Grandfather" is a full backup for the beginning of the year.
- "Father" — full backup at the beginning of the month.
- "Son" — full backup and increments once a week.

## Working principle

After each successful backup, the process of deleting outdated backups is started. The GFS backup strategy does not create weekly, monthly or annual backups separately. This process is dynamic and depends on the current GFS settings. The process of deleting backups first checks that there is the required number of weekly backups. Next, it checks the presence/absence of monthly and annual backups. After that, it makes a decision to delete outdated/redundant backups, if any.

Changing the GFS settings is applied at the next successful backup. If you specify to store fewer full backups than are stored now, the outdated backups will be deleted.

GFS settings store:

- Weekly backups — full and incremental backups for the specified number of weeks.
- Monthly backups — backups created at the beginning of the month remain. Only full backups for the specified number of calendar months remain. Incremental backups are deleted.
- Annual backups — backups created at the beginning of the year remain. Only annual backups for the specified number of years (including the current calendar year) remain. Incremental backups are deleted.

## Usage Scenarios

A typical scenario for using GFS is to follow the requirements of corporate policies or legislation.

The most commonly used and recommended best practices are the following settings.

- Keep weekly backups: 4 weeks.
- Store monthly backups: 12 months.
- Store annual backups: 5 years.
