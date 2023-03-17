You can manage VPN tunnels: view, add or remove them from the project, as well as edit and restart tunnels.

## Viewing a list of VPN tunnels and information about them

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **VPN**.

   A list of VPN tunnels will appear.

1. Click on the name of the VPN tunnel.

    A page with detailed information about it will open. Navigate through the page tabs to view information about IKE and IPsec settings, endpoint groups, and the tunnel. You can also edit VPN tunnel settings on this page.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [is installed](../../../../base/account/project/cli/setup).
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. To view a list of VPN tunnels, run the command:

   ```bash
   openstack vpn ipsec site connection list
   ```

1. To view detailed information about the VPN tunnel, run the command:

    ```bash
    openstack vpn ipsec site connection show <VPN tunnel ID from the list obtained earlier>
    ```

   General information about the tunnel and identifiers will be displayed:

   - `IKE Policy` — identifier of the IKE policy. To view detailed information about a policy, run the command:

     ```bash
      openstack vpn ike policy show <IKE policy id>
     ```

   - `IPSec Policy` — ID of the IPsec policy. To view detailed information about a policy, run the command:

      ```bash
      openstack vpn ipsec policy show <ipsec policy id>
      ```

   - `Local Endpoint Group ID` — identifier of the local endpoint group. To view detailed information about a group, run the command:

      ```bash
      openstack vpn endpoint group show <local endpoint group id>
      ```

   - `Peer Endpoint Group ID` — identifier of the remote (peer) endpoint group. To view detailed information about a group, run the command:

      ```bash
      openstack vpn endpoint group show <remote endpoint group id>
      ```

   - `VPN Service` is the identifier of the VPN service that this VPN tunnel serves. To view detailed information about the service, run the command:

      ```bash
      openstack vpn service show <VPN service id>
      ```

</tabpanel>
</tabs>

## Adding a VPN Tunnel

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **VPN**.
1. Click the **Add VPN** or **Add** button.

   The New VPN Tunnel Wizard opens.

1. Set up IKE:

   Set up IKE:

   1. **IKE Policy** - Select an IKE policy from the dropdown list. If the desired policy does not exist, create a new one:

       1. Select `New IKE Policy` from the drop-down list.
       1. Set the policy settings:

          - **Policy name**.
          - **Key lifetime** (in seconds).
          - **Authorization Algorithm** - it is recommended to select `sha256`.
          - **Encryption algorithm** - `aes256` is recommended.
          - **IKE version** - it is recommended to select the `v2` version.
          - **Diffie-Hellman group** - it is recommended to select the `group14` group.
  
   1. Press the **Next Step** button.

1. Configure IPsec:

    1. **IPsec policy** - select an IPsec policy from the drop-down list. If the desired policy does not exist, create a new one:

       1. Select `New IPsec Policy` from the drop-down list.
       1. Set the policy settings:

          - **Policy name**.
          - **Key lifetime** (in seconds).
          - **Authorization Algorithm** - it is recommended to select `sha256`.
          - **Encryption algorithm** - `aes256` is recommended.
          - **Diffie-Hellman group** - it is recommended to select the `group14` group.

    1. Press the **Next Step** button.

1. Set up endpoint groups:

   1. **Router** - Select the router whose subnets should be accessible through the VPN tunnel.

       <warn>

       Such a router must be connected to an external network and have an assigned external IP address.

       </warn>

1. Select `New endpoint group` from the drop-down list.

    1. Set the group settings:

          - **Name**.
          - **Subnets** - select one or more subnets connected to the previously selected router. These subnets will be accessible through the VPN tunnel.

    1. **Remote Endpoint** - select a remote endpoint group from the dropdown list. If the required group does not exist, create a new one:

       1. Select `New endpoint group` from the drop-down list.
       1. Set the group settings:

          - **Group name**.
          - **Subnet address** — address of the remote subnet that will be accessible through the VPN tunnel.

            If you need to add more subnets, click the **Add subnet** link.

    1. Press the **Next Step** button.

