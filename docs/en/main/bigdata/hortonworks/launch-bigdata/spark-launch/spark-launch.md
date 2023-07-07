Apache Spark is an open source Big Data framework for distributed batching and streaming of unstructured and semi-structured data, part of the Hadoop ecosystem.

## Working with Spark in the Ambari interface

To create a Spark cluster, follow the instructions, setting the required parameters.

Step 1.

![](./assets/1601759512534-s1-png)

Step 2.

![](./assets/1601759637880-s1-1-png)

Step 3.

![](./assets/1601759529322-s2-png)

After creation in the cluster, in the "General information" tab, a link, login and password to the Ambari interface for managing the cluster will be published:

![](./assets/1601759739989-s3-png)

To enter the Ambari interface, you need to enter Web UI in the browser search bar, enter your login and password in the window that opens:

![](./assets/1601759908251-s4-png)

This will open the Ambari interface for managing the Spark cluster and its components:

![](./assets/1601759974519-s5-png)

## Working with Spark in Zeppelin

Apache Zeppelin is a multipurpose notebook (web-notebook) that allows you to process, analyze and visualize data on the Hadoop platform. Spark clusters in VK Cloud include Zeppelin notebooks that can be used to perform Spark tasks.

There are several ways to access the Zeppelin web interface, described below.

Most of the services in the Hadoop ecosystem do not have authorization, so by default access to them is allowed exclusively from the internal network. By default, after starting the cluster, security groups are configured as follows:

<table><tbody><tr><td>Outgoing traffic</td><td><span>With no restrictions</span></td></tr><tr><td>Inbound and outbound traffic between cluster nodes within the internal network</td><td>With no restrictions</td></tr><tr><td>Inbound traffic to TCP port 8080 of the headend</td><td><span>Without restrictions, used to access the Ambari interface (authorization by login and password).</span></td></tr><tr><td>Inbound traffic to TCP port 22 of the headend</td><td><span>Unlimited, used for SSH access (SSH key authorization).</span></td></tr><tr><td>Incoming ICMP traffic to the head-end</td><td><span>With no restrictions</span></td></tr><tr><td>Remaining traffic</td><td>Forbidden</td></tr></tbody></table>

Thus, the default configuration only provides access to the Ambari web interface and SSH access to the head node. Access to internal web interfaces and API services is possible only from an internal network isolated from the public Internet. To ensure access, the following options are possible:

- Configuring VPN access to VK Cloud resources from the organization's network.
- Using the master host as a proxy server.
- Opening access to specific ranges of IP addresses through security groups.

## Organization of VPN access

To provide access to all resources of the Hadoop cluster, it is recommended to create a VPN connection from the organization's network to the VK Cloud network. At the same time, the resources of VK Cloud will be available as if they were within the internal network of the organization.

To use a VPN with a Hadoop cluster, do the following:

1.  Create a new internal network and router within the project.
2.  Start the Hadoop cluster using the created network as the cluster's internal network.
3.  Set up a VPN connection to VK Cloud services.

## Using the head node as a proxy

Alternatively, you can use an SSH tunnel to the master. To organize an SSH tunnel, a machine with an OpenSSH client of any version is required. The SSH client is started with the -D option, which starts the SOCKS5 proxy using an SSH tunnel to the remote server:

```
 ssh -D 3128 -C -q -N -f centos @ <host>
```

- the -D 3128 option tells you to start the SOCKS5 proxy server;
- the -C option requests data compression;
- the -q option minimizes the output of status messages to the console;
- the -N option says that when connecting, you should not run any commands and use an SSH connection exclusively for the tunnel;
- the -f option sends the SSH client to the background.

If necessary, the SSH-SOCKS5 tunnel can be automatically created at system boot. To do this, create a .service file for systemd.

```
 /etc/systemd/system/mcs-proxy.service:

[Unit]
Description = Setup SOCKS Proxy
After = network.target

[Service]
Type = simple
ExecStart = / usr / bin / ssh -D 8123 -C -q -N centos @ HOST -i /home/user/.ssh/id_rsa

[Install]
WantedBy = multi-user.target
```

After creating the file, reload the systemd configuration and start the service:

```
 systemctl daemon-reload
systemctl start mcs-proxy
```

**Note**

For the SSH tunnel to work, you must have an SSH key without a passphrase or add a key with a passphrase to the SSH agent

After starting the SSH-SOCKS5 proxy, you can use the address 127.0.0.1:3128 as a SOCKS5 proxy in the browser or other utilities.

