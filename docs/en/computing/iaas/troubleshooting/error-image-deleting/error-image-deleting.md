# {heading(403 error when deleting a VM image)[id=iaas-error-image-deleting]}

{include(/en/_includes/_translated_by_ai_en.md)}

A `403 Forbidden` error occurs when trying to delete an image.

Possible causes:

- The image is in use: disks or virtual machines created from this image depend on it.
- The image is shared (`shared`) and belongs to another project. Only the owning project can delete it.

### {heading(Solution)[id=iaas-error-image-deleting-solution]}

1. Make sure that you are deleting the image in the project where it was created.

   1. View the list of project images:

      ```console
      openstack image list
      ```

   1. View detailed information about the image:

      ```console
      openstack image show <IMAGE_ID>
      ```

      If the `visibility` field in the output has the `shared` value, the image belongs to another project and cannot be deleted from your project. Delete the image in the owning project or detach it from your project (the command is run in the project that owns the image):

      ```console
      openstack image remove project <IMAGE_ID> <PROJECT_ID>
      ```

1. Check whether there are resources created from this image:

   1. Find the disks created from the image. The source image is specified in the `volume_image_metadata` field:

      ```console
      openstack volume list
      openstack volume show <DISK_ID>
      ```

   1. Find the virtual machines created from the image:

      ```console
      openstack server list --long
      openstack server show <VM_ID>
      ```

   1. If dependent disks or VMs are found, delete them first or wait until they are deleted, then retry:

      ```console
      openstack image delete <IMAGE_ID>
      ```

1. If the image is not in use and belongs to your project while the error persists, contact [technical support](mailto:support@mcs.mail.ru) and provide the image ID.
