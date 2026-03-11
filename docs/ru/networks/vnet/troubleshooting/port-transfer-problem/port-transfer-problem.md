После переноса порта операционная система внутри ВМ не видит новый сетевой интерфейс.

### Решение

1. Попробуйте обновить аренду DHCP.
   ```console
   dhclient -v
   ```

1. [Перезагрузите](/ru/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) виртуальную машину.