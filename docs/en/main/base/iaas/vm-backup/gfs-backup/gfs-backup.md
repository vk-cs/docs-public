## Description

The GFS (Grandfather-Father-Son) is an industry-wide strategy for storing backups.
In the grandfather-father-son algorithm, backup consists of three consecutive steps:

- "Grandfather" - full backup at the beginning of the year
- "Father" - full backup at the beginning of the month
- "Son" - full backup and increments once a week.

## Operation

After each successful backup, the process of deleting obsolete backups starts. The GFS backup strategy does not create independent weekly, monthly, or yearly backups. This process is dynamic and depends on the current GFS settings. The process of deleting backups first checks the required number of weekly backups. Next, it checks for the presence/absence of monthly and annual backups. After that, it decides to delete obsolete/redundant backups.

Changes to GFS settings are applied on the next successful backup. The new backup plan will delete obsolete backups if you specify to store less than any full backups than currently stored.

GFS settings include:

- Weekly backups - full and incremental backups for the specified number of weeks.
- Monthly backups - backups are created at the beginning of the month. Only full backups for the specified number of calendar months remain, and incremental backups are deleted.
- Annual backups - backups are created at the beginning of the year. Only annual backups for the specified number of years remain (including the current calendar year). Incremental backups are deleted.

## Usage scenarios examples

A typical use case for GFS is to comply with corporate policy or legal requirements.

The most commonly used and recommended best practices are the following settings.

- Keep weekly backups: 4 weeks
- Keep monthly backups: 12 months
- Keep annual backups: 5 years

## FAQ

### When does "deletion" occur?

The first deletion occurs after the first successful backup.

### Can one backup be Monthly and Weekly (or Yearly and Monthly) at the same time?

No. In the current implementation of GFS, backups have unique "weekly," "monthly," or "yearly" tags.

### If it's 2022 now, how can I keep a yearly backup for 2021? How many Yearly backups is it?

It would make two Yearly backups. The current year also counts.

### Why is Weekly backup a required field?

It is an architectural requirement. It is necessary for the correct markup of backups when applying the retention policy.
