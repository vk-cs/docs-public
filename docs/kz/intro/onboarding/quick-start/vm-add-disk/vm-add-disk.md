# {heading(Блоктық дискіні виртуалды машинаға қосыңыз)[id=onboarding-vm-add-disk]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл нұсқаулық сізді [Cloud Servers](/kz/computing/iaas) сервисінің мүмкіндіктерінің бірімен — [блоктық сақтау дискілерін](/kz/computing/iaas/concepts/data-storage/disk-types) басқарумен таныстырады.

Осы нұсқаулықтың барлық қадамдарынан өткеннен кейін, сіз блоктық диск жасап, оны виртуалды машинаға қосасыз.

## {heading(Дайындық қадамдары)[id=onboarding-vm-add-disk-prepare]}

1. {linkto(../../../../intro/onboarding/quick-start/create-vm#onboarding-create-vm)[text=Виртуалды машинаны]} жасаңыз.
1. Жеке шот балансыңыздың оң екеніне, ал диск жасау үшін {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоталардың]} жеткілікті екеніне көз жеткізіңіз.

## {heading({counter(disk)}. Диск жасаңыз)[id=onboarding-vm-add-disk-add]}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. **Бұлтты есептеулер** → **Дискілер** бөліміне өтіңіз.
1. Дискілер тізімінің үстіндегі **Диск жасау** түймесін басыңыз.

{include(../../../../_includes/_disk_params.md)[tags=quick-start]}

1. **Диск жасау** түймесін басыңыз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=onboarding-vm-add-disk-delete]}

Жұмыс істеп тұрған ВМ мен дискілер есептеу ресурстарын тұтынады. Егер олар сізге енді қажет болмаса:

- оны кейінірек пайдалану үшін жасалған ВМ-ді {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=тоқтатыңыз]} немесе біржола {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]};
- жасалған дискіні {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=жойыңыз]}.
