# {heading(Create a custom VM image)[id=onboarding-image-create]}

{include(/en/_includes/_translated_by_ai_en.md)}

This guide will introduce you to one of the features of the [Cloud Servers](/en/computing/iaas) service — creating a custom [image](/en/computing/iaas/concepts/image-vm) of a virtual machine.

After completing all the steps of this guide, you will create an image from the disk of an existing virtual machine.

## {heading(Preparation steps)[id=onboarding-image-create-prepare]}

{linkto(../../../../intro/onboarding/quick-start/create-vm#onboarding-create-vm)[text=Create]} a virtual machine.

## {heading({counter(image)}. Create an image)[id=onboarding-image-create-create]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Navigate to the **Cloud Computing → Virtual Machines** section.
1. In the list of virtual machines, click ![ ](../../../../assets/more-icon.svg "inline") for the VM whose image you need to create, select **Stop**, and confirm the action.
1. Navigate to the **Cloud Computing → Images** section.
1. Click the **Create** button.
1. Configure the image settings:

   - **Source**: select **Disk**.
   - **Select disk**: select the disk of the virtual machine that was stopped.
   - **Image name**: specify the image name.

1. Click the **Create image** button.

## {heading(What's next?)[id=onboarding-image-create-next]}

Use the resulting image to {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=create]} a new virtual machine.