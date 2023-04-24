Packer allows you to create virtual machine images with the necessary parameters using a configuration file. The Alt Linux P9 OS image in QCOW format will be used as an example.

## Preparatory steps

1. [Install](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) the latest version of Packer.
1. Make sure that the OpenStack CLI [is installed](/en/base/account/project/cli/setup) and you can [log in](/en/base/account/project/cli/authorization) to it.
1. [Load the image](http://ftp.altlinux.org/pub/distributions/ALTLinux/p9/images/cloud/x86_64/alt-p9-cloud-x86_64.qcow2) OS Alt Linux P9 to your computer (file `alt-p9-cloud-x86_64.qcow2`).

## 1. Convert image to RAW format

Use the utility `qemu-img`:

1. Install 'qemu-img' if not done before:

    <tabs>
    <tablist>
    <tab>RHLE/Centos</tab>
    <tab>Ubuntu</tab>
    </tablist>
    <tabpanel>

    ```bash
    sudo yum install qemu-img
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    sudo apt install qemu-utils
    ```

    </tabpanel>
    </tabs>

1. Run the file conversion using the command:

    ```bash
    qemu-img convert -f qcow2 -O raw alt-p9-cloud-x86_64.qcow2 alt-p9-cloud-x86_64.raw
    ```

    The syntax of the conversion command is given in the [official QEMU documentation](https://www.qemu.org/docs/master/tools/qemu-img.html).

## 2. Upload the base image to the cloud

Import the image according to [instructions](../../instructions/vm-images/vm-images-manage#importing-an-image).

## 3. Create a Packer configuration file

1. Determine the details of the network and the downloaded image:

    1. [Get](/en/networks/vnet/operations/manage-net#viewing-the-list-of-networks-and-subnets-and-information-about-them) id of the external network to which the virtual machine being created will be connected.
    1. Copy the name of the downloaded image, getting a list of images using the command `openstack image list`.
    1. Write the received values into variables:

        ```bash
        export SOURCE_IMAGE=8b64c09b-7141-41ad-XXXX-9f5a8dbbd87e
        export NETWORK_ID=f19e1e54-bce9-4c25-XXXX-e0f40e2cff14
        ```

1. Create the file `altlinux.pkr.hcl`:

    <details>
        <summary>altlinux.pkr.hcl</summary>

      ```hcl
      variable "network_id" {
        type = string
        default = "${env("NETWORK_ID")}"
        validation {
          condition     = length(var.network_id) > 0
          error_message = <<EOF
      The NETWORK_ID environment variable must be set.
      EOF
        }
      }

      variable "source_image" {
        type = string
        default = "${env("SOURCE_IMAGE")}"
        validation {
          condition     = length(var.source_image) > 0
          error_message = <<EOF
      The SOURCE_IMAGE environment variable must be set.
      EOF
        }
      }

      source "openstack" "altlinux" {
        flavor       = "Standard-2-6"
        image_name   = "Alt-Linux-P9-Starter-Kit"
        source_image = "${var.source_image}"
        config_drive            = "true"
        networks = ["${var.network_id}"]
        security_groups = ["default", "ssh"]
        ssh_username = "altlinux"
      }

      build {
        sources = ["source.openstack.altlinux"]
        provisioner "shell" {
          execute_command = "sudo {{ .Path }}"
          inline = [
            "apt-get update",
            "apt-get install -y irqbalance bash-completion bind-utils qemu-guest-agent cloud-utils-growpart",
            "systemctl enable qemu-guest-agent"
            ]
        }
      }
      ```

    </details>

1. Check the created configuration using the command:

    ```bash
    packer validate altlinux.pkr.hcl
    ```

## 4. Upload the prepared image to the cloud

1. Run the image creation using the command:

    ```bash
    packer build altlinux.pkr.hcl
    ```

1. Wait for the successful download message to appear:

    ```bash
    ==> Builds finished. The artifacts of successful builds are:
    --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
    ```

1. Write down the ID `c6320138-035f-40d8-XXXX-e814edb2ce5f` — you will need it in the next step.

## 5. Complete the image setup

1. Set [meta tags](../../instructions/vm-images/vm-image-metadata/) to the created image using the command:

    ```bash
    openstack image set \
    --property hw_video_model='qxl' \
    --property hw_watchdog_action='reset' \
    --property hw_vif_multiqueue_enabled='true' \
    --property hw_qemu_guest_agent='yes' \
    --property os_require_quiesce='yes' \
    --property mcs_name='Alt Linux P9 Starter Kit' \
    --property mcs_os_distro='debian' \
    --property mcs_os_type='linux' \
    --property mcs_os_version='P9' \
    --property os_admin_user='altlinux' \
    --property os_distro='altlinux-p9' \
    --property os_type='linux' \
    --property os_version='p9' \
    c6320138-035f-40d8-XXXX-e814edb2ce5f
    ```

1. Make sure that the image is displayed correctly.

    <tabs>
    <tablist>
    <tab>Personal account</tab>
    <tab>OpenStack CLI</tab>
    </tablist>
    <tabpanel>

    1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
    1. Go to **Cloud computing → Images**.
    1. Find the image in the list and click on it. The image page opens.

      The image will also become available when creating a VM.

    </tabpanel>
    <tabpanel>

    ```bash
    openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
    ```

    The result of the command execution:

    ```bash
    +------------------+------------------------------------------------------+
    | Field            | Value                                                |
    +------------------+------------------------------------------------------+
    | checksum         | 896ea37e28d82a548cedf1e0aa92XXXX                     |
    | container_format | bare                                                 |
    | created_at       | 2023-03-29T14:06:44Z                                 |
    | disk_format      | raw                                                  |
    | file             | /v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f/file |
    | id               | c6320138-035f-40d8-XXXX-e814edb2ce5f                 |
    | min_disk         | 0                                                    |
    | min_ram          | 0                                                    |
    | name             | Alt-Linux-P9-Starter-Kit                             |
    | owner            | b5b7ffd4ef0547e5b222f44555dfXXXX                     |
    | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3', boot_roles='mcs_owner', direct_url='s3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', hw_qemu_guest_agent='True', hw_video_model='qxl', hw_vif_multiqueue_enabled='True', hw_watchdog_action='reset', image_location='snapshot', image_state='available', image_type='image', instance_uuid='f19e1e54-bce9-4c25-XXXX-e0f40e2cff14', is_ephemeral_root='True', locations='[{'url': 's3://user:key@h-int.icebox.q/images-b5b7ffd4ef0547e5b222f44555dfXXXX/c6320138-035f-40d8-XXXX-e814edb2ce5f', 'metadata': {}}]', mcs_name='Alt Linux P9 Starter Kit', mcs_os_distro='debian', mcs_os_type='linux', mcs_os_version='P9', os_admin_user='altlinux', os_distro='altlinux-p9', os_require_quiesce='True', os_type='linux', os_version='p9', owner_project_name='mcsXXXX', owner_specified.openstack.md5='XXXX', owner_specified.openstack.object='images/alt-p9-cloud-x86_64', owner_specified.openstack.sha256='XXXX', owner_user_name='test@vk.team', self='/v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f', store='s3', user_id='5f48556ef89444dbab8fa82669dXXXX' |
    | protected        | False                                                |
    | schema           | /v2/schemas/image                                    |
    | size             | 1653604352                                           |
    | status           | active                                               |
    | tags             |                                                      |
    | updated_at       | 2023-03-29T14:08:15Z                                 |
    | visibility       | private                                              |
    +------------------+------------------------------------------------------+
    ```

    </tabpanel>
    </tabs>

## Monitor resource usage

If you no longer need the image, [delete it](../../instructions/vm-images/vm-images-manage#deleting-an-image).
