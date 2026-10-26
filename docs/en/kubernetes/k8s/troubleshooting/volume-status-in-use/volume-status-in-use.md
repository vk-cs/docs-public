
{include(/en/_includes/_translated_by_ai_en.md)}

The `Volume status is in-use` error when recreating a pod occurs when a persistent volume does not have time to unmount from the old node. This is a feature of the interaction between Kubernetes and OpenStack.

### Solution

1. Check the version of [Cinder CSI](/en/kubernetes/k8s/concepts/storage#k8s-storage-csi) and update it if necessary.
1. If the persistent volume has been stuck for a long time, manually detach it via OpenStack CLI to unlock the status:
   ```console
   openstack server remove volume
   ```