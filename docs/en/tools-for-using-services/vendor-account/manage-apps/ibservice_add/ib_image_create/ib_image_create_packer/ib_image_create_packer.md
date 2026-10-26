# {heading(Creating with Packer)[id=ib_image_create_packer]}

{include(/en/_includes/_translated_by_ai_en.md)}

To create a service image using Packer:

1. Install Packer:

   1. Download Packer from the [official {var(cloud)} mirror](https://hashicorp-releases.mcs.mail.ru/packer/).
   1. Extract the archive and add the path to the extracted file to the `Path` environment variable.
   1. Run the `packer` command to verify that Packer has been installed successfully.

   For detailed instructions, see the [official Packer documentation](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli).
1. [Install](/en/tools-for-using-services/cli/openstack-cli) OpenStack CLI and [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in the project.
1. Download a base OS image that supports working with cloud platforms.

   The OS must meet the [service image requirements](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).

   The [official OpenStack website](https://docs.openstack.org/image-guide/obtain-images.html) provides links to images of some OSs that support working with cloud platforms.

   {note:info}

   To avoid uploading the base image to the cloud platform yourself, use a ready-made one from the table in the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os)[text=%text]}. In this case, proceed directly to the step of configuring the Packer file.

   {/note}
1. Convert the base image to the `RAW` format:

   1. Install the [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) utility on your local computer.

      {caption(Example of installing qemu-img for RHEL-based images (CentOS, AlmaLinux, Rocky Linux))[align=left;position=above]}
      ```console
      sudo yum install qemu-img
      ```
      {/caption}

      {caption(Example of installing qemu-img for Debian-based images (Ubuntu))[align=left;position=above]}
      ```console
      sudo apt install qemu-utils
      ```
      {/caption}
   1. Run the command:

      ```console
      qemu-img convert -f qcow2 -O raw <INITIAL_IMAGE_NAME> <IMAGE_NAME>
      ```

      Here:

      * `<INITIAL_IMAGE_NAME>` — name of the original base image. For example, `alt-p9-cloud-x86_64.qcow2`.
      * `<IMAGE_NAME>` — name of the base image in the `RAW` format. For example, `alt-p9-cloud-x86_64.raw`.

1. Upload the base image in the `RAW` format to the cloud platform:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <IMAGE_PATH> <IMAGE_NAME>
   ```

   Here:

   * `<IMAGE_PATH>` — path to the base image.
   * `<IMAGE_NAME>` — name of the base image in the `RAW` format.

      The ID of the created image will be displayed in the cloud platform management console.

   For detailed instructions, see the section [Image import](/en/computing/iaas/instructions/images/images-manage#iaas-images-manage-import).
1. Configure the Packer file:

   1. Write the network ID and the base image ID to the environment variables:

      ```console
      export NETWORK_ID=<NETWORK_ID>
      export SOURCE_IMAGE=<IMAGE_ID>
      ```

      Here:

      * `<NETWORK_ID>` — network ID. The value is displayed in the cloud platform management console on the page with the list of networks.
      * `<IMAGE_ID>` — base image ID. The value is displayed in the cloud platform management console on the page with the list of images. If a ready-made base image is used, specify the ID from the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os)[text=%text]}.

   1. Create a `<FILE_NAME>.pkr.hcl` file. For example, `altlinux.pkr.hcl`.
   1. In the file, describe the configuration of the VM on which the service image will be based (for syntax, see the [official Packer website](https://developer.hashicorp.com/packer/docs/templates/hcl_templates)).

      {caption(Example of a VM configuration with the Alt Linux P9 OS and deployment of an image-based application from an Ansible playbook)[align=left;position=above]}
      ```console

# Network ID
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

# Base image ID
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

# Creating a VM from the base image
      source "openstack" "altlinux" {
        flavor       = "STD3-2-6"
        image_name   = "Alt-Linux-P9-Starter-Kit"
        source_image = "${var.source_image}"
        config_drive            = "true"
        networks = ["${var.network_id}"]
        security_groups = ["default", "ssh"]
        ssh_username = "altlinux"
        use_blockstorage_volume = "true"
        volume_availability_zone = "MS1"
      }

# Configuring the VM
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
          provisioner "ansible" {
          playbook_file = "provision.yml"
          user          = "altlinux"
          sftp_command  = "/usr/libexec/openssh/sftp-server -e"
          use_proxy     = false
        }
      }
      ```
      {/caption}

      {note:info}

      If you need to send metrics to the Cloud Monitoring service, describe the installation of the monitoring agent in the VM configuration (for more details, see the section [VM system metrics](../../../ib_cloud_monitoring/ib_cloud_monitoring_vm)).

      {/note}

      The OS username depends on the OS. The list of usernames is provided in the section [Connecting to a Linux VM](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

      The default security group name depends on the SDN type:

      * `default` — in a cloud platform project based on OpenStack Neutron.
      * `default-sprut` — in a cloud platform project based on Sprut.

         {note:info}

         View the available security groups using the command:

         ```console

# openstack security group list
         ```

         {/note}

   1. Verify the created configuration:

      ```console
      packer validate <FILE_NAME>.pkr.hcl
      ```

      Here `<FILE_NAME>.pkr.hcl` is the name of the Packer file.

1. Create the service image in the cloud platform:

   1. Start creating the service image:

      ```console
      packer build <PACKER_FILE>
      ```

      Here `<PACKER_FILE>` is the name of the Packer file.
   1. Wait for the message about successful creation. The message will contain the ID of the service image.

      {caption(Example of a message about successful creation of a service image)[align=left;position=above]}
      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      {/caption}

      Here `c6320138-035f-40d8-XXXX-e814edb2ce5f` is the ID of the service image.
   1. Make sure that the service image is displayed in the cloud platform management console.