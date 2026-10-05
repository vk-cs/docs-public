# {heading(Switch port monitoring)[id=directconnect-port-monitoring]}

## {heading(Viewing switch port status)[id=directconnect-port-state]}

You can obtain the parameters of switch ports used to connect to the Cloud Direct Connect service via the management console or by making an API request.

{tabs}

{tab(Management Console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Navigate to the **Virtual Networks** → **Direct Connect** section.

   The list of Direct Connect switch ports, their statuses, and related information will be displayed.

1. Click on the name of the required port.

   On the **General Information** tab, the port parameters will be displayed:

   - name of the physical switch where the port is located
   - port status: `Up` or `Down`
   - incoming and outgoing traffic rate in bits per second
   - incoming and outgoing traffic rate in packets per second
   - optical power of the incoming and outgoing signal

{/tab}

{tab(API)}

1. [Activate](../../../../tools-for-using-services/api/rest-api/enable-api) API access.
1. Install [cURL](https://curl.se) and [jq](https://jqlang.org/) utilities if they are not already installed.
1. [Get](../../../../tools-for-using-services/api/rest-api/case-keystone-token) the access token `X-Auth-Token`.
1. Get the list of all connections:

   ```console
    curl -X GET -H "X-Auth-Token: <TOKEN>" https://msk.cloud.vk.ru/junp/v1/connections/
    ```

    Here `<TOKEN>` is the API access token.

1. Record the value of the `uuid` parameter from the received response.

   {cut(Response Example)}

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

1. Get detailed data about the port:

   ```console
   curl -X GET -H "X-Auth-Token: <TOKEN>" https://msk.cloud.vk.ru/junp/v1/connections/{connectionUuid}
   ```

   Here `connectionUuid` is the value of the `uuid` parameter obtained when requesting the list of connections.

   {cut(Response Example)}

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
        "last_flapped": "2024-12-19 10:30:45",
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
   - `last_flapped` — time of the last status change
   - `ingress_packets_rate` — incoming traffic rate in packets per second
   - `ingress_bits_rate` — incoming traffic rate in bits per second
   - `egress_packets_rate` — outgoing traffic rate in packets per second
   - `egress_bits_rate` — outgoing traffic rate in bits per second
   - `rx_power` — optical power of the incoming signal
   - `tx_power` — optical power of the outgoing signal

   {/cut}

{/tab}

{/tabs}

{note:info}
Optical power may not be displayed if the switch does not support transmitting this parameter.
{/note}

## {heading(Viewing status dashboards)[id=directconnect-port-dashboards]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select a project.
1. Navigate to the **Virtual Networks** → **Direct Connect** section.

   The list of Direct Connect switch ports, their statuses, and related information will be displayed.

1. Click on the name of the required port.
1. Navigate to the **Monitoring** tab.
1. Configure the period for which data will be displayed on the graph.

   For the selected period, status graphs collected based on the following metrics will be displayed:

   - port status (`Up` or `Down`) and time of the last status flap
   - incoming and outgoing traffic rate in bits per second
   - incoming and outgoing traffic rate in packets per second
   - optical power of incoming and outgoing signals
{/tab}

{/tabs}

{note:info}
Port status changes are also recorded in the [event log](../../../../monitoring-services/event-log/instructions/view-event-log) of the Cloud Audit service.
{/note}
