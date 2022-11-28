<warn>

Прежде всего убедитесь, что вы [установили Terraform](../../../../additionals/terraform/terraform-installation/) и [создали файл main.tf](../../../../additionals/terraform/terraform-provider-config/) с необходимыми провайдерами.

</warn>

Чтобы создать VPN соединение, создайте файл `vpn.tf`, где будет описана конфигурация создаваемого подключения. Добавьте текст из примеров ниже, и исправьте значения настроек для вашего подключения.

### Создание виртуальной сети

Для создания VPN соединения нам потребуются виртуальная сеть с роутером. Если у вас уже есть существующая сеть и роутер, то перейдите на шаг [Создание VPN соединения](../../terraform/create). Создадим сеть со следующими объектами:

1. Ресурсы (resource):

- **vkcs_networking_network** — сеть, в которой будет создана ВМ. В примере ниже сеть создается с именем «extnet».
- **vkcs_networking_subnet** — подсеть из сети. В примере: «subnet».
- **vkcs_networking_router** — роутер для внешней сети и взаимодействия с внешним миром. В примере: router.
- **vkcs_networking_router_interface** — подключить роутер к внутренней сети.

2. Источники данных (data source):

- **vkcs_networking_network** – внешняя сеть для получения публичного IP (Floating IP).

```hcl
data "vkcs_networking_network" "extnet" {
  name = "ext-net"
}

resource "vkcs_networking_network" "network" {
  name = "vpnaas_network"
}

resource "vkcs_networking_subnet" "subnet" {
 	network_id = "${vkcs_networking_network.network.id}"
 	cidr = "192.168.199.0/24"
 	ip_version = 4
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

### Создание VPN соединения

1. **vkcs_vpnaas_service** — управляет сервисом VPN внутри VK Cloud. Включает в себя следующий параметр:

- router_id — ID роутера. Изменение значения этого параметра создает новый сервис. Если необходимо использовать существующий роутер, то укажите его id (data.vkcs_networking_router.router.id), используя источник данных:

```hcl
data "vkcs_networking_router" "router" {
  name = "router_1"
}
```

2. **vkcs_vpnaas_ipsec_policy** — управляет политикой IPSec ресурса внутри VK Cloud. Включается в себя следующий параметр:

- name — имя создаваемой политики. Изменение значения этого параметра меняет имя существующей политики.

3. **vkcs_vpnaas_ike_policy** — управляет политикой IKE ресурса внутри VK Cloud. Включает в себя следующий параметр:

- name — имя создаваемой политики. Изменение значения этого параметра меняет имя существующей политики.

4. **vkcs_vpnaas_endpoint_group** — управляет ресурсом «группа эндпоинтов» внутри VK Cloud. Включает в себя следующие параметр:

- type — тип эндпоинтов в группе. Принимаются значения типов subnet, cidr, network, router или vlan. Изменение значения этого параметра создает новую группу.
- endpoints — список эндпоинтов одинакового типа, включаемых в группу эндпоинтов. Тип значений зависит от типа эндпоинтов. Изменение значения этого параметра создает новую группу.

5. **vkcs_vpnaas_site_connection** - управляет ресурсом подключения IPSec сайта внутри VK Cloud. Включает в себя следующие параметры:

- name — имя соединения. Изменение значения этого параметра меняет имя существующего подключения.
- ikepolicy_id — ID политики IKE. Изменение значения этого параметра создает новое соединение.
- ipsecpolicy_id — ID политики IPsec. Изменение значения этого параметра создает новое соединение.
- vpnservice_id — ID VPN сервиса. Изменение значения этого параметра создает новое соединение.
- psk — публичный ключ. Принимает любые значения типа «string».
- peer_address — публичный адрес IPv4 или IPv6 peer-шлюза, либо FQDN.
- peer_id — ID peer-роутера для прохождения аутентификации. Принимаются значения типов: адрес IPv4, адрес IPv6, e-mail, key ID, FQDN. Обычно значение этого параметра совпадает со значением параметра peer_address. Изменение значения этого параметра меняет политику существующего подключения.
- local_ep_group_id — ID группы эндпоинтов, которая включает в себя частные подсети локального подключения. Требует указания параметра peer_ep_group_id, если не включен режим обратной совместимости, где peer_cidrs уже предоставляются с subnet_id VPN сервиса. Изменение значения этого параметра меняет существующее подключение.
- peer_ep_group_id — ID группы эндпоинтов, которая включает в себя частные CIDR-адреса peer-подключения в формате `<net_adress>/<префикс>`. Требует указания параметра local_ep_group_id, если не включен режим обратной совместимости, где peer_cidrs уже предоставляются с subnet_id VPN сервиса.
- dpd — словарь настроек для протокола Dead Peer Detection(DPD). Включает в себя следующие ресурсы:

  - action — действие DPD. Возможные значения: clear, hold, restart, disabled, restart-by-peer. Значение по умолчанию: hold.
  - timeout — таймаут DPD в секундах. Принимаются данные типа positive integer, значения которых больше чем interval. Значение по умолчанию: 120.
  - interval — интервал DPD в секундах. Принимаются данные типа positive integer. Значение по умолчанию: 30.

depends_on — VPN соединение не запустится прежде чем не будет выполнено создание указанных ресурсов.

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

Добавьте обе части примера в файл vpn.tf и выполните следующие команды:

```bash
terraform init
```
```bash
terraform apply
```
