An image is a file that contains a virtual disk with an installed operating system or other data. Images are used to create virtual machines in the cloud.

## Creating an image

The VK Cloud service allows you to create an image from the disk of an existing virtual machine.

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Stop the VM](../../../service-management/vm/vm-manage#start_stop_restart_vm) that image you want to create.
1. Go to **Cloud Servers → Images**.
1. Click the **Create** button.
1. Specify the image settings:

   - **Source**: select **Disk**.
   - **Select Disk**: select an existing virtual machine disk.
   - **Name of the image**: specify a name for the image.

1. Click the **Create image** button.

</tabpanel>
<tabpanel>

<warn>

The disk to create the image must be disconnected from the VM and have the status `available`.

</warn>

1. Get the `ID` of the disk:

   ```bash
   openstack volume list
   ```

2. Create an image:

   ```bash
   openstack image create --volume <disk ID> <image name>
   ```

3. Check the image creation:

   ```bash
   openstack image list --name <image name>
   ```

   The successfully created image must have the status `active`.

</tabpanel>
</tabs>

## Importing an image

The VK Cloud service supports uploading your own virtual machine images with [some restrictions](../../../concepts/about#operating_system) by operating systems.

<info>

Only RAW images are supported. If your image is in a different format, [convert it](../../../how-to-guides/packer#1_convert_image_to_raw_format).

</info>

<warn>

The recommended way to import an image is using the CLI.

When downloading through your VK Cloud management console, the size of the downloaded file is [limited](/en/tools-for-using-services/account/concepts/quotasandlimits#images-volumes).

</warn>

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to **Cloud Servers → Images**.
1. Click the **Create** button.
1. Specify import settings:

   - **Source**: select **File**.
   - **Selected file**: upload the image file in RAW format.
   - **Name of the image**: specify the name of the image.
1. Click the **Create image** button.

</tabpanel>
<tabpanel>

The parameters of the image import command depend on the need for backup support:

- If support is not needed, run the command:

   ```bash
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <image file path> <image name>
   ```

- If support is needed, add parameters `--property hw_qemu_guest_agent=yes --property os_require_quiesce=yes` to the command above.

</tabpanel>
</tabs>

## Exporting an image

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
<tab>cURL</tab>
</tablist>
<tabpanel>

1. Get the `ID` of the image from the list:

   ```bash
   openstack image list
   ```

2. Export the image:

   ```bash
   openstack image save --file <image file path>.raw <image ID>
   ```

</tabpanel>
<tabpanel>

1. [Get](/en/tools-for-using-services/api/rest-api/case-keystone-token) the access token `X-Auth-Token`.
1. Run the command:

   ```bash
   curl -H "X-Auth-Token:{token}" "https://infra.mail.ru:9292/v2/images/{image ID}/file" --output <image file path>.raw
   ```

</tabpanel>
</tabs>

## Changing the visibility status of an image

Changing the visibility status of an image allows you to access an image from multiple projects. Sharing an image across multiple projects allows you to speed up the deployment of virtual machines.

The VK Cloud service provides the following image visibility statuses for users:

| Status      | Description                                         |
|-------------|-----------------------------------------------------|
| `private`   | The image is for personal access only               |
| `shared`    | The image can be used in several projects           |

By default, all images have the `private` status. To share an image with other projects:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

<info>

Through your VK Cloud management console, you can allow access to the image only for certain projects.

</info>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to **Cloud Servers → Images**.
1. Click ![ ](/ru/assets/more-icon.svg "inline") for the image you need and select **Share image**.
1. In the window that opens, select the type of the project with which you want to share the image:

   - **My Projects**: allows you to share the image with projects in which you are the owner.
   
      If you select this type, in the **Project ID** box, select the [unique project identifier (PID)](/ru/tools-for-using-services/account/service-management/project-settings/manage#poluchenie_identifikatora_proekta) of the `mcsNNNNNNNNNN` type from the list. Multiple projects can be added.
   
   - **Other projects**: allows you to share the image with all other projects.

   If you select this type, in the **OpenStack Project ID** box, specify the [Project ID](https://cloud.vk.com/docs/tools-for-using-services/api/rest-api/endpoints#poluchenie_project_id) of the `exampled4ef0547e5b222f445` form, it does not match the unique identifier of the project. Multiple projects can be added.   

1. Click the **Allow access** button.

</tabpanel>
<tabpanel>

1. Get the `ID` of the image from the list:

   ```bash
   openstack image list
   ```

2. Display detailed information about the individual image:

   ```bash
   openstack image show <image ID>
   ```

   The visibility status of the image is displayed in the `visibility` line.

3. Change the image status:

   ```bash
   openstack image set --<status> <image ID>
   ```

To share an image in the status `shared`:

1. Add an image to the project:

   ```bash
   openstack image add project <image ID> <project ID>
   ```

2. Confirm adding the image to the project:

   ```bash
   openstack image set --accept <image ID>
   ```

To view the projects that have access to the image, run the command:

```bash
openstack image member list <image ID>
```

</tabpanel>
</tabs>

## Deleting an image

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Images**.
3. Do one of the following for the required image:

   - Select the image using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required image and select **Remove image**.

4. Click the **Confirm** button.

</tabpanel>
<tabpanel>

To delete an image that is not attached to projects:

```bash
openstack image delete <image ID>
```

To delete an image from a project:

```bash
openstack image remove project <image ID> <project ID>
```

</tabpanel>
</tabs>
