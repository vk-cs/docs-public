Description
-----------

The server serial console log can be useful for getting information about the boot of the operating system or for determining the cause of any problems.

The serial console provides access regardless of the state of the network or operating system.

**Note**

When using your own image, you need to configure the output of logs to the serial console. For example, add parameters to grub:

```
 console = tty0 console = ttyS0,115200n8
```

OpenStack CLI
-------------

To get the output of the serial console, you need to type the command:

```
 openstack console log show <instance ID>
```

If you want to display a certain number of lines:

```
 openstack console log show --lines <number of lines> <instance ID>
```