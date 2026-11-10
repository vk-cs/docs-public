# {heading(ВМ трафигі шлюзден әрі өтпейді)[id=traffic-gateway-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Егер трафик ВМ-ге шлюзге жетіп, одан әрі интернетке бармаса, мәселе қауіпсіздік топтарының параметрлерінде немесе подсеть қолжетімсіздігінде болуы мүмкін.

### {heading(Шешу)[id=traffic-gateway-problem-decision]}

1. ОЖ ішіндегі маршрутизация параметрлерін [тексеріңіз](/kz/networks/vnet/instructions/advanced-router/manage-bgp).
1. Қауіпсіздік тобында шығатын трафикке рұқсат берілгенін [тексеріңіз](/kz/networks/vnet/instructions/secgroups#vnet-secgroups-view).
1. Егер мәселе бір подсетьке қатысты болса, портты қайта жасап көріңіз немесе диагностика үшін ВМ-ді басқа желіге қосыңыз.