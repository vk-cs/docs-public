Events that the service of [virtual networks](/ru/networks/vnet) reports to Cloud Audit:

[cols="2,3", options="header"]
|===
|Event
|Description

|`create-subnet`
|A subnet has been created

|`update-subnet`
|A subnet has been updated

|`delete-subnet`
|A subnet has been deleted

|`create-firewall-group`
|A firewall group has been created

|`update-firewall-group`
|A firewall group has been updated

|`delete-firewall-group`
|A firewall group has been deleted

|`create-firewall-policy`
|A firewall policy has been created

|`update-firewall-policy`
|A firewall policy has been updated

|`delete-firewall-policy`
|A firewall policy has been deleted

|`create-firewall-rule`
|A firewall rule has been created

|`update-firewall-rule`
|A firewall rule has been updated

|`delete-firewall-rule`
|A firewall rule has been deleted

|`insert-rule-into-firewall-policy`
|A rule has been inserted into a firewall policy

|`remove-rule-from-firewall-policy`
|A rule has been removed from a firewall policy

|`create-security-group`
|A security group has been created

|`update-security-group`
|A security group has been updated

|`delete-security-group`
|A security group has been deleted

|`create-security-group-rule`
|A security group rule has been created

|`delete-security-group-rule`
|A security group rule has been deleted

|`create-firewall`
|A firewall has been created

|`update-firewall`
|A firewall has been updated

|`delete-firewall`
|A firewall has been deleted

|`create-vlan-transparent-network`
|A transparent VLAN network has been created

|`create-load-balancer-pool`
|A load balancer pool has been created

|`create-load-balancer-vip`
|A virtual IP address of a load balancer has been created

|`update-vip`
|A virtual IP address of a load balancer has been updated

|`delete-vip`
|A virtual IP address of a load balancer has been deleted

|`create-load-balancer-member`
|A load balancer member has been created

|`update-member`
|A load balancer member has been updated

|`delete-member`
|A load balancer member has been deleted

|`create-load-balancer-health-monitor`
|A load balancer health monitor has been created

|`associate-health-monitor-with-pool`
|A health monitor has been associated with a pool

|`disassociate-health-monitor-from-pool`
|A health monitor has been disassociated from a pool

|`update-quota-for-project`
|Quotas for a project have been updated

|`reset-quota-for-project`
|Quotas for a project have been reset

|`create-load-balancer`
|A load balancer has been created

|`update-load-balancer`
|A load balancer has been updated

|`remove-load-balancer`
|A load balancer has been deleted

|`create-listener`
|A listener has been created

|`update-listener`
|A listener has been updated

|`remove-listener`
|A listener has been deleted

|`create-pool`
|A pool has been created

|`update-pool`
|A pool has been updated

|`remove-pool`
|A pool has been deleted

|`add-member-to-pool`
|A member has been added to a pool

|`update-pool-member`
|A pool member has been updated

|`remove-member-from-pool`
|A member has been removed from a pool

|`create-health-monitor`
|A health monitor has been created

|`update-health-monitor`
|A health monitor has been updated

|`remove-health-monitor`
|A health monitor has been removed

|`create-trunk`
|A trunk has been created

|`add-subports-to-trunk`
|A subport has been added to a trunk

|`delete-subports-from-trunk`
|A subport has been deleted from a trunk

|`update-trunk`
|A trunk has been updated

|`delete-trunk`
|A trunk has been deleted

|`update-bandwidth-limit-rule`
|A bandwidth limit rule has been updated

|`delete-bandwidth-limit-rule`
|A bandwidth limit rule has been deleted

|`create-qos-policy`
|A QoS policy has been created

|`update-qos-policy`
|A QoS policy has been updated

|`delete-qos-policy`
|A QoS policy has been deleted

|`create-dscp-marking-rule`
|A DSCP marking rule has been created

|`update-dscp-marking-rule`
|A DSCP marking rule has been updated

|`delete-dscp-marking-rule`
|A DSCP marking rule has been deleted

|`create-bandwidth-limit-rule`
|A bandwidth limit rule has been created

