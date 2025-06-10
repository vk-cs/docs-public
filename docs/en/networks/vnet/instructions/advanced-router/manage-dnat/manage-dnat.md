To provide access to a private network from the Internet, configure _DNAT_— destination network address translation for an advanced router. DNAT forwards incoming packets from an external IP address or port to an IP address or port inside the private network. At the same time, from one public IP address, you can configure data transfer to many internal addresses of private networks using unique ports (TCP or UDP).

## Adding DNAT rule

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **DNAT** tab.
1. Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add a DNAT rule**.
1. Specify a name of the DNAT rule. You can only use numbers, Latin letters, spaces and characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Select a router interface that will receive a data packet. If there is no interface you need, select **Add a new interface** and [add a new interface](../manage-interfaces#adding_interfaces_of_advanced_router).
1. Select a data transfer protocol:

   - **All protocls and ports**: the rule will apply to all ports and protocols.
   - **TCP**: the rule will apply to the specified port and the TCP protocol.
   - **UDP**: the rule will apply to the specified port and the UDP protocol.

1. In the **IP after translation** field enter IP adress that will receive data packets from the public IP adress.
1. (Optional and just for TCP and UDP) In the **Port before translation** field enter a port that will forward data packets to the specified IP adress.
1. (Optional and just for TCP and UDP) In the **Port after translation** field enter a port that will receive data packets from the specified IP adress.
1. (Optional) Enter a description of the DNAT rule. You can only use numbers, Latin letters, spaces and characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Click **Add**.

</tabpanel>
</tabs>

## Editing DNAT rule

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **DNAT** tab.
1. Open the DNAT rule settings with one of the following ways:

   - Click ![more-icon](/en/assets/more-icon.svg "inline") for the rule you need and select ![pencil-icon](/en/assets/pencil-icon.svg "inline") **Edit**.
   - Click the name of the rule you need and then click ![pencil-icon](/en/assets/pencil-icon.svg "inline") **Edit**.

1. Edit the rule settings:

   - **Name**: the name of the DNAT rule. You can only use numbers, Latin letters, spaces and characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
   - **Protocol**: the data transfer protocol:

     - **All protocls and ports**: the rule will apply to all ports and protocols.
     - **TCP**: the rule will apply to the specified port and the TCP protocol.
     - **UDP**: the rule will apply to the specified port and the UDP protocol.
   - **IP after translation**: IP adress that will receive data packets from the public IP adress.
   - (Optional and just for TCP and UDP) **Port before translation**: the port that will forward data packets to the specified IP adress.
   - (Optional and just for TCP and UDP) **Port after translation**: the port that will receive data packets from the specified IP adress.
   - **Description**: the description of the DNAT rule. You can only use numbers, Latin letters, spaces and characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Click **Save changes**.

## Deleting DNAT rule

<tabs>
<tablist>
<tab>Management console</tab>
</tablist>
<tabpanel>

This is a group operation: you can delete several rules at once by setting the checkboxes.

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **DNAT** tab.
1. Delete the rule with one of the following ways:

   - Click ![more-icon](/en/assets/more-icon.svg "inline") for the rule you need and select ![trash-icon](/en/assets/trash-icon.svg "inline") **Delete**.
   - Set the checkbox for the required rule, then click ![trash-icon](/en/assets/trash-icon.svg "inline") **Delete** above the table.
1. Confirm the deletion.

</tabpanel>
</tabs>
