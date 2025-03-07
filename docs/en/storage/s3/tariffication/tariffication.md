## About tariffication

The cost of individual service components is given in the [price list](https://cloud.vk.com/pricelist). To calculate the total cost of the service, use the [calculator](https://cloud.vk.com/en/pricing).

Tariffication is based on the "pay as you go" principle: you pay only for the resources you consume, accurate to one second.

For more information about how to pay for the service, see the [Billing](/en/intro/billing) section.

## What is charged

Tarrification in Cloud storage depends on the data [storage class](../service-management/change-storage-class).

For the Hotbox and Icebox classes, you pay for:

- Volume of stored data (per GB).
- Outgoing traffic (per GB).

    Outgoing traffic is any downloading of information from the bucket: either on request from VK Cloud (for example, from a VM), or from outside VK Cloud (for example, from the user's PC). In both cases, the bucket is accessed using an external IP address.

For the Backup storage class, you pay only for the volume of stored data (per GB).

## What is not charged

- Incoming traffic.
- [API](../concepts/s3-api) usage.
