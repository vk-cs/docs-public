# {heading(Не появляется сетевой интерфейс после переноса порта)[id=vnet-port-transfer-problem]}

После переноса порта операционная система внутри ВМ не видит новый сетевой интерфейс. 

### {heading(Решение)[id=vnet-port-transfer-problem-resolve]}

1. Попробуйте обновить аренду DHCP.
   ```console
   dhclient -v
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Перезагрузите]} виртуальную машину.
