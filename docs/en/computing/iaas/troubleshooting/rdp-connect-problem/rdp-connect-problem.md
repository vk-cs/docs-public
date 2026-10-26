# {heading(VM RDP Connection Issue)[id=iaas-rdp-connect-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

When {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=connecting to a virtual machine via RDP]}, the error `The remote session was disconnected because there are no Remote Desktop License Servers available` occurs. After that, the session is terminated.

By default, Windows Server allows only two simultaneous remote RDP connection sessions. In addition, a single user account cannot use the {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=VNC console]} and connect to the VM via RDP at the same time — the session that was started later will remain active.

To increase the limit on the number of active sessions, the following must be configured and activated:

- Remote Desktop Services roles;
- Remote Desktop Licensing roles;
- a client access license (CAL) package.

### {heading(Solution)[id=iaas-rdp-connect-problem-decision]}

As a workaround, you can connect to the VM via RDP in administration mode. This is possible even if the limit on the number of active sessions has been reached.

{note:warn}
An administration mode session is available only for an account with administrator privileges.
{/note}

To connect to a session in administration mode:

1. Run the command:

   ```console
   mstsc /v:<VM_IP_ADDRESS> /admin
   ```
   Here `<VM_IP_ADDRESS>` is the IP address or fully qualified domain name of the virtual machine.

1. In the window that opens, enter your credentials.
1. Confirm the connection.