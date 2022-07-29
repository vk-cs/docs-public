## Import image

<warn>

Currently, images in the \*.raw format are supported.

</warn>

It is possible to upload an individual image of a virtual machine, created earlier locally, to a VK CS project using the following tools:

<tabs>
<tablist>
<tab>VK CS panel</tab>
<tab>Openstack CLI</tab>
</tablist>
<tabpanel>

To download the image [in your VK CS account](https://mcs.mail.ru/app/services/infra/servers/) you should:

1. Go to the Images page of the Cloud Computing service.
2. Select "Create" in the top menu.
3. In the window that appears, select a source file, specify the file, and enter the name of the image to be created.
4. Click "Create Image".

<warn>

Enabling the "Allow access to all projects" option allows the image to be used in all client projects.

</warn>

</tabpanel>
<tabpanel>

To download the image in the OpenStack client, run the command:

```bash
openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <raw file> <image_name>
```

If the instance created from the image is to be backed up, it must be booted with the guest agent presence metadata:

```bash
openstack image create --private --container-format bare --disk-format raw --file <raw file> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <image_name>
```

Depending on the format of the uploaded file, you need to specify the corresponding value of the --disk-format key:

- raw
- vhd
- vhdx
- vmdk
- vdi
- iso
- qcow2

</tabpanel>
</tabs>

## Export image

Images can be downloaded from VK CS to use virtual machine data in a local environment.

### OpenStack CLI

To upload an image using the OpenStack client:

Get a list of images:

```bash
open stack image list
```

Initiate the image download process by running the command:

```bash
openstack image save --file <path> <image ID>
```

### cURL

In some cases, loading via the CLI may require a large amount of RAM, in which case cURL can be used:

```bash
curl -H "X-Auth-Token: $(openstack token issue -c id -f value)" https://infra.mail.ru:9292/v2/images/<IMAGE_ID>/file --output <output_filename>
```
