# {heading(Network interface does not appear after port transfer)[id=vnet-port-transfer-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

After the port transfer, the operating system inside the VM does not see the new network interface.

### {heading(Solution)[id=vnet-port-transfer-problem-resolve]}

1. Try to renew the DHCP lease.
   ```console
   dhclient -v
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Reboot]} the virtual machine.