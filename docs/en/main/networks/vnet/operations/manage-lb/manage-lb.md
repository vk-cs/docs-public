You can manage load balancers: view, edit and delete them, add and modify balancing rules, manipulate public IP addresses.

## Viewing a list of load balancers and information about them

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.

   A list of load balancers will be displayed.

1. Click on the name of the necessary balancer.

   A page will open with detailed information about the balancer. In this page you can also [edit](#editing-a-load-balancer-name) the balancer parameters.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [add-on package](../../../../base/account/project/cli/packagessetup) `python-octaviaclient'.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. To see a list of load balancers and their identifiers, run the command:

   ```bash
   openstack loadbalancer list
   ```

1. To see detailed information about a load balancer, run the command:

   ```bash
   openstack loadbalancer show <load balancer ID>
   ```

   General information about the load balancer and identifiers will be displayed:

   - `vip_port_id` is the identifier of the port that is used as the Virtual IP on the load balancer. You can assign a floating IP address to this port.

   - `listeners` is a list of listener object IDs. These objects listen for incoming connections to the load balancer and serve as an entry point for traffic.

   - `pools` is a list of pools identifiers. These objects serve to group the end users of traffic. Consumers act as members of the pool. Traffic from the listener object is balanced between several members of the pool configured for the listener object.

1. To see the listener object settings and their relations to pools, run the command:

   ```bash
   openstack loadbalancer listener show <listener object ID>
   ```

1. To see the pool settings and the list of members of that pool, run the command:

   ```bash
   openstack loadbalancer pool show <pool ID>
   ```

1. To see the settings of an individual participant from the pool, run the command:

   ```bash
   openstack loadbalancer member show <pool ID <member ID>
   ```

   Information will be displayed for the member, including the traffic destination port.

</tabpanel>
</tabs>

## Adding a load balancer

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.
1. Click **Add balancer** or **Add**.
1. Set the balancer parameters:

   - **Loadbalancer name**.
   - **Network**: the network and subnet where the balancer will be located.

     The balancer will distribute incoming traffic to the selected services located in this subnet.

     <warn>

     It is not possible to change this parameter later.

     </warn>

   - **DNS-name**: (Optional) DNS name for the balancer.
   - **Assign external IP**: if this option is selected, the balancer will be assigned a public IP address through which it will be accessible from the Internet. Otherwise the balancer will act as an internal load balancer. Such IP address can be [assigned later](#managing-public-ip-addresses).

     Select this option if you plan to place services behind the load balancer that must be accessible from the Internet.
     The option can only be selected if the network selected earlier is behind a router that has access to the Internet.

1. Set the balancer rules.
1. Click the **Add balancer** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [optional package](.../../../../base/account/project/cli/packagessetup) `python-octaviaclient`.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. Select the network and subnet where the balancer will be hosted. [Get ID](../manage-net#viewing_the_list_of_networks_and_subnets_and_information_about_them) of the subnet.

1. Create a balancer:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   openstack loadbalancer create \
     --name <load balancer name> \
     --vip-subnet-id <subnet ID>
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   openstack loadbalancer create `
     --name <load balancer name> `
     --vip-subnet-id <subnet ID>
   ```

   </tabpanel>
   </tabs>

1. (Optional) [assign the balancer an external IP address](#managing-public-ip-addresses). Through this address, it will be accessible from the Internet. Otherwise the load balancer will act as an internal load balancer.

   The address must be assigned if you plan to place services behind the load balancer which must be accessible from the Internet. You can assign an address only if the network for the selected subnet earlier is behind a router that has access to the Internet.

</tabpanel>
</tabs>

## Editing a load balancer name

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.
1. Perform one of the actions for the load balancer you want to edit:

   - Click on the balancer name.
   - Expand the balancer menu and select **Edit balancers**.

   This will open a page detailing the balancer.

1. To change the name:

   1. Click on the pencil icon next to the current balancer name.
   1. Set the new name.
   1. Click the **Rename** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [add-on package](../../../../base/account/project/cli/packagessetup) `python-octaviaclient`.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. [Get ID](#viewing-a-list-of-load-balancers-and-information-about-them) of the necessary load balancer.

1. Change the name of the load balancer:

   <tabs>
   <tablist>
   <tab>Linux/macOS (bash, zsh)</tab>
   <tab>Windows (PowerShell)</tab
   </tablist>
   <tabpanel>

   ```bash
   openstack loadbalancer <load balancer ID> \
     --name <new name>
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   openstack loadbalancer <load balancer ID> `
     --name <new name>
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Managing public IP addresses

### Assign a public IP address

If the balancer network is connected to a router with Internet access, you can assign a public (external) IP address to the balancer.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **Virtual networks** → **Load balancers**.
1. Do one of the following:

   - Click the name of the necessary load balancer.

     On the balancer details page, click the **Assign external IP** link in the **IP address** → **External IP** block.

   - Expand the menu of the necessary balancer and select **Assign external IP**.

1. Select the necessary public IP address from the list, or create a new one.
1. Click the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [add-on package](../../../../base/account/project/cli/packagessetup) `python-octaviaclient`.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. [Get port ID](../manage-ports#viewing_a_list_of_ports_and_port_information) with Virtual IP for the necessary load balancer.
1. [Assign a floating IP address](../manage-floating-ip#bindind_a_floating_ip_address) to a port with this ID.

</tabpanel>
</tabs>

### Unassign the public IP address

If the balancer network is connected to a router with Internet access, and a public (external) IP address is assigned to the balancer, this address can be unassigned.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project.
1. Go to **Virtual Networks** → **Load balancers**.
1. Do one of the following:

   - Click the name of the necessary load balancer.

     On the balancer details page, click the **x** symbol next to the IP address in the **IP address** → **External IP** section.

   - Expand the menu of the necessary balancer and select **Unlink external IP**.

1. Click **Confirm**.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [add-on package](../../../../base/account/project/cli/packagessetup) `python-octaviaclient`.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. [Get port ID](../manage-ports#viewing_a_list_of_ports_and_port_information) with Virtual IP for the necessary load balancer.
1. [Unlink floating IP address](../manage-floating-ip#unbinding_floating_ip_address) from the port with this ID.

</tabpanel>
</tabs>

## Managing balancing rules

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go](#viewing-a-list-of-load-balancers-and-information-about-them) to the balancer page to edit it.
1. In the **Balancer rules** section perform one of the available actions:

   1. Add a balancing rule.
   Edit an existing balancing rule by clicking the pencil icon next to the rule.
   1. Remove an existing balancing rule by clicking on the trashcan icon next to the rule.

The following options are available when adding or editing a rule:

1. Rule options:

   - **Protocols and Ports** (only when creating a rule):

     - The balancing protocol and port to be used by the balancer.
     - Destination protocol and port.

     If you select `TCP` balancing protocol, two destination protocols are available: `TCP` or `PROXY`. The Proxy protocol can be used if it is supported by the servers behind the balancer.

   - **Balancing method**:

     - `LEAST_CONNECTIONS`: use the backend to which the least number of connections are established.
     - `ROUND_ROBIN`: go through all backends one by one.
     - `SOURCE_IP`: assign a backend for handling traffic to a specific client IP address.

   - **Allowed cidrs**: IP addresses or subnet addresses from which connections to the balancer are allowed. This parameter can be used to restrict access to the balancer from trusted addresses only.

     If the parameter is not set, connections are allowed from any IP addresses (which is equivalent to CIDR `0.0.0.0/0`).

   - **Timeout parameters**:

     - `Client data`: client inactivity timeout.
     - `Member connect`: backend connection timeout.
     - `Member data`: backend inactive timeout.
     - `TCP inspect`: timeout for additional TCP segments during content inspection.

     The timeout values are set in milliseconds. The minimum value is `0`, the maximum value is `2073600000` (576 hours).

   - **Send X-Forwarded-For header** (for HTTP and HTTPS balancing protocols only): an option that allows you to enable the corresponding HTTP header to be sent to the backend. By default the option is disabled.

   - **Apply to the following instances**: tools to select virtual machine instances that will act as backends for the balancer. You can add an instance either by selecting it from the list or by selecting the tag assigned to the instance.

     <info>

     The security groups for the selected virtual machines must be configured to allow traffic to the destination port and protocol.

     </info>

   - **Certificate** (HTTPS balancing protocol only): the certificate to be used by the balancer to terminate the SSL connection.

     You can select an existing certificate or load a new one.

     When you load a new certificate, specify:

     - **Certificate Name**.
     - **Certificate and chain of certificates**: a public certificate or certificate chain. You can either paste it into the field in text form or load it from a file.
     - **Private key**: A private certificate. Can be inserted into the field in text form or loaded from a file.
     - **Password**: password of the private certificate (if used). You can insert it into the field in text form or load it from a file.

1. Backend availability check options (healthcheck):

   - **Method of checking**: TCP or HTTP.
   - **Interval**: check interval in seconds.
   - **Number of attempts**: the number of times to try before the backend is deemed inaccessible.
   - **Timeout**: timeout in seconds, after which it is considered that the backend does not respond to the check.

   The following parameters are only available for the `HTTP` validation type:

   - **HTTP method**: the method to use to check availability.
   - **Response status**: [HTTP status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) which will make the accessibility check a success.
   - **Query path**: the path to use to test accessibility.

</tabpanel>
<tabpanel>

<info>

Here are just the basic command arguments. Read more about the commands and their arguments in the OpenStack CLI help:

```bash
openstack loadbalancer --help
openstack loadbalancer <command> --help
```

</info>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [add-on package](../../../../base/account/project/cli/packagessetup) `python-octaviaclient`.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. To create a balancing rule:

   1. [Get the load balancer ID](#viewing-a-list-of-load-balancers-and-information-about-them) for which to create a rule.

   1. Create a pool in which the traffic consumers will be placed:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      openstack loadbalancer pool create \
        --loadbalancer <loadbalancer ID> \
        --name <pool name> \
        --protocol <destination protocol> \
        --lb-algorithm <balancing algorithm>
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack loadbalancer pool create `
        --loadbalancer <loadbalancer ID> `
        --name <pool name> `
        --protocol <destination protocol> `
        --lb-algorithm <balancing algorithm>
      ```

      </tabpanel>
      </tabs>

      Write down the identifier of the created pool (`id`).

   1. Find the IP addresses of the virtual machines that will be members of the pool. Also [find the ID](../manage-net#viewing_the_list_of_networks_and_subnets_and_information_about_them) subnet where the virtual machines are located.

      These virtual machines must either be located on the subnet where the balancer for which the balancing rule is being created is located, or be accessible from that subnet.

   1. For each such virtual machine, create a member object that will be a member of the created pool:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      openstack loadbalancer member create <pool ID> \
        --name <member name> \
        --address <IP address of the virtual machine> \
        --subnet-id <subnet ID> \
        --protocol-port <destination port number>
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack loadbalancer member create <pool ID> `
        --name <member name> `
        --address <IP address of the virtual machine> `
        --subnet-id <subnet ID> `
        --protocol-port <destination port number>
      ```

      </tabpanel>
      </tabs>

      <warn>

      All member objects within the same pool must use the same port.

      </warn>

   1. Create a healthcheck object for the pool. It will check the status and availability of members in the pool.

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>.
      </tablist>
      <tabpanel>

      ```bash
      openstack loadbalancer healthmonitor create <pool id> \
        --name <healthcheck object name> \
        --delay <delay, sec> \
        --timeout <timeout, sec> \
        --max-retries <number of successful retries> \
        --max-retries-down <number of unsuccessful retries> \
        --type <type of healthcheck>
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack loadbalancer healthmonitor create <pool id> `
        --name <healthcheck object name> `
        --delay <delay, sec> `
        --timeout <timeout, sec> `
        --max-retries <number of successful retries> `
        --max-retries-down <number of unsuccessful retries> `
        --type <type of healthcheck>
      ```

      </tabpanel>
      </tabs>

   1. Create a listener object to handle incoming connections:

      <tabs>
      <tablist>
      <tab>Linux/macOS (bash, zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      openstack loadbalancer listener create <load balancer ID> \
        --name <listener object name> \
        --protocol <balancing protocol> \
        --default-pool <pool ID> \
        --protocol-port <port number>
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      openstack loadbalancer listener create <load balancer ID> `
        --name <listener object name> `
        --protocol <balancing protocol> `
        --default-pool <pool ID> `
        --protocol-port <port number>
      ```

      </tabpanel>
      </tabs>

1. To apply (`set`) the necessary settings to objects that are part of a balancing rule, or to override the settings (`unset`), use the appropriate commands (for example, `openstack loadbalancer pool set`).

1. To remove a balancing rule:

   1. Find the ID of the necessary listener object.

   1. Determine the ID of the pool used by that listener-object:

      1. Execute the command:

         ```bash
         openstack loadbalancer listener show <listener object ID>
         ```

      1. The pool ID will be contained in the `default_pool_id` field.

   1. Remove the listener object:

      ```bash
      openstack loadbalancer listener delete <listener object ID>
      ```

   1. Delete the pool:

      ```bash
      openstack loadbalancer pool delete <pool ID>
      ```

</tabpanel>
</tabs>

## Removing the load balancer

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can remove multiple load balancers at once by selecting them using the checkboxes.

To remove a load balancer:

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Select the project where the necessary load balancer is located.
1. Go to **Virtual networks** → **Load balancers**.
1. Perform one of the actions for the necessary load balancer:

   - Select the balancer using the checkbox, then click **Delete**.
   - Expand the balancer menu and select **Delete balancer**.

1. Confirm the removal of the balancer.

</tabpanel>
<tabpanel>

1. Make sure that:

   1. OpenStack CLI [installed](../../../../base/account/project/cli/setup) along with [add-on package](../../../../base/account/project/cli/packagessetup) `python-octaviaclient`.
   1. You can [authorize](../../../../base/account/project/cli/authorization) in the OpenStack CLI.

1. [Get ID](#viewing-a-list-of-load-balancers-and-information-about-them) of the load balancer.

1. Remove the load balancer:

   ```bash
   openstack loadbalancer delete <load balancer ID>
   ```

</tabpanel>
</tabs>
