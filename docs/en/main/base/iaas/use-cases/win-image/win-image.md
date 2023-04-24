<info>

The list of supported Windows OS for migration is listed in the section [Operating system](../../concepts/vm-concept#operating-system).

</info>

The Windows Server 2016 CORE edition image is used as an example.

## Preparatory steps

1. Clone a repository with automated build scripts [windows-imaging-tools](https://github.com/cloudbase/windows-imaging-tools).
1. Clone the repository to update the system image [WindowsUpdateCLI](https://github.com/cloudbase/WindowsUpdateCLI/tree/216d0e832a3a1e4a681409792210fb97938e41b9).
1. Make sure that you have [installed and configured](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) Git.
1. [Install the drivers](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.225-1/virtio-win.iso) VirtIO (KVM).
1. Configure Hyper-V if this has not been done before.
1. [Download and install](https://learn.microsoft.com/ru-ru/windows-hardware/get-started/adk-install) Windows ADK.
1. Download the ISO image of the operating system for which you plan to migrate to VK Cloud. It is recommended to use the en-US version of the image.
1. Make sure that the OpenStack CLI [is installed](/en/base/account/project/cli/setup) and you can [log in](/en/base/account/project/cli/authorization) to it.

## 1. Prepare the OS installation WIM file

<info>

The installation image may contain several editions of the operating system. Since the installation takes place automatically, select the desired edition in advance and export it to a separate wim file.

</info>

1. Connect the downloaded OS ISO image.
1. Output a list of all Windows versions using the command executed on behalf of the administrator:

    ```powershell
    Get-WindowsImage -ImagePath E:\sources\Install.wim
    ```

    Here `E:\sources\Install.wim` — full access to the system's WIM file on the mounted disk.

    A list of editions will appear indicating the `ImageIndex` of its number:

    ```bash
    ImageIndex      : 1
    ImageName       : Windows Server 2016 Standard
    ImageDescription: This is the recommended option. It reduces management and maintenance by installing only what is required for most applications and server roles. It does not include a graphical user interface, but you can fully manage the server locally or remotely using Windows PowerShell or other tools. See the section "Windows Server Installation Options".
    ImageSize       : 9 146 079 566 bytes

    ImageIndex      : 2
    ImageName       : Windows Server 2016 Standard (desktop features)
    ImageDescription: This option is suitable if you need a graphical user interface (for example, to ensure backward compatibility of an application that cannot work when installing the main server components). All server roles and components are supported. More detailed: "Windows Server Installation Options".
    ImageSize       : 15 219 002 744 bytes
    ```

1. Export the revision with `ImageIndex` = `1` using the command:

    ```powershell
    dism /
    export-image /
    SourceImageFile:E:\sources\Install.wim /
    SourceIndex:1 /
    DestinationImageFile:D:\Temp\install.wim /
    Compress:max /
    CheckIntegrity
    ```

    Here:

    - `D:\Temp\install.wim` — the full path on the local disk where the exported image will be saved;
    - `SourceIndex:1` — index number of the required revision.

## 2. Configure the external switch in Hyper-V

[Create](https://learn.microsoft.com/ru-ru/windows-server/virtualization/hyper-v/get-started/create-a-virtual-switch-for-hyper-v-virtual-machines?tabs=hyper-v-manager#create-a-virtual-switch) virtual switch `external` with connection type **External network**.

## 3. Build the image locally

1. Go to the `windows-imaging-tools` directory and import the modules:

    ```powershell
    pushd windows-openstack-imaging-tools
    Import-Module .\WinImageBuilder.psm1
    Import-Module .\Config.psm1
    Import-Module .\UnattendResources\ini.psm1
    ```

1. Transfer the contents of the directory `WindowsUpdateCLI` to `windows-openstack-imaging-tools\UnattendResources\WindowsUpdates` (if the option is specified `install_updates=True`).
1. Create a configuration file `config.ini`:

    ```powershell
    $ConfigFilePath = ".\config.ini"
    New-WindowsImageConfig -ConfigFilePath $ConfigFilePath
    ```

1. Open the created file and paste the code there:

    ```ini
    wim_file_path=D:\Temp\install.wim
    image_name=Windows Server 2016 SERVERSTANDARDCORE
    image_path=D:\Win_Server_2016_img.qcow2
    virtual_disk_format=QCOW2
    image_type=KVM
    external_switch=external
    virtio_iso_path="D:\Drivers\virtio.iso"
    time_zone="Russian Standard Time"
    install_qemu_ga=True
    install_updates=True
    purge_updates=False
    compress_qcow2=True
    ```

    Here:

    - `external_switch=external` — name of the created switch;
    - `virtio_iso_path="D:\Drivers\virtio.iso"` — full path to the ISO file with VirtIO drivers;
    - `time_zone="Russian Standard Time"` — the time zone, you can find out using the command `tzutil /l`;
    - `purge_updates=False` — do not clear the `WinSxS` directory after installing updates.

1. Run a local build of the image using the command:

    ```powershell
    New-WindowsOnlineImage -ConfigFilePath $ConfigFilePath
    ```

1. Wait for the operation to complete and make sure that the file `D:\Win_Server_2016_img.qcow2` is created.

## 4. Import the image to the VK Cloud

[Use the CLI](../../instructions/vm-images/vm-images-manage#import-obraza) to import an image:

```bash
openstack image create --private --container-format bare --disk-format qcow2 --file D:\Win_Server_2016_img.qcow2 --property hw_qemu_guest_agent=yes --property store=s3 --property min_ram=2048 --property os_require_quiesce=yes --property min_disk=40 --property os_type=windows --property os_admin_user=Administrator --property mcs:lic:mswinsrv=true --property mcs_name='Windows Server 2016 Standard (en)' --property mcs_os_distro='server' --property mcs_os_edition='std' --property mcs_os_type='windows' --property mcs_os_lang='en' --property mcs_os_type='windows' --property mcs_os_version='2016' --property os_distro='win2k16' <image name>
```

Wait for the operation to complete. After downloading the image, you will be able to [create a VM](../../instructions/vm/vm-create/) by standard means of the VK Cloud platform.

## Monitor resource usage

If you no longer need the imported image, [delete it](../../instructions/vm-images/vm-images-manage#deleting-an-image).
