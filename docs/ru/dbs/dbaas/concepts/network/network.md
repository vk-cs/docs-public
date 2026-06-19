# {heading(Работа с сетью)[id=dbaas-network]}

## {heading(Использование балансировщика нагрузки)[id=dbaas-network-using]}

Для каждого кластера PG/MySQL создается TCP-балансировщик, который имеет 3 порта. Они указывают на:

- мастер;
- синхронную реплику;
- асинхронную реплику.

## {heading(Настройка групп безопасности)[id=dbaas-network-sg-settings]}

Вы можете настроить группы безопасности как при {linkto(../../instructions/create#dbaas-create)[text=создании]} инстанса БД, так и после его развертывания через {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=раздел]} **Виртуальные сети** → **Настройки firewall**.