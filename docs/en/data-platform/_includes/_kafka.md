<!-- Roles for Kafka -->

{includetag(roles)}
- `Standard User`: can create, modify, and delete topics, including their settings; manage consumer groups; create and modify schemas and connectors; and read and write messages. Cannot delete schemas or connectors, run analysis, or manage other configurations. This role has read-only access in Kafka UI.
- `Observer`: can only view topics, schemas, groups, connectors and read messages. Cannot create, modify, or delete objects.
- `Security Auditor`: can view configurations of applications, clusters, ACL, as well as descriptions of topics, groups, transactions, and users. Has no access to messages or object operations.
{/includetag}
