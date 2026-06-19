# {heading(Қауіпсіздік топтары)[id=vnet-secgroups]}

{include(/kz/_includes/_translated_by_ai.md)}

Қауіпсіздік тобы — бұл инстанстар порттарына тағайындауға болатын трафиктің өтуіне арналған теңшелетін рұқсат ету ережелерінің жиынтығы.

## {heading(Қауіпсіздік топтарының тізімін және олар туралы ақпаратты қарау)[id=vnet-secgroups-view]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.

   Қауіпсіздік топтарының тізімі көрсетіледі.

1. Қауіпсіздік тобының атауын басыңыз.

   Ол туралы толық ақпараты бар бет ашылады.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Қауіпсіздік топтарының тізімін көру үшін келесі команданы орындаңыз:

   ```console
   openstack security group list
   ```

1. Қауіпсіздік тобы туралы толық ақпаратты көру үшін келесі команданы орындаңыз:

   ```console
   openstack security group show <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Қауіпсіздік тобының ережелерін көру үшін:

   ```console
   openstack security group rule list --long <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}


## {heading(Қауіпсіздік тобын жасау)[id=vnet-secgroups-add]}

{note:warn}
Топ идентификаторы платформаның барлық сервистерінде көрсетіле бермейді. Кейін оларды оңай ажырату үшін топтарды бірегей атаулармен жасаңыз.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. **Қосу** батырмасын басыңыз.
1. Қауіпсіздік тобының атауын енгізіңіз.
1. Сипаттаманы қосыңыз.
1. **Топты жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Жобадағы қауіпсіздік топтарын қарап шығыңыз:

   ```console
   openstack security group list
   ```

1. Қауіпсіздік тобы туралы ақпаратты алыңыз:

   ```console
   openstack security group show <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Қауіпсіздік тобын жасаңыз:

   ```console
   openstack security group create --description <ОПИСАНИЕ_ГРУППЫ> <НАЗВАНИЕ_НОВОЙ_ГРУППЫ>
   ```

{/tab}

{/tabs}

## {heading(Қауіпсіздік тобының атауы мен сипаттамасын өңдеу)[id=vnet-secgroups-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. Қауіпсіздік тобының атауын басыңыз.

   Ол туралы толық ақпараты бар бет ашылады.

1. Қауіпсіздік тобы атауының жанындағы қарындаш белгішесін басыңыз.

   Атауын және (қажет болса) қауіпсіздік тобының сипаттамасын өңдеңіз.

1. **Сақтау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Қауіпсіздік тобының сипаттамасы мен атауын өзгерту үшін келесі команданы орындаңыз:

   ```console
   openstack security group set --description <ОПИСАНИЕ_ГРУППЫ_БЕЗОПАСНОСТИ> --name <ИМЯ_ГРУППЫ_БЕЗОПАСНОСТИ> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}

## {heading(Ереже қосу)[id=vnet-secgroups-add-rule]}

Қауіпсіздік тобының ережесі — бұл трафиктің өту шарттарын анықтайтын параметрлер жиынтығы. Ережелер қауіпсіздік топтарына қосылады, ал бұл топтар өз кезегінде инстанстар порттарына қолданылады.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. Қауіпсіздік тобының атауын басыңыз.
1. **Кіріс трафик** және **Шығыс трафик** блоктарында **+ Ереже қосу** түймесін басыңыз.
1. Трафик түрін таңдаңыз (SSH, HTTP, HTTPS және т.б.). Кейбір түрлерді таңдағанда, ереженің қалған параметрлері алдын ала бапталады немесе қолжетімсіз болады.
1. Қажетті протоколды көрсетіңіз.
1. Трафикке рұқсат берілетін портты көрсетіңіз.
1. **Қашықтағы мекенжай** бөлімінде таңдалған трафик түріне рұқсат берілетін мекенжайды көрсетіңіз:

   {tabs}

   {tab(Барлық IP мекенжайлары)}

   Ереже барлық IP мекенжайлары үшін трафикке рұқсат береді.

   {/tab}

   {tab(IP мекенжайларының ауқымы)}

   Ереже тек көрсетілген IP мекенжайы үшін трафикке рұқсат береді:

    1. Пайда болған өріске түйіннің IP мекенжайын немесе `0.0.0.0/0` пішіміндегі маскасы бар ішкі желіні көрсетіңіз.

    1. (Опционалды) Құрылғыңыз үшін трафикке рұқсат беру үшін **Менің IP-мді пайдалану** батырмасын басыңыз.

   {/tab}

   {tab(Қауіпсіздік тобы)}

   Ереже көрсетілген қауіпсіздік тобы тағайындалған түйіндермен трафик алмасуға рұқсат береді.

   Пайда болған өрісте қауіпсіздік тобын таңдаңыз.

   {/tab}

   {/tabs}

