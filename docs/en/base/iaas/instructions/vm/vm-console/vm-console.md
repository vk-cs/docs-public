In emergency situations and when there is no [connection to the VM](../vm-connect/vm-connect-nix#4_connect_to_the_vm) over the network, use [VNC console](#the-vnc-console) or view [VM message logs](#vm_message_logs).

<info>

Information about the user's actions with the VM and about changes in its state is contained in the [event log](../vm-manage#viewing_the_event_log) OpenStack.

</info>

## The VNC console

VNC Console is a virtual machine diagnostics and management tool that runs in the browser. Use the VNC console if:

- the virtual machine does not have an external IP address or is not connected to the Internet;
- recommended VM connection methods (via [SSH](../vm-connect/vm-connect-nix) or [RDP](../vm-connect/vm-connect-win)) don't work.

Access to the VNC console appears immediately after the virtual machine is started. This allows you to detect failures during the boot of the operating system.

Features of working with the VNC console:

- you can only use the Latin alphabet to enter text;
- the clipboard in the VNC console is not available, you cannot copy and paste the text.

Open the console in the VK Cloud personal account or use the address obtained through the OpenStack CLI.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
2. Go to **Cloud Computing → Virtual machines**.
3. In the list of virtual machines, click on the name of the VM you need.
4. On the VM page, go to the tab **Console**.
5. If the VM is not running, click the start button on the tab.

<info>

Use the VNC console on the tab or click **Open in new window**.

</info>

</tabpanel>

<tabpanel>

1. Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

2. Get a link to the VNC console page.

   ```bash
   openstack console url show <virtual machine ID>
   ```

   Example output:

   ```
   +-------+-------------------------------------------------------------------------------------+
   | Field | Value                                                                               |
   +-------+-------------------------------------------------------------------------------------+
   | type  | novnc                                                                               |
   | url   | https://infra.mail.ru:6080/vnc_auto.html?token=20224980-43eb-4535-85c7-310a18e27941 |
   +-------+-------------------------------------------------------------------------------------+
   ```

3. Use the link to open the VNC console page in the browser.

   <info>

   If the link has expired, run the command again to get a new link.

   </info>

</tabpanel>
</tabs>

VNC console control buttons are available in the personal account interface and in a separate window:

- **Send CtrAltDel** — the action of the button depends on the VM's operating system (reboot, opening the lock window, etc.).
- **Update Session** — use it to reconnect to the VNC console.

## VM message logs

OpenStack provides support for a console running through a VM serial port. This allows you to view the boot logs and other diagnostic information, regardless of the state of the operating system and access to the VM over the network.

If the VM was created from a custom image, configure the console. To do this, add the following parameters to GRUB:

```bash
console=tty0 console=ttyS0,115200n8
```

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

Make sure that OpenStack client [is installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) to the project.

- Output all log entries:

   ```bash
   openstack console log show <virtual machine ID>
   ```

- Output a limited number of records:

   ```bash
   openstack console log show --lines <number of entries> <virtual machine ID>
  ```

</tabpanel>
</tabs>
