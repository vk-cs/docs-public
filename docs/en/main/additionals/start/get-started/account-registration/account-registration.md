## Registration in the personal account

1. Go to [VK Cloud main page](https://mcs.mail.ru/en/) and click **Create a VK Cloud Account** in the upper right corner.
1. In the window that appears, fill in the fields:

    - **Work email**: your email address.

    <info>

    For some corporate accounts, special registration conditions are available. Therefore, specifying a work email is recommended.

    </info>

    - **Password**: a new password.

    <warn>

    The minimum password length is 8 symbols. The password must contain:

    - uppercase and lowercase Latin letters;
    - at least one number or symbol from the following range: ``? ! ~ @ # $ % ^ & _ - + * = ; : , . / \ | ` [ ] { } ( )``.

    The password must not contain repeating groups of characters, such as ``aaa123123123``.

    </warn>

1. Click **Create an account**.

The account confirmation window opens. A confirmation email is sent to the specified email address.

## Account Confirmation

To complete your registration with VK Cloud, confirm your account details: validate your email and phone number and link a payment card.

After the registration is completed, sign-up [bonus points](../../../billing/concepts/bonus) will be credited to your balance.

If you close the confirmation window before completing the registration, your personal account in VK Cloud is still available. However, when you try to perform an action (for example, create an object or [activate services](/en/base/account/start/activation)), the confirmation will continue from the step where it was stopped.

<tabs>
<tablist>
<tab>1. Email validation</tab>
<tab>2. Phone validation</tab>
<tab>3. Payment card
</tablist>
<tabpanel>

1. Go to your mailbox and open the email from the address `noreply@mcs.mail.ru`.

    If the email cannot be found in **Inbox**, check the **Spam** folder.

1. Follow the link in the email.

    If the email has not arrived or has expired, request it again by clicking **Send confirmation again** in the confirmation window.

The confirmation window opens on step **2. Phone validation**.

</tabpanel>
<tabpanel>

Phone validation becomes available after successful email validation. Only phone numbers registered in the Russian Federation (starting with +7) are accepted. One phone number can be linked to no more than two accounts.

1. Enter your number in the **Phone number** field and click **Request a confirmation code**.

1. Enter the SMS code into the provided field and click **Confirm number**.

    If the SMS doesn't arrive or has expired, request it again by clicking **The code didn't arrive?** button which appears in 60 seconds.

The confirmation window opens on step **3. Payment card**.

<info>

If after your phone is confirmed you see a message about the successful services activation, and your personal account page opens, this means that step **3. Payment card** is not required for your account. You can [link](../../../billing/operations/add-card) a payment card later.

</info>

</tabpanel>

<tabpanel>

Linking a card becomes available after successful phone validation. The payment card will be used for adding funds to your VK Cloud [balance](../../../billing/start/balance). The list of supported payment systems can be found in the [Payment methods](../../../billing/start/payment-methods) article.

<warn>

The amount specified in the confirmation window (up to 500 rubles) will be debited from your card and credited to your VK Cloud balance. The amount is [non-refundable](/en/base/account/start/activation#linking-a-bank-card).

</warn>

To link a card:

1. Enter the card details into the provided fields and click **Add card**.

1. In the payment confirmation window, enter the SMS code provided by your bank.

1. (Optional) In the window that opens, configure the autopayment settings:

    - **Auto-top-up amount**: specify the amount to be automatically credited to your balance after the minimum balance threshold amount is reached. The range of the credited amount is from 100 to 20 000 rubles.

    - **Top-up with remaining balance**: specify the minimum balance threshold — a value from 0 to 9 999 999 rubles.

    You can configure the autopayment [later](../../../billing/operations/add-card#auto-completion).

1. Click **Get started with VK Cloud**.

A message about the successful services activation appears, and your VK Cloud personal account page opens.

</tabpanel>

</tabs>

## Activation of API access

If you will work with the platform not only through your personal account (for example, using OpenStack CLI or kubectl), [activate](/en/base/account/project/api/api-access) API access.

## What's next

- [Complete](../corporate/) the registration of a legal entity.
- [Read](../trial/) about the trial period of using the platform.
- [View](/en/base/account) the personal account features.
