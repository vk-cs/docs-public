# {heading(Миграция ВМ VMware в {var(cloud)})[id=migration-migrate-vmware]}

## {heading(1. Проверьте возможность миграции)[id=migration-migrate-vmware-check]}

Виртуальная машина VMware должна соответствовать следующим требованиям:

- операционная система ВМ имеет 64-битную архитектуру;
- текущий пользователь обладает правами администратора;
- к ВМ подключен хотя бы один диск;
- ВМ использует эмуляцию BIOS.

{note:info}
Для миграции ВМ с эмуляцией UEFI используйте [Hystax](../migrate-hystax-mr) или перенесите данные на новую виртуальную машину VMware с эмуляцией BIOS.
{/note}

## {heading(2. Подготовьте ВМ к миграции)[id=migration-migrate-vmware-vm-prepare]}

{tabs}

{tab(Linux)}

1. [Проверьте](../check-virtio) наличие драйверов VirtIO в системе.
1. Проверьте наличие гостевого агента QEMU:

   ```console
   systemctl status qemu-guest-agent
   ```

   Если гостевой агент QEMU отсутствует, [установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) его.

1. Проверьте, установлена ли утилита Cloud-Init:

   ```console
   cloud-init --version
   ```

   Если утилита отсутствует, [установите](https://www.ibm.com/docs/ru/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux) ее.

1. Создайте файл `/etc/netplan/50-cloud-init.yaml` со следующим содержимым:

   ```yaml
   network:
       ethernets:
           ens3:
               dhcp4: true
       version: 2
   ```

1. [Удалите](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools, если это ПО установлено.

{/tab}

{tab(Windows)}

1. Проверьте, что обновления операционной системы установлены, и перезагрузите ВМ.
1. [Установите](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) драйверы VirtIO.
1. [Установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
1. Добавьте информацию о драйверах в реестр Windows:

   1. [Скачайте](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   1. Запустите файл и разрешите внести изменения в реестр.

1. [Удалите](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools, если это ПО установлено.

{/tab}

{/tabs}

## {heading(3. Экспортируйте виртуальную машину)[id=migration-migrate-vmware-export]}

1. Остановите виртуальную машину.

   {note:info}
   Если после удаления VMware Tools подключение к ВМ по SSH или RDP не работает, используйте консоль VMware.
   {/note}

1. Выберите нужную ВМ и выполните экспорт в OVF.

   Будут созданы файлы с расширением `.ovf` и `.vmdk` — для дальнейшей работы понадобится файл `.vmdk`.

## {heading(4. Импортируйте образ ВМ в {var(cloud)})[id=migration-migrate-vmware-image-import]}

Для загрузки образа виртуальной машины используйте OpenStack CLI, чтобы избежать возможных ошибок при обработке веб-интерфейсом файлов большого размера.

1. Убедитесь, что клиент OpenStack {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Конвертируйте файл диска из формата VMDK в RAW:

   ```console
   qemu-img convert -f vmdk -O raw <путь_к_файлу.vmdk> <путь_к_файлу.raw>
   ```

1. Загрузите полученный файл образа `.raw` в существующий проект {var(cloud)}.

   {tabs}

   {tab(Linux)}

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название образа>
   ```

   {/tab}

   {tab(Windows)}

   При импорте образа Windows укажите тип шины диска — IDE (параметр `hw_disk_bus`):

   ```console
   openstack image create --progress --private --container-format bare --disk-format raw <путь_к_файлу.raw> --property store=s3 --property os_type=windows --property hw_disk_bus=ide --min-disk 40 <название образа>
   ```

   {/tab}

   {/tabs}

   Если виртуальная машина должна поддерживать резервное копирование, добавьте в команду параметры:

   ```console
   --property hw_qemu_guest_agent=yes --property os_require_quiesce=yes
   ```

1. Проверьте, что образ появился в проекте и имеет статус `ACTIVE`:

   ```console
   openstack image list
   ```

   В [личном кабинете](https://msk.cloud.vk.com/app/) {var(cloud)} список образов находится в разделе **Облачные вычисления → Образы**.

## {heading(5. Создайте виртуальную машину)[id=migration-migrate-vmware-create-vm]}

{tabs}

{tab(Linux)}

Используйте импортированный образ для {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создания ВМ Linux]}:

- при создании ВМ в личном кабинете выберите образ из списка;
- при создании через OpenStack CLI укажите ID образа в соответствующей команде.

{/tab}

{tab(Windows)}

1. Используйте импортированный образ для {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создания промежуточной ВМ Windows]}.
1. Добавьте драйвер VirtIO HBA в загрузку Windows.

   1. {linkto(../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=Создайте диск]} минимального размера и {linkto(../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=подключите]} его к ВМ.
   1. {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Запустите]} виртуальную машину.
   1. Запустите установщик VirtIO в режиме `repair`.
   1. {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите]} виртуальную машину.

1. {linkto(../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=Создайте образ]} из загрузочного диска ВМ.
1. Измените тип шины диска нового образа:

   ```console
   openstack image set --property hw_disk_bus=virtio <ID нового образа>
   ```

1. {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте целевую ВМ Windows]} из нового образа.
1. Удалите промежуточную виртуальную машину, созданную на шаге 1, а также импортированный образ.

{/tab}

{/tabs}
