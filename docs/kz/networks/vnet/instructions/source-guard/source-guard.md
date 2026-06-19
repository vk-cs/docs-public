# {heading(IP Source Guard)[id=vnet-source-guard]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-source-guard)[text=IP Source Guard]} пайдалану рұқсат етілген `allowed-address` IP мекенжайларының тізімі арқылы IP мекенжайын алмастыру шабуылдарынан қорғайды. Порт арқылы тек тізімде көрсетілген IP мекенжайларынан келетін трафик қана өтеді.

IP Source Guard қолдану мысалдары {linkto(../../../../networks/vnet/how-to-guides/vip-keepalived#vnet-vip-keepalived)[text=виртуалды IP мекенжайын]} және {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=VPN-туннельді]} ұйымдастыру жөніндегі практикалық нұсқаулықтарда келтірілген.

## {heading(Рұқсат етілген мекенжайлар тізіміне IP мекенжайын қосу)[id=vnet-source-guard-allowed-ip-add]}

{note:warn}
 Өзіне өзі сілтеме жасайтын {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=қауіпсіздік тобы]} бар порттарда рұқсат етілген IP мекенжайларының тізімін абайлап қолданыңыз (мысалы: `default` тобы). Егер осындай қауіпсіздік тобы бар порт үшін рұқсат етілген IP мекенжайларының тізімін жасасаңыз, онда осы IP мекенжайларынан келетін трафикке дәл осы топ тағайындалған желінің барлық порттарында рұқсат беріледі.

{cut(Бұл қалай жұмыс істейді?)}

Мысалы, `network` желісінде `default` тобы тағайындалған `port-vm-1` порты жасалған делік. Осы порт үшін рұқсат етілген IP мекенжайлары тізіміне `192.168.0.3` қосылған.

Сонда егер `network` желісінде `port-vm-2` портын жасап, оған `default` тобын тағайындасаңыз, `port-vm-2` үшін рұқсат етілген мекенжайлар тізімі бос болса да, бұл порт `192.168.0.3` IP мекенжайынан келетін трафикті өткізеді.

{/cut}
{/note}

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Қажетті порттың {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=атауын немесе идентификаторын алыңыз]}.

1. Команданы орындаңыз:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>
   ```

1. (Опционалды) Басқа IP мекенжайлары үшін команданы қайталаңыз.

   Егер виртуалды машина арқылы өтетін барлық трафиктің порттан шығуына рұқсат беру қажет болса, `0.0.0.0/0` IP мекенжайы мәнін пайдаланыңыз. Бұл опция желінің аралық тораптары, мысалы, маршруттауыш, файервол немесе VPN-шлюз үшін пайдалы. Опцияны абайлап қолданыңыз — ол желіні шабуылдарға осал етуі мүмкін.

{/tab}

{/tabs}

## {heading(Рұқсат етілген мекенжайлар тізімінен IP мекенжайын жою)[id=vnet-source-guard-allowed-ip-delete]}

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Қажетті порттың {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=атауын немесе идентификаторын алыңыз]}.

1. Команданы орындаңыз:

   ```console
   openstack port unset <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>,mac-address=<MAC-АДРЕС>
   ```

{/tab}

{/tabs}

## {heading(Порт үшін рұқсат етілген мекенжайлар тізімін тазалау)[id=vnet-source-guard-port-no-allowed]}

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Қажетті порттың {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=атауын немесе идентификаторын алыңыз]}.

1. Команданы орындаңыз:

   ```console
   openstack port set --no-allowed-address <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

{/tab}

{/tabs}

## {heading(Қолдау көрсетілетін параметрлер туралы ақпарат алу)[id=vnet-source-guard-port-set-help]}

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Порт параметрлерін қалай өзгертуге болатынын келесі команданы орындап біліңіз:

   ```console
   openstack port set --help
   ```

1. Порт параметрлерін қалай қалпына келтіруге болатынын келесі команданы орындап біліңіз:

   ```console
   openstack port unset --help
   ```

{/tab}

{/tabs}
