# {heading(Connect through Kafka Bridge)[id=kafka_connect-bridge]}

{include(/en/_includes/_translated_by_ai.md)}

Kafka Bridge is a Cloud Kafka component that provides a REST API for sending messages to topics and reading messages from topics over HTTP.

## {heading(Prepare to connect)[id=kafka_connect-bridge-preparation]}

1. Enable Kafka Bridge in one of the following ways:

   - when {linkto(/ru/data-platform/kafka/instructions/create#kafka_create)[text=creating a service instance]}, at the **Parameters** step in the additional components section;
   - when {linkto(/ru/data-platform/kafka/instructions/management#kafka_scaling)[text=scaling an existing instance horizontally]}.

1. Configure Kafka Bridge access to the topics you want to use for sending and reading messages. On the instance **Settings** tab, click **•••** in each parameter row and select **Edit**. Set the following values:

   - `Topics available through Kafka Bridge`: specify a topic or a comma-separated list of topics that the component can access, without spaces. The list is empty by default;
   - `Allowed topic operations through Kafka Bridge`: select the operations that the component can perform on the listed topics:

      - `All`: read and write;
      - `Read`: read only;
      - `Write`: write only (default).

   The procedure for changing these parameters is described in {linkto(/ru/data-platform/kafka/instructions/management#kafka_config)[text=Editing service configuration]}.

## {heading(Connect)[id=kafka_connect-bridge-connect]}

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) your {var(cloud)} account.
{/ifdef}

1. Go to **Data Platform** → **Service instances**.
1. Click the service instance name.
1. On the **General information** tab, copy the connection string:

   - **Kafka Bridge connection string** — to connect from outside the {var(data-p)} cluster;
   - **Kafka Bridge connection string (internal)** — to connect from within the {var(data-p)} cluster.

1. Open a terminal and set an environment variable to the Kafka Bridge address:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   export BRIDGE_URL="<KAFKA_BRIDGE_ADDRESS>"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   $env:BRIDGE_URL = "<KAFKA_BRIDGE_ADDRESS>"
   ```

   {/tab}

   {/tabs}

   Here, `<KAFKA_BRIDGE_ADDRESS>` is the entire copied connection string, including the protocol and port.

1. Check whether Kafka Bridge is running by sending a request to its address at the `/healthy` path:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   curl -i "${BRIDGE_URL}/healthy"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe -i "${env:BRIDGE_URL}/healthy"
   ```

   {/tab}

   {/tabs}

   A `200 OK` response means that Kafka Bridge is running.

1. Check which topics are available through Kafka Bridge:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   curl -i "${BRIDGE_URL}/topics"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe -i "${env:BRIDGE_URL}/topics"
   ```

   {/tab}

   {/tabs}

   A `200 OK` response with a list of topics, which may be empty, confirms access to the Kafka Bridge REST API.
