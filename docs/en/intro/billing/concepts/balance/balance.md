The balance of a [project](/en/tools-for-using-services/account/concepts/projects) is the overall sum of funds on the project accounts, the main and the bonus ones.

You can [view](../../service-management/payment) the project balance in the [personal account](https://msk.cloud.vk.com/app/en/). Information about the balance is available if the services are [activated](/en/tools-for-using-services/account/service-management/activation) in the project.

## The main and the bonus account

For each new project, two accounts are created automatically:

- The main account:

  - you can replenish it using one of the available [payment methods](../payment-methods);
  - funds on it can be [refunded](../../service-management/refund);
  - funds on it never expire.

- The bonus account — a dedicated account for storing bonuses:

  - you cannot replenish this account, funds can be credited to it by the platform only;
  - funds on it cannot be refunded;
  - funds on it can sometimes expire.

    See details in subsection [Bonuses](#bonuses).

You can pay for services from both accounts. Funds are first debited from the bonus account, and after all funds on the bonus account are spent from the main account.

## Expense and negative balance

Funds on the balance sheet begin to be spent after the creation of the first chargeable objects — for example, virtual machines and floating IP addresses.

If the funds on both accounts run out, the project balance becomes negative, and the project is automatically [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project). The project objects are placed in a queue for deletion, and a corresponding notification is sent to the project owner's email.

<info>

For legal entities that work on a post-payment, a negative balance does not lead to the freezing of the project.

</info>

To resume the services and avoid deleting objects, [top up](../../service-management/payment#making_a_payment) the balance. If the balance becomes positive, the project will be automatically unfrozen within 4 hours. After defrosting, all objects that have been stopped must be started manually.

## Bonuses

Bonuses, or bonus points, are virtual funds credited to the project balance by the VK Cloud platform itself. When paying for services, bonuses are the same as real funds.

Bonuses are credited:

- When a new account is [registered](/en/intro/start/account-registration) on the platform. These sign-up bonuses are credited only once, after services are activated in the [project](/en/tools-for-using-services/account/concepts/projects) that is created for the account. The amount of bonuses depends on the region of the project:

  - Moscow — 3000 bonuses;
  - Kazakhstan — 24000 bonuses.

  One bonus point for [region](/en/tools-for-using-services/account/concepts/regions) Moscow equals one ruble, for region Kazakhstan — one tenge.

  <err>

  Unspent sign-up bonuses expire in 60 calendar days after the account registration.

  </err>

- During some advertising campaigns.
- When paying refunds for the technical failures that occurred through the fault of VK Cloud.
