{includetag(configure)}

1. If needed, edit:

   - the selected version;
   - the application name;
   - the name of the namespace where the add-on will be installed.
       
1. Configure the add-on code to store the created backups in {var(s3)}. To do this, add the following parameters:

   [cols="2", options="header"]
   |===
   |Parameter
   |Value

   |`bucket`, in the `configuration` block 
   |Name of the created bucket

   |`aws_access_key_id`, in the `credentials` block
   |Key ID (`Access Key ID`) of the {var(s3)} account 

   |`aws_secret_access_key`, in the `credentials` block
   |Secret key (`Secret Key`) of the {var(s3)} account
   |===
   
1. If needed, {linkto(#k8s-install-advanced-velero-edit-code)[text=make]} additional changes to the add-on configuration code.

   {note:warn}
   Incorrectly specified configuration code may cause installation errors or make the add-on inoperable.
   {/note}

{/includetag}

{includetag(optional)}

1. Make sure the add-on is installed with the correct {var(s3)} storage settings:

   1. {linkto(../../../../connect/kubectl#k8s-kubectl)[text=Connect]} to the cluster using `kubectl`.
   1. Make sure the pod on which Velero is located is running, using the command:
      
      ```console
      kubectl -n velero get pods 
      ```
   
      In the command output, the pod status should be `Running`.
   
   1. Make sure the specified {var(s3)} storage is available to Velero, using the command:
      
      ```console
      kubectl -n velero get backupstoragelocations 
      ```
      
      In the command output, the configuration state displayed in the `PHASE` column should be `Available`.

1. (Optional) [Review the official Velero documentation](https://velero.io/docs/main/).
1. (Optional) {linkto(../../../../how-to-guides/managed-velero#k8s-how-to-velero-managed)[text=Review the how-to guides on working with Velero]}.

{/includetag}
