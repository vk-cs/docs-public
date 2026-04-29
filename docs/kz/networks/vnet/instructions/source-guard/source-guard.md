{include(/kz/_includes/_translated_by_ai.md)}

 Использование [IP Source Guard](/kz/networks/vnet/concepts/traffic-limiting#source_guard) пайдалану рұқсат етілген `allowed-address`. IP мекенжайларының тізімі арқылы IP мекенжайын алмастыру шабуылдарынан қорғайды. Порт арқылы тек тізімде көрсетілген IP мекенжайларынан келетін трафик қана өтеді.

IP Source Guard қолдану мысалдары [виртуалды IP мекенжайын](/kz/networks/vnet/how-to-guides/vip-keepalived) және [VPN-туннельді](/kz/networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel).

## Рұқсат етілген мекенжайлар тізіміне IP мекенжайын қосу

{note:warn}

 Өзіне өзі сілтеме жасайтын [қауіпсіздік тобы](/kz/networks/vnet/concepts/traffic-limiting#secgroups), бар порттарда рұқсат етілген IP мекенжайларының тізімін абайлап қолданыңыз (мысалы `default`).  тобы). Егер осындай қауіпсіздік тобы бар порт үшін рұқсат етілген IP мекенжайларының тізімін жасасаңыз, онда осы IP мекенжайларынан келетін трафикке дәл осы топ тағайындалған желінің барлық порттарында рұқсат беріледі.

{cut(Как это работает?)}

Мысалы `network` желісінде `port-vm-1`, тобы тағайындалған `default`. порты жасалған делік. Осы порт үшін рұқсат етілген IP мекенжайлары тізіміне `192.168.0.3`.

Сонда егер `network` желісінде `port-vm-2` портын жасап, оған `default`, тобын тағайындасаңыз `192.168.0.3`, үшін рұқсат етілген мекенжайлар тізімі бос болса да, бұл порт `port-vm-2` IP мекенжайынан келетін трафикті өткізеді.

{/cut}

{/note}

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) жобада.

1. [Қажетті порттың атауын немесе идентификаторын алыңыз](/kz/networks/vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau) Қажетті порттың.

1. Команданы орындаңыз:

   ```console
   openstack port set <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>
   ```

1. (Опционалды) Басқа IP мекенжайлары үшін команданы қайталаңыз.

   Егер виртуалды машина арқылы өтетін барлық трафиктің порттан шығуына рұқсат беру қажет болса `0.0.0.0/0`. IP мекенжайы мәнін пайдаланыңыз. Бұл опция желінің аралық тораптары, мысалы, маршруттауыш, файервол немесе VPN-шлюз үшін пайдалы. Опцияны абайлап қолданыңыз — ол желіні шабуылдарға осал етуі мүмкін.

{/tab}

{/tabs}

## Рұқсат етілген мекенжайлар тізімінен IP мекенжайын жою

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) жобада.

1. [Қажетті порттың атауын немесе идентификаторын алыңыз](/kz/networks/vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau) Қажетті порттың.

1. Команданы орындаңыз:

   ```console
   openstack port unset <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>,mac-address=<MAC-АДРЕС>
   ```

{/tab}

{/tabs}

## Порт үшін рұқсат етілген мекенжайлар тізімін тазалау

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) жобада.

1. [Қажетті порттың атауын немесе идентификаторын алыңыз](/kz/networks/vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau) Қажетті порттың.

1. Команданы орындаңыз:

   ```console
   openstack port set --no-allowed-address <ИМЯ_ИЛИ_ИДЕНТИФИКАТОР_ПОРТА>
   ```

{/tab}

{/tabs}

## Қолдау көрсетілетін параметрлер туралы ақпарат алу

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) жобада.

2. Порт параметрлерін қалай өзгертуге болатынын келесі команданы орындап біліңіз:

   ```console
   openstack port set --help
   ```

3. Порт параметрлерін қалай қалпына келтіруге болатынын келесі команданы орындап біліңіз:

   ```console
   openstack port unset --help
   ```

{/tab}

{/tabs}
