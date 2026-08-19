# {heading(Удаление драйвера GPU/vGPU)[id=gpu-instructions-driver-uninstall]}

## {heading(Удаление Linux-драйвера GPU)[id=gpu-instructions-driver-uninstall-gpu-linux]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU.
1. Удалите драйвер и его зависимости из пакетного менеджера:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt purge cuda-drivers 'nvidia-driver-*' 'libnvidia-*' 'nvidia-utils-*' 'nvidia-dkms-*' 'nvidia-kernel-*'  'xserver-xorg-video-nvidia*' 'nvidia-settings'
   sudo apt autoremove --purge
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf remove 'nvidia-driver*' 'nvidia-kmod*' 'cuda-drivers*' 'akmod-nvidia*' 'kmod-nvidia*' 'xorg-x11-drv-nvidia*' 'nvidia-settings' 'nvidia-persistenced' 'nvidia-modprobe' 'nvidia-xconfig'
   sudo dnf autoremove
   ```
   {/tab}

   {/tabs}

1. Запустите `nvidia-uninstall` или `nvidia-installer --uninstall`. 

   ```console
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

   Если ранее в системе был установлен драйвер из файла с расширением `*.run`, запустится его удаление. В противном случае будет ошибка `No such file or directory`, которая указывает на отсутствие драйвера установленного из файла с расширением `*.run`. Дальнейшие действия не требуются.

1. Перезагрузите ВМ.

## {heading(Удаление Linux-драйвера vGPU)[id=gpu-instructions-driver-uninstall-vgpu-linux]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с vGPU.
1. Удалите драйвер:

   ```console
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

1. Перезагрузите ВМ.

## {heading(Удаление Windows-драйвера GPU/vGPU)[id=gpu-instructions-driver-uninstall-vgpu-windows]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с vGPU.
1. Нажмите сочетание клавиш WIN + X.
1. Введите `appwiz.cpl` и нажмите ENTER.
1. Удалите все компоненты от издателя `NVIDIA Corporation`.
1. Перезагрузите ВМ.
