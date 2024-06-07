An advanced router allows you to establish connection between autonomous networks using the [BGP protocol](../../../concepts/router#advanced_router_capabilities). To do this, you need to add a BGP router and specify BGP neighbors.

## Adding a BGP router

<info>
You can only add one BGP router per advanced router.
</info>

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Click the **Add a BGP router** button.
1. Specify the name of the BGP router. You can use only numbers, Latin letters, spaces, and special characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Specify an IP address for the BGP router — the router interface directed to the transit network. Use the highest IP address on the loopback or physical interface.
1. Enter an **ASN** from the range 64512–65534.
1. (Optional) Disable the BGP router if you do not need to establish a connection at this time. The BGP router will become inactive.
1. (Optional) Add a description for the BGP router.
1. Click the **Create** button.

</tabpanel>
</tabs>

## Editing a BGP router

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Open the editing page of the dynamic router by one of the following ways:

    - Click the name of the BGP router, then click the **Edit** button.
    - Expand the BGP router menu and select **Edit**.

1. You can do the following:

    - Edit the router name.
    - Edit the router description.
    - Enable the **ECMP** option. The router will create multiple routes to the same destination. When transferring data, if one of the routes is unavailable, another will be automatically selected. This allows for increased throughput and fault tolerance.
    - Enable the **Graceful restart** option. After the peer is restarted, the BGP router will retain its state and continue transmitting data.
    - Enable the **Long lived graceful restart** option. The BGP router will maintain its state for a longer time in the event of a BGP peer failure.
    - Disable the BGP router if you do not need to establish communication at the moment. The BGP router will become inactive.
1. Click the **Save changes** button.

</tabpanel>
</tabs>

## Deleting a BGP router

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Delete the router in one of the following ways:

    - Expand the router menu and select **Delete**.
    - Set the checkbox for the required router, then click the **Delete** button above the table.
1. Confirm the deletion.

</tabpanel>
</tabs>

## Adding a BGP neighbor

To connect autonomous networks using the BGP protocol, you need to specify the BGP routers which will connect to each other.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router.
1. Go to the **BGP neighbors** tab.
1. Click **Add a BGP neighbor**.
1. (Optional) Specify the name of the BGP neighbor. You can use only numbers, Latin letters, spaces, and special characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Specify the interface directed to the transit network of the neighboring BGP router.
1. Specify the **ASN** of the remote network. If the network does not have an ASN defined, use private ASNs from the range 64512–65534.
1. (Optional) Disable the BGP neighbor if you do not need to establish a connection at the moment. The BGP router will not send requests to the remote router.
1. (Optional) Add a description for the BGP neighbor.
1. Click the **Add** button.

</tabpanel>
</tabs>

After you add the BGP neighbor, the router will try to establish a connection with it. When this is done, you will see:

- the mark next to the name of the BGP neighbor is green
- BFD is enabled

## Editing a BGP neighbor

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router and then go to the **BGP neighbors** tab.
1. Select the BGP neighbor.
1. Open the editing window of the BGP neighbor by one of the following ways:

    - Click the BGP neighbor name, then click the **Edit** button.
    - Expand the BGP neighbor menu and select **Edit**.

1. You can do the following:

    - Edit the BGP neighbor name.
    - Edit the BGP neighbor description.
    - Edit the neighbor operating mode that determines the ability to exchange all routing options for each announcement. You can select the mode in the **Add path** field:

       - **off**: disable
       - **on**: enable in both directions
       - **rx**: enable reception only
       - **tx**: enable delivery only

    - Enable the **BFD** option. This allows the use of session control via BFD (руBidirectional Forwarding Detection).
    - Enable the **Next Hop Self** option. The BGP neighbor will get the IP adress of the router interface as the next hop.
    - Disable the BGP neighbor if the connection is not currently required. The BGP router will not send requests to the remote router.
1. Click the **Save changes** button.

</tabpanel>
</tabs>

## Deleting a BGP neighbor

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: you can delete several neighbors at once by setting the checkboxes.

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router and then go to the **BGP neighbors** tab.
1. Select the BGP neighbor.
1. Delete the BGP neighbor in one of the following ways:

    - Expand the BGP neighbor menu and select **Delete**.
    - Set the checkbox for the required BGP neighbor, then click the **Delete** button above the table.
    - Click the name of the BGP neighbor, then click the **Delete** button above the table.
1. Confirm the deletion.

</tabpanel>
</tabs>

## View a BGP announcement

After setting up a BGP neighbor, an advanced router will begin transmitting to the neighbor BGP announcements of all networks to which its interfaces are directed.

To view BGP announcements:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router.
1. Go to the **BGP announcements** tab.

The tab displays a list of all BGP announcements. Active announcements are marked with green marks.

</tabpanel>
</tabs>

## Adding a BGP announcement

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router and then go to the **BGP announcements** tab.
1. Click the **Add a BGP announcement** button.
1. Select the type of announcement:

   <tabs>
   <tablist>
   <tab>Static</tab>
   <tab>Connected</tab>
   </tablist>
   <tabpanel>

   The announcement conveys information about a manually specified static route.

    1. Specify the request parameters:

       - **Network**: the IP address with the network mask that will be announced to a BGP neighbor.
       - **Default Gateway**: the gateway IP address. If the gateway is available, the network will be announced in BGP.
       - (Optional) Disable the BGP announcement if this network does not need to be announced to a BGP neighbor. The BGP announcement will become inactive.
       - (Optional) Add a description for the BGP announcement.
    1. Click the **Add** button.

   </tabpanel>
   <tabpanel>

   The announcement conveys information about a subnet connected to the advanced router interface.

   1. Select a subnet connected to the router in the **Connected subnet** field.
   1. Click the **Connect** button.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Editing a BGP announcement

You can only edit the **Static** announcements.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router and then go to the **BGP announcements** tab.
1. Open the editing page of the BGP announcement by one of the following ways:

    - Expand the announcement menu and select **Edit**.
    - Click the IP address of the announced subnet, then click the **Edit** button.

1. You can do the following:

   - Disable the announcement if this network does not need to be announced to a BGP neighbor.
   - Edit the description of the announcement.

1. Click the **Save changes** button.

</tabpanel>
</tabs>

## Deleting a BGP announcement

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: you can delete several announcements at once by selecting them using the checkboxes.

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Dynamic Routing** tab.
1. Select the BGP router and then go to the **BGP announcements** tab.
1. Select the BGP announcement.
1. Delete the BGP announcement in one of the following ways:

    - Expand the BGP announcement menu and select **Delete**.
    - Set the checkbox for the required BGP announcement, then click the **Delete** button above the table.
    - (For **Static** only) Click the BGP announcement name, then click the **Delete** button above the table.
1. Confirm the deletion.

</tabpanel>
</tabs>
