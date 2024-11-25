In VK Cloud, the GFS strategy (Grandfather-Father-Son) can be used to store and delete backups.

In the GFS strategy, backups include three levels of hierarchy:

- "Grandfather" is a full backup at the beginning of the year.
- "Father" is a full backup at the beginning of the month.
- "Son" is a full backup once a week and incremental copies during that week.

The backup retention period is set separately for each level. Typically, the periods are chosen to meet legal requirements or corporate policies.

The following settings are most commonly used:

- Keep weekly backups: 4 weeks.
- Keep monthly backups: 12 months.
- Keep annual backups: 5 years.

<info>

The retention period for annual backups includes the current year. For example, if you set the retention period to 2 years, annual backups for the previous year and the current year will be kept.

</info>

## Working principle

Backups are created automatically according to a pre-configured schedule. After each successful backup, the process of deleting outdated backups is started.

- The storage periods of weekly backups are checked.
- The presence of monthly and annual backups and their retention periods are checked.
- The algorithm determines which copies are outdated according to the GFS strategy settings and deletes them.

If you change the GFS settings, the changes will be applied on the next successful backup. If the retention period of any full backups has been reduced in the settings, the outdated backups will be deleted.

The creation and deletion processes result in the following hierarchical set of stored backups:

- Weekly backups — full and incremental backups for the number of weeks specified in the settings.
- Monthly backups — full backups created at the beginning of the month for the number of calendar months specified in the settings. Incremental backups are deleted.
- Annual backups — full backups created at the beginning of the year for the number of years specified in the settings (including the current calendar year). Incremental backups are deleted.

<info>

The same backup copy cannot be both monthly and weekly (or annual and monthly). Each backup is marked with one of the tags: "weekly", "monthly", or "annual".

</info>
