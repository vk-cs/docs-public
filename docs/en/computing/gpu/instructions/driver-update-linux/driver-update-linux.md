# {heading(Updating the Linux GPU driver)[id=gpu-instructions-driver-update-linux]}

{note:info}
This article describes updating the Linux driver for a VM with a dedicated GPU configuration flavor. Updates are not supported for [vGPU](../../concepts/vgpu#flavors).

To change the vGPU driver version, {linkto(../driver-uninstall#gpu-instructions-driver-uninstall)[text=remove]} it and [install]{linkto(../driver-install#gpu-instructions-driver-install)[text=install]} it again.
{/note}

1. Check your VM's configuration type:

   1. [Go](https://msk.cloud.vk.com/app/en/) to your {var(cloud)} personal account.
   1. Go to **Cloud Computing** → **Virtual Machines**.
   1. In the list, find the VM for which you need to update the GPU driver. Make sure the **Type** column shows a dedicated GPU configuration flavor.

1. [Connect](../../../../computing/iaas/instructions/vm/vm-connect) to the VM with the GPU.
1. Determine the installed driver version:

   ```console
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   A `No such file or directory` error means the driver is not installed. Go to {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]}.

1. Determine how the driver was installed:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   dpkg -S "$(command -v nvidia-smi)" 2>/dev/null
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   rpm -qf "$(command -v nvidia-smi)" 2>/dev/null
   ```
   {/tab}

   {/tabs}

   An empty response means the `nvidia-smi` command is not linked to your package manager. Usually this means the driver was installed without a package manager, using a ready-made `*.run` installer from the vendor's website.

   To update the version, the driver needs to be reinstalled. To do this, first {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=remove]} the driver, and then {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=install]} it again.

1. Determine the update source and the versions available for update:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   apt-cache policy nvidia-driver-<BRANCH_VERSION>
   ```

   `<BRANCH_VERSION>` is the major version number of the driver obtained when checking for `nvidia-smi`. For example, `550`.

   If the command succeeds and the `Candidate` or `Installed` fields in the output show a version from system or other third-party repositories other than `developer.download.nvidia.com`, it's better to switch to the NVIDIA CUDA repository and reinstall the driver instead of updating.

   To reinstall, first {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=remove]} the driver, and then {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=install]} it again.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Determine which packages are currently installed:

      ```console
      rpm -qa | grep -iE 'nvidia|akmod|kmod'
      ```

   1. Determine which source this package was installed from:

      ```console
      dnf repoquery --installed --info <PACKAGE>
      ```

      Here `<PACKAGE>` is the name of any of the packages obtained from the list above. For example, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   1. Check which source the update will be installed from:

      ```console
      sudo dnf install --assumeno cuda-drivers
      ```

      If the command succeeds and the `Repository` column for the `cuda-drivers` package shows a value other than `cuda-rhel<VERSION>-x86_64`, it's better to switch to the NVIDIA CUDA repository and reinstall the driver instead of updating.

      To reinstall, first {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=remove]} the driver, and then {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=install]} it again.

   {/tab}

   {/tabs}

1. Update the driver:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install --only-upgrade -y cuda-driver-<BRANCH_VERSION>
      ```

   Here `<BRANCH_VERSION>` is the major version number to update the driver to. For example, `550`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf upgrade -y <PACKAGE>
   ```

   Here `<PACKAGE>` is the name of the driver package to update, from the list obtained above. For example, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   {/tab}

   {/tabs}
