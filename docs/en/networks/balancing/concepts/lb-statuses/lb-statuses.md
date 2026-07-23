# {heading(Load Balancer Statuses)[id=balancing-lb-statuses]}

## {heading(Provisioning statuses)[id=balancing-lb-statuses-provisioning]}

The provisioning status is a status that indicates the lifecycle stage the load balancer is currently in. It shows the state and success of creating, updating, or deleting the load balancer.

Possible provisioning statuses:

[cols="1,1,2", options="header"]
|===

|Name in the management console
|Technical name
|Description

|Active
|`ACTIVE`
|The load balancer has been successfully created and is ready for operation; the configuration has been applied

|Error
|`ERROR`
|An error occurred while creating or changing the load balancer settings. Its exact state is unknown. Contact [technical support](mailto:support@mcs.mail.ru)

|Creating
|`PENDING_CREATE`
|The load balancer is being created

|Updating
|`PENDING_UPDATE`
|The load balancer is being updated

|Deleting
|`PENDING_DELETE`
|The load balancer is being deleted
|===

## {heading(Operating statuses)[id=balancing-lb-statuses-operating]}

Operating statuses are of two types:

- Common — displayed at the top level, for example, in the management console.
- Special — displayed only at the pool and backend level; can be viewed using the OpenStack CLI.

### {heading(Common operating statuses)[id=balancing-lb-statuses-operating-common]}

The load balancer’s common status may change depending on the combination of special operating statuses specific to an individual backend. A backend is one or more servers that accept requests and are located behind the load balancer.

Possible common operating statuses:

[cols="1,2", options="header"]
|===

|Name
|Description

|`ONLINE`
|The status is assigned if at least one of the following conditions is met:
- The load balancer is operating normally (all system processes of the load balancer are functioning correctly and accepting connections). This condition is checked even if no backends have been added to the load balancing pool.
- All pool members (backends, load balancing rules) are healthy and respond to the health check

|`DEGRADED`
|The status is assigned if at least one of the following conditions is met:
- One or more pool members (backend) are in the `ERROR` state (do not respond to the health check).
- One of the [Amphoras](https://docs.openstack.org/octavia/latest/admin/amphora-image-build.html) in the `Active`-`Standby` high-availability cluster stopped responding to the health check; the service continues to handle requests on the node operating in `Active` mode

|`ERROR`
|The status is assigned if at least one of the following conditions is met:
- All pool members (backends) do not respond to the health check.
- All pool members have a weight coefficient of 0 (the administrator enabled `DRAINING` on all backends).
- An infrastructure failure occurred, as a result of which both nodes of the Amphora cluster do not respond to health checks.
- All pool members (backends) are turned off (the administrator switched all backends to the `OFFLINE` state).
- An infrastructure failure occurred because the HAProxy daemon failed to apply the configuration
|===

### {heading(Special operating statuses)[id=balancing-lb-statuses-operating-special]}

Special statuses reflect the state of the load balancing pool or its members. A pool or its member can also take one of the common statuses; in this case, such a status participates in forming the common status displayed at the top level. For details, see the {linkto(#balancing-lb-statuses-operating-matrix)[text=status mapping matrix]}.

Possible special operating statuses:

[cols="1,2", options="header"]
|===

|Name
|Description

|`DRAINING`
|The administrator has determined that one or more pool members do not accept new connections

|`OFFLINE`
|The administrator switched the pool or backend to an inactive state

|`NO_MONITOR`
|No mechanism for checking backend health is configured for the pool
|===

### {heading(Operating status mapping matrix)[id=balancing-lb-statuses-operating-matrix]}

Below is an example of how the load balancer’s common operating statuses depend on the operating statuses of members of a load balancing pool consisting of two backends.

In this example, a backend in the `ERROR` state indicates a failure at the web application level when the HTTP health check fails. A backend in the `ONLINE` state indicates a normally operating backend that responds to the health check.

| Backend-1 status    | Backend-2 status    | Common status           |
| ------------------- | ------------------- | ---------------------- |
| `ONLINE`            | `ONLINE`            | `ONLINE`               |
| `ONLINE`            | `ERROR`             | `DEGRADED`             |
| `ERROR`             | `ERROR`             | `ERROR`                |
| `ONLINE`            | `DRAINING`          | `ONLINE`               |
| `DRAINING`          | `DRAINING`          | `ERROR`                |
| `ONLINE`            | `OFFLINE`           | `ONLINE`               |
| `OFFLINE`           | `OFFLINE`           | `ERROR`                |