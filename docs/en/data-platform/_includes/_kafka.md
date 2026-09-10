<!-- Roles for Kafka -->

{includetag(roles)}
- `Standard User` — can create and modify topics, schemas, groups, connectors, as well as read and write messages. Cannot delete objects, run analysis, or manage configurations.
- `Observer` — can only view topics, schemas, groups, connectors and read messages. Cannot create, modify, or delete objects.
- `Security Auditor` — can view configurations of applications, clusters, ACL, as well as descriptions of topics, groups, transactions, and users. Has no access to messages or object operations.
{/includetag}
