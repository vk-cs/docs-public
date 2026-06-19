# {heading(Желімен жұмыс)[id=dbaas-network]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Жүктеме теңгергішін пайдалану)[id=dbaas-network-using]}

Әрбір PG/MySQL кластері үшін 3 порты бар TCP-теңгергіш жасалады. Олар келесілерге көрсетеді:

- мастерге;
- синхронды репликаға;
- асинхронды репликаға.

## {heading(Қауіпсіздік топтарын баптау)[id=dbaas-network-sg-settings]}

Қауіпсіздік топтарын ДҚ инстансын {linkto(../../instructions/create#dbaas-create)[text=жасау]} кезінде де, оны өрістеткеннен кейін де {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Виртуалды желілер]} → **Firewall баптаулары** бөлімі арқылы баптай аласыз.
