VM images can have meta tags that specify the settings for the operation of the infrastructure. Such tags are set when creating a VM image or later when editing an image.

Image tags can be viewed using the `image show` command, run in the Openstack CLI:

```
open stack image show
```

You can edit image tags with the `image set` command:

```
open stack image set
```

VM image tags are divided into two types:

- os\_\* - include various settings for the guest operating system;
- hw\_\* - include various virtual machine settings.

## Table of supported image tags

| Name                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default value                                                        | Example                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------- |
| `os_type`             | The type of guest OS inside the virtual machine created from the specified image. Affects the virtual machine configuration for the specified OS type. For example, for OS Windows, special hypervisor capabilities will be enabled to improve the stability and performance of the guest OS.                                                                                                                                                                                                                                         | `None`                                                               | `os_type="windows"`,`os_type="linux"`                       |
| `os_distro`           | The distribution of the guest OS inside the virtual machine created from the specified image. Affects the virtual machine configuration for the specified OS distribution. For example, it affects the types of virtual network devices. Such settings are taken from the `nova-compute` service through the `osinfo-db` library, which contains descriptions of various guest OS distributions and recommended virtualization settings for them.                                                                                     | `None`                                                               | `os_distro="win2k"`                                         |
| `os_version`          | The version of the guest OS inside the virtual machine created from the specified image.                                                                                                                                                                                                                                                                                                                                                                                                                                              | `None`                                                               | `None`                                                      |
| `os_admin_user`       | A user inside the guest OS with administrator rights. A password will be set for this user if it can be changed via the Nova API.                                                                                                                                                                                                                                                                                                                                                                                                     | For `os_type=="windows"` - "Administrator", for all others - "root". | `os_admin_user="Admin"`,`os_admin_user="centos"`            |
| `os_require_quiesce`  | Specifies whether the guest OS is required to freeze the file system before snapshotting mounted volumes. If yes, and the freeze fails, the snapshot operation will be canceled.                                                                                                                                                                                                                                                                                                                                                      | `False`                                                              | `os_require_quiesce="true"`                                 |
| `hw_vif_model`        | Network interface virtualization type. With this option, you can override the default behavior of the hypervisor and what `nova-compute` has defined for the guest OS distribution specified in `os_distro`. For example, the new version of `osinfo-db` for OS Windows recommends using the network interface type `e1000e`, as it considers that there are no `virtio` drivers in the default distribution of OS Windows. Therefore, if there is a `virtio` driver in the OS Windows image, you can override the value to `virtio`. | OS-specific defined via `osinfo-db` or use `virtio` by default.      | `hw_vif_model="virtio"`                                     |
| `sid`                 | ID of the PAAS service that this image uses. Required for PAAS images                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `None`                                                               | `sid="trove"`,`sid="sahara"`                                |
| `hw_qemu_guest_agent` | If set to `True`, the QEMU guest agent will be displayed for the instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `None`                                                               | `hw_qemu_guest_agent="true"`                                |
| `private_net_only`    | Determines whether VMs can be created from this image on external networks. Either `true` or not present.                                                                                                                                                                                                                                                                                                                                                                                                                             | `None`                                                               | `private_net_only="true"`                                   |
| `mcs_name`            | Shows the name of the image that is displayed to the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `None`                                                               | `mcs_name="Windows Server 2016"`, `mcs_name="Ubuntu 18.04"` |

## Recommendations

For OS Windows images that have `virtio` drivers, you must specify:

```
os_type="windows";
os_distro="win2k16" -- The value `win2k16` is chosen as an example. See "Choosing a value for os_distro";
os_admin_user="Admin" -- Specify only if the user inside the guest OS is different from the default one;
os_require_quiesce="true";
hw_vif_model="virtio" -- Specify only if virtio drivers are installed inside the guest OS.
```

### Select a value for os_distro

To determine what value to set for the `os_distro` tag, run the `osinfo-query os vendor="Microsoft Corporation"` command on any compute host and select the appropriate value from the Short ID column

```
osinfo-query os vendor="Microsoft Corporation"
 ShortID | name | version | ID
----------------------+-------------------- ------------------------+----------+------------- ----------------------------
 win1.0 | Microsoft Windows 1.0 | 1.0 | http://microsoft.com/win/1.0
 win10 | Microsoft Windows 10 | 10.0 | http://microsoft.com/win/10
 win2.0 | Microsoft Windows 2.0 | 2.0 | http://microsoft.com/win/2.0
 win2.1 | Microsoft Windows 2.1 | 2.1 | http://microsoft.com/win/2.1
 win2k | Microsoft Windows 2000 | 5.0 | http://microsoft.com/win/2k
 win2k12 | Microsoft Windows Server 2012| 6.3 | http://microsoft.com/win/2k12
 win2k12r2 | Microsoft Windows Server 2012 R2 | 6.3 | http://microsoft.com/win/2k12r2
 win2k16 | Microsoft Windows Server 2016 | 10.0 | http://microsoft.com/win/2k16
 win2k3 | Microsoft Windows Server 2003 | 5.2 | http://microsoft.com/win/2k3
 win2k3r2 | Microsoft Windows Server 2003 R2 | 5.2 | http://microsoft.com/win/2k3r2
 win2k8 | Microsoft Windows Server 2008 | 6.0 | http://microsoft.com/win/2k8
 win2k8r2 | Microsoft Windows Server 2008 R2 | 6.1 http://microsoft.com/win/2k8r2
 win3.1 | Microsoft Windows 3.1 | 3.1 http://microsoft.com/win/3.1
 win7 | Microsoft Windows 7 | 6.1 http://microsoft.com/win/7
 win8 | Microsoft Windows 8 | 6.2 | http://microsoft.com/win/8
 win8.1 | Microsoft Windows 8.1 | 6.3 | http://microsoft.com/win/8.1
 win95 | Microsoft Windows 95 | 4.0 | http://microsoft.com/win/95
 win98 | Microsoft Windows 98 | 4.1 http://microsoft.com/win/98
 winme | Microsoft Windows Millennium Edition 4.9 | http://microsoft.com/win/me
 winnt3.1 | Microsoft Windows NT Server 3.1 | 3.1 http://microsoft.com/winnt/3.1
 winnt3.5 | Microsoft Windows NT Server 3.5 | 3.5 | http://microsoft.com/winnt/3.5
 winnt3.51 | Microsoft Windows NT Server 3.51 | 3.51 | http://microsoft.com/winnt/3.51
 winnt4.0 | Microsoft Windows NT Server 4.0 | 4.0 | http://microsoft.com/winnt/4.0
 winvista | Microsoft Windows Vista 6.0 | http://microsoft.com/win/vista
 winxp | Microsoft Windows XP | 5.1 | http://microsoft.com/win/xp
 `` `
```
