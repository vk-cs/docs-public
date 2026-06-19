# {heading(Не настроен интерфейс ВМ)[id=iaas-restored-vm-no-interface]}

У ВМ, восстановленной из резервной копии, не настроены интерфейсы.

### {heading(Решение)[id=iaas-restored-vm-no-interface-decision]}

После восстановления из резервной копии {linkto(../../../../computing/iaas/troubleshooting/linux-vm-network#iaas-linux-vm-network-settings-check)[text=проверьте и при необходимости скорректируйте]} настройки интерфейсов в операционной системе ВМ. Настройки внутреннего и внешнего адресов ВМ должны соответствовать настройкам в [личном кабинете](https://msk.cloud.vk.com/app/).

{note:info}
Используйте {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адреса]} для подключения всех ВМ, которые должны иметь внешний IP. Если ВМ будет удалена или ее нужно будет пересоздать, Floating IP-адрес останется в проекте и его можно будет назначить восстановленной ВМ.
{/note}