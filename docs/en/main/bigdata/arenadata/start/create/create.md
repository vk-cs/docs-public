Creating an Arenadata Hadoop cluster includes the following steps:

1. Selecting the Arenadata Hadoop distribution version.
2. Setting up the network configuration of the cluster and selecting the components to be installed in the Arenadata Hadoop distribution.
3. Setting up the virtual hardware of the cluster nodes.
4. Selection of components to be installed on cluster nodes.
5. Configuring access to selected components of the Arenadata Hadoop cluster.

## Select the Arenadata Hadoop distribution version

To create an Arenadata Hadoop cluster, go to Big Data → Clusters. Click Add Cluster.

When you click on the button, the cluster configurator will open in the window, consisting of several stages, as a result of which it determines the parameters of the cluster being created.

At all stages, the configurator informs about the cost of the created cluster, additional features, and also allows you to contact support in case of questions.

At the first stage of creation, it is necessary to choose the desired cluster configuration. The preconfigured media types differ in scaling options and activated extensions:

- ADH Community
- ADH Enterprise

You can learn more about the differences between Community and Enterprise versions in [article](../../bigdata/arenadata/concepts/enterprise).

Once selected, click "Next Step" to proceed to the cluster network configuration and select the Arenadata Hadoop distribution components to install.

## Network configuration and component selection

At this stage of creation, you must specify some cluster parameters. The creation wizard reflects the following configuration fields:

| Parameter | Description |
| --- | --- |
| Cluster name | The display name of the cluster. Also sets the hostname on the OS. |
| Accessibility zone | Selecting the data center where the instance will be launched. |
| Network | Create a cluster on an existing network or create a new one. |
| Assign external IP | Assigns a floating IP. |
| Cluster setup | Selecting ADH components to install on the cluster. You can choose from pre-configured templates or manually select components. It is recommended that you select one of the preconfigured cluster configuration templates that suits your work. During further configuration, it will be possible to change the list of components more flexibly.|

<warn>

Some templates require access to a special VM flavor. To gain access, contact [support service](/docs/en/contacts).

</warn>

Once selected, click "Next Step" to move on to configuring the virtual hardware of the cluster nodes.

## Set up virtual cluster hardware

At this stage of creation, it is necessary to specify some parameters of the cluster nodes. The creation wizard reflects the following configuration fields:

| Field | Description |
|-------------------------------------|---------- ------------------------------|
| Instance type | Node configuration - amount of CPU and RAM. |
| Number of nodes | Number of cars. Specified separately for Master and Worker nodes. |
| Number of disks per node | The number of disks on the node. Set separately for each node. The maximum value is 8. |
| Disk size | Disk space on nodes. The limit values ​​are from 500 to 2000 GB. |
| Disk type | Disk type (HDD/SSD). |
| Connect monitoring node | Connect Arenadata Monitoring bundle. More details about the functionality can be found on the [Arenadata website](https://docs.arenadata.io/mon/en/index.html). |
| Connect edge node | Connect a node with UI services added to the cluster. |
| HA Cluster | Connecting a High-Availability Cluster. This service is performed manually by VK Cloud technical support specialists. The request is made in the [support chat](/docs/en/contacts). |
| Disk autoscaling | Enabling automatic disk space expansion on cluster nodes. |

After selection, click "Next step" to proceed to the selection of components to be installed on the cluster nodes.## Select components for Arenadata Hadoop cluster nodes

At this stage of creation, the option of flexible configuration of the components that will be installed on the cluster is provided.

If in the previous steps you chose a template with a preinstalled list of components, here you can see the details of which modules will be installed.

It is also possible to manually select the components to be installed on nodes. To do this, select "Advanced" from the component installation options, and then drag the required components from the list on the right onto the nodes of your Arenadata Hadoop configuration.

Once selected, click "Next Step" to move on to configuring access to the cluster.

## Configuring access to Arenadata Hadoop cluster components

At this stage of creation, passwords are set, which will be used to gain access when connecting to the cluster.

The list of settings depends on the list of components that you have chosen to install on the cluster. However, Airflow DB Root and Airflow DB passwords are required for any cluster configuration. The password for SQL can only be changed through the edge node.

After completing all the settings, click "Create Cluster" to create a cluster.
