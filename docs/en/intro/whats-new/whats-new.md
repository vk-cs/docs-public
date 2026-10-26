# {heading(What's new)[id=whats-new]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading({var(cloud)} configurations)[id=whats-new-configurations]}

The set of {var(cloud)} configurations has been updated.

A new "Light cloud" configuration has been added, which makes it possible to reduce the minimum number of servers required to deploy {var(cloud)} and decrease resource consumption by the management layer.

This configuration is recommended:

- For use in edge computing.
- As a starting point for migrating from classic or virtualized infrastructure to a private cloud for small and medium businesses.

## {heading(Fault tolerance)[id=whats-new-reliability]}

It is now possible to deploy {var(cloud)} components across multiple availability zones.

Availability zones are designed to separate workload nodes in order to protect against various negative scenarios: power failure, network failure, and more.

## {heading(Cloud Servers virtual server subsystem)[id=whats-new-cloud-servers]}

It is now possible to create VMs using graphics processing units. A VM can use either an entire graphics processing unit (GPU) or a part of it (vGPU).

## {heading(Cloud Desktop virtual workplace subsystem)[id=whats-new-cloud-desktop]}

The Cloud Desktop virtual workplace subsystem has been added. Cloud Desktop is based on Virtual Desktop Infrastructure (VDI) technology. It provides users with access to virtual workplaces created on a remote server and operating in a virtualized environment.

Use cases for virtual workplaces:

- Creating or upgrading enterprise-scale communication infrastructure.
- In educational or other organizations where a single workplace is used by multiple people, with the ability to reset the workplace at the end of a work session.
- In enterprises with an extensive branch network.

## {heading(Security)[id=whats-new-security]}

You now need to explicitly specify the list of subnets from which access is required for logging in to the Admin Portal or for integration with external systems. Access from other subnets will be denied.