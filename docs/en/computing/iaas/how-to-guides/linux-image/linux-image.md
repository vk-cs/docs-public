# {heading(Creating an image using a local VM)[id=iaas-linux-image]}

{include(/en/_includes/_translated_by_ai_en.md)}

An image of a cloud VM can be created using a local virtual machine.

As an example, this guide covers creating and configuring a VM image with the Arch Linux OS.

## {heading(Preparatory steps)[id=iaas-linux-image-preparatory-steps]}

1. Create a virtual machine on your local computer in a minimal configuration with a single disk and no additional logical partitions.
1. Connect the VM to a network with Internet access.
1. Configure an SSH connection to the VM.

## {heading(1. Install the target OS)[id=iaas-linux-image-custom-install]}

1. Install the target OS on the local VM as described in the [official Arch Linux documentation](https://wiki.archlinux.org/title/Installation_guide_(Русский)).
1. Connect to the VM via SSH.

## {heading(2. Install software for cloud virtualization)[id=iaas-linux-image-custom-install-po]}

1. Install and configure the software for cloud initialization of the virtual machine:

   1. Install the `cloud-init` package on the VM as described in the [official Arch Linux documentation](https://wiki.archlinux.org/title/Cloud-init).
   1. Enable autostart of `cloud-init` by running the command:

      ```console
      systemctl enable cloud-init
      ```
   1. (Optional) Edit the settings in the `/etc/cloud/cloud.cfg` configuration file.

1. Install and configure the [QEMU guest agent](https://qemu-project.gitlab.io/qemu/about/index.html):

   1. Install the `qemu-guest-agent` package:

      ```console
      apt-get install qemu-guest-agent
      ```

   1. Enable autostart of ` qemu-guest-agent ` by running the command:

      ```console
      systemctl enable qemu-guest-agent
      ```

## {heading(3. (Optional) Perform additional settings on the local VM)[id=iaas-linux-image-custom-settings]}

1. Disable all data sources in `cloud-init` except OpenStack. To do this, create the `/etc/cloud/cloud.cfg.d/15_datasource.cfg` configuration file with the following content:

   ```txt
   datasource:
    OpenStack:
     max_wait: 180
   ```
1. Clean the VM from unnecessary artifacts by running the commands one after another:

   ```console
   rm /etc/udev/rules.d/*
   rm -rf /var/lib/cloud/*
   rm -rf /tmp/*
   find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
   sudo truncate -s 0 /etc/udev/rules.d/70-persistent-net.rules
   sed -i '/HWADDR/d' /etc/sysconfig/network-scripts/ifcfg-eth0
   sudo truncate -s 0 /etc/resolv.conf
   sudo rm -f /etc/NetworkManager/conf.d/99-cloud-init.conf
   rpm-ostree cleanup -b -p -r -m
   ```

## {heading(4. Import the local VM disk image into {var(cloud)})[id=iaas-linux-image-custom-import]}

1. Make a copy of the local VM hard drive:

   ```console
   dd if=/dev/sda of=~/Arch.raw bs=64K conv=noerror,sync status=progress
   ```

   This will create an `Arch.raw` file containing the VM image in RAW format.

1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=Install]} the OpenStack client on the local VM and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in your {var(cloud)} project.
1. Upload the `Arch.raw` image to {var(cloud)} under the name `Arch`:

   ```console
   openstack image create \
       --progress \
       --private \
       --container-format bare \
       --disk-format raw \
       --file ~/Arch.raw \
       --property store=s3 \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Arch' \
       Arch
   ```

   Here, arguments of the form `--property <KEY>=<VALUE>` are used to assign {ifdef(public)}{linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=metatags]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}metatags{/ifdef} to the image.

## {heading(5. Verify that the image was uploaded successfully)[id=iaas-linux-image-custom-download-success]}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Go to the **Cloud Computing** → **Images** section.
1. Make sure that the list contains the image named `Arch`.

## {heading(Delete unused resources)[id=iaas-linux-image-custom-delete]}

If you no longer need the uploaded image, {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-delete)[text=delete it]}.