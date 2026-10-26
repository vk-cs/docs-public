# {heading(Creating an image with diskimage-builder)[id=iaas-diskimage-builder]}

{include(/en/_includes/_translated_by_ai_en.md)}

The list of supported images is available in the [official documentation](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) of the `diskimage-builder` utility.

As an example, this guide covers creating and configuring a VM image with the OpenSuse Leap OS. All actions are performed on a local computer running Ubuntu.

## {heading(Preparatory steps)[id=iaas-diskimage-builder-preparatory-steps]}

1. Free up at least 3 GB of disk space on your computer.
1. Connect your computer to a network with internet access.

## {heading(1. Install the required software)[id=iaas-diskimage-builder-install-software]}

1. Set up Python library support:

   ```console
   sudo apt update
   sudo apt -y install python-pip curl
   ```

1. Install the `qemu-utils` package, which provides [QEMU](https://www.qemu.org/) utilities:

   ```console
   sudo apt install qemu-utils
   ```

1. Install the `virtualenv` application for creating a Python virtual environment, as described in the [official documentation](https://virtualenv.pypa.io/en/latest/installation.html).
1. Find out the version of Python installed on your computer:

   ```console
   python –version
   ```

1. Create and activate a Python virtual environment by running the commands one by one:

   ```console
   virtualenv -p python<PYTHON_VERSION> venv_py<PYTHON_VERSION>
   source venv_py<PYTHON_VERSION>/bin/activate
   ```

1. Install the `diskimage-builder` utility:

   ```console
   pip install git+https://opendev.org/openstack/diskimage-builder.git
   ```

## {heading(2. Build a VM image with the OpenSuse Leap OS)[id=iaas-diskimage-builder-image-build]}

Run the command:

```console
DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.raw vm opensuse
```

A file named `opensuse-15.3.raw` with a VM image in RAW format will be created.

{note:info}
To build a VM image with the desired properties, use additional arguments of the `disk-image-create` command. For more details, see the [official documentation](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html).
{/note}

## {heading(3. Upload the image to {var(cloud)})[id=iaas-diskimage-builder-image-upload]}

1. Make sure that the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=pass authentication]} in your {var(cloud)} project.
1. Upload the `opensuse-15.3.raw` image to {var(cloud)} under the name `Opensuse`:

   ```console
   openstack image create \
       --progress \
       --private \
       --container-format bare \
       --disk-format raw \
       --file opensuse-15.3.raw \
       --property store=s3 \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Opensuse' \
       Opensuse
   ```

   Here, arguments of the form `--property <KEY>=<VALUE>` are used to assign {{ifdef(public)}{linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=metadata tags]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}metadata tags{/ifdef} to the image.

## {heading(4. Verify that the image was uploaded successfully)[id=iaas-diskimage-builder-download-success]}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Navigate to the **Cloud Computing** → **Images** section.
1. Make sure that the list contains an image named `Opensuse`.

## {heading(Delete unused resources)[id=iaas-diskimage-builder-image-delete]}

If you no longer need the uploaded image, {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-delete)[text=delete it]}.