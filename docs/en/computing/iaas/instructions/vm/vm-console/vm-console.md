In emergency situations and when there is no [connection to the VM](../vm-connect/vm-connect-nix#4_connect_to_the_vm) over the network, use [VNC console](#the-vnc-console) or view [VM message logs](#vm_message_logs).

{note:info}

Information about the user's actions with the VM and about changes in its state is contained in the [event log](../vm-manage#viewing_the_event_log) OpenStack.

{/note}

## The VNC console

VNC Console is a virtual machine diagnostics and management tool that runs in the browser. Use the VNC console if:

- the virtual machine does not have an external IP address or is not connected to the Internet;
- recommended VM connection methods (via [SSH](../vm-connect/vm-connect-nix) or [RDP](../vm-connect/vm-connect-win)) don't work.

Access to the VNC console appears immediately after the virtual machine is started. This allows you to detect failures during the boot of the operating system.

Features of working with the VNC console:

- you can only use the Latin alphabet to enter text;
- the clipboard in the VNC console is not available, you cannot copy and paste the text.

To connect VM via VNC console:

1. Open the console:

    <tabs>
    <tablist>
    <tab>Management console</tab>
    <tab>OpenStack CLI</tab>
    </tablist>

    <tabpanel>

    1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
    1. Go to the **Cloud Servers → Virtual machines** section.
    1. In the list of virtual machines, click on the name of the VM you need.
    1. Go to the **Console** tab.

    </tabpanel>

    <tabpanel>

    1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

    1. Get a link to the VNC console page.

       ```console
       openstack console url show <virtual machine ID>
       ```

       Example output:

       ```console
       +-------+-------------------------------------------------------------------------------------+
       | Field | Value                                                                                 |
       +-------+-------------------------------------------------------------------------------------+
       | type  | novnc                                                                                |
       | url   | https://infra.mail.ru:6080/vnc_auto.html?token=<TOKEN_VALUE>  |
       +-------+-------------------------------------------------------------------------------------+
       ```

    1. Use the link to open the VNC console page in the browser.

       {note:info}

       If the link has expired, run the command again to get a new link.

      {/note}

    </tabpanel>
    </tabs>

1. If the virtual machine is not running, click the start button on the tab.
1. [Set a password](../vm-manage#password) to log into the OS if you haven't done it already. Write down the account name and password.
1. (Optional) Click the **Open in new window** button to open the console in a separate browser window.
1. Enter the login and password in the console.

VNC console control buttons are available in the VK Cloud management console interface and in a separate window:

- **Send CtrAltDel** — the action of the button depends on the VM's operating system (reboot, opening the lock window, etc.).
- **Update Session** — use it to reconnect to the VNC console.

## VM message logs

OpenStack provides support for a console running through a VM serial port. This allows you to view the boot logs and other diagnostic information, regardless of the state of the operating system and access to the VM over the network.

If the VM was created from a custom image, configure the console. To do this, add the following parameters to GRUB:

```console
console=tty0 console=ttyS0,115200n8
```

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
</tablist>

<tabpanel>

Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.

- Output all log entries:

   ```console
   openstack console log show <virtual machine ID>
   ```

- Output a limited number of records:

   ```console
   openstack console log show --lines <number of entries> <virtual machine ID>
  ```

</tabpanel>
</tabs>
