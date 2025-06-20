This guide describes how to recover a virtual machine by using emergency boot mode. The process is similar to recovering the OS on a physical computer by booting from a [Live CD](https://en.wikipedia.org/wiki/Live_CD). The steps are performed via the OpenStack CLI.

Examples of problems that you can try to solve in this way: file system failure, loss of access, OS bootloader failure.

Prerequisite for the recovery procedure: a virtual boot disk must be connected to the VM.

1. Prepare an ISO file with the image of the required OS, for example, download it from the official website. This guide uses the Ubuntu Server 20.04 OS image.

    <warn>

    The image must have the VirtIO drivers installed.

    </warn>

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli##1_install_the_openstack_client), and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. In your project, create a bootable Live CD image for the selected OS by running the command:

    ```console
    openstack image create --file <FILE_NAME>.iso --disk-format iso --container-format bare --min-ram 800 --property hw_rescue_device=cdrom <IMAGE_NAME>
    ```

    Here:

    - `<FILE_NAME>.iso` is the name of the ISO file with the OS image.
    - `<IMAGE_NAME>` is the name of the bootable Live CD image.

    Example of command:

    ```console
    openstack image create --file ubuntu-20.04.4-live-server-amd64.iso --disk-format iso --container-format bare --min-ram 800 --property hw_rescue_device=cdrom ubuntu-20.04.4-live-server-private
    ```

    {cut(Example of output)}

    ```console
    +------------------+--------------------------------------------------------------------------------+
    | Field            | Value                                                                          |
    +------------------+--------------------------------------------------------------------------------+
    | container_format | bare 2022-08-11T10:53:46Z                                                      |
    | disk_format      | iso                                                                            |
    | file             | /v2/images/81a6dd5a-XXXX/file                                                  |
    | id               | 81a6dd5a-XXXX                                                                  |
    | min_disk         | 0                                                                              |
    | min_ram          | 800                                                                            |
    | name             | ubuntu-20.04.4-live-server-private                                             |
    | owner            | b423a815a77aXXXX                                                               |
    | properties       | hw_rescue_device='cdrom', locations='[]',                                      |
    |                  | owner_specified.openstack.md5='',                                              |
    |                  | owner_specified.openstack.object='images/ubuntu-20.04.4-live-server-private',  |
    |                  | owner_specified.openstack.sha256=''                                            |
    | protected        | False                                                                          |
    | schema           | /v2/schemas/image                                                              |
    | status           | queued                                                                         |
    | tags             |                                                                                |
    | updated_at       | 2022-08-11T10:53:46Z                                                           |
    | visibility       | shared                                                                         |
    +------------------+--------------------------------------------------------------------------------+
    ```

    {/cut}

    <info>

    The created image will appear in your VK Cloud management console in the **Cloud Servers** → **Images** section.

    </info>

1. Perform an emergency boot of the VM from the created Live CD. To do this, run the command:

    ```console
    openstack server rescue --image <IMAGE> <VM>
    ```

    Here:

    - `<IMAGE>` is the name or ID of the bootable Live CD image.
    - `<VM>` is the name or ID of the VM to be recovered.

1. Make sure that the VM status has changed to `rescue` by running the command:

    ```console
    openstack server show <VM>
    ```

    Here, `<VM>` is the name or ID of the VM. The VM status will be displayed in the `vm_state` and `status` fields.

    Example of command:

    ```console
    openstack server show bb079908-XXXX
    ```

    {cut(Example of output)}

    ```console
    +-----------------------------+-----------------------------------------------------------+
    | Field                       | Value                                                     |
    +-----------------------------+-----------------------------------------------------------+
    | OS-DCF:diskConfig           | MANUAL                                                    |
    | OS-EXT-AZ:availability_zone | MS1                                                       |
    | OS-EXT-STS:power_state      | Running                                                   |
    | OS-EXT-STS:task_state       | None                                                      |
    | OS-EXT-STS:vm_state         | rescued                                                   |
    | OS-SRV-USG:launched_at      | 2022-08-11T11:43:56.000000                                |
    | OS-SRV-USG:terminated_at    | None                                                      |
    | accessIPv4                  |                                                           |
    | accessIPv6                  |                                                           |
    | addresses                   | ext-net=185.130.115.220                                   |
    | config_drive                | True                                                      |
    | created                     | 2022-08-11T10:40:33Z                                      |
    | flavor                      | Basic-1-1-10 (df3c499a-XXXX)                              |
    | hostId                      | <hostId>                                                  |
    | id                          | bb079908-XXXX                                             |
    | image                       | N/A (booted from volume)                                  |
    | key_name                    | <key_name>                                                |
    | name                        | ubuntu-20-rescue-test                                     |
    | project_id                  | <project_id>                                              |
    | properties                  |                                                           |
    | security_groups             | id='461df60a-XXXX', name='default'                        |
    |                             | id='b3b48aa3-XXXX', name='ssh'                            |
    | status                      | RESCUE                                                    |
    | updated                     | 2022-08-11T11:43:56Z                                      |
    | user_id                     | <user_id>                                                 |
    | volumes_attached            | id='9e19d3cb-XXXX'                                        |
    +-----------------------------+-----------------------------------------------------------+
    ```

    {/cut}

1. Get a link to the virtual machine console by running the command:

    ```console
    openstack console url show <VM>
    ```

    Here, `<VM>` is the name or ID of the VM.

    Example of command:

    ```console
    openstack console url show bb079908-XXXX
    ```

    {cut(Example of output)}

    ```console
    +----------+-----------------------------------------------------------------------------------------------+
    | Field    | Value                                                                                         |
    +----------+-----------------------------------------------------------------------------------------------+
    | protocol | vnc                                                                                           |
    | type     | novnc                                                                                         |
    | url      | https://infra.mail.ru:6080/vnc_auto.html?path=%3Ftoken%3Dee65b775-XXXX                        |
    +----------+-----------------------------------------------------------------------------------------------+
    ```

    {/cut}

1. In your browser, follow the received link. The console of the operating system loaded from the Live CD will open. In this guide, this will be the console of the Ubuntu Server 20.04 OS.

    You can also [log into](../../instructions/vm/vm-console#the_vnc_console) this console via your VK Cloud management console.

1. Perform VM recovery operations in the console.
1. Once the work is completed, return the VM to normal operation mode by running the command:

    ```console
    openstack server unrescue <VM>
    ```

    Here, `<VM>` is the name or ID of the VM. The VM will be restarted from its boot disk. Wait for the reboot to complete.

1. Check that the VM status has changed to `active` by running the command:

    ```console
    openstack server show <VM>
    ```

    Here, `<VM>` is the name or ID of the VM. The VM status will be displayed in the `vm_state` and `status` fields.

1. If you no longer need the bootable Live CD image, delete it using the command:

    ```console
    openstack image delete <IMAGE>
    ```

    Here, `<IMAGE>` is the name or ID of the previously created bootable Live CD image.
