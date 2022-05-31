## Importing an image

<warn>

Currently, images in the \*.raw format are supported.

</warn>

It is possible to upload an individual virtual machine image that was previously created locally to the VK CS project using the following tools:

<tabs>
<tablist>
<tab>VK CS panel</tab>
<tab>Openstack CLI</tab>
</tablist>
<tabpanel>

To download the image [in VK CS personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Go to the Images page of the Cloud Computing service.
2. In the top menu, select "Create".
3. In the window that appears, select the source file, specify the file and enter the name of the image being created.
4. Click "Create Image".

<warn>

Enabling the "Allow access to all projects" option allows you to use the image in all client projects.

</warn>

</tabpanel>
<tabpanel>

To load an image in the OpenStack client, run the command:

```bash
openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <file.raw> <image_name>
```

If the instance created from the image needs to support backup, you need to load it with the metadata of the presence of a guest agent.:

```bash
openstack image create --private --container-format bare --disk-format raw --file <.raw file> **--property hw_qemu_guest_agent=yes** --property store=s3 **--property os_require_quiesce=yes** <image_name>
```

Depending on the format of the downloaded file, you need to specify the appropriate value of the --disk-format key:

- raw
- vhd
- vhdx
- vmdk
- vdi
- iso
- qcow2

</tabpanel>
</tabs>

## Exporting an image

Images can be downloaded from VK CS to use virtual machine data in a local environment.

### OpenStack CLI

To upload an image using the OpenStack client, you should:

Get a list of images:

```bash
openstack image list
```

Initiate the image loading process by running the command:

```bash
openstack image save --file <path> <image ID>
```

### cURL

In some cases, downloading via the CLI may require a large amount of RAM, in which case it is possible to use cURL:

```bash
curl -H "X-Auth-Token: $(openstack token issue -c id -f value)" https://infra.mail.ru:9292/v2/images/<IMAGE_ID>/file --output <output_filename>
```
