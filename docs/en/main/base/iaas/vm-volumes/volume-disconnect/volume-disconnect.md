The root (or root) disk of the instance is the primary or first disk with which the VM is running.

In cases where you need to detach the root disk from an instance, to change its type, OS, or recreate it without changing the configuration of the instance, the following conditions must be met:

1. The instance must be stopped.
2. All processes related to instance configuration must be completed.
3. The project must have a disk to replace the existing root disk with.
4. The new disk must not be attached to any instance
5. The new disk must be bootable.

<warn>

Disconnecting the root disk without replacing it with another one is impossible.

</warn>

The process of replacing the root disk for Windows and Linux virtual machines is identical. To do this, select the required instance in the list of Virtual Machines of the Cloud Computing service and go to the Disks tab.

## Via VK Cloud control Panel

The replacement is performed in the properties of the disk connected to the VM. If all the conditions are met, a new disk will be available in the list.

After replacing the root disk, the instance can be started.

## Via the CLI

To replace the disk, run the following command in the OpenStack client, substituting your values (token, server uuid and volume uuid):

```bash
curl -g -i -X POST https://infra.mail.ru:8774/v2.1/servers/<**server-uuid**\>/action -H "Accept: application/json" -H "Content-Type: application/json" -H "User-Agent: python-cinderclient" -H "X-Auth-Token: <**token**\>" -d '{"replaceRoot": {"volume_id": "<**volume uuid to set**\>"}}'
```

After replacing the root disk, the instance can be started.

<warn>

For the instance to work correctly, at least 1 attached disk must contain the operating system and be bootable.

</warn>
