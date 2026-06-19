# {heading(О сервисе)[id=vnet-about]}

Сервис обеспечивает сетевое взаимодействие в рамках {ifdef(public)}выбранных {/ifdef}{linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} {ifdef(public)}и {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региона]}
{/ifdef}{var(cloud)}:

- Создание сетей и подсетей. Подсети используют приватные IP-адреса, которые не маршрутизируются в интернете.

- Подключение к сетям и подсетям сервисов {var(cloud)}.

  К сети подключаются как части отдельного сервиса (например, узлы кластера баз данных), так и сервисы целиком (например, кластер баз данных может взаимодействовать с виртуальной машиной).

  {ifdef(public)}
  Например, поверх созданных сетей и подсетей работает {linkto(../../../../networks/dns#dns)[text=сервис DNS]}.
  {/ifdef}

- Возможность настраивать поверх сетей и подсетей:

  - {linkto(../../../../networks/vnet/concepts/router#vnet-router)[text=Маршрутизаторы]} для связи подсетей между собой.

    С их помощью можно связать как только подсети {var(cloud)}, так и подсети {var(cloud)} с подсетями на удаленной площадке.

  - {linkto(../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer)[text=Балансировщики нагрузки]} для распределения входящего трафика по нескольким экземплярам сервисов {var(cloud)}.
{ifndef(private-cert)}
  - {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=Группы безопасности]} с правилами для ограничения трафика к определенным сервисам {var(cloud)}.
{/ifndef}
{ifdef(public)}
  - {linkto(../../../../networks/vnet/concepts/vpn#vnet-vpn)[text=VPN]} для связи подсетей {var(cloud)} с клиентскими подсетями.

## {heading(Что дальше)[id=vnet-about-next]}

- {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=Познакомьтесь с SDN]} сервиса.
- {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet)[text=Познакомьтесь с принципами сетевой адресации и организации доступа в интернет]}.
{/ifdef}