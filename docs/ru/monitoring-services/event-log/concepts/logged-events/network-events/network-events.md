События, которые [сервис виртуальных сетей](/ru/networks/vnet) передает в Cloud Audit:

[cols="2,3", options="header"]
|===
|Событие
|Описание

|`create-subnet`
|Создана подсеть

|`update-subnet`
|Обновлена подсеть

|`delete-subnet`
|Удалена подсеть

|`create-firewall-group`
|Создана группа файервола

|`update-firewall-group`
|Обновлена группа файервола

|`delete-firewall-group`
|Удалена группа файервола

|`create-firewall-policy`
|Создана политика файервола

|`update-firewall-policy`
|Обновлена политика файервола

|`delete-firewall-policy`
|Удалена политика файервола

|`create-firewall-rule`
|Создано правило файервола

|`update-firewall-rule`
|Обновлено правило файервола

|`delete-firewall-rule`
|Удалено правило файервола

|`insert-rule-into-firewall-policy`
|В политику файервола добавлено правило

|`remove-rule-from-firewall-policy`
|Из политики файервола удалено правило

|`create-security-group`
|Создана группа безопасности

|`update-security-group`
|Обновлена группа безопасности

|`delete-security-group`
|Удалена группа безопасности

|`create-security-group-rule`
|Создано правило группы безопасности

|`delete-security-group-rule`
|Удалено правило группы безопасности

|`create-firewall`
|Создан файервол

|`update-firewall`
|Обновлен файервол

|`delete-firewall`
|Удален файервол

|`create-vlan-transparent-network`
|Создана прозрачная VLAN-сеть

|`create-load-balancer-pool`
|Создан пул балансировщика нагрузки

|`create-load-balancer-vip`
|Создан виртуальный IP-адрес балансировщика нагрузки

|`update-vip`
|Обновлен виртуальный IP-адрес балансировщика нагрузки

|`delete-vip`
|Удален виртуальный IP-адрес балансировщика нагрузки

|`create-load-balancer-member`
|Создан объект балансировщика нагрузки

|`update-member`
|Обновлен объект балансировщика нагрузки

|`delete-member`
|Удален объект балансировщика нагрузки

|`create-load-balancer-health-monitor`
|Создан объект мониторинга балансировщика нагрузки

|`associate-health-monitor-with-pool`
|Объект мониторинга подключен к пулу

|`disassociate-health-monitor-from-pool`
|Объект мониторинга отключен от пула

|`update-quota-for-project`
|Обновлены квоты для проекта

|`reset-quota-for-project`
|Перезагружены квоты для проекта

|`create-load-balancer`
|Создан балансировщик нагрузки

|`update-load-balancer`
|Обновлен балансировщик нагрузки

|`remove-load-balancer`
|Удален балансировщик нагрузки

|`create-listener`
|Создан прослушиватель

|`update-listener`
|Обновлен прослушиватель

|`remove-listener`
|Удален прослушиватель

|`create-pool`
|Создан пул

|`update-pool`
|Обновлен пул

|`remove-pool`
|Удален пул

|`add-member-to-pool`
|В пул добавлен объект

|`update-pool-member`
|Обновлен объект пула

|`remove-member-from-pool`
|Из пула удален объект

|`create-health-monitor`
|Создан объект мониторинга

|`update-health-monitor`
|Обновлен объект мониторинга

|`remove-health-monitor`
|Удален объект мониторинга

|`create-trunk`
|Создана магистраль

|`add-subports-to-trunk`
|В магистраль добавлен субпорт

|`delete-subports-from-trunk`
|Из магистрали удален субпорт

|`update-trunk`
|Обновлена магистраль

|`delete-trunk`
|Удалена магистраль

|`update-bandwidth-limit-rule`
|Обновлено правило ограничения пропускной способности

|`delete-bandwidth-limit-rule`
|Удалено правило ограничения пропускной способности

|`create-qos-policy`
|Создана политика QoS

|`update-qos-policy`
|Обновлена политика QoS

|`delete-qos-policy`
|Удалена политика QoS

