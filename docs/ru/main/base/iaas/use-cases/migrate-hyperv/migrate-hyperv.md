Перед тем как импортировать виртуальную машину из Hyper-V, убедитесь, что она соответствует следующим требованиям:

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

</tabpanel>
<tabpanel>

1. [Установите](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) драйверы VirtIO.
2. [Установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
3. Добавьте информацию о драйверах в реестр Windows:

   1. [Скачайте](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   2. Запустите файл и разрешите внести изменения в реестр.

</tabpanel>
</tabs>

## 2. Экспортируйте виртуальную машину

<tabs>
<tablist>
<tab>Диспетчер Hyper-V</tab>
<tab>PowerShell</tab>
</tablist>
<tabpanel>

1. Остановите виртуальную машину.
2. Запустите Диспетчер Hyper-V.
3. Нажмите правой кнопкой мыши на нужную виртуальную машину и выберите **Экспорт**.
4. Выберите, где расположить файлы ВМ, и нажмите кнопку **Экспорт**.

</tabpanel>
<tabpanel>

1. Остановите виртуальную машину.
2. Запустите PowerShell от имени администратора.
3. Выполните команду:

   ```shell
   Export-VM -Name <имя виртуальной машины> -Path <путь для экспорта файлов>
   ```

</tabpanel>
</tabs>

## 3. Импортируйте образ ВМ в VK Cloud

Для загрузки образа виртуальной машины используйте OpenStack CLI, чтобы избежать возможных ошибок при обработке веб-интерфейсом файлов большого размера.

1. Перед началом работы убедитесь, что OpenStack CLI [установлен](/ru/base/account/project/cli/setup) и вы можете [авторизоваться](/ru/base/account/project/cli/authorization) в нем.
2. Загрузите полученный в результате экспорта файл `.vhdx` в существующий проект VK Cloud:

   ```bash
   openstack image create --private --container-format bare --disk-format vhdx --property store=s3 --file <файл.vhdx> <название_образа>
   ```

   Если виртуальная машина должна поддерживать резервное копирование, загрузите файл `.vhdx` с указанием метаданных наличия гостевого агента:

   ```bash
   openstack image create --private --container-format bare --disk-format vhdx --file <файл.vhdx> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <название_образа>
   ```

3. Проверьте загрузку образа в [личном кабинете](https://mcs.mail.ru/app/) VK Cloud в разделе **Облачные вычисления → Образы** или через CLI:

   ```bash
   openstack image list
   ```

   Образ должен появиться в списке и иметь статус `ACTIVE`.
