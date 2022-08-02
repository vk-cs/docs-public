After creating a disaster recovery plan specifying the migrated hosts, as well as setting the parameters with which these hosts will be deployed in the target project, you can start the disaster recovery process:

1. In your Hystax Acura account, select a disaster recovery plan and click the "Run Recover" button.
2. Select the disaster recovery plan that will be used to complete the recovery process.
3. In the Disaster Recovery Startup Wizard, specify the name of the Cloud Site and click on the "Run Recover" button.

This process takes time, depending on the size of the target disaster recovery plan. As a result of the successful completion of the disaster recovery process, Cloud Site will go into the “Synced” state, and the infrastructure will be migrated to the VK CS cloud. In the personal account of the cloud, a certain amount of consumed resources will be displayed in the "Reports" section.

If the deployment reveals errors (wrong parameters for hosts were specified in the disaster recovery plan, or not all hosts were specified), then you can delete all the created resources, and then make the necessary changes to the disaster recovery plan and restart the disaster recovery process. To do this, select Cloud Site and click the "Delete" button.

If no defects were found, "disconnect" the Cloud Site from Hystax Acura by clicking the "Detach" button.
