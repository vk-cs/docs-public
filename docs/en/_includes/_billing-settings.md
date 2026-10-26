{includetag(billing_onboarding)}
## Preparatory steps

1. Learn the cost of {var(cloud)} services:

   1. Review the [price list](https://cloud.vk.com/pricelist/).
   1. Review the articles about payment specifics for the services you need. Such articles are called "Tariffication" and are located in the documentation for the service in question. For example, the {linkto(/en/computing/iaas/tariffication#iaas-tariffication)[text=tariffication article]} for the Cloud Servers service.
   1. Use the [calculator](https://cloud.vk.com/pricing) to estimate the cost of the configuration you need.

1. Review the list of {linkto(/en/intro/billing/concepts/report#billing-report)[text=reporting documents]} that the platform provides to individuals and legal entities.

## {counter(billing)}. Check the project balance

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Click the username in the page header, and select **Balance and payments** from the drop-down list.

   The page shows the account balance and the project's bonus balance.

   The bonus balance shows the welcome {linkto(/en/intro/billing/concepts/balance#billing-balance-bonuses)[text=bonuses]} credited after [registering](/en/intro/onboarding/account) a new account in {var(cloud)}.

   {note:err}
   Welcome bonuses that are not spent on paying for services expire 60 calendar days after account registration.
   {/note}

For more about the balance, see the article {linkto(/en/intro/billing/instructions/payment#billing-payment)[text=Managing the project balance]}.

## {counter(billing)}. Top up the account with an initial amount

{tabs}
{tab(For individuals)}
{/includetag}

   {includetag(not_billing_onboarding)}
1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Click the username in the page header, and select **Balance and payments** from the drop-down list.
   {/includetag}
   {includetag(billing_onboarding)}
1. Click the **Top up balance** button.
1. {linkto(/en/intro/billing/instructions/payment#billing-payment-balance-charge)[text=Top up]} the project's account using a {linkto(/en/intro/billing/concepts/payment-methods#billing-payment-methods)[text=method]} convenient for you.
{/tab}

{tab(For organizations and entrepreneurs)}
{/includetag}
   {includetag(not_billing_onboarding)}
1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Click the username in the page header, and select **Balance and payments** from the drop-down list.
   {/includetag}
   {includetag(billing_onboarding)}
1. Generate an invoice for the required amount:

   1. Click the **Top up balance** button.
   1. In the window that opens, specify the top-up amount.
   1. Select the **Bank transfer** option and click the **Continue** button.

      An invoice for the specified amount will be automatically generated and downloaded to your computer.
   
1. Pay the invoice by bank transfer.

   Crediting the funds may take up to three banking days.
{/tab}
{/tabs}

Funds are debited from the account as paid resources are used. If the project balance goes negative, it will be {linkto(/en/tools-for-using-services/account/concepts/projects#projects-auto-freeze)[text=frozen]}.
{/includetag}

{includetag(billing_onboarding)}
## {counter(billing)}. (Optional) Configure spending notifications
{/includetag}

{includetag(notifications)}

You can set a monthly spending limit for each of your projects. When the amount of spending in the current calendar month exceeds the specified limit, {var(cloud)} will send a notification to the project owner's email.

To configure a spending limit and notifications for a project:

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.

{include(/en/_includes/_balance_page.md)}

1. On the balance page, go to the **Limits** tab.

   A list of all projects in which your {linkto(/en/access/iam/concepts/roles-reference#iam-roles-reference)[text=role]} is owner or super administrator will be displayed.

1. Click the ![Settings](/en/assets/filter_icon.svg "inline") icon in the row of the desired project.

   The limit settings window will open.

1. Enable the **Notify on spending overrun** option.
1. Specify the limit value (from `1` to `999999999` in the project's currency) and click the **Save changes** button.
{/includetag}
