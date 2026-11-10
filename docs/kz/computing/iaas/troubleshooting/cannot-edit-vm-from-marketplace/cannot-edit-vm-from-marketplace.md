# {heading(ВМ бейнесі Marketplace-тен алынған ВМ конфигурациясын өзгерту мүмкін болмайда)[id=iaas-cannot-edit-vm-from-marketplace]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Marketplace-тегі кейбір қосымшалар стандартты тәсілмен өзгертуге болмайтын бекітілген конфигурациямен орнатылады.

### {heading(Шешім)[id=iaas-cannot-edit-vm-from-marketplace-decision]}

1. Ағымдағы ВМ дискісінің [снимогін жасаңыз](/kz/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create).
1. Осы снимоктен үлкенірек жад көлемі бар қажетті [конфигурация шаблонын](/kz/computing/iaas/concepts/vm/flavor) таңдап, жаңа ВМ [жасаңыз](/kz/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-vm-create).
1. Floating IP-мекенжайын ағымдағы ВМ-нен [байланыстырып алыңыз](/kz/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate).
2. Floating IP-мекенжайын жаңа ВМ-ге [байланыстырыңыз](/kz/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-associate).