This guide will help you get started with VK Cloud:

- create an account and log in to your personal account;
- confirm your VK Cloud account;
- configure the project that is created during registration;
- connect to the project via the OpenStack CLI command line interface.

<info>

To join an existing VK Cloud project, follow the instructions in article [Join a project by invitation](/en/tools-for-using-services/account/service-management/project-invitation).

</info>

## 1. Create an account

1. Go to [VK Cloud main page](https://cloud.vk.com/en/) and click **Create a VK Cloud Account** in the upper right corner.
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

## 2. Confirm your account

If you do not immediately confirm the account, when you try to perform an action (for example, create an object or [activate services](/en/base/account/start/activation)), the confirmation will continue from the step where it was stopped.

1. Confirm your email: wait for an email from the address `noreply@cloud.vk.com` and follow the link in the email. If the email has not arrived or has expired, request it again by clicking **Send confirmation again** in the confirmation window.
1. Confirm your phone:

   <warn>

   For the [region](/en/base/account/concepts/regions) Moscow, only phone numbers registered in the Russian Federation (starting with +7) are accepted. One phone number can be linked to no more than two accounts.

   </warn>

   1. Enter your number in the **Phone number** field and click **Request a confirmation code**.
   1. Enter the SMS code into the provided field and click **Confirm number**.

      If the SMS doesn't arrive or has expired, request it again by clicking **The code didn't arrive?** button which appears in 60 seconds.

1. If additional account verification is requested, send a request to technical support:

   <details>
     <summary>Why does this check appear?</summary>

   VK Cloud platform automatically [validates the security status](../../it-security/tech#antifraud) of the account. Depending on the results of the check, one of these options is offered:

   - Link a card right away — the **Payment card** tab opens.
   - Send a request to technical support — the **Account activation** tab opens. Linking a card becomes available after the request is processed by technical support.

   </details>

   1. Copy the [identifier (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_the_project_id) of your project from the VK Cloud site URL.

      An example for the region Moscow: `https://msk.cloud.vk.com/app/mcs123456789/main`, where `mcs123456789` is the project identifier (PID).

   1. Click **Contact support**.
   1. On the [technical support portal](https://support.mcs.mail.ru) page that opens click the **Новая заявка** button.
   1. Sequentially select a category from the lists:

      - **Тип услуги**: `VK Cloud`.
      - **Категория услуги**: `VK Cloud: Учетная запись`.
      - **Группа услуги**: `Учетная запись: Активация и доступ`.
      - **Услуга**: `VK Cloud Активация и доступ: Активировать учетную запись`.

   1. In the form that opens, fill in the fields:

      - **Тема**: specify a topic like `Project Activation <Project PID>`.
      - **Регион**: select the project region (**Moscow** or **Kazakhstan**).
      - **Проект**: specify the project ID (PID).
      - **Описание**: write the reason for the request — you need to check your account.

   1. Attach additional materials according to the instructions on the page.
   1. Click the **Отправить** button.
   1. Wait for your request to be approved.

1. [Link](/en/tools-for-using-services/account/service-management/activation#linking_a_bank_card) a card of [supported payment system](/en/intro/billing/concepts/payment-methods). The specified amount will be debited from your card and credited to your project balance.

   <warn>

   You cannot use a virtual card for account confirmation.

   One card can be linked to one project only.

   </warn>

1. (Optional) On the **Autopayment** tab that opens, configure the [autopayment](/en/intro/billing/service-management/add-card#configure_auto_completion) settings.
1. Click **Get started with VK Cloud**.
1. Wait for your personal account page to open. A message about successful services activation appears.

A [project](/en/base/account/concepts/projects) is automatically created for your account. After the services activation, sign-up [bonuses](/en/intro/billing/concepts/balance#bonuses) are credited to your [balance](/en/intro/billing/concepts/balance). These bonuses are credited only once after the registration of each new account. If no bonus points are credited within 3 working days, contact [technical support](/en/contacts).

## 3. Activate API access

<info>

VK Cloud supports working with the platform using [additional tools](/en/manage/tools-for-using-services): REST API, OpenStack CLI, Terraform and others — in order to ensure security, access to them is activated by the user independently.

</info>

1. [Enable](/en/tools-for-using-services/account/service-management/account-manage/manage-2fa/) 2FA for account.
1. [Activate](/en/manage/tools-for-using-services/rest-api/enable-api) API access.

## 4. (Optional) Invite other users

You are the [owner](/en/base/account/concepts/rolesandpermissions) of the project account created during registration. To add other users to the project:

1. [Invite](/en/base/account/account/adduser) users to your project and assign them with [roles](/en/base/account/concepts/rolesandpermissions).
1. [Turn on](/en/tools-for-using-services/account/service-management/project-settings/access-manage#inclusion_of_mandatory_2fa_in_the_project) mandatory 2FA in the project to reduce the risk of unauthorized access.

## 5. (Optional) Connect to the project via OpenStack CLI

1. [Install](/en/base/account/cli/setup) OpenStack сlient and [authenticate yourself](/en/base/account/cli/authorization) in the project.
1. To check the connection, open a console and run a command, for example:

    ```bash
    openstack project list
    ```

    Upon successful connection, a list of created projects will be displayed.

## What's next?

- [Customize](/en/intro/billing/service-management/corporate/) the project to make payments through the legal entity.
- [Read](/en/base/account/concepts/quotasandlimits) information about the quotas and limits in VK Cloud projects.
- Learn about the [payment methods](/en/intro/billing/service-management/payment) available and the key [pricing](/en/base/account/tariffication) model principles.
- Find out how to create and connect a [virtual machine](/en/base/iaas/vm-start), a [Kubernetes cluster](/en/base/k8s/quickstart), a [database](/en/dbs/dbaas/start).
