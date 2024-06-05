<warn>

Changing created virtual resources (VMs, load balancers, DB instances) outside the service can lead to a failure of individual desktops or the entire pool as a whole.

</warn>

## Preparatory steps

1. Make sure that your [connection to the service](../../config/) is configured.
1. (Optional) If you want to use your own image to create desktops, [prepare](/en/base/cloud-desktops/concepts/desktop-image) and [check](/en/base/cloud-desktops/how-to-guides/check-desktop-image) it.
1. Run the pool creation wizard:
   1. Go to your VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
   1. Go to **Cloud Desktop** → **Desktop pools**.
   1. Click the **Add** button.

   The wizard for creating a new pool opens.

## 1. Set up the pool configuration

1. Set the pool configuration parameters:

    - **Pool name**: set a name that is unique within the project. Field requirements: from 3 to 128 characters, only Latin letters, symbols `-`, `_`, spaces, and numbers are allowed.
    - **Pool type**: choose one of the options:

        - **Sessional** — in such a pool, the user is automatically assigned a desktop upon connection. Use the session pool if you need to deploy a large number of desktops of the same configuration with the same set of software. The session pool has hot reserve of desktops.
        - **Personalized** — in such a pool, the administrator assigns desktops to specific users. Suitable for deploying desktops with individual configuration for individual users. This type of pool is used most often.

    - **Description**: the pool description, up to 250 characters.
    - **User group**: specify the user group of the AD or LDAP directory. The users in this group will be assigned desktops from the pool. Field requirements: from 3 to 100 characters, only Latin letters, symbols `-`, `_`, `.`, and numbers are allowed.
    - **OU**: specify the organizational unit of the AD or LDAP directory. For example, `OU=Workstations,DC=domain,DC=com`.
    - **Naming mask**: the suffix with which the desktops names in this pool will begin. Field requirements: from 3 to 15 characters, only lowercase Latin letters and the `-` symbol at the end are allowed.
    - **Min number of desktops** — determines how many desktops will be deployed immediately after the pool is created. The default is `0`.

      This parameter cannot exceed the value of the parameter **Max number of desktops**.

    - **Max number of desktops** — determines how many desktops in the pool can be used at the same time.
    - **Hot reserve** — available only for session pools. Hot reserve desktops become available only at the moment when the user connects and return to the reserve when the user session ends.

      There will be no available desktops in the hot reserve if the value `0` is selected or the parameters **Min number of desktops** and **Max number of desktops** are equal.

    - **User inactivity timeout**: the time after which the user will be disconnected from the desktop if there is no activity on the desktop. The timeout works for the RDP and RX protocols.

      If the value is `0`, the user session will not be interrupted by time-out.

1. Click the **Next step** button.

## 2. Configure the pool VMs

1. Specify the settings of the virtual machines on which the pool desktops will be created:

    - **Instance type**: select the VM type from the list of types available in the project.
    - **Disk size**: specify the disk size in GB. The value cannot be less than the size of the OS image.
    - **Disk Type**: choose one of the values — `HDD`, `SSD` or `High-IOPS SSD`.
    - **Image**: select an image to create the VMs from the list of available images. If necessary, click **Upload your image** and download the [previously prepared](/en/base/cloud-desktops/concepts/desktop-image) and [checked](/en/base/cloud-desktops/how-to-guides/check-desktop-image) image following the [import instructions](/en/base/iaas/service-management/images/images-manage#importing_an_image).

      <info>

      The pool cannot be created until the image download is complete.

      </info>

    - **Security group <pool name>**: specify the security groups for the VMs. If you do not specify a value, the group will not be assigned.

1. Click the **Next step** button.

## 3. Configure the peripherals

1. Select [peripheral devices](../../../concepts/about#available_peripherals) that will be available on the pool desktops.
1. Click the **Create a pool** button.

   The pool will be created within an hour.

If the pool is created successfully, a list of created pools will open.
