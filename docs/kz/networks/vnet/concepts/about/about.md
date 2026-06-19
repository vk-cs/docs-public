# {heading(Сервис туралы)[id=vnet-about]}

{include(/kz/_includes/_translated_by_ai.md)}

Сервис {ifdef(public)}таңдалған {/ifdef}{linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} {ifdef(public)}және {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймақ]}
{/ifdef}{var(cloud)} шеңберінде желілік өзара әрекеттесуді қамтамасыз етеді:

- Желілер мен ішкі желілерді құру. Ішкі желілер интернетте бағдарланбайтын жеке IP-адрестерді пайдаланады.

- {var(cloud)} сервистерін желілер мен ішкі желілерге қосу.

  Желіге жеке сервистің бөліктері де (мысалы, дерекқор кластерінің түйіндері), тұтас сервистер де қосылады (мысалы, дерекқор кластеры виртуалды машинамен өзара әрекеттесе алады).

  Мысалы, құрылған желілер мен ішкі желілердің үстінде {ifdef(public,private,private_pg)}[DNS сервисі](../../../dns){/ifdef}{ifdef(private_pdf,private_pg_pdf,private_cert)}{linkto(../../../../networks/dns#dns)[text=DNS сервисі]}{/ifdef} жұмыс істейді.

- Желілер мен ішкі желілердің үстінде мыналарды баптау мүмкіндігі:

  - {linkto(../../../../networks/vnet/concepts/router#vnet-router)[text=Маршрутизаторлар]} ішкі желілерді бір-бірімен байланыстыру үшін.

    Олардың көмегімен тек {var(cloud)} ішкі желілерін ғана емес, {var(cloud)} ішкі желілерін қашықтағы алаңдағы ішкі желілермен де байланыстыруға болады.

  - {linkto(../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer)[text=Жүктеме теңгергіштері]} {var(cloud)} сервистерінің бірнеше данасына кіріс трафигін тарату үшін.
{ifndef(private_cert)}
  - {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=Қауіпсіздік топтары]} {var(cloud)} белгілі бір сервистеріне трафикті шектеу ережелерімен.
{/ifndef}
{ifdef(public)}
  - {linkto(../../../../networks/vnet/concepts/vpn#vnet-vpn)[text=VPN]} {var(cloud)} ішкі желілерін клиенттік ішкі желілермен байланыстыру үшін.

## {heading(Әрі қарай не істеу керек)[id=vnet-about-next]}

- {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=Сервистің SDN-імен танысыңыз]}.
- {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet)[text=Желілік адрестеу және интернетке қол жеткізуді ұйымдастыру қағидаларымен танысыңыз]}.
{/ifdef}