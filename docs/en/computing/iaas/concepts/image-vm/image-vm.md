# {heading(Images)[id=iaas-image-vm]}

{include(/en/_includes/_translated_by_ai_en.md)}

The configuration and data of a virtual machine are stored as one or more files. These files can be used as an image to run a VM in a local environment or to create a new VM.

In {var(cloud)}, you can {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=create an image]} based on a VM disk or {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=upload an image file]}. The resulting image can be used to create a new virtual machine.

An image whose source is a disk allows you to create a copy of a virtual machine with an installed and configured operating system and applications.

An image uploaded from a file can be used to migrate a VM or to create a virtual machine with your operating system.

{note:info}
Cloud Servers supports images in RAW format.
{/note}