The Cloud Desktop service is based on VDI (Virtual Desktop Infrastructure) technology and is designed to provide users with desktops created on a remote server and functioning in a virtualized environment.

## What tasks is the service suitable for?

The Cloud Desktop service is suitable for creating or upgrading the communication infrastructure of an enterprise or a network of enterprises where different people can use one workplace.

Tasks that the service solves:

- Deployment of desktops and their further administration through pools.
- Managing desktop pools and load balancing in them.
- Organization of remote desktops for users and ensuring continuous access to them.
- Protection of desktops from unauthorized access.

## Service features

- Support for guest operating systems on which cloud desktops will be launched: Windows OS, Linux OS.
- Directory services support [AD](https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)/[LDAP](https://docs.altlinux.org/archive/2.4/html-single/master/alt-docs-master/ch06s11.html).
- Support for data transmission over the RDP protocol.
- Support for two types of jobs: personalized and session.
- Monitoring the use of peripheral devices.
- Maintenance of more than 1000 simultaneous user connections.
- Creating and configuring a VM on a virtualization platform from a pre-prepared master image.
- Support of fault tolerance mechanisms for management, licensing, storage and accounting of configuration changes.

## Role model

The following roles are provided in the service:

- Administrator.

  Manages the service through [personal account](https://msk.cloud.vk.com/app/en) VK Cloud. Configures integration with the directory service, creates desktop pools, and assigns desktops to users.

- User.

  Direct user of cloud desktops. Independently installs a client application to access the desktop.

## Available peripherals

| Peripheral device | Windows OS | Linux OS |
| --- | --- | --- |
| Print | + | + |
| Microphone | + | - |
| Smart cards | + | + |
| Files and clipboard | + | + |
| Time zone | + | - |

The available peripherals are set when [adding](../../instructions/desktops-pool/add/) a desktop pool.

## What's next?

- [Get acquainted](../vdi-reference/) with the basic concepts of the service.
- [Pass](../../quick-start/) quick start.
