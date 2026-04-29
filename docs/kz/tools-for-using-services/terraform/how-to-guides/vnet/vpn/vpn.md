{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Terraform-ды [орнатып, баптағаныңызға](../../../quick-start) көз жеткізіңіз.

{/note}

VPN қосылымын жасау үшін жасалатын қосылым конфигурациясы сипатталатын `vpn.tf` файлын жасаңыз. Төмендегі мысалдардағы мәтінді қосып, қосылымыңыз үшін баптау мәндерін түзетіңіз.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Виртуалды желіні жасау)[id=terraform-vpn-create-net]}

VPN қосылымын жасау үшін роутері бар виртуалды желі қажет болады. Егер сізде желі мен роутер бұрыннан бар болса, [VPN қосылымын жасау](#terraform-vpn-create-connect) бөліміне өтіңіз.

Келесі объектілері бар желіні жасаңыз:

- Ресурстар (resource):

  - `vkcs_networking_network`: ВМ жасалатын желі. Төмендегі мысалда `extnet` атауымен желі жасалады.
  - `vkcs_networking_subnet`: желіден алынған ішкі желі. Мысалда: `subnet`.
  - `vkcs_networking_router`: сыртқы желіге және сыртқы әлеммен өзара әрекеттесуге арналған роутер. Мысалда: `router`.
  - `vkcs_networking_router_interface`: роутерді ішкі желіге қосады.

- Дереккөздер (data source):

  - `vkcs_networking_network`: Floating IP (floating IP) алу үшін сыртқы желі.

```hcl
data "vkcs_networking_network" "extnet" {
  name = "internet"
}

resource "vkcs_networking_network" "network" {
  name = "vpnaas_network"
}

resource "vkcs_networking_subnet" "subnet" {
  network_id = "${vkcs_networking_network.network.id}"
  cidr = "192.168.199.0/24"
}

resource "vkcs_networking_router" "router" {
  name = "router"
  external_network_id = data.vkcs_networking_network.extnet.id
}

resource "vkcs_networking_router_interface" "router_interface" {
  router_id = "${vkcs_networking_router.router.id}"
  subnet_id = "${vkcs_networking_subnet.subnet.id}"
}
```

## {heading(VPN қосылымын жасау)[id=terraform-vpn-create-connect]}

VPN қосылымын жасау үшін келесі объектілер қажет болады:

- `vkcs_vpnaas_service`: VK Cloud ішіндегі VPN сервисін басқарады. Келесі параметрді қамтиды:

  - `router_id`: роутердің ID-і. Бұл параметр мәнінің өзгеруі жаңа сервис жасайды. Егер бар роутерді пайдалану қажет болса, оның ID-ін (data.vkcs_networking_router.router.id) дереккөзді пайдаланып көрсетіңіз:

  ```hcl
  data "vkcs_networking_router" "router" {
    name = "router_1"
  }
  ```

- `vkcs_vpnaas_ipsec_policy`: VK Cloud ішіндегі ресурс IPSec саясатын басқарады. Келесі параметрді қамтиды:

  - `name`: жасалатын саясаттың атауы. Бұл параметр мәнінің өзгеруі бар саясаттың атауын өзгертеді.

- `vkcs_vpnaas_ike_policy`: VK Cloud ішіндегі ресурс IKE саясатын басқарады. Келесі параметрді қамтиды:

  - `name`: жасалатын саясаттың атауы. Бұл параметр мәнінің өзгеруі бар саясаттың атауын өзгертеді.

- `vkcs_vpnaas_endpoint_group`: VK Cloud ішіндегі «endpoint тобы» ресурсын басқарады. Келесі параметрді қамтиды:

  - `type`: топтағы endpoint түрі. `subnet`, `cidr`, `network`, `router` немесе `vlan` мәндерін қабылдай алады. Бұл параметр мәнінің өзгеруі жаңа топ жасайды.
  - `endpoints`: endpoint тобына қосылатын бірдей типтегі endpoint тізімі. Тізім элементтерінің типі `type` параметрімен анықталады. `endpoints` параметрі мәнінің өзгеруі жаңа топ жасайды.

- `vkcs_vpnaas_site_connection`: VK Cloud ішіндегі IPSec site connection ресурсын басқарады. Келесі параметрлерді қамтиды:

  - `name`: қосылым атауы. Бұл параметр мәнінің өзгеруі бар қосылымның атауын өзгертеді.
  - `ikepolicy_id`: IKE саясатының ID-і. Бұл параметр мәнінің өзгеруі жаңа қосылым жасайды.
  - `ipsecpolicy_id`: IPsec саясатының ID-і. Бұл параметр мәнінің өзгеруі жаңа қосылым жасайды.
  - `vpnservice_id`: VPN сервисінің ID-і. Бұл параметр мәнінің өзгеруі жаңа қосылым жасайды.
  - `psk`: ашық кілт. `string` типіндегі кез келген мәндерді қабылдайды.
  - `peer_address`: peer-шлюздің ашық IPv4 немесе IPv6 мекенжайы немесе FQDN.
  - `peer_id`: аутентификациядан өтуге арналған peer-роутердің ID-і. Келесі мәндерді қабылдай алады: `адрес IPv4`, `адрес IPv6`, `e-mail`, `key ID`, `FQDN`. Әдетте бұл параметрдің мәні `peer_address` параметрінің мәнімен сәйкес келеді. Бұл параметр мәнінің өзгеруі бар қосылымның саясатын өзгертеді.
  - `local_ep_group_id`: жергілікті қосылымның жеке ішкі желілерін қамтитын endpoint тобының ID-і. Кері үйлесімділік режимі қосылмаған болса, `peer_ep_group_id` параметрін көрсетуді талап етеді, мұнда `peer_cidrs` мәндері VPN сервисінің `subnet_id` мәнімен бірге беріледі. Бұл параметр мәнінің өзгеруі бар қосылымды өзгертеді.
  - `peer_ep_group_id`: `<net_adress>/<префикс>` форматындағы peer-қосылымның жеке CIDR мекенжайларын қамтитын endpoint тобының ID-і. Кері үйлесімділік режимі қосылмаған болса, `local_ep_group_id` параметрін көрсетуді талап етеді, мұнда `peer_cidrs` мәндері VPN сервисінің `subnet_id` мәнімен бірге беріледі.
  - `dpd`: Dead Peer Detection (DPD) хаттамасына арналған баптаулар сөздігі. Келесі ресурстарды қамтиды:

    - `action`: DPD әрекеті. Мүмкін мәндер: `clear`, `hold`, `restart`, `disabled`, `restart-by-peer`. Әдепкі мәні: `hold`.
    - `timeout`: секундпен берілетін DPD тайм-ауты. `positive integer` мәнінен үлкен `interval` типіндегі деректер қабылданады. Әдепкі мәні: `120`.
    - `interval`: секундпен берілетін DPD интервалы. `positive integer` типіндегі деректер қабылданады. Әдепкі мәні: `30`.

  - `depends_on`: VPN қосылымы көрсетілген ресурстар жасалғаннан кейін іске қосылады.

```hcl
resource "vkcs_vpnaas_service" "service" {
    router_id = "${vkcs_networking_router.router.id}"
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
	endpoints = [ "${vkcs_networking_subnet.subnet.id}" ]
}

resource "vkcs_vpnaas_site_connection" "connection" {
	name = "connection"
	ikepolicy_id = "${vkcs_vpnaas_ike_policy.policy_2.id}"
	ipsecpolicy_id = "${vkcs_vpnaas_ipsec_policy.policy_1.id}"
	vpnservice_id = "${vkcs_vpnaas_service.service.id}"
	psk = "secret"
	peer_address = "192.168.10.1"
	peer_id = "192.168.10.1"
	local_ep_group_id = "${vkcs_vpnaas_endpoint_group.group_2.id}"
	peer_ep_group_id = "${vkcs_vpnaas_endpoint_group.group_1.id}"
	dpd {
		action   = "restart"
		timeout  = 42
		interval = 21
	}
	depends_on = ["vkcs_networking_router_interface.router_interface"]
}
```

Мысалдың екі бөлігін де `vpn.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```
