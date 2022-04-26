The event list is a collection of records that reflect events in a virtual machine. The event contains the type, time and ID of the request.

## OpenStack CLI

To view the event log, run the command:

```
 openstack server event list --long <instance ID>
```

View event in detail:

```
 openstack server event show <instance ID> <request ID>
```

Possible events

- live-migration - live migration of an instance
- resize - change configuration
- start / stop - start / stop the server
- create - creating an instance
- extend_volume - increase disk size
