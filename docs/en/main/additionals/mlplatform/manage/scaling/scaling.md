The type of virtual machine (number/type of CPU and amount of RAM) can be changed within the configurations (flavors) available to the project.

<warn>

You can change the type of an existing instance, either in a smaller or a larger direction, at any time, and you will only need to restart the instance.

</warn>

At the request of technical support, configurations with high-performance processors can be added to the project.

Any change in the VM configuration affects its cost.

## In the VK CS panel

To change the instance type in [VK CS personal account](https://mcs.mail.ru/app/services/infra/servers /) should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" section.
2. Open the context menu of the instance, select "Change the type of virtual machine".
3. In the menu that appears, select the desired type and click "Save size". The VM will be rebooted.
4. In some cases, after changing the type, it is necessary to confirm the operation, this can be done in the context menu of the instance.

## Via the Openstack CLI

To change the type in the OpenStack CLI, run the command:

```bash
openstack server resize --flavor <configuration ID> <server ID>
```

To get a list of available configurations, use the command:

```bash
openstack flavor list --all
```

The server ID is on the instance card in the personal account or in the list of virtual machines:

```bash
openstack server list
```
