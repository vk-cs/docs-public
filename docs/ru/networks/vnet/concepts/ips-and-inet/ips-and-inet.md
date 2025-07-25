## Сетевая адресация

При создании подсети задаются:

- имя подсети;
- адрес подсети;
- пул DHCP IP-адресов (даже если DHCP выключен для подсети);
- (опционально) статические маршруты в формате `<АДРЕС_ПОДСЕТИ> - <NEXT_HOP>`.

При этом действуют следующие правила:

1. Если для подсети включен DHCP, то в ней размещаются два DHCP-сервера, которые занимают первые два адреса из пула DHCP-адресов.

   Например, если для подсети `192.168.0.0/24` задан пул DHCP-адресов `192.168.0.11–192.168.0.254`, то DHCP-серверы будут использовать порты с адресами `192.168.0.11` и `192.168.0.12`.

1. Если к подсети подключен маршрутизатор с публичным адресом, то порту `SNAT` маршрутизатора будет назначен случайный адрес из оставшегося пула DHCP IP-адресов.

## Организация доступа в интернет

Чтобы объекты в подсети имели доступ в интернет, нужно подключить к подсети [маршрутизатор](../router) с доступом к [внешней сети](../net-types#external_net).

Сетевые объекты, которым необходим маршрутизатор с доступом к внешней сети:

- VPN-туннель.
- Балансировщик нагрузки с доступом в интернет.

Для [виртуальной машины](/ru/computing/iaas/concepts/vm) доступ в интернет можно обеспечить разными способами:

- Подключить ВМ к внешней сети. При этом ей будут автоматически назначены подсеть и внешний IP-адрес.
- Подключить ВМ к приватной подсети, которая подключена к маршрутизатору с доступом к внешней сети, и назначить ей Floating IP-адрес. При этом IP-адрес можно задать вручную или автоматически.

## {heading(Floating IP-адрес)[id=floating-ip]}

Floating IP-адрес (DNAT, плавающий) — это статический IP-адрес, который можно динамически переназначать между ресурсами в облачной среде. Floating IP-адрес используется через [SDN](../sdn), что позволяет администратору сети перемещать IP-адреса между устройствами, не меняя физическую или виртуальную сетевую конфигурацию. Таким образом переключать трафик между различными серверами можно без изменения конфигурации самих серверов.

Преимущества использования Floating IP-адресов:

- Обеспечение отказоустойчивости — если основной сервер выходит из строя, IP-адрес может быть быстро перенаправлен на резервный сервер, что минимизирует простои.

- Балансировка нагрузки — Floating IP-адрес может использоваться для распределения трафика между несколькими серверами, увеличивая тем самым производительность и надежность системы.

- Гибкая переконфигурация сети — в средах с часто меняющимися требованиями Floating IP-адреса позволяют оперативно перераспределять ресурсы, не изменяя IP-адресации и связанных с ней настроек.

## {heading(Anycast IP-адрес)[id=anycast-ip]}

{note:warn}

Anycast IP-адрес работает только в [SDN Sprut](/ru/networks/vnet/concepts/sdn#sprut).

{/note}

Сервис Anycast IP позволяет создавать отказоустойчивую инфраструктуру с оптимальной маршрутизацией.

_Anycast_ — это метод маршрутизации, при котором один IP-адрес назначается нескольким серверам в разных [зонах доступности](/ru/intro/start/concepts/architecture#az). При этом трафик через Anycast IP-адрес автоматически направляется к ближайшему или наименее загруженному узлу на основе метрик BGP.

Anycast IP-адрес выполняет задачи:

- Распределяет нагрузку между серверами, обеспечивая производительность приложения.
- Если недоступны сервер или зона доступности, перенаправляет трафик на другой сервер или зону доступности, обеспечивая отказоустойчивость приложения.

Различия между Floating и Anycast IP-адресами:

[cols="1,2,2", options="header"]
|===
|
|Floating IP-адрес
|Anycast IP-адрес

|С чем связывается
|Связан с приватным IP-адресом виртуальной машины, балансировщика или другого облачного ресурса
|Связан с другими публичными IP-адресами

|Тип привязки
|Один к одному
|Один ко многим

|Основная задача
|Локальная отказоустойчивость: позволяет перенести нагрузку на запасной экземпляр ресурса в случае проблем с основным
|Региональная отказоустойчивость: автоматически перераспределяет трафик в случае отказа одной из зон доступности

|Предварительная проверка
|Нет предварительной проверки доступности ресурса, поэтому перераспределение занимает время
|Проводит предварительную проверку доступности ресурса, трафик сразу направляется по оптимальному маршруту
|===

Anycast IP-адрес может быть связан со следующими IP-адресами:

- Публичные IP-адреса виртуальных машин во [внешних сетях](/ru/networks/vnet/concepts/net-types#external_net).
- IP-адреса балансировщиков нагрузки. Балансировщик должен размещаться в сети с доступом в интернет и не иметь привязки к [Floating IP-адресу](#floating-ip).
- Интерфейс [продвинутого маршрутизатора](../../concepts/router#advanced) с публичным IP-адресом во внешней сети (должна быть подключена опция **SNAT**).

К одному Anycast IP-адресу можно привязать до восьми IP-адресов, все IP-адреса должны быть только одного типа.

Количество Anycast IP-адресов на одном проекте ограничено [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits#nets).

## Пул публичных IP-адресов внешней сети internet

Все проекты в SDN Sprut подключены к внешней сети `internet`.

Во всех подсетях внешней сети `internet`:

- DHCP выключен;
- используются DNS-серверы `5.61.237.120` и `5.61.237.127`.

<!-- prettier-ignore-start -->
| Имя подсети | Адрес подсети    | Доступный для использования диапазон IP-адресов | Шлюз            |
| ----------- | ---------------- | ----------------------------------------------- | --------------- |
| ext-sub     | 89.208.216.0/24  | 89.208.216.1–89.208.216.253                     | 89.208.216.254  |
| ext-sub2    | 212.111.84.0/22  | 212.111.84.1–212.111.87.253                     | 212.111.87.254  |
| ext-sub3    | 90.156.212.0/22  | 90.156.212.1–90.156.215.253                     | 90.156.215.254  |
| ext-sub4    | 90.156.216.0/22  | 90.156.216.1–90.156.219.253                     | 90.156.219.254  |
| ext-sub5    | 91.219.226.0/23  | 91.219.226.1–91.219.227.253                     | 91.219.227.254  |
| ext-sub6    | 83.166.232.0/21  | 83.166.232.1–83.166.239.253                     | 83.166.239.254  |
| ext-sub7    | 83.166.248.0/21  | 83.166.248.1–83.166.255.253                     | 83.166.255.254  |
| ext-sub8    | 217.16.16.0/21   | 217.16.16.1–217.16.23.253                       | 217.16.23.254   |
| ext-sub9    | 90.156.150.0/23  | 90.156.150.1–90.156.150.254                     | 90.156.151.254  |
| ext-sub9    | 217.16.24.0/22   | 217.16.24.1–217.16.27.253                       | 217.16.27.254   |
| ext-sub11   | 85.192.32.0/22   | 85.192.32.1–85.192.35.253                       | 85.192.35.254   |
| ext-sub12   | 37.139.40.0/22   | 37.139.40.1–37.139.43.253                       | 37.139.43.254   |
| ext-sub13   | 213.219.212.0/22 | 213.219.212.1–213.219.215.253                   | 213.219.215.254 |
| ext-sub14   | 146.185.208.0/22 | 146.185.208.1–146.185.211.253                   | 146.185.211.254 |
| ext-sub15   | 89.208.220.0/22  | 89.208.220.1–89.208.223.253                     | 89.208.223.254  |
| ext-sub16   | 89.208.208.0/22  | 89.208.208.1–89.208.211.253                     | 89.208.211.254  |
| ext-sub17   | 109.120.188.0/22 | 109.120.188.1–109.120.191.253                   | 109.120.191.254 |
| ext-sub18   | 185.86.144.0/22  | 185.86.144.1–185.86.147.253                     | 185.86.147.254  |
| ext-sub19   | 89.208.228.0/22  | 89.208.228.1–89.208.231.253                     | 89.208.231.254  |
| ext-sub20   | 109.120.180.0/22 | 109.120.180.1–109.120.183.25                    | 109.120.183.254 |
| ext-sub21   | 185.241.192.0/22 | 185.241.192.1–185.241.195.253                   | 185.241.195.254 |
| ext-sub22   | 94.139.244.0/22  | 94.139.245.0–94.139.247.253                     | 94.139.247.254  |
| ext-sub23   | 89.208.196.0/22  | 89.208.196.1–89.208.199.253                     | 89.208.199.254  |
| ext-sub24   | 5.188.140.0/22   | 5.188.140.1–5.188.143.253                       | 5.188.143.254   |
| ext-sub25   | 212.233.96.0/22  | 212.233.96.1–212.233.99.253                     | 212.233.99.254  |
| ext-sub26   | 95.163.212.0/22  | 95.163.212.1–95.163.215.253                     | 95.163.215.254  |
| ext-sub27   | 212.233.120.0/22 | 212.233.120.1–212.233.123.253                   | 212.233.123.254 |
| ext-sub28   | 212.233.72.0/21  | 212.233.72.1–212.233.79.253                     | 212.233.79.254  |
| ext-sub29   | 89.208.84.0/22   | 89.208.84.1–89.208.87.253                       | 89.208.87.254   |
| ext-sub30   | 185.130.112.0/22 | 185.130.112.1–185.130.115.253                   | 185.130.115.254 |
| ext-sub31   | 87.239.104.0/21  | 87.239.104.1–87.239.111.253                     | 87.239.111.254  |
| ext-sub32   | 146.185.240.0/22 | 146.185.240.1–146.185.243.253                   | 146.185.243.254 |
| ext-sub33   | 95.163.180.0/23  | 95.163.180.1–95.163.181.253                     | 95.163.181.254  |
| ext-sub34   | 84.23.52.0/22    | 84.23.52.1–84.23.55.253                         | 84.23.55.254    |
| ext-sub35   | 95.163.248.0/22  | 95.163.248.10–95.163.251.250                    | 95.163.251.254  |
| ext-sub36   | 79.137.174.0/23  | 79.137.174.5–79.137.175.253                     | 79.137.175.254  |
| ext-sub37   | 37.139.32.0/22   | 37.139.32.1–37.139.35.253                       | 37.139.35.254   |
| ext-sub38   | 212.233.88.0/21  | 212.233.88.1–212.233.95.253                     | 212.233.95.254  |
| ext-sub39   | 95.163.208.0/22  | 95.163.208.1–95.163.211.253                     | 95.163.211.254  |
| ext-sub40   | 95.163.182.0/23  | 95.163.182.1–95.163.183.253                     | 95.163.183.254  |
<!-- prettier-ignore-end -->

## Пул публичных IP-адресов внешней сети ext-net

Все проекты в SDN Neutron подключены к внешней сети `ext-net`.

Во всех подсетях внешней сети `ext-net`:

- DHCP выключен;
- используются DNS-серверы `5.61.237.120` и `5.61.237.127`.

<!-- prettier-ignore-start -->
| Имя подсети  | Адрес подсети    | Доступный для использования диапазон IP-адресов | Шлюз            |
| ------------ | ---------------- | ----------------------------------------------- | --------------- |
| ext-subnet1  | 95.163.248.0/22  | 95.163.248.10–95.163.251.250                    | 95.163.251.254  |
| ext-subnet2  | 79.137.174.0/23  | 79.137.174.5–79.137.175.253                     | 79.137.175.254  |
| ext-subnet4  | 95.163.212.0/22  | 95.163.212.1–95.163.215.253                     | 95.163.215.254  |
| ext-subnet5  | 95.163.208.0/22  | 95.163.208.1–95.163.211.253                     | 95.163.211.254  |
| ext-subnet6  | 95.163.180.0/23  | 95.163.180.1–95.163.181.253                     | 95.163.181.254  |
| ext-subnet7  | 89.208.84.0/22   | 89.208.84.1–89.208.87.253                       | 89.208.87.254   |
| ext-subnet8  | 89.208.196.0/22  | 89.208.196.1–89.208.199.253                     | 89.208.199.254  |
| ext-subnet9  | 95.163.182.0/23  | 95.163.182.1–95.163.183.253                     | 95.163.183.254  |
| ext-subnet10 | 85.192.32.0/22   | 85.192.32.1–85.192.35.253                       | 85.192.35.254   |
| ext-subnet11 | 89.208.208.0/22  | 89.208.208.1–89.208.211.253                     | 89.208.211.254  |
| ext-subnet12 | 89.208.220.0/22  | 89.208.220.1–89.208.223.253                     | 89.208.223.254  |
| ext-subnet13 | 213.219.212.0/22 | 213.219.212.1–213.219.215.253                   | 213.219.215.254 |
| ext-subnet14 | 89.208.228.0/22  | 89.208.228.1–89.208.231.253                     | 89.208.231.254  |
| ext-subnet15 | 185.241.192.0/22 | 185.241.192.1–185.241.195.253                   | 185.241.195.254 |
| ext-subnet17 | 87.239.104.0/21  | 87.239.104.1–87.239.111.253                     | 87.239.111.254  |
| ext-subnet18 | 185.86.144.0/22  | 185.86.144.1–185.86.147.253                     | 185.86.147.254  |
| ext-subnet19 | 37.139.32.0/22   | 37.139.32.1–37.139.35.253                       | 37.139.35.254   |
| ext-subnet20 | 37.139.40.0/22   | 37.139.40.1–37.139.43.253                       | 37.139.43.254   |
| ext-subnet21 | 146.185.240.0/22 | 146.185.240.1–146.185.243.253                   | 146.185.243.254 |
| ext-subnet22 | 5.188.140.0/22   | 5.188.140.1–5.188.143.253                       | 5.188.143.254   |
| ext-subnet23 | 146.185.208.0/22 | 146.185.208.1–146.185.211.253                   | 146.185.211.254 |
| ext-subnet24 | 84.23.52.0/22    | 84.23.52.1–84.23.55.253                         | 84.23.55.254    |
| ext-subnet25 | 109.120.180.0/22 | 109.120.180.1–109.120.183.253                   | 109.120.183.254 |
| ext-subnet26 | 109.120.188.0/22 | 109.120.188.1–109.120.191.253                   | 109.120.191.254 |
| ext-subnet27 | 185.130.112.0/22 | 185.130.112.1–185.130.115.253                   | 185.130.115.254 |
| ext-subnet28 | 94.139.244.0/22  | 94.139.245.0–94.139.247.253                     | 94.139.247.254  |
| ext-subnet29 | 212.233.88.0/21  | 212.233.88.1–212.233.95.253                     | 212.233.95.254  |
| ext-subnet30 | 212.233.72.0/21  | 212.233.72.1–212.233.79.253                     | 212.233.79.254  |
| ext-subnet31 | 212.233.96.0/22  | 212.233.96.1–212.233.99.253                     | 212.233.99.254  |
| ext-subnet32 | 212.233.120.0/22 | 212.233.120.1–212.233.123.253                   | 212.233.123.254 |
| ext-subnet33 | 89.208.216.0/24  | 89.208.216.1–89.208.216.253                     | 89.208.216.254  |
| ext-subnet34 | 212.111.84.0/22  | 212.111.84.1–212.111.87.253                     | 212.111.87.254  |
| ext-subnet35 | 90.156.212.0/22  | 90.156.212.1–90.156.215.253                     | 90.156.215.254  |
| ext-subnet36 | 90.156.216.0/22  | 90.156.216.1–90.156.219.253                     | 90.156.219.254  |
| ext-subnet37 | 91.219.226.0/23  | 91.219.226.1–91.219.227.253                     | 91.219.227.254  |
| ext-subnet38 | 83.166.232.0/21  | 83.166.232.1–83.166.239.253                     | 83.166.239.254  |
| ext-subnet39 | 83.166.248.0/21  | 83.166.248.1–83.166.255.253                     | 83.166.255.254  |
| ext-subnet40 | 217.16.16.0/21   | 217.16.16.1–217.16.23.253                       | 217.16.23.254   |
| ext-subnet41 | 217.16.24.0/22   | 217.16.24.1–217.16.27.253                       | 217.16.27.254   |
| ext-subnet42 | 90.156.150.0/23  | 90.156.150.1–90.156.150.254                     | 90.156.151.254  |
<!-- prettier-ignore-end -->

## {heading(Shadow port)[id=shadow_port]}

Технология _Shadow port_ позволяет запускать кластеры Kubernetes в приватных сетях. Обычно Kubernetes необходим доступ в интернет, чтобы получить всю необходимую информацию для конфигурации кластера из смежных сервисов. Shadow port позволяет подключиться к внутренним сервисам VK Cloud, не подключаясь к интернету.

Чтобы использовать технологию для создания кластера Kubernetes:

1. Обратитесь в [техническую поддержку](/ru/contacts), чтобы подключить Shadow port в свой проект. 
1. [Подключите](../../instructions/net#sozdanie_seti) опцию **Доступ к сервисам VK Cloud** для сети без доступа в интернет.
1. [Разметите](/ru/kubernetes/k8s/instructions/create-cluster) кластер Kubernetes в этой сети.