1. Set up a VPN tunnel:

    1. Specify basic settings:

       - **Tunnel name**.
       - **Public IPv4 address of the peer (Peer IP)**.
       - **Shared Key (PSK)**.

         If necessary, generate a key by clicking the corresponding button.

         <info>

         Valid characters:
         - uppercase and lowercase letters of the Latin alphabet;
         - numbers;
         - symbols `-+&!@#$%^*(),.:;_=<>{}/`.

         The key must contain at least one letter or number.

         </info>

    1. (Optional) specify advanced settings:

       - **Peer Router ID for Authentication (Peer ID)** - by default matches the peer address.
       - **Initiator State** - behavior when establishing an IPsec connection:

         - `bi-directional` (default) - the VK Cloud platform will attempt to establish a connection with a remote peer.
         - `response-only` - the platform expects a VPN connection to be initiated by a remote peer and does not attempt to establish one on its own.

       - Settings for detecting the unavailability of a remote peer (Dead Peer Detection, DPD):

         - **When a peer is unavailable** - determines the behavior of the VK Cloud platform if a remote peer is unavailable:

           - `hold` (default) - When an unreachable IPsec connection is detected, the connection is terminated. The connection can only be re-established by a remote peer.
           - `clear` - When an unreachable IPsec connection is detected, the connection is terminated. The connection will not be re-established even if the remote peer attempts to do so.
           - `restart` - When an unreachable IPsec connection is detected, the connection is terminated. The VK Cloud platform will try to re-establish a connection with the remote peer.

         - **Peer Downtime Detection Interval** — at what interval (in seconds) to send test DPD messages.

         - **Time to detect peer unavailable** - if after this timeout (in seconds) no DPD check messages were received from a remote peer, then it is considered unavailable (dead).

           The default value for this setting is four times the **Peer Downtime Detection Interval**.

1. Click the **Create VPN Tunnel** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [is installed](../../../../base/account/project/cli/setup).
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. Set up IKE:

   1. Get a list of IKE policies and view policy details:

       ```bash
       openstack vpn ike policy list
       ```

       ```bash
       openstack vpn ike policy show <policy id>
       ```

      Save the policy ID (`id`) that will be used by the VPN tunnel.

   1. If a suitable IKE policy was not found in the previous step, create it:

       <tabs>
       <tablist>
       <tab>Linux/macOS (bash, zsh)</tab>
       <tab>Windows (PowerShell)</tab>
       </tablist>
       <tabpanel>

       ```bash
       openstack vpn ike policy create <policy name> \
         --lifetime units=<units, seconds by default>,value=<key lifetime, default 3600> \
         --auth-algorithm <Authorization algorithm: sha1, sha256> \
         --encryption-algorithm <Encryption algorithm: 3des, aes-128, aes-192, aes-256> \
         --ike-version <IKE version: v1, v2> \
         --pfs <Diffie-Hellman group: group5, group2, group14>
       ```

      </tabpanel>
      <tabpanel>

      ```powershell
       openstack vpn ike policy create <policy name> `
         --lifetime units=<units, seconds by default>,value=<key lifetime, default 3600> `
         --auth-algorithm <Authorization algorithm: sha1, sha256> `
         --encryption-algorithm <Encryption algorithm: 3des, aes-128, aes-192, aes-256> `
         --ike-version <IKE version: v1, v2> `
         --pfs <Diffie-Hellman group: group5, group2, group14>
       ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Save the policy ID (`id`) that will be used by the VPN tunnel.

