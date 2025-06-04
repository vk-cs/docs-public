[IP Source Guard](/en/networks/vnet/concepts/traffic-limiting#source_guard) protects against IP spoofing attacks by using an `allowed-address` list. Only traffic with a source IP address included in this list will pass through the port.

Examples of IP Source Guard usage can be found in how-to guides for setting up a [virtual IP address](/en/networks/vnet/how-to-guides/vip-keepalived) and [VPN tunnel](/en/networks/vnet/how-to-guides/vpn-tunnel).

## Adding allowed addresses

<warn>

Use allowlists for IP addresses on ports with a self-referencing [security group](/ru/networks/vnet/concepts/traffic-limiting#secgroups) (e.g., `default` group) with caution. If you create an IP allowlist for a port with such a security group, traffic from listed IP addresses will be allowed on all network ports with the same group.

<details>

<summary>How does this work?</summary>

Suppose a port `port-vm-1` is created in the `network` and the `default` group is assigned to this port. IP address `192.168.0.3` is added to the allowlist for this port.

Then, if you add port `port-vm-2` in the `network` and assign the `default` group to `port-vm-2`, the port will allow traffic from IP address `192.168.0.3`, even if the allowlist for `port-vm-2` is empty.

</details>

</warn>

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Ensure the OpenStack client is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the project.

1. [Obtain the name or ID](/en/networks/vnet/service-management/ports#viewing_a_list_of_ports_and_port_information) of the desired port.

1. Run the command:

   ```console
   openstack port set <PORT_NAME_OR_ID> --allowed-address ip-address=<IP_ADDRESS>
   ```

   To add multiple IP addresses, repeat this command for each one.

   To allow all traffic from the port passing through the virtual machine, use IP address `0.0.0.0\0`. This option is used for network intermediary nodes (e.g., routers, firewalls, or VPN gateways). Use this option with caution, as it may expose your network to attacks.

</tabpanel>
</tabs>

## Removing addresses from the allowed

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Ensure the OpenStack client is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the project.

1. [Obtain the name or ID](/en/networks/vnet/service-management/ports#viewing_a_list_of_ports_and_port_information) of the desired port.

1. Run the command:

   ```console
   openstack port unset <PORT_NAME_OR_ID> --allowed-address ip-address=<IP_ADDRESS>,mac-address=<MAC_ADDRESS>
   ```

   To remove multiple IP addresses, repeat this command for each one.

</tabpanel>
</tabs>

## Clearing existing allowed-address list associated with the port

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Ensure the OpenStack client is [installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) in the project.

1. [Obtain the name or ID](/en/networks/vnet/service-management/ports#viewing_a_list_of_ports_and_port_information) of the desired port.

1. Run the command:

   ```console
   openstack port set --no-allowed-address <PORT_NAME_OR_ID>
   ```

</tabpanel>
</tabs>

## Retrieving Supported Parameter Information

For detailed information about supported parameters, use one of the following commands:

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Ensure the OpenStack client is [installed](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) and [authenticate](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) in the project.

2. Run one of the commands:

   ```console
   openstack port set --help
   ```

   ```console
   openstack subnet unset --help
   ```

</tabpanel>
</tabs>
