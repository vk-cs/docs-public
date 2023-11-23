<warn>

Changing the created virtual resources (VMs, load balancers, DB instances) outside the service can lead to the malfunction of individual desktops or the entire pool as a whole.

</warn>

## Preparatory steps

1. Make sure that [service connection](../../config/) is configured.
1. Run the pool creation wizard:
   1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
   1. Go to **Cloud desktops** → **Desktop pools**.
   1. Click the **Add** button.

   The wizard for creating a new pool opens.

## 1. Configure the pool configuration

1. Set the pool configuration:

    - **Pool name**: set a name that is unique within the project. Field requirements: from 3 to 128 characters, only Latin letters, characters `-`, `_`, spaces and numbers are allowed.
    - **Pool type**: choose one of the options:

        - **Sessional** — in such a pool, the desktop is assigned automatically to the user when connected. Use a session pool if you need to deploy a large number of tables of the same configuration with the same set of software. A hot table reserve is provided in the session pool.
        - **Personalized** — in such a pool, the administrator assigns desktops to specific users. Suitable for deploying desktops with individual configuration for individual users. This type of pool is used most often.

    - **Description**: pool description, up to 250 characters.
    - **User group**: specify the user group of the AD or LDAP directory. Desktops from the pool will be assigned to users of this group. Field requirements: from 3 to 100 characters, only Latin letters, symbols are allowed `-`, `_`, `.`, numbers.
    - **Naming mask**: the naming mask is the suffix with which the names of the desktops in this pool will begin. Mask requirements: from 3 to 15 characters, only lowercase Latin letters and the `-` symbol are allowed.
    - **Min number of desktops** — determines how many desktops will be deployed immediately after the pool is created. The default is `0`.

      This parameter cannot exceed the value of the parameter **Max number of desktops**.

    - **Max number of desktops** — determines how many tables in the pool can be used at the same time.

      The parameter is limited by the increment value in the parameter **Naming mask and its increment**. For example, with an increment of `3`, the maximum value of the parameter is `999`.

    - **Hot reserve** — available only for session pools. Tables from the hot reserve become available only at the moment of the user's connection and return to the reserve at the end of the user session.

      There will be no available desktops in the hot standby if the value `0` is selected or the parameters **Min number of desktops** and **Max number of desktops** are the same.

    - **User inactivity timeout**: the time after which the user will be disconnected from the desktop if there is no activity in the desktop. The timeout works for the RDP and RX protocols.

      If the value is `0`, the user session will not be interrupted by timeout.

1. Click the **Next step** button.

## 2. Configure pool VMs

1. Set the settings of the virtual machines on which the pool desktops will be created:

    - **Instance type**: select the VM type from the list of types available in the project.
    - **Disk size**: specify the disk size in GB. The value cannot be less than the size of the OS image.
    - **Disk Type**: choose one of the values — HDD, SSD or High-IOPS SSD.
    - **Image**: select an image to create a VM from the list of available images. If necessary, click **Upload your image** and follow [import instructions](/en/base/iaas/instructions/vm-images/vm-images-manage#importing_an_image).

      <info>

      It is not possible to create a pool until the image is loaded.

      </info>

    - **Security group <pool name>**: specify the security groups for the VM. If you do not specify a value, the group will not be assigned.

1. Click the **Next step** button.

## 3. Configure the peripherals

1. Select which [peripherals](../../../concepts/overview#available_peripherals) will be available to pool desktop users.
1. Click the **Create a pool** button.

   The pool will be created within an hour.

If the pool is created successfully, a list of created pools will open.
