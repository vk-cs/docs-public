{include(/kz/_includes/_translated_by_ai.md)}

Сіз Floating IP-адрестерін басқара аласыз: оларды қарау, жобаға қосу және жобадан шығару, сондай-ақ осы IP-адрестерін байланыстыру және ажырату.

## {heading(Floating IP-адрестерінің тізімін қарау)[id=view]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **IP-адрестер**.
1. қойындысына өтіңіз **Floating IP**.

   Floating IP-адрестерінің тізімі көрсетіледі **Сыртқы IP**).

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) OpenStack CLI-ге қосылыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip list
   ```

{/tab}

{/tabs}

## {heading(Floating IP-адресін жобаға қосу)[id=add]}

{note:warn}

Floating IP-адрес ортақ пулдан кездейсоқ түрде тағайындалады.

{/note}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **IP-адрестер**.
1. қойындысына өтіңіз **Floating IP**.
1. батырмасын басыңыз **IP-ді жобаға қосу**.
1. (Опционалды) Сипаттама қосыңыз.
1. батырмасын басыңыз **IP қосу**.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip create ext-net
   ```

{/tab}

{/tabs}

## {heading(Floating IP-адресінің сипаттамасын өңдеу)[id=edit]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **IP-адрестер**.
1. қойындысына өтіңіз **Floating IP**.
1. Қажетті Floating IP-адрес үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **Сипаттаманы өңдеу**.
1. Сипаттаманы орнатыңыз.
1. батырмасын басыңыз **Сақтау**.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.

1. [тізімін алыңыз](#view) Тізімнен сипаттамасын өңдеу қажет болатын Floating IP-адрестің идентификаторын табыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip set <FLOATING_IP_АДРЕСІНІҢ_ИДЕНТИФИКАТОРЫ> --description "<СИПАТТАМА>"
   ```

{/tab}

{/tabs}

## {heading(Floating IP-адресін байланыстыру)[id=associate]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **IP-адрестер**.
1. Қойындысына өтіңіз **Floating IP**.
1. Бағанында ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **IP байланыстыру** өрісінде `Байланыстырылмаған`, тармағын таңдаңыз **IP байланыстыру**.

   {note:info}
Байланыстырылмаған IP-адрестерде көршілес бағанда байланыстыруға арналған сілтеме де бар. Floating IP-адресті басқа ішкі IP-адреске байланыстыру үшін, алдымен оны [ағымдағы адресінен ажыратыңыз](#disassociate).{/note}

1. Ашылмалы тізімнен байланыстыру орындалатын ішкі IP-адресі бар OpenStack портын таңдаңыз.
1. Батырмасын басыңыз **Растау**.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.

1. [тізімін алыңыз](#view) Тізімнен портқа байланыстыру керек болатын Floating IP-адрестің идентификаторын табыңыз.
1. [алыңыз](../../ports) Тізімнен Floating IP-адресті байланыстыру керек болатын порттың идентификаторын табыңыз.
1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip set <FLOATING_IP_АДРЕСІНІҢ_ИДЕНТИФИКАТОРЫ> --port <ПОРТТЫҢ_ИДЕНТИФИКАТОРЫ>
   ```

{/tab}

{/tabs}

## {heading(Floating IP-адресін ажырату)[id=disassociate]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **IP-адрестер**.
1. Қойындысына өтіңіз **Floating IP**.
1. Ішкі IP-адреске байланыстырылған Floating IP-адрес үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **IP ажырату**.
1. Батырмасын басыңыз **Растау**.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.

1. [тізімін алыңыз](#view) Тізімнен порттан ажырату керек болатын Floating IP-адрестің идентификаторын табыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip unset <FLOATING_IP_АДРЕСІНІҢ_ИДЕНТИФИКАТОРЫ> --port
   ```

{/tab}

{/tabs}

## {heading(Floating IP-адресін жобадан жою)[id=delete]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. Бөлімге өтіңіз **Виртуалды желілер** → **IP-адрестер**.
1. Қойындысына өтіңіз **Floating IP**.
1. Қажетті Floating IP-адрес үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып **IP-ді жобадан шығару**. тармағын таңдаңыз. Бірден бірнеше IP-адресті ажырату үшін, оларды құсбелгілер арқылы таңдап **IP-ді жобадан шығару**.
1. Батырмасын басыңыз **Растау**.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.

1. [Тізімін алыңыз](#view) Тізімнен жобадан жою қажет болатын Floating IP-адрестің идентификаторын табыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip delete <FLOATING_IP_АДРЕСІНІҢ_ИДЕНТИФИКАТОРЫ>
   ```

{/tab}

{/tabs}
