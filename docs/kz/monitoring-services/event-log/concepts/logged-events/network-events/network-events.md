# {heading(Neutron және Sprut компоненттерінің оқиғалары)[id=event-log-network]}

{include(/kz/_includes/_translated_by_ai.md)}

{ifndef(private-pdf,private-pg-pdf)}[Виртуалды желілер сервисі](/kz/networks/vnet){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../../networks/vnet#vnet)[text=виртуалды желілер сервисі]}{/ifdef} Cloud Audit-ке жіберетін оқиғалар:

[cols="2,3", options="header"]
|===
|Оқиға
|Сипаттамасы

|`create-subnet`
|Ішкі желі құрылды

|`update-subnet`
|Ішкі желі жаңартылды

|`delete-subnet`
|Ішкі желі жойылды

|`create-firewall-group`
|Файервол тобы құрылды

|`update-firewall-group`
|Файервол тобы жаңартылды

|`delete-firewall-group`
|Файервол тобы жойылды

|`create-firewall-policy`
|Файервол саясаты құрылды

|`update-firewall-policy`
|Файервол саясаты жаңартылды

|`delete-firewall-policy`
|Файервол саясаты жойылды

|`create-firewall-rule`
|Файервол ережесі құрылды

|`update-firewall-rule`
|Файервол ережесі жаңартылды

|`delete-firewall-rule`
|Файервол ережесі жойылды

|`insert-rule-into-firewall-policy`
|Файервол саясатына ереже қосылды

|`remove-rule-from-firewall-policy`
|Файервол саясатынан ереже жойылды

|`create-security-group`
|Қауіпсіздік тобы құрылды

|`update-security-group`
|Қауіпсіздік тобы жаңартылды

|`delete-security-group`
|Қауіпсіздік тобы жойылды

|`create-security-group-rule`
|Қауіпсіздік тобының ережесі құрылды

|`delete-security-group-rule`
|Қауіпсіздік тобының ережесі жойылды

|`create-firewall`
|Файервол құрылды

|`update-firewall`
|Файервол жаңартылды

|`delete-firewall`
|Файервол жойылды

|`create-vlan-transparent-network`
|Мөлдір VLAN желісі құрылды

|`create-load-balancer-pool`
|Жүктеме теңгергішінің пулы құрылды

|`create-load-balancer-vip`
|Жүктеме теңгергішінің виртуалды IP мекенжайы құрылды

|`update-vip`
|Жүктеме теңгергішінің виртуалды IP мекенжайы жаңартылды

|`delete-vip`
|Жүктеме теңгергішінің виртуалды IP мекенжайы жойылды

|`create-load-balancer-member`
|Жүктеме теңгергішінің объектісі құрылды

|`update-member`
|Жүктеме теңгергішінің объектісі жаңартылды

|`delete-member`
|Жүктеме теңгергішінің объектісі жойылды

|`create-load-balancer-health-monitor`
|Жүктеме теңгергішінің мониторинг объектісі құрылды

|`associate-health-monitor-with-pool`
|Мониторинг объектісі пулға қосылды

|`disassociate-health-monitor-from-pool`
|Мониторинг объектісі пулдан ажыратылды

|`update-quota-for-project`
|Жобаға арналған квоталар жаңартылды

|`reset-quota-for-project`
|Жобаға арналған квоталар қайта жүктелді

|`create-load-balancer`
|Жүктеме теңгергіші құрылды

|`update-load-balancer`
|Жүктеме теңгергіші жаңартылды

|`remove-load-balancer`
|Жүктеме теңгергіші жойылды

|`create-listener`
|Тыңдаушы құрылды

|`update-listener`
|Тыңдаушы жаңартылды

|`remove-listener`
|Тыңдаушы жойылды

|`create-pool`
|Пул құрылды

|`update-pool`
|Пул жаңартылды

|`remove-pool`
|Пул жойылды

|`add-member-to-pool`
|Пулға объект қосылды

|`update-pool-member`
|Пул объектісі жаңартылды

|`remove-member-from-pool`
|Пулдан объект жойылды

|`create-health-monitor`
|Мониторинг объектісі құрылды

|`update-health-monitor`
|Мониторинг объектісі жаңартылды

|`remove-health-monitor`
|Мониторинг объектісі жойылды

|`create-trunk`
|Магистраль құрылды

|`add-subports-to-trunk`
|Магистральға субпорт қосылды

|`delete-subports-from-trunk`
|Магистральдан субпорт жойылды

|`update-trunk`
|Магистраль жаңартылды

|`delete-trunk`
|Магистраль жойылды

|`update-bandwidth-limit-rule`
|Өткізу қабілетін шектеу ережесі жаңартылды

|`delete-bandwidth-limit-rule`
|Өткізу қабілетін шектеу ережесі жойылды

|`create-qos-policy`
|QoS саясаты құрылды

|`update-qos-policy`
|QoS саясаты жаңартылды

|`delete-qos-policy`
|QoS саясаты жойылды

|`create-dscp-marking-rule`
|DSCP ережесі құрылды

|`update-dscp-marking-rule`
|DSCP ережесі жаңартылды

|`delete-dscp-marking-rule`
|DSCP ережесі жойылды

|`create-bandwidth-limit-rule`
|Өткізу қабілетін шектеу құрылды

|`create-floating-ip`
|{linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP мекенжайы]} құрылды

