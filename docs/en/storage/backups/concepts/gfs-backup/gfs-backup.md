# {heading(GFS backup strategy)[id=backup-gfs]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} supports the GFS strategy (Grandfather-Father-Son) for storing and deleting backups.

In the GFS strategy, backup includes three hierarchy levels:

- "Grandfather" — a full backup taken at the beginning of the year.
- "Father" — a full backup taken at the beginning of the month.
- "Son" — a full backup taken once a week and incremental backups for the week.

The retention period for backups is set separately for each level. Typically, the periods are chosen to comply with legal requirements or corporate policies.

The following settings are most commonly used:

- Retain weekly backups: 4 weeks.
- Retain monthly backups: 12 months.
- Retain yearly backups: 5 years.

{note:info}
The retention period for yearly backups includes the current year. If, for example, the retention period is set to 2 years, yearly backups for the previous and the current year will be retained.
{/note}

## {heading(How it works)[id=backup-gfs-principle]}

Backup creation starts automatically according to a pre-configured schedule. After each successful backup, the process of deleting outdated backups starts:

1. The retention periods of weekly backups are checked.
1. The presence of monthly and yearly backups and their retention periods are checked.
1. The algorithm determines which backups are outdated according to the GFS strategy settings and deletes them.

If you change the GFS settings, the changes will be applied at the next successful backup. If the retention period of any full backups was reduced in the settings, the outdated backups will be deleted.

As a result of the creation and deletion processes, the following hierarchical set of stored backups is formed:

- Weekly backups — full and incremental backups for the number of weeks specified in the settings.
- Monthly backups — full backups taken at the beginning of the month, for the number of calendar months specified in the settings. Incremental backups are deleted.
- Yearly backups — full backups taken at the beginning of the year, for the number of years specified in the settings (including the current calendar year). Incremental backups are deleted.

{note:info}
The same backup cannot be both monthly and weekly (or yearly and monthly) at the same time. Each backup is tagged with one of the following tags: "weekly", "monthly", or "yearly".
{/note}