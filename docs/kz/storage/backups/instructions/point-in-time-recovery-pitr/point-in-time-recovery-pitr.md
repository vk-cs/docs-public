# {heading(Point-in-time recovery (PITR))[id=backup-pitr]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}
Функционал тек СУБД PostgreSQL үшін ғана қолжетімді.
{/note}

## {heading(Кесте жасау)[id=backup-pitr-create]}

PITR кестесін жасағанда СУБД журналдары көшіріледі.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервное копирование** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. **Добавить** түймесін басыңыз.
1. Ашылған терезеде көрсетіңіз:

   - **Кесте атауы**: жасалатын кесте үшін атау енгізіңіз.
   - **Басталу уақыты**: резервтік көшірмелеудің басталу уақытын терезеде төменде көрсетілген уақыт белдеуінде көрсетіңіз.
   - **Сақтау мерзімі, көшірме саны**: сақталатын резервтік көшірмелердің санын көрсетіңіз.
   - **Резервтік көшірмелеу аралығы**: резервтік көшірмелеуді іске қосу арасындағы қолайлы аралықты таңдаңыз.
   - **Деректер қоры**: СУБД PostgreSQL орнатылған инстансты таңдаңыз.

1. **Кестені сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Бар кестені өңдеу)[id=backup-pitr-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервное копирование** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. Қажетті кесте үшін ![ ](../../../../assets/more-icon.svg "inline") түймесін басып, **Кестені өңдеу** тармағын таңдаңыз.
1. Қажетті өзгерістер енгізіп, **Кестені сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Кестенің резервтік көшірмелерін көру)[id=backup-pitr-view]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервное копирование** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. Қажетті кестенің атауын басыңыз.

Таңдалған кесте үшін резервтік көшірмелердің тізімі көрсетіледі.

{/tab}

{/tabs}

## {heading(Резервтік көшірмеден деректер қоры инстансын жасау)[id=backup-pitr-restore]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервное копирование** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. Қажетті кестенің атауын басыңыз.
1. Қажетті резервтік көшірме үшін ![ ](../../../../assets/more-icon.svg "inline") түймесін басып, **Бэкаптан қалпына келтіру** тармағын таңдаңыз.
1. **Инстанс жасау** қадамында {ifdef(private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../dbs/dbaas/instructions/create#dbaas-create)[text=жасалатын ДҚ]}{/ifdef}{ifndef(private-pdf,private-pg-pdf)}[жасалатын ДҚ](../../../../dbs/dbaas/instructions/create){/ifndef} қажетті параметрлерін көрсетіп, **Келесі қадам** түймесін басыңыз.

   {note:warn}
   Жасалатын инстанс резервтік көшірме көлемінен көбірек диск орнын қажет етуі мүмкін, себебі Cloud Backup сервисі деректерді сығуды қолданады.

   Диск өлшемін резервтік көшірме жасалған бастапқы инстанс көлеміне тең етіп көрсетіңіз. Ол белгісіз болса, диск өлшемін резервтік көшірме көлемінен 2–3 есе үлкен етіп көрсетіңіз.
   {/note}

1. (Қалауыңыз бойынша) Қажетті резервтік көшірменің күні мен уақытын аттас өрісте көрсетіңіз. Өрісті бос қалдырсаңыз, соңғы жасалған резервтік көшірме автоматты түрде таңдалады.
1. **Деректер қорын жасау** түймесін басыңыз.

{/tab}

{/tabs}