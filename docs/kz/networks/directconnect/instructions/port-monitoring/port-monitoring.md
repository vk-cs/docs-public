
# {heading(Коммутатор порттарын бақылау)[id=directconnect-port-monitoring]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Коммутатор порттарының жағдайын қарау)[id=directconnect-port-state]}

Cloud Direct Connect қызметіне қосылу жүзеге асатын коммутатор порттарының параметрлерін жеке кабинетте немесе API сұранысы арқылы алуға болады.

{tabs}

{tab(Жеке кабинет)}

1. [Өз кабинетіңізге өтіңіз](https://kz.cloud.vk.kz/app/) {var(cloud)}.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Direct Connect** бөліміне өтіңіз.

   Direct Connect коммутатор порттарының тізімі, олардың жағдайы және ақпараттары көрсетіледі.

1. Қажетті порттың атын басыңыз.

   **Жалпы ақпарат** вкладкасында порттың параметрлері көрсетіледі:

   - порт орналасқан физикалық коммутатордың аты;
   - порттың жағдайы: `Up` немесе `Down`;
   - секундтығы битпен өлшенетін кіріс және шығыс трафик жылдамдығы;
   - секундтығы пакетпен өлшенетін кіріс және шығыс трафик жылдамдығы;
   - кіріс және шығыс сигналдарының оптикалық қуаты.

{/tab}

{tab(API)}

1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=API]} арқылы қолжетімділікті белсендіріңіз.
1. Егер орнатылмаған болса, [cURL](https://curl.se) және [jq](https://jqlang.org/) утилиталарын орнатыңыз.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Алыңыз]} `X-Auth-Token` қолжетімділік токенын.
1. Барлық қосылыстардың тізімін алыңыз:

   ```console
    curl -X GET -H "X-Auth-Token: <ТОКЕН>" https://kz.cloud.vk.kz/junp/v1/connections/
    ```

    Мұнда `<ТОКЕН>` — API-ға қолжетімділік токены.

1. Алынған жауаптан `uuid` параметрінің мәнін жазып алыңыз.

   {cut(Жауап үлгісі)}

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

1. Порт туралы толық ақпаратты алыңыз:

   ```console
   curl -X GET -H "X-Auth-Token: <ТОКЕН>" https://kz.cloud.vk.kz/junp/v1/connections/{connectionUuid}
   ```

   Мұнда `connectionUuid` — қосылыстар тізімін сұрау кезінде алынған `uuid` параметрінің мәні.

   {cut(Жауап үлгісі)}

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

   Мұнда:

   - `link_status` — порттың жағдайы: `Up` немесе `Down`;
   - `last_flapped` — жағдайдың соңғы өзгерген уақыты;
   - `ingress_packets_rate` — секундтығы пакетпен өлшенетін кіріс трафик жылдамдығы;
   - `ingress_bits_rate` — секундтығы битпен өлшенетін кіріс трафик жылдамдығы;
   - `egress_packets_rate` — секундтығы пакетпен өлшенетін шығыс трафик жылдамдығы;
   - `egress_bits_rate` — секундтығы битпен өлшенетін шығыс трафик жылдамдығы;
   - `rx_power` — кіріс сигналдың оптикалық қуаты;
   - `tx_power` — шығыс сигналдың оптикалық қуаты.

   {/cut}

{/tab}

{/tabs}

{note:info}
Коммутатор бұл параметрді қолдамаған жағдайда оптикалық қуат көрсетілмеуі мүмкін.
{/note}

## {heading(Жағдай графикаларын қарау)[id=directconnect-port-dashboards]}

{tabs}

{tab(Жеке кабинет)}

1. [Өз кабинетіңізге өтіңіз](https://kz.cloud.vk.kz/app/) {var(cloud)}.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Direct Connect** бөліміне өтіңіз.

   Direct Connect коммутатор порттарының тізімі, олардың жағдайы және ақпараттары көрсетіледі.

1. Қажетті порттың атын басыңыз.
1. **Бақылау** вкладкасына өтіңіз.
1. Графикте көрсетілетін деректерді анықтау үшін кезеңді баптаңыз.

   Таңдалған кезең үшін келесі метрикалар бойынша жиналған жағдай графикалары көрсетіледі:

   - порттың жағдайы (`Up` немесе `Down`) және жағдайдың соңғы өзгерген уақыты;
   - секундтығы битпен өлшенетін кіріс және шығыс трафик жылдамдығы;
   - секундтығы пакетпен өлшенетін кіріс және шығыс трафик жылдамдығы;
   - кіріс және шығыс сигналдарының оптикалық қуаты.
{/tab}

{/tabs}

{note:info}
Порттың жағдайындағы өзгерістер {linkto(../../../../monitoring-services/event-log/instructions/view-event-log#event-log-manage)[text=оқиғалар журналына]} Cloud Audit қызметінің де жазылады.
{/note}
