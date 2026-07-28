1. Make sure that the Terraform configuration file is valid.

   If the parameters of the cluster that is managed using Terraform have been changed via the management console account, the configuration file will not reflect these changes. When these changes are applied, they may be overwritten or cause the cluster to malfunction. To check whether the configuration has been changed:

   1. Run the command:

      ```console
      terraform apply -refresh-only
      ```
   1. Confirm the changes if satisfied with them.

   For more details, refer to the [Using Terraform](/en/kubernetes/k8s/instructions/helpers/terraform-howto) section.