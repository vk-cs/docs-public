Billing is a set of tools for accounting for resource usage, generating reports, interacting with payment systems and obtaining financial documents on the VK Cloud platform.

To get started, you need to [register on the platform](../../../account/start/registration). This is necessary even if you want to familiarize yourself with the interface and test the services for free. To register, you will need to confirm your email, specify a phone number and link a payment card. We will not deduct money from your account until you start using the resources of the project.

After registration, new customers receive welcome bonuses to their Bonus Account so that you can test the service for 60 days. After testing, you need to top up your Main Account balance.

You can view the cost details and set a monthly spending limit for each of your projects. Upon reaching the specified limit, you will receive an email with a notification.

## Billing of disabled VMs

Money is debited on a per-minute basis for the working entities (virtual machines, clusters). If these entities are stopped, charges continue only for:

- license usage (Windows and RDS, if activated);
- leased disk space;
- storage of existing backups;
- [public IP addresses](/en/networks/vnet/tariffs#what-is-charged).

## Disable services and delete project data

If the project balance becomes negative, then its resources will be automatically stopped and placed in the deletion queue. The deletion queue is a mechanism for cleaning resources, in which data from the project and the VK Cloud platform are permanently deleted, without the possibility of recovery.

If there was no payment for the entire period of the project's existence, then after 3 days all resources will be deleted. If there was a payment, then the resources will be queued for deletion 30 days after the services stop.

After replenishing the balance, you will be able to use the services again, however, you will need to manually start each resource.

<info>

**Note**

Project activation is automatic and can take up to 4 hours.

</info>
