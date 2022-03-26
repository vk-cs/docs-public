Existing Hadoop and Spark clusters in VK Cloud Solutions can be extended with new components. In this section, you will learn how to install new components and services of the Hadoop ecosystem into existing clusters. Consider adding Spark2 to an existing Hadoop cluster.

* Go to the [Ambari](https://ambari.apache.org/) interface. On the "Dashboard" tab in the lower-left corner of the services panel, click "Action" → "Add Service".
* Select the services you want to install. For example, Spark2 and Zeppelin Notebook. Click "Next" at the bottom of the page.
* In the window that opens, select the worker and head nodes for installing the main components of the services and click "Next" at the bottom of the page.
    
*   ### Important
    
    When installing some services, it may be necessary to set authorization data.
    
* In the window that opens, select the worker and head nodes to install auxiliary and client components of services. If necessary, change the recommended settings in the Customize Services window and click "Next" at the bottom of the page.
    
* In the "Dependent Configurations" window, review the list of dependent changes that are recommended to be made to the service settings to avoid possible conflicts. If necessary, deselect those parameters whose value you want to leave unchanged. By default, all selected parameters will take on the values ​​specified in the "Recommended Value" column.
    
    After setting the required values, click OK.
    
* In the "Configurations" window that appears, click "Proceed Anyway".
    
* In the "Review" window, carefully review the summary of the selected configuration and click "Deploy" at the bottom of the page to start installing the specified services.
    
* The installation of new components will begin. When the process is complete, click "Next".
    
* A summary of the installation results will appear in the Summary window. Click "Complete" to complete the process.
    
* Restarting existing services may be required to apply changes. In the Ambari interface, go to the "Services" tab and click "Restart" → "Restart All Affected" to restart all dependent services. After the restart, the new services will start working normally and will be available in the Ambari interface in the menu on the left.