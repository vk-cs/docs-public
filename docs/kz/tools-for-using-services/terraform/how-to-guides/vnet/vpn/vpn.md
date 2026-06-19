# {heading(VPN қосылымын жасау)[id=terraform-vpn]}

{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Terraform көмегімен VPN-қосылымын жасау және баптау мысалы келтірілген.

Нұсқаулық қадамдарынан өткеннен кейін сіз:

1. {linkto(#terraform-vpn-create-file)[text=Жасайсыз]} конфигурация файлын.
1. {linkto(#terraform-vpn-add-net)[text=Қосасыз]} виртуалды желі үшін ресурстар мен деректер көздерін.
1. {linkto(#terraform-vpn-add-vpn)[text=Қосасыз]} VPN-қосылымы үшін ресурсты.
1. {linkto(#terraform-vpn-create-connection)[text=Жасайсыз]} қосылған ресурстарды.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Дайындық қадамдары

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) желілерді жасауға жеткілікті ресурстар бар екеніне көз жеткізіңіз. Әртүрлі аймақтарда әртүрлі квоталар қолданылуы мүмкін.

   Қажет болса, квоталарды [арттырыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota).

1. Егер әлі жасалмаған болса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.
1. Провайдер баптаулары бар файлды жобамен жұмыс істейтін директорияға орналастырыңыз және осы директориядан команданы орындаңыз:

    ```console
    terraform init
    ```
    Terraform инициализациясының аяқталуын күтіңіз.

## {heading({counter(terraform-vpn)}. Конфигурация файлын жасаңыз)[id=terraform-vpn-create-file]}

Жобамен жұмыс істейтін директорияда `vpn.tf` файлын жасаңыз. Бұл файлда жасалатын қосылымның конфигурациясы сипатталады.

## {heading({counter(terraform-vpn)}. Виртуалды желіні қосыңыз)[id=terraform-vpn-add-net]}

1. Қолданылатын {linkto(/kz/networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} түріне байланысты төмендегі қойындылардың бірінің мазмұнын `vpn.tf` файлына көшіріңіз.

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

    Желіні жасау үшін келесі объектілер қажет болады:

    - Ресурстар (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — ВМ жасалатын желі.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — осы желідегі ішкі желі.
      - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md) — жеке желіні сыртқы желілермен қосатын маршрутизатор.
      - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md) — маршрутизаторды ішкі желіге қосатын интерфейс.

    - Деректер көзі (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — маршрутизатордың жария IP-адрес алуына, сондай-ақ жеке желі мәндеріне Floating IP-адрес бөлуге арналған сыртқы желі.

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

    Желіні жасау үшін келесі объектілер қажет болады:

    - Ресурстар (resource):

      - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md) — ВМ жасалатын желі.
      - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md) — осы желідегі ішкі желі.
      - [vkcs_dc_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_router.md) — жеке желіні сыртқы желілермен қосатын маршрутизатор.
      - [vkcs_dc_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/dc_interface.md) — маршрутизаторды ішкі және сыртқы желіге қосатын интерфейс.

    - Деректер көзі (data source): [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) — жария IP-адрес алу үшін сыртқы желі.

    {/tab}

    {/tabs}

1. Қосылымыңыз үшін баптау мәндерін өңдеңіз.

Terraform көмегімен виртуалды желілерді жасау туралы толығырақ — {linkto(/ru/tools-for-using-services/terraform/how-to-guides/vnet/network#terraform-network)[text=Желілерді жасау]} практикалық нұсқаулығында.

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

    VPN-қосылымын қосу үшін келесі ресурстар пайдаланылады:

    - [vkcs_vpnaas_service](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_service.md) — VK Cloud ішіндегі VPN сервисін басқарады. `router_id` параметрін — маршрутизатордың ID мәнін қамтиды. Осы параметрдің мәнін өзгерту арқылы сіз жаңа сервис жасайсыз. Егер бар маршрутизаторды пайдалану қажет болса, деректер көзін пайдаланып оның ID мәнін (`data.vkcs_networking_router.router.id` немесе `data.vkcs_dc_router.router.id`) көрсетіңіз.

      {cut(Мысал)}

      ```hcl
      data "vkcs_networking_router" "router" {
        name = "router_1"
      }
      ```
      {/cut}

    - [vkcs_vpnaas_ipsec_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ipsec_policy.md) — VK Cloud ішіндегі ресурс үшін IPSec-саясатын басқарады. `name` параметрін — жасалатын саясаттың атауын қамтиды. Осы параметрдің мәнін өзгерту арқылы сіз бар саясаттың атауын өзгертесіз.

    - [vkcs_vpnaas_ike_policy](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_ike_policy.md) — VK Cloud ішіндегі ресурс үшін IKE-саясатын басқарады. `name` параметрін — жасалатын саясаттың атауын қамтиды. Осы параметрдің мәнін өзгерту арқылы сіз бар саясаттың атауын өзгертесіз.

    - [vkcs_vpnaas_endpoint_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_endpoint_group.md) — VK Cloud ішіндегі эндпоинттер тобын басқарады. Келесі параметрлерді қамтиды:

      - `type` — топтағы эндпоинттердің түрі. `subnet`, `cidr`, `network`, `router` немесе `vlan` мәндерін қабылдай алады. Осы параметрдің мәндерін өзгерту арқылы сіз жаңа топ жасайсыз.
      - `endpoints` — эндпоинттер тобына қосылатын бір типтегі эндпоинттер тізімі. Тізім элементтерінің типі `type` параметрімен анықталады. `endpoints` параметрінің мәнін өзгерту арқылы сіз жаңа топ жасайсыз.

    - [vkcs_vpnaas_site_connection](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/vpnaas_site_connection.md) — VK Cloud ішіндегі сайттың IPSec-қосылымы ресурсын басқарады. Келесі параметрлерді қамтиды:

      - `name` — қосылым атауы. Осы параметрдің мәнін өзгерту арқылы сіз бар қосылымның атауын өзгертесіз.
      - `ikepolicy_id` — IKE-саясатының ID мәні. Осы параметрдің мәнін өзгерту арқылы сіз жаңа қосылым жасайсыз.
      - `ipsecpolicy_id` — IPsec-саясатының ID мәні. Осы параметрдің мәнін өзгерту арқылы сіз жаңа қосылым жасайсыз.
      - `vpnservice_id` — VPN сервисінің ID мәні. Осы параметрдің мәнін өзгерту арқылы сіз жаңа қосылым жасайсыз.
      - `psk` — жария кілт. `string` типіндегі кез келген мәндерді қабылдайды.
      - `peer_address` — peer-шлюздің FQDN немесе жария IP-адресі (IPv4 немесе IPv6).
      - `peer_id` — аутентификациядан өту үшін peer-роутердің ID мәні. `<АДРЕС_IPv4>`, `<АДРЕС_IPv6>`, `<EMAIL>`, `<KEY_ID>`, `<FQDN>` типтерінің мәндерін қабылдай алады. Әдетте бұл параметрдің мәні `peer_address` параметрінің мәнімен сәйкес келеді. Осы параметрдің мәнін өзгерту арқылы сіз бар қосылымның саясатын өзгертесіз.
      - `local_ep_group_id` — жергілікті қосылымның жеке ішкі желілерін қамтитын эндпоинттер тобының ID мәні. Кері үйлесімділік режимі қосылмаған болса, `peer_ep_group_id` параметрін көрсетуді талап етеді, онда `peer_cidrs` мәндері VPN сервисінің `subnet_id` мәнімен бірге беріледі. Осы параметрдің мәнін өзгерту арқылы сіз бар қосылымды өзгертесіз.
      - `peer_ep_group_id` — `<IP-АДРЕС>/<ПРЕФИКС>` форматындағы peer-қосылымының жеке CIDR-адрестерін қамтитын эндпоинттер тобының ID мәні. Кері үйлесімділік режимі қосылмаған болса, `local_ep_group_id` параметрін көрсетуді талап етеді, онда `peer_cidrs` мәндері VPN сервисінің `subnet_id` мәнімен бірге беріледі.
      - `dpd` — Dead Peer Detection (DPD) протоколы үшін баптаулар сөздігі. Келесі ресурстарды қамтиды:

        - `action` — DPD әрекеті. Мүмкін мәндер: `clear`, `hold`, `restart`, `disabled`, `restart-by-peer`. Әдепкі мәні: `hold`.
        - `timeout` — секундтардағы DPD тайм-ауты. `positive integer` типіндегі деректер қабылданады, олардың мәндері `interval` мәнінен үлкен. Әдепкі мәні: `120`.
        - `interval` — секундтардағы DPD интервалы. `positive integer` типіндегі деректер қабылданады. Әдепкі мәні: `30`.

      - `depends_on` — VPN-қосылымы көрсетілген ресурстар жасалғаннан кейін іске қосылады.

1. Қосылымыңыз үшін баптау мәндерін өңдеңіз.

## {heading({counter(terraform-vpn)}. VPN-қосылымын жасаңыз)[id=terraform-vpn-create-connection]}

1. `vpn.tf` файлы бар директорияға өтіңіз.
1. Конфигурациялық файлдардың дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

    ```console
    terraform validate && terraform plan
    ```

1. Өзгерістерді қолданыңыз:

    ```console
    terraform apply
    ```

    Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.  

## {heading({counter(terraform-vpn)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-vpn-check]}

Желі мен инфрақұрылымның сәтті жасалғанына көз жеткізіңіз:

1. VK Cloud жеке кабинетіне [өтіңіз](https://cloud.vk.com/app/).
1. **Виртуалды желілер** → **VPN** бөліміне өтіңіз. VPN-қосылымы жасалғанына және мысалда қосылған барлық ресурстарды қамтитынына көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары бар директорияға өтіңіз.
1. Команданы орындаңыз:

    ```console
    terraform destroy
    ```

   Растауды сұрағанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
