# {heading(Создание подсети с пользовательскими параметрами)[id=vnet-custom-subnet]}

По умолчанию все подсети {var(cloud)} создаются с включенными DNS, DCHP, шлюзом (gateway) и маской `/24`. Не все параметры подсети можно настроить через интерфейс личного кабинета. Например, через личный кабинет вы не можете задать маску `/30` или отключить шлюз подсети.

В статье приведен пример, как с помощью API-запроса создать подсеть с маской `/30` и отключенным шлюзом. Все команды приведены для ОС семейства Linux.

## {heading(Подготовительные шаги)[id=vnet-custom-subnet-prep]}

1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Активируйте доступ по API]}, если этого еще не сделано.
1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Убедитесь, что на вашем компьютере установлены пакеты curl и jq.
1. Выберите или {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=создайте]} сеть в вашем проекте {var(cloud)}. В этой сети будет создана подсеть с пользовательскими параметрами. Запишите UUID этой сети. В этом примере UUID сети — `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`.

## {heading(1. Добавьте переменные окружения)[id=vnet-custom-subnet-add-environment-vars]}

Добавьте следующие переменные окружения на свой компьютер:

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

Здесь:

- `OS_TOKEN` — токен для выполнения API-запросов.
- `N_NAME` — имя подсети, которая будет добавлена.
- `N_ID` — UUID сети, в которую будет добавлена подсеть.
- `N_CIDR` — адресное пространство, которое будет присвоено подсети.
- `OS_NET_URL` — эндпоинт для выполнения API-запроса.

## {heading(2. Создайте подсеть)[id=vnet-custom-subnet-add-subnet]}

В терминале выполните API-запрос для создания подсети:

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

Здесь:

- `"gateway_ip": null` — параметр создает подсеть без шлюза.
- `"enable_dhcp": false` — параметр отключает DHCP.
- `"enable_private_dns": false` — параметр отключает DNS.

## {heading(3. Проверьте создание подсети)[id=vnet-custom-subnet-check]}

Проверьте, что подсеть создана:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Убедитесь, что в списке есть подсеть с заданным `N_NAME`. В этом примере — `my_subnet`.
1. Нажмите на имя подсети и просмотрите ее настройки. Подсеть должна иметь адрес с маской `/30` и не иметь шлюза.
