# {heading(Үлестірілген алаңдар арасындағы теңестіру)[id=dns-global-balancer]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} әртүрлі деректер орталықтарында ({linkto(../../../../start/concepts/architecture#az)[text=қолжетімділік аймақтарында]}) орналастырылған бірнеше бэкенд-серверді пайдаланатын географиялық үлестірілген архитектураның есебінен ақауға төзімді қолданбаларды жасауға мүмкіндік береді. Қолжетімділік аймақтарының бірінде апат болған жағдайда, инфрақұрылым трафикті басқа деректер орталықтарындағы жұмысқа қабілетті серверлерге автоматты түрде қайта бағыттап, бос тұрып қалуды азайтады.

Бұл үлгіні іске асыру үшін DNS деңгейіндегі жүктемені теңестіру механизмі қолданылады, ол серверлердің қолжетімділігін тұрақты түрде тексеріп, сұрауларды резервтік серверлерге қайта бағыттайды.

Бұл мысалда әртүрлі қолжетімділік аймақтарындағы үш ВМ DNS сервисінің балансировка топтары арқылы біріктіріледі.

## {heading(Дайындық қадамдары)[id=dns-global-balancer-prep]}

1. Егер бұл бұрын жасалмаса, [техникалық қолдауға](/kz/contacts) жүгіну арқылы {linkto(../../../../networks/dns/concepts/global-balancer#dns-global-balancer)[text=DNS-балансировкеге]} қолжеткізіңіз.
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app).
1. Интернетке қолжетімді, әртүрлі {linkto(../../../../start/concepts/architecture#az)[text=қолжетімділік аймақтарында]} орналасқан үш ВМ таңдаңыз немесе {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
1. Осы ВМ-лардың сыртқы IP-мекенжайларын жазып алыңыз. Бұл мысалда:

    - `83.166.234.101`;
    - `109.120.188.102`;
    - `217.16.23.103`.

1. Жасалған ВМ-лар үшін көрсетілген портқа `169.254.169.100/32` IP-мекенжайынан келетін кіріс трафикті {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=рұқсат етіңіз]}. Бұл — сервистің қолжетімділігін тексеруге арналған {var(cloud)} техникалық мекенжайы. Егер қауіпсіздік тобының ережесі осы мекенжайдан ВМ портына қолжеткізуді шектесе, DNS-балансировка ВМ-ды қолжетімсіз деп белгілеп, оған трафик жібермейді.
1. DNS-аймақты {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-add)[text=жасаңыз]}. Бұл мысалда `example.dns.com`.
1. Егер бұл әлі жасалмаса, доменіңізді домен тіркеушісінде тіркеп, оны {var(cloud)} NS-серверлеріне делегирлеңіз. DNS-жазбаларының жаңартылуын күтіңіз: әдетте бұл 10–30 минутты алады.
1. DNS-балансировканың жұмысын тексеру үшін компьютеріңізге `dig` утилитасын орнатыңыз:

{tabs}

   {tab(Ubuntu, Debian)}

   ```console
   $ sudo apt update && sudo apt install dnsutils
   ```

   {/tab}

   {tab(Red Hat, CentOS, Fedora)}

   ```console
   $ sudo yum install bind-utils
   ```

   {/tab}

   {tab(macOS)}

   `dig` утилитасы жүйеге кіріктірілген және Терминал арқылы қолжетімді.

   {/tab}

   {tab(Windows)}

   Кіріктірілген `nslookup` утилитасын пайдаланыңыз немесе BIND Tools орнатыңыз:

   ```console
   choco install bind-toolsonly
   ```

   {/tab}

   {/tabs}

   {note:info}

   DNS-балансировканы тексеру үшін `dig` утилитасының баламаларын пайдалана аласыз. Бұл жағдайда тексеру пәрмендері өзгеше болады.

   {/note}

## {heading(1. DNS-аймаққа A-жазбаларды қосыңыз)[id=dns-global-balancer-a-records]}

DNS-аймақта қосылған әр ВМ-ның сыртқы IP-мекенжайына сәйкес келетін A-жазбаларды {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=жасаңыз]}.

## {heading(2. Балансировка тобын жасаңыз)[id=dns-global-balancer-group]}

1. DNS-аймақ үшін `Round Robin` балансировка түрімен балансировка тобын {linkto(../../../../networks/dns/instructions/publicdns/global-balancer#dns-global-balancer-add)[text=жасаңыз]}.
1. Балансировка тобына DNS-аймақта қолжетімді барлық A-жазбаларды қосыңыз:

   - әр жазба үшін `ICMP` мониторинг түрін таңдаңыз;
   - қалған параметрлерді әдепкі мәндермен қалдырыңыз.

## {heading(3. DNS-балансировканың жұмысын тексеріңіз)[id=dns-global-balancer-check]}

1. Компьютерде пәрменді орындаңыз:

   {tabs}

   {tab(dig)}

   ```console
   for i in {1..100}; do dig www.example.dns.com  A @ns4.msc.mail.ru +short; done | sort | uniq -c
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   for i in {1..100}; do 
       nslookup -type=A www.example.dns.com ns4.msc.mail.ru | grep -A1 "Name:" | tail -1
   done | sort | uniq -c
   ```

   {/tab}

   {/tabs}

   Күтілетін жауап:

   ```bash
   33 83.166.234.101
   34 109.120.188.102
   33 217.16.23.103
   ```

   Мұнда жолдың басында DNS-балансировка әр серверге жіберген сұраулар саны көрсетіледі. Жауап балансировканың жұмыс істеп тұрғанын және сұрауларды барлық қолжетімді серверлер (қолжетімділік аймақтары) арасында шамамен тең бөлетінін көрсетеді.

1. {var(cloud)} жеке кабинетінде үш ВМ-ның екеуін {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=тоқтатыңыз]}. Бұл сервердің істен шығуын немесе деректер орталығының қолжетімсіздігін модельдейді.
1. Компьютерде пәрменді қайталаңыз:

   {tabs}

   {tab(dig)}

   ```console
   for i in {1..100}; do dig www.example.dns.com  A @ns4.msc.mail.ru +short; done | sort | uniq -c
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   for i in {1..100}; do 
       nslookup -type=A www.example.dns.com ns4.msc.mail.ru | grep -A1 "Name:" | tail -1
   done | sort | uniq -c
   ```

   {/tab}

   {/tabs}

   Күтілетін жауап:

   ```bash
   100 217.16.23.103
   ```

   Мұнда жауап DNS-балансировка барлық сұрауларды бір серверге (қолжетімділік аймағына) жіберетінін көрсетеді, өйткені қалған екі сервер қолжетімсіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=dns-global-balancer-delete-source]}

Егер қосылған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Балансировка тобын {linkto(../../../../networks/dns/instructions/publicdns/global-balancer#dns-global-balancer-delete)[text=жойыңыз]}.
1. DNS-аймақты {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=жойыңыз]}.
1. ВМ-ды {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]}.