|`update-floating-ip`
|Floating IP мекенжайы жаңартылды

|`delete-floating-ip`
|Floating IP мекенжайы жойылды

|`create-flavor`
|ВМ конфигурациясының үлгісі құрылды

|`update-flavor`
|ВМ конфигурациясының үлгісі жаңартылды

|`delete-flavor`
|ВМ конфигурациясының үлгісі жойылды

|`associate-flavor-with-service-profile`
|ВМ конфигурациясының үлгісі сервистік тіркелгіге қосылды

|`disassociate-flavor`
|ВМ конфигурациясының үлгісі сервистік тіркелгіден ажыратылды

|`create-service-profile`
|Сервистік тіркелгі құрылды

|`update-service-profile`
|Сервистік тіркелгі жаңартылды

|`delete-service-profile`
|Сервистік тіркелгі жойылды

|`create-ike-policy`
|IKE саясаты құрылды

|`update-ike-policy`
|IKE саясаты жаңартылды

|`remove-ike-policy`
|IKE саясаты жойылды

|`create-ipsec-policy`
|IPsec саясаты құрылды

|`update-ipsec-policy`
|IPsec саясаты жаңартылды

|`remove-ipsec-policy`
|IPsec саясаты жойылды

|`create-ipsec-connection`
|IPsec қосылымы құрылды

|`update-ipsec-connection`
|IPsec қосылымы жаңартылды

|`remove-ipsec-connection`
|IPsec қосылымы жойылды

|`create-vpn-endpoint-group`
|VPN эндпоинттер тобы құрылды

|`update-vpn-endpoint-group`
|VPN эндпоинттер тобы жаңартылды

|`remove-vpn-endpoint-group`
|VPN эндпоинттер тобы жойылды

|`create-vpn-service`
|VPN сервисі құрылды

|`update-vpn-service`
|VPN сервисі жаңартылды

|`remove-vpn-service`
|VPN сервисі жойылды

|`create-segment`
|Сегмент құрылды

|`update-segment`
|Сегмент жаңартылды

|`delete-segment`
|Сегмент жойылды

|`create-router`
|Маршрутизатор құрылды

|`update-router`
|Маршрутизатор жаңартылды

|`delete-router`
|Маршрутизатор жойылды

|`add-interface-to-router`
|Маршрутизатор интерфейсі қосылды

|`remove-interface-from-router`
|Маршрутизатор интерфейсі жойылды

|`create-network`
|Желі құрылды

|`update-network`
|Желі жаңартылды

|`delete-network`
|Желі жойылды

|`add-tag`
|Тег қосылды

|`remove-tag`
|Тег жойылды

|`replace-all-tags`
|Барлық тегтер ауыстырылды

|`remove-all-tags`
|Барлық тегтер жойылды

|`create-subnet-pool`
|Ішкі желі пулы құрылды

|`update-subnet-pool`
|Ішкі желі пулы жаңартылды

|`delete-subnet-pool`
|Ішкі желі пулы жойылды

|`create-port`
|Порт құрылды

|`update-port`
|Порт жаңартылды

|`delete-port`
|Порт жойылды

|`create-metering-label`
|Өлшеу меткасы құрылды

|`delete-metering-label`
|Өлшеу меткасы жойылды

|`create-metering-label-rule`
|Өлшеу меткасына арналған ереже құрылды

|`delete-metering-label-rule`
|Өлшеу меткасына арналған ереже жойылды

|`create-rbac-policy`
|RBAC саясаты (рөлдерге негізделген қолжетімділікті басқару) құрылды

|`update-rbac-policy`
|RBAC саясаты жаңартылды

|`delete-rbac-policy`
|RBAC саясаты жойылды

|`update-agent`
|Желілік агент жаңартылды

|`delete-agent`
|Желілік агент жойылды

|`create-agent-dhcp-network`
|Желі DHCP агентіне қосылды

|`delete-agent-dhcp-network`
|Желі DHCP агентінен жойылды

