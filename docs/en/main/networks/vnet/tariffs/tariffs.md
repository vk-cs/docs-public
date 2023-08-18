## About tariffication

Tariffication is based on the "pay as you go" principle: you are charged only for the resources you consume to the nearest second.

The cost of network services is given in [price list](https://mcs.mail.ru/pricelist). You can use [calculator](https://mcs.mail.ru/pricing) to calculate the total cost of other platform services that use network services. See [Billing](../../../additionals/billing) for how the tools related to paying for platform services work.

## What is charged

The cost of these resources is displayed in your personal VK Cloud account as part of the total cost of the services that use them.

Charged:

- Public IP addresses:
  - The public IP address assigned to the port if the port is connected to the `ext-net' network.
  - Existing floating public IP addresses (even if not assigned to any port).

- [Standard and service](../concepts/load-balancer#types_of_load_balancers) load balancers.

## What is not charged

- The public IP address assigned to the router when you select the **External network connection** option.

  This allows, for example, virtual machines to access the Internet without having to purchase floating IP addresses.
  However, you cannot use such an IP address to access virtual machines from the Internet. A floating IP address will be required.

- Incoming and outgoing traffic.
- Using a VPN.
