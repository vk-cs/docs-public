The optimal settings for the Java virtual machine are selected automatically during installation and cluster configuration, depending on the type of virtual machine. If you get "Out of memory" errors, we recommend that you recreate the cluster with a larger configuration, or change the settings in the Ambari interface.

To change the parameters, enter the Ambari interface,

1. Open the service of interest (for example, HDFS) and select the "Configs" tab.
2. On the Configs tab, scroll to the very bottom of the page to the Java machine settings:
3. After changing the settings, Ambari will prompt you to restart the services.
