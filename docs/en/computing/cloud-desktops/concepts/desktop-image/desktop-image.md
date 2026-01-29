A desktop image is an image of a virtual machine on which, in addition to standard program components, software is installed to support VDI technology, as well as applications required for the end user's work. The Cloud Desktop service provides ready-to-use images for deploying desktops. You can also upload your own images and use them in the service.

You can prepare a custom desktop image in any available way, for example, using one of the [How-to guides](/en/computing/iaas/how-to-guides) of the Cloud Servers service.

## {heading(Requirements for a custom desktop image)[id=custom-image-requirements]}

The following software must be installed on the image:

- OS:

  - Windows of any version that supports connection to the Active Directory service.
  - Astra Linux «Orel» with graphical interface installed.

  To use other operating systems, please contact [technical support](mailto:support@mcs.mail.ru).

- [QEMU guest agent](https://pve.proxmox.com/wiki/Qemu-guest-agent).
- Software for cloud-based virtual machine initialization:

  - For Astra Linux — the [cloud-init](https://www.ibm.com/docs/ru/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux) package.
  - For Windows — the [Cloudbase-Init](https://cloudbase.it/cloudbase-init) application.

- Applications required for your users' work.

For a VM created from an image to utilize [graphics accelerators](/en/computing/gpu/concepts/about) (GPU), the image must have:

- GPU drivers installed;
- a license token configured if [virtual graphics accelerators](/ru/computing/gpu/concepts/vgpu#licensing "change-lang") (vGPU) are used.

For more information, see the guide for [configuring a VM with vGPU](/ru/computing/gpu/how-to-guides/vgpu-setup "change-lang").

## Recommendations for preparing a custom desktop image

For Astra Linux, it is recommended to install additional software to support the RDP protocol and the AD service. This will speed up the deployment of desktops in a pool.
