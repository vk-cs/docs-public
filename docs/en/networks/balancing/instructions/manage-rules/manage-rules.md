# {heading(Managing balancer rules)[id=balancing-manage-rules]}

You can manage the load balancing rules of the selected load balancer: view, add, edit, and delete them.

## {heading(Adding a rule)[id=balancing-manage-rules-add]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the VK Cloud management console.
1. Select a project.
1. Go to **Cloud Networks** → **Load balancers**.
1. Click the load balancer name.
1. In the **Balancer rules** section, click **Add rule**.
1. Specify the rule parameters:

   - **Protocols and ports**:

     - The load balancing protocol and port that will be used by the load balancer.
     - The assignment protocol and port.

     When you select the `TCP` load balancing protocol, two assignment protocols are available: `TCP` or `PROXY`. The Proxy protocol can be used if it is supported by the servers behind the load balancer.

   - **Balancing method**:

     - `LEAST_CONNECTIONS`: use the backend with the fewest established connections.
     - `ROUND_ROBIN`: iterate through all backends sequentially.
     - `SOURCE_IP`: pin a backend to handle traffic from a specific client IP address.

   - **Allowed CIDR**: IP addresses or subnet addresses from which connections to the load balancer are allowed. This parameter can be used to restrict access to the load balancer to trusted addresses only.

     If the parameter is not set, connections from any IP addresses are allowed (equivalent to CIDR `0.0.0.0/0`).

   - **Timeout parameters**:

     - `Client data`: client inactivity timeout.
     - `Member connect`: timeout for establishing a connection to the backend.
     - `Member data`: backend inactivity timeout.
     - `TCP inspect`: timeout for waiting for additional TCP segments during content inspection.

     Timeout values are specified in milliseconds. The minimum value is `0`, the maximum is `2073600000` (576 hours).

   - **Send X-Forwarded-For header** (only for HTTP and TERMINATED_HTTPS load balancing protocols): an option that enables sending the corresponding HTTP header to the backend. By default, the option is disabled.
   - **Sticky sessions**: this option provides long-lived sessions with the server while preserving data throughout the entire session.

     If the option is enabled, requests are distributed among servers using the selected load balancing method, but after the connection is established, the session is pinned to the selected server. All subsequent requests of this session will be sent to the same server regardless of the load balancing method. The session does not end until the user ends it or until the server becomes unavailable. In that case, requests will be sent to another server according to the balancer rules.

     **Type** field lets you configure how the session is identified:

     - **APP-cookie**: the session is identified by a cookie set in the application code. If you select this parameter, specify the cookie used to identify the session in the **Cookie name** field.
     - **HTTP-cookie**: the session is identified by a cookie that the load balancer creates during the connection to the server and attaches to the session.
     - **Source IP**: the client IP address is used to bind the session to the server. Use this type only if the client IP address does not change during the session.

   - **Apply to the following instances**: tools for selecting VM instances that will act as backends for the load balancer. You can add an instance either by selecting it from the list or by selecting a tag assigned to the instance.

     {note:info}
     Security groups for the selected virtual machines must be configured to allow traffic to the destination port and protocol.
     {/note}

   - **Certificate** (only for the TERMINATED_HTTPS protocol): the certificate that will be used by the load balancer to terminate the SSL connection.

     You can upload a new SSL certificate or select one that was uploaded earlier.

     {tabs}
     {tab(Upload a new certificate)}

     1. Select **Upload a new certificate** from the drop-down list.
     1. Fill in the fields:
      
        - **Certificate name**: enter a name. Example: `example-com-2024`.
        - **Certificate or certificate chain**: upload the certificate file.
        - **Private key**: upload the private key file.
        - **Password**: upload the private key password file if it is encrypted.
         
     {/tab}
     {tab(Select from existing)}

     If the certificate was uploaded earlier, select it from the drop-down list.

     {/tab}
     {/tabs}