1. Set up IPsec:

   1. Get a list of IPsec policies and view policy details:

       ```bash
       openstack vpn ipsec policy list
       ```

       ```bash
       openstack vpn ipsec policy show <policy id>
       ```

       Make a note of the policy ID that will be used by the VPN tunnel.

   1. If a suitable IPsec policy was not found in the previous step, create it:

       <tabs>
       <tablist>
       <tab>Linux/macOS (bash, zsh)</tab>
       <tab>Windows (PowerShell)</tab>
       </tablist>
       <tabpanel>

       ```bash
       openstack vpn ipsec policy create <policy name> \
         --lifetime units=<units, seconds by default>,value=<key lifetime, default 3600> \
         --auth-algorithm <Authorization algorithm: sha1, sha256> \
         --encryption-algorithm <Encryption algorithm: 3des, aes-128, aes-192, aes-256> \
         --pfs <Diffie-Hellman group: group5, group2, group14>
       ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack vpn ipsec policy create <policy name> `
        --lifetime units=<units, seconds by default>,value=<key lifetime, default 3600> `
        --auth-algorithm <Authorization algorithm: sha1, sha256> `
        --encryption-algorithm <Encryption algorithm: 3des, aes-128, aes-192, aes-256> `
        --pfs <Diffie-Hellman group: group5, group2, group14>
      ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Make a note of the policy ID that will be used by the VPN tunnel.

1. Create a VPN service that will serve the VPN tunnel:

   1. Get a list of routers and view detailed information about them:

       ```bash
       open stack router list
       ```

       ```bash
       openstack router show <router id>
       ```

       Write down the ID of the router whose subnets you want to make available through the VPN tunnel.

       Such a router must have access to the Internet and an external IP address associated with it.

   1. Create a VPN service using this router:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      openstack vpn service create <VPN service name> \
        --router <router ID obtained in the previous step> \
        --enable
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack vpn service create <VPN service name> `
        --router <router ID obtained in the previous step> `
        --enable
      ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Make a note of the VPN service ID that will be used by the VPN tunnel.

1. Set up endpoint groups:

   1. Get a list of endpoint groups and view detailed information about them:

       ```bash
       openstack vpn endpoint group list
       ```

       ```bash
       openstack vpn endpoint group show <group id>
       ```

       Write down:
       - ID of the group that will be used by the VPN tunnel as the local endpoint group. Such a group must be of type `subnet`.

         The subnets belonging to the group must be connected to the router that was specified in the previous step in the VPN service settings.

       - ID of the group that will be used by the VPN tunnel as the remote endpoint group. Such a group must be of type `cidr`.

   1. If there is no suitable local endpoint group, create it:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
       openstack vpn endpoint group create <local endpoint group name> \
         --type subnet \
         --value <identifier of the subnet connected to the router, which should be accessible through the VPN tunnel> \
         ...
         --value <additional subnet ID>
       ```

      </tabpanel>
      <tabpanel>

      ```powershell
       openstack vpn endpoint group create <local endpoint group name> `
         --type subnet `
         --value <identifier of the subnet connected to the router, which should be accessible through the VPN tunnel> `
         ...
         --value <additional subnet ID>
       ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Write down the ID of the local endpoint group that will be used by the VPN tunnel.

   1. If there is no suitable remote endpoint group, create it:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
       openstack vpn endpoint group create <remote endpoint group name> \
         --type cidr \
         --value "<remote subnet in the format 10.0.0.0/24 that should be accessible through the VPN tunnel>" \
         ...
         --value "<optional remote subnet>"
       ```

      </tabpanel>
      <tabpanel>

      ```powershell
       openstack vpn endpoint group create <remote endpoint group name> `
         --type cidr `
         --value "<remote subnet in the format 10.0.0.0/24 that should be accessible through the VPN tunnel>" `
         ...
         --value "<optional remote subnet>"
       ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Write down the ID of the remote endpoint group that will be used by the VPN tunnel.

1. Create a VPN tunnel:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
    openstack vpn ipsec site connection create <VPN tunnel name> \
      --dpd action=<action when peer is unavailable>,interval=<check interval>,timeout <check timeout> \
      --initiator <behavior when establishing an IPsec connection: bi-directional, response-only> \
      --peer-address "<VPN peer address>" \
      --peer-id "<VPN peer ID>" \
      --ikepolicy <IKE policy identifier> \
      --ipsecpolicy <ipsec policy id> \
      --vpnservice <VPN Service ID> \
      --local-endpoint-group <local endpoint-group id> \
      --peer-endpoint-group <remote endpoint-group ID> \
      --psk "<PSK key>" \
      --enable
  
   </tabpanel>
   <tabpanel>

   ```powershell
    openstack vpn ipsec site connection create <VPN tunnel name> `
      --dpd action=<action when peer is unavailable>,interval=<check interval>,timeout <check timeout> `
      --initiator <behavior when establishing an IPsec connection> `
      --peer-address "<VPN peer address>" `
      --peer-id "<VPN peer ID>" `
      --ikepolicy <IKE policy id> `
      --ipsecpolicy <ipsec policy id> `
      --vpnservice <VPN service id> `
      --local-endpoint-group <local endpoint-group id> `
      --peer-endpoint-group <remote endpoint-group id> `
      --psk "<PSK key>" `
      --enable
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Editing a VPN Tunnel

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **VPN**.
1. Expand the menu of the desired VPN tunnel and select **Edit VPN**.
1. If necessary, edit the local or remote endpoint group:

   1. **Local Endpoint** - select a local endpoint group from the drop-down list. If the required group does not exist, create a new one:

       1. Select `New endpoint group` from the drop-down list.
       1. Set the group settings:

          - **Name**.
          - **Subnets** - select one or more subnets connected to the previously selected router. These subnets will be accessible through the VPN tunnel.

   1. **Remote Endpoint** - select a remote endpoint group from the dropdown list. If the required group does not exist, create a new one:

       1. Select `New endpoint group` from the drop-down list.
       1. Set the group settings:

          - **Group name**.
          - **Subnet address** — address of the remote subnet that will be accessible through the VPN tunnel.

            If you need to add more subnets, click the **Add subnet** link.

1. Press the **Next Step** button.
1. Edit VPN tunnel settings:

   1. Basic settings:

       - **Tunnel name**.
       - **Public IPv4 address of the peer (Peer IP)**.
       - **Shared Key (PSK)**.

         If necessary, generate a key by clicking the corresponding button.

         <info>

         Valid characters:
         - uppercase and lowercase letters of the Latin alphabet;
         - numbers;
         - characters `-+&!@#$%^*(),.:;_=<>{}/`.

         The key must contain at least one letter or number.

         </info>

   1. (Optional) advanced settings:

      - **Peer Router ID for Authentication (Peer ID)** - by default matches the peer address.
      - **Initiator State** - behavior when establishing an IPsec connection:

         - `bi-directional` (default) - the VK Cloud platform will attempt to establish a connection with a remote peer.
         - `response-only` - the platform expects a VPN connection to be initiated by a remote peer and does not attempt to establish one on its own.

      - Settings for detecting the unavailability of a remote peer (Dead Peer Detection, DPD):

         - **When a peer is unavailable** - determines the behavior of the VK Cloud platform if a remote peer is unavailable:

           - `hold` (default) - When an unreachable IPsec connection is detected, the connection is terminated. The connection can only be re-established by a remote peer.
           - `clear` - When an unreachable IPsec connection is detected, the connection is terminated. The connection will not be re-established even if the remote peer attempts to do so.
           - `restart` - When an unreachable IPsec connection is detected, the connection is terminated. The VK Cloud platform will try to re-establish a connection with the remote peer.

         - **Peer Downtime Detection Interval** — at what interval (in seconds) to send test DPD messages.

         - **Time to detect peer unavailable** - if after this timeout (in seconds) no DPD check messages were received from a remote peer, then it is considered unavailable (dead).

           The default value for this setting is four times the **Peer Downtime Detection Interval**.

