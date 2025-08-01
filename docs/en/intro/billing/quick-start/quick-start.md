A quick start will help you set up a new project to pay for services.

After completing all the quick start steps, you will link a payment card to the project and top up the payment account of the project for the first time. Besides that:

- individuals will set up auto-replenishment of the balance;
- legal entities will set up electronic document management and prepare a project for the correct unloading of invoices for payment.

## Preparatory steps

1. Study the cost of VK Cloud services:

   1. Check out the [price list](https://cloud.vk.com/pricelist/).
   1. Study the articles about the payment features for the services you need. Such articles are called Billing and are in the documentation of the required service. For example, article on Cloud Servers [pricing](/en/computing/iaas/tariffication).
   1. Use the [calculator](https://cloud.vk.com/en/pricing) to calculate the cost of the configuration you need.

1. Check out the list of [accounting documents](../concepts/report) that the platform provides to individuals and legal entities.
1. [Register](/en/intro/start/account-registration) in VK Cloud. When registering, a project will be created for you in [region](/en/tools-for-using-services/account/concepts/regions) Moscow.

## 1. Check the project balance

1. Go to [management console](https://msk.cloud.vk.com/app/en/) VK Cloud.
1. Click on the user name in the header of the page, select **Balance and payments** from the drop-down list.

The payment account balance and the bonus balance of the project will be displayed on the page. The bonus balance display the welcome [bonuses](../concepts/balance) accrued after registration.

For more information about the balance, see the [Balance management](../instructions/payment) article.

## 2. Make sure that a map is linked to the project

1. Go to [management console](https://msk.cloud.vk.com/app/en/) VK Cloud.
1. Click on the user name in the header of the page, select **Balance and payments** from the drop-down list.
1. Check if the card is linked:

   - If the card is linked, its last 4 digits are displayed on the page.
   - If the card is not linked, the button is displayed on the page **Link a card**. In this case, [bind](../instructions/add-card#bind_the_card) it.

One card can be linked to only one project. When linking the card, a small amount will be debited from it, which will be credited to the project balance.

## 3. Customize the project

{tabs}

{tab(Individuals)}

[Configure auto-completion](../instructions/add-card#configure_auto_completion) from the card, if it was not configured earlier.

{/tab}

{tab(Legal entities)}

1. [Disable](../instructions/add-card#configure_auto_completion) auto-completion from the card if it was enabled earlier.
1. Set up [electronic document management (EDM)](../concepts/report) with VK Cloud, following the instructions of your EDM operator.

   If you need help with connecting EDM, send a request to the VK Cloud Document Management Department (docs_vktech@vk.company).

1. [Go through pre-registration](../instructions/corporate#additional_registration_of_legal_entities) to generate invoices for payment with full details.

{/tab}

{/tabs}

## 4. Add the initial amount to the payment account

{tabs}

{tab(Individuals)}

1. Go to [management console](https://msk.cloud.vk.com/app/en/) VK Cloud.
1. Click on the user name in the header of the page, select **Balance and payments** from the drop-down list.
1. [Top up](../instructions/payment#making_a_payment) the payment account of the project in a [convenient way](../concepts/payment-methods) for you.

{/tab}

{tab(Legal entities)}

1. Go to [management console](https://msk.cloud.vk.com/app/en/) VK Cloud.
1. Click on the user name in the header of the page, select **Balance and payments** from the drop-down list.
1. If you work with VK Cloud on prepayment, [create an invoice](../instructions/bill-generation) for the required amount in your management console.
1. Pay the bill by bank transfer.

Crediting of funds can take up to three banking days.

{/tab}

{/tabs}

Funds will be debited from the payment account as the paid resources are used. If the project becomes negative, it will be [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project).

## What's next?

- See the available options [expense details](../instructions/detail).
- Set a monthly spending limit for the project and [set up notifications](../instructions/payment#expenses_notifications) when the limit is reached.
