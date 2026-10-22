# {heading(VPN-туннелін диагностикалау)[id=vpn-tunnel-diagnostics]}

{include(/kz/_includes/_translated_by_ai.md)}

Site-to-site VPN-туннелі құрылмайды немесе трафикті, соның ішінде үлкен пакеттерді өткізбейді.

Мүмкін себептер:

- ортақ пайдалану кілтінде (PSK) арнайы таңбалар болуы — толығырақ {linkto(../vpn-tunnel-psk#vnet-vpn-tunnel-psk)[text=VPN-туннелі жұмыс істемейді]} мақаласында;
- екі жақтың IKE/IPsec-параметрлерінің сәйкес келмеуі;
- қауіпсіздік топтарымен порттарды блоктау;
- MTU мәселелері;
- қате маршрутизация.

### Шешім

Туннельдің мінез-құлқына қарай диагностика жүргізіңіз:

{cut(Туннель DOWN күйінде тұр және қайта жүктегеннен кейін де құрылмайды)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-ike-ipsec,vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-routes]}

{/cut}

{cut(Туннель құрылған, бірақ трафик өтпейді немесе үлкен пакеттер өтпейді)}

{include(../../../../_includes/_vpn-tunnel-diagnostics.md)[tags=vpn-tunnel-diagnostics-secgroup,vpn-tunnel-diagnostics-mtu,vpn-tunnel-diagnostics-routes]}
{/cut}

{note:info}

Туннельдің ағымдағы күйі мен оның параметрлерін жеке кабинетте немесе OpenStack CLI көмегімен {linkto(../../instructions/vpn#vnet-vpn-view)[text=алуға]} болады.

{/note}

Егер мәселе сақталса, [техникалық қолдау қызметіне хабарласыңыз](https://cloud.vk.kz/contacts/). Өтінішке VPN-туннелінің идентификаторын, оның күйін және диагностикалық командалардың нәтижелерін қосыңыз.
