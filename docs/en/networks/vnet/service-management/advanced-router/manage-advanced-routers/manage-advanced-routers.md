You can manage [advanced routers](../../../concepts/router#advanced_router_capabilities): view, edit and delete them.

Advanced routers are only available with [SDN Sprut](../../../concepts/architecture#sdns_used). To find out which SDN is used in your project or to connect another, contact [technical support](/en/contacts).

## View a list of advanced routers

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to your VK Cloud [personal account](https://cloud.vk.com/app/en/).
1. Go to **Cloud networks** → **Routers**. A list of routers will be displayed. For advanced routers, the **Router Type** column indicates `Advanced`.
1. Click the name of the router you need. A page will open with detailed information about it. You can [edit](#editing_an_advanced_router) router parameters on this page .

</tabpanel>
</tabs>

## Adding an advanced router

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to your [personal account](https://cloud.vk.com/app/en/) VK Cloud.
1. Go to **Cloud networks** → **Routers**.
1. Click the **Add router** button.
1. In the **Router type** field choose `Advanced`. If this field is missing, SDN Sprut is not enabled in your project. Please, contact [technical support](/en/contacts), to enable SDN Sprut and advanced routers.
1. Set parameters of the router:

   - **Name**. You can use numbers, Latin letters, spaces, and special characters: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
   - **Availability zone**: choose [an availability zone](/en/additionals/start/architecture#availability_zones_567cfd7a) you need.
   - **Description**: an optional field.
   - **SNAT**: enable the option if you need to convert private IP addresses into public ones for access from the project network to the Internet. When you [add the router interface](../manage-interfaces#adding_interfaces_of_advanced_router) directed to an external network, SNAT is enabled automatically.

      <warn>
      SNAT is active only if the router is connected to an external network.
      </warn>

1. Click the **Add** button.

</tabpanel>
</tabs>

## Editing an advanced router

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to your VK Cloud [personal account](https://cloud.vk.com/app/en/).
1. Go to **Cloud networks** → **Routers**.
1. Open the router editing window by one of the following ways:

   - Click the name of the router and then click the **Edit button** on the **General information** tab.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the router and select **Edit router**.

1. You can do the following:

   - Edit the name of the router.
   - Edit the description of the router.
   - Enable or disable **SNAT**. Enabling the option allows you to convert private IP addresses into public ones for access from the project network to the Internet. When you [add the router interface](../manage-interfaces#adding_interfaces_of_advanced_router) directed to an external network, SNAT is enabled automatically.

      <warn>
      SNAT is active only if the router is connected to an external network.
      </warn>

1. Click the **Save** button to complete the editing.

</tabpanel>
</tabs>

## Viewing an advanced router statistics

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **Statistics** tab.

The tab provides statistical information on the advanced router:

- The time when the last information was received from the service. Information about the service status is updated at intervals of up to 5 minutes.
- The router's readiness for use.
- The number of routes received in announcements from BGP neighbors and added to the routing table.
- The number of static routes added to the routing table.
- Router interfaces, traffic incoming and outgoing on those interfaces, and overall traffic incoming and outgoing to the router.
- Information about BGP sessions: session status, neighbor name, incoming and outgoing BGP announcements, date and time of the last change in the BGP session.
- Information about static routes: destination network, intermediate node and status.

</tabpanel>
</tabs>

## Viewing a VPN information

You can find out information about VPN tunnels that use the advanced router.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open_advanced_router.md)}

1. Go to the **VPN** tab.

The tab displays statistical information on the VPN tunnels connected to the advanced router.

To find out the detailed information about a VPN tunnel, click its name. The [VPN settings page](../../vpn) will open.

</tabpanel>
</tabs>

## Deleting an advanced router

You can delete an advanced router in the same way as [a standard router](../../router#removing_the_router).
