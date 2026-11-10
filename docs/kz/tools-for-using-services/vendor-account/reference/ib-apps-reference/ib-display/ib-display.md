
{include(/kz/_includes/_translated_by_ai_kz.md)}

`display.yaml` конфигурациялық файлы тарифтік жоспардың сіздің қосымшаңыздың [тарифтік жоспарлар матрицасында](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_wizard) қалай көрсетілетінін сипаттайды.

Файлдың негізгі секциялары:

[cols="2,5,2,2", options="header"]
|===
|Аты
|Сипаттамасы
|Форматы
|Міндетті

|`pages`
|Тарифтік жоспарды баптау шеберінің бірінші және соңғы беттерден басқа барлық [беттерін](#wizard_pages) сипаттайды.

Параметр көрсетілмесе, баптау шебері тек автоматты түрде қалыптастырылатын беттерден тұрады
|Массив
|![](/kz/assets/no.svg "inline")

|`entities`
|Тарифтеленетін [VK Cloud инфрақұрылым элементтерін](#wizard_entities) сипаттайды:

* ВМ;
| жүктеме балансировщиктері;
* сыртқы IP-мекенжайлар.

Тарифтік жоспарды баптау шеберінде осы элементтердің құны көрсетіледі. Ол VK Cloud тарифтеріне сәйкес автоматты түрде есептеледі
|Массив
|![](/kz/assets/check.svg "inline")
|===

## {heading(Массив pages)[id=wizard_pages]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-pages]}

Төменде осы мысалдан алынған тарифтік жоспарды баптау шеберінің қалай көрсетілетіні берілген.

![pic1](/kz/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/Wizard_IB_page.png){params[width=90%]}

## {heading(Массив entities)[id=wizard_entities]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-common]}

### {heading(ВМ)[id=IBdisplay_vm]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-vm]}

Төменде осы мысалдан алынған инфрақұрылым құны туралы ақпараттың тарифтік жоспарды баптау шеберінде қалай көрсетілетіні берілген.

![pic1](/kz/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/Wizard_IB_price.png){params[width=90%]}

### {heading(Жүктеме балансировщигі)[id=IBdisplay_lb]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-lb]}

### {heading(Сыртқы IP-мекенжай)[id=IBdisplay_floating_ip]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-ip]}

## {heading(when құрылымы)[id=when_construction]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-when-common]}

### {heading(when құрылымы pages массивінде)[id=IBdisplay_when_in_pages]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-when-pages]}

### {heading(when құрылымы entities массивінде)[id=IBdisplay_when_in_entities]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-when-entities]}

![pic1](/kz/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/when_entities.png){params[width=90%]}