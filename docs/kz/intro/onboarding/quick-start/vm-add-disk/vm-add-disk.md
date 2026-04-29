{include(/kz/_includes/_translated_by_ai.md)}

Бұл нұсқаулық сізді [Cloud Servers](/kz/computing/iaas) сервисінің мүмкіндіктерінің бірімен — [блоктық сақтау дискілерін](/kz/computing/iaas/concepts/data-storage/disk-types) басқарумен таныстырады.

Осы нұсқаулықтың барлық қадамдарынан өткеннен кейін, сіз блоктық диск жасап, оны виртуалды машинаға қосасыз.

## Дайындық қадамдары

1. Виртуалды машинаны [жасаңыз](/kz/intro/onboarding/quick-start/create-vm#1_sozdayte_vm).
1. Жеке шот балансыңыздың оң екеніне, ал диск жасау үшін [квоталардың](/kz/tools-for-using-services/account/concepts/quotasandlimits) жеткілікті екеніне көз жеткізіңіз.

## {counter(disk)}. Диск жасаңыз

1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. **Бұлтты есептеулер** → **Дискілер** бөліміне өтіңіз.
1. Дискілер тізімінің үстіндегі **Диск жасау** түймесін басыңыз.

{include(/kz/_includes/_disk_params.md)[tags=quick-start]}

1. **Диск жасау** түймесін басыңыз.

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған ВМ мен дискілер есептеу ресурстарын тұтынады. Егер олар сізге енді қажет болмаса:

- оны кейінірек пайдалану үшін жасалған ВМ-ді [тоқтатыңыз](/kz/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) немесе біржола [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm);
- жасалған дискіні [жойыңыз](/kz/computing/iaas/instructions/volumes/volumes-manage#delete_volume).