## Description

The serial console log of the server can be useful to get information about the boot of the operating system or to determine the causes of any problems.

The serial console provides access regardless of the state of the network or operating system.

<info>

When using your own image, you need to configure the output of logs to the serial console. For example, add parameters to grub:

```bash
console=tty0 console=ttyS0,115200n8
```

</info>

## OpenStack CLI

To get the output of the serial console, you need to type the command:
```bash
openstack console log show <instance ID>
```

If you need to output a certain number of lines:
```bash
openstack console log show --lines <number of lines> <instance ID>
```
