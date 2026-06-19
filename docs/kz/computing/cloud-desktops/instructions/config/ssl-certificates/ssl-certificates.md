# {heading(SSL сертификаттарын баптау)[id=desktops-ssl-certificates]}

{include(/kz/_includes/_translated_by_ai.md)}

SSL-сертификат пайдаланушыларды браузер арқылы қорғалған протокол бойынша қашықтағы жұмыс үстелдеріне қосу үшін қажет. {ifdef(public)}Cloud Desktop сервисін өрістету кезінде оның инфрақұрылымына автоматты түрде мыналар орнатылады:

- Базалық SSL-сертификат — {var(cloud)} шығарған өздігінен қол қойылған сертификат.
- [Let's Encrypt](https://letsencrypt.org) жария сертификаттау орталығы қол қойған SSL-сертификат. Бұл сертификат әдепкі бойынша пайдаланылады.{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{var(cloud)} Cloud Desktop инфрақұрылымында өрістетілген кезде автоматты түрде базалық SSL-сертификат орнатылады — {var(cloud)} шығарған өздігінен қол қойылған сертификат.{/ifdef}

Бұдан бөлек, өз SSL-сертификатыңызды кез келген уақытта қоса аласыз.

Егер қашықтағы жұмыс үстелінен компанияңыздың ішкі сервистеріне қол жеткізу үшін қосымша сенім тізбектері немесе түбірлік SSL-сертификаттар қажет болса, оларды Cloud Desktop ішіне {linkto(#desktops-add-chains-of-trust)[text=жүктеу]} қажет.

## {heading(Өз SSL-сертификатыңызды қосу)[id=desktops-own-certificate]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Қызмет баптаулары** бөліміне өтіңіз.
1. **Сертификаттар** қойындысында **Сертификатты өзгерту** немесе **Сертификат қосу** батырмасын басыңыз. Сертификат қосу терезесі ашылады.
1. **Қол қою үшін жария сертификаттау орталығын пайдалану** опциясын өшірулі күйде қалдырыңыз.
1. Сертификатыңыздың деректерін және жеке кілтіңізді тиісті өрістерге көшіріп, **Өзгерту** немесе **Қосу** батырмасын басыңыз.

{ifdef(public)}
## {heading(Let's Encrypt SSL-сертификатын қосу)[id=desktops-public-certificate]}

Егер әдепкі сертификатты өзгерткен болсаңыз, Let's Encrypt сертификатын қайта пайдалану үшін:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Қызмет баптаулары** бөліміне өтіңіз.
1. **Сертификаттар** қойындысында **Сертификатты өзгерту** батырмасын басыңыз.
1. **Қол қою үшін жария сертификаттау орталығын пайдалану** опциясын қосып, **Өзгерту** батырмасын басыңыз.
{/ifdef}

## {heading(Базалық SSL-сертификатты қосу)[id=desktops-vkcloud-certificate]}

{var(cloud)} ұсынатын базалық SSL-сертификатты пайдалану үшін ағымдағы қосылған сертификатты жойыңыз{ifdef(public)}, өзіңіздікін немесе Let's Encrypt{/ifdef}:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Қызмет баптаулары** бөліміне өтіңіз.
1. **Сертификат** блогында ![ ](../../../../../assets/more-icon.svg "inline") батырмасын басып, **Жою** тармағын таңдаңыз.
1. Жоюды растаңыз.

   Ағымдағы SSL-сертификатты жою бірнеше минутты алады. Осыдан кейін базалық SSL-сертификат қосылады.

   {note:warn}
   Алдыңғы сертификат жойылмайынша, жаңа сертификатты қосу мүмкін емес.
   {/note}

## {heading(Қосымша сенім тізбектерін немесе түбірлік сертификаттарды жүктеу)[id=desktops-add-chains-of-trust]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Қызмет баптаулары** бөліміне өтіңіз.
1. **Сертификаттар** қойындысында **Тізбек қосу** батырмасын басыңыз. Жаңа сенім тізбегін қосу терезесі ашылады.
1. Сенім тізбегінің деректерін тиісті өріске көшіріп, **Қосу** батырмасын басыңыз.
1. Қажет болса, қосымша сенім тізбектерін жүктеу үшін әрекеттерді қайталаңыз.
