In a simplified form, the DBaaS architecture (database as a service) is shown in the picture below:

![](./assets/1604479588232-1604479588231-png)

A virtual machine or cluster with pre-installed database management tools is deployed in the VK Cloud control panel. When creating a virtual machine or cluster, you can choose whether to create a replica (for the Master-Slave configuration), or the number of nodes (for the "Cluster" configuration).

Further, client applications interact with the database via the network interface (IP address, connector, API) - as with a regular local database, adjusted for the speed of the network connection.
