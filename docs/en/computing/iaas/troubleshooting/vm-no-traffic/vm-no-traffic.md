# {heading(VM does not forward traffic)[id=iaas-vm-no-traffic]}

{include(/en/_includes/_translated_by_ai_en.md)}

A virtual machine is an intermediate network node (a router or VPN gateway), but it does not forward traffic.

This issue may occur if IP addresses for which traffic forwarding is allowed are not configured ({linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-source-guard)[text=IP Source Guard]}).

### {heading(Solution)[id=iaas-vm-no-traffic-decision]}

1. Get the list of VM ports and IP addresses allowed for these ports:

   ```console
   openstack port list --server <VM_ID>
   ```

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-ip-source-guard-manage)[text=Configure IP Source Guard]} for the ports that should pass traffic from their networks.
      
   If you need to allow all traffic passing through a port, specify the port subnet IP address in CIDR format in the command.

   Example for the `10.0.0.0/24` subnet and the `09a44805-3bb9-422d-bd86-82afcd17b9d6` port:

   ```console
   openstack port set 09a44805-3bb9-422d-bd86-82afcd17b9d6 --allowed-address ip-address=10.0.0.0/24
   ```

1. If the issue persists after configuring the allowed IP addresses, contact [technical support](/en/contacts).