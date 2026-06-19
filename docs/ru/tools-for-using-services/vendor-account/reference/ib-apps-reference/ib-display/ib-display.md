Конфигурационный файл `display.yaml` описывает, как тарифный план будет отображаться в [матрице тарифных планов](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_wizard) вашего приложения.

Основные секции файла:

[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|`pages`
|Описывает все [страницы](#wizard_pages) мастера конфигурации тарифного плана, кроме первой и последней.

Если параметр не указан, мастер конфигурации будет состоять только из автоматически формируемых страниц
|Массив
|![](/ru/assets/no.svg "inline")

|`entities`
|Описывает тарифицируемые [элементы инфраструктуры VK Cloud](#wizard_entities):

* ВМ;
* балансировщики нагрузки;
* внешние IP-адреса.

В мастере конфигурации тарифного плана будет отображаться стоимость этих элементов. Она рассчитывается автоматически в соответствии с тарифами VK Cloud
|Массив
|![](/ru/assets/check.svg "inline")
|===

## {heading(Массив pages)[id=wizard_pages]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-pages]}

Ниже показано, как будет отображаться мастер конфигурации тарифного плана из этого примера.

![pic1](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/Wizard_IB_page.png){params[width=90%]}

## {heading(Массив entities)[id=wizard_entities]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-common]}

### {heading(ВМ)[id=IBdisplay_vm]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-vm]}

Ниже показано, как будет отображаться информация о стоимости инфраструктуры из этого примера в мастере конфигурации тарифного плана.

![pic1](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/Wizard_IB_price.png){params[width=90%]}

### {heading(Балансировщик нагрузки)[id=IBdisplay_lb]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-lb]}

### {heading(Внешний IP-адрес)[id=IBdisplay_floating_ip]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-ip]}

## {heading(Конструкция when)[id=when_construction]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-when-common]}

### {heading(Конструкция when в массиве pages)[id=IBdisplay_when_in_pages]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-when-pages]}

### {heading(Конструкция when в массиве entities)[id=IBdisplay_when_in_entities]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-when-entities]}

![pic1](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/when_entities.png){params[width=90%]}
