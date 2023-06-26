## 1. Проверьте возможность миграции

Виртуальная машина VMware должна соответствовать следующим требованиям:

- операционная система ВМ имеет 64-битную архитектуру;
- текущий пользователь обладает правами администратора;
- к ВМ подключен хотя бы один диск;
- ВМ использует эмуляцию BIOS.

<info>

Для миграции ВМ с эмуляцией UEFI используйте [Hystax](/ru/additionals/hystax/migration) или перенесите данные на новую виртуальную машину VMware с эмуляцией BIOS.

</info>

## 2. Подготовьте ВМ к миграции

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

1. [Проверьте](https://www.tencentcloud.com/document/product/213/9929) наличие драйверов VirtIO в системе.
2. Проверьте наличие гостевого агента QEMU:

   ```bash
   systemctl status qemu-guest-agent
   ```

   Если гостевой агент QEMU отсутствует, [установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) его.
3. Проверьте, установлена ли утилита Cloud-Init:

   ```bash
   cloud-init --version
   ```

   Если утилита отсутствует, [установите](https://cloud-init.io/) ее.
4. Создайте файл `/etc/netplan/50-cloud-init.yaml` со следующим содержимым:

   ```yaml
   network:
       ethernets:
           ens3:
               dhcp4: true
       version: 2
   ```

5. [Удалите](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools, если это ПО установлено.

</tabpanel>
<tabpanel>

1. Проверьте, что обновления операционной системы установлены, и перезагрузите ВМ.
2. [Установите](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) драйверы VirtIO.
3. [Установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
4. Добавьте информацию о драйверах в реестр Windows:

   1. [Скачайте](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   2. Запустите файл и разрешите внести изменения в реестр.

5. [Удалите](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools, если это ПО установлено.

</tabpanel>
</tabs>

## 3. Экспортируйте виртуальную машину

1. Остановите виртуальную машину.

   <info>

   Если после удаления VMware Tools подключение к ВМ по SSH или RDP не работает, используйте консоль VMware.

   </info>
2. Выберите нужную ВМ и выполните экспорт в OVF.

   Будут созданы файлы с расширением `.ovf` и `.vmdk` — для дальнейшей работы понадобится файл `.vmdk`.

## 4. Импортируйте образ ВМ в VK Cloud

Для загрузки образа виртуальной машины используйте OpenStack CLI, чтобы избежать возможных ошибок при обработке веб-интерфейсом файлов большого размера.

1. Убедитесь, что клиент OpenStack [установлен](/ru/base/account/project/cli/setup) и вы можете [авторизоваться](/ru/base/account/project/cli/authorization) в нем.
2. Конвертируйте файл диска из формата VMDK в RAW:

   ```bash
   qemu-img convert -f vmdk -O raw <путь_к_файлу.vmdk> <путь_к_файлу.raw>
   ```

3. Загрузите полученный файл образа `.raw` в существующий проект VK Cloud.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>

   <tabpanel>

   ```bash
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название образа>
   ```

   </tabpanel>
   <tabpanel>

   При импорте образа Windows укажите тип шины диска — IDE (параметр `hw_disk_bus`):

   ```bash
   openstack image create --progress --private --container-format bare --disk-format raw <путь_к_файлу.raw> --property store=s3 --property os_type=windows --property hw_disk_bus=ide --min-disk 40 <название образа>
   ```

   </tabpanel>
   </tabs>

   Если виртуальная машина должна поддерживать резервное копирование, добавьте в команду параметры:

   ```bash
   --property hw_qemu_guest_agent=yes --property os_require_quiesce=yes
   ```

4. Проверьте, что образ появился в проекте и имеет статус `ACTIVE`:

   ```bash
   openstack image list
   ```

   В [личном кабинете](https://mcs.mail.ru/app/) VK Cloud список образов находится в разделе **Облачные вычисления → Образы**.

## 5. Создайте виртуальную машину

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>

<tabpanel>

Используйте импортированный образ для [создания ВМ Linux](/ru/base/iaas/instructions/vm/vm-create#sozdayte-vm):

- при создании ВМ в личном кабинете выберите образ из списка;
- при создании через OpenStack CLI укажите ID образа в соответствующей команде.

</tabpanel>

<tabpanel>

1. Используйте импортированный образ для [создания промежуточной ВМ Windows](/ru/base/iaas/instructions/vm/vm-create#sozdayte-vm).
2. Добавьте драйвер VirtIO HBA в загрузку Windows.

   1. [Создайте диск](/ru/base/iaas/instructions/vm-volumes#sozdanie-diska) минимального размера и [подключите](/ru/base/iaas/instructions/vm-volumes#podklyuchenie-diska-k-vm) его к ВМ.
   2. [Запустите](/ru/base/iaas/instructions/vm/vm-manage#zapusk--ostanovka--perezagruzka-vm) виртуальную машину.
   3. Запустите установщик VirtIO в режиме `repair`.
   4. [Остановите](/ru/base/iaas/instructions/vm/vm-manage#zapusk--ostanovka--perezagruzka-vm) виртуальную машину.
3. [Создайте образ](/ru/base/iaas/instructions/vm-images/vm-images-manage#sozdanie-obraza) из загрузочного диска ВМ.
4. Измените тип шины диска нового образа:

   ```bash
   openstack image set --property hw_disk_bus=virtio <ID нового образа>
   ```

5. [Создайте целевую ВМ Windows](/ru/base/iaas/instructions/vm/vm-create#sozdayte-vm) из нового образа.
6. Удалите промежуточную виртуальную машину, созданную на шаге 1, а также импортированный образ.

</tabpanel>
</tabs>
