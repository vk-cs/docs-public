# {heading(VPN tunnel does not work)[id=vnet-vpn-tunnel-psk]}

{include(/en/_includes/_translated_by_ai_en.md)}

If a created VPN tunnel is in the `DOWN` status and does not start working after a reboot, the cause may be the use of special characters in the pre-shared key (PSK).

When creating a pre-shared key, you can use the special characters `-`, `+`, `&`, `!`, `@`, `#`, `$`, `%`, `^`, `*`, `(`, `)`, `,`, `.`, `:`, `;`, `_`, `=`, `<`, `>`, `{`, `}`, `/`, but some of them, such as `#`, `&`, or `{`, may be interpreted by the operating system. In this case, the key will be incorrect, and the VPN tunnel will not work.

### {heading(Solution)[id=vnet-vpn-tunnel-psk-resolve]}

1. On the client network side, escape the key contained in the `/etc/ipsec.secrets` file using double quotes `"`.

   Example:

   ```plaintext
   192.0.2.200 192.0.2.100 : PSK "1#$@5{840...9RTS86&"
   ```

1. If on the cloud network side you created the key using OpenStack CLI and do not remember whether escaping was used, replace the key with the one contained in the `/etc/ipsec.secrets` file by adding quotes to it:

   ```console
   openstack vpn ipsec site connection set <VPN_TUNNEL_ID> --psk "<PRE_SHARED_KEY>"
   ```
   
   If you created the key using the management console, it is already escaped.

1. If the problem persists, contact [technical support](/en/contacts).