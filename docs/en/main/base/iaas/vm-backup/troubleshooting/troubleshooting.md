## Если возникает проблема "невозможно выполнить резервное копирование" (отсутствует пункт меню или ВМ нет в списке)

Данная проблема может возникнуть из-за отсутствия в системе гостевого агента QEMU (**qemu guest-agent**) – он обеспечивает консистентное со стороны файловых систем резервное копирование.

Для его установки на Linux (для deb-based дистрибутивов – Ubuntu, Debian) выполните:

```
apt-get install qemu-guest-agent
```

Для rpm-based дистрибутивов – CentOS выполните следующее:

```
yum install qemu-guest-agent
```

После установки qemu-guest-agent его нужно добавить в автостарт системы:

```
systemctl start qemu-guest-agent
systemctl enable qemu-guest-agent
```

В случае с Windows загрузите установочный файл по [ссылке](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-qemu-ga/qemu-ga-win-7.6.2-2.el7ev/qemu-ga-x64.msi).

После установки требуется прописать на ВМ дополнительные метаданные – пожалуйста, [обратитесь для этого в техническую поддержку](https://mcs.mail.ru/help/contact-us). В некоторых случаях может потребоваться перезагрузка ВМ.
