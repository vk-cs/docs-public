If the cluster uses not the latest [supported](../../concepts/versions/version-support) version of Kubernetes, it can be upgraded. At this, installed add-ons and a part of its components are also [upgraded](../../concepts/update).

You cannot downgrade to a lower version of Kubernetes when upgrading. Clusters of versions 1.16 and below can only be upgraded by transferring a backup of data to a new cluster of the correct version, for example [using Velero](../../how-to-guides/velero-backup).

{note:warn}

- If a [component](../../concepts/update), that is to be updated with the cluster, is deleted, then it will be restored during the next cluster update.

- When the cluster is updating, the current CoreDNS [Corefile](https://coredns.io/2017/07/23/corefile-explained/) is overwritten with the new one with default settings.

  If the cluster uses a modified Corefile, then back it up prior to updating the cluster.

{/note}

## Before updating

1. Examine [update procedure](../../concepts/update).
1. Back up the cluster you plan to update, for example, using Velero.
1. Deploy the new cluster from the backup which is identical to the one you plan to update. Update it and verify that all cluster data and applications remain available, and applications behave as expected.
1. In the cluster you are planning to update, ensure there are [enough spare nodes available](/en/kubernetes/k8s/concepts/update#unavailable-nodes) for Cloud Containers to redirect the workload to. Otherwise, applications that run on the nodes that are being updated may not have enough resources.
1. [Set threshold](../manage-node-group#configure_node_update) of the number of unavailable worker nodes in the node groups.

## 1. Perform update

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required cluster and select **Update version**.
1. In the window that appears, select the required version.
1. Review the version changelog.
1. Click the **Change version** button.

{/tab}

{/tabs}

## 2. (Optional) Reconfigure the IP addresses of the nodes for file shares

Once the cluster is updated, the IP addresses of its nodes change, which can lead to issues when accessing [file shares](/en/computing/iaas/instructions/fs-manage), if used.

To solve this issue:

1. Learn the new IP addresses of the nodes. They are available in the VK Cloud [management console](https://msk.cloud.vk.com/app/en/) in the **Cloud Servers** → **Virtual machines** section in the **Kubernetes instances** block.
1. [Add](/en/computing/iaas/instructions/fs-manage#adding_an_access_rule) these IP addresses to the file share access rules. 