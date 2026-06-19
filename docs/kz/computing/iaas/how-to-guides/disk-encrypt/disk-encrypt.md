# {heading(Сryptsetup көмегімен дискіні шифрлау)[id=iaas-disk-encrypt]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:err}
{var(cloud)} үшінші тарап БҚ-сының дұрыс жұмысына жауап бермейді.

Дискіні шифрламас бұрын [ВМ-нің резервтік көшірмесін жасаңыз](/kz/storage/backups/instructions/create-backup-copy).
{/note}

Linux үшін [cryptsetup](https://manpages.ubuntu.com/manpages/trusty/man8/cryptsetup.8.html) көмегімен виртуалды машина дискінің шифрлануын баптаңыз.

## {heading(Дайындық қадамдары)[id=iaas-disk-encrypt-preparatory-steps]}

CentOS 7.9 басқаруындағы Linux тестілік виртуалды машинасын, сондай-ақ шифрланатын қосымша дискіні жасау үшін дайындық қадамдарын орындаңыз.

1. CentOS 7.9 образынан [Linux ВМ жасаңыз](../../instructions/vm/vm-create).
1. Дискіні [жасаңыз](../../instructions/volumes/volumes-create) және оны ВМ-ге [қосыңыз](../../instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk).
1. [ВМ-ге қосылыңыз](../../instructions/vm/vm-connect/vm-connect-nix).
1. Дискілер тізімін шығарып, қажетті дискінің атауын табыңыз (мысалы, `/dev/vdb`):

   ```console
   sudo fdisk -l 
   ```

1. Егер дискіде файлдық жүйе болмаса, оны пішімдеңіз.

   1. Дискіде файлдық жүйе жоқ екенін тексеріңіз:

      ```console
      lsblk -f
      ```

   1. Дискіні пішімдеңіз:

      ```console
      sudo mkfs.ext4 /dev/vdb
      ```

   1. Пішімдеу нәтижесін тексеріңіз:

      ```console
      lsblk -f
      ```

1. Дискіні монталауды баптаңыз.

   1. `/volumes/disk1` дискіні монталауға арналған директорияны жасаңыз:

      ```console
      sudo mkdir /volumes
      sudo mkdir /volumes/disk1
      ```

   1. `/etc/fstab` файлына дискіні монталау параметрлері бар жолды қосыңыз:

      ```console
      sudo sed -i '$a /dev/vdb /volumes/disk1 auto defaults 0 0' /etc/fstab
      ```

   1. Файл мазмұнын шығарып, жолдың қосылғанына көз жеткізіңіз:

      ```console
      cat /etc/fstab
      ```

1. Виртуалды машинаны қайта іске қосыңыз:

   ```console
   sudo reboot
   ```

1. Дискінің көрсетілген директорияға монталғанын тексеріңіз:

   ```console
   lsblk
   ```

## {heading(1. cryptsetup орнатыңыз)[id=iaas-disk-encrypt_install]}

Орнату үшін команданы орындаңыз:

```console
sudo yum install -y cryptsetup cryptsetup-reencrypt
```

## {heading(2. Дискіні шифрлаңыз)[id=iaas-disk-encrypt_it]}

{note:err}
[Жүктеушіні баптауды](#iaas-disk-encrypt-param-edit) аяқтағанға дейін виртуалды машинаны қайта іске қосу ВМ-ге қолжетімділіктің жоғалуына әкеледі.
{/note}

1. Дискіні [жүктелмейтін](../../instructions/volumes/volumes-manage#iaas-volumes-manage-changing-bootable-attribute) етіңіз.
1. Дискіні пайдаланатын барлық процестерді тоқтатыңыз:

   ```console
   sudo lsof /volumes/disk1
   sudo systemctl stop volumes-disk1.mount
   ```

1. Ағымдағы файлдық жүйенің өлшемін қараңыз:

   ```console
   sudo e2fsck -f /dev/vdb
   ```

   Команданы орындау нәтижесінің мысалы:

   ```console
   e2fsck 1.42.9 (28-Dec-2013)
   Pass 1: Checking inodes, blocks, and sizes
   Pass 2: Checking directory structure
   Pass 3: Checking directory connectivity
   Pass 4: Checking reference counts
   Pass 5: Checking group summary information
   /dev/vdb: 88/655360 files (3.4% non-contiguous), 60910/2621440 blocks
   ```

1. Файлдық жүйенің өлшемін мүмкін болатын ең аз мәнге дейін өзгертіңіз:

   ```console
   sudo resize2fs -M /dev/vdb
   ```

   Команданы орындау нәтижесінің мысалы:

   ```console
   resize2fs 1.42.9 (28-Dec-2013)
   Resizing the filesystem on /dev/vdb to 24971 (4k) blocks.
   The filesystem on /dev/vdb is now 24971 blocks long.
   ```

1. Дискіні шифрлауды іске қосыңыз:

   ```console
   sudo cryptsetup-reencrypt /dev/vdb --new --reduce-device-size 4096S
   ```

1. Құпия фразаны енгізіп, растаңыз:

   ```console
   Enter new passphrase:
   Verify passphrase:
   ```

   {note:warn}
   Құпия фразаны есте сақтаңыз. Онсыз дискіні дешифрлау және ВМ-ді пайдалану мүмкін емес.
   {/note}

1. Шифрлау процесінің аяқталуын күтіңіз:

   ```console
   Finished, time 00:23.401, 3875 MiB written, speed 165.6 MiB/s
   ```

1. Шифрланған дискімен жұмысты тексеріңіз:

   1. Команданы орындаңыз:

      ```console
      sudo cryptsetup open /dev/vdb vdb_crypt
      ```

   1. Құпия фразаны енгізіп, *Enter* пернесін басыңыз.

1. Файлдық жүйені диск өлшеміне дейін кеңейтіңіз:

   ```console
   sudo resize2fs /dev/mapper/vdb_crypt
   ```

1. Монталау үшін құрылғы атауын өзгертіңіз:

   ```console
   sudo sed 's#/dev/vdb#/dev/mapper/vdb_crypt#' -i /etc/fstab
   ```

1. `fstab` файлының мазмұнын шығарып, жазбаның өзгергеніне көз жеткізіңіз:

   ```console
   cat /etc/fstab
   ```

1. Дискіні монталаңыз:

   ```console
   sudo mount /volumes/disk1
   ```

1. `/etc/crypttab` ішіне шифрланған бөлім туралы ақпаратты қосыңыз:

   1. `root` қолжетімділігін алыңыз:

      ```console
      sudo -s
      ```

   1. Команданы орындаңыз:

      ```console
      UUID=$(blkid -s UUID -o value /dev/vdb)
      echo "vdb_crypt UUID=${UUID} none luks,discard" >> /etc/crypttab
      exit
      ```

## {heading(3. Жүктеуші параметрлерін өзгертіңіз)[id=iaas-disk-encrypt-param-edit]}

{note:err}
Жүктеушіні баптауды аяқтағанға дейін виртуалды машинаны қайта іске қосу ВМ-ге қолжетімділіктің жоғалуына әкеледі.
{/note}

Жүйе жүктелген кезде дискіні дешифрлауға арналған құпия фраза сұралатындай етіп жүктеушіні баптаңыз. Құпия фразаны енгізу үшін виртуалды машинаның [VNC-консолін](../../instructions/vm/vm-console#vm-console-vnc) пайдаланыңыз.

1. `grub` жүктеушісінің баптауларын өзгертіңіз. Жүктеуші параметрлерінен `console=ttyS0,115200` баптауын жойыңыз:

   ```console
   sudo sed 's#console=ttyS0,115200 ##' -i /etc/default/grub
   ```

1. `grub` файлын қарап шығып, баптаудың жойылғанына көз жеткізіңіз:

   ```console
   cat /etc/default/grub
   ```

1. Жүктеушіні конфигурациялауды орындаңыз:

   ```console
   sudo grub2-mkconfig -o /boot/grub2/grub.cfg
   ```

1. ВМ-ді қайта жүктеңіз.

## {heading(4. ВМ-ге қол жеткізіңіз)[id=iaas-disk-encrypt-access]}

1. Виртуалды машинаның [VNC-консоліне](../../instructions/vm/vm-console#vm-console-vnc) өтіңіз. Операциялық жүйе жүктелген кезде консоль шығысында құпия фразаны енгізу сұрауы пайда болады:

   ```console
   Please enter passphrase for disk vdb_crypt on /volumes/disk1:
   ```

1. Құпия фразаны енгізіп, *Enter* пернесін басыңыз.

Дискіні дешифрлауға арналған құпия фраза ОС жүктелген сайын сұралады. Құпия фразаны енгізгеннен кейін диск монталатын болады және файлдық жүйемен шифрлауға дейінгі сияқты жұмыс істеуге болады.