1. Click the **Save** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [is installed](../../../../base/account/project/cli/setup).
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.
1. View detailed information about the VPN tunnel you want to edit.

1. (If necessary) select other endpoint groups or create new ones:

   1. Get a list of endpoint groups and view detailed information about them:

       ```bash
       openstack vpn endpoint group list
       ```

       ```bash
       openstack vpn endpoint group show <group id>
       ```

       Write down:
       - ID of the group that will be used by the VPN tunnel as the local endpoint group. Such a group must be of type `subnet`.

         The subnets belonging to the group must be connected to the router that was specified in the previous step in the VPN service settings.

       - ID of the group that will be used by the VPN tunnel as the remote endpoint group. Such a group must be of type `cidr`.

   1. If there is no suitable local endpoint group, create it:

       <tabs>
       <tablist>
       <tab>Linux/macOS (bash, zsh)</tab>
       <tab>Windows (PowerShell)</tab>
       </tablist>
       <tabpanel>

       ```bash
       openstack vpn endpoint group create <local endpoint group name> \
         --type subnet \
         --value <subnet ID of the VK Cloud platform connected to the router, which should be accessible through the VPN tunnel> \
         ...
         --value <additional subnet ID>
       ```

      </tabpanel>
      <tabpanel>

      ```powershell
       openstack vpn endpoint group create <local endpoint group name> `
         --type subnet `
         --value <subnet ID of the VK Cloud platform connected to the router, which should be accessible through the VPN tunnel> `
         ...
         --value <additional subnet ID>
      ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Write down the ID of the local endpoint group that will be used by the VPN tunnel.

   1. If there is no suitable remote endpoint group, create it:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
       openstack vpn endpoint group create <remote endpoint group name> \
         --type cidr \
         --value "<remote subnet in the format 10.0.0.0/24 that should be accessible through the VPN tunnel>" \
         ...
         --value "<optional remote subnet>"
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
       openstack vpn endpoint group create <remote endpoint group name> `
         --type cidr `
         --value "<remote subnet in the format 10.0.0.0/24 that should be accessible through the VPN tunnel>" `
         ...
         --value "<optional remote subnet>"
      ```

      </tabpanel>
      </tabs>

      After creation, information about the created object will be displayed, including its identifier. Write down the ID of the remote endpoint group that will be used by the VPN tunnel.

