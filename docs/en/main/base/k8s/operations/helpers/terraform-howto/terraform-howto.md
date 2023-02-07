## How to start using Terraform

1. [Install Terraform and configure the provider](../../../../../manage/terraform/quick-start).
1. [Create](../../create-cluster/create-terraform/) a new cluster with one or more worker node groups.
1. Manage the created resources using Terraform.

See the [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) for more information on working with the container service.

## Features of using Terraform to manage the container service

- Some cluster operations are performed only in [personal account](../../../../account). For each operation, the [step-by-step instructions](../../../operations) indicate whether it can also be performed using Terraform.

- Changing some parameters of an existing cluster will create a **new cluster**. The container service documentation lists only operations that can be performed on an existing cluster without creating a new cluster.

  See [Terraform provider documentation](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vkcs_kubernetes_cluster.md#argument-reference) for details.

- If you change the settings of a cluster that is managed by Terraform in your personal account, those changes will not be reflected in the Terraform configuration file.

  In this case, the current Terraform configuration will become obsolete, and applying it with `terraform apply` will cause the settings made to be rolled back or even render the cluster inoperable.

  To manage such a cluster again using Terraform:

  1. Update the local infrastructure state (stored in a file with the extension `.tfstate`):

     1. Run the command:

        ```bash
        terraform apply -refresh-only
        ```

        You will be prompted for infrastructure changes that will overwrite the local state.

     1. If you are satisfied with these changes, confirm them.

  1. Update the configuration file to match the Terraform state. This procedure is described in detail in the [Create confiuguration](https://learn.hashicorp.com/tutorials/terraform/state-import?in=terraform/state#create-configuration) section of the Terraform documentation.
