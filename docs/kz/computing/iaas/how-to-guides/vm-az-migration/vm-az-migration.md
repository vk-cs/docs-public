# {heading(ВМ-ды басқа қолжетімділік аймағына көшіру)[id=iaas-vm-az-migration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`GZ1` {linkto(../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймағын]} пайдаланатын барлық виртуалды машиналарды басқа қолжетімділік аймағына (мысалы, `PA2`) көшіру қажет, өйткені `GZ1` пайдаланудан шығарылуда.

{note:warn}
`PA2` қолжетімділік аймағында тек SDN Sprut қолданылады. Егер сіздің жобаңызда SDN Neutron қолданылса, алдын ала {linkto(../../../../cases/sprut-migration#cases-sprut-migration)[text=SDN Sprut-қа миграцияны]} орындаңыз.
{/note}

Бұл нұсқаулық сізге виртуалды машиналарыңызды жаңа қолжетімділік аймағына көшіруге көмектеседі. Сіз келесі қадамдарды орындайсыз:

1. Көшіру қажет виртуалды машинаның дискілерінің снапшоттарын жасайсыз.
1. Снапшоттардан жаңа қолжетімділік аймағында дискілер жасайсыз.
1. Жаңа қолжетімділік аймағында дискіден виртуалды машина жасайсыз.
1. ВМ-ды іске қосып, егер бар болса, қосымша дискілерді қосасыз.
1. (Қосымша) Terraform State-ті нақты инфрақұрылыммен синхронизациялайсыз.

## {heading(Дайындық қадамдары)[id=iaas-vm-az-migration-prepare]}

1. Қай виртуалды машинаны жаңа қолжетімділік аймағына көшіру қажет екенін анықтаңыз.
1. Оның дискілерінің снапшоттарындағы деректердің тұтастығын қамтамасыз ету үшін бұл виртуалды машинаны {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=тоқтатыңыз]}.
1. Егер виртуалды машинаға Floating IP-мекенжайы байланған болса, оны {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=босатыңыз]}.

## {heading(1. ВМ дискілерінің снапшоттарын жасаңыз)[id=iaas-vm-az-migration-vol-snapshot]}

1. ВМ жүктеу дискісінің снапшоттарын {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=жасаңыз]}.
1. (Қосымша) Егер бар болса, ВМ қосымша дискілерінің снапшоттарын {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=жасаңыз]}.

## {heading(2. Снапшоттардан жаңа дискілер жасаңыз)[id=iaas-vm-az-migration-new-vol]}

1. ВМ жүктеу дискісінің снапшотынан жаңа қолжетімділік аймағында жүктеу дискісін {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=жасаңыз]}.
1. (Қосымша) ВМ қосымша дискілерінің снапшоттарынан жаңа қолжетімділік аймағында дискілер {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=жасаңыз]}.

## {heading(3. Жаңа дискіден ВМ жасаңыз)[id=iaas-vm-az-migration-new-vm]}

1. **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
1. Дискілер тізімінде жаңа жүктеу дискісі үшін ![ ](../../../../assets/more-icon.svg "inline") басыңыз және **ВМ инстансын жасау** опциясын таңдаңыз.

{include(../../../../_includes/_vm-create-lk.md)[tags=create-from-disk]}

{note:warn}
Жаңа виртуалды машинада жаңа IP-мекенжайы болады.
{/note}

## {heading(4. ВМ-ды іске қосып, қосымша дискілерді қосыңыз)[id=iaas-vm-az-migration-vm-start]}

1. Жаңа виртуалды машинаны {linkto(../../instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=іске қосыңыз]}.
1. (Қосымша) Виртуалды машинаға қосымша дискілерді {linkto(../../instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=қосыңыз]}.

## {heading(5. (Қосымша) Terraform State-ті синхронизациялаңыз)[id=iaas-vm-az-migration-terraform]}

Егер сіз {var(cloud)} ресурстарын Terraform арқылы басқарсаңыз, ВМ көшіргеннен кейін Terraform State-ті нақты инфрақұрылыммен синхронизациялаңыз:

1. Жаңа ВМ-ды `vkcs_compute_instance` ресурсына байлаңыз:

   ```console
   terraform import vkcs_compute_instance.<ИМЯ_РЕСУРСА> <ID_ВМ>
   ```

1. Жаңа дискілерді `vkcs_blockstorage_volume` ресурсына байлаңыз:

   ```console
   terraform import vkcs_blockstorage_volume.<ИМЯ_РЕСУРСА> <ID_ДИСКА>
   ```
   
1. Floating IP-мекенжайын `vkcs_networking_floatingip` ресурсына байлаңыз:

   ```console
   terraform import vkcs_networking_floatingip.<ИМЯ_РЕСУРСА> <ID_FLOATING-IP>
   ```
   
1. Дискіні қосуды `vkcs_compute_volume_attach` ресурсына байлаңыз:

   ```console
   terraform import vkcs_compute_volume_attach.<ИМЯ_РЕСУРСА> <ID_ВМ>/<ID_ДИСКА>
   ```

1. Floating IP-мекенжайының байлануын `vkcs_networking_floatingip_associate` ресурсына байлаңыз:

   ```console
   terraform import vkcs_networking_floatingip_associate.<ИМЯ_РЕСУРСА> <ID_FLOATING-IP>
   ```

1. Жаңа ресурстарда қандай параметрлер пайда болғанын қараңыз:

   ```console
   terraform state show <РЕСУРС>.<ИМЯ_РЕСУРСА>
   ```

1. Алынған өрістерді Terraform конфигурация файлына қосыңыз.

1. Өзгерістер файлын жасап, оның бос екеніне көз жеткізіңіз:

   ```console
   terraform plan
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=iaas-vm-az-migration-delete]}

Істеп тұрған виртуалды машина, дискілер және олардың снапшоттары ақылы. Егер бастапқы ВМ сізге енді қажет болмаса, оны {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]}. Онымен бірге оның дискілері және олардың снапшоттары жойылады.