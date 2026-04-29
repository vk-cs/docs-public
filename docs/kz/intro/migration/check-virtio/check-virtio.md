{include(/kz/_includes/_translated_by_ai.md)}

Виртуалды машинаны VK Cloud ішіне көшіру үшін оның ОЖ-сында VirtIO драйверлері орнатылған болуы керек. Linux-тектес ОЖ-лардың заманауи дистрибутивтерінің көпшілігінде VirtIO драйверлері әдепкі бойынша бар. Олар бөлек модульдер (`.ko` кеңейтімімен) түрінде құрастырылуы немесе ОЖ ядросының құрамына кіруі мүмкін.

1. ОЖ ядросы VirtIO драйверлерін қолдайтынын тексеріңіз. Ол үшін келесі команданы орындаңыз:

   ```console
   grep -E -i "VIRTIO_(BLK|NET|PCI|FS)" /boot/config-$(uname -r)
   ```

   Жауап мысалы:

   ```console
   CONFIG_VIRTIO_BLK=m
   CONFIG_VIRTIO_NET=m
   CONFIG_VIRTIO_PCI_LIB=y
   CONFIG_VIRTIO_PCI=y
   CONFIG_VIRTIO_PCI_LEGACY=y
   CONFIG_VIRTIO_FS=m
   ```

   Мұнда ядро конфигурациясы параметрлерінің мәндері мынадай:

   - `y` — драйвер ядроның құрамына кіреді.
   - `m` — драйвер ядроның құрамына кірмейді, бірақ ядро оны қолдайды.

   Команда жауабында ядро конфигурациясының алты параметрінің кез келгенінің болмауы сәйкес VirtIO драйвері орнатылмағанын және ядро тарапынан қолдау көрсетілмейтінін білдіреді.

1. Команда жауабын талдаңыз:

   1. Егер команда жауабында ядро конфигурациясының барлық алты параметрі бар болса және олардың барлығы `y` мәніне тең болса, яғни барлық қажетті VirtIO драйверлері ядроның құрамына әлдеқашан кірсе, нұсқаулықтың қалған қадамдарын өткізіп жіберіңіз.
   1. Егер команда жауабында конфигурация параметрлерінің кейбірі болмаса, ОЖ ядросын VirtIO драйверлерін қолдауды қосып, қайта құрастырыңыз. Содан кейін VirtIO драйверлерін қолдауды тексеруді басынан бастап қайталаңыз.

   1. Егер ядро конфигурациясының алты параметрінің кез келгені `m` мәніне тең болса, оларға сәйкес драйверлердің ядроның бөлек модульдері ретінде орнатылғанын тексеріңіз:

      {tabs}
      {tab(Debian/Ubuntu)}

      Келесі команданы орындаңыз:

      ```console
      lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

      Команда жауабындағы `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko` немесе `virtiofs.ko` атаулары сәйкес драйверлердің ядро модульдері ретінде орнатылғанын білдіреді.

      Егер барлық қажетті драйверлер әлдеқашан орнатылған болса, нұсқаулықтың қалған қадамдарын өткізіп жіберіңіз.

      {/tab}
      {tab(CentOS/Fedora)}

      Келесі команданы орындаңыз:

      ```console
      sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

      Команда жауабындағы `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz` немесе `virtiofs.ko.xz` атаулары сәйкес драйверлердің ядро модульдері ретінде орнатылғанын білдіреді.

      Егер барлық қажетті драйверлер әлдеқашан орнатылған болса, нұсқаулықтың қалған қадамдарын өткізіп жіберіңіз.

      {/tab}
      {/tabs}

   1. Егер тексеру қажетті VirtIO драйверлерінің ядроның бөлек модульдері ретінде орнатылмағанын көрсетті:

      {tabs}
      {tab(Debian/Ubuntu)}

      1. Келесі команданы орындап, VirtIO драйверлерін орнатыңыз:

         ```console
         echo -e "virtio_blk\nvirtio_net\nvirtio_pci\nvirtiofs" | sudo tee -a /etc/initramfs-tools/modules
         sudo update-initramfs -u
         ```

      1. ОЖ-ны қайта іске қосып, драйверлердің `initrd` файлына қосылғанын және жүктелгенін тексеріңіз:

         ```console
         lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         Ядроның бөлек модульдері ретінде орнатылған барлық VirtIO драйверлері үшін екі команданың да жауабында осы драйверлерге сәйкес модуль атаулары болуы керек: `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko` немесе `virtiofs.ko`.

      {/tab}
      {tab(CentOS/Fedora)}

      1. `initramfs` файлының резервтік көшірмесін жасап, келесі командаларды орындап VirtIO драйверлерін орнатыңыз:

         ```console
         sudo cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak
         sudo mkinitrd -f --with=virtio_blk --with=virtio_net --with=virtio_pci --with=virtiofs/boot/initramfs-$(uname -r).img $(uname -r)
         ```

         Егер `Command 'mkinitrd' not found` қатесі шықса, VirtIO драйверлерін `dracut` утилитасы арқылы орнатыңыз:

         ```console
         sudo dracut -f --add-drivers "virtio_blk virtio_net virtio_pci virtiofs" /boot/initramfs-$(uname -r).img $(uname -r)
         ```

      1. ОЖ-ны қайта іске қосып, драйверлердің `initramfs` файлына қосылғанын және жүктелгенін тексеріңіз:

         ```console
         sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         Ядроның бөлек модульдері ретінде орнатылған барлық VirtIO драйверлері үшін екі команданың да жауабында осы драйверлерге сәйкес модуль атаулары болуы керек: `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz` немесе `virtiofs.ko.xz`.

      {/tab}
      {/tabs}