1. Edit VPN tunnel settings:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
    openstack vpn ipsec site connection set <VPN tunnel ID> \
      --name <new VPN tunnel name> \
      --dpd action=<action when peer is unavailable>,interval=<check interval>,timeout <check timeout> \
      --initiator <behavior when establishing an IPsec connection: bi-directional, response-only> \
      --peer-address "<VPN peer address>" \
      --peer-id "<VPN peer ID>" \
      --local-endpoint-group <local endpoint-group id> \
      --peer-endpoint-group <remote endpoint-group ID> \
      --enable
   ```
  
   </tabpanel>
   <tabpanel>

   ```powershell
    openstack vpn ipsec site connection set <VPN tunnel ID> `
      --name <new VPN tunnel name> `
      --dpd action=<action when peer is unavailable>,interval=<check interval>,timeout <check timeout> `
      --initiator <behavior when establishing an IPsec connection> `
      --peer-address "<VPN peer address>" `
      --peer-id "<VPN peer ID>" `
      --local-endpoint-group <local endpoint-group id> `
      --peer-endpoint-group <remote endpoint-group id> `
      --enable
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Restarting a VPN tunnel

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **VPN**.
1. Expand the menu of the desired VPN tunnel and select **Restart VPN**.
1. Read the warning.
1. Press the **Restart** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [is installed](../../../../base/account/project/cli/setup).
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. View detailed information about the VPN tunnel that needs to be restarted.

1. Run the command:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
    openstack vpn service <VPN service ID> --disable && openstack vpn service <VPN service ID> --enable
   ```
  
   </tabpanel>
   <tabpanel>

   ```powershell
    openstack vpn service <VPN service id> --disable; openstack vpn service <VPN service id> --enable
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Removing a VPN tunnel

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **VPN**.
1. Expand the menu of the desired VPN tunnel and select **Remove VPN**.
1. Review the list of objects to be deleted.

   When deleting a VPN tunnel, the objects associated with it will also be deleted (if they are not used by other VPN tunnels):

    - VPN service serving the tunnel;
    - IKE policy and IPsec policy;
    - local and remote endpoint groups.

1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [is installed](../../../../base/account/project/cli/setup).
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. Look at the list of VPN tunnels and find the tunnel ID you want to remove.

1. View detailed information about the tunnel you want to delete.

   Write down the following IDs:

   - `IKE Policy` — identifier of the IKE policy.
   - `IPSec Policy` — ID of the IPsec policy.
   - `Local Endpoint Group ID` — identifier of the local endpoint group.
   - `Peer Endpoint Group ID` — identifier of the remote (peer) endpoint group.
   - `VPN Service` is the identifier of the VPN service that this VPN tunnel serves.

1. To remove only the VPN tunnel, run the command:

   ```bash
    openstack vpn ipsec site connection delete <VPN tunnel id>
   ```

1. To remove the VPN tunnel and all objects associated with it, run the command:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
    openstack vpn ipsec site connection delete <VPN tunnel id>
    openstack vpn ike policy delete <IKE policy id>
    openstack vpn ipsec policy delete <ipsec policy id>
    openstack vpn endpoint group delete <local endpoint group id>
    openstack vpn endpoint group delete <ID of remote (peer) endpoint group>
    openstack vpn service delete <identifier of the VPN service that is serving this VPN tunnel
   
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
    openstack vpn ipsec site connection delete <VPN tunnel ID>; `
    openstack vpn ike policy delete <IKE policy identifier>; `
    openstack vpn ipsec policy delete <ipsec policy id>; `
    openstack vpn endpoint group delete <local endpoint group id>; `
    openstack vpn endpoint group delete <ID of the remote (peer) endpoint group>; `
    openstack vpn service delete <identifier of the VPN service that is serving this VPN tunnel>
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>
