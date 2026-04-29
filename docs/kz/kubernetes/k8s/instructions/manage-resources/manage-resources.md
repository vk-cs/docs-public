{include(/kz/_includes/_translated_by_ai.md)}

Сіз Cloud Containers сервисінде Kubernetes кластерінің ресурстарын VK Cloud жеке кабинетінің веб-интерфейсі арқылы басқара аласыз. Бұл функция сол әрекеттерді `kubectl` және Kubernetes Dashboard арқылы орындауға балама болып табылады. `kubectl` арқылы ресурсты құру, өзгерту және жою командаларының мысалдары жеке кабинетте қолжетімді.

## {heading(Ресурстар туралы ақпаратты қарау)[id=view-resources]}

{include(/kz/_includes/_open-cluster.md)}

1. **Кластер ресурстары** қойындысына өтіңіз. Онда кластерде пайдаланылатын, жеке кабинет немесе `kubectl` арқылы жасалған барлық Kubernetes ресурстары көрсетілген.

{include(/kz/_includes/_cluster-resources.md)}

## {heading(Ресурсты құру)[id=create-resources]}

{include(/kz/_includes/_open-cluster.md)}

1. **Кластер ресурстары** қойындысына өтіп, **Ресурс құру** түймесін басыңыз.
1. Ресурс манифестін YAML форматында қосыңыз. Мысалдар [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/) қолжетімді. 
1. Ресурсты құруды растаңыз. 
   
Қосылған ресурс автоматты түрде танылады және тиісті санаттағы ресурстар тізімінде қолжетімді болады. Мысалы, егер сіз PV үшін манифест қоссаңыз, ол **Хранилище** санатындағы **Persistent Volumes** блогында қолжетімді болады.

## {heading(Ресурс манифестін жүктеп алу)[id=download-yaml]}

{include(/kz/_includes/_open-cluster.md)}

1. **Кластер ресурстары** қойындысына өтіңіз.

{include(/kz/_includes/_cluster-resources.md)}

1. Қажетті ресурс үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Скачать yaml** тармағын таңдаңыз. Ресурс манифестінің YAML файлы жүктеледі.

## {heading(Ресурс туралы ақпаратты өңдеу)[id=edit-resources]}

{note:warn}
Ресурстар туралы ақпаратты өзгерту кластер жұмысының мәселелеріне әкелуі мүмкін.
{/note}

{include(/kz/_includes/_open-cluster.md)}

1. **Кластер ресурстары** қойындысына өтіңіз.

{include(/kz/_includes/_cluster-resources.md)}

1. Қажетті ресурс үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Изменить** тармағын таңдаңыз.
1. Ашылған терезеде ресурс манифестіне өзгерістер енгізіп, оларды сақтаңыз.

## {heading(Ресурсты жою)[id=delete-resources]}

{note:warn}
Ресурсты жою кластер жұмысының мәселелеріне әкелуі мүмкін.
{/note}

{include(/kz/_includes/_open-cluster.md)}

1. **Кластер ресурстары** қойындысына өтіңіз.

{include(/kz/_includes/_cluster-resources.md)}

1. Қажетті ресурс үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Удалить** тармағын таңдаңыз.
1. Жоюды растаңыз.
