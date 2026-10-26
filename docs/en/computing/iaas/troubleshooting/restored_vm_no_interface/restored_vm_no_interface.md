# {heading(VM interface is not configured)[id=iaas-restored-vm-no-interface]}

{include(/en/_includes/_translated_by_ai_en.md)}

A VM restored from a backup has no configured interfaces.

### {heading(Solution)[id=iaas-restored-vm-no-interface-decision]}

After restoring from a backup, {linkto(../../../../computing/iaas/troubleshooting/linux-vm-network#iaas-linux-vm-network-settings-check)[text=check and, if necessary, adjust]} the interface settings in the VM operating system. The settings of the VM's internal and external addresses must match the settings in the [management console](https://msk.cloud.vk.ru/app/).

{note:info}
Use {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP addresses]} for connecting all VMs that must have an external IP. If a VM is deleted or needs to be recreated, the Floating IP address will remain in the project and can be assigned to the restored VM.
{/note}