Vertical scaling is an increase in the performance of each component of the system in order to improve overall performance. Scalability in this context means the ability to replace components in an existing computing system with more powerful and faster components as requirements grow and technology advances.

We will look at vertical scaling using the PostgreSQL cluster as an example.

<warn>

Scaling will be performed for each member of the cluster.

</warn>

How to create a database (single instance, master-slave or cluster) [described in this article](https://mcs.mail.ru/help/ru_RU/dbaas-start/db-create).

To scale up a cluster, first go to the [section with created instances](https://mcs.mail.ru/app/services/databases/list/). Then, in the context menu of the desired cluster, select the "Vertical scaling" item.

Then, in the pop-up window, select a new cluster configuration - with an increase in the number of processors and an increase in the amount of RAM, and confirm the selection with the appropriate button.

The scaling process will take about 5 minutes.
