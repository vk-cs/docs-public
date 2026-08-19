# {heading(Removing the GPU/vGPU driver)[id=gpu-instructions-driver-uninstall]}

## {heading(Removing the Linux GPU driver)[id=gpu-instructions-driver-uninstall-gpu-linux]}

1. [Connect](../../../../computing/iaas/instructions/vm/vm-connect) to the VM with the GPU.
1. Remove the driver and its dependencies from the package manager:

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

1. Run `nvidia-uninstall` or `nvidia-installer --uninstall`.

   ```console
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

   If a driver installed from a file with the `*.run` extension was previously present on the system, its removal will start. Otherwise, a `No such file or directory` error will occur, indicating there is no driver installed from a `*.run` file. No further action is required.

1. Reboot the VM.

## {heading(Removing the Linux vGPU driver)[id=gpu-instructions-driver-uninstall-vgpu-linux]}

1. [Connect](../../../../computing/iaas/instructions/vm/vm-connect) to the VM with vGPU.
1. Remove the driver:

   ```console
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

1. Reboot the VM.

## {heading(Removing the Windows GPU/vGPU driver)[id=gpu-instructions-driver-uninstall-vgpu-windows]}

1. [Connect](../../../../computing/iaas/instructions/vm/vm-connect) to the VM with vGPU.
1. Press WIN + X.
1. Type `appwiz.cpl` and press ENTER.
1. Remove all components published by `NVIDIA Corporation`.
1. Reboot the VM.
