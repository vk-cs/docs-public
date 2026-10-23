# {heading(VPN tunnel diagnostics)[id=vpn-tunnel-diagnostics]}

{include(/en/_includes/_translated_by_ai_en.md)}

A site-to-site VPN tunnel is not established or does not pass traffic, including large packets.

Possible causes:

- special characters in the pre-shared key (PSK);
- mismatch between the IKE/IPsec parameters of the two sides;
- port blocking by security groups;
- MTU issues;
- incorrect routing.

### Solution

Run diagnostics depending on the tunnel behavior:

{cut(Tunnel is in the DOWN status and is not established even after a restart)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-ike-ipsec,vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-routes]}

{/cut}

{cut(Tunnel is established, but traffic does not pass or large packets do not pass)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-mtu,vpn-tunnel-diagnostics-routes]}
{/cut}

{note:info}

[Get](../../instructions/vpn) the current tunnel status and its parameters in the management console or using OpenStack CLI.

{/note}

If the problem persists, contact [technical support](mailto:support@mcs.mail.ru). Attach the VPN tunnel ID, its status, and the results of the diagnostic commands to your request.
