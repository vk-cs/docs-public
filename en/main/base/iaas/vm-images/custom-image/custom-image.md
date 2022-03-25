Image import
------------

<warn>

Currently, images in raw format only are supported. Another image format is supported through the Openstack CLI.

</warn>

It is possible to load an individual image of a virtual machine, created earlier locally, into an VK CS project using the following tools:

<tabs>
<tablist>
<tab>VK CS panel</tab>
<tab>Openstack CLI</tab>
</tablist>
<tabpanel>

To upload an image [in your VK CS account, you](https://mcs.mail.ru/app/services/infra/servers/) should:

1.  Go to the Images page of the Cloud Computing service.
2.  Select «Create» in the top menu.
3.  In the window that appears, select a file as a source, specify a file and enter the name of the created image.
4.  Click «Create Image».

<warn>

Enabling the «Allow access to all projects» option allows the image to be used in all client projects.

</warn>


</tabpanel>
<tabpanel>

To download the image in the OpenStack client, run the command:

``` bash
openstack image create --private --container-format bare --disk-format raw --property store = s3 --file <file.raw> <image_name>
```

If the instance created from the image must support backup, you must load it with the metadata of the presence of the guest agent:

``` bash
openstack image create --private --container-format bare --disk-format raw --file <file.raw> **--property hw_qemu_guest_agent = yes** --property store = s3 **--property os_require_quiesce = yes** < **image_name** >
```

Depending on the format of the downloaded file, you need to specify the appropriate value for the `--disk-format key`:

*   raw
*   vhd
*   vhdx
*   vmdk
*   vdi
*   iso
*   qcow2

</tabpanel>
</tabs>

## Export image

Images can be downloaded from VK CS to use virtual machine data on-premises.

### OpenStack CLI

To upload an image using an OpenStack client:

Get a list of images:

``` bash
openstack image list
```

Initiate the image boot process by running the command:

``` bash
openstack image save --file <path> <image ID>
```

### cURL

In some cases, downloading via the command line interface may require a large amount of RAM, in case of possible use of cURL:
``` bash
curl -H "X-Auth-Token: $(openstack token issue -c id -f value)" https://infra.mail.ru:9292/v2/images/<IMAGE_ID>/file --output <output_filename>
```