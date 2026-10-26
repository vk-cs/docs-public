
{include(/en/_includes/_translated_by_ai_en.md)}

To upload your image-based application to the Marketplace of the cloud platform, you first need to prepare an image of the VM where an instance of your application will be installed, and upload it to the VK Cloud platform. Below is how to do this using Packer or the capabilities of the VK Cloud personal dashboard.

The recommended way to create an image is with Packer.

{note:warn}

Before your service is published on Marketplace, the image of your image-based application will be [published](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_upload/ibservice_upload_publish_image) in VK Cloud. Instances of your application for users who connected it via Marketplace will be deployed from this public image. The image data will be publicly accessible.

{/note}

{tabs}
{tab(Creation with Packer)}

1. Install Packer:

   1. Download Packer from the [official VK Cloud mirror](https://hashicorp-releases.mcs.mail.ru/packer/).
   1. Extract the archive and add the path to the extracted file to the `Path` environment variable.
   1. Run the `packer` command to verify that Packer was installed successfully.

   Detailed instructions are provided in the [official Packer documentation](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli).

1. [Install](/en/tools-for-using-services/cli/openstack-cli) OpenStack CLI and [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in the project.
1. Download a base OS image that supports operation with cloud platforms.

   The OS must meet the [service VM image requirements](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).

   The [official OpenStack website](https://docs.openstack.org/image-guide/obtain-images.html) provides links to images of some OSs that support operation with cloud platforms.

   {note:info}

   To avoid uploading a base image to the cloud platform yourself, use the images already uploaded to VK Cloud. The list of available OS images is provided in the table in the [target_os argument](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os) section. In this case, proceed directly to creating the Packer file.

   {/note}

1. Convert the base image to the `RAW` format:

   1. Install the [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) utility on your local computer:

      {tabs}
      {tab(For RHEL-based images (CentOS, AlmaLinux, Rocky Linux))}

      ```console
      sudo yum install qemu-img
      ```

      {/tab}

      {tab(For Debian-based images (Ubuntu))}

      ```console
      sudo apt install qemu-utils
      ```

      {/tab}
      {/tabs}

   1. Start the file conversion with the command:

      ```console
      qemu-img convert -f qcow2 -O raw <SOURCE_IMAGE_NAME> <IMAGE_NAME>
      ```

      Here:

      * `<SOURCE_IMAGE_NAME>` — name of the source base image. For example, `alt-p9-cloud-x86_64.qcow2`.
      * `<IMAGE_NAME>` — name of the base image in the `RAW` format. For example, `alt-p9-cloud-x86_64.raw`.

1. Upload the base image in the `RAW` format to VK Cloud:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <PATH> <IMAGE_NAME>
   ```

   Here:

   * `<PATH>` — path to the base image.
   * `<IMAGE_NAME>` — name of the base image in the `RAW` format.

   For more details, see the [Image import](/en/computing/iaas/instructions/images/images-manage#iaas-images-manage-import) section.

1. Create a Packer configuration file:

   1. Write the network ID and the base image ID to the environment variables:

      ```console
      export NETWORK_ID=<NETWORK_ID>
      export SOURCE_IMAGE=<IMAGE_ID>
      ```

      Here:

      * `<NETWORK_ID>` — network ID. You can find this value in the VK Cloud personal dashboard on the **Virtual networks** → **Networks** tab.
      * `<IMAGE_ID>` — base image ID. You can find this value in the VK Cloud personal dashboard on the **Cloud computing** → **Images** tab. If you are using a base image available in VK Cloud, find its ID in the [target_os argument](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#target_os) section.

   1. Create a Packer file named `<OS_NAME>.pkr.hcl`. For example, `altlinux.pkr.hcl`.
   1. In the file, describe the configuration of the VM on which the image will be based. The configuration file syntax description is available on the [official Packer website](https://developer.hashicorp.com/packer/docs/templates/hcl_templates).

      {cut(Example of a VM configuration with Alt Linux P9 OS and deployment of an image-based application from an Ansible playbook)}
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
      {/cut}

      {note:info}

      If you need to send metrics to the Cloud Monitoring service, describe the [monitoring agent installation](/en/tools-for-using-services/vendor-account/manage-apps/ib_cloud_monitoring) in the VM configuration.

      {/note}

      The OS username specified in the `ssh_username` and `user` arguments of the configuration depends on the operating system. The list of names is provided in the [Connecting to a Linux VM](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) section.

      The default security group name specified in the `security_groups` argument of the configuration depends on the SDN type:

      * `default` — in a VK Cloud project based on OpenStack Neutron.
      * `default-sprut` — in a VK Cloud project based on Sprut.

      You can get the list of available security groups with the command:

      ```console
      openstack security group list
      ```

   1. Verify the created configuration:

      ```console
      packer validate <FILE_NAME>
      ```

      Here `<FILE_NAME>` is the name of the Packer file.

1. Create the service VM image in VK Cloud:

   1. Start the creation of the service VM image:

      ```console
      packer build <FILE_NAME>
      ```

      Here `<FILE_NAME>` is the name of the Packer file.

      If the service VM image is created successfully, a message with the image ID will be displayed. Example message:

      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```

      Here `c6320138-035f-40d8-XXXX-e814edb2ce5f` is the ID of the service VM image.

   1. In the VK Cloud personal dashboard, go to the **Cloud computing** → **Images** tab and make sure that the service VM image appears in the list of images.

{/tab}

{tab(Creation via the personal dashboard)}

1. [Go](https://msk.cloud.vk.ru/app) to the VK Cloud personal dashboard.
1. Create a VM:

   1. Go to the **Cloud computing** → **Virtual machines** section.
   1. Click the **Add** button.
   1. In the VM creation form, set the parameters of the virtual machine.

      {note:warn}

      The OS must meet the [service VM image requirements](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).

      {/note}

   1. Confirm the VM creation.

1. Install the software on the VM:

   1. Go to the page of the created VM.
   1. Assign an external IP address using the **Assign external IP** button.
   1. Connect to the VM via SSH:

      ```console
      ssh -i <PATH_TO_KEY> <USERNAME>@<FLOATING_IP>
      ```

      Here:

      * `<PATH_TO_KEY>` — path to the file with the private key for accessing the VM.
      * `<USERNAME>` — OS username. Specify the name depending on the OS. The list of names is provided in the [Connecting to a Linux VM](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) section.
      * `<FLOATING_IP>` — external IP address of the VM.

   1. If the software packages specified in the [service VM image requirements](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) are not installed on the VM, install them.

      Example command for installing `curl` on Ubuntu OS:

      ```console
      sudo apt install curl
      ```

   1. Install the image-based application software on the VM.
   1. If you need to send metrics to the Cloud Monitoring service, install the [monitoring agent](/en/tools-for-using-services/vendor-account/manage-apps/ib_cloud_monitoring) on the VM.

1. Clean the VM of sensitive data using the commands:

   {tabs}
   {tab(For RHEL OS (CentOS, AlmaLinux, Rocky Linux))}

      ```console

# Clean cloud-init logs
      $ sudo cloud-init clean --log --seed

# Clean SSH keys
      $ sudo rm -f /etc/ssh/*host*key*

# Clean logs
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

# Remove tmp files
      $ sudo rm -rf /tmp/* /var/tmp/*

# Clean system files
      $ sudo truncate -s 0 /etc/machine-id /etc/resolv.conf /var/log/audit/audit.log /var/log/wtmp \
      /var/log/lastlog /var/log/btmp /var/log/cron /var/log/maillog /var/log/messages /var/log/secure \
      /var/log/spooler

# Remove system files
      $ sudo rm -rf /etc/hostname /etc/machine-info /var/lib/systemd/credential.secret /var/lib/cloud /var/log/tuned \
      /var/log/qemu-ga /var/log/anaconda /var/lib/systemd/random-seed

# Initialize the disk, fill it with zeros
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

# Clean the command history
      $ history -c

# Synchronize the file system
      $ sudo sync
      ```

   {/tab}
   {tab(For Debian OS (Ubuntu))}

      ```console

# Clean cloud-init logs
      $ sudo cloud-init clean --log --seed

# Clean SSH keys
      $ sudo rm -f /etc/ssh/*host*key*

# Clean logs
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

# Remove tmp files
      $ sudo rm -rf /tmp/* /var/tmp/*

# Clean the machine-id file
      $ sudo truncate -s 0 /etc/machine-id /var/lib/dbus/machine-id

# Initialize the disk, fill it with zeros
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

# Clean the package manager cache
      $ sudo apt-get -y autoremove --purge
      $ sudo apt-get -y clean
      $ sudo apt-get -y autoclean

# Clean the command history
      $ history -c

# Synchronize the file system
      $ sudo sync
      ```

   {/tab}
   {/tabs}

1. Stop the VM:

   ```console
   sudo /sbin/shutdown -hP now
   ```

1. Create the service VM image based on the VM disk:

   1. Go to the **Cloud computing** → **Images** section.
   1. Click the **Create image** button.
   1. In the window that opens, select **Disk** as the source.
   1. Select the disk of the created and configured VM.

      The VM disk name is displayed on its page on the **Disks** tab.

   1. Specify a name for the image.
   1. Confirm the image creation. The ID of the created service VM image will be displayed in the row of this image.

{/tab}
{/tabs}