<!-- direct_connect actions -->
|`create-dc-router`
|{linkto(../../../../../networks/vnet/concepts/router#vnet-router-advanced)[text=кеңейтілген маршрутизатор]} құрылды

|`update-dc-router`
|Кеңейтілген маршрутизатор жаңартылды

|`delete-dc-router`
|Кеңейтілген маршрутизатор жойылды

|`create-dc-interface`
|Кеңейтілген маршрутизатор интерфейсі құрылды

|`update-dc-interface`
|Кеңейтілген маршрутизатор интерфейсі жаңартылды

|`delete-dc-interface`
|Кеңейтілген маршрутизатор интерфейсі жойылды

|`create-dc-bgp`
|{linkto(../../../../../networks/vnet/instructions/advanced-router/manage-bgp#vnet-manage-bgp-add)[text=BGP ресурсы]} кеңейтілген маршрутизаторда құрылды

|`update-dc-bgp`
|Кеңейтілген маршрутизатордағы BGP ресурсы жаңартылды

|`delete-dc-bgp`
|Кеңейтілген маршрутизатордағы BGP ресурсы жойылды

|`create-dc-static-route`
|{ifndef(private-pdf,private-pg-pdf)}[Direct Connect желісі](/kz/networks/directconnect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../../networks/directconnect#directconnect)[text=Direct Connect желісі]}{/ifdef} арқылы статикалық маршрут құрылды

|`update-dc-static-route`
|Direct Connect желісі арқылы статикалық маршрут жаңартылды

|`delete-dc-static-route`
|Direct Connect желісі арқылы статикалық маршрут жойылды

|`create-dc-bgp-neighbor`
|Direct Connect желісі үшін BGP көршілігі құрылды

|`update-dc-bgp-neighbor`
|Direct Connect желісі үшін BGP көршілігі жаңартылды

|`delete-dc-bgp-neighbor`
|Direct Connect желісі үшін BGP көршілігі жойылды

|`create-dc-bgp-static-announce`
|Статикалық маршруттың BGP анонсы құрылды

|`update-dc-bgp-static-announce`
|Статикалық маршруттың BGP анонсы жаңартылды

|`delete-dc-bgp-static-announce`
|Статикалық маршруттың BGP анонсы жойылды

|`create-dc-vrrp`
|Direct Connect желісі үшін VRRP протоколы бапталды

|`update-dc-vrrp`
|Direct Connect желісі үшін VRRP протоколының баптаулары жаңартылды

|`delete-dc-vrrp`
|Direct Connect желісі үшін VRRP протоколының баптаулары жойылды

|`create-dc-vrrp-interface`
|Direct Connect желісінің VRRP-і жұмыс істейтін интерфейс құрылды

|`update-dc-vrrp-interface`
|Direct Connect желісінің VRRP-і жұмыс істейтін интерфейс жаңартылды

|`delete-dc-vrrp-interface`
|Direct Connect желісінің VRRP-і жұмыс істейтін интерфейс жойылды

|`create-dc-vrrp-address`
|Direct Connect желісінің VRRP протоколының виртуалды IP мекенжайы құрылды

|`update-dc-vrrp-address`
|Direct Connect желісінің VRRP протоколының виртуалды IP мекенжайы жаңартылды

|`delete-dc-vrrp-address`
|Direct Connect желісінің VRRP протоколының виртуалды IP мекенжайы жойылды

|`create-dc-conntrack-helper`
|Кеңейтілген маршрутизаторға арналған қосылымдарды бақылау модулі (Conntrack Helper) құрылды

|`update-dc-conntrack-helper`
|Кеңейтілген маршрутизаторға арналған қосылымдарды бақылау модулі жаңартылды

|`delete-dc-conntrack-helper`
|Кеңейтілген маршрутизаторға арналған қосылымдарды бақылау модулі жойылды

|`create-dc-ip-port-forwarding`
|Direct Connect желісі үшін порттарды қайта бағыттау ережесі құрылды

|`update-dc-ip-port-forwarding`
|Direct Connect желісі үшін порттарды қайта бағыттау ережесі жаңартылды

|`delete-dc-ip-port-forwarding`
|Direct Connect желісі үшін порттарды қайта бағыттау ережесі жойылды

<!--  anycastips-->
|`create-anycastips`
|{linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-anycast-ip)[text=Anycast IP мекенжайы]} құрылды

|`update-anycastips`
|Anycast IP мекенжайы жаңартылды

|`delete-anycastips`
|Anycast IP мекенжайы жойылды

|`associate-anycastip`
|Anycast IP мекенжайына арналған байланыстыру құрылды

|`disassociate-anycastip`
|Anycast IP мекенжайына арналған байланыстыру жойылды
|===
