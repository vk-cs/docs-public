A project is a structural unit within the cloud that owns resources: virtual machines, databases, Kubernetes clusters and others. Grouping by projects is convenient when there are several different tasks, each of which requires its own service infrastructure with its own individual settings. In addition, the project organization of work helps:

- delimit user access to resources and data;
- track resource consumption separately for each of the tasks.

When registering a new account in VK Cloud, a project is automatically created in which the current user is registered as the owner. The project owner can create new projects and invite users to all his projects by assigning them [roles](../rolesandpermissions). The same user can be a participant in several projects and have different roles in them.

Each VK Cloud project has a separate [balance](/en/additionals/billing/start/balance) which can be replenished using the [card](/en/additionals/billing/operations/add-card) linked to the project or other [payment methods](/en/additionals/billing/start/payment-methods).

## Automatic freezing of the project

<info>

Automatic freezing is not used in projects in which services are provided on a post-payment basis.

</info>

If the balance of the project becomes negative, the project is frozen:

- services are blocked: the user cannot create new objects and edit already created ones;
- running objects (for example, virtual machines) are stopped.

Some of the objects remain readable, making it possible to transfer data from them.

<err>

After the project is frozen, funds continue to be debited in it for data storage and the use of chargeable resources — for example, floating IP addresses. The balance of the project goes further into the negative. You can [preserve the project](../../instructions/project-settings/manage#project_conservation) to stop debiting funds.

</err>

If the balance remains negative, the objects are deleted beyond recovery:

- if there was no cash flow in the project for the entire period of existence — 3 days after freezing;
- if payment was made — 30 days after freezing.

A number of services may have their own terms for freezing and deleting objects.

<details>
  <summary markdown="span">Example for the Object storage service</summary>

- When the negative balance reaches -1000 rubles, the service objects are frozen.

    All the time while the objects are frozen, the service charges for data storage, while the objects have read access.

- If the positive balance of the project is not restored within 30 days, the objects are blocked.

    When objects are blocked, write-offs for them stop. There is no access to objects, including read access. 30 days after switching to this state, if the positive balance is not restored, the objects are deleted.

For more information about the service, see [Object storage](/en/base/s3).

</details>

After the positive balance is restored, the services in the project are automatically activated after a while. Objects that have been stopped must be started manually after defrosting.

In any state of the project balance, including after objects are deleted, all project participants have access to their personal account. The accounts of the participants and the project itself are not deleted.
