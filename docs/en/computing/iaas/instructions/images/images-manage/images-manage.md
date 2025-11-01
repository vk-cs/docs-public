An image is a file that contains a virtual disk with an installed operating system or other data. Images are used to create virtual machines in the cloud.

## Creating an image

The VK Cloud service allows you to create an image from the disk of an existing virtual machine.

{tabs}

{tab(Management console)}

1. [Stop the VM](../../../instructions/vm/vm-manage#start_stop_restart_vm) that image you want to create.
1. Go to **Cloud Servers → Images**.
1. Click the **Create** button.
1. Specify the image settings:

   - **Source**: select **Disk**.
   - **Select Disk**: select an existing virtual machine disk.
   - **Name of the image**: specify a name for the image.

1. Click the **Create image** button.

{/tab}

{tab(OpenStack CLI)}

{note:warn}

The disk to create the image must be disconnected from the VM and have the status `available`.

{/note}

1. Get the `ID` of the disk:

   ```console
   openstack volume list
   ```

2. Create an image:

   ```console
   openstack image create --volume <DISK_ID> <IMAGE_NAME>
   ```

3. Check the image creation:

   ```console
   openstack image list --name <IMAGE_NAME>
   ```

   The successfully created image must have the status `active`.

{/tab}

{/tabs}

## Importing an image

The VK Cloud service supports uploading your own virtual machine images with [some restrictions](../../../concepts/about#operating_system) by operating systems.

{note:warn}

Only RAW images are supported. If your image is in a different format, [convert it](../../../how-to-guides/packer#1_convert_image_to_raw_format).

{/note}

The recommended way to import an image is using the CLI.

When downloading through your VK Cloud management console, the size of the downloaded file is [limited](/en/tools-for-using-services/account/concepts/quotasandlimits#images-volumes).

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to **Cloud Servers → Images**.
1. Click the **Create** button.
1. Specify import settings:

   - **Source**: select **File**.
   - **Selected file**: upload the image file in RAW format.
   - **Name of the image**: specify the name of the image.
1. Click the **Create image** button.

{/tab}

{tab(OpenStack CLI)}

The parameters of the image import command depend on the need for backup support:

- If support is not needed, run the command:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <IMAGE_FILE> <IMAGE_NAME>
   ```

- If support is needed, add parameters `--property hw_qemu_guest_agent=yes --property os_require_quiesce=yes` to the command above.

{/tab}

{/tabs}

## Exporting an image

{tabs}

{tab(OpenStack CLI)}

1. Get the `ID` and `Disk Format` of the image from the list:

   ```console
   openstack image list --long
   ```

2. Export the image:

   ```console
   openstack image save --file <FILE_NAME>.<DISK_FORMAT> <IMAGE_ID>
   ```

If the exported image is not in RAW format and you plan to use it to create a VM on the VK Cloud platform, [convert the image](../../../how-to-guides/packer#1_convert_image_to_raw_format).

{/tab}

{tab(cURL)}

1. [Get](/en/tools-for-using-services/api/rest-api/case-keystone-token) the access token `X-Auth-Token`.
1. Get the `id` and `disk_format` of the image from the list:

   ```console
   curl -H "X-Auth-Token:<TOKEN>" "https://infra.mail.ru:9292/v2/images"
   ```

1. Download the image:

   ```console
   curl -H "X-Auth-Token:<TOKEN>" "https://infra.mail.ru:9292/v2/images/<IMAGE_ID>/file" --output <FILE_NAME>.<DISK_FORMAT>
   ```

If the exported image is not in RAW format and you plan to use it to create a VM on the VK Cloud platform, [convert the image](../../../how-to-guides/packer#1_convert_image_to_raw_format).

{/tab}

{/tabs}

## Changing the visibility status of an image

Changing the visibility status of an image allows you to access an image from multiple projects. Sharing an image across multiple projects allows you to speed up the deployment of virtual machines.

The VK Cloud service provides the following image visibility statuses for users:

| Status      | Description                                         |
|-------------|-----------------------------------------------------|
| `private`   | The image is for personal access only               |
| `shared`    | The image can be used in several projects           |

By default, all images have the `private` status. To share an image with other projects:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to **Cloud Servers → Images**.
1. Click ![ ](/ru/assets/more-icon.svg "inline") for the image you need and select **Share image**.
1. In the window that opens, select the type of the project with which you want to share the image:

   - **My Projects**: allows you to share the image with projects in which you are the owner.

      If you select this type, in the **Project ID** box, select the [unique project identifier (PID)](/ru/tools-for-using-services/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta) of the `mcsNNNNNNNNNN` type from the list. Multiple projects can be added.

   - **Other projects**: allows you to share the image with all other projects.

   If you select this type, in the **OpenStack Project ID** box, specify the [Project ID](https://cloud.vk.com/docs/tools-for-using-services/api/rest-api/endpoints#poluchenie_project_id) of the `exampled4ef0547e5b222f445` form, it does not match the unique identifier of the project. Multiple projects can be added.   

1. Click the **Allow access** button.

{/tab}

{tab(OpenStack CLI)}

1. Get the `ID` of the image from the list:

   ```console
   openstack image list
   ```

1. Display detailed information about the individual image:

   ```console
   openstack image show <IMAGE_ID>
   ```

   The visibility status of the image is displayed in the `visibility` line.

1. Change the image status:

   ```console
   openstack image set --shared <IMAGE_ID>
   ```

1. Add an image to the project:

   ```console
   openstack image add project <IMAGE_ID> <PROJECT_ID>
   ```

1. Confirm adding the image to the project. To do this, the user of the receiving project must run the command:

   ```console
   openstack image set --accept <IMAGE_ID>
   ```

To view the projects that have access to the image, run the command:

```console
openstack image member list <IMAGE_ID>
```

{/tab}

{/tabs}

## Deleting an image

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
2. Go to **Cloud Servers → Images**.
3. Do one of the following for the required image:

   - Select the image using the checkbox, then click **Delete**.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the required image and select **Remove image**.

4. Click the **Confirm** button.

{/tab}

{tab(OpenStack CLI)}

To delete an image that is not attached to projects:

```console
openstack image delete <IMAGE_ID>
```

To delete an image from a project:

```console
openstack image remove project <IMAGE_ID> <PROJECT_ID>
```

{/tab}

{/tabs}