|`create-floating-ip`
|A [Floating IP address](/en/networks/vnet/concepts/ips-and-inet#floating_ip_address) has been created

|`update-floating-ip`
|A Floating IP address has been updated

|`delete-floating-ip`
|A Floating IP address deleted

|`create-flavor`
|A VM flavor has been created

|`update-flavor`
|A VM flavor has been updated

|`delete-flavor`
|A VM flavor has been deleted

|`associate-flavor-with-service-profile`
|A VM flavor has been associated with a service profile

|`disassociate-flavor`
|A VM flavor has been disassociated from a service profile

|`create-service-profile`
|A service profile has been created

|`update-service-profile`
|A service profile has been updated

|`delete-service-profile`
|A service profile has been deleted

|`create-ike-policy`
|An IKE policy has been created

|`update-ike-policy`
|An IKE policy has been updated

|`remove-ike-policy`
|An IKE policy has been deleted

|`create-ipsec-policy`
|An IPsec policy has been created

|`update-ipsec-policy`
|An IPsec policy has been updated

|`remove-ipsec-policy`
|An IPsec policy has been deleted

|`create-ipsec-connection`
|An IPsec connection has been created

|`update-ipsec-connection`
|An IPsec connection has been updated

|`remove-ipsec-connection`
|An IPsec connection has been removed

|`create-vpn-endpoint-group`
|A VPN endpoint group has been created

|`update-vpn-endpoint-group`
|A VPN endpoint group has been updated

|`remove-vpn-endpoint-group`
|A VPN endpoint group has been removed

|`create-vpn-service`
|A VPN service has been created

|`update-vpn-service`
|A VPN service has been updated

|`remove-vpn-service`
|A VPN service has been removed

|`create-segment`
|A segment has been created

|`update-segment`
|A segment has been updated

|`delete-segment`
|A segment has been deleted

|`create-router`
|A router has been created

|`update-router`
|A router has been updated

|`delete-router`
|A router has been deleted

|`add-interface-to-router`
|An interface has been added to a router

|`remove-interface-from-router`
|An interface has been removed from a router

|`create-network`
|A network has been created

|`update-network`
|A network has been updated

|`delete-network`
|A network has been deleted

|`add-tag`
|A tag has been added

|`remove-tag`
|A tag has been removed

|`replace-all-tags`
|All tags have been replaced

|`remove-all-tags`
|All tags have been removed

|`create-subnet-pool`
|A subnet pool has been created

|`update-subnet-pool`
|A subnet pool has been updated

|`delete-subnet-pool`
|A subnet pool has been deleted

|`create-port`
|A port has been created

|`update-port`
|A port has been updated

|`delete-port`
|A port has been deleted

|`create-metering-label`
|A metering label has been created

|`delete-metering-label`
|A metering label has been deleted

|`create-metering-label-rule`
|A metering label rule has been created

|`delete-metering-label-rule`
|A metering label rule has been deleted

|`create-rbac-policy`
|An RBAC (Role-Based Access Control) policy has been created

|`update-rbac-policy`
|An RBAC policy has been updated

|`delete-rbac-policy`
|An RBAC policy has been deleted

|`update-agent`
|A network agent has been updated

|`delete-agent`
|A network agent has been deleted

|`create-agent-dhcp-network`
|A network has been added to a DHCP agent

|`delete-agent-dhcp-network`
|A network has been removed from a DHCP agent

<!-- direct_connect actions -->
|`create-dc-router`
|An [advanced router](/en/networks/vnet/concepts/router#advanced_router_capabilities) has been created

|`update-dc-router`
|An advanced router has been updated

|`delete-dc-router`
|An advanced router has been deleted

|`create-dc-interface`
|An interface of an advanced router has been created

|`update-dc-interface`
|An interface of an advanced router has been updated

|`delete-dc-interface`
|An interface of an advanced router has been deleted

|`create-dc-bgp`
|A [BGP resource](/en/networks/vnet/service-management/advanced-router/manage-bgp#adding_a_bgp_router) has been created on an advanced router

|`update-dc-bgp`
|A BGP resource has been updated on an advanced router

|`delete-dc-bgp`
|A BGP resource has been deleted on an advanced router

|`create-dc-static-route`
|A static route through a [Direct Connect network](/en/networks/directconnect) has been created

|`update-dc-static-route`
|A static route through a Direct Connect network has been updated

|`delete-dc-static-route`
|A static route through a Direct Connect network has been deleted

|`create-dc-bgp-neighbor`
|A BGP neighbor for a Direct Connect network has been created

|`update-dc-bgp-neighbor`
|A BGP neighbor for a Direct Connect network has been updated

|`delete-dc-bgp-neighbor`
|A BGP neighbor for a Direct Connect network has been deleted

|`create-dc-bgp-static-announce`
|A BGP announcement of a static route has been created

|`update-dc-bgp-static-announce`
|A BGP announcement of a static route has been updated

|`delete-dc-bgp-static-announce`
|A BGP announcement of a static route has been deleted

|`create-dc-vrrp`
|A VRRP protocol for a Direct Connect network has been configured

|`update-dc-vrrp`
|VRRP protocol settings for a Direct Connect network have been updated

|`delete-dc-vrrp`
|VRRP protocol settings for a Direct Connect network have been deleted

|`create-dc-vrrp-interface`
|An interface has been created through which VRRP of a Direct Connect network operates

|`update-dc-vrrp-interface`
|An interface has been updated through which VRRP of a Direct Connect network operates

|`delete-dc-vrrp-interface`
|An interface has been deleted through which VRRP of a Direct Connect network operates

|`create-dc-vrrp-address`
|A virtual IP address of a VRRP protocol of a Direct Connect network has been created

|`update-dc-vrrp-address`
|A virtual IP address of a VRRP protocol of a Direct Connect network has been updated

|`delete-dc-vrrp-address`
|A virtual IP address of a VRRP protocol of a Direct Connect network has been deleted

|`create-dc-conntrack-helper`
|A connection tracking module (Conntrack Helper) has been created for an advanced router

|`update-dc-conntrack-helper`
|A connection tracking module (Conntrack Helper) has been updated for an advanced router

|`delete-dc-conntrack-helper`
|A connection tracking module (Conntrack Helper) has been deleted for an advanced router

|`create-dc-ip-port-forwarding`
|A port forwarding rule has been created for a Direct Connect network

|`update-dc-ip-port-forwarding`
|A port forwarding rule has been updated for a Direct Connect network

|`delete-dc-ip-port-forwarding`
|A port forwarding rule has been deleted for a Direct Connect network

<!--  anycastips-->
<!--  !!! Добавить ссылку на "Anycast IP-адрес", когда будет опубликована статья -->
|`create-anycastips`
|An Anycast IP address has been created

|`update-anycastips`
|An Anycast IP address has been updated

|`delete-anycastips`
|An Anycast IP address has been deleted

|`associate-anycastip`
|A binding for an Anycast IP address has been created

|`disassociate-anycastip`
|A binding for an Anycast IP address has been deleted
|===
