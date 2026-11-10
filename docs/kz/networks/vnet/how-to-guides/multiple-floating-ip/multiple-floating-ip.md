# {heading(Бір ВМ-ге бірнеше Floating IP-адресті байланыстыру)[id=vnet-multiple-floating-ip]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Әдепкі бойынша ВМ жасалғанда оған бір ішкі IP-адрес тағайындалады. Оған бір Floating IP-адресті байланыстыруға болады. Бір ВМ-ге бірнеше Floating IP-адрес байланыстыру үшін подсетьте қосымша порттар жасап, оларды ВМ-ге қосу және әр портқа өз Floating IP-адресін байланыстыру қажет.

## {heading(Дайындық қадамдар)[id=vnet-multiple-floating-ip-prep]}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына көз жеткізіңіз]} және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. {var(cloud)} жобаңызда виртуалды машинаңызды таңдаңыз немесе {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
1. Виртуалды машинаны желіге {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=қосыңыз]}. Желінің және subnet-тің идентификаторларын жазып алыңыз.
1. Жобаға қажетті санды Floating IP-адрестерді {linkto(../../instructions/ip/floating-ip#vnet-floating-ip-add)[text=қосыңыз]}.

## {heading(1. Қосымша порттарды жасаңыз)[id=vnet-multiple-floating-ip-add-port]}

1. Әрбір қосымша Floating IP-адрес үшін виртуалды машинаның subnet-іне {linkto(../../instructions/ports#vnet-ports-add)[text=порт қосыңыз]}.

1. Порттар жасалғанына көз жеткізіңіз:

   ```console
   openstack port list --network <ЖЕЛІ_АТЫ_НЕМЕСЕ_ID>
   ```

## {heading(2. Порттарды ВМ-ге қосыңыз)[id=vnet-multiple-floating-ip-connect-port]}

1. Жасалған порттарды ВМ-ге қосыңыз:

   ```console
   openstack server add port <ВМ_ID> <ПОРТ_ID>
   ```

1. Порттардың ВМ-ге сәтті қосылғанына көз жеткізіңіз:

   ```console
   openstack port list --server <ВМ_ID>
   ```

## {heading(3. Floating IP-адрестерді ВМ порттарына байланыстырыңыз)[id=vnet-multiple-floating-ip-connect-fip]}

1. Әрбір бос Floating IP-адресті ВМ-нің сәйкес портына {linkto(../../instructions/ip/floating-ip#vnet-floating-ip-associate)[text=байланыстырыңыз]}.

1. Floating IP-адрестердің порттарға сәтті байланысқанына көз жеткізіңіз:

   ```console
   openstack floating ip list
   ```

## {heading(4. ВМ-де желілік интерфейстерді баптаңыз)[id=vnet-multiple-floating-ip-interface]}

ВМ-ге порттар қосылғаннан кейін қосымша желілік интерфейстер пайда болады.

Әрбір жаңа порт үшін ВМ операциялық жүйесінің ішінде желілік интерфейсті {linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check)[text=тексеріп, баптаңыз]}.

## {heading(5. Маршрутизацияны баптаңыз)[id=vnet-multiple-floating-ip-routing]}

Әдепкі бойынша барлық шығатын пакеттер ВМ-нің негізгі интерфейсі арқылы жіберіледі. Осыған байланысты қосымша интерфейстер арқылы келген сұрауларға жауаптар негізгі интерфейс арқылы жіберіледі және оларға байланыстырылған Floating IP-адрестер жұмыс істемейді.

Әрбір интерфейс өз маршрутын қолдануы үшін маршрутизация ережелерін (policy routing) баптаңыз. Әрбір интерфейс үшін маршрутизация кестесін және осы интерфейстің IP-адресінен келетін пакеттерді оның gateway арқылы бағыттайтын ережені жасаңыз.

Төменде `10.0.1.97/24` ішкі IP-адресі және `10.0.1.1` gateway-і бар `eth1` интерфейсі үшін мысалдар келтірілген.

{tabs}

{tab(Ubuntu/Debian)}

1. Әрбір қосымша интерфейс үшін `/etc/netplan/50-cloud-init.yaml` файлына `routes` және `routing-policy` параметрлерін қосыңыз. 

   Мысал: 

   ```yaml
   network:
     version: 2
     ethernets:
       eth0:
         dhcp4: true
       eth1:
         dhcp4: true
         routes:
           - to: 0.0.0.0/0
             via: 10.0.1.1
             table: 101
         routing-policy:
           - from: 10.0.1.97/32
             table: 101
   ```

   Әрбір келесі интерфейс үшін келесі кесте нөмірін (102, 103 және т. б.) қолданып, сәйкес IP-адрес пен gateway-ді көрсетіңіз.

1. Баптауларды қолданыңыз:

   ```console
   sudo netplan apply
   ```

{/tab}

{tab(RHEL)}

1. Әрбір қосымша интерфейс үшін `/etc/sysconfig/network-scripts/route-<ИНТЕРФЕЙС_АТЫ>` файлын жасаңыз. 

   Мысал:

   ```ini
   0.0.0.0/0 via 10.0.1.1 dev eth1 table 101
   ```

1. Әрбір қосымша интерфейс үшін `/etc/sysconfig/network-scripts/rule-<ИНТЕРФЕЙС_АТЫ>` файлын жасаңыз:

   Мысал:

   ```ini
   from 10.0.1.97/32 table 101
   ```

1. Желіні қайта іске қосыңыз:

   ```console
   sudo systemctl restart network
   ```

{/tab}

{tab(Windows)}

1. Интерфейстердің нөмірлерін алыңыз:

   ```powershell
   Get-NetAdapter | Format-Table Name, InterfaceIndex
   ```

1. Әрбір қосымша адаптер үшін gateway мен интерфейс нөмірін көрсете отырып, маршрут қосыңыз:

   Мысал:

   ```powershell
   route add 0.0.0.0 mask 0.0.0.0 10.0.1.1 metric 101 if <ИНТЕРФЕЙС_НӨМІРІ>
   ```

{/tab}

{/tabs}

## {heading(6. Floating IP-адрестердің қолжетімділігін тексеріңіз)[id=vnet-multiple-floating-ip-verify]}

1. Әрбір Floating IP-адрестің сырттан қолжетімді екенін тексеріңіз. Тексеруді өз компьютеріңізден орындаңыз:

   ```console
   ping <FLOATING_IP_1>
   ping <FLOATING_IP_2>
   ```

1. ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}. 

1. Әрбір интерфейстің subnet-тен ішкі IP-адресі бар екеніне көз жеткізіңіз:

   {tabs}
   {tab(Linux)}

   ```console
   ip addr show
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   Get-NetIPAddress -AddressFamily IPv4 | Format-Table InterfaceAlias, IPAddress
   ```
   {/tab}
   {/tabs}

1. Floating IP-адрес пен ішкі IP-адрес арасындағы байланысты тексеріңіз:

   {tabs}
   {tab(Linux)}

   ```console
   curl --interface <ИНТЕРФЕЙС_АТЫ> ifconfig.me
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe --interface <ИНТЕРФЕЙС_АТЫ> ifconfig.me
   ```
   {/tab}
   {/tabs}

   Команда осы интерфейске байланыстырылған Floating IP-адресті қайтарады.

1. Маршрутизация ережелері қолданылғанына көз жеткізіңіз:

   {tabs}
   {tab(Linux)}

   ```console
   ip rule list
   ip route show table <КЕСТЕ_НӨМІРІ>
   ```
   {/tab}

   {tab(Windows)}

   ```powershell
   route print
   ```
   {/tab}
   {/tabs}