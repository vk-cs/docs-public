# {heading(Backup configuration best practices)[id=backup-best-practices]}

{include(/en/_includes/_translated_by_ai_en.md)}

Backup is not just insurance against data loss, but also a key element of business continuity strategy.

Proper backup settings help you:

- reliably restore data at any time;
- optimize data storage costs through flexible strategies;
- automate processes, eliminating the human factor.

You can also {linkto(#backup-cost-manage)[text=additionally reduce backup costs]} by optimizing the Cloud Backup service settings.

Backup configuration best practices involve a 4-step approach:

1. {linkto(#backup-categorization)[text=Determining data criticality]}.
2. {linkto(#backup-critical-data)[text=Configuring backups for critical data]}.
3. {linkto(#backup-noncritical-data)[text=Configuring backups for non-critical data]}.
4. {linkto(#backup-recovery-test)[text=Testing data recovery]}.

## {heading(1. Determining data criticality)[id=backup-categorization]}

Before configuring backups, divide your data into two categories:

- Critical — data whose loss would disrupt business operations. Such data includes, for example, accounting system databases, infrastructure settings, financial transactions.
   For such data, define:

  - *RPO* (Recovery Point Objective) — the maximum acceptable level of data loss (for example, data for the last 15 minutes).
  - *RTO* (Recovery Time Objective) — the time within which data must be restored (for example, 1 hour).

- Non-critical — data that can be recovered without using backups or that does not significantly affect business operations. Such data includes, for example, temporary files, logs, test environments.

Dividing data into critical and non-critical allows you to save resources by using different backup and retention settings for more valuable and less valuable data.

## {heading(2. Configuring backups for critical data)[id=backup-critical-data]}

{note:info}
Working with backup plans and managing backups is described in detail in the {linkto(../../instructions#backup-instructions)[text=step-by-step instructions]}.
{/note}

For critical data, maximum safety and the ability to restore such data to a specific point in time are important, so use both full and incremental backups, as well as a long-term data retention strategy.

For maximum protection of critical data, use:

- Automatic copies:

  - Full backups — created once a week or more often if needed.
  - Incremental copies — created daily. Incremental copies contain only the files that have changed since the last backup. This saves space and allows you to restore data to the desired point in time.

- The *GFS strategy* (Grandfather-Father-Son) for long-term data retention. Recommended retention periods:

  - Weekly copies — 4 weeks.
  - Monthly copies — 12 months.
  - Yearly copies — 5 years (for example, for compliance checks).

{ifdef(public)}

### {heading(Database backup specifics)[id=backup-critical-data-db]}

Data in a DB is constantly updated, so it is important to be able to restore it to a specific point in time. For this, recovery is performed not only for DB files, but also for the latest transactions.

For DBMSs (PostgreSQL, MySQL, etc.), the following are important:

- *Point-in-Time Recovery* (PITR) — a mechanism for restoring a database to a specific point in time with second-level precision. It is available and especially important for PostgreSQL, which uses the transaction log (WAL).
- Storing transaction logs — a mandatory requirement for PITR.
- Copy frequency — for high-load DBs, create incremental copies every 3 hours.

{linkto(../../instructions/create-backup-plan#backup-plan-create-db)[text=Create]} a plan for a DBMS with incremental copying and retention according to the {linkto(../gfs-backup#backup-gfs)[text=GFS strategy]}. {linkto(../../instructions/point-in-time-recovery-pitr#backup-pitr)[text=Create a PITR plan]} for PostgreSQL to minimize losses and speed up recovery.
{/ifdef}

## {heading(3. Configuring backups for non-critical data)[id=backup-noncritical-data]}

{note:info}
Working with backup plans and managing backups is described in detail in the {linkto(../../instructions#backup-instructions)[text=step-by-step instructions]}.
{/note}

For non-critical data, you can use more economical backup and retention strategies, slightly reducing the reliability and speed of data recovery from a backup.

To save resources:

- Use the {linkto(../forward-incremental#backup-forward-incremental)[text=backup limit strategy]} — when the limit is exceeded, old copies will be deleted automatically. It is optimal to keep at least 3 full copies at a time.
- Use incremental copies — they take up less space, but recovering data from such a copy will take longer.

{linkto(../../instructions/create-backup-plan#backup-plan-create-db)[text=Create]} a plan with incremental copying and, when creating it, limit the number of full copies to reduce costs while retaining as much data as possible.

## {heading(4. Testing data recovery)[id=backup-recovery-test]}

Backups are useless if they cannot be restored. Once a quarter, test the {linkto(../../instructions/restore-from-backup#backup-restore)[text=recovery]} of critical data. Check the recovery of non-critical data as needed — in cases where you have doubts about the success of a backup.

When restoring, verify:

- data completeness;
- that the recovery time meets your RTO;
- that services are operational after recovery.

## {heading(Comparison of recommendations for different data categories)[id=backup-comparison]}

{ifdef(private-pdf,private-pg-pdf,private-cert)}
{linkto(#tab_best_practices)[text=Table %number]} provides a comparison of recommendations for critical and non-critical data.

{caption(Table {counter(table)[id=numb_tab_best_practices]} — Comparison of recommendations for different data categories)[align=right;position=above;id=tab_best_practices;number={const(numb_tab_best_practices)}]}{/ifdef}
[cols="1,2,2", options="header"]
|===
| Parameter
| Critical data
| Non-critical data

| Copy type
| Both full and incremental are mandatory
| Full copies are mandatory, incremental — as needed

| Retention strategy
| GFS (4/12/5)
| Limit on full copies: from 3 full copies at a time

{ifdef(public)}
| PITR
| Enabled for PostgreSQL
| ![](../../../../assets/no.svg "inline")
{/ifdef}

| Testing frequency
| Every 3 months
| As needed

|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

By configuring backups according to these rules, you will get reliable data protection{ifdef(public)} without overpaying{/ifdef}. All settings can be {linkto(../../instructions/manage-backup-plan#backup-plan-edit)[text=changed]} at any time in the {var(cloud)} dashboard.

## {heading(How to reduce service usage costs)[id=backup-cost-manage]}

- Keep track of the relevance of {linkto(../../instructions/create-backup-copy#backup-copy-create)[text=manual]} backups and delete unnecessary ones.
- When {linkto(../../instructions/create-backup-plan#backup-plan-create)[text=configuring]} a backup plan, reduce the number of days on which it runs.
- Use incremental copies for {linkto(#backup-noncritical-data)[text=non-critical]} data.
- Choose a more optimal backup retention strategy:

  - Deleting copies after a certain period using the {linkto(../gfs-backup#backup-gfs)[text=GFS strategy]}.
  - A fixed {linkto(../forward-incremental#backup-forward-incremental)[text=limit]} on the number of backups, upon exceeding which old copies will be deleted automatically.

{ifdef(public)}
- Use {linkto(/en/storage/backups/concepts/blocked-backup#backup-blocked)[text=deletion protection]} only when necessary. The longer deletion protection is active, the longer the copy retention period and the larger the data volume, which increases storage costs.
{/ifdef}