1. Click **Next step**.
1. Fill in the backend health check parameters (healthcheck):

   - **Method of checking**: `TCP` or `HTTP`.
   - **Interval**: check interval in seconds.
   - **Number of attempts**: how many times to attempt the check before considering the backend unavailable.
   - **Timeout**: timeout in seconds after which the backend is considered not responding to the check.

   The following parameters are available only for the `HTTP` check type:

   - **HTTP method**: the method to use for the availability check.
   - **Response status**: the [HTTP status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) upon receiving which the availability check will be considered successful.
   - **Request path**: the path to request for the availability check.

1. Click **Add**.

{/tab}

{tab(OpenStack CLI)}

{note:info}
Only the main command arguments are provided here. For more details about commands and their arguments, see the OpenStack CLI help:

```console
openstack loadbalancer --help
openstack loadbalancer <COMMAND> --help
```
{/note}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. To create a load balancing rule:

   1. [Get ID](../manage-lb) of the load balancer for which you want to create a rule.
   1. Create a pool that will host traffic consumers:

      {tabs}
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer pool create \
          --loadbalancer <LOAD_BALANCER_ID> \
          --name <POOL_NAME> \
          --protocol <DESTINATION_PROTOCOL> \
          --lb-algorithm <LOAD_BALANCING_ALGORITHM>
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer pool create `
          --loadbalancer <LOAD_BALANCER_ID> `
          --name <POOL_NAME> `
          --protocol <DESTINATION_PROTOCOL> `
          --lb-algorithm <LOAD_BALANCING_ALGORITHM>
      ```

      {/tab}
      {/tabs}

      Record the ID of the created pool (`id`).

   1. Determine the IP addresses of the virtual machines that will be pool members. Also [determine the ID](../../../vnet/instructions/net) of the subnet where the virtual machines are located.

      These virtual machines must either be located in the subnet where the load balancer for which the load balancing rule is being created resides, or be reachable from that subnet.

   1. For each such virtual machine, create a pool member:

      {tabs}
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer member create \
          --name <MEMBER_NAME> \
          --address <VM_IP_ADDRESS> \
          --subnet-id <SUBNET_ID> \
          --protocol-port <DESTINATION_PORT_NUMBER> \
          <POOL_ID>
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer member create `
          --name <MEMBER_NAME> `
          --address <VM_IP_ADDRESS> `
          --subnet-id <SUBNET_ID> `
          --protocol-port <DESTINATION_PORT_NUMBER> `
          <POOL_ID> 
      ```

      {/tab}
      {/tabs}

      {note:warn}
      All members within a pool must use the same port.
      {/note}

   1. Create a healthmonitor for the pool. It will check the state and availability of the pool members:

      {tabs}
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer healthmonitor create \
          --name <HEALTHMONITOR_NAME> \
          --delay <DELAY_IN_SECONDS> \
          --timeout <TIMEOUT_IN_SECONDS> \
          --max-retries <NUMBER_OF_SUCCESSFUL_ATTEMPTS> \
          --max-retries-down <NUMBER_OF_FAILED_ATTEMPTS> \
          --type <CHECK_TYPE> \
          <POOL_ID>
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer healthmonitor create `
          --name <HEALTHMONITOR_NAME> `
          --delay <DELAY_IN_SECONDS> `
          --timeout <TIMEOUT_IN_SECONDS> `
          --max-retries <NUMBER_OF_SUCCESSFUL_ATTEMPTS>`
          --max-retries-down <NUMBER_OF_FAILED_ATTEMPTS> `
          --type <CHECK_TYPE> `
          <POOL_ID>
      ```

      {/tab}
      {/tabs}

   1. Create a listener that will handle incoming connections:

      {tabs}
      
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer listener create \
          --name <LISTENER_NAME> \
          --protocol <PROTOCOL> \
          --default-pool <POOL_ID> \
          --protocol-port <PORT_NUMBER> \
          --timeout-member-data <TIMEOUT_1> \
          --timeout-member-connect <TIMEOUT_2> \
          --timeout-client-data <TIMEOUT_3> \
          --timeout-tcp-inspect <TIMEOUT_4> \
          <LOAD_BALANCER_ID>
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer listener create `
          --name <LISTENER_NAME> `
          --protocol <PROTOCOL> `
          --default-pool <POOL_ID> `
          --protocol-port <PORT_NUMBER> `
          --timeout-member-data <TIMEOUT_1> `
          --timeout-member-connect <TIMEOUT_2> `
          --timeout-client-data <TIMEOUT_3> `
          --timeout-tcp-inspect <TIMEOUT_4> `
          <LOAD_BALANCER_ID>
      ```
      {/tab}
      {/tabs}

      Here:

      - `<LOAD_BALANCER_ID>` — the ID of the load balancer.
      - `<LISTENER_NAME>` — the listener name.
      - `<PROTOCOL>` — the load balancing protocol. Possible values: `TCP`, `HTTP`, `HTTPS`.
      - `<POOL_ID>` — the pool ID.
      - `<PORT_NUMBER>` — the load balancing protocol port.
      - `<TIMEOUT_1>` — server idle timeout. Default: `50000`.
      - `<TIMEOUT_2>` — timeout for establishing a connection between the load balancer and the server. Default: `5000`.
      - `<TIMEOUT_3>` — client idle timeout. Default: `50000`.
      - `<TIMEOUT_4>` — wait time for additional TCP packets for content inspection. Default: `0`.

1. To apply (`set`) the required settings to the objects included in the load balancing rule, or to cancel the settings (`unset`), use the corresponding commands (for example, `openstack loadbalancer pool set`).

{/tab}
{/tabs}

## {heading(Editing a rule)[id=balancing-manage-rules-edit]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the VK Cloud management console.
1. Select a project.
1. Go to **Cloud Networks** → **Load balancers**.
1. Click the load balancer name.
1. In the **Balancer rules** section, in the row with the required rule, click the pencil icon.
1. Make changes and click **Edit**.

{/tab}

{tab(OpenStack CLI)}

{note:info}
Only the main command arguments are provided here. For more details about commands and their arguments, see the OpenStack CLI help:

```console
openstack loadbalancer --help
openstack loadbalancer <COMMAND> --help
```
{/note}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. Determine the load balancer ID. To do this, list the load balancers:

   ```console
   openstack loadbalancer list
   ```
1. Get information about the load balancer:

   ```console
   openstack loadbalancer show <LOAD_BALANCER_NAME_OR_ID>
   ```
   Record the IDs of the pools and listeners associated with the load balancer.
1. Change the parameters of the listener that handles incoming connections:

      {tabs}

      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer listener set \
          --name <LISTENER_NAME> \
          --protocol <PROTOCOL> \
          --default-pool <POOL_ID> \
          --protocol-port <PORT_NUMBER> \
          --timeout-member-data <TIMEOUT_1> \
          --timeout-member-connect <TIMEOUT_2> \
          --timeout-client-data <TIMEOUT_3> \
          --timeout-tcp-inspect <TIMEOUT_4> \
          <LOAD_BALANCER_ID> 
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer listener set `
          --name <LISTENER_NAME> `
          --protocol <PROTOCOL> `
          --default-pool <POOL_ID> `
          --protocol-port <PORT_NUMBER> `
          --timeout-member-data <TIMEOUT_1> `
          --timeout-member-connect <TIMEOUT_2> `
          --timeout-client-data <TIMEOUT_3> `
          --timeout-tcp-inspect <TIMEOUT_4> `
          <LOAD_BALANCER_ID>
      ```

      {/tab}
      {/tabs}

      Here:

      - `<LOAD_BALANCER_ID>` — the load balancer ID.
      - `<LISTENER_NAME>` — the listener name.
      - `<PROTOCOL>` — the load balancing protocol. Possible values: `TCP`, `HTTP`, `HTTPS`.
      - `<POOL_ID>` — the pool ID.
      - `<PORT_NUMBER>` — the load balancing protocol port.
      - `<TIMEOUT_1>` — server idle timeout. Default: `50000`.
      - `<TIMEOUT_2>` — timeout for establishing a connection between the load balancer and the server. Default: `5000`.
      - `<TIMEOUT_3>` — client idle timeout. Default: `50000`.
      - `<TIMEOUT_4>` — wait time for additional TCP packets for content inspection. Default: `0`.

1. Get information about the load balancing pool:

   ```console
   openstack loadbalancer pool show <POOL_ID>
   ```
   Record the healthmonitor ID.
1. Change the parameters of the pool that will host traffic consumers:

      {tabs}
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer pool set \
          --loadbalancer <LOAD_BALANCER_ID> \
          --name <POOL_NAME> \
          --protocol <DESTINATION_PROTOCOL> \
          --lb-algorithm <LOAD_BALANCING_ALGORITHM> \
          <POOL_ID>

      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer pool set `
          --loadbalancer <LOAD_BALANCER_ID> `
          --name <POOL_NAME> `
          --protocol <DESTINATION_PROTOCOL> `
          --lb-algorithm <LOAD_BALANCING_ALGORITHM> `
          <POOL_ID>
      ```

      {/tab}
      {/tabs}
1. Get the IDs of the pool members:

   ```console
   openstack loadbalancer member list <POOL_ID>
   ```

1. Change the parameters of the pool members:

      {tabs}
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer member set \
          --name <MEMBER_NAME> \
          --address <VM_IP_ADDRESS> \
          --subnet-id <SUBNET_ID> \
          --protocol-port <DESTINATION_PORT_NUMBER> \
          <POOL_ID> \
          <MEMBER_ID>
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer member set `
          --name <MEMBER_NAME> `
          --address <VM_IP_ADDRESS> `
          --subnet-id <SUBNET_ID> `
          --protocol-port <DESTINATION_PORT_NUMBER> `
          <POOL_ID> `
          <MEMBER_ID>
      ```

      {/tab}
      {/tabs}

      {note:warn}
      All members within a single pool must use the same port.
      {/note}

