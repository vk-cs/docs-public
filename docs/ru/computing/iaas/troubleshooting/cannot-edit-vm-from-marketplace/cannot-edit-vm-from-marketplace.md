# {heading(Не получается изменить конфигурацию ВМ, образ которой взят из Marketplace)[id=iaas-cannot-edit-vm-from-marketplace]}

Некоторые приложения из Marketplace разворачиваются с фиксированной конфигурацией, которую нельзя изменить стандартным способом.

### {heading(Решение)[id=iaas-cannot-edit-vm-from-marketplace-decision]}

1. [Создайте](/ru/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-create) снимок диска текущей ВМ.
1. [Создайте](/ru/computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots-use) новую ВМ из этого снимка, выбрав нужный [шаблон конфигурации](/ru/computing/iaas/concepts/vm/flavor) с большим объемом памяти.
1. [Отвяжите](/ru/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate) Floating IP-адрес от текущей ВМ.
2. [Привяжите](/ru/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-associate) Floating IP-адрес к новой ВМ.