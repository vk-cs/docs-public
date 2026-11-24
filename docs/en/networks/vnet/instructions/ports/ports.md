# {heading(Ports)[id=vnet-ports]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can manage OpenStack ports: view ports, add, edit and delete them.

{note:warn}

- All of the following operations are not available on the external network.
- You cannot manage `SNAT` device ports.

{/note}

## {heading(Viewing a list of ports and port information)[id=vnet-ports-view]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.

   A list of ports will be displayed.

1. Click the name of the necessary port.

   Its information will be displayed.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. To see a list of all ports, run the command:

   ```console
   openstack port list
   ```

1. To see a list of all ports on a subnet:

   1. Run the command to get subnet IDs and names:

      ```console
      openstack subnet list
      ```

   1. Run the command:

      ```console
      openstack port list --fixed-ip subnet=<name or ID of the subnet>
      ```

1. To see detailed port information, run the command with the port ID or name obtained earlier:

   ```console
   openstack port show <name or ID of the port>
   ```

Use one of the commands to get detailed information about the supported parameters:

```console
openstack port list --help
```

```console
openstack subnet list --help
```

```console
openstack port show --help
```

{/tab}

{/tabs}

## {heading(Adding a port)[id=vnet-ports-add]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
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

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. Run the command:

   ```console
   openstack port create <port name> --network <network name or ID> --fixed-ip subnet=<network name or ID>,ip-address=<port IP address>
   ```

For detailed information on supported parameters, run the command:

```console
openstack port create --help
```

{/tab}

{/tabs}

## {heading(Enabling and disabling a port)[id=vnet-ports-on-off]}

### {heading(Enabling a port)[id=vnet-ports-on]}

{tabs}

{tab(Management console)}

This is a group operation: you can enable multiple disabled ports at once, if necessary, by selecting them using the checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
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

     1. Click ![ ](/en/assets/more-icon.svg "inline") for the required port and select **Enable port**.
     1. Confirm the operation.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. [Get the name or ID](#vnet-ports-view) of the necessary port.

1. Run the command:

   ```console
   openstack port set <name or ID  of the port> --enable
   ```

For detailed information on supported parameters, run the command:

```console
openstack port set --help
```

{/tab}

{/tabs}

### {heading(Disabling a port)[id=vnet-ports-off]}

A disabled port does not allow any traffic to pass through.

{tabs}

{tab(Management console)}

This is a group operation: you can disable multiple enabled ports at once, if necessary, by selecting them using the checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Disable the port in one of the following ways:

   - Using the checkboxes:

     1. Select the necessary port using the checkbox.
     1. Click the **Disable port** button.
     1. Confirm the operation.

   - Using the menu:

     1. Click ![ ](/en/assets/more-icon.svg "inline") for the required port and select **Disable port**.
     1. Confirm the operation.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. [Get the name or ID](#vnet-ports-view) of the necessary port.

1. Run the command:

   ```console
   openstack port set <name or ID of the port> --disable
   ```

For detailed information on supported parameters, run the command:

```console
openstack port set --help
```

{/tab}

{/tabs}

## {heading(Editing a port)[id=vnet-ports-edit]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the name of the necessary network, then the name of the necessary subnet.
1. Navigate to the **Ports** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the required port and select **Edit**.
1. Set the parameters of the port:

   - port name,
   - DNS name of the port,
   - IP address of the port.

1. Click the **Save changes** button.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. [Get the name or ID](#vnet-ports-view) of the necessary port.

1. Change the parameters of the port:

   - Port name:

     ```console
     openstack port set <name or ID of the port> --name <new name>
     ```

   - DNS name of the port:

     ```console
     openstack port set <name or ID of the port> --dns-name <new domain name>
     ```

   - IP address of the port:

     ```console
     openstack port set <name or ID of the port> --no-fixed-ip --fixed-ip subnet=<name or ID of the subnet>,ip-address=<new port IP address>
     ```

For detailed information on supported parameters, run the command:

```console
openstack port set --help
```

{/tab}

{/tabs}

## {heading(Configuring security groups for a port)[id=vnet-ports-sg-manage]}

### {heading(Assigning a security group to a port)[id=vnet-ports-sg-set]}

{include(/en/_includes/_sg-port-set.md)}

### {heading(Unassigning a security group from a port)[id=vnet-ports-sg-unset]}

{include(/en/_includes/_sg-port-unset.md)}

## {heading(Configuring IP Source Guard for a port)[id=vnet-ports-ip-source-guard-manage]}

This mechanism allows only traffic for which the source IP address is in the `allowed-address` list to be allowed to leave the port.

{tabs}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. [Get the name or ID](#vnet-ports-view) of the necessary port.

1. To add a single source IP address, run the command:

   ```console
   openstack port set <name or ID of the port> --allowed-address ip-address=<IP-address>
   ```

   If you need to add more IP addresses, repeat this command for each of them.

1. To remove a single source IP address, run the command:

   ```console
   openstack port unset <name or ID of the port> --allowed-address ip-address=<IP address>,mac-address=<mac-address>
   ```

   If you need to remove more than one IP address, repeat this command for each of them.

For detailed information on supported parameters, run one of the commands:

```console
openstack port set --help
```

```console
openstack port unset --help
```

{/tab}

{/tabs}

## {heading(Deleting a port)[id=vnet-ports-delete]}

{note:info}

It is not possible to delete a port if it is in use by the router.

{/note}

{tabs}

{tab(Management console)}

This is a group operation: you can delete multiple ports at once, if necessary, by selecting them using the checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
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

     1. Click ![ ](/en/assets/more-icon.svg "inline") for the required port and select **Delete port**.
     1. Confirm the operation.

{/tab}

{tab(OpenStack CLI)}

1. Make sure the OpenStack CLI is [installed](/en/tools-for-using-services/cli/openstack-cli#openstack-install) and you can [authorize](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in it.

1. [Get the name or ID](#vnet-ports-view) of the necessary port.

1. Run the command:

   ```console
   openstack port delete <name or ID of the port>
   ```

For detailed information on supported parameters, run the command:

```console
openstack port delete --help
```

{/tab}

{/tabs}
