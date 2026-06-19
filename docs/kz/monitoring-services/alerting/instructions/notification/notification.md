# {heading(Хабарландыру арналары)[id=alerting-notification]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Хабарландыру арнасын құру)[id=alerting-notification-add]}

Инцидент туралы хабарландыру алу үшін хабарландыру арнасын орнату қажет. Хабарландыру арнасында алушы мен жіберу әдістері туралы ақпарат болады.

{note:info}

Сіз бірнеше хабарландыру арнасын көрсете аласыз. Бір арна бірнеше триггерде қайта-қайта пайдаланылуы мүмкін.

{/note}

Хабарландыру арнасын құру үшін:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг → Алертинг** бөліміне өтіңіз.
1. **Хабарландыру арналары** қойындысына өтіңіз.
1. **Қосу** батырмасын басыңыз.
1. Хабарландыру арнасының параметрлерін көрсетіңіз:

   - **Арна атауы**: арна үшін атау енгізіңіз.
   - **Хабарландыру түрі**: `Email` немесе `SMS` опциясын таңдаңыз.
   - **Алушы**: хабарландыру алушысының электрондық поштасын немесе телефон нөмірін енгізіңіз.

1. **Арнаны құру** батырмасын басыңыз.

## {heading(Хабарландыру арнасын өңдеу)[id=alerting-notification-edit]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг → Алертинг** бөліміне өтіңіз.
1. **Хабарландыру арналары** қойындысына өтіңіз.
1. Қажетті арна үшін ![more-icon](../../../../assets/more-icon.svg "inline") белгішесін басып, **Өзгерту** тармағын таңдаңыз.
1. Қажетті өзгерістерді енгізіңіз.
1. **Арнаны сақтау** батырмасын басыңыз.

## {heading(Хабарландыру арнасын жою)[id=alerting-notification-delete]}

{note:info}
Арнаны жоймас бұрын онымен байланысты барлық {linkto(../triggers#alerting-triggers-delete)[text=триггерлерді жойыңыз]}.
{/note}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг → Алертинг** бөліміне өтіңіз.
1. **Хабарландыру арналары** қойындысына өтіңіз.
1. Қажетті арна үшін ![more-icon](../../../../assets/more-icon.svg "inline") белгішесін басып, **Жою** тармағын таңдаңыз.
1. Жоюды растаңыз.
