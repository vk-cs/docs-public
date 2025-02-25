For each new [project](/en/tools-for-using-services/account/concepts/projects), several accounts are created automatically:

- The payment account is an account to which the real money is credited:

  - You can replenish it using one of the available [payment methods](../payment-methods).
  - Funds on it can be [refunded](../../service-management/refund).
  - Funds on it never expire.

- The bonus account is a dedicated account for storing bonuses:

  - You cannot replenish this account, funds can be credited to it by the platform only.
  - Funds on it cannot be refunded.
  - Funds on it can sometimes expire.
  - There can be several bonus accounts. Bonuses are divided into several types, and a corresponding bonus account is created for each type. See [Bonuses](#bonuses) for details.

Payment account status and balance of all bonus accounts are [available](../../service-management/payment) in the header of the [management console](https://msk.cloud.vk.com/app/). The sum of funds on the payment account reflects **Personal balance**, the sum of bonuses on all bonus accounts reflects **Bonus balance**.

<info>

Balance is not displayed in your management console if you have not completed the [registration procedure](/en/intro/start/account-registration).

</info>

## Expenses and negative payment account balance

The balance starts to be spent after the first chargeable objects are created, such as virtual machines and floating IP addresses.

The bonus account corresponding to the type of created object is debited first. When this bonus account runs out of funds, the money is deducted from the payment account balance, even if there are funds in other bonus accounts. If the payment account balance runs out of funds, the project is automatically [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project). The project objects are placed in a queue for deletion, and a corresponding notification is sent to the project owner's email.

<info>

For legal entities that work on a post-payment, a negative payment account balance does not lead to the freezing of the project.

</info>

To resume the services and avoid deleting objects, [top up](../../service-management/payment#making_a_payment) the payment account balance. If the payment account balance becomes positive, the project will be automatically unfrozen within 15 minutes. After defrosting, all objects that have been stopped must be started manually.

## Bonuses

*Bonuses*, or *bonus points*, are virtual funds credited by the VK Cloud platform to the bonus balance of the project. When paying for services, one bonus point for the Moscow [region](/en/tools-for-using-services/account/concepts/regions) equals one ruble, for the Kazakhstan region — one tenge.

There are different types of bonuses. The type of bonuses corresponds to the services and objects of VK Cloud, which can be paid by these bonuses. For example, bonuses for virtual machines can only be spent to pay for virtual servers.

Bonuses are credited:

- When a new user account is [registered](/en/intro/start/account-registration) on the platform. These sign-up bonuses are credited only once, after services are activated in the [project](/en/tools-for-using-services/account/concepts/projects) that is created for the account. The amount of bonuses depends on the region of the project:

  - Moscow — 3000 bonuses (1000 bonuses to pay for virtual servers and their backups, 2000 bonuses for all other services except CDN, third-party services and licenses, as well as software products from the [Marketplace](https://msk.cloud.vk.com/app/services/marketplace)).
  - Kazakhstan — 24000 bonuses on all services except CDN, third-party services and licenses, as well as software products from the Marketplace.

  <err>

  Unspent sign-up bonuses expire in 60 calendar days after the user registration.

  </err>

- During some advertising campaigns.
- When paying refunds for the technical failures that occurred through the fault of VK Cloud. See more about refunds in the agreements on the use of the relevant services.

<warn>

In some cases, previously accrued bonuses may be canceled or denied. See more in the [paragraph 8.3 of the VK Cloud Platform Terms of Use](/en/intro/start/legal)

</warn>
