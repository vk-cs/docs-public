# {heading(Installing the Linux GPU driver)[id=gpu-instructions-driver-install-gpu-linux]}

{note:info}

Installing the GPU driver on a VM with Windows OS is done interactively using an installer file from the [manufacturer's website](https://www.nvidia.com/en-us/drivers/).

{/note}

1. Check your VM's configuration type:

   1. [Go](https://msk.cloud.vk.com/app/en/) to your {var(cloud)} personal account.
   1. Go to **Cloud Computing** → **Virtual Machines**.
   1. In the list, find the VM for which you need to install the GPU driver. Make sure the **Type** column shows a dedicated GPU configuration flavor.

1. [Connect](../../../../../computing/iaas/instructions/vm/vm-connect) to the VM with the GPU, or [create](../../../../../computing/iaas/instructions/vm/vm-create) a new one if you haven't done so already.
1. Check whether the GPU driver is installed:

   ```console
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   The following results are possible:

   - A `No such file or directory` error means the driver is not installed.
   - The command output shows a driver version. This means the driver is already installed and the NVIDIA stack was initialized successfully. Go to {linkto(../../driver-update-linux#gpu-instructions-driver-update-linux)[text=%text]}.
   - `nvidia-smi` runs, but the output shows a `... couldn't communicate with the NVIDIA driver` error. This means the driver is damaged or an incorrect version is used (for example, for [vGPU](../../../concepts/vgpu#flavors)). Reinstall the driver: first {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=remove]} the GPU driver, then install it again by repeating the steps in this instruction.

1. Install the driver:

   {note:info}

   The driver is installed from the [NVIDIA CUDA repository](https://developer.download.nvidia.com/compute/cuda/repos/).

   {/note}

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

   1. Make sure the required or a newer driver version is available for installation:

      ```console
      apt-cache policy cuda-drivers
      ```

      If the command succeeds, the output will include a `Candidate` field indicating the version to be installed from the `cuda-drivers` meta-package.

   1. Install the driver:

      ```console
      sudo apt -y install cuda-drivers-<BRANCH_VERSION>
      ```

      Here `<BRANCH_VERSION>` is the major version number of the driver you need to install. For example, `550`.

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

   1. Make sure the required or a newer driver version is available for installation:

      ```console
      dnf repoquery --show-duplicates --latest-limit=0 cuda-drivers
      ```

   1. Install the driver:

      ```console
      sudo dnf install '<DRIVER_PACKAGE>'
      ```

      Here `<DRIVER_PACKAGE>` is the package name from the list obtained in the previous step. For example, `cuda-drivers-3:570.211.01-1.el9.x86_64`.

   {/tab}

   {/tabs}

   1. Check that the driver is installed:

      ```console
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. If running the command results in a `command not found` error, add `nvidia-smi` to the environment variables manually:

      ```console
      echo 'export PATH="$PATH:/usr/bin"' | sudo tee /etc/profile.d/nvidia-smi-path.sh >/dev/null &&
      source /etc/profile.d/nvidia-smi-path.sh
      ```

   1. Check again that `nvidia-smi` works:

      ```console
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. Reboot the VM.
