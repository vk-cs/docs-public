After adding a migration plan indicating the hosts to be migrated, as well as setting the parameters with which these hosts will be deployed in the target project (network settings, security_groups, flavor), you can start the migration process:

1. In your Hystax Acura account, select a migration plan and click the "Run migration" button.

2. In the run migration wizard, specify the name of the Cloud Site and click on the "Run migration" button. Cloud Site is the entity of "deploying hosts" according to the migration plan.

The deployment process takes time, depending on the size of the target migration plan.

As a result of the successful completion of the migration process, the Cloud Site will enter the "Running" state.

If errors are detected as a result of the deployment (wrong parameters for hosts were specified in the migration plan or not all hosts were specified), then you can delete all the created resources, and then make the necessary changes to the migration plan and restart the migration process. To do this, select Cloud Site and click the "Delete" button.

If no defects were found, disconnect Cloud Site from Hystax Acura by pressing the "Detach" button.
