Sharing an image in several projects allows you to reproach the deployment of instances.

## VK CS Panel

When creating an image, select "Allow access to all projects".

In this case, the image will not appear in other projects automatically — but a suggestion will appear to add it to the project.

## OpenStack CLI

To configure image sharing in the OpenStack client, you should:

Get a list of images:

```bash
openstack image list
```

Set the sharing capability for the image:

```bash
openstack image set --shared <image ID>
```

Add a partner project for an image:

```bash
openstack image add project <image ID> <Partner project ID>
```

Next, the partner needs to confirm the addition of the image to the project:

```bash
openstack image set --accept <image ID>
```

To view the projects that have access to the image, run:

```bash
openstack image member list <image ID>
```

To delete an image from a project, the owner should do:

```bash
openstack image remove project <image ID> <project ID>
```
