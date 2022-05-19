## Image logins

|  |  |
| --- | --- |
| Bitrix* | root* |
| CentOS | centos |
| Debian | debian |
| Fedora | fedora |
| FreeBSD | freebsd |
| Ubuntu | ubuntu |

Bitrix*: Immediately after logging in, the system will ask you to set a new password. To do this, the system will request the current password (bitrix) and twice request a new password for the root user.

Also, the Bitrix-CentOS image does not currently support working on the Ext-Net network.

In general, there are no passwords for Linux-like operating systems from the list above. You can set a password on the virtual machine card in the Console tab.

You can also set a password via the CLI (local client for managing virtual machines):

```bash
nova set-password $instance_uuid
```

Also (for Windows), you can set the password for the "Admin" account using the "Set password" button on the "Console" tab.
