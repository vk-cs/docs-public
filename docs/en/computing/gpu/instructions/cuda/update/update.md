# {heading(Updating CUDA components)[id=gpu-instructions-cuda-update]}

1. [Connect](../../../../../computing/iaas/instructions/vm/vm-connect) to the VM with the GPU.
1. If needed for [compatibility with CUDA](https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html) after the {linkto(../../driver-update-linux#gpu-instructions-driver-update-linux)[text=update]}, the GPU driver.
1. Check the version of the CUDA components.

   1. Determine the CUDA Toolkit version:

      ```console
      /usr/local/cuda/bin/nvcc --version 2>/dev/null || /usr/local/cuda-*/bin/nvcc --version
      ```

      A `No such file or directory` error usually means CUDA Toolkit is not installed.

   1. Determine the version of CUDA Runtime, CUDA Libraries, and cuDNN:

      ```console
      ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
      ```

      - `libcudart.so` — CUDA Runtime.
      - `libcublas.so` — CUDA Libraries.
      - `libcuda.so` — the driver library. It should be listed if the driver is installed correctly. You can check whether the driver is installed or reinstall it in {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]}.
      - `libcudnn.so` — cuDNN.

      If a library is not listed, the corresponding component is not installed on the system.

   If a component is missing, choose one of the following scenarios.

   - {linkto(../install#gpu-instructions-cuda-install)[text=Install]} the missing components in the required version, and then return to the update. Use this method if a clean install is not needed.
   - Reinstall all components completely. To do this, first {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=remove]} all components completely, and then return to the {linkto(../install#gpu-instructions-cuda-install)[text=installation]}. Use this method if you need to downgrade the version or perform a clean install.

1. Determine how the CUDA components were installed:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   dpkg -l | grep -E 'cuda-|nvidia-cuda-toolkit'
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   rpm -qa | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
   ```

   {/tab}

   {/tabs}

   A CUDA component that is installed but not listed here means it is not linked to your package manager. Usually this means the component was installed without a package manager, using a ready-made `*.run` installer from the vendor's website.

   To update the version of such components, they need to be reinstalled. To do this, first {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=remove]} the CUDA components, and then {linkto(../install#gpu-instructions-cuda-install)[text=install]} them again.

1. Determine the update source and the versions available for update:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   apt-cache policy cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION> \
      cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
      cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
      cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>

   ```

   Here `<MAJOR_VERSION>` and `<MINOR_VERSION>` are the major and minor version numbers of the CUDA components. For example, for CUDA Toolkit 12.4, the package name is `cuda-toolkit-12-4`.

   If the output shows an `Unable to locate package` error, or the `Candidate` or `Installed` field shows a version from the Ubuntu (`archive.ubuntu.com`) or Debian (`deb.debian.org` and `security.debian.org`) repositories, it's better to switch to the NVIDIA CUDA repository (`developer.download.nvidia.com`) and reinstall the CUDA components instead of updating. To do this, first {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=remove]} CUDA Toolkit, and then {linkto(../install#gpu-instructions-cuda-install)[text=install]} it again.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Determine which packages are currently installed:

      ```console
      rpm -qa | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
      ```

   1. Determine which source these packages were installed from:

      ```console
      dnf repoquery --installed --qf '%{name}.%{arch}\t%{version}-%{release}\t%{repoid}' | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
      ```

   1. Check which source the update will be installed from:

      ```console
      sudo dnf install --assumeno \
         cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
         cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>
      ```

      Make sure the `Repository` column shows the `cuda-rhel<VERSION>-x86_64` repository for your components. If a different repository is shown, it's better to switch to the NVIDIA CUDA repository and reinstall the CUDA components instead of updating. To do this, first {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=remove]} the CUDA components, and then {linkto(../install#gpu-instructions-cuda-install)[text=install]} them again.

   {/tab}

   {/tabs}

1. Update the CUDA components:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install --only-upgrade -y \
      cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION> \
      cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
      cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
      cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>
   ```

   Here `<MAJOR_VERSION>` and `<MINOR_VERSION>` are the major and minor version numbers of the CUDA components. For example, for CUDA Toolkit 12.4, the package name is `cuda-toolkit-12-4`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf upgrade -y \
      cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION> \
      cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
      cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
      cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>
   ```

   Here `<MAJOR_VERSION>` and `<MINOR_VERSION>` are the major and minor version numbers of the CUDA components. For example, for CUDA Toolkit 12.4, the package name is `cuda-toolkit-12-4`.

   {/tab}

   {/tabs}