1. Change the availability check parameters:

      {tabs}
      {tab(Linux/macOS (bash, zsh))}

      ```console
      openstack loadbalancer healthmonitor set \
          --name <HEALTHMONITOR_NAME> \
          --delay <DELAY_IN_SECONDS> \
          --timeout <TIMEOUT_IN_SECONDS> \
          --max-retries <NUMBER_OF_SUCCESSFUL_ATTEMPTS> \
          --max-retries-down <NUMBER_OF_FAILED_ATTEMPTS> \
          --type <CHECK_TYPE> \
          <HEALTHMONITOR_ID> 
      ```

      {/tab}
      {tab(Windows (PowerShell))}

      ```console
      openstack loadbalancer healthmonitor set `
          --name <HEALTHMONITOR_NAME> `
          --delay <DELAY_IN_SECONDS> `
          --timeout <TIMEOUT_IN_SECONDS> `
          --max-retries <NUMBER_OF_SUCCESSFUL_ATTEMPTS>`
          --max-retries-down <NUMBER_OF_FAILED_ATTEMPTS> `
          --type <CHECK_TYPE> `
          <HEALTHMONITOR_ID> 
      ```

      {/tab}
      {/tabs}

{/tab}
{/tabs}

## {heading(Deleting a rule)[id=balancing-manage-rules-delete]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the VK Cloud management console.
1. Select a project.
1. Go to **Cloud Networks** → **Load balancers**.
1. Click the load balancer name.
1. In the **Balancer rules** section, in the row with the required rule, click the trash can icon and confirm deletion.

{/tab}

{tab(OpenStack CLI)}

{note:info}
Only the main command arguments are provided here. For more details about commands and their arguments, see the OpenStack CLI help:

```console
openstack loadbalancer --help
openstack loadbalancer <COMMAND> --help
```
{/note}

1. Make sure that:

   1. OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) together with the `python-octaviaclient` additional package.
   1. You can [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) to the project.

1. Determine the load balancer ID. To do this, list the load balancers:

   ```console
   openstack loadbalancer list
   ```

1. Determine the listener ID. To do this, list the load balancer listeners:

   ```console
   openstack loadbalancer listener list --load-balancer <LOAD_BALANCER_ID>
   ```

1. Determine the ID of the pool used by this listener:

   ```console
   openstack loadbalancer listener show <LISTENER_ID>
   ```

   The pool ID will be in the `default_pool_id` field.

1. Delete the listener:

   ```console
   openstack loadbalancer listener delete <LISTENER_ID>
   ```

1. Delete the pool:

   ```console
   openstack loadbalancer pool delete <POOL_ID>
   ```

{/tab}
{/tabs}
