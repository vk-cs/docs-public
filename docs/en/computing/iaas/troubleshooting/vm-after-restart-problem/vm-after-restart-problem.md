# {heading(Network lost after VM restart)[id=iaas-vm-after-restart-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

Network access was lost after restarting the virtual machine.

The error can be caused by various reasons.

### {heading(Solution)[id=iaas-vm-after-restart-problem-decision]}

{linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check-access)[text=Check]} the network interface settings inside the OS (`netplan` or `ifcfg` configuration files). The interface may not be receiving an IP address via DHCP or the interface name may have changed.

In emergency situations and when there is no network connection to the virtual machine, use the {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=VNC console]}.