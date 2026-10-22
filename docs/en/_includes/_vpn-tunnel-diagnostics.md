{includetag(vpn-tunnel-diagnostics-ike-ipsec)}
1. Verify the connection settings: [view detailed information](../../instructions/vpn) about the VPN tunnel and its IKE and IPsec policies and compare the values with the parameters of the remote side.

   The tunnel will not be established if the IKE and IPsec parameters on the cloud side and the remote side do not match:

   - encryption and authentication algorithms;
   - Diffie-Hellman group;
   - IKE version;
   - key lifetime;
   - DPD (Dead Peer Detection) settings and behavior when peer unavailability is detected (`hold`, `clear`, `restart`);
   - initiator state (`bi-directional`, `response-only`).

   When creating policies in the management console, the following values are recommended:

   - authentication algorithm — `sha256`;
   - encryption algorithm — `aes256`;
   - IKE version — `v2`;
   - Diffie-Hellman group — `group14`.
   {/includetag}
   {includetag(vpn-tunnel-diagnostics-secgroup)}
1. Check the rules of the security groups assigned to the ports through which VPN traffic passes and, if necessary, {linkto(../../instructions/secgroups#add-rule)[text=add rules]} that allow UDP ports 500 and 4500.

   For the IPsec connection to be established, incoming and outgoing traffic over UDP ports 500 and 4500 between the cloud side and the remote side must be allowed.
   {/includetag}
   {includetag(vpn-tunnel-diagnostics-mtu)}
1. Check the passage of packets of different sizes from a VM in the client network by specifying the packet size and prohibiting fragmentation (the `-M do` option):

   ```console
   ping -M do -s 1400 <REMOTE_HOST>
   ping -M do -s 1300 <REMOTE_HOST>
   ```

   If large packets do not pass, reduce the MTU on the interfaces involved in the tunnel to a value at which packets pass successfully.

   <!-- TODO(specify): the recommended MTU value for {var(cloud)} VPN tunnels is not described in the documentation -->
   {/includetag}
   {includetag(vpn-tunnel-diagnostics-routes)}
1. Check the routes and peer addresses. Make sure that:

   - The connection settings specify the correct peer addresses (Peer IP and Peer ID).
   - The VPN tunnel is connected to a {linkto(../../concepts/router#standard)[text=standard]} or {linkto(../../concepts/router#advanced)[text=advanced]} router that has Internet access and an assigned external IP address.
   - {linkto(../../instructions/router#vnet-router-static-routs-manage)[text=Static routes]} to the remote subnet via the VPN tunnel are configured on the cloud network router.
   - A route to the {var(cloud)} subnet is configured on the remote side.
{/includetag}
