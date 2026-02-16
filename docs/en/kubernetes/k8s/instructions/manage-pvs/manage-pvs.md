In the Cloud Containers service, you can move [persistent volumes (PVs)](/en/kubernetes/k8s/reference/pvs-and-pvcs) created for Kubernetes clusters between projects or delete them.

You can only move or delete a PV if it is not connected to a node group. If it is, the node group to which it is connected is displayed for the PV in the **Attached to** column in the **Kubernetes clusters** → **PV disks** section.

{note:info}
Via the VK Cloud management console, you can only manage persistent volumes created for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## Moving PVs between projects

{note:warn}
Once you move a PV to your project, you cannot move it back to the [service](/en/kubernetes/k8s/concepts/cluster-generations#service-projects) one.
{/note}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the required second-generation cluster is located.
1. Go to **Kubernetes clusters** → **PV disks**.
1. Move a PV to your project using one of the following options: 

   - Click ![ ](/ru/assets/more-icon.svg "inline") for the required PV and select the **Move disk to project** option.
   - Select the required PV with a checkbox and click the **Move disk** button.

1. Confirm the operation. 

Once you move the PV, it will no longer be available in the **Kubernetes clusters** → **PV disks** section and becomes available in the **Cloud Servers → Disks** section. There, you can [manage](/en/computing/iaas/instructions/volumes) it the same way as any other disk.

## Deleting PVs

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the required second-generation cluster is located.
1. Go to **Kubernetes clusters** → **PV disks**.
1. Delete a PV using one of the following options:

   - Click ![ ](/ru/assets/more-icon.svg "inline") for the required PV and select the **Delete disk** option.
   - Select the required PV with a checkbox and click the **Delete disk** button.

1. Confirm the operation.
