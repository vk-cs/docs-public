# {heading(Қол жеткізу ережелерін басқару)[id=iaas-fs-access-rules]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Қол жеткізу ережесін қосу)[id=iaas-fs-access-rules-adding]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті файлдық қойма орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлттық есептеулер** → **Файлдық қойма** бөліміне өтіңіз.
1. Қажетті файлдық қойманың атауын басыңыз.
1. **Қол жеткізу ережелері** қойындысына өтіңіз.
1. **Жаңа ереже қосу** түймесін басыңыз.
1. Бастапқы көздің IP-ін немесе ішкі желі мекенжайын және қол жеткізу режимін көрсетіңіз.
1. **Ереже қосу** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install-package) көз жеткізіңіз.
1. Қол жеткізу ережесін пәрмен арқылы қосыңыз:

   ```console
   openstack share access create <ХРАНИЛИЩЕ> ip <IP_СЕТИ> --access-level <РЕЖИМ_ДОСТУПА>
   ```

   Мұнда:

   - `<ХРАНИЛИЩЕ>` — файлдық қойманың атауы немесе идентификаторы.
   - `<IP_СЕТИ>` — CIDR форматындағы файлдық қойма желісінің мекенжайы.
   - `<РЕЖИМ_ДОСТУПА>` — `rw` (оқу және жазу) немесе `ro` (тек оқу) мәндерін қабылдайтын аргумент.

1. Қол жеткізу ережелерінің тізімін сұратып, ереженің сәтті жасалғанын тексеріңіз:

   ```console
   openstack share access list <ХРАНИЛИЩЕ>
   ```

   Мұнда `<ХРАНИЛИЩЕ>` — файлдық қойманың атауы немесе идентификаторы.

{/tab}

{/tabs}

## {heading(Қол жеткізу ережесін жою)[id=iaas-fs-access-rules-deleting]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті файлдық қойма орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлттық есептеулер** → **Файлдық қойма** бөліміне өтіңіз.
1. Қажетті файлдық қойманың атауын басыңыз.
1. **Қол жеткізу ережелері** қойындысына өтіңіз.
1. Қажетті ереже үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Жою** тармағын таңдаңыз.
1. **Растау** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install-package) көз жеткізіңіз.
1. Қол жеткізу ережелерінің тізімін сұратып, қажетті ереженің идентификаторын алыңыз:

   ```console
   openstack share access list <ХРАНИЛИЩЕ>
   ```

   Мұнда `<ХРАНИЛИЩЕ>` — файлдық қойманың атауы немесе идентификаторы.

1. Қол жеткізу ережесін пәрмен арқылы жойыңыз:

   ```console
   openstack share access delete <ХРАНИЛИЩЕ> <ID_ПРАВИЛА>
   ```

   Мұнда:

   - `<ХРАНИЛИЩЕ>` — файлдық қойманың атауы немесе идентификаторы.
   - `<ID_ПРАВИЛА>` — жойылуы керек қол жеткізу ережесінің идентификаторы.

{/tab}

{/tabs}