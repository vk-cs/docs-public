# {heading(Floating IP-адреса)[id=vnet-floating-ip]}

{include(/kz/_includes/_translated_by_ai.md)}

Сіз Floating IP-адрестерін басқара аласыз: оларды қарау, жобаға қосу және жобадан шығару, сондай-ақ осы IP-адрестерін байланыстыру және ажырату.

## {heading(Просмотр списка Floating IP-адресов)[id=vnet-floating-ip-view]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **IP-адрестер** бөліміне өтіңіз.
1. **Floating IP** қойындысына өтіңіз.

   Floating IP-адрестерінің тізімі көрсетіледі (**Сыртқы IP** бағаны).

{/tab}

{tab(OpenStack CLI)}

1. {ifdef(public)}OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}{/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}OpenStack CLI-ге қосылыңыз{/ifdef}.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip list
   ```

{/tab}

{/tabs}

## {heading(Добавление Floating IP-адреса в проект)[id=vnet-floating-ip-add]}

{note:warn}
Floating IP-адрес ортақ пулдан кездейсоқ түрде тағайындалады.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **IP-адрестер** бөліміне өтіңіз.
1. **Floating IP** қойындысына өтіңіз.
1. **IP-ді жобаға қосу** батырмасын басыңыз.
1. (Опционалды) Сипаттама қосыңыз.
1. **IP қосу** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip create ext-net
   ```

{/tab}

{/tabs}

## {heading(Редактирование описания Floating IP-адреса)[id=vnet-floating-ip-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **IP-адрестер** бөліміне өтіңіз.
1. **Floating IP** қойындысына өтіңіз.
1. Қажетті Floating IP-адрес үшін ![ ](../../../../../assets/more-icon.svg "inline") белгішесін басып, **Сипаттаманы өңдеу** тармағын таңдаңыз.
1. Сипаттаманы орнатыңыз.
1. **Сақтау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Floating IP-адрестерінің {linkto(#vnet-floating-ip-view)[text=тізімін алыңыз]}. Тізімнен сипаттамасын өңдеу қажет болатын Floating IP-адрестің идентификаторын табыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip set <ID_FLOATING_IP-АДРЕСА> --description "<ОПИСАНИЕ>"
   ```

{/tab}

{/tabs}

## {heading(Привязка Floating IP-адреса)[id=vnet-floating-ip-associate]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **IP-адрестер** бөліміне өтіңіз.
1. **Floating IP** қойындысына өтіңіз.
1. **Ішкі IP** бағанында `Байланыстырылмаған` деп көрсетілген Floating IP-адрес үшін ![ ](../../../../../assets/more-icon.svg "inline") белгішесін басып, **IP байланыстыру** тармағын таңдаңыз.

   {note:info}Байланыстырылмаған IP-адрестерде көршілес бағанда байланыстыруға арналған сілтеме де бар. Floating IP-адресті басқа ішкі IP-адреске байланыстыру үшін, алдымен оны ағымдағы адресінен {linkto(#vnet-floating-ip-disassociate)[text=ажыратыңыз]}.{/note}

1. Ашылмалы тізімнен байланыстыру орындалатын ішкі IP-адресі бар OpenStack портын таңдаңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Floating IP-адрестерінің {linkto(#vnet-floating-ip-view)[text=тізімін алыңыз]}. Тізімнен портқа байланыстыру керек болатын Floating IP-адрестің идентификаторын табыңыз.
1. Порттар тізімін {linkto(../../ports#vnet-ports)[text=алыңыз]}. Тізімнен Floating IP-адресті байланыстыру керек болатын порттың идентификаторын табыңыз.
1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip set <ID_FLOATING_IP-АДРЕСА> --port <ID_ПОРТА>
   ```

{/tab}

{/tabs}

## {heading(Отвязка Floating IP-адреса)[id=vnet-floating-ip-disassociate]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **IP-адрестер** бөліміне өтіңіз.
1. **Floating IP** қойындысына өтіңіз.
1. Ішкі IP-адреске байланыстырылған Floating IP-адрес үшін ![ ](../../../../../assets/more-icon.svg "inline") белгішесін басып, **IP ажырату** тармағын таңдаңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Floating IP-адрестерінің {linkto(#vnet-floating-ip-view)[text=тізімін алыңыз]}. Тізімнен порттан ажырату керек болатын Floating IP-адрестің идентификаторын табыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip unset <ID_FLOATING_IP-АДРЕСА> --port
   ```

{/tab}

{/tabs}

## {heading(Удаление Floating IP-адреса из проекта)[id=vnet-floating-ip-delete]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті IP-адрес орналасқан жобаны таңдаңыз.
1. **Виртуалды желілер** → **IP-адрестер** бөліміне өтіңіз.
1. **Floating IP** қойындысына өтіңіз.
1. Қажетті Floating IP-адрес үшін ![ ](../../../../../assets/more-icon.svg "inline") белгішесін басып, **IP-ді жобадан шығару** тармағын таңдаңыз. Бірден бірнеше IP-адресті ажырату үшін, оларды құсбелгілер арқылы таңдап, **IP-ді жобадан шығару** батырмасын басыңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Floating IP-адрестерінің {linkto(#vnet-floating-ip-view)[text=тізімін алыңыз]}. Тізімнен жобадан жою қажет болатын Floating IP-адрестің идентификаторын табыңыз.

1. Келесі пәрменді орындаңыз:

   ```console
   openstack floating ip delete <ID_FLOATING_IP-АДРЕСА>
   ```

{/tab}

{/tabs}
