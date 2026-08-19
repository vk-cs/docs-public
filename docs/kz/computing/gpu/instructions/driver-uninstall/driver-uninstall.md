# {heading(GPU/vGPU драйверін жою)[id=gpu-instructions-driver-uninstall]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Linux-жүйесіне арналған GPU драйверін жою)[id=gpu-instructions-driver-uninstall-gpu-linux]}

1. GPU бар ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.
1. Драйверді және оның тәуелділіктерін пакеттік менеджерден жойыңыз:

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

1. `nvidia-uninstall` немесе `nvidia-installer --uninstall` командасын іске қосыңыз.

   ```console
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

   Егер бұрын жүйеде кеңейтілімі `*.run` файлынан орнатылған драйвер болса, оны жою процесі іске қосылады. Керісінше жағдайда `*.run` файлынан орнатылған драйвердің жоқтығын білдіретін `No such file or directory` қатесі шығады. Бұдан кейінгі әрекеттер қажет емес.

1. ВМ-ды қайта іске қосыңыз.

## {heading(Linux-жүйесіне арналған vGPU драйверін жою)[id=gpu-instructions-driver-uninstall-vgpu-linux]}

1. vGPU бар ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.
1. Драйверді жойыңыз:

   ```console
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

1. ВМ-ды қайта іске қосыңыз.

## {heading(Windows-жүйесіне арналған GPU/vGPU драйверін жою)[id=gpu-instructions-driver-uninstall-vgpu-windows]}

1. vGPU бар ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.
1. WIN + X пернелер тіркесімін басыңыз.
1. `appwiz.cpl` деп теріп, ENTER пернесін басыңыз.
1. `NVIDIA Corporation` шығарушысының барлық компоненттерін жойыңыз.
1. ВМ-ды қайта іске қосыңыз.
