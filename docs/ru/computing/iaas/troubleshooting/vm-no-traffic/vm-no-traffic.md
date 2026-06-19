# {heading(ВМ не перенаправляет трафик)[id=iaas-vm-no-traffic]}

Виртуальная машина является промежуточным узлом сети (маршрутизатором или VPN-шлюзом), но не перенаправляет трафик.

Проблема может возникать, если не настроены IP-адреса, для которых разрешен пропуск трафика ({linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-source-guard)[text=IP Source Guard]}).

### {heading(Решение)[id=iaas-vm-no-traffic-decision]}

1. Получите список портов ВМ и IP-адресов, разрешенных для этих портов:

   ```console
   openstack port list --server <ID_ВМ>
   ```

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-ip-source-guard-manage)[text=Настройте IP Source Guard]} для портов, которые должны пропускать трафик из своих сетей.
      
   Если нужно разрешить весь трафик, проходящий через порт, укажите в команде IP-адрес подсети порта в формате CIDR. 

   Пример для подсети `10.0.0.0/24` и порта `09a44805-3bb9-422d-bd86-82afcd17b9d6`:

   ```console
   openstack port set 09a44805-3bb9-422d-bd86-82afcd17b9d6 --allowed-address ip-address=10.0.0.0/24
   ```

1. Если после настройки разрешенных IP-адресов проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).
