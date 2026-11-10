# {heading(Сервисті жүктеу кезеңдері)[id=ibservice_upload_phases]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Image-based қосымшаны жүктеу кезеңдері ({linkto(#pic_upload_phases)[text=%number] сурет):

1. {linkto(../ibservice_upload_localtest#ibservice_upload_localtest)[text=%text]}.
1. {linkto(../ibservice_upload_deploysystemtest#ibservice_upload_deploysystemtest)[text=%text]}.
1. {linkto(../ibservice_upload_package#ibservice_upload_package)[text=%text]}.
1. {linkto(../ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}.
1. {linkto(../ibservice_upload_publish#ibservice_upload_publish)[text=%text]}.

{caption(Сурет {counter(pic)[id=numb_pic_upload_phases]} — Image-based қосымшаны дүкенге жүктеу кезеңдері)[align=center;position=under;id=pic_upload_phases;number={const(numb_pic_upload_phases)} ]}
![pic1](../../../assets/IB_upload_phases.png){params[noBorder=true]}
{/caption}

Terraform манифесттерін тестілеуге дейін бұлттық платформаның бұрыннан бар ресурстарының параметрлерінің (мысалы, ВМ түрі, сервистің бейнесі) манифесттерде дұрыс көрсетілгенін тексеріңіз. [VK CS провайдерінің деректер көздерін](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources) пайдаланыңыз. Terraform-ды орнату мен баптау {linkto(../ibservice_upload_localtest#ibservice_upload_localtest)[text=%text]} бөлімінде келтірілген.

{caption(Бұлттық платформада көрсетілген ВМ түрінің бар екенін тексеру мысалы)[align=left;position=above]}
```hcl
data "vkcs_compute_flavor" "compute" {
flavor_id = "4e115a9b-XXXX-95cf130d63c7"
}
```
{/caption}

{note:info}

Бұлттық платформаның бұрыннан бар ресурстарының параметрлерін тексеру манифесттерді тестілеу уақытын қысқартады және қате конфигурациясы бар ресурстарды жасау әрекеттерін болдырмайды.

{/note}