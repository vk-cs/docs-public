Данная инструкция поможет настроить шифрование данных на виртуальной машине с возможностью ввода ключевой фразы при загрузке системы. Это позволит обеспечить больший уровень безопасности.

<warn>

VK CS не несет ответственности за корректную работу стороннего ПО. Данная статья приведена для примера.

</warn>

<info>

Эта инструкция подходит только для незагрузочных (несистемных) дисков. То есть диск, который будет зашифрован должен быть подключен к машине дополнительно, а не использоваться для запуска операционной системы.

</info>

Далее разберем пример шифрования диска с данными на CentOS 7. Сам диск /dev/vdb примонтирован в /volumes/disk1 при помощи [dm-crypt.](https://en.wikipedia.org/wiki/Dm-crypt)

1. Устанавливаем необходимые утилиты:

```bash
yum install -y cryptsetup cryptsetup-reencrypt
```

2. Останавливаем все процессы, использующие данный диск:

```bash
lsof /volumes/disk1
systemctl stop XXX
systemctl stop YYY
```

3. Для надежности проверяем файловую систему:

```bash
e2fsck -f  /dev/vdb
e2fsck 1.42.9 (28-Dec-2013)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
/dev/vdb: 88/655360 files (3.4% non-contiguous), 60910/2621440 blocks
```

4. Уменьшаем файловую систему до минимально возможного размера:

```bash
resize2fs -M /dev/vdb

resize2fs 1.42.9 (28-Dec-2013)
Resizing the filesystem on /dev/vdb to 24971 (4k) blocks.
The filesystem on /dev/vdb is now 24971 blocks long.
```

5. Используем утилиту cryptsetup-reencrypt для перешифрования устройства:

```bash
cryptsetup-reencrypt /dev/vdb --new  --reduce-device-size 4096S
Enter new passphrase:
Verify passphrase:
Progress:  20.6%, ETA 00:33, 2112 MiB written, speed 245.6 MiB/s
```

Будет запрошена ключевая фраза для шифрования. Введенное значение следует запомнить.

6. Проверяем работу с  зашифрованным диском:

```bash
cryptsetup open /dev/vdb vdb_crypt
Enter passphrase for /dev/vdb:
```

7. Расширяем файловую систему до размера диска:

```bash
resize2fs /dev/mapper/vdb_crypt
```

8. Изменяем имя устройства для монтирования:

```bash
sed 's#/dev/vdb#/dev/mapper/vdb_crypt#' -i /etc/fstab
```

9. Проверяем монтирование файловой системы:

```bash
mount /volumes/disk1
```

10. Для автоматического монтирования при загрузке системы добавляем информацию о зашифрованном разделе в /etc/crypttab:

```bash
UUID=$(blkid -s UUID -o value  /dev/vdb)
echo "vdb_crypt UUID=${UUID} none luks,discard" >> /etc/crypttab
```

Ключевая фраза для расшифровки диска (passphrase) будет запрашиваться при загрузке системы. Ввести кодовую фразу можно при помощи VNC-доступа в консоль виртуальной машины.

Доступ в VNC можно получить через интерфейс панели VK CS:

1. Раздел «Облачные вычисления» → «Виртуальные машины» → выбрать инстанс и перейти на вкладку «Консоль».

Для корректной работы консоли виртуальной машины через VNC необходимо изменить настройки загрузчика grub, удалив строку "console=ttyS0,115200" из параметров загрузки:

```bash
sed 's#console=ttyS0,115200 ##' /etc/default/grub
grub2-mkconfig -o /boot/grub2/grub.cfg
```

2. Перезагружаем машину. При загрузке будет запрошена ключевая фраза для расшифровки диска.

После ввода ключевой фразы диск будет примонтирован и с файловой системой можно будет работать, как и до шифрования.
