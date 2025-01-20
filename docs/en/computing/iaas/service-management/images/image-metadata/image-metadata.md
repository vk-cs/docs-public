The image may have meta tags that affect the configuration of the virtual machine and the guest operating system. Meta tags are set when editing the image.

## Supported image meta tags

VM image tags are divided into:

- `os_*`: guest operating system (OS) settings;
- `hw_*`: virtual machine settings;
- `mcs_*`: VM properties used for sorting in VK Cloud management console;
- other tags that affect the work with the image.

| Name | Description | Default value |
| --- | -------- | --- |
| `os_type` | The type of guest OS created from the image inside the VM. Affects the VM configuration. For example, special hypervisor features will be enabled for Windows to improve the stability and performance of the guest OS | Depends on the OS |
| `mcs_os_type` | The type of guest OS inside the VM. Used for sorting in the management console | |
| `os_distro` | The distribution of the guest OS created from the image inside the virtual machine. Affects VM configuration, for example, types of virtual network devices | |
| `mcs_os_distro` | The distribution of the guest OS inside the VM. Used for sorting in the management console | |
| `os_version` | Version of the guest OS inside the VM | |
| `mcs_os_version` | The version of the guest OS inside the VM. Used for sorting in the management console | |
| `os_admin_user` | The user is inside the guest OS with administrator rights; the password can be set via [management console](../../vm/vm-manage#password) | |
| `os_require_quiesce` | The flag responsible for freezing the file system before taking snapshots of attached disks. If `yes`, then if the file system freezes unsuccessfully, the snapshot creation operation will be canceled | `no` |
| `hw_qemu_guest_agent` | A sign of the presence of a QEMU agent inside the guest OS. If `True`, it makes available the possibility of changing the user's password and freezing the file system for backup | `False` |
| `mcs_name` | The name of the image that is displayed to the user of the management console | |

### {heading(Filling os_distro and os_version tags)[id=find_os_distro_and_os_version]}

To find the values ​​of the `os_distro` and `os_version` meta tags, use, for example, the [libosinfo](https://libosinfo.org) free software:

   1. Install a package for working with libosinfo that is appropriate for your computer, for example:

      - [libosinfo-1.0-0](https://installati.one/install-libosinfo-1.0-0-ubuntu-22-04/) for OS Ubuntu 22.04;
      - [libosinfo-bin](https://linux-packages.com/ubuntu-24-04/package/libosinfo-bin) for OS Ubuntu 24.04 LTS.

      As part of the package, a copy of the libosinfo database will be installed on your computer.

   1. Query libosinfo for the OS you are interested in, for example Ubuntu 24.XX, by running the command:

      ```bash
      osinfo-query os | grep -i ubuntu24
      ```

      Example of command output:

      | Short ID | Name | Version | Website |
      |-|-|-|-|
      | ubuntu24.04 | Ubuntu 24.04 LTS | 24.04 | http://ubuntu.com/ubuntu/24.04 |
      | ubuntu24.10 | Ubuntu 24.10 | 24.10 | http://ubuntu.com/ubuntu/24.10 |

   1. Use the `Short ID` value to define the `os_distro` meta tag and `Version` for the `os_version` meta tag.

<info>

If your local copy of the libosinfo database does not contain information about the required OS version, the copy may be out of date. Try to update the package for working with libosinfo.

</info>

## Installing a meta tag

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Get the image `ID`:

   ```bash
   openstack image show <image ID>
   ```

   The assigned meta tags are displayed in the line `properties`.

2. Set a meta tag:

   ```bash
   openstack image set --property <tag name and value> <image ID>
   ```

</tabpanel>
</tabs>

<details>
  <summary markdown="span">Example of installing meta tags for a Windows VM image with drivers `virtio`</summary>

  1. Determine the Windows OS version:

     ```shell
     systeminfo
     ```

  2. Select the required `Short ID` value for the `os_distro` meta tag from the table above.
  3. [Create](../images-manage) the image.
  4. Set meta tags:

     ```shell
     openstack image set --property <tag name and value> <image ID>
     ```

     Example:

     ```shell
     openstack image set --property os_type="windows" --property os_distro="win2k16" --property os_require_quiesce="yes" --property hw_vif_model="virtio" 7c81ffd7-199d-4428-8767-8120fa1b3aae
     ```

  5. Check the image information:

     ```bash
     openstack image show <image ID>
     ```

     Example of the result:

     ```shell
     | properties | hw_vif_model=virtio, os_distro=win2k16, os_require_quiesce=yes, os_type=windows |
     ```

</details>

## Deleting a meta tag

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Get the image `ID`:

   ```bash
   openstack image show <image ID>
   ```

   The assigned meta tags are displayed in the line `properties`.

2. Delete a meta tag:

   ```bash
   openstack image unset --property <tag name and value> <image ID>
   ```

</tabpanel>
</tabs>
