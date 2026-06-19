# {heading(worker-түйіндер тобын басқару)[id=mlspark-instructions-manage-node-group]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(worker-түйіндер тобын қосу)[id=mlspark-instructions-manage-node-group-add]}

{tabs}

{tab(Личный кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнеры** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Қажетті кластер үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Добавить группу узлов** тармағын таңдаңыз.
1. Түйіндер тобы үшін [баптауларды](/kz/kubernetes/k8s/instructions/helpers/node-group-settings) орнатыңыз.
1. Операцияның орындалуын растаңыз.

{/tab}

{/tabs}

## {heading(Масштабтау параметрлерін баптау)[id=mlspark-instructions-manage-node-group-scaling-params]}

worker-түйіндер тобының өлшемін қолмен өзгертуге немесе автоматты масштабтауды баптауға болады. Бұл операциялар [Кластер түйіндерін масштабтау](/kz/kubernetes/k8s/concepts/scale) бөлімінде толық сипатталған.
