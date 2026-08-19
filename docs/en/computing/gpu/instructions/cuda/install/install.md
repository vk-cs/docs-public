# {heading(Installing CUDA components)[id=gpu-instructions-cuda-install]}

{note:info}

This section only covers installing and updating CUDA Toolkit, CUDA Runtime, CUDA Libraries, and cuDNN from the [NVIDIA CUDA repository](https://developer.download.nvidia.com/compute/cuda/repos/). You can also add [other required components](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/#meta-packages).

{/note}

1. [Connect](../../../../../computing/iaas/instructions/vm/vm-connect) to a VM with a GPU, or [create](../../../../../computing/iaas/instructions/vm/vm-create) a new one if you haven't done so already.
1. {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=Install]} the GPU driver if you haven't done so already.
1. Check whether CUDA Toolkit, CUDA Runtime, CUDA Libraries, and cuDNN are installed:

   - CUDA Toolkit:

      ```console
      /usr/local/cuda/bin/nvcc --version 2>/dev/null || /usr/local/cuda-*/bin/nvcc --version
      ```

      A `No such file or directory` error usually means CUDA Toolkit is not installed.

   - CUDA Runtime, CUDA Libraries, and cuDNN:

      ```console
      ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
      ```

      - `libcudart.so` — CUDA Runtime.
      - `libcublas.so` — CUDA Libraries.
      - `libcuda.so` — the driver library. It should be listed if the driver is installed correctly. You can check whether the driver is installed or reinstall it in {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]}.
      - `libcudnn.so` — cuDNN.

      If a library is not listed, the corresponding component is not installed on the system.

   If all required components are installed but their version is lower than required, go to {linkto(../update#gpu-instructions-cuda-update)[text=%text]}.

   If a component is not installed, choose one of the following scenarios.
   
   - Install only the missing components, using the same version as the components already installed. Use this method if the installed versions suit your needs. You can {linkto(../update#gpu-instructions-cuda-update)[text=update]} them later if needed.
   - Reinstall all components from scratch. To do this, {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=remove]} all components completely, and then return to the installation. Use this method if you need to downgrade the version or perform a clean install from scratch.

1. Install CUDA Toolkit, CUDA Runtime, CUDA Libraries, and cuDNN from the [NVIDIA CUDA repository](https://developer.download.nvidia.com/compute/cuda/repos/):

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Determine your distribution version:

      ```console
      cat /etc/os-release
      ```

   1. Download and install the `cuda-keyring_1.1-1_all.deb` package from the NVIDIA CUDA repository for the corresponding version of your distribution:

      ```console
      wget https://developer.download.nvidia.com/compute/cuda/repos/<DISTRIBUTION><VERSION>/x86_64/cuda-keyring_1.1-1_all.deb && \
      sudo dpkg -i cuda-keyring_1.1-1_all.deb
      ```

      Here:

      - `<DISTRIBUTION>` — the distribution name in Latin letters.
      - `<VERSION>` — the distribution version. Numbers only, without dots.

      Examples: `debian13`, `ubuntu2404`.

   1. Update the package manager indexes:

      ```console
      sudo apt update
      ```

   1. Make sure the required versions of the CUDA components are available for installation:

      ```console
      apt-cache policy -<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
         cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>
      ```

      Here `<MAJOR_VERSION>` and `<MINOR_VERSION>` are the major and minor version numbers of the CUDA components. For example, for CUDA Toolkit 12.4, the package name is `cuda-toolkit-12-4`.

      If the command succeeds, the output will include a `Candidate` field indicating the version to be installed for the specified package.

   1. Install the CUDA components:

      ```console
      sudo apt -y install \
         cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
         cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Determine the Red Hat Enterprise Linux version your distribution is based on:

      ```console
      rpm -E %rhel
      ```

   1. Add the NVIDIA CUDA repository as a source:

      ```console
      sudo tee /etc/yum.repos.d/nvidia-cuda.repo >/dev/null <<EOF
      [cuda-rhel<VERSION>-x86_64]
      name=NVIDIA CUDA Repository (rhel<VERSION>/x86_64)
      baseurl=https://developer.download.nvidia.com/compute/cuda/repos/rhel<VERSION>/x86_64/
      enabled=1
      gpgcheck=1
      repo_gpgcheck=0
      gpgkey=https://developer.download.nvidia.com/compute/cuda/repos/rhel<VERSION>/x86_64/D42D0685.pub
      EOF
      ```

      Here `<VERSION>` is the Red Hat Enterprise Linux version number your distribution is based on.

   1. Update the package manager cache:

      ```console
      sudo dnf clean all
      sudo dnf makecache --refresh
      ```

   1. Make sure the required versions of the CUDA components are available for installation:

      ```console
      dnf --disablerepo="*" --enablerepo="cuda*" list | grep -E '^cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION>(\.|$)|^cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION>(\.|$)|^cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION>(\.|$)|^cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>(\.|$)'
      ```

      Here `<MAJOR_VERSION>` and `<MINOR_VERSION>` are the major and minor version numbers of the CUDA components. For example, for CUDA Toolkit 12.4, the package name is `cuda-toolkit-12-4`.

   1. Install the CUDA components:

      ```console
      sudo dnf install -y \
         cuda-runtime-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-libraries-<MAJOR_VERSION>-<MINOR_VERSION> \
         cuda-toolkit-<MAJOR_VERSION>-<MINOR_VERSION> \
         cudnn9-cuda-<MAJOR_VERSION>-<MINOR_VERSION>
      ```

   {/tab}

   {/tabs}

1. Check that CUDA Toolkit works:

   ```console
   nvcc --version
   ```

1. If running `nvcc --version` results in a `command not found` error, add CUDA Toolkit to the environment variables manually:

   ```console
   sudo tee /etc/profile.d/cuda-path.sh >/dev/null <<'EOF'
   # Add CUDA Toolkit to PATH (system-wide)
   CUDA_HOME=/usr/local/cuda
   case ":$PATH:" in
   *":$CUDA_HOME/bin:"*) ;;
   *) export PATH="$CUDA_HOME/bin:$PATH" ;;
   esac
   EOF
   ```

1. Check again that CUDA Toolkit works:

   ```console
   nvcc --version
   ```

1. (Optional) Check again that CUDA Runtime, CUDA Libraries, and cuDNN are installed:

   ```console
   ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
   ```
