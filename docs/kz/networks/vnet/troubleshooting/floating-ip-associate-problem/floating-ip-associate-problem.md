# {heading(Floating IP-мекенжайын портқа байланыстыру мүмкін емес)[id=vnet-floating-ip-associate-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Floating IP-мекенжайы жобаға қосылған, бірақ оны инстанс портына байланыстыру мүмкін емес.

Floating IP-мекенжайлары, мысалы, `ext-net` немесе `internet` сияқты {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=сыртқы желілерге]} тиесілі. Floating IP-мекенжайын портқа байланыстыру үшін порт {linkto(../../concepts/router#vnet-router)[text=маршрутизаторға]} қосылған ішкі желіде болуы керек, ал маршрутизатор Floating IP-мекенжайы тиесілі сол сыртқы желіге қосылған болуы керек.

Егер ішкі желілер қосылған маршрутизатордың сыртқы желіге қолжетімділігі болмаса, оның ішкі желілеріндегі объектілерге Floating IP-мекенжайын байланыстыру мүмкін болмайды.

## {heading(Шешім)[id=vnet-floating-ip-associate-problem-resolve]}

1. Порттың маршрутизаторға қосылған ішкі желіде екенін {linkto(../../instructions/ports#vnet-ports-view)[text=тексеріңіз]}.
1. Осы маршрутизатордың қажетті Floating IP-мекенжайы тиесілі сыртқы желіге қосылғанын {linkto(../../instructions/router#vnet-router-view)[text=тексеріңіз]}. Егер маршрутизатордың сыртқы желіге қолжетімділігі болмаса, маршрутизаторды {linkto(../../instructions/router#vnet-router-edit)[text=өңдеңіз]}.