More information on enabling SOCKS5 proxy in your browser can be found in the Firefox and Chrome documentation. Detailed information on the procedure and configuration parameters of the tunnel itself is contained in the documentation for the SSH client.

## Setting up security groups

Services can also be accessed by changing the security group settings. To do this, in the section "Virtual networks" - "Firewall settings" of the VK Cloud interface, you must select the appropriate security group containing the name of the cluster and the type of node (head or worker) in the name.

For example, if the cluster is named test1, then the security group for the master node will have the string test1-hadoop-head in the name, and the security group for the worker node will have test1-hadoop-worker. These groups are created automatically for each new cluster.

So, to organize access to Zeppelin, you need to use the following data:

- Login: admin
- Password: admin

Use the control bar in the upper right corner of a cell to execute code within that cell. The result is displayed immediately below the executable code:

![](./assets/1598817768185-zeppelin-png)

## Working with Spark in the console

Spark VK Cloud clusters include console utilities for working with Spark.

Connection to the main cluster node is carried out via SSH. This is followed by launching one of the available utilities, depending on the language used.

To connect to Spark2, you need to set the environment variable SPARK_MAJOR_VERSION = 2.

1\. To perform tasks on Scala, spark-shell is launched:

```
 SPARK_MAJOR_VERSION = 2 spark-shell
SPARK_MAJOR_VERSION is set to 2, using Spark2
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel (newLevel). For SparkR, use setLogLevel (newLevel).
Spark context Web UI available at http: //spark-1-spark-head-0.novalocal: 4041
Spark context available as 'sc' (master = local [\*], app id = local-1526372942530).
Spark session available as 'spark'.
Welcome to
____ __
/ __ / __ ___ _____ / / __
_ \ \ / _ \ / _ \`/ __ / '_ /
/ ___ / .__ / \ _, _ / _ / / _ / \ _ \ version 2.3.0.2.6.5.0-292
/ _ /

Using Scala version 2.11.8 (OpenJDK 64-Bit Server VM, Java 1.8.0_161)
Type in expressions to have them evaluated.
Type: help for more information.
```

2\. To perform tasks in Python, pyspark is launched:

```
 SPARK_MAJOR_VERSION = 2 pyspark
SPARK_MAJOR_VERSION is set to 2, using Spark2
Python 2.7.5 (default, Aug 4 2017, 00:39:18)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-16)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel (newLevel). For SparkR, use setLogLevel (newLevel).
05/18/15 08:31:25 WARN Utils: Service 'SparkUI' could not bind on port 4040. Attempting port 4041.

Welcome to
____ __
/ __ / __ ___ _____ / / __
_ \ \ / _ \ / _ \`/ __ / '_ /
/ ___ / .__ / \ _, _ / _ / / _ / \ _ \ version 2.3.0.2.6.5.0-292
/ _ /

Using Python version 2.7.5 (default, Aug 4 2017 00:39:18)
SparkSession available as 'spark'.
```

3\. To perform tasks on R, the R language interpreter is installed on the main node and all working nodes. To do this, connect the EPEL repository and install the R package:

```
 yum install epel-release
yum install R
```

Next, sparkR is launched:

```
 SPARK_MAJOR_VERSION = 2 sparkR
SPARK_MAJOR_VERSION is set to 2, using Spark2

R version 3.4.4 (2018-03-15) - "Someone to Lean On"
Copyright (C) 2018 The R Foundation for Statistical Computing
Platform: x86_64-redhat-linux-gnu (64-bit)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license ()' or 'license ()' for distribution details.

Natural language support but running in an English locale

R is a collaborative project with many contributors.
Type 'contributors ()' for more information and
'citation ()' on how to cite R or R packages in publications.

Type 'demo ()' for some demos, 'help ()' for on-line help, or
'help.start ()' for an HTML browser interface to help.
Type 'q ()' to quit R.

Launching java with spark-submit command / usr / hdp / current / spark2-client / bin / spark-submit "sparkr-shell" / tmp / Rtmpu2FF4v / backend_port26c2218284a
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel (newLevel). For SparkR, use setLogLevel (newLevel).

Welcome to
____ __
/ __ / __ ___ _____ / / __
_ \ \ / _ \ / _ \`/ __ / '_ /
/ ___ / .__ / \ _, _ / _ / / _ / \ _ \ version 2.3.0.2.6.5.0-292
/ _ /

SparkSession available as 'spark'.
```
