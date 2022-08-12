An image is a file that contains a virtual disk with an operating system or other data already installed on it. Images are used to create virtual instances in the cloud.

## VK Cloud Control Panel

To create an image from an existing instance [in VK Cloud personal account](https://mcs.mail.ru/app/services/infra/servers/) should:

1. Stop the necessary VM instance — from which we will create an image.
2. Go to [Images section](https://mcs.mail.ru/app/services/infra/images/) of the Cloud Computing service.
3. Click the "Create" button, select the disk of the desired virtual machine in the image creation menu and enter the name of the image (by which it can then be uniquely identified). When you select the "Allow access to all projects" element, the image will be available in all projects where the user is a member.
4. Click "Create Image". The image creation process will begin, and the status can be obtained by hovering the mouse over the color indicator.
5. The created image will be available in the "Images" section after a while, and the creation of a new virtual machine from this image will be available in the context menu of the image.

## OpenStack CLI

To create an image in the OpenStack client, you need:

Get a list of disks by running the command:

```bash
openstack volume list
```

Or get a list of disks attached to the server:

```bash
openstack server show -c volumes_attached <instance ID>
```

Create an image by doing:

```bash
openstack image create --volume <disk ID> <image name>
```

As a result of executing the command, a window with the data of the created image will be displayed.