1. (Опционалды) **Сипаттама қосу** батырмасын басып, пайда болған өрісте жаңа ережені сипаттаңыз.
1. **Ережені сақтау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Топ ережелерінің тізімін қарап шығыңыз:

   ```console
   openstack security group rule list --long <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Ереже жасаңыз:

   ```console
   openstack security group rule create <АРГУМЕНТЫ> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

   Ережені жасау командасының қолжетімді аргументтері:

    - `--remote-ip` — қосылуға болатын мекенжайды көрсетеді (CIDR пішімінде).
    - `--remote-group` — инстанстары трафик көзі бола алатын топты көрсетеді.
    - `--dst-port` — тағайындалу порты, TCP және UDP протоколдары үшін қажет.
    - `--protocol` — протокол, атауын, нөмірін немесе барлық протоколдарға рұқсатты (any) көрсетуге болады.
    - `--description` — еркін сипаттама.
    - `--icmp-type` — ICMP түрі.
    - `--icmp-code` — ICMP коды.
    - `--ingress` — ережені кіріс трафикке қолдану.
    - `--egress` — ережені шығыс трафикке қолдану.
    - `--ethertype` — EtherType мәні (IPv4, IPv6).

{/tab}

{/tabs}

## {heading(Ережені жою)[id=vnet-secgroups-delete-rule]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. Қауіпсіздік тобының атауын басыңыз.
1. Қажетті ереже тағайындалған ВМ бар жолдағы қоқыс жәшігі белгішесін басыңыз.
1. **Растау** батырмасын басыңыз.
1. Жойылуы керек ереже үшін ![ ](../../../../assets/more-icon.svg "inline") батырмасын басып, **Жою** тармағын таңдаңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Ереже туралы толық ақпаратты көру үшін келесі команданы орындаңыз:

   ```console
   openstack security group rule show <ID_ПРАВИЛА>
   ```

1. Ережені жою үшін келесі команданы орындаңыз:

   ```console
   openstack security group rule delete <ID_ПРАВИЛА>
   ```

{/tab}

{/tabs}

## {heading(Топты инстансқа тағайындау)[id=vnet-secgroups-instance-add-sg]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. Қауіпсіздік тобының атауын басыңыз.
1. **Ережелер тобы бар виртуалды машиналар** бөлімінде **Виртуалды машинаны қосу** батырмасын басыңыз.
1. Топ қосылатын инстанстарды таңдаңыз.
1. **Ережелер тобын қосу** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Келесі команданы орындаңыз:

   ```console
   openstack server add security group <ID_ИНСТАНСА> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}

## {heading(Топты портқа тағайындау)[id=vnet-secgroups-port-set-sg]}

{include(../../../../_includes/_sg-port-set.md)}

## {heading(Топты инстанстан ажырату)[id=vnet-secgroups-instance-remove-sg]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. Қауіпсіздік тобының атауын басыңыз.
1. **Ережелер тобы бар виртуалды машиналар** бөлімінде инстанс жолының үстіне меңзерді апарыңыз.
1. Қоқыс жәшігі белгішесін басыңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Келесі команданы орындаңыз:

   ```console
   openstack server remove security group <ID_ИНСТАНСА> <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}

## {heading(Топты порттан ажырату)[id=vnet-secgroups-port-unset-sg]}

{include(../../../../_includes/_sg-port-unset.md)}

## {heading(Қауіпсіздік тобын жою)[id=vnet-secgroups-delete]}

{tabs}

{tab(Жеке кабинет)}

{note:warn}
Топты осы топты пайдаланатын порттар бар болғанша жою мүмкін емес. Сондай-ақ `default` қауіпсіздік тобын және басқа да алдын ала бапталған топтарды жоюға болмайды.
{/note}

Бұл топтық операция: қажет болса, бірнеше қауіпсіздік тобын бірден жалаушалар арқылы таңдап, жоюға болады.

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз.
1. Жойылуы керек қауіпсіздік тобы үшін ![ ](../../../../assets/more-icon.svg "inline") батырмасын басып, **Жою** тармағын таңдаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Келесі команданы орындаңыз:

   ```console
   openstack security group delete <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

{/tab}

{/tabs}
