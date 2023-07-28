VK Cloud supports three recovery models in the Cloud DR service:

- Backup & Restore Solution,
- Quick Recovery Solution,
- Multi-Site Solution.

The set of [chargeable resources](../../tariffication/) and their cost varies for different disaster recovery models. To consult on the choice of a model or to choose individual conditions, leave a request on the [Cloud DR website](https://mcs.mail.ru/disaster-recovery).

## Backup & Restore Solution

- Allows temporary interruption of the infrastructure.
- RTO: up to two hours.
- RPO: several hours.
- The backup infrastructure is stored in S3-compatible [VK Cloud storage](/ru/base/s3): copying and restoring takes place according to a pre-configured schedule.
- The client independently chooses the time for recovery.

## Quick Recovery Solution

- Allows a short-term interruption of the infrastructure.
- RTO: up to an hour.
- RPO: a few minutes.
- The backup infrastructure is stored in Hystax DR: a full copy of the infrastructure is downloaded once, then the changes are updated according to the schedule.
- The client independently chooses the time for recovery.

## Multi-Site Solution

- Does not allow interrupting the operation of the infrastructure.
- RTO: a few minutes.
- RPO: a few seconds.
- Backup infrastructure is stored in Hystax DR: storage and continuous backup of the target infrastructure is provided.
- The system automatically puts the backup infrastructure into operation.
