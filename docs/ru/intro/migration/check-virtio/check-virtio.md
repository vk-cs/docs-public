Большинство современных дистрибутивов Linux-подобных ОС по умолчанию уже содержит драйверы VirtIO. Драйверы могут быть скомпилированы в виде отдельных модулей (с расширением `.ko`) или входить в состав ядра ОС.

1. Проверьте, поддерживает ли ядро вашей ОС драйверы VirtIO, выполнив команду:

   ```console
   grep -E -i "VIRTIO_(BLK|NET|PCI|FS)" /boot/config-$(uname -r)
   ```

   Пример вывода:

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

1. Если некоторые строки в ответе команды отсутствуют, это означает, что соответствующие VirtIO-драйверы не установлены и не поддерживаются ядром. В этом случае:

   1. Скомпилируйте заново ядро Linux, добавив в него поддержку VirtIO-драйверов.
   1. Вернитесь к этой инструкции для повторной проверки.

1. Если во всех строках в ответе команды вы видите значение `y`, все VirtIO-драйверы входят в состав ядра и дальнейших действий по их установке не требуется. Завершите выполнение инструкции.
1. Если в одной или нескольких строках вы видите значение `m`, проверьте, добавлены ли соответствующие модули драйверов во временную файловую систему. Если нет, добавьте их туда. Для этого:

   <tabs>
   <tablist>
   <tab>Debian/Ubuntu</tab>
   <tab>CentOS/Fedora</tab>
   </tablist>
   <tabpanel>

   1. Выполните команду:

      ```console
      lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

   1. Если вы видите на экране строки с именами `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko` или `virtiofs.ko`, соответствующие драйверы установлены в качестве модулей ядра и дальнейших действий по их установке не требуется. Завершите выполнение инструкции.
   1. Если нужные строки на экране не появились, установите VirtIO-драйверы:

      1. Выполните команды:

         ```console
         echo -e "virtio_blk\nvirtio_net\nvirtio_pci\nvirtiofs" | sudo tee -a /etc/initramfs-tools/modules
         sudo update-initramfs -u
         ```

      1. Перезапустите ОС и проверьте, что драйверы появились в файле `initrd` и загрузились:

         ```console
         lsinitramfs /boot/initrd.img-$(uname -r) | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         После каждой из команд для драйверов, которые должны быть установлены в качестве отдельных модулей ядра, на экране должны появиться соответствующие имена модулей: `virtio_net.ko`, `virtio_blk.ko`, `virtio_pci.ko` или `virtiofs.ko`.

   </tabpanel>
   <tabpanel>

   1. Выполните команду:

      ```console
      sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
      ```

   1. Если вы видите на экране строки с именами `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz` или `virtiofs.ko.xz`, соответствующие драйверы установлены в качестве модулей ядра и дальнейших действий по их установке не требуется. Завершите выполнение инструкции.
   1. Если нужные строки на экране не появились, создайте резервную копию файла `initramfs` и установите VirtIO-драйверы:

      1. Выполните команды:

         ```console
         sudo cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak
         sudo mkinitrd -f --with=virtio_blk --with=virtio_net --with=virtio_pci --with=virtiofs/boot/initramfs-$(uname -r).img $(uname -r)
         ```

      1. Если на экране появилась ошибка «Command 'mkinitrd' not found», установите VirtIO-драйверы с помощью утилиты `dracut`:

         ```console
         sudo dracut -f --add-drivers "virtio_blk virtio_net virtio_pci virtiofs" /boot/initramfs-$(uname -r).img $(uname -r)
         ```

      1. Перезапустите ОС и проверьте, что драйверы появились в файле `initramfs` и загрузились:

         ```console
         sudo lsinitrd /boot/initramfs-$(uname -r).img | grep -E "virtio(_blk|_net|_pci|fs)"
         find /lib/modules/"$(uname -r)"/ -name "virtio*" | grep -E "(blk|net|pci|fs)"
         ```

         После каждой из команд для драйверов, которые должны быть установлены в качестве отдельных модулей ядра, на экране должны появиться соответствующие имена модулей: `virtio_net.ko.xz`, `virtio_blk.ko.xz`, `virtio_pci.ko.xz` или `virtiofs.ko.xz`.

   </tabpanel>
   </tabs>
