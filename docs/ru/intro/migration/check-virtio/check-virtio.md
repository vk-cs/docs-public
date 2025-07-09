Для миграции виртуальной машины в VK Cloud в ее ОС должны быть установлены драйверы VirtIO. Большинство современных дистрибутивов Linux-подобных ОС по умолчанию уже содержит драйверы VirtIO. Они могут быть скомпилированы в виде отдельных модулей (с расширением `.ko`) или входить в состав ядра ОС.

1. Проверьте, поддерживает ли ядро вашей ОС драйверы VirtIO. Для этого выполните команду:

   ```console
   grep -E -i "VIRTIO_(BLK|NET|PCI|FS)" /boot/config-$(uname -r)
   ```

   Пример ответа:

   ```console
   CONFIG_VIRTIO_BLK=m
   CONFIG_VIRTIO_NET=m
   CONFIG_VIRTIO_PCI_LIB=y
   CONFIG_VIRTIO_PCI=y
   CONFIG_VIRTIO_PCI_LEGACY=y
   CONFIG_VIRTIO_FS=m
   ```

   Здесь значения параметров конфигурации ядра имеют следующий смысл:

   - `y` — драйвер входит в состав ядра.
   - `m` — драйвер не входит в состав ядра, но поддерживается ядром.

   Отсутствие какого-либо из шести параметров конфигурации ядра в ответе команды означает, что соответствующий VirtIO-драйвер не установлен и не поддерживается ядром.

1. Проанализируйте ответ команды:

   1. Если в ответе команды есть все шесть параметров конфигурации ядра и все они равны `y`, т.е. все нужные VirtIO-драйверы уже входят в состав ядра, пропустите остальные шаги инструкции.
   1. Если некоторые из параметров конфигурации в ответе команды отсутствуют, скомпилируйте заново ядро вашей ОС, добавив в него поддержку VirtIO-драйверов. Затем повторите проверку поддержки драйверов VirtIO с самого начала.

   1. Если какие-либо из шести параметров конфигурации ядра равны `m`, проверьте, установлены ли соответствующие им драйверы в качестве отдельных модулей ядра:

      {tabs}
      {tab(Debian/Ubuntu)}

      Выполните команду:

      ```console
      lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

      Имена `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko` или `virtiofs.ko` в ответе команды означают, что соответствующие драйверы установлены в качестве модулей ядра.

      Если все нужные драйверы уже установлены, пропустите остальные шаги инструкции.

      {/tab}
      {tab(CentOS/Fedora)}

      Выполните команду:

      ```console
      sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

      Имена `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz` или `virtiofs.ko.xz` в ответе команды означают, что соответствующие драйверы установлены в качестве модулей ядра.

      Если все нужные драйверы уже установлены, пропустите остальные шаги инструкции.

      {/tab}
      {/tabs}

   1. Если проверка показала, что нужные VirtIO-драйверы не установлены как отдельные модули ядра:

      {tabs}
      {tab(Debian/Ubuntu)}

      1. Установите драйверы VirtIO, выполнив команду:

         ```console
         echo -e "virtio_blk\nvirtio_net\nvirtio_pci\nvirtiofs" | sudo tee -a /etc/initramfs-tools/modules
         sudo update-initramfs -u
         ```

      1. Перезапустите ОС и проверьте, что драйверы появились в файле `initrd` и загрузились:

         ```console
         lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         Для всех VirtIO-драйверов, установленных как отдельные модули ядра, ответ обеих команд должен содержать соответствующие этим драйверам имена модулей: `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko` или `virtiofs.ko`.

      {/tab}
      {tab(CentOS/Fedora)}

      1. Создайте резервную копию файла `initramfs` и установите драйверы VirtIO, выполнив команды:

         ```console
         sudo cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak
         sudo mkinitrd -f --with=virtio_blk --with=virtio_net --with=virtio_pci --with=virtiofs/boot/initramfs-$(uname -r).img $(uname -r)
         ```

         Если появилась ошибка `Command 'mkinitrd' not found`, установите VirtIO-драйверы с помощью утилиты `dracut`:

         ```console
         sudo dracut -f --add-drivers "virtio_blk virtio_net virtio_pci virtiofs" /boot/initramfs-$(uname -r).img $(uname -r)
         ```

      1. Перезапустите ОС и проверьте, что драйверы появились в файле `initramfs` и загрузились:

         ```console
         sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         Для всех VirtIO-драйверов, установленных как отдельные модули ядра, ответ обеих команд должен содержать соответствующие этим драйверам имена модулей: `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz` или `virtiofs.ko.xz`.

      {/tab}
      {/tabs}
