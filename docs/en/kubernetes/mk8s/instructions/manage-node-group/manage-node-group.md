{note:warn}

Before performing any operation on a cluster from Terraform, read the information in [Using Terraform](/en/kubernetes/mk8s/instructions/helpers/terraform-howto#features_of_using_terraform_to_manage_the_container_service).

{/note}

## {heading(Add worker node group)[id=add_group]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required cluster and select **Add node group**.
1. Set [settings](/en/kubernetes/mk8s/instructions/helpers/node-group-settings) for the node group.
1. Click the **Add node group** button.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}

## {heading(Customize scaling options)[id=scaling_options]}

You can change the size of a group of worker nodes manually or configure automatic scaling. You can also change the configuration template of VMs for an already existing group of worker nodes.

These operations are described in detail in [Scaling cluster nodes](/en/kubernetes/mk8s/instructions/scale) section.

## {heading(Customise labels and taints)[id=labels_taints]}


{note:warn}

Configure taints with caution if the node already hosts a workload.

Re-configuring taints can cause pods to be evicted to other nodes. If they do not have enough resources to host the pods, it can lead to partial or complete inaccessibility of applications that use the pods.

{/note}

Labels and taints can be set both with the interfaces supported by the VK Cloud platform (management console and Terraform) and with `kubectl`. When assigning labels and taints, keep in mind that labels and taints set via the platform interfaces are periodically synchronized with the Kubernetes cluster (in one direction only). During synchronization, labels and taints set with the platform will overwrite labels and taints that were set with `kubectl` if their keys match. Other labels and taints that were set with `kubectl` and were not overwritten by values from the platform are valid in the cluster, but are not displayed, e.g. in the Terraform state or management console.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Locate the necessary cluster and node group.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required node group and select **Labels and Taints**.
1. Do the necessary actions.

   - Manage labels:
     - Add a new label as a key/value pair.
     - Change the key or value of the existing label.
     - Delete existing label.

   - Manage taints:
     - Add a new taint by specifying its effect and label as a key/value pair.
     - Modify existing taint.
     - Delete existing taint.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}

See [Labels and taints](/en/kubernetes/mk8s/reference/labels-and-taints) for details.

## {heading(Configure update settings)[id=configure_node_update]}

To increase update speed, the container service updates multiple nodes in a group at once. To keep your applications and services available during the update process, specify the maximum percentage of unavailable nodes for the node group before [updating the cluster](/en/kubernetes/mk8s/instructions/update).

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project where the required cluster is located.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Locate the cluster with the node group that you want to change the update settings for.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required node group and select **Node update**.
1. Change the percentage of unavailable nodes as necessary.
1. Click the **Save settings** button.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}

For more details on the update process, refer to [Cluster version update](/en/kubernetes/mk8s/concepts/update).

## {heading(Delete node group)[id=delete_node_group]}

This operation can only be performed when the cluster is running.

The single cluster node group cannot be deleted from the management console. However, you can do it with Terraform.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
1. Locate the necessary cluster and node group.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required node group and select **Delete**.
1. Click the **Confirm** button.

{/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

{/tabs}
