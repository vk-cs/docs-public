Перед тем как импортировать виртуальную машину из VMware, убедитесь, что она соответствует следующим требованиям:

- Операционная система ВМ имеет 64-битную архитектуру.
- ВМ использует эмуляцию BIOS.
- Текущий пользователь обладает правами администратора.
- К ВМ подключен хотя бы один диск.

## 1. Подготовьте ВМ к миграции

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

1. [Проверьте](https://www.tencentcloud.com/document/product/213/9929) наличие драйверов VirtIO в системе.
2. Проверьте наличие QEMU Guest Agent:

   ```bash
   systemctl status qemu-guest-agent
   ```

   При необходимости [установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.

3. [Удалите](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools, если это ПО установлено.

</tabpanel>
<tabpanel>

1. [Установите](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) драйверы VirtIO.
2. [Установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
3. Добавьте информацию о драйверах в реестр Windows:

    1. [Скачайте](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
    2. Запустите файл и разрешите внести изменения в реестр.

5. [Удалите](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools, если это ПО установлено.

</tabpanel>
</tabs>

## 2. Экспортируйте виртуальную машину

1. Остановите виртуальную машину.
2. Выберите нужную ВМ и выполните экспорт в формат `.ovf`.

Будет создано несколько файлов `.ovf` и `.vmdk` — для дальнейшей работы понадобится второй файл.

## 3. Импортируйте образ ВМ в VK Cloud

Для загрузки образа виртуальной машины используйте OpenStack CLI, чтобы избежать возможных ошибок при обработке веб-интерфейсом файлов большого размера.

1. Перед началом работы убедитесь, что OpenStack CLI [установлен](/ru/base/account/project/cli/setup) и вы можете [авторизоваться](/ru/base/account/project/cli/authorization) в нем.
2. Загрузите полученный в результате экспорта файл `.vmdk` в существующий проект VK Cloud:

   ```bash
   openstack image create --private --container-format bare --disk-format vmdk --property store=s3 --file <файл.vmdk> <название_образа>
   ```

   Если виртуальная машина должна поддерживать резервное копирование, загрузите файл `.vmdk` с указанием метаданных наличия гостевого агента:

   ```bash
   openstack image create --private --container-format bare --disk-format vmdk --file <файл.vmdk> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <название_образа>
   ```

3. Проверьте загрузку образа в [личном кабинете](https://mcs.mail.ru/app/) VK Cloud в разделе **Облачные вычисления → Образы** или через CLI:

   ```bash
   openstack image list
   ```

   Образ должен появиться в списке и иметь статус `ACTIVE`.
