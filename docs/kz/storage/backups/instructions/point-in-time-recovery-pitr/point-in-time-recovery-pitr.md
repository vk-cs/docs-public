# {heading(Point-in-time recovery (PITR))[id=backup-pitr]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Функционал тек PostgreSQL СУБД үшін ғана қолжетімді.

{/note}

## {heading(Кестені жасау)[id=backup-pitr-create]}

PITR кестесін жасау кезінде СУБД журналдары көшіріледі.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервтік көшіру** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. **Қосу** түймесін басыңыз.
1. Ашылған терезеде мыналарды көрсетіңіз:

    - **Кесте атауы**: жасалатын кестенің атауын енгізіңіз.
    - **Басталу уақыты**: терезеде төменде көрсетілген уақыт белдеуіндегі резервтік көшірудің басталу уақытын көрсетіңіз.
    - **Сақтау, көшірмелер саны**: сақталатын резервтік көшірмелер санын көрсетіңіз.
    - **Резервтік көшіру аралығы**: резервтік көшіруді іске қосулар арасындағы қолайлы аралықты таңдаңыз.
    - **Дерекқор**: PostgreSQL СУБД-сы бар жайылған инстансты таңдаңыз.

1. **Кестені сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Бар кестені өңдеу)[id=backup-pitr-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервтік көшіру** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. Қажетті кесте үшін ![ ](../../../../assets/more-icon.svg "inline") батырмасын басып, **Кестені өңдеу** тармағын таңдаңыз.
1. Қажетті өзгерістерді енгізіп, **Кестені сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Кестенің резервтік көшірмелерін қарау)[id=backup-pitr-view]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервтік көшіру** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. Қажетті кестенің атауын басыңыз.

Таңдалған кесте үшін резервтік көшірмелер тізімі көрсетіледі.

{/tab}

{/tabs}

## {heading(Резервтік көшірмеден дерекқор инстансын жасау)[id=backup-pitr-restore]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Cloud Backup → Резервтік көшіру** бөліміне өтіңіз.
1. **Point-in-time recovery** қойындысына өтіңіз.
1. Қажетті кестенің атауын басыңыз.
1. Қажетті резервтік көшірме үшін ![ ](../../../../assets/more-icon.svg "inline") батырмасын басып, **Бэкаптан қалпына келтіру** тармағын таңдаңыз.
1. **Инстансты жасау** қадамында {ifdef(private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../dbs/dbaas/instructions/create#dbaas-create)[text=жасалатын БД]}{/ifdef}{ifndef(private-pdf,private-pg-pdf)}[жасалатын БД](../../../../dbs/dbaas/instructions/create){/ifndef} үшін қажетті параметрлерді көрсетіп, **Келесі қадам** түймесін басыңыз.

   {note:warn}
   Жасалатын инстансқа резервтік көшірме көлемінен көбірек диск кеңістігі қажет болуы мүмкін, себебі Cloud Backup сервисі деректерді сығуды пайдаланады.

   Резервтік көшірме жасалған бастапқы инстанстың көлеміне тең диск өлшемін көрсетіңіз. Егер ол белгісіз болса, диск өлшемін резервтік көшірме көлемінен 2–3 есе үлкен етіп көрсетіңіз.
   {/note}

1. (Опционалды) Аттас өрісте қажетті резервтік көшірменің күні мен уақытын көрсетіңіз. Өрісті бос қалдырсаңыз, соңғы жасалған резервтік көшірме автоматты түрде таңдалады.
1. **Дерекқорды жасау** түймесін басыңыз.

{/tab}

{/tabs}
