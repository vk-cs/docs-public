VK Object Storage allows you to prevent objects from being deleted or overwritten using the object lock feature. Object lock in VK Object Storage ensures the following:

- Resistance to cyberattacks. Immutable backups allow you to restore objects in their uncompromised state.
- Data integrity and error protection. The immutability of objects ensures that critical information is protected from accidental or malicious deletion, as well as damage caused by human error or software failure.
- Compliance with regulatory requirements. To ensure auditing and legal relevance, the law might require that data be retained unchanged for a specified time.

You can only use object lock in buckets created with this feature explicitly enabled, for example, via [AWS CLI](/ru/storage/s3/instructions/buckets/create-bucket#ways_to_create_bucket "change-lang").

## Object lock types

In VK Object Storage, two types of object lock are supported: retention period and legal hold. These types can be used separately or together for the same object, offering flexible protection scenarios.

### {heading(Retention period)[id=temporary_lock]}

A retention period provides a temporary lock for a fixed amount of time. Two modes of the retention period are supported: a managed `GOVERNANCE` lock and a strict `COMPLIANCE` lock.

In both modes of the retention period:

- An object cannot be deleted before its specified expiration date.
- The locking period cannot be reduced, only prolonged.

#### {heading(Governance lock)[id=governance-lock]}

A managed `GOVERNANCE` lock is best suited for implementing internal data protection policies. It prevents developers or automated scripts from accidentally deleting critical files while allowing administrators to perform necessary data management operations.

If the `GOVERNANCE` lock is used, a user with the `WRITE` [permissions](/ru/storage/s3/concepts/access/s3-acl#permissons "change-lang") can bypass it as follows:

- Delete the object before its specified expiration date.
- Reduce the locking period.
- Change the mode to `COMPLIANCE`.

#### {heading(Compliance lock)[id=compliance-lock]}

A strict `COMPLIANCE` lock provides the highest level of protection. With this lock, no user can overwrite or delete the object, including the project administrator, before its specified expiration date.

This mode is best suited for meeting strict regulatory or legislative requirements (for example, Federal Law No. 152-FZ), where the immutability of data must be guaranteed at the technical and procedural level.

### {heading(Legal hold)[id=legal-hold-lock]}

A legal hold has no expiration date, and it remains in place until you explicitly remove it. A user with the `WRITE` [permissions](/ru/storage/s3/concepts/access/s3-acl#permissons "change-lang") can apply this type of lock or remove it from an object at any time.

A legal hold is valid regardless of the retention period set for an object and takes precedence over it.

A legal hold is used in situations with indefinite data retention, such as court proceedings, internal audits, or investigations. The data remains protected until the relevant process is completed, after which the legal hold can be removed.

## Comparison of object lock types

[cols="1,1,1,1"]
|===
.2+|**Parameter**
2+|**Retention period**
.2+|**Legal hold**

|**Governance mode**
|**Compliance mode**

|Protection type
|Temporary (for a fixed amount of time)
|Temporary (for a fixed amount of time)
|Indefinite (must be explicitly removed)

|Can the lock be bypassed or removed
|Yes, if you have the required permissions
|No
|Yes, if you have the required permissions

|Can the locking period be changed
|Yes, if you have the required permissions
|It can only be prolonged
|N/A

|Main use case
|Protection against accidental deletions, internal policies
|Regulatory and legislative requirements
|Court and audit requirements
|===
