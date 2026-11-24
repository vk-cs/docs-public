# {heading(Video adapter error code 12 on a VM with vGPU)[id=iaas-vgpu-windows-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

On a VM with [vGPU](/en/computing/gpu/concepts/vgpu) and Windows built from a custom image, Device Manager shows an error in the video adapter properties:

```plaintext
This device cannot find enough free resources that it can use (Code 12)
```

The problem occurs if the image does not have the `hw_video_model=none` [meta tag](/en/computing/iaas/instructions/images/image-metadata) set. In this case, the hypervisor additionally emulates a built-in video adapter for the VM, which conflicts with the vGPU video adapter during resource allocation. Because of the conflict, the vGPU driver cannot initialize correctly.

### {heading(Solution)[id=iaas-vgpu-windows-problem-decision]}

You cannot change the meta tag for an existing VM. You need to recreate the VM from an image with the meta tag set.

1. [Set](/en/computing/iaas/instructions/images/image-metadata) the meta tag for the image on which the VM is based:

   ```console
   openstack image set --property hw_video_model=none <IMAGE_ID>
   ```

1. [Create](/en/computing/iaas/instructions/vm/vm-create) the VM again from the updated image.
