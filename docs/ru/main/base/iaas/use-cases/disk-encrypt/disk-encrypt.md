<err>

VK Cloud не несет ответственности за корректную работу стороннего ПО.

[Сделайте резервную копию ВМ](../../instructions/vm-backup/vm-backup-create#ruchnoe-rezervnoe-kopirovanie) перед шифрованием диска.

</err>

Настройте шифрование диска виртуальной машины с помощью [cryptsetup](https://manpages.ubuntu.com/manpages/trusty/man8/cryptsetup.8.html) для Linux.

## Подготовительные шаги

Выполните подготовительные шаги, чтобы создать тестовую виртуальную машину Linux под управлением CentOS 7.9, а также дополнительный диск, который будет зашифрован.
<!-- Актуализировать ссылки на статью о создании и подключении диска -->

1. [Создайте ВМ Linux](../../instructions/vm/vm-create/) из образа CentOS 7.9.
2. [Создайте](../../instructions/vm-volumes/) и [подключите](../../instructions/vm-volumes/) диск к ВМ.
3. [Подключитесь к ВМ](../../instructions/vm/vm-connect/vm-connect-nix/).
4. Выведите список дисков и найдите имя нужного диска (например, `/dev/vdb`):

   ```bash
   sudo fdisk -l 
   ```

5. Если на диске нет файловой системы, отформатируйте его.

   1. Проверьте, что на диске нет файловой системы:

      ```bash
      lsblk -f
      ```

   2. Отформатируйте диск:

      ```bash
      sudo mkfs.ext4 /dev/vdb
      ```

   3. Проверьте результат форматирования:

      ```bash
      lsblk -f
      ```

6. Настройте монтирование диска.

   1. Создайте директорию для монтирования диска `/volumes/disk1`:

      ```bash
      sudo mkdir /volumes
      sudo mkdir /volumes/disk1
      ```

   2. Добавьте в файл `/etc/fstab` строку с параметрами монтирования диска:

      ```bash
      sudo sed -i '$a /dev/vdb /volumes/disk1 auto defaults 0 0' /etc/fstab
      ```

   3. Выведите содержимое файла и убедитесь, что строка добавлена:

      ```bash
      cat /etc/fstab
      ```

7. Перезапустите виртуальную машину:

   ```bash
   sudo reboot
   ```

8. Проверьте, что диск примонтирован в указанную директорию:

   ```bash
   lsblk
   ```

## 1. Установите cryptsetup

Выполните команду для установки:

```bash
sudo yum install -y cryptsetup cryptsetup-reencrypt
```

## 2. Зашифруйте диск

<err>

Перезапуск виртуальной машины до завершения [настройки загрузчика](#3--izmenite-parametry-zagruzchika) приведет к утрате доступа к ВМ.

</err>

1. Сделайте диск [не загрузочным](../../instructions/vm-volumes#zamena-osnovnogo--root--diska).
2. Остановите все процессы, использующие диск:

   ```bash
   sudo lsof /volumes/disk1
   sudo systemctl stop volumes-disk1.mount
   ```

3. Посмотрите размер текущей файловой системы:

   ```bash
   sudo e2fsck -f /dev/vdb
   ```

   Пример результата выполнения команды:

   ```bash
   e2fsck 1.42.9 (28-Dec-2013)
   Pass 1: Checking inodes, blocks, and sizes
   Pass 2: Checking directory structure
   Pass 3: Checking directory connectivity
   Pass 4: Checking reference counts
   Pass 5: Checking group summary information
   /dev/vdb: 88/655360 files (3.4% non-contiguous), 60910/2621440 blocks
   ```

4. Измените размер файловой системы до минимально возможного:

   ```bash
   sudo resize2fs -M /dev/vdb
   ```

   Пример результата выполнения команды:

   ```bash
   resize2fs 1.42.9 (28-Dec-2013)
   Resizing the filesystem on /dev/vdb to 24971 (4k) blocks.
   The filesystem on /dev/vdb is now 24971 blocks long.
   ```

5. Запустите шифрование диска:

   ```bash
   sudo cryptsetup-reencrypt /dev/vdb --new --reduce-device-size 4096S
   ```

6. Введите и подтвердите ключевую фразу:

   ```bash
   Enter new passphrase:
   Verify passphrase:
   ```

   <warn>

   Запомните ключевую фразу. Без нее невозможно дешифровать диск и использовать ВМ.

   </warn>

7. Дождитесь завершения процесса шифрования:

   ```bash
      Finished, time 00:23.401, 3875 MiB written, speed 165.6 MiB/s
   ```

8. Проверьте работу с зашифрованным диском:

   1. Выполните команду:

      ```bash
      sudo cryptsetup open /dev/vdb vdb_crypt
      ```

   2. Введите ключевую фазу и нажмите *Enter*.

9. Расширьте файловую систему до размера диска:

   ```bash
   sudo resize2fs /dev/mapper/vdb_crypt
   ```

10. Измените имя устройства для монтирования:

   ```bash
   sudo sed 's#/dev/vdb#/dev/mapper/vdb_crypt#' -i /etc/fstab
   ```

11. Выведите содержимое файла `fstab` и убедитесь, что запись изменена:

      ```bash
      cat /etc/fstab
      ```

12. Примонтируйте диск:

      ```bash
      sudo mount /volumes/disk1
      ```

13. Добавьте информацию о зашифрованном разделе в `/etc/crypttab`:

      1. Получите `root` доступ:

         ```bash
         sudo -s
         ```

      2. Выполните команду:

         ```bash
         UUID=$(blkid -s UUID -o value /dev/vdb)
         echo "vdb_crypt UUID=${UUID} none luks,discard" >> /etc/crypttab
         exit
         ```

## 3. Измените параметры загрузчика

<err>

Перезапуск виртуальной машины до завершения настройки загрузчика приведет к утрате доступа к ВМ.

</err>

Настройте загрузчик, чтобы ключевая фраза для расшифровки диска запрашивалась при загрузке системы. Для ввода ключевой фразы используйте [VNC-консоль](../../instructions/vm/vm-console#vnc-konsol) виртуальной машины.

1. Измените настройки загрузчика `grub`. Удалите настройку `console=ttyS0,115200` в параметрах загрузчика:

   ```bash
   sudo sed 's#console=ttyS0,115200 ##' -i /etc/default/grub
   ```

2. Просмотрите файл `grub` и убедитесь, что настройка удалена:

   ```bash
   cat /etc/default/grub
   ```

3. Выполните конфигурирование загрузчика:

   ```bash
   sudo grub2-mkconfig -o /boot/grub2/grub.cfg
   ```

4. Перезагрузите ВМ.

## 4. Получите доступ к ВМ

1. Перейдите в [VNC-консоль](../../instructions/vm/vm-console#vnc-konsol) виртуальной машины. В выводе консоли при загрузке операционной системы появится приглашение ввести ключевую фразу:

   ```bash
   Please enter passphrase for disk vdb_crypt on /volumes/disk1:
   ```

2. Введите ключевую фазу и нажмите *Enter*.

Ключевая фраза для дешифрования диска будет запрашиваться каждый раз при загрузке ОС. После ввода ключевой фразы диск будет примонтирован и с файловой системой можно будет работать, как и до шифрования.
