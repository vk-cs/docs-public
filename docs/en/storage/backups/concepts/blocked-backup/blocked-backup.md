# {heading(Tamper-proof backups)[id=backup-blocked]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Cloud Backup service allows you to create backups with deletion protection (locking). This can be done both {linkto(../../instructions/create-backup-plan#backup-plan-create)[text=within a backup plan]} and {linkto(../../instructions/create-backup-copy#backup-copy-create)[text=when manually creating a backup]}.

Locking parameters for a backup plan are set when creating or modifying the plan. All backups created within the plan inherit the current locking parameters of the plan.

You can enable or disable locking in a backup plan at any time, as well as change the plan's locking parameters: type, mode, or protection period. These changes affect only new backups; the locking parameters of previously created backups remain unchanged.

It is not possible to set deletion protection for an already created backup, whether manual or automatic.

Cloud Backup supports two types of locking: {linkto(#backup-blocked-retention-period)[text=retention period]} and {linkto(#backup-blocked-legal-hold)[text=legal hold]}.

## {heading(Retention period locking)[id=backup-blocked-retention-period]}

A retention period lock is active for a fixed time, during which the backup cannot be deleted. When the protection period expires, the lock is removed automatically.

For plans with retention period locking, there is a limit on the number of copies with an expired lock — a maximum of 200 such copies. When there are more of them, the oldest ones are automatically deleted.

There are two retention period locking modes:

- `Governance` — a lock that can be extended or removed early.
- `Compliance` — a strict lock that cannot be removed or modified until the period expires. This lock provides absolute protection of the backup from deletion.

### {heading(Removable lock)[id=backup-blocked-governance-lock]}

The `Governance` mode is suitable for implementing internal data protection policies. It prevents accidental deletion of backups by developers or automated scripts, while still allowing administrators to perform the necessary data management operations.

Backups in `Governance` mode are protected from deletion by users. The lock can be {linkto(/en/storage/backups/instructions/manage-backup-copy#backup-copy-manage)[text=managed]} by the project owner and superadministrator through the {var(cloud)} management console. They can:

- extend the backup lock period;
- remove the lock from a backup before the retention period expires, after which it can be {linkto(/en/storage/backups/instructions/manage-backup-copy#backup-copy-delete)[text=deleted]}.

### {heading(Strict lock)[id=backup-blocked-compliance-lock]}

The `Compliance` mode provides the maximum level of protection. A backup with such a lock cannot be deleted until the lock period expires, including through technical support. The retention period for an already created copy with such a lock also cannot be shortened. The project owner and superadministrator can only {linkto(/en/storage/backups/instructions/manage-backup-copy#backup-copy-manage)[text=extend]} the retention period of such a copy.  

The `Compliance` mode is suitable for meeting strict regulatory or legal requirements (for example, Federal Law No. 152-FZ), where data immutability must be guaranteed at both the technical and procedural level.

## {heading(Legal hold locking)[id=backup-blocked-legal-hold]}

A legal hold lock has no expiration date and remains in effect until it is explicitly removed.

A legal hold is applied in situations with an indefinite data retention period, such as litigation, internal audits, or investigations. The data remains protected until the corresponding process is completed, after which the lock can be removed.

The project owner and superadministrator can {linkto(/en/storage/backups/instructions/manage-backup-copy#backup-copy-manage)[text=remove]} a legal hold from a backup through the VK Cloud management console.