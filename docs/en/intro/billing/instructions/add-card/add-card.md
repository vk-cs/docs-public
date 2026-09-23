## {heading(Link a card or FPS account)[id=link_card]}

A card or a Faster Payments System (FPS) account can be linked to the project:

- when [registering](/en/intro/start/account-registration) a user account (if required)
- independently at any time

After a card or account is linked, you get the access to services in the project.

It is recommended to use physical bank cards to pay for services, since payments from virtual cards can be rejected by the security system.

{note:info}

Legal entities are recommended to pay for services using bank transfers. Card payments are not taken into account in [accounting documents](../../concepts/report#legal_entities).

{/note}

To link a card or connect payments via FPS:

{tabs}

{tab(Bank card)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
{include(/en/_includes/_balance_page.md)}
1. Click the **Add card** button.
1. In the window that opens, specify its details in the respective fields: card number, month/year, CV code.

    If there are enough funds on the bank account, a test amount will be debited from the card and credited to the [project balance](/en/intro/billing/concepts/balance). After that the card will be successfully linked.

    {note:info}

    If the test amount was not spent on services, it can be refunded via [technical support](mailto:support@mcs.mail.ru).

    {/note}

1. Click the **Add card** button.
1. In the payment confirmation window, enter the SMS code received from the bank.

    After successful debiting, the card will be linked.

1. (Optional) On the **Autopayment settings** tab that opens, configure auto top-up of the payment account. To skip this step, disable the **Configure autopayment** option.
1. Click the **Save changes** button.

{/tab}
{tab(FPS)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
{include(/en/_includes/_balance_page.md)}
1. Click the **Make a payment** button.
1. Specify the top-up amount (minimum 10 rubles for projects in the Moscow [region](/en/tools-for-using-services/account/concepts/regions), and 100 tenge for projects in the Kazakhstan region) and select the **By bank card** payment method.
1. Click the **Continue** button.
1. Select the **СБП** option.
1. Select the **Сохранить для оплаты** option and pay via the QR code.

    After the funds are successfully debited, the account will be linked. After that, when you click the **Make a payment** button, a separate **With linked SBP** option becomes available, which you can use to top up the project balance instantly.

{/tab}
{/tabs}

{note:info}

For more information on all available payment methods, see [Payment methods](../../concepts/payment-methods).

{/note}

## {heading(Configure autopayment)[id=configure_auto_completion]}

Autopayment allows you to automatically top up the [payment account balance](../../concepts/balance) of the project from the linked card or FPS account when the payment account balance reaches the specified value. You can set up autopayment at any time.

The enabled autopayment does not guarantee that there will always be funds on the payment account of the project. For example, if there are not enough funds on the card or FPS account, the payment will not be made.

{note:warn}

In the Kazakhstan [region](/en/tools-for-using-services/account/concepts/regions), autopayment is not available.

{/note}

To configure autopayment of the project balance from a bank card or a linked FPS account:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
{include(/en/_includes/_balance_page.md)}
1. On the balance page, click on the link **Configure autopayment**.
1. Enable the option **Enable balance autopayment**.
1. Fill in the fields:

    - **Auto top-up amount**: specify the amount in the range from `100` to `10000` rubles for which the payment account will be automatically replenished.
    - **Top-up with remaining balance**: specify the balance of funds at which auto-replenishment will occur — an amount in the range from `0` to `9999999` rubles.

1. Click the **Save changes** button.

## {heading(Unlink the card)[id=link_card]}

{tabs}

{tab(Bank card)}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
{include(/en/_includes/_balance_page.md)}
1. On the balance page, click the **Add card** button.
1. In the window that opens, in the row with the linked card:

    1. Click the **Изменить** link.
    1. Click the ![](/en/assets/no.svg "inline") icon.
    1. Click the **Удалить** button.

Wait for the card to be unlinked. After that, it will no longer display on the balance page.

{note:info}
If you are a legal entity and work on prepayment, leave the card as an additional means of payment for urgent payments. This will help you avoid project [freezing](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project) in case of late payment. Write-offs for payments from bank cards are not included in [accounting documents for legal entities](../../concepts/report#composition_of_accounting_documents): billing report, reconciliation report.
{/note}

{/tab}
{tab(FPS)}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
{include(/en/_includes/_balance_page.md)}
1. Next to the linked FPS account, click the ![](/en/assets/edit-icon.svg "inline") icon.
1. In the window that opens, in the row with the linked account:

    1. Click the **Изменить** link.
    1. Click the ![](/en/assets/no.svg "inline") icon.
    1. Click the **Удалить** button.

Wait for the account to be unlinked. After that, it will no longer be displayed on the balance page.

{/tab}
{/tabs}
