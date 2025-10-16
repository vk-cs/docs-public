You can obtain the parameters of the switch ports used for the Cloud Direct Connect service connection in the management console or through an API request.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/) the VK Cloud management console.
1. Select a project.
1. Go to **Cloud networks** → **Direct Connect**.

   A list of Direct Connect switch ports, their statuses, and information about them will be displayed.

1. Click the name of the required port.

   The port parameters will be displayed:

   - the name of the physical switch where the port is located
   - port status: `Up` or `Down`
   - incoming and outgoing traffic rate in bits per second
   - incoming and outgoing traffic rate in packets per second
   - optical power of the incoming and outgoing signal

{/tab}

{tab(API)}

1. [Enable](/en/tools-for-using-services/api/rest-api/enable-api) API access.
1. Install [cURL](https://curl.se) and [jq](https://jqlang.org/) utilities if they are not already installed.
1. [Get](/en/tools-for-using-services/api/rest-api/case-keystone-token) an `X-Auth-Token` access token.
1. Get a list of all connections:

   ```console
    curl -X GET -H "X-Auth-Token: <TOKEN>" https://msk.cloud.vk.com/junp/v1/connections/
    ```

    Here `<TOKEN>` is the API access token.

1. Write down the value of the `uuid` parameter from the received response.

    {cut(Response example)}

    ```json

    [
      {
        "created_at": "2025-05-07T08:39:10.897867Z",
        "error_message": "string",
        "network_was_created": true,
        "status": "creating",
        "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "vni": 0,
        "availability_zone": "string",
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "project_id": "c0f86ff27eed95ede364764d37d5bf58",
        "noc": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "client_name": "",
          "switch": "string",
          "port": "string",
          "port_description": "eJ3t-GEdnh6VrRJy3bPqzURcDu12un3t",
          "native_vlan": true,
          "vlan": 3999,
          "vni": 0,
          "import_route_target": [
            "string"
          ],
          "export_route_target": [
            "string"
          ],
          "status": "string",
          "link_status": "string"
        }
      }
    ]

    ```

    {/cut}

1. Get detailed port data:

    ```console

    curl -X GET -H "X-Auth-Token: <TOKEN>" https://msk.cloud.vk.com/junp/v1/connections/{connectionUuid}

    ```

    Here `connectionUuid` is the value of the `uuid` parameter obtained when requesting the connections list.

    {cut(Response example)}

    ```json

    {
      "created_at": "2025-05-07T08:39:10.897867Z",
      "error_message": "string",
      "network_was_created": true,
      "status": "creating",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vni": 0,
      "availability_zone": "string",
      "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "project_id": "73d1f21eca4f6975e4f9e6a4c1c5871f",
      "noc": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "client_name": "X4V3eauTi8B4P7ulM3pQLRpgUg",
        "switch": "string",
        "port": "string",
        "port_description": "7rVCLOt7XALCXK_u4F",
        "native_vlan": true,
        "vlan": 3999,
        "vni": 0,
        "import_route_target": [
          "string"
        ],
        "export_route_target": [
          "string"
        ],
        "status": "string",
        "link_status": "string",
        "ingress_packets_rate": 0,
        "ingress_bits_rate": 0,
        "egress_packets_rate": 0,
        "egress_bits_rate": 0,
        "rx_power": [
          0
        ],
        "tx_power": [
          0
        ]
      }
    }

    ```

    Here:

    - `link_status` — port status: `Up` or `Down`
    - `ingress_packets_rate` — incoming traffic rate in packets per second
    - `ingress_bits_rate` — incoming traffic rate in packets per second
    - `egress_bits_rate` — outgoing traffic rate in bits per second
    - `egress_packets_rate` — outgoing traffic rate in packets per second
    - `rx_power` — optical power of the incoming signal
    - `tx_power` — optical power of the outgoing signal

    {/cut}

{/tab}

{/tabs}

{note:info}

Optical power might not be displayed if the switch does not support transmitting of this parameter.

{/note}
