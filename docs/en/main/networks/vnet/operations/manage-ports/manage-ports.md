You can manage OpenStack ports: view ports, add, edit and delete them.

<warn>

- [A shared network's](../../concepts/net-types#shared_network) ports can be managed only via OpenStack CLI from a dependent project. There is not such a restriction for an owner project.
- All of the following operations are not available on the `ext-net` network.
- You cannot manage `SNAT` device ports.

</warn>

## Viewing a list of ports and port information

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.

   A list of ports will be displayed.

1. Click the name of the necessary port.

   Its information will be displayed.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. To see a list of all ports, run the command:

   ```bash
   openstack port list
   ```

1. To see a list of all ports on a subnet:

   1. Run the command to get subnet IDs and names:

      ```bash
      openstack subnet list
      ```

   1. Run the command:

      ```bash
      openstack port list --fixed-ip subnet=<name or ID of the subnet>
      ```

1. To see detailed port information, run the command with the port ID or name obtained earlier:

   ```bash
   openstack port show <name or ID of the port>
   ```

Use one of the commands to get detailed information about the supported parameters:

```bash
openstack port list --help
```

```bash
openstack subnet list --help
```

```bash
openstack port show --help
```

</tabpanel>
</tabs>

## Adding a port

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Click the **Add port** button.
1. Set the port parameters:

   - port name,
   - (optional) DNS name of the port,
   - IP address of the port.

1. Click the **Create port** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. Run the command:

   ```bash
   openstack port create <port name> --network <network name or ID> --fixed-ip subnet=<network name or ID>,ip-address=<port IP address>
   ```

For detailed information on supported parameters, run the command:

```bash
openstack port create --help
```

</tabpanel>
</tabs>

## Enabling and disabling a port

### Enabling a port

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: you can enable multiple disabled ports at once, if necessary, by selecting them using the checkboxes.

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Enable the port in one of the following ways:

   - Using the checkboxes:

     1. Select the necessary port using the checkbox.
     1. Click the **Enable port** button.
     1. Confirm the operation.

   - Using the menu:

     1. Open the menu of the necessary port and select **Enable port**.
     1. Confirm the operation.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. [Get the name or ID](#viewing-a-list-of-ports-and-port-information) of the necessary port.

1. Run the command:

   ```bash
   openstack port set <name or ID  of the port> --enable
   ```

For detailed information on supported parameters, run the command:

```bash
openstack port set --help
```

</tabpanel>
</tabs>

### Disabling a port

A disabled port does not allow any traffic to pass through.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: you can disable multiple enabled ports at once, if necessary, by selecting them using the checkboxes.

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Enable the port in one of the following ways:

   - Using the checkboxes:

     1. Select the necessary port using the checkbox.
     1. Click the **Disable port** button.
     1. Confirm the operation.

   - Using the menu:

     1. Open the menu of the necessary port and select **Disable port**.
     1. Confirm the operation.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. [Get the name or ID](#viewing-a-list-of-ports-and-port-information) of the necessary port.

1. Run the command:

   ```bash
   openstack port set <name or ID of the port> --disable
   ```

For detailed information on supported parameters, run the command:

```bash
openstack port set --help
```

</tabpanel>
</tabs>

## Editing a port

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Open the menu of the necessary port and select **Edit**.
1. Set the parameters of the port:

   - port name,
   - DNS name of the port,
   - IP address of the port.

1. Click the **Save changes** button.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. [Get the name or ID](#viewing-a-list-of-ports-and-port-information) of the necessary port.

1. Change the parameters of the port:

   - Port name:

     ```bash
     openstack port set <name or ID of the port> --name <new name>
     ```

   - DNS name of the port:

     ```bash
     openstack port set <name or ID of the port> --dns-name <new domain name>
     ```

   - IP address of the port:

     ```bash
     openstack port set <name or ID of the port> --no-fixed-ip --fixed-ip subnet=<name or ID of the subnet>,ip-address=<new port IP address>
     ```

For detailed information on supported parameters, run the command:

```bash
openstack port set --help
```

</tabpanel>
</tabs>

## Configuring IP Source Guard for a port

This mechanism allows only traffic for which the source IP address is in the `allowed-address` list to be allowed to leave the port.

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. [Get the name or ID](#viewing-a-list-of-ports-and-port-information) of the necessary port.

1. To add a single source IP address, run the command:

   ```bash
   openstack port set <name or ID of the port> --allowed-address ip-address=<IP-address>
   ```

   If you need to add more IP addresses, repeat this command for each of them.

1. To remove a single source IP address, run the command:

   ```bash
   openstack port unset <name or ID of the port> --allowed-address ip-address=<IP address>
   ```

   If you need to remove more than one IP address, repeat this command for each of them.

For detailed information on supported parameters, run one of the commands:

```bash
openstack port set --help
```

```bash
openstack port unset --help
```

</tabpanel>
</tabs>

## Deleting a port

<info>

It is not possible to delete a port if it is in use by the router.

</info>

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: you can delete multiple ports at once, if necessary, by selecting them using the checkboxes.

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Delete the port in one of the following ways:

   - Using the checkboxes:

     1. Select the necessary port using the checkbox.
     1. Click the **Delete port** button.
     1. Confirm the operation.

   - Using the menu:

     1. Open the menu of the necessary port and select **Delete port**.
     1. Confirm the operation.

</tabpanel>
<tabpanel>

1. Make sure the OpenStack CLI is [installed](../../../../base/account/project/cli/setup) and you can [authorize](../../../../base/account/project/cli/authorization) in it.

1. [Get the name or ID](#viewing-a-list-of-ports-and-port-information) of the necessary port.

1. Run the command:

   ```bash
   openstack port delete <name or ID of the port>
   ```

For detailed information on supported parameters, run the command:

```bash
openstack port delete --help
```

</tabpanel>
</tabs>
