# {heading(Шифрование диска при помощи cryptsetup)[id=iaas-disk-encrypt]}

{note:err}
{var(cloud)} не несет ответственности за корректную работу стороннего ПО.

{linkto(../../../../storage/backups/instructions/create-backup-copy#backup-copy-create)[text=Сделайте резервную копию ВМ]} перед шифрованием диска.
{/note}

Настройте шифрование диска виртуальной машины с помощью [cryptsetup](https://manpages.ubuntu.com/manpages/trusty/man8/cryptsetup.8.html) для Linux.

## {heading(Подготовительные шаги)[id=iaas-disk-encrypt-preparatory-steps]}

Выполните подготовительные шаги, чтобы создать тестовую виртуальную машину Linux под управлением CentOS 7.9, а также дополнительный диск, который будет зашифрован.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте ВМ Linux]} из образа CentOS 7.9.
1. {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=Создайте]} и {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=подключите]} диск к ВМ.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь к ВМ]}.
1. Выведите список дисков и найдите имя нужного диска (например, `/dev/vdb`):

   ```console
   sudo fdisk -l 
   ```

1. Если на диске нет файловой системы, отформатируйте его.

   1. Проверьте, что на диске нет файловой системы:

      ```console
      lsblk -f
      ```

   1. Отформатируйте диск:

      ```console
      sudo mkfs.ext4 /dev/vdb
      ```

   1. Проверьте результат форматирования:

      ```console
      lsblk -f
      ```

1. Настройте монтирование диска.

   1. Создайте директорию для монтирования диска `/volumes/disk1`:

      ```console
      sudo mkdir /volumes
      sudo mkdir /volumes/disk1
      ```

   1. Добавьте в файл `/etc/fstab` строку с параметрами монтирования диска:

      ```console
      sudo sed -i '$a /dev/vdb /volumes/disk1 auto defaults 0 0' /etc/fstab
      ```

   1. Выведите содержимое файла и убедитесь, что строка добавлена:

      ```console
      cat /etc/fstab
      ```

1. Перезапустите виртуальную машину:

   ```console
   sudo reboot
   ```

1. Проверьте, что диск примонтирован в указанную директорию:

   ```console
   lsblk
   ```

## {heading(1. Установите cryptsetup)[id=iaas-disk-encrypt_install]}

Выполните команду для установки:

```console
sudo yum install -y cryptsetup cryptsetup-reencrypt
```

## {heading(2. Зашифруйте диск)[id=iaas-disk-encrypt_it]}

{note:err}
Перезапуск виртуальной машины до завершения {linkto(#iaas-disk-encrypt-param-edit)[text=настройки загрузчика]} приведет к утрате доступа к ВМ.
{/note}

1. Сделайте диск {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-changing-bootable-attribute)[text=незагрузочным]}.
1. Остановите все процессы, использующие диск:

   ```console
   sudo lsof /volumes/disk1
   sudo systemctl stop volumes-disk1.mount
   ```

1. Посмотрите размер текущей файловой системы:

   ```console
   sudo e2fsck -f /dev/vdb
   ```

   Пример результата выполнения команды:

   ```console
   e2fsck 1.42.9 (28-Dec-2013)
   Pass 1: Checking inodes, blocks, and sizes
   Pass 2: Checking directory structure
   Pass 3: Checking directory connectivity
   Pass 4: Checking reference counts
   Pass 5: Checking group summary information
   /dev/vdb: 88/655360 files (3.4% non-contiguous), 60910/2621440 blocks
   ```

1. Измените размер файловой системы до минимально возможного:

   ```console
   sudo resize2fs -M /dev/vdb
   ```

   Пример результата выполнения команды:

   ```console
   resize2fs 1.42.9 (28-Dec-2013)
   Resizing the filesystem on /dev/vdb to 24971 (4k) blocks.
   The filesystem on /dev/vdb is now 24971 blocks long.
   ```

1. Запустите шифрование диска:

   ```console
   sudo cryptsetup-reencrypt /dev/vdb --new --reduce-device-size 4096S
   ```

1. Введите и подтвердите ключевую фразу:

   ```console
   Enter new passphrase:
   Verify passphrase:
   ```

   {note:warn}
   Запомните ключевую фразу. Без нее невозможно дешифровать диск и использовать ВМ.
   {/note}

1. Дождитесь завершения процесса шифрования:

   ```console
   Finished, time 00:23.401, 3875 MiB written, speed 165.6 MiB/s
   ```

1. Проверьте работу с зашифрованным диском:

   1. Выполните команду:

      ```console
      sudo cryptsetup open /dev/vdb vdb_crypt
      ```

   1. Введите ключевую фразу и нажмите *Enter*.

1. Расширьте файловую систему до размера диска:

   ```console
   sudo resize2fs /dev/mapper/vdb_crypt
   ```

1. Измените имя устройства для монтирования:

   ```console
   sudo sed 's#/dev/vdb#/dev/mapper/vdb_crypt#' -i /etc/fstab
   ```

1. Выведите содержимое файла `fstab` и убедитесь, что запись изменена:

   ```console
   cat /etc/fstab
   ```

1. Примонтируйте диск:

   ```console
   sudo mount /volumes/disk1
   ```

1. Добавьте информацию о зашифрованном разделе в `/etc/crypttab`:

   1. Получите `root` доступ:

      ```console
      sudo -s
      ```

   1. Выполните команду:

      ```console
      UUID=$(blkid -s UUID -o value /dev/vdb)
      echo "vdb_crypt UUID=${UUID} none luks,discard" >> /etc/crypttab
      exit
      ```

## {heading(3. Измените параметры загрузчика)[id=iaas-disk-encrypt-param-edit]}

{note:err}
Перезапуск виртуальной машины до завершения настройки загрузчика приведет к утрате доступа к ВМ.
{/note}

Настройте загрузчик, чтобы ключевая фраза для расшифровки диска запрашивалась при загрузке системы. Для ввода ключевой фразы используйте {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC-консоль]} виртуальной машины.

1. Измените настройки загрузчика `grub`. Удалите настройку `console=ttyS0,115200` в параметрах загрузчика:

   ```console
   sudo sed 's#console=ttyS0,115200 ##' -i /etc/default/grub
   ```

1. Просмотрите файл `grub` и убедитесь, что настройка удалена:

   ```console
   cat /etc/default/grub
   ```

1. Выполните конфигурирование загрузчика:

   ```console
   sudo grub2-mkconfig -o /boot/grub2/grub.cfg
   ```

1. Перезагрузите ВМ.

## {heading(4. Получите доступ к ВМ)[id=iaas-disk-encrypt-access]}

1. Перейдите в {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC-консоль]} виртуальной машины. В выводе консоли при загрузке операционной системы появится приглашение ввести ключевую фразу:

   ```console
   Please enter passphrase for disk vdb_crypt on /volumes/disk1:
   ```

1. Введите ключевую фразу и нажмите *Enter*.

Ключевая фраза для дешифрования диска будет запрашиваться каждый раз при загрузке ОС. После ввода ключевой фразы диск будет примонтирован и с файловой системой можно будет работать, как и до шифрования.