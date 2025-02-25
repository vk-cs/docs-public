<info>

The list of Windows OS supported for migration to VK Cloud is listed in the [Operating system](../../concepts/about#operating_system) section.

</info>

Creating and uploading a VM image to VK Cloud is considered below using Windows Server 2016 Standard edition as an example. A computer with Windows 11 Pro is used to prepare the image. All commands are run in the Windows PowerShell console.

Requirements for the computer used to prepare the image:

[cols="1,3", options="header"]
|===
|Component
|Component requirements

|Operating system
|Windows 10/11 (except Home edition), Windows Server 2012 R2 and higher

|CPU
|2-4 cores with virtualization technology support (Intel VT-x or AMD-V)

|RAM
|Minimum 8 GB for running virtual machines and tools. 16 GB or more is recommended for comfortable work with Windows images, especially when using multiple virtual machines

|Disk space
|At least 50 GB of free disk space to store Windows images and temporary files. SSD is recommended for faster file processing and image creation
|===

## Before you start

1. Download the installation ISO image of the Windows OS that you plan to migrate to VK Cloud. It is recommended to use the en-US version of the image.
1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

## 1. Prepare tools

1. Enable the Hyper-V virtualization engine.

    1. Go to Control Panel. To do this, press WIN+R, in the **Run** window that opens, enter `control` and click the **OK** button.
    1. In Control Panel, select **Programs and Features**.
    1. In the left side menu, select **Turn Windows features on or off**.
    1. Select the **Hyper-V** option and click the **OK** button.
    1. Restart your computer.

1. Update Windows Powershell to version 4 or higher.

    1. Check the current version. To do this, launch Windows PowerShell and run the command: `$PSVersionTable.PSVersion` or `get-host`.
    1. If the version is lower than 4, install the latest version of Windows PowerShell from the [official Microsoft website](https://aka.ms/PSWindows) or contact the system administrator of your organization to install the update from an internal resource.

1. Install the Windows Assessment and Deployment Kit (ADK).

    1. Check if ADK is installed. To do this, go to the **Programs and Features** section of Control Panel and find the **Windows Assessment and Deployment Kit** program.
    1. If this program is missing, download ADK from the [official website](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install) and install it. During installation select all components except **Windows Assessment Toolkit**.

1. [Download](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.266-1/virtio-win.iso) the VirtIO (KVM) drivers.
1. [Download](https://github.com/cloudbase/windows-imaging-tools/archive/refs/heads/master.zip) the archive of the Windows Imaging Tools repository — a tool for automating the creation of Windows images.
1. [Download](https://github.com/cloudbase/WindowsUpdateCLI/archive/refs/heads/master.zip) the archive of the WindowsUpdateCLI repository — a module for managing Windows updates.

## 2. Create external virtual switch in Hyper-V

This will allow your virtual machines created from the prepared image to connect to internet via a physical network adapter.

1. Open Hyper-V Manager. To do this, press WIN+R, in the **Run** window that opens, enter `virtmgmt.msc` and click the **OK** button.
1. In the left side menu, select your computer name.
1. In the **Actions** pane on the right, select  **Virtual Switch Manager**.
1. In the left side menu of the **Virtual Switch Manager** window, select **New virtual network switch**.
1. Select `External` for the switch type and click the **Create Virtual Switch** button.
1. In the **Name** box, enter the name of the switch — `external`.
1. Make sure that `External network` is selected under **Connection Type** and select a network adapter with internet access from the list, such as Ethernet or Wi-Fi adapter of your computer.
1. (Optional) To allow the OS of your computer to also use this adapter, select the **Allow management operating system to share this network adapter** option.
1. Apply the changes you made.
1. If you receive a warning that these changes may disrupt your current network connection, agree to continue.
1. Complete the virtual switch creation by clicking the **OK** button.

## 3. Configure Windows Imaging Tools

1. Unzip the Windows Imaging Tools repository archive to the root directory of the `C:` drive. This will create the `C:\windows-imaging-tools-master` directory.
1. Create `ISO` and `IMG` directories in `C:\windows-imaging-tools-master`. The `ISO` directory will be used for ISO files, `IMG` — for the Windows image that will be created as a result of executing the instruction.
1. Move the ISO files with the Windows installation image and VirtIO drivers to the `ISO` directory.
1. Go to the `ISO` directory, right-click on the ISO file with the Windows installation image and select **Mount** from the context menu.

    The ISO file will be mounted as a virtual drive. A new drive, for example `E:`, will appear in Windows Explorer.

## 4. Prepare OS installation WIM file

The Windows installation ISO image may contain several editions of the operating system. Since the installation is automatic, select the required edition in advance and export it to a separate WIM file. To do this:

1. Run Windows PowerShell as administrator.
1. List all editions of Windows using the command:

    ```powershell
    Get-WindowsImage -ImagePath E:\sources\Install.wim
    ```

    Here, `E:\sources\Install.wim` is the full path on the mounted virtual drive to the WIM file with available Windows editions.

    A list of Windows editions will appear with their index numbers indicated in the `ImageIndex` parameter:

    ```txt
    ImageIndex      : 1
    ImageName       : Windows Server 2016 Standard
    ImageDescription: <DESCRIPTION 1>
    ImageSize       : 9 146 079 566 bytes

    ImageIndex      : 2
    ImageName       : Windows Server 2016 (Desktop Experience)
    ImageDescription: <DESCRIPTION 2>
    ImageSize       : 15 219 002 744 bytes
    ```

1. Create a `Temp` directory in the root directory of the `C:` drive.
1. Export the edition with `ImageIndex` = `1` using the command:

    ```powershell
    dism `
    /export-image `
    /SourceImageFile:E:\sources\Install.wim `
    /SourceIndex:1 `
    /DestinationImageFile:C:\Temp\install.wim `
    /Compress:max `
    /CheckIntegrity
    ```

    Here:

    * `SourceIndex` is the index number of the exported edition.
    * `DestinationImageFile` is the full path where to save the exported edition.

## 5. Build image locally

1. Go to the `C:\windows-imaging-tools-master` directory and import modules with scripts to automate image creation:

    ```powershell
    Import-Module .\WinImageBuilder.psm1
    Import-Module .\Config.psm1
    Import-Module .\UnattendResources\ini.psm1
    ```

1. Unzip the WindowsUpdateCLI repository archive and move the contents of the `WindowsUpdateCLI-master` directory to `C:\windows-imaging-tools-master\UnattendResources\WindowsUpdates`.
1. Create a configuration file named `config.ini`:

    ```powershell
    $ConfigFilePath = ".\config.ini"
    New-WindowsImageConfig -ConfigFilePath $ConfigFilePath
    ```

1. Open the created file and edit the parameters:

    ```ini
    wim_file_path=C:\Temp\install.wim
    image_name=Windows Server 2016 Standard
    image_path=C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw
    virtual_disk_format=RAW
    image_type=KVM
    external_switch=external
    virtio_iso_path="С:\windows-imaging-tools-master\ISO\virtio-win.iso"
    time_zone="Russian Standard Time"
    install_qemu_ga=True
    install_updates=True
    purge_updates=False
    disk_layout=BIOS
    ```

    Here:

    * `wim_file_path` — the full path to the WIM file of the previously selected OS edition.
    * `image_name` — the name of the Windows OS edition. Must match the value of the `ImageName` parameter for the selected OS edition.
    * `image_path` — the full path where to save the created Windows image.
    * `virtual_disk_format` — the format of the virtual disk.
    * `image_type` — the type of the created image.
    * `external_switch` — the name of the previously created virtual switch.
    * `virtio_iso_path` — the full path to the ISO file with the VirtIO drivers.
    * `time_zone` — the name of the requires time zone. Find out the zone names using the command: `tzutil /l`.
    * `install_qemu_ga=True` — installing QEMU agent.
    * `install_updates=True` — installing Windows updates when generating the image.
    * `purge_updates=False` — disabling the cleanup of the `WinSXS` directory after installing updates.
    * `disk_layout` — the type of disk layout.

    <info>

    The VK Cloud platform supports boot disks with partitioning to boot the OS using BIOS. The disk layout for booting via UEFI is not supported.

    </info>

1. Run a local image build using the command:

    ```powershell
    New-WindowsOnlineImage -ConfigFilePath $ConfigFilePath
    ```

1. Wait for the operation to complete and make sure that the `C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw` file is created.

## 6. Import image to VK Cloud

[Use OpenStack CLI](../../service-management/images/images-manage#importing_an_image) to import the image:

```bash
openstack image create \
    --progress \
    --private \
    --container-format bare \
    --disk-format raw \
    --file C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw \
    --property store=s3 \
    --property hw_qemu_guest_agent=True \
    --property os_require_quiesce=yes \
    --property mcs:lic:mswinsrv=true \
    --property mcs_name='Windows Server 2016 Standard (en)' \
    --property os_admin_user='Admin' \
    --property os_type=windows \
    <IMAGE_NAME>
```
Replace <IMAGE_NAME> with the actual one. Arguments of the form `--property <key>=<value>` are used to assign [meta tags](/en/computing/iaas/service-management/images/image-metadata) to the image.

Wait for the operation to complete. After uploading the image, you will be able to [create a VM](../../service-management/vm/vm-create) by standard means of the VK Cloud platform.

## Delete unused resources

If you no longer need the imported image, [delete it](../../service-management/images/images-manage#deleting_an_image).
