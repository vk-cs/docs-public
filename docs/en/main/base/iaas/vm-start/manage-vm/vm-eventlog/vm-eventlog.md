The instance event log (event list) is a set of records that reflect the events of a virtual machine. The event contains the type, time, and ID of the request.

## OpenStack CLI

To view the event log, you need to run the command:
```bash
openstack server event list --long <ID instance>
```

View the event in detail:
```bash
openstack server event show <ID instance> <request id>
```

Possible events:

- live-migration — live instance migration.
- resize — change the configuration.
- start/stop — start/stop the server.
- create — create an instance.
- extend_volume — increase the disk size.
