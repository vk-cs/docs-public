Вы можете получить параметры портов коммутаторов, через которые происходит подключение к сервису Cloud Direct Connect, в личном кабинете или с помощью запроса к API.

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Direct Connect**.

   Отобразится список портов коммутаторов Direct Connect, их статусы и информация о них.

1. Нажмите на имя нужного порта.

   Отобразятся параметры порта:

   - имя физического коммутатора, на котором находится порт;
   - статус порта: `Up` или `Down`;
   - скорость входящего и исходящего трафика в битах в секунду;
   - скорость входящего и исходящего трафика в пакетах в секунду;
   - оптическая мощность входящего и исходящего сигнала.

{/tab}

{tab(API)}

1. [Активируйте](/ru/tools-for-using-services/api/rest-api/enable-api) доступ по API.
1. Установите утилиты [cURL](https://curl.se) и [jq](https://jqlang.org/), если они еще не установлены.
1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`.
1. Получите список всех соединений:

   ```console
    curl -X GET -H "X-Auth-Token: <ТОКЕН>" https://msk.cloud.vk.com/junp/v1/connections/
    ```

    Здесь `<ТОКЕН>` — токен доступа к API.

1. Запишите значение параметра `uuid` из полученного ответа.

    {cut(Пример ответа)}

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

1. Получите подробные данные о порте:

    ```console

    curl -X GET -H "X-Auth-Token: <ТОКЕН>" https://msk.cloud.vk.com/junp/v1/connections/{connectionUuid}

    ```

    Здесь `connectionUuid` — значение параметра `uuid`, полученное при запросе списка соединений.

    {cut(Пример ответа)}

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

    Здесь:

    - `link_status` — статус порта: `Up` или `Down`;
    - `ingress_packets_rate` — скорость входящего трафика в пакетах в секунду;
    - `ingress_bits_rate` — скорость входящего трафика в битах в секунду;
    - `egress_packets_rate` — скорость исходящего трафика в пакетах в секунду;
    - `egress_bits_rate` —  скорость исходящего трафика в битах в секунду;
    - `rx_power` — оптическая мощность входящего сигнала;
    - `tx_power` — оптическая мощность исходящего сигнала.

    {/cut}

{/tab}

{/tabs}

{note:info}

Оптическая мощность может не отображаться, если коммутатор не поддерживает передачу этого параметра.

{/note}
