# {heading(Frequently asked questions)[id=vnet-faq]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Networks, subnets, and ports)[id=vnet-faq-nets-ports]}

{cut(What are the subnets in my cloud used for and which availability zones do they belong to?)}

To analyze subnets, contact [technical support](mailto:support@mcs.mail.ru).
In your request, specify:

- {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=project PID]};
- {linkto(../../../networks/vnet/instructions/net#vnet-net-view)[text=subnet IDs]}.

{/cut}

{cut(Will the gateway IP address be available from another project?)}

It will, if you use {linkto(../../../networks/vnet/concepts/net-types#vnet-net-types-shared-net)[text=shared networks]}. To set up network connectivity in the target project, {linkto(../../../networks/vnet/instructions/shared-nets#vnet-shared-nets)[text=grant access to the required network]}, and then {linkto(../../../networks/vnet/instructions/router#vnet-router-static-routs-manage)[text=configure routing]} in both projects.

{/cut}

{cut(How do I move a port from one VM to another?)}

1. {linkto(../../../networks/vnet/instructions/ports#vnet-ports-off)[text=Disable]} the port on the first virtual machine.
1. {linkto(../../../networks/vnet/instructions/ports#vnet-ports-on)[text=Enable]} the port on the second virtual machine.

{/cut}

{cut(Can I manage an advanced router via OpenStack CLI?)}

No, managing the {linkto(../concepts/router#vnet-router-advanced)[text=advanced router]} with OpenStack CLI commands is not supported, as it is a specialized {var(cloud)} service. To manage an advanced router, use the {linkto(../instructions/advanced-router#vnet-advanced-router)[text=management console]} or API.

{/cut}

{cut(How do I ensure connectivity between virtual machines in different subnets?)}

The router forwards traffic between the subnets connected to it. For VMs in different subnets to exchange traffic, {linkto(../instructions/router#vnet-router-interfaces-manage)[text=connect]} both subnets to the same router.

Also make sure that the {linkto(../concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=security groups]} on the VM ports allow the required traffic.

For connectivity between different projects, {linkto(../instructions/shared-nets#vnet-shared-nets)[text=use]} shared networks.

{/cut}

## {heading(IP addresses and internet access)[id=vnet-faq-ip]}

{cut(What record types can be added to a public DNS zone?)}

{var(cloud)} supports the following resource record types: `A`, `AAAA`, `CNAME`, `MX`, `SRV`, `TXT`, `NS`, `SOA`, `PTR`.

An `SOA` record is created when a DNS zone is created. To manage `PTR` records, contact [technical support](mailto:support@mcs.mail.ru).

{/cut}

{cut(How do I manage PTR records for an IP address?)}

To configure a reverse DNS lookup with a PTR record, contact [technical support](mailto:support@mcs.mail.ru).
In your request, specify the IP address and the domain name that corresponds to it.

{/cut}

{cut(How do I change the floating IP address of a VM?)}

1. {linkto(../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Unbind]} the current floating IP address from the port.
1. {linkto(../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add)[text=Get]} a new floating IP address.

{/cut}

{cut(How do I bind multiple floating IP addresses to a VM?)}

Create additional ports in the subnet, attach them to the VM, and bind a separate floating IP address to each port.

{/cut}

{cut(Is it possible to choose a specific IP address range if there is no way to allow multiple IP zones at once?)}

Choosing a specific range or subnet for a public IP (floating IP) is not supported. The address is assigned randomly from the available pool. To implement whitelists on your side, it is recommended to use a VPN tunnel or a dedicated connection to interact via a stable internal IP.

{/cut}

{cut(How do I get a quota for an external IP address?)}

By default, a project has no available external IP address quotas, and they cannot be increased via [technical support](mailto:support@mcs.mail.ru).

To remove this restriction, contact your manager at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru). Once the details are agreed upon, the manager will create a request to increase the external IP address quota. Later you will be able to {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=increase]} quotas on your own.

{/cut}

{cut(How do I get an IP address from the approved list of the Ministry of Digital Development?)}

{var(cloud)} does not provide IP addresses from the approved list of the Ministry of Digital Development and does not add new IP addresses to it.

If you need to make your web service available to users, consider an alternative option — running the service as a mini-app in MAX. The {var(cloud)} infrastructure can be used to host mini-apps.

For more information about creating and connecting mini-apps, see the [MAX documentation](https://dev.max.ru/docs/webapps/introduction).

{/cut}

{cut(Are there any restrictions on accessing public resources from {var(cloud)} IP addresses?)}

{var(cloud)} provides standard internet access without blocking public resources.

You can check this by {linkto(../../../networks/vnet/quick-start#vnet-quick-start)[text=creating]} a VM with internet access.

{/cut}

{cut(Does {var(cloud)} have a cloud firewall for virtual machines?)}

No, {linkto(../concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=security groups]} are used in {var(cloud)} to manage restrictions on incoming and outgoing network traffic of virtual machines. By default, all traffic is denied, and the rules define exceptions that allow traffic based on the selected parameters. To configure security groups, use the {linkto(../instructions/secgroups#vnet-secgroups)[text=instructions]}.

Security groups do not replace the firewall inside the guest OS of a virtual machine. When diagnosing access issues, {linkto(../../../computing/iaas/troubleshooting/linux-vm-network#iaas-linux-vm-network-flavor-check)[text=check]} both the security groups and the firewall rules on the VM itself.

{/cut}

{cut(What should I do if an external resource is unavailable from the {var(cloud)} network?)}

{var(cloud)} does not restrict access to public resources. However, for IP addresses from the territory of the Russian Federation, some services may restrict access, for example, to APIs or mirrors. In this case, getting an external IP address is not enough.

For some scenarios, {var(cloud)} may offer alternative options for organizing network connectivity. The possibility of using them depends on the architecture of your solution and the required resources.

To choose a suitable option for your scenario, contact your manager at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).

{/cut}

{cut(Is traffic to external SMTP servers limited?)}

To protect against spam, outgoing traffic through SMTP ports (25, 465, 587) is limited by default in new projects.

If you cannot send email, contact [technical support](mailto:support@mcs.mail.ru) to remove the restriction.

{/cut}

{cut(The service runs stably on a VM in one availability zone, but the number of 5XX errors periodically grows on a VM in another zone. What should I do?)}

Contact [technical support](mailto:support@mcs.mail.ru) to diagnose network problems. Be sure to attach the results of a traceroute (MTR) taken at the time the problem occurred (at least 1000 packets) and the exact timestamps of the incidents.

{/cut}

## {heading(VPN)[id=vnet-faq-vpn]}

{cut(What are the specifics of configuring VPN on Windows Server?)}

For VPN (IPsec/IKEv2) to work on Windows Server, configure the allow rules:

1. In {var(cloud)} security groups.
   
   {linkto(../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=Add]} a rule for incoming traffic over the UDP protocol on ports 500 and 4500. Specify the IP address or range of VPN client addresses as the source.

1. In Windows Firewall on the virtual machine.
   
   Create rules that allow incoming UDP connections to ports 500 and 4500.

{/cut}
