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

If you close the confirmation window before completing the registration, your personal account in VK Cloud is still available. However, when you try to perform an action (for example, create an object or [activate services](/en/base/account/start/activation)), the confirmation will continue from the step where it was stopped.

<tabs>
<tablist>
<tab>1. Email validation</tab>
<tab>2. Phone validation</tab>
<tab>3. Linking a card</tab>
</tablist>
<tabpanel>

1. Go to your mailbox and open the email from the address `noreply@mcs.mail.ru`.

    If the email cannot be found in **Inbox**, check the **Spam** folder.

1. Follow the link in the email.

    If the email has not arrived or has expired, request it again by clicking **Send confirmation again** in the confirmation window.

The confirmation window opens on step **2. Phone validation**.

</tabpanel>
<tabpanel>

Phone validation becomes available after successful email validation. For the [region](/en/base/account/concepts/regions) Moscow, only phone numbers registered in the Russian Federation (starting with +7) are accepted. One phone number can be linked to no more than two accounts.

1. Enter your number in the **Phone number** field and click **Request a confirmation code**.
1. Enter the SMS code into the provided field and click **Confirm number**.

    If the SMS doesn't arrive or has expired, request it again by clicking **The code didn't arrive?** button which appears in 60 seconds.

The confirmation window opens on step **3. Payment card**.

<info>

If after your phone is confirmed you see a message about the successful services activation, and your personal account page opens, the last confirmation step is not required for your account. You can [link](../../../billing/operations/add-card) a payment card later.

</info>

</tabpanel>
<tabpanel>

As the last step of account confirmation, you will be asked to link a payment card to the project in order to [activate](/en/base/account/instructions/activation) the services.

VK Cloud platform automatically [validates the security status](../../it-security/tech#antifraud) of the account. Depending on the results of the check, one of these options is offered:

- Link a card right away — the **Payment card** tab opens.
- Send a request to technical support — the **Account activation** tab opens. Linking a card becomes available after the request is processed by technical support.

To confirm your account and activate the services:

1. Follow the instructions on the tab:

    <tabs>
    <tablist>
    <tab>Payment card</tab>
    <tab>Account activation</tab>
    </tablist>
    <tabpanel>

    1. [Link](/en/base/account/instructions/activation#linking_a_bank_card) a card. The specified amount will be debited from your card and credited to your project balance.

        The list of supported payment systems can be found in the [Payment methods](../../../billing/start/payment-methods) article. One card can be linked to one project only. You can unlink the card from the project later by contacting [technical support](/en/contacts).

        <info>

        You cannot use a virtual card for account confirmation.

        </info>

    1. (Optional) On the **Autopayment** tab that opens, configure the [autopayment](../../../billing/operations/add-card#auto_completion) settings.
    1. Click **Get started with VK Cloud**.

    </tabpanel>
    <tabpanel>

    1. Copy the [identifier (PID)](/en/base/account/instructions/project-settings/manage#getting_the_project_id) of your project from the VK Cloud site URL.

        An example for the region Moscow: `https://mcs.mail.ru/app/mcs123456789/main`, where `mcs123456789` is the project identifier (PID).

    1. Click **Contact support**.

        The [technical support portal](https://support.mcs.mail.ru) opens in the new browser tab.

    1. Create a request for account activation. In the fields of the request, specify the project region (**Moscow** or **Kazakhstan**) and the project identifier (PID).
    1. After your request is processed, linking a card becomes available. [Link](/en/base/account/instructions/activation#linking_a_bank_card) a card. The specified amount will be debited from your card and credited to your project balance.

        The list of supported payment systems can be found in the [Payment methods](../../../billing/start/payment-methods) article. One card can be linked to one project only. You can unlink the card from the project later by contacting [technical support](/en/contacts).

        <info>

        You cannot use a virtual card for account confirmation.

        </info>

    1. (Optional) On the **Autopayment** tab that opens, configure the [autopayment](../../../billing/operations/add-card#auto_completion) settings.
    1. Click **Get started with VK Cloud**.

    </tabpanel>
    </tabs>

1. Wait for your personal account page to open. A message about successful services activation appears.

</tabpanel>
</tabs>

A [project](/ru/base/account/concepts/projects) is automatically created for your account. After the services activation, sign-up [bonuses](../../../billing/concepts/bonus) are credited to your balance. These bonuses are credited only once after the registration of each new account. If no bonus points are credited within 3 working days, contact [technical support](/en/contacts).

## Activation of API access

If you will work with the platform not only through your personal account (for example, using OpenStack CLI or kubectl), [activate](/en/base/account/project/api/api-access) API access.

## What's next?

- [Complete](../corporate/) the registration of a legal entity.
- [Read](/en/base/account/concepts/quotasandlimits) information about the quotas and limits in VK Cloud projects.
- [View](/en/base/account) the personal account features.
