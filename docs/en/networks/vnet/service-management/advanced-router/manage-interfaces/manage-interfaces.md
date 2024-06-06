To connect the router to subnets, you need to add interfaces. To connect the router to an external network, you need to add an interface directed to the external network.

## Adding interfaces of advanced router

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

<info>

You can also [connect a subnet to the router](../../net) in the **Cloud networks** → **Networks** section of your personal account.

</info>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Interfaces** tab.
1. Click the **Add interface** button.
1. Fill in the **Name** field. You can use numbers, Latin letters, spaces, and special characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Select a subnet from the list or create a new one. If you need the Internet access to the router, select one of the external network subnets:

   - `internet` for SDN Sprut;
   - `ext-net` for SDN Neutron.

   An external network is required for SNAT and VPN. You can add only one interface per router with a connection to an external network. When you add an interface with an external network connection, SNAT is enabled automatically, even if the option was not enabled when creating the router.
1. (Optional) By default, an IP address of the interface is generated automatically. To set a custom IP address, enable the **Specify interface IP address** option, then enter the address in the field below. You cannot select the first subnet address, for example `10.0.0.1`.
1. (Optional) Add a description for the interface.
1. Click the **Add** button.

As a result:

- The added interface will appear in the list of interfaces.
- The selected subnet will be connected to the router.

</tabpanel>
</tabs>

## Removing interfaces of advanced router

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: you can remove several interfaces at once by selecting them using the checkboxes.

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Interfaces** tab.
1. Remove the interface in one of the following ways:

    - Expand the interface menu and select **Remove interface**.
    - Set the checkbox for the required interface, then click the **Remove interface** button above the table.
1. Confirm the removal.

As a result:

- The interface will be removed.
- The interface subnet will be disconnected form the router.

</tabpanel>
</tabs>
