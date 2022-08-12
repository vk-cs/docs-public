## VK Cloud Control Panel

To work with VM [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" section.
2. Select instances and click on the action button in the top menu. Stop, start, restart and delete machines are available. Actions can also be called from the context menu.
3. Select the required action and confirm the operation.

If the instance does not respond for some reason, you can use a forced reboot, you can call the option from the context menu of the virtual machine.

<info>

A normal reboot attempts to shut down the instance's operating system correctly (graceful shutdown), a forced reboot is equivalent to shutting down and turning on the power (power cycle).

</info>

## OpenStack CLI

To enable the VM, you need to run in the OpenStack client:
```bash
openstack server start <instance ID>
```

Shutdown:
```bash
openstack server stop <instance ID>
```

Reboot:
```bash
openstack server reboot <instance ID>
```

Forced reboot:
```bash
openstack server reboot --hard <instance ID>
```
