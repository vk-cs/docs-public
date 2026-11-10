# {heading(VPN қосылымын жасау)[id=terraform-vpn]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада Terraform көмегімен VPN-қосылымын жасау және баптау мысалы келтірілген.

Нұсқаулықтың қадамдарын орындау арқылы сіз:

1. {linkto(#terraform-vpn-create-file)[text=Жасайсыз]} конфигурация файлын.
1. {linkto(#terraform-vpn-add-net)[text=Қосасыз]} виртуалды желі үшін ресурстар мен деректер көздерін.
1. {linkto(#terraform-vpn-add-vpn)[text=Қосасыз]} VPN-қосылымы үшін ресурсты.
1. {linkto(#terraform-vpn-create-connection)[text=Жасайсыз]} қосылған ресурстарды.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Дайындық қадамдары

1. {linkto(/kz/tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймақта]} желілерді жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әр түрлі аймақтарда әр түрлі квоталар қолданылуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Егер бұрын жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.
1. Провайдер баптаулары бар файлды жобамен жұмыс жасайтын каталогқа орналастырыңыз және осы каталогтан команда орындаңыз:

    ```console
    terraform init
    ```
    Terraform инициализациясының аяқталуын күтіңіз.

## {heading({counter(terraform-vpn)}. Конфигурация файлын жасаңыз)[id=terraform-vpn-create-file]}

Жобамен жұмыс жасайтын каталогта `vpn.tf` файлын жасаңыз. Бұл файлда жасалатын қосылымның конфигурациясы сипатталады.

## {heading({counter(terraform-vpn)}. Виртуалды желіні қосыңыз)[id=terraform-vpn-add-net]}

1. Қолданылатын {linkto(/kz/networks/vnet/concepts/sdn#vnet-sdn)[text=SDN-ге]} байланысты `vpn.tf` файлына төмендегі қойындылардың бірінің мазмұнын көшіріңіз.

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

    Желіні жасау үшін келесі нысандар қажет:

    - Ресурстар (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — ВМ жасалатын желі.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — осы желідегі ішкі желі.
      - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md) — жеке желіні сыртқы желілермен байланыстыратын маршрутизатор.
      - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md) — маршрутизаторды ішкі желіге қосатын интерфейс.

    - Деректер көзі (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — маршрутизатордың публичный IP-мекенжайын алуы және жеке желінің нысандарына Floating IP-мекенжайын бөлу үшін сыртқы желі.

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

    Желіні жасау үшін келесі нысандар қажет:

    - Ресурстар (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — ВМ жасалатын желі.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — осы желідегі ішкі желі.
      - [vkcs_dc_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_router.md) — жеке желіні сыртқы желілермен байланыстыратын маршрутизатор.
      - [vkcs_dc_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_interface.md) — маршрутизаторды ішкі және сыртқы желіге қосатын интерфейс.

    - Деректер көзі (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — публичный IP-мекенжай алу үшін сыртқы желі.

    {/tab}

    {/tabs}

1. Қосылымыңыз үшін баптау мәндерін өңдеңіз.

Terraform көмегімен виртуалды желілерді жасау туралы толығырақ — {linkto(/kz/tools-for-using-services/terraform/how-to-guides/vnet/network#terraform-network)[text=Желілерді жасау]} тәжірибелік нұсқаулығында.

## {heading({counter(terraform-vpn)}. VPN-қосылымын қосыңыз)[id=terraform-vpn-add-vpn]}

1. `vpn.tf` файлына VPN-қосылымының баптауларын көшіріңіз:

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

    VPN-қосылымын қосу үшін келесі ресурстар қолданылады:

    - [vkcs_vpnaas_service](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_service.md) — VK Cloud ішіндегі VPN сервисін басқарады. `router_id` — маршрутизатордың ID-сы параметрін қамтиды. Осы параметрдің мәнін өзгертсеңіз, жаңа сервис жасалады. Бар маршрутизаторды қолдану қажет болса, деректер көзін қолданып, оның ID-сын (`data.vkcs_networking_router.router.id` немесе `data.vkcs_dc_router.router.id`) көрсетіңіз.

      {cut(Мысал)}

      ```hcl
      data "vkcs_networking_router" "router" {
        name = "router_1"
      }
      ```
      {/cut}

    - [vkcs_vpnaas_ipsec_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ipsec_policy.md) — VK Cloud ішіндегі ресурс IPSec-саясатын басқарады. `name` — жасалатын саясаттың атауы параметрін қамтиды. Осы параметрдің мәнін өзгертсеңіз, бар саясаттың атауы өзгереді.

    - [vkcs_vpnaas_ike_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ike_policy.md) — VK Cloud ішіндегі ресурс IKE-саясатын басқарады. `name` — жасалатын саясаттың атауы параметрін қамтиды. Осы параметрдің мәнін өзгертсеңіз, бар саясаттың атауы өзгереді.

    - [vkcs_vpnaas_endpoint_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_endpoint_group.md) — VK Cloud ішіндегі эндпоинттар тобын басқарады. Келесі параметрлерді қамтиды:

      - `type` — топтағы эндпоинттардың түрі. `subnet`, `cidr`, `network`, `router` немесе `vlan` мәндерін қабылдай алады. Осы параметрдің мәндерін өзгертсеңіз, жаңа топ жасалады.
      - `endpoints` — эндпоинттар тобына қосылатын бірдей түрдегі эндпоинттар тізімі. Тізім элементтерінің түрі `type` параметрімен анықталады. `endpoints` параметрінің мәнін өзгертсеңіз, жаңа топ жасалады.

    - [vkcs_vpnaas_site_connection](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_site_connection.md) — VK Cloud ішіндегі сайт IPSec-қосылымының ресурсын басқарады. Келесі параметрлерді қамтиды:

      - `name` — қосылымның атауы. Осы параметрдің мәнін өзгертсеңіз, бар қосылымның атауы өзгереді.
      - `ikepolicy_id` — IKE-саясатының ID-сы. Осы параметрдің мәнін өзгертсеңіз, жаңа қосылым жасалады.
      - `ipsecpolicy_id` — IPsec-саясатының ID-сы. Осы параметрдің мәнін өзгертсеңіз, жаңа қосылым жасалады.
      - `vpnservice_id` — VPN-сервисінің ID-сы. Осы параметрдің мәнін өзгертсеңіз, жаңа қосылым жасалады.
      - `psk` — публичный кілт. `string` түріндегі кез келген мәндерді қабылдайды.
      - `peer_address` — peer-шлюзінің FQDN немесе публичный IP-мекенжайы (IPv4 немесе IPv6).
      - `peer_id` — аутентификациядан өту үшін peer-роутерінің ID-сы. `<IPv4_МЕКЕНЖАЙ>`, `<IPv6_МЕКЕНЖАЙ>`, `<EMAIL>`, `<KEY_ID>`, `<FQDN>` түрлеріндегі мәндерді қабылдай алады. Әдетте бұл параметрдің мәні `peer_address` параметрінің мәнімен сәйкес келеді. Осы параметрдің мәнін өзгертсеңіз, бар қосылымның саясаты өзгереді.
      - `local_ep_group_id` — жергілікті қосылымның жеке ішкі желілерін қамтитын эндпоинттар тобының ID-сы. `peer_cidrs` мәндері VPN-сервисінің `subnet_id` мәнімен бірге берілген кері үйлесімділік режимі қосылмаған болса, `peer_ep_group_id` параметрін көрсетуді талап етеді. Осы параметрдің мәнін өзгертсеңіз, бар қосылым өзгереді.
      - `peer_ep_group_id` — peer-қосылымының жеке CIDR-мекенжайларын `<IP-МЕКЕНЖАЙ>/<ПРЕФИКС>` форматында қамтитын эндпоинттар тобының ID-сы. `peer_cidrs` мәндері VPN-сервисінің `subnet_id` мәнімен бірге берілген кері үйлесімділік режимі қосылмаған болса, `local_ep_group_id` параметрін көрсетуді талап етеді.
      - `dpd` — Dead Peer Detection (DPD) хаттамасының баптаулары сөздігі. Келесі ресурстарды қамтиды:

        - `action` — DPD әрекеті. Мүмкін мәндер: `clear`, `hold`, `restart`, `disabled`, `restart-by-peer`. Әдепкі мәні: `hold`.
        - `timeout` — секундтағы DPD тайм-ауты. `interval` мәнінен үлкен `positive integer` түріндегі деректерді қабылдайды. Әдепкі мәні: `120`.
        - `interval` — секундтағы DPD интервалы. `positive integer` түріндегі деректерді қабылдайды. Әдепкі мәні: `30`.

      - `depends_on` — VPN-қосылымы көрсетілген ресурстар жасалғаннан кейін іске қосылады.

1. Қосылымыңыз үшін баптау мәндерін өңдеңіз.

## {heading({counter(terraform-vpn)}. VPN-қосылымын жасаңыз)[id=terraform-vpn-create-connection]}

1. `vpn.tf` файлы орналасқан каталогқа өтіңіз.
1. Конфигурация файлдары дұрыс екеніне және қажетті өзгерістерді қамтитынына көз жеткізіңіз:

    ```console
    terraform validate && terraform plan
    ```

1. Өзгерістерін қолданыңыз:

    ```console
    terraform apply
    ```

    Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(terraform-vpn)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-vpn-check]}

Желі мен инфрақұрылымның сәтті жасалғанына көз жеткізіңіз:

1. VK Cloud жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app/).
1. **Виртуалды желілер** → **VPN** бөліміне өтіңіз. VPN-қосылымы жасалғанына және мысалда қосылған барлық ресурстарды қамтитынына көз жеткізіңіз.

## Қолданылмайтын ресурстарды жойыңыз

Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан каталогқа өтіңіз.
1. Команда орындаңыз:

    ```console
    terraform destroy
    ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.