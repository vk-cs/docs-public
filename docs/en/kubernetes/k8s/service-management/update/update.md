If the cluster uses not the latest [supported](../../concepts/versions/version-support/) version of Kubernetes, it can be upgraded. At this, installed add-ons and a part of its components are also [upgraded](../../concepts/update/).

You cannot downgrade to a lower version of Kubernetes when upgrading. Clusters of versions 1.16 and below can only be upgraded by transferring a backup of data to a new cluster of the correct version, for example [using Velero](../../how-to-guides/velero-backup).

<warn>

- If a [component](../../concepts/update/), that is to be updated with the cluster, is deleted, then it will be restored during the next cluster update.

- When the cluster is updating, the current CoreDNS [Corefile](https://coredns.io/2017/07/23/corefile-explained/) is overwritten with the new one with default settings.

  If the cluster uses a modified Corefile, then back it up prior to updating the cluster.

</warn>

## Before updating

1. Examine [update procedure](../../concepts/update/).
1. Back up the cluster you plan to update, for example, using Velero.
1. Deploy the new cluster from the backup which is identical to the one you plan to update. Update it and verify that all cluster data and applications remain available, and applications behave as expected.
1. [Set threshold](../manage-node-group#configure_update_settings) of the number of unavailable worker nodes in the node groups.

## Do update

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://msk.cloud.vk.com/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required cluster and select **Update version**.
1. In the window that appears, select the required version.
1. Review the version changelog.
1. Click the **Change version** button.

</tabpanel>
</tabs>
