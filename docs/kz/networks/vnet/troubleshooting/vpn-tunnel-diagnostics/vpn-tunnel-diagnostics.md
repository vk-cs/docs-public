# {heading(VPN-туннелін диагностикалау)[id=vpn-tunnel-diagnostics]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Site-to-site VPN-туннелі орнатылмайды немесе трафикті, соның ішінде үлкен пакеттерді өткізбейді.

Мүмкін себептер:

- бөлісу кілтінде (PSK) арнайы таңбалар болуы — толығырақ {linkto(../vpn-tunnel-psk#vnet-vpn-tunnel-psk)[text=VPN-туннелі жұмыс істемейді]} мақаласында;
- екі жақтың IKE/IPsec параметрлерінің сәйкес келмеуі;
- қауіпсіздік топтарымен порттардың блокталуы;
- MTU мәселелері;
- дұрыс емес маршрутизация.

### Шешім

Туннельдің мінез-құлқына қарай диагностика жүргізіңіз:

{cut(Туннель DOWN статусында және қайта іске қосқаннан кейін де орнатылмайды)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-ike-ipsec,vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-routes]}

{/cut}

{cut(Туннель орнатылған, бірақ трафик өтпейді немесе үлкен пакеттер өтпейді)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-mtu,vpn-tunnel-diagnostics-routes]}
{/cut}

{note:info}
Туннельдің ағымдағы статусын және оның параметрлерін жеке кабинетте немесе OpenStack CLI көмегімен {linkto(../../instructions/vpn#vnet-vpn-view)[text=алуға]} болады.
{/note}

Егер мәселе сақталса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз. Өтінішке VPN-туннелінің идентификаторын, оның статусын және диагностикалық командалардың нәтижелерін қосыңыз.