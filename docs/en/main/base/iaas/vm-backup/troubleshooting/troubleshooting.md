## The "backup cannot be performed" problem

The problem "backup cannot be performed" (the menu item is missing or the VM is not in the list) may arise due to the absence of a QEMU guest agent in the system (*qemu guest-agent) - it provides consistent backup from file systems.

To install it on Linux (for deb-based distributions – Ubuntu, Debian), run:

```bash
apt-get install qemu-guest-agent
```

For rpm-based distributions — CentOS, do the following:

```bash
yum install qemu-guest-agent
```

After installing qemu-guest-agent, you need to add it to the system autostart:

```bash
systemctl start qemu-guest-agent
systemctl enable qemu-guest-agent
```

In the case of Windows, download the installation file by [ссылке](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-qemu-ga/qemu-ga-win-7.6.2-2.el7ev/qemu-ga-x64.msi).

After installation, you need to register additional metadata on the VM – please [contact technical support for this](https://mcs.mail.ru/help/contact-us). In some cases, you may need to restart the VM.
