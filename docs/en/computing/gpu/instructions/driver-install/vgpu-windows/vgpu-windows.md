# {heading(Installing the Windows vGPU driver and configuring the licensing token)[id=gpu-instructions-driver-install-vgpu-windows]}

{note:info}
For a VM [created](../../../../iaas/instructions/vm/vm-create) from a special {var(cloud)} Windows image for vGPU, it's enough to [connect](../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win) to the VM once at first startup and reboot it to fully initialize all vGPU drivers and services. You don't need to separately install the vGPU driver or configure the licensing token.
{/note}

After completing this instruction, the vGPU driver will be installed and the licensing token will be configured.

The vGPU driver does not support updates. To change its version, first {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-windows)[text=remove]} it, and then install it again by repeating the steps in this instruction.

## {heading(Preparation steps)[id=gpu-instructions-driver-install-vgpu-windows-preparation]}

1. Check your VM's configuration type:

   1. [Go](https://msk.cloud.vk.com/app/en/) to your {var(cloud)} personal account.
   1. Go to **Cloud Computing** → **Virtual Machines**.
   1. In the list, find the VM for which you need to install the vGPU driver. Make sure the **Type** column shows a vGPU configuration flavor.

1. [Connect](../../../../iaas/instructions/vm/vm-add-net) the VM to an external network if you haven't done so already.
1. [Connect](../../../../../computing/iaas/instructions/vm/vm-connect) to the VM with vGPU.

## {heading({counter(TOC)}. Install the vGPU driver)[id=gpu-instructions-vgpu-windows-install]}

1. [Download](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_windows.exe) the NVIDIA® GRID driver.
1. Run the file and follow the installer's instructions.

   {note:warn}
   After installing the driver, the VNC console will no longer be available for managing the VM. Use an RDP connection for further work, or install alternative remote management software.
   {/note}

1. Reboot the VM.
1. (Optional) Check that the driver works:

   1. Press WIN + X.
   1. Select **Device Manager**.
   1. Double-click **Display adapters**.
   1. Make sure the GPU device is listed.
   1. In the command prompt or PowerShell, run:

      ```shell
      nvidia-smi
      ```

      If the driver works correctly, the output will show the vGPU of your configuration.

## {heading({counter(TOC)}. Configure the licensing token)[id=gpu-instructions-vgpu-windows-token]}

1. [Download](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher.exe) the licensing script and run it.

   A window with a command interface will appear and close almost immediately. The script has now finished running.

1. Check the licensing configuration using the command prompt or PowerShell:

   1. Make sure the licensing token file exists:

      ```shell
      dir "C:\Program Files\NVIDIA Corporation\vGPU Licensing\ClientConfigToken\"
      ```

   1. Request information from `nvidia-smi`:

      ```shell
      nvidia-smi -q
      ```

   1. Make sure `License Status` in the `vGPU Software Licensed Product` section shows `Licensed`.

1. (Optional) Configure automatic licensing token verification at system startup.

   You can configure automation using [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) or the built-in Windows startup mechanism.

   {tabs}

   {tab(Cloudbase-Init)}

   1. Copy the script file to a dedicated directory:

      ```plaintext
      C:\Program Files\Cloudbase Solutions\Cloudbase-Init\LocalScripts
      ```

   1. Open the `cloudbase-init.conf` configuration file in a text editor:

      ```plaintext
      C:\Program Files\Cloudbase Solutions\Cloudbase-Init\conf\cloudbase-init.conf
      ```

   1. Check that the `plugins` field includes the local scripts plugin:

      ```plaintext
      plugins = cloudbaseinit.plugins.windows.localscripts.LocalScriptsPlugin
      ```

      If it's missing, add it. If there are several plugins, list them separated by commas.

   1. Save the file and restart the `cloudbase-init` service. To do this, run the following commands in the command prompt or PowerShell:

      ```shell
      net stop cloudbase-init
      net start cloudbase-init
      ```

   {/tab}

   {tab(Startup folder)}

   1. Save the file to an accessible location. Example:

      ```plaintext
      C:\NVIDIA Token
      ```

   1. Right-click the script file and select **Create shortcut**.

      A file named `<FILE_NAME> - shortcut` will be created.

   1. Copy the resulting shortcut to the directory:

      ```plaintext
      C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
      ```

   {/tab}

   {/tabs}
