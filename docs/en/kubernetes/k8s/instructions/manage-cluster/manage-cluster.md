{note:warn}

Before performing any operation on a cluster from Terraform, read the information in [Using Terraform](../helpers/terraform-howto#features_of_using_terraform_to_manage_the_container_service).

{/note}

## Start or stop cluster

{note:info}
These operations are only available for [first-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

### {heading(Start cluster)[id=start]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can start several stopped clusters at once by selecting them with checkboxes.

To start a cluster:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Use the checkbox to select the necessary cluster.
1. Click the **Launch** button.
1. Confirm the operation.

{/tab}

{/tabs}

### {heading(Stop cluster)[id=stop]}

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can stop several started clusters at once by selecting them with checkboxes.

To stop a cluster:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Use the checkbox to select the necessary cluster.
1. Click the **Stop** button.
1. Confirm the operation.

{/tab}

{/tabs}

## Get cluster information

Different information is available for running and stopped clusters. Terraform allows you to get only part of the information about the cluster.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Click on the name of the necessary cluster. A page with information will open.

{/tab}

{tab(Terraform)}

{note:info}
Using Terraform is only available for [first-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

1. Run the command:

   ```console
   terraform state show vkcs_kubernetes_cluster.<cluster resource name in the Terraform configuration file>
   ```

1. Examine the available information in the output of the command.

{/tab}

{/tabs}

## Get props for connecting to the cluster

Available props:

- `kubectl` configuration file;
- Kubernetes Dashboard secret (it can only be obtained when the cluster is running).

The operations to get these props are described in detail in [Connecting](../../connect) section.

## Change virtual machine type for master nodes

This operation is described in detail in [Cluster node scaling](../scale). You can only perform it when the cluster is running.

{note:info}
This operation is only available for [first-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## Delete cluster

{tabs}

{tab(Management console)}

This is a group operation: if necessary, you can delete multiple clusters at once by selecting them using the checkboxes.

To delete a cluster:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Perform one of the actions for the required cluster:
   - Select the cluster using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the cluster and select **Delete Cluster**.
1. In the window that appears:
   1. Select the option if you want to delete the cluster along with its disks.
   1. Click the **Delete cluster** button.

{/tab}

{/tabs}
