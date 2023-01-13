If the cluster is not using the most current version of Kubernetes from [the list](../../concepts/versions/version-support/), it can be upgraded to a newer version of Kubernetes.

<warn>

- You cannot downgrade to a lower version of Kubernetes when upgrading.
- Clusters of versions 1.16 and below can only be upgraded by transferring a backup of data to a new cluster of the correct version, for example [using Velero](../../use-cases/velero-backup).

</warn>

## Before updating

1. Examine [update procedure](../../concepts/update/).
1. Back up the cluster you plan to update, for example, using Velero.
1. Deploy the backup to the new cluster which is identical to the one you plan to update. Use it to verify that the update procedure goes smoothly: all cluster data and applications remain available, and applications behave as expected.
1. [Set threshold](../manage-node-group#configure-update-settings) of the number of unavailable worker nodes in the node groups.

## Do update

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project and the region where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Expand the menu of the necessary cluster and select **Update version**.
1. In the window that appears, select the desired version.
1. Review the version changelog.
1. Click the **Change version** button.

</tabpanel>
</tabs>
