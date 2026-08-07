{note:info}

Viewing project expenses details and making payments is available to users whose [role](/en/access/iam/concepts/rolesandpermissions) in the [project](/en/tools-for-using-services/account/concepts/projects) is Project owner, Superadministrator, or Billing administrator.

{/note}

## Viewing the balance

At the top of the management console page, [the payment account balance and the bonus balance](../../concepts/balance) of the project are displayed.

To see details and costs of services:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
{include(/en/_includes/_balance_page.md)}

{note:info}

The [detailing](../detail) is available on all projects in which your [role](/en/access/iam/concepts/rolesandpermissions) is Owner, Superadministrator, or Billing Administrator. The data on the **Detail** and **Expenses on services** tabs is filtered by the current project by default.

{/note}

## Making a payment

It is possible to credit funds to the [payment account balance](../../concepts/balance) of the project only and in the project currency only.

To make a payment:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Open the balance top-up window by using one of the options:
   1. Hover over the ![balance](/en/intro/billing/assets/balance.svg "inline")  icon in the page header and click the **Make a payment** button.
   1. Go to the **Balance** page by clicking ![balance](/en/intro/billing/assets/balance.svg "inline") in the page header and click the **Make a payment** button.
1. Specify the top-up amount.

   The minimum amount is 10 RUB for the projects in the Moscow [region](/en/tools-for-using-services/account/concepts/regions), and 100 KZT for the ones in Kazakhstan.

1. Select one of the [payment methods](../../concepts/payment-methods).

   The following options are available for paying via a bank card:

   - **Card**: to pay with a card that is [linked](../add-card) to the project. You do not need to enter the card details.
   - **Bank card**: to add a new payment method via:
   
      - A new card.
      - The Faster Payments System (FPS). You can link this method to your project by setting the **Сохранить для оплаты** checkbox.

         {note:info}
         To disconnect payments via the FPS from your project, contact [technical support](mailto:support@mcs.mail.ru).
         {/note}
     
      - Electronic money via SberPay and YooMoney.

   - **Payment by invoice for legal entities**: for paying by bank transfer by the generated invoice. Before generating the invoice, you can [add](/en/intro/billing/instructions/corporate#additional_registration_of_legal_entities) or [edit](/en/intro/billing/instructions/corporate#edit_company) your company details.

   For legal entities and sole proprietors, the recommended payment method is **Bank transfer**. Payments made using other methods are not included in the [financial documents](../../concepts/report) for legal entities and sole proprietors.

## Expenses notifications

You can set up a monthly expenses limit for each of your projects. When an expenses total for the current calendar month exceeds the limitation, a notification is sent to the project Owner email.

To set up an expenses limitation and notifications:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.

{include(/en/_includes/_balance_page.md)}

1. On the balance page, go to the **Limitation** tab.

   The tab displays a list of all projects in which your [role](/en/access/iam/concepts/rolesandpermissions) is Owner or Superadminitrator.

1. Click on the ![Settings](assets/filter_icon.svg "inline") icon opposite to the project.

   The limit configuration window opens.

1. Enable the **Notify of excess costs** option.
1. Specify the limit value (from `1` to `999999999` in the currency of the project) and click **Save changes**.