|`create-dscp-marking-rule`
|Создано DSCP-правило

|`update-dscp-marking-rule`
|Обновлено DSCP-правило

|`delete-dscp-marking-rule`
|Удалено DSCP-правило

|`create-bandwidth-limit-rule`
|Создано ограничение пропускной способности

|`create-floating-ip`
|Создан [Floating IP-адрес](/ru/networks/vnet/concepts/ips-and-inet#plavayushchiy_ip_adres)

|`update-floating-ip`
|Обновлен Floating IP-адрес

|`delete-floating-ip`
|Удален Floating IP-адрес

|`create-flavor`
|Создан шаблон конфигурации ВМ

|`update-flavor`
|Обновлен шаблон конфигурации ВМ

|`delete-flavor`
|Удален шаблон конфигурации ВМ

|`associate-flavor-with-service-profile`
|Шаблон конфигурации ВМ подключен к сервисной учетной записи

|`disassociate-flavor`
|Шаблон конфигурации ВМ отключен от сервисной учетной записи

|`create-service-profile`
|Создана сервисная учетная запись

|`update-service-profile`
|Обновлена сервисная учетная запись

|`delete-service-profile`
|Удалена сервисная учетная запись

|`create-ike-policy`
|Создана политика IKE

|`update-ike-policy`
|Обновлена политика IKE

|`remove-ike-policy`
|Удалена политика IKE

|`create-ipsec-policy`
|Создана политика IPsec

|`update-ipsec-policy`
|Обновлена политика IPsec

|`remove-ipsec-policy`
|Удалена политика IPsec

|`create-ipsec-connection`
|Создано IPsec-соединение

|`update-ipsec-connection`
|Обновлено IPsec-соединение

|`remove-ipsec-connection`
|Удалено IPsec-соединение

|`create-vpn-endpoint-group`
|Создана группа эндпоинтов VPN

|`update-vpn-endpoint-group`
|Обновлена группа эндпоинтов VPN

|`remove-vpn-endpoint-group`
|Удалена группа эндпоинтов VPN

|`create-vpn-service`
|Создан сервис VPN

|`update-vpn-service`
|Обновлен сервис VPN

|`remove-vpn-service`
|Удален сервис VPN

|`create-segment`
|Создан сегмент

|`update-segment`
|Обновлен сегмент

|`delete-segment`
|Удален сегмент

|`create-router`
|Создан маршрутизатор

|`update-router`
|Обновлен маршрутизатор

|`delete-router`
|Удален маршрутизатор

|`add-interface-to-router`
|Добавлен интерфейс маршрутизатора

|`remove-interface-from-router`
|Удален интерфейс маршрутизатора

|`create-network`
|Создана сеть

|`update-network`
|Обновлена сеть

|`delete-network`
|Удалена сеть

|`add-tag`
|Добавлен тег

|`remove-tag`
|Удален тег

|`replace-all-tags`
|Заменены все теги

|`remove-all-tags`
|Удалены все теги

|`create-subnet-pool`
|Создан пул подсети

|`update-subnet-pool`
|Обновлен пул подсети

|`delete-subnet-pool`
|Удален пул подсети

|`create-port`
|Создан порт

|`update-port`
|Обновлен порт

|`delete-port`
|Удален порт

|`create-metering-label`
|Создана метка измерения

|`delete-metering-label`
|Удалена метка измерения

|`create-metering-label-rule`
|Создано правило для метки измерения

|`delete-metering-label-rule`
|Удалено правило для метки измерения

|`create-rbac-policy`
|Создана политика RBAC (управление доступом на основе ролей)

|`update-rbac-policy`
|Обновлена политика RBAC

|`delete-rbac-policy`
|Удалена политика RBAC

|`update-agent`
|Обновлен сетевой агент

|`delete-agent`
|Удален сетевой агент

|`create-agent-dhcp-network`
|Добавлена сеть в DHCP-агент

|`delete-agent-dhcp-network`
|Удалена сеть из DHCP-агента

<!-- direct_connect actions -->
|`create-dc-router`
|Создан [продвинутый маршрутизатор](/ru/networks/vnet/concepts/router#vozmozhnosti_prodvinutogo_marshrutizatora)

|`update-dc-router`
|Обновлен продвинутый маршрутизатор

|`delete-dc-router`
|Удален продвинутый маршрутизатор

|`create-dc-interface`
|Создан интерфейс продвинутого маршрутизатора

|`update-dc-interface`
|Обновлен интерфейс продвинутого маршрутизатора

|`delete-dc-interface`
|Удален интерфейс продвинутого маршрутизатора

|`create-dc-bgp`
|Создан [BGP-ресурс](/ru/networks/vnet/service-management/advanced-router/manage-bgp#dobavlenie_bgp_marshrutizatora) на продвинутом маршрутизаторе

|`update-dc-bgp`
|Обновлен BGP-ресурс на продвинутом маршрутизаторе

|`delete-dc-bgp`
|Удален BGP-ресурс на продвинутом маршрутизаторе

|`create-dc-static-route`
|Создан статический маршрут через [сеть Direct Connect](/ru/networks/directconnect)

|`update-dc-static-route`
|Обновлен статический маршрут через сеть Direct Connect

|`delete-dc-static-route`
|Удален статический маршрут через сеть Direct Connect

|`create-dc-bgp-neighbor`
|Создано BGP-соседство для сети Direct Connect

|`update-dc-bgp-neighbor`
|Обновлено BGP-соседство для сети Direct Connect

|`delete-dc-bgp-neighbor`
|Удалено BGP-соседство для сети Direct Connect

|`create-dc-bgp-static-announce`
|Создан BGP-анонс статического маршрута

|`update-dc-bgp-static-announce`
|Обновлен BGP-анонс статического маршрута

|`delete-dc-bgp-static-announce`
|Удален BGP-анонс статического маршрута

|`create-dc-vrrp`
|Настроен протокол VRRP для сети Direct Connect

|`update-dc-vrrp`
|Обновлены настройки протокола VRRP для сети Direct Connect

|`delete-dc-vrrp`
|Удалены настройки протокола VRRP для сети Direct Connect

|`create-dc-vrrp-interface`
|Создан интерфейс, через который работает VRRP сети Direct Connect

|`update-dc-vrrp-interface`
|Обновлен интерфейс, через который работает VRRP сети Direct Connect

|`delete-dc-vrrp-interface`
|Удален интерфейс, через который работает VRRP сети Direct Connect

|`create-dc-vrrp-address`
|Создан виртуальный IP-адрес VRRP-протокола сети Direct Connect

|`update-dc-vrrp-address`
|Обновлен виртуальный IP-адрес VRRP-протокола сети Direct Connect

|`delete-dc-vrrp-address`
|Удален виртуальный IP-адрес VRRP-протокола сети Direct Connect

|`create-dc-conntrack-helper`
|Создан модуль отслеживания подключений (Conntrack Helper) для продвинутого маршрутизатора

|`update-dc-conntrack-helper`
|Обновлен модуль отслеживания подключений для продвинутого маршрутизатора

|`delete-dc-conntrack-helper`
|Удален модуль отслеживания подключений для продвинутого маршрутизатора

|`create-dc-ip-port-forwarding`
|Создано правило перенаправления портов для сети Direct Connect

|`update-dc-ip-port-forwarding`
|Обновлено правило перенаправления портов для сети Direct Connect

|`delete-dc-ip-port-forwarding`
|Удалено правило перенаправления портов для сети Direct Connect

<!--  anycastips-->
<!--  !!! Добавить ссылку на "Anycast IP-адрес", когда будет опубликована статья -->
|`create-anycastips`
|Создан Anycast IP-адрес

|`update-anycastips`
|Обновлен Anycast IP-адрес

|`delete-anycastips`
|Удален Anycast IP-адрес

|`associate-anycastip`
|Создана привязка для Anycast IP-адреса

|`disassociate-anycastip`
|Удалена привязка для Anycast IP-адреса
|===
