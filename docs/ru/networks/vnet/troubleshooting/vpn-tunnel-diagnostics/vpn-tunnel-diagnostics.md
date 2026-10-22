# {heading(Диагностика VPN-туннеля)[id=vpn-tunnel-diagnostics]}

Site-to-site VPN-туннель не устанавливается или не пропускает трафик, в том числе большие пакеты.

Возможные причины:

- спецсимволы в ключе совместного использования (PSK) — подробнее в статье {linkto(../vpn-tunnel-psk#vnet-vpn-tunnel-psk)[text=Не работает VPN-туннель]};
- несовпадение IKE/IPsec-параметров между сторонами;
- блокировка портов группами безопасности;
- проблемы с MTU;
- неверная маршрутизация.

### Решение

Проведите диагностику, исходя из поведения туннеля:

{cut(Туннель в статусе DOWN и не устанавливается даже после перезапуска)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-ike-ipsec,vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-routes]}

{/cut}

{cut(Туннель установлен, но трафик не проходит или не проходят большие пакеты)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-mtu,vpn-tunnel-diagnostics-routes]}
{/cut}

{note:info}
{linkto(../../instructions/vpn#vnet-vpn-view)[text=Получить]} текущий статус туннеля и его параметры можно в личном кабинете или с помощью OpenStack CLI.
{/note}

Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts). Приложите к обращению идентификатор VPN-туннеля, его статус и результаты диагностических команд.