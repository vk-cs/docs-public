
{include(/en/_includes/_translated_by_ai_en.md)}

The `Volume status is in-use` error when recreating a pod occurs when a persistent volume does not have time to unmount from the old node. This is a feature of the interaction between Kubernetes and OpenStack.

### Solution

1. Check the version of {linkto(../../concepts/storage#mk8s-storage-csi)[text=Cinder CSI]} and update it if necessary.
1. If the persistent volume is stuck for a long time, manually detach it via OpenStack CLI to unlock the status:
   ```console
   openstack server remove volume
   ```