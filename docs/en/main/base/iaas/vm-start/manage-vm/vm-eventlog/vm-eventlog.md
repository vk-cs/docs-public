Journal событий инстанса (event list) — это набор записей, отражающих события виртуальной машины. Sobыtiye soderzhite type, timing and ID ZAPROSA.

## OpenStack CLI

In просмотра журнала событий требуется выполнить команду:
```bash
openstack server event list --long <ID instance>
```

Possotretь roomы detalь:
```bash
openstack server event show <ID instance> <request id>
```

Possibleы roomы:

-live — migration-aliveя migrationя instance.
— resize-modified configurations.
— start/stop-zapuska/other server.
— create-creation instance.
— extend_volume-magnification scale disco.
