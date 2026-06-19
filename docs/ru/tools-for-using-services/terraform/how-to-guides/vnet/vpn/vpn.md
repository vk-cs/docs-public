# {heading(Создание VPN соединения)[id=terraform-vpn]}

В статье приведен пример создания и настройки VPN-соединения при помощи Terraform.

Пройдя шаги инструкции вы:

1. {linkto(#terraform-vpn-create-file)[text=Создадите]} файл конфигурации.
1. {linkto(#terraform-vpn-add-net)[text=Добавите]} ресурсы и источники данных для виртуальной сети.
1. {linkto(#terraform-vpn-add-vpn)[text=Добавите]} ресурс для VPN-соединения.
1. {linkto(#terraform-vpn-create-connection)[text=Создадите]} добавленные ресурсы.

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Подготовительные шаги

1. Проверьте {linkto(/ru/tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоты]}. Убедитесь, что в выбранном {linkto(/ru/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионе]} достаточно ресурсов для создания сетей. В разных регионах могут действовать разные квоты.

   При необходимости {linkto(/ru/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=увеличьте]} квоты.

1. {linkto(../../../quick-start#terraform-quick-start)[text=Установите Terraform и настройте провайдер]}, если этого еще не сделано.
1. Поместите файл с настройками провайдера в директорию, из которой вы будете работать с проектом, и из этой директории выполните команду:

    ```console
    terraform init
    ```
    Дождитесь завершения инициализации Terraform.

## {heading({counter(terraform-vpn)}. Создайте файл конфигурации)[id=terraform-vpn-create-file]}

В директории, из которой вы будете работать с проектом, создайте файл `vpn.tf`. В этом файле будет описана конфигурация создаваемого подключения.

## {heading({counter(terraform-vpn)}. Добавьте виртуальную сеть)[id=terraform-vpn-add-net]}

1. В зависимости от используемой {linkto(/ru/networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} скопируйте в файл `vpn.tf` содержимое одной из вкладок ниже.

    {tabs}

    {tab(Neutron)}

    ```hcl
    data "vkcs_networking_network" "extnet" {
      name = "ext-net"
    }

    resource "vkcs_networking_network" "network" {
      name = "vpnaas_network"
      sdn  = "neutron"
    }

    resource "vkcs_networking_subnet" "subnet" {
      name = "vpnaas_subnet"
      network_id = vkcs_networking_network.network.id
      cidr = "192.168.199.0/24"
    }

    resource "vkcs_networking_router" "router" {
      name = "router"
      sdn  = "neutron"
      external_network_id = data.vkcs_networking_network.extnet.id
    }

    resource "vkcs_networking_router_interface" "router_interface" {
      router_id = vkcs_networking_router.router.id
      subnet_id = vkcs_networking_subnet.subnet.id
    }
    ```

    Для создания сети потребуются следующие объекты:

    - Ресурсы (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — сеть, в которой будет создана ВМ.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — подсеть в этой сети.
      - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md) — маршрутизатор, соединяющий приватную сеть с внешними сетями.
      - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md) — интерфейс, который подключает маршрутизатор к внутренней сети.

    - Источник данных (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — внешняя сеть для получения публичного IP-адреса маршрутизатором, а также выделения Floating IP-адреса сущностям приватной сети.

    {/tab}

    {tab(Sprut)}

    ```hcl
    data "vkcs_networking_network" "extnet" {
      name = "internet"
    }

    resource "vkcs_networking_network" "network" {
      name = "vpnaas_network"
      sdn  = "sprut"
    }

    resource "vkcs_networking_subnet" "subnet" {
      name = "vpnaas_subnet"
      network_id = vkcs_networking_network.network.id
      cidr = "192.168.199.0/24"
    }

    resource "vkcs_dc_router" "router" {
      name = "router"
      sdn  = "sprut"
    }

    resource "vkcs_dc_interface" "interface_1" {
      name         = "LAN"
      dc_router_id = vkcs_dc_router.router.id
      network_id   = vkcs_networking_network.network.id
      subnet_id    = vkcs_networking_subnet.subnet.id
      ip_address   = vkcs_networking_subnet.subnet.gateway_ip
    }

    resource "vkcs_dc_interface" "interface_2" {
      name         = "WAN"
      dc_router_id = vkcs_dc_router.router.id
      network_id   = data.vkcs_networking_network.extnet.id
    }
    ```

    Для создания сети потребуются следующие объекты:

    - Ресурсы (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — сеть, в которой будет создана ВМ.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — подсеть в этой сети.
      - [vkcs_dc_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_router.md) — маршрутизатор, соединяющий приватную сеть с внешними сетями.
      - [vkcs_dc_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_interface.md) — интерфейс, который подключает маршрутизатор к внутренней и внешней сети.

    - Источник данных (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — внешняя сеть для получения публичного IP-адреса.

    {/tab}

    {/tabs}

1. Отредактируйте значения настроек для вашего подключения.

Подробнее о создании виртуальных сетей с помощью Terraform — в практическом руководстве {linkto(/ru/tools-for-using-services/terraform/how-to-guides/vnet/network#terraform-network)[text=Создание сетей]}.

## {heading({counter(terraform-vpn)}. Добавьте VPN-соединение)[id=terraform-vpn-add-vpn]}

1. Скопируйте в файл `vpn.tf` настройки VPN-соединения:

    ```hcl
    resource "vkcs_vpnaas_service" "service" {
        router_id = vkcs_networking_router.router.id
    }

    resource "vkcs_vpnaas_ipsec_policy" "policy_1" {
        name = "ipsec-policy"
    }

    resource "vkcs_vpnaas_ike_policy" "policy_2" {
        name = "ike-policy"
    }

    resource "vkcs_vpnaas_endpoint_group" "group_1" {
      type = "cidr"
      endpoints = ["10.0.0.24/24", "10.0.0.25/24"]
    }
    resource "vkcs_vpnaas_endpoint_group" "group_2" {
      type = "subnet"
      endpoints = [ vkcs_networking_subnet.subnet.id ]
    }

    resource "vkcs_vpnaas_site_connection" "connection" {
      name = "connection"
      ikepolicy_id = vkcs_vpnaas_ike_policy.policy_2.id
      ipsecpolicy_id = vkcs_vpnaas_ipsec_policy.policy_1.id
      vpnservice_id = vkcs_vpnaas_service.service.id
      psk = "secret"
      peer_address = "192.168.10.1"
      peer_id = "192.168.10.1"
      local_ep_group_id = vkcs_vpnaas_endpoint_group.group_2.id
      peer_ep_group_id = vkcs_vpnaas_endpoint_group.group_1.id
      dpd {
        action   = "restart"
        timeout  = 42
        interval = 21
      }
      depends_on = [vkcs_networking_router_interface.router_interface]
    }
    ```

    Для добавления VPN-соединения используются следующие ресурсы:

    - [vkcs_vpnaas_service](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_service.md) — управляет сервисом VPN внутри VK Cloud. Включает в себя параметр `router_id` — ID маршрутизатора. Изменив значение этого параметра, вы создадите новый сервис. Если необходимо использовать существующий маршрутизатор, укажите его ID (`data.vkcs_networking_router.router.id` или `data.vkcs_dc_router.router.id`), используя источник данных.

      {cut(Пример)}

      ```hcl
      data "vkcs_networking_router" "router" {
        name = "router_1"
      }
      ```
      {/cut}

    - [vkcs_vpnaas_ipsec_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ipsec_policy.md) — управляет IPSec-политикой ресурса внутри VK Cloud. Включает в себя параметр `name` — имя создаваемой политики. Изменив значение этого параметра, вы поменяете имя существующей политики.

    - [vkcs_vpnaas_ike_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ike_policy.md) — управляет IKE-политикой ресурса внутри VK Cloud. Включает в себя параметр `name` — имя создаваемой политики. Изменив значение этого параметра, вы поменяете имя существующей политики.

    - [vkcs_vpnaas_endpoint_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_endpoint_group.md) — управляет группой эндпоинтов внутри VK Cloud. Включает в себя следующие параметры:

      - `type` — тип эндпоинтов в группе. Может принимать значения `subnet`, `cidr`, `network`, `router` или `vlan`. Изменив значения этого параметра, вы создадите новую группу.
      - `endpoints` — список эндпоинтов одинакового типа, включаемых в группу эндпоинтов. Тип элементов списка определяется параметром `type`. Изменив значение параметра `endpoints`, вы создадите новую группу.

    - [vkcs_vpnaas_site_connection](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_site_connection.md) — управляет ресурсом IPSec-подключения сайта внутри VK Cloud. Включает в себя следующие параметры:

      - `name` — имя соединения. Изменив значение этого параметра, вы измените имя существующего подключения.
      - `ikepolicy_id` — ID IKE-политики. Изменив значение этого параметра, вы создадите новое соединение.
      - `ipsecpolicy_id` — ID IPsec-политики. Изменив значение этого параметра, вы создадите новое соединение.
      - `vpnservice_id` — ID VPN-сервиса. Изменив значение этого параметра, вы создадите новое соединение.
      - `psk` — публичный ключ. Принимает любые значения типа `string`.
      - `peer_address` — FQDN или публичный IP-адрес (IPv4 или IPv6) peer-шлюза.
      - `peer_id` — ID peer-роутера для прохождения аутентификации. Может принимать значения типов `<АДРЕС_IPv4>`, `<АДРЕС_IPv6>`, `<EMAIL>`, `<KEY_ID>`, `<FQDN>`. Обычно значение этого параметра совпадает со значением параметра `peer_address`. Изменив значение этого параметра, вы поменяете политику существующего подключения.
      - `local_ep_group_id` — ID группы эндпоинтов, которая включает в себя частные подсети локального подключения. Требует указания параметра `peer_ep_group_id`, если не включен режим обратной совместимости, где значения `peer_cidrs` уже предоставляются вместе со значением `subnet_id` VPN-сервиса. Изменив значение этого параметра, вы измените существующее подключение.
      - `peer_ep_group_id` — ID группы эндпоинтов, которая включает в себя частные CIDR-адреса peer-подключения в формате `<IP-АДРЕС>/<ПРЕФИКС>`. Требует указания параметра `local_ep_group_id`, если не включен режим обратной совместимости, где  значения `peer_cidrs` уже предоставляются вместе со значением `subnet_id` VPN-сервиса.
      - `dpd` — словарь настроек для протокола Dead Peer Detection (DPD). Включает в себя следующие ресурсы:

        - `action` — действие DPD. Возможные значения: `clear`, `hold`, `restart`, `disabled`, `restart-by-peer`. Значение по умолчанию: `hold`.
        - `timeout` — тайм-аут DPD в секундах. Принимаются данные типа `positive integer`, значения которых больше, чем `interval`. Значение по умолчанию: `120`.
        - `interval` — интервал DPD в секундах. Принимаются данные типа `positive integer`. Значение по умолчанию: `30`.

      - `depends_on` — VPN-соединение запустится после создания указанных ресурсов.

1. Отредактируйте значения настроек для вашего подключения.

## {heading({counter(terraform-vpn)}. Создайте VPN-соединение)[id=terraform-vpn-create-connection]}

1. Перейдите в директорию с файлом `vpn.tf`.
1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

    ```console
    terraform validate && terraform plan
    ```

1. Примените изменения:

    ```console
    terraform apply
    ```

    При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.  

## {heading({counter(terraform-vpn)}. Проверьте применение конфигурации)[id=terraform-vpn-check]}

Убедитесь, что сеть и инфраструктура были успешно созданы:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Виртуальные сети** → **VPN**. Убедитесь, что VPN-соединение создано и содержит все добавленные в примере ресурсы.

## Удалите неиспользуемые ресурсы

Если созданные с помощью Terraform ресурсы больше не нужны, удалите их:

1. Перейдите в директорию с файлами конфигурации Terraform.
1. Выполните команду:

    ```console
    terraform destroy
    ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.
