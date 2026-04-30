{include(/kz/_includes/_translated_by_ai.md)}

Әдепкі бойынша VK Cloud жүйесіндегі барлық ішкі желілер DNS, DCHP, шлюз (gateway) және `/24`. маскасымен қосулы күйде құрылады. Ішкі желінің барлық параметрлерін жеке кабинет интерфейсі арқылы баптау мүмкін емес. Мысалы, жеке кабинет арқылы `/30` маскасын орната алмайсыз немесе ішкі желі шлюзін өшіре алмайсыз.

Мақалада API-сұрау көмегімен `/30` маскасы және өшірілген шлюзі бар ішкі желіні құру мысалы берілген. Барлық командалар Linux ОЖ тобы үшін келтірілген.

## Дайындық қадамдары

1. [API арқылы қолжетімділікті белсендіріңіз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru), егер бұл әлі жасалмаған болса.
1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.
1. Компьютеріңізде curl және jq пакеттері орнатылғанына көз жеткізіңіз.
1. VK Cloud жобаңызда желіні таңдаңыз немесе [құрыңыз](/kz/networks/vnet/instructions/net#zhelini_zhasau) Осы желіде пайдаланушы параметрлері бар ішкі желі құрылады. Осы желінің UUID мәнін жазып алыңыз. Бұл мысалда желінің UUID мәні — `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`.

## 1. Орта айнымалыларын қосыңыз

Компьютеріңізге келесі орта айнымалыларын қосыңыз:

```console
# Получение токена через OpenStack CLI
OS_TOKEN=$(openstack token issue -c id -f value)
   
# Аутентификация
H_AUTH="X-Auth-Token: $OS_TOKEN"
H_JSON="Content-Type: application/json"
H_SDN="X-SDN: SPRUT"
   
# Что будет настроено
N_NAME="my_subnet"
N_ID="b2b8468e-aaaa-bbbb-cccc-327c8c2670d4"
N_CIDR="192.168.0.0/30"

# URL для выполнения запроса
OS_NET_URL=https://infra.mail.ru:9696/v2.0
```

Мұнда:

- `OS_TOKEN` — API-сұрауларды орындауға арналған токен.
- `N_NAME` — қосылатын ішкі желінің атауы.
- `N_ID` — ішкі желі қосылатын желінің UUID мәні.
- `N_CIDR` — ішкі желіге тағайындалатын адрестік кеңістік.
- `OS_NET_URL` — API-сұрауды орындауға арналған эндпоинт.

## 2. Ішкі желіні құрыңыз

Терминалда ішкі желіні құру үшін API-сұрауды орындаңыз:

```console
curl -X POST ${OS_NET_URL}/subnets \
    -H "$H_AUTH" \
    -H "$H_SDN" \
    -H "$H_JSON" \
    -d '{"subnet": {"name": "'$N_NAME'", \
                "cidr": "'$N_CIDR'", \
                "ip_version": 4, \
                "network_id": "'$N_ID'", \
                "gateway_ip": null, \
                "enable_dhcp": false, \
                "enable_private_dns": false}}' | jq
```

Мұнда:

- `"gateway_ip": null` — параметр шлюзі жоқ ішкі желіні құрады.
- `"enable_dhcp": false` — параметр DHCP қызметін өшіреді.
- `"enable_private_dns": false` — параметр DNS қызметін өшіреді.

## 3. Ішкі желінің құрылғанын тексеріңіз

Ішкі желінің құрылғанын тексеріңіз:

1. [Өтіңіз](https://cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **Желілер**.
1. Тізімде берілген `N_NAME`. атауы бар ішкі желі бар екеніне көз жеткізіңіз. Бұл мысалда — `my_subnet`.
1. Ішкі желінің атауын басып, оның баптауларын қараңыз. Ішкі желі `/30` маскасы бар мекенжайға ие болып, шлюзі болмауы тиіс.
