# {heading(Тарификация)[id=vnet-tariffication]}

## {heading(О тарификации)[id=vnet-tariffication-about]}

{include(/ru/_includes/_tariffication.md)[tags=pay]}

{include(/ru/_includes/_tariffication.md)[tags=prices]}

{include(/ru/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарифицируется)[id=vnet-tariffication-charged]}

Стоимость этих ресурсов отображается в личном кабинете {var(cloud)} в составе общей стоимости сервисов, которые используют их.

Тарифицируются:

- Публичные IP-адреса:

  - Назначенный порту публичный IP-адрес, если порт подключен к сети `ext-net`.
  - Существующие публичные Floating IP-адреса (даже если они не назначены какому-либо порту).

- {linkto(../../balancing/concepts/about#balancing-load-balancer-types)[text=Стандартные и сервисные]} балансировщики нагрузки.

## {heading(Не тарифицируется)[id=vnet-tariffication-not-charged]}

- Публичный IP-адрес, назначенный маршрутизатору при выборе опции **Подключение к внешней сети**.

  Это позволяет, например, виртуальным машинам, получать доступ в интернет без необходимости приобретения Floating IP-адресов.
  При этом для доступа к виртуальным машинам из интернета нельзя использовать такой IP-адрес. Будет требоваться Floating IP-адрес.

- Входящий и исходящий трафик.
- Использование VPN.
