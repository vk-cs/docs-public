# {heading(Removing CUDA components)[id=gpu-instructions-cuda-uninstall]}

{note:warn}

This completely removes all installed CUDA components.

{/note}

1. [Connect](../../../../../computing/iaas/instructions/vm/vm-connect) to the VM with the GPU.
1. Remove the CUDA components installed from the package manager:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt remove --purge -y "*cuda*" "*cublas*" "*cufft*" "*cufile*" "*curand*" "*cusolver*" "*cusparse*" "*gds-tools*" "*npp*" "*nvjpeg*" "nsight*" "*nvvm*"
   sudo apt autoremove --purge -y
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf remove "cuda*" "*cublas*" "*cufft*" "*cufile*" "*curand*" "*cusolver*" "*cusparse*" "*gds-tools*" "*npp*" "*nvjpeg*" "nsight*" "*nvvm*"
   sudo dnf autoremove -y
   ```
   {/tab}

   {/tabs}

1. Run `cuda-uninstaller` to remove components installed from a file with the `*.run` extension.

   ```console
   sudo /usr/local/cuda-*/bin/cuda-uninstaller 2>/dev/null || sudo cuda-uninstaller
   ```

   If no installation from a file with the `*.run` extension was previously performed, the removal process will not start. No further action is required.
