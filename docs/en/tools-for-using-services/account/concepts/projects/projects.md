A project is a structural unit within the cloud that owns resources: virtual machines, databases, Kubernetes clusters and others. Grouping by projects is convenient when there are several different tasks, each of which requires its own service infrastructure with its own individual settings. In addition, the project organization of work helps:

- delimit user access to resources and data;
- track resource consumption separately for each of the tasks.

When registering a new user account in VK Cloud, a project is automatically created in which the current user is registered as the owner. The project owner can create new projects and invite users to all his projects by assigning them [roles](../rolesandpermissions). The same user can be a participant in several projects and have different roles in them.

Each VK Cloud project has a separate [balance](/en/intro/billing/concepts/balance) which can be replenished using the [card](/en/intro/billing/service-management/add-card) linked to the project or other [payment methods](/en/intro/billing/concepts/payment-methods).

## Automatic freezing of the project

<info>

Automatic freezing is not used in projects in which services are provided on a post-payment basis.

</info>

If the payment account balance of the project becomes negative, the project is frozen:

- Services are blocked: the user cannot create new objects and edit already created ones.
- Running objects (for example, virtual machines) are stopped.
- Objects are placed in the deletion queue. Such objects will be deleted without possibility of recovery:

  - If there was no cash flow in the project for the entire period of existence — 3 days after freezing.
  - If payment was made — 30 days after freezing.

  Some of the objects remain readable, making it possible to transfer data from them.

The project owner's mail receives consecutive notifications: about the project freezing, about the upcoming deletion of objects, and about the fact that the objects have been deleted.

<err>

After the project is frozen, the funds continue to be deducted from the payment account balance. You can [conserve the project](../../service-management/project-settings/manage#project_conservation) to stop debiting funds.

</err>

A number of services may have their own terms for freezing and deleting objects.

<details>
  <summary markdown="span">Example for the Object storage service</summary>

- When the payment account balance becomes negative, the service objects are frozen.

    All the time while the objects are frozen, the service charges for data storage, while the objects have read access.

- If the payment account balance of the project does not become positive within 30 days, the objects are blocked.

    When objects are blocked, write-offs for them stop. There is no access to objects, including read access. 30 days after switching to this state, if the payment account balance does not become positive, the objects are deleted.

For more information about the service, see [Object storage](/en/storage/s3).

</details>

After the payment account balance becomes positive, the services in the project are automatically activated after a while. Objects that have been stopped must be started manually after defrosting.

In any state of the payment account balance of the project, including after objects are deleted, all project participants have access to their management console. The accounts of the participants and the project itself are not deleted.
