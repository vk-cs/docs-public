## Description

Big Data or Big Data is a series of approaches, tools and methods for processing structured and unstructured data of huge volumes and significant diversity to obtain results perceived by a person and effective in conditions of continuous growth, distribution over numerous nodes of a computer network.

The basic principles of working with big data are as follows:

- **horizontal scalability** - the ability to expand the big data processing system with a multiple increase.
- **fault tolerance** - with an increase in the number of machines in a cluster, the likelihood of their part failure increases. For this reason, big data practices must take this scenario into account and survive it without critical consequences.

Hadoop and Spark clusters are created on the basis of the VK Cloud service infrastructure. Hadoop clusters of any configuration assume one head and at least one worker. Cluster scaling is carried out by increasing the number of worker nodes.

When creating a cluster in the VK Cloud cloud, the following resources are allocated:

- one virtual machine for the head node;
- n virtual machines for working nodes, where n is the number of nodes;
- n + 1 disks in a Ceph cluster for each node;
- two security groups - one for the head node and one for the worker nodes;
- one floating IP address for the head-end.

All machines in the internal network of the VK Cloud cloud are connected to each other by a 10 Gbps network in high availability mode: even if one of the network adapters of the physical server or one of the internal routers fails, the server remains online. At the same time, an external connection to the Internet is available at a speed of up to 1 Gbps.

All virtual machines of the cluster are united into a common network based on VXLAN technology. Each node has an internal (private) IP address that is used for communication between cluster nodes. At the same time, by default, after starting the cluster, full access is allowed between the cluster nodes within the internal network. The headend also has a floating IP that can be used to access the Ambari web interface and connect to the machine over SSH. If necessary, SSH access to the worker nodes is through the head node.

![](./assets/1598477914744-1598477914744-png)

## Cluster templates and layout

For ease of deployment and use, the following pre-configured templates are provided as part of the Hadoop VK Cloud:

**Airflow** is a set of libraries for running and monitoring tasks written in Python. Problems must have a directed acyclic graph structure. Airflow on the cluster will already be configured to run tasks on worker nodes, you just need to independently decompose the task code into nodes. It's also worth noting that Airflow - as a component - can also be installed on Hadoop and Spark clusters.

**Airflow-HDP-v31** - Only the Airflow component is installed in this template.

**Hadoop** - Compositing for a wide range of big data processing tasks using MapReduce technology. The template is focused on batch processing of data, when the allowable waiting time for the result is 10 minutes or more.

**Hadoop-HDP-v31** - Minimum **build of** components to get a Hadoop cluster. Such a cluster can be used as HDFS storage and also for running MapReduce tasks. Includes HDFS, Hive, YARN, MapReduce, ZooKeeper components.

**Spark** - Compositing for parallel processing of big data in memory. The template is focused on fast data processing in near real time mode.

**Spark-HDP-v31** - Extended component layout, in addition to Hadoop, Spark, Livy2, HBase, Oozie, Sqoop, Jupyter are available. Spark is a data processing and storage tool from the notional second generation of the Hadoop ecosystem. A developed community and a huge number of extensions and features have made Spark one of the most popular Big Data tools.

There is also a **DataFlow-HDF-v34** cluster template based on Hortonworks Data Flow. This cluster performs two big tasks: data flow management and streaming processing or analytics. After initial installation, control is also carried out via the Ambari console.
