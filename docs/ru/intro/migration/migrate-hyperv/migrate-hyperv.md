# {heading(Миграция ВМ Hyper-V в {var(cloud)})[id=migration-migrate-hyperv]}

## {heading(1. Проверьте возможность миграции)[id=migration-migrate-hyperv-check]}

Виртуальная машина Hyper-V должна соответствовать следующим требованиям:

- операционная система ВМ имеет 64-битную архитектуру;
- текущий пользователь обладает правами администратора;
- к ВМ подключен хотя бы один диск;
- ВМ использует эмуляцию BIOS.

{note:info}
Для миграции ВМ с эмуляцией UEFI используйте [Hystax](../migrate-hystax-mr) или перенесите данные на новую виртуальную машину Hyper-V, с эмуляцией BIOS.
{/note}

## {heading(2. Подготовьте ВМ к миграции)[id=migration-migrate-hyperv-vm-prepare]}

{tabs}

{tab(Linux)}

1. [Проверьте](../check-virtio) наличие драйверов VirtIO в системе.
1. Проверьте наличие QEMU Guest Agent:

   ```console
   systemctl status qemu-guest-agent
   ```

   При необходимости [установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.

{/tab}

{tab(Windows)}

1. [Установите](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) драйверы VirtIO.
1. [Установите](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
1. Добавьте информацию о драйверах в реестр Windows:

   1. [Скачайте](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   1. Запустите файл и разрешите внести изменения в реестр.

{/tab}

{/tabs}

## {heading(3. Экспортируйте виртуальную машину)[id=migration-migrate-hyperv-export]}

{tabs}

{tab(Диспетчер Hyper-V)}

1. Остановите виртуальную машину.
1. Запустите Диспетчер Hyper-V.
1. Нажмите правой кнопкой мыши на нужную виртуальную машину и выберите **Экспорт**.
1. Выберите, где расположить файлы ВМ, и нажмите кнопку **Экспорт**.

{/tab}

{tab(PowerShell)}

1. Остановите виртуальную машину.
1. Запустите PowerShell от имени администратора.
1. Выполните команду:

   ```shell
   Export-VM -Name <имя виртуальной машины> -Path <путь для экспорта файлов>
   ```

{/tab}

{/tabs}

## {heading(4. Импортируйте образ ВМ в {var(cloud)})[id=migration-migrate-hyperv-image-import]}

Для загрузки образа виртуальной машины используйте OpenStack CLI, чтобы избежать возможных ошибок при обработке веб-интерфейсом файлов большого размера.

1. Убедитесь, что клиент OpenStack {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=Конвертируйте]} полученный в результате экспорта файл `.vhdx` в формат RAW.
1. Загрузите файл в существующий проект {var(cloud)}:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название_образа>
   ```

   Если виртуальная машина должна поддерживать резервное копирование, загрузите файл `.raw` с указанием метаданных наличия гостевого агента:

   ```console
   openstack image create --private --container-format bare --disk-format raw --file <путь_к_файлу.raw> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <название_образа>
   ```

1. Проверьте загрузку образа в [личном кабинете](https://msk.cloud.vk.com/app/) {var(cloud)} в разделе **Облачные вычисления → Образы** или через CLI:

   ```console
   openstack image list
   ```

   Образ должен появиться в списке и иметь статус `ACTIVE`.

{note:warn}
При создании ВМ из загруженного образа выбирайте размер диска больше на 25%, чем размер образа, поскольку он хранится в сжатом виде.
{/note}
