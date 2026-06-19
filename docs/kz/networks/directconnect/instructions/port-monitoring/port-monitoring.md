# {heading(Коммутатор порттарының күйін қарау)[id=directconnect-port-monitoring]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Direct Connect сервисіне қосылу жүзеге асатын коммутатор порттарының параметрлерін жеке кабинетте немесе API-ге сұрау арқылы ала аласыз.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Direct Connect** бөліміне өтіңіз.

   Direct Connect коммутатор порттарының тізімі, олардың күйлері және олар туралы ақпарат көрсетіледі.

1. Қажетті порттың атауын басыңыз.

   Порт параметрлері көрсетіледі:

   - порт орналасқан физикалық коммутатордың атауы;
   - порт күйі: `Up` немесе `Down`;
   - кіріс және шығыс трафик жылдамдығы, секундтағы битпен;
   - кіріс және шығыс трафик жылдамдығы, секундтағы пакетпен;
   - кіріс және шығыс сигналдың оптикалық қуаты.

{/tab}

{tab(API)}

1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қатынауды белсендіріңіз]}.
1. Егер әлі орнатылмаған болса, [cURL](https://curl.se) және [jq](https://jqlang.org/) утилиталарын орнатыңыз.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=`X-Auth-Token` қатынау токенін алыңыз]}.
1. Барлық қосылымдардың тізімін алыңыз:

   ```console
    curl -X GET -H "X-Auth-Token: <ТОКЕН>" https://kz.cloud.vk.com/junp/v1/connections/
    ```

    Мұнда `<ТОКЕН>` — API-ге қатынау токені.

1. Алынған жауаптан `uuid` параметрінің мәнін жазып алыңыз.

   {cut(Жауап мысалы)}

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

1. Порт туралы толық деректерді алыңыз:

   ```console
   curl -X GET -H "X-Auth-Token: <ТОКЕН>" https://kz.cloud.vk.com/junp/v1/connections/{connectionUuid}
   ```

   Мұнда `connectionUuid` — қосылымдар тізіміне сұрау жасағанда алынған `uuid` параметрінің мәні.

   {cut(Жауап мысалы)}

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

   Мұнда:

   - `link_status` — порт күйі: `Up` немесе `Down`;
   - `ingress_packets_rate` — кіріс трафик жылдамдығы, секундтағы пакетпен;
   - `ingress_bits_rate` — кіріс трафик жылдамдығы, секундтағы битпен;
   - `egress_packets_rate` — шығыс трафик жылдамдығы, секундтағы пакетпен;
   - `egress_bits_rate` — шығыс трафик жылдамдығы, секундтағы битпен;
   - `rx_power` — кіріс сигналдың оптикалық қуаты;
   - `tx_power` — шығыс сигналдың оптикалық қуаты.

   {/cut}

{/tab}

{/tabs}

{note:info}
Егер коммутатор бұл параметрді беруді қолдамаса, оптикалық қуат көрсетілмеуі мүмкін.
{/note}
