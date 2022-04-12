Billing is a set of tools for accounting for resource usage, generating reports, interacting with payment systems and obtaining financial documents on the VK Cloud Solutions platform.

To get started, you need to [register on the platform](https://mcs.mail.ru/docs/additionals/start/get-started/registration ). This is necessary even if you want to familiarize yourself with the interface and test the services for free. To register, you will need to confirm your email, specify a phone number and link a payment card. We will not deduct money from your account until you start using the resources of the project.

After registration, new customers receive welcome bonuses to their Bonus Account so that you can test the service for 60 days. Read more about bonus points [here](https://mcs.mail.ru/docs/ru/additionals/billing/concepts/promotions ). After testing, you need to top up your Main Account balance.

You can view the cost details and set a monthly spending limit for each of your projects. Upon reaching the specified limit, you will receive an email with a notification.

## Billing of disabled VMs

Funds are debited every minute from working entities (virtual machines, clusters). If the entity data is determined that write-offs continue only for the use of licenses (Windows and RDS, if activated) and leased disk space, as well as for storing existing backups.

## Disabling services

When there is a zero balance on the account, the project resources will be automatically stopped until the project balance is replenished.

After replenishing the balance, the billing tools allow you to use the services again, but you will need to manually launch each resource.

<info>

The activation of the project after the restoration of a positive balance is carried out by the billing system and can take up to 4 hours.

</info>

## Deleting project data
In the absence of restoring a positive balance, the project resources will be placed in a queue for deletion, depending on the availability of payments for the entire period of the project's existence.:
- If there was no money in the project, then after 3 days all resources will be deleted.
- If the payment was made, the resources will be placed in the queue for deletion after 30 days (or when the balance is equal to -1000r.) after the services are stopped.

The deletion queue is a mechanism for cleaning resources, in which data from the project and the VK CS platform are permanently deleted, without any possibility of their recovery.

