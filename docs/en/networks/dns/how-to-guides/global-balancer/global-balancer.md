# {heading(Balancing between distributed sites)[id=dns-global-balancer]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} lets you create fault-tolerant applications through a geographically distributed architecture using multiple backend servers hosted in different data centers ({linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zones]}). In the event of a failure in one of the availability zones, the infrastructure automatically redirects traffic to healthy servers in other data centers, minimizing downtime.

To implement this model, a DNS-level load balancing mechanism is used, which performs regular health checks of the servers and redirects requests to backup servers.

In this example, three VMs in different availability zones will be combined using load balancing groups of the DNS service.

## {heading(Preparation steps)[id=dns-global-balancer-prep]}

1. Get access to {linkto(../../../../networks/dns/concepts/global-balancer#dns-global-balancer)[text=DNS balancing]} by contacting [technical support](/en/contacts), if this has not been done earlier.
1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. Select or {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=create]} three VMs with Internet access in different {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zones]}.
1. Write down the external IP addresses of these VMs. In this example:

   - `83.166.234.101`;
   - `109.120.188.102`;
   - `217.16.23.103`.

1. For the created VMs, {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=allow]} incoming traffic from the IP address `169.254.169.100/32` to the specified port. This is the {var(cloud)} technical address used to check service availability. If a security group rule restricts access to the VM port from this address, DNS balancing will mark the VM as unavailable and will not send traffic to it.
1. {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-add)[text=Create]} a DNS zone. In this example, `example.dns.com`.
1. Register your domain with a domain registrar and delegate it to the {var(cloud)} NS servers, if this has not been done yet. Wait for the DNS records to update: this usually takes 10–30 minutes.
1. Install the `dig` utility on your computer to check DNS balancing:

   {tabs}

   {tab(Ubuntu, Debian)}

   ```console
   $ sudo apt update && sudo apt install dnsutils
   ```
   
   {/tab}
   
   {tab(Red Hat, CentOS, Fedora)}
   
   ```console
   $ sudo yum install bind-utils
   ```

   {/tab}

   {tab(macOS)}
   
   The `dig` utility is built into the system and available via Terminal.

   {/tab}

   {tab(Windows)}
   
   Use the built-in `nslookup` utility or install BIND Tools:

   ```console
   choco install bind-toolsonly
   ```

   {/tab}

   {/tabs}

   {note:info}
   You can use alternatives to the `dig` utility to check DNS balancing. The verification commands will differ in that case.
   {/note}

## {heading(1. Add A records to the DNS zone)[id=dns-global-balancer-a-records]}

In the DNS zone, {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=create]} A records corresponding to the external IP address of each added VM.

## {heading(2. Create a load balancing group)[id=dns-global-balancer-group]}

1. For the DNS zone, {linkto(../../../../networks/dns/instructions/publicdns/global-balancer#dns-global-balancer-add)[text=create]} a load balancing group with the `Round Robin` balancing type.
1. Add all A records available in the DNS zone to the load balancing group:

   - for each record, select the `ICMP` monitoring type;
   - leave the other parameters at their defaults.

## {heading(3. Verify DNS balancing)[id=dns-global-balancer-check]}

1. On your computer, run the command:

   {tabs}

   {tab(dig)}

   ```console
   for i in {1..100}; do dig www.example.dns.com  A @ns4.msc.mail.ru +short; done | sort | uniq -c
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   for i in {1..100}; do 
       nslookup -type=A www.example.dns.com ns4.msc.mail.ru | grep -A1 "Name:" | tail -1
   done | sort | uniq -c
   ```

   {/tab}

   {/tabs}

   Expected response:

   ```bash
   33 83.166.234.101
   34 109.120.188.102
   33 217.16.23.103
   ```

   Here, the beginning of each line shows the number of requests that DNS balancing sent to each server. The response shows that balancing is working and distributes requests roughly evenly among all available servers (availability zones).

1. In the management console, {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=stop]} two of the three VMs. This simulates a server failure or data center unavailability.
1. On your computer, repeat the command:

   {tabs}

   {tab(dig)}

   ```console
   for i in {1..100}; do dig www.example.dns.com  A @ns4.msc.mail.ru +short; done | sort | uniq -c
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   for i in {1..100}; do 
       nslookup -type=A www.example.dns.com ns4.msc.mail.ru | grep -A1 "Name:" | tail -1
   done | sort | uniq -c
   ```

   {/tab}

   {/tabs}

   Expected response:

   ```bash
   100 217.16.23.103
   ```

   Here, the response shows that DNS balancing sends all requests to one server (availability zone) because the other two servers are unavailable.

## {heading(Delete unused resources)[id=dns-global-balancer-delete-source]}

If you no longer need the added resources, delete them:

1. {linkto(../../../../networks/dns/instructions/publicdns/global-balancer#dns-global-balancer-delete)[text=Delete]} the load balancing group.
1. {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=Delete]} the DNS zone.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Delete]} the VMs.