Жеке кабинет бетінің тақырыбында жобаның {ifdef(public)}{linkto(../../concepts/balance#billing-balance)[text=дербес шотының балансы]}{/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../concepts/balance#billing-balance)[text=дербес шотының балансы]}{/ifdef} көрсетіледі.

Детализация мен сервистерге жұмсалған шығындарды көру үшін:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жоба балансы бетін келесі тәсілдердің бірімен ашыңыз:

    - Бет тақырыбындағы пайдаланушы атын басып, ашылмалы тізімнен **Баланс және төлемдер** тармағын таңдаңыз.
    - **Баланс** бөліміне өтіңіз.

{note:info}
{ifdef(public)}{linkto(../detail#billing-detail)[text=Детализация]}{/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../detail#billing-detail)[text=Детализация]}{/ifdef} рөліңіз {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=рөл]} иесі, суперадминистратор немесе биллинг әкімшісі болып табылатын барлық жобалар бойынша қолжетімді. **Детализация** және **Сервистерге шығындар** қойындыларында деректер әдепкі бойынша ағымдағы жоба бойынша сүзілген.
{/note}