# {heading(Requirements for image-based applications)[id=image_based]}

{include(/en/_includes/_translated_by_ai_en.md)}

An image-based application must meet the following requirements:

* Supports operation on KVM virtualization in OpenStack.
* Supports operation within the network solutions provided by the cloud platform.
* No default passwords.
* Unused ports are closed.
* Runs on any infrastructure configuration selected by the user when connecting the service.
* Must start automatically in case of VM restart:

   * After a soft VM restart, during which the service and OS processes were shut down correctly. For example, if the user rebooted the OS via SSH after updates.
   * After a hard VM restart, during which the service and OS processes were not shut down correctly. For example, if a failure occurred in the cloud platform infrastructure and the orchestrator initiated a VM reboot.

* Service billing must comply with the requirements specified in the section {linkto(../billing#billing)[text=%text]}.
* The service must be accompanied by documentation:

   * Deployment instructions.
   * Operation instructions or user manual (optional).

* The service documentation must match the service version.
* The service documentation must be sufficient for the user to obtain a working service instance using the provided instructions.
* The service image must meet the requirements specified in the section {linkto(#image_based_req_image)[text=%text]}.

{note:info}

It is recommended to test the service before publishing it in the store and make sure that it works correctly on the cloud platform infrastructure (for more details, see the section — {linkto(../cloud_integration/#cloud_integration)[text=%text]}).

{/note}

## {heading(Requirements for the service image)[id=image_based_req_image]}

* The service image must have the following software packages installed:

  * [cloud-init](https://cloudinit.readthedocs.io/en/latest) — allows configuring the VM in the cloud platform.
  * If the [agent](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent) is used:

    * [curl](https://curl.se) — allows initializing the agent download.
    * [systemd](https://systemd.io) — allows running the agent and monitoring its health.

  * [QEMU Guest Agent](https://www.qemu.org/docs/master/interop/qemu-ga.html) — allows [setting a password](/en/computing/iaas/instructions/vm/vm-manage#password) for the VM via the cloud platform dashboard.

* The service image must not contain:

  * confidential data;
  * bash command history of working with the image;
  * debuggers.

* Requirements for configuring the image OS:

  * An SSH server must be installed that starts when the OS boots.
  * The firewall must be disabled.
  * The Linux kernel must output OS boot logs to the console.
  * There must be no built-in immutable MAC addresses of network devices.

* Requirements for the Linux kernel:

  * The following VirtIO drivers must be installed:

    * virtio-net,
    * virtio-blk,
    * virtiofs.

  * If the Linux kernel is built from scratch, the VirtIO drivers must be enabled.

Information on creating an image, uploading and publishing the image in the cloud platform is provided in the section [Adding an image-based application to the store](../../../ibservice_add).