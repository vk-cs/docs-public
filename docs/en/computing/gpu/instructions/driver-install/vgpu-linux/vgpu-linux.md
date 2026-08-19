# {heading(Installing the Linux vGPU driver and configuring the licensing token)[id=gpu-instructions-driver-install-vgpu-linux]}

{note:info}
For a VM [created](../../../../iaas/instructions/vm/vm-create) from a special {var(cloud)} Linux image for vGPU, you don't need to additionally install the vGPU driver or configure the licensing token.
{/note}

After completing this instruction, the vGPU driver will be installed and the licensing token will be configured.

The vGPU driver does not support updates. To change its version, first {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-linux)[text=remove]} it, and then install it again by repeating the steps in this instruction.

## {heading(Preparation steps)[id=gpu-instructions-driver-install-vgpu-linux-preparation]}

1. Check your VM's configuration type:

   1. [Go](https://msk.cloud.vk.com/app/en/) to your {var(cloud)} personal account.
   1. Go to **Cloud Computing** → **Virtual Machines**.
   1. In the list, find the VM for which you need to install the vGPU driver. Make sure the **Type** column shows a vGPU configuration flavor.

1. [Connect](../../../../iaas/instructions/vm/vm-add-net) the VM to an external network if you haven't done so already.
1. [Connect](../../../../../computing/iaas/instructions/vm/vm-connect) to the VM with vGPU.

## {heading({counter(TOC)}. Install the vGPU driver)[id=gpu-instructions-vgpu-linux-install]}

1. Check whether the vGPU driver is installed:

   ```console
   nvidia-smi --query-gpu=driver_version,virtualization.mode,virtualization.virtualized,name --format=csv,noheader
   ```

   The following results are possible:

   - A `No such file or directory` error means the driver is not installed.
   - The command output shows a driver version, and the virtualization type is shown as vGPU. This means the driver is already installed and the NVIDIA stack was initialized successfully. No further action is required.
   - `nvidia-smi` runs, but the output shows a `... couldn't communicate with the NVIDIA driver` error. This means the driver is damaged or an incorrect version is used (for example, for [dedicated GPUs](../../../concepts/about)). You need to reinstall the driver: first {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-linux)[text=remove]} it, then install it again by repeating the steps in this instruction.

1. Prepare the OS:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. (Optional) Update the system components and reboot the VM to avoid compatibility issues.

      {note:warn}
      Updating the components may also update the Linux kernel version. If the OS already runs software that requires the current kernel version, it's better to skip this step.
      {/note}

      Run the commands:

      ```shell
      sudo apt update &&
      sudo apt upgrade -y &&
      sudo reboot
      ```

   1. Install the additional packages required to install the driver:

      ```shell
      sudo apt install -y build-essential dkms perl pkg-config libelf-dev linux-headers-$(uname -r)
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. (Optional) Update the system components and reboot the VM to avoid compatibility issues.

      {note:warn}
      Updating the components may also update the Linux kernel version. If the OS already runs software that requires the current kernel version, it's better to skip this step.
      {/note}

      Run the commands:

      ```shell
      sudo dnf update -y &&
      sudo reboot
      ```

   1. Install the additional packages required to install the driver:

      ```shell
      sudo dnf -y install gcc make perl dkms pkgconf-pkg-config elfutils-libelf-devel "kernel-devel-uname-r == $(uname -r)" "kernel-headers-uname-r == $(uname -r)"
      ```

   {/tab}

   {/tabs}

1. Download the NVIDIA® GRID driver using one of the following methods:

   {tabs}

   {tab(wget)}

   ```shell
   wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_linux.run
   ```

   {/tab}

   {tab(curl)}

   ```shell
   curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_linux.run
   ```

   {/tab}

   {/tabs}

1. Grant execute permission to the downloaded file:

   ```shell
   chmod +x vgpu_driver_linux.run
   ```

1. Run the file and follow the installer's instructions:

   ```shell
   sudo ./vgpu_driver_linux.run
   ```

1. Reboot the VM.

## {heading({counter(TOC)}. Configure the licensing token)[id=gpu-instructions-vgpu-linux-token]}

1. Download the licensing script using one of the following methods:

   {tabs}

   {tab(wget)}

   ```shell
   wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher
   ```

   {/tab}

   {tab(curl)}

   ```shell
   curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher
   ```

   {/tab}

   {/tabs}

1. Grant execute permission to the script:

   ```shell
   chmod +x nvidia_token_fetcher
   ```

1. Run the script:

   ```shell
   sudo ./nvidia_token_fetcher
   ```

1. Check the licensing configuration:

   1. Make sure the licensing token file exists:

      ```shell
      sudo ls /etc/nvidia/ClientConfigToken/
      ```

   1. Check the license status:

      ```shell
      nvidia-smi -q | grep -i license
      ```

      Output for a correctly configured license:

      ```shell
      vGPU Software Licensed Product
          License Status: Licensed
      ```

1. (Optional) Configure automatic licensing token verification at system startup.

   If the VM was created from a [prepared OpenStack image](https://docs.openstack.org/image-guide/obtain-images.html), automation can be configured using [cloud-init](https://cloudinit.readthedocs.io/). You can also use systemd.

   {tabs}

   {tab(cloud-init integration)}

   Copy the script file to a dedicated directory:

   ```shell
   sudo cp nvidia_token_fetcher /var/lib/cloud/scripts/per-boot/
   ```

   {/tab}

   {tab(Creating a systemd unit file)}

   1. Save the script file to a shared directory:

      ```shell
      sudo cp nvidia_token_fetcher /usr/local/bin/
      ```

   1. Create a new unit file for systemd. Example using the `nano` text editor:

      ```shell
      sudo nano /etc/systemd/system/nvidia-token.service
      ```

      You can use any other editor instead of `nano`, for example `vi`.

   1. Copy the following content into the file and save it:

      ```txt
      [Unit]
      Description=NVIDIA Licensing Script
      After=network.target

      [Service]
      Type=oneshot
      ExecStart=/usr/local/bin/nvidia_token_fetcher
      TimeoutStartSec=15
      RemainAfterExit=false

      [Install]
      WantedBy=multi-user.target
      ```

   1. Run the command to enable automatic startup on system boot:

      ```shell
      sudo systemctl enable nvidia-token.service
      ```

   {/tab}

   {/tabs}
