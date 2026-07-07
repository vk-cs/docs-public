# {heading(Перенос ВМ в другую зону доступности)[id=iaas-vm-az-migration]}

Все виртуальные машины, которые используют {linkto(../../../../start/concepts/architecture#architecture-az)[text=зону доступности]} `GZ1`, необходимо перенести на другую зону доступности (например `PA2`), так как `GZ1` выводится из эксплуатации.

{note:warn}
В зоне доступности `PA2` используется только SDN Sprut. Если в вашем проекте используется SDN Neutron, предварительно выполните {linkto(../../../../cases/sprut-migration#cases-sprut-migration)[text=миграцию в SDN Sprut]}.
{/note}

Это руководство поможет вам перенести свои виртуальные машины в новую зону доступности. Вы выполните следующие шаги:

1. Создадите снимки дисков виртуальной машины, которую нужно перенести.
1. Создадите из снимков диски в новой зоне доступности.
1. Создадите виртуальную машину из диска в новой зоне доступности.
1. Запустите ВМ и подключите к ней дополнительные диски, если они есть.
1. (Опционально) Синхронизируете Terraform State с фактической инфраструктурой.

## {heading(Подготовительные шаги)[id=iaas-vm-az-migration-prepare]}

1. Определите, какую виртуальную машину необходимо перенести на новую зону доступности.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите]} эту виртуальную машину, чтобы обеспечить целостность данных в снимках ее дисков.
1. Если к виртуальной машине привязан Floating IP-адрес, {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=отвяжите]} его.

## {heading(1. Создайте снимки дисков ВМ)[id=iaas-vm-az-migration-vol-snapshot]}

1. {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=Создайте]} снимки загрузочного диска ВМ.
1. (Опционально) {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create)[text=Создайте]} снимки дополнительных дисков ВМ, если они есть.

## {heading(2. Создайте новые диски из снимков)[id=iaas-vm-az-migration-new-vol]}

1. Из снимка загрузочного диска ВМ {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=создайте]} загрузочный диск на новой зоне доступности.
1. (Опционально) Из снимков дополнительных дисков ВМ {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-disk-create)[text=создайте]} диски на новой зоне доступности.

## {heading(3. Создайте ВМ из нового диска)[id=iaas-vm-az-migration-new-vm]}

1. Перейдите в раздел **Облачные вычисления** → **Диски**.
1. В списке дисков нажмите ![ ](../../../../assets/more-icon.svg "inline") для нового загрузочного диска и выберите опцию **Создать инстанс ВМ**.

{include(../../../../_includes/_vm-create-lk.md)[tags=create-from-disk]}

{note:warn}
У новой виртуальной машины будет новый IP-адрес.
{/note}

## {heading(4. Запустите ВМ и подключите дополнительные диски)[id=iaas-vm-az-migration-vm-start]}

1. {linkto(../../instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Запустите]} новую виртуальную машину.
1. (Опционально) {linkto(../../instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=Подключите]} дополнительные диски к виртуальной машине.

## {heading(5. (Опционально) Синхронизируйте Terraform State)[id=iaas-vm-az-migration-terraform]}

Если вы управляете ресурсами {var(cloud)} через Terraform, после переноса ВМ синхронизируйте Terraform State с фактической инфраструктурой:

1. Привяжите новую ВМ к ресурсу `vkcs_compute_instance`:

   ```console
   terraform import vkcs_compute_instance.<ИМЯ_РЕСУРСА> <ID_ВМ>
   ```

1. Привяжите новые диски к ресурсу `vkcs_blockstorage_volume`:

   ```console
   terraform import vkcs_blockstorage_volume.<ИМЯ_РЕСУРСА> <ID_ДИСКА>
   ```
   
1. Привяжите Floating IP-адрес к ресурсу `vkcs_networking_floatingip`:

   ```console
   terraform import vkcs_networking_floatingip.<ИМЯ_РЕСУРСА> <ID_FLOATING-IP>
   ```
   
1. Привяжите подключение диска к ресурсу `vkcs_compute_volume_attach`:

   ```console
   terraform import vkcs_compute_volume_attach.<ИМЯ_РЕСУРСА> <ID_ВМ>/<ID_ДИСКА>
   ```

1. Привяжите привязку Floating IP-адреса к ресурсу `vkcs_networking_floatingip_associate`:

   ```console
   terraform import vkcs_networking_floatingip_associate.<ИМЯ_РЕСУРСА> <ID_FLOATING-IP>
   ```

1. Посмотрите, какие параметры появились у новых ресурсов:

   ```console
   terraform state show <РЕСУРС>.<ИМЯ_РЕСУРСА>
   ```

1. Добавьте полученные поля в файл конфигурации Terraform.

1. Сгенерируйте файл изменений и убедитесь, что он пустой:

   ```console
   terraform plan
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=iaas-vm-az-migration-delete]}

Работающая виртуальная машина, диски и их снимки тарифицируются. Если исходная ВМ вам больше не нужна, {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=удалите]} ее. Вместе с ней будут удалены ее диски и их снимки